
import React, { useState } from 'react';
import { Type } from "@google/genai";
import { getAiClient } from './index';
import { 
  Trash2, Edit3, X, RefreshCw, Plus, 
  SearchCode, Radar, Zap, Crown, Sparkles, AlertCircle, TrendingUp, Share2, Camera, 
  Film, Mic, MessageSquare, Target, BarChart, Ghost, Rocket, Smartphone, CheckCircle
} from 'lucide-react';

export const ManageJobs = ({ db, updateDB }: any) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [editForm, setEditForm] = useState<any>(null);
  const [urlInput, setUrlInput] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  const initialForm = {
    id: `j_${Date.now()}`,
    title: '',
    title_te: '',
    org: '',
    qualification: '',
    lastDate: '',
    section: 'govt',
    summary: '',
    stepByStep: '',
    metaKeywords: '',
    neatnessScore: 100,
    thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000'
  };

  const handleNeuralForge = async () => {
    if (!urlInput) return;
    setIsAiLoading(true);
    try {
      const ai = getAiClient();
      const prompt = `Analyze this job announcement URL: ${urlInput}. 
      Generate:
      1. title: English short title
      2. title_te: Telugu short title
      3. org: Organization name
      4. summary: Professional 2-sentence summary in English.
      5. lastDate: Extract last date (DD/MM/YYYY)
      Return STRICT JSON.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: { 
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              title_te: { type: Type.STRING },
              org: { type: Type.STRING },
              summary: { type: Type.STRING },
              lastDate: { type: Type.STRING }
            }
          }
        }
      });
      
      const res = JSON.parse(response.text);
      setEditForm({ ...initialForm, ...res });
      setIsAdding(true);
      setUrlInput('');
    } catch (e) {
      alert("AI Sync Error. Try with a different link or check your API keys.");
    } finally {
      setIsAiLoading(false);
    }
  };

  const commitToRegistry = () => {
    if (isAdding) {
      updateDB((p: any) => ({ ...p, jobs: [editForm, ...p.jobs] }));
      setIsAdding(false);
    } else {
      updateDB((p: any) => ({ ...p, jobs: p.jobs.map((j: any) => j.id === editingId ? editForm : j) }));
      setEditingId(null);
    }
    setEditForm(null);
  };

  return (
    <div className="space-y-20 animate-in fade-in duration-1000 pb-64">
      {/* COMMAND INPUT */}
      <div className="bg-[#050505] border border-emerald-500/30 p-16 md:p-24 rounded-[80px] space-y-20 shadow-4xl relative overflow-hidden group">
         <div className="absolute top-0 right-0 p-16 opacity-5 rotate-12 transition-transform duration-1000 group-hover:rotate-0"><Rocket size={500} className="text-emerald-500"/></div>
         <div className="flex flex-col xl:flex-row justify-between items-center gap-12 relative z-10">
            <div className="space-y-6 text-center xl:text-left">
               <h2 className="text-7xl md:text-9xl font-black tracking-tighter text-white uppercase italic leading-none">POST <span className="text-emerald-500 block">FORGE.</span></h2>
               <p className="text-[14px] font-black uppercase text-slate-700 tracking-[0.8em] italic">AI Accelerated Content Generation</p>
            </div>
            <button onClick={() => { setEditForm(initialForm); setIsAdding(true); }} className="bg-emerald-600 text-white px-20 py-10 rounded-full font-black uppercase text-[15px] tracking-widest hover:bg-white hover:text-black transition-all shadow-4xl active:scale-95 group/btn flex items-center gap-6">
               <Plus className="group-hover/btn:rotate-90 transition-transform" size={32}/> MANUAL ENTRY
            </button>
         </div>

         <div className="relative z-10 bg-black border border-white/5 rounded-[60px] p-6 flex items-center shadow-inner focus-within:border-emerald-600 transition-all">
            <SearchCode className="text-slate-800 ml-12" size={48}/>
            <input 
              className="bg-transparent w-full px-10 py-8 outline-none font-black text-2xl md:text-4xl placeholder:text-slate-900 text-emerald-500 italic"
              placeholder="Paste Job Link for AI Auto-Fill..."
              value={urlInput}
              onChange={e => setUrlInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleNeuralForge()}
            />
            <button onClick={handleNeuralForge} disabled={isAiLoading || !urlInput} className="bg-cyan-600 text-white px-16 py-8 md:px-24 md:py-10 rounded-[48px] font-black uppercase text-[12px] tracking-widest hover:bg-white hover:text-cyan-600 transition-all shadow-4xl flex items-center gap-8">
               {isAiLoading ? <RefreshCw className="animate-spin" size={28}/> : <Zap size={28}/>} {isAiLoading ? 'FORGING...' : 'AI FORGE'}
            </button>
         </div>
      </div>

      {/* REGISTRY NODES */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
        {db.jobs.map((j: any) => (
          <div key={j.id} className="bg-[#050505] border border-white/5 rounded-[80px] p-12 hover:border-emerald-500/50 transition-all group shadow-4xl flex flex-col relative h-[700px] justify-between overflow-hidden">
             <div className="h-64 relative overflow-hidden rounded-[56px] border border-white/5 shadow-inner">
                <img src={j.thumbnail} className="w-full h-full object-cover grayscale opacity-20 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
                <div className="absolute top-8 left-8 bg-black/70 backdrop-blur px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-widest border border-white/10">{j.section}</div>
             </div>
             <div className="flex-1 space-y-8 pt-12">
                <h4 className="text-4xl font-black text-white italic uppercase leading-none line-clamp-2 group-hover:text-emerald-400 transition-colors tracking-tighter">{j.title}</h4>
                <p className="text-[13px] font-black text-slate-700 uppercase tracking-widest leading-relaxed line-clamp-3 italic opacity-60">"{j.summary}"</p>
             </div>
             <div className="pt-10 border-t border-white/5 flex flex-col gap-8">
                <div className="flex justify-between items-center">
                   <div className="flex gap-6">
                      <button onClick={() => {setEditingId(j.id); setEditForm({...j});}} className="p-6 bg-white/5 rounded-[32px] hover:bg-emerald-600 hover:text-white transition-all shadow-xl group/icon border border-white/5"><Edit3 size={24}/></button>
                      <button onClick={() => updateDB((p:any)=>({...p, jobs: p.jobs.filter((x:any)=>x.id!==j.id)}))} className="p-6 bg-red-500/10 text-red-500 rounded-[32px] border border-red-500/20 hover:bg-red-500 hover:text-white transition-all shadow-xl"><Trash2 size={24}/></button>
                   </div>
                   <div className="flex items-center gap-4 text-emerald-500">
                      <CheckCircle size={18}/> <span className="text-[11px] font-black uppercase tracking-[0.2em]">OPERATIONAL</span>
                   </div>
                </div>
             </div>
          </div>
        ))}
      </div>

      {/* SYNTHESIS MODAL */}
      {(editingId || isAdding) && (
        <div className="fixed inset-0 z-[2000] bg-black/99 backdrop-blur-5xl flex items-center justify-center p-12 overflow-y-auto">
          <div className="bg-[#050505] border border-white/10 rounded-[100px] w-full max-w-[1400px] p-24 space-y-20 animate-in zoom-in-95 duration-700 relative my-auto shadow-4xl overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-emerald-600"></div>
            <div className="flex justify-between items-center">
              <h3 className="text-8xl font-black italic uppercase tracking-tighter text-white leading-none">CONTENT <span className="text-emerald-500 block">FORGE.</span></h3>
              <button onClick={() => { setEditingId(null); setIsAdding(false); setEditForm(null); }} className="p-10 bg-white/5 rounded-full hover:bg-red-600 transition-all border border-white/5 shadow-4xl"><X size={48}/></button>
            </div>
            
            <div className="grid lg:grid-cols-12 gap-20 overflow-y-auto max-h-[60vh] pr-10 scrollbar-hide pb-16">
              <div className="lg:col-span-8 space-y-12">
                 <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-800 uppercase tracking-[0.5em] px-10 italic">English Label</label>
                    <input className="w-full bg-black border border-white/5 rounded-full px-14 py-10 text-4xl font-black text-white outline-none focus:border-emerald-600 shadow-inner italic" value={editForm.title} onChange={e => setEditForm({...editForm, title: e.target.value})} />
                 </div>
                 <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-800 uppercase tracking-[0.5em] px-10 italic">Telugu Label</label>
                    <input className="w-full bg-black border border-white/5 rounded-full px-14 py-10 text-4xl font-black text-emerald-500 outline-none focus:border-emerald-600 shadow-inner italic" value={editForm.title_te} onChange={e => setEditForm({...editForm, title_te: e.target.value})} />
                 </div>
                 <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-800 uppercase tracking-[0.5em] px-10 italic">Neural Narrative</label>
                    <textarea className="w-full bg-black border border-white/5 rounded-[80px] p-16 text-slate-500 font-bold text-3xl min-h-[400px] outline-none italic leading-relaxed" value={editForm.summary} onChange={e => setEditForm({...editForm, summary: e.target.value})} />
                 </div>
              </div>
              <div className="lg:col-span-4 space-y-12">
                 <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-800 uppercase tracking-[0.5em] px-10 italic">Registry Deadline</label>
                    <input className="w-full bg-black border border-white/5 rounded-full px-12 py-8 text-white font-black text-3xl italic" value={editForm.lastDate} onChange={e => setEditForm({...editForm, lastDate: e.target.value})} />
                 </div>
                 <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-800 uppercase tracking-[0.5em] px-10 italic">Asset URI</label>
                    <input className="w-full bg-black border border-white/5 rounded-full px-12 py-8 text-xs text-slate-800 font-mono" value={editForm.thumbnail} onChange={e => setEditForm({...editForm, thumbnail: e.target.value})} />
                 </div>
                 <div className="bg-emerald-600/5 border border-emerald-500/20 p-12 rounded-[64px] space-y-6">
                    <h5 className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em]">Node Metadata</h5>
                    <p className="text-sm font-bold text-slate-600 italic">This asset will be broadcast to all connected student nodes globally once committed.</p>
                 </div>
              </div>
            </div>

            <div className="pt-12 border-t border-white/5">
                <button onClick={commitToRegistry} className="w-full bg-emerald-600 py-14 rounded-[70px] font-black uppercase tracking-[0.8em] text-[20px] shadow-4xl hover:bg-white hover:text-black transition-all group italic active:scale-95">
                    COMMIT CHANGES TO GLOBAL REGISTRY
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
