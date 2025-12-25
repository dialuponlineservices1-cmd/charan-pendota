
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { X, Mic, MicOff, Radio, Sparkles, Brain, ShieldCheck, Activity, Volume2, Target } from 'lucide-react';

export const InterviewArena = ({ onClose }: any) => {
  const [isActive, setIsActive] = useState(false);
  const [status, setStatus] = useState('Awaiting Imperial Pulse...');
  const [transcript, setTranscript] = useState('');
  const [pressureScore, setPressureScore] = useState(0);
  
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const nextStartTimeRef = useRef(0);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Audio Encoding & Decoding functions as per instructions
  function decode(base64: string) {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }

  async function decodeAudioData(data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number): Promise<AudioBuffer> {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < frameCount; i++) {
        channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
      }
    }
    return buffer;
  }

  function encode(bytes: Uint8Array) {
    let binary = '';
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  const initializeArena = async () => {
    setIsActive(true);
    setStatus('Initializing Sentient Mesh...');
    
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    }
    const outputCtx = audioContextRef.current;
    const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    const sessionPromise = ai.live.connect({
      model: 'gemini-2.5-flash-native-audio-preview-09-2025',
      callbacks: {
        onopen: () => {
          setStatus('Sovereign Board Member Online.');
          const source = inputCtx.createMediaStreamSource(stream);
          const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
          scriptProcessor.onaudioprocess = (e) => {
            const inputData = e.inputBuffer.getChannelData(0);
            const l = inputData.length;
            const int16 = new Int16Array(l);
            for (let i = 0; i < l; i++) int16[i] = inputData[i] * 32768;
            const pcmBlob = {
              data: encode(new Uint8Array(int16.buffer)),
              mimeType: 'audio/pcm;rate=16000',
            };
            sessionPromise.then(session => session.sendRealtimeInput({ media: pcmBlob }));
          };
          source.connect(scriptProcessor);
          scriptProcessor.connect(inputCtx.destination);
        },
        onmessage: async (message: LiveServerMessage) => {
          if (message.serverContent?.outputTranscription) {
            setTranscript(prev => prev + ' ' + message.serverContent?.outputTranscription?.text);
          }

          const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
          if (base64Audio) {
            nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputCtx.currentTime);
            const audioBuffer = await decodeAudioData(decode(base64Audio), outputCtx, 24000, 1);
            const source = outputCtx.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(outputCtx.destination);
            source.start(nextStartTimeRef.current);
            nextStartTimeRef.current += audioBuffer.duration;
            sourcesRef.current.add(source);
            setPressureScore(prev => Math.min(100, prev + 5));
          }

          if (message.serverContent?.interrupted) {
            for (const s of sourcesRef.current) s.stop();
            sourcesRef.current.clear();
            nextStartTimeRef.current = 0;
            setPressureScore(p => Math.max(0, p - 20));
          }
        },
        onerror: () => setStatus('Sentient Node Error.'),
        onclose: () => setIsActive(false),
      },
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } },
        systemInstruction: "You are a highly professional board member conducting an elite interview for a senior government official position. Be tough, test the candidate's ethics and quick thinking. Use a firm, authoritative tone.",
        outputAudioTranscription: {},
      }
    });
  };

  return (
    <div className="fixed inset-0 z-[5000] bg-black text-white font-sans flex items-center justify-center p-12 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-950/20 to-emerald-950/20 pointer-events-none"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1500px] h-[1500px] bg-indigo-600/5 blur-[250px] animate-pulse"></div>

      <div className="bg-[#050505] border border-white/10 rounded-[120px] w-full max-w-6xl p-24 space-y-16 relative z-10 shadow-4xl flex flex-col items-center">
        <div className="w-full flex justify-between items-center mb-10">
           <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-3xl"><ShieldCheck size={28}/></div>
              <h2 className="text-3xl font-black uppercase italic tracking-tighter">SENTIENT ARENA V52</h2>
           </div>
           <button onClick={onClose} className="p-4 bg-white/5 rounded-full hover:bg-red-500 transition-all"><X size={32}/></button>
        </div>

        <div className="w-full grid lg:grid-cols-2 gap-16 flex-1 items-center">
           <div className="space-y-12">
              <div className="space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-indigo-500 tracking-[0.5em]">{status}</h3>
                 <div className="flex gap-4 h-40 items-center justify-center bg-black/40 border border-white/5 rounded-[60px] p-10">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                       <div key={i} className={`w-3 rounded-full transition-all duration-300 ${isActive ? 'bg-indigo-500 animate-bounce' : 'bg-slate-800'}`} style={{ animationDelay: `${i * 0.1}s`, height: isActive ? `${Math.random() * 100}%` : '20%' }}></div>
                    ))}
                 </div>
              </div>
              
              <div className="space-y-8">
                 <h4 className="text-[10px] font-black text-slate-700 uppercase tracking-widest flex items-center gap-4"><Activity size={16}/> PRESSURE TELEMETRY</h4>
                 <div className="h-4 bg-white/5 border border-white/10 rounded-full overflow-hidden shadow-inner">
                    <div className="h-full bg-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all duration-1000" style={{ width: `${pressureScore}%` }}></div>
                 </div>
                 <p className="text-[11px] font-black text-slate-500 uppercase tracking-[0.3em] text-center italic">Response latency: {isActive ? '24ms' : '0ms'}</p>
              </div>
           </div>

           <div className="bg-[#020202] border border-white/5 rounded-[80px] p-16 space-y-10 h-full min-h-[400px] flex flex-col relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-10 opacity-5"><Brain size={300}/></div>
              <h4 className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.5em] relative z-10 flex items-center gap-4"><Target size={16}/> LIVE TRANSCRIPT</h4>
              <div className="flex-1 overflow-y-auto scrollbar-hide text-2xl font-black italic text-slate-500 leading-relaxed relative z-10">
                 {transcript || "Board member is observing your bio-telemetry..."}
              </div>
              {!isActive && (
                <button onClick={initializeArena} className="w-full py-10 bg-indigo-600 rounded-[60px] font-black uppercase tracking-[0.6em] text-[15px] shadow-4xl hover:bg-white hover:text-black transition-all flex items-center justify-center gap-6 animate-pulse">
                   <Mic size={32}/> INITIATE SENTIENCE
                </button>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};
