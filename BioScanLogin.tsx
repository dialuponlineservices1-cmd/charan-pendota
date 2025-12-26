
import React, { useState, useEffect, useRef } from 'react';
// Added missing Key component to lucide-react imports to fix the error on line 32.
import { Scan, Fingerprint, ShieldCheck, AlertTriangle, RefreshCw, Eye, Key } from 'lucide-react';

export const BioScanLogin = ({ adminKey, onAuthSuccess }: any) => {
  const [step, setStep] = useState<'pass' | 'scan' | 'verify'>('pass');
  const [pass, setPass] = useState('');
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startScan = async () => {
    setStep('scan');
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    if (videoRef.current) videoRef.current.srcObject = stream;
    
    let p = 0;
    const interval = setInterval(() => {
      p += 2;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setStep('verify');
        setTimeout(onAuthSuccess, 1500);
      }
    }, 50);
  };

  if (step === 'pass') return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8 selection:bg-yellow-600">
      <div className="w-full max-w-5xl bg-white/[0.01] border-[40px] border-white/5 rounded-[1500px] p-32 text-center space-y-16 shadow-4xl relative overflow-hidden group">
         <div className="absolute inset-0 bg-yellow-500/5 group-hover:scale-150 transition-transform duration-[20000ms]"></div>
         <div className="w-64 h-64 bg-yellow-500 rounded-full mx-auto flex items-center justify-center shadow-[0_0_15000px_gold] border-[25px] border-black animate-pulse relative z-10"><Key size={100} className="text-black"/></div>
         <h2 className="text-[120px] font-black italic text-white uppercase tracking-tighter relative z-10 leading-none">ETERNITY <span className="text-yellow-500">GATE.</span></h2>
         <input type="password" title="Key" className="w-full bg-black border-[20px] border-white/10 rounded-full px-16 py-10 text-white font-black text-center text-[100px] outline-none focus:border-yellow-500 transition-all italic placeholder:text-slate-950 relative z-10" placeholder="0000" value={pass} onChange={e => setPass(e.target.value)} onKeyDown={e => e.key === 'Enter' && (pass === adminKey ? startScan() : alert("ACCESS_DENIED"))}/>
         <button onClick={() => pass === adminKey ? startScan() : alert("ACCESS_DENIED")} className="w-full bg-white text-black py-10 rounded-full font-black uppercase tracking-[2.5em] text-[56px] hover:bg-yellow-500 hover:text-white transition-all shadow-4xl border-[20px] border-black italic relative z-10">INIT_AUTH</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8">
       <div className="w-full max-w-8xl text-center space-y-120">
          <div className="relative w-[1500px] h-[1500px] mx-auto">
             <div className="absolute inset-0 border-[60px] border-white/5 rounded-full animate-spin-slow"></div>
             <div className="absolute inset-80 border-t-[30px] border-yellow-500 rounded-full animate-spin"></div>
             <video ref={videoRef} autoPlay muted playsInline className="absolute inset-0 w-full h-full object-cover rounded-full grayscale brightness-50" />
             
             {/* SCANNING OVERLAY */}
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full h-4 bg-yellow-500 shadow-[0_0_100px_gold] animate-scan-y absolute z-20"></div>
                {step === 'verify' && <ShieldCheck size={400} className="text-yellow-500 animate-in zoom-in duration-500 z-30"/>}
             </div>
          </div>
          
          <div className="space-y-48">
             <h3 className="text-[120px] font-black italic text-white uppercase tracking-tighter leading-none">{step === 'verify' ? 'IDENTITY_CONFIRMED' : 'SCANNING_BIOMETRY...'}</h3>
             <div className="max-w-6xl mx-auto h-20 bg-white/5 rounded-full overflow-hidden border-[5px] border-black">
                <div className="h-full bg-yellow-500 transition-all duration-75" style={{ width: `${progress}%` }}></div>
             </div>
             <p className="text-5xl font-black text-slate-800 uppercase tracking-[2em] italic leading-none">PROTOCOL_V2000_ENFORCED</p>
          </div>
       </div>
       <style dangerouslySetInnerHTML={{ __html: `
          @keyframes scan-y { 0% { transform: translateY(-500px); } 100% { transform: translateY(500px); } }
          .animate-scan-y { animation: scan-y 2s linear infinite; }
       `}} />
    </div>
  );
};
