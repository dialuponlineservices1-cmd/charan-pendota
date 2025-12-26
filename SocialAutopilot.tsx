
import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { Layout, Share2, Rocket, RefreshCw, Zap, Instagram, MessageCircle, Send, Sparkles, Crown, Image as ImageIcon } from 'lucide-react';

export const SocialAutopilot = ({ db }: any) => {
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState<any>(null);

  const synthesizePayload = async () => {
    if (!selectedJob) return;
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `SYNTHESIZE SOCIAL AUTOPILOT for: ${selectedJob.title_en}. 
        Return JSON with "platforms" array containing { name, caption, tags, hookScore }. 
        Platforms: Instagram, X, LinkedIn. Focus on high-retention viral marketing.`,
        config: {
          thinkingConfig: { thinkingBudget: 20000 },
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              platforms: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    caption: { type: Type.STRING },
                    tags: { type: Type.STRING },
                    hookScore: { type: Type.NUMBER }
                  }
                }
              }
            }
          }
        }
      });
      setPayload(JSON.parse(response.text));
    } catch (e) {
      alert("Autopilot Logic Error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-150 animate-in fade-in duration-1000 pb-[1000px]">
      <div className="flex flex-col xl:flex-row items-center justify-between border-b-[20px] border-white/5 pb-100 gap-80">
        <div className="space-y-32 text-center xl:text-left">
          <h2 className="text-[250px] font-black italic tracking-tighter text-white uppercase leading-[0.35] italic">SOCIAL <br/><span className="text-white/30">AUTOPILOT.</span></h2>
          <p className="text-[42px] font-black text-slate-900 uppercase tracking-[4em] italic">OMNI_PLATFORM_MARKETING_SYNTH</p>
        </div>
        <div className="flex flex-col md:flex-row gap-48 w-full max-w-6xl">
           <select 
             className="flex-1 bg-black border-[15px] border-white/10 rounded-full px-80 py-48 text-5xl font-black text-white outline-none focus:border-white transition-all appearance-none italic"
             onChange={e => setSelectedJob(db.jobs.find((j:any) => j.id == e.target.value))}
           >
             <option value="">CHOOSE_MARKETING_NODE...</option>
             {db.jobs.map((j: any) => <option key={j.id} value={j.id}>{j.title_en}</option>)}
           </select>
           <button onClick={synthesizePayload} disabled={loading || !selectedJob} className="bg-white text-black px-120 py-48 rounded-full font-black uppercase text-[42px] tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-4xl flex items-center gap-48 italic border-[20px] border-black">
              {loading ? <RefreshCw className="animate-spin" size={64}/> : <Rocket size={64}/>} {loading ? 'WEAVING...' : 'INIT_AUTOPILOT'}
           </button>
        </div>
      </div>

      {payload ? (
        <div className="grid lg:grid-cols-3 gap-100">
           {payload.platforms.map((p: any, i: number) => (
             <div key={i} className="bg-black border-[15px] border-white/5 rounded-[400px] p-120 space-y-80 shadow-4xl relative overflow-hidden group hover:border-red-600 transition-all">
                <div className="absolute top-0 right-0 p-80 opacity-5 rotate-12 transition-transform duration-1000 group-hover:rotate-0"><Layout size={300}/></div>
                <div className="flex items-center justify-between relative z-10">
                   <h4 className="text-7xl font-black italic text-white uppercase tracking-tighter">{p.name}</h4>
                   <div className="bg-white/5 px-32 py-12 rounded-full border border-white/10 text-emerald-500 font-black text-2xl tracking-widest italic">{p.hookScore}% HOOK</div>
                </div>
                <div className="bg-black/40 border-[8px] border-white/5 p-80 rounded-[200px] space-y-48 relative z-10">
                   <p className="text-5xl font-bold text-slate-400 italic leading-relaxed">"{p.caption}"</p>
                   <p className="text-3xl font-black text-red-600 tracking-widest uppercase">{p.tags}</p>
                </div>
                <button className="w-full bg-white text-black py-40 rounded-full font-black uppercase text-[28px] tracking-[1.5em] shadow-4xl hover:bg-red-600 hover:text-white transition-all italic border-[15px] border-black flex items-center justify-center gap-24">
                   <Send size={48}/> DEPLOY_POST
                </button>
             </div>
           ))}
        </div>
      ) : (
        <div className="h-[1200px] bg-[#050505] border-[25px] border-white/5 rounded-[600px] flex flex-col items-center justify-center text-center p-200 opacity-20 space-y-100">
           <Layout size={400} className="text-slate-950"/>
           <p className="text-[140px] font-black text-slate-950 uppercase tracking-[0.5em] leading-none italic">AWAITING_AUTOPILOT_PAYLOAD.</p>
        </div>
      )}
    </div>
  );
};
