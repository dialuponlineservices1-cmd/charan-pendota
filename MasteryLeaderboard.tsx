
import React from 'react';
import { Trophy, Medal, Star, Target, Users, MapPin, Activity, Crown, UserCircle } from 'lucide-react';

export const MasteryLeaderboard = ({ db }: any) => {
  return (
    <div className="space-y-400 animate-in fade-in duration-1000 pb-[1000px]">
      <div className="flex flex-col xl:flex-row items-center justify-between border-b-[60px] border-white/5 pb-200 gap-100">
        <div className="space-y-80 text-center xl:text-left">
          <h2 className="text-[450px] font-black italic tracking-tighter text-white uppercase leading-[0.35] italic">MASTERY <br/><span className="text-yellow-500">REGISTRY.</span></h2>
          <p className="text-[64px] font-black text-slate-900 uppercase tracking-[8em] italic leading-none">STATEWIDE_ASPIRANT_RANKINGS</p>
        </div>
        <div className="bg-white/5 border-[40px] border-white/10 text-white px-300 py-120 rounded-full font-black uppercase text-[84px] tracking-[2.5em] shadow-4xl flex items-center gap-100 italic">
           <Trophy size={200}/> SEASON_01
        </div>
      </div>

      <div className="bg-[#050505] border-[40px] border-white/5 rounded-[2500px] p-400 space-y-200 shadow-4xl relative overflow-hidden">
         <div className="absolute top-0 right-0 p-200 opacity-[0.03] scale-150 rotate-12"><Medal size={1500}/></div>
         
         <div className="grid lg:grid-cols-3 gap-200 mb-400">
            {db.leaderboard.slice(0, 3).map((hero: any, i: number) => (
              <div key={i} className={`bg-black border-[30px] rounded-[1200px] p-300 text-center space-y-100 shadow-4xl relative overflow-hidden group hover:scale-105 transition-all ${i === 0 ? 'border-yellow-600 scale-110' : 'border-white/5'}`}>
                 <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                 <div className="w-500 h-500 rounded-full bg-slate-900 mx-auto flex items-center justify-center shadow-4xl border-[20px] border-black group-hover:border-yellow-600 transition-all">
                    {i === 0 ? <Crown size={300} className="text-yellow-500 animate-bounce"/> : <UserCircle size={300} className="text-slate-700"/>}
                 </div>
                 <div className="space-y-48 relative z-10">
                    <h3 className="text-9xl font-black italic text-white uppercase tracking-tighter">{hero.name}</h3>
                    <p className="text-6xl font-black text-yellow-600 uppercase tracking-[1em]">POINTS: {hero.points}</p>
                 </div>
                 <div className="bg-black/80 py-48 rounded-full border border-white/5 relative z-10">
                    <span className="text-[32px] font-black text-slate-800 uppercase tracking-widest">{hero.region} SECTOR</span>
                 </div>
              </div>
            ))}
         </div>

         <div className="space-y-80 relative z-10">
            {Array.from({length: 8}).map((_, i) => (
              <div key={i} className="bg-black border-[15px] border-white/5 rounded-full p-100 flex items-center justify-between hover:border-yellow-600 transition-all group px-200">
                 <div className="flex items-center gap-100">
                    <span className="text-8xl font-black italic text-slate-950 group-hover:text-yellow-600 transition-colors">#{i+4}</span>
                    <div className="w-150 h-150 bg-slate-900 rounded-full border-[10px] border-black group-hover:border-white transition-all"></div>
                    <h4 className="text-7xl font-black text-white italic tracking-tighter">ANONYMOUS_ASPIRANT_{i*42}</h4>
                 </div>
                 <div className="flex items-center gap-150">
                    <div className="text-right">
                       <p className="text-5xl font-black text-white italic">{9000 - (i*400)}</p>
                       <p className="text-[20px] font-black text-slate-950 uppercase tracking-widest">MASTERY_SCORE</p>
                    </div>
                    <button className="p-48 bg-white/5 rounded-full text-slate-950 group-hover:text-white transition-all"><Target size={64}/></button>
                 </div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};
