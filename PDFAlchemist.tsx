
import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { FileOutput, Sparkles, RefreshCw, Wand2, Download, CheckCircle, Target, Layers } from 'lucide-react';

export const PDFAlchemist = ({ db }: any) => {
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [structure, setStructure] = useState<any>(null);

  const alchemize = async () => {
    if (!selectedJob) return;
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `ALCHEMIZE_DOC: ${selectedJob.title_en}. 
        Create a 10-page imperial study guide structure. 
        Return JSON format with "pages" array containing { title, subheaders, focusPoints }.`,
        config: {
          thinkingConfig: { thinkingBudget: 20000 },
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              pages: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    subheaders: { type: Type.ARRAY, items: { type: Type.STRING } },
                    focusPoints: { type: Type.ARRAY, items: { type: Type.STRING } }
                  }
                }
              }
            }
          }
        }
      });
      setStructure(JSON.parse(response.text));
    } catch (e) {
      alert("Alchemical Synthesis Error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-150 animate-in fade-in duration-1000 pb-[1000px]">
      <div className="flex flex-col xl:flex-row items-center justify-between border-b-[20px] border-white/5 pb-100 gap-80">
        <div className="space-y-32 text-center xl:text-left">
          <h2 className="text-[250px] font-black italic tracking-tighter text-white uppercase leading-[0.35] italic">PDF <br/><span className="text-white/30">ALCHEMIST.</span></h2>
          <p className="text-[42px] font-black text-slate-900 uppercase tracking-[4em] italic">SENTIENT_DOCUMENT_SYNTHESIS</p>
        </div>
        <div className="flex flex-col md:flex-row gap-48 w-full max-w-6xl">
           <select 
             className="flex-1 bg-black border-[15px] border-white/10 rounded-full px-80 py-48 text-5xl font-black text-white outline-none focus:border-white transition-all appearance-none italic"
             onChange={e => setSelectedJob(db.jobs.find((j:any) => j.id == e.target.value))}
           >
             <option value="">SELECT_TARGET_NODE...</option>
             {db.jobs.map((j: any) => <option key={j.id} value={j.id}>{j.title_en}</option>)}
           </select>
           <button onClick={alchemize} disabled={loading || !selectedJob} className="bg-white text-black px-120 py-48 rounded-full font-black uppercase text-[42px] tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-4xl flex items-center gap-48 italic border-[20px] border-black">
              {loading ? <RefreshCw className="animate-spin" size={64}/> : <Wand2 size={64}/>} {loading ? 'TRANSMUTING...' : 'START_ALCHEMY'}
           </button>
        </div>
      </div>

      {structure ? (
        <div className="grid lg:grid-cols-12 gap-100">
           <div className="lg:col-span-8 space-y-80">
              {structure.pages.map((p: any, i: number) => (
                <div key={i} className="bg-black border-[15px] border-white/5 rounded-[400px] p-120 space-y-64 shadow-4xl relative overflow-hidden group hover:border-white transition-all">
                   <div className="absolute top-0 right-0 p-80 opacity-5 rotate-12 transition-transform duration-1000 group-hover:rotate-0"><Layers size={300}/></div>
                   <div className="space-y-24 relative z-10">
                      <span className="text-red-600 font-black uppercase text-[32px] tracking-[1em] italic">PAGE_0{i+1}_PROTO</span>
                      <h4 className="text-8xl font-black italic text-white leading-none tracking-tighter uppercase italic">{p.title}</h4>
                   </div>
                   <div className="grid md:grid-cols-2 gap-48 relative z-10">
                      <div className="space-y-32">
                         <h5 className="text-[28px] font-black text-slate-700 uppercase tracking-widest">SUB_HEADERS</h5>
                         {p.subheaders.map((s: any, idx: number) => (
                           <div key={idx} className="flex items-center gap-24 text-[32px] font-bold italic text-slate-400"><CheckCircle size={32} className="text-white"/> {s}</div>
                         ))}
                      </div>
                      <div className="space-y-32">
                         <h5 className="text-[28px] font-black text-slate-700 uppercase tracking-widest">FOCUS_NODES</h5>
                         {p.focusPoints.map((f: any, idx: number) => (
                           <div key={idx} className="flex items-center gap-24 text-[32px] font-bold italic text-slate-400"><Target size={32} className="text-red-600"/> {f}</div>
                         ))}
                      </div>
                   </div>
                </div>
              ))}
           </div>
           <div className="lg:col-span-4 space-y-80">
              <div className="bg-white text-black rounded-[400px] p-120 text-center space-y-64 shadow-4xl sticky top-200">
                 <h3 className="text-9xl font-black italic uppercase tracking-tighter leading-none">EXPORT <br/> READY.</h3>
                 <p className="text-4xl font-bold uppercase italic leading-tight">Alchemy successful. 10-Page Blueprint locked for download.</p>
                 <button className="w-full bg-black text-white py-48 rounded-full font-black uppercase text-[32px] tracking-[2em] shadow-4xl hover:bg-red-600 transition-all italic border-[20px] border-black flex items-center justify-center gap-48 active:scale-95">
                    <Download size={64}/> EXPORT_PDF
                 </button>
              </div>
           </div>
        </div>
      ) : (
        <div className="h-[1500px] bg-[#050505] border-[25px] border-white/5 rounded-[600px] flex flex-col items-center justify-center text-center p-200 opacity-20 space-y-100">
           <FileOutput size={400} className="text-slate-950"/>
           <p className="text-[140px] font-black text-slate-950 uppercase tracking-[0.5em] leading-none italic">AWAITING_ALCHEMY_PAYLOAD.</p>
        </div>
      )}
    </div>
  );
};
