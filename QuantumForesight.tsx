
import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { Radar, RefreshCw, Zap, Search, Target, TrendingUp, ShieldAlert, Binary, Ghost, ShieldCheck } from 'lucide-react';

export const QuantumForesight = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [intel, setIntel] = useState<any>(null);

  const scanDeepWeb = async () => {
    setIsScanning(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: "Perform a QUANTUM_FORESIGHT scan. Identify 3 recruitment notifications in Telangana or Andhra that are currently in 'Budget Approval' or 'Secret Draft' phase. Predict the EXACT WEEK they will be gazetted. For each, provide a 'Leak Confidence', 'Secret Vacancy Count', and 'Action Plan for Students'. Return JSON.",
        config: {
          thinkingConfig: { thinkingBudget: 32768 },
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json"
        }
      });
      setIntel(JSON.parse(response.text));
    } catch (e) {
      alert("Quantum Drift: Target untraceable.");
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="space-y-250 animate-in fade-in duration-1000 pb-[1000px]">
      <div className="flex flex-col xl:flex-row items-center justify-between border-b-[30px] border-white/5 pb-120 gap-100">
        <div className="space-y-64 text-center xl:text-left">
          <h2 className="text-[300px] font-black italic tracking-tighter text-white uppercase leading-[0.35] italic">QUANTUM <br/><span className="text-red-600">FORESIGHT.</span></h2>
          <p className="text-[48px] font-black text-slate-900 uppercase tracking-[4em] italic leading-none">PRE_GAZETTE_LEAK_DETECTOR_V1</p>
        </div>
        <button onClick={scanDeepWeb} disabled={isScanning} className="bg-white text-black px-200 py-80 rounded-full font-black uppercase text-[56px] tracking-[1.5em] hover:bg-red-600 hover:text-white transition-all shadow-4xl flex items-center gap-64 italic border-[40px] border-black active:scale-95">
           {isScanning ? <RefreshCw className="animate-spin" size={120}/> : <Binary size={120}/>} {isScanning ? 'FILTERING_VOIDS...' : 'INFILTRATE_DRAFTS'}
        </button>
      </div>

      {intel ? (
        <div className="grid lg:grid-cols-1 gap-150">
           {intel.predictions.map((p: any, i: number) => (
             <div key={i} className="bg-[#050505] border-[30px] border-white/5 rounded-[1200px] p-300 space-y-150 group hover:border-red-600 transition-all shadow-4xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-150 opacity-[0.03] scale-150 rotate-12 group-hover:rotate-0 transition-transform duration-[4000ms]"><ShieldCheck size={1000}/></div>
                <div className="flex flex-col xl:flex-row items-center gap-100 relative z-10">
                   <div className="text-center space-y-48 min-w-[800px]">
                      <h4 className="text-[250px] font-black text-white italic tracking-tighter leading-none">{p.confidence}%</h4>
                      <p className="text-[32px] font-black text-red-600 uppercase tracking-[2em] italic">LEAK_CONFIDENCE</p>
                   </div>
                   <div className="space-y-64 flex-1">
                      <h3 className="text-[180px] font-black italic text-white leading-none tracking-tighter uppercase">{p.job_name}</h3>
                      <div className="flex gap-48">
                         <span className="bg-white/5 px-64 py-24 rounded-full border border-white/10 text-5xl font-black text-slate-500 italic">WINDOW: {p.predicted_week}</span>
                         <span className="bg-red-600 text-white px-64 py-24 rounded-full border-[10px] border-black text-5xl font-black italic animate-pulse">SECRET_VACANCIES: ~{p.secret_vacancy_count}</span>
                      </div>
                   </div>
                </div>
                <div className="bg-black border-[15px] border-white/5 p-150 rounded-[400px] relative z-10">
                   <h5 className="text-[32px] font-black text-red-600 uppercase tracking-[1em] mb-48">TACTICAL_STUDENT_PLAN</h5>
                   <p className="text-7xl font-bold text-slate-400 italic leading-tight">"{p.action_plan}"</p>
                </div>
             </div>
           ))}
        </div>
      ) : (
        <div className="h-[2500px] bg-[#050505] border-[40px] border-white/5 rounded-[1000px] flex flex-col items-center justify-center text-center p-300 opacity-20 space-y-150">
           <Radar size={600} className="text-slate-950 animate-pulse"/>
           <p className="text-[220px] font-black text-slate-950 uppercase tracking-[0.5em] leading-none italic">AWAITING_TEMPORAL_LOCK_ON.</p>
        </div>
      )}
    </div>
  );
};
