
import React, { useState, useEffect } from 'react';
import { 
  DollarSign, Users, Radar, Cpu, ShieldCheck, ArrowUpRight, 
  Terminal, Activity as ActivityIcon, Radio, Zap, Globe, Layers,
  Target, BarChart3, TrendingUp, Sparkles, ChevronRight
} from 'lucide-react';

export const Dashboard = ({ db, setView }: any) => {
  const [activeNodes, setActiveNodes] = useState(db.analytics.activeNow || 1842);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNodes(prev => prev + (Math.random() > 0.5 ? 1 : -1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: "NODES", value: activeNodes.toLocaleString(), icon: <ActivityIcon size={18} className="text-emerald-500"/>, sub: "Live Threads" },
    { label: "YIELD", value: `₹${(db.analytics.revenue / 1000).toFixed(1)}k`, icon: <DollarSign size={18} className="text-white"/>, sub: "Revenue Index" },
    { label: "UNITS", value: db.analytics.serviceApplications.toString(), icon: <Target size={18} className="text-emerald-500"/>, sub: "Active Desk" },
    { label: "CLUSTERS", value: db.analytics.storeSales.toString(), icon: <Layers size={18} className="text-white"/>, sub: "Market Assets" }
  ];

  return (
    <div className="space-y-32 animate-in fade-in duration-1000 pb-48">
      
      {/* SPECTRAL CORE HEADER */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-20 py-10">
        <div className="space-y-12 max-w-3xl text-center lg:text-left">
           <div className="inline-flex items-center gap-4 px-6 py-2 bg-white/[0.02] border border-white/[0.05] rounded-full">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.8)]"></div>
              <p className="text-[7px] font-black text-slate-700 uppercase tracking-[0.8em] italic">NEURAL_MESH_STABLE_V15</p>
           </div>
           <div className="space-y-8">
              <h3 className="text-7xl md:text-9xl font-black text-white italic tracking-tighter uppercase leading-[0.8]">SPECTRAL<span className="text-emerald-500 block">CONTROL.</span></h3>
              <p className="text-3xl font-bold text-slate-800 italic uppercase leading-tight max-w-xl">A more refined, clear, and powerful administrative singularity.</p>
           </div>
           <div className="flex gap-6 justify-center lg:justify-start pt-6">
              <button onClick={() => setView('manage-jobs')} className="px-14 py-6 bg-white text-black rounded-full font-black uppercase text-[11px] tracking-[0.3em] hover:bg-emerald-600 hover:text-white transition-all shadow-2xl active:scale-95 italic">SYNC_REGISTRY</button>
              <button onClick={() => setView('settings')} className="px-14 py-6 bg-white/[0.02] border border-white/[0.05] text-white rounded-full font-black uppercase text-[11px] tracking-[0.3em] hover:bg-white/[0.05] transition-all italic">MESH_CONFIG</button>
           </div>
        </div>

        {/* THE SPECTRAL ORB */}
        <div className="relative w-[500px] h-[500px] flex items-center justify-center shrink-0">
           <div className="absolute inset-0 bg-emerald-600/5 rounded-full blur-[160px] animate-pulse"></div>
           <div className="w-[400px] h-[400px] border border-white/[0.03] rounded-full absolute animate-spin-slow"></div>
           <div className="w-[300px] h-[300px] border border-emerald-500/10 rounded-full absolute animate-spin-slow-reverse"></div>
           <div className="relative z-10 text-center">
              <span className="text-[140px] font-black text-white italic tracking-tighter leading-none">{activeNodes.toLocaleString()}</span>
              <p className="text-[10px] font-black text-slate-800 uppercase tracking-[1.5em] mt-8 italic">ACTIVE_CLUSTERS</p>
           </div>
        </div>
      </div>

      {/* MINIMAL TITANIUM STATS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 border-y border-white/[0.02] py-20">
        {stats.map((stat, i) => (
          <div key={i} className="space-y-6 group cursor-default text-center lg:text-left border-l border-white/[0.02] pl-12 first:border-l-0">
            <div className="flex items-center justify-center lg:justify-start gap-4">
               {stat.icon}
               <p className="text-[8px] font-black text-slate-800 uppercase tracking-[0.8em] italic">{stat.label}</p>
            </div>
            <div className="space-y-1">
               <h4 className="text-7xl font-black text-white italic tracking-tighter leading-none group-hover:text-emerald-500 transition-colors">{stat.value}</h4>
               <p className="text-[7px] font-black text-slate-900 uppercase tracking-widest">{stat.sub}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-16">
         {/* THE MESH - ANALYTICS */}
         <div className="lg:col-span-8 bg-[#050505] border border-white/[0.03] rounded-[100px] p-16 space-y-12 relative overflow-hidden group shadow-2xl">
            <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12 transition-transform duration-1000 group-hover:rotate-0"><Radar size={400} className="text-emerald-500"/></div>
            <div className="flex justify-between items-center relative z-20 px-4">
               <h4 className="text-2xl font-black italic uppercase text-white flex items-center gap-6">
                 <ShieldCheck className="text-emerald-500" size={24}/> GLOBAL_SENTIENCE_MESH
               </h4>
               <div className="flex gap-4">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-emerald-500/20 rounded-full"></div>
                  <div className="w-2 h-2 bg-emerald-500/10 rounded-full"></div>
               </div>
            </div>
            <div className="h-[480px] w-full bg-black border border-white/[0.03] rounded-[80px] relative overflow-hidden flex items-center justify-center shadow-inner group-hover:border-emerald-500/20 transition-all duration-700">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02]"></div>
                
                {/* RADAR SWEEP */}
                <div className="w-[600px] h-[600px] border border-emerald-500/[0.02] rounded-full absolute animate-ping-slow"></div>
                <div className="w-[300px] h-[300px] border border-white/[0.01] rounded-full absolute"></div>
                
                <div className="relative z-10 flex gap-24">
                   <div className="text-center space-y-4">
                      <p className="text-6xl font-black text-white italic tracking-tighter">0.02ms</p>
                      <p className="text-[8px] font-black text-slate-800 uppercase tracking-[1em]">MESH_LATENCY</p>
                   </div>
                   <div className="text-center space-y-4 border-l border-white/[0.05] pl-24">
                      <p className="text-6xl font-black text-emerald-500 italic tracking-tighter">99.9%</p>
                      <p className="text-[8px] font-black text-slate-800 uppercase tracking-[1em]">CORE_INTEGRITY</p>
                   </div>
                </div>
            </div>
         </div>

         {/* LIVE KERNEL STREAM */}
         <div className="lg:col-span-4 bg-[#080808] border border-white/[0.03] rounded-[100px] p-16 space-y-12 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-12 opacity-[0.02] group-hover:opacity-10 transition-opacity duration-1000"><Cpu size={300} className="text-emerald-500"/></div>
            <div className="space-y-12 relative z-20">
               <div className="flex items-center justify-between border-b border-white/[0.03] pb-10">
                  <h4 className="text-[8px] font-black text-slate-800 uppercase tracking-[1.2em] flex items-center gap-5 italic leading-none">
                    <Terminal size={18} className="text-emerald-500"/> KERNEL_STREAM
                  </h4>
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
               </div>
               <div className="space-y-10 font-mono text-[9px] text-slate-700 h-[340px] overflow-y-auto scrollbar-hide pr-6">
                  <p className="text-emerald-500/40 border-l border-emerald-500/10 pl-6 py-1.5 italic">[{new Date().toLocaleTimeString()}] SPECTRAL_INIT: NOMINAL</p>
                  <p className="text-white/10 border-l border-white/5 pl-6 py-1.5 italic">[{new Date().toLocaleTimeString()}] CLUSTER_SYNC: SUCCESS</p>
                  <p className="text-emerald-500/20 border-l border-emerald-500/5 pl-6 py-1.5 italic">[{new Date().toLocaleTimeString()}] DATA_PULSE_TX: {activeNodes}</p>
                  <p className="text-slate-900 border-l border-white/5 pl-6 py-1.5 italic">[{new Date().toLocaleTimeString()}] NO_ANOMALIES_DETECTED</p>
               </div>
            </div>
            <button onClick={() => setView('settings')} className="w-full bg-white/[0.01] py-10 rounded-full border border-white/[0.05] text-[8px] font-black text-white uppercase tracking-[0.8em] hover:bg-emerald-600 transition-all italic flex items-center justify-center gap-4 group/btn relative z-20">
               RE-PURGE MESH <ArrowUpRight className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" size={14}/>
            </button>
         </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spin-slow-reverse { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
        .animate-spin-slow { animation: spin-slow 150s linear infinite; }
        .animate-spin-slow-reverse { animation: spin-slow-reverse 100s linear infinite; }
        @keyframes ping-slow { 0% { transform: scale(0.6); opacity: 0.8; } 100% { transform: scale(3); opacity: 0; } }
        .animate-ping-slow { animation: ping-slow 12s ease-out infinite; }
      `}} />
    </div>
  );
};
