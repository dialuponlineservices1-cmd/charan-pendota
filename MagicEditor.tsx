
import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { PenTool, Terminal, RefreshCw, Zap, Database, ExternalLink, Sparkles, CheckCircle, Search, Layers, Command, Rocket } from 'lucide-react';

export const MagicEditor = ({ onPostCreated, setIsAiLoading, isAiLoading }: any) => {
  const [mode, setMode] = useState<'scan' | 'prompt'>('scan');
  const [input, setInput] = useState('');
  const [extractedPost, setExtractedPost] = useState<any>(null);

  const handleForge = async () => {
    if (!input) return;
    setIsAiLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = mode === 'scan' 
        ? `Analyze the job announcement at this URI: ${input}. 
           Return strictly in JSON format with these exact keys: 
           title, org, qualification, lastDate, location, category, summary, fullContent, competition, salaryRange, matchScore.`
        : `Create a professional job notification based on this request: ${input}. 
           Be creative but professional. Return strictly in JSON format with these keys: 
           title, org, qualification, lastDate, location, category, summary, fullContent, competition, salaryRange, matchScore. 
           Competition should be 'High', 'Medium' or 'Low'. matchScore should be a number 1-100.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: { 
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              org: { type: Type.STRING },
              qualification: { type: Type.STRING },
              lastDate: { type: Type.STRING },
              location: { type: Type.STRING },
              category: { type: Type.STRING },
              summary: { type: Type.STRING },
              fullContent: { type: Type.STRING },
              competition: { type: Type.STRING },
              salaryRange: { type: Type.STRING },
              matchScore: { type: Type.NUMBER }
            }
          }
        }
      });
      
      const resData = JSON.parse(response.text);
      setExtractedPost(resData);
    } catch (e) {
      alert("AI Neural Forge failed. Connection unstable.");
    } finally {
      setIsAiLoading(false);
    }
  };

  const commitPost = () => {
    onPostCreated(extractedPost);
    setExtractedPost(null);
    setInput('');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-16 animate-in fade-in duration-700">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row items-center justify-between border-b border-white/5 pb-16 gap-8">
        <div className="space-y-4">
          <h2 className="text-8xl font-black tracking-tighter text-white uppercase italic leading-none">AI <span className="text-indigo-500">FORGE.</span></h2>
          <p className="text-[11px] font-black uppercase text-slate-600 tracking-[0.7em]">Neural Asset Generation Module</p>
        </div>
        <div className="bg-white/5 p-2 rounded-[32px] border border-white/10 flex gap-2 shadow-2xl">
          <button onClick={() => setMode('scan')} className={`px-10 py-4 rounded-[24px] text-[10px] font-black uppercase tracking-widest transition-all ${mode === 'scan' ? 'bg-indigo-600 text-white shadow-xl' : 'text-slate-500 hover:text-white'}`}>Scan URI</button>
          <button onClick={() => setMode('prompt')} className={`px-10 py-4 rounded-[24px] text-[10px] font-black uppercase tracking-widest transition-all ${mode === 'prompt' ? 'bg-indigo-600 text-white shadow-xl' : 'text-slate-500 hover:text-white'}`}>Neural Prompt</button>
        </div>
      </div>

      <div className="grid gap-12">
        {/* INPUT TERMINAL */}
        <div className="bg-slate-950/40 border border-white/5 rounded-[64px] p-16 space-y-12 shadow-3xl group">
          <div className="flex items-center gap-8">
            <div className="w-20 h-20 bg-indigo-600 rounded-[32px] flex items-center justify-center shadow-2xl shadow-indigo-600/30 group-hover:rotate-12 transition-all"><Command className="text-white" size={36}/></div>
            <div className="space-y-2">
              <h3 className="text-3xl font-black text-white uppercase tracking-tighter italic">{mode === 'scan' ? 'URI Ingestion Protocol' : 'Neural Prompt Engineering'}</h3>
              <p className="text-[10px] font-black text-slate-700 uppercase tracking-widest">{mode === 'scan' ? 'Scan external nodes for registry inclusion' : 'Command the AI to synthesize custom content'}</p>
            </div>
          </div>
          
          <div className="relative group">
            {mode === 'scan' ? (
              <input 
                className="w-full bg-black border border-white/10 rounded-[40px] px-14 py-12 text-2xl font-black text-white outline-none focus:border-indigo-600 focus:ring-8 focus:ring-indigo-600/10 transition-all placeholder:text-slate-900 shadow-inner"
                placeholder="Paste notification URL..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            ) : (
              <textarea 
                className="w-full bg-black border border-white/10 rounded-[40px] px-14 py-12 text-2xl font-black text-white outline-none focus:border-indigo-600 focus:ring-8 focus:ring-indigo-600/10 transition-all placeholder:text-slate-900 shadow-inner min-h-[200px]"
                placeholder="Ex: Generate a high-paying Railway job for 2025 aspirants in AP..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            )}
            <button 
              onClick={handleForge} 
              disabled={isAiLoading || !input} 
              className="absolute right-10 bottom-10 bg-indigo-600 text-white p-10 rounded-[32px] hover:bg-indigo-500 disabled:opacity-50 transition-all shadow-[0_20px_50px_rgba(79,70,229,0.5)] active:scale-90"
            >
              {isAiLoading ? <RefreshCw className="animate-spin" size={40}/> : <Rocket size={40}/>}
            </button>
          </div>
        </div>

        {/* RESULTS PANEL */}
        {extractedPost && (
          <div className="bg-slate-950/60 border border-indigo-500/20 bg-indigo-600/5 rounded-[80px] p-24 animate-in slide-in-from-top-20 duration-1000 space-y-20 shadow-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/5 blur-[120px] pointer-events-none"></div>
            
            <div className="flex flex-col xl:flex-row justify-between items-start gap-12 relative z-10">
              <div className="flex items-center gap-8">
                <Sparkles className="text-indigo-500 animate-pulse" size={48}/>
                <h4 className="text-6xl font-black text-white tracking-tighter uppercase italic">SYNTESIZED <span className="text-indigo-500">NODE.</span></h4>
              </div>
              <button onClick={commitPost} className="px-16 py-8 bg-white text-black rounded-[40px] text-sm font-black uppercase tracking-[0.3em] flex items-center gap-6 shadow-[0_30px_60px_rgba(255,255,255,0.1)] hover:bg-indigo-600 hover:text-white transition-all active:scale-95"><CheckCircle size={28}/> COMMIT TO REGISTRY</button>
            </div>
            
            <div className="grid xl:grid-cols-3 gap-10 relative z-10">
              {[
                { l: 'Title Node', v: extractedPost.title },
                { l: 'Organization', v: extractedPost.org },
                { l: 'Qualifications', v: extractedPost.qualification },
                { l: 'Deadline', v: extractedPost.lastDate },
                { l: 'Salary Est.', v: extractedPost.salaryRange },
                { l: 'Category', v: extractedPost.category }
              ].map(item => (
                <div key={item.l} className="space-y-4 p-10 bg-black border border-white/5 rounded-[48px] hover:border-indigo-500/30 transition-all shadow-xl">
                  <p className="text-[10px] font-black uppercase text-indigo-500 tracking-[0.6em]">{item.l}</p>
                  <p className="text-2xl font-black text-white leading-tight italic uppercase">{item.v}</p>
                </div>
              ))}
            </div>

            <div className="p-16 bg-black border border-white/5 rounded-[64px] space-y-8 relative z-10 shadow-inner">
               <div className="flex justify-between items-center">
                 <p className="text-[10px] font-black uppercase text-slate-700 tracking-[0.6em]">Neural Summary Narrative</p>
                 <span className="px-6 py-2 bg-indigo-600/10 text-indigo-500 rounded-full text-[10px] font-black uppercase border border-indigo-600/20">Trust Score: {extractedPost.matchScore}%</span>
               </div>
               <p className="text-4xl font-black italic leading-[1.2] text-slate-300">"{extractedPost.summary}"</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
