
import React, { useState } from 'react';
import { Plus, Edit3, Trash2, CheckCircle, X, ShieldCheck, Globe } from 'lucide-react';

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
    if(!confirm("Destroy node?")) return;
    updateDB((prev: any) => ({ ...prev, [type]: prev[type].filter((item: any) => item.id !== id) }));
  };

  return (
    <div className="space-y-14 animate-in fade-in duration-500">
      <div className="bg-[#050505] border border-white/5 p-14 rounded-[50px] flex flex-col md:flex-row justify-between items-center gap-10 shadow-4xl">
        <div className="space-y-2 text-center md:text-left">
          <h2 className="text-5xl font-black italic text-white uppercase tracking-tighter">{title}<span className="text-red-500">.</span></h2>
          <p className="text-[10px] font-black text-slate-800 uppercase tracking-[0.5em] italic">REGISTRY_NODE_MASTER</p>
        </div>
        <button onClick={() => { setEditForm({ id: Date.now(), title: '', org: '', lastDate: '', summary: '', link: '', thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab' }); setIsAdding(true); }} className="bg-red-600 text-white px-12 py-6 rounded-full font-black uppercase text-[11px] tracking-widest hover:bg-white hover:text-black transition-all shadow-4xl flex items-center gap-5">
          <Plus size={22}/> INITIALIZE NODE
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
        {list.map((item: any) => (
          <div key={item.id} className="bg-[#050505] border border-white/5 rounded-[50px] overflow-hidden group hover:border-red-600/40 transition-all flex flex-col shadow-4xl">
             <div className="h-56 relative bg-slate-950 overflow-hidden">
                <img src={item.thumbnail} className="w-full h-full object-cover opacity-30 group-hover:scale-110 group-hover:opacity-100 transition-all duration-1000" alt={item.title}/>
                <div className="absolute top-6 left-6 bg-red-600 text-white px-5 py-1.5 rounded-full text-[9px] font-black uppercase italic tracking-widest">{item.org}</div>
             </div>
             <div className="p-10 space-y-8 flex-1 flex flex-col">
                <h4 className="text-2xl font-black text-white italic uppercase tracking-tighter leading-tight group-hover:text-red-500 transition-colors line-clamp-2">{item.title}</h4>
                <div className="flex items-center justify-between pt-8 border-t border-white/5 mt-auto">
                   <div className="flex gap-4">
                      <button onClick={() => { setEditForm(item); setIsAdding(true); }} className="p-4 bg-white/5 rounded-2xl hover:bg-red-600 hover:text-white transition-all"><Edit3 size={18}/></button>
                      <button onClick={() => deleteItem(item.id)} className="p-4 bg-red-500/5 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all"><Trash2 size={18}/></button>
                   </div>
                   <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest flex items-center gap-2"><CheckCircle size={16} className="text-red-600"/> SYNCED</span>
                </div>
             </div>
          </div>
        ))}
      </div>

      {isAdding && (
        <div className="fixed inset-0 z-[2000] bg-black/98 backdrop-blur-5xl flex items-center justify-center p-10 overflow-y-auto">
          <div className="bg-[#050505] border border-white/10 rounded-[80px] w-full max-w-2xl p-20 space-y-12 animate-in zoom-in-95 duration-500 shadow-4xl my-auto">
             <div className="flex justify-between items-center">
               <h3 className="text-5xl font-black italic uppercase tracking-tighter text-white">NODE <span className="text-red-500">FORGE.</span></h3>
               <button onClick={() => setIsAdding(false)} className="p-5 hover:bg-red-500/20 rounded-full transition-all text-red-500"><X size={36}/></button>
             </div>
             <div className="space-y-8">
                <input className="w-full bg-black border border-white/10 rounded-[30px] px-10 py-7 text-white font-black text-xl outline-none focus:border-red-600 transition-all italic" value={editForm.title} onChange={e => setEditForm({...editForm, title: e.target.value})} placeholder="Title..." />
                <div className="grid grid-cols-2 gap-6">
                   <input className="w-full bg-black border border-white/10 rounded-[30px] px-8 py-6 text-white font-black italic" value={editForm.org} onChange={e => setEditForm({...editForm, org: e.target.value})} placeholder="Organization..." />
                   <input className="w-full bg-black border border-white/10 rounded-[30px] px-8 py-6 text-white font-black italic" value={editForm.lastDate} onChange={e => setEditForm({...editForm, lastDate: e.target.value})} placeholder="Deadline..." />
                </div>
                <textarea className="w-full bg-black border border-white/10 rounded-[30px] p-8 text-slate-500 font-bold min-h-[150px] outline-none italic" value={editForm.summary} onChange={e => setEditForm({...editForm, summary: e.target.value})} placeholder="Node Payload Description..." />
                <input className="w-full bg-black border border-white/10 rounded-[30px] px-8 py-6 text-white font-black italic" value={editForm.thumbnail} onChange={e => setEditForm({...editForm, thumbnail: e.target.value})} placeholder="Thumbnail URL..." />
                <button onClick={handleCommit} className="w-full bg-red-600 py-8 rounded-[40px] font-black uppercase tracking-[0.5em] text-xs shadow-4xl hover:bg-white hover:text-black transition-all italic">COMMIT TO SUPREMACY REGISTRY</button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};
