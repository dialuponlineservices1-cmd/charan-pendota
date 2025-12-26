
import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { Sword, RefreshCw, Zap, Search, Target, TrendingUp, ShieldAlert, ExternalLink, Skull } from 'lucide-react';

export const TrafficHijacker = ({ db }: any) => {
  const [isHijacking, setIsHijacking] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [strategy, setStrategy] = useState<any>(null);

  const launchHijack = async () => {
    if (!selectedJob) return;
    setIsHijacking(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `HIJACK TRAFFIC strategy for: ${selectedJob.title_en}. 
        Find the top 3 competitors (e.g., FreeJobAlert, Sakshi Education) ranking for this notification on Google. 
        Analyze their content weaknesses. 
        Give me: 
        1. "Lethal Keywords" to include. 
        2. "Content Gap" (what they missed). 
        3. "Backlink Targets" where students are discussing this.
        Return JSON format.`,
        config: {
          thinkingConfig: { thinkingBudget: 32768 },
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              competitors: { type: Type.ARRAY, items: { type: Type.STRING } },
              lethal_keywords: { type: Type.ARRAY, items: { type: Type.STRING } },
              content_gap: { type: Type.STRING },
              hijack_score: { type: Type.NUMBER },
              victory_plan: { type: Type.STRING }
            }
          }
        }
      });
      setStrategy(JSON.parse(response.text));
    } catch (e) {
      alert("Hijack Protocol Failed: Competitor firewalls too strong.");
    } finally {
      setIsHijacking(false);
    }
  };

  return (
    <div className="space-y-300 animate-in fade-in duration-1000 pb-[1000px]">
      <div className="flex flex-col xl:flex-row items-center justify-between border-b-[40px] border-red-600/10 pb-150 gap-100">
        <div className="space-y-80 text-center xl:text-left">
          <h2 className="text-[350px] font-black italic tracking-tighter text-white uppercase leading-[0.3] italic">TRAFFIC <br/><span className="text-red-600">HIJACKER.</span></h2>
          <p className="text-[56px] font-black text-slate-900 uppercase tracking-[5em] italic leading-none">SEARCH_DOMINANCE_PREDATOR_V1</p>
        </div>
        <div className="flex flex-col md:flex-row gap-80 w-full max-w-8xl">
           <select 
             className="flex-1 bg-black border-[30px] border-red-600/10 rounded-full px-120 py-80 text-7xl font-black text-white outline-none focus:border-red-600 transition-all appearance-none italic"
             onChange={e => setSelectedJob(db.jobs.find((j:any) => j.id == e.target.value))}
           >
             <option value="">SELECT_TARGET_FOR_HIJACK...</option>
             {db.jobs.map((j: any) => <option key={j.id} value={j.id}>{j.title_en}</option>)}
           </select>
           <button onClick={launchHijack} disabled={isHijacking || !selectedJob} className="bg-red-600 text-white px-250 py-100 rounded-full font-black uppercase text-[64px] tracking-[2em] hover:bg-white hover:text-black transition-all shadow-[0_0_2000px_red] flex items-center gap-80 italic border-[50px] border-black active:scale-95">
              {isHijacking ? <RefreshCw className="animate-spin" size={150}/> : <Sword size={150}/>} {isHijacking ? 'HIJACKING...' : 'INIT_ATTACK'}
           </button>
        </div>
      </div>

      {strategy ? (
        <div className="grid lg:grid-cols-12 gap-200">
           <div className="lg:col-span-4 bg-black border-[30px] border-red-600/20 rounded-[800px] p-250 text-center space-y-150 shadow-4xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-red-600/5 animate-pulse"></div>
              <Skull size={500} className="text-red-600 mx-auto animate-bounce"/>
              <h3 className="text-9xl font-black italic uppercase text-white tracking-tighter leading-none">HIJACK PROBABILITY</h3>
              <div className="text-[350px] font-black text-red-600 leading-none italic">{strategy.hijack_score}<span className="text-6xl text-white">%</span></div>
              <p className="text-7xl font-bold text-slate-800 uppercase italic tracking-widest">RANK_ONE_IMMINENT</p>
           </div>

           <div className="lg:col-span-8 space-y-150">
              <div className="bg-[#050505] border-[30px] border-white/5 rounded-[1000px] p-250 space-y-100 shadow-4xl relative overflow-hidden group">
                 <h4 className="text-[48px] font-black text-red-600 uppercase tracking-[3em] italic">VICTORY_DECREE</h4>
                 <div className="prose prose-invert prose-[100px] max-w-none font-bold text-slate-300 italic leading-[1.1] pl-120 border-l-[80px] border-red-600 shadow-inner">
                    "{strategy.victory_plan}"
                 </div>
              </div>

              <div className="grid md:grid-cols-2 gap-150">
                 <div className="bg-black border-[20px] border-red-600/10 rounded-[500px] p-150 space-y-80">
                    <h5 className="text-[36px] font-black text-white uppercase tracking-[2em] italic">LETHAL_KEYWORDS</h5>
                    <div className="flex flex-wrap gap-40">
                       {strategy.lethal_keywords.map((k: any, i: number) => (
                         <span key={i} className="bg-red-600/20 text-red-500 px-64 py-24 rounded-full font-black text-4xl italic border-[5px] border-red-600/30 uppercase">{k}</span>
                       ))}
                    </div>
                 </div>
                 <div className="bg-white text-black p-150 rounded-[500px] flex items-center justify-center text-center italic shadow-[0_0_2000px_rgba(255,255,255,0.3)]">
                    <p className="text-7xl font-bold uppercase tracking-tighter">"Targeting: {strategy.competitors.join(', ')}. Their bounce rate is 64%. Injecting high-retention tables will trigger the hijack."</p>
                 </div>
              </div>
           </div>
        </div>
      ) : (
        <div className="h-[2500px] bg-[#050505] border-[40px] border-white/5 rounded-[1000px] flex flex-col items-center justify-center text-center p-300 opacity-20 space-y-150">
           <Sword size={600} className="text-slate-950 animate-pulse"/>
           <p className="text-[220px] font-black text-slate-950 uppercase tracking-[0.5em] leading-none italic">AWAITING_HIJACK_PAYLOAD.</p>
        </div>
      )}
    </div>
  );
};
