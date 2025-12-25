
import React, { useState, useEffect } from 'react';
import { Swords, Activity, Target, ShieldCheck, Zap, ArrowRight, User, Award, Flame, Radar, Ghost, MapPin, TrendingUp, Cpu } from 'lucide-react';

export const WarRoom = ({ db, lang, updateDB }: any) => {
  const [activeTab, setActiveTab] = useState<'heatmap' | 'blitz'>('heatmap');
  const [blitzLoading, setBlitzLoading] = useState(false);
  const [blitzScore, setBlitzScore] = useState(0);

  const peerNodes = [
    { name: "Sovereign_X8", rank: "AETHEL LORD", mastery: 98, region: "HYD", pulse: 120 },
    { name: "Zenith_Runner", rank: "ZENITH ARCHON", mastery: 94, region: "VZ", pulse: 85 },
    { name: "Matrix_Breaker", rank: "IMPERIAL ELITE", mastery: 89, region: "WAR", pulse: 110 },
    { name: "Neural_Aspirant", rank: "GOD_CORE", mastery: 92, region: "VJY", pulse: 95 }
  ];

  return (
    <div className="space-y-24 animate-in fade-in duration-1000 pb-96 relative">
      <div className="absolute top-0 right-0 w-[1200px] h-[1200px] bg-red-600/5 blur-[300px] pointer-events-none animate-pulse"></div>

      {/* WAR ROOM HEADER */}
      <section className="flex flex-col xl:flex-row items-center justify-between gap-16 border-b border-white/5 pb-16 relative z-10">
         <div className="space-y-6 text-center xl:text-left">
            <h2 className="text-[180px] font-black italic uppercase tracking-tighter leading-[0.8] text-white select-none opacity-20 absolute -top-20 -left-10 pointer-events-none">WAR ROOM.</h2>
            <h2 className="text-9xl font-black italic uppercase tracking-tighter text-white relative z-10">IMPERIAL <span className="text-red-600">ARENA.</span></h2>
            <p className="text-4xl font-bold text-slate-800 italic uppercase">Competitive Neural Supremacy Protocol</p>
         </div>
         <div className="flex bg-white/5 p-2 rounded-full border border-white/10 shadow-4xl relative z-10">
            <button onClick={() => setActiveTab('heatmap')} className={`px-16 py-6 rounded-full text-[12px] font-black uppercase tracking-widest transition-all flex items-center gap-4 ${activeTab === 'heatmap' ? 'bg-red-600 text-white' : 'text-slate-500 hover:text-white'}`}>
               <Radar size={24}/> READINESS HEATMAP
            </button>
            <button onClick={() => setActiveTab('blitz')} className={`px-16 py-6 rounded-full text-[12px] font-black uppercase tracking-widest transition-all flex items-center gap-4 ${activeTab === 'blitz' ? 'bg-red-600 text-white' : 'text-slate-500 hover:text-white'}`}>
               <Zap size={24}/> BLITZ SYNC
            </button>
         </div>
      </section>

      {activeTab === 'heatmap' ? (
         <div className="grid lg:grid-cols-12 gap-16 relative z-10 animate-in slide-in-from-left-20 duration-1000">
            {/* PEER GRID MATRIX */}
            <div className="lg:col-span-8 space-y-12">
               <h3 className="text-6xl font-black italic uppercase tracking-tighter text-white flex items-center gap-8"><Activity className="text-red-600" size={56}/> Live Peer Nodes</h3>
               <div className="grid md:grid-cols-2 gap-8">
                  {peerNodes.map((node, i) => (
                     <div key={i} className="bg-slate-950/40 border border-white/5 rounded-[100px] p-12 space-y-10 hover:border-red-600/50 transition-all group shadow-4xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12 transition-transform duration-1000 group-hover:rotate-0"><User size={200}/></div>
                        <div className="flex justify-between items-start relative z-10">
                           <div className="space-y-2">
                              <h4 className="text-4xl font-black text-white italic tracking-tighter uppercase">{node.name}</h4>
                              <p className="text-[10px] font-black text-red-600 uppercase tracking-widest">{node.rank}</p>
                           </div>
                           <p className="text-5xl font-black text-white italic">{node.mastery}%</p>
                        </div>
                        <div className="flex items-center justify-between relative z-10 pt-8 border-t border-white/5">
                           <div className="flex items-center gap-4 text-slate-800 text-[11px] font-black uppercase tracking-widest">
                              <MapPin size={16}/> {node.region} SECTOR
                           </div>
                           <div className="flex items-center gap-4 text-emerald-500 text-[11px] font-black uppercase tracking-widest animate-pulse">
                              <TrendingUp size={16}/> {node.pulse} BPM HEAT
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            {/* GLOBAL RANKING ANALYTICS */}
            <div className="lg:col-span-4 space-y-12">
               <div className="bg-red-600 rounded-[120px] p-20 text-center space-y-12 shadow-4xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-150 transition-transform duration-1000"><Award size={400}/></div>
                  <h4 className="text-[12px] font-black text-white uppercase tracking-[1em]">ARENA XP POOL</h4>
                  <h2 className="text-[140px] font-black italic tracking-tighter text-white leading-none">1.2<span className="text-4xl text-white/50">M</span></h2>
                  <div className="pt-8 border-t border-white/20">
                     <p className="text-[11px] font-black text-white/80 uppercase tracking-widest italic leading-relaxed">Global XP rewards for War Room participation. Claim your dominance.</p>
                  </div>
               </div>

               <div className="bg-slate-950 border border-white/5 rounded-[100px] p-16 space-y-8 shadow-inner">
                  <h4 className="text-[14px] font-black text-slate-800 uppercase tracking-[0.5em] px-8">GLOBAL ALERT</h4>
                  <div className="p-10 bg-black/40 border border-red-600/20 rounded-[60px] flex items-center gap-8 group hover:bg-red-600/10 transition-all cursor-pointer">
                     <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center animate-pulse"><Flame size={32}/></div>
                     <p className="text-2xl font-black text-white italic tracking-tighter uppercase">TSPSC GROUP 1 HEAT INCREASE: +42%</p>
                  </div>
               </div>
            </div>
         </div>
      ) : (
         /* BLITZ SYNC ARENA (V60 CHALLENGE) */
         <div className="max-w-6xl mx-auto bg-slate-950 border border-red-600/40 rounded-[150px] p-32 text-center space-y-24 shadow-4xl relative overflow-hidden animate-in zoom-in-95 duration-1000">
            <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12"><Ghost size={600}/></div>
            <div className="space-y-6 relative z-10">
               <h3 className="text-9xl font-black italic uppercase tracking-tighter text-white leading-none">BLITZ <span className="text-red-600">SYNC.</span></h3>
               <p className="text-4xl font-bold text-slate-500 italic max-w-4xl mx-auto leading-tight">Engage in rapid-fire neural challenges against AI ghosts of previous aspirants to boost your Mastery Velocity.</p>
            </div>
            
            <div className="flex justify-center gap-12 relative z-10">
               <div className="p-10 bg-black/40 border border-white/5 rounded-[80px] text-center space-y-4 min-w-[300px] shadow-inner">
                  <p className="text-[12px] font-black text-slate-700 uppercase tracking-widest">Mastery Velocity</p>
                  <h4 className="text-8xl font-black text-white italic tracking-tighter leading-none">1.4x</h4>
               </div>
               <div className="p-10 bg-black/40 border border-white/5 rounded-[80px] text-center space-y-4 min-w-[300px] shadow-inner">
                  <p className="text-[12px] font-black text-slate-700 uppercase tracking-widest">XP Potential</p>
                  <h4 className="text-8xl font-black text-red-600 italic tracking-tighter leading-none">+5000</h4>
               </div>
            </div>

            <button onClick={() => {}} className="relative z-10 px-24 py-12 bg-red-600 text-white rounded-full font-black uppercase text-[24px] tracking-widest shadow-4xl hover:bg-white hover:text-black transition-all active:scale-95 group">
               <Swords className="inline mr-8 group-hover:rotate-12 transition-transform"/> INITIALIZE CHALLENGE MESH
            </button>
         </div>
      )}
    </div>
  );
};
