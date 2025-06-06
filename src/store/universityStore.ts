import {create} from 'zustand';
import {persist} from 'zustand/middleware';

export interface Major {
    id: string;
    name: string;
    universityId: string;
    code?: string;
    capacity?: number;
}

export interface University {
    id: string;
    name: string;
    city?: string;
    type?: 'دولتی' | 'آزاد' | 'غیرانتفاعی' | 'پیام نور';
}

export interface SelectedMajor extends Major {
    rank: number;
    universityName: string;
}

interface UniversityState {
    universities: University[];
    majors: Major[];
    selectedMajors: SelectedMajor[];
    addUniversity: (university: Omit<University, 'id'>) => void;
    updateUniversity: (id: string, data: Partial<University>) => void;
    removeUniversity: (id: string) => void;
    addMajor: (major: Omit<Major, 'id'>) => void;
    updateMajor: (id: string, data: Partial<Major>) => void;
    removeMajor: (id: string) => void;
    addToSelection: (major: Major, university: University) => void;
    removeFromSelection: (id: string) => void;
    updateRank: (id: string, rank: number) => void;
    reorderSelection: (startIndex: number, endIndex: number) => void;
    clearSelection: () => void;
    loadPreset: (preset: SelectedMajor[]) => void;
}

export const useUniversityStore = create<UniversityState>()(
    persist(
        (set) => ({
            universities: [],
            majors: [],
            selectedMajors: [],

            addUniversity: (university) =>
                set((state) => ({
                    universities: [...state.universities, {...university, id: crypto.randomUUID()}]
                })),

            updateUniversity: (id, data) =>
                set((state) => ({
                    universities: state.universities.map(uni =>
                        uni.id === id ? {...uni, ...data} : uni
                    )
                })),

            removeUniversity: (id) =>
                set((state) => ({
                    universities: state.universities.filter(uni => uni.id !== id),
                    majors: state.majors.filter(major => major.universityId !== id),
                    selectedMajors: state.selectedMajors.filter(
                        selected => !state.majors.find(
                            m => m.id === selected.id && m.universityId === id
                        )
                    )
                })),

            addMajor: (major) =>
                set((state) => ({
                    majors: [...state.majors, {...major, id: crypto.randomUUID()}]
                })),

            updateMajor: (id, data) =>
                set((state) => ({
                    majors: state.majors.map(major =>
                        major.id === id ? {...major, ...data} : major
                    ),
                    selectedMajors: state.selectedMajors.map(selected =>
                        selected.id === id ? {...selected, ...data} : selected
                    )
                })),

            removeMajor: (id) =>
                set((state) => ({
                    majors: state.majors.filter(major => major.id !== id),
                    selectedMajors: state.selectedMajors.filter(selected => selected.id !== id)
                })),

            addToSelection: (major, university) =>
                set((state) => {
                    // Check if already in selection
                    if (state.selectedMajors.some(m => m.id === major.id)) {
                        return state;
                    }

                    // Find the highest rank or default to 0
                    const highestRank = state.selectedMajors.reduce(
                        (max, item) => Math.max(max, item.rank), 0
                    );

                    return {
                        selectedMajors: [
                            ...state.selectedMajors,
                            {
                                ...major,
                                rank: highestRank + 1,
                                universityName: university.name
                            }
                        ]
                    };
                }),

            removeFromSelection: (id) =>
                set((state) => ({
                    selectedMajors: state.selectedMajors.filter(m => m.id !== id)
                })),

            updateRank: (id, rank) =>
                set((state) => ({
                    selectedMajors: state.selectedMajors.map(major =>
                        major.id === id ? {...major, rank} : major
                    )
                })),

            reorderSelection: (startIndex, endIndex) =>
                set((state) => {
                    const result = Array.from(state.selectedMajors);
                    const [removed] = result.splice(startIndex, 1);
                    result.splice(endIndex, 0, removed);

                    // Update ranks based on new order
                    return {
                        selectedMajors: result.map((item, index) => ({
                            ...item,
                            rank: index + 1
                        }))
                    };
                }),

            clearSelection: () =>
                set({selectedMajors: []}),

            loadPreset: (preset) =>
                set(() => {
                    const uniqueUniversities: University[] = Array.from(
                        new Map(
                            preset.map(m => [m.universityId, {id: m.universityId, name: m.universityName}])
                        ).values()
                    );

                    const majors: Major[] = preset.map(({ id, name, universityId, capacity }) => ({
                        id: convertPersianToEnglish(String(id)),
                        name,
                        universityId: convertPersianToEnglish(String(universityId)),
                        capacity
                    }));

                    return {
                        universities: uniqueUniversities,
                        majors,
                        //selectedMajors: preset
                    };
                }),


        }),
        {
            name: 'university-storage',
        }
    )
);
function convertPersianToEnglish(str: string): string {
    return str.replace(/[۰-۹]/g, (char) =>
        String.fromCharCode(char.charCodeAt(0) - 1728)
    );
}