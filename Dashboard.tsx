
import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, Zap, Soul, Atom, Boxes, Network, Globe, 
  DollarSign, Crown, Target, Activity, HardDrive, Cpu, 
  Sparkles, ArrowRight, BarChart3, LineChart
} from 'lucide-react';

export const Dashboard = ({ db, setView }: any) => {
  const [wealthClock, setWealthClock] = useState(db.analytics.revenue);

  useEffect(() => {
    const interval = setInterval(() => {
      setWealthClock(prev => prev + Math.random() * 1200);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const coreStats = [
    { label: "NEURAL_SESSIONS", value: "42.8M", trend: "+14%", color: "pink", icon: <Activity size={32}/> },
    { label: "YIELD_VELOCITY", value: "₹4.2Cr/mo", trend: "+22%", color: "emerald", icon: <TrendingUp size={32}/> },
    { label: "LATTICE_HEALTH", value: "99.9%", trend: "STABLE", color: "cyan", icon: <Zap size={32}/> },
    { label: "PEER_DENSITY", value: "1.2M", trend: "SCALING", color: "indigo", icon: <Network size={32}/> }
  ];

  return (
    <div className="space-y-12 w-full animate-in fade-in duration-1000 pb-[500px]">
      
      {/* PRIME GODHEAD HERO */}
      <div className="bg-[#050505] border-[2px] border-white/5 rounded-[60px] p-12 xl:p-24 flex flex-col xl:flex-row items-center justify-between gap-12 relative overflow-hidden shadow-4xl group min-h-[700px]">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#ec489910_0%,_transparent_70%)] opacity-50 group-hover:opacity-100 transition-opacity duration-1000"></div>
         <div className="absolute -bottom-48 -left-48 p-24 opacity-[0.03] scale-[15] pointer-events-none text-pink-500 group-hover:rotate-90 transition-transform duration-[5000ms]"><Atom size={100}/></div>
         
         <div className="space-y-12 max-w-4xl relative z-10 text-center xl:text-left">
            <div className="inline-flex items-center gap-3 px-6 py-2 glass rounded-full shadow-2xl">
               <div className="w-3 h-3 bg-pink-500 rounded-full animate-pulse shadow-[0_0_15px_#ec4899]"></div>
               <span className="text-sm font-black text-pink-500 uppercase tracking-widest italic leading-none">PRIME_GODHEAD_V3.0_ONLINE</span>
            </div>
            <h1 className="text-8xl md:text-[180px] font-black italic text-white uppercase tracking-tighter leading-[0.85] transition-all group-hover:tracking-tight italic">OMNI <br/><span className="text-pink-500">SCIENT.</span></h1>
            <div className="flex flex-wrap gap-4 justify-center xl:justify-start pt-8">
               <button onClick={() => setView('bot')} className="bg-white text-black px-10 py-4 rounded-full font-black uppercase text-xl tracking-widest hover:bg-pink-600 hover:text-white transition-all shadow-pink active:scale-95 italic flex items-center gap-3 border-[2px] border-black group/btn">
                  PRIME_COMMAND <ArrowRight size={24} className="group-hover/btn:translate-x-2 transition-transform"/>
               </button>
               <button onClick={() => setView('warper')} className="bg-pink-600 text-black px-10 py-4 rounded-full font-black uppercase text-xl tracking-widest hover:bg-white hover:text-black transition-all shadow-4xl active:scale-95 italic flex items-center gap-3 border-[2px] border-black">
                  WARP_ROADMAP <Sparkles size={24}/>
               </button>
            </div>
         </div>
         
         <div className="relative w-full xl:w-[600px] aspect-square flex items-center justify-center">
            <div className="absolute inset-0 bg-pink-600/5 rounded-full blur-[150px] animate-pulse"></div>
            <div className="w-full h-full border-[1px] border-white/10 rounded-full animate-spin-slow absolute opacity-30"></div>
            <div className="w-[80%] h-[80%] border-[1px] border-pink-500/10 rounded-full animate-spin absolute"></div>
            <div className="relative z-10 text-center space-y-2">
               <span className="text-8xl xl:text-[140px] font-black italic text-white leading-none tracking-tighter">₹{((wealthClock / 10000000).toFixed(2))}Cr</span>
               <p className="text-xl xl:text-3xl font-black text-pink-600 uppercase tracking-[1em] italic leading-none">NUCLEUS_LIQUIDITY</p>
            </div>
         </div>
      </div>

      {/* REFINED TELEMETRY GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {coreStats.map((s, i) => (
          <div key={i} className="glass rounded-[40px] p-8 space-y-4 text-center group hover:border-pink-500/50 transition-all relative overflow-hidden shadow-4xl">
             <div className="absolute top-4 right-4 opacity-[0.05] text-white group-hover:scale-110 transition-transform">{s.icon}</div>
             <p className="text-xs font-black text-slate-500 uppercase tracking-widest group-hover:text-white transition-colors">{s.label}</p>
             <h4 className="text-5xl font-black text-white italic leading-none tracking-tighter">{s.value}</h4>
             <div className="flex items-center justify-center gap-2 text-emerald-400 text-sm font-black italic">
                <TrendingUp size={16}/> {s.trend}
             </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
         {/* SECTORAL NODES */}
         <div className="glass rounded-[60px] p-12 space-y-12 relative overflow-hidden shadow-4xl group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_#06b6d405_0%,_transparent_50%)]"></div>
            <div className="flex items-center justify-between px-4 relative z-10">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-cyan-600/10 rounded-2xl flex items-center justify-center border border-cyan-500/20 text-cyan-500 group-hover:rotate-12 transition-transform">
                    <Boxes size={24}/>
                  </div>
                  <h3 className="text-4xl font-black italic uppercase tracking-tighter text-white">SECTOR_NODES</h3>
               </div>
               <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest italic">REAL_TIME_LATTICE_MONITOR</span>
            </div>
            <div className="grid grid-cols-2 gap-4 p-4 relative z-10">
               {['TS_GOVT', 'AP_GOVT', 'PRIVATE', 'ENTRANCE'].map((name, i) => (
                 <div key={i} className="bg-black/50 border border-white/5 rounded-[40px] p-8 flex flex-col items-center justify-center space-y-2 group/node hover:border-cyan-500 transition-all cursor-crosshair">
                    <h4 className="text-xl font-black text-white italic uppercase tracking-tighter">{name}</h4>
                    <div className="text-5xl font-black text-cyan-500 leading-none">{80 + (i * 5)}%</div>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-cyan-600" style={{ width: `${80 + (i * 5)}%` }}></div>
                    </div>
                 </div>
               ))}
            </div>
         </div>

         {/* GLOBAL NEXUS PULSE */}
         <div className="glass rounded-[60px] p-12 space-y-8 text-center flex flex-col items-center justify-center group shadow-4xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#ec489905_0%,_transparent_70%)] animate-pulse"></div>
            <div className="w-32 h-32 glass rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
               <Globe size={64} className="text-pink-500/30"/>
            </div>
            <div className="space-y-4 relative z-10">
               <h3 className="text-5xl font-black italic uppercase text-white tracking-tighter leading-none">GLOBAL_NEXUS</h3>
               <p className="text-sm font-medium text-slate-500 italic max-w-md mx-auto leading-relaxed uppercase tracking-widest">
                 "Synchronizing with 14.2M active neural signatures across the sub-continent lattice."
               </p>
               <button onClick={() => setView('hyperspace')} className="bg-white text-black px-8 py-3 rounded-full font-black uppercase text-xs tracking-widest border-[4px] border-black hover:bg-pink-600 hover:text-white transition-all shadow-4xl">
                  ENTER_HYPERSPACE_TELEMETRY
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};