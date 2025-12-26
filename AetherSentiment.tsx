
import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { Heart, RefreshCw, Zap, Search, Radar, MessageCircle, BarChart3, Flame, TrendingUp } from 'lucide-react';

export const AetherSentiment = ({ db }: any) => {
  const [isScanning, setIsScanning] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [analysis, setAnalysis] = useState<any>(null);

  const scanSentiment = async () => {
    if (!selectedJob) return;
    setIsScanning(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `ANALYZE AETHER SENTIMENT for: ${selectedJob.title_en}. 
        Use Google Search grounding to find student discussions on X (Twitter), Reddit, and Indian news portals. 
        Identify the 'Mood', 'Excitement Level (0-100)', 'Common Complaints', and 'Viral Potential'. 
        Return JSON format.`,
        config: {
          thinkingConfig: { thinkingBudget: 24576 },
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              mood: { type: Type.STRING },
              excitement: { type: Type.NUMBER },
              complaints: { type: Type.ARRAY, items: { type: Type.STRING } },
              viral_potential: { type: Type.STRING },
              summary: { type: Type.STRING }
            }
          }
        }
      });
      setAnalysis(JSON.parse(response.text));
    } catch (e) {
      alert("Aether Signal Lost: Emotional de-sync.");
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="space-y-250 animate-in fade-in duration-1000 pb-[1000px]">
      <div className="flex flex-col xl:flex-row items-center justify-between border-b-[30px] border-white/5 pb-120 gap-100">
        <div className="space-y-64 text-center xl:text-left">
          <h2 className="text-[300px] font-black italic tracking-tighter text-white uppercase leading-[0.35] italic">AETHER <br/><span className="text-red-500">SENTIMENT.</span></h2>
          <p className="text-[48px] font-black text-slate-900 uppercase tracking-[4em] italic leading-none">SENTIENT_PUBLIC_PULSE_TRACKER</p>
        </div>
        <div className="flex flex-col md:flex-row gap-64 w-full max-w-7xl">
           <select 
             className="flex-1 bg-black border-[20px] border-white/10 rounded-full px-100 py-64 text-6xl font-black text-white outline-none focus:border-red-600 transition-all appearance-none italic"
             onChange={e => setSelectedJob(db.jobs.find((j:any) => j.id == e.target.value))}
           >
             <option value="">CHOOSE_NODE_FOR_PULSE...</option>
             {db.jobs.map((j: any) => <option key={j.id} value={j.id}>{j.title_en}</option>)}
           </select>
           <button onClick={scanSentiment} disabled={isScanning || !selectedJob} className="bg-white text-black px-200 py-80 rounded-full font-black uppercase text-[56px] tracking-[1.5em] hover:bg-red-600 hover:text-white transition-all shadow-4xl flex items-center gap-64 italic border-[40px] border-black">
              {isScanning ? <RefreshCw className="animate-spin" size={120}/> : <Heart size={120}/>} {isScanning ? 'SYNCHRONIZING...' : 'SCAN_PULSE'}
           </button>
        </div>
      </div>

      {analysis ? (
        <div className="grid lg:grid-cols-12 gap-150">
           <div className="lg:col-span-4 bg-black border-[25px] border-white/5 rounded-[600px] p-200 space-y-120 text-center shadow-4xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-red-600/5 animate-pulse"></div>
              <Flame size={400} className="text-red-600 mx-auto animate-bounce"/>
              <h3 className="text-9xl font-black italic uppercase text-white tracking-tighter leading-none">EXCITEMENT INDEX</h3>
              <div className="text-[300px] font-black text-white leading-none italic">{analysis.excitement}<span className="text-5xl">%</span></div>
              <p className="text-6xl font-bold text-slate-800 uppercase italic tracking-widest">{analysis.mood}</p>
           </div>

           <div className="lg:col-span-8 space-y-120">
              <div className="bg-[#050505] border-[25px] border-white/5 rounded-[800px] p-200 space-y-80 shadow-4xl relative overflow-hidden group">
                 <h4 className="text-[42px] font-black text-red-500 uppercase tracking-[2em] italic">VIRAL_FORECAST: {analysis.viral_potential}</h4>
                 <div className="prose prose-invert prose-[90px] max-w-none font-bold text-slate-300 italic leading-[1.1] pl-100 border-l-[64px] border-red-600/60 shadow-inner">
                    "{analysis.summary}"
                 </div>
              </div>

              <div className="grid md:grid-cols-2 gap-100">
                 <div className="bg-black border-[15px] border-white/5 rounded-[400px] p-120 space-y-64">
                    <h5 className="text-[32px] font-black text-white uppercase tracking-[1.5em] italic">CONCERNS_DETECTED</h5>
                    <div className="space-y-32">
                       {analysis.complaints.map((c: any, i: number) => (
                         <div key={i} className="flex items-center gap-24 text-[32px] font-bold italic text-slate-500"><MessageCircle size={40} className="text-red-600"/> {c}</div>
                       ))}
                    </div>
                 </div>
                 <div className="bg-white text-black p-120 rounded-[400px] flex items-center justify-center text-center italic shadow-[0_0_1000px_rgba(255,255,255,0.2)]">
                    <p className="text-6xl font-bold uppercase tracking-tighter">"The Aether Sentiment detects high-frequency anxiety nodes regarding eligibility criteria. Suggest updating FAQ immediately."</p>
                 </div>
              </div>
           </div>
        </div>
      ) : (
        <div className="h-[2000px] bg-[#050505] border-[30px] border-white/5 rounded-[800px] flex flex-col items-center justify-center text-center p-250 opacity-20 space-y-120">
           <Heart size={500} className="text-slate-950 animate-pulse"/>
           <p className="text-[180px] font-black text-slate-950 uppercase tracking-[0.5em] leading-none italic">AWAITING_EMOTIONAL_SYNC_PAYLOAD.</p>
        </div>
      )}
    </div>
  );
};
