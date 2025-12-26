
import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { Globe, RefreshCw, Zap, Search, TrendingUp, ShieldCheck, Target, Rocket } from 'lucide-react';

export const SentientSEO = ({ db, updateDB }: any) => {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [seoPayload, setSeoPayload] = useState<any>(null);

  const optimizeSEO = async () => {
    if (!selectedJob) return;
    setIsOptimizing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `OPTIMIZE SENTIENT SEO for job: ${selectedJob.title_en}. 
        Find current trending search keywords in India for this recruitment. 
        Rewrite the "SEO Title" and "Meta Description" to maximize CTR. 
        Return JSON with "title", "description", "keywords", and "projected_ctr_increase".`,
        config: {
          thinkingConfig: { thinkingBudget: 24576 },
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              keywords: { type: Type.STRING },
              projected_ctr_increase: { type: Type.NUMBER }
            }
          }
        }
      });
      setSeoPayload(JSON.parse(response.text));
    } catch (e) {
      alert("SEO Synthesis Error: Trending data unreachable.");
    } finally {
      setIsOptimizing(false);
    }
  };

  const commitSEO = () => {
    if (!seoPayload || !selectedJob) return;
    updateDB((prev: any) => ({
      ...prev,
      jobs: prev.jobs.map((j: any) => j.id === selectedJob.id ? { ...j, title_en: seoPayload.title, seo: { ...j.seo, description: seoPayload.description, keywords: seoPayload.keywords } } : j)
    }));
    alert("SENTIENT SEO COMMITTED. Search visibility increasing...");
    setSeoPayload(null);
  };

  return (
    <div className="space-y-250 animate-in fade-in duration-1000 pb-[1000px]">
      <div className="flex flex-col xl:flex-row items-center justify-between border-b-[30px] border-white/5 pb-120 gap-100">
        <div className="space-y-64 text-center xl:text-left">
          <h2 className="text-[300px] font-black italic tracking-tighter text-white uppercase leading-[0.35] italic">SENTIENT <br/><span className="text-emerald-500">SEO.</span></h2>
          <p className="text-[48px] font-black text-slate-900 uppercase tracking-[4em] italic leading-none">REAL_TIME_SEARCH_RANK_OPTIMIZER</p>
        </div>
        <div className="flex flex-col md:flex-row gap-64 w-full max-w-7xl">
           <select 
             className="flex-1 bg-black border-[20px] border-white/10 rounded-full px-100 py-64 text-6xl font-black text-white outline-none focus:border-white transition-all appearance-none italic"
             onChange={e => setSelectedJob(db.jobs.find((j:any) => j.id == e.target.value))}
           >
             <option value="">CHOOSE_SEARCH_NODE...</option>
             {db.jobs.map((j: any) => <option key={j.id} value={j.id}>{j.title_en}</option>)}
           </select>
           <button onClick={optimizeSEO} disabled={isOptimizing || !selectedJob} className="bg-white text-black px-200 py-80 rounded-full font-black uppercase text-[56px] tracking-[1.5em] hover:bg-emerald-600 hover:text-white transition-all shadow-4xl flex items-center gap-64 italic border-[40px] border-black">
              {isOptimizing ? <RefreshCw className="animate-spin" size={120}/> : <Target size={120}/>} {isOptimizing ? 'SYNTHESIZING...' : 'ANALYZE_TRENDS'}
           </button>
        </div>
      </div>

      {seoPayload ? (
        <div className="grid lg:grid-cols-12 gap-150">
           <div className="lg:col-span-8 bg-black border-[25px] border-white/5 rounded-[600px] p-200 space-y-120 shadow-4xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-150 opacity-[0.05] scale-150 rotate-12 transition-transform duration-1000 group-hover:rotate-0"><Globe size={600}/></div>
              <div className="space-y-48 relative z-10">
                 <h4 className="text-8xl font-black italic text-emerald-500 uppercase tracking-tighter">OPTIMIZED TITLE</h4>
                 <p className="text-[120px] font-black text-white italic leading-none tracking-tighter uppercase">{seoPayload.title}</p>
                 
                 <h4 className="text-8xl font-black italic text-emerald-500 uppercase tracking-tighter pt-80">META DESCRIPTION</h4>
                 <p className="text-5xl font-bold text-slate-400 italic leading-relaxed">"{seoPayload.description}"</p>
                 
                 <h4 className="text-8xl font-black italic text-emerald-500 uppercase tracking-tighter pt-80">TRENDING KEYWORDS</h4>
                 <p className="text-4xl font-black text-white tracking-[0.5em] uppercase">{seoPayload.keywords}</p>
              </div>
           </div>

           <div className="lg:col-span-4 space-y-120">
              <div className="bg-emerald-600 rounded-[500px] p-150 text-center space-y-80 shadow-4xl relative overflow-hidden group">
                 <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
                 <TrendingUp size={300} className="text-white mx-auto animate-bounce"/>
                 <h3 className="text-8xl font-black italic uppercase text-white tracking-tighter leading-none">CTR BOOST</h3>
                 <div className="text-[250px] font-black text-white leading-none italic">+{seoPayload.projected_ctr_increase}<span className="text-5xl">%</span></div>
                 <button onClick={commitSEO} className="w-full bg-white text-black py-64 rounded-full font-black uppercase text-[42px] tracking-[1.5em] shadow-4xl hover:bg-black hover:text-white transition-all italic border-[25px] border-black">
                    COMMIT_SEO_FORGE
                 </button>
              </div>
           </div>
        </div>
      ) : (
        <div className="h-[2000px] bg-[#050505] border-[30px] border-white/5 rounded-[800px] flex flex-col items-center justify-center text-center p-250 opacity-20 space-y-120">
           <Globe size={500} className="text-slate-950 animate-pulse"/>
           <p className="text-[180px] font-black text-slate-950 uppercase tracking-[0.5em] leading-none italic">AWAITING_SENTIENT_SEO_PAYLOAD.</p>
        </div>
      )}
    </div>
  );
};
