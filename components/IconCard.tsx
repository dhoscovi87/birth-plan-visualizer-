
import React from 'react';
import { BirthPlanItem, UserSelection } from '../types';

interface IconCardProps {
  item: BirthPlanItem;
  selection: UserSelection;
  onToggle: (id: string) => void;
  onNoteChange: (id: string, note: string) => void;
}

const IconCard: React.FC<IconCardProps> = ({ item, selection, onToggle, onNoteChange }) => {
  const isSelected = selection.selected;
  const colorClass = item.color === 'blue' ? 'bg-indigo-900 border-indigo-900' : 'bg-rose-500 border-rose-500';
  const textClass = item.color === 'blue' ? 'text-indigo-900' : 'text-rose-500';

  return (
    <div className={`relative group flex flex-col items-center transition-all duration-300 p-4 rounded-2xl border-2 ${isSelected ? 'border-indigo-400 bg-white shadow-xl scale-[1.02]' : 'border-transparent hover:bg-white/50 bg-transparent'}`}>
      <button 
        onClick={() => onToggle(item.id)}
        title={item.description}
        className={`w-20 h-20 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-110 shadow-sm mb-3 ${colorClass} ${!isSelected && 'opacity-20 grayscale-50 scale-95 hover:opacity-100 hover:grayscale-0'}`}
      >
        {React.cloneElement(item.icon as React.ReactElement, { size: 36, strokeWidth: 1.2 })}
      </button>
      
      <span className={`text-[10px] font-bold uppercase tracking-widest text-center h-8 leading-tight px-1 transition-colors ${isSelected ? textClass : 'text-slate-400 group-hover:text-slate-600'}`}>
        {item.label}
      </span>

      {isSelected && (
        <div className="mt-3 w-full animate-in zoom-in-95 fade-in duration-300">
          <textarea
            placeholder="Add personal note..."
            value={selection.note}
            onChange={(e) => onNoteChange(item.id, e.target.value)}
            className="w-full text-[10px] p-2 border-b border-indigo-100 focus:border-indigo-500 outline-none resize-none bg-transparent text-slate-700 italic"
            rows={2}
          />
        </div>
      )}

      {/* Checkmark indicator */}
      {isSelected && (
        <div className="absolute top-2 right-2 bg-indigo-600 text-white p-1 rounded-full shadow-md scale-110">
          <svg className="w-2 h-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default IconCard;
