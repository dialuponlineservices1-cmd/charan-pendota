
import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { Wand2, RefreshCw, Zap, Search, FileText, Database, Layers, ArrowRight, ShieldCheck, GraduationCap } from 'lucide-react';

export const GazetteAlchemist = ({ db, updateDB }: any) => {
  const [isAlchemizing, setIsAlchemizing] = useState(false);
  const [rawPayload, setRawPayload] = useState('');
  const [transmutedNode, setTransmutedNode] = useState<any>(null);

  const alchemizeGazette = async () => {
    if (!rawPayload) return;
    setIsAlchemizing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `GAZETTE_TRANSMUTE: Extract all job details from this government notification text: ${rawPayload}. 
        Find: All Qualifications (10th, Degree, B.Tech etc), Salary structure, Eligibility, Age Limits. 
        Write a high-energy Telugu summary. 
        Return strictly JSON with 'title_en', 'title_te', 'org', 'lastDate', 'qualifications', 'tables', 'summary_te'.`,
        config: {
          thinkingConfig: { thinkingBudget: 32768 },
          responseMimeType: "application/json",
        }
      });
      setTransmutedNode(JSON.parse(response.text));
    } catch (e) {
      alert("Alchemy Failure: Data fragmentation.");
    } finally {
      setIsAlchemizing(false);
    }
  };

  const commitToRegistry = () => {
    updateDB((prev: any) => ({ ...prev, jobs: [{ ...transmutedNode, id: Date.now(), thumbnail: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85' }, ...prev.jobs] }));
    setTransmutedNode(null); setRawPayload('');
    alert("NODE CRYSTALLIZED.");
  };

  return (
    <div className="space-y-300 animate-in fade-in duration-1000 pb-[1000px]">
      <div className="flex flex-col xl:flex-row items-center justify-between border-b-[40px] border-emerald-600/10 pb-150 gap-100">
        <div className="space-y-80 text-center xl:text-left">
          <h2 className="text-[350px] font-black italic tracking-tighter text-white uppercase leading-[0.3] italic">GAZETTE <br/><span className="text-emerald-500">ALCHEMIST.</span></h2>
          <p className="text-[56px] font-black text-slate-900 uppercase tracking-[5em] italic leading-none">STRATA_DETECTION_CORE_V1</p>
        </div>
        <div className="w-full max-w-8xl space-y-64">
           <textarea className="w-full bg-black border-[30px] border-emerald-600/10 rounded-[300px] px-120 py-80 text-5xl font-black text-white outline-none focus:border-emerald-600 transition-all h-64 italic" placeholder="PASTE_RAW_GAZETTE_TEXT..." value={rawPayload} onChange={e => setRawPayload(e.target.value)} />
           <button onClick={alchemizeGazette} disabled={isAlchemizing || !rawPayload} className="w-full bg-white text-black py-100 rounded-full font-black uppercase text-[64px] tracking-[2em] hover:bg-emerald-600 hover:text-white transition-all shadow-4xl flex items-center justify-center gap-80 italic border-[50px] border-black">
              {isAlchemizing ? <RefreshCw className="animate-spin" size={150}/> : <Wand2 size={150}/>} TRANSMUTE_DATA
           </button>
        </div>
      </div>

      {transmutedNode && (
        <div className="bg-black border-[35px] border-emerald-600/20 rounded-[1000px] p-300 space-y-150 animate-in slide-in-from-bottom-50 shadow-4xl">
           <div className="space-y-64">
              <span className="text-emerald-500 font-black uppercase text-[42px] tracking-[3em] italic">TRANSMUTATION_SUCCESSFUL</span>
              <h3 className="text-[200px] font-black italic text-white uppercase leading-[0.3]">{transmutedNode.title_en}</h3>
              <div className="flex flex-wrap gap-24 mt-48">
                 {transmutedNode.qualifications?.map((q: string) => (
                   <span key={q} className="bg-emerald-500 text-black px-64 py-16 rounded-full font-black text-4xl uppercase italic"><GraduationCap className="inline mr-4"/> {q}</span>
                 ))}
              </div>
           </div>
           <button onClick={commitToRegistry} className="w-full bg-emerald-600 text-white py-100 rounded-full font-black uppercase text-[64px] tracking-[3em] shadow-4xl hover:bg-white hover:text-black transition-all italic border-[50px] border-black">COMMIT_SUPREME_NODE</button>
        </div>
      )}
    </div>
  );
};
