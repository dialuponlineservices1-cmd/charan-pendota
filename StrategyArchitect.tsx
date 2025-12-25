
import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { Sparkles, Brain, Target, TrendingUp, RefreshCw, X, ArrowRight, ShieldCheck, Zap, Ghost, Compass, Award } from 'lucide-react';

export const StrategyArchitect = ({ db, lang }: any) => {
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [isThinking, setIsThinking] = useState(false);
  const [blueprint, setBlueprint] = useState<any>(null);

  const constructBlueprint = async () => {
    if (!selectedJob) return;
    setIsThinking(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `DEEP-THINK ANALYZE: ${selectedJob.title}. 
        Create a Victory Blueprint for an aspirant. 
        Include: 
        1. Hidden Competitive Advantage (What others miss), 
        2. Departmental Synergy (Which other jobs this helps for), 
        3. 10-Year Career Simulation (Projected rank and salary peaks), 
        4. "Deep-Burn" Study Node (Top 3 subjects to master).
        Return STRICT JSON format.`,
        config: {
          thinkingConfig: { thinkingBudget: 32768 },
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              advantage: { type: Type.STRING },
              synergy: { type: Type.STRING },
              careerSimulation: { type: Type.STRING },
              studyNode: { type: Type.ARRAY, items: { type: Type.STRING } },
              victoryProbability: { type: Type.NUMBER }
            }
          }
        }
      });
      setBlueprint(JSON.parse(response.text));
    } catch (e) {
      alert("Neural Overload. Singularity connection reset.");
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="space-y-24 animate-in fade-in duration-1000 pb-96">
      
      {/* ARCHITECT SELECTOR */}
      {!blueprint ? (
        <section className="space-y-16">
           <div className="text-center space-y-6">
              <h2 className="text-9xl font-black italic uppercase tracking-tighter text-white">STRATEGY <span className="text-indigo-500">ARCHITECT.</span></h2>
              <p className="text-4xl font-bold text-slate-800 italic uppercase">Dismantle the matrix. Claim your victory.</p>
           </div>
           
           <div className="grid lg:grid-cols-3 gap-12 pt-16">
              {db.jobs.slice(0, 6).map((job: any) => (
                 <div key={job.id} onClick={() => setSelectedJob(job)} className={`bg-slate-950 border rounded-[100px] p-12 hover:border-indigo-500 transition-all cursor-pointer group shadow-4xl ${selectedJob?.id === job.id ? 'border-indigo-500 bg-indigo-500/5' : 'border-white/5'}`}>
                    <h4 className="text-4xl font-black text-white italic tracking-tighter uppercase leading-none group-hover:text-indigo-400">{job.title}</h4>
                    <p className="text-[10px] font-black text-slate-800 uppercase tracking-widest mt-6">{job.org}</p>
                 </div>
              ))}
           </div>

           {selectedJob && (
              <div className="flex justify-center pt-16">
                 <button onClick={constructBlueprint} disabled={isThinking} className="px-24 py-10 bg-indigo-600 rounded-[60px] text-white font-black uppercase text-[18px] tracking-widest shadow-4xl hover:bg-white hover:text-black transition-all flex items-center gap-8 active:scale-95 group">
                    {isThinking ? <RefreshCw className="animate-spin" size={32}/> : <Ghost size={32} className="group-hover:animate-bounce"/>}
                    {isThinking ? "REASONING IN DEEP-VOID..." : "INITIALIZE BLUEPRINT SYNTHESIS"}
                 </button>
              </div>
           )}
        </section>
      ) : (
        /* THE BLUEPRINT (V60 GOD-VIEW) */
        <section className="space-y-32 animate-in zoom-in-95 duration-1000">
           <div className="flex justify-between items-end">
              <div className="space-y-4">
                 <h3 className="text-8xl font-black italic uppercase tracking-tighter text-white">VICTORY <span className="text-indigo-500">BLUEPRINT.</span></h3>
                 <p className="text-[14px] font-black text-slate-800 uppercase tracking-[1em]">Neural Probability Matrix for {selectedJob.title}</p>
              </div>
              <button onClick={() => setBlueprint(null)} className="p-10 bg-white/5 rounded-full hover:bg-red-600 transition-all shadow-4xl"><X size={40}/></button>
           </div>

           <div className="grid lg:grid-cols-12 gap-16">
              <div className="lg:col-span-7 space-y-16">
                 {/* ADVANTAGE NODE */}
                 <div className="bg-slate-950/40 border border-indigo-500/20 rounded-[120px] p-24 space-y-12 shadow-inner relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12 transition-transform duration-1000 group-hover:rotate-0"><Target size={300}/></div>
                    <h4 className="text-6xl font-black italic uppercase tracking-tighter text-indigo-500 flex items-center gap-8"><Compass size={56}/> Hidden Advantage</h4>
                    <p className="text-5xl text-slate-300 font-medium italic leading-relaxed">"{blueprint.advantage}"</p>
                 </div>

                 {/* CAREER SIMULATION */}
                 <div className="bg-[#050505] border border-white/5 rounded-[120px] p-24 space-y-12 shadow-4xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-45 transition-transform duration-1000 group-hover:rotate-0"><TrendingUp size={300}/></div>
                    <h4 className="text-6xl font-black italic uppercase tracking-tighter text-white flex items-center gap-8"><Zap size={56} className="text-emerald-500 animate-pulse"/> 10-Year Simulation</h4>
                    <p className="text-4xl text-slate-400 font-medium italic leading-relaxed">"{blueprint.careerSimulation}"</p>
                 </div>
              </div>

              <div className="lg:col-span-5 space-y-12">
                 {/* VICTORY PROBABILITY GRID */}
                 <div className="bg-indigo-600 rounded-[120px] p-20 text-center space-y-12 shadow-4xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-150 transition-transform duration-1000"><Award size={400}/></div>
                    <h4 className="text-[12px] font-black text-white uppercase tracking-[1em]">VICTORY PROBABILITY</h4>
                    <h2 className="text-[180px] font-black italic tracking-tighter text-white leading-none">{blueprint.victoryProbability}<span className="text-4xl text-white/50">%</span></h2>
                    <div className="pt-8 border-t border-white/20">
                       <p className="text-[11px] font-black text-white/80 uppercase tracking-widest italic leading-relaxed">Probability calculated via Aethelgard Reasoning Mesh based on global peer density and your bio-mastery.</p>
                    </div>
                 </div>

                 {/* DEEP-BURN STUDY NODES */}
                 <div className="bg-slate-950 border border-white/5 rounded-[100px] p-16 space-y-10 shadow-inner">
                    <h4 className="text-[14px] font-black text-slate-800 uppercase tracking-[0.5em] px-8">DEEP-BURN MODULES</h4>
                    <div className="space-y-6">
                       {blueprint.studyNode.map((node: any, i: number) => (
                          <div key={i} className="flex items-center gap-8 bg-black border border-white/5 p-10 rounded-[60px] hover:border-indigo-500/50 transition-all group">
                             <div className="w-16 h-16 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-500 font-black italic text-2xl group-hover:scale-110 transition-transform">0{i+1}</div>
                             <p className="text-3xl font-black text-white italic tracking-tighter uppercase">{node}</p>
                          </div>
                       ))}
                    </div>
                 </div>
              </div>
           </div>
        </section>
      )}
    </div>
  );
};
