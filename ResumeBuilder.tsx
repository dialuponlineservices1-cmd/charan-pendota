
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { FileUser, Flame, Sparkles, RefreshCw, Download, Share2 } from 'lucide-react';

export const ResumeBuilder = ({ isAiLoading, setIsAiLoading }: any) => {
  const [resumeData, setResumeData] = useState({ name: '', skills: '', exp: '' });
  const [output, setOutput] = useState('');

  const handleForge = async () => {
    setIsAiLoading(true);
    try {
      // Fix: Use process.env.API_KEY directly as per guidelines
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `Build a god-tier professional summary and career roadmap for an aspirant: ${JSON.stringify(resumeData)}. Tone: Authoritative, Top-tier.`,
        config: { thinkingConfig: { thinkingBudget: 10000 } }
      });
      setOutput(response.text || '');
    } catch (e) {
      alert("Forge failed.");
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-16 animate-in fade-in duration-700">
      <div className="text-center space-y-6">
        <h2 className="text-7xl font-black tracking-tighter text-white uppercase">Career <span className="text-indigo-500">Forge</span></h2>
        <p className="text-slate-500 font-bold uppercase text-[11px] tracking-[0.5em]">Deep Reasoning Professional Optimization</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-16">
        <div className="bg-slate-950/40 backdrop-blur-3xl border border-white/5 rounded-[48px] p-16 space-y-10">
          <h3 className="text-2xl font-black text-white uppercase tracking-widest flex items-center gap-4"><Sparkles className="text-indigo-500"/> Parameters</h3>
          <div className="space-y-8">
            {['Name', 'Skills', 'Experience'].map(f => (
              <div key={f} className="space-y-3">
                <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{f}</label>
                <input 
                  className="w-full bg-black border border-white/5 rounded-[24px] px-8 py-5 text-lg font-black text-white outline-none focus:border-indigo-600 transition-all placeholder:text-slate-900" 
                  placeholder={`Input ${f}...`}
                  value={(resumeData as any)[f.toLowerCase()]}
                  onChange={e => setResumeData({...resumeData, [f.toLowerCase()]: e.target.value})}
                />
              </div>
            ))}
            <button 
              onClick={handleForge}
              disabled={isAiLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black uppercase tracking-widest py-8 rounded-3xl transition-all shadow-2xl shadow-indigo-600/30 text-xl disabled:opacity-50"
            >
              {isAiLoading ? <RefreshCw className="animate-spin mx-auto"/> : 'Forge Neural Profile'}
            </button>
          </div>
        </div>

        <div className="bg-slate-950/60 backdrop-blur-3xl border border-indigo-500/20 bg-indigo-500/5 rounded-[48px] p-16 relative min-h-[600px]">
          {output ? (
            <div className="space-y-12 animate-in fade-in duration-1000">
              <h3 className="text-3xl font-black text-white tracking-tighter uppercase">Forged <span className="text-indigo-500">Node</span></h3>
              <div className="prose prose-invert prose-2xl max-w-none text-slate-400 font-medium leading-relaxed whitespace-pre-wrap pl-12 border-l-8 border-indigo-500/30">
                {output}
              </div>
              <div className="flex gap-6 pt-12">
                <button className="flex-1 bg-white text-black font-black uppercase py-4 rounded-2xl flex items-center justify-center gap-3"><Download size={20}/> Save PDF</button>
                <button className="flex-1 bg-white/5 border border-white/10 text-white font-black uppercase py-4 rounded-2xl flex items-center justify-center gap-3"><Share2 size={20}/> Sync</button>
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-20 space-y-10">
              <div className="w-32 h-32 bg-white/5 rounded-[48px] flex items-center justify-center text-slate-800"><FileUser size={64}/></div>
              <p className="text-2xl font-black text-slate-800 uppercase tracking-[0.5em]">Neural Sync Pending...</p>
            </div>
          )}
          {isAiLoading && <div className="absolute inset-0 bg-black/60 backdrop-blur-2xl flex items-center justify-center text-white font-black text-3xl animate-pulse uppercase">Thinking...</div>}
        </div>
      </div>
    </div>
  );
};
