
import React, { useState, useEffect } from 'react';
import { Wrench, RefreshCw, Zap, ShieldCheck, Database, HardDrive, Cpu, Activity } from 'lucide-react';

export const NeuralDefrag = ({ db, updateDB }: any) => {
  const [isDefragging, setIsDefragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [optimized, setOptimized] = useState(false);
  const [blocks, setBlocks] = useState<any[]>([]);

  useEffect(() => {
    // Generate initial matrix blocks
    const initialBlocks = Array.from({ length: 400 }).map((_, i) => ({
      id: i,
      state: Math.random() > 0.8 ? 'fragmented' : 'optimized',
      color: Math.random() > 0.8 ? 'bg-red-600' : 'bg-slate-900'
    }));
    setBlocks(initialBlocks);
  }, []);

  const runDefrag = () => {
    setIsDefragging(true);
    setOptimized(false);
    setProgress(0);
    
    let current = 0;
    const interval = setInterval(() => {
      current += 2;
      setProgress(current);
      
      setBlocks(prev => prev.map((b, i) => {
         if (i < (prev.length * (current / 100))) return { ...b, state: 'optimized', color: 'bg-emerald-600' };
         return b;
      }));

      if (current >= 100) {
        clearInterval(interval);
        setIsDefragging(false);
        setOptimized(true);
      }
    }, 100);
  };

  return (
    <div className="space-y-150 animate-in fade-in duration-1000 pb-[1000px]">
      <div className="flex flex-col xl:flex-row items-center justify-between border-b-[20px] border-white/5 pb-100 gap-80">
        <div className="space-y-32 text-center xl:text-left">
          <h2 className="text-[250px] font-black italic tracking-tighter text-white uppercase leading-[0.35] italic">NEURAL <br/><span className="text-emerald-500">DEFRAG.</span></h2>
          <p className="text-[42px] font-black text-slate-900 uppercase tracking-[4em] italic">DATABASE_LATENCY_OPTIMIZER_V1</p>
        </div>
        <button onClick={runDefrag} disabled={isDefragging} className="bg-white text-black px-150 py-64 rounded-full font-black uppercase text-[48px] tracking-[1.5em] hover:bg-emerald-600 hover:text-white transition-all shadow-4xl flex items-center gap-48 italic border-[30px] border-black active:scale-95">
           {isDefragging ? <RefreshCw className="animate-spin" size={100}/> : <Wrench size={100}/>} {isDefragging ? 'OPTIMIZING...' : 'INIT_DEFRAG'}
        </button>
      </div>

      <div className="grid lg:grid-cols-12 gap-100">
         <div className="lg:col-span-8 bg-black border-[20px] border-white/5 rounded-[600px] p-100 relative overflow-hidden shadow-4xl h-[1800px]">
            <div className="absolute inset-0 bg-emerald-600/5 animate-pulse"></div>
            <div className="relative z-10 grid grid-cols-20 gap-4 h-full">
               {blocks.map(b => (
                 <div key={b.id} className={`w-full aspect-square rounded-sm transition-all duration-500 ${b.color} ${isDefragging ? 'animate-pulse' : ''}`}></div>
               ))}
            </div>
         </div>

         <div className="lg:col-span-4 space-y-80">
            <div className="bg-black border-[15px] border-white/5 rounded-[400px] p-100 space-y-80 shadow-4xl text-center">
               <h3 className="text-7xl font-black italic uppercase text-white tracking-tighter">OPTIMIZATION STATUS</h3>
               <div className="text-[200px] font-black text-white leading-none italic">{progress}<span className="text-4xl">%</span></div>
               <div className="h-20 bg-white/5 rounded-full overflow-hidden border-[5px] border-black">
                  <div className="h-full bg-emerald-600 transition-all duration-300" style={{ width: `${progress}%` }}></div>
               </div>
               <p className="text-4xl font-bold text-slate-800 uppercase italic leading-tight">Neural Lattice Re-Alignment active. Latency reduction estimated at 42ms.</p>
            </div>

            {optimized && (
              <div className="bg-emerald-600/10 border-[15px] border-emerald-500/30 p-100 rounded-[300px] text-center space-y-48 animate-in zoom-in-95 duration-500">
                 <ShieldCheck size={180} className="text-emerald-500 mx-auto animate-bounce"/>
                 <h4 className="text-8xl font-black text-white italic tracking-tighter uppercase">REGISTRY CLEAN</h4>
                 <p className="text-4xl font-bold text-slate-500 uppercase italic leading-tight">Zero Fragmentation detected. Singularity connection is pure.</p>
              </div>
            )}
         </div>
      </div>
    </div>
  );
};
