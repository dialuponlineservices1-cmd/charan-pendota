
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { Mic, MicOff, Radio, Sparkles, Brain, ShieldCheck, Activity, Terminal, Zap } from 'lucide-react';

export const SovereignVoice = ({ setView }: any) => {
  const [isActive, setIsActive] = useState(false);
  const [transcript, setTranscript] = useState('Ready for vocal command node synchronization...');
  const audioContextRef = useRef<AudioContext | null>(null);

  const startVoiceCommand = async () => {
    setIsActive(true);
    setTranscript('LISTENING_FOR_EMPEROR...');
    
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    const sessionPromise = ai.live.connect({
      model: 'gemini-2.5-flash-native-audio-preview-09-2025',
      callbacks: {
        onopen: () => {
          const source = inputCtx.createMediaStreamSource(stream);
          const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
          scriptProcessor.onaudioprocess = (e) => {
            const inputData = e.inputBuffer.getChannelData(0);
            const l = inputData.length;
            const int16 = new Int16Array(l);
            for (let i = 0; i < l; i++) int16[i] = inputData[i] * 32768;
            const pcmBlob = {
              data: btoa(String.fromCharCode(...new Uint8Array(int16.buffer))),
              mimeType: 'audio/pcm;rate=16000',
            };
            sessionPromise.then(s => s.sendRealtimeInput({ media: pcmBlob }));
          };
          source.connect(scriptProcessor);
          scriptProcessor.connect(inputCtx.destination);
        },
        onmessage: async (message: LiveServerMessage) => {
          if (message.serverContent?.outputTranscription) {
            const cmd = message.serverContent.outputTranscription.text.toLowerCase();
            setTranscript(cmd);
            if (cmd.includes('dashboard')) setView('dashboard');
            if (cmd.includes('oracle')) setView('oracle');
            if (cmd.includes('factory')) setView('factory');
            if (cmd.includes('pulse')) setView('pulse');
          }
        },
        onerror: () => setIsActive(false),
        onclose: () => setIsActive(false),
      },
      config: {
        responseModalities: [Modality.AUDIO],
        systemInstruction: "You are the Sovereign Voice Admin Assistant. Listen to the user's command. If they say a module name like 'Oracle', 'Dashboard', 'Factory', 'Pulse', confirm it clearly in a robotic voice. Act as a high-level imperial security system.",
        inputAudioTranscription: {},
      }
    });
  };

  return (
    <div className="space-y-300 animate-in fade-in duration-1000 pb-[1000px]">
      <div className="text-center space-y-48">
        <h2 className="text-[350px] font-black italic tracking-tighter text-white uppercase leading-[0.35] italic">SOVEREIGN <br/><span className="text-cyan-500">VOICE.</span></h2>
        <p className="text-[56px] font-black text-slate-900 uppercase tracking-[4em] italic leading-none">VOCAL_COMMAND_INTERFACE_V15</p>
      </div>

      <div className="bg-[#050505] border-[40px] border-white/5 rounded-[1200px] p-250 text-center space-y-150 shadow-4xl relative overflow-hidden group">
         <div className="absolute inset-0 bg-cyan-600/5 animate-pulse"></div>
         <div className="flex justify-center gap-12 h-64 items-center">
            {[1,2,3,4,5,6,7,8,9,10].map(i => (
               <div key={i} className={`w-6 rounded-full transition-all duration-300 ${isActive ? 'bg-cyan-500 animate-bounce' : 'bg-slate-900'}`} style={{ animationDelay: `${i * 0.1}s`, height: isActive ? `${Math.random() * 100}%` : '20%' }}></div>
            ))}
         </div>
         
         <div className="bg-black/80 border-[10px] border-white/10 p-100 rounded-[500px] backdrop-blur-4xl shadow-4xl">
            <h4 className="text-5xl font-black text-cyan-600 uppercase tracking-[1.5em] mb-32">LIVE_TRANSCRIPT</h4>
            <p className="text-[120px] font-black text-white italic tracking-tighter uppercase leading-none">"{transcript}"</p>
         </div>

         <button onClick={startVoiceCommand} className={`w-full py-100 rounded-full font-black uppercase text-[64px] tracking-[2em] shadow-[0_0_5000px_cyan] italic border-[40px] border-black transition-all ${isActive ? 'bg-red-600 text-white animate-pulse' : 'bg-white text-black hover:bg-cyan-600 hover:text-white'}`}>
            {isActive ? 'LISTENING_PRIME' : 'INIT_VOICE_LINK'}
         </button>
      </div>

      <div className="grid md:grid-cols-3 gap-100">
         {[
           { l: "Try saying...", v: '"Open the Oracle"', i: <Zap/> },
           { l: "Try saying...", v: '"Go to Dashboard"', i: <ShieldCheck/> },
           { l: "Try saying...", v: '"Factory Sync"', i: <Activity/> }
         ].map((s, idx) => (
           <div key={idx} className="bg-white/5 border-[10px] border-white/5 p-120 rounded-[500px] text-center space-y-48">
              <div className="text-slate-900 flex justify-center">{s.i}</div>
              <h4 className="text-4xl font-black text-slate-800 uppercase tracking-widest">{s.l}</h4>
              <p className="text-6xl font-black text-white italic leading-tight">{s.v}</p>
           </div>
         ))}
      </div>
    </div>
  );
};
