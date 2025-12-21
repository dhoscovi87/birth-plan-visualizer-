
import React from 'react';
import IconCard from './IconCard';
import { BirthPlanItem, Selections, SectionType } from '../types';

interface BirthPlanSectionProps {
  title: string;
  items: BirthPlanItem[];
  selections: Selections;
  onToggle: (id: string) => void;
  onNoteChange: (id: string, note: string) => void;
}

const BirthPlanSection: React.FC<BirthPlanSectionProps> = ({ title, items, selections, onToggle, onNoteChange }) => {
  return (
    <section className="mb-12">
      <div className="flex items-center gap-4 mb-6">
        <h2 className="text-3xl font-serif text-slate-800">{title}</h2>
        <div className="h-px flex-1 bg-slate-200"></div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {items.map(item => (
          <IconCard 
            key={item.id}
            item={item}
            selection={selections[item.id] || { selected: false, note: '' }}
            onToggle={onToggle}
            onNoteChange={onNoteChange}
          />
        ))}
      </div>
    </section>
  );
};

export default BirthPlanSection;
