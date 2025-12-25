
import React from 'react';
import { Activity, MapPin, Globe, TrendingUp, Zap, Sparkles } from 'lucide-react';

export const AspirantPulse = ({ db }: any) => {
  const regions = [
    { name: "Hyderabad Central", activity: 98, trend: "+12%", color: "indigo" },
    { name: "Vizag Tech Hub", activity: 85, trend: "+8%", color: "blue" },
    { name: "Warangal Cluster", activity: 72, trend: "-2%", color: "purple" },
    { name: "Vijayawada Sector", activity: 91, trend: "+15%", color: "pink" },
    { name: "Tirupati Zone", activity: 64, trend: "+4%", color: "emerald" }
  ];

  return (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-10 duration-1000">
      <div className="border-b border-white/5 pb-16">
        <h2 className="text-8xl font-black tracking-tighter text-white uppercase italic">ASPIRANT <span className="text-indigo-500">PULSE.</span></h2>
        <p className="text-[11px] font-black uppercase text-slate-500 tracking-[0.7em] mt-4">Geographic Neural Density Telemetry</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-12">
        {/* MAP SIMULATOR */}
        <div className="lg:col-span-8 bg-slate-950/40 border border-white/5 rounded-[64px] p-2 relative overflow-hidden h-[600px] flex items-center justify-center">
           <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
           <div className="relative z-10 w-full h-full p-20 flex flex-col items-center justify-center">
              <Globe className="text-slate-800 animate-spin-slow" size={400}/>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 {regions.map((r, i) => (
                    <div key={i} className={`absolute w-12 h-12 bg-${r.color}-600/20 rounded-full flex items-center justify-center border border-${r.color}-500/50 animate-pulse`} style={{ top: `${20 + (i*15)}%`, left: `${10 + (i*18)}%` }}>
                       <div className={`w-3 h-3 bg-${r.color}-500 rounded-full shadow-[0_0_20px_rgba(79,70,229,0.5)]`}></div>
                    </div>
                 ))}
              </div>
              <div className="absolute bottom-16 left-16 space-y-4">
                 <div className="flex items-center gap-4 text-emerald-500"><Zap size={20}/><span className="text-xs font-black uppercase tracking-widest">Real-time Sync Active</span></div>
                 <p className="text-3xl font-black text-white italic tracking-tighter">GLOBAL NODES ANALYZED: {db.analytics.activeNow.toLocaleString()}</p>
              </div>
           </div>
        </div>

        {/* REGION STATS */}
        <div className="lg:col-span-4 space-y-8">
           <h3 className="text-[10px] font-black uppercase text-indigo-500 tracking-[0.5em] px-8">Regional Heatmap</h3>
           <div className="space-y-4">
              {regions.map((r, i) => (
                 <div key={i} className="bg-slate-950/60 border border-white/5 rounded-[32px] p-8 flex items-center justify-between group hover:border-indigo-500/50 transition-all cursor-pointer">
                    <div className="flex items-center gap-6">
                       <div className={`w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-slate-500 group-hover:text-indigo-500 transition-all`}><MapPin size={24}/></div>
                       <div>
                          <h4 className="text-xl font-black text-white italic uppercase tracking-tighter">{r.name}</h4>
                          <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Density Index: {r.activity}%</p>
                       </div>
                    </div>
                    <div className="text-right">
                       <p className={`text-sm font-black ${r.trend.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>{r.trend}</p>
                       <p className="text-[8px] font-black text-slate-800 uppercase">24HR DELTA</p>
                    </div>
                 </div>
              ))}
           </div>
           
           <div className="bg-indigo-600/5 border border-indigo-500/20 rounded-[40px] p-10 space-y-6">
              <div className="flex items-center gap-4 text-indigo-500"><Sparkles size={20}/><h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-500">Neural Forecast</h4></div>
              <p className="text-sm font-bold text-slate-400 leading-relaxed italic">"Projected 24% increase in TS DSC search clusters within Warangal and Nizamabad sectors by Monday morning."</p>
           </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 120s linear infinite;
        }
      `}} />
    </div>
  );
};
