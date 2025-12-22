
import React from 'react';
import { PlanData } from '../types';
import { Edit2, Sparkles, AlertCircle, Info } from 'lucide-react';

interface PlanPreviewProps {
  data: PlanData;
  summary: string;
  onEditSection: (sectionId: string) => void;
  onReGenerate: () => void;
  isGenerating: boolean;
}

const PlanPreview: React.FC<PlanPreviewProps> = ({ data, summary, onEditSection, onReGenerate, isGenerating }) => {
  const selectedItems = data.items.filter(item => data.selections[item.id]?.selected);

  const laborItems = selectedItems.filter(i => i.category === 'Labor');
  const deliveryItems = selectedItems.filter(i => i.category === 'Delivery');
  const cesareanItems = selectedItems.filter(i => i.category === 'Cesarean');

  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'TBD';
    try {
      // Handle YYYY-MM-DD format from input type="date"
      const parts = dateStr.split('-');
      if (parts.length !== 3) return dateStr;

      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);

      const date = new Date(year, month, day);
      if (isNaN(date.getTime())) return dateStr;

      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (e) {
      return dateStr;
    }
  };

  if (selectedItems.length === 0) {
    return (
      <div className="bg-white p-12 text-center rounded-3xl border-2 border-dashed border-slate-200">
        <AlertCircle className="mx-auto text-slate-300 mb-4" size={48} />
        <h2 className="text-2xl font-serif text-slate-800 mb-2">Nothing selected yet</h2>
        <p className="text-slate-500 mb-6">Go back to the sections to select your preferences.</p>
        <button
          onClick={() => onEditSection('labor')}
          className="bg-indigo-600 text-white px-6 py-2 rounded-full font-bold"
        >
          Start with Labor
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 sm:p-16 shadow-2xl rounded-3xl border border-slate-100 max-w-4xl mx-auto relative overflow-hidden">
      {/* Tip for users (screen only) */}
      <div className="no-print bg-amber-50 border border-amber-100 p-4 rounded-xl mb-8 flex items-start gap-3 animate-in fade-in slide-in-from-top-4 duration-700">
        <Info className="text-amber-500 shrink-0 mt-0.5" size={18} />
        <p className="text-xs text-amber-800 leading-relaxed">
          <span className="font-bold">Tip:</span> To download your visual plan, click "Save as Visual PDF" below and select "Save as PDF" as the destination in the print window.
        </p>
      </div>

      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full -mr-32 -mt-32 opacity-50"></div>

      {/* Document Header */}
      <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start mb-12 border-b-2 border-slate-50 pb-10 gap-8">
        <div className="space-y-1">
          <h1 className="text-5xl font-serif text-slate-900">Birth Wishes</h1>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500 pt-4">
            <div><span className="font-bold text-slate-400 uppercase text-[10px] block mb-1">Expectant Parent</span> {data.patientName || 'TBD'}</div>
            <div><span className="font-bold text-slate-400 uppercase text-[10px] block mb-1">Birth Partner</span> {data.partnerName || 'None'}</div>
            <div><span className="font-bold text-slate-400 uppercase text-[10px] block mb-1">Due Date</span> {formatDate(data.dueDate)}</div>
          </div>
        </div>

        <div className="bg-indigo-900 text-white p-6 rounded-2xl max-w-xs shadow-xl">
          <p className="text-xs leading-relaxed opacity-90 italic">
            "We approach this birth with hope and trust. These wishes represent our ideal path, while remaining flexible to medical necessity for the safety of mother and child."
          </p>
        </div>
      </div>

      {/* Summary View (unified for screen and print) */}
      <div className="relative z-10 mb-16">
        {!summary && !isGenerating ? (
          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 text-center no-print">
            <Sparkles className="mx-auto text-indigo-400 mb-3" />
            <p className="text-slate-600 text-sm mb-4">Want a professional summary for your doctor?</p>
            <button
              onClick={onReGenerate}
              className="bg-indigo-600 text-white px-6 py-2 rounded-full text-xs font-bold"
            >
              Generate AI Summary
            </button>
          </div>
        ) : (
          <div className="bg-indigo-50/50 p-8 rounded-2xl border border-indigo-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-indigo-900 uppercase tracking-widest flex items-center gap-2">
                <Sparkles size={14} className="no-print" /> Care Team Overview
              </h3>
              <button
                onClick={onReGenerate}
                disabled={isGenerating}
                className="no-print text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                <Edit2 size={14} />
              </button>
            </div>
            <div className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">
              {summary || (isGenerating ? "Refining your preferences into a summary..." : "")}
            </div>
          </div>
        )}
      </div>

      {/* Preference Sections */}
      {[
        { id: 'labor', title: 'Laboring & Environment', items: laborItems },
        { id: 'delivery', title: 'Birth & Postpartum', items: deliveryItems },
        { id: 'cesarean', title: 'Cesarean Preferences', items: cesareanItems }
      ].map(section => (
        section.items.length > 0 && (
          <div key={section.id} className="mb-16 last:mb-0 relative group">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-serif text-slate-800">{section.title}</h3>
              <button
                onClick={() => onEditSection(section.id)}
                className="no-print opacity-0 group-hover:opacity-100 flex items-center gap-1 text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full transition-all"
              >
                <Edit2 size={12} /> Edit
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              {section.items.map(item => (
                <div key={item.id} className="flex gap-4">
                  <div className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white shadow-sm ${item.color === 'blue' ? 'bg-indigo-900' : 'bg-rose-500'}`}>
                    {React.cloneElement(item.icon as React.ReactElement, { size: 24, strokeWidth: 1.5 })}
                  </div>
                  <div className="pt-1">
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 mb-1">{item.label}</h4>
                    <p className="text-xs text-slate-600 leading-normal italic font-medium">
                      {data.selections[item.id].note || item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      ))}

      <div className="mt-20 pt-10 border-t border-slate-50 flex flex-col items-center">
        <div className="w-12 h-1 bg-slate-200 rounded-full mb-6"></div>
        <p className="text-[10px] text-slate-400 uppercase tracking-[0.4em] font-bold">Visual Birth Map</p>
      </div>
    </div>
  );
};

export default PlanPreview;
