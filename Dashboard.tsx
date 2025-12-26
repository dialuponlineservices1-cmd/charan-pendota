import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, Zap, Soul, Atom, Globe, 
  DollarSign, Crown, Target, Activity, 
  Network, ArrowRight, Layers, Cpu, Sparkles,
  Compass, BarChart3, Database, ShieldCheck
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
    { label: "Neural Traffic", value: db.analytics.activeNow.toLocaleString(), trend: "+14.2%", icon: <Globe className="text-pink-500" size={18}/> },
    { label: "Imperial Yield", value: `₹${(revenue/100000).toFixed(2)}L`, trend: "+5.1%", icon: <DollarSign className="text-emerald-500" size={18}/> },
    { label: "Mastery Index", value: "98.4%", trend: "Stable", icon: <Trophy className="text-indigo-500" size={18}/> },
    { label: "Compute Load", value: "14ms", trend: "Optimal", icon: <Cpu className="text-amber-500" size={18}/> }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      
      {/* Sovereign Hero Header */}
      <div className="bg-[#050505] border border-white/5 rounded-[40px] p-10 relative overflow-hidden group shadow-2xl">
        <div className="absolute top-0 right-0 p-12 opacity-[0.02] scale-150 rotate-12 transition-transform duration-1000 group-hover:rotate-0">
          <Soul size={400}/>
        </div>
        
        <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-pink-600/10 border border-pink-500/20 rounded-full">
              <Sparkles size={12} className="text-pink-500 animate-pulse"/>
              <span className="text-[10px] font-black text-pink-500 uppercase tracking-widest italic">Omniscience v3 Active</span>
            </div>
            <h1 className="text-6xl font-black text-white italic leading-[1.1] uppercase tracking-tighter">
              COMMAND <br/><span className="text-pink-600 underline decoration-pink-600/20 underline-offset-8">INTERFACE.</span>
            </h1>
            <p className="text-slate-500 max-w-sm font-medium leading-relaxed italic text-base">
              Synchronizing neural nodes across TSPSC, APPSC, and Imperial registries in real-time.
            </p>
            <div className="flex gap-4 pt-2">
              <button onClick={() => setView('magic-editor')} className="bg-white text-black px-6 py-2.5 rounded-xl font-bold uppercase text-[10px] tracking-widest hover:bg-pink-600 hover:text-white transition-all flex items-center gap-3 shadow-xl shadow-white/5">
                Quick Deploy <Zap size={14}/>
              </button>
              <button onClick={() => setView('strategy')} className="bg-white/5 text-white border border-white/10 px-6 py-2.5 rounded-xl font-bold uppercase text-[10px] tracking-widest hover:bg-white/10 transition-all flex items-center gap-3">
                Warp Roadmap <Compass size={14}/>
              </button>
            </div>
          </div>
          
          <div className="bg-white/[0.02] border border-white/5 rounded-[32px] p-8 backdrop-blur-md relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-600/5 to-indigo-600/5 pointer-events-none"></div>
            <div className="flex items-center justify-between mb-8">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em]">Global Yield Stream</p>
                <h3 className="text-3xl font-black text-white italic tracking-tighter">₹{revenue.toLocaleString()}</h3>
              </div>
              <TrendingUp className="text-emerald-500" size={28}/>
            </div>
            <div className="h-28 flex items-end gap-1 px-1">
              {[40, 60, 45, 90, 65, 80, 50, 70, 40, 85, 95, 70, 60, 80, 55, 90].map((h, i) => (
                <div key={i} className="flex-1 bg-pink-600/10 rounded-t-sm relative group/bar hover:bg-pink-600 transition-all duration-300" style={{ height: `${h}%` }}>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Telemetry Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-black border border-white/5 p-6 rounded-3xl hover:border-pink-500/30 transition-all duration-500 group shadow-lg">
             <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 bg-white/5 rounded-xl group-hover:scale-110 transition-transform">{stat.icon}</div>
                <span className={`text-[9px] font-bold italic ${stat.trend.startsWith('+') ? 'text-emerald-500' : 'text-slate-600'}`}>{stat.trend}</span>
             </div>
             <p className="text-[9px] font-bold text-slate-700 uppercase tracking-widest mb-1">{stat.label}</p>
             <h4 className="text-2xl font-black text-white italic tracking-tighter">{stat.value}</h4>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Sector Integrity Monitor */}
        <div className="lg:col-span-8 bg-black border border-white/5 rounded-[40px] p-8 space-y-6">
           <div className="flex items-center justify-between px-2">
              <h3 className="text-sm font-black text-white italic uppercase tracking-widest flex items-center gap-3">
                <Layers className="text-pink-500" size={16}/> Sector Integrity
              </h3>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-[9px] font-bold text-slate-700 uppercase tracking-widest">LIVE_MONITORING</span>
              </div>
           </div>
           <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {['TS Gov', 'AP Gov', 'SSC/UPSC', 'Entrance'].map((name, i) => (
                <div key={i} className="bg-white/[0.01] border border-white/5 rounded-2xl p-5 hover:border-pink-500/20 transition-all cursor-pointer group">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[9px] font-black text-slate-700 uppercase group-hover:text-slate-400 transition-colors">{name}</span>
                    <span className="text-base font-black text-white italic">{82 + (i * 4)}%</span>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-pink-600 rounded-full shadow-[0_0_10px_#ec4899]" style={{ width: `${82 + (i * 4)}%` }}></div>
                  </div>
                </div>
              ))}
           </div>
        </div>

        {/* Neural Audit Trail */}
        <div className="lg:col-span-4 bg-black border border-white/5 rounded-[40px] p-8 space-y-6 flex flex-col shadow-xl">
           <h3 className="text-sm font-black text-white italic uppercase tracking-widest flex items-center gap-3">
             <Activity className="text-red-500" size={16}/> Neural Audit
           </h3>
           <div className="flex-1 space-y-4 overflow-y-auto scrollbar-hide pr-2 max-h-[160px]">
              {[
                { time: "12:44", msg: "Database Defrag Successful", color: "text-emerald-500" },
                { time: "12:38", msg: "Veo Node #42 Rendered", color: "text-white/40" },
                { time: "12:30", msg: "Traffic Spike: Hyderabad Sector", color: "text-pink-500" },
                { time: "12:22", msg: "New Gazette Node Alchemized", color: "text-indigo-400" },
              ].map((log, i) => (
                <div key={i} className="flex gap-4 items-start group">
                  <span className="text-[8px] font-mono text-slate-800 shrink-0 mt-1 uppercase">{log.time}</span>
                  <p className={`text-[10px] font-bold leading-tight ${log.color} group-hover:translate-x-1 transition-transform truncate`}>{log.msg}</p>
                </div>
              ))}
           </div>
           <button onClick={() => setView('sentinel')} className="w-full py-2 bg-white/5 rounded-xl text-[9px] font-black uppercase text-slate-700 hover:text-white transition-all border border-white/5">
             LAUNCH_SENTINEL
           </button>
        </div>
      </div>
    </div>
  );
};

// Add missing icon component mock or import
const Trophy = ({ className, size }: { className?: string, size?: number }) => <ShieldCheck className={className} size={size} />;