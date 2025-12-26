
import React, { useState, useEffect } from 'react';
import { FastForward, Zap, Target, Activity, Users, Globe, Rocket, Compass, Radio } from 'lucide-react';

export const HyperspaceTraffic = ({ db }: any) => {
  const [velocity, setVelocity] = useState(120);

  return (
    <div className="space-y-300 animate-in fade-in duration-1000 pb-[1000px]">
      <div className="text-center space-y-48">
        <h2 className="text-[350px] font-black italic tracking-tighter text-white uppercase leading-[0.35] italic">HYPER <br/><span className="text-yellow-500">SPACE.</span></h2>
        <p className="text-[56px] font-black text-slate-900 uppercase tracking-[4em] italic leading-none">REAL_TIME_TRAFFIC_VELOCITY_V20</p>
      </div>

      <div className="bg-[#050505] border-[40px] border-white/5 rounded-[1200px] p-200 h-[2500px] relative overflow-hidden shadow-4xl group">
         <div className="absolute inset-0 bg-yellow-500/5 blur-[500px] animate-pulse"></div>
         
         {/* HYPERSPACE TUNNEL SIMULATION */}
         <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            <div className="absolute w-[3000px] h-[3000px] border-[1px] border-yellow-500/10 rounded-full animate-tunnel-1"></div>
            <div className="absolute w-[2000px] h-[2000px] border-[2px] border-yellow-500/20 rounded-full animate-tunnel-2"></div>
            <div className="absolute w-[1000px] h-[1000px] border-[5px] border-yellow-500/30 rounded-full animate-tunnel-3"></div>
            
            {/* LIGHT STREAMS */}
            {Array.from({length: 40}).map((_, i) => (
               <div 
                  key={i} 
                  className="absolute w-2 h-400 bg-gradient-to-t from-transparent via-yellow-500 to-transparent opacity-20"
                  style={{ 
                     left: `${Math.random() * 100}%`, 
                     top: `${Math.random() * 100}%`,
                     animation: `hyperspace ${1 + Math.random() * 2}s linear infinite`,
                     animationDelay: `${Math.random() * 5}s`
                  }}
               ></div>
            ))}

            <div className="relative z-10 text-center space-y-48 pointer-events-none">
               <h3 className="text-[500px] font-black italic text-white leading-none tracking-tighter animate-pulse">{velocity}M</h3>
               <p className="text-[64px] font-black text-yellow-500 uppercase tracking-[2em] italic">PACKETS_PER_MILLISECOND</p>
            </div>
         </div>

         <div className="absolute bottom-150 left-150 right-150 grid grid-cols-3 gap-120 z-10">
            <div className="bg-black/80 border-[15px] border-white/10 p-120 rounded-[500px] backdrop-blur-4xl shadow-4xl text-center space-y-24">
               <p className="text-[32px] font-black text-yellow-500 uppercase tracking-widest">WARP_STRENGTH</p>
               <div className="text-[120px] font-black text-white italic">MAX</div>
            </div>
            <div className="bg-black/80 border-[15px] border-white/10 p-120 rounded-[500px] backdrop-blur-4xl shadow-4xl text-center space-y-24">
               <p className="text-[32px] font-black text-emerald-500 uppercase tracking-widest">CDN_INTEGRITY</p>
               <div className="text-[120px] font-black text-white italic">100%</div>
            </div>
            <div className="bg-black/80 border-[15px] border-white/10 p-120 rounded-[500px] backdrop-blur-4xl shadow-4xl text-center space-y-24">
               <p className="text-[32px] font-black text-red-500 uppercase tracking-widest">BOT_BLOCK</p>
               <div className="text-[120px] font-black text-white italic">ACTIVE</div>
            </div>
         </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
         @keyframes tunnel-1 { 0% { transform: scale(0.1); opacity: 0; } 50% { opacity: 0.5; } 100% { transform: scale(3); opacity: 0; } }
         @keyframes tunnel-2 { 0% { transform: scale(0.1); opacity: 0; } 50% { opacity: 0.3; } 100% { transform: scale(2.5); opacity: 0; } }
         @keyframes tunnel-3 { 0% { transform: scale(0.1); opacity: 0; } 50% { opacity: 0.2; } 100% { transform: scale(2); opacity: 0; } }
         @keyframes hyperspace { 0% { transform: translateY(-1000px) scaleY(1); opacity: 0; } 50% { opacity: 1; } 100% { transform: translateY(1000px) scaleY(2); opacity: 0; } }
         .animate-tunnel-1 { animation: tunnel-1 4s linear infinite; }
         .animate-tunnel-2 { animation: tunnel-2 4s linear infinite 1.3s; }
         .animate-tunnel-3 { animation: tunnel-3 4s linear infinite 2.6s; }
      `}} />
    </div>
  );
};
