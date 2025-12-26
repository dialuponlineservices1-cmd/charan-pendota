import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, Zap, Atom, Globe, 
  DollarSign, Target, Activity, 
  Layers, Cpu, Sparkles,
  Compass, ShieldCheck, Trophy, ArrowRight,
  ZapOff, Heart, Radio
} from 'lucide-react';

export const Dashboard = ({ db, setView }: any) => {
  const [revenue, setRevenue] = useState(db.analytics.revenue);

  useEffect(() => {
    const interval = setInterval(() => {
      setRevenue((prev: number) => prev + (Math.random() * 50));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: "Neural Pings", value: db.analytics.activeNow.toLocaleString(), trend: "+12%", color: "indigo", icon: <Globe size={20}/> },
    { label: "Imperial Yield", value: `₹${(revenue/100000).toFixed(2)}L`, trend: "+5.1%", color: "emerald", icon: <DollarSign size={20}/> },
    { label: "Victory Index", value: "98.4%", trend: "STABLE", color: "amber", icon: <Trophy size={20}/> },
    { label: "Server Sync", value: "14ms", trend: "OPTIMAL", color: "rose", icon: <Cpu size={20}/> }
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-32">
      
      {/* High-Impact Hero Hub */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 via-pink-600 to-amber-500 rounded-[50px] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
        <div className="relative bg-black border border-white/5 rounded-[48px] p-12 flex flex-col lg:flex-row items-center justify-between gap-12 overflow-hidden shadow-2xl">
           <div className="space-y-8 relative z-10 lg:pl-10 text-center lg:text-left">
              <div className="inline-flex items-center gap-3 px-5 py-2 bg-pink-600/10 border border-pink-500/20 rounded-full">
                <Sparkles size={12} className="text-pink-500 animate-pulse"/>
                <span className="text-[10px] font-black text-pink-500 uppercase tracking-widest italic">Omniscience Active</span>
              </div>
              <h1 className="text-7xl font-black text-white italic leading-[1] uppercase tracking-tighter">
                ZENITH <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-pink-500 to-amber-500">COMMAND.</span>
              </h1>
              <p className="text-slate-500 max-w-md font-medium text-lg leading-relaxed italic">
                Direct neural interface with 4.8M student nodes across the Imperial Registry.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
                 <button onClick={() => setView('magic-editor')} className="bg-white text-black px-8 py-4 rounded-2xl font-black uppercase text-[11px] tracking-widest hover:bg-pink-500 hover:text-white transition-all flex items-center gap-3 shadow-xl">
                   Quick Forge <Zap size={16}/>
                 </button>
                 <button onClick={() => setView('strategy')} className="bg-white/5 text-white border border-white/10 px-8 py-4 rounded-2xl font-black uppercase text-[11px] tracking-widest hover:bg-white/10 transition-all flex items-center gap-3">
                   Warp Logic <Compass size={16}/>
                 </button>
              </div>
           </div>

           <div className="w-full lg:w-[45%] bg-white/[0.02] border border-white/10 rounded-[40px] p-8 space-y-8 backdrop-blur-3xl relative">
              <div className="flex items-center justify-between">
                 <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-700 uppercase tracking-widest">Revenue Velocity</p>
                    <h3 className="text-4xl font-black text-white italic tracking-tighter">₹{revenue.toLocaleString(undefined, {maximumFractionDigits: 0})}</h3>
                 </div>
                 <div className="p-3 bg-emerald-500/20 rounded-2xl text-emerald-500 animate-pulse">
                    <TrendingUp size={24}/>
                 </div>
              </div>
              <div className="h-40 flex items-end gap-2 px-2">
                 {[40, 70, 45, 90, 65, 80, 50, 70, 30, 85, 100, 70, 60, 90, 55, 95].map((h, i) => (
                    <div key={i} className="flex-1 bg-indigo-500/20 rounded-t-lg hover:bg-indigo-500 transition-all duration-300" style={{ height: `${h}%` }}></div>
                 ))}
              </div>
           </div>
        </div>
      </div>

      {/* Advanced Telemetry Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-black border border-white/5 p-8 rounded-[40px] hover:border-white/10 transition-all duration-500 group shadow-lg relative overflow-hidden">
             <div className={`absolute top-0 right-0 p-8 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-1000 bg-${stat.color}-500/20 rounded-full scale-150`}>
                {stat.icon}
             </div>
             <div className="flex items-center justify-between mb-6">
                <div className={`p-4 bg-white/5 rounded-2xl text-${stat.color}-500 group-hover:scale-110 transition-transform duration-500`}>
                   {stat.icon}
                </div>
                <span className={`text-[10px] font-black px-3 py-1 bg-white/5 rounded-full ${stat.trend.includes('+') ? 'text-emerald-500' : 'text-slate-700'}`}>{stat.trend}</span>
             </div>
             <p className="text-[10px] font-black text-slate-700 uppercase tracking-[0.3em] mb-2">{stat.label}</p>
             <h4 className="text-3xl font-black text-white italic tracking-tighter">{stat.value}</h4>
          </div>
        ))}
      </div>

      {/* Sector Intelligence Hub */}
      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-black border border-white/5 rounded-[48px] p-10 space-y-10 relative overflow-hidden group">
           <div className="flex items-center justify-between px-4">
              <div className="flex items-center gap-4">
                 <div className="p-3 bg-indigo-500/10 rounded-2xl text-indigo-500"><Layers size={20}/></div>
                 <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">Sector Integrity</h3>
              </div>
              <div className="flex items-center gap-3">
                 <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]"></div>
                 <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">Global Scan Active</span>
              </div>
           </div>
           
           <div className="grid md:grid-cols-2 gap-6 p-4">
              {[
                { name: 'Telangana Nodes', mastery: 94, color: 'text-indigo-500', bar: 'bg-indigo-500' },
                { name: 'Andhra Nodes', mastery: 82, color: 'text-emerald-500', bar: 'bg-emerald-500' },
                { name: 'Private Clusters', mastery: 89, color: 'text-amber-500', bar: 'bg-amber-500' },
                { name: 'Entrance Lattice', mastery: 64, color: 'text-rose-500', bar: 'bg-rose-500' },
              ].map((s, i) => (
                <div key={i} className="bg-white/[0.02] border border-white/5 rounded-[32px] p-8 space-y-6 hover:bg-white/[0.04] transition-all group/node cursor-pointer">
                   <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase text-slate-500 group-hover/node:text-white transition-colors">{s.name}</span>
                      <span className={`text-2xl font-black italic ${s.color}`}>{s.mastery}%</span>
                   </div>
                   <div className="h-2 bg-black/50 rounded-full overflow-hidden border border-white/5">
                      <div className={`h-full ${s.bar} rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(255,255,255,0.2)]`} style={{ width: `${s.mastery}%` }}></div>
                   </div>
                </div>
              ))}
           </div>
        </div>

        <div className="lg:col-span-4 bg-black border border-white/5 rounded-[48px] p-10 flex flex-col shadow-2xl relative overflow-hidden group">
           <div className="p-8 border-b border-white/5 flex items-center gap-4">
              <div className="p-3 bg-rose-500/10 rounded-2xl text-rose-500"><Activity size={20}/></div>
              <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">Neural Audit</h3>
           </div>
           <div className="flex-1 space-y-6 p-8 overflow-y-auto scrollbar-hide max-h-[340px]">
              {[
                { time: "14:22", msg: "Veo Node #42 Rendered", color: "text-indigo-400" },
                { time: "14:15", msg: "Traffic Spike: AP Sector", color: "text-emerald-400" },
                { time: "14:02", msg: "Threat Matrix: Shield 100%", color: "text-slate-500" },
                { time: "13:48", msg: "New Gazette Alchemized", color: "text-amber-400" },
                { time: "13:30", msg: "Lattice Defrag Complete", color: "text-rose-400" },
              ].map((log, i) => (
                <div key={i} className="flex gap-5 group/log hover:translate-x-2 transition-transform cursor-pointer">
                   <span className="text-[10px] font-mono text-slate-800 font-bold uppercase mt-1">{log.time}</span>
                   <p className={`text-[11px] font-black uppercase italic tracking-wide leading-tight ${log.color}`}>{log.msg}</p>
                </div>
              ))}
           </div>
           <div className="p-4 border-t border-white/5">
              <button onClick={() => setView('sentinel')} className="w-full py-4 bg-white/5 rounded-2xl text-[10px] font-black text-slate-500 hover:text-white transition-all uppercase tracking-widest border border-white/5">
                Full Audit Trail
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};