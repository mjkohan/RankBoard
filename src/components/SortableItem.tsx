import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { SelectedMajor } from '@/store/universityStore';

interface SortableItemProps {
  id: string;
  item: SelectedMajor;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (id: string, rank: number) => void;
  onRemove: () => void;
}

export function SortableItem({
  id,
  item,
  isEditing,
  onEdit,
  onSave,
  onRemove,
}: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white p-4 rounded-md border border-gray-200 shadow-sm flex items-center"
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab mr-2 text-gray-400 hover:text-gray-600"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </div>
      
      <div className="flex-1 mr-4">
        <h4 className="font-medium">{item.name}</h4>
        <p className="text-sm text-gray-500">{item.universityName}</p>
      </div>
      
      <div className="flex items-center">
        {isEditing ? (
          <div className="flex items-center">
            <input
              type="number"
              value={item.rank}
              onChange={(e) => onSave(id, parseInt(e.target.value, 10))}
              className="w-16 input text-center"
              min={1}
            />
            <button
              onClick={() => onEdit()}
              className="mr-2 text-green-600 hover:text-green-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="flex items-center">
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              رتبه {item.rank}
            </span>
            <button
              onClick={onEdit}
              className="mr-2 text-blue-600 hover:text-blue-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
          </div>
        )}
        
        <button
          onClick={onRemove}
          className="mr-2 text-red-600 hover:text-red-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}