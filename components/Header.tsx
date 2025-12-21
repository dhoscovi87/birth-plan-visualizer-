
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-100 py-6 sticky top-0 z-50 shadow-sm no-print">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif text-indigo-900 font-bold tracking-tight">Birth Plan Visualizer</h1>
          <p className="text-sm text-slate-500 font-medium">Communicate your vision with care</p>
        </div>
        <div className="hidden sm:flex gap-6">
          <a href="#labor" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">Labor</a>
          <a href="#delivery" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">Delivery</a>
          <a href="#cesarean" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">Cesarean</a>
          <a href="#preview" className="text-sm font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">Review Plan</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
