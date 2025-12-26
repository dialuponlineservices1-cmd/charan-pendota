
import React from 'react';
import { 
  DollarSign, Activity, Target, Layers, 
  ArrowUpRight, Cpu, ShieldCheck, Zap, Globe 
} from 'lucide-react';

export const Dashboard = ({ db, setView }: any) => {
  const stats = [
    { label: "NETWORK NODES", value: db.analytics.activeNow.toLocaleString(), icon: <Activity className="text-emerald-500" size={20}/>, color: "emerald" },
    { label: "YIELD METRIC", value: `₹${(db.analytics.revenue / 1000).toFixed(1)}k`, icon: <DollarSign className="text-white" size={20}/>, color: "white" },
    { label: "DESK UNITS", value: db.analytics.serviceApplications.toString(), icon: <Target className="text-emerald-500" size={20}/>, color: "emerald" },
    { label: "DATA CLUSTERS", value: db.analytics.storeSales.toString(), icon: <Layers className="text-white" size={20}/>, color: "white" }
  ];

  return (
    <div className="space-y-20 animate-in fade-in duration-1000 pb-32">
      
      {/* COMMAND CENTER HERO */}
      <div className="bg-[#050505] border border-white/5 rounded-[60px] p-16 flex flex-col lg:flex-row items-center justify-between gap-16 relative overflow-hidden shadow-2xl">
         <div className="absolute top-0 right-0 p-20 opacity-[0.03] scale-[2.5] rotate-12"><Cpu size={400}/></div>
         <div className="space-y-8 max-w-2xl relative z-10 text-center lg:text-left">
            <div className="inline-flex items-center gap-3 px-5 py-2 bg-emerald-500/5 border border-emerald-500/10 rounded-full">
               <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
               <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">SYSTEM_VERSION_1600_SUPREME</span>
            </div>
            <h1 className="text-7xl md:text-9xl font-black italic text-white uppercase tracking-tighter leading-[0.8]">SUPREME<br/><span className="text-emerald-500">COMMAND.</span></h1>
            <p className="text-2xl font-bold text-slate-700 italic uppercase">Your administrative singularity for recruitment and academic intelligence.</p>
            <div className="flex flex-wrap gap-5 justify-center lg:justify-start">
               <button onClick={() => setView('manage-jobs')} className="bg-white text-black px-12 py-5 rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-emerald-600 hover:text-white transition-all shadow-xl">Govt Registry</button>
               <button onClick={() => setView('manage-news')} className="bg-white/5 border border-white/10 text-white px-12 py-5 rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-white/10 transition-all">News Node</button>
            </div>
         </div>
         
         <div className="relative w-80 h-80 lg:w-96 lg:h-96 shrink-0 flex items-center justify-center">
            <div className="absolute inset-0 bg-emerald-600/5 rounded-full blur-[100px] animate-pulse"></div>
            <div className="w-full h-full border border-white/5 rounded-full animate-spin-[200s] absolute"></div>
            <div className="w-[80%] h-[80%] border border-emerald-500/10 rounded-full animate-spin-[150s] absolute"></div>
            <div className="relative z-10 text-center space-y-2">
               <span className="text-[80px] font-black italic text-white leading-none tracking-tighter">{db.analytics.activeNow}</span>
               <p className="text-[8px] font-black text-slate-800 uppercase tracking-widest">ACTIVE_NODES</p>
            </div>
         </div>
      </div>

      {/* SUPREME STATS GRID */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
        {stats.map((stat, i) => (
          <div key={i} className="bg-[#050505] border border-white/5 p-10 rounded-[40px] space-y-5 hover:border-emerald-500/30 transition-all group">
             <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-emerald-600 transition-all">{stat.icon}</div>
                <span className="text-[8px] font-black text-slate-800 uppercase tracking-widest">{stat.label}</span>
             </div>
             <div className="space-y-1">
                <h4 className="text-5xl font-black italic text-white group-hover:text-emerald-500 transition-colors tracking-tighter">{stat.value}</h4>
                <p className="text-[8px] font-bold text-slate-900 uppercase">SYSTEM_METRIC_LIVE</p>
             </div>
          </div>
        ))}
      </div>

      {/* ADVANCED SECTION CARDS */}
      <div className="grid lg:grid-cols-12 gap-10">
         <div className="lg:col-span-8 bg-[#050505] border border-white/5 rounded-[60px] p-12 space-y-10 relative overflow-hidden group">
            <div className="flex justify-between items-center">
               <h3 className="text-2xl font-black italic uppercase text-white flex items-center gap-5"><ShieldCheck className="text-emerald-500"/> Neural Analytics</h3>
               <div className="flex gap-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-emerald-500/20 rounded-full"></div>
               </div>
            </div>
            <div className="h-80 w-full bg-black rounded-[40px] border border-white/5 relative overflow-hidden flex items-center justify-center group-hover:border-emerald-500/10 transition-all">
                <div className="text-center space-y-4">
                   <h4 className="text-7xl font-black italic text-white opacity-20">99.9%</h4>
                   <p className="text-[8px] font-black text-slate-900 uppercase tracking-[1em]">UPTIME_CONFIRMED</p>
                </div>
            </div>
         </div>

         <div className="lg:col-span-4 bg-emerald-600 text-white rounded-[60px] p-12 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-10 opacity-10 rotate-12 scale-150"><Zap size={200}/></div>
            <div className="space-y-6 relative z-10">
               <h4 className="text-4xl font-black italic uppercase tracking-tighter leading-none">ELITE <br/> UPGRADE.</h4>
               <p className="text-lg font-bold uppercase italic opacity-60">System running at peak performance. All registry nodes synced.</p>
            </div>
            <button onClick={() => setView('settings')} className="bg-black text-white py-6 rounded-full font-black uppercase text-[10px] tracking-[0.5em] relative z-10 hover:bg-white hover:text-black transition-all">PURGE_CACHE</button>
         </div>
      </div>
    </div>
  );
};
