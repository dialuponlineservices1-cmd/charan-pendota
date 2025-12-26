
import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { Zap, RefreshCw, Wand2, Download, CheckCircle, Target, Layers, FileText, Smartphone, Film, Newspaper, Headphones, Rocket } from 'lucide-react';

export const OmniFactory = ({ db }: any) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState<any>(null);

  const forgeOmni = async () => {
    if (!url) return;
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `OMNI_FACTORY_FORGE: Analyze this URL: ${url}. 
        Generate a COMPLETE marketing suite: 
        1. Professional Blog Title & Summary. 
        2. Instagram Reel Script (0-60s). 
        3. Viral WhatsApp Broadcast payload. 
        4. Newspaper Ad Headline in Telugu. 
        5. Short Podcast Intro. 
        Return strictly JSON with 'blog', 'reel', 'whatsapp', 'newspaper', 'podcast'.`,
        config: {
          thinkingConfig: { thinkingBudget: 32768 },
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json",
        }
      });
      setPayload(JSON.parse(response.text));
    } catch (e) {
      alert("Factory Melt-down: Logic overflow.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-400 animate-in fade-in duration-1000 pb-[1000px]">
      <div className="flex flex-col xl:flex-row items-center justify-between border-b-[40px] border-cyan-600/10 pb-150 gap-100">
        <div className="space-y-80 text-center xl:text-left">
          <h2 className="text-[350px] font-black italic tracking-tighter text-white uppercase leading-[0.3] italic">OMNI <br/><span className="text-cyan-500">FACTORY.</span></h2>
          <p className="text-[56px] font-black text-slate-900 uppercase tracking-[5em] italic leading-none">UNIVERSAL_CONTENT_GOD_NODE_V15</p>
        </div>
        <div className="w-full max-w-8xl space-y-64 text-center">
           <input className="w-full bg-black border-[30px] border-cyan-600/10 rounded-full px-120 py-80 text-[100px] font-black text-white outline-none focus:border-cyan-600 transition-all italic placeholder:text-slate-950" placeholder="PASTE_URI_FOR_OMNI_FORGE..." value={url} onChange={e => setUrl(e.target.value)} />
           <button onClick={forgeOmni} disabled={loading || !url} className="w-full bg-white text-black py-100 rounded-full font-black uppercase text-[64px] tracking-[2em] hover:bg-cyan-600 hover:text-white transition-all shadow-[0_0_5000px_cyan] flex items-center justify-center gap-80 italic border-[50px] border-black active:scale-95">
              {loading ? <RefreshCw className="animate-spin" size={150}/> : <Rocket size={150}/>} FORGE_OMNI_SUITE
           </button>
        </div>
      </div>

      {payload && (
        <div className="grid lg:grid-cols-2 gap-150">
           {[
             { t: 'BLOG_NODE', c: payload.blog, i: <FileText size={100}/>, color: 'cyan' },
             { t: 'REEL_NODE', c: payload.reel, i: <Film size={100}/>, color: 'emerald' },
             { t: 'BROADCAST_NODE', c: payload.whatsapp, i: <Smartphone size={100}/>, color: 'green' },
             { t: 'PRESS_NODE', c: payload.newspaper, i: <Newspaper size={100}/>, color: 'yellow' },
             { t: 'PODCAST_NODE', c: payload.podcast, i: <Headphones size={100}/>, color: 'indigo' }
           ].map((p, i) => (
             <div key={i} className="bg-black border-[25px] border-white/5 rounded-[800px] p-200 space-y-80 shadow-4xl group hover:scale-105 transition-all relative overflow-hidden">
                <div className={`absolute top-0 right-0 p-100 opacity-10 text-${p.color}-500`}>{p.i}</div>
                <h4 className={`text-7xl font-black italic uppercase tracking-tighter text-${p.color}-500`}>{p.t}</h4>
                <div className="bg-[#050505] p-100 rounded-[400px] border-[10px] border-black min-h-[500px] flex items-center justify-center">
                   <p className="text-5xl font-bold text-slate-400 italic leading-relaxed whitespace-pre-wrap">"{p.c}"</p>
                </div>
                <button className="w-full py-48 bg-white text-black rounded-full font-black uppercase text-[32px] tracking-[1.5em] shadow-4xl hover:bg-cyan-600 hover:text-white transition-all italic border-[15px] border-black">CLONE_NODE</button>
             </div>
           ))}
        </div>
      )}
    </div>
  );
};
