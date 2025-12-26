
import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { Megaphone, RefreshCw, Zap, MessageCircle, Instagram, Globe, Copy, CheckCircle } from 'lucide-react';

export const AdCluster = ({ db }: any) => {
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [adSet, setAdSet] = useState<any>(null);

  const generateAdCluster = async () => {
    if (!selectedJob) return;
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `GENERATE AD CLUSTER for job: ${selectedJob.title_en}. 
        Create: 
        1. Viral Instagram Caption with high-hook emojis.
        2. Professional WhatsApp Broadcast message (Telugu/English mix).
        3. High-CTR Google Ad Headline and Description.
        Return JSON format.`,
        config: {
          thinkingConfig: { thinkingBudget: 24576 },
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              instagram: { type: Type.STRING },
              whatsapp: { type: Type.STRING },
              google: { 
                type: Type.OBJECT,
                properties: {
                  headline: { type: Type.STRING },
                  desc: { type: Type.STRING }
                }
              }
            }
          }
        }
      });
      setAdSet(JSON.parse(response.text));
    } catch (e) {
      alert("Marketing Sync Error: Ad nodes fragmented.");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("AD_NODE_COPIED");
  };

  return (
    <div className="space-y-250 animate-in fade-in duration-1000 pb-[1000px]">
      <div className="flex flex-col xl:flex-row items-center justify-between border-b-[30px] border-white/5 pb-120 gap-100">
        <div className="space-y-64 text-center xl:text-left">
          <h2 className="text-[300px] font-black italic tracking-tighter text-white uppercase leading-[0.35] italic">AD <br/><span className="text-emerald-500">CLUSTER.</span></h2>
          <p className="text-[48px] font-black text-slate-900 uppercase tracking-[4em] italic leading-none">VIRAL_MARKETING_GENERATOR_V1</p>
        </div>
        <div className="flex flex-col md:flex-row gap-64 w-full max-w-7xl">
           <select 
             className="flex-1 bg-black border-[20px] border-white/10 rounded-full px-100 py-64 text-6xl font-black text-white outline-none focus:border-emerald-600 transition-all appearance-none italic"
             onChange={e => setSelectedJob(db.jobs.find((j:any) => j.id == e.target.value))}
           >
             <option value="">CHOOSE_TARGET_JOB...</option>
             {db.jobs.map((j: any) => <option key={j.id} value={j.id}>{j.title_en}</option>)}
           </select>
           <button onClick={generateAdCluster} disabled={isGenerating || !selectedJob} className="bg-white text-black px-200 py-80 rounded-full font-black uppercase text-[56px] tracking-[1.5em] hover:bg-emerald-600 hover:text-white transition-all shadow-4xl flex items-center gap-64 italic border-[40px] border-black active:scale-95">
              {isGenerating ? <RefreshCw className="animate-spin" size={120}/> : <Megaphone size={120}/>} {isGenerating ? 'CLUSTER_SYNCING...' : 'FORGE_CAMPAIGN'}
           </button>
        </div>
      </div>

      {adSet && (
        <div className="grid lg:grid-cols-3 gap-150">
           {/* INSTAGRAM NODE */}
           <div className="bg-black border-[25px] border-white/5 rounded-[400px] p-120 space-y-80 shadow-4xl relative group overflow-hidden">
              <div className="absolute top-0 right-0 p-80 opacity-10 rotate-12 group-hover:rotate-0 transition-transform duration-1000"><Instagram size={300}/></div>
              <h4 className="text-7xl font-black italic text-white uppercase tracking-tighter">INSTAGRAM_HOOK</h4>
              <div className="bg-white/5 p-80 rounded-[200px] border-[10px] border-black min-h-[600px]">
                 <p className="text-5xl font-bold text-slate-400 italic leading-relaxed whitespace-pre-wrap">{adSet.instagram}</p>
              </div>
              <button onClick={() => copyToClipboard(adSet.instagram)} className="w-full py-48 bg-white text-black rounded-full font-black uppercase text-[32px] tracking-[1em] hover:bg-emerald-600 hover:text-white transition-all italic border-[15px] border-black flex items-center justify-center gap-32">
                 <Copy size={48}/> CLONE_NODE
              </button>
           </div>

           {/* WHATSAPP NODE */}
           <div className="bg-black border-[25px] border-white/5 rounded-[400px] p-120 space-y-80 shadow-4xl relative group overflow-hidden">
              <div className="absolute top-0 right-0 p-80 opacity-10 rotate-12 group-hover:rotate-0 transition-transform duration-1000"><MessageCircle size={300}/></div>
              <h4 className="text-7xl font-black italic text-white uppercase tracking-tighter">WHATSAPP_SYNC</h4>
              <div className="bg-white/5 p-80 rounded-[200px] border-[10px] border-black min-h-[600px]">
                 <p className="text-5xl font-bold text-slate-400 italic leading-relaxed whitespace-pre-wrap">{adSet.whatsapp}</p>
              </div>
              <button onClick={() => copyToClipboard(adSet.whatsapp)} className="w-full py-48 bg-white text-black rounded-full font-black uppercase text-[32px] tracking-[1em] hover:bg-emerald-600 hover:text-white transition-all italic border-[15px] border-black flex items-center justify-center gap-32">
                 <Copy size={48}/> CLONE_NODE
              </button>
           </div>

           {/* GOOGLE ADS NODE */}
           <div className="bg-black border-[25px] border-white/5 rounded-[400px] p-120 space-y-80 shadow-4xl relative group overflow-hidden">
              <div className="absolute top-0 right-0 p-80 opacity-10 rotate-12 group-hover:rotate-0 transition-transform duration-1000"><Globe size={300}/></div>
              <h4 className="text-7xl font-black italic text-white uppercase tracking-tighter">GOOGLE_SEARCH_ADS</h4>
              <div className="space-y-48 min-h-[600px]">
                 <div className="bg-white/5 p-64 rounded-[150px] border-[10px] border-black">
                    <p className="text-2xl font-black text-emerald-500 uppercase tracking-widest mb-16">HEADLINE</p>
                    <p className="text-5xl font-black text-white italic">{adSet.google.headline}</p>
                 </div>
                 <div className="bg-white/5 p-64 rounded-[150px] border-[10px] border-black">
                    <p className="text-2xl font-black text-emerald-500 uppercase tracking-widest mb-16">DESCRIPTION</p>
                    <p className="text-5xl font-bold text-slate-400 italic leading-tight">{adSet.google.desc}</p>
                 </div>
              </div>
              <button onClick={() => copyToClipboard(`${adSet.google.headline}\n${adSet.google.desc}`)} className="w-full py-48 bg-white text-black rounded-full font-black uppercase text-[32px] tracking-[1em] hover:bg-emerald-600 hover:text-white transition-all italic border-[15px] border-black flex items-center justify-center gap-32">
                 <Copy size={48}/> CLONE_NODE
              </button>
           </div>
        </div>
      )}
    </div>
  );
};
