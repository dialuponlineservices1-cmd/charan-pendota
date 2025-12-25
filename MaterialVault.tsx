
import React, { useState } from 'react';
import { FolderLock, Plus, FileText, Trash2, Edit3, Download, Search, History } from 'lucide-react';

export const MaterialVault = ({ db, updateDB }: any) => {
  return (
    <div className="space-y-16 animate-in fade-in duration-700">
      <div className="bg-slate-950/40 border border-white/5 p-12 rounded-[64px] flex flex-col xl:flex-row justify-between items-center gap-12 shadow-3xl">
        <div className="space-y-4 text-center xl:text-left">
          <h2 className="text-8xl font-black tracking-tighter text-white uppercase italic leading-none">MATERIAL <span className="text-emerald-500">VAULT.</span></h2>
          <p className="text-[11px] font-black uppercase text-slate-700 tracking-[0.9em]">Syllabus & Previous Papers Library</p>
        </div>
        <button className="bg-emerald-600 text-white px-12 py-7 rounded-[32px] text-[11px] font-black uppercase tracking-widest hover:bg-emerald-500 transition-all shadow-3xl flex items-center gap-4 active:scale-95">
          <Plus size={20}/> UPLOAD MATERIAL
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-12">
        {db.materials.map((m: any) => (
          <div key={m.id} className="bg-slate-950 border border-white/5 rounded-[56px] p-12 hover:border-emerald-500/40 transition-all group shadow-2xl">
             <div className="w-20 h-20 bg-black rounded-3xl flex items-center justify-center text-emerald-500 border border-white/10 mb-8 group-hover:scale-110 transition-transform"><FileText size={32}/></div>
             <h4 className="text-2xl font-black text-white uppercase italic leading-tight mb-4">{m.title}</h4>
             <p className="text-[10px] font-black text-slate-700 uppercase tracking-widest mb-10">{m.category} • {m.type}</p>
             <div className="flex gap-4">
                <button className="flex-1 bg-white/5 py-4 rounded-2xl border border-white/10 hover:bg-white/10 transition-all"><Edit3 size={18} className="mx-auto"/></button>
                <button className="flex-1 bg-red-500/10 text-red-500 py-4 rounded-2xl border border-red-500/20 hover:bg-red-500 hover:text-white transition-all"><Trash2 size={18} className="mx-auto"/></button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};
