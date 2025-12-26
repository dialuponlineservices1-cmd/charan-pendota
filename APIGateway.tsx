
import React, { useState, useEffect } from 'react';
import { Server, Key, Zap, ShieldCheck, RefreshCw, Activity, Terminal, Lock } from 'lucide-react';

export const APIGateway = () => {
  const [keys, setKeys] = useState([
    { id: 1, name: "PRIMARY_NUCLEUS", status: "ACTIVE", health: 100, latency: "14ms", calls: "1.2M" },
    { id: 2, name: "BACKUP_STRATA", status: "STANDBY", health: 98, latency: "22ms", calls: "450K" },
    { id: 3, name: "FAILSAFE_QUANTUM", status: "INACTIVE", health: 100, latency: "0ms", calls: "0" }
  ]);

  const [balancing, setBalancing] = useState(true);

  return (
    <div className="space-y-120 animate-in fade-in duration-1000 pb-[1000px]">
      <div className="flex flex-col xl:flex-row items-center justify-between border-b-[15px] border-white/5 pb-80 gap-64">
        <div className="space-y-24 text-center xl:text-left">
          <h2 className="text-[180px] font-black italic tracking-tighter text-white uppercase leading-[0.35]">API <br/><span className="text-emerald-500">GATEWAY.</span></h2>
          <p className="text-[32px] font-black text-slate-900 uppercase tracking-[3em] italic">QUANTUM_LOAD_BALANCER_V1</p>
        </div>
        <div className="flex gap-48">
           <button onClick={() => setBalancing(!balancing)} className={`px-120 py-48 rounded-full font-black uppercase text-[32px] tracking-widest transition-all shadow-4xl flex items-center gap-32 italic border-[15px] border-black ${balancing ? 'bg-emerald-600 text-white' : 'bg-white/5 text-slate-800'}`}>
              <RefreshCw className={balancing ? "animate-spin" : ""} size={64}/> {balancing ? "AUTO_ROTATION_ON" : "MANUAL_OVERRIDE"}
           </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-100">
         <div className="lg:col-span-8 space-y-80">
            {keys.map((k) => (
              <div key={k.id} className="bg-black border-[15px] border-white/5 p-100 rounded-[500px] flex items-center justify-between group hover:border-emerald-600 transition-all shadow-4xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-80 opacity-[0.03] scale-150 rotate-12"><Key size={300}/></div>
                 <div className="flex items-center gap-80 relative z-10">
                    <div className={`w-120 h-120 rounded-full flex items-center justify-center shadow-4xl border-[15px] border-black ${k.status === 'ACTIVE' ? 'bg-emerald-600 animate-pulse' : 'bg-slate-900'}`}>
                       <Lock size={64}/>
                    </div>
                    <div>
                       <h4 className="text-8xl font-black text-white italic uppercase tracking-tighter">{k.name}</h4>
                       <p className="text-[24px] font-black text-slate-900 uppercase tracking-[2em] mt-12">STATUS: <span className={k.status === 'ACTIVE' ? 'text-emerald-500' : 'text-slate-700'}>{k.status}</span></p>
                    </div>
                 </div>
                 <div className="text-right space-y-24 relative z-10">
                    <div className="flex gap-48 text-[28px] font-black text-white uppercase italic">
                       <span>{k.latency}</span>
                       <span className="text-slate-900">|</span>
                       <span>{k.calls} REQS</span>
                    </div>
                    <div className="w-400 h-8 bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-emerald-500" style={{ width: `${k.health}%` }}></div>
                    </div>
                 </div>
              </div>
            ))}
         </div>

         <div className="lg:col-span-4 space-y-80">
            <div className="bg-emerald-600/5 border-[15px] border-emerald-500/20 rounded-[400px] p-120 space-y-64 shadow-4xl text-center">
               <Activity size={180} className="text-emerald-500 mx-auto animate-bounce"/>
               <h3 className="text-7xl font-black italic uppercase text-white tracking-tighter">NETWORK HEALTH</h3>
               <div className="text-[200px] font-black text-white leading-none italic">99.9<span className="text-4xl">%</span></div>
               <p className="text-4xl font-bold text-slate-800 uppercase italic leading-tight">Uptime Guaranteed via Neural Redundancy.</p>
            </div>

            <div className="bg-[#050505] border-[10px] border-white/5 p-100 rounded-[300px] space-y-48">
               <h5 className="text-[24px] font-black text-slate-800 uppercase tracking-[1.5em] italic flex items-center gap-24 justify-center"><Terminal size={48}/> ROOT_ACCESS_ONLY</h5>
               <p className="text-5xl font-bold text-slate-500 text-center italic">"Encryption layers: RSA-4096 + Neural Lattice. The gateway is impenetrable."</p>
            </div>
         </div>
      </div>
    </div>
  );
};
