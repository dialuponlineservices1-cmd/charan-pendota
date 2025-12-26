
import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { Newspaper, Download, RefreshCw, Zap, Sparkles, Layout, Globe, ArrowRight, ShieldCheck, Flag } from 'lucide-react';

export const PrintForge = ({ db }: any) => {
  const [isForging, setIsForging] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [mockup, setMockup] = useState<any>(null);

  const forgePrintAd = async () => {
    if (!selectedJob) return;
    setIsForging(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `PRINT_FORGE: Create a full-page "Newspaper Ad Mockup" content for: ${selectedJob.title_te}. 
        Provide: 
        1. A "Lethal Headline" in high-impact Telugu. 
        2. 4 Feature Boxes (Qualifications, Salary, Post Count, Last Date). 
        3. A "Call-to-Action" footer. 
        4. Layout instructions for the graphic designer.
        Return strictly JSON.`,
        config: {
          thinkingConfig: { thinkingBudget: 24576 },
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              headline_te: { type: Type.STRING },
              boxes: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    label: { type: Type.STRING },
                    value: { type: Type.STRING }
                  }
                }
              },
              cta_te: { type: Type.STRING },
              design_directives: { type: Type.STRING }
            }
          }
        }
      });
      setMockup(JSON.parse(response.text));
    } catch (e) {
      alert("Print Forge Failed: Ink depletion error.");
    } finally {
      setIsForging(false);
    }
  };

  return (
    <div className="space-y-300 animate-in fade-in duration-1000 pb-[1000px]">
      <div className="flex flex-col xl:flex-row items-center justify-between border-b-[40px] border-yellow-600/10 pb-150 gap-100">
        <div className="space-y-80 text-center xl:text-left">
          <h2 className="text-[350px] font-black italic tracking-tighter text-white uppercase leading-[0.3] italic">PRINT <br/><span className="text-yellow-600">FORGE.</span></h2>
          <p className="text-[56px] font-black text-slate-900 uppercase tracking-[5em] italic leading-none">REGIONAL_MEDIA_LAYOUT_GEN_V14</p>
        </div>
        <div className="flex flex-col md:flex-row gap-80 w-full max-w-8xl">
           <select 
             className="flex-1 bg-black border-[30px] border-yellow-600/10 rounded-full px-120 py-80 text-7xl font-black text-white outline-none focus:border-yellow-600 transition-all appearance-none italic"
             onChange={e => setSelectedJob(db.jobs.find((j:any) => j.id == e.target.value))}
           >
             <option value="">SELECT_REGIONAL_NODE...</option>
             {db.jobs.map((j: any) => <option key={j.id} value={j.id}>{j.title_te}</option>)}
           </select>
           <button onClick={forgePrintAd} disabled={isForging || !selectedJob} className="bg-yellow-600 text-black px-250 py-100 rounded-full font-black uppercase text-[64px] tracking-[2em] hover:bg-white hover:text-yellow-600 transition-all shadow-[0_0_2000px_gold] flex items-center gap-80 italic border-[50px] border-black">
              {isForging ? <RefreshCw className="animate-spin" size={150}/> : <Newspaper size={150}/>} {isForging ? 'PRESSING...' : 'INIT_PRESS'}
           </button>
        </div>
      </div>

      {mockup && (
        <div className="grid lg:grid-cols-12 gap-200">
           {/* THE AD PREVIEW */}
           <div className="lg:col-span-8 bg-white text-black p-200 rounded-[100px] space-y-120 shadow-[0_0_1000px_white] relative overflow-hidden border-[40px] border-black">
              <div className="absolute top-0 right-0 p-80 opacity-5 rotate-45"><Flag size={600}/></div>
              <div className="text-center space-y-48 border-b-8 border-black pb-80">
                 <h3 className="text-[120px] font-black uppercase tracking-tighter italic">STUDENT_DIALUP_SPECIAL</h3>
                 <p className="text-4xl font-bold tracking-[1em]">OFFICIAL_RECRUITMENT_GAZETTE</p>
              </div>
              
              <h4 className="text-[180px] font-black italic text-center leading-[0.9] tracking-tighter uppercase">{mockup.headline_te}</h4>
              
              <div className="grid grid-cols-2 gap-80">
                 {mockup.boxes.map((b: any, i: number) => (
                    <div key={i} className="border-8 border-black p-80 text-center space-y-24">
                       <p className="text-4xl font-black uppercase tracking-widest">{b.label}</p>
                       <p className="text-8xl font-black italic uppercase">{b.value}</p>
                    </div>
                 ))}
              </div>

              <div className="bg-black text-white p-100 text-center">
                 <h5 className="text-[100px] font-black italic tracking-tighter uppercase">{mockup.cta_te}</h5>
              </div>
           </div>

           <div className="lg:col-span-4 space-y-120">
              <div className="bg-[#050505] border-[30px] border-white/5 rounded-[600px] p-150 space-y-100 shadow-4xl text-center">
                 <h4 className="text-[32px] font-black text-yellow-600 uppercase tracking-[1em] italic">DESIGN_DIRECTIVES</h4>
                 <p className="text-5xl font-bold text-slate-500 italic leading-relaxed">"{mockup.design_directives}"</p>
                 <button className="w-full py-80 bg-white text-black rounded-full font-black uppercase text-[48px] tracking-[1.5em] shadow-4xl italic border-[20px] border-black">EXPORT_IMAGE_FORGE</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};
