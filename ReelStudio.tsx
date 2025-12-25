
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Film, Play, Download, Share2, RefreshCw, Sparkles, Wand2 } from 'lucide-react';

export const ReelStudio = ({ db, isAiLoading, setIsAiLoading }: any) => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<any>(null);

  const generateReel = async () => {
    if (!selectedJob) return;

    // Check whether an API key has been selected as per guidelines for Veo models
    if (!(await (window as any).aistudio.hasSelectedApiKey())) {
      await (window as any).aistudio.openSelectKey();
      // Assume the key selection was successful after triggering openSelectKey() and proceed to the app
    }

    setIsAiLoading(true);
    try {
      // Create a new GoogleGenAI instance right before making an API call to ensure it always uses the most up-to-date API key.
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: `Cinematic job notification reel for ${selectedJob.title} at ${selectedJob.org}. Vertical 9:16, futuristic neon technology theme, fast cuts, high energy, professional, no text.`,
        config: {
          numberOfVideos: 1,
          resolution: '720p',
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
      // If the request fails with an error message containing "Requested entity was not found.", 
      // reset the key selection state and prompt the user to select a key again via openSelectKey()
      if (e.message?.includes("Requested entity was not found")) {
        await (window as any).aistudio.openSelectKey();
      }
      alert("Neural Reel synthesis failed. Please check operation limit.");
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-16 animate-in fade-in duration-700">
      <div className="text-center space-y-6">
        <h2 className="text-7xl font-black tracking-tighter text-white uppercase">Reel <span className="text-indigo-500">Studio</span></h2>
        <p className="text-slate-500 font-black uppercase text-[11px] tracking-[0.6em]">Veo 3.1 Neural Video Synthesis</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-16">
        <div className="lg:col-span-5 space-y-10">
          <div className="bg-slate-950/40 border border-white/5 rounded-[48px] p-12 space-y-10">
            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Select Target Post</label>
              <select 
                className="w-full bg-black border border-white/10 rounded-3xl px-8 py-6 text-white font-black outline-none focus:border-indigo-600 transition-all appearance-none text-lg"
                onChange={(e) => setSelectedJob(db.jobs.find((j: any) => j.id === e.target.value))}
              >
                <option value="">Choose Registry Node...</option>
                {db.jobs.map((j: any) => <option key={j.id} value={j.id}>{j.title}</option>)}
              </select>
            </div>

            <button 
              onClick={generateReel}
              disabled={isAiLoading || !selectedJob}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black uppercase tracking-[0.2em] py-8 rounded-[32px] transition-all shadow-2xl shadow-indigo-600/30 flex items-center justify-center gap-4 text-xl disabled:opacity-50"
            >
              {isAiLoading ? <RefreshCw className="animate-spin"/> : <Wand2/>} {isAiLoading ? 'SYNTHESIZING...' : 'GENERATE AI REEL'}
            </button>
            <div className="pt-4 text-center">
              <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="text-[10px] text-indigo-400 uppercase tracking-widest hover:underline">Billing & API Key Documentation</a>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="bg-slate-950/60 border border-white/5 rounded-[64px] p-8 aspect-[9/16] max-h-[800px] flex items-center justify-center relative overflow-hidden mx-auto w-full max-w-[450px]">
            {videoUrl ? (
              <video src={videoUrl} controls autoPlay loop className="h-full w-full object-cover rounded-[48px] shadow-3xl" />
            ) : (
              <div className="text-center space-y-8 p-12 opacity-30">
                <div className="w-24 h-24 bg-white/5 rounded-[40px] flex items-center justify-center mx-auto"><Film size={48} className="text-slate-400"/></div>
                <p className="text-2xl font-black text-slate-500 uppercase tracking-widest leading-relaxed">Studio Buffer Idle.<br/>Awaiting Input.</p>
              </div>
            )}
            {isAiLoading && (
              <div className="absolute inset-0 bg-black/80 backdrop-blur-3xl flex flex-col items-center justify-center text-center p-12 space-y-10">
                 <div className="w-20 h-20 border-t-4 border-indigo-500 rounded-full animate-spin"></div>
                 <div className="space-y-4">
                    <h4 className="text-3xl font-black text-white uppercase tracking-tighter">Rendering Cinematic Asset</h4>
                    <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Veo 3.1 is constructing frames...</p>
                 </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
