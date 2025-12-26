
import React, { useState } from 'react';
// Added missing imports for GoogleGenAI and Type
import { GoogleGenAI, Type } from "@google/genai";
import { Landmark, RefreshCw, Zap, Search, TrendingUp, DollarSign, Clock, Target, Crown } from 'lucide-react';

export const MonetizationOracle = ({ db }: any) => {
  const [isConsulting, setIsConsulting] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [oracleReport, setOracleReport] = useState<any>(null);

  const consultOracle = async () => {
    if (!selectedJob) return;
    setIsConsulting(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `MONETIZATION ORACLE analysis for: ${selectedJob.title_en}. 
        Evaluate the "Financial Potential" based on student demand and Ad-Sense CPC in the recruitment niche. 
        Predict: 
        1. Estimated Revenue (INR per 10k views). 
        2. High-Profit Posting Minute (Exact time). 
        3. Best Channel (WhatsApp vs YouTube vs Google Search). 
        Return JSON.`,
        config: {
          thinkingConfig: { thinkingBudget: 32768 },
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              est_revenue: { type: Type.NUMBER },
              best_time: { type: Type.STRING },
              best_channel: { type: Type.STRING },
              cpc_index: { type: Type.NUMBER },
              oracle_wisdom: { type: Type.STRING }
            }
          }
        }
      });
      setOracleReport(JSON.parse(response.text));
    } catch (e) {
      alert("Oracle Clouded: Wealth streams currently invisible.");
    } finally {
      setIsConsulting(false);
    }
  };

  return (
    <div className="space-y-300 animate-in fade-in duration-1000 pb-[1000px]">
      <div className="flex flex-col xl:flex-row items-center justify-between border-b-[40px] border-indigo-600/10 pb-150 gap-100">
        <div className="space-y-80 text-center xl:text-left">
          <h2 className="text-[350px] font-black italic tracking-tighter text-white uppercase leading-[0.3] italic">MONETIZE <br/><span className="text-indigo-500">ORACLE.</span></h2>
          <p className="text-[56px] font-black text-slate-900 uppercase tracking-[5em] italic leading-none">REVENUE_OPTIMIZATION_SYBIL_V1</p>
        </div>
        <div className="flex flex-col md:flex-row gap-80 w-full max-w-8xl">
           <select 
             className="flex-1 bg-black border-[30px] border-indigo-600/10 rounded-full px-120 py-80 text-7xl font-black text-white outline-none focus:border-indigo-600 transition-all appearance-none italic"
             onChange={e => setSelectedJob(db.jobs.find((j:any) => j.id == e.target.value))}
           >
             <option value="">SELECT_WEALTH_NODE...</option>
             {db.jobs.map((j: any) => <option key={j.id} value={j.id}>{j.title_en}</option>)}
           </select>
           <button onClick={consultOracle} disabled={isConsulting || !selectedJob} className="bg-indigo-600 text-white px-250 py-100 rounded-full font-black uppercase text-[64px] tracking-[2em] hover:bg-white hover:text-black transition-all shadow-[0_0_2000px_indigo] flex items-center gap-80 italic border-[50px] border-black">
              {isConsulting ? <RefreshCw className="animate-spin" size={150}/> : <Landmark size={150}/>} {isConsulting ? 'READING_FUTURES...' : 'CONSULT_ORACLE'}
           </button>
        </div>
      </div>

      {oracleReport ? (
        <div className="grid lg:grid-cols-12 gap-200">
           <div className="lg:col-span-4 space-y-150">
              <div className="bg-black border-[30px] border-indigo-600/20 rounded-[800px] p-250 text-center space-y-100 shadow-4xl relative overflow-hidden group">
                 <DollarSign size={400} className="text-indigo-500 mx-auto animate-pulse"/>
                 <h3 className="text-8xl font-black italic uppercase text-white tracking-tighter">EST. YIELD</h3>
                 <div className="text-[250px] font-black text-indigo-500 leading-none italic">₹{oracleReport.est_revenue}<span className="text-5xl text-white">/10K</span></div>
              </div>
              <div className="bg-indigo-600 rounded-[500px] p-150 text-center space-y-80 shadow-4xl relative overflow-hidden group">
                 <Clock size={300} className="text-white mx-auto animate-bounce"/>
                 <h3 className="text-8xl font-black italic uppercase text-white tracking-tighter">GOLDEN MINUTE</h3>
                 <div className="text-[180px] font-black text-white leading-none italic">{oracleReport.best_time}</div>
                 <p className="text-4xl font-bold uppercase tracking-widest text-black">BEST_POST_TIME</p>
              </div>
           </div>

           <div className="lg:col-span-8 space-y-150">
              <div className="bg-[#050505] border-[30px] border-white/5 rounded-[1200px] p-300 space-y-120 shadow-4xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-150 opacity-[0.03] scale-150 rotate-12"><Crown size={800}/></div>
                 <h4 className="text-[48px] font-black text-indigo-500 uppercase tracking-[3em] italic">ORACLE_WISDOM</h4>
                 <div className="prose prose-invert prose-[100px] max-w-none font-bold text-slate-300 italic leading-[1.2] pl-120 border-l-[80px] border-indigo-600 shadow-inner">
                    "{oracleReport.oracle_wisdom}"
                 </div>
              </div>

              <div className="grid md:grid-cols-2 gap-150">
                 <div className="bg-black border-[20px] border-indigo-600/10 rounded-[500px] p-150 space-y-80 flex flex-col items-center justify-center">
                    <h5 className="text-[36px] font-black text-slate-700 uppercase tracking-[2em] italic">CPC_STRENGTH</h5>
                    <div className="text-[200px] font-black text-white leading-none italic">{oracleReport.cpc_index}<span className="text-4xl">/10</span></div>
                 </div>
                 <div className="bg-white text-black p-150 rounded-[500px] flex flex-col items-center justify-center text-center italic shadow-[0_0_2000px_rgba(255,255,255,0.3)]">
                    <p className="text-[32px] font-black uppercase tracking-[1em] mb-32">DOMINANT_CHANNEL</p>
                    <p className="text-9xl font-black uppercase tracking-tighter text-indigo-600">{oracleReport.best_channel}</p>
                 </div>
              </div>
           </div>
        </div>
      ) : (
        <div className="h-[2500px] bg-[#050505] border-[40px] border-white/5 rounded-[1000px] flex flex-col items-center justify-center text-center p-300 opacity-20 space-y-150">
           <Landmark size={600} className="text-slate-950 animate-pulse"/>
           <p className="text-[220px] font-black text-slate-950 uppercase tracking-[0.5em] leading-none italic">AWAITING_FINANCIAL_ORACLE_SYNC.</p>
        </div>
      )}
    </div>
  );
};
