import React, { useState, useMemo, useContext, useEffect } from 'react';
import { LangContext } from './index';
import { 
  Search, Crown, MapPin, Flag, Briefcase, GraduationCap, 
  Infinity, Clock, ArrowRight, ShieldCheck, Flame, Zap,
  Languages, Globe, MessageCircle, Send, Radio, HelpCircle
} from 'lucide-react';

const BrandBanner = ({ promotions, category }: { promotions: any[], category?: string }) => {
  const activePromo = useMemo(() => {
    const now = new Date();
    return (promotions || []).find(p => 
      new Date(p.startDate) <= now && 
      new Date(p.endDate) >= now && 
      (!p.targetCategory || p.targetCategory === category || p.targetCategory === 'GLOBAL')
    );
  }, [promotions, category]);

  if (!activePromo) return (
    <div className="glass rounded-[40px] p-12 text-center border-dashed border-white/10 group hover:border-emerald-500/30 transition-all cursor-pointer">
       <span className="bg-white/5 text-slate-800 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest italic group-hover:text-emerald-500">REVENUE_GATE_READY: BROADCAST_SLOT_01</span>
    </div>
  );

  return (
    <div onClick={() => window.open(activePromo.link, '_blank')} className="w-full h-80 relative rounded-[40px] overflow-hidden border border-emerald-500/20 cursor-pointer group shadow-emerald animate-in zoom-in-95 duration-1000">
       <img src={activePromo.bannerUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[5000ms]" alt="Partner Banner"/>
       <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-60"></div>
       <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
          <div className="bg-emerald-600 text-black px-4 py-1 rounded-full font-black text-xs italic mb-2 border border-black uppercase tracking-widest animate-bounce">OFFICIAL_PARTNER</div>
          <h3 className="text-5xl font-black text-white italic uppercase tracking-tighter leading-none">{activePromo.brandName}</h3>
       </div>
    </div>
  );
};

export const PublicPortal = ({ db, setAdminMode }: any) => {
  const { lang, setLang } = useContext(LangContext);
  const [search, setSearch] = useState('');

  const sections = [
    { id: 'TS_GOVT', label: lang === 'te' ? 'తెలంగాణ ఉద్యోగాలు' : 'TELANGANA_NODES', icon: <MapPin/>, color: 'emerald' },
    { id: 'AP_GOVT', label: lang === 'te' ? 'ఆంధ్రప్రదేశ్ ఉద్యోగాలు' : 'ANDHRA_NODES', icon: <Flag/>, color: 'blue' },
    { id: 'PRIVATE', label: lang === 'te' ? 'ప్రైవేట్ రంగాలు' : 'PRIVATE_CLUSTERS', icon: <Briefcase/>, color: 'pink' },
    { id: 'ENTRANCE', label: lang === 'te' ? 'ప్రవేశ పరీక్షలు' : 'ENTRANCE_LATTICE', icon: <GraduationCap/>, color: 'yellow' }
  ];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-emerald-600 font-sans pb-96 overflow-x-hidden">
      
      {/* IMPERIAL TOP HUD */}
      <div className="bg-emerald-600 py-3 text-center border-b border-black sticky top-0 z-[100] shadow-4xl overflow-hidden">
         <div className="flex animate-marquee whitespace-nowrap gap-12 items-center">
            {[1,2,3,4].map(i => (
              <span key={i} className="text-black font-black uppercase text-[12px] tracking-[0.8em] italic flex items-center gap-4 px-12">
                <Radio size={16} className="animate-pulse"/> {lang === 'te' ? 'రియల్ టైమ్ అప్ డేట్స్' : 'REAL_TIME_MASTERY'} • {lang === 'te' ? 'నోటిఫికేషన్ అలెర్ట్స్' : 'AI_ENGINE_ACTIVE'} • {lang === 'te' ? 'ప్రతి రోజూ కొత్త ఉద్యోగాలు' : 'SOVEREIGN_V4.0'}
              </span>
            ))}
         </div>
      </div>

      <header className="glass p-8 sm:p-12 space-y-12 sticky top-[45px] z-[90]">
         <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-6 cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
               <div className="w-12 h-12 sm:w-16 sm:h-16 bg-emerald-600 rounded-full flex items-center justify-center shadow-emerald border-[4px] border-black group-hover:rotate-180 transition-all duration-700">
                  <Infinity size={32} className="text-black"/>
               </div>
               <div className="hidden sm:block space-y-1">
                  <h1 className="text-4xl font-black tracking-tighter italic leading-none text-white uppercase">STUDENT<span className="text-emerald-500">DIALUP.</span></h1>
                  <p className="text-[10px] font-black text-slate-800 uppercase tracking-[1em] italic leading-none">OMNISCIENCE_PROTOCOL_V4</p>
               </div>
            </div>
            
            <div className="flex items-center gap-4">
               <div className="bg-white/5 border border-white/10 rounded-full p-1 flex items-center gap-1 shadow-inner">
                  <button 
                    onClick={() => setLang('te')}
                    className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${lang === 'te' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' : 'text-slate-500 hover:text-white'}`}
                  >
                    తెలుగు
                  </button>
                  <button 
                    onClick={() => setLang('en')}
                    className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${lang === 'en' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-500 hover:text-white'}`}
                  >
                    ENGLISH
                  </button>
               </div>
               <button onClick={setAdminMode} className="p-4 glass rounded-full hover:text-emerald-500 transition-all shadow-4xl border border-white/10"><Crown size={24}/></button>
            </div>
         </div>

         <div className="max-w-7xl mx-auto relative group">
            <input 
              className="w-full bg-black border border-white/5 rounded-full px-10 py-6 text-2xl sm:text-4xl font-black text-white outline-none focus:border-emerald-600 transition-all placeholder:text-slate-950 italic shadow-2xl" 
              placeholder={lang === 'te' ? 'ఉద్యోగాల కోసం ఇక్కడ వెతకండి...' : 'SEARCH_THE_GOD_MESH...'} 
              value={search} 
              onChange={e => setSearch(search)}
            />
            <Search size={32} className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-900 group-hover:text-emerald-500 transition-colors"/>
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
                       <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl glass flex items-center justify-center text-${section.color}-500 border border-${section.color}-500/20 shadow-xl`}>
                          {section.icon}
                       </div>
                       <h2 className="text-3xl sm:text-5xl font-black italic tracking-tighter text-white uppercase leading-none">{section.label}</h2>
                    </div>
                    <div className="bg-white/5 px-6 py-2 rounded-full text-xs font-black text-slate-800 uppercase italic tracking-widest">{sectionJobs.length} NODES</div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {sectionJobs.map((item: any) => {
                       const isNew = (Date.now() - (item.id || 0)) < 3 * 24 * 60 * 60 * 1000;
                       return (
                          <div key={item.id} className="glass rounded-[60px] overflow-hidden hover:border-emerald-600 transition-all group cursor-pointer shadow-4xl relative">
                             <div className="h-80 sm:h-96 relative bg-black overflow-hidden border-b border-white/5">
                                <img src={item.thumbnail} className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-all duration-[10000ms] group-hover:opacity-100" alt={item.title_en} />
                                <div className="absolute top-8 left-8 bg-emerald-600 text-black px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest italic border border-black z-10 leading-none shadow-2xl">{item.org}</div>
                                
                                {/* Viral Stickers */}
                                <div className="absolute top-8 right-8 flex flex-col gap-2 z-10 items-end">
                                   {isNew && <div className="bg-pink-600 text-white px-3 py-1 rounded-full text-[9px] font-black uppercase italic border border-black animate-pulse">NEW_LAUNCH</div>}
                                   {item.stickers?.map((s: string) => (
                                     <span key={s} className="bg-black/80 backdrop-blur-xl border border-white/10 text-white px-3 py-1 rounded-full text-[9px] font-black uppercase italic leading-none">{s}</span>
                                   ))}
                                </div>

                                <div className="absolute bottom-8 left-8 z-10">
                                   <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                                      <HelpCircle size={14} className="text-pink-500"/>
                                      <span className="text-[10px] font-black text-white uppercase italic">Mock Test Available</span>
                                   </div>
                                </div>
                             </div>
                             
                             <div className="p-8 sm:p-12 space-y-10">
                                <div className="space-y-4">
                                   <h3 className="text-3xl sm:text-5xl font-black italic uppercase tracking-tighter leading-[0.85] group-hover:text-emerald-500 transition-colors">
                                      {item.title_te}
                                   </h3>
                                   <h4 className="text-xl sm:text-2xl font-bold text-slate-500 italic uppercase leading-tight opacity-50">
                                      {item.title_en}
                                   </h4>
                                </div>

                                <div className="flex items-center justify-between pt-10 border-t border-white/5">
                                   <div className="flex items-center gap-3 text-xs font-black text-slate-800 uppercase italic"><Clock size={20} className="text-emerald-600"/> {item.lastDate}</div>
                                   <div className="flex items-center gap-4 text-emerald-600 font-black text-sm uppercase group-hover:translate-x-3 transition-transform italic">
                                      {lang === 'te' ? 'పూర్తి వివరాలు చూడండి' : 'EXPLORE_DETAILS'} <ArrowRight size={20}/>
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