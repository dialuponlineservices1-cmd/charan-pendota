
import React, { useState } from 'react';
import { Lightning, DollarSign, TrendingUp, BarChart4, Target, Globe, Crown, ShieldCheck, RefreshCw, Flux } from 'lucide-react';

export const RevenueReactor = ({ db }: any) => {
  const [power, setPower] = useState(84);

  return (
    <div className="space-y-400 animate-in fade-in duration-1000 pb-[1000px]">
      <div className="flex flex-col xl:flex-row items-center justify-between border-b-[60px] border-yellow-600/10 pb-200 gap-100">
        <div className="space-y-80 text-center xl:text-left">
          <h2 className="text-[450px] font-black italic tracking-tighter text-white uppercase leading-[0.3] italic">REVENUE <br/><span className="text-yellow-500">REACTOR.</span></h2>
          <p className="text-[64px] font-black text-slate-900 uppercase tracking-[8em] italic leading-none">CPM_OPTIMIZATION_NUCLEUS_V1</p>
        </div>
        <div className="bg-yellow-600 text-black px-300 py-120 rounded-full font-black uppercase text-[84px] tracking-[2.5em] shadow-[0_0_8000px_gold] flex items-center gap-100 italic border-[60px] border-black">
           <DollarSign size={200}/> EMPIRE_YIELD
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-250">
         <div className="lg:col-span-8 bg-black border-[40px] border-white/5 rounded-[2000px] p-400 relative overflow-hidden shadow-4xl h-[3000px] flex flex-col items-center justify-center space-y-300">
            <div className="absolute inset-0 bg-yellow-600/5 animate-pulse"></div>
            <div className="relative w-[1800px] h-[1800px]">
               <div className="absolute inset-0 border-[100px] border-white/5 rounded-full animate-spin-slow"></div>
               <div className="absolute inset-150 border-t-[50px] border-yellow-600 rounded-full animate-spin"></div>
               <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <h3 className="text-[450px] font-black text-white italic leading-none">{power}%</h3>
                  <p className="text-[84px] font-black text-yellow-600 uppercase tracking-[2em] italic">REACTOR_LOAD</p>
               </div>
            </div>
            <div className="w-full max-w-10xl space-y-100">
               <h4 className="text-[48px] font-black text-white uppercase tracking-[3em] text-center italic">MONETIZATION_FLOW: MAXIMUM</h4>
               <div className="h-40 bg-white/5 border-[15px] border-black rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-600 animate-pulse transition-all duration-[3000ms]" style={{ width: `${power}%` }}></div>
               </div>
               <div className="grid grid-cols-3 gap-100">
                  <button onClick={() => setPower(prev => Math.min(100, prev+5))} className="py-80 bg-white/5 rounded-[500px] text-5xl font-black italic border-[15px] border-white/5 hover:bg-yellow-600 hover:text-black transition-all">BOOST_CPM</button>
                  <button onClick={() => setPower(prev => Math.max(0, prev-5))} className="py-80 bg-white/5 rounded-[500px] text-5xl font-black italic border-[15px] border-white/5 hover:bg-white hover:text-black transition-all">STABILIZE</button>
                  <button className="py-80 bg-yellow-600 text-black rounded-[500px] text-5xl font-black italic border-[15px] border-black shadow-4xl">FLUSH_ADS</button>
               </div>
            </div>
         </div>

         <div className="lg:col-span-4 space-y-200">
            {[
               { l: "Daily Yield", v: "₹84.2K", i: <TrendingUp/> },
               { l: "Ad Impressions", v: "14.2M", i: <Globe/> },
               { l: "Paid Conversion", v: "1.2%", i: <Target/> }
            ].map((stat, i) => (
              <div key={i} className="bg-black border-[30px] border-white/5 rounded-[800px] p-250 text-center space-y-80 shadow-4xl group hover:border-yellow-600 transition-all">
                 <div className="text-slate-800 flex justify-center group-hover:text-yellow-600 transition-all">{React.cloneElement(stat.i as React.ReactElement, { size: 300 })}</div>
                 <h4 className="text-8xl font-black text-white italic uppercase tracking-tighter leading-none">{stat.l}</h4>
                 <div className="text-[200px] font-black text-white leading-none italic">{stat.v}</div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};
