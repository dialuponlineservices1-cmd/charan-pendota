
import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { Landmark, RefreshCw, Zap, Search, TrendingUp, DollarSign, Clock, Target, Crown, Ghost, ShieldAlert } from 'lucide-react';

export const ImperialOracle = () => {
  const [isConsulting, setIsConsulting] = useState(false);
  const [forecast, setForecast] = useState<any>(null);

  const consultOracle = async () => {
    setIsConsulting(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `IMPERIAL_ORACLE_ANALYSIS: Analyze the current Indian macro-economic landscape and Telangana/Andhra government budget statements from the last 30 days. 
        Predict the 3 most likely "Mega Notifications" for 2025. 
        Return JSON with: notification_name, predicted_month, probability_score, economic_reasoning, vacancy_projection.`,
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
                    notification_name: { type: Type.STRING },
                    predicted_month: { type: Type.STRING },
                    probability_score: { type: Type.NUMBER },
                    economic_reasoning: { type: Type.STRING },
                    vacancy_projection: { type: Type.NUMBER }
                  }
                }
              }
            }
          }
        }
      });
      setForecast(JSON.parse(response.text));
    } catch (e) {
      alert("Oracle Temporal Drift: Future nodes obscured.");
    } finally {
      setIsConsulting(false);
    }
  };

  return (
    <div className="space-y-300 animate-in fade-in duration-1000 pb-[1000px]">
      <div className="flex flex-col xl:flex-row items-center justify-between border-b-[40px] border-red-600/10 pb-150 gap-100">
        <div className="space-y-80 text-center xl:text-left">
          <h2 className="text-[350px] font-black italic tracking-tighter text-white uppercase leading-[0.3] italic">IMPERIAL <br/><span className="text-red-600">ORACLE.</span></h2>
          <p className="text-[56px] font-black text-slate-900 uppercase tracking-[5em] italic leading-none">MACRO_GOVERNMENT_PREDICTOR_V14</p>
        </div>
        <button onClick={consultOracle} disabled={isConsulting} className="bg-white text-black px-250 py-100 rounded-full font-black uppercase text-[64px] tracking-[2em] hover:bg-red-600 hover:text-white transition-all shadow-[0_0_5000px_red] flex items-center gap-80 italic border-[50px] border-black">
           {isConsulting ? <RefreshCw className="animate-spin" size={150}/> : <Landmark size={150}/>} {isConsulting ? 'READING_FUTURES...' : 'CONSULT_ORACLE'}
        </button>
      </div>

      {forecast ? (
        <div className="grid lg:grid-cols-1 gap-200">
           {forecast.forecasts.map((f: any, i: number) => (
             <div key={i} className="bg-[#050505] border-[30px] border-white/5 rounded-[1200px] p-250 flex flex-col lg:flex-row items-center justify-between gap-120 group hover:border-red-600 transition-all shadow-4xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-150 opacity-[0.03] scale-150 rotate-12 group-hover:rotate-0 transition-transform duration-[5000ms]"><ShieldAlert size={1000}/></div>
                <div className="flex items-center gap-100 relative z-10">
                   <div className="w-400 h-400 rounded-[150px] bg-red-600/10 border-[25px] border-black flex items-center justify-center text-red-600 shadow-4xl">
                      <Clock size={200}/>
                   </div>
                   <div className="space-y-48">
                      <span className="text-red-500 font-black uppercase text-[48px] tracking-[2.5em] italic">PREDICTION_CONFIDENCE: {f.probability_score}%</span>
                      <h3 className="text-[180px] font-black italic text-white leading-none tracking-tighter uppercase italic">{f.notification_name}</h3>
                      <div className="flex gap-48">
                         <span className="bg-white/5 px-64 py-24 rounded-full border border-white/10 text-6xl font-black text-white italic">EXPECTED: {f.predicted_month}</span>
                         <span className="bg-emerald-600 text-black px-64 py-24 rounded-full border-[10px] border-black text-6xl font-black italic">VACANCIES: ~{f.vacancy_projection}</span>
                      </div>
                   </div>
                </div>
                <div className="bg-black/60 border-[15px] border-white/10 p-150 rounded-[400px] relative z-10 max-w-5xl">
                   <h5 className="text-[32px] font-black text-red-600 uppercase tracking-[1em] mb-48">ECONOMIC_DRIVERS</h5>
                   <p className="text-6xl font-bold text-slate-400 italic leading-relaxed">"{f.economic_reasoning}"</p>
                </div>
             </div>
           ))}
        </div>
      ) : (
        <div className="h-[2500px] bg-[#050505] border-[40px] border-white/5 rounded-[1000px] flex flex-col items-center justify-center text-center p-300 opacity-20 space-y-150">
           <Ghost size={600} className="text-slate-950 animate-pulse"/>
           <p className="text-[220px] font-black text-slate-950 uppercase tracking-[0.5em] leading-none italic">AWAITING_TEMPORAL_LOCK_ON.</p>
        </div>
      )}
    </div>
  );
};
