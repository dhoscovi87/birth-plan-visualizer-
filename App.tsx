
import React, { useState, useEffect } from 'react';
import { BIRTH_PLAN_OPTIONS } from './constants';
import { Selections, PlanData } from './types';
import Header from './components/Header';
import BirthPlanSection from './components/BirthPlanSection';
import PlanPreview from './components/PlanPreview';
import { generatePlanSummary } from './services/gemini';
import { Sparkles, User, Calendar, Heart, ChevronRight, ChevronLeft, Download } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('landing');
  const [selections, setSelections] = useState<Selections>({});
  const [patientName, setPatientName] = useState('');
  const [partnerName, setPartnerName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [summary, setSummary] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('birth-plan-state');
    if (saved) {
      const parsed = JSON.parse(saved);
      setSelections(parsed.selections || {});
      setPatientName(parsed.patientName || '');
      setPartnerName(parsed.partnerName || '');
      setDueDate(parsed.dueDate || '');
      if (parsed.activeTab) setActiveTab(parsed.activeTab);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('birth-plan-state', JSON.stringify({
      selections, patientName, partnerName, dueDate, activeTab
    }));
  }, [selections, patientName, partnerName, dueDate, activeTab]);

  const toggleItem = (id: string) => {
    setSelections(prev => ({
      ...prev,
      [id]: {
        selected: !prev[id]?.selected,
        note: prev[id]?.note || ''
      }
    }));
  };

  const handleNoteChange = (id: string, note: string) => {
    setSelections(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        note
      }
    }));
  };

  const handleGeneratePlan = async () => {
    console.log("handleGeneratePlan started");
    setIsGenerating(true);
    const data: PlanData = {
      items: BIRTH_PLAN_OPTIONS,
      selections,
      patientName,
      partnerName,
      dueDate
    };
    try {
      console.log("Calling generatePlanSummary service...");
      const aiSummary = await generatePlanSummary(data);
      console.log("Summary received:", aiSummary.substring(0, 50) + "...");
      setSummary(aiSummary);
      setIsGenerating(false);
      setActiveTab('preview');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error("Error in handleGeneratePlan:", error);
      setIsGenerating(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const laborItems = BIRTH_PLAN_OPTIONS.filter(i => i.category === 'Labor');
  const deliveryItems = BIRTH_PLAN_OPTIONS.filter(i => i.category === 'Delivery');
  const cesareanItems = BIRTH_PLAN_OPTIONS.filter(i => i.category === 'Cesarean');

  const renderContent = () => {
    switch (activeTab) {
      case 'landing':
        return (
          <div className="animate-in fade-in zoom-in duration-700 max-w-4xl mx-auto text-center py-20">
            <div className="mb-8 inline-flex items-center justify-center w-20 h-20 bg-indigo-100 rounded-3xl text-indigo-600 shadow-inner">
              <Sparkles size={40} />
            </div>
            <h1 className="text-6xl font-serif text-slate-900 mb-6 leading-tight">
              Visualize Your <span className="text-indigo-600 italic">Birth Journey</span>
            </h1>
            <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              A specialized tool designed to help you communicate your unique birth preferences clearly and professionally with your medical team.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setActiveTab('labor')}
                className="bg-indigo-600 text-white px-10 py-5 rounded-full font-bold text-lg shadow-2xl hover:bg-indigo-700 hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
              >
                Create My Birth Plan <ChevronRight size={24} />
              </button>
              <button
                onClick={() => {
                  const saved = localStorage.getItem('birth-plan-state');
                  if (saved) {
                    setActiveTab('preview');
                  } else {
                    alert("No saved plan found. Let's start a new one!");
                    setActiveTab('labor');
                  }
                }}
                className="bg-white text-slate-600 px-10 py-5 rounded-full font-bold text-lg border border-slate-200 hover:bg-slate-50 transition-all"
              >
                View Saved Plan
              </button>
            </div>

            <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500">
                  <Heart size={24} />
                </div>
                <h3 className="text-lg font-bold text-slate-800">Intuitive Selection</h3>
                <p className="text-sm text-slate-500 leading-relaxed">Choose from over 50+ options across labor, delivery, and cesarean scenarios.</p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-500">
                  <Sparkles size={24} />
                </div>
                <h3 className="text-lg font-bold text-slate-800">AI-Powered Summary</h3>
                <p className="text-sm text-slate-500 leading-relaxed">Transform your selections into a professional cover letter for your care team.</p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white">
                  <Download size={24} />
                </div>
                <h3 className="text-lg font-bold text-slate-800">Visual PDF Export</h3>
                <p className="text-sm text-slate-500 leading-relaxed">Generate a beautiful, easy-to-read document to print and bring to the hospital.</p>
              </div>
            </div>
          </div>
        );
      case 'labor':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <BirthPlanSection
              title="Labor Preferences"
              items={laborItems}
              selections={selections}
              onToggle={toggleItem}
              onNoteChange={handleNoteChange}
            />
            <div className="flex justify-end mt-8">
              <button
                onClick={() => setActiveTab('delivery')}
                className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:bg-indigo-700 transition-all"
              >
                Next: Delivery <ChevronRight size={18} />
              </button>
            </div>
          </div>
        );
      case 'delivery':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <BirthPlanSection
              title="Post-Delivery Care"
              items={deliveryItems}
              selections={selections}
              onToggle={toggleItem}
              onNoteChange={handleNoteChange}
            />
            <div className="flex justify-between mt-8">
              <button
                onClick={() => setActiveTab('labor')}
                className="flex items-center gap-2 bg-slate-200 text-slate-700 px-6 py-3 rounded-full font-bold hover:bg-slate-300 transition-all"
              >
                <ChevronLeft size={18} /> Back: Labor
              </button>
              <button
                onClick={() => setActiveTab('cesarean')}
                className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:bg-indigo-700 transition-all"
              >
                Next: Cesarean <ChevronRight size={18} />
              </button>
            </div>
          </div>
        );
      case 'cesarean':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <BirthPlanSection
              title="Cesarean Preferences"
              items={cesareanItems}
              selections={selections}
              onToggle={toggleItem}
              onNoteChange={handleNoteChange}
            />
            <div className="flex justify-between mt-8">
              <button
                onClick={() => setActiveTab('delivery')}
                className="flex items-center gap-2 bg-slate-200 text-slate-700 px-6 py-3 rounded-full font-bold hover:bg-slate-300 transition-all"
              >
                <ChevronLeft size={18} /> Back: Delivery
              </button>
              <button
                onClick={handleGeneratePlan}
                disabled={isGenerating}
                className="flex items-center gap-2 bg-indigo-600 text-white px-8 py-3 rounded-full font-bold shadow-xl hover:bg-indigo-700 transition-all scale-105"
              >
                {isGenerating ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Finalizing...
                  </>
                ) : (
                  <>
                    <Sparkles size={18} /> Generate Final Plan
                  </>
                )}
              </button>
            </div>
          </div>
        );
      case 'preview':
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <PlanPreview
              data={{ items: BIRTH_PLAN_OPTIONS, selections, patientName, partnerName, dueDate }}
              summary={summary}
              onEditSection={(sectionId) => setActiveTab(sectionId)}
              onReGenerate={handleGeneratePlan}
              isGenerating={isGenerating}
            />
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-12 mb-20 no-print">
              <button
                onClick={handlePrint}
                className="bg-slate-900 text-white px-12 py-4 rounded-full font-bold shadow-2xl flex items-center gap-3 hover:scale-105 active:scale-95 transition-all"
              >
                <Download size={20} /> Download / Save as PDF
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 max-w-6xl mx-auto px-4 py-8 w-full">
        {activeTab !== 'preview' && activeTab !== 'landing' && (
          <div className="no-print bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-8 grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-300">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                <User size={12} /> Patient Name
              </label>
              <input
                type="text"
                value={patientName}
                onChange={e => setPatientName(e.target.value)}
                className="w-full bg-slate-50 border-transparent focus:bg-white focus:border-indigo-300 rounded-lg p-2 text-sm transition-all outline-none"
                placeholder="Jane Doe"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                <Heart size={12} /> Partner Name
              </label>
              <input
                type="text"
                value={partnerName}
                onChange={e => setPartnerName(e.target.value)}
                className="w-full bg-slate-50 border-transparent focus:bg-white focus:border-indigo-300 rounded-lg p-2 text-sm transition-all outline-none"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                <Calendar size={12} /> Due Date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={e => setDueDate(e.target.value)}
                className="w-full bg-slate-50 border-transparent focus:bg-white focus:border-indigo-300 rounded-lg p-2 text-sm transition-all outline-none"
              />
            </div>
          </div>
        )}

        {renderContent()}
      </main>

      <footer className="bg-slate-900 text-slate-400 py-12 no-print">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-xs uppercase tracking-[0.2em] font-bold text-slate-500 mb-4">Birth Plan Visualizer</p>
          <p className="text-[10px] max-w-md mx-auto text-slate-600">
            This tool is designed to facilitate communication between you and your healthcare providers.
            It is not a medical document and doesn't replace professional medical advice.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
