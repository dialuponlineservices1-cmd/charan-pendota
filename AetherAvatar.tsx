
import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { Presentation, Play, RefreshCw, Zap, Sparkles, Youtube, Download, Layout, Clock, Radio, UserCheck } from 'lucide-react';

export const AetherAvatar = ({ db }: any) => {
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [presenterNode, setPresenterNode] = useState<any>(null);

  const synthesizeAvatar = async () => {
    if (!selectedJob) return;
    setIsSynthesizing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `AETHER_AVATAR_FORGE: Create an "AI Human Presenter" profile for: ${selectedJob.title_en}. 
        Provide: 
        1. Presenter Persona (Name, Bio, Tone). 
        2. Vertical Video Script (Professional, Clear, Empathetic). 
        3. Visual Directives (What background to use, lighting, attire).
        Return JSON.`,
        config: {
          thinkingConfig: { thinkingBudget: 24576 },
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              presenter: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  tone: { type: Type.STRING },
                  directives: { type: Type.STRING }
                }
              },
              script: { type: Type.STRING },
              lighting: { type: Type.STRING }
            }
          }
        }
      });
      setPresenterNode(JSON.parse(response.text));
    } catch (e) {
      alert("Aether Mesh Overloaded: Spokesperson synthesis failed.");
    } finally {
      setIsSynthesizing(false);
    }
  };

  return (
    <div className="space-y-300 animate-in fade-in duration-1000 pb-[1000px]">
      <div className="flex flex-col xl:flex-row items-center justify-between border-b-[40px] border-emerald-600/10 pb-150 gap-100">
        <div className="space-y-80 text-center xl:text-left">
          <h2 className="text-[350px] font-black italic tracking-tighter text-white uppercase leading-[0.3] italic">AETHER <br/><span className="text-emerald-500">AVATAR.</span></h2>
          <p className="text-[56px] font-black text-slate-900 uppercase tracking-[5em] italic leading-none">SENTIENT_SPOKESPERSON_CORE</p>
        </div>
        <div className="flex flex-col md:flex-row gap-80 w-full max-w-8xl">
           <select 
             className="flex-1 bg-black border-[30px] border-emerald-600/10 rounded-full px-120 py-80 text-7xl font-black text-white outline-none focus:border-emerald-600 transition-all appearance-none italic"
             onChange={e => setSelectedJob(db.jobs.find((j:any) => j.id == e.target.value))}
           >
             <option value="">SELECT_NEWS_NODE...</option>
             {db.jobs.map((j: any) => <option key={j.id} value={j.id}>{j.title_en}</option>)}
           </select>
           <button onClick={synthesizeAvatar} disabled={isSynthesizing || !selectedJob} className="bg-emerald-600 text-white px-250 py-100 rounded-full font-black uppercase text-[64px] tracking-[2em] hover:bg-white hover:text-black transition-all shadow-[0_0_2000px_emerald] flex items-center gap-80 italic border-[50px] border-black">
              {isSynthesizing ? <RefreshCw className="animate-spin" size={150}/> : <Presentation size={150}/>} {isSynthesizing ? 'RENDERING...' : 'FORGE_AVATAR'}
           </button>
        </div>
      </div>

      {presenterNode && (
        <div className="grid lg:grid-cols-12 gap-200">
           <div className="lg:col-span-4 space-y-120">
              <div className="bg-black border-[30px] border-emerald-600/20 rounded-[800px] p-250 text-center space-y-120 shadow-4xl relative overflow-hidden group">
                 <div className="w-500 h-500 rounded-full bg-slate-900 mx-auto flex items-center justify-center border-[20px] border-black shadow-[0_0_500px_emerald] relative overflow-hidden">
                    <UserCheck size={300} className="text-emerald-500 animate-pulse"/>
                 </div>
                 <div className="space-y-48">
                    <h3 className="text-9xl font-black italic uppercase text-white tracking-tighter">{presenterNode.presenter.name}</h3>
                    <p className="text-5xl font-black text-emerald-500 uppercase tracking-widest">TONE: {presenterNode.presenter.tone}</p>
                 </div>
                 <div className="bg-[#050505] p-80 rounded-[300px] border-[10px] border-white/5">
                    <p className="text-4xl font-bold text-slate-500 italic">"Lighting: {presenterNode.lighting}"</p>
                 </div>
              </div>
           </div>

           <div className="lg:col-span-8 space-y-150">
              <div className="bg-[#050505] border-[30px] border-white/5 rounded-[1000px] p-250 space-y-100 shadow-4xl relative overflow-hidden">
                 <h4 className="text-[48px] font-black text-emerald-500 uppercase tracking-[3em] italic">TELEPROMPTER_FEED</h4>
                 <div className="prose prose-invert prose-[100px] max-w-none font-bold text-slate-300 italic leading-[1.2] pl-120 border-l-[80px] border-emerald-600 shadow-inner whitespace-pre-wrap">
                    "{presenterNode.script}"
                 </div>
              </div>
              <button className="w-full py-100 bg-white text-black rounded-full font-black uppercase text-[84px] tracking-[1.5em] shadow-4xl italic border-[50px] border-black hover:bg-emerald-600 hover:text-white transition-all">GENERATE_VEO_VIDEO</button>
           </div>
        </div>
      )}
    </div>
  );
};
