
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { Dna, X, Mic, RefreshCw, Brain, Zap, Target, ShieldCheck, Activity, Eye, Scan, Crosshair } from 'lucide-react';

export const BioTelemetry = () => {
  const [isLive, setIsLive] = useState(false);
  const [metrics, setMetrics] = useState({ stress: 12, confidence: 88, eyeSync: 100 });
  const videoRef = useRef<HTMLVideoElement>(null);

  const startAnalysis = async () => {
    setIsLive(true);
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    if (videoRef.current) videoRef.current.srcObject = stream;
    
    // Simulate real-time neural data parsing from video frames
    setInterval(() => {
       setMetrics({
         stress: Math.floor(Math.random() * 40 + 5),
         confidence: Math.floor(Math.random() * 20 + 80),
         eyeSync: Math.floor(Math.random() * 5 + 95)
       });
    }, 1500);
  };

  return (
    <div className="space-y-200 animate-in fade-in duration-1000 pb-[1000px]">
      <div className="text-center space-y-48">
        <h2 className="text-[350px] font-black italic tracking-tighter text-white uppercase leading-[0.35] italic">BIO <br/><span className="text-blue-500">TELEMETRY.</span></h2>
        <p className="text-[56px] font-black text-slate-900 uppercase tracking-[4em] italic leading-none">COGNITIVE_STRESS_SENSOR_V14</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-150">
         {/* THE VIDEO HUD */}
         <div className="lg:col-span-8 bg-[#050505] border-[40px] border-white/5 rounded-[1200px] p-100 h-[2200px] relative overflow-hidden shadow-4xl group">
            <div className="absolute inset-0 bg-blue-600/5 blur-[500px] animate-pulse"></div>
            
            <div className="relative w-full h-full flex items-center justify-center">
               <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover rounded-[1000px] grayscale brightness-50 group-hover:grayscale-0 transition-all duration-[2000ms]" />
               
               {/* OVERLAY HUD */}
               <div className="absolute inset-0 p-200 flex flex-col justify-between pointer-events-none">
                  <div className="flex justify-between items-start">
                     <div className="bg-black/60 border-[10px] border-blue-600/20 px-80 py-32 rounded-full backdrop-blur-3xl flex items-center gap-24">
                        <div className="w-12 h-12 bg-emerald-500 rounded-full animate-ping"></div>
                        <span className="text-4xl font-black text-white italic tracking-[1em]">SENSOR_LIVE</span>
                     </div>
                     <Crosshair size={300} className="text-blue-600 opacity-20 animate-spin-slow"/>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-80">
                     <div className="bg-black/80 border-[10px] border-white/10 p-80 rounded-[300px] backdrop-blur-4xl shadow-4xl text-center space-y-24">
                        <h4 className="text-[28px] font-black text-blue-500 uppercase tracking-widest">STRESS_LOAD</h4>
                        <div className="text-8xl font-black text-white italic">{metrics.stress}%</div>
                     </div>
                     <div className="bg-black/80 border-[10px] border-white/10 p-80 rounded-[300px] backdrop-blur-4xl shadow-4xl text-center space-y-24">
                        <h4 className="text-[28px] font-black text-emerald-500 uppercase tracking-widest">CONFIDENCE</h4>
                        <div className="text-8xl font-black text-white italic">{metrics.confidence}%</div>
                     </div>
                     <div className="bg-black/80 border-[10px] border-white/10 p-80 rounded-[300px] backdrop-blur-4xl shadow-4xl text-center space-y-24">
                        <h4 className="text-[28px] font-black text-yellow-500 uppercase tracking-widest">EYE_LOCK</h4>
                        <div className="text-8xl font-black text-white italic">{metrics.eyeSync}%</div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* CONTROL PANEL */}
         <div className="lg:col-span-4 space-y-120">
            <div className="bg-black border-[25px] border-white/5 rounded-[600px] p-150 space-y-100 shadow-4xl relative overflow-hidden group">
               <div className="absolute inset-0 bg-blue-600/5 animate-pulse"></div>
               <Scan size={200} className="text-blue-600 mx-auto animate-bounce"/>
               <h3 className="text-7xl font-black italic uppercase text-white tracking-tighter leading-none">NEURAL_SYNC</h3>
               <button onClick={startAnalysis} className="w-full py-80 bg-white text-black rounded-full font-black uppercase text-[48px] tracking-[1.5em] shadow-4xl italic border-[20px] border-black hover:bg-blue-600 hover:text-white transition-all active:scale-95">
                  {isLive ? 'RE-CALIBRATE' : 'INIT_SENSORS'}
               </button>
            </div>

            <div className="bg-[#050505] border-[15px] border-white/5 p-120 rounded-[500px] space-y-80 text-center shadow-4xl">
               <div className="flex items-center justify-center gap-12 text-blue-500">
                  <Brain size={64}/> <h5 className="text-[32px] font-black uppercase tracking-[1em]">BIOMETRY_STATS</h5>
               </div>
               <p className="text-5xl font-bold text-slate-500 italic leading-relaxed">"Sensors indicate high cortisol during Quantitative Aptitude simulations. Suggest 5-minute neural reset."</p>
            </div>
         </div>
      </div>
    </div>
  );
};
