
import React, { useState, useMemo, useContext } from 'react';
import { LangContext } from './index';
import { 
  Search, Globe, Landmark, Briefcase, GraduationCap, 
  Ticket, FileText, Newspaper, MapPin, Zap, 
  MessageCircle, Send, ChevronRight, Crown, Cpu, Clock, 
  Flame, TrendingUp, Target, Award, Rocket, Megaphone, Swords
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
    { id: 'schemes', label: lang === 'en' ? 'Schemes' : 'పథకాలు', icon: <Landmark size={18}/> },
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
    <div className="min-h-screen bg-black text-white selection:bg-emerald-600 pb-40">
      
      {/* GLOBAL AD BANNER TOP */}
      {db.promotions.filter((p:any) => p.isGlobal).slice(0, 1).map((ad:any) => (
        <a key={ad.id} href={ad.link} target="_blank" className="block w-full h-16 bg-gradient-to-r from-emerald-600 to-indigo-600 flex items-center justify-center gap-4 group overflow-hidden">
           <span className="bg-white/20 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">PROMOTED</span>
           <p className="text-sm font-black italic group-hover:scale-105 transition-transform">{ad.brandName} • Click to Claim Offer</p>
        </a>
      ))}

      {/* HEADER TIKER */}
      <div className="bg-[#080808] border-b border-white/5 py-3 px-6 overflow-hidden flex items-center gap-6">
         <span className="bg-emerald-600 text-white text-[9px] font-black px-4 py-1 rounded-full uppercase shrink-0 italic animate-pulse">LATEST</span>
         <p className="text-xs font-bold whitespace-nowrap italic text-slate-500">{db.ticker}</p>
      </div>

      <header className="bg-black/80 backdrop-blur-3xl sticky top-0 z-[100] border-b border-white/5 p-6 md:p-8 space-y-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
           <div className="flex items-center gap-4 cursor-pointer" onClick={() => setFilter('all')}>
              <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.3)]"><Crown size={24}/></div>
              <div className="hidden sm:block">
                <h1 className="text-2xl font-black tracking-tighter italic leading-none">LEGACY<span className="text-emerald-500">DIALUP.</span></h1>
                <p className="text-[8px] font-black text-slate-700 uppercase tracking-widest mt-1">THE TELUGU ASPIRANT HUB</p>
              </div>
           </div>
           
           <div className="flex items-center gap-4">
              <button onClick={() => setLang(lang === 'en' ? 'te' : 'en')} className="px-6 py-2.5 bg-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all border border-white/5">{lang === 'en' ? 'తెలుగు' : 'ENGLISH'}</button>
              <button onClick={setAdminMode} className="p-3 bg-white/5 rounded-xl hover:text-emerald-500 transition-all border border-white/5"><Cpu size={22}/></button>
           </div>
        </div>

        <div className="max-w-7xl mx-auto flex gap-3 overflow-x-auto scrollbar-hide pb-2 px-1">
           {categories.map(cat => (
             <button key={cat.id} onClick={() => setFilter(cat.id)} className={`px-6 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap flex items-center gap-3 transition-all ${filter === cat.id ? 'bg-white text-black shadow-2xl' : 'bg-white/5 text-slate-500 hover:text-white border border-white/5'}`}>
               {cat.icon} {cat.label}
             </button>
           ))}
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 md:p-12 space-y-16">
        {/* SEARCH & REVENUE ENGINE */}
        <div className="relative group max-w-4xl mx-auto">
           <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-indigo-600 rounded-[35px] blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
           <div className="relative">
              <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-700" size={28}/>
              <input className="w-full bg-black border border-white/10 rounded-[35px] pl-20 pr-8 py-8 text-2xl font-black outline-none focus:border-emerald-600 transition-all italic placeholder:text-slate-900" placeholder={lang === 'en' ? "Search notifications..." : "నోటిఫికేషన్ల కోసం వెతకండి..."} value={search} onChange={e => setSearch(e.target.value)}/>
           </div>
        </div>

        {/* DATA GRID & AD INJECTION */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
           {filteredData.map((item: any, index: number) => (
             <React.Fragment key={item.id}>
               <div className="bg-[#080808] border border-white/5 rounded-[50px] overflow-hidden hover:border-emerald-500/50 transition-all group cursor-pointer shadow-3xl flex flex-col">
                  <div className="h-56 relative overflow-hidden bg-slate-900">
                     <img src={item.thumbnail} className="w-full h-full object-cover opacity-40 group-hover:scale-110 group-hover:opacity-100 transition-all duration-1000" />
                     <div className="absolute top-8 left-8 bg-emerald-600 text-white px-5 py-1.5 rounded-full text-[10px] font-black uppercase italic tracking-widest shadow-xl">{item.org}</div>
                     <div className="absolute bottom-6 right-6 p-4 bg-black/60 backdrop-blur-xl rounded-2xl border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Rocket size={20} className="text-emerald-500"/>
                     </div>
                  </div>
                  <div className="p-10 space-y-6 flex-1 flex flex-col">
                     <h3 className="text-2xl font-black italic uppercase tracking-tighter line-clamp-2 leading-none group-hover:text-emerald-500 transition-colors">{item.title}</h3>
                     <p className="text-sm font-bold text-slate-600 italic line-clamp-3 leading-relaxed">{item.summary}</p>
                     <div className="flex items-center justify-between pt-8 border-t border-white/5 mt-auto">
                        <div className="flex items-center gap-3 text-[11px] font-black text-slate-700 uppercase italic">
                           <Clock size={16}/> {item.lastDate}
                        </div>
                        <div className="flex items-center gap-2 text-emerald-500 font-black text-[10px] tracking-widest uppercase group-hover:translate-x-2 transition-transform">
                           Read Now <ChevronRight size={18}/>
                        </div>
                     </div>
                  </div>
               </div>

               {/* IN-GRID AD INJECTION EVERY 4 CARDS */}
               {(index + 1) % 4 === 0 && db.promotions.length > 0 && (
                 <div className="md:col-span-1 lg:col-span-1 bg-gradient-to-br from-indigo-900/40 to-black border border-indigo-500/20 rounded-[50px] p-10 flex flex-col justify-center items-center text-center space-y-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-10 opacity-5 rotate-12"><Megaphone size={150}/></div>
                    <span className="bg-indigo-600 text-white text-[9px] font-black px-4 py-1 rounded-full uppercase tracking-widest">FEATURED NODE</span>
                    <h4 className="text-3xl font-black italic uppercase tracking-tighter text-white">Unlock Premium Legacy Assets.</h4>
                    <p className="text-sm font-bold text-slate-500 italic">Get instant access to deep study blueprints and neural mock tests.</p>
                    <button className="w-full py-5 bg-white text-black rounded-3xl font-black uppercase text-[10px] tracking-[0.4em] hover:bg-emerald-600 hover:text-white transition-all">DECODE ASSETS</button>
                 </div>
               )}
             </React.Fragment>
           ))}
        </div>

        {/* ENGAGEMENT NODES (WAR ROOM PREVIEW) */}
        <div className="bg-[#050505] border border-white/5 rounded-[60px] p-12 md:p-20 flex flex-col lg:flex-row items-center justify-between gap-16 relative overflow-hidden shadow-4xl">
           <div className="absolute top-0 right-0 p-20 opacity-[0.03] scale-150 rotate-45"><Swords size={400}/></div>
           <div className="space-y-8 max-w-2xl relative z-10 text-center lg:text-left">
              <div className="inline-flex items-center gap-3 px-5 py-2 bg-crimson/10 border border-crimson/20 rounded-full">
                 <div className="w-2 h-2 bg-crimson rounded-full animate-ping"></div>
                 <span className="text-[10px] font-black text-crimson uppercase tracking-widest">LIVE_WAR_ROOM</span>
              </div>
              <h2 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-none text-white">NEURAL <br/><span className="text-crimson">DOMINANCE.</span></h2>
              <p className="text-xl md:text-2xl font-bold text-slate-700 italic uppercase">Competitive exam simulation with live telemetry. Are you ready to lead?</p>
              <button className="bg-white text-black px-12 py-5 rounded-[25px] font-black uppercase text-[11px] tracking-widest hover:bg-crimson hover:text-white transition-all shadow-2xl">Enter Arena</button>
           </div>
           
           <div className="grid grid-cols-2 gap-6 relative z-10 w-full lg:w-auto">
              {[
                { l: "ACTIVE_NODES", v: db.analytics.activeNow.toLocaleString(), c: "emerald" },
                { l: "DAILY_SYNC", v: "+4.2k", c: "indigo" }
              ].map(stat => (
                <div key={stat.l} className="bg-black/60 backdrop-blur-2xl border border-white/5 p-10 rounded-[40px] text-center space-y-2">
                   <p className="text-[9px] font-black text-slate-700 uppercase tracking-widest">{stat.l}</p>
                   <h4 className={`text-4xl font-black italic tracking-tighter text-${stat.c}-500`}>{stat.v}</h4>
                </div>
              ))}
           </div>
        </div>
      </main>

      {/* FIXED MOBILE NAVIGATION & CTA */}
      <footer className="fixed bottom-0 left-0 right-0 z-[1000] p-6 bg-gradient-to-t from-black via-black/95 to-transparent">
         <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[40px] p-4 flex items-center justify-between shadow-4xl px-8">
            <button onClick={() => window.open(`https://wa.me/${db.contactInfo.whatsapp}`, '_blank')} className="flex flex-col items-center gap-2 text-emerald-500 font-black uppercase text-[9px] tracking-widest group">
               <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"><MessageCircle size={22}/></div>
               WHATSAPP
            </button>
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center -mt-12 shadow-2xl border-4 border-black group cursor-pointer hover:rotate-12 transition-transform">
               <Zap size={28} className="text-black"/>
            </div>
            <button onClick={() => window.open('https://t.me/', '_blank')} className="flex flex-col items-center gap-2 text-[#24A1DE] font-black uppercase text-[9px] tracking-widest group">
               <div className="w-12 h-12 bg-[#24A1DE]/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"><Send size={22}/></div>
               TELEGRAM
            </button>
         </div>
      </footer>
    </div>
  );
};
