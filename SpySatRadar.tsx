
import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { Satellite, RefreshCw, Zap, Search, Radar, ShieldAlert, Crosshair, ExternalLink, Skull } from 'lucide-react';

export const SpySatRadar = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [findings, setFindings] = useState<any>(null);

  const scanMarket = async () => {
    setIsScanning(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `SPY_SAT_SCAN: Analyze Sakshi Education, Eenadu Pratibha, and FreeJobAlert for recruitment updates released in the last 12 hours. 
        Identify 3 notifications that StudentDialup MUST counter-post. 
        Find the 'Weak Point' of their posts (e.g., missing Telugu summary, no direct links, slow loading). 
        Return JSON with site_name, notification_title, link, and tactical_weakness.`,
        config: {
          thinkingConfig: { thinkingBudget: 32768 },
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              scans: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    site_name: { type: Type.STRING },
                    notification_title: { type: Type.STRING },
                    link: { type: Type.STRING },
                    tactical_weakness: { type: Type.STRING }
                  }
                }
              }
            }
          }
        }
      });
      setFindings(JSON.parse(response.text));
    } catch (e) {
      alert("Satellite Link Jammed: Competitor stealth active.");
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="space-y-250 animate-in fade-in duration-1000 pb-[1000px]">
      <div className="flex flex-col xl:flex-row items-center justify-between border-b-[30px] border-white/5 pb-120 gap-100">
        <div className="space-y-64 text-center xl:text-left">
          <h2 className="text-[300px] font-black italic tracking-tighter text-white uppercase leading-[0.35] italic">SPY-SAT <br/><span className="text-red-600">RADAR.</span></h2>
          <p className="text-[48px] font-black text-slate-900 uppercase tracking-[4em] italic leading-none">COMPETITOR_GAP_ANALYSIS_MARK_V</p>
        </div>
        <button onClick={scanMarket} disabled={isScanning} className="bg-white text-black px-200 py-80 rounded-full font-black uppercase text-[56px] tracking-[1.5em] hover:bg-red-600 hover:text-white transition-all shadow-4xl flex items-center gap-64 italic border-[40px] border-black active:scale-95">
           {isScanning ? <RefreshCw className="animate-spin" size={120}/> : <Satellite size={120}/>} {isScanning ? 'PINGING_SAT...' : 'INIT_SCAN'}
        </button>
      </div>

      {findings ? (
        <div className="grid lg:grid-cols-3 gap-150">
           {findings.scans.map((s: any, i: number) => (
             <div key={i} className="bg-[#050505] border-[25px] border-white/5 rounded-[800px] p-200 space-y-120 group hover:border-red-600 transition-all shadow-4xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-150 opacity-[0.03] scale-150 rotate-12 group-hover:rotate-0 transition-transform duration-[4000ms]"><Skull size={600}/></div>
                <div className="space-y-48 relative z-10">
                   <div className="flex items-center justify-between">
                      <span className="text-red-500 font-black uppercase text-[32px] tracking-[2em] italic">SITE: {s.site_name}</span>
                      <div className="w-12 h-12 bg-red-600 rounded-full animate-ping"></div>
                   </div>
                   <h3 className="text-[120px] font-black italic text-white leading-none tracking-tighter uppercase italic line-clamp-3">{s.notification_title}</h3>
                </div>
                <div className="bg-black/60 border-[10px] border-red-600/20 p-100 rounded-[300px] relative z-10 space-y-32">
                   <h5 className="text-4xl font-black text-red-600 uppercase tracking-widest flex items-center gap-16"><Crosshair size={32}/> TACTICAL_WEAKNESS</h5>
                   <p className="text-5xl font-bold text-slate-400 italic leading-relaxed">"{s.tactical_weakness}"</p>
                </div>
                <button onClick={() => window.open(s.link, '_blank')} className="w-full py-64 bg-white/5 rounded-full border-[10px] border-white/10 text-slate-500 font-black uppercase text-[42px] tracking-[1em] hover:bg-white hover:text-black transition-all flex items-center justify-center gap-32 italic">
                   INFILTRATE_NODE <ExternalLink size={64}/>
                </button>
             </div>
           ))}
        </div>
      ) : (
        <div className="h-[2000px] bg-[#050505] border-[30px] border-white/5 rounded-[800px] flex flex-col items-center justify-center text-center p-250 opacity-20 space-y-120">
           <Radar size={500} className="text-slate-950 animate-pulse"/>
           <p className="text-[180px] font-black text-slate-950 uppercase tracking-[0.5em] leading-none italic">AWAITING_RADAR_LOCK_ON.</p>
        </div>
      )}
    </div>
  );
};
