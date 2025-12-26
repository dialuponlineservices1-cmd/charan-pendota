
import React, { useState, useEffect } from 'react';
import { ShieldAlert, Zap, Lock, Wind, Radar, ShieldCheck, Activity } from 'lucide-react';

export const ThreatMatrix = () => {
  const [threatLevel, setThreatLevel] = useState(12);
  const [attacks, setAttacks] = useState<any[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setThreatLevel(prev => Math.min(100, prev + (Math.random() > 0.8 ? 5 : -1)));
      const newAttack = {
        id: Date.now(),
        origin: `IP_${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.X.X`,
        vector: ["SYNP_FLOOD", "SQL_INJECT", "NEURAL_SCRAPE", "VOID_DUMP"][Math.floor(Math.random() * 4)],
        status: "NEUTRALIZED"
      };
      setAttacks(prev => [newAttack, ...prev].slice(0, 10));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-150 animate-in fade-in duration-1000 h-screen flex flex-col pb-[300px]">
      <div className="text-center space-y-24">
        <h2 className="text-[180px] font-black italic tracking-tighter text-white uppercase leading-none">THREAT <span className="text-red-600">MATRIX.</span></h2>
        <p className="text-[32px] font-black text-slate-900 uppercase tracking-[4em] italic">NEURAL_INTRUSION_DEFENSE_V2</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-100 flex-1">
         <div className="lg:col-span-8 bg-[#050505] border-[25px] border-white/5 rounded-[600px] p-150 relative overflow-hidden shadow-4xl group">
            <div className="absolute inset-0 bg-red-600/5 animate-pulse"></div>
            <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-100">
               <div className="relative w-[1000px] h-[1000px]">
                  <div className="absolute inset-0 border-[40px] border-white/5 rounded-full animate-spin-slow"></div>
                  <div className="absolute inset-40 border-r-[20px] border-red-600 rounded-full animate-spin"></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                     <h3 className="text-[250px] font-black text-white italic leading-none">{threatLevel}%</h3>
                     <p className="text-[48px] font-black text-red-600 uppercase tracking-[1em] italic">THREAT_LOAD</p>
                  </div>
               </div>
               <div className="w-full max-w-5xl space-y-48">
                  <h4 className="text-[32px] font-black text-white uppercase tracking-[2em] text-center italic">DEFENSE_PROTOCOLS: ACTIVE</h4>
                  <div className="h-24 bg-white/5 border-[10px] border-white/10 rounded-full overflow-hidden">
                     <div className="h-full bg-red-600 animate-pulse" style={{ width: `${threatLevel}%` }}></div>
                  </div>
               </div>
            </div>
         </div>

         <div className="lg:col-span-4 space-y-80">
            <div className="bg-black border-[15px] border-white/5 rounded-[400px] p-100 space-y-64 shadow-4xl h-full flex flex-col">
               <div className="flex items-center gap-48 text-red-600">
                  <Activity size={100}/>
                  <h4 className="text-7xl font-black italic uppercase text-white">ATTACK LOG</h4>
               </div>
               <div className="flex-1 space-y-48 overflow-y-auto scrollbar-hide font-mono">
                  {attacks.map(a => (
                    <div key={a.id} className="p-48 border-[10px] border-white/5 rounded-[200px] space-y-12 group hover:border-red-600/30 transition-all">
                       <p className="text-[24px] font-bold text-red-500">{a.vector}</p>
                       <p className="text-[28px] font-black text-white">{a.origin}</p>
                       <p className="text-[20px] font-bold text-emerald-500 uppercase tracking-widest">{a.status}</p>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};
