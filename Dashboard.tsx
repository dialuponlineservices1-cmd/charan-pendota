
import React from 'react';
import { 
  DollarSign, Activity, Target, Layers, 
  Cpu, Zap, TrendingUp, BarChart3, Globe,
  Megaphone, ShoppingBag, MessageSquare, Radar
} from 'lucide-react';

export const Dashboard = ({ db, setView }: any) => {
  const stats = [
    { label: "ARENA NODES", value: db.analytics.activeNow.toLocaleString(), icon: <Activity className="text-red-500" size={28}/>, trend: "+18.2%" },
    { label: "YIELD (INR)", value: `₹${(db.analytics.revenue / 1000000).toFixed(2)}M`, icon: <DollarSign className="text-white" size={28}/>, trend: "+32.4%" },
    { label: "REGISTRY SYNC", value: db.analytics.serviceApplications.toString(), icon: <Target className="text-red-500" size={28}/>, trend: "+14.1%" },
    { label: "MALL CONVERSIONS", value: db.analytics.storeSales.toString(), icon: <ShoppingBag className="text-white" size={28}/>, trend: "+22.5%" }
  ];

  return (
    <div className="space-y-24 animate-in fade-in duration-1000 pb-48">
      
      {/* EMPEROR HERO CONSOLE */}
      <div className="bg-[#050505] border border-white/5 rounded-[100px] p-24 md:p-36 flex flex-col lg:flex-row items-center justify-between gap-24 relative overflow-hidden shadow-4xl">
         <div className="absolute top-0 right-0 p-32 opacity-[0.04] scale-[5] rotate-12 pointer-events-none"><Cpu size={400}/></div>
         <div className="space-y-14 max-w-4xl relative z-10 text-center lg:text-left">
            <div className="inline-flex items-center gap-6 px-10 py-4 bg-red-600/5 border border-red-600/10 rounded-full">
               <div className="w-4 h-4 bg-red-600 rounded-full animate-pulse"></div>
               <span className="text-[13px] font-black text-red-600 uppercase tracking-widest italic">SOVEREIGN_V5000_EMPEROR</span>
            </div>
            <h1 className="text-9xl md:text-[180px] font-black italic text-white uppercase tracking-tighter leading-[0.7] italic">EMPIRE<br/><span className="text-red-600">COMMAND.</span></h1>
            <p className="text-5xl font-bold text-slate-800 italic uppercase leading-tight">World #1 Telugu Recruitment Hub. stack ads, automate content, and claim your dominance.</p>
            <div className="flex flex-wrap gap-10 justify-center lg:justify-start pt-14">
               <button onClick={() => setView('magic-editor')} className="bg-white text-black px-24 py-10 rounded-full font-black uppercase text-[16px] tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-4xl active:scale-95 italic flex items-center gap-6"><Zap size={32}/> BILINGUAL FORGE</button>
               <button onClick={() => setView('ad-matrix')} className="bg-white/5 border border-white/10 text-white px-24 py-10 rounded-full font-black uppercase text-[16px] tracking-widest hover:bg-white/10 transition-all italic flex items-center gap-6"><Megaphone size={32}/> AD MATRIX</button>
            </div>
         </div>
         
         <div className="relative w-[500px] h-[500px] lg:w-[750px] lg:h-[750px] shrink-0 flex items-center justify-center">
            <div className="absolute inset-0 bg-red-600/5 rounded-full blur-[250px] animate-pulse"></div>
            <div className="w-full h-full border-4 border-white/5 rounded-full animate-spin-[200s] absolute"></div>
            <div className="relative z-10 text-center space-y-12">
               <span className="text-[200px] font-black italic text-white leading-none tracking-tighter">{(db.analytics.activeNow / 1000).toFixed(0)}K</span>
               <p className="text-[16px] font-black text-slate-800 uppercase tracking-[1em] italic">EMPIRE_SYCHRONIZATION_LIVE</p>
            </div>
         </div>
      </div>

      {/* STRATEGIC METRICS GRID */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-16">
        {stats.map((stat, i) => (
          <div key={i} className="bg-[#050505] border border-white/5 p-20 rounded-[100px] space-y-12 hover:border-red-600 transition-all group shadow-4xl relative overflow-hidden">
             <div className="absolute -bottom-16 -right-16 opacity-5 transition-transform group-hover:scale-150 duration-1000">{stat.icon}</div>
             <div className="flex items-center gap-10 relative z-10">
                <div className="w-20 h-20 bg-white/5 rounded-[40px] flex items-center justify-center group-hover:bg-red-600 transition-all shadow-3xl group-hover:scale-110">{stat.icon}</div>
                <span className="text-[13px] font-black text-slate-800 uppercase tracking-widest group-hover:text-slate-500 italic">{stat.label}</span>
             </div>
             <div className="space-y-4 relative z-10">
                <h4 className="text-9xl font-black italic text-white group-hover:text-red-600 transition-colors tracking-tighter leading-none">{stat.value}</h4>
                <div className="flex items-center gap-5 text-emerald-500 text-[13px] font-black uppercase tracking-widest mt-8">
                   <TrendingUp size={24}/> {stat.trend} CTR DELTA
                </div>
             </div>
          </div>
        ))}
      </div>

      {/* DEEP REASONING REVENUE TELEMETRY */}
      <div className="grid lg:grid-cols-12 gap-20">
         <div className="lg:col-span-8 bg-[#050505] border border-white/5 rounded-[120px] p-28 space-y-24 relative overflow-hidden group shadow-4xl">
            <div className="flex justify-between items-center relative z-10">
               <h3 className="text-6xl font-black italic uppercase text-white flex items-center gap-12"><Radar className="text-red-600" size={64}/> Imperial Revenue Heatmap</h3>
               <div className="flex gap-6">
                  <div className="w-5 h-5 bg-red-600 rounded-full animate-ping"></div>
                  <div className="w-5 h-5 bg-white/10 rounded-full"></div>
               </div>
            </div>
            <div className="h-[600px] w-full bg-black rounded-[90px] border border-white/5 relative overflow-hidden flex items-center justify-center group-hover:border-red-600/10 transition-all shadow-inner">
                <div className="text-center space-y-14 relative z-10">
                   <h4 className="text-[300px] font-black italic text-white opacity-5 leading-none">99.9</h4>
                   <p className="text-[18px] font-black text-slate-800 uppercase tracking-[3em] italic">YIELD_STABILITY_PROTOCOL</p>
                </div>
                {/* Dynamic Telemetry Visualization */}
                <div className="absolute bottom-0 left-0 w-full h-64 flex items-end gap-2 opacity-30 pointer-events-none px-10">
                   {Array.from({length: 80}).map((_, i) => (
                      <div key={i} className="flex-1 bg-red-600 rounded-t-2xl" style={{ height: `${Math.random() * 100}%` }}></div>
                   ))}
                </div>
            </div>
         </div>

         <div className="lg:col-span-4 bg-red-600 text-white rounded-[120px] p-28 flex flex-col justify-between shadow-4xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-20 opacity-10 rotate-12 scale-200 transition-transform group-hover:scale-125 duration-1000"><Zap size={500}/></div>
            <div className="space-y-16 relative z-10">
               <h4 className="text-8xl font-black italic uppercase tracking-tighter leading-tight italic">YIELD <br/> MATRIX.</h4>
               <p className="text-4xl font-bold uppercase italic opacity-85 leading-relaxed">Ad-Slot optimization complete. Scaling to 154k+ sentient nodes in AP/TS.</p>
            </div>
            <button onClick={() => setView('settings')} className="bg-black text-white py-14 rounded-full font-black uppercase text-[16px] tracking-[1em] relative z-10 hover:bg-white hover:text-black transition-all shadow-4xl italic">SYSTEM_SYNC</button>
         </div>
      </div>
    </div>
  );
};
