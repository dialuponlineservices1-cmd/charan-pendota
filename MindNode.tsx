
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
// Added missing Target and Zap imports
import { Timer, BrainCircuit, Play, Pause, RotateCcw, Sparkles, Coffee, Lightbulb, Target, Zap } from 'lucide-react';

export const MindNode = () => {
  const [seconds, setSeconds] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [sessionType, setSessionType] = useState<'study' | 'break'>('study');
  const [aiTip, setAiTip] = useState('Initialize neural focus for peak performance.');
  const [loadingTip, setLoadingTip] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isActive && seconds > 0) {
      interval = setInterval(() => setSeconds(s => s - 1), 1000);
    } else if (seconds === 0) {
      setIsActive(false);
      alert(sessionType === 'study' ? "Session Complete! Take a neural break." : "Break over! Ready to focus?");
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const toggle = () => setIsActive(!isActive);
  const reset = () => { setIsActive(false); setSeconds(sessionType === 'study' ? 25 * 60 : 5 * 60); };

  const getAiFocusTip = async () => {
    setLoadingTip(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: "Give a 1-sentence psychologically backed productivity tip for a student preparing for government exams. Focus on cognitive science.",
      });
      setAiTip(response.text || aiTip);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingTip(false);
    }
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec < 10 ? '0' : ''}${sec}`;
  };

  return (
    <div className="max-w-5xl mx-auto space-y-16 animate-in fade-in duration-1000">
      <div className="text-center space-y-4">
        <h2 className="text-7xl font-black tracking-tighter text-white uppercase italic">Mind<span className="text-indigo-500">Node</span></h2>
        <p className="text-slate-500 font-black uppercase text-[10px] tracking-[0.6em]">Neuro-Productivity Protocol</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-16">
        <div className="bg-slate-950/40 border border-white/5 rounded-[64px] p-20 text-center space-y-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-5"><BrainCircuit size={200}/></div>
          <div className="space-y-4 relative z-10">
            <h3 className="text-[10px] font-black uppercase text-indigo-500 tracking-[0.5em]">{sessionType} Phase</h3>
            <div className="text-[120px] font-black text-white tracking-tighter leading-none">{formatTime(seconds)}</div>
          </div>
          <div className="flex justify-center gap-6 relative z-10">
            <button onClick={toggle} className={`w-24 h-24 rounded-full flex items-center justify-center transition-all ${isActive ? 'bg-amber-500 text-black' : 'bg-indigo-600 text-white shadow-2xl shadow-indigo-600/30'}`}>
              {isActive ? <Pause size={32}/> : <Play size={32} className="ml-2"/>}
            </button>
            <button onClick={reset} className="w-24 h-24 bg-white/5 text-slate-400 rounded-full flex items-center justify-center hover:bg-white/10 transition-all">
              <RotateCcw size={32}/>
            </button>
          </div>
          <div className="flex justify-center gap-4 relative z-10">
            <button onClick={() => {setSessionType('study'); setSeconds(25*60); setIsActive(false);}} className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${sessionType === 'study' ? 'bg-indigo-600 text-white' : 'bg-white/5 text-slate-500'}`}>Deep Study</button>
            <button onClick={() => {setSessionType('break'); setSeconds(5*60); setIsActive(false);}} className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${sessionType === 'break' ? 'bg-indigo-600 text-white' : 'bg-white/5 text-slate-500'}`}>Neural Break</button>
          </div>
        </div>

        <div className="space-y-10">
          <div className="bg-slate-950/40 border border-indigo-500/20 rounded-[48px] p-12 space-y-8 h-full flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-indigo-500">
                <Lightbulb size={24}/>
                <h4 className="text-xl font-black uppercase tracking-widest text-white">Cognitive Insight</h4>
              </div>
              <p className={`text-2xl font-medium leading-relaxed italic text-slate-300 transition-all ${loadingTip ? 'opacity-30 blur-sm' : 'opacity-100'}`}>
                "{aiTip}"
              </p>
            </div>
            <button onClick={getAiFocusTip} disabled={loadingTip} className="w-full bg-white/5 border border-white/10 hover:bg-white/10 text-white font-black uppercase tracking-widest py-6 rounded-[32px] transition-all flex items-center justify-center gap-4">
              {loadingTip ? <RotateCcw className="animate-spin" size={20}/> : <Sparkles size={20}/>} Refresh Intelligence
            </button>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-10">
        {[
          { l: "Focus Score", v: "84%", d: "Peak at 10:00 AM", i: <Target/> },
          { l: "Deep Work", v: "4.2 Hrs", d: "Today's Aggregate", i: <Coffee/> },
          { l: "Brain Latency", v: "24ms", d: "Processing Speed", i: <Zap/> }
        ].map((stat, i) => (
          <div key={i} className="bg-slate-950/40 border border-white/5 rounded-40px] p-10 group hover:border-indigo-500 transition-all">
             <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 text-slate-600 group-hover:text-indigo-500 transition-colors">{stat.i}</div>
             <h4 className="text-4xl font-black text-white">{stat.v}</h4>
             <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mt-2">{stat.l}</p>
             <p className="text-[10px] font-bold text-slate-700 uppercase mt-4">{stat.d}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
