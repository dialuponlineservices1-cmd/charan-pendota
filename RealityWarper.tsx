import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
// @google/genai Senior Frontend Engineer: Added missing ShieldCheck and Trophy imports.
import { Atom, RefreshCw, Zap, Sparkles, Target, Calendar, Crown, ShieldAlert, ArrowRight, Lightbulb, ShieldCheck, Trophy } from 'lucide-react';

export const RealityWarper = ({ db }: any) => {
  const [isWarping, setIsWarping] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [plan, setPlan] = useState<any>(null);

  const warpReality = async () => {
    if (!selectedJob) return;
    setIsWarping(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `REALITY_WARP: Create a 1-YEAR (365-day) atomic study plan for: ${selectedJob.title_en}. 
        Focus on: High-intensity mastery cycles, rest-windows, and neuro-plasticity triggers. 
        Provide: 
        1. 4 Phase-Level summaries (Q1 to Q4). 
        2. Daily Mantra. 
        3. Strategic Warning. 
        Return strictly JSON with phase1, phase2, phase3, phase4, mantra, warning.`,
        config: {
          thinkingConfig: { thinkingBudget: 32768 },
          responseMimeType: "application/json"
        }
      });
      setPlan(JSON.parse(response.text));
    } catch (e) {
      alert("Temporal Warp failure.");
    } finally {
      setIsWarping(false);
    }
  };

  return (
    <div className="space-y-300 animate-in fade-in duration-1000 pb-[1000px]">
      <div className="flex flex-col xl:flex-row items-center justify-between border-b-[40px] border-pink-600/10 pb-150 gap-100">
        <div className="space-y-80 text-center xl:text-left">
          <h2 className="text-[350px] font-black italic tracking-tighter text-white uppercase leading-[0.3] italic">REALITY <br/><span className="text-pink-500">WARPER.</span></h2>
          <p className="text-[56px] font-black text-slate-900 uppercase tracking-[5em] italic leading-none">365_DAY_NEURAL_REPROGRAMMING_ENGINE</p>
        </div>
        <div className="flex flex-col md:flex-row gap-80 w-full max-w-8xl">
           <select 
             className="flex-1 bg-black border-[30px] border-pink-600/10 rounded-full px-120 py-80 text-7xl font-black text-white outline-none focus:border-pink-600 transition-all appearance-none italic"
             onChange={e => setSelectedJob(db.jobs.find((j:any) => j.id == e.target.value))}
           >
             <option value="">CHOOSE_EXAM_NODE...</option>
             {db.jobs.map((j: any) => <option key={j.id} value={j.id}>{j.title_en}</option>)}
           </select>
           <button onClick={warpReality} disabled={isWarping || !selectedJob} className="bg-pink-600 text-black px-250 py-100 rounded-full font-black uppercase text-[64px] tracking-[2em] hover:bg-white hover:text-black transition-all shadow-[0_0_5000px_pink] flex items-center gap-80 italic border-[50px] border-black active:scale-95">
              {isWarping ? <RefreshCw className="animate-spin" size={150}/> : <Atom size={150}/>} {isWarping ? 'WARPING...' : 'WARP_ROADMAP'}
           </button>
        </div>
      </div>

      {plan && (
        <div className="grid lg:grid-cols-2 gap-150 animate-in zoom-in-95 duration-700">
           {[
             { t: 'PHASE_01: NUCLEUS', c: plan.phase1, i: <Target/> },
             { t: 'PHASE_02: EXPANSION', c: plan.phase2, i: <Zap/> },
             { t: 'PHASE_03: DOMINANCE', c: plan.phase3, i: <ShieldCheck/> },
             { t: 'PHASE_04: VICTORY', c: plan.phase4, i: <Trophy/> }
           ].map((p, i) => (
             <div key={i} className="bg-black border-[30px] border-white/5 rounded-[800px] p-250 space-y-100 shadow-4xl group hover:border-pink-600 transition-all relative overflow-hidden">
                <div className="absolute top-0 right-0 p-100 opacity-5 rotate-12 group-hover:rotate-0 transition-transform duration-1000">{p.i}</div>
                <h4 className="text-8xl font-black italic uppercase text-pink-500 tracking-tighter">{p.t}</h4>
                <div className="bg-[#050505] p-100 rounded-[400px] border-[10px] border-white/5 min-h-[600px] flex items-center">
                   <p className="text-6xl font-bold text-slate-400 italic leading-tight">"{p.c}"</p>
                </div>
             </div>
           ))}
           <div className="lg:col-span-2 bg-pink-600 text-black p-300 rounded-[1500px] text-center space-y-80 shadow-[0_0_8000px_pink] border-[40px] border-black">
              <h3 className="text-[120px] font-black italic uppercase tracking-tighter leading-none">GOD_MANTRA: {plan.mantra}</h3>
              <p className="text-[32px] font-black uppercase tracking-[1.5em] italic">STRATEGIC_WARNING: {plan.warning}</p>
              <button className="bg-black text-white px-200 py-64 rounded-full font-black uppercase text-5xl tracking-widest italic hover:bg-white hover:text-black transition-all border-[15px] border-black">SYNC_TO_MOBILE_APP</button>
           </div>
        </div>
      )}
    </div>
  );
};