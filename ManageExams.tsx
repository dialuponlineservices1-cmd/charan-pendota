
import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { 
  BrainCircuit, Rocket, Sparkles, Terminal, RefreshCw, Plus, 
  Trash2, Edit3, X, Save, Search, Target, Timer, Award, ShieldCheck
} from 'lucide-react';

export const ManageExams = ({ db, updateDB }: any) => {
  const [urlInput, setUrlInput] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [editForm, setEditForm] = useState<any>(null);

  const handleNeuralPaperFetch = async () => {
    if (!urlInput) return;
    setIsAiLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `SCRAPE/GENERATE EXAM DATA from: ${urlInput}. 
      Create a highly advanced mock test with 5 high-quality questions. 
      Return ONLY strictly JSON format.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: { 
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              duration: { type: Type.INTEGER },
              totalMarks: { type: Type.INTEGER },
              category: { type: Type.STRING },
              questions: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    q: { type: Type.STRING },
                    options: { type: Type.ARRAY, items: { type: Type.STRING } },
                    correct: { type: Type.INTEGER },
                    explanation: { type: Type.STRING }
                  }
                }
              }
            }
          }
        }
      });
      
      const res = JSON.parse(response.text);
      setEditForm({ ...res, id: `e_${Date.now()}` });
      setIsAdding(true);
      setUrlInput('');
    } catch (e) {
      alert("Neural Bridge failure. Manual entry required.");
    } finally {
      setIsAiLoading(false);
    }
  };

  const commitExam = () => {
    updateDB((p: any) => ({ ...p, exams: [editForm, ...p.exams] }));
    setIsAdding(false);
    setEditForm(null);
  };

  return (
    <div className="space-y-16 animate-in fade-in duration-700">
      
      {/* EXAM FORGE INPUT */}
      <div className="bg-slate-950/60 border border-white/10 p-12 rounded-[64px] space-y-10 shadow-4xl relative overflow-hidden group">
         <div className="absolute top-0 right-0 p-10 opacity-5 rotate-12"><BrainCircuit size={300}/></div>
         <div className="space-y-4 relative z-10">
            <h2 className="text-6xl font-black tracking-tighter text-white uppercase italic leading-none">EXAM <span className="text-indigo-500">FORGE.</span></h2>
            <p className="text-[11px] font-black uppercase text-slate-700 tracking-[0.9em]">Neural Question-Bank Synthesis Node</p>
         </div>
         <div className="relative z-10 flex flex-col xl:flex-row gap-6">
            <div className="flex-1 bg-black border border-white/10 rounded-[32px] p-2 flex items-center shadow-inner group-focus-within:border-indigo-600 transition-all">
               <Terminal className="text-slate-800 ml-8" size={24}/>
               <input 
                 className="bg-transparent w-full px-8 py-6 outline-none font-black text-xl placeholder:text-slate-900 text-indigo-400"
                 placeholder="Paste Syllabus URL or Topic for AI synthesis..."
                 value={urlInput}
                 onChange={e => setUrlInput(e.target.value)}
                 onKeyDown={e => e.key === 'Enter' && handleNeuralPaperFetch()}
               />
               <button 
                 onClick={handleNeuralPaperFetch} 
                 disabled={isAiLoading || !urlInput}
                 className="bg-indigo-600 text-white px-12 py-5 rounded-[24px] text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-indigo-600 transition-all shadow-xl disabled:opacity-30"
               >
                 {isAiLoading ? <RefreshCw className="animate-spin"/> : 'FETCH PAPER'}
               </button>
            </div>
         </div>
      </div>

      {/* EXAM REGISTRY */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
         {db.exams.map((e: any) => (
           <div key={e.id} className="bg-slate-950/40 border border-white/5 rounded-[64px] p-12 space-y-8 hover:border-indigo-500 transition-all group shadow-4xl">
              <div className="flex justify-between items-start">
                 <div className="w-16 h-16 bg-indigo-600/10 rounded-2xl flex items-center justify-center text-indigo-500 shadow-2xl border border-indigo-500/20"><Timer size={28}/></div>
                 <button onClick={() => updateDB((p:any)=>({...p, exams: p.exams.filter((x:any)=>x.id!==e.id)}))} className="p-4 bg-red-500/10 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-all"><Trash2 size={16}/></button>
              </div>
              <div>
                 <h4 className="text-3xl font-black text-white italic uppercase tracking-tighter leading-tight group-hover:text-indigo-400 transition-all">{e.title}</h4>
                 <div className="flex gap-6 text-[9px] font-black text-slate-700 uppercase tracking-widest mt-6">
                    <span>{e.duration} MINS</span>
                    <span>{e.questions?.length} QUESTIONS</span>
                    <span>{e.totalMarks} MARKS</span>
                 </div>
              </div>
           </div>
         ))}
      </div>

      {isAdding && (
        <div className="fixed inset-0 z-[2000] bg-black/98 backdrop-blur-5xl flex items-center justify-center p-12 overflow-y-auto">
          <div className="bg-[#050505] border border-white/10 rounded-[80px] w-full max-w-4xl p-20 space-y-12 animate-in zoom-in-95 duration-700 relative my-auto shadow-4xl">
            <h3 className="text-6xl font-black italic uppercase tracking-tighter text-white">REFINE <span className="text-indigo-500">EXAM.</span></h3>
            <div className="space-y-8">
               <input className="w-full bg-black border border-white/10 rounded-2xl px-8 py-6 text-white font-bold" value={editForm.title} onChange={e => setEditForm({...editForm, title: e.target.value})} placeholder="Exam Title" />
               <div className="grid grid-cols-2 gap-8">
                  <input type="number" className="w-full bg-black border border-white/10 rounded-2xl px-8 py-6 text-white font-bold" value={editForm.duration} onChange={e => setEditForm({...editForm, duration: parseInt(e.target.value)})} placeholder="Duration (min)" />
                  <input type="number" className="w-full bg-black border border-white/10 rounded-2xl px-8 py-6 text-white font-bold" value={editForm.totalMarks} onChange={e => setEditForm({...editForm, totalMarks: parseInt(e.target.value)})} placeholder="Total Marks" />
               </div>
               
               <div className="max-h-[300px] overflow-y-auto space-y-6 pr-4 scrollbar-hide">
                  {editForm.questions?.map((q: any, i: number) => (
                    <div key={i} className="p-8 bg-white/5 rounded-[40px] border border-white/5 space-y-4">
                       <p className="text-sm font-bold text-slate-300 italic">Q{i+1}: {q.q}</p>
                       <div className="grid grid-cols-2 gap-4">
                          {q.options.map((opt: string, idx: number) => (
                            <div key={idx} className={`p-4 rounded-xl text-[10px] font-black uppercase tracking-widest ${q.correct === idx ? 'bg-emerald-600/20 text-emerald-500' : 'bg-black/40 text-slate-600'}`}>{opt}</div>
                          ))}
                       </div>
                    </div>
                  ))}
               </div>
            </div>
            <button onClick={commitExam} className="w-full bg-indigo-600 py-10 rounded-[50px] font-black uppercase tracking-widest text-sm shadow-4xl hover:bg-emerald-600 transition-all flex items-center justify-center gap-6">
              <ShieldCheck size={32}/> COMMIT EXAM TO ARENA
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
