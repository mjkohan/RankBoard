'use client';

import SortableSelectionList from '../../components/SortableSelectionList';
import {useUniversityStore} from '@/store/universityStore';
import {presets} from '@/lib/presets';

export default function SelectionPage() {
    const {
        universities,
        majors,
        selectedMajors,
        addToSelection,
        clearSelection,
        loadPreset
    } = useUniversityStore();


    const handleExport = () => {
        const {universities, majors, selectedMajors} = useUniversityStore.getState();
        const exportData = {universities, majors, selectedMajors};
        const dataStr = JSON.stringify(exportData, null, 2);
        const blob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'university-data.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const text = e.target?.result as string;
                const parsed = JSON.parse(text);

                if (
                    !parsed ||
                    !Array.isArray(parsed.universities) ||
                    !Array.isArray(parsed.majors) ||
                    !Array.isArray(parsed.selectedMajors)
                ) {
                    alert('ساختار فایل وارد شده صحیح نیست.');
                    return;
                }

                const {universities, majors, selectedMajors} = parsed;

                const isValid =
                    universities.every((u: any) => typeof u.id === 'string' && typeof u.name === 'string') &&
                    majors.every((m: any) => typeof m.id === 'string' && typeof m.name === 'string') &&
                    selectedMajors.every((s: any) => typeof s.id === 'string' && typeof s.rank === 'number');

                if (!isValid) {
                    alert('برخی از داده‌ها نامعتبر هستند.');
                    return;
                }

                useUniversityStore.setState({universities, majors, selectedMajors});
                alert('داده‌ها با موفقیت وارد شدند ✅');
            } catch (err) {
                alert('خواندن فایل با خطا مواجه شد ❌');
                console.error(err);
            }
        };

        reader.readAsText(file);
    };

    const filteredMajors = majors.filter((major) => {
        const isAlreadySelected = selectedMajors.some((s) => s.id === major.id);
        return !isAlreadySelected;
    });


    return (
        <main className="max-w-7xl mx-auto px-4 py-8 font-sans text-text">
            <h1 className="text-3xl font-display font-bold mb-8 text-primary">سامانه انتخاب رشته</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                <div className="space-y-6">


                    <div className="card p-4 border rounded-xl shadow-sm bg-white">
                        <h2 className="text-xl font-semibold mb-4">قالب‌های آماده</h2>
                        <p className="text-sm text-muted mb-3">با انتخاب یک قالب آماده، لیست انتخاب‌های شما پر
                            می‌شود.</p>
                        <div className="space-y-2">
                            {presets.map(preset => (
                                <button
                                    key={preset.id}
                                    className="btn btn-secondary w-full text-right"
                                    onClick={() => {
                                        if (selectedMajors.length > 0 && !confirm('لیست فعلی شما پاک خواهد شد. آیا مطمئن هستید؟')) {
                                            return;
                                        }
                                        loadPreset(preset.majors);
                                    }}
                                >
                                    {preset.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="card p-4 border rounded-xl shadow-sm bg-white">
                        <h2 className="text-xl font-semibold mb-4">خروجی گرفتن</h2>
                        <button className="btn bg-primary text-white w-full py-2 rounded-md" onClick={handleExport}>
                            دریافت فایل JSON
                        </button>
                        <button
                            className="btn bg-red-500 hover:bg-red-600 text-white w-full mt-3 py-2 rounded-md"
                            onClick={() => {
                                if (confirm('آیا از پاک کردن تمام انتخاب‌های خود اطمینان دارید؟')) {
                                    clearSelection();
                                }
                            }}
                        >
                            پاک کردن لیست
                        </button>
                    </div>

                    <div className="card p-4 border rounded-xl shadow-sm bg-white">
                        <label htmlFor="import-file" className="block text-sm font-medium mb-2">
                            بارگذاری از فایل JSON
                        </label>
                        <input
                            id="import-file"
                            type="file"
                            accept="application/json"
                            onChange={handleImport}
                            className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-hover transition w-full"
                        />
                    </div>
                </div>


                <div className="lg:col-span-2 space-y-6">
                    <div className="card p-4 border rounded-xl shadow-sm bg-white">
                        <h2 className="text-xl font-semibold mb-4">رشته های انتخاب نشده</h2>
                        <div className="space-y-2 max-h-96 overflow-y-auto">
                            {filteredMajors.map((major) => {
                                const university = universities.find(u => u.id === major.universityId);
                                const isSelected = selectedMajors.some(m => m.id === major.id);

                                return (
                                    <div key={major.id}
                                         className="p-4 border rounded-md bg-gray-50 flex justify-between items-center">
                                        <div>
                                            <h3 className="font-medium">{major.name}</h3>
                                            {university && <p className="text-sm text-muted">{university.name}</p>}
                                        </div>
                                        <button
                                            className={`btn px-4 py-2 rounded-md text-sm ${isSelected ? 'bg-gray-300' : 'bg-primary text-white hover:bg-primary-hover'}`}
                                            disabled={isSelected}
                                            onClick={() => {
                                                if (!isSelected && university) {
                                                    addToSelection(major, university);
                                                }
                                            }}
                                        >
                                            {isSelected ? 'اضافه شده' : 'افزودن به لیست'}
                                        </button>
                                    </div>
                                );
                            })}

                        </div>
                    </div>

                    <div className="card p-4 border rounded-xl shadow-sm bg-white">
                        <SortableSelectionList/>
                    </div>
                </div>
            </div>
        </main>
    );
}
