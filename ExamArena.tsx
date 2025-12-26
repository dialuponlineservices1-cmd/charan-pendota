
import React, { useState, useEffect } from 'react';
import { Timer, ArrowRight, ArrowLeft, ShieldCheck, Award, X, Target, Brain, Activity } from 'lucide-react';

export const ExamArena = ({ exam, onClose }: any) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<any>({});
  const [timeLeft, setTimeLeft] = useState(exam.duration * 60);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (isFinished || timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((t: number) => t - 1), 1000);
    return () => { if (timeLeft <= 0) calculateScore(); clearInterval(timer); };
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
         <div className="bg-[#050505] border-[40px] border-blue-500/20 rounded-[1500px] w-full max-w-[12000px] p-500 text-center space-y-200 animate-in zoom-in-95 shadow-4xl">
            <div className="w-500 h-500 bg-blue-600 rounded-[150px] flex items-center justify-center mx-auto shadow-4xl animate-bounce"><Award size={250} className="text-white"/></div>
            <div className="space-y-64">
               <h2 className="text-[350px] font-black italic tracking-tighter text-white uppercase leading-none italic">ARENA <span className="text-blue-500">CONQUERED.</span></h2>
               <p className="text-[84px] font-bold text-slate-500 italic">Neural Mastery Metrics Decoded.</p>
            </div>
            <div className="grid lg:grid-cols-3 gap-150 max-w-[8000px] mx-auto pt-100">
               <div className="bg-white/5 p-150 rounded-[500px] border-[20px] border-white/5 space-y-48">
                  <p className="text-[32px] font-black text-slate-700 uppercase tracking-widest">Mastery Level</p>
                  <h4 className="text-[200px] font-black text-blue-500 italic leading-none">{((score/exam.questions.length)*100).toFixed(0)}%</h4>
               </div>
               <div className="bg-white/5 p-150 rounded-[500px] border-[20px] border-white/5 space-y-48">
                  <p className="text-[32px] font-black text-slate-700 uppercase tracking-widest">Score Data</p>
                  <h4 className="text-[200px] font-black text-white italic leading-none">{score}/{exam.questions.length}</h4>
               </div>
               <div className="bg-white/5 p-150 rounded-[500px] border-[20px] border-white/5 space-y-48">
                  <p className="text-[32px] font-black text-slate-700 uppercase tracking-widest">Global Rank</p>
                  <h4 className="text-[200px] font-black text-emerald-500 italic leading-none">TOP_1%</h4>
               </div>
            </div>
            <button onClick={onClose} className="w-full bg-blue-600 text-white py-120 rounded-full font-black uppercase tracking-[2.5em] text-[84px] shadow-4xl hover:bg-white hover:text-blue-600 transition-all italic border-[50px] border-black">EXIT_TO_REGISTRY</button>
         </div>
      </div>
    );
  }

  const q = exam.questions[currentIdx];

  return (
    <div className="fixed inset-0 z-[5000] bg-black text-white font-sans flex flex-col selection:bg-blue-600 overflow-hidden">
       {/* ARENA HEADER */}
       <header className="h-[400px] bg-[#050505] border-b-[30px] border-white/5 px-200 flex items-center justify-between shrink-0 shadow-4xl">
          <div className="flex items-center gap-100">
             <div className="w-200 h-200 bg-blue-600 rounded-[50px] flex items-center justify-center shadow-4xl"><Activity size={100}/></div>
             <div className="space-y-12">
                <h2 className="text-7xl font-black uppercase tracking-tighter italic">{exam.title}</h2>
                <p className="text-[28px] font-black text-slate-800 uppercase tracking-widest italic">NEURAL_SIMULATION_V8</p>
             </div>
          </div>
          <div className="flex items-center gap-150">
             <div className="flex items-center gap-48 bg-red-500/10 border-[15px] border-red-500/20 px-100 py-32 rounded-full">
                <Timer size={64} className="text-red-500 animate-pulse"/>
                <span className="text-7xl font-black text-white italic tracking-tighter">{formatTime(timeLeft)}</span>
             </div>
             <button onClick={onClose} className="p-48 bg-white/5 rounded-full hover:bg-red-500 transition-all shadow-4xl border-[10px] border-white/5"><X size={100}/></button>
          </div>
       </header>

       <main className="flex-1 flex flex-col lg:flex-row p-200 gap-150 overflow-hidden">
          {/* QUESTION PANEL */}
          <div className="flex-1 space-y-150 animate-in slide-in-from-bottom-50 duration-700 overflow-y-auto pr-100 scrollbar-hide">
             <div className="space-y-64">
                <span className="text-[32px] font-black text-blue-500 uppercase tracking-[1.5em] italic flex items-center gap-32"><Target size={48}/> Inquiry Node {currentIdx + 1}</span>
                <h3 className="text-[120px] md:text-[180px] font-black text-white leading-[0.95] italic tracking-tighter uppercase">{q.q}</h3>
             </div>

             <div className="grid lg:grid-cols-2 gap-100">
                {q.options.map((opt: string, idx: number) => (
                  <button 
                    key={idx} 
                    onClick={() => handleSelect(idx)}
                    className={`p-150 rounded-[1000px] text-left border-[25px] transition-all group flex items-center gap-80 ${answers[currentIdx] === idx ? 'bg-blue-600 border-blue-400 shadow-[0_0_2000px_rgba(0,191,255,0.3)]' : 'bg-[#020202] border-white/5 hover:border-blue-500/50'}`}
                  >
                     <div className={`w-200 h-200 rounded-full flex items-center justify-center font-black text-7xl ${answers[currentIdx] === idx ? 'bg-white text-blue-600' : 'bg-white/5 text-slate-900'}`}>{String.fromCharCode(65 + idx)}</div>
                     <span className={`text-7xl font-bold italic tracking-tighter ${answers[currentIdx] === idx ? 'text-white' : 'text-slate-500'}`}>{opt}</span>
                  </button>
                ))}
             </div>
          </div>

          {/* NAVIGATOR SIDEBAR */}
          <div className="w-full lg:w-[1500px] bg-[#050505] border-[25px] border-white/5 rounded-[800px] p-150 flex flex-col shadow-4xl">
             <h4 className="text-[32px] font-black text-slate-800 uppercase tracking-[1.5em] mb-100 text-center italic">NODE_MATRIX</h4>
             <div className="grid grid-cols-4 gap-48 flex-1 overflow-y-auto scrollbar-hide mb-100">
                {exam.questions.map((_: any, i: number) => (
                   <button 
                     key={i} 
                     onClick={() => setCurrentIdx(i)}
                     className={`aspect-square rounded-full flex items-center justify-center text-5xl font-black italic transition-all border-[10px] ${currentIdx === i ? 'bg-blue-600 text-white border-white scale-125 shadow-4xl' : answers[i] !== undefined ? 'bg-emerald-600 text-white border-black' : 'bg-white/5 text-slate-900 border-transparent'}`}
                   >
                      {i + 1}
                   </button>
                ))}
             </div>
             <div className="bg-black p-100 rounded-[300px] border-[10px] border-white/5 text-center space-y-48">
                <div className="flex items-center justify-between text-[24px] font-black uppercase text-slate-700 tracking-widest">
                   <span>SYNCED: {Object.keys(answers).length}</span>
                   <span>PENDING: {exam.questions.length - Object.keys(answers).length}</span>
                </div>
                <div className="h-12 bg-white/5 rounded-full overflow-hidden">
                   <div className="h-full bg-blue-600 transition-all duration-1000" style={{ width: `${(Object.keys(answers).length / exam.questions.length) * 100}%` }}></div>
                </div>
             </div>
          </div>
       </main>

       {/* ARENA FOOTER */}
       <footer className="h-[400px] bg-[#050505] border-t-[30px] border-white/5 px-200 flex items-center justify-between shrink-0 shadow-4xl relative">
          <button 
            disabled={currentIdx === 0} 
            onClick={() => setCurrentIdx(currentIdx - 1)} 
            className="px-150 py-80 bg-white/5 rounded-full font-black uppercase tracking-[1.5em] text-[48px] hover:bg-white hover:text-black disabled:opacity-10 transition-all flex items-center gap-48 italic"
          >
            <ArrowLeft size={64}/> RETRACE
          </button>

          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-48 opacity-20">
             <Brain size={150} className="text-blue-500 animate-pulse"/>
             <span className="text-[120px] font-black italic tracking-tighter">INFINITY_SYNC</span>
          </div>

          {currentIdx === exam.questions.length - 1 ? (
            <button onClick={calculateScore} className="px-200 py-100 bg-emerald-600 text-white rounded-full font-black uppercase tracking-[2em] text-[64px] shadow-4xl hover:bg-white hover:text-emerald-600 transition-all flex items-center gap-64 italic border-[25px] border-black">
              COMMIT_RESULT <ShieldCheck size={84}/>
            </button>
          ) : (
            <button onClick={() => setCurrentIdx(currentIdx + 1)} className="px-150 py-80 bg-blue-600 text-white rounded-full font-black uppercase tracking-[1.5em] text-[48px] shadow-[0_0_2000px_blue] hover:bg-white hover:text-blue-600 transition-all flex items-center gap-48 italic">
              ADVANCE <ArrowRight size={64}/>
            </button>
          )}
       </footer>
    </div>
  );
};
