
import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { BookOpenCheck, RefreshCw, Zap, Sparkles, Target, Calendar, Crown, ShieldCheck, ListChecks, ArrowRight } from 'lucide-react';

export const SyllabusForge = ({ db }: any) => {
  const [isForging, setIsForging] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [plan, setPlan] = useState<any>(null);

  const forgePlan = async () => {
    if (!selectedJob) return;
    setIsForging(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `SYLLABUS_FORGE: Create a high-intensity 10-day study roadmap for: ${selectedJob.title_en}. 
        Break it down by Day (1-10), Topics to cover, and 'Difficulty Level'. 
        Return strictly JSON with 'plan_name', 'schedule' (array of {day, topic, intensity}).`,
        config: {
          thinkingConfig: { thinkingBudget: 24576 },
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              plan_name: { type: Type.STRING },
              schedule: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    day: { type: Type.NUMBER },
                    topic: { type: Type.STRING },
                    intensity: { type: Type.STRING }
                  }
                }
              }
            }
          }
        }
      });
      setPlan(JSON.parse(response.text));
    } catch (e) {
      alert("Syllabus Synthesis Failed: Neural pathways blocked.");
    } finally {
      setIsForging(false);
    }
  };

  return (
    <div className="space-y-300 animate-in fade-in duration-1000 pb-[1000px]">
      <div className="flex flex-col xl:flex-row items-center justify-between border-b-[40px] border-blue-600/10 pb-150 gap-100">
        <div className="space-y-80 text-center xl:text-left">
          <h2 className="text-[350px] font-black italic tracking-tighter text-white uppercase leading-[0.3] italic">SYLLABUS <br/><span className="text-blue-500">FORGE.</span></h2>
          <p className="text-[56px] font-black text-slate-900 uppercase tracking-[5em] italic leading-none">NEURAL_CURRICULUM_GENERATOR_V1</p>
        </div>
        <div className="flex flex-col md:flex-row gap-80 w-full max-w-8xl">
           <select 
             className="flex-1 bg-black border-[30px] border-blue-600/10 rounded-full px-120 py-80 text-7xl font-black text-white outline-none focus:border-blue-600 transition-all appearance-none italic"
             onChange={e => setSelectedJob(db.jobs.find((j:any) => j.id == e.target.value))}
           >
             <option value="">SELECT_NOTIFICATION...</option>
             {db.jobs.map((j: any) => <option key={j.id} value={j.id}>{j.title_en}</option>)}
           </select>
           <button onClick={forgePlan} disabled={isForging || !selectedJob} className="bg-blue-600 text-white px-250 py-100 rounded-full font-black uppercase text-[64px] tracking-[2em] hover:bg-white hover:text-black transition-all shadow-[0_0_2000px_blue] flex items-center gap-80 italic border-[50px] border-black active:scale-95">
              {isForging ? <RefreshCw className="animate-spin" size={150}/> : <ListChecks size={150}/>} {isForging ? 'MAPPING...' : 'START_MAP'}
           </button>
        </div>
      </div>

      {plan && (
        <div className="grid lg:grid-cols-12 gap-200">
           <div className="lg:col-span-8 space-y-120">
              {plan.schedule.map((s: any, i: number) => (
                 <div key={i} className="bg-black border-[25px] border-white/5 rounded-full p-100 flex items-center justify-between hover:border-blue-500 transition-all group px-200 shadow-4xl">
                    <div className="flex items-center gap-100">
                       <span className="text-[120px] font-black italic text-slate-950 group-hover:text-blue-600 transition-colors leading-none">0{s.day}</span>
                       <div className="space-y-16">
                          <h4 className="text-7xl font-black text-white italic tracking-tighter uppercase leading-none">{s.topic}</h4>
                          <span className={`px-24 py-8 rounded-full font-black text-2xl tracking-widest italic border-[5px] ${s.intensity === 'HIGH' ? 'bg-red-600/20 text-red-500 border-red-600/30' : 'bg-emerald-600/20 text-emerald-500 border-emerald-600/30'}`}>INTENSITY: {s.intensity}</span>
                       </div>
                    </div>
                    <button className="p-80 bg-white/5 rounded-full hover:bg-blue-600 hover:text-white transition-all border-[15px] border-black shadow-4xl"><ArrowRight size={80}/></button>
                 </div>
              ))}
           </div>

           <div className="lg:col-span-4 space-y-150">
              <div className="bg-blue-600 rounded-[800px] p-250 text-center space-y-150 shadow-4xl relative overflow-hidden group">
                 <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
                 <Calendar size={400} className="text-white mx-auto animate-bounce"/>
                 <h3 className="text-9xl font-black italic uppercase text-white tracking-tighter leading-none">ROADMAP READY</h3>
                 <p className="text-5xl font-bold text-black uppercase italic leading-relaxed">"This roadmap has been forged using historical exam patterns for {selectedJob.org}. Claim the advantage."</p>
                 <button className="w-full py-80 bg-black text-white rounded-full font-black uppercase text-[48px] tracking-[1.5em] shadow-4xl italic border-[20px] border-black">EXPORT_PDF_FORGE</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};
