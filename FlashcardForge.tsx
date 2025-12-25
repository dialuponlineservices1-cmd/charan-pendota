
import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { BookOpen, Sparkles, RefreshCw, ChevronLeft, ChevronRight, Layers, GraduationCap } from 'lucide-react';

export const FlashcardForge = ({ db }: any) => {
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [cards, setCards] = useState<{q: string, a: string}[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(false);

  const forgeCards = async () => {
    if (!selectedJob) return;
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Create 5 study flashcards (Question & Answer) based on this job notification to help a student memorize key details: ${selectedJob.fullContent}. Return JSON array of {q, a}.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                q: { type: Type.STRING },
                a: { type: Type.STRING }
              }
            }
          }
        }
      });
      setCards(JSON.parse(response.text));
      setCurrentIndex(0);
      setIsFlipped(false);
    } catch (e) {
      alert("Forge failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-16 animate-in fade-in duration-700">
      <div className="flex items-center justify-between border-b border-white/5 pb-12">
        <div>
          <h2 className="text-7xl font-black tracking-tighter text-white uppercase italic">Card<span className="text-indigo-500">Forge</span></h2>
          <p className="text-[11px] font-black uppercase text-slate-500 tracking-[0.5em] mt-3">Active Recall Synthesis Module</p>
        </div>
        <div className="flex gap-4">
           <select 
              className="bg-white/5 border border-white/10 rounded-2xl px-8 py-4 text-white font-black text-xs outline-none focus:border-indigo-600 transition-all appearance-none"
              onChange={(e) => setSelectedJob(db.jobs.find((j:any) => j.id === e.target.value))}
            >
              <option value="">Select Target Post...</option>
              {db.jobs.map((j: any) => <option key={j.id} value={j.id}>{j.title}</option>)}
            </select>
            <button onClick={forgeCards} disabled={loading || !selectedJob} className="bg-indigo-600 text-white font-black uppercase tracking-widest px-8 py-4 rounded-2xl hover:bg-indigo-500 transition-all disabled:opacity-50">
              {loading ? <RefreshCw className="animate-spin"/> : <Sparkles size={20}/>}
            </button>
        </div>
      </div>

      {cards.length > 0 ? (
        <div className="space-y-12">
          <div className="perspective-1000 w-full max-w-3xl mx-auto h-[400px]" onClick={() => setIsFlipped(!isFlipped)}>
            <div className={`relative w-full h-full transition-all duration-700 transform-style-3d cursor-pointer ${isFlipped ? 'rotate-y-180' : ''}`}>
              {/* FRONT */}
              <div className="absolute inset-0 backface-hidden bg-slate-950 border-2 border-indigo-500/30 rounded-[64px] flex flex-col items-center justify-center p-20 text-center space-y-8 shadow-2xl">
                <span className="text-[10px] font-black uppercase text-indigo-500 tracking-[0.5em]">Question {currentIndex + 1}</span>
                <p className="text-3xl font-black text-white leading-tight">{cards[currentIndex].q}</p>
                <p className="text-xs font-bold text-slate-700 uppercase tracking-widest">Click to Flip</p>
              </div>
              {/* BACK */}
              <div className="absolute inset-0 backface-hidden bg-indigo-600 border-2 border-indigo-400 rounded-[64px] flex flex-col items-center justify-center p-20 text-center space-y-8 shadow-2xl rotate-y-180">
                <span className="text-[10px] font-black uppercase text-white/50 tracking-[0.5em]">Answer Insight</span>
                <p className="text-3xl font-black text-white leading-tight">{cards[currentIndex].a}</p>
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-white"><GraduationCap size={32}/></div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-10">
            <button 
              disabled={currentIndex === 0}
              onClick={() => {setCurrentIndex(currentIndex-1); setIsFlipped(false);}}
              className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center text-white hover:bg-white/10 disabled:opacity-20 transition-all"
            >
              <ChevronLeft size={32}/>
            </button>
            <span className="text-2xl font-black text-white tracking-widest">{currentIndex + 1} / {cards.length}</span>
            <button 
              disabled={currentIndex === cards.length - 1}
              onClick={() => {setCurrentIndex(currentIndex+1); setIsFlipped(false);}}
              className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center text-white hover:bg-white/10 disabled:opacity-20 transition-all"
            >
              <ChevronRight size={32}/>
            </button>
          </div>
        </div>
      ) : (
        <div className="h-[400px] border-2 border-dashed border-white/5 rounded-[64px] flex flex-col items-center justify-center text-center p-20 space-y-8 opacity-30">
          <Layers size={80} className="text-slate-800"/>
          <p className="text-2xl font-black text-slate-700 uppercase tracking-widest">Awaiting Registry Selection<br/>to Forge Study Cards</p>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}} />
    </div>
  );
};
