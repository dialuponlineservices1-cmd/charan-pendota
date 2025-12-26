
import React, { useState, useEffect } from 'react';
import { Database, Search, ArrowRight, Layers, Trash2, Edit3, ShieldCheck, Zap } from 'lucide-react';

export const QuantumRegistry = ({ db, updateDB }: any) => {
  const [search, setSearch] = useState('');
  const [depth, setDepth] = useState(0);

  const jobs = db.jobs.filter((j: any) => 
    (j.title_en + j.title_te).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-150 animate-in fade-in duration-1000 pb-[1000px]">
      <div className="flex flex-col xl:flex-row items-center justify-between border-b-[20px] border-white/5 pb-100 gap-80">
        <div className="space-y-32 text-center xl:text-left">
          <h2 className="text-[250px] font-black italic tracking-tighter text-white uppercase leading-[0.35] italic">QUANTUM <br/><span className="text-white/30">REGISTRY.</span></h2>
          <p className="text-[42px] font-black text-slate-900 uppercase tracking-[4em] italic">MULTI_DIMENSIONAL_DATA_STRATA</p>
        </div>
        <div className="w-full max-w-7xl relative">
           <input 
             className="w-full bg-black border-[20px] border-white/5 rounded-full px-150 py-80 text-[120px] font-black text-white outline-none focus:border-white transition-all placeholder:text-slate-950 italic"
             placeholder="FILTER_STRATA..."
             value={search}
             onChange={e => setSearch(e.target.value)}
           />
           <Search size={150} className="absolute right-80 top-1/2 -translate-y-1/2 text-slate-950"/>
        </div>
      </div>

      <div className="space-y-120">
         {jobs.map((job: any, i: number) => (
           <div 
             key={job.id} 
             className="bg-black border-[20px] border-white/5 rounded-[600px] p-120 flex flex-col lg:flex-row items-center justify-between gap-120 group hover:border-white transition-all shadow-4xl relative overflow-hidden"
             style={{ transform: `perspective(2000px) translateZ(${i * -10}px)` }}
           >
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
              <div className="flex items-center gap-100 relative z-10">
                 <div className="w-300 h-300 rounded-[150px] overflow-hidden border-[25px] border-black shadow-4xl group-hover:scale-110 transition-transform duration-1000">
                    <img src={job.thumbnail} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"/>
                 </div>
                 <div className="space-y-24">
                    <span className="text-red-600 font-black uppercase text-[32px] tracking-[1.5em] italic">{job.org}</span>
                    <h3 className="text-[120px] md:text-[180px] font-black italic text-white leading-none tracking-tighter uppercase italic">{job.title_en}</h3>
                    <p className="text-[42px] font-black text-slate-800 uppercase tracking-widest italic leading-none">{job.lastDate}</p>
                 </div>
              </div>
              <div className="flex gap-48 relative z-10">
                 <button className="p-80 bg-white/5 rounded-full hover:bg-white hover:text-black transition-all border-[10px] border-white/5 shadow-4xl"><Edit3 size={100}/></button>
                 <button className="p-80 bg-white/5 rounded-full hover:bg-red-600 hover:text-white transition-all border-[10px] border-white/5 shadow-4xl"><Trash2 size={100}/></button>
              </div>
           </div>
         ))}
      </div>
    </div>
  );
};
