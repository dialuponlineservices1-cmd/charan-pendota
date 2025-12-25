
import React from 'react';
import { ListChecks, Target, TrendingUp, Sparkles, BookOpen, Layers } from 'lucide-react';

export const SyllabusMatrix = ({ db }: any) => {
  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-10 duration-1000">
      <div className="border-b border-white/5 pb-16">
        <h2 className="text-8xl font-black tracking-tighter text-white uppercase italic">SYLLABUS <span className="text-indigo-500">MATRIX.</span></h2>
        <p className="text-[11px] font-black uppercase text-slate-500 tracking-[0.7em] mt-4">Deep Curriculum Telemetry & Mapping</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-8">
           {db.syllabus.map((s: any) => (
             <div key={s.id} className="bg-slate-950/40 border border-white/5 rounded-[48px] p-12 hover:border-indigo-500/30 transition-all group relative overflow-hidden">
                <div className={`absolute top-0 right-0 w-40 h-40 bg-indigo-600/5 blur-[80px] pointer-events-none`}></div>
                <div className="flex justify-between items-center mb-10">
                   <div className="space-y-2">
                      <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter group-hover:text-indigo-400 transition-colors">{s.name}</h3>
                      <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{s.items} Atomic Concepts Mapped</p>
                   </div>
                   <div className="text-right">
                      <p className="text-5xl font-black text-indigo-500 tracking-tighter">{s.completion}%</p>
                      <p className="text-[9px] font-black text-slate-700 uppercase">MASTERY INDEX</p>
                   </div>
                </div>
                <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden shadow-inner">
                   <div className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-1000" style={{width: `${s.completion}%`}}></div>
                </div>
                <div className="flex gap-4 mt-10">
                   <button className="px-8 py-3 bg-white/5 rounded-xl text-[10px] font-black uppercase text-slate-500 hover:text-white transition-all">Track Progression</button>
                   <button className="px-8 py-3 bg-indigo-600/10 text-indigo-500 rounded-xl text-[10px] font-black uppercase hover:bg-indigo-600 hover:text-white transition-all">Generate Notes</button>
                </div>
             </div>
           ))}
        </div>

        <div className="lg:col-span-4 space-y-10">
           <div className="bg-indigo-600/5 border border-indigo-500/20 rounded-[56px] p-12 space-y-12 h-full flex flex-col justify-between">
              <div className="space-y-8">
                <div className="w-20 h-20 bg-black rounded-3xl flex items-center justify-center text-indigo-500 shadow-2xl"><Sparkles size={36}/></div>
                <h4 className="text-2xl font-black text-white italic uppercase tracking-tighter leading-none">AI SYLLABUS <br/> <span className="text-indigo-500">OPTIMIZER.</span></h4>
                <p className="text-lg font-bold text-slate-400 leading-relaxed italic">"Analyzing your mastery in General Science (90%). Neural recommendation: Pivot study cycles to AP Bifurcation Act nodes to equalize readiness indices."</p>
              </div>
              <button className="w-full bg-indigo-600 py-6 rounded-3xl font-black uppercase tracking-widest text-xs shadow-2xl hover:bg-indigo-500 transition-all">RE-OPTIMIZE CURRICULUM</button>
           </div>
        </div>
      </div>
    </div>
  );
};
