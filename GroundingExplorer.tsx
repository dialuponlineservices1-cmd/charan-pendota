
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { SearchCode, Globe, CheckCircle, ExternalLink, RefreshCw, Rocket, Target, ShieldCheck } from 'lucide-react';

// Fix: Accepting { db } prop to align with how it is called in index.tsx and avoid TypeScript IntrinsicAttributes error.
export const GroundingExplorer = ({ db }: any) => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState('');
  const [sources, setSources] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleExplore = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Find the absolute latest and verified information for this exam topic: ${query}. Provide a concise fact-sheet for a student.`,
        config: {
          tools: [{ googleSearch: {} }]
        }
      });
      setResult(response.text || '');
      setSources(response.candidates?.[0]?.groundingMetadata?.groundingChunks || []);
    } catch (e) {
      alert("Grounding engine unstable.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row items-end justify-between border-b border-white/5 pb-12 gap-8">
        <div>
          <h2 className="text-8xl font-black tracking-tighter text-white uppercase italic leading-none">FACT <span className="text-indigo-500">ENGINE.</span></h2>
          <p className="text-slate-500 font-black uppercase text-[11px] tracking-[0.7em] mt-4">Verified Current Affairs Grounding Protocol</p>
        </div>
        <div className="flex gap-4">
           <span className="bg-emerald-500/10 border border-emerald-500/20 px-6 py-2 rounded-full text-[10px] font-black text-emerald-500 uppercase flex items-center gap-2 tracking-widest"><ShieldCheck size={14}/> Verified Nodes Only</span>
        </div>
      </div>

      <div className="relative group">
         <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[48px] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
         <div className="relative bg-slate-950 border border-white/10 rounded-[48px] p-10 flex flex-col md:flex-row items-center gap-6">
            <SearchCode className="text-indigo-500 shrink-0" size={48}/>
            <input 
              className="flex-1 bg-transparent text-4xl font-black text-white outline-none placeholder:text-slate-900" 
              placeholder="Topic: Budget 2025 updates..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleExplore()}
            />
            <button onClick={handleExplore} disabled={loading} className="w-full md:w-auto bg-indigo-600 text-white px-16 py-8 rounded-[36px] font-black uppercase tracking-[0.4em] text-sm shadow-3xl hover:bg-indigo-500 transition-all flex items-center justify-center gap-4">
               {loading ? <RefreshCw className="animate-spin"/> : <Rocket size={24}/>} {loading ? "SCANNING..." : "SYNC FACTS"}
            </button>
         </div>
      </div>

      {result && (
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 bg-white/[0.02] border border-white/10 rounded-[64px] p-16 space-y-10 animate-in slide-in-from-bottom-10">
             <div className="flex items-center gap-6 text-indigo-500">
                <Target size={32}/>
                <h3 className="text-3xl font-black italic uppercase tracking-tighter text-white">Verified Intelligence</h3>
             </div>
             <div className="prose prose-invert prose-2xl max-w-none text-slate-300 font-medium leading-relaxed italic whitespace-pre-wrap">
                {result}
             </div>
          </div>
          <div className="lg:col-span-4 space-y-8">
             <h4 className="text-[10px] font-black uppercase text-slate-700 tracking-[0.6em] px-8">Neural Citations</h4>
             <div className="space-y-4">
                {sources.map((s, i) => s.web && (
                   <a key={i} href={s.web.uri} target="_blank" className="block bg-slate-950 border border-white/5 p-8 rounded-[40px] hover:border-indigo-500 group transition-all">
                      <p className="text-xl font-black text-white uppercase italic tracking-tighter group-hover:text-indigo-400 truncate">{s.web.title}</p>
                      <div className="flex items-center justify-between mt-6">
                         <span className="text-[9px] font-black text-slate-700 uppercase tracking-widest">{new URL(s.web.uri).hostname}</span>
                         <ExternalLink size={16} className="text-slate-800 group-hover:text-white"/>
                      </div>
                   </a>
                ))}
             </div>
          </div>
        </div>
      )}
    </div>
  );
};
