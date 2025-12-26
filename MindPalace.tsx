
import React, { useState } from 'react';
import { Cubes, Database, Target, Zap, Search, ArrowRight, ShieldCheck, Box, Boxes, Layers } from 'lucide-react';

export const MindPalace = ({ db, setView }: any) => {
  return (
    <div className="space-y-300 animate-in fade-in duration-1000 pb-[1000px]">
      <div className="text-center space-y-48">
        <h2 className="text-[350px] font-black italic tracking-tighter text-white uppercase leading-[0.35] italic">MIND <br/><span className="text-pink-500">PALACE.</span></h2>
        <p className="text-[56px] font-black text-slate-900 uppercase tracking-[4em] italic leading-none">SECTORAL_SPATIAL_REGISTRY_V15</p>
      </div>

      <div className="bg-[#050505] border-[40px] border-white/5 rounded-[1200px] p-200 h-[3500px] relative overflow-hidden shadow-4xl group">
         <div className="absolute inset-0 bg-pink-600/5 blur-[500px] animate-pulse"></div>
         
         <div className="relative w-full h-full flex items-center justify-center perspective-1000">
            <div className="grid grid-cols-4 gap-150 rotate-x-12 rotate-z-12 scale-90">
               {db.jobs.map((j: any, i: number) => (
                  <div key={i} className="relative group/cube cursor-pointer" onClick={() => setView('magic-editor')}>
                     <div className="w-[500px] h-[500px] bg-black border-[15px] border-white/10 group-hover/cube:border-pink-600 transition-all duration-700 shadow-4xl flex flex-col items-center justify-center p-80 text-center space-y-48 relative overflow-hidden">
                        <div className="absolute inset-0 bg-pink-600/5 opacity-0 group-hover/cube:opacity-100 transition-opacity"></div>
                        <Layers size={120} className="text-slate-900 group-hover/cube:text-pink-500 transition-colors"/>
                        <h4 className="text-5xl font-black text-white italic uppercase tracking-tighter leading-none line-clamp-2">{j.title_en}</h4>
                        <div className="bg-white/5 px-32 py-12 rounded-full border border-white/5">
                           <p className="text-xl font-black text-slate-800 uppercase tracking-widest">{j.org}</p>
                        </div>
                     </div>
                     <div className="absolute -top-10 -right-10 w-24 h-24 bg-pink-600 rounded-full animate-ping opacity-20"></div>
                  </div>
               ))}
            </div>
         </div>

         <div className="absolute bottom-150 right-150 text-right space-y-48 z-10 pointer-events-none">
            <div className="flex items-center justify-end gap-32 text-pink-500">
               <span className="text-[48px] font-black uppercase tracking-widest italic">SPATIAL_SYNC: FULL</span>
               <div className="w-12 h-12 bg-pink-500 rounded-full animate-ping"></div>
            </div>
            <p className="text-[180px] font-black text-white italic leading-none tracking-tighter opacity-10">GOD_EYE_VIEW</p>
         </div>
      </div>
    </div>
  );
};
