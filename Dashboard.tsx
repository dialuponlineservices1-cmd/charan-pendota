
import React from 'react';
import { 
  DollarSign, Activity, Target, Layers, 
  ArrowUpRight, Cpu, ShieldCheck, Zap, Globe 
} from 'lucide-react';

export const Dashboard = ({ db, setView }: any) => {
  const stats = [
    { label: "NETWORK NODES", value: db.analytics.activeNow.toLocaleString(), icon: <Activity className="text-red-500" size={20}/>, color: "red" },
    { label: "TOTAL REVENUE", value: `₹${(db.analytics.revenue / 1000).toFixed(1)}k`, icon: <DollarSign className="text-white" size={20}/>, color: "white" },
    { label: "SERVICE UNITS", value: db.analytics.serviceApplications.toString(), icon: <Target className="text-red-500" size={20}/>, color: "red" },
    { label: "ASSET SALES", value: db.analytics.storeSales.toString(), icon: <Layers className="text-white" size={20}/>, color: "white" }
  ];

  return (
    <div className="space-y-16 animate-in fade-in duration-1000 pb-32">
      
      {/* SUPREMACY HERO */}
      <div className="bg-[#050505] border border-white/5 rounded-[60px] p-16 flex flex-col lg:flex-row items-center justify-between gap-16 relative overflow-hidden shadow-4xl">
         <div className="absolute top-0 right-0 p-20 opacity-[0.03] scale-[2.5] rotate-12"><Cpu size={400}/></div>
         <div className="space-y-8 max-w-2xl relative z-10 text-center lg:text-left">
            <div className="inline-flex items-center gap-3 px-5 py-2 bg-red-600/5 border border-red-600/10 rounded-full">
               <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
               <span className="text-[9px] font-black text-red-600 uppercase tracking-widest">SYSTEM_NODE_V2500_SUPREMACY</span>
            </div>
            <h1 className="text-8xl md:text-9xl font-black italic text-white uppercase tracking-tighter leading-[0.85]">EMPIRE<br/><span className="text-red-600">COMMAND.</span></h1>
            <p className="text-2xl font-bold text-slate-800 italic uppercase">Your administrative singularity for competitive dominance and revenue maximization.</p>
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
               <button onClick={() => setView('manage-jobs')} className="bg-white text-black px-12 py-5 rounded-full font-black uppercase text-[11px] tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-4xl">GOVT REGISTRY</button>
               <button onClick={() => setView('ad-matrix')} className="bg-white/5 border border-white/10 text-white px-12 py-5 rounded-full font-black uppercase text-[11px] tracking-widest hover:bg-white/10 transition-all">AD MATRIX</button>
            </div>
         </div>
         
         <div className="relative w-80 h-80 lg:w-96 lg:h-96 shrink-0 flex items-center justify-center">
            <div className="absolute inset-0 bg-red-600/5 rounded-full blur-[100px] animate-pulse"></div>
            <div className="w-full h-full border border-white/5 rounded-full animate-spin-[200s] absolute"></div>
            <div className="relative z-10 text-center space-y-3">
               <span className="text-[100px] font-black italic text-white leading-none tracking-tighter">{db.analytics.activeNow / 1000}K</span>
               <p className="text-[10px] font-black text-slate-800 uppercase tracking-[0.4em]">NODES_SYNCED</p>
            </div>
         </div>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
        {stats.map((stat, i) => (
          <div key={i} className="bg-[#050505] border border-white/5 p-12 rounded-[50px] space-y-6 hover:border-red-600/30 transition-all group shadow-2xl">
             <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-red-600 transition-all shadow-xl">{stat.icon}</div>
                <span className="text-[9px] font-black text-slate-800 uppercase tracking-widest">{stat.label}</span>
             </div>
             <div className="space-y-1">
                <h4 className="text-6xl font-black italic text-white group-hover:text-red-600 transition-colors tracking-tighter leading-none">{stat.value}</h4>
                <p className="text-[9px] font-bold text-slate-900 uppercase mt-2">REAL_TIME_TELEMETRY</p>
             </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-12">
         <div className="lg:col-span-8 bg-[#050505] border border-white/5 rounded-[70px] p-16 space-y-12 relative overflow-hidden group shadow-4xl">
            <div className="flex justify-between items-center">
               <h3 className="text-3xl font-black italic uppercase text-white flex items-center gap-6"><ShieldCheck className="text-red-600" size={32}/> Neural Integrity Analytics</h3>
               <div className="flex gap-4">
                  <div className="w-3 h-3 bg-red-600 rounded-full animate-ping"></div>
                  <div className="w-3 h-3 bg-red-600/20 rounded-full"></div>
               </div>
            </div>
            <div className="h-96 w-full bg-black rounded-[50px] border border-white/5 relative overflow-hidden flex items-center justify-center group-hover:border-red-600/10 transition-all">
                <div className="text-center space-y-6">
                   <h4 className="text-[150px] font-black italic text-white opacity-10 leading-none">99.9%</h4>
                   <p className="text-[10px] font-black text-slate-800 uppercase tracking-[1.5em]">UPTIME_STABILITY_CONFIRMED</p>
                </div>
            </div>
         </div>

         <div className="lg:col-span-4 bg-red-600 text-white rounded-[70px] p-16 flex flex-col justify-between shadow-4xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-10 opacity-10 rotate-12 scale-150"><Zap size={250}/></div>
            <div className="space-y-8 relative z-10">
               <h4 className="text-5xl font-black italic uppercase tracking-tighter leading-none">SUPREMACY <br/> CORE.</h4>
               <p className="text-xl font-bold uppercase italic opacity-70">Monetization nodes active. All systems reporting peak performance.</p>
            </div>
            <button onClick={() => setView('settings')} className="bg-black text-white py-7 rounded-full font-black uppercase text-[11px] tracking-[0.6em] relative z-10 hover:bg-white hover:text-black transition-all shadow-2xl">SYSTEM_SETTINGS</button>
         </div>
      </div>
    </div>
  );
};
