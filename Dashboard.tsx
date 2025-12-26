
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { 
  Activity, Target, Cpu, Zap, TrendingUp, Radar, Flame, Coins, Crown, 
  LineChart, Eye, Globe, ZapOff, RefreshCw, Sparkles, Brain, HardDrive, ArrowUpRight, ArrowDownRight,
  GraduationCap, BarChart4, DollarSign, Gem, ShieldCheck, Rocket, MessageSquare, Flag, Megaphone,
  Binary, Waves, Satellite, Fingerprint, MapPin, Briefcase, Map, Share2, Youtube, Send, Search
} from 'lucide-react';

export const Dashboard = ({ db, setView }: any) => {
  const [wealthClock, setWealthClock] = useState(db.analytics.revenue);

  useEffect(() => {
    const interval = setInterval(() => {
      setWealthClock(prev => prev + Math.random() * 800);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const influxSources = [
    { name: "WHATSAPP_GROUPS", flow: 84, color: "emerald", icon: <MessageSquare/> },
    { name: "YOUTUBE_CHANNELS", flow: 72, color: "red", icon: <Youtube/> },
    { name: "TELEGRAM_SYNC", flow: 91, color: "blue", icon: <Send/> },
    // Fixed: Search icon is now properly imported from lucide-react
    { name: "DIRECT_SEARCH", flow: 42, color: "yellow", icon: <Search/> }
  ];

  const regionalPulse = [
    { name: "HYDERABAD", heat: 98, trend: "EXPLODING", color: "emerald" },
    { name: "VIZAG", heat: 84, trend: "HIGH_LOAD", color: "blue" },
    { name: "WARANGAL", heat: 72, trend: "SCALING", color: "yellow" },
    { name: "VJY_GNT", heat: 91, trend: "STABLE", color: "pink" }
  ];

  return (
    <div className="space-y-48 animate-in fade-in duration-[2000ms] pb-100 selection:bg-yellow-600">
      
      {/* OMEGA ASCENSION MARQUEE */}
      <div className="bg-yellow-600 h-[150px] flex items-center overflow-hidden border-y-[20px] border-black rounded-full shadow-4xl sticky top-0 z-[1000] group cursor-wait">
         <div className="flex animate-marquee whitespace-nowrap gap-200 items-center">
            {[1,2,3,4].map(i => (
              <div key={i} className="flex items-center gap-16 px-24">
                 <span className="text-[64px] font-black text-black uppercase italic leading-none">V1000_ETERNAL_ASCENSION • INVERSE_FORGE_SCRAPING • DISTRICT_PREDATOR_ACTIVE • SYNERGY_REVENUE_MAXIMIZED</span>
                 <Zap className="text-black" size={80}/>
              </div>
            ))}
         </div>
      </div>

      <div className="bg-black border-[50px] border-white/5 rounded-[4000px] p-24 md:p-48 flex flex-col xl:flex-row items-center justify-between gap-24 relative overflow-hidden shadow-4xl group min-h-[1400px]">
         <div className="absolute inset-0 bg-yellow-600/5 group-hover:scale-150 transition-transform duration-[20000ms]"></div>
         <div className="absolute top-0 right-0 p-24 opacity-[0.03] scale-[50] rotate-45 pointer-events-none transition-transform duration-1000 group-hover:rotate-0"><Gem size={1000}/></div>
         
         <div className="space-y-32 max-w-7xl relative z-10 text-center xl:text-left">
            <div className="inline-flex items-center gap-8 px-16 py-6 bg-yellow-600/10 border-[5px] border-yellow-600/30 rounded-full shadow-2xl">
               <div className="w-8 h-8 bg-yellow-600 rounded-full animate-ping"></div>
               <span className="text-5xl font-black text-yellow-600 uppercase tracking-widest italic leading-none">ASCENSION_V10_LIVE</span>
            </div>
            <h1 className="text-[200px] md:text-[350px] font-black italic text-white uppercase tracking-tighter leading-[0.7] transition-all group-hover:tracking-[-0.05em] italic">ETERNAL <br/><span className="text-yellow-600">ASCENSION.</span></h1>
            <div className="flex flex-wrap gap-16 justify-center xl:justify-start pt-24">
               <button onClick={() => setView('magic-editor')} className="bg-white text-black px-24 py-8 rounded-full font-black uppercase text-[42px] tracking-[1.5em] hover:bg-yellow-600 hover:text-white transition-all shadow-[0_0_10000px_gold] active:scale-95 italic flex items-center gap-12 border-[20px] border-black leading-none group/btn"><Rocket size={80} className="group-hover/btn:translate-y-[-20px] transition-transform"/> INVERSE_FORGE</button>
            </div>
         </div>
         
         <div className="relative w-[1000px] h-[1000px] shrink-0 flex items-center justify-center">
            <div className="absolute inset-0 bg-yellow-600/15 rounded-full blur-[300px] animate-pulse"></div>
            <div className="w-full h-full border-[40px] border-white/5 rounded-full animate-spin-slow absolute"></div>
            <div className="relative z-10 text-center space-y-12">
               <span className="text-[250px] font-black italic text-white leading-none tracking-tighter">₹{((wealthClock / 10000000).toFixed(2))}Cr</span>
               <p className="text-6xl font-black text-yellow-600 uppercase tracking-[2em] italic animate-pulse leading-none">YIELD_NUCLEUS</p>
            </div>
         </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-24">
         {/* TRAFFIC INFLUX INTELLIGENCE */}
         <div className="bg-black border-[30px] border-white/5 rounded-[1500px] p-24 space-y-200 shadow-4xl relative overflow-hidden">
            <div className="absolute inset-0 bg-blue-600/5 animate-pulse"></div>
            <div className="flex items-center justify-between px-100 relative z-10">
               <div className="flex items-center gap-12">
                  <Share2 size={120} className="text-blue-500 animate-bounce"/>
                  <h3 className="text-8xl font-black italic uppercase tracking-tighter text-white">INFLUX_TELEMETRY</h3>
               </div>
               <span className="text-[24px] font-black text-slate-800 uppercase tracking-widest italic">REAL_TIME_NODE_SOURCE</span>
            </div>
            <div className="grid grid-cols-2 gap-12 p-80">
               {influxSources.map((s, i) => (
                 <div key={i} className="bg-white/5 border-[10px] border-white/5 rounded-[500px] p-100 flex flex-col items-center justify-center space-y-48 group hover:border-blue-500 transition-all cursor-crosshair">
                    <div className={`w-48 h-48 bg-${s.color}-600 rounded-full flex items-center justify-center text-white shadow-4xl group-hover:rotate-12 transition-all`}>
                       {React.cloneElement(s.icon as React.ReactElement, { size: 64 })}
                    </div>
                    <div className="text-center space-y-8">
                       <h4 className="text-4xl font-black text-white italic tracking-tighter">{s.name}</h4>
                       <div className="text-8xl font-black text-blue-500 leading-none">{s.flow}%</div>
                    </div>
                 </div>
               ))}
            </div>
         </div>

         {/* GEOGRAPHIC SENTINEL V10 */}
         <div className="bg-black border-[30px] border-white/5 rounded-[1500px] p-24 space-y-200 shadow-4xl relative overflow-hidden">
            <div className="absolute inset-0 bg-indigo-600/5 animate-pulse"></div>
            <div className="flex items-center justify-between px-100 relative z-10">
               <div className="flex items-center gap-12">
                  <Map size={120} className="text-yellow-600"/>
                  <h3 className="text-8xl font-black italic uppercase tracking-tighter text-white">SENTINEL_PULSE</h3>
               </div>
               <span className="text-[24px] font-black text-slate-800 uppercase tracking-widest italic">ASPIRANT_DENSITY_MATRIX</span>
            </div>
            <div className="grid grid-cols-2 gap-12 p-80">
               {regionalPulse.map((region, idx) => (
                 <div key={idx} className="bg-white/5 border-[10px] border-white/5 rounded-[500px] p-100 flex flex-col items-center justify-center space-y-48 group hover:border-yellow-600 transition-all cursor-crosshair">
                    <div className="relative w-48 h-48">
                       <div className={`absolute inset-0 bg-${region.color}-500/20 rounded-full animate-ping`}></div>
                       <div className={`absolute inset-6 bg-${region.color}-600 rounded-full border-[10px] border-black flex items-center justify-center text-white shadow-4xl`}>
                          <MapPin size={48}/>
                       </div>
                    </div>
                    <div className="text-center space-y-8">
                       <h4 className="text-4xl font-black text-white italic tracking-tighter">{region.name}</h4>
                       <div className="text-8xl font-black text-yellow-600 leading-none">{region.heat}%</div>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 100s linear infinite; }
        .animate-spin-slow { animation: spin 20s linear infinite; }
      `}} />
    </div>
  );
};
