import React, { useState, useEffect } from 'react';
// Fix: Import RefreshCw from lucide-react
import { TrendingUp, Users, Target, Activity, Zap, Compass, BarChart3, Globe, RefreshCw } from 'lucide-react';

export const WorkforceSimulator = ({ db }: any) => {
  const [projection, setProjection] = useState<any[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);

  useEffect(() => {
    simulate();
  }, []);

  const simulate = () => {
    setIsSimulating(true);
    setTimeout(() => {
      const data = [
        { sector: "GROUP_I_ELITE", density: 84, trend: "+12.4%", nodes: 450000 },
        { sector: "DEFENSE_PROTOCOL", density: 92, trend: "+45.8%", nodes: 1200000 },
        { sector: "NEURAL_TEACHING", density: 71, trend: "-2.1%", nodes: 850000 },
        { sector: "CIVIL_VOID", density: 99, trend: "+8.9%", nodes: 2100000 }
      ];
      setProjection(data);
      setIsSimulating(false);
    }, 2000);
  };

  return (
    <div className="space-y-250 animate-in fade-in duration-1000 pb-[1000px]">
      <div className="flex flex-col xl:flex-row items-center justify-between border-b-[30px] border-white/5 pb-120 gap-100">
        <div className="space-y-64 text-center xl:text-left">
          <h2 className="text-[300px] font-black italic tracking-tighter text-white uppercase leading-[0.35] italic">WORKFORCE <br/><span className="text-white/10">SIMULATOR.</span></h2>
          <p className="text-[48px] font-black text-slate-900 uppercase tracking-[4em] italic leading-none">SENTIENT_COMPETITION_FORECASTER_V1</p>
        </div>
        <button onClick={simulate} className="bg-white text-black px-200 py-80 rounded-full font-black uppercase text-[56px] tracking-[1.5em] hover:bg-emerald-600 hover:text-white transition-all shadow-4xl flex items-center gap-64 italic border-[40px] border-black">
           {isSimulating ? <RefreshCw className="animate-spin" size={120}/> : <TrendingUp size={120}/>} {isSimulating ? 'HALLUCINATING...' : 'SYNC_SIMULATION'}
        </button>
      </div>

      <div className="grid lg:grid-cols-12 gap-150">
         <div className="lg:col-span-8 space-y-120">
            {projection.map((p, i) => (
              <div key={i} className="bg-black border-[25px] border-white/5 rounded-[800px] p-150 space-y-80 shadow-4xl group hover:border-emerald-600 transition-all">
                 <div className="flex items-center justify-between">
                    <div className="space-y-24">
                       <h4 className="text-[120px] font-black italic text-white uppercase tracking-tighter leading-none">{p.sector}</h4>
                       <p className="text-[32px] font-black text-slate-900 uppercase tracking-[2em] mt-12">NODES_DETECTED: {p.nodes.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                       <p className="text-emerald-500 font-black text-8xl italic">{p.trend}</p>
                       <p className="text-[24px] font-black text-slate-900 uppercase tracking-widest mt-12">MOMENTUM_INDEX</p>
                    </div>
                 </div>
                 <div className="h-40 bg-white/5 border-[10px] border-black rounded-full overflow-hidden shadow-inner">
                    <div className="h-full bg-emerald-600 transition-all duration-[3000ms] group-hover:bg-white" style={{ width: `${p.density}%` }}></div>
                 </div>
              </div>
            ))}
         </div>

         <div className="lg:col-span-4 space-y-120">
            <div className="bg-[#050505] border-[25px] border-white/5 rounded-[600px] p-150 space-y-100 text-center shadow-4xl relative overflow-hidden group">
               <div className="absolute inset-0 bg-emerald-600/5 animate-pulse"></div>
               <Users size={300} className="text-emerald-500 mx-auto animate-bounce"/>
               <h3 className="text-8xl font-black italic uppercase text-white tracking-tighter leading-none">POPULATION <br/> DENSITY</h3>
               <div className="text-[250px] font-black text-white leading-none italic">12.4<span className="text-5xl">M</span></div>
               <p className="text-5xl font-bold text-slate-800 uppercase italic leading-tight">Total Aspirants projected in the Aethelgard Mesh by Q3 2025.</p>
            </div>

            <div className="bg-white text-black p-120 rounded-[500px] space-y-48 shadow-4xl text-center">
               <h5 className="text-[32px] font-black uppercase tracking-[1.5em] italic flex items-center gap-32 justify-center"><Globe size={64}/> GLOBAL_SYNC_READY</h5>
               <p className="text-6xl font-bold italic">"Simulated 14M mock-scenarios. Victory path exists in 1.2% of outcomes for non-Omega nodes."</p>
            </div>
         </div>
      </div>
    </div>
  );
};