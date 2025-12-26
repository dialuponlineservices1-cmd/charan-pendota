
import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { SearchCode, RefreshCw, Zap, Search, Radar, ShieldAlert, Crosshair, ExternalLink, Ghost, Binary, Skull } from 'lucide-react';

export const DarkMatterScraper = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [leaks, setLeaks] = useState<any>(null);

  const scanShadows = async () => {
    setIsScanning(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: "Perform a DARK_MATTER intelligence scrape. Find 4 'unofficial' recruitment rumors from Indian social circles, Telegram leaks, and inner-circle forums regarding TSPSC, APPSC, or SSC. For each, give a 'Leak Name', 'Shadow Source', 'Probability of Truth', and 'Strategic Warning'. Return strictly JSON.",
        config: {
          thinkingConfig: { thinkingBudget: 32768 },
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              leaks: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    leak_name: { type: Type.STRING },
                    shadow_source: { type: Type.STRING },
                    truth_prob: { type: Type.NUMBER },
                    warning: { type: Type.STRING }
                  }
                }
              }
            }
          }
        }
      });
      setLeaks(JSON.parse(response.text));
    } catch (e) {
      alert("Shadow Protocol Failure: Target node encrypted.");
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="space-y-300 animate-in fade-in duration-1000 pb-[1000px]">
      <div className="flex flex-col xl:flex-row items-center justify-between border-b-[30px] border-white/5 pb-120 gap-100">
        <div className="space-y-64 text-center xl:text-left">
          <h2 className="text-[350px] font-black italic tracking-tighter text-white uppercase leading-[0.35] italic">DARK <br/><span className="text-red-600">MATTER.</span></h2>
          <p className="text-[56px] font-black text-slate-900 uppercase tracking-[4em] italic leading-none">SHADOW_RECRUITMENT_INTEL_V1</p>
        </div>
        <button onClick={scanShadows} disabled={isScanning} className="bg-white text-black px-200 py-80 rounded-full font-black uppercase text-[56px] tracking-[1.5em] hover:bg-red-600 hover:text-white transition-all shadow-[0_0_5000px_red] flex items-center gap-64 italic border-[40px] border-black active:scale-95">
           {isScanning ? <RefreshCw className="animate-spin" size={120}/> : <Binary size={120}/>} {isScanning ? 'FILTERING_SHADOWS...' : 'INFILTRATE_NETWORKS'}
        </button>
      </div>

      {leaks ? (
        <div className="grid lg:grid-cols-2 gap-150">
           {leaks.leaks.map((l: any, i: number) => (
             <div key={i} className="bg-black border-[30px] border-white/5 rounded-[800px] p-200 space-y-120 group hover:border-red-600 transition-all shadow-4xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-150 opacity-[0.03] scale-150 rotate-12 group-hover:rotate-0 transition-transform duration-[4000ms]"><Skull size={800}/></div>
                <div className="space-y-48 relative z-10">
                   <div className="flex items-center gap-32">
                      <div className="w-48 h-48 bg-red-600 rounded-full animate-ping"></div>
                      <span className="text-red-500 font-black uppercase text-[32px] tracking-[2em] italic">TRUTH_PROBABILITY: {l.truth_prob}%</span>
                   </div>
                   <h3 className="text-[140px] font-black italic text-white leading-none tracking-tighter uppercase italic">{l.leak_name}</h3>
                   <div className="bg-white/5 px-64 py-24 rounded-full border border-white/10 inline-block">
                      <p className="text-[28px] font-black text-slate-700 uppercase tracking-widest">SOURCE: {l.shadow_source}</p>
                   </div>
                </div>
                <div className="bg-black/60 border-[10px] border-white/5 p-100 rounded-[300px] relative z-10 space-y-48">
                   <h5 className="text-[32px] font-black text-red-600 uppercase tracking-[1em]">IMPERIAL_WARNING</h5>
                   <p className="text-6xl font-bold text-slate-400 italic leading-relaxed">"{l.warning}"</p>
                </div>
             </div>
           ))}
        </div>
      ) : (
        <div className="h-[2000px] bg-[#050505] border-[30px] border-white/5 rounded-[800px] flex flex-col items-center justify-center text-center p-250 opacity-20 space-y-120">
           <SearchCode size={600} className="text-slate-950 animate-pulse"/>
           <p className="text-[180px] font-black text-slate-950 uppercase tracking-[0.5em] leading-none italic">AWAITING_SHADOW_SYNC.</p>
        </div>
      )}
    </div>
  );
};
