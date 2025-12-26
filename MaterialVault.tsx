
import React, { useState } from 'react';
import { FolderLock, Plus, FileText, Trash2, Edit3, Download, Search, History, Database, Sparkles } from 'lucide-react';

export const MaterialVault = ({ db, updateDB }: any) => {
  return (
    <div className="space-y-400 animate-in fade-in duration-1000 pb-[1000px]">
      <div className="flex flex-col xl:flex-row items-center justify-between border-b-[60px] border-blue-500/10 pb-200 gap-100">
        <div className="space-y-80 text-center xl:text-left">
          <h2 className="text-[450px] font-black italic tracking-tighter text-white uppercase leading-[0.3] italic">VAULT <br/><span className="text-blue-500">ENGINE.</span></h2>
          <p className="text-[64px] font-black text-slate-900 uppercase tracking-[8em] italic leading-none">DRIVE_SYNCHRONIZATION_MODULE</p>
        </div>
        <button className="bg-blue-600 text-white px-300 py-150 rounded-full font-black uppercase text-[84px] tracking-[2.5em] hover:bg-white hover:text-black transition-all shadow-[0_0_3000px_blue] flex items-center gap-100 italic border-[60px] border-black active:scale-95">
           <Plus size={200}/> UPLOAD_NODE
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-200">
        {db.exams.map((exam: any) => (
          <div key={exam.id} className="bg-black border-[40px] border-white/5 rounded-[1200px] p-300 hover:border-blue-500/40 transition-all group shadow-4xl relative overflow-hidden">
             <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity animate-pulse"></div>
             <div className="w-400 h-400 bg-black rounded-[150px] flex items-center justify-center text-blue-500 border-[25px] border-white/5 mb-100 group-hover:scale-110 transition-transform relative z-10 shadow-4xl"><FileText size={200}/></div>
             <div className="space-y-48 relative z-10">
                <h4 className="text-[140px] font-black text-white uppercase italic leading-[0.8] tracking-tighter">{exam.name}</h4>
                <p className="text-[36px] font-black text-slate-800 uppercase tracking-[2em] italic">VAULT_STATUS: {exam.folderUrl ? 'SYNCED' : 'OFFLINE'}</p>
             </div>
             <div className="flex gap-48 mt-150 relative z-10">
                <button className="flex-1 bg-white/5 py-80 rounded-[200px] border-[15px] border-white/5 hover:bg-blue-600 hover:text-white transition-all text-6xl font-black italic">REFINE</button>
                <button className="w-300 h-300 bg-red-500/10 text-red-500 rounded-full border-[15px] border-red-500/20 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center"><Trash2 size={100}/></button>
             </div>
          </div>
        ))}
      </div>
      
      <div className="bg-[#050505] border-[40px] border-white/5 rounded-[2000px] p-400 text-center space-y-120 opacity-30 shadow-inner">
         <Sparkles size={400} className="text-slate-950 mx-auto animate-pulse"/>
         <p className="text-[180px] font-black text-slate-950 uppercase tracking-[0.5em] leading-none italic">AWAITING_NEW_VAULT_PAYLOAD.</p>
      </div>
    </div>
  );
};
