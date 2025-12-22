
import React from 'react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'labor', label: 'Labor' },
    { id: 'delivery', label: 'Delivery' },
    { id: 'cesarean', label: 'Cesarean' },
    { id: 'preview', label: 'Review Plan', special: true },
  ];

  return (
    <header className="bg-white border-b border-slate-100 py-6 sticky top-0 z-50 shadow-sm no-print">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1
            className="text-2xl font-serif text-indigo-900 font-bold tracking-tight cursor-pointer"
            onClick={() => setActiveTab('landing')}
          >
            Birth Plan Visualizer
          </h1>
          <p className="text-xs text-slate-500 font-medium">Communicate your vision with care</p>
        </div>
        <nav className="flex items-center gap-2 sm:gap-4 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${activeTab === tab.id
                  ? tab.special
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-indigo-50 text-indigo-700 border border-indigo-100'
                  : tab.special
                    ? 'text-indigo-600 bg-white border border-indigo-200 hover:bg-indigo-50'
                    : 'text-slate-500 hover:text-indigo-600 hover:bg-slate-50'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
