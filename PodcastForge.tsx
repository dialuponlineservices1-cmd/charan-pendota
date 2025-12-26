
import React, { useState, useRef } from 'react';
import { GoogleGenAI, Modality } from "@google/genai";
import { Headphones, Play, Pause, RefreshCw, Sparkles, User, Mic, Radio, Download, Crown, Ghost } from 'lucide-react';

export const PodcastForge = ({ db }: any) => {
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [isForging, setIsForging] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  function decode(base64: string) {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
    return bytes;
  }

  async function decodeAudioData(data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number): Promise<AudioBuffer> {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < frameCount; i++) channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
    return buffer;
  }

  const forgePodcast = async () => {
    if (!selectedJob) return;
    setIsForging(true);
    setAudioUrl(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `TTS this 2-person dialogue about ${selectedJob.title_en} recruitment:
      Joe (Expert): "Welcome back. Today we're looking at a huge opening in ${selectedJob.org}."
      Jane (Aspirant): "I've heard students are worried about the eligibility. Is it degree only?"
      Joe: "Exactly Jane. Any degree is fine. The deadline is ${selectedJob.lastDate}. High competition expected."
      Jane: "What about the salary?"
      Joe: "Starts around 45k. It's a gold node. Don't miss it."`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: prompt }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            multiSpeakerVoiceConfig: {
              speakerVoiceConfigs: [
                { speaker: 'Joe', voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } },
                { speaker: 'Jane', voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Puck' } } }
              ]
            }
          }
        }
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        const decodedBytes = decode(base64Audio);
        const buffer = await decodeAudioData(decodedBytes, audioContext, 24000, 1);
        
        const wavData = audioBufferToWav(buffer);
        const blob = new Blob([wavData], { type: 'audio/wav' });
        setAudioUrl(URL.createObjectURL(blob));
      }
    } catch (e) {
      alert("OMEGA TTS SYNC FAILED.");
    } finally {
      setIsForging(false);
    }
  };

  const audioBufferToWav = (buffer: AudioBuffer) => {
    let numOfChan = buffer.numberOfChannels,
        length = buffer.length * numOfChan * 2 + 44,
        bufferArr = new ArrayBuffer(length),
        view = new DataView(bufferArr),
        pos = 0;
    const setUint32 = (data: any) => { view.setUint32(pos, data, true); pos += 4; }
    const setUint16 = (data: any) => { view.setUint16(pos, data, true); pos += 2; }
    setUint32(0x46464952); setUint32(length - 8); setUint32(0x45564157); setUint32(0x20746d66);
    setUint32(16); setUint16(1); setUint16(numOfChan); setUint32(buffer.sampleRate);
    setUint32(buffer.sampleRate * 2 * numOfChan); setUint16(numOfChan * 2); setUint16(16);
    setUint32(0x61746164); setUint32(length - pos - 4);
    for(let i = 0; i < buffer.length; i++) {
        for(let channel = 0; channel < numOfChan; channel++) {
            let sample = Math.max(-1, Math.min(1, buffer.getChannelData(channel)[i]));
            view.setInt16(pos, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true);
            pos += 2;
        }
    }
    return bufferArr;
  };

  return (
    <div className="max-w-[4000px] mx-auto space-y-200 animate-in fade-in duration-1000 pb-[1000px]">
      <div className="text-center space-y-24">
         <h2 className="text-[250px] font-black italic tracking-tighter text-white uppercase leading-[0.35] italic">PODCAST <br/><span className="text-emerald-500">FORGE.</span></h2>
         <p className="text-[32px] font-black text-slate-900 uppercase tracking-[4em] italic leading-none mt-32">V11_MULTI_SPEAKER_SYNTHESIS</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-150 items-start">
        <div className="lg:col-span-5 space-y-100">
          <div className="bg-black border-[25px] border-white/5 rounded-[500px] p-120 space-y-100 shadow-4xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-48 opacity-[0.05] rotate-12"><Crown size={800}/></div>
            <div className="space-y-48 relative z-10">
              <label className="text-[28px] font-black text-emerald-500 uppercase tracking-[2.5em] italic">SELECT_REC_NODE</label>
              <select className="w-full bg-black border-[12px] border-white/10 rounded-[200px] px-80 py-48 text-white font-black outline-none focus:border-emerald-500 transition-all appearance-none text-5xl italic" onChange={(e) => setSelectedJob(db.jobs.find((j: any) => j.id == e.target.value))}>
                <option value="">CHOOSE_CONTEXT...</option>
                {db.jobs.map((j: any) => <option key={j.id} value={j.id}>{j.title_en}</option>)}
              </select>
            </div>
            <button onClick={forgePodcast} disabled={isForging || !selectedJob} className="w-full bg-emerald-500 hover:bg-white hover:text-black text-white font-black uppercase tracking-[1em] py-48 rounded-[300px] transition-all shadow-4xl flex items-center justify-center gap-48 text-[48px] disabled:opacity-30 border-[25px] border-black italic active:scale-95">
              {isForging ? <RefreshCw className="animate-spin" size={100}/> : <Sparkles size={100}/>} {isForging ? 'SYNTHESIZING...' : 'FORGE_DUAL_CAST'}
            </button>
          </div>
        </div>

        <div className="lg:col-span-7">
           <div className="bg-black border-[30px] border-white/5 rounded-[600px] p-150 h-[1500px] flex flex-col items-center justify-center relative overflow-hidden shadow-4xl">
              {audioUrl ? (
                <div className="w-full space-y-120 animate-in zoom-in-95 duration-1000">
                   <audio ref={audioRef} src={audioUrl} className="hidden" onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} />
                   <div className="flex flex-col items-center gap-64">
                      <button onClick={() => audioRef.current?.paused ? audioRef.current?.play() : audioRef.current?.pause()} className="w-250 h-250 bg-white text-black rounded-full flex items-center justify-center shadow-4xl hover:bg-emerald-500 hover:text-white transition-all border-[35px] border-black active:scale-90">
                         {isPlaying ? <Pause size={140} fill="currentColor"/> : <Play size={140} fill="currentColor" className="ml-16"/>}
                      </button>
                      <h4 className="text-8xl font-black text-white italic uppercase tracking-tighter italic">SUPREME_CAST_V1.wav</h4>
                      <a href={audioUrl} download="SupremePodcast.wav" className="px-100 py-32 bg-white/5 border-[10px] border-white/10 rounded-full text-white font-black uppercase tracking-[1.5em] hover:bg-white hover:text-black transition-all italic flex items-center gap-32"><Download size={64}/> EXPORT_WAV</a>
                   </div>
                </div>
              ) : (
                <div className="text-center space-y-100 p-120 opacity-30">
                  <Headphones size={200} className="text-slate-900 mx-auto"/>
                  <p className="text-[120px] font-black text-slate-950 uppercase tracking-[0.5em] leading-none italic">AETHER_IDLE.</p>
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};
