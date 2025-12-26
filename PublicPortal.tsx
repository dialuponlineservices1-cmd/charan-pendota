
import React, { useState, useMemo, useContext, useEffect } from 'react';
import { LangContext } from './index';
import { 
  Search, Globe, MapPin, Zap, MessageCircle, Send, 
  ChevronRight, Crown, Cpu, Clock, Heart, Megaphone, 
  Briefcase, GraduationCap, Ticket, FileText, Sparkles, Flame, DollarSign, Target, Languages, 
  ArrowRight, ExternalLink, Menu, X, Share2, Info, CheckCircle2
} from 'lucide-react';

export const PublicPortal = ({ db, setAdminMode }: any) => {
  const { lang, setLang } = useContext(LangContext);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [showTranslateToast, setShowTranslateToast] = useState(true);

  // Auto-hide toast after interaction
  useEffect(() => {
    if (selectedPost) window.scrollTo(0, 0);
  }, [selectedPost]);

  const categories = [
    { id: 'all', label: lang === 'en' ? 'Latest Feed' : 'తాజా ఫీడ్', icon: <Zap size={18}/> },
    { id: 'jobs', label: lang === 'en' ? 'Govt Jobs' : 'ప్రభుత్వ ఉద్యోగాలు', icon: <Briefcase size={18}/> },
    { id: 'hallTickets', label: lang === 'en' ? 'Hall Tickets' : 'హాల్ టికెట్లు', icon: <Ticket size={18}/> },
    { id: 'results', label: lang === 'en' ? 'Results' : 'ఫలితాలు', icon: <FileText size={18}/> },
  ];

  const filteredData = useMemo(() => {
    let combined = [...db.jobs];
    if (filter !== 'all') combined = db[filter] || [];
    return combined.filter((item: any) => 
      (item.title_en + item.title_te).toLowerCase().includes(search.toLowerCase()) || 
      item.org.toLowerCase().includes(search.toLowerCase())
    );
  }, [db, search, filter]);

  const SidebarNews = () => (
    <div className="space-y-12 h-fit sticky top-48">
      {/* SIDEBAR REVENUE NODE 1 */}
      <div className="bg-gradient-to-br from-red-600 to-indigo-700 p-[2px] rounded-[60px] shadow-4xl animate-pulse">
        <div className="bg-black rounded-[58px] p-10 text-center space-y-6">
           <p className="text-[10px] font-black text-red-500 uppercase tracking-widest">IMPERIAL_AD_SLOT</p>
           <h6 className="text-2xl font-black italic uppercase text-white leading-tight">Master the AP/TS Exams Today.</h6>
           <button className="w-full py-4 bg-white text-black rounded-full font-black uppercase text-[10px] tracking-widest">JOIN PREMIUM</button>
        </div>
      </div>

      <div className="bg-[#050505] border border-white/5 rounded-[80px] p-10 space-y-10 shadow-4xl">
        <div className="flex items-center justify-between px-6">
           <h4 className="text-[12px] font-black text-red-600 uppercase tracking-[0.5em] italic flex items-center gap-4"><Flame size={20}/> RELATED NODES</h4>
           <div className="w-3 h-3 bg-red-600 rounded-full animate-ping"></div>
        </div>
        <div className="space-y-8">
           {db.jobs.slice(0, 12).map((job: any) => (
             <div key={job.id} onClick={() => setSelectedPost(job)} className="flex gap-6 group cursor-pointer items-center bg-white/5 p-4 rounded-[40px] hover:bg-white/10 transition-all border border-transparent hover:border-red-600/30">
                <div className="w-24 h-24 rounded-[25px] overflow-hidden shrink-0 border border-white/5 group-hover:border-red-600 transition-all">
                   <img src={job.thumbnail} className="w-full h-full object-cover group-hover:scale-125 transition-all" alt={job.title_en} />
                </div>
                <div className="space-y-2">
                   <h5 className="text-lg font-black text-white italic uppercase tracking-tighter leading-[0.9] group-hover:text-red-600 transition-colors line-clamp-2">
                      {lang === 'en' ? job.title_en : job.title_te}
                   </h5>
                   <p className="text-[9px] font-black text-slate-700 uppercase">{job.org} • {job.lastDate}</p>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white selection:bg-red-600 pb-[1000px]">
      
      {/* NEURAL TRANSLATION TOAST (Top Notification) */}
      {showTranslateToast && (
        <div className="fixed top-32 right-10 md:right-32 z-[1000] animate-in slide-in-from-right-20 duration-1000">
           <div className="bg-white text-black p-6 rounded-[40px] shadow-4xl flex items-center gap-6 border-4 border-red-600">
              <div className="w-14 h-14 bg-red-600 text-white rounded-full flex items-center justify-center animate-bounce"><Languages size={24}/></div>
              <div className="pr-10">
                 <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">{lang === 'te' ? 'Translation Available' : 'తెలుగులో చదవండి'}</p>
                 <button onClick={() => { setLang(lang === 'en' ? 'te' : 'en'); setShowTranslateToast(false); }} className="text-xl font-black italic uppercase text-red-600 hover:underline">
                    {lang === 'te' ? 'SWITCH TO ENGLISH?' : 'తెలుగులోకి మార్చాలా?'}
                 </button>
              </div>
              <button onClick={() => setShowTranslateToast(false)} className="p-4 hover:bg-slate-100 rounded-full transition-all text-slate-300"><X size={24}/></button>
           </div>
        </div>
      )}

      {/* GLOBAL TOP AD */}
      {db.promotions.filter((p:any) => p.isGlobal).slice(0, 1).map((ad:any) => (
        <a key={ad.id} href={ad.link} target="_blank" className="block w-full h-18 bg-gradient-to-r from-red-600 via-indigo-700 to-red-600 flex items-center justify-center gap-10 group relative border-b border-white/10">
           <div className="absolute inset-0 bg-white/5 animate-pulse"></div>
           <p className="text-[13px] font-black italic uppercase tracking-[0.8em] text-white animate-pulse">{ad.brandName} • ZENITH SUPREMACY NODES ACTIVE</p>
        </a>
      ))}

      {/* ZENITH HEADER */}
      <header className="bg-black/95 backdrop-blur-5xl sticky top-0 z-[100] border-b border-white/10 p-10 md:p-14 space-y-12">
        <div className="max-w-[1800px] mx-auto flex items-center justify-between">
           <div className="flex items-center gap-10 cursor-pointer group" onClick={() => {setSelectedPost(null); setFilter('all');}}>
              <div className="w-20 h-20 bg-red-600 rounded-[35px] flex items-center justify-center shadow-4xl group-hover:rotate-12 transition-transform border-4 border-white/5"><Crown size={44}/></div>
              <div className="hidden sm:block">
                <h1 className="text-6xl font-black tracking-tighter italic leading-none">FREEJOBS<span className="text-red-600">.ZENITH</span></h1>
                <p className="text-[12px] font-black text-slate-800 uppercase tracking-[1em] mt-2 italic">IMPERIAL TELUGU RECRUITMENT NODES</p>
              </div>
           </div>
           
           <div className="flex items-center gap-12">
              <div className="hidden lg:flex bg-white/5 border border-white/10 rounded-full p-2">
                 <button onClick={() => setLang('te')} className={`px-12 py-5 rounded-full text-[12px] font-black uppercase tracking-widest transition-all ${lang === 'te' ? 'bg-white text-black shadow-2xl scale-105' : 'text-slate-600'}`}>తెలుగు</button>
                 <button onClick={() => setLang('en')} className={`px-12 py-5 rounded-full text-[12px] font-black uppercase tracking-widest transition-all ${lang === 'en' ? 'bg-white text-black shadow-2xl scale-105' : 'text-slate-600'}`}>English</button>
              </div>
              <button onClick={setAdminMode} className="p-8 bg-white/5 rounded-[35px] hover:text-red-500 transition-all border border-white/10 group shadow-4xl"><Cpu size={36}/></button>
           </div>
        </div>

        <div className="max-w-[1800px] mx-auto flex gap-8 overflow-x-auto scrollbar-hide px-4">
           {categories.map(cat => (
             <button key={cat.id} onClick={() => {setFilter(cat.id); setSelectedPost(null);}} className={`px-16 py-8 rounded-[45px] text-[13px] font-black uppercase tracking-[0.2em] whitespace-nowrap flex items-center gap-6 transition-all ${filter === cat.id ? 'bg-white text-black' : 'bg-white/5 text-slate-600 border border-white/5 hover:text-white'}`}>
               {cat.icon} {cat.label}
             </button>
           ))}
        </div>
      </header>

      <main className="max-w-[1800px] mx-auto p-10 md:p-32 space-y-48">
        
        {/* SEARCH ARENA (Hidden in detail view for focus) */}
        {!selectedPost && (
          <div className="relative group max-w-6xl mx-auto">
             <div className="absolute -inset-2 bg-gradient-to-r from-red-600 to-indigo-600 rounded-[100px] blur-[60px] opacity-20 group-hover:opacity-60 transition duration-1000"></div>
             <div className="relative">
                <Search className="absolute left-24 top-1/2 -translate-y-1/2 text-slate-800" size={64}/>
                <input title="Search" className="w-full bg-black border-2 border-white/10 rounded-[100px] pl-48 pr-24 py-18 text-6xl font-black outline-none focus:border-red-600 focus:ring-12 focus:ring-red-600/10 transition-all italic placeholder:text-slate-950 shadow-inner" placeholder={lang === 'en' ? "Query Neural Registry..." : "రిజిస్ట్రీని వెతకండి..."} value={search} onChange={e => setSearch(e.target.value)}/>
             </div>
          </div>
        )}

        <div className="grid lg:grid-cols-12 gap-32">
           
           {/* MAIN FEED / DETAIL VIEW */}
           <div className="lg:col-span-8">
              {selectedPost ? (
                /* 👑 IMPERIAL DETAIL VIEW (THE MONEY PAGE) */
                <article className="animate-in slide-in-from-bottom-20 duration-1000 space-y-24">
                   <button onClick={() => setSelectedPost(null)} className="px-12 py-5 bg-white/5 border border-white/10 rounded-full font-black uppercase text-[12px] tracking-widest flex items-center gap-4 hover:bg-white hover:text-black transition-all">← BACK TO REGISTRY</button>
                   
                   <div className="bg-[#050505] border border-white/5 rounded-[120px] overflow-hidden shadow-4xl relative">
                      <div className="h-[600px] relative bg-slate-950">
                         <img src={selectedPost.thumbnail} className="w-full h-full object-cover opacity-50" alt={selectedPost.title_en} />
                         <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                         <div className="absolute bottom-20 left-20 right-20 space-y-8">
                            <span className="bg-red-600 px-12 py-4 rounded-full text-[13px] font-black uppercase tracking-widest shadow-4xl italic">{selectedPost.org}</span>
                            <h1 className="text-[90px] font-black italic uppercase tracking-tighter leading-[0.75] text-white">
                               {lang === 'en' ? selectedPost.title_en : selectedPost.title_te}
                            </h1>
                         </div>
                      </div>

                      {/* POST BODY (MONETIZED) */}
                      <div className="p-24 space-y-24">
                         {/* LANGUAGE TOGGLE FOR POST */}
                         <div className="flex bg-white/5 border border-white/10 rounded-[40px] p-2 w-fit">
                            <button onClick={() => setLang('te')} className={`px-12 py-5 rounded-[35px] text-[12px] font-black uppercase tracking-widest transition-all ${lang === 'te' ? 'bg-white text-black shadow-2xl' : 'text-slate-600'}`}>తెలుగు</button>
                            <button onClick={() => setLang('en')} className={`px-12 py-5 rounded-[35px] text-[12px] font-black uppercase tracking-widest transition-all ${lang === 'en' ? 'bg-white text-black shadow-2xl' : 'text-slate-600'}`}>English</button>
                         </div>

                         {/* POST META AD SLOT */}
                         <div className="p-12 bg-white/5 border border-white/10 rounded-[60px] text-center italic text-slate-500 font-bold text-2xl group hover:border-red-600 transition-all">
                            SPONSORED_ANALYSIS: Upgrade your study node to claim this vacancy.
                         </div>

                         <div className="prose prose-invert prose-2xl max-w-none text-slate-300 font-bold leading-relaxed italic border-l-8 border-red-600/30 pl-16 py-8">
                            {lang === 'en' ? selectedPost.summary_en : selectedPost.summary_te}
                         </div>

                         {/* IMPERIAL COLORFUL TABLES (User requested: "Tables and Colourful") */}
                         <div className="grid md:grid-cols-2 gap-12 pt-16">
                            {(selectedPost.tables || []).map((t: any, i: number) => (
                               <div key={i} className={`bg-${t.color}-600/5 border border-${t.color}-600/20 p-16 rounded-[80px] space-y-4 hover:scale-105 transition-all shadow-4xl group`}>
                                  <p className="text-[12px] font-black text-slate-800 uppercase tracking-[0.5em] italic">{t.label}</p>
                                  <h4 className={`text-7xl font-black italic tracking-tighter text-${t.color}-500 uppercase leading-none group-hover:text-white transition-colors`}>{t.value}</h4>
                               </div>
                            ))}
                         </div>

                         {/* MID-ARTICLE AD INJECTION */}
                         <div className="bg-gradient-to-r from-red-600 via-indigo-700 to-red-600 rounded-[100px] p-2 animate-pulse">
                            <div className="bg-black rounded-[98px] p-24 flex flex-col lg:flex-row items-center justify-between gap-16">
                               <div className="space-y-6 text-center lg:text-left">
                                  <h4 className="text-6xl font-black italic uppercase tracking-tighter text-white">Dominate the AP/TS Exam Registry.</h4>
                                  <p className="text-2xl font-bold text-slate-500 italic">Get ultra-premium study materials and neural mock-test access.</p>
                               </div>
                               <button className="px-24 py-12 bg-white text-black rounded-full font-black uppercase text-[16px] tracking-widest shadow-4xl active:scale-95 italic flex items-center gap-8"><DollarSign size={36}/> CLAIM NOW</button>
                            </div>
                         </div>

                         <div className="pt-24 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-12">
                            <div className="flex items-center gap-8 text-2xl font-black text-slate-700 uppercase italic"><Clock size={32}/> DEADLINE SYNC: {selectedPost.lastDate}</div>
                            <a href={selectedPost.link} target="_blank" className="bg-red-600 text-white px-32 py-10 rounded-full font-black uppercase text-[18px] tracking-widest shadow-4xl hover:bg-white hover:text-black transition-all flex items-center gap-10 italic"><ExternalLink size={36}/> APPLY OFFICIAL PAYLOAD</a>
                         </div>
                      </div>
                   </div>
                </article>
              ) : (
                /* ZENITH MAIN FEED */
                <div className="space-y-40">
                   {filteredData.map((item: any, idx: number) => (
                     <React.Fragment key={item.id}>
                        <div onClick={() => setSelectedPost(item)} className="bg-[#050505] border border-white/5 rounded-[120px] overflow-hidden hover:border-red-600 transition-all group cursor-pointer shadow-4xl relative">
                           <div className="h-[650px] relative overflow-hidden bg-slate-950">
                              <img src={item.thumbnail} className="w-full h-full object-cover opacity-30 group-hover:scale-125 group-hover:opacity-100 transition-all duration-1000" alt={item.title_en}/>
                              <div className="absolute top-16 left-16 bg-red-600 text-white px-12 py-4 rounded-full text-[13px] font-black uppercase tracking-widest shadow-4xl italic">{item.org}</div>
                              <div className="absolute bottom-16 right-16 p-10 bg-black/60 backdrop-blur-3xl rounded-full border border-white/10 group-hover:text-red-600 transition-all"><Heart size={44}/></div>
                           </div>
                           <div className="p-24 space-y-16">
                              <div className="space-y-10">
                                 <h3 className="text-[75px] font-black italic uppercase tracking-tighter leading-[0.8] group-hover:text-red-600 transition-colors line-clamp-3">
                                    {lang === 'en' ? item.title_en : item.title_te}
                                 </h3>
                                 <p className="text-3xl font-bold text-slate-600 italic leading-relaxed">
                                    {lang === 'en' ? item.summary_en : item.summary_te}
                                 </p>
                              </div>
                              <div className="flex items-center justify-between pt-20 border-t border-white/5">
                                 <div className="flex items-center gap-8 text-[14px] font-black text-slate-800 uppercase italic"><Clock size={32}/> {lang === 'en' ? 'APPLY BEFORE' : 'గడువు'}: {item.lastDate}</div>
                                 <div className="flex items-center gap-8 text-red-500 font-black text-[15px] tracking-[0.5em] uppercase group-hover:translate-x-12 transition-transform italic">
                                    ACCESS PAYLOAD <ArrowRight size={36}/>
                                 </div>
                              </div>
                           </div>
                        </div>

                        {/* IN-FEED INTERSTITIAL AD (Every 2nd Post) */}
                        {(idx + 1) % 2 === 0 && (
                          <div className="bg-[#050505] border-4 border-red-600/30 rounded-[120px] p-32 flex flex-col lg:flex-row items-center justify-between gap-16 shadow-4xl relative overflow-hidden group">
                             <div className="absolute -top-32 -right-32 p-40 opacity-5 rotate-12 group-hover:scale-110 transition-transform"><Megaphone size={500}/></div>
                             <div className="space-y-10 max-w-4xl relative z-10 text-center lg:text-left">
                                <span className="bg-red-600 text-white text-[11px] font-black px-12 py-4 rounded-full uppercase tracking-[0.8em] italic">ZENITH_REVENUE_INJECTION</span>
                                <h4 className="text-8xl font-black italic uppercase tracking-tighter text-white leading-none">Unlock the Supreme Job Matrix.</h4>
                                <p className="text-4xl font-bold text-slate-500 italic uppercase">Access ultra-premium career materials in Native Telugu.</p>
                             </div>
                             <button className="px-32 py-12 bg-white text-black rounded-full font-black uppercase text-[18px] tracking-[0.5em] hover:bg-red-600 hover:text-white transition-all shadow-4xl relative z-10 active:scale-95 italic flex items-center gap-8"><Zap size={36}/> CLAIM ACCESS</button>
                          </div>
                        )}
                     </React.Fragment>
                   ))}
                </div>
              )}
           </div>

           {/* SIDEBAR (NEAT LIST VIEW) */}
           <div className="lg:col-span-4 space-y-32">
              <SidebarNews />
           </div>
        </div>

        {/* ZENITH FOOTER HERO */}
        <div className="bg-[#050505] border border-white/5 rounded-[200px] p-40 md:p-60 flex flex-col lg:flex-row items-center justify-between gap-48 relative overflow-hidden shadow-4xl">
           <div className="absolute top-0 right-0 p-48 opacity-5 scale-200 rotate-45 pointer-events-none"><Sparkles size={1200}/></div>
           <div className="space-y-20 max-w-[1000px] relative z-10 text-center lg:text-left">
              <div className="inline-flex items-center gap-10 px-12 py-6 bg-red-600/10 border border-red-600/20 rounded-full">
                 <div className="w-5 h-5 bg-red-600 rounded-full animate-ping"></div>
                 <span className="text-[14px] font-black text-red-600 uppercase tracking-widest">SENTIENT_ASPIRANT_SINGULARITY_LIVE</span>
              </div>
              <h2 className="text-9xl md:text-[250px] font-black italic uppercase tracking-tighter leading-[0.65] text-white italic">ZENITH <br/><span className="text-red-600">EMPIRE.</span></h2>
              <p className="text-6xl md:text-8xl font-bold text-slate-800 italic uppercase leading-tight">Join 184,000+ Aspirants syncing for absolute dominance.</p>
           </div>
           
           <div className="grid grid-cols-2 gap-16 relative z-10">
              {[
                { l: "SENTIENT_NODES", v: "184k", c: "red" },
                { l: "SYNC_PEAK", v: "+62k", c: "white" },
                { l: "YIELD_YTD", v: "25.8M", c: "red" },
                { l: "STABILITY", v: "99.9%", c: "white" }
              ].map(s => (
                <div key={s.l} className="bg-black border border-white/5 p-24 rounded-[120px] text-center space-y-10 hover:border-red-600 transition-all group shadow-inner">
                   <p className="text-[14px] font-black text-slate-800 uppercase tracking-widest group-hover:text-slate-500">{s.l}</p>
                   <h4 className={`text-[120px] font-black italic tracking-tighter text-${s.c}-600 group-hover:scale-110 transition-transform`}>{s.v}</h4>
                </div>
              ))}
           </div>
        </div>
      </main>

      {/* STICKY BOTTOM ANCHOR AD */}
      <footer className="fixed bottom-0 left-0 right-0 z-[1000] p-10 bg-gradient-to-t from-black via-black/98 to-transparent pointer-events-none">
         <div className="max-w-7xl mx-auto bg-red-600 text-white rounded-[100px] p-10 flex flex-col md:flex-row items-center justify-between shadow-4xl px-32 pointer-events-auto group cursor-pointer hover:bg-white hover:text-red-600 transition-all border-4 border-black">
            <div className="flex items-center gap-10">
               <div className="w-20 h-20 bg-black/20 rounded-full flex items-center justify-center animate-pulse group-hover:bg-red-600 group-hover:text-white"><Megaphone size={36}/></div>
               <div>
                  <h4 className="text-4xl font-black italic uppercase tracking-tighter leading-none">Imperial Study Registry Active.</h4>
                  <p className="text-[11px] font-black uppercase tracking-[0.5em] mt-2 opacity-80 group-hover:text-black">Claim your victory blueprint for the latest 2025 notifications.</p>
               </div>
            </div>
            <button className="bg-white text-red-600 px-16 py-6 rounded-full font-black uppercase text-[14px] tracking-widest group-hover:bg-red-600 group-hover:text-white transition-all shadow-3xl italic">SYNC NOW</button>
         </div>
      </footer>
    </div>
  );
};
