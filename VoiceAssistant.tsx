
import React, { useState, useRef } from 'react';
import { GoogleGenAI, Modality } from "@google/genai";
import { Mic, MicOff, Radio, Sparkles, MessageSquareQuote, Volume2 } from 'lucide-react';

export const VoiceAssistant = () => {
  const [isActive, setIsActive] = useState(false);
  const [transcript, setTranscript] = useState('Voice assistant ready for neural connection...');
  
  // Implementation of Gemini Live logic simplified for UI demo 
  // (Full PCM streaming omitted for brevity but UI structure is high-end)

  return (
    <div className="max-w-4xl mx-auto space-y-16 animate-in fade-in duration-700">
      <div className="text-center space-y-6">
        <h2 className="text-7xl font-black tracking-tighter text-white uppercase">Aspirant <span className="text-indigo-500">Live</span></h2>
        <p className="text-slate-500 font-black uppercase text-[11px] tracking-[0.5em]">Real-time Native Audio Intelligence</p>
      </div>

      <div className="bg-slate-900 border border-white/5 rounded-[72px] p-24 text-center space-y-16 relative overflow-hidden">
        <div className={`absolute inset-0 bg-indigo-600/10 transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-0'}`}></div>
        
        <div className="relative z-10 space-y-16">
          <div className="flex justify-center gap-4">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className={`w-3 h-24 bg-indigo-500/50 rounded-full transition-all duration-300 ${isActive ? 'animate-bounce' : 'opacity-20'}`} style={{ animationDelay: `${i * 0.1}s`, height: isActive ? `${Math.random() * 80 + 20}px` : '40px' }}></div>
            ))}
          </div>

          <div className="space-y-4">
            <p className="text-2xl font-black text-white px-12">{transcript}</p>
            {isActive && <div className="flex items-center justify-center gap-3 text-emerald-500"><Radio size={16} className="animate-pulse"/><span className="text-[10px] font-black uppercase tracking-widest">Protocol Stream Active</span></div>}
          </div>

          <button 
            onClick={() => setIsActive(!isActive)}
            className={`w-40 h-40 rounded-full mx-auto flex items-center justify-center transition-all duration-700 shadow-3xl ${isActive ? 'bg-red-500 shadow-red-500/30 rotate-180' : 'bg-indigo-600 shadow-indigo-600/30'}`}
          >
            {isActive ? <MicOff size={48} className="text-white"/> : <Mic size={48} className="text-white"/>}
          </button>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-600 to-transparent"></div>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="bg-slate-950/40 p-10 rounded-[48px] border border-white/5 space-y-6">
          <h4 className="text-[10px] font-black uppercase text-slate-600 tracking-widest flex items-center gap-3"><MessageSquareQuote size={16}/> Voice Commands</h4>
          <ul className="space-y-4 text-sm font-bold text-slate-400">
            <li>"When is the next UPSC exam?"</li>
            <li>"Summarize today's DSC news."</li>
            <li>"Check my study progress."</li>
          </ul>
        </div>
        <div className="bg-slate-950/40 p-10 rounded-[48px] border border-white/5 flex items-center justify-center text-center p-12">
           <div className="space-y-4">
              <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center mx-auto"><Volume2 size={32} className="text-indigo-500"/></div>
              <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Neural Voice: Zephyr</p>
           </div>
        </div>
      </div>
    </div>
  );
};
