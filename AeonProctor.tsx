
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { Video, X, Mic, RefreshCw, Brain, Zap, Target, ShieldCheck, Activity, Eye, Scan } from 'lucide-react';

export const AeonProctor = () => {
  const [isLive, setIsLive] = useState(false);
  const [status, setStatus] = useState('CORE_READY');
  const [analysis, setAnalysis] = useState('Watching micro-expressions...');
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const nextStartTimeRef = useRef(0);
  const audioContextRef = useRef<AudioContext | null>(null);

  const startSession = async () => {
    setIsLive(true);
    setStatus('SYNCING_BIOMETRY...');

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    const outputCtx = audioContextRef.current;
    
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
    if (videoRef.current) videoRef.current.srcObject = stream;

    const sessionPromise = ai.live.connect({
      model: 'gemini-2.5-flash-native-audio-preview-09-2025',
      callbacks: {
        onopen: () => {
          setStatus('AEON_OVERLORD_ONLINE');
          // Start Video Streaming to AI
          setInterval(() => {
             if (!videoRef.current || !canvasRef.current) return;
             const ctx = canvasRef.current.getContext('2d');
             if (!ctx) return;
             canvasRef.current.width = 320;
             canvasRef.current.height = 240;
             ctx.drawImage(videoRef.current, 0, 0, 320, 240);
             canvasRef.current.toBlob(async (blob) => {
               if (blob) {
                 const reader = new FileReader();
                 reader.onloadend = () => {
                    const base64 = (reader.result as string).split(',')[1];
                    sessionPromise.then(s => s.sendRealtimeInput({ media: { data: base64, mimeType: 'image/jpeg' } }));
                 };
                 reader.readAsDataURL(blob);
               }
             }, 'image/jpeg', 0.5);
          }, 1000);
        },
        onmessage: async (message: LiveServerMessage) => {
          const audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
          if (audio) {
             const buffer = await decodeAudio(audio, outputCtx);
             const source = outputCtx.createBufferSource();
             source.buffer = buffer;
             source.connect(outputCtx.destination);
             nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputCtx.currentTime);
             source.start(nextStartTimeRef.current);
             nextStartTimeRef.current += buffer.duration;
          }
        },
        onerror: () => setStatus('CONNECTION_SEVERED'),
        onclose: () => setIsLive(false),
      },
      config: {
        responseModalities: [Modality.AUDIO],
        systemInstruction: "You are the Aeon Proctor, the world's most advanced recruitment AI. You are interviewing a candidate for a high-level government role. Use the video stream to comment on their confidence, posture, and eye contact. Be firm but fair. If they look away, call them out. Ask 1 question at a time.",
      }
    });
  };

  const decodeAudio = async (base64: string, ctx: AudioContext) => {
    const binary = atob(base64);
    const bytes = new Int16Array(binary.length / 2);
    const view = new DataView(new Uint8Array(Array.from(binary, c => c.charCodeAt(0))).buffer);
    for (let i = 0; i < bytes.length; i++) bytes[i] = view.getInt16(i * 2, true);
    const buffer = ctx.createBuffer(1, bytes.length, 24000);
    const channel = buffer.getChannelData(0);
    for (let i = 0; i < bytes.length; i++) channel[i] = bytes[i] / 32768;
    return buffer;
  };

  return (
    <div className="space-y-200 animate-in fade-in duration-1000 pb-[1000px]">
      <div className="text-center space-y-48">
        <h2 className="text-[350px] font-black italic tracking-tighter text-white uppercase leading-[0.35] italic">AEON <br/><span className="text-yellow-600">PROCTOR.</span></h2>
        <p className="text-[56px] font-black text-slate-900 uppercase tracking-[4em] italic leading-none">LIVE_VIDEO_SENTIENCE_ENGINE_V13</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-150">
         {/* THE VIDEO HUD */}
         <div className="lg:col-span-8 bg-[#050505] border-[40px] border-white/5 rounded-[1200px] p-100 h-[2200px] relative overflow-hidden shadow-4xl group">
            <div className="absolute inset-0 bg-yellow-600/5 blur-[500px] animate-pulse"></div>
            
            <div className="relative w-full h-full flex items-center justify-center">
               <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover rounded-[1000px] grayscale brightness-50 group-hover:grayscale-0 transition-all duration-[2000ms] shadow-inner" />
               <canvas ref={canvasRef} className="hidden" />
               
               {/* OVERLAY HUD */}
               <div className="absolute inset-0 p-200 flex flex-col justify-between pointer-events-none">
                  <div className="flex justify-between items-start">
                     <div className="bg-black/60 border-[10px] border-yellow-600/20 px-80 py-32 rounded-full backdrop-blur-3xl">
                        <span className="text-4xl font-black text-yellow-600 italic tracking-[1em]">{status}</span>
                     </div>
                     <div className="w-48 h-48 bg-red-600 rounded-full animate-ping"></div>
                  </div>
                  
                  <div className="space-y-48">
                     <div className="bg-black/80 border-[10px] border-white/10 p-100 rounded-[500px] backdrop-blur-4xl shadow-4xl">
                        <h4 className="text-5xl font-black text-yellow-600 uppercase tracking-[1.5em] mb-32">AI_THOUGHT_STREAM</h4>
                        <p className="text-8xl font-bold text-white italic leading-tight uppercase">"{analysis}"</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* CONTROL PANEL */}
         <div className="lg:col-span-4 space-y-120">
            <div className="bg-black border-[25px] border-white/5 rounded-[600px] p-150 space-y-100 shadow-4xl relative overflow-hidden group">
               <div className="absolute inset-0 bg-yellow-600/5 animate-pulse"></div>
               <Scan size={200} className="text-yellow-600 mx-auto animate-bounce"/>
               <h3 className="text-7xl font-black italic uppercase text-white tracking-tighter leading-none">BIOMETRIC_LOCK</h3>
               <button onClick={startSession} className="w-full py-80 bg-white text-black rounded-full font-black uppercase text-[48px] tracking-[1.5em] shadow-4xl italic border-[20px] border-black hover:bg-yellow-600 hover:text-white transition-all active:scale-95">
                  {isLive ? 'RE-SYNC_CORE' : 'INIT_AEON'}
               </button>
            </div>

            <div className="bg-[#050505] border-[15px] border-white/5 p-120 rounded-[500px] space-y-80 text-center shadow-4xl">
               <div className="flex items-center justify-center gap-12 text-yellow-600">
                  <Brain size={64}/> <h5 className="text-[32px] font-black uppercase tracking-[1em]">SENTIENCE_STATS</h5>
               </div>
               <div className="space-y-48">
                  <div className="flex justify-between items-center px-48 border-b border-white/5 pb-24">
                     <span className="text-4xl font-bold text-slate-700">CONFIDENCE</span>
                     <span className="text-6xl font-black text-white italic">84%</span>
                  </div>
                  <div className="flex justify-between items-center px-48 border-b border-white/5 pb-24">
                     <span className="text-4xl font-bold text-slate-700">EYE_CONTACT</span>
                     <span className="text-6xl font-black text-emerald-500 italic">SYNCED</span>
                  </div>
                  <div className="flex justify-between items-center px-48">
                     <span className="text-4xl font-bold text-slate-700">PULSE_EST</span>
                     <span className="text-6xl font-black text-red-500 italic">72 BPM</span>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};
