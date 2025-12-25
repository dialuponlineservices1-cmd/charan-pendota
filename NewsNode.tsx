
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Globe, Search, ArrowUpRight, Clock, ShieldCheck, Newspaper } from 'lucide-react';

export const NewsNode = () => {
  const [query, setQuery] = useState('latest government jobs news 2025 India');
  const [results, setResults] = useState<any[]>([]);
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `What is the most recent and verified update regarding: ${query}. Summarize in 3 bullet points.`,
        config: {
          tools: [{ googleSearch: {} }]
        }
      });
      
      setSummary(response.text || '');
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      setResults(chunks);
    } catch (e) {
      alert("Neural Search failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-16 animate-in fade-in duration-700">
      <div className="flex items-end justify-between border-b border-white/5 pb-12">
        <div>
          <h2 className="text-7xl font-black tracking-tighter text-white uppercase">News <span className="text-indigo-500">Node</span></h2>
          <p className="text-[11px] font-black uppercase text-slate-500 tracking-[0.5em] mt-3">Web Grounded Intelligence Registry</p>
        </div>
        <div className="flex gap-4">
          <span className="px-6 py-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2"> Verified Sources Only</span>
        </div>
      </div>

      <div className="bg-slate-950/40 border border-white/5 rounded-[48px] p-12 space-y-12">
        <div className="relative group">
          <input 
            className="w-full bg-black border border-white/10 rounded-[32px] px-12 py-8 text-2xl font-black text-white outline-none focus:border-indigo-600 transition-all placeholder:text-slate-900"
            placeholder="Search live exam updates, news..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={handleSearch} disabled={loading} className="absolute right-8 top-1/2 -translate-y-1/2 bg-indigo-600 text-white p-6 rounded-2xl hover:bg-indigo-500 disabled:opacity-50 transition-all shadow-xl">
            {loading ? <div className="w-8 h-8 border-t-2 border-white rounded-full animate-spin"></div> : <Search size={32}/>}
          </button>
        </div>

        {summary && (
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-7 bg-white/5 rounded-[40px] p-12 space-y-8 animate-in slide-in-from-left-8">
              <h3 className="text-3xl font-black text-white flex items-center gap-4"><Newspaper className="text-indigo-500"/> Neural Summary</h3>
              <div className="prose prose-invert prose-2xl max-w-none text-slate-300 font-medium leading-relaxed whitespace-pre-wrap">
                {summary}
              </div>
            </div>
            <div className="lg:col-span-5 space-y-8">
               <h4 className="text-[10px] font-black uppercase text-slate-600 tracking-[0.4em]">Source Clusters</h4>
               <div className="space-y-4">
                 {results.map((r, i) => r.web && (
                   <a key={i} href={r.web.uri} target="_blank" className="block bg-black border border-white/5 p-8 rounded-[32px] hover:border-indigo-500/50 transition-all group">
                     <div className="flex justify-between items-start">
                        <p className="text-xl font-black text-white group-hover:text-indigo-400 transition-colors line-clamp-1">{r.web.title}</p>
                        <ArrowUpRight size={20} className="text-slate-700 group-hover:text-white transition-all"/>
                     </div>
                     <p className="text-[10px] font-black uppercase text-slate-700 tracking-widest mt-4 line-clamp-1">{r.web.uri}</p>
                   </a>
                 ))}
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
