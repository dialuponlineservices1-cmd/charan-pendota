import React from 'react';
import { Layers, Boxes } from 'lucide-react';

export const MindPalace = ({ db, setView }: any) => {
  return (
    <div className="space-y-12 animate-in fade-in duration-1000 pb-20">
      <div className="text-center space-y-4">
        <h2 className="text-7xl font-black italic tracking-tighter text-white uppercase leading-none">MIND <br/><span className="text-pink-500">PALACE.</span></h2>
        <p className="text-[10px] font-black text-slate-900 uppercase tracking-[4em] italic leading-none">SECTORAL_SPATIAL_REGISTRY_V15</p>
      </div>

      <div className="bg-[#050505] border border-white/5 rounded-[60px] p-12 h-[800px] relative overflow-hidden shadow-4xl group">
         <div className="absolute inset-0 bg-pink-600/5 blur-[100px] animate-pulse"></div>
         
         <div className="relative w-full h-full flex items-center justify-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 scale-90">
               {db.jobs.slice(0, 8).map((j: any, i: number) => (
                  <div key={i} className="relative group/cube cursor-pointer" onClick={() => setView('magic-editor')}>
                     <div className="w-40 h-40 bg-black border border-white/10 group-hover/cube:border-pink-600 transition-all duration-700 shadow-4xl flex flex-col items-center justify-center p-4 text-center space-y-4 relative overflow-hidden">
                        <div className="absolute inset-0 bg-pink-600/5 opacity-0 group-hover/cube:opacity-100 transition-opacity"></div>
                        <Layers size={24} className="text-slate-900 group-hover/cube:text-pink-500 transition-colors"/>
                        <h4 className="text-[10px] font-black text-white italic uppercase tracking-tighter leading-none line-clamp-2">{j.title_en}</h4>
                        <div className="bg-white/5 px-2 py-1 rounded-full border border-white/5">
                           <p className="text-[8px] font-black text-slate-800 uppercase tracking-widest">{j.org}</p>
                        </div>
                     </div>
                     <div className="absolute -top-2 -right-2 w-6 h-6 bg-pink-600 rounded-full animate-ping opacity-20"></div>
                  </div>
               ))}
            </div>
         </div>

         <div className="absolute bottom-8 right-8 text-right space-y-2 z-10 pointer-events-none">
            <div className="flex items-center justify-end gap-2 text-pink-500">
               <span className="text-xs font-black uppercase tracking-widest italic">SPATIAL_SYNC: FULL</span>
               <div className="w-2 h-2 bg-pink-500 rounded-full animate-ping"></div>
            </div>
            <p className="text-2xl font-black text-white italic leading-none tracking-tighter opacity-10">GOD_EYE_VIEW</p>
         </div>
      </div>
    </div>
  );
};