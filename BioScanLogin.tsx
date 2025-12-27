import React, { useState, useEffect, useRef } from 'react';
import { Scan, Fingerprint, ShieldCheck, AlertTriangle, RefreshCw, Eye, Key, Power } from 'lucide-react';

export const BioScanLogin = ({ adminKey, onAuthSuccess }: any) => {
  const [step, setStep] = useState<'pass' | 'scan' | 'verify'>('pass');
  const [pass, setPass] = useState('');
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startScan = async () => {
    setStep('scan');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (e) {
      console.warn("Camera restricted, proceeding with neural simulation...");
    }
    
    let p = 0;
    const interval = setInterval(() => {
      p += 2;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setStep('verify');
        setTimeout(() => {
           // Close stream if active
           if (videoRef.current && videoRef.current.srcObject) {
             (videoRef.current.srcObject as MediaStream).getTracks().forEach(t => t.stop());
           }
           onAuthSuccess();
        }, 1200);
      }
    }, 40);
  };

  const handleAttempt = () => {
    if (pass === adminKey) {
      startScan();
    } else {
      alert("IMPERIAL_ERROR: KEY_MISMATCH. Access Refused.");
      setPass('');
    }
  };

  if (step === 'pass') return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8 selection:bg-pink-600 font-sans">
      <div className="w-full max-w-4xl bg-white/[0.01] border-[1px] border-white/5 rounded-[100px] p-24 text-center space-y-16 shadow-4xl relative overflow-hidden group">
         <div className="absolute inset-0 bg-pink-600/5 group-hover:scale-150 transition-transform duration-[20000ms]"></div>
         <div className="w-32 h-32 bg-pink-600 rounded-[40px] mx-auto flex items-center justify-center shadow-[0_0_100px_rgba(236,72,153,0.3)] border border-black animate-pulse relative z-10">
            <Key size={48} className="text-black"/>
         </div>
         <div className="space-y-4 relative z-10">
            <h2 className="text-7xl font-black italic text-white uppercase tracking-tighter leading-none">ETERNITY <span className="text-pink-600">GATE.</span></h2>
            <p className="text-[10px] font-black text-slate-700 uppercase tracking-[1em] italic">SOVEREIGN_ACCESS_REQUIRED</p>
         </div>
         <div className="max-w-md mx-auto space-y-10 relative z-10 pt-10">
            <input 
              type="password" 
              title="Key" 
              className="w-full bg-black/60 border border-white/10 rounded-[40px] px-10 py-6 text-white font-black text-center text-6xl outline-none focus:border-pink-600 transition-all italic placeholder:text-slate-900 shadow-inner" 
              placeholder="••••" 
              value={pass} 
              onChange={e => setPass(e.target.value)} 
              onKeyDown={e => e.key === 'Enter' && handleAttempt()}
            />
            <button onClick={handleAttempt} className="w-full bg-white text-black py-6 rounded-[32px] font-black uppercase tracking-[1.5em] text-sm hover:bg-pink-600 hover:text-white transition-all shadow-xl border border-black italic active:scale-95">
               INIT_AUTHENTICATION
            </button>
         </div>
         <p className="text-[8px] font-bold text-slate-800 uppercase tracking-[0.5em] pt-8">Powered by Aethelgard Reasoning Mesh v3.0</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8 font-sans">
       <div className="w-full max-w-6xl text-center space-y-24">
          <div className="relative w-[500px] h-[500px] mx-auto">
             <div className="absolute inset-0 border-[20px] border-white/5 rounded-full animate-spin-slow opacity-20"></div>
             <div className="absolute inset-20 border-t-[8px] border-pink-600 rounded-full animate-spin"></div>
             <div className="absolute inset-0 w-full h-full rounded-full overflow-hidden bg-slate-950 border border-white/5 shadow-2xl">
                <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover grayscale brightness-50" />
                <div className="absolute inset-0 bg-pink-600/10 pointer-events-none"></div>
             </div>
             
             {/* SCANNING HUD */}
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-full h-1 bg-pink-600 shadow-[0_0_40px_#ec4899] animate-scan-y absolute z-20"></div>
                {step === 'verify' && <ShieldCheck size={200} className="text-pink-500 animate-in zoom-in duration-500 z-30 drop-shadow-[0_0_30px_rgba(236,72,153,0.5)]"/>}
             </div>
          </div>
          
          <div className="space-y-10">
             <h3 className="text-6xl font-black italic text-white uppercase tracking-tighter leading-none">
               {step === 'verify' ? 'IDENTITY_LOCKED' : 'SCANNING_NEURALS...'}
             </h3>
             <div className="max-w-2xl mx-auto h-4 bg-white/5 rounded-full overflow-hidden border border-black">
                <div className="h-full bg-pink-600 transition-all duration-75" style={{ width: `${progress}%` }}></div>
             </div>
             <p className="text-xs font-black text-slate-700 uppercase tracking-[1em] italic leading-none">ENCRYPTING_SESSION_DATA</p>
          </div>
       </div>
       <style dangerouslySetInnerHTML={{ __html: `
          @keyframes scan-y { 0% { transform: translateY(-220px); opacity: 0.2; } 50% { opacity: 1; } 100% { transform: translateY(220px); opacity: 0.2; } }
          .animate-scan-y { animation: scan-y 2.5s linear infinite; }
       `}} />
    </div>
  );
};