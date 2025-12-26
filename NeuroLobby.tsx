
import React, { useState } from 'react';
import { BoxSelect, Network, Zap, Target, Activity, MapPin, Globe, Compass, Box } from 'lucide-react';

export const NeuroLobby = ({ db }: any) => {
  const sectors = [
    { name: "TS_GOVT", density: 88, nodes: 420, color: "cyan" },
    { name: "AP_GOVT", density: 74, nodes: 310, color: "blue" },
    { name: "PRIVATE", density: 92, nodes: 850, color: "pink" },
    { name: "ENTRANCE", density: 64, nodes: 120, color: "yellow" },
    { name: "BANKING", density: 55, nodes: 90, color: "emerald" },
    { name: "DEFENSE", density: 42, nodes: 60, color: "red" },
  ];

  return (
    <div className="space-y-300 animate-in fade-in duration-1000 pb-[1000px]">
      <div className="text-center space-y-48">
        <h2 className="text-[350px] font-black italic tracking-tighter text-white uppercase leading-[0.35] italic">NEURO <br/><span className="text-cyan-500">LOBBY.</span></h2>
        <p className="text-[56px] font-black text-slate-900 uppercase tracking-[4em] italic leading-none">SECTOR_DENSITY_ARCHITECTURE_V15</p>
      </div>

      <div className="bg-[#050505] border-[40px] border-white/5 rounded-[1200px] p-200 h-[2500px] relative overflow-hidden shadow-4xl group">
         <div className="absolute inset-0 bg-cyan-600/5 blur-[500px] animate-pulse"></div>
         
         <div className="relative w-full h-full flex items-center justify-center perspective-1000">
            <div className="grid grid-cols-3 gap-100 rotate-x-45 rotate-z-45 scale-110">
               {sectors.map((s, i) => (
                  <div key={i} className="relative group/building cursor-crosshair">
                     <div 
                        className={`w-[400px] bg-${s.color}-600/20 border-[10px] border-${s.color}-500 transition-all duration-700 group-hover/building:bg-${s.color}-500 group-hover/building:scale-110 shadow-[0_0_200px_${s.color}]`}
                        style={{ height: `${s.density * 10}px` }}
                     >
                        <div className="absolute top-0 left-0 w-full h-[50px] bg-white/20 animate-pulse"></div>
                     </div>
                     <div className="absolute -bottom-100 left-1/2 -translate-x-1/2 whitespace-nowrap text-center space-y-24 opacity-0 group-hover/building:opacity-100 transition-opacity">
                        <h4 className="text-8xl font-black text-white italic uppercase tracking-tighter leading-none">{s.name}</h4>
                        <p className="text-4xl font-black text-cyan-500 uppercase tracking-widest">{s.nodes} NODES ACTIVE</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         <div className="absolute bottom-150 right-150 text-right space-y-48 z-10">
            <div className="flex items-center justify-end gap-32 text-cyan-500">
               <span className="text-[48px] font-black uppercase tracking-widest italic">LATTICE_HEALTH: MAX</span>
               <div className="w-12 h-12 bg-cyan-500 rounded-full animate-ping"></div>
            </div>
            <p className="text-[120px] font-black text-white italic leading-none tracking-tighter">PRIME_RENDER_4K</p>
         </div>
      </div>
    </div>
  );
};
