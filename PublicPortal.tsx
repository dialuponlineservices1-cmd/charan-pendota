
import React, { useState, useMemo, useContext } from 'react';
import { LangContext } from './index';
import { 
  Search, Globe, Landmark, Briefcase, GraduationCap, 
  Ticket, FileText, Newspaper, MapPin, Zap, 
  MessageCircle, Send, ChevronRight, Crown, Cpu, Clock, 
  Flame, TrendingUp, Target, Award, Rocket, Megaphone, Swords,
  ExternalLink, Share2, Heart
} from 'lucide-react';

export const PublicPortal = ({ db, setAdminMode }: any) => {
  const { lang, setLang } = useContext(LangContext);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const categories = [
    { id: 'all', label: lang === 'en' ? 'All' : 'అన్నీ', icon: <Zap size={18}/> },
    { id: 'jobs', label: lang === 'en' ? 'Govt Jobs' : 'ప్రభుత్వ ఉద్యోగాలు', icon: <Globe size={18}/> },
    { id: 'walkins', label: lang === 'en' ? 'Walk-ins' : 'వాక్-ఇన్ జాబ్స్', icon: <MapPin size={18}/> },
    { id: 'internships', label: lang === 'en' ? 'Internships' : 'ఇంటర్న్‌షిప్స్', icon: <GraduationCap size={18}/> },
    { id: 'hallTickets', label: lang === 'en' ? 'Hall Tickets' : 'హాల్ టికెట్లు', icon: <Ticket size={18}/> },
    { id: 'results', label: lang === 'en' ? 'Results' : 'ఫలితాలు', icon: <FileText size={18}/> },
  ];

  const filteredData = useMemo(() => {
    let combined = [];
    if (filter === 'all') {
      combined = [...db.jobs, ...db.walkins, ...db.internships, ...db.schemes, ...db.hallTickets, ...db.results];
    } else {
      combined = db[filter] || [];
    }
    return combined.filter((item: any) => 
      item.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [db, search, filter]);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-red-600 pb-64">
      
      {/* GLOBAL AD BANNER TOP (STRETCHED FOR MAX IMPACT) */}
      {db.promotions.filter((p:any) => p.isGlobal).slice(0, 1).map((ad:any) => (
        <a key={ad.id} href={ad.link} target="_blank" className="block w-full h-16 bg-gradient-to-r from-red-600 via-indigo-600 to-red-600 flex items-center justify-center gap-4 group overflow-hidden relative">
           <div className="absolute inset-0 bg-white/5 animate-pulse"></div>
           <span className="bg-white/20 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest relative z-10 border border-white/10">PROMOTED SYNC</span>
           <p className="text-sm font-black italic group-hover:scale-105 transition-transform relative z-10 uppercase tracking-tighter">{ad.brandName} • {lang === 'en' ? 'LIMITED OFFER: CLICK TO ACTIVATE' : 'పరిమిత సమయం: ఇప్పుడే క్లిక్ చేయండి'}</p>
        </a>
      ))}

      {/* HEADER TIKER */}
      <div className="bg-[#050505] border-b border-white/5 py-3.5 px-8 overflow-hidden flex items-center gap-6">
         <span className="bg-red-600 text-white text-[9px] font-black px-4 py-1.5 rounded-full uppercase shrink-0 italic animate-pulse">SUPREMACY_LIVE</span>
         <p className="text-xs font-bold whitespace-nowrap italic text-slate-500 tracking-wide uppercase">{db.ticker}</p>
      </div>

      <header className="bg-black/90 backdrop-blur-5xl sticky top-0 z-[100] border-b border-white/5 p-6 md:p-10 space-y-10 shadow-4xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
           <div className="flex items-center gap-5 cursor-pointer" onClick={() => setFilter('all')}>
              <div className="w-14 h-14 bg-red-600 rounded-[22px] flex items-center justify-center shadow-[0_0_50px_rgba(220,38,38,0.4)] hover:rotate-12 transition-transform"><Crown size={28}/></div>
              <div className="hidden sm:block space-y-1">
                <h1 className="text-3xl font-black tracking-tighter italic leading-none">SUPREMACY<span className="text-red-600">DIALUP.</span></h1>
                <p className="text-[9px] font-black text-slate-700 uppercase tracking-[0.4em]">Empire of Telugu Aspirants</p>
              </div>
           </div>
           
           <div className="flex items-center gap-5">
              <button onClick={() => setLang(lang === 'en' ? 'te' : 'en')} className="px-8 py-3 bg-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all border border-white/10 shadow-xl">{lang === 'en' ? 'తెలుగు' : 'ENGLISH'}</button>
              <button onClick={setAdminMode} className="p-4 bg-white/5 rounded-2xl hover:text-red-500 transition-all border border-white/10 group"><Cpu size={24} className="group-hover:rotate-45 transition-transform"/></button>
           </div>
        </div>

        {/* MOBILE OPTIMIZED CATEGORY HUB */}
        <div className="max-w-7xl mx-auto flex gap-4 overflow-x-auto scrollbar-hide pb-2 px-1">
           {categories.map(cat => (
             <button key={cat.id} onClick={() => setFilter(cat.id)} className={`px-8 py-4.5 rounded-[24px] text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap flex items-center gap-4 transition-all shadow-xl ${filter === cat.id ? 'bg-white text-black scale-105' : 'bg-white/5 text-slate-500 hover:text-white border border-white/5'}`}>
               {cat.icon} {cat.label}
             </button>
           ))}
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 md:p-14 space-y-20">
        
        {/* SEARCH ENGINE WITH REVENUE GRADIENT */}
        <div className="relative group max-w-5xl mx-auto">
           <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-indigo-600 rounded-[45px] blur-[20px] opacity-20 group-hover:opacity-60 transition duration-1000"></div>
           <div className="relative">
              <Search className="absolute left-10 top-1/2 -translate-y-1/2 text-slate-700" size={32}/>
              <input title="Search Bar" className="w-full bg-black border border-white/10 rounded-[45px] pl-24 pr-10 py-10 text-3xl font-black outline-none focus:border-red-600 transition-all italic placeholder:text-slate-900" placeholder={lang === 'en' ? "Search Registry..." : "నోటిఫికేషన్ల కోసం వెతకండి..."} value={search} onChange={e => setSearch(e.target.value)}/>
           </div>
        </div>

        {/* DATA GRID & AD INJECTION (REVENUE MAXIMIZER) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
           {filteredData.map((item: any, index: number) => (
             <React.Fragment key={item.id}>
               <div className="bg-[#050505] border border-white/5 rounded-[60px] overflow-hidden hover:border-red-600/50 transition-all group cursor-pointer shadow-4xl flex flex-col relative">
                  <div className="h-64 relative overflow-hidden bg-slate-950">
                     <img src={item.thumbnail} className="w-full h-full object-cover opacity-40 group-hover:scale-110 group-hover:opacity-100 transition-all duration-[2s]" alt={item.title} />
                     <div className="absolute top-10 left-10 bg-red-600 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase italic tracking-widest shadow-2xl">{item.org}</div>
                     <div className="absolute top-10 right-10 p-4 bg-black/40 backdrop-blur-3xl rounded-full border border-white/10 text-white/40 group-hover:text-red-500 transition-all"><Heart size={18}/></div>
                  </div>
                  <div className="p-12 space-y-8 flex-1 flex flex-col">
                     <div className="space-y-4">
                        <h3 className="text-3xl font-black italic uppercase tracking-tighter line-clamp-2 leading-[0.9] group-hover:text-red-500 transition-colors">{item.title}</h3>
                        <p className="text-sm font-bold text-slate-600 italic line-clamp-3 leading-relaxed">{item.summary}</p>
                     </div>
                     <div className="flex items-center justify-between pt-10 border-t border-white/5 mt-auto">
                        <div className="flex items-center gap-4 text-[11px] font-black text-slate-800 uppercase italic">
                           <Clock size={18}/> {item.lastDate}
                        </div>
                        <div className="flex items-center gap-3 text-red-500 font-black text-[10px] tracking-widest uppercase group-hover:translate-x-3 transition-transform">
                           ACCESS NODE <ChevronRight size={20}/>
                        </div>
                     </div>
                  </div>
               </div>

               {/* IN-GRID AD INJECTION EVERY 3 CARDS (MAX MONEY) */}
               {(index + 1) % 3 === 0 && (
                 <div className="md:col-span-1 lg:col-span-1 bg-gradient-to-br from-red-950/20 to-black border border-red-500/20 rounded-[60px] p-12 flex flex-col justify-center items-center text-center space-y-10 relative overflow-hidden group shadow-4xl">
                    <div className="absolute -top-10 -right-10 p-10 opacity-5 rotate-12 scale-150 transition-transform group-hover:scale-110"><Megaphone size={200}/></div>
                    <span className="bg-red-600 text-white text-[10px] font-black px-6 py-2 rounded-full uppercase tracking-widest shadow-2xl">IMPERIAL AD</span>
                    <div className="space-y-4 relative z-10">
                       <h4 className="text-4xl font-black italic uppercase tracking-tighter text-white">Dominate the Preparation Matrix.</h4>
                       <p className="text-sm font-bold text-slate-500 italic">Get premium access to deep-thinking study nodes and AI mock tests.</p>
                    </div>
                    <button className="w-full py-6 bg-white text-black rounded-[30px] font-black uppercase text-[11px] tracking-[0.4em] hover:bg-red-600 hover:text-white transition-all shadow-4xl relative z-10">UPGRADE TO ELITE</button>
                 </div>
               )}
             </React.Fragment>
           ))}
        </div>

        {/* DEEP ENGAGEMENT FOOTER NODES */}
        <div className="bg-[#030303] border border-white/5 rounded-[80px] p-14 md:p-24 flex flex-col lg:flex-row items-center justify-between gap-20 relative overflow-hidden shadow-4xl">
           <div className="absolute top-0 right-0 p-24 opacity-[0.02] scale-150 rotate-45"><Swords size={500}/></div>
           <div className="space-y-10 max-w-3xl relative z-10 text-center lg:text-left">
              <div className="inline-flex items-center gap-4 px-6 py-2.5 bg-red-600/10 border border-red-600/20 rounded-full">
                 <div className="w-2.5 h-2.5 bg-red-600 rounded-full animate-ping"></div>
                 <span className="text-[11px] font-black text-red-600 uppercase tracking-widest">LIVE_SYNC_ACTIVE</span>
              </div>
              <h2 className="text-7xl md:text-9xl font-black italic uppercase tracking-tighter leading-none text-white italic">NEURAL <br/><span className="text-red-600">ARENA.</span></h2>
              <p className="text-2xl md:text-3xl font-bold text-slate-700 italic uppercase">Join 24,000+ Aspirants in the Ultimate Competitive Simulation.</p>
              <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
                 <button className="bg-white text-black px-14 py-6 rounded-[30px] font-black uppercase text-[12px] tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-4xl">Enter Arena</button>
                 <button className="bg-white/5 border border-white/10 text-white px-14 py-6 rounded-[30px] font-black uppercase text-[12px] tracking-widest hover:bg-white/10 transition-all">Syllabus Matrix</button>
              </div>
           </div>
           
           <div className="grid grid-cols-2 gap-8 relative z-10 w-full lg:w-auto">
              {[
                { l: "ACTIVE_NODES", v: db.analytics.activeNow.toLocaleString(), c: "red" },
                { l: "HOURLY_SYNC", v: "+12.8k", c: "indigo" },
                { l: "ASSETS_LIVE", v: "4.2k", c: "white" },
                { l: "YIELD_PEAK", v: "99%", c: "red" }
              ].map(stat => (
                <div key={stat.l} className="bg-black/60 backdrop-blur-3xl border border-white/5 p-12 rounded-[50px] text-center space-y-3 hover:border-red-600/30 transition-all group">
                   <p className="text-[10px] font-black text-slate-800 uppercase tracking-widest group-hover:text-slate-400 transition-colors">{stat.l}</p>
                   <h4 className={`text-5xl font-black italic tracking-tighter text-${stat.c}-600 group-hover:scale-110 transition-transform`}>{stat.v}</h4>
                </div>
              ))}
           </div>
        </div>
      </main>

      {/* STICKY MOBILE HUB (BEST IN CLASS MOBILE UI) */}
      <footer className="fixed bottom-0 left-0 right-0 z-[1000] p-8 bg-gradient-to-t from-black via-black/98 to-transparent pointer-events-none">
         <div className="max-w-4xl mx-auto bg-[#080808]/80 backdrop-blur-5xl border border-white/10 rounded-[50px] p-4 flex items-center justify-between shadow-4xl px-12 pointer-events-auto">
            <button onClick={() => window.open(`https://wa.me/${db.contactInfo.whatsapp}`, '_blank')} className="flex flex-col items-center gap-2 text-emerald-500 font-black uppercase text-[9px] tracking-widest group transition-all">
               <div className="w-14 h-14 bg-emerald-500/10 rounded-3xl flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all"><MessageCircle size={24}/></div>
               WHATSAPP
            </button>
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center -mt-20 shadow-4xl border-4 border-black group cursor-pointer hover:rotate-12 hover:scale-110 transition-all">
               <Zap size={36} className="text-black group-hover:animate-pulse"/>
            </div>
            <button onClick={() => window.open('https://t.me/', '_blank')} className="flex flex-col items-center gap-2 text-[#24A1DE] font-black uppercase text-[9px] tracking-widest group transition-all">
               <div className="w-14 h-14 bg-[#24A1DE]/10 rounded-3xl flex items-center justify-center group-hover:scale-110 group-hover:bg-[#24A1DE] group-hover:text-white transition-all"><Send size={24}/></div>
               TELEGRAM
            </button>
         </div>
      </footer>
    </div>
  );
};
