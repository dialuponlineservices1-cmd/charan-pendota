
import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { Binary, RefreshCw, Zap, Search, Radar, ShieldAlert, Eye, MessageSquareCode } from 'lucide-react';

export const VoidIntel = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [rumors, setRumors] = useState<any>(null);

  const scanVoid = async () => {
    setIsScanning(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: "Analyze recent Indian internet discussions, social media rumors, and news leaks regarding upcoming TSPSC, APPSC, and Central Gov notifications. Identify 4 high-probability 'leaked' or rumored updates that haven't been officially gazetted yet. Return JSON format with name, rumor_source, probability, and intel_summary.",
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
                    name: { type: Type.STRING },
                    rumor_source: { type: Type.STRING },
                    probability: { type: Type.NUMBER },
                    intel_summary: { type: Type.STRING }
                  }
                }
              }
            }
          }
        }
      });
      setRumors(JSON.parse(response.text));
    } catch (e) {
      alert("Void Signal Lost: Quantum de-sync.");
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="space-y-250 animate-in fade-in duration-1000 pb-[1000px]">
      <div className="flex flex-col xl:flex-row items-center justify-between border-b-[30px] border-white/5 pb-120 gap-100">
        <div className="space-y-64 text-center xl:text-left">
          <h2 className="text-[300px] font-black italic tracking-tighter text-white uppercase leading-[0.35] italic">VOID <br/><span className="text-white/10">INTEL.</span></h2>
          <p className="text-[48px] font-black text-slate-900 uppercase tracking-[4em] italic leading-none">DARK_MATTER_RUMOR_TRACKER_V1</p>
        </div>
        <button onClick={scanVoid} disabled={isScanning} className="bg-white text-black px-200 py-80 rounded-full font-black uppercase text-[56px] tracking-[1.5em] hover:bg-red-600 hover:text-white transition-all shadow-4xl flex items-center gap-64 italic border-[40px] border-black active:scale-95">
           {isScanning ? <RefreshCw className="animate-spin" size={120}/> : <Binary size={120}/>} {isScanning ? 'FILTERING_VOID...' : 'SCRAPE_VOID'}
        </button>
      </div>

      {rumors ? (
        <div className="grid lg:grid-cols-2 gap-150">
           {rumors.leaks.map((l: any, i: number) => (
             <div key={i} className="bg-[#050505] border-[25px] border-white/5 rounded-[800px] p-200 space-y-120 group hover:border-red-600 transition-all shadow-4xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-150 opacity-[0.03] scale-150 rotate-12 group-hover:rotate-0 transition-transform duration-[4000ms]"><ShieldAlert size={600}/></div>
                <div className="space-y-48 relative z-10">
                   <div className="flex items-center gap-32">
                      <div className="w-48 h-48 bg-red-600 rounded-full animate-ping"></div>
                      <span className="text-red-500 font-black uppercase text-[32px] tracking-[2em] italic">LEAK_CONFIDENCE: {l.probability}%</span>
                   </div>
                   <h3 className="text-[140px] font-black italic text-white leading-none tracking-tighter uppercase italic">{l.name}</h3>
                   <div className="bg-white/5 px-64 py-24 rounded-full border border-white/10 inline-block">
                      <p className="text-[28px] font-black text-slate-700 uppercase tracking-widest">SOURCE: {l.rumor_source}</p>
                   </div>
                </div>
                <div className="bg-black/60 border-[10px] border-white/5 p-100 rounded-[300px] relative z-10">
                   <p className="text-6xl font-bold text-slate-400 italic leading-relaxed">"{l.intel_summary}"</p>
                </div>
             </div>
           ))}
        </div>
      ) : (
        <div className="h-[2000px] bg-[#050505] border-[30px] border-white/5 rounded-[800px] flex flex-col items-center justify-center text-center p-250 opacity-20 space-y-120">
           <Radar size={500} className="text-slate-950 animate-pulse"/>
           <p className="text-[180px] font-black text-slate-950 uppercase tracking-[0.5em] leading-none italic">AWAITING_VOID_INTEL_SCRAPE.</p>
        </div>
      )}
    </div>
  );
};
