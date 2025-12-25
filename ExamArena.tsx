
import React, { useState, useEffect } from 'react';
import { Timer, ArrowRight, ArrowLeft, ShieldCheck, Award, X, RotateCcw } from 'lucide-react';

export const ExamArena = ({ exam, onClose, onFinish }: any) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<any>({});
  const [timeLeft, setTimeLeft] = useState(exam.duration * 60);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (isFinished || timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((t: number) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isFinished]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec < 10 ? '0' : ''}${sec}`;
  };

  const handleSelect = (optIdx: number) => {
    setAnswers({ ...answers, [currentIdx]: optIdx });
  };

  const calculateScore = () => {
    let s = 0;
    exam.questions.forEach((q: any, i: number) => {
      if (answers[i] === q.correct) s++;
    });
    setScore(s);
    setIsFinished(true);
  };

  if (isFinished) {
    return (
      <div className="fixed inset-0 z-[5000] bg-black flex items-center justify-center p-12 overflow-y-auto">
         <div className="bg-[#050505] border border-white/10 rounded-[100px] w-full max-w-4xl p-24 text-center space-y-16 animate-in zoom-in-95 shadow-4xl">
            <div className="w-40 h-40 bg-emerald-600 rounded-[50px] flex items-center justify-center mx-auto shadow-4xl animate-bounce"><Award size={80} className="text-white"/></div>
            <div className="space-y-6">
               <h2 className="text-8xl font-black italic tracking-tighter text-white uppercase leading-none">EXAM <span className="text-emerald-500">COMPLETE.</span></h2>
               <p className="text-3xl font-medium text-slate-500 italic">Mastery Analysis Synchronized.</p>
            </div>
            <div className="grid grid-cols-2 gap-12 max-w-2xl mx-auto">
               <div className="bg-white/5 p-12 rounded-[64px] border border-white/10 space-y-4">
                  <p className="text-[12px] font-black text-slate-700 uppercase tracking-widest">Mastery Score</p>
                  <h4 className="text-7xl font-black text-emerald-500 italic">{score} / {exam.questions.length}</h4>
               </div>
               <div className="bg-white/5 p-12 rounded-[64px] border border-white/10 space-y-4">
                  <p className="text-[12px] font-black text-slate-700 uppercase tracking-widest">Rank Index</p>
                  <h4 className="text-7xl font-black text-indigo-500 italic">TOP 1%</h4>
               </div>
            </div>
            <button onClick={() => { onFinish(score); onClose(); }} className="w-full bg-emerald-600 py-10 rounded-[50px] font-black uppercase tracking-widest text-sm shadow-4xl hover:bg-white hover:text-emerald-600 transition-all">EXIT TO SOVEREIGN REGISTRY</button>
         </div>
      </div>
    );
  }

  const q = exam.questions[currentIdx];

  return (
    <div className="fixed inset-0 z-[5000] bg-[#000] text-white font-sans flex flex-col selection:bg-indigo-600 overflow-hidden">
       {/* ARENA HEADER */}
       <header className="h-24 bg-[#050505] border-b border-white/10 px-12 flex items-center justify-between shrink-0 shadow-4xl">
          <div className="flex items-center gap-6">
             <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-3xl"><ShieldCheck size={28}/></div>
             <h2 className="text-2xl font-black uppercase tracking-tighter italic">{exam.title}</h2>
          </div>
          <div className="flex items-center gap-12">
             <div className="flex items-center gap-6 bg-red-500/10 border border-red-500/20 px-8 py-3 rounded-full">
                <Timer size={24} className="text-red-500 animate-pulse"/>
                <span className="text-2xl font-black text-white italic tracking-tighter">{formatTime(timeLeft)}</span>
             </div>
             <button onClick={onClose} className="p-4 bg-white/5 rounded-full hover:bg-red-500 transition-all"><X size={24}/></button>
          </div>
       </header>

       <main className="flex-1 flex flex-col items-center justify-center p-12 max-w-6xl mx-auto w-full">
          <div className="w-full space-y-16 animate-in slide-in-from-bottom-20 duration-700">
             <div className="space-y-8">
                <span className="text-[12px] font-black text-indigo-500 uppercase tracking-[0.5em] italic">Neural Inquiry {currentIdx + 1} / {exam.questions.length}</span>
                <h3 className="text-5xl font-black text-white leading-tight italic tracking-tighter">{q.q}</h3>
             </div>

             <div className="grid md:grid-cols-2 gap-8">
                {q.options.map((opt: string, idx: number) => (
                  <button 
                    key={idx} 
                    onClick={() => handleSelect(idx)}
                    className={`p-12 rounded-[56px] text-left border-2 transition-all group flex items-center gap-8 ${answers[currentIdx] === idx ? 'bg-indigo-600 border-indigo-400 shadow-4xl' : 'bg-[#020202] border-white/5 hover:border-indigo-500/50'}`}
                  >
                     <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-lg ${answers[currentIdx] === idx ? 'bg-white text-indigo-600' : 'bg-white/5 text-slate-700'}`}>{String.fromCharCode(65 + idx)}</div>
                     <span className={`text-2xl font-bold italic tracking-tighter ${answers[currentIdx] === idx ? 'text-white' : 'text-slate-400'}`}>{opt}</span>
                  </button>
                ))}
             </div>
          </div>
       </main>

       {/* ARENA FOOTER */}
       <footer className="h-32 bg-[#050505] border-t border-white/10 px-12 flex items-center justify-between shrink-0 shadow-4xl">
          <button 
            disabled={currentIdx === 0} 
            onClick={() => setCurrentIdx(currentIdx - 1)} 
            className="px-12 py-6 bg-white/5 rounded-full font-black uppercase tracking-widest text-[11px] hover:bg-white/10 disabled:opacity-10 transition-all flex items-center gap-4"
          >
            <ArrowLeft size={16}/> RETRACE
          </button>
          <div className="flex items-center gap-6">
             {exam.questions.map((_: any, i: number) => (
               <div key={i} className={`w-3 h-3 rounded-full transition-all ${answers[i] !== undefined ? 'bg-emerald-500 shadow-emerald-500/50 scale-125' : 'bg-slate-800'}`}></div>
             ))}
          </div>
          {currentIdx === exam.questions.length - 1 ? (
            <button onClick={calculateScore} className="px-16 py-7 bg-emerald-600 text-white rounded-[40px] font-black uppercase tracking-[0.3em] text-[11px] shadow-4xl hover:bg-white hover:text-emerald-600 transition-all flex items-center gap-6">
              SYNCHRONIZE RESULT <ShieldCheck size={20}/>
            </button>
          ) : (
            <button onClick={() => setCurrentIdx(currentIdx + 1)} className="px-12 py-6 bg-indigo-600 rounded-full font-black uppercase tracking-widest text-[11px] shadow-3xl hover:bg-indigo-500 transition-all flex items-center gap-4">
              ADVANCE <ArrowRight size={16}/>
            </button>
          )}
       </footer>
    </div>
  );
};
