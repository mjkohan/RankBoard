'use client';

import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';
import {  useUniversityStore } from '@/store/universityStore';

export default function SortableSelectionList() {
  const { selectedMajors, reorderSelection, updateRank, removeFromSelection } = useUniversityStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = selectedMajors.findIndex((item) => item.id === active.id);
      const newIndex = selectedMajors.findIndex((item) => item.id === over.id);
      
      reorderSelection(oldIndex, newIndex);
    }
  };
  
  const handleRankEdit = (id: string, rank: number) => {
    updateRank(id, rank);
    setEditingId(null);
  };
  
  return (
    <div className="mt-4">
      <h3 className="text-lg font-medium mb-2">لیست انتخاب‌های شما</h3>
      
      {selectedMajors.length === 0 ? (
        <div className="bg-gray-50 p-4 text-center rounded-md border border-gray-200">
          <p className="text-gray-500">هنوز رشته‌ای انتخاب نکرده‌اید</p>
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={selectedMajors.map(item => item.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-2">
              {selectedMajors.map((major) => (
                <SortableItem
                  key={major.id}
                  id={major.id}
                  item={major}
                  isEditing={editingId === major.id}
                  onEdit={() => setEditingId(major.id)}
                  onSave={handleRankEdit}
                  onRemove={() => removeFromSelection(major.id)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}