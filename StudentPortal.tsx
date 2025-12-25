
import React from 'react';
import { User, Award, Bookmark, ChevronRight, BarChart3, Radio } from 'lucide-react';

export const StudentPortal = ({ db, setView }: any) => {
  return (
    <div className="space-y-20 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12 bg-white p-16 rounded-[64px] shadow-3xl text-black">
        <div className="flex items-center gap-10">
          <div className="w-24 h-24 bg-indigo-600 rounded-[36px] flex items-center justify-center text-white shadow-2xl"><User size={48}/></div>
          <div>
            <h2 className="text-6xl font-black tracking-tighter">Aspirant <span className="text-slate-400">Node.</span></h2>
            <p className="text-slate-500 font-black uppercase text-[11px] tracking-[0.5em] mt-2">Personal Growth Terminal</p>
          </div>
        </div>
        <div className="flex gap-4">
          <button onClick={() => setView('mock-test')} className="bg-black text-white font-black uppercase tracking-widest px-10 py-5 rounded-2xl hover:bg-slate-900 transition-all shadow-xl">Start Mock</button>
          <button onClick={() => setView('resume-builder')} className="bg-white border border-black/10 text-black font-black uppercase tracking-widest px-10 py-5 rounded-2xl hover:bg-slate-100 transition-all">Edit Profile</button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8">
          <div className="bg-slate-950/40 backdrop-blur-3xl border border-white/5 rounded-[48px] p-16 space-y-12 h-full">
            <h3 className="text-3xl font-black text-white flex items-center gap-6"><Bookmark className="text-indigo-500" size={32}/> Saved <span className="text-indigo-500">Registry</span></h3>
            <div className="grid md:grid-cols-2 gap-8">
              {db.jobs.slice(0, 4).map((j: any) => (
                <div key={j.id} className="p-10 bg-white/5 border border-white/10 rounded-[48px] hover:border-indigo-500/50 transition-all group cursor-pointer" onClick={() => setView('manage-jobs')}>
                  <h4 className="text-2xl font-black text-white mb-4 group-hover:text-indigo-400 transition-all">{j.title}</h4>
                  <p className="text-[10px] font-black uppercase text-slate-600 tracking-widest mb-10">{j.org}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-emerald-500 uppercase">Apply Active</span>
                    <ChevronRight size={20}/>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:col-span-4">
          <div className="bg-slate-950/40 backdrop-blur-3xl border border-white/5 rounded-[48px] p-12 space-y-12 h-full">
            <h4 className="text-[11px] font-black uppercase text-slate-500 tracking-widest flex items-center gap-3"><BarChart3 size={16}/> Mastery Heatmap</h4>
            <div className="space-y-12">
              {Object.entries(db.competencies).map(([subj, score]: any) => (
                <div key={subj} className="space-y-5">
                  <div className="flex justify-between items-end">
                    <p className="text-2xl font-black text-white uppercase tracking-tighter">{subj}</p>
                    <span className="text-sm font-black text-indigo-400">{score}%</span>
                  </div>
                  <div className="h-6 bg-white/5 rounded-full p-1.5 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-indigo-600 to-blue-500 rounded-full shadow-[0_0_20px_rgba(79,70,229,0.5)]" style={{width: `${score}%`}}></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-8 border-t border-white/5">
               <div className="flex items-center gap-4 text-emerald-500"><Radio size={16} className="animate-pulse"/><span className="text-[10px] font-black uppercase tracking-widest">Protocol Sync Active</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
