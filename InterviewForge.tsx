
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Headphones, Radio, Mic, Zap, RefreshCw, Sparkles, BrainCircuit, Play } from 'lucide-react';

export const InterviewForge = ({ db }: any) => {
  const [status, setStatus] = useState<'idle' | 'running' | 'analyzing'>('idle');
  const [question, setQuestion] = useState('Initialize neural bridge to begin session.');
  const [feedback, setFeedback] = useState<any>(null);

  const startSession = async () => {
    setStatus('running');
    setQuestion("Thinking...");
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: "You are a tough government job interviewer. Ask 1 challenging, high-pressure question to an aspirant for a Deputy Collector role in Telangana. Short and sharp.",
      });
      setQuestion(response.text || '');
    } catch (e) {
      alert("Neural Bridge Offline.");
      setStatus('idle');
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-16 animate-in fade-in duration-1000">
      <div className="text-center space-y-4">
        <h2 className="text-8xl font-black tracking-tighter text-white uppercase italic">INTERVIEW <span className="text-indigo-500">FORGE.</span></h2>
        <p className="text-slate-500 font-black uppercase text-[11px] tracking-[0.7em]">Deep Reasoning Behavioral Simulator</p>
      </div>

      <div className="bg-slate-950 border border-white/5 rounded-[72px] p-24 text-center space-y-16 relative overflow-hidden shadow-3xl">
        <div className="absolute top-0 right-0 p-10 opacity-5 rotate-12"><BrainCircuit size={400}/></div>
        
        <div className="relative z-10 space-y-12">
          <div className="flex justify-center gap-4">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className={`w-3 rounded-full transition-all duration-300 ${status === 'running' ? 'bg-indigo-500 animate-bounce' : 'bg-slate-800'}`} style={{ animationDelay: `${i * 0.1}s`, height: status === 'running' ? `${Math.random() * 80 + 20}px` : '40px' }}></div>
            ))}
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.5em]">Neural Input Stream</h4>
            <p className={`text-4xl font-black text-white italic max-w-3xl mx-auto leading-tight transition-all ${status === 'idle' ? 'opacity-30' : 'opacity-100'}`}>
              "{question}"
            </p>
          </div>

          {status === 'idle' ? (
            <button onClick={startSession} className="bg-indigo-600 text-white px-16 py-8 rounded-[48px] font-black uppercase tracking-[0.4em] text-sm shadow-[0_30px_60px_rgba(79,70,229,0.4)] hover:bg-indigo-500 transition-all active:scale-95 flex items-center justify-center gap-4 mx-auto">
              <Play fill="currentColor" size={24}/> INITIALIZE NODE
            </button>
          ) : (
            <div className="flex flex-col items-center gap-8">
               <button className="w-32 h-32 bg-red-500 rounded-full flex items-center justify-center text-white shadow-3xl animate-pulse">
                  <Mic size={48}/>
               </button>
               <p className="text-[10px] font-black text-slate-700 uppercase tracking-widest">Listening to response telemetry...</p>
            </div>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-10">
        {[
          { l: "Pressure IQ", v: "High Stress", d: "Simulation Engine 4.0" },
          { l: "Native Script", v: "Bilingual", d: "Telugu/English Context" },
          { l: "Mastery Sync", v: "Real-time", d: "Gemini 3 Pro Neural" }
        ].map((s, i) => (
          <div key={i} className="bg-slate-950/40 border border-white/5 p-12 rounded-[48px] space-y-4 hover:border-indigo-500 transition-all group">
             <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{s.l}</p>
             <h4 className="text-3xl font-black text-white italic uppercase group-hover:text-indigo-400 transition-all">{s.v}</h4>
             <p className="text-[9px] font-bold text-slate-800 uppercase mt-4">{s.d}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
