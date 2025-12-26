
import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { Film, Play, RefreshCw, Zap, Sparkles, Instagram, Youtube, Download, Layout, Clock, Radio } from 'lucide-react';

export const ReelForge = ({ db }: any) => {
  const [isForging, setIsForging] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [storyboard, setStoryboard] = useState<any>(null);

  const forgeReel = async () => {
    if (!selectedJob) return;
    setIsForging(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `REEL_FORGE: Create a viral vertical video script for: ${selectedJob.title_en}. 
        Focus on: High retention hook, salary reveal, and urgent CTA. 
        Provide: 
        1. Script (0-60s) with speaker cues. 
        2. Storyboard descriptions for 5 scenes. 
        3. Viral Tags.
        Return strictly JSON with 'script', 'scenes' (array of {desc, time}), and 'tags'.`,
        config: {
          thinkingConfig: { thinkingBudget: 24576 },
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              script: { type: Type.STRING },
              scenes: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    desc: { type: Type.STRING },
                    time: { type: Type.STRING }
                  }
                }
              },
              tags: { type: Type.STRING }
            }
          }
        }
      });
      setStoryboard(JSON.parse(response.text));
    } catch (e) {
      alert("Reel Synthesis Failed: Vision matrix offline.");
    } finally {
      setIsForging(false);
    }
  };

  return (
    <div className="space-y-300 animate-in fade-in duration-1000 pb-[1000px]">
      <div className="flex flex-col xl:flex-row items-center justify-between border-b-[40px] border-emerald-600/10 pb-150 gap-100">
        <div className="space-y-80 text-center xl:text-left">
          <h2 className="text-[350px] font-black italic tracking-tighter text-white uppercase leading-[0.3] italic">REEL <br/><span className="text-emerald-500">FORGE.</span></h2>
          <p className="text-[56px] font-black text-slate-900 uppercase tracking-[5em] italic leading-none">VIRAL_VERTICAL_SYNTHESIS_V1</p>
        </div>
        <div className="flex flex-col md:flex-row gap-80 w-full max-w-8xl">
           <select 
             className="flex-1 bg-black border-[30px] border-emerald-600/10 rounded-full px-120 py-80 text-7xl font-black text-white outline-none focus:border-emerald-600 transition-all appearance-none italic"
             onChange={e => setSelectedJob(db.jobs.find((j:any) => j.id == e.target.value))}
           >
             <option value="">SELECT_VIRAL_NODE...</option>
             {db.jobs.map((j: any) => <option key={j.id} value={j.id}>{j.title_en}</option>)}
           </select>
           <button onClick={forgeReel} disabled={isForging || !selectedJob} className="bg-emerald-600 text-white px-250 py-100 rounded-full font-black uppercase text-[64px] tracking-[2em] hover:bg-white hover:text-black transition-all shadow-[0_0_2000px_emerald] flex items-center gap-80 italic border-[50px] border-black active:scale-95">
              {isForging ? <RefreshCw className="animate-spin" size={150}/> : <Film size={150}/>} {isForging ? 'FORGING...' : 'START_FORGE'}
           </button>
        </div>
      </div>

      {storyboard && (
        <div className="grid lg:grid-cols-12 gap-200">
           <div className="lg:col-span-4 space-y-120">
              <div className="bg-black border-[30px] border-emerald-600/20 rounded-[800px] p-250 text-center space-y-150 shadow-4xl relative overflow-hidden group">
                 <div className="aspect-[9/16] bg-slate-950 rounded-[400px] border-[20px] border-white/5 flex flex-col items-center justify-center p-120 space-y-100 relative overflow-hidden">
                    <Instagram size={400} className="text-emerald-500 opacity-20 absolute top-100 right-100"/>
                    <Play size={300} className="text-white animate-pulse" fill="currentColor"/>
                    <p className="text-4xl font-black text-slate-700 uppercase tracking-widest italic">VISUAL_PREVIEW_NULL</p>
                 </div>
                 <h3 className="text-8xl font-black italic uppercase text-white tracking-tighter">VIRAL_READY</h3>
                 <button className="w-full py-80 bg-white text-black rounded-full font-black uppercase text-[48px] tracking-[1.5em] shadow-4xl italic border-[20px] border-black">GENERATE_AI_VOICE</button>
              </div>
           </div>

           <div className="lg:col-span-8 space-y-150">
              <div className="bg-[#050505] border-[30px] border-white/5 rounded-[1000px] p-250 space-y-100 shadow-4xl relative overflow-hidden">
                 <h4 className="text-[48px] font-black text-emerald-500 uppercase tracking-[3em] italic">FORGED_SCRIPT</h4>
                 <div className="prose prose-invert prose-[100px] max-w-none font-bold text-slate-300 italic leading-[1.2] pl-120 border-l-[80px] border-emerald-600 shadow-inner whitespace-pre-wrap">
                    "{storyboard.script}"
                 </div>
              </div>

              <div className="space-y-100">
                 <h5 className="text-[48px] font-black text-slate-900 uppercase tracking-[2em] italic ml-120">STORYBOARD_NODES</h5>
                 {storyboard.scenes.map((s: any, i: number) => (
                    <div key={i} className="bg-black border-[15px] border-white/5 rounded-full p-100 flex items-center justify-between hover:border-emerald-500 transition-all group px-200">
                       <div className="flex items-center gap-100">
                          <span className="text-8xl font-black italic text-slate-950 group-hover:text-emerald-500 transition-colors">0{i+1}</span>
                          <div className="w-150 h-150 bg-slate-900 rounded-[50px] flex items-center justify-center border-[10px] border-black group-hover:border-white transition-all"><Layout size={64}/></div>
                          <h4 className="text-6xl font-black text-white italic tracking-tighter uppercase">{s.desc}</h4>
                       </div>
                       <div className="flex items-center gap-64">
                          <span className="text-5xl font-black text-slate-800 italic uppercase">{s.time}</span>
                          <Radio size={64} className="text-emerald-600 animate-pulse"/>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      )}
    </div>
  );
};
