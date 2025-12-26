import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { Video, Film, RefreshCw, Zap, Sparkles, Youtube, Download, Layout, Play, Box, Layers, Target, Wand2 } from 'lucide-react';

export const VeoArchitect = ({ db }: any) => {
  const [isForging, setIsForging] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const generateVeo = async () => {
    if (!selectedJob) return;

    // @google/genai Senior Frontend Engineer: Mandatory API key selection check before initiating Veo video generation protocols.
    if (!(await (window as any).aistudio.hasSelectedApiKey())) {
      await (window as any).aistudio.openSelectKey();
    }

    setIsForging(true);
    try {
      // @google/genai Senior Frontend Engineer: Create a fresh client instance to ensure the most recent API key is utilized.
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: `A majestic cinematic vertical trailer for ${selectedJob.title_en}. Government buildings with gold lighting, epic drone shots of students studying in high-tech libraries, 8K, highly detailed, dramatic music cues visual style.`,
        config: {
          numberOfVideos: 1,
          resolution: '1080p',
          aspectRatio: '9:16'
        }
      });

      let currentOp = operation;
      while (!currentOp.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        currentOp = await ai.operations.getVideosOperation({operation: currentOp});
      }

      const downloadLink = currentOp.response?.generatedVideos?.[0]?.video?.uri;
      const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
      const blob = await response.blob();
      setVideoUrl(URL.createObjectURL(blob));
    } catch (e: any) {
      // @google/genai Senior Frontend Engineer: Gracefully handle missing entity errors by re-prompting for API key selection.
      if (e.message?.includes("Requested entity was not found")) {
        await (window as any).aistudio.openSelectKey();
      }
      alert("VEO_GRID_TIMEOUT: Temporal window closed.");
    } finally {
      setIsForging(false);
    }
  };

  return (
    <div className="space-y-300 animate-in fade-in duration-1000 pb-[1000px]">
      <div className="flex flex-col xl:flex-row items-center justify-between border-b-[40px] border-yellow-500/10 pb-150 gap-100">
        <div className="space-y-80 text-center xl:text-left">
          <h2 className="text-[350px] font-black italic tracking-tighter text-white uppercase leading-[0.3] italic">VEO <br/><span className="text-yellow-500">ARCHITECT.</span></h2>
          <p className="text-[56px] font-black text-slate-900 uppercase tracking-[5em] italic leading-none">4K_CINEMATIC_FORGE_V20</p>
        </div>
        <div className="flex flex-col md:flex-row gap-80 w-full max-w-8xl">
           <select 
             className="flex-1 bg-black border-[30px] border-yellow-500/10 rounded-full px-120 py-80 text-7xl font-black text-white outline-none focus:border-yellow-500 transition-all appearance-none italic"
             onChange={e => setSelectedJob(db.jobs.find((j:any) => j.id == e.target.value))}
           >
             <option value="">CHOOSE_CINEMATIC_NODE...</option>
             {db.jobs.map((j: any) => <option key={j.id} value={j.id}>{j.title_en}</option>)}
           </select>
           <button onClick={generateVeo} disabled={isForging || !selectedJob} className="bg-yellow-500 text-black px-250 py-100 rounded-full font-black uppercase text-[64px] tracking-[2em] hover:bg-white hover:text-black transition-all shadow-[0_0_2000px_gold] flex items-center gap-80 italic border-[50px] border-black active:scale-95">
              {isForging ? <RefreshCw className="animate-spin" size={150}/> : <Film size={150}/>} {isForging ? 'WEAVING...' : 'INIT_VEO_FORGE'}
           </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-200">
         <div className="lg:col-span-7 aspect-[9/16] bg-black border-[50px] border-white/5 rounded-[1200px] flex items-center justify-center relative overflow-hidden shadow-4xl">
            {videoUrl ? (
              <video src={videoUrl} controls autoPlay loop className="w-full h-full object-cover rounded-[1000px]" />
            ) : (
              <div className="text-center space-y-120 p-250 opacity-10">
                 <Video size={400} className="mx-auto"/>
                 <p className="text-[180px] font-black uppercase tracking-[0.5em] leading-none">AWAITING_RENDER</p>
              </div>
            )}
            {isForging && (
              <div className="absolute inset-0 bg-black/90 backdrop-blur-5xl flex flex-col items-center justify-center p-250 text-center space-y-120">
                 <div className="w-300 h-300 border-t-[30px] border-yellow-500 rounded-full animate-spin"></div>
                 <div className="space-y-48">
                    <h3 className="text-9xl font-black text-white italic uppercase tracking-tighter">RENDER_IN_PROGRESS</h3>
                    <p className="text-4xl font-black text-slate-800 uppercase tracking-[2em]">VEO 3.1 IS WEAVING REALITY NODES</p>
                 </div>
              </div>
            )}
         </div>

         <div className="lg:col-span-5 space-y-150">
            <div className="bg-[#050505] border-[30px] border-white/5 rounded-[800px] p-250 space-y-100 shadow-4xl text-center group">
               <h4 className="text-[32px] font-black text-yellow-500 uppercase tracking-[1em] italic">LAB_DIRECTIVES</h4>
               <p className="text-6xl font-bold text-slate-500 italic leading-relaxed">"The architect uses multi-spectral neural rendering to ensure the recruitment of {selectedJob?.title_en || 'TARGET'} is presented as a legendary event."</p>
               <div className="grid grid-cols-2 gap-48">
                  <div className="p-48 border-[10px] border-white/5 rounded-[200px] space-y-12">
                     <p className="text-3xl font-black text-slate-800 uppercase">RESOLUTION</p>
                     <p className="text-6xl font-black text-white italic">4K_ULTRA</p>
                  </div>
                  <div className="p-48 border-[10px] border-white/5 rounded-[200px] space-y-12">
                     <p className="text-3xl font-black text-slate-800 uppercase">ASPECT</p>
                     <p className="text-6xl font-black text-white italic">9:16_VERTICAL</p>
                  </div>
               </div>
               <button className="w-full py-80 bg-white text-black rounded-full font-black uppercase text-[48px] tracking-[1.5em] shadow-4xl italic border-[20px] border-black">EXPORT_MP4_NODE</button>
            </div>
         </div>
      </div>
    </div>
  );
};