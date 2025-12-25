
import React from 'react';
import { Award, Timer, CheckCircle, AlertTriangle, Play, RefreshCw } from 'lucide-react';

export const MockTest = ({ setView }: any) => {
  return (
    <div className="max-w-6xl mx-auto space-y-16 animate-in zoom-in-95 duration-700">
      <div className="bg-slate-900 border border-indigo-500/30 p-20 rounded-[72px] text-center space-y-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-20 opacity-5 rotate-12"><Award size={300}/></div>
        <div className="w-24 h-24 bg-indigo-600 rounded-[40px] flex items-center justify-center mx-auto shadow-2xl animate-pulse"><Timer size={48} className="text-white"/></div>
        <div className="space-y-4">
          <h2 className="text-7xl font-black tracking-tighter text-white uppercase">Neural <span className="text-indigo-500">Arena</span></h2>
          <p className="text-slate-500 font-bold max-w-2xl mx-auto text-xl leading-relaxed">Simulate a high-stakes exam environment with Gemini 3 Pro generating real-time challenging questions.</p>
        </div>
        <div className="flex gap-8 justify-center pt-6">
          <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-black uppercase tracking-widest px-16 py-6 rounded-3xl transition-all shadow-2xl shadow-indigo-600/30 text-lg">Initialize Node</button>
          <button onClick={() => setView('student')} className="bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest px-12 py-6 rounded-3xl hover:bg-white/10 transition-all text-lg">History Cluster</button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-10">
        {['Arithmetic', 'Logical Reasoning', 'General Awareness'].map(cat => (
          <div key={cat} className="bg-slate-950/40 backdrop-blur-3xl border border-white/5 rounded-[48px] p-12 text-center space-y-8 hover:border-indigo-500 transition-all group cursor-pointer">
            <h4 className="text-3xl font-black text-white uppercase tracking-tighter group-hover:text-indigo-400 transition-colors">{cat}</h4>
            <div className="flex justify-center gap-6 text-[10px] font-black uppercase text-slate-600 tracking-widest">
              <span>50 Qs</span>
              <span>60 Mins</span>
            </div>
            <button className="w-full bg-white/5 py-4 rounded-2xl text-slate-500 group-hover:bg-white group-hover:text-black font-black uppercase tracking-widest transition-all">Start Session</button>
          </div>
        ))}
      </div>
    </div>
  );
};
