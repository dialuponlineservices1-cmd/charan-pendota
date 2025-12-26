
import React, { useState, useEffect } from 'react';
import { Map, MapPin, Activity, Zap, TrendingUp, Users, Target, Globe } from 'lucide-react';

export const ImperialPulse = ({ db }: any) => {
  const [activeNodes, setActiveNodes] = useState(db.analytics.activeNow);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNodes((prev: number) => prev + Math.floor(Math.random() * 1000 - 400));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const regions = [
    { name: "HYDERABAD_CENTRAL", activity: 98, trend: "EXPLOSING", color: "emerald", coords: "top-[20%] left-[45%]" },
    { name: "VIZAG_PORT_SECTOR", activity: 84, trend: "STABLE", color: "blue", coords: "top-[40%] right-[15%]" },
    { name: "WARANGAL_GRID", activity: 72, trend: "SCALING", color: "yellow", coords: "top-[25%] left-[55%]" },
    { name: "VIJAYAWADA_NUCLEUS", activity: 91, trend: "PEAK_LOAD", color: "pink", coords: "bottom-[30%] right-[30%]" },
    { name: "GUNTUR_CLUSTER", activity: 65, trend: "ACTIVE", color: "purple", coords: "bottom-[25%] right-[35%]" },
  ];

  return (
    <div className="space-y-200 animate-in fade-in duration-1000 pb-[1000px]">
      <div className="text-center space-y-48">
        <h2 className="text-[350px] font-black italic tracking-tighter text-white uppercase leading-[0.35] italic">IMPERIAL <br/><span className="text-emerald-500">PULSE.</span></h2>
        <p className="text-[56px] font-black text-slate-900 uppercase tracking-[4em] italic leading-none">GEO_NEURAL_DENSITY_MAP_V12</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-150">
         {/* THE MAP VISUALIZER */}
         <div className="lg:col-span-8 bg-[#050505] border-[40px] border-white/5 rounded-[1200px] p-200 h-[2200px] relative overflow-hidden shadow-4xl group">
            <div className="absolute inset-0 bg-emerald-500/5 blur-[500px] animate-pulse"></div>
            
            <div className="relative w-full h-full flex items-center justify-center">
               <Globe className="text-slate-900 absolute opacity-20 animate-spin-slow" size={1500}/>
               
               {/* GEO NODES */}
               {regions.map((r, i) => (
                  <div key={i} className={`absolute ${r.coords} group/node cursor-crosshair`}>
                     <div className={`w-32 h-32 bg-${r.color}-500 rounded-full animate-ping opacity-50`}></div>
                     <div className={`absolute inset-0 w-32 h-32 bg-${r.color}-600 rounded-full border-[10px] border-black shadow-[0_0_100px_${r.color}]`}></div>
                     <div className="absolute top-40 left-1/2 -translate-x-1/2 bg-black/80 border border-white/10 px-32 py-12 rounded-full whitespace-nowrap opacity-0 group-hover/node:opacity-100 transition-opacity">
                        <p className="text-3xl font-black text-white italic">{r.name}</p>
                        <p className={`text-xl font-bold text-${r.color}-500`}>{r.activity}% LOAD • {r.trend}</p>
                     </div>
                  </div>
               ))}
            </div>

            <div className="absolute bottom-150 left-150 space-y-48 z-10">
               <div className="flex items-center gap-32 text-emerald-500">
                  <div className="w-12 h-12 bg-emerald-500 rounded-full animate-ping"></div>
                  <span className="text-[48px] font-black uppercase tracking-widest italic">REAL_TIME_SYNC: ACTIVE</span>
               </div>
               <div className="bg-black/60 backdrop-blur-3xl p-100 rounded-[200px] border-[10px] border-white/10 shadow-4xl">
                  <span className="text-[200px] font-black text-white italic leading-none">{activeNodes.toLocaleString()}</span>
                  <p className="text-[42px] font-black text-emerald-500 uppercase tracking-[2em] mt-24">GLOBAL_ASPIRANT_NODES</p>
               </div>
            </div>
         </div>

         {/* STATS COLUMN */}
         <div className="lg:col-span-4 space-y-120">
            {regions.map((r, i) => (
               <div key={i} className="bg-black border-[20px] border-white/5 rounded-[500px] p-100 flex items-center justify-between group hover:border-emerald-500 transition-all shadow-4xl relative overflow-hidden">
                  <div className="flex items-center gap-64 relative z-10">
                     <div className={`w-48 h-48 bg-${r.color}-600 rounded-full flex items-center justify-center text-white border-[10px] border-black shadow-4xl`}>
                        <MapPin size={48}/>
                     </div>
                     <div>
                        <h4 className="text-6xl font-black text-white italic uppercase tracking-tighter">{r.name}</h4>
                        <p className="text-[24px] font-black text-slate-800 uppercase tracking-widest mt-12">{r.trend}</p>
                     </div>
                  </div>
                  <div className="text-right relative z-10">
                     <div className="text-8xl font-black text-white italic leading-none">{r.activity}%</div>
                     <div className="flex items-center justify-end gap-12 text-emerald-500 text-3xl font-black mt-12">
                        <TrendingUp size={32}/> +{Math.floor(Math.random() * 20)}%
                     </div>
                  </div>
               </div>
            ))}

            <div className="bg-emerald-600/10 border-[25px] border-emerald-600/30 p-150 rounded-[600px] text-center space-y-64 shadow-4xl relative overflow-hidden group">
               <div className="absolute inset-0 bg-emerald-600/5 animate-pulse"></div>
               <Users size={200} className="text-emerald-500 mx-auto animate-bounce"/>
               <h3 className="text-7xl font-black italic uppercase text-white tracking-tighter leading-none">TARGETING_READY</h3>
               <p className="text-4xl font-bold text-slate-500 italic leading-relaxed">"Suggesting immediate ad-injection for HYDERABAD_CENTRAL. CPC yield is currently 4.2x above global average."</p>
            </div>
         </div>
      </div>
    </div>
  );
};
