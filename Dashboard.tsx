
import React, { useState, useEffect } from 'react';
import { 
  DollarSign, Users, Radar, Cpu, ShieldCheck, ArrowUpRight, 
  Terminal, Activity as ActivityIcon, Box, Radio, Zap, Globe, Layers, Circle,
  Trophy, TrendingUp, Sparkles, Target
} from 'lucide-react';

export const Dashboard = ({ db, setView }: any) => {
  const [activeNodes, setActiveNodes] = useState(db.analytics.activeNow || 1542);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNodes(prev => prev + (Math.random() > 0.5 ? 2 : -2));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: "NODES", value: activeNodes.toLocaleString(), icon: <ActivityIcon size={20} className="text-emerald-500"/>, sub: "Live Clusters" },
    { label: "YIELD", value: `₹${(db.analytics.revenue / 1000).toFixed(1)}k`, icon: <DollarSign size={20} className="text-cyan-500"/>, sub: "Global Revenue" },
    { label: "DESK", value: db.analytics.serviceApplications.toString(), icon: <Target size={20} className="text-amber-500"/>, sub: "Service Units" },
    { label: "SALES", value: db.analytics.storeSales.toString(), icon: <ShoppingBagIcon size={20} className="text-indigo-500"/>, sub: "Store Nodes" }
  ];

  function ShoppingBagIcon({size, className}: any) { return <Layers size={size} className={className}/>; }

  return (
    <div className="space-y-32 animate-in fade-in duration-1000 pb-48">
      
      {/* V1400 GOD-CORE SECTION */}
      <div className="flex flex-col xl:flex-row items-center justify-between gap-16 py-8">
        <div className="space-y-12 text-center xl:text-left max-w-4xl">
          <div className="flex flex-wrap items-center gap-6 justify-center xl:justify-start">
             <div className="px-8 py-2 bg-emerald-500/10 border border-emerald-500/10 rounded-full text-[8px] font-black text-emerald-500 uppercase tracking-[0.8em] flex items-center gap-3 italic">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.8)]"></div> SUPREME_STABLE
             </div>
             <p className="text-[9px] font-black text-slate-800 uppercase tracking-[0.6em] italic leading-none border-l border-white/10 pl-6">ETHEREAL_CORE_V14</p>
          </div>
          <div className="space-y-8">
            <h3 className="text-[120px] md:text-[220px] font-black text-white italic tracking-tighter uppercase leading-[0.7] select-none">GOD<span className="text-emerald-500 block">MODE.</span></h3>
            <p className="text-5xl font-bold text-slate-800 italic leading-tight tracking-tight uppercase max-w-2xl">Absolute supremacy through minimal design. The core is unified.</p>
          </div>
          <div className="flex gap-6 justify-center xl:justify-start pt-4">
             <button onClick={() => setView('manage-jobs')} className="px-14 py-6 bg-white text-black rounded-full font-black uppercase text-[12px] tracking-[0.4em] hover:bg-emerald-600 hover:text-white transition-all shadow-2xl active:scale-95 italic">SYNC_REGISTRY</button>
             <button onClick={() => setView('settings')} className="px-14 py-6 bg-white/5 border border-white/5 text-white rounded-full font-black uppercase text-[12px] tracking-[0.4em] hover:bg-white/10 transition-all italic">CONFIG_MESH</button>
          </div>
        </div>

        {/* SENTIENT MESH ORB */}
        <div className="relative w-[550px] h-[550px] flex items-center justify-center shrink-0">
           <div className="absolute inset-0 bg-emerald-600/5 rounded-full blur-[150px] animate-pulse"></div>
           <div className="w-[450px] h-[450px] border border-white/5 rounded-full absolute animate-spin-slow"></div>
           <div className="w-[350px] h-[350px] border border-emerald-500/10 rounded-full absolute animate-spin-slow-reverse"></div>
           <div className="w-[250px] h-[250px] bg-black border border-white/5 rounded-full absolute shadow-inner flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping shadow-[0_0_30px_rgba(16,185,129,1)]"></div>
           </div>
           <div className="relative z-10 text-center space-y-4">
              <span className="text-[140px] font-black text-white italic tracking-tighter leading-none">{activeNodes.toLocaleString()}</span>
              <p className="text-[10px] font-black text-slate-800 uppercase tracking-[1.2em] mt-4 italic">ACTIVE_NODES</p>
           </div>
        </div>
      </div>

      {/* TITANIUM STAT GRID - NO BOXES, JUST PURE TYPOGRAPHY */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-16 border-y border-white/[0.03] py-20">
        {stats.map((stat, i) => (
          <div key={i} className="space-y-6 group cursor-default text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-4">
               {stat.icon}
               <p className="text-[9px] font-black text-slate-800 uppercase tracking-[0.8em] italic">{stat.label}</p>
            </div>
            <div className="space-y-1">
               <h4 className="text-8xl font-black text-white italic tracking-tighter leading-none group-hover:text-emerald-500 transition-colors">{stat.value}</h4>
               <p className="text-[8px] font-bold text-slate-900 uppercase tracking-widest">{stat.sub}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-20">
         {/* THE SENTIENT MESH MONITOR */}
         <div className="lg:col-span-8 space-y-12 relative">
            <div className="flex justify-between items-center px-6">
               <h4 className="text-3xl font-black italic uppercase text-white flex items-center gap-6">
                 <Radio className="text-emerald-500 animate-pulse" size={32}/> GLOBAL_SENTIENT_MESH
               </h4>
               <div className="flex gap-6">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-emerald-500/20 rounded-full"></div>
                  <div className="w-3 h-3 bg-emerald-500/10 rounded-full"></div>
               </div>
            </div>
            <div className="h-[550px] w-full bg-[#050505] border border-white/[0.03] rounded-[100px] relative overflow-hidden shadow-inner flex items-center justify-center group">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] group-hover:opacity-[0.05] transition-opacity duration-1000"></div>
                
                {/* ETHEREAL RADAR EFFECT */}
                <div className="w-[800px] h-[800px] border border-emerald-500/[0.02] rounded-full absolute animate-ping-slow"></div>
                <div className="w-[400px] h-[400px] border border-white/[0.02] rounded-full absolute"></div>
                <div className="w-px h-full bg-white/[0.02] absolute left-1/2 -translate-x-1/2"></div>
                <div className="w-full h-px bg-white/[0.02] absolute top-1/2 -translate-y-1/2"></div>

                <div className="relative z-10 flex gap-24">
                   <div className="text-center space-y-4">
                      <p className="text-7xl font-black text-white italic tracking-tighter">0.05ms</p>
                      <p className="text-[8px] font-black text-slate-800 uppercase tracking-[1em]">MESH_LATENCY</p>
                   </div>
                   <div className="text-center space-y-4 border-l border-white/5 pl-24">
                      <p className="text-7xl font-black text-emerald-500 italic tracking-tighter">99.99%</p>
                      <p className="text-[8px] font-black text-slate-800 uppercase tracking-[1em]">SYSTEM_HEALTH</p>
                   </div>
                </div>
            </div>
         </div>

         {/* PURE KERNEL LOGS */}
         <div className="lg:col-span-4 bg-[#050505] border border-white/[0.03] rounded-[100px] p-16 space-y-12 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-5"><Cpu size={300}/></div>
            <div className="space-y-12 relative z-10">
               <div className="flex items-center justify-between border-b border-white/[0.02] pb-10">
                  <h4 className="text-[8px] font-black text-slate-800 uppercase tracking-[1em] flex items-center gap-4 italic leading-none">
                    <Terminal size={18} className="text-emerald-500"/> KERNEL_STREAM
                  </h4>
                  <div className="flex gap-2">
                     <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                  </div>
               </div>
               <div className="space-y-10 font-mono text-[10px] text-slate-700 h-[380px] overflow-y-auto scrollbar-hide pr-4">
                  <p className="text-emerald-500/50 border-l border-emerald-500/10 pl-6 py-1.5 italic">[{new Date().toLocaleTimeString()}] ETHEREAL_GOD_MODE: ACTIVE</p>
                  <p className="text-white/10 border-l border-white/5 pl-6 py-1.5 italic">[{new Date().toLocaleTimeString()}] DATA_SYNC_PROTOCOL_V14: SUCCESS</p>
                  <p className="text-cyan-500/50 border-l border-cyan-500/10 pl-6 py-1.5 italic">[{new Date().toLocaleTimeString()}] NODES_VERIFIED: {activeNodes}</p>
                  <p className="text-slate-800 border-l border-white/5 pl-6 py-1.5 italic">[{new Date().toLocaleTimeString()}] NO_ANOMALIES_DETECTED</p>
               </div>
            </div>
            <button onClick={() => setView('settings')} className="w-full bg-white/[0.02] py-10 rounded-full border border-white/10 text-[8px] font-black text-white uppercase tracking-[0.8em] hover:bg-emerald-600 transition-all italic flex items-center justify-center gap-4 group relative z-10">
               PURGE_CACHE <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={14}/>
            </button>
         </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spin-slow-reverse { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
        .animate-spin-slow { animation: spin-slow 120s linear infinite; }
        .animate-spin-slow-reverse { animation: spin-slow-reverse 80s linear infinite; }
        @keyframes ping-slow { 0% { transform: scale(0.6); opacity: 0.9; } 100% { transform: scale(2.8); opacity: 0; } }
        .animate-ping-slow { animation: ping-slow 10s ease-out infinite; }
      `}} />
    </div>
  );
};
