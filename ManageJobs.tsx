
import React, { useState } from 'react';
import { 
  Plus, Search, Edit3, Trash2, Globe, ArrowRight, 
  CheckCircle, Zap, RefreshCw, X, ShieldCheck 
} from 'lucide-react';

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
    if(!confirm("Destroy this node?")) return;
    updateDB((prev: any) => ({
      ...prev,
      [type]: prev[type].filter((item: any) => item.id !== id)
    }));
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      
      {/* HEADER SECTION */}
      <div className="bg-dark border border-white/5 p-10 rounded-[40px] flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl">
        <div className="space-y-1 text-center md:text-left">
          <h2 className="text-4xl font-black italic text-white uppercase tracking-tighter">{title}<span className="text-emerald-500">.</span></h2>
          <p className="text-[10px] font-black text-slate-700 uppercase tracking-widest italic">Global Node Registry Management</p>
        </div>
        <button onClick={() => { setEditForm({ id: Date.now(), title: '', org: '', lastDate: '', summary: '', link: '', thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000' }); setIsAdding(true); }} className="bg-emerald-600 text-white px-10 py-5 rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-white hover:text-black transition-all shadow-xl flex items-center gap-4">
          <Plus size={18}/> New Registry Entry
        </button>
      </div>

      {/* DATA GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {list.map((item: any) => (
          <div key={item.id} className="bg-dark border border-white/5 rounded-[32px] overflow-hidden group hover:border-emerald-500/30 transition-all flex flex-col shadow-lg">
             <div className="h-40 relative bg-slate-900">
                <img src={item.thumbnail} className="w-full h-full object-cover opacity-20 group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute top-4 left-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-[8px] font-black uppercase italic tracking-widest">{item.org}</div>
             </div>
             <div className="p-8 space-y-6 flex-1 flex flex-col">
                <h4 className="text-xl font-black text-white italic uppercase tracking-tighter leading-tight group-hover:text-emerald-500 transition-colors line-clamp-2">{item.title}</h4>
                <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-auto">
                   <div className="flex gap-4">
                      <button onClick={() => { setEditForm(item); setIsAdding(true); }} className="p-3 bg-white/5 rounded-xl hover:bg-emerald-600 hover:text-white transition-all"><Edit3 size={16}/></button>
                      <button onClick={() => deleteItem(item.id)} className="p-3 bg-red-500/5 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"><Trash2 size={16}/></button>
                   </div>
                   <span className="text-[8px] font-black text-slate-800 uppercase tracking-widest flex items-center gap-2"><CheckCircle size={14} className="text-emerald-500"/> Operational</span>
                </div>
             </div>
          </div>
        ))}
        {list.length === 0 && (
          <div className="col-span-full py-32 border-2 border-dashed border-white/5 rounded-[40px] flex items-center justify-center opacity-20 italic font-black uppercase tracking-widest">
             Awaiting Node Initialization.
          </div>
        )}
      </div>

      {/* MODAL FORGE */}
      {isAdding && (
        <div className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-3xl flex items-center justify-center p-8 overflow-y-auto">
          <div className="bg-dark border border-white/10 rounded-[50px] w-full max-w-xl p-12 space-y-10 animate-in zoom-in-95 duration-300 relative">
             <div className="flex justify-between items-center">
               <h3 className="text-4xl font-black italic uppercase tracking-tighter text-white">Registry <span className="text-emerald-500">Forge.</span></h3>
               <button onClick={() => setIsAdding(false)} className="p-4 hover:bg-red-500/20 rounded-full transition-all text-red-500"><X size={28}/></button>
             </div>
             <div className="space-y-6">
                <div className="space-y-2">
                   <label className="text-[8px] font-black text-slate-700 uppercase tracking-widest px-4">Subject Label</label>
                   <input className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white font-black text-lg outline-none focus:border-emerald-600 transition-all italic" value={editForm.title} onChange={e => setEditForm({...editForm, title: e.target.value})} placeholder="Title..." />
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                      <label className="text-[8px] font-black text-slate-700 uppercase tracking-widest px-4">Organization</label>
                      <input className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white font-black italic" value={editForm.org} onChange={e => setEditForm({...editForm, org: e.target.value})} placeholder="Org..." />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[8px] font-black text-slate-700 uppercase tracking-widest px-4">Timeline</label>
                      <input className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white font-black italic" value={editForm.lastDate} onChange={e => setEditForm({...editForm, lastDate: e.target.value})} placeholder="Date..." />
                   </div>
                </div>
                <div className="space-y-2">
                   <label className="text-[8px] font-black text-slate-700 uppercase tracking-widest px-4">Summary Payload</label>
                   <textarea className="w-full bg-black border border-white/10 rounded-2xl p-6 text-slate-500 font-bold min-h-[120px] outline-none italic" value={editForm.summary} onChange={e => setEditForm({...editForm, summary: e.target.value})} placeholder="Description Data..." />
                </div>
                <button onClick={handleCommit} className="w-full bg-emerald-600 py-6 rounded-3xl font-black uppercase tracking-[0.4em] text-xs shadow-xl hover:bg-white hover:text-black transition-all italic">COMMIT TO EMPIRE REGISTRY</button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};
