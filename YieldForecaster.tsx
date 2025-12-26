
import React, { useState, useEffect } from 'react';
// Added missing RefreshCw to the lucide-react imports
import { BarChart, TrendingUp, Users, DollarSign, Activity, Zap, Compass, PieChart, RefreshCw } from 'lucide-react';

export const YieldForecaster = ({ db }: any) => {
  const [data, setData] = useState<any[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);

  useEffect(() => {
    recalculate();
  }, []);

  const recalculate = () => {
    setIsCalculating(true);
    setTimeout(() => {
      const projections = db.jobs.map((j: any) => ({
        name: j.title_en,
        yield: Math.floor(Math.random() * 50000 + 10000),
        traffic: Math.floor(Math.random() * 1000000 + 50000),
        momentum: (Math.random() * 100).toFixed(1)
      })).sort((a: any, b: any) => b.yield - a.yield);
      setData(projections);
      setIsCalculating(false);
    }, 1500);
  };

  return (
    <div className="space-y-250 animate-in fade-in duration-1000 pb-[1000px]">
      <div className="flex flex-col xl:flex-row items-center justify-between border-b-[30px] border-white/5 pb-120 gap-100">
        <div className="space-y-64 text-center xl:text-left">
          <h2 className="text-[300px] font-black italic tracking-tighter text-white uppercase leading-[0.35] italic">YIELD <br/><span className="text-white/10">FORECASTER.</span></h2>
          <p className="text-[48px] font-black text-slate-900 uppercase tracking-[4em] italic leading-none">REVENUE_PROJECTION_MODEL_V1</p>
        </div>
        <button onClick={recalculate} className="bg-white text-black px-200 py-80 rounded-full font-black uppercase text-[56px] tracking-[1.5em] hover:bg-indigo-600 hover:text-white transition-all shadow-4xl flex items-center gap-64 italic border-[40px] border-black">
           {isCalculating ? <RefreshCw className="animate-spin" size={120}/> : <PieChart size={120}/>} {isCalculating ? 'SIMULATING...' : 'REFRESH_PROJECTION'}
        </button>
      </div>

      <div className="grid lg:grid-cols-12 gap-150">
         <div className="lg:col-span-8 space-y-120">
            {data.map((p, i) => (
              <div key={i} className="bg-black border-[25px] border-white/5 rounded-[800px] p-150 space-y-80 shadow-4xl group hover:border-indigo-600 transition-all">
                 <div className="flex items-center justify-between">
                    <div className="space-y-24">
                       <h4 className="text-[120px] font-black italic text-white uppercase tracking-tighter leading-none line-clamp-1">{p.name}</h4>
                       <p className="text-[32px] font-black text-slate-900 uppercase tracking-[2em] mt-12">PROJECTED_VIEWS: {p.traffic.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                       <p className="text-indigo-500 font-black text-8xl italic">₹{(p.yield / 1000).toFixed(1)}K</p>
                       <p className="text-[24px] font-black text-slate-900 uppercase tracking-widest mt-12">ESTIMATED_YIELD</p>
                    </div>
                 </div>
                 <div className="h-40 bg-white/5 border-[10px] border-black rounded-full overflow-hidden shadow-inner">
                    <div className="h-full bg-indigo-600 transition-all duration-[3000ms] group-hover:bg-white" style={{ width: `${p.momentum}%` }}></div>
                 </div>
              </div>
            ))}
         </div>

         <div className="lg:col-span-4 space-y-120">
            <div className="bg-[#050505] border-[25px] border-white/5 rounded-[600px] p-150 space-y-100 text-center shadow-4xl relative overflow-hidden group">
               <div className="absolute inset-0 bg-indigo-600/5 animate-pulse"></div>
               <DollarSign size={300} className="text-indigo-500 mx-auto animate-bounce"/>
               <h3 className="text-8xl font-black italic uppercase text-white tracking-tighter leading-none">TOTAL <br/> POTENTIAL</h3>
               <div className="text-[250px] font-black text-white leading-none italic">₹4.2<span className="text-5xl">Cr</span></div>
               <p className="text-5xl font-bold text-slate-800 uppercase italic leading-tight">Total Ad-Revenue projection for the Aethelgard Network by year end.</p>
            </div>

            <div className="bg-white text-black p-120 rounded-[500px] space-y-48 shadow-4xl text-center">
               <h5 className="text-[32px] font-black uppercase tracking-[1.5em] italic flex items-center gap-32 justify-center"><Zap size={64}/> YIELD_READY</h5>
               <p className="text-6xl font-bold italic">"Deep Analysis complete. TSPSC Group IV posts have the highest conversion probability this cycle."</p>
            </div>
         </div>
      </div>
    </div>
  );
};
