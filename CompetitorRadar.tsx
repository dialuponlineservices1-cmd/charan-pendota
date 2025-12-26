
import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { Satellite, RefreshCw, Zap, Search, Radar, ShieldAlert, ArrowRight, ExternalLink } from 'lucide-react';

export const CompetitorRadar = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [reports, setReports] = useState<any>(null);

  const scanMarket = async () => {
    setIsScanning(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: "Scan top Indian job websites (FreeJobAlert, Sakshi Education, Eenadu Pratibha, Freshersworld) for the LATEST recruitment updates in the last 24 hours. Identify 4 critical notifications that are currently trending on their platforms. Return JSON with 'site_name', 'post_title', 'status' (NEW/TRENDING), and 'link'.",
        config: {
          thinkingConfig: { thinkingBudget: 32768 },
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              findings: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    site_name: { type: Type.STRING },
                    post_title: { type: Type.STRING },
                    status: { type: Type.STRING },
                    link: { type: Type.STRING }
                  }
                }
              }
            }
          }
        }
      });
      setReports(JSON.parse(response.text));
    } catch (e) {
      alert("Radar Interference: Satellite link lost.");
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="space-y-250 animate-in fade-in duration-1000 pb-[1000px]">
      <div className="flex flex-col xl:flex-row items-center justify-between border-b-[30px] border-white/5 pb-120 gap-100">
        <div className="space-y-64 text-center xl:text-left">
          <h2 className="text-[300px] font-black italic tracking-tighter text-white uppercase leading-[0.35] italic">COMPETITOR <br/><span className="text-red-500">RADAR.</span></h2>
          <p className="text-[48px] font-black text-slate-900 uppercase tracking-[4em] italic leading-none">MARKET_GAP_ANALYSIS_V1</p>
        </div>
        <button onClick={scanMarket} disabled={isScanning} className="bg-white text-black px-200 py-80 rounded-full font-black uppercase text-[56px] tracking-[1.5em] hover:bg-red-600 hover:text-white transition-all shadow-4xl flex items-center gap-64 italic border-[40px] border-black active:scale-95">
           {isScanning ? <RefreshCw className="animate-spin" size={120}/> : <Satellite size={120}/>} {isScanning ? 'PINGING_SERVERS...' : 'INIT_MARKET_SCAN'}
        </button>
      </div>

      {reports ? (
        <div className="grid lg:grid-cols-2 gap-150">
           {reports.findings.map((f: any, i: number) => (
             <div key={i} className="bg-[#050505] border-[25px] border-white/5 rounded-[800px] p-200 space-y-120 group hover:border-red-600 transition-all shadow-4xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-150 opacity-[0.03] scale-150 rotate-12 group-hover:rotate-0 transition-transform duration-[5000ms]"><ShieldAlert size={600}/></div>
                <div className="space-y-48 relative z-10">
                   <div className="flex items-center justify-between">
                      <span className="text-red-500 font-black uppercase text-[32px] tracking-[2em] italic">SITE: {f.site_name}</span>
                      <span className={`px-32 py-12 rounded-full font-black text-2xl tracking-widest italic ${f.status === 'NEW' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white animate-pulse'}`}>{f.status}</span>
                   </div>
                   <h3 className="text-[140px] font-black italic text-white leading-none tracking-tighter uppercase italic">{f.post_title}</h3>
                </div>
                <button onClick={() => window.open(f.link, '_blank')} className="w-full py-64 bg-white/5 rounded-full border-[10px] border-white/10 text-slate-500 font-black uppercase text-[42px] tracking-[1em] hover:bg-white hover:text-black transition-all flex items-center justify-center gap-32 italic">
                   VIEW_COMPETITOR_NODE <ExternalLink size={64}/>
                </button>
             </div>
           ))}
        </div>
      ) : (
        <div className="h-[2000px] bg-[#050505] border-[30px] border-white/5 rounded-[800px] flex flex-col items-center justify-center text-center p-250 opacity-20 space-y-120">
           <Radar size={500} className="text-slate-950 animate-pulse"/>
           <p className="text-[180px] font-black text-slate-950 uppercase tracking-[0.5em] leading-none italic">AWAITING_RADAR_TELEMETRY.</p>
        </div>
      )}
    </div>
  );
};
