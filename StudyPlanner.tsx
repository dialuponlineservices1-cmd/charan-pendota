
import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { Calendar, Clock, Sparkles, RefreshCw, CheckCircle, Target, List } from 'lucide-react';

export const StudyPlanner = ({ db }: any) => {
  const [examDate, setExamDate] = useState('');
  const [examName, setExamName] = useState('');
  const [plan, setPlan] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const generatePlan = async () => {
    if (!examDate || !examName) return;
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Create a 5-day intensive study schedule for ${examName} with exam on ${examDate}. 
                   Format as JSON array of objects: { day: string, topics: string[], goal: string }.`,
        config: { 
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                day: { type: Type.STRING },
                topics: { type: Type.ARRAY, items: { type: Type.STRING } },
                goal: { type: Type.STRING }
              }
            }
          }
        }
      });
      setPlan(JSON.parse(response.text));
    } catch (e) {
      alert("AI Planner Offline.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-16 animate-in fade-in duration-1000">
      <div className="border-b border-white/5 pb-12 flex justify-between items-end">
        <div>
          <h2 className="text-7xl font-black tracking-tighter uppercase italic">AI <span className="text-indigo-500">PLANNER.</span></h2>
          <p className="text-[10px] font-black uppercase text-slate-500 tracking-[0.6em] mt-3">Dynamic Neural Roadmap Generator</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4 bg-slate-950/40 border border-white/5 rounded-[48px] p-12 space-y-10">
           <h3 className="text-xl font-black italic uppercase tracking-widest text-indigo-500 flex items-center gap-4"><Target/> SETUP PROTOCOL</h3>
           <div className="space-y-6">
              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase text-slate-600">Exam Identifier</label>
                 <input className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white font-bold" value={examName} onChange={e => setExamName(e.target.value)} placeholder="e.g. TSPSC Group 1" />
              </div>
              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase text-slate-600">Target Date</label>
                 <input type="date" className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white font-bold" value={examDate} onChange={e => setExamDate(e.target.value)} />
              </div>
              <button onClick={generatePlan} disabled={loading} className="w-full bg-indigo-600 py-6 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-4 hover:bg-indigo-500 transition-all shadow-3xl">
                 {loading ? <RefreshCw className="animate-spin"/> : <Sparkles size={16}/>} GENERATE ROADMAP
              </button>
           </div>
        </div>

        <div className="lg:col-span-8 space-y-8">
           {plan.length > 0 ? plan.map((p, i) => (
             <div key={i} className="bg-slate-950/40 border border-white/5 rounded-[48px] p-12 hover:border-indigo-500/30 transition-all group">
                <div className="flex justify-between items-start mb-8">
                   <div className="space-y-2">
                      <h4 className="text-4xl font-black text-indigo-500 italic uppercase tracking-tighter">{p.day}</h4>
                      <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Objective: {p.goal}</p>
                   </div>
                   <CheckCircle className="text-slate-800 group-hover:text-emerald-500 transition-all"/>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                   {p.topics.map((t: string, idx: number) => (
                      <div key={idx} className="bg-black/40 border border-white/5 p-5 rounded-2xl flex items-center gap-4">
                         <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                         <span className="text-sm font-bold text-slate-300 italic">{t}</span>
                      </div>
                   ))}
                </div>
             </div>
           )) : (
             <div className="h-full flex flex-col items-center justify-center text-center opacity-20 py-48">
                <Calendar size={120} className="mb-8"/>
                <p className="text-2xl font-black uppercase tracking-widest">Awaiting Parameter Injection</p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};
