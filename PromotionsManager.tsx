
import React, { useState } from 'react';
import { 
  Megaphone, Plus, Trash2, Edit3, DollarSign, Calendar, 
  TrendingUp, Save, X, Sparkles, Clock, Globe, ExternalLink,
  ShieldCheck, AlertCircle, BarChart3, Radio
} from 'lucide-react';

export const PromotionsManager = ({ db, updateDB }: any) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<any>({
    brandName: '',
    bannerUrl: '',
    link: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
    revenue: '',
    isGlobal: true
  });

  const commitPromo = () => {
    if (editingId) {
      updateDB((p: any) => ({
        ...p,
        promotions: p.promotions.map((promo: any) => promo.id === editingId ? { ...form, id: editingId } : promo)
      }));
    } else {
      updateDB((p: any) => ({
        ...p,
        promotions: [{ ...form, id: `p_${Date.now()}` }, ...p.promotions]
      }));
    }
    setIsAdding(false);
    setEditingId(null);
  };

  const getDaysLeft = (endDate: string) => {
    const diff = new Date(endDate).getTime() - new Date().getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 3600 * 24)));
  };

  return (
    <div className="space-y-16 animate-in fade-in duration-700">
      
      {/* HEADER SECTION */}
      <div className="bg-slate-950/40 border border-white/5 p-16 rounded-[80px] flex flex-col xl:flex-row justify-between items-center gap-12 shadow-4xl overflow-hidden relative">
         <div className="absolute top-0 right-0 p-10 opacity-5 rotate-12"><Megaphone size={500}/></div>
         <div className="space-y-4 relative z-10 text-center xl:text-left">
            <h2 className="text-9xl font-black tracking-tighter text-white uppercase italic leading-none">AD <span className="text-emerald-500">MATRIX.</span></h2>
            <p className="text-[11px] font-black uppercase text-slate-700 tracking-[0.9em]">Global Ad-Injection & Duration Controller</p>
         </div>
         <button onClick={() => setIsAdding(true)} className="bg-emerald-600 text-white px-16 py-8 rounded-[40px] text-[12px] font-black uppercase hover:bg-emerald-500 transition-all shadow-4xl flex items-center gap-4 relative z-10">
            <Plus size={24}/> DEPLOY NEW CAMPAIGN
         </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
        {db.promotions.map((p: any) => {
          const daysLeft = getDaysLeft(p.endDate);
          return (
            <div key={p.id} className="bg-slate-950 border border-white/5 rounded-[80px] overflow-hidden group hover:border-emerald-500 transition-all flex flex-col relative shadow-2xl">
               
               {/* GLOBAL INJECTION INDICATOR */}
               {p.isGlobal && (
                 <div className="absolute top-6 left-6 z-20 bg-indigo-600 text-white px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest flex items-center gap-2 shadow-xl">
                   <Radio size={10} className="animate-pulse"/> Global Node
                 </div>
               )}

               <div className="h-64 relative">
                  <img src={p.bannerUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute top-6 right-6">
                     <span className={`px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-widest border ${daysLeft > 0 ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20 animate-pulse' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}>
                        {daysLeft > 0 ? 'OPERATIONAL' : 'EXPIRED'}
                     </span>
                  </div>
               </div>
               <div className="p-12 space-y-10 flex-1 flex flex-col">
                  <div className="flex justify-between items-start">
                     <div>
                        <h4 className="text-4xl font-black text-white uppercase italic tracking-tighter leading-none">{p.brandName}</h4>
                        <p className="text-[11px] font-black text-slate-700 uppercase tracking-widest mt-3">Revenue Yield: ₹{p.revenue}</p>
                     </div>
                     <p className="text-3xl font-black text-emerald-500 italic">{daysLeft}D</p>
                  </div>
                  <div className="flex gap-4 mt-auto">
                     <button onClick={() => { setEditingId(p.id); setForm(p); setIsAdding(true); }} className="flex-1 h-20 bg-white/5 rounded-[32px] border border-white/10 text-[11px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">REFINE</button>
                     <button onClick={() => updateDB((prev:any)=>({...prev, promotions: prev.promotions.filter((x:any)=>x.id!==p.id)}))} className="w-20 h-20 bg-red-500/10 text-red-500 rounded-[32px] border border-red-500/20 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center"><Trash2 size={24}/></button>
                  </div>
               </div>
            </div>
          );
        })}
      </div>

      {isAdding && (
        <div className="fixed inset-0 z-[2000] bg-black/98 backdrop-blur-5xl flex items-center justify-center p-12 overflow-y-auto">
          <div className="bg-[#050505] border border-white/10 rounded-[100px] w-full max-w-4xl p-24 space-y-16 animate-in zoom-in-95 duration-500 shadow-4xl my-auto">
            <div className="flex justify-between items-center">
              <h3 className="text-6xl font-black italic uppercase tracking-tighter text-white">SYNC <span className="text-emerald-500">CAMPAIGN.</span></h3>
              <button onClick={() => setIsAdding(false)} className="p-4 hover:bg-red-500/20 rounded-full transition-all"><X size={40}/></button>
            </div>
            <div className="grid md:grid-cols-2 gap-12">
               <div className="space-y-8">
                 <input className="w-full bg-black border border-white/10 rounded-[32px] px-10 py-8 text-white font-black text-xl outline-none focus:border-emerald-500 transition-all" placeholder="Brand/Client Identity" value={form.brandName} onChange={e => setForm({...form, brandName: e.target.value})} />
                 <input className="w-full bg-black border border-white/10 rounded-[32px] px-10 py-8 text-white font-black text-xl outline-none focus:border-emerald-500 transition-all" placeholder="Banner Asset URL" value={form.bannerUrl} onChange={e => setForm({...form, bannerUrl: e.target.value})} />
                 <input className="w-full bg-black border border-white/10 rounded-[32px] px-10 py-8 text-white font-black text-xl outline-none focus:border-emerald-500 transition-all" placeholder="Target Destination URI" value={form.link} onChange={e => setForm({...form, link: e.target.value})} />
               </div>
               <div className="space-y-8">
                 <div className="grid grid-cols-2 gap-6">
                    <input type="date" className="w-full bg-black border border-white/10 rounded-[32px] px-8 py-8 text-white font-black" value={form.startDate} onChange={e => setForm({...form, startDate: e.target.value})} />
                    <input type="date" className="w-full bg-black border border-white/10 rounded-[32px] px-8 py-8 text-white font-black" value={form.endDate} onChange={e => setForm({...form, endDate: e.target.value})} />
                 </div>
                 <input type="number" className="w-full bg-black border border-emerald-500/20 rounded-[32px] px-10 py-8 text-emerald-400 font-black text-2xl" placeholder="Campaign Revenue (INR)" value={form.revenue} onChange={e => setForm({...form, revenue: e.target.value})} />
                 
                 {/* GLOBAL INJECTION TOGGLE */}
                 <div className="p-8 bg-white/5 rounded-[40px] flex items-center justify-between border border-white/10">
                    <div className="space-y-1">
                       <p className="text-[11px] font-black text-white uppercase tracking-widest">Global Ad Injection</p>
                       <p className="text-[9px] font-black text-slate-700 uppercase">Inject into every job card</p>
                    </div>
                    <button onClick={() => setForm({...form, isGlobal: !form.isGlobal})} className={`w-16 h-8 rounded-full p-1.5 flex items-center transition-all ${form.isGlobal ? 'bg-emerald-600 justify-end' : 'bg-slate-800 justify-start'}`}>
                       <div className="h-full aspect-square bg-white rounded-full"></div>
                    </button>
                 </div>
               </div>
            </div>
            <button onClick={commitPromo} className="w-full bg-emerald-600 py-10 rounded-[50px] font-black uppercase tracking-[0.4em] text-sm shadow-4xl hover:bg-indigo-600 transition-all flex items-center justify-center gap-6">
              <ShieldCheck size={32}/> COMMIT TO GLOBAL MATRIX
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
