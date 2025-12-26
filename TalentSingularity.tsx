
import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { UserPlus, RefreshCw, Zap, Sparkles, Target, FileText, ShieldCheck, ArrowRight, UserCircle, Rocket } from 'lucide-react';

export const TalentSingularity = ({ db }: any) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [rawCV, setRawCV] = useState('');
  const [report, setReport] = useState<any>(null);

  const analyzeTalent = async () => {
    if (!selectedJob || !rawCV) return;
    setIsAnalyzing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `TALENT_SINGULARITY: Compare this Candidate CV: ${rawCV} against this Job Notification: ${selectedJob.title_en}. 
        Find: 1. Compatibility Score (0-100). 2. Key Missing Keywords. 3. Top 3 "Power Sentences" to add to CV to pass ATS. 
        Return strictly JSON with 'score', 'missing_keywords', 'power_sentences', 'summary'.`,
        config: {
          thinkingConfig: { thinkingBudget: 32768 },
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.NUMBER },
              missing_keywords: { type: Type.ARRAY, items: { type: Type.STRING } },
              power_sentences: { type: Type.ARRAY, items: { type: Type.STRING } },
              summary: { type: Type.STRING }
            }
          }
        }
      });
      setReport(JSON.parse(response.text));
    } catch (e) {
      alert("Neural talent sync failed.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-300 animate-in fade-in duration-1000 pb-[1000px]">
      <div className="flex flex-col xl:flex-row items-center justify-between border-b-[40px] border-emerald-600/10 pb-150 gap-100">
        <div className="space-y-80 text-center xl:text-left">
          <h2 className="text-[350px] font-black italic tracking-tighter text-white uppercase leading-[0.3] italic">TALENT <br/><span className="text-emerald-500">SINGULARITY.</span></h2>
          <p className="text-[56px] font-black text-slate-900 uppercase tracking-[4em] italic leading-none">CV_NOTIFICATION_MATCH_ENGINE_V13</p>
        </div>
        <div className="w-full max-w-8xl space-y-64">
           <select 
             className="w-full bg-black border-[30px] border-emerald-600/10 rounded-full px-120 py-80 text-7xl font-black text-white outline-none focus:border-emerald-600 transition-all appearance-none italic"
             onChange={e => setSelectedJob(db.jobs.find((j:any) => j.id == e.target.value))}
           >
             <option value="">SELECT_TARGET_NODE...</option>
             {db.jobs.map((j: any) => <option key={j.id} value={j.id}>{j.title_en}</option>)}
           </select>
           <textarea className="w-full bg-black border-[30px] border-emerald-600/10 rounded-[300px] px-120 py-80 text-5xl font-black text-white outline-none focus:border-emerald-600 transition-all h-[800px] italic" placeholder="PASTE_CANDIDATE_CV_TEXT..." value={rawCV} onChange={e => setRawCV(e.target.value)} />
           <button onClick={analyzeTalent} disabled={isAnalyzing || !rawCV || !selectedJob} className="w-full bg-white text-black py-100 rounded-full font-black uppercase text-[64px] tracking-[2em] hover:bg-emerald-600 hover:text-white transition-all shadow-4xl flex items-center justify-center gap-80 italic border-[50px] border-black">
              {isAnalyzing ? <RefreshCw className="animate-spin" size={150}/> : <Rocket size={150}/>} RUN_SINGULARITY
           </button>
        </div>
      </div>

      {report && (
        <div className="grid lg:grid-cols-12 gap-200">
           <div className="lg:col-span-4">
              <div className="bg-black border-[35px] border-emerald-600/20 rounded-[1000px] p-300 text-center space-y-150 shadow-4xl relative overflow-hidden group">
                 <div className="absolute inset-0 bg-emerald-600/5 animate-pulse"></div>
                 <Target size={400} className="text-emerald-500 mx-auto animate-bounce"/>
                 <h3 className="text-[100px] font-black italic uppercase text-white tracking-tighter">MATCH SCORE</h3>
                 <div className="text-[350px] font-black text-emerald-500 leading-none italic">{report.score}<span className="text-6xl text-white">%</span></div>
                 <p className="text-6xl font-bold text-slate-800 uppercase italic tracking-widest leading-none">ATS_COMPATIBILITY</p>
              </div>
           </div>

           <div className="lg:col-span-8 space-y-150">
              <div className="bg-[#050505] border-[30px] border-white/5 rounded-[1000px] p-250 space-y-100 shadow-4xl relative overflow-hidden">
                 <h4 className="text-[48px] font-black text-emerald-500 uppercase tracking-[3em] italic">POWER_INJECTIONS</h4>
                 <div className="space-y-64">
                    {report.power_sentences.map((s: string, i: number) => (
                      <div key={i} className="prose prose-invert prose-[100px] max-w-none font-bold text-slate-300 italic leading-[1.2] pl-120 border-l-[80px] border-emerald-600 shadow-inner">
                         "{s}"
                      </div>
                    ))}
                 </div>
              </div>

              <div className="grid md:grid-cols-2 gap-150">
                 <div className="bg-black border-[20px] border-emerald-600/10 rounded-[500px] p-150 space-y-80">
                    <h5 className="text-[36px] font-black text-white uppercase tracking-[2em] italic">MISSING_KEYWORDS</h5>
                    <div className="flex flex-wrap gap-40">
                       {report.missing_keywords.map((k: string, i: number) => (
                         <span key={i} className="bg-emerald-600/20 text-emerald-500 px-64 py-24 rounded-full font-black text-4xl italic border-[5px] border-emerald-600/30 uppercase">{k}</span>
                       ))}
                    </div>
                 </div>
                 <div className="bg-white text-black p-150 rounded-[500px] flex items-center justify-center text-center italic shadow-4xl">
                    <p className="text-6xl font-bold uppercase tracking-tighter">"{report.summary}"</p>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};
