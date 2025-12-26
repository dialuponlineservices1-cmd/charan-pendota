
// @google/genai Senior Frontend Engineer: Fixed reference error replacing selectedPost with selectedJob.
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Film, Play, Download, Share2, RefreshCw, Sparkles, Wand2, Crown, Zap } from 'lucide-react';

export const ReelStudio = ({ db, isAiLoading, setIsAiLoading }: any) => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<any>(null);

  const generateReel = async () => {
    if (!selectedJob) return;

    if (!(await (window as any).aistudio.hasSelectedApiKey())) {
      await (window as any).aistudio.openSelectKey();
    }

    setIsAiLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      // Using the premium Veo 3.1 model for high-end cinematic reels
      const operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: `A majestic, cinematic vertical 9:16 trailer for the recruitment of ${selectedJob.title_en} at ${selectedJob.org}. Intense gold lighting, hyper-realistic government office interiors, epic cinematic camera sweeps, 8K resolution, high energy, professional.`,
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
      if (e.message?.includes("Requested entity was not found")) {
        await (window as any).aistudio.openSelectKey();
      }
      alert("EMPYREAN REEL ERROR: Synthesis window timed out.");
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="max-w-[3200px] mx-auto space-y-120 animate-in fade-in duration-1000 pb-[1000px]">
      <div className="text-center space-y-12">
        <h2 className="text-[180px] font-black tracking-tighter text-white uppercase italic leading-none">REEL <span className="text-red-600">CINEMA.</span></h2>
        <p className="text-slate-900 font-black uppercase text-[24px] tracking-[1.5em] italic">VEO 3.1 NEURAL VIDEO SYNTHESIS</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-120 items-start">
        <div className="lg:col-span-5 space-y-80">
          <div className="bg-black border-[15px] border-white/5 rounded-[400px] p-100 space-y-80 shadow-4xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-32 opacity-10 rotate-12"><Crown size={500}/></div>
            <div className="space-y-32 relative z-10">
              <label className="text-[20px] font-black text-red-600 uppercase tracking-[1em] italic">SELECT_REGISTRY_NODE</label>
              <select 
                className="w-full bg-black border-[10px] border-white/10 rounded-[150px] px-64 py-32 text-white font-black outline-none focus:border-red-600 transition-all appearance-none text-4xl italic"
                onChange={(e) => setSelectedJob(db.jobs.find((j: any) => j.id == e.target.value))}
              >
                <option value="">CHOOSE NODE...</option>
                {db.jobs.map((j: any) => <option key={j.id} value={j.id}>{j.title_en}</option>)}
              </select>
            </div>

            <button 
              onClick={generateReel}
              disabled={isAiLoading || !selectedJob}
              className="w-full bg-red-600 hover:bg-white hover:text-black text-white font-black uppercase tracking-[1em] py-32 rounded-[200px] transition-all shadow-4xl flex items-center justify-center gap-32 text-[42px] disabled:opacity-30 border-[15px] border-black italic"
            >
              {isAiLoading ? <RefreshCw className="animate-spin" size={64}/> : <Wand2 size={64}/>} {isAiLoading ? 'SYNTHESIZING...' : 'FORGE_VEO_SHORT'}
            </button>
            <div className="pt-8 text-center">
              <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="text-[16px] text-red-400 uppercase tracking-[0.5em] hover:underline italic font-bold">PREMIUM API BILLING PROTOCOL</a>
            </div>
          </div>

          <div className="bg-white/5 border-[10px] border-white/5 p-80 rounded-[300px] space-y-48 text-center italic">
             <div className="w-32 h-32 bg-indigo-600 rounded-full flex items-center justify-center mx-auto shadow-4xl"><Zap size={64}/></div>
             <p className="text-6xl font-bold text-slate-800 leading-tight uppercase tracking-tighter">"Generate high-retention vertical videos for Instagram and YouTube Shorts in seconds using the world's most advanced generative model."</p>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="bg-black border-[25px] border-white/5 rounded-[500px] p-24 aspect-[9/16] max-h-[2200px] flex items-center justify-center relative overflow-hidden mx-auto w-full shadow-4xl">
            {videoUrl ? (
              <video src={videoUrl} controls autoPlay loop className="h-full w-full object-cover rounded-[480px] shadow-3xl" />
            ) : (
              <div className="text-center space-y-64 p-120 opacity-30">
                <div className="w-64 h-64 bg-white/5 rounded-[120px] flex items-center justify-center mx-auto border-[10px] border-white/10"><Film size={120} className="text-slate-900"/></div>
                <p className="text-8xl font-black text-slate-950 uppercase tracking-[0.5em] leading-none">AEON_BUFFER_IDLE.<br/>AWAITING_INPUT.</p>
              </div>
            )}
            {isAiLoading && (
              <div className="absolute inset-0 bg-black/90 backdrop-blur-5xl flex flex-col items-center justify-center text-center p-120 space-y-64">
                 <div className="w-64 h-64 border-t-[20px] border-red-600 rounded-full animate-spin"></div>
                 <div className="space-y-24">
                    <h4 className="text-9xl font-black text-white uppercase tracking-tighter italic">RENDERING_CINEMA</h4>
                    <p className="text-4xl font-bold text-slate-900 uppercase tracking-[1em]">VEO 3.1 IS WEAVING REALITY...</p>
                 </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
