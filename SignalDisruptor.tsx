
import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { Smartphone, RefreshCw, Zap, Sparkles, MessageCircle, Send, Share2, Crown, Copy, Ghost } from 'lucide-react';

export const SignalDisruptor = ({ db }: any) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [payload, setPayload] = useState<any>(null);

  const disruptSignals = async () => {
    if (!selectedJob) return;
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `SIGNAL_DISRUPT: Create a viral WhatsApp Broadcast payload for: ${selectedJob.title_en}. 
        Focus on: High-FOMO hook, emoji saturation, and clear "Apply Now" button placeholder. 
        Provide 3 variants: 1. Native (Telugu Mix), 2. Urgent (FOMO-focused), 3. Pro (Clean & Official). 
        Return strictly JSON with 'variants' array of {type, text, disruptScore}.`,
        config: {
          thinkingConfig: { thinkingBudget: 24576 },
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              variants: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    type: { type: Type.STRING },
                    text: { type: Type.STRING },
                    disruptScore: { type: Type.NUMBER }
                  }
                }
              }
            }
          }
        }
      });
      setPayload(JSON.parse(response.text));
    } catch (e) {
      alert("Signal Interference: Transmission blocked.");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("SIGNAL_COPIED_FOR_BROADCAST");
  };

  return (
    <div className="space-y-300 animate-in fade-in duration-1000 pb-[1000px]">
      <div className="flex flex-col xl:flex-row items-center justify-between border-b-[40px] border-yellow-600/10 pb-150 gap-100">
        <div className="space-y-80 text-center xl:text-left">
          <h2 className="text-[350px] font-black italic tracking-tighter text-white uppercase leading-[0.3] italic">SIGNAL <br/><span className="text-yellow-600">DISRUPTOR.</span></h2>
          <p className="text-[56px] font-black text-slate-900 uppercase tracking-[5em] italic leading-none">VIRAL_NETWORK_INJECTION_CORE_V1</p>
        </div>
        <div className="flex flex-col md:flex-row gap-80 w-full max-w-8xl">
           <select 
             className="flex-1 bg-black border-[30px] border-yellow-600/10 rounded-full px-120 py-80 text-7xl font-black text-white outline-none focus:border-yellow-600 transition-all appearance-none italic"
             onChange={e => setSelectedJob(db.jobs.find((j:any) => j.id == e.target.value))}
           >
             <option value="">SELECT_BROADCAST_NODE...</option>
             {db.jobs.map((j: any) => <option key={j.id} value={j.id}>{j.title_en}</option>)}
           </select>
           <button onClick={disruptSignals} disabled={isGenerating || !selectedJob} className="bg-yellow-600 text-black px-250 py-100 rounded-full font-black uppercase text-[64px] tracking-[2em] hover:bg-white hover:text-yellow-600 transition-all shadow-[0_0_2000px_gold] flex items-center gap-80 italic border-[50px] border-black active:scale-95">
              {isGenerating ? <RefreshCw className="animate-spin" size={150}/> : <Smartphone size={150}/>} DISRUPT_SIGNALS
           </button>
        </div>
      </div>

      {payload ? (
        <div className="grid lg:grid-cols-3 gap-200">
           {payload.variants.map((v: any, i: number) => (
              <div key={i} className="bg-black border-[30px] border-white/5 rounded-[800px] p-250 text-center space-y-150 shadow-4xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-100 opacity-5 rotate-12 group-hover:rotate-0 transition-transform duration-[4000ms]"><MessageCircle size={600}/></div>
                 <div className="space-y-48 relative z-10">
                    <span className="text-yellow-600 font-black uppercase text-[42px] tracking-[2em] italic">{v.type}</span>
                    <h3 className="text-8xl font-black italic uppercase text-white tracking-tighter">SCORE: {v.disruptScore}%</h3>
                 </div>
                 <div className="bg-[#050505] p-120 rounded-[400px] border-[15px] border-white/5 min-h-[1200px] flex items-center justify-center relative z-10">
                    <p className="text-5xl font-bold text-slate-400 italic leading-relaxed whitespace-pre-wrap">"{v.text}"</p>
                 </div>
                 <button onClick={() => copyToClipboard(v.text)} className="w-full py-80 bg-white text-black rounded-full font-black uppercase text-[48px] tracking-[1.5em] shadow-4xl italic border-[20px] border-black hover:bg-yellow-600 hover:text-white transition-all relative z-10 flex items-center justify-center gap-32">
                    <Copy size={64}/> INJECT_SIGNAL
                 </button>
              </div>
           ))}
        </div>
      ) : (
        <div className="h-[2500px] bg-[#050505] border-[40px] border-white/5 rounded-[1000px] flex flex-col items-center justify-center text-center p-300 opacity-20 space-y-150">
           <Ghost size={600} className="text-slate-950 animate-pulse"/>
           <p className="text-[220px] font-black text-slate-950 uppercase tracking-[0.5em] leading-none italic">AWAITING_SIGNAL_SYNC.</p>
        </div>
      )}
    </div>
  );
};
