
import React, { useState, useMemo, useContext, useEffect } from 'react';
import { LangContext } from './index';
import { 
  Search, Crown, MapPin, Flag, Briefcase, GraduationCap, 
  Infinity, Clock, ArrowRight, ShieldCheck, Flame, Zap
} from 'lucide-react';

const BrandBanner = ({ promotions, category }: { promotions: any[], category?: string }) => {
  const activePromo = useMemo(() => {
    const now = new Date();
    return promotions.find(p => 
      new Date(p.startDate) <= now && 
      new Date(p.endDate) >= now && 
      (!p.targetCategory || p.targetCategory === category || p.targetCategory === 'GLOBAL')
    );
  }, [promotions, category]);

  if (!activePromo) return (
    <div className="glass rounded-[40px] p-12 text-center border-dashed border-white/10 group hover:border-pink-500/30 transition-all cursor-pointer">
       <span className="bg-white/5 text-slate-800 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest italic group-hover:text-pink-500">AETHELGARD_AD_EXCHANGE_V3000_ACTIVE</span>
    </div>
  );

  return (
    <div onClick={() => window.open(activePromo.link, '_blank')} className="w-full h-80 relative rounded-[40px] overflow-hidden border border-pink-500/20 cursor-pointer group shadow-pink animate-in zoom-in-95 duration-1000">
       <img src={activePromo.bannerUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[5000ms]" alt="Partner Banner"/>
       <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-60"></div>
       <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
          <div className="bg-pink-600 text-black px-4 py-1 rounded-full font-black text-xs italic mb-2 border border-black uppercase tracking-widest animate-bounce">OFFICIAL_PARTNER</div>
          <h3 className="text-5xl font-black text-white italic uppercase tracking-tighter leading-none">{activePromo.brandName}</h3>
       </div>
    </div>
  );
};

export const PublicPortal = ({ db, setAdminMode, updateDB }: any) => {
  const { lang, setLang } = useContext(LangContext);
  const [search, setSearch] = useState('');

  const sections = [
    { id: 'TS_GOVT', label: 'TELANGANA_NODES', icon: <MapPin/>, color: 'emerald' },
    { id: 'AP_GOVT', label: 'ANDHRA_NODES', icon: <Flag/>, color: 'blue' },
    { id: 'PRIVATE', label: 'PRIVATE_CLUSTERS', icon: <Briefcase/>, color: 'pink' },
    { id: 'ENTRANCE', label: 'ENTRANCE_LATTICE', icon: <GraduationCap/>, color: 'yellow' }
  ];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-pink-600 font-sans pb-[2000px]">
      
      {/* V3000 MARQUEE */}
      <div className="bg-pink-600 py-3 text-center border-b border-black sticky top-0 z-[100] shadow-4xl overflow-hidden">
         <div className="flex animate-marquee whitespace-nowrap gap-12 items-center">
            {[1,2,3,4].map(i => (
              <span key={i} className="text-black font-black uppercase text-[14px] tracking-[1em] italic flex items-center gap-4 px-12">
                <ShieldCheck size={16}/> SOVEREIGN_V3.0 • REAL_TIME_MASTERY • QUANTUM_FUTURES • AI_BROTHER_ACTIVE
              </span>
            ))}
         </div>
      </div>

      <header className="glass p-12 space-y-12 sticky top-[45px] z-[90]">
         <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-6 cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
               <div className="w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center shadow-pink border-[4px] border-black group-hover:rotate-180 transition-all duration-700">
                  <Infinity size={32} className="text-black"/>
               </div>
               <div className="space-y-1">
                  <h1 className="text-4xl font-black tracking-tighter italic leading-none text-white uppercase">STUDENT<span className="text-pink-500">DIALUP.</span></h1>
                  <p className="text-[10px] font-black text-slate-800 uppercase tracking-[1em] italic leading-none">OMNISCIENCE_PROTOCOL_V3</p>
               </div>
            </div>
            <button onClick={setAdminMode} className="p-4 glass rounded-full hover:text-pink-500 transition-all shadow-4xl border border-white/10"><Crown size={24}/></button>
         </div>

         <div className="max-w-7xl mx-auto relative group">
            <input 
              className="w-full bg-black border border-white/5 rounded-full px-10 py-6 text-4xl font-black text-white outline-none focus:border-pink-600 transition-all placeholder:text-slate-950 italic" 
              placeholder="SEARCH_THE_GOD_MESH..." 
              value={search} 
              onChange={e => setSearch(e.target.value)}
            />
            <Search size={32} className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-900 group-hover:text-pink-500 transition-colors"/>
         </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 space-y-24 mt-12">
         <BrandBanner promotions={db.promotions} category="GLOBAL" />

         {sections.map(section => {
            const sectionJobs = db.jobs.filter((j: any) => j.category === section.id && (j.title_en + j.title_te).toLowerCase().includes(search.toLowerCase()));
            if (sectionJobs.length === 0 && search) return null;
            
            return (
              <section key={section.id} className="space-y-12">
                 <div className="flex items-center justify-between border-b border-white/5 pb-8">
                    <div className="flex items-center gap-6">
                       <div className={`w-14 h-14 rounded-2xl glass flex items-center justify-center text-${section.color}-500 border border-${section.color}-500/20`}>
                          {section.icon}
                       </div>
                       <h2 className="text-5xl font-black italic tracking-tighter text-white uppercase leading-none">{section.label}</h2>
                    </div>
                    <div className="bg-white/5 px-6 py-2 rounded-full text-xs font-black text-slate-800 uppercase italic tracking-widest">{sectionJobs.length} NODES</div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {sectionJobs.map((item: any) => {
                       const isNew = (Date.now() - (item.id || 0)) < 7 * 24 * 60 * 60 * 1000;
                       return (
                          <div key={item.id} className="glass rounded-[50px] overflow-hidden hover:border-pink-600 transition-all group cursor-pointer shadow-4xl relative">
                             <div className="h-96 relative bg-black overflow-hidden">
                                <img src={item.thumbnail} className="w-full h-full object-cover opacity-30 group-hover:scale-105 transition-all duration-[10000ms] grayscale group-hover:grayscale-0" alt={item.title_en} />
                                <div className="absolute top-6 left-6 bg-pink-600 text-black px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest italic border border-black z-10 leading-none">{item.org}</div>
                                {isNew && <div className="absolute top-6 right-6 bg-emerald-500 text-black px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest italic z-10 animate-pulse border border-black">NEW_NODE</div>}
                             </div>
                             <div className="p-10 space-y-12">
                                <h3 className="text-5xl font-black italic uppercase tracking-tighter leading-[0.85] group-hover:text-pink-500 transition-colors">
                                   {lang === 'en' ? item.title_en : item.title_te}
                                </h3>
                                <div className="flex items-center justify-between pt-8 border-t border-white/5">
                                   <div className="flex items-center gap-3 text-xs font-black text-slate-800 uppercase italic"><Clock size={16}/> {item.lastDate}</div>
                                   <div className="flex items-center gap-3 text-pink-600 font-black text-xs uppercase group-hover:translate-x-2 transition-transform italic">
                                      VIEW_INTEL <ArrowRight size={16}/>
                                   </div>
                                </div>
                             </div>
                          </div>
                       );
                    })}
                 </div>
              </section>
            );
         })}
      </main>
    </div>
  );
};