
import React, { useState } from 'react';
import { 
  Megaphone, Plus, Trash2, Edit3, DollarSign, Calendar, 
  TrendingUp, Save, X, Sparkles, Clock, Globe, ExternalLink,
  ShieldCheck, AlertCircle, BarChart3, Radio, Link as LinkIcon, Image as ImageIcon, Target
} from 'lucide-react';

export const PromotionsManager = ({ db, updateDB }: any) => {
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState<any>({
    brandName: '',
    bannerUrl: '',
    link: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
    revenue: '',
    targetCategory: 'GLOBAL'
  });

  const commitPromo = () => {
    updateDB((p: any) => ({
      ...p,
      promotions: [{ ...form, id: `p_${Date.now()}` }, ...(p.promotions || [])]
    }));
    setIsAdding(false);
    setForm({ brandName: '', bannerUrl: '', link: '', startDate: '', endDate: '', revenue: '', targetCategory: 'GLOBAL' });
  };

  const deletePromo = (id: string) => {
    if(!confirm("Eject this brand node?")) return;
    updateDB((p:any) => ({ ...p, promotions: p.promotions.filter((x:any) => x.id !== id) }));
  };

  return (
    <div className="space-y-24 animate-in fade-in duration-1000 pb-96">
      
      <div className="bg-black border-[30px] border-white/5 p-12 rounded-[120px] flex flex-col md:flex-row justify-between items-center gap-8 shadow-4xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5 rotate-12"><Megaphone size={400}/></div>
        <div className="space-y-4 text-center md:text-left relative z-10">
          <h2 className="text-8xl font-black italic text-white uppercase tracking-tighter leading-none">REVENUE <span className="text-yellow-600">MATRIX.</span></h2>
          <p className="text-[12px] font-black text-slate-800 uppercase tracking-[1em] italic leading-none">TARGETED_AD_INJECTION_CORE_V8</p>
        </div>
        <button onClick={() => setIsAdding(true)} className="bg-yellow-600 text-black px-12 py-4 rounded-full font-black uppercase text-xl tracking-[1em] hover:bg-white hover:text-black transition-all shadow-[0_0_5000px_gold] flex items-center gap-4 relative z-10 active:scale-95 border-[10px] border-black italic leading-none">
          <Plus size={32}/> FORGE_CAMPAIGN
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {(db.promotions || []).map((p: any) => {
          const isActive = new Date(p.endDate) >= new Date();
          return (
            <div key={p.id} className="bg-black border border-white/5 rounded-[80px] overflow-hidden group hover:border-yellow-600 transition-all flex flex-col shadow-4xl relative">
               <div className="h-64 relative overflow-hidden">
                  <img src={p.bannerUrl} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" alt={p.brandName}/>
                  <div className="absolute top-4 left-4 bg-black/60 px-4 py-1 rounded-full border border-white/10 flex items-center gap-2">
                     <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}></div>
                     <span className="text-[10px] font-black uppercase text-white italic leading-none">{isActive ? 'LIVE_STREAMING' : 'NODE_DEAD'}</span>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-yellow-600 text-black px-4 py-1 rounded-full font-black text-[10px] uppercase italic">TARGET: {p.targetCategory || 'GLOBAL'}</div>
               </div>
               <div className="p-8 space-y-6 flex-1 flex flex-col">
                  <div>
                    <h4 className="text-4xl font-black text-white italic uppercase tracking-tighter leading-none">{p.brandName}</h4>
                    <p className="text-[11px] font-black text-slate-800 uppercase tracking-widest mt-2">PROJECTED_YIELD: ₹{p.revenue}</p>
                  </div>
                  <div className="flex gap-4 mt-auto">
                     <button onClick={() => window.open(p.link, '_blank')} className="flex-1 bg-white/5 h-12 rounded-full border border-white/5 hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2 italic leading-none"><ExternalLink size={16}/> PREVIEW</button>
                     <button onClick={() => deletePromo(p.id)} className="w-12 h-12 bg-red-500/10 text-red-500 rounded-full border border-red-500/20 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center leading-none"><Trash2 size={24}/></button>
                  </div>
               </div>
            </div>
          );
        })}
      </div>

      {isAdding && (
        <div className="fixed inset-0 z-[5000] bg-black/99 backdrop-blur-5xl flex items-center justify-center p-12 overflow-y-auto">
          <div className="bg-[#050505] border-[40px] border-yellow-600/20 rounded-[120px] w-full max-w-4xl p-16 space-y-12 animate-in zoom-in-95 duration-500 shadow-4xl my-auto">
             <div className="flex justify-between items-center">
               <h3 className="text-6xl font-black italic uppercase tracking-tighter text-white leading-none">FORGE <span className="text-yellow-600">INJECTION.</span></h3>
               <button onClick={() => setIsAdding(false)} className="p-8 hover:bg-red-500/20 rounded-full transition-all text-red-500"><X size={48}/></button>
             </div>
             <div className="space-y-8">
                <div className="grid grid-cols-2 gap-8">
                   <div className="space-y-4">
                      <label className="text-[10px] font-black text-slate-800 uppercase tracking-widest ml-4 italic">IDENTITY</label>
                      <input className="w-full bg-black border border-white/10 rounded-full px-8 py-4 text-white font-black text-2xl outline-none focus:border-yellow-600 italic" placeholder="Brand Name..." value={form.brandName} onChange={e => setForm({...form, brandName: e.target.value})} />
                   </div>
                   <div className="space-y-4">
                      <label className="text-[10px] font-black text-slate-800 uppercase tracking-widest ml-4 italic">TARGET_CATEGORY</label>
                      <select className="w-full bg-black border border-white/10 rounded-full px-8 py-4 text-white font-black text-2xl outline-none focus:border-yellow-600 italic appearance-none" value={form.targetCategory} onChange={e => setForm({...form, targetCategory: e.target.value})}>
                         <option value="GLOBAL">GLOBAL (All Pages)</option>
                         <option value="TS_GOVT">TELANGANA ONLY</option>
                         <option value="AP_GOVT">ANDHRA ONLY</option>
                         <option value="PRIVATE">PRIVATE ONLY</option>
                      </select>
                   </div>
                </div>
                <div className="grid grid-cols-2 gap-8">
                   <input className="w-full bg-black border border-white/10 rounded-full px-8 py-4 text-white font-black italic" placeholder="Banner URL..." value={form.bannerUrl} onChange={e => setForm({...form, bannerUrl: e.target.value})} />
                   <input className="w-full bg-black border border-white/10 rounded-full px-8 py-4 text-white font-black italic" placeholder="Target Link..." value={form.link} onChange={e => setForm({...form, link: e.target.value})} />
                </div>
                <div className="grid grid-cols-3 gap-8">
                   <input type="date" className="w-full bg-black border border-white/10 rounded-full px-8 py-4 text-white font-black italic" value={form.startDate} onChange={e => setForm({...form, startDate: e.target.value})} />
                   <input type="date" className="w-full bg-black border border-white/10 rounded-full px-8 py-4 text-white font-black italic" value={form.endDate} onChange={e => setForm({...form, endDate: e.target.value})} />
                   <input type="number" className="w-full bg-black border border-yellow-600/30 rounded-full px-8 py-4 text-yellow-600 font-black italic" placeholder="Revenue ₹" value={form.revenue} onChange={e => setForm({...form, revenue: e.target.value})} />
                </div>
                <button onClick={commitPromo} className="w-full bg-yellow-600 py-10 rounded-full font-black uppercase text-3xl tracking-[1em] shadow-4xl hover:bg-white hover:text-black transition-all italic border-[15px] border-black flex items-center justify-center gap-6 leading-none">
                   <Target size={48}/> DEPLOY_INJECTION
                </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};
