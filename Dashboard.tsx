import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, Zap, Soul, Atom, Globe, 
  DollarSign, Crown, Target, Activity, 
  Network, ArrowRight, Layers, Cpu, Sparkles,
  Compass
} from 'lucide-react';

export const Dashboard = ({ db, setView }: any) => {
  const [revenue, setRevenue] = useState(db.analytics.revenue);

  useEffect(() => {
    const interval = setInterval(() => {
      setRevenue(prev => prev + (Math.random() * 5));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: "Active Sessions", value: db.analytics.activeNow.toLocaleString(), trend: "+12.4%", icon: <Zap className="text-pink-500" size={20}/> },
    { label: "Total Revenue", value: `₹${(revenue/100000).toFixed(2)}L`, trend: "+5.1%", icon: <DollarSign className="text-emerald-500" size={20}/> },
    { label: "Conversion Rate", value: "4.8%", trend: "+0.2%", icon: <Target className="text-indigo-500" size={20}/> },
    { label: "System Load", value: "24ms", trend: "Optimal", icon: <Cpu className="text-amber-500" size={20}/> }
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      
      {/* Prime Hero Section - Clear & Powerful */}
      <div className="bg-[#050505] border border-white/5 rounded-[40px] p-12 relative overflow-hidden group shadow-2xl">
        <div className="absolute top-0 right-0 p-12 opacity-[0.02] scale-150 rotate-12 transition-transform duration-1000 group-hover:rotate-0">
          <Soul size={400}/>
        </div>
        
        <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 px-4 py-1 bg-pink-600/10 border border-pink-500/20 rounded-full">
              <div className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] font-black text-pink-500 uppercase tracking-widest italic">Omniscience Control Active</span>
            </div>
            <h1 className="text-7xl font-black text-white italic leading-none uppercase tracking-tighter">
              Command <br/><span className="text-pink-600 underline decoration-pink-600/30 underline-offset-8">Station.</span>
            </h1>
            <p className="text-slate-500 max-w-md font-medium leading-relaxed italic text-lg">
              Synchronizing with the global neural lattice. Total data visibility across TSPSC, APPSC, and Central Nodes.
            </p>
            <div className="flex gap-4 pt-4">
              <button onClick={() => setView('magic-editor')} className="bg-white text-black px-8 py-3 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-pink-600 hover:text-white transition-all flex items-center gap-3 shadow-xl shadow-white/5">
                Quick Deploy <Zap size={14}/>
              </button>
              {/* // Fix: Using imported Compass icon */}
              <button onClick={() => setView('strategy')} className="bg-white/5 text-white border border-white/10 px-8 py-3 rounded-xl font-bold uppercase text-xs tracking-widest hover:bg-white/10 transition-all flex items-center gap-3">
                Warp Roadmap <Compass size={14}/>
              </button>
            </div>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-[32px] p-10 backdrop-blur-md relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-600/5 to-indigo-600/5 pointer-events-none"></div>
            <div className="flex items-center justify-between mb-8">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Global Revenue Stream</p>
                <h3 className="text-4xl font-black text-white italic tracking-tighter">₹{revenue.toLocaleString()}</h3>
              </div>
              <TrendingUp className="text-emerald-500" size={32}/>
            </div>
            <div className="h-32 flex items-end gap-1 px-2">
              {[40, 60, 45, 90, 65, 80, 50, 70, 40, 85, 95, 70, 60, 80].map((h, i) => (
                <div key={i} className="flex-1 bg-pink-600/20 rounded-t-sm relative group/bar hover:bg-pink-600 transition-all duration-300" style={{ height: `${h}%` }}>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[8px] px-1 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity">v{h}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid - Neat & Functional */}
      {/* // Fix: Corrected Tailwind grid columns class and fixed corrupted map function syntax */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-black border border-white/5 p-6 rounded-3xl hover:border-pink-500/50 transition-all duration-500 group">
             <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 bg-white/5 rounded-xl group-hover:scale-110 transition-transform">{stat.icon}</div>
                <span className={`text-[10px] font-bold italic ${stat.trend.startsWith('+') ? 'text-emerald-500' : 'text-slate-600'}`}>{stat.trend}</span>
             </div>
             <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-1">{stat.label}</p>
             <h4 className="text-3xl font-black text-white italic tracking-tighter">{stat.value}</h4>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Sector Health Monitoring */}
        <div className="lg:col-span-2 bg-black border border-white/5 rounded-[40px] p-8 space-y-8">
           <div className="flex items-center justify-between px-2">
              <h3 className="text-lg font-black text-white italic uppercase tracking-tighter flex items-center gap-3">
                <Layers className="text-pink-500" size={18}/> Sector Density
              </h3>
              <span className="text-[9px] font-bold text-slate-700 uppercase tracking-widest">Live Monitoring</span>
           </div>
           <div className="grid grid-cols-2 gap-4">
              {['TS Gov', 'AP Gov', 'Private', 'Entrance'].map((name, i) => (
                <div key={i} className="bg-[#020202] border border-white/5 rounded-2xl p-6 hover:border-white/20 transition-all cursor-pointer">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-slate-400 uppercase">{name}</span>
                    <span className="text-lg font-black text-white italic">{82 + (i * 4)}%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-pink-600 rounded-full" style={{ width: `${82 + (i * 4)}%` }}></div>
                  </div>
                </div>
              ))}
           </div>
        </div>

        {/* System Alerts / Logs */}
        <div className="bg-black border border-white/5 rounded-[40px] p-8 space-y-6 flex flex-col">
           <h3 className="text-lg font-black text-white italic uppercase tracking-tighter flex items-center gap-3">
             <Activity className="text-red-500" size={18}/> Audit Trail
           </h3>
           <div className="flex-1 space-y-4 overflow-y-auto scrollbar-hide pr-2">
              {[
                { time: "12:44:02", msg: "Database Defrag Successful", color: "text-emerald-500" },
                { time: "12:38:15", msg: "Veo Cinema Rendered Node #42", color: "text-white/40" },
                { time: "12:30:10", msg: "High Traffic: Hyderabad Sector", color: "text-pink-500" },
                { time: "12:22:55", msg: "New Gazette Node Alchemized", color: "text-indigo-400" },
              ].map((log, i) => (
                <div key={i} className="flex gap-4 items-start group">
                  <span className="text-[9px] font-mono text-slate-800 shrink-0 mt-1">{log.time}</span>
                  <p className={`text-[11px] font-bold leading-tight ${log.color} group-hover:translate-x-1 transition-transform`}>{log.msg}</p>
                </div>
              ))}
           </div>
           <button onClick={() => setView('sentinel')} className="w-full py-2.5 bg-white/5 rounded-xl text-[9px] font-black uppercase text-slate-600 hover:text-white transition-all border border-white/5">
             Open Security Console
           </button>
        </div>
      </div>
    </div>
  );
};