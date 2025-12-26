
import React, { useState, useEffect } from 'react';
import { Globe, Zap, Target, Users, MapPin, Activity } from 'lucide-react';

export const GlobalNexus = ({ db }: any) => {
  const [activeNodes, setActiveNodes] = useState(db.analytics.activeNow);
  const [pings, setPings] = useState<{id: number, x: number, y: number}[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNodes(prev => prev + Math.floor(Math.random() * 500 - 200));
      const newPing = { id: Date.now(), x: Math.random() * 100, y: Math.random() * 100 };
      setPings(prev => [...prev.slice(-20), newPing]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-100 animate-in fade-in duration-1000">
      <div className="text-center space-y-24">
        <h2 className="text-[180px] font-black italic tracking-tighter text-white uppercase leading-none">GLOBAL <span className="text-indigo-600">NEXUS</span></h2>
        <p className="text-[32px] font-black text-slate-900 uppercase tracking-[4em] italic">PLANETARY_NEURAL_MONITOR</p>
      </div>

      <div className="bg-[#050505] border-[25px] border-white/5 rounded-[600px] p-200 h-[2200px] relative overflow-hidden shadow-4xl group">
         <div className="absolute inset-0 bg-indigo-600/5 blur-[500px] animate-pulse"></div>
         
         <div className="relative w-full h-full flex items-center justify-center">
            {/* SIMULATED 3D GLOBE */}
            <div className="w-[1800px] h-[1800px] rounded-full border-[2px] border-indigo-500/20 relative animate-spin-slow">
                <div className="absolute inset-0 rounded-full border-t-[15px] border-indigo-600 opacity-50 shadow-[0_0_100px_indigo]"></div>
                <div className="absolute inset-40 rounded-full border-[1px] border-white/5"></div>
                <div className="absolute inset-80 rounded-full border-[1px] border-white/5"></div>
            </div>

            {/* PING PARTICLES */}
            {pings.map(p => (
              <div key={p.id} className="absolute w-24 h-24 bg-red-600 rounded-full animate-ping opacity-60 shadow-[0_0_80px_red]" style={{ left: `${p.x}%`, top: `${p.y}%` }}></div>
            ))}

            <div className="absolute text-center space-y-48 z-10 pointer-events-none">
               <h3 className="text-[800px] font-black italic text-white leading-none tracking-tighter opacity-[0.04]">EARTH</h3>
               <div className="bg-black/60 backdrop-blur-3xl p-100 rounded-[200px] border-[10px] border-white/10 shadow-4xl">
                  <span className="text-[200px] font-black text-white italic">{activeNodes.toLocaleString()}</span>
                  <p className="text-[42px] font-black text-indigo-500 uppercase tracking-[2em] mt-24">LIVE_NEURONS_SYNCED</p>
               </div>
            </div>
         </div>

         <div className="absolute bottom-150 left-150 right-150 grid grid-cols-3 gap-80">
            {[
               { l: "Primary Sector", v: "South Asia (TS/AP)", i: <MapPin size={64}/> },
               { l: "Signal Strength", v: "99.2% Pure", i: <Zap size={64}/> },
               { l: "Processing Load", v: "14.2 Exaflops", i: <Activity size={64}/> }
            ].map((stat, i) => (
              <div key={i} className="bg-white/5 border-[10px] border-white/5 p-80 rounded-[300px] text-center space-y-24 group-hover:border-indigo-600 transition-all shadow-inner">
                 <div className="text-slate-800 flex justify-center">{stat.i}</div>
                 <h4 className="text-[64px] font-black text-white italic">{stat.v}</h4>
                 <p className="text-[24px] font-black text-slate-900 uppercase tracking-widest">{stat.l}</p>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};
