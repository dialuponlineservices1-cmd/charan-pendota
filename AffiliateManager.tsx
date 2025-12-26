
import React, { useState } from 'react';
import { 
  ShoppingCart, Plus, Trash2, Edit3, DollarSign, Package, 
  TrendingUp, Save, X, Sparkles, BookOpen, Link as LinkIcon, 
  ArrowUpRight, Target, Zap, Crown, Box
} from 'lucide-react';

export const AffiliateManager = ({ db, updateDB }: any) => {
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState<any>({
    productName: '',
    affiliateLink: '',
    category: 'BOOKS',
    commission: '',
    priority: 'HIGH'
  });

  const commitLink = () => {
    updateDB((p: any) => ({
      ...p,
      affiliates: [{ ...form, id: `aff_${Date.now()}` }, ...(p.affiliates || [])]
    }));
    setIsAdding(false);
    setForm({ productName: '', affiliateLink: '', category: 'BOOKS', commission: '', priority: 'HIGH' });
  };

  return (
    <div className="space-y-32 animate-in fade-in duration-1000 pb-100">
      
      <div className="bg-black border-[40px] border-white/5 p-24 rounded-[200px] flex flex-col xl:flex-row justify-between items-center gap-12 shadow-4xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5 rotate-12 scale-150"><ShoppingCart size={500}/></div>
        <div className="space-y-6 text-center xl:text-left relative z-10">
          <h2 className="text-[120px] font-black italic text-white uppercase tracking-tighter leading-none">SYNERGY <span className="text-yellow-600">HUB.</span></h2>
          <p className="text-[14px] font-black text-slate-900 uppercase tracking-[1.2em] italic leading-none">NEURAL_AFFILIATE_NETWORK_V1</p>
        </div>
        <button onClick={() => setIsAdding(true)} className="bg-yellow-600 text-black px-16 py-8 rounded-full font-black uppercase text-2xl tracking-[1em] hover:bg-white hover:text-black transition-all shadow-[0_0_8000px_gold] flex items-center gap-6 relative z-10 active:scale-95 border-[15px] border-black italic leading-none">
          <Plus size={40}/> SYNERGIZE_ASSET
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="bg-yellow-600/5 border-[15px] border-yellow-600/20 rounded-[100px] p-16 space-y-6 text-center group hover:border-yellow-600 transition-all">
           <Zap size={100} className="text-yellow-600 mx-auto animate-pulse"/>
           <h4 className="text-4xl font-black text-white italic uppercase tracking-tighter leading-none">SYNERGY_YIELD</h4>
           <div className="text-7xl font-black text-yellow-600">₹42.8k</div>
           <p className="text-[12px] font-black text-slate-800 uppercase tracking-widest italic">ESTIMATED_MONTHLY_COMMISSION</p>
        </div>
        {/* Repeating pattern for other stats... */}
      </div>

      <div className="grid lg:grid-cols-3 gap-16">
        {(db.affiliates || []).map((aff: any) => (
          <div key={aff.id} className="bg-black border-[20px] border-white/5 rounded-[500px] p-100 flex flex-col group hover:border-yellow-600 transition-all shadow-4xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-32 opacity-[0.03] scale-150 rotate-12"><Box size={300}/></div>
             <div className="space-y-48 relative z-10">
                <div className="flex justify-between items-start">
                   <div className="bg-white/5 border border-white/10 px-8 py-2 rounded-full font-black text-[12px] text-yellow-600 uppercase italic tracking-widest">{aff.category}</div>
                   <div className="text-emerald-500 font-black text-3xl italic">₹{aff.commission} Yield</div>
                </div>
                <h4 className="text-6xl font-black text-white italic uppercase tracking-tighter leading-tight line-clamp-2">{aff.productName}</h4>
                <div className="flex gap-6">
                   <button onClick={() => window.open(aff.affiliateLink, '_blank')} className="flex-1 bg-white/5 h-20 rounded-full border border-white/5 hover:bg-white hover:text-black transition-all flex items-center justify-center gap-4 italic text-2xl font-black uppercase tracking-widest"><ArrowUpRight size={24}/> TEST_NODE</button>
                   <button onClick={() => updateDB((p:any)=>({...p, affiliates: p.affiliates.filter((x:any)=>x.id!==aff.id)}))} className="w-20 h-20 bg-red-500/10 text-red-500 rounded-full border border-red-500/20 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center"><Trash2 size={32}/></button>
                </div>
             </div>
          </div>
        ))}
      </div>

      {isAdding && (
        <div className="fixed inset-0 z-[5000] bg-black/99 backdrop-blur-6xl flex items-center justify-center p-12 overflow-y-auto">
          <div className="bg-[#050505] border-[50px] border-yellow-600/20 rounded-[150px] w-full max-w-5xl p-24 space-y-16 animate-in zoom-in-95 duration-500 shadow-4xl my-auto">
             <div className="flex justify-between items-center">
               <h3 className="text-8xl font-black italic uppercase tracking-tighter text-white leading-none">FORGE <span className="text-yellow-600">SYNERGY.</span></h3>
               <button onClick={() => setIsAdding(false)} className="p-10 hover:bg-red-500/20 rounded-full transition-all text-red-500"><X size={64}/></button>
             </div>
             <div className="space-y-10">
                <div className="grid grid-cols-2 gap-10">
                   <div className="space-y-4">
                      <label className="text-[12px] font-black text-slate-800 uppercase tracking-widest ml-4 italic">PRODUCT_IDENTITY</label>
                      <input className="w-full bg-black border-[10px] border-white/10 rounded-full px-12 py-6 text-white font-black text-4xl outline-none focus:border-yellow-600 italic shadow-inner" placeholder="e.g. Vijeta Competitions TS Special..." value={form.productName} onChange={e => setForm({...form, productName: e.target.value})} />
                   </div>
                   <div className="space-y-4">
                      <label className="text-[12px] font-black text-slate-800 uppercase tracking-widest ml-4 italic">CATEGORY_STRATA</label>
                      <select className="w-full bg-black border-[10px] border-white/10 rounded-full px-12 py-6 text-white font-black text-4xl outline-none focus:border-yellow-600 italic appearance-none" value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
                         <option value="BOOKS">BOOKS & GUIDES</option>
                         <option value="COACHING">COACHING PACKS</option>
                         <option value="GADGETS">STUDY GEAR</option>
                         <option value="MISC">MISC_NODES</option>
                      </select>
                   </div>
                </div>
                <div className="space-y-4">
                   <label className="text-[12px] font-black text-slate-800 uppercase tracking-widest ml-4 italic">AFFILIATE_GATEWAY_URI</label>
                   <input className="w-full bg-black border-[10px] border-white/10 rounded-full px-12 py-6 text-emerald-500 font-black text-4xl outline-none focus:border-emerald-500 italic shadow-inner" placeholder="PASTE_AMAZON_OR_SYNERGY_LINK..." value={form.affiliateLink} onChange={e => setForm({...form, affiliateLink: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-10">
                   <input type="number" className="w-full bg-black border-[10px] border-yellow-600/30 rounded-full px-12 py-6 text-yellow-600 font-black text-4xl" placeholder="Expected Commission ₹" value={form.commission} onChange={e => setForm({...form, commission: e.target.value})} />
                   <select className="w-full bg-black border-[10px] border-white/10 rounded-full px-12 py-6 text-white font-black text-4xl italic appearance-none" value={form.priority} onChange={e => setForm({...form, priority: e.target.value})}>
                      <option value="HIGH">PRIORITY: HIGH (Sticky)</option>
                      <option value="NORMAL">PRIORITY: NORMAL</option>
                      <option value="LOW">PRIORITY: LOW</option>
                   </select>
                </div>
                <button onClick={commitLink} className="w-full bg-yellow-600 py-12 rounded-full font-black uppercase text-[56px] tracking-[1em] shadow-4xl hover:bg-white hover:text-black transition-all italic border-[20px] border-black flex items-center justify-center gap-10 leading-none">
                   <Zap size={64}/> INJECT_SYNERGY
                </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};
