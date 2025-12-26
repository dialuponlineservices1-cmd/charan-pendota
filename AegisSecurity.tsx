
import React, { useState, useEffect } from 'react';
import { ShieldCheck, Fingerprint, Lock, Eye, ScanFace, Binary, Activity, ShieldAlert, Zap } from 'lucide-react';

export const AegisSecurity = () => {
  const [scanProgress, setScanProgress] = useState(0);
  const [integrity, setIntegrity] = useState(100);

  useEffect(() => {
    const interval = setInterval(() => {
      setIntegrity(prev => Math.max(95, prev + (Math.random() > 0.5 ? 0.01 : -0.01)));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const runScan = () => {
    setScanProgress(0);
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 50);
  };

  return (
    <div className="space-y-250 animate-in fade-in duration-1000 h-screen flex flex-col pb-[300px]">
      <div className="text-center space-y-24">
        <h2 className="text-[180px] font-black italic tracking-tighter text-white uppercase leading-none italic">AEGIS <span className="text-emerald-500">SECURITY.</span></h2>
        <p className="text-[32px] font-black text-slate-900 uppercase tracking-[4em] italic">NEURAL_INFRASTRUCTURE_SHIELD_V3</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-150 flex-1">
         <div className="lg:col-span-8 bg-[#050505] border-[30px] border-white/5 rounded-[800px] p-200 relative overflow-hidden shadow-4xl flex items-center justify-center group">
            <div className="absolute inset-0 bg-emerald-500/5 animate-pulse"></div>
            
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center space-y-150">
               <div className="relative w-[1200px] h-[1200px]">
                  <div className="absolute inset-0 border-[60px] border-white/5 rounded-full animate-spin-slow"></div>
                  <div className="absolute inset-80 border-t-[30px] border-emerald-500 rounded-full animate-spin"></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                     <Fingerprint size={450} className={`text-white transition-all duration-1000 ${scanProgress > 0 && scanProgress < 100 ? 'animate-pulse scale-110 text-emerald-500' : ''}`}/>
                     <p className="text-[48px] font-black text-emerald-500 uppercase tracking-[1em] mt-64 italic">{scanProgress === 100 ? 'IDENTITY_VERIFIED' : scanProgress > 0 ? 'SCANNING_BIOMETRY...' : 'AWAITING_SCAN'}</p>
                  </div>
               </div>
               
               <div className="w-full max-w-6xl space-y-64">
                  <div className="h-40 bg-white/5 border-[10px] border-black rounded-full overflow-hidden shadow-inner">
                     <div className="h-full bg-emerald-600 animate-pulse transition-all duration-75" style={{ width: `${scanProgress}%` }}></div>
                  </div>
                  <button onClick={runScan} className="w-full bg-white text-black py-64 rounded-full font-black uppercase text-[42px] tracking-[2em] hover:bg-emerald-600 hover:text-white transition-all italic border-[25px] border-black shadow-4xl active:scale-95">INIT_BIOMETRIC_SYNC</button>
               </div>
            </div>
         </div>

         <div className="lg:col-span-4 space-y-120">
            <div className="bg-black border-[20px] border-white/5 rounded-[600px] p-120 space-y-100 shadow-4xl text-center">
               <Activity size={180} className="text-emerald-500 mx-auto animate-pulse"/>
               <h3 className="text-8xl font-black italic uppercase text-white tracking-tighter leading-none">SYNAPSE INTEGRITY</h3>
               <div className="text-[250px] font-black text-white leading-none italic">{integrity.toFixed(2)}<span className="text-4xl">%</span></div>
               <p className="text-5xl font-bold text-slate-800 uppercase italic leading-tight">Zero packet-loss detected in the Dimensional Mesh.</p>
            </div>

            <div className="bg-[#050505] border-[15px] border-white/5 p-120 rounded-[400px] space-y-64 text-center">
               <Binary size={100} className="text-slate-900 mx-auto"/>
               <h5 className="text-[24px] font-black text-slate-800 uppercase tracking-[2em] italic">QUANTUM_CRYPT_V9</h5>
               <p className="text-5xl font-bold text-slate-500 italic">"The Aegis HUD visualizes the 12th layer of imperial encryption. Unauthorized access is physically impossible."</p>
            </div>
         </div>
      </div>
    </div>
  );
};
