
import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { Target, RefreshCw, Zap, TrendingUp, BarChart, ShieldCheck, MapPin, Activity, Crown, Ghost } from 'lucide-react';

export const CutoffPredictor = ({ db }: any) => {
  const [isPredicting, setIsPredicting] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [results, setResults] = useState<any>(null);

  const predictCutoffs = async () => {
    if (!selectedJob) return;
    setIsPredicting(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `CUTOFF_PREDICTOR_V20: Analyze historical cutoff data and current student density for: ${selectedJob.title_en}. 
        Predict the 2025 Cutoffs for: Hyderabad, Warangal, Vizag, and Vijayawada. 
        Return JSON with: district_name, predicted_cutoff, difficulty_delta, and reasoning.`,
        config: {
          thinkingConfig: { thinkingBudget: 24576 },
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              predictions: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    district_name: { type: Type.STRING },
                    predicted_cutoff: { type: Type.NUMBER },
                    difficulty_delta: { type: Type.STRING },
                    reasoning: { type: Type.STRING }
                  }
                }
              }
            }
          }
        }
      });
      setResults(JSON.parse(response.text));
    } catch (e) {
      alert("Cutoff Matrix Unstable: Historical nodes fragmented.");
    } finally {
      setIsPredicting(false);
    }
  };

  return (
    <div className="space-y-300 animate-in fade-in duration-1000 pb-[1000px]">
      <div className="flex flex-col xl:flex-row items-center justify-between border-b-[40px] border-emerald-600/10 pb-150 gap-100">
        <div className="space-y-80 text-center xl:text-left">
          <h2 className="text-[350px] font-black italic tracking-tighter text-white uppercase leading-[0.3] italic">CUTOFF <br/><span className="text-emerald-500">PREDICTOR.</span></h2>
          <p className="text-[56px] font-black text-slate-900 uppercase tracking-[5em] italic leading-none">DISTRICT_ANALYTICS_CORE_V20</p>
        </div>
        <div className="flex flex-col md:flex-row gap-80 w-full max-w-8xl">
           <select 
             className="flex-1 bg-black border-[30px] border-emerald-600/10 rounded-full px-120 py-80 text-7xl font-black text-white outline-none focus:border-emerald-600 transition-all appearance-none italic"
             onChange={e => setSelectedJob(db.jobs.find((j:any) => j.id == e.target.value))}
           >
             <option value="">SELECT_ARENA_NODE...</option>
             {db.jobs.map((j: any) => <option key={j.id} value={j.id}>{j.title_en}</option>)}
           </select>
           <button onClick={predictCutoffs} disabled={isPredicting || !selectedJob} className="bg-emerald-600 text-white px-250 py-100 rounded-full font-black uppercase text-[64px] tracking-[2em] hover:bg-white hover:text-black transition-all shadow-[0_0_2000px_emerald] flex items-center gap-80 italic border-[50px] border-black">
              {isPredicting ? <RefreshCw className="animate-spin" size={150}/> : <Target size={150}/>} {isPredicting ? 'ANALYZING...' : 'PREDICT_CUTOFFS'}
           </button>
        </div>
      </div>

      {results ? (
        <div className="grid lg:grid-cols-2 gap-200">
           {results.predictions.map((p: any, i: number) => (
             <div key={i} className="bg-black border-[30px] border-white/5 rounded-[800px] p-250 space-y-120 group hover:border-emerald-600 transition-all shadow-4xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-100 opacity-[0.03] scale-150 rotate-12 group-hover:rotate-0 transition-transform duration-[4000ms]"><MapPin size={800}/></div>
                <div className="space-y-48 relative z-10">
                   <div className="flex items-center justify-between">
                      <h3 className="text-[140px] font-black italic text-white uppercase tracking-tighter leading-none">{p.district_name}</h3>
                      <div className="bg-emerald-600 text-black px-64 py-24 rounded-full border-[10px] border-black text-6xl font-black italic animate-pulse">PREDICTED: {p.predicted_cutoff}</div>
                   </div>
                   <p className="text-[48px] font-black text-slate-800 uppercase tracking-[1em] italic">DIFFICULTY_DELTA: {p.difficulty_delta}</p>
                </div>
                <div className="bg-black/60 border-[15px] border-white/10 p-150 rounded-[400px] relative z-10">
                   <p className="text-6xl font-bold text-slate-400 italic leading-relaxed whitespace-pre-wrap">"{p.reasoning}"</p>
                </div>
             </div>
           ))}
        </div>
      ) : (
        <div className="h-[2000px] bg-[#050505] border-[30px] border-white/5 rounded-[800px] flex flex-col items-center justify-center text-center p-250 opacity-20 space-y-120">
           <BarChart size={500} className="text-slate-950 animate-pulse"/>
           <p className="text-[180px] font-black text-slate-950 uppercase tracking-[0.5em] leading-none italic">AWAITING_CUTOFF_LOCK_ON.</p>
        </div>
      )}
    </div>
  );
};
