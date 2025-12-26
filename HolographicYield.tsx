import React, { useState, useEffect } from 'react';
// @google/genai Senior Frontend Engineer: Added missing ShoppingCart import.
import { DollarSign, Zap, TrendingUp, BarChart4, Globe, Crown, ShieldCheck, Waves, Sparkles, ShoppingCart } from 'lucide-react';

export const HolographicYield = ({ db }: any) => {
  const [pulse, setPulse] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => setPulse(p => p === 1 ? 1.2 : 1), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-400 animate-in fade-in duration-1000 pb-[1000px]">
      <div className="text-center space-y-48">
        <h2 className="text-[350px] font-black italic tracking-tighter text-white uppercase leading-[0.35] italic">PLASMA <br/><span className="text-emerald-500">YIELD.</span></h2>
        <p className="text-[56px] font-black text-slate-900 uppercase tracking-[4em] italic leading-none">ENERGY_BASED_REVENUE_TELEMETRY</p>
      </div>

      <div className="bg-[#050505] border-[40px] border-white/5 rounded-[1200px] p-200 h-[2500px] relative overflow-hidden shadow-4xl group">
         <div className="absolute inset-0 bg-emerald-600/5 blur-[500px] animate-pulse"></div>
         
         <div className="relative w-full h-full flex flex-col items-center justify-center space-y-150">
            <div className="relative w-[1800px] h-[1800px]">
               <div className="absolute inset-0 border-[80px] border-white/5 rounded-full animate-spin-slow"></div>
               <div className="absolute inset-100 bg-[radial-gradient(circle_at_center,_#10b981_0%,_transparent_70%)] opacity-20 blur-[200px] animate-pulse" style={{ transform: `scale(${pulse})` }}></div>
               
               <div className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-64 relative z-10">
                  <DollarSign size={400} className="text-emerald-500 animate-bounce"/>
                  <h3 className="text-[450px] font-black text-white italic leading-none tracking-tighter">₹9.8<span className="text-8xl">Cr</span></h3>
                  <p className="text-[84px] font-black text-emerald-500 uppercase tracking-[1em] italic">EMPIRE_NUCLEUS_LIQUIDITY</p>
               </div>
            </div>

            <div className="grid grid-cols-3 gap-150 w-full max-w-10xl">
               {[
                 { l: 'DAILY_AD_SYNTH', v: '₹842k', i: <Zap/> },
                 { l: 'GLOBAL_STORE_PULSE', v: '142k', i: <ShoppingCart/> },
                 { l: 'NET_ASSET_VALUE', v: '₹14Cr', i: <Crown/> }
               ].map((s, i) => (
                 <div key={i} className="bg-black/80 border-[20px] border-white/5 p-120 rounded-[500px] text-center space-y-48 backdrop-blur-4xl shadow-4xl group hover:border-emerald-600 transition-all">
                    <div className="text-slate-800 group-hover:text-emerald-500 transition-colors flex justify-center">{s.i}</div>
                    <h5 className="text-[32px] font-black text-slate-700 uppercase tracking-widest">{s.l}</h5>
                    <p className="text-[120px] font-black text-white italic leading-none">{s.v}</p>
                 </div>
               ))}
            </div>
         </div>

         <div className="absolute top-150 left-150 p-80 bg-white/5 rounded-full border border-white/10 flex items-center gap-32">
            <Sparkles size={64} className="text-emerald-500 animate-pulse"/>
            <span className="text-4xl font-black text-white uppercase italic">LIQUIDITY_MATRIX: STABLE</span>
         </div>
      </div>
    </div>
  );
};