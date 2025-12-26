
import React, { useState } from 'react';
import { BookOpenCheck, Plus, Trash2, Edit3, FolderSync, Database, Link, Save, X, Globe, Sparkles, Brain, ListChecks } from 'lucide-react';

export const ExamHub = ({ db, updateDB }: any) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingExam, setEditingExam] = useState<any>(null);

  const handleSave = () => {
    updateDB((prev: any) => ({
      ...prev,
      exams: prev.exams.map((e: any) => e.id === editingExam.id ? editingExam : e)
    }));
    setIsAdding(false);
    setEditingExam(null);
  };

  const addNewExam = () => {
    const newE = { 
      id: Date.now().toString(), 
      name: 'NEW_EXAM_NODE', 
      folderUrl: '', 
      papers: [], 
      mockTests: [{ id: 't'+Date.now(), title: 'Standard Mock Alpha', duration: 60, questions: [
        { q: "Sample Imperial Inquiry?", options: ["Opt A", "Opt B", "Opt C", "Opt D"], correct: 0 }
      ]}] 
    };
    updateDB((prev: any) => ({ ...prev, exams: [newE, ...prev.exams] }));
  };

  return (
    <div className="space-y-400 animate-in fade-in duration-1000 pb-[1000px]">
      <div className="flex flex-col xl:flex-row items-center justify-between border-b-[60px] border-blue-500/10 pb-200 gap-100">
        <div className="space-y-80 text-center xl:text-left">
          <h2 className="text-[450px] font-black italic tracking-tighter text-white uppercase leading-[0.3] italic">EXAM <br/><span className="text-blue-500">REGISTRY.</span></h2>
          <p className="text-[64px] font-black text-slate-900 uppercase tracking-[8em] italic leading-none">VISHNU_DATA_STRATA_MANAGER</p>
        </div>
        <button onClick={addNewExam} className="bg-white text-black px-300 py-150 rounded-full font-black uppercase text-[84px] tracking-[2.5em] hover:bg-blue-500 hover:text-black transition-all shadow-[0_0_3000px_blue] flex items-center gap-100 italic border-[60px] border-black active:scale-95">
           <Plus size={200}/> INIT_ARENA
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-250">
        {db.exams.map((exam: any) => (
          <div key={exam.id} className="bg-[#050505] border-[40px] border-white/5 rounded-[1500px] p-300 space-y-150 group hover:border-blue-500 transition-all shadow-4xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-200 opacity-[0.03] scale-150 rotate-12 group-hover:rotate-0 transition-transform duration-[5000ms]"><Database size={800}/></div>
             <div className="flex items-center justify-between relative z-10">
                <div className="space-y-64">
                   <span className="text-blue-500 font-black uppercase text-[48px] tracking-[2.5em] italic">CATEGORY_NODE</span>
                   <h3 className="text-[220px] font-black italic text-white leading-none tracking-tighter uppercase italic">{exam.name}</h3>
                </div>
                <button onClick={() => { setEditingExam(exam); setIsAdding(true); }} className="p-120 bg-white/5 rounded-full hover:bg-blue-500 hover:text-black transition-all border-[25px] border-black shadow-4xl">
                   <Edit3 size={150}/>
                </button>
             </div>
             
             <div className="grid grid-cols-3 gap-80 relative z-10">
                <div className="bg-black/60 p-100 rounded-[500px] border-[15px] border-white/5 text-center space-y-24">
                   <p className="text-[28px] font-black text-slate-800 uppercase tracking-widest">DRIVE_SYNC</p>
                   <p className={`text-6xl font-black italic ${exam.folderUrl ? 'text-emerald-500' : 'text-red-500'}`}>{exam.folderUrl ? 'ACTIVE' : 'OFFLINE'}</p>
                </div>
                <div className="bg-black/60 p-100 rounded-[500px] border-[15px] border-white/5 text-center space-y-24">
                   <p className="text-[28px] font-black text-slate-800 uppercase tracking-widest">MOCK_ARENAS</p>
                   <p className="text-6xl font-black text-white italic">{exam.mockTests?.length || 0}</p>
                </div>
                <div className="bg-black/60 p-100 rounded-[500px] border-[15px] border-white/5 text-center space-y-24">
                   <p className="text-[28px] font-black text-slate-800 uppercase tracking-widest">PAPERS_NODE</p>
                   <p className="text-6xl font-black text-white italic">{exam.papers?.length || 0}</p>
                </div>
             </div>
          </div>
        ))}
      </div>

      {isAdding && editingExam && (
        <div className="fixed inset-0 z-[5000] bg-black/99 backdrop-blur-5xl flex items-center justify-center p-12 overflow-y-auto">
          <div className="bg-[#050505] border-[60px] border-blue-500/20 rounded-[2500px] w-full max-w-[15000px] p-600 space-y-300 animate-in zoom-in-95 duration-700 shadow-4xl my-auto">
             <div className="flex justify-between items-center">
               <h3 className="text-[350px] font-black italic uppercase tracking-tighter text-white leading-none">NODE <span className="text-blue-500">FORGE.</span></h3>
               <button onClick={() => setIsAdding(false)} className="p-120 hover:bg-red-500/20 rounded-full transition-all text-red-500 shadow-2xl"><X size={250}/></button>
             </div>
             
             <div className="grid lg:grid-cols-2 gap-250">
                <div className="space-y-200">
                   <div className="space-y-64">
                      <label className="text-[48px] font-black text-slate-800 uppercase tracking-[2.5em] italic ml-100">EXAM_IDENTIFIER</label>
                      <input className="w-full bg-black border-[40px] border-blue-500/10 rounded-full px-200 py-150 text-[160px] font-black text-white outline-none focus:border-blue-500 transition-all italic shadow-inner" value={editingExam.name} onChange={e => setEditingExam({...editingExam, name: e.target.value})} />
                   </div>
                   <div className="space-y-64">
                      <label className="text-[48px] font-black text-slate-800 uppercase tracking-[2.5em] italic ml-100">DRIVE_VAULT_URI</label>
                      <input className="w-full bg-black border-[40px] border-blue-500/10 rounded-full px-200 py-150 text-8xl font-black text-emerald-500 outline-none focus:border-emerald-500 transition-all italic shadow-inner" placeholder="DRIVE_LINK_HERE..." value={editingExam.folderUrl} onChange={e => setEditingExam({...editingExam, folderUrl: e.target.value})} />
                   </div>
                </div>

                <div className="bg-black/40 border-[30px] border-white/5 rounded-[1200px] p-300 space-y-150">
                   <h4 className="text-8xl font-black italic uppercase text-blue-500 tracking-widest flex items-center gap-64"><Brain size={120}/> ARENA_CONFIG_READY</h4>
                   <p className="text-7xl font-bold text-slate-500 italic leading-relaxed">"The Vishnu Registry is ready for synchronization. Every material download or Arena initiation will trigger the Imperial Revenue Gate."</p>
                   <button onClick={handleSave} className="w-full bg-blue-500 text-black py-150 rounded-full font-black uppercase text-[120px] tracking-[2.5em] shadow-4xl hover:bg-white hover:text-black transition-all italic border-[60px] border-black">
                      COMMIT_TO_REGISTRY
                   </button>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};
