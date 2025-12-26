
import React, { useState } from 'react';
import { Timer, Calendar, Zap, RefreshCw, Target, TrendingUp, Compass, Radio } from 'lucide-react';

export const ChronoLock = ({ db }: any) => {
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const events = db.jobs.map((j: any) => ({
    id: j.id,
    name: j.title_en,
    date: j.lastDate,
    impact: Math.floor(Math.random() * 50 + 50)
  })).sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="space-y-250 animate-in fade-in duration-1000 pb-[1000px]">
      <div className="text-center space-y-64">
        <h2 className="text-[300px] font-black italic tracking-tighter text-white uppercase leading-[0.35] italic">CHRONO <br/><span className="text-white/20">LOCK.</span></h2>
        <p className="text-[48px] font-black text-slate-900 uppercase tracking-[4em] italic leading-none">TEMPORAL_IMPACT_TIMELINE_V1</p>
      </div>

      <div className="relative h-[2500px] overflow-hidden bg-[#050505] border-[30px] border-white/5 rounded-[800px] p-200 shadow-4xl">
         <div className="absolute left-1/2 -translate-x-1/2 w-4 bg-white/5 h-full z-0"></div>
         
         <div className="relative z-10 space-y-300">
            {events.map((e: any, i: number) => (
              <div key={e.id} className={`flex items-center gap-120 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} animate-in fade-in slide-in-from-bottom-10`} onClick={() => setSelectedEvent(e)}>
                 <div className="w-1/2 flex flex-col items-center group cursor-pointer">
                    <div className="bg-black border-[15px] border-white/5 rounded-[400px] p-100 space-y-48 hover:border-red-600 transition-all shadow-4xl w-full group-hover:scale-105 duration-500">
                       <div className="flex items-center justify-between">
                          <span className="text-red-500 font-black uppercase text-3xl tracking-widest">{e.date}</span>
                          <span className="text-white/10 font-black text-7xl italic">NODE_{i+1}</span>
                       </div>
                       <h4 className="text-8xl font-black italic text-white uppercase tracking-tighter leading-none">{e.name}</h4>
                    </div>
                 </div>
                 
                 <div className="w-120 h-120 bg-white rounded-full flex items-center justify-center border-[20px] border-black shadow-4xl relative">
                    <div className="absolute inset-0 bg-red-600 rounded-full animate-ping opacity-20"></div>
                    <Radio size={64} className="text-black"/>
                 </div>
                 
                 <div className="w-1/2 flex flex-col items-center">
                    <div className="bg-white/5 border-[10px] border-white/5 p-80 rounded-[300px] text-center space-y-24 w-64 xl:w-[600px]">
                       <h5 className="text-[24px] font-black text-slate-800 uppercase tracking-[1em]">IMPACT_RADIUS</h5>
                       <div className="text-[120px] font-black text-white leading-none italic">{e.impact}<span className="text-3xl">%</span></div>
                    </div>
                 </div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};
