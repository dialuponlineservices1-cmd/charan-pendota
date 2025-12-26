
import React, { useState } from 'react';
import { 
  Plus, Search, Edit3, Trash2, Globe, ArrowRight, 
  CheckCircle, Zap, RefreshCw, X, ShieldCheck 
} from 'lucide-react';

export const ManageJobs = ({ db, updateDB, type, title }: any) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editForm, setEditForm] = useState<any>(null);

  const list = db[type] || [];

  const initialForm = {
    id: Date.now(),
    title: '',
    org: '',
    lastDate: '',
    summary: '',
    link: '',
    thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000'
  };

  const handleCommit = () => {
    updateDB((prev: any) => ({
      ...prev,
      [type]: [editForm, ...prev[type].filter((item: any) => item.id !== editForm.id)]
    }));
    setIsAdding(false);
    setEditForm(null);
  };

  const deleteItem = (id: any) => {
    updateDB((prev: any) => ({
      ...prev,
      [type]: prev[type].filter((item: any) => item.id !== id)
    }));
  };

  return (
    <div className="space-y-16 animate-in fade-in duration-700 pb-32">
      
      {/* HEADER NODE */}
      <div className="bg-[#050505] border border-white/5 p-12 rounded-[50px] flex flex-col md:flex-row justify-between items-center gap-10 shadow-xl">
        <div className="space-y-2 text-center md:text-left">
          <h2 className="text-5xl font-black italic text-white uppercase tracking-tighter leading-none">{title}<span className="text-emerald-500">.</span></h2>
          <p className="text-[9px] font-black text-slate-800 uppercase tracking-widest italic">Global Node Registry Management</p>
        </div>
        <button onClick={() => { setEditForm(initialForm); setIsAdding(true); }} className="bg-emerald-600 text-white px-12 py-5 rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-white hover:text-black transition-all shadow-xl flex items-center gap-4">
          <Plus size={18}/> New Entry
        </button>
      </div>

      {/* REGISTRY NODES GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {list.map((item: any) => (
          <div key={item.id} className="bg-[#050505] border border-white/5 rounded-[40px] overflow-hidden group hover:border-emerald-500/40 transition-all shadow-lg flex flex-col">
             <div className="h-48 relative overflow-hidden bg-slate-900 flex items-center justify-center">
                <img src={item.thumbnail} className="w-full h-full object-cover opacity-30 group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute bottom-5 left-5 bg-black/60 px-4 py-1 rounded-full border border-white/10 text-[8px] font-black text-emerald-500 uppercase tracking-widest">{item.org}</div>
             </div>
             <div className="p-8 space-y-6 flex-1 flex flex-col">
                <h4 className="text-xl font-black text-white italic uppercase tracking-tighter leading-tight group-hover:text-emerald-500 transition-colors line-clamp-2">{item.title}</h4>
                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                   <div className="flex gap-4">
                      <button onClick={() => { setEditForm(item); setIsAdding(true); }} className="p-3 bg-white/5 rounded-2xl hover:bg-emerald-600 hover:text-white transition-all"><Edit3 size={16}/></button>
                      <button onClick={() => deleteItem(item.id)} className="p-3 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all"><Trash2 size={16}/></button>
                   </div>
                   <div className="flex items-center gap-2 text-[8px] font-black text-slate-700 uppercase tracking-widest">
                      <CheckCircle size={14} className="text-emerald-500"/> Live
                   </div>
                </div>
             </div>
          </div>
        ))}
        {list.length === 0 && (
          <div className="col-span-full h-64 border border-dashed border-white/5 rounded-[40px] flex items-center justify-center opacity-20 italic font-black uppercase tracking-widest">
             No Nodes Registered.
          </div>
        )}
      </div>

      {/* SYNTHESIS MODAL */}
      {isAdding && (
        <div className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-xl flex items-center justify-center p-10 overflow-y-auto">
          <div className="bg-[#050505] border border-white/10 rounded-[60px] w-full max-w-2xl p-16 space-y-12 animate-in zoom-in-95 duration-500 relative">
             <div className="flex justify-between items-center">
               <h3 className="text-5xl font-black italic uppercase tracking-tighter text-white leading-none">NODE <span className="text-emerald-500">FORGE.</span></h3>
               <button onClick={() => setIsAdding(false)} className="p-4 hover:bg-red-500/20 rounded-full transition-all text-red-500"><X size={32}/></button>
             </div>
             <div className="space-y-8">
                <input className="w-full bg-black border border-white/10 rounded-[30px] px-8 py-5 text-white font-black text-xl outline-none focus:border-emerald-600 transition-all italic" value={editForm.title} onChange={e => setEditForm({...editForm, title: e.target.value})} placeholder="Title Label" />
                <div className="grid grid-cols-2 gap-6">
                   <input className="w-full bg-black border border-white/10 rounded-[30px] px-8 py-5 text-white font-black italic" value={editForm.org} onChange={e => setEditForm({...editForm, org: e.target.value})} placeholder="Organization/Company" />
                   <input className="w-full bg-black border border-white/10 rounded-[30px] px-8 py-5 text-white font-black italic" value={editForm.lastDate} onChange={e => setEditForm({...editForm, lastDate: e.target.value})} placeholder="Deadline/Event Date" />
                </div>
                <textarea className="w-full bg-black border border-white/10 rounded-[30px] p-8 text-slate-500 font-bold text-lg min-h-[150px] outline-none italic" value={editForm.summary} onChange={e => setEditForm({...editForm, summary: e.target.value})} placeholder="Summary Data..." />
                <input className="w-full bg-black border border-white/10 rounded-[30px] px-8 py-5 text-slate-700 font-mono text-xs" value={editForm.thumbnail} onChange={e => setEditForm({...editForm, thumbnail: e.target.value})} placeholder="Thumbnail Asset URI" />
                <button onClick={handleCommit} className="w-full bg-emerald-600 py-8 rounded-[40px] font-black uppercase tracking-[0.6em] text-[15px] shadow-xl hover:bg-white hover:text-black transition-all italic">COMMIT TO GLOBAL MESH</button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};
