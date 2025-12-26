
import React, { useState } from 'react';
import { Plus, Edit3, Trash2, CheckCircle, X, ShieldCheck, Globe, Languages } from 'lucide-react';

export const ManageJobs = ({ db, updateDB, type, title }: any) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editForm, setEditForm] = useState<any>(null);
  const list = db[type] || [];

  const handleCommit = () => {
    updateDB((prev: any) => ({
      ...prev,
      [type]: [editForm, ...prev[type].filter((item: any) => item.id !== editForm.id)]
    }));
    setIsAdding(false);
    setEditForm(null);
  };

  const deleteItem = (id: any) => {
    if(!confirm("Destroy Node from Registry?")) return;
    updateDB((prev: any) => ({ ...prev, [type]: prev[type].filter((item: any) => item.id !== id) }));
  };

  return (
    <div className="space-y-20 animate-in fade-in duration-500">
      <div className="bg-[#050505] border border-white/5 p-20 rounded-[80px] flex flex-col md:flex-row justify-between items-center gap-12 shadow-4xl">
        <div className="space-y-3 text-center md:text-left">
          <h2 className="text-6xl font-black italic text-white uppercase tracking-tighter">{title}<span className="text-red-500">.</span></h2>
          <p className="text-[12px] font-black text-slate-800 uppercase tracking-[0.7em] italic">DUAL_NODE_REGISTRY_MASTER</p>
        </div>
        <button onClick={() => { setEditForm({ id: Date.now(), title_en: '', title_te: '', org: '', lastDate: '', summary_en: '', summary_te: '', link: '', thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab' }); setIsAdding(true); }} className="bg-red-600 text-white px-16 py-8 rounded-full font-black uppercase text-[12px] tracking-widest hover:bg-white hover:text-black transition-all shadow-4xl flex items-center gap-6">
          <Plus size={28}/> INITIALIZE NODE
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16">
        {list.map((item: any) => (
          <div key={item.id} className="bg-[#050505] border border-white/5 rounded-[80px] overflow-hidden group hover:border-red-600 transition-all flex flex-col shadow-4xl relative">
             <div className="h-64 relative bg-slate-950 overflow-hidden">
                <img src={item.thumbnail} className="w-full h-full object-cover opacity-40 group-hover:scale-125 group-hover:opacity-100 transition-all duration-1000" alt={item.title_en}/>
                <div className="absolute top-8 left-8 bg-red-600 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase italic tracking-widest">{item.org}</div>
                <div className="absolute bottom-8 right-8 flex gap-2">
                   <div className="px-3 py-1 bg-white/10 rounded-lg text-[9px] font-black text-white">TE</div>
                   <div className="px-3 py-1 bg-white/10 rounded-lg text-[9px] font-black text-white">EN</div>
                </div>
             </div>
             <div className="p-12 space-y-10 flex-1 flex flex-col">
                <h4 className="text-3xl font-black text-white italic uppercase tracking-tighter leading-[0.85] group-hover:text-red-500 transition-colors line-clamp-2">{item.title_te || item.title_en}</h4>
                <div className="flex items-center justify-between pt-10 border-t border-white/5 mt-auto">
                   <div className="flex gap-6">
                      <button onClick={() => { setEditForm(item); setIsAdding(true); }} className="p-5 bg-white/5 rounded-2xl hover:bg-red-600 hover:text-white transition-all shadow-xl"><Edit3 size={24}/></button>
                      <button onClick={() => deleteItem(item.id)} className="p-5 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-xl"><Trash2 size={24}/></button>
                   </div>
                   <span className="text-[11px] font-black text-slate-800 uppercase tracking-widest flex items-center gap-4"><CheckCircle size={20} className="text-red-600"/> DUAL_SYNCED</span>
                </div>
             </div>
          </div>
        ))}
      </div>

      {isAdding && (
        <div className="fixed inset-0 z-[2000] bg-black/99 backdrop-blur-5xl flex items-center justify-center p-12 overflow-y-auto">
          <div className="bg-[#050505] border border-white/10 rounded-[100px] w-full max-w-4xl p-24 space-y-16 animate-in zoom-in-95 duration-700 shadow-4xl my-auto">
             <div className="flex justify-between items-center">
               <h3 className="text-6xl font-black italic uppercase tracking-tighter text-white">EMPEROR <span className="text-red-500">FORGE.</span></h3>
               <button onClick={() => setIsAdding(false)} className="p-6 hover:bg-red-500/20 rounded-full transition-all text-red-500 shadow-2xl"><X size={44}/></button>
             </div>
             <div className="space-y-10">
                <div className="grid grid-cols-2 gap-10">
                   <div className="space-y-4">
                      <label className="text-[11px] font-black text-slate-600 uppercase tracking-widest ml-6">Native Title (Telugu)</label>
                      <input className="w-full bg-black border border-white/10 rounded-[40px] px-10 py-8 text-white font-black text-2xl outline-none focus:border-red-600 transition-all italic" value={editForm.title_te} onChange={e => setEditForm({...editForm, title_te: e.target.value})} placeholder="Title in Telugu..." />
                   </div>
                   <div className="space-y-4">
                      <label className="text-[11px] font-black text-slate-600 uppercase tracking-widest ml-6">Global Title (English)</label>
                      <input className="w-full bg-black border border-white/10 rounded-[40px] px-10 py-8 text-white font-black text-2xl outline-none focus:border-red-600 transition-all italic" value={editForm.title_en} onChange={e => setEditForm({...editForm, title_en: e.target.value})} placeholder="Title in English..." />
                   </div>
                </div>
                <div className="grid grid-cols-2 gap-10">
                   <input className="w-full bg-black border border-white/10 rounded-[40px] px-10 py-8 text-white font-black italic text-xl" value={editForm.org} onChange={e => setEditForm({...editForm, org: e.target.value})} placeholder="Organization Identity..." />
                   <input className="w-full bg-black border border-white/10 rounded-[40px] px-10 py-8 text-white font-black italic text-xl" value={editForm.lastDate} onChange={e => setEditForm({...editForm, lastDate: e.target.value})} placeholder="Registry Deadline..." />
                </div>
                <textarea className="w-full bg-black border border-white/10 rounded-[40px] p-12 text-slate-500 font-bold min-h-[200px] outline-none italic text-xl" value={editForm.summary_te} onChange={e => setEditForm({...editForm, summary_te: e.target.value})} placeholder="Telugu Narrative Payload..." />
                <button onClick={handleCommit} className="w-full bg-red-600 py-12 rounded-[60px] font-black uppercase tracking-[0.6em] text-[13px] shadow-4xl hover:bg-white hover:text-black transition-all italic flex items-center justify-center gap-6">
                   <ShieldCheck size={32}/> COMMIT BILINGUAL NODE TO EMPIRE
                </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};
