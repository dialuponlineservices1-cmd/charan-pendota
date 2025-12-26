
import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { Compass, RefreshCw, Zap, Sparkles, Target, Calendar, Crown, ShieldAlert } from 'lucide-react';

export const ImperialHorizon = ({ db }: any) => {
  const [isScanning, setIsScanning] = useState(false);
  const [forecast, setForecast] = useState<any>(null);

  const scanHorizon = async () => {
    setIsScanning(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: "Perform a DEEP AETHELGARD ANALYSIS on Indian Government recruitment notifications (TSPSC, APPSC, SSC). Based on official gazettes and news grounding, predict the 3 most likely upcoming notifications for the next 90 days. For each, give a 'Prediction Confidence', 'Expected Vacancy Count', and 'AI Sentiment Analysis'. Return strictly JSON.",
        config: {
          thinkingConfig: { thinkingBudget: 32768 },
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              forecasts: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    job_name: { type: Type.STRING },
                    predicted_window: { type: Type.STRING },
                    confidence: { type: Type.NUMBER },
                    vacancy_est: { type: Type.NUMBER },
                    intel_leak: { type: Type.STRING }
                  }
                }
              }
            }
          }
        }
      });
      setForecast(JSON.parse(response.text));
    } catch (e) {
      alert("Horizon De-sync: Quantum particles lost.");
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="space-y-400 animate-in fade-in duration-1000 pb-[1000px]">
      <div className="flex flex-col xl:flex-row items-center justify-between border-b-[60px] border-white/5 pb-200 gap-100">
        <div className="space-y-80 text-center xl:text-left">
          <h2 className="text-[450px] font-black italic tracking-tighter text-white uppercase leading-[0.35] italic">IMPERIAL <br/><span className="text-yellow-500">HORIZON.</span></h2>
          <p className="text-[64px] font-black text-slate-900 uppercase tracking-[8em] italic leading-none">AI_RECRUITMENT_FORESIGHT_ENGINE</p>
        </div>
        <button onClick={scanHorizon} disabled={isScanning} className="bg-white text-black px-300 py-120 rounded-full font-black uppercase text-[84px] tracking-[2.5em] hover:bg-yellow-600 hover:text-white transition-all shadow-[0_0_5000px_gold] flex items-center gap-100 italic border-[60px] border-black">
           {isScanning ? <RefreshCw className="animate-spin" size={200}/> : <Compass size={200}/>} {isScanning ? 'FILTERING_VOIDS...' : 'SYNC_HORIZON'}
        </button>
      </div>

      {forecast ? (
        <div className="grid lg:grid-cols-3 gap-250">
           {forecast.forecasts.map((f: any, i: number) => (
             <div key={i} className="bg-[#050505] border-[40px] border-white/5 rounded-[1500px] p-400 space-y-150 group hover:border-yellow-600 transition-all shadow-4xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-200 opacity-[0.03] scale-150 rotate-12 group-hover:rotate-0 transition-transform duration-[5000ms]"><ShieldAlert size={800}/></div>
                <div className="space-y-64 relative z-10">
                   <div className="flex items-center gap-48">
                      <div className="w-64 h-64 bg-yellow-600 rounded-full animate-ping"></div>
                      <span className="text-yellow-500 font-black uppercase text-[48px] tracking-[2em] italic">CONFIDENCE: {f.confidence}%</span>
                   </div>
                   <h3 className="text-[180px] font-black italic text-white leading-none tracking-tighter uppercase italic">{f.job_name}</h3>
                   <div className="bg-white/5 px-100 py-48 rounded-full border border-white/10 inline-block">
                      <p className="text-[42px] font-black text-slate-700 uppercase tracking-widest">EXPECTED_WINDOW: {f.predicted_window}</p>
                   </div>
                </div>
                <div className="bg-black/60 border-[20px] border-white/5 p-200 rounded-[500px] relative z-10 space-y-48">
                   <div className="flex justify-between items-center border-b border-white/5 pb-32">
                      <span className="text-[32px] font-black text-slate-800 uppercase tracking-widest">VACANCY_EST</span>
                      <span className="text-7xl font-black text-white italic">~{f.vacancy_est}</span>
                   </div>
                   <p className="text-6xl font-bold text-slate-400 italic leading-relaxed">"{f.intel_leak}"</p>
                </div>
             </div>
           ))}
        </div>
      ) : (
        <div className="h-[2500px] bg-[#050505] border-[50px] border-white/5 rounded-[1500px] flex flex-col items-center justify-center text-center p-400 opacity-20 space-y-200">
           <Compass size={800} className="text-slate-950 animate-pulse"/>
           <p className="text-[250px] font-black text-slate-950 uppercase tracking-[0.5em] leading-none italic">AWAITING_HORIZON_PAYLOAD_SYNC.</p>
        </div>
      )}
    </div>
  );
};
