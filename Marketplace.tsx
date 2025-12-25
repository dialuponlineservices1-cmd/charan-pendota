
import React, { useState } from 'react';
import { ShoppingBag, Plus, Trash2, Edit3, DollarSign, Package, TrendingUp, Save, X, Sparkles, Crown, Gem } from 'lucide-react';

export const Marketplace = ({ db, updateDB }: any) => {
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState<any>({ name: '', price: '', type: 'Premium Bundle', image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&q=80&w=1000' });

  const addProduct = () => {
    updateDB((p: any) => ({ ...p, products: [{ ...form, id: Date.now(), sales: 0 }, ...p.products] }));
    setIsAdding(false);
  };

  return (
    <div className="space-y-16 animate-in fade-in duration-700">
      
      {/* HEADER */}
      <div className="bg-slate-950/40 border border-white/5 p-16 rounded-[80px] flex flex-col xl:flex-row justify-between items-center gap-12 shadow-3xl overflow-hidden relative">
        <div className="absolute top-0 right-0 p-10 opacity-5 rotate-12"><Crown size={500}/></div>
        <div className="space-y-4 text-center xl:text-left relative z-10">
          <h2 className="text-9xl font-black tracking-tighter text-white uppercase italic leading-none">IMPERIAL <span className="text-emerald-500">MALL.</span></h2>
          <p className="text-[11px] font-black uppercase text-slate-700 tracking-[0.9em]">High-Revenue Global Asset Storefront</p>
        </div>
        <button onClick={() => setIsAdding(true)} className="bg-emerald-600 text-white px-16 py-8 rounded-[40px] text-[12px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-4xl flex items-center gap-4 relative z-10 active:scale-95">
          <Plus size={24}/> NEW ASSET
        </button>
      </div>

      <div className="grid lg:grid-cols-4 gap-10">
        <div className="bg-emerald-600/5 border border-emerald-500/20 rounded-[64px] p-12 space-y-4">
           <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Mall Yield</p>
           <h4 className="text-6xl font-black text-white italic">₹{(db.analytics.revenue / 1000).toFixed(1)}k</h4>
           <div className="flex items-center gap-2 text-emerald-500 text-[10px] font-black uppercase"><TrendingUp size={16}/> +42% Conversion</div>
        </div>
        <div className="bg-indigo-600/5 border border-indigo-500/20 rounded-[64px] p-12 space-y-4">
           <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Sales Nodes</p>
           <h4 className="text-6xl font-black text-white italic">{db.analytics.storeSales}</h4>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-12">
        {db.products.map((p: any) => (
          <div key={p.id} className="bg-slate-950 border border-white/5 rounded-[80px] overflow-hidden group hover:border-emerald-500/50 transition-all shadow-4xl flex flex-col">
             <div className="h-80 relative overflow-hidden">
                <img src={p.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
                <div className="absolute top-10 left-10 bg-black/60 backdrop-blur-2xl px-8 py-3 rounded-full border border-white/10">
                   <p className="text-2xl font-black text-white italic">₹{p.price}</p>
                </div>
             </div>
             <div className="p-12 space-y-10 flex-1 flex flex-col">
                <div>
                   <h4 className="text-4xl font-black text-white uppercase italic tracking-tighter leading-none group-hover:text-emerald-400 transition-colors">{p.name}</h4>
                   <p className="text-[11px] font-black text-slate-700 uppercase tracking-widest mt-4 italic">{p.type} • {p.sales} Units Sold</p>
                </div>
                <div className="flex gap-4 mt-auto">
                   <button onClick={() => updateDB((prev:any)=>({...prev, products: prev.products.filter((x:any)=>x.id!==p.id)}))} className="flex-1 h-20 bg-red-500/10 text-red-500 rounded-[32px] border border-red-500/20 hover:bg-red-500 hover:text-white transition-all"><Trash2 size={24} className="mx-auto"/></button>
                   <button className="flex-[3] h-20 bg-white/5 text-slate-500 rounded-[32px] border border-white/10 hover:bg-white/10 hover:text-white transition-all font-black uppercase text-[10px] tracking-widest">Refine Asset</button>
                </div>
             </div>
          </div>
        ))}
      </div>

      {isAdding && (
        <div className="fixed inset-0 z-[2000] bg-black/98 backdrop-blur-5xl flex items-center justify-center p-12 overflow-y-auto">
          <div className="bg-[#050505] border border-white/10 rounded-[100px] w-full max-w-2xl p-24 space-y-16 animate-in zoom-in-95 duration-500 shadow-4xl my-auto">
             <div className="flex justify-between items-center">
               <h3 className="text-7xl font-black italic uppercase tracking-tighter text-white">FORGE <span className="text-emerald-500">ASSET.</span></h3>
               <button onClick={() => setIsAdding(false)}><X size={40}/></button>
             </div>
             <div className="space-y-10">
                <input className="w-full bg-black border border-white/10 rounded-[32px] px-10 py-8 text-white font-black text-2xl outline-none focus:border-emerald-600 transition-all" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Asset Identifier" />
                <div className="grid grid-cols-2 gap-8">
                   <input type="number" className="w-full bg-black border border-white/10 rounded-[32px] px-10 py-8 text-white font-black text-2xl" value={form.price} onChange={e => setForm({...form, price: e.target.value})} placeholder="Price INR" />
                   <select className="w-full bg-black border border-white/10 rounded-[32px] px-10 py-8 text-white font-black text-2xl appearance-none" value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
                      <option>Premium Bundle</option>
                      <option>Neural Course</option>
                      <option>Empress PDF</option>
                   </select>
                </div>
                <input className="w-full bg-black border border-white/10 rounded-[32px] px-10 py-8 text-white font-black text-xl" value={form.image} onChange={e => setForm({...form, image: e.target.value})} placeholder="Asset Thumbnail URI" />
                <button onClick={addProduct} className="w-full bg-emerald-600 py-12 rounded-[60px] font-black uppercase tracking-[0.4em] text-sm shadow-4xl hover:bg-white hover:text-black transition-all flex items-center justify-center gap-6">
                   <Gem size={32}/> DEPLOY TO IMPERIAL MALL
                </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};
