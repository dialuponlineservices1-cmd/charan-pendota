
import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { Timer, RefreshCw, Zap, Sparkles, Target, TrendingUp, Search, Calendar, Crown } from 'lucide-react';

export const ChronoForesight = () => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [prediction, setPrediction] = useState<any>(null);

  const syncTemporalStrata = async () => {
    setIsSyncing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: "Perform a deep temporal analysis of Indian government recruitment patterns (TSPSC, APPSC, UPSC, SSC). Predict the next 3 major notifications likely to be released in the next 60 days. Return structured JSON with name, predicted_date, probability, and reason.",
        config: {
          thinkingConfig: { thinkingBudget: 32768 },
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
                    name: { type: Type.STRING },
                    predicted_date: { type: Type.STRING },
                    probability: { type: Type.NUMBER },
                    reason: { type: Type.STRING }
                  }
                }
              }
            }
          }
        }
      });
      setPrediction(JSON.parse(response.text));
    } catch (e) {
      alert("Temporal Drift Error: Chrono-Bridge disconnected.");
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="space-y-200 animate-in fade-in duration-1000 pb-[1000px]">
      <div className="flex flex-col xl:flex-row items-center justify-between border-b-[25px] border-white/5 pb-100 gap-80">
        <div className="space-y-48 text-center xl:text-left">
          <h2 className="text-[250px] font-black italic tracking-tighter text-white uppercase leading-[0.35] italic">CHRONO <br/><span className="text-white/20">FORESIGHT.</span></h2>
          <p className="text-[42px] font-black text-slate-900 uppercase tracking-[4em] italic">TEMPORAL_PREDICTION_ENGINE_V1</p>
        </div>
        <button onClick={syncTemporalStrata} disabled={isSyncing} className="bg-white text-black px-150 py-64 rounded-full font-black uppercase text-[48px] tracking-[1.5em] hover:bg-red-600 hover:text-white transition-all shadow-4xl flex items-center gap-48 italic border-[30px] border-black active:scale-95">
           {isSyncing ? <RefreshCw className="animate-spin" size={100}/> : <Timer size={100}/>} {isSyncing ? 'SCANNING_TIMELINE...' : 'SYNC_TIMELINE'}
        </button>
      </div>

      {prediction ? (
        <div className="grid lg:grid-cols-1 gap-120">
           {prediction.predictions.map((p: any, i: number) => (
             <div key={i} className="bg-black border-[20px] border-white/5 rounded-[600px] p-150 flex flex-col lg:flex-row items-center justify-between gap-120 group hover:border-red-600 transition-all shadow-4xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-120 opacity-[0.03] scale-150 rotate-12"><Calendar size={500}/></div>
                <div className="flex items-center gap-100 relative z-10">
                   <div className="w-300 h-300 rounded-[150px] bg-red-600/10 border-[20px] border-black flex items-center justify-center text-red-600 shadow-4xl group-hover:rotate-12 transition-all">
                      <Target size={150}/>
                   </div>
                   <div className="space-y-32">
                      <span className="text-red-500 font-black uppercase text-[36px] tracking-[2em] italic">PREDICTION_NODE_{i+1}</span>
                      <h3 className="text-[120px] md:text-[180px] font-black italic text-white leading-none tracking-tighter uppercase italic">{p.name}</h3>
                      <p className="text-[64px] font-black text-slate-800 uppercase tracking-[0.5em] italic leading-none">WINDOW: {p.predicted_date}</p>
                   </div>
                </div>
                <div className="text-right space-y-48 relative z-10 max-w-4xl">
                   <div className="flex items-center justify-end gap-32">
                      <span className="text-[150px] font-black italic text-white">{p.probability}%</span>
                      <p className="text-[32px] font-black text-red-600 uppercase tracking-widest italic leading-tight">PROBABILITY <br/> INDEX</p>
                   </div>
                   <p className="text-5xl font-bold text-slate-500 italic leading-relaxed">"{p.reason}"</p>
                </div>
             </div>
           ))}
        </div>
      ) : (
        <div className="h-[1500px] bg-[#050505] border-[25px] border-white/5 rounded-[600px] flex flex-col items-center justify-center text-center p-200 opacity-20 space-y-100">
           <Timer size={400} className="text-slate-950"/>
           <p className="text-[140px] font-black text-slate-950 uppercase tracking-[0.5em] leading-none italic">AWAITING_TEMPORAL_SYNC_PAYLOAD.</p>
        </div>
      )}
    </div>
  );
};
