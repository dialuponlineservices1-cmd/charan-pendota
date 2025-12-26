
import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Cpu, Zap, Shield, Globe, Lock, Code } from 'lucide-react';

const LOG_MESSAGES = [
  "DEUS_EX_MACHINA: Core initialization successful.",
  "NEURAL_LINK: Synchronizing with Google Search Grounding...",
  "SPATIAL_MATRIX: Relaying geolocation packets (127.0.0.1:443)",
  "ORACLE_V4: Analyzing global job market volatility...",
  "SECURITY_PROTOCOL: Scrubbing unauthorized scraping attempts.",
  "DATA_MESH: Distributed ledger updated across 156 nodes.",
  "VOICE_ENGINE: Zephyr-9x loaded and ready for synthesis.",
  "ALERT: High demand detected in TSPSC sector. Scaling resources...",
  "API_BALANCE: Request routed to primary endpoint cluster.",
  "TRUTH_VERIFIER: PDF Gazette verification 100% complete.",
  "SYSTEM: Power consumption optimized at 94%.",
  "USER_SYNC: 4.8M active neural sessions authenticated.",
  "VEO_3.1: Video rendering pipeline cleared.",
  "SENTINEL: Perpetual monitoring loop running..."
];

export const NeuralSentinel = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const msg = `[${new Date().toLocaleTimeString()}] ${LOG_MESSAGES[Math.floor(Math.random() * LOG_MESSAGES.length)]}`;
      setLogs(prev => [...prev.slice(-40), msg]);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [logs]);

  return (
    <div className="space-y-12 animate-in fade-in duration-1000 h-screen flex flex-col pb-[300px]">
      <div className="text-center space-y-4">
        <h2 className="text-8xl font-black italic tracking-tighter text-white uppercase"><span className="text-red-600">NEURAL</span> SENTINEL</h2>
        <p className="text-[12px] font-black text-slate-800 uppercase tracking-[2em] italic">REAL_TIME_SYSTEM_TELEMETRY</p>
      </div>

      <div className="flex-1 bg-[#050505] border-[10px] border-white/5 rounded-[100px] overflow-hidden flex flex-col shadow-4xl">
         <header className="bg-black/80 px-48 py-16 border-b-[5px] border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-12 text-red-600">
               <Terminal size={32}/>
               <span className="font-black uppercase tracking-[1em] text-xl">CONSOLE_OUTPUT</span>
            </div>
            <div className="flex gap-6">
               <div className="w-12 h-12 bg-red-600 rounded-full"></div>
               <div className="w-12 h-12 bg-slate-800 rounded-full"></div>
            </div>
         </header>
         
         <div ref={scrollRef} className="flex-1 p-48 font-mono text-3xl overflow-y-auto scrollbar-hide space-y-4 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat">
            {logs.map((log, i) => (
              <div key={i} className="flex gap-8 group">
                 <span className="text-red-900 font-bold select-none">&gt;</span>
                 <span className={`${log.includes('ALERT') ? 'text-red-500 animate-pulse' : 'text-emerald-500/80'} group-hover:text-white transition-colors`}>{log}</span>
              </div>
            ))}
            <div className="w-12 h-20 bg-emerald-500 animate-pulse inline-block ml-12"></div>
         </div>
      </div>

      <div className="grid grid-cols-4 gap-12">
         {[
            { l: "Packet Velocity", v: "1.4 GB/s", i: <Zap/> },
            { l: "Security Shield", v: "MAX", i: <Shield/> },
            { l: "Node Health", v: "STABLE", i: <Cpu/> },
            { l: "Uptime", v: "99.99%", i: <Globe/> }
         ].map((s, idx) => (
           <div key={idx} className="bg-white/5 p-32 rounded-[100px] border-[5px] border-white/5 text-center space-y-4 hover:border-red-600 transition-all cursor-crosshair">
              <div className="text-slate-800 flex justify-center mb-4">{s.i}</div>
              <h4 className="text-4xl font-black text-white italic">{s.v}</h4>
              <p className="text-[10px] font-black text-slate-800 uppercase tracking-widest">{s.l}</p>
           </div>
         ))}
      </div>
    </div>
  );
};
