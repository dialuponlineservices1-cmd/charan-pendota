import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, Zap, Atom, Globe, 
  DollarSign, Target, Activity, 
  Layers, Cpu, Sparkles,
  Compass, ShieldCheck, Trophy, ArrowRight,
  ZapOff, Heart, Radio, Brain, Network, MousePointer2
} from 'lucide-react';

export const Dashboard = ({ db, setView }: any) => {
  const [revenue, setRevenue] = useState(db.analytics.revenue);

  useEffect(() => {
    const interval = setInterval(() => {
      setRevenue((prev: number) => prev + (Math.random() * 80));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: "Neural Traffic", value: db.analytics.activeNow.toLocaleString(), trend: "+12%", color: "indigo", icon: <Globe size={14}/> },
    { label: "Imperial Yield", value: `₹${(revenue/100000).toFixed(2)}L`, trend: "+5.1%", color: "emerald", icon: <DollarSign size={14}/> },
    { label: "Stability Index", value: "98.4%", trend: "STABLE", color: "amber", icon: <ShieldCheck size={14}/> },
    { label: "Latency", value: "12ms", trend: "NOMINAL", color: "rose", icon: <Cpu size={14}/> }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20 font-sans">
      
      {/* Executive Command Hub */}
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-pink-500 to-amber-400 rounded-3xl blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
        <div className="relative bg-black border border-white/5 rounded-3xl p-6 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 overflow-hidden shadow-2xl">
           
           <div className="space-y-4 relative z-10 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-600/10 border border-indigo-500/20 rounded-full">
                <Sparkles size={10} className="text-indigo-500 animate-pulse"/>
                <span className="text-[8px] font-black text-indigo-500 uppercase tracking-widest italic">Protocol: Sovereign Alpha</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-white italic leading-tight uppercase tracking-tighter">
                ZENITH <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-pink-500 to-amber-300">HUB_CENTRAL.</span>
              </h1>
              <p className="text-slate-500 max-w-sm font-medium text-xs sm:text-sm leading-relaxed italic mx-auto lg:mx-0">
                Centralized intelligence for recruitment dominance. Optimized for 4.8M active student nodes.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 pt-2">
                 <button onClick={() => setView('blog-forge')} className="bg-white text-black px-6 py-2.5 rounded-xl font-black uppercase text-[9px] tracking-widest hover:bg-indigo-600 hover:text-white transition-all flex items-center gap-2 shadow-lg">
                   FORGE_POST <Zap size={12}/>
                 </button>
                 <button onClick={() => setView('strategy')} className="bg-white/5 text-slate-400 border border-white/10 px-6 py-2.5 rounded-xl font-black uppercase text-[9px] tracking-widest hover:bg-white/10 hover:text-white transition-all flex items-center gap-2 italic">
                   LATTICE_SCAN <Compass size={12}/>
                 </button>
              </div>
           </div>

           <div className="w-full lg:w-[35%] bg-white/[0.02] border border-white/10 rounded-3xl p-6 space-y-4 backdrop-blur-3xl relative shadow-inner">
              <div className="flex items-center justify-between">
                 <div className="space-y-0.5">
                    <p className="text-[7px] font-black text-slate-700 uppercase tracking-widest">Revenue Flow Velocity</p>
                    <h3 className="text-2xl font-black text-white italic tracking-tighter">₹{revenue.toLocaleString(undefined, {maximumFractionDigits: 0})}</h3>
                 </div>
                 <div className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-500 border border-emerald-500/20">
                    <TrendingUp size={14}/>
                 </div>
              </div>
              <div className="h-20 flex items-end gap-1 px-1">
                 {[30, 60, 40, 90, 55, 80, 45, 70, 40, 85, 95, 70, 60, 80, 50, 95].map((h, i) => (
                    <div key={i} className="flex-1 bg-gradient-to-t from-indigo-500/5 to-indigo-500/30 rounded-t-sm hover:to-white transition-all duration-500" style={{ height: `${h}%` }}></div>
                 ))}
              </div>
           </div>
        </div>
      </div>

      {/* Telemetry Matrix */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-[#050505] border border-white/5 p-5 rounded-2xl hover:border-white/10 transition-all duration-500 group shadow-lg">
             <div className="flex items-center justify-between mb-3">
                <div className={`p-2 bg-${stat.color}-500/10 rounded-lg text-${stat.color}-500 border border-${stat.color}-500/20`}>
                   {stat.icon}
                </div>
                <p className={`text-[7px] font-black italic tracking-widest ${stat.trend.includes('+') ? 'text-emerald-500' : 'text-slate-800'}`}>{stat.trend}</p>
             </div>
             <p className="text-[8px] font-black text-slate-700 uppercase tracking-widest mb-0.5">{stat.label}</p>
             <h4 className="text-lg font-black text-white italic tracking-tighter">{stat.value}</h4>
          </div>
        ))}
      </div>

      {/* Analytical Sectors */}
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-black border border-white/5 rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden group shadow-2xl">
           <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div className="flex items-center gap-3">
                 <div className="w-6 h-6 bg-indigo-500/10 rounded flex items-center justify-center text-indigo-500 border border-indigo-500/20"><Network size={12}/></div>
                 <h3 className="text-[10px] font-black text-white italic uppercase tracking-widest leading-none">Sector Integrity Matrix</h3>
              </div>
              <span className="text-[7px] font-black text-slate-800 uppercase tracking-widest italic">Live Feed: Nominal</span>
           </div>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { name: 'TS_GOVT Sector', mastery: 94, color: 'indigo' },
                { name: 'AP_GOVT Sector', mastery: 82, color: 'emerald' },
                { name: 'PRIVATE Strata', mastery: 89, color: 'amber' },
                { name: 'ENTRANCE Lattice', mastery: 64, color: 'rose' },
              ].map((s, i) => (
                <div key={i} className="bg-white/[0.01] border border-white/5 rounded-xl p-4 space-y-3 hover:bg-white/[0.03] transition-all">
                   <div className="flex justify-between items-end">
                      <span className="text-[7px] font-black uppercase text-slate-600 italic tracking-widest">{s.name}</span>
                      <span className={`text-base font-black italic text-${s.color}-500`}>{s.mastery}%</span>
                   </div>
                   <div className="h-1 bg-black rounded-full overflow-hidden border border-white/5">
                      <div className={`h-full bg-${s.color}-600 rounded-full transition-all duration-[2000ms] shadow-[0_0_10px_rgba(255,255,255,0.1)]`} style={{ width: `${s.mastery}%` }}></div>
                   </div>
                </div>
              ))}
           </div>
        </div>

        <div className="lg:col-span-4 bg-black border border-white/5 rounded-3xl p-6 sm:p-8 flex flex-col shadow-2xl relative overflow-hidden">
           <div className="flex items-center gap-3 border-b border-white/5 pb-4">
              <div className="w-6 h-6 bg-rose-500/10 rounded flex items-center justify-center text-rose-500 border border-rose-500/20"><Activity size={12}/></div>
              <h3 className="text-[10px] font-black text-white italic uppercase tracking-widest leading-none">Neural Audit Log</h3>
           </div>
           <div className="flex-1 space-y-3 p-3 overflow-y-auto scrollbar-hide max-h-[160px]">
              {[
                { time: "14:22", msg: "Revenue Node Synchronized", color: "indigo" },
                { time: "14:15", msg: "Traffic Spike: AP Cluster", color: "emerald" },
                { time: "13:48", msg: "Blog Forged: Success", color: "amber" },
                { time: "13:02", msg: "SEO Matrix Re-Aligned", color: "rose" },
              ].map((log, i) => (
                <div key={i} className="flex gap-2 items-center">
                   <span className="text-[6px] font-mono text-slate-800 font-bold uppercase">{log.time}</span>
                   <p className={`text-[7px] font-black uppercase italic tracking-widest text-${log.color}-400/80`}>{log.msg}</p>
                </div>
              ))}
           </div>
           <div className="pt-4 border-t border-white/5">
              <button onClick={() => setView('sentinel')} className="w-full py-2 bg-white/5 rounded-xl text-[7px] font-black text-slate-700 hover:text-white transition-all uppercase tracking-widest border border-white/5 italic">
                Full System Audit
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};