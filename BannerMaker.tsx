
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
// Fix: Import Image and alias it as ImageIcon from lucide-react
import { Image as ImageIcon, Download, Share2, RefreshCw, Sparkles } from 'lucide-react';

export const BannerMaker = ({ db, isAiLoading, setIsAiLoading }: any) => {
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [selectedContext, setSelectedContext] = useState('');

  const handleGenerate = async () => {
    setIsAiLoading(true);
    try {
      // Fix: Use process.env.API_KEY directly as per guidelines
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: `A cinematic professional banner for a job notification: ${selectedContext || 'Competitive Exams'}. 4K, futuristic, neon blue and deep purple theme. No text.`,
        config: { imageConfig: { aspectRatio: '16:9' } }
      });
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          setGeneratedImage(`data:image/png;base64,${part.inlineData.data}`);
          break;
        }
      }
    } catch (e) {
      alert("Banner synthesis failed.");
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in duration-700">
      <div className="text-center space-y-4">
        <h2 className="text-6xl font-black tracking-tighter text-white uppercase">Visual <span className="text-indigo-500">Studio</span></h2>
        <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.5em]">Neural Graphic Engine Protocol</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <div className="bg-slate-950/40 backdrop-blur-3xl border border-white/5 rounded-[40px] p-10 space-y-8">
            <h3 className="text-xl font-black text-white uppercase tracking-widest flex items-center gap-3"><Sparkles className="text-indigo-500"/> Config</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Notification Context</label>
                <select 
                  className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white font-bold outline-none focus:border-indigo-600 transition-all appearance-none"
                  onChange={(e) => setSelectedContext(e.target.value)}
                >
                  <option value="">General Professional</option>
                  {db.jobs.map((j: any) => <option key={j.id} value={j.title}>{j.title}</option>)}
                </select>
              </div>
              <button 
                onClick={handleGenerate}
                disabled={isAiLoading}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black uppercase tracking-widest py-6 rounded-2xl transition-all shadow-xl shadow-indigo-600/20 disabled:opacity-50"
              >
                {isAiLoading ? <RefreshCw className="animate-spin mx-auto"/> : 'Synthesize Asset'}
              </button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7">
          <div className="bg-slate-950/60 backdrop-blur-3xl border border-white/5 rounded-[48px] p-12 min-h-[500px] flex items-center justify-center relative overflow-hidden">
            {generatedImage ? (
              <div className="space-y-8 animate-in zoom-in duration-500 w-full">
                <img src={generatedImage} className="w-full rounded-[32px] shadow-2xl border border-white/10" />
                <div className="flex gap-4">
                  <button className="flex-1 bg-white text-black font-black uppercase py-4 rounded-2xl hover:bg-slate-200 transition-all flex items-center justify-center gap-3"><Download size={20}/> Save 4K</button>
                  <button className="flex-1 bg-white/5 border border-white/10 text-white font-black uppercase py-4 rounded-2xl hover:bg-white/10 transition-all flex items-center justify-center gap-3"><Share2 size={20}/> Deploy</button>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-white/5 rounded-[32px] flex items-center justify-center mx-auto"><ImageIcon size={40} className="text-slate-800"/></div>
                <p className="text-lg font-black text-slate-700 uppercase tracking-widest">Neural Studio Idle</p>
              </div>
            )}
            {isAiLoading && <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center text-white font-black text-2xl animate-pulse">RENDERING...</div>}
          </div>
        </div>
      </div>
    </div>
  );
};
