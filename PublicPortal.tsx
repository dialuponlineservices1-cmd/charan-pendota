
import React, { useState, useMemo, useContext } from 'react';
import { LangContext } from './index';
import { 
  Search, Globe, MapPin, Zap, MessageCircle, Send, 
  ChevronRight, Crown, Cpu, Clock, Heart, Megaphone, 
  Briefcase, GraduationCap, Ticket, FileText, Sparkles, Flame, DollarSign, Target, Languages, 
  ArrowRight, ExternalLink, Menu, X, Share2
} from 'lucide-react';

export const PublicPortal = ({ db, setAdminMode }: any) => {
  const { lang, setLang } = useContext(LangContext);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);

  const categories = [
    { id: 'all', label: lang === 'en' ? 'Latest Registry' : 'తాజా రిజిస్ట్రీ', icon: <Zap size={18}/> },
    { id: 'jobs', label: lang === 'en' ? 'Govt Jobs' : 'ప్రభుత్వ ఉద్యోగాలు', icon: <Briefcase size={18}/> },
    { id: 'hallTickets', label: lang === 'en' ? 'Hall Tickets' : 'హాల్ టికెట్లు', icon: <Ticket size={18}/> },
    { id: 'results', label: lang === 'en' ? 'Results' : 'ఫలితాలు', icon: <FileText size={18}/> },
  ];

  const filteredData = useMemo(() => {
    let combined = [...db.jobs, ...(db.walkins||[]), ...(db.internships||[]), ...(db.schemes||[]), ...(db.hallTickets||[]), ...(db.results||[])];
    if (filter !== 'all') combined = db[filter] || [];
    return combined.filter((item: any) => 
      (item.title_en + item.title_te).toLowerCase().includes(search.toLowerCase()) || 
      item.org.toLowerCase().includes(search.toLowerCase())
    );
  }, [db, search, filter]);

  const RelatedNodes = () => (
    <div className="bg-[#050505] border border-white/5 rounded-[80px] p-12 space-y-16 shadow-4xl h-fit sticky top-60">
      <div className="flex items-center justify-between">
         <h4 className="text-[12px] font-black text-red-600 uppercase tracking-[0.5em] italic flex items-center gap-4"><Flame size={20}/> TRENDING NODES</h4>
         <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
      </div>
      <div className="space-y-12">
         {db.jobs.slice(0, 10).map((job: any) => (
           <div key={job.id} onClick={() => setSelectedPost(job)} className="flex gap-8 group cursor-pointer items-center bg-white/5 p-6 rounded-[40px] hover:bg-white/10 transition-all border border-transparent hover:border-red-600/30">
              <div className="w-32 h-32 rounded-[30px] overflow-hidden shrink-0 border border-white/5 group-hover:border-red-600 transition-all shadow-inner">
                 <img src={job.thumbnail} className="w-full h-full object-cover group-hover:scale-125 transition-all duration-700" alt={job.title_en} />
              </div>
              <div className="space-y-3 pt-1">
                 <h5 className="text-xl font-black text-white italic uppercase tracking-tighter leading-[0.85] group-hover:text-red-600 transition-colors line-clamp-2">
                    {lang === 'en' ? job.title_en : job.title_te}
                 </h5>
                 <div className="flex items-center gap-4 text-[9px] font-black text-slate-700 uppercase tracking-widest">{job.org} • {job.lastDate}</div>
              </div>
           </div>
         ))}
      </div>
      {/* SIDEBAR AD NODE */}
      <div className="bg-gradient-to-br from-indigo-900/40 to-black border border-indigo-500/30 rounded-[60px] p-12 text-center space-y-8 group hover:border-red-600 transition-all shadow-4xl relative overflow-hidden">
         <div className="absolute -top-10 -right-10 opacity-5 rotate-12"><Megaphone size={150}/></div>
         <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest relative z-10">IMPERIAL_AD_SLOT_01</p>
         <h6 className="text-3xl font-black italic uppercase text-white relative z-10 leading-none">Access Global Career Blueprints.</h6>
         <button className="w-full py-6 bg-indigo-600 text-white rounded-full font-black uppercase text-[11px] tracking-[0.4em] shadow-3xl transition-all relative z-10">UPGRADE NOW</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white selection:bg-red-600 pb-[800px]">
      
      {/* ZENITH GLOBAL AD (TOP) */}
      {db.promotions.filter((p:any) => p.isGlobal).slice(0, 1).map((ad:any) => (
        <a key={ad.id} href={ad.link} target="_blank" className="block w-full h-16 bg-gradient-to-r from-red-600 via-indigo-700 to-red-600 flex items-center justify-center gap-8 group overflow-hidden relative border-b border-white/10">
           <div className="absolute inset-0 bg-white/5 animate-pulse"></div>
           <p className="text-[12px] font-black italic group-hover:scale-110 transition-transform relative z-10 uppercase tracking-[0.7em]">{ad.brandName} • {lang === 'en' ? 'CLAIM ZENITH ACCESS' : 'జెనిత్ యాక్సెస్ పొందండి'}</p>
        </a>
      ))}

      {/* ZENITH HEADER */}
      <header className="bg-black/98 backdrop-blur-5xl sticky top-0 z-[100] border-b border-white/5 p-10 md:p-14 space-y-12 shadow-4xl">
        <div className="max-w-[1900px] mx-auto flex items-center justify-between">
           <div className="flex items-center gap-10 cursor-pointer group" onClick={() => {setFilter('all'); setSelectedPost(null);}}>
              <div className="w-20 h-20 bg-red-600 rounded-[35px] flex items-center justify-center shadow-4xl group-hover:rotate-12 transition-transform border-4 border-white/5"><Crown size={44}/></div>
              <div className="hidden sm:block">
                <h1 className="text-6xl font-black tracking-tighter italic leading-none">SOVEREIGN<span className="text-red-600">.V6</span></h1>
                <p className="text-[12px] font-black text-slate-800 uppercase tracking-[1em] mt-2 italic">WORLD NO.1 TELUGU PORTAL</p>
              </div>
           </div>
           
           <div className="flex items-center gap-12">
              <div className="hidden md:flex bg-white/5 border border-white/10 rounded-full p-2">
                 <button onClick={() => setLang('te')} className={`px-12 py-5 rounded-full text-[12px] font-black uppercase tracking-widest transition-all ${lang === 'te' ? 'bg-white text-black shadow-2xl' : 'text-slate-600 hover:text-white'}`}>తెలుగు</button>
                 <button onClick={() => setLang('en')} className={`px-12 py-5 rounded-full text-[12px] font-black uppercase tracking-widest transition-all ${lang === 'en' ? 'bg-white text-black shadow-2xl' : 'text-slate-600 hover:text-white'}`}>English</button>
              </div>
              <button onClick={setAdminMode} className="p-8 bg-white/5 rounded-[35px] hover:text-red-500 transition-all border border-white/10 group shadow-4xl"><Cpu size={36}/></button>
              <button className="md:hidden p-8 bg-white/5 rounded-[35px] border border-white/10" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}><Menu size={36}/></button>
           </div>
        </div>

        <div className="max-w-[1900px] mx-auto flex gap-10 overflow-x-auto scrollbar-hide px-6">
           {categories.map(cat => (
             <button key={cat.id} onClick={() => {setFilter(cat.id); setSelectedPost(null);}} className={`px-16 py-8 rounded-[45px] text-[13px] font-black uppercase tracking-[0.2em] whitespace-nowrap flex items-center gap-6 transition-all shadow-4xl ${filter === cat.id ? 'bg-white text-black scale-105' : 'bg-white/5 text-slate-600 border border-white/5 hover:text-white'}`}>
               {cat.icon} {cat.label}
             </button>
           ))}
        </div>
      </header>

      <main className="max-w-[1900px] mx-auto p-8 md:p-32 space-y-48">
        
        {/* ZENITH SEARCH SYSTEM */}
        {!selectedPost && (
          <div className="relative group max-w-7xl mx-auto">
             <div className="absolute -inset-2 bg-gradient-to-r from-red-600 to-indigo-600 rounded-[100px] blur-[60px] opacity-20 group-hover:opacity-70 transition duration-1000"></div>
             <div className="relative">
                <Search className="absolute left-24 top-1/2 -translate-y-1/2 text-slate-800" size={64}/>
                <input title="Search" className="w-full bg-black border-2 border-white/5 rounded-[100px] pl-48 pr-24 py-18 text-6xl font-black outline-none focus:border-red-600 focus:ring-12 focus:ring-red-600/10 transition-all italic placeholder:text-slate-950 shadow-inner" placeholder={lang === 'en' ? "Access Neural Registry..." : "రిజిస్ట్రీని వెతకండి..."} value={search} onChange={e => setSearch(e.target.value)}/>
             </div>
          </div>
        )}

        <div className="grid lg:grid-cols-12 gap-32">
           
           {/* CONTENT ARENA */}
           <div className="lg:col-span-8 space-y-40">
              {selectedPost ? (
                /* DEEP POST VIEW (ZENITH STYLE) */
                <article className="animate-in slide-in-from-bottom-20 duration-1000 space-y-24">
                   <button onClick={() => setSelectedPost(null)} className="px-14 py-6 bg-white/5 rounded-full font-black uppercase text-[12px] tracking-widest border border-white/10 hover:bg-white hover:text-black transition-all">← BACK TO FEED</button>
                   
                   <div className="bg-[#050505] border border-white/5 rounded-[100px] overflow-hidden shadow-4xl">
                      <div className="h-[700px] relative bg-slate-950">
                         <img src={selectedPost.thumbnail} className="w-full h-full object-cover opacity-60" alt={selectedPost.title_en} />
                         <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                         <div className="absolute bottom-20 left-20 right-20 space-y-10">
                            <div className="flex gap-4">
                               <span className="bg-red-600 px-10 py-3 rounded-full text-xs font-black uppercase tracking-widest shadow-4xl italic">{selectedPost.org}</span>
                               <span className="bg-white/10 backdrop-blur-3xl px-10 py-3 rounded-full text-xs font-black uppercase tracking-widest border border-white/10 italic">DEADLINE: {selectedPost.lastDate}</span>
                            </div>
                            <h1 className="text-8xl font-black italic uppercase tracking-tighter leading-none text-white">
                               {lang === 'en' ? selectedPost.title_en : selectedPost.title_te}
                            </h1>
                         </div>
                      </div>
                      
                      <div className="p-24 space-y-20">
                         <div className="flex bg-white/5 border border-white/10 rounded-[40px] p-2 w-fit">
                            <button onClick={() => setLang('te')} className={`px-12 py-5 rounded-[35px] text-[12px] font-black uppercase tracking-widest transition-all ${lang === 'te' ? 'bg-white text-black' : 'text-slate-600'}`}>తెలుగు</button>
                            <button onClick={() => setLang('en')} className={`px-12 py-5 rounded-[35px] text-[12px] font-black uppercase tracking-widest transition-all ${lang === 'en' ? 'bg-white text-black' : 'text-slate-600'}`}>English</button>
                         </div>

                         <div className="prose prose-invert prose-2xl max-w-none font-bold text-slate-300 italic leading-relaxed pl-16 border-l-8 border-red-600/30">
                            {lang === 'en' ? selectedPost.summary_en : selectedPost.summary_te}
                         </div>

                         {/* IMPERIAL DATA TABLES */}
                         <div className="grid md:grid-cols-2 gap-10 pt-10">
                            {(selectedPost.tables || []).map((t: any, i: number) => (
                               <div key={i} className={`bg-${t.color}-600/5 border border-${t.color}-600/20 p-12 rounded-[60px] flex items-center justify-between shadow-2xl group hover:scale-105 transition-all`}>
                                  <p className="text-[12px] font-black text-slate-800 uppercase tracking-widest">{t.label}</p>
                                  <h4 className={`text-5xl font-black text-${t.color}-500 italic tracking-tighter`}>{t.value}</h4>
                                </div>
                            ))}
                         </div>

                         {/* IN-POST MONETIZATION INJECTION */}
                         <div className="bg-gradient-to-r from-red-600 via-indigo-700 to-red-600 p-2 rounded-[60px] animate-pulse">
                            <div className="bg-black rounded-[58px] p-20 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
                               <div className="space-y-4">
                                  <h4 className="text-5xl font-black italic uppercase tracking-tighter text-white">Empress Career Blueprint</h4>
                                  <p className="text-xl font-bold text-slate-500 italic">Get the God-Tier study node for this specific exam notification.</p>
                               </div>
                               <button className="px-20 py-8 bg-white text-black rounded-full font-black uppercase text-[14px] tracking-[0.5em] shadow-4xl hover:bg-red-600 hover:text-white transition-all">CLAIM BLUEPRINT</button>
                            </div>
                         </div>
                      </div>
                   </div>
                </article>
              ) : (
                /* ZENITH MAIN FEED */
                <div className="space-y-48">
                   {filteredData.map((item: any, idx: number) => (
                     <React.Fragment key={item.id}>
                        <div onClick={() => setSelectedPost(item)} className="bg-[#050505] border border-white/5 rounded-[120px] overflow-hidden hover:border-red-600 transition-all group cursor-pointer shadow-4xl relative scale-100 hover:scale-[1.02] duration-700">
                           <div className="h-[650px] relative bg-slate-950 overflow-hidden">
                              <img src={item.thumbnail} className="w-full h-full object-cover opacity-30 group-hover:scale-125 group-hover:opacity-100 transition-all duration-1000" alt={item.title_en}/>
                              <div className="absolute top-16 left-16 bg-red-600 text-white px-12 py-4 rounded-full text-[13px] font-black uppercase tracking-[0.3em] shadow-4xl italic border-4 border-white/5">{item.org}</div>
                              <div className="absolute bottom-16 right-16 flex gap-6">
                                 <div className="p-8 bg-black/60 backdrop-blur-4xl rounded-full border border-white/10 group-hover:text-red-600 transition-colors"><Heart size={36}/></div>
                                 <div className="p-8 bg-black/60 backdrop-blur-4xl rounded-full border border-white/10 group-hover:text-red-600 transition-colors"><Share2 size={36}/></div>
                              </div>
                           </div>
                           <div className="p-24 space-y-16">
                              <div className="space-y-10">
                                 <h3 className="text-7xl font-black italic uppercase tracking-tighter leading-[0.75] group-hover:text-red-600 transition-colors line-clamp-3 italic">
                                    {lang === 'en' ? item.title_en : item.title_te}
                                 </h3>
                                 <p className="text-3xl font-bold text-slate-600 italic leading-relaxed line-clamp-3">
                                    "{lang === 'en' ? item.summary_en : item.summary_te}"
                                 </p>
                              </div>
                              
                              <div className="flex items-center justify-between pt-20 border-t border-white/5">
                                 <div className="flex items-center gap-8 text-[14px] font-black text-slate-800 uppercase italic"><Clock size={32}/> {lang === 'en' ? 'APPLY BY' : 'గడువు'}: {item.lastDate}</div>
                                 <div className="flex items-center gap-6 text-red-500 font-black text-[15px] tracking-[0.5em] uppercase group-hover:translate-x-10 transition-transform italic">
                                    ACCESS PAYLOAD <ArrowRight size={32}/>
                                 </div>
                              </div>
                           </div>
                        </div>

                        {/* REVENUE INTERSTITIAL: ZENITH SPONSORED NODE (Every 2nd) */}
                        {(idx + 1) % 2 === 0 && (
                          <div className="bg-gradient-to-br from-indigo-950/60 to-black border-2 border-indigo-500/30 rounded-[120px] p-32 flex flex-col lg:flex-row items-center justify-between gap-24 shadow-4xl relative overflow-hidden group">
                             <div className="absolute -top-40 -right-40 p-48 opacity-5 rotate-12 transition-transform group-hover:scale-125 duration-1000"><Megaphone size={600}/></div>
                             <div className="space-y-12 max-w-4xl relative z-10">
                                <span className="bg-red-600 text-white text-[11px] font-black px-12 py-4 rounded-full uppercase tracking-[1em] shadow-4xl italic">ZENITH_REVENUE_INJECTION</span>
                                <h4 className="text-7xl font-black italic uppercase tracking-tighter text-white leading-none">Dominate the AP/TS Civil Service Registry.</h4>
                                <p className="text-3xl font-bold text-slate-500 italic uppercase">Access ultra-premium career materials and imperial mock tests.</p>
                             </div>
                             <button className="px-28 py-12 bg-white text-black rounded-full font-black uppercase text-[16px] tracking-[0.7em] hover:bg-red-600 hover:text-white transition-all shadow-4xl relative z-10 active:scale-95 italic flex items-center gap-8"><DollarSign size={32}/> CLAIM NOW</button>
                          </div>
                        )}
                     </React.Fragment>
                   ))}
                </div>
              )}
           </div>

           {/* SIDEBAR ARENA (NEWS-STYLE NEAT LIST) */}
           <div className="lg:col-span-4 space-y-24">
              <RelatedNodes />
           </div>
        </div>

        {/* ZENITH FOOTER HERO */}
        <div className="bg-[#050505] border border-white/5 rounded-[180px] p-36 md:p-60 flex flex-col lg:flex-row items-center justify-between gap-48 relative overflow-hidden shadow-4xl">
           <div className="absolute top-0 right-0 p-48 opacity-5 scale-200 rotate-45 pointer-events-none"><Sparkles size={1200}/></div>
           <div className="space-y-20 max-w-[1000px] relative z-10 text-center lg:text-left">
              <div className="inline-flex items-center gap-10 px-12 py-6 bg-red-600/10 border border-red-600/20 rounded-full">
                 <div className="w-5 h-5 bg-red-600 rounded-full animate-ping"></div>
                 <span className="text-[14px] font-black text-red-600 uppercase tracking-widest">GLOBAL_ASPIRANT_SINGULARITY_LIVE</span>
              </div>
              <h2 className="text-9xl md:text-[250px] font-black italic uppercase tracking-tighter leading-[0.65] text-white italic">ZENITH <br/><span className="text-red-600">EMPIRE.</span></h2>
              <p className="text-5xl md:text-7xl font-bold text-slate-800 italic uppercase leading-tight">Join 184,000+ Sentient Aspirants syncing for competitive dominance in AP & TS.</p>
              <div className="flex flex-wrap gap-12 justify-center lg:justify-start pt-20">
                 <button className="bg-white text-black px-40 py-14 rounded-full font-black uppercase text-[20px] tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-4xl active:scale-95 italic flex items-center gap-10"><Languages size={40}/> SYNC TELUGU</button>
                 <button className="bg-white/5 border border-white/10 text-white px-40 py-14 rounded-full font-black uppercase text-[20px] tracking-widest hover:bg-white/10 transition-all italic flex items-center gap-10">ENTER ARENA <ExternalLink size={40}/></button>
              </div>
           </div>
           
           <div className="grid grid-cols-2 gap-20 relative z-10">
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

      {/* ZENITH LEGAL NODES (FOOTER LINKS) */}
      <footer className="max-w-[1900px] mx-auto p-24 border-t border-white/5 text-center space-y-12 pb-[300px]">
         <div className="flex flex-wrap justify-center gap-16 text-[12px] font-black uppercase tracking-[0.5em] text-slate-800">
            <button className="hover:text-red-500 transition-colors">TERMS & CONDITIONS</button>
            <button className="hover:text-red-500 transition-colors">PRIVACY POLICY</button>
            <button className="hover:text-red-500 transition-colors">DMCA DISCLAIMER</button>
            <button className="hover:text-red-500 transition-colors">SITEMAP_CORE</button>
         </div>
         <p className="text-sm font-bold text-slate-900 italic">© 2025 SOVEREIGN ZENITH SINGULARITY. GLOBAL COMMAND ACTIVE.</p>
      </footer>

      {/* MOBILE FLOATING ZENITH CORE */}
      <footer className="fixed bottom-0 left-0 right-0 z-[1000] p-16 bg-gradient-to-t from-black via-black/99 to-transparent pointer-events-none">
         <div className="max-w-7xl mx-auto bg-[#080808]/98 backdrop-blur-5xl border border-white/10 rounded-[100px] p-10 flex items-center justify-between shadow-4xl px-28 pointer-events-auto">
            <button onClick={() => window.open(`https://wa.me/${db.contactInfo.whatsapp}`, '_blank')} className="flex flex-col items-center gap-5 text-emerald-500 font-black uppercase text-[13px] tracking-widest group transition-all">
               <div className="w-28 h-28 bg-emerald-500/10 rounded-[45px] flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-4xl border border-emerald-500/20"><MessageCircle size={44}/></div>
               WHATSAPP
            </button>
            <div onClick={() => setAdminMode()} className="w-40 h-40 bg-white rounded-full flex items-center justify-center -mt-40 shadow-4xl border-[15px] border-black group cursor-pointer hover:rotate-12 hover:scale-110 transition-all relative">
               <div className="absolute inset-0 bg-red-600/40 rounded-full blur-3xl animate-pulse"></div>
               <Zap size={72} className="text-black group-hover:animate-bounce relative z-10"/>
            </div>
            <button onClick={() => window.open('https://t.me/', '_blank')} className="flex flex-col items-center gap-5 text-[#24A1DE] font-black uppercase text-[13px] tracking-widest group transition-all">
               <div className="w-28 h-28 bg-[#24A1DE]/10 rounded-[45px] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#24A1DE] group-hover:text-white transition-all shadow-4xl border border-[#24A1DE]/20"><Send size={44}/></div>
               TELEGRAM
            </button>
         </div>
      </footer>
    </div>
  );
};
