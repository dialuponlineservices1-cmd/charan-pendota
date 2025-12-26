import React, { useState } from 'react';
import { Zap, DollarSign, TrendingUp, Target, Globe, Crown, ShieldCheck, Activity } from 'lucide-react';

export const RevenueReactor = ({ db }: any) => {
  const [power, setPower] = useState(84);

  return (
    <div className="space-y-20 animate-in fade-in duration-1000 pb-20">
      <div className="flex flex-col xl:flex-row items-center justify-between border-b border-yellow-600/10 pb-10 gap-6">
        <div className="space-y-4 text-center xl:text-left">
          <h2 className="text-6xl font-black italic tracking-tighter text-white uppercase leading-none">REVENUE <br/><span className="text-yellow-500">REACTOR.</span></h2>
          <p className="text-xs font-black text-slate-900 uppercase tracking-[1em] italic leading-none">CPM_OPTIMIZATION_NUCLEUS_V1</p>
        </div>
        <div className="bg-yellow-600 text-black px-10 py-4 rounded-full font-black uppercase text-lg tracking-widest shadow-[0_0_80px_gold] flex items-center gap-4 italic border border-black">
           <DollarSign size={32}/> EMPIRE_YIELD
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-10">
         <div className="lg:col-span-8 bg-black border border-white/5 rounded-[40px] p-10 relative overflow-hidden shadow-4xl min-h-[600px] flex flex-col items-center justify-center space-y-12">
            <div className="absolute inset-0 bg-yellow-600/5 animate-pulse"></div>
            <div className="relative w-64 h-64">
               <div className="absolute inset-0 border-[10px] border-white/5 rounded-full animate-spin-slow"></div>
               <div className="absolute inset-4 border-t-[4px] border-yellow-600 rounded-full animate-spin"></div>
               <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <h3 className="text-6xl font-black text-white italic leading-none">{power}%</h3>
                  <p className="text-xs font-black text-yellow-600 uppercase tracking-widest italic">REACTOR_LOAD</p>
               </div>
            </div>
            <div className="w-full max-w-2xl space-y-6">
               <h4 className="text-xs font-black text-white uppercase tracking-widest text-center italic">MONETIZATION_FLOW: MAXIMUM</h4>
               <div className="h-4 bg-white/5 border border-black rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-600 animate-pulse transition-all duration-[3000ms]" style={{ width: `${power}%` }}></div>
               </div>
               <div className="grid grid-cols-3 gap-4">
                  <button onClick={() => setPower(prev => Math.min(100, prev+5))} className="py-4 bg-white/5 rounded-full text-xs font-black italic border border-white/5 hover:bg-yellow-600 hover:text-black transition-all">BOOST_CPM</button>
                  <button onClick={() => setPower(prev => Math.max(0, prev-5))} className="py-4 bg-white/5 rounded-full text-xs font-black italic border border-white/5 hover:bg-white hover:text-black transition-all">STABILIZE</button>
                  <button className="py-4 bg-yellow-600 text-black rounded-full text-xs font-black italic border border-black shadow-4xl">FLUSH_ADS</button>
               </div>
            </div>
         </div>

         <div className="lg:col-span-4 space-y-8">
            {[
               { l: "Daily Yield", v: "₹84.2K", i: <TrendingUp size={48}/> },
               { l: "Ad Impressions", v: "14.2M", i: <Globe size={48}/> },
               { l: "Paid Conversion", v: "1.2%", i: <Target size={48}/> }
            ].map((stat, i) => (
              <div key={i} className="bg-black border border-white/5 rounded-[40px] p-8 text-center space-y-4 shadow-4xl group hover:border-yellow-600 transition-all">
                 <div className="text-slate-800 flex justify-center group-hover:text-yellow-600 transition-all">{stat.i}</div>
                 <h4 className="text-xl font-black text-white italic uppercase tracking-tighter leading-none">{stat.l}</h4>
                 <div className="text-4xl font-black text-white leading-none italic">{stat.v}</div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};