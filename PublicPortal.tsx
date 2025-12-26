
import React, { useState, useMemo, useContext } from 'react';
import { LangContext } from './index';
import { 
  Search, Globe, Landmark, Briefcase, GraduationCap, 
  Ticket, FileText, Newspaper, MapPin, Zap, 
  MessageCircle, Send, ChevronRight, Crown, Cpu, Clock
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
    <div className="min-h-screen bg-black text-white selection:bg-emerald-600">
      
      {/* HEADER TIKER */}
      <div className="bg-emerald-600 py-2 px-6 overflow-hidden flex items-center gap-6">
         <span className="bg-white text-emerald-600 text-[10px] font-black px-3 py-1 rounded-full uppercase shrink-0">LATEST</span>
         <p className="text-sm font-bold whitespace-nowrap animate-pulse italic">{db.ticker}</p>
      </div>

      <header className="bg-[#050505] border-b border-white/5 p-8 space-y-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
           <div className="flex items-center gap-4 cursor-pointer" onClick={() => setFilter('all')}>
              <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-lg"><Crown size={24}/></div>
              <div>
                <h1 className="text-2xl font-black tracking-tighter italic leading-none">STUDENT<span className="text-emerald-500">DIALUP.</span></h1>
                <p className="text-[8px] font-black text-slate-700 uppercase tracking-widest mt-1">THE TELUGU ASPIRANT HUB</p>
              </div>
           </div>
           <div className="flex items-center gap-4">
              <button onClick={() => setLang(lang === 'en' ? 'te' : 'en')} className="px-6 py-2.5 bg-white/5 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">{lang === 'en' ? 'తెలుగు' : 'ENGLISH'}</button>
              <button onClick={setAdminMode} className="p-3 bg-white/5 rounded-xl hover:text-emerald-500 transition-all"><Cpu size={22}/></button>
           </div>
        </div>

        <div className="max-w-7xl mx-auto flex gap-3 overflow-x-auto scrollbar-hide pb-2">
           {categories.map(cat => (
             <button key={cat.id} onClick={() => setFilter(cat.id)} className={`px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest whitespace-nowrap flex items-center gap-3 transition-all ${filter === cat.id ? 'bg-white text-black' : 'bg-white/5 text-slate-500 hover:text-white'}`}>
               {cat.icon} {cat.label}
             </button>
           ))}
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-8 space-y-12">
        <div className="relative group">
           <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-700" size={24}/>
           <input className="w-full bg-[#080808] border border-white/5 rounded-[30px] pl-16 pr-8 py-6 text-xl font-bold outline-none focus:border-emerald-600 transition-all italic" placeholder={lang === 'en' ? "Search notifications..." : "నోటిఫికేషన్ల కోసం వెతకండి..."} value={search} onChange={e => setSearch(e.target.value)}/>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 pb-32">
           {filteredData.map((item: any) => (
             <div key={item.id} className="bg-[#080808] border border-white/5 rounded-[40px] overflow-hidden hover:border-emerald-500/50 transition-all group cursor-pointer shadow-xl">
                <div className="h-48 relative overflow-hidden bg-slate-900">
                   <img src={item.thumbnail} className="w-full h-full object-cover opacity-30 group-hover:scale-110 transition-transform duration-700" />
                   <div className="absolute top-6 left-6 bg-emerald-600 text-white px-4 py-1 rounded-full text-[9px] font-black uppercase italic">{item.org}</div>
                </div>
                <div className="p-8 space-y-4">
                   <h3 className="text-xl font-black italic uppercase tracking-tighter line-clamp-2">{item.title}</h3>
                   <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase italic">
                         <Clock size={14}/> {item.lastDate}
                      </div>
                      <ChevronRight size={20} className="text-slate-700 group-hover:text-emerald-500 group-hover:translate-x-2 transition-all"/>
                   </div>
                </div>
             </div>
           ))}
           {filteredData.length === 0 && (
             <div className="col-span-full py-20 text-center opacity-20 italic font-black uppercase tracking-widest">No nodes found in this sector.</div>
           )}
        </div>
      </main>

      {/* FOOTER NAV */}
      <footer className="fixed bottom-0 left-0 right-0 bg-[#050505]/90 backdrop-blur-xl border-t border-white/5 p-4 flex items-center justify-center gap-12 z-[1000]">
         <button onClick={() => window.open('https://wa.me/91', '_blank')} className="flex items-center gap-3 text-emerald-500 font-black uppercase text-[10px] tracking-widest"><MessageCircle size={20}/> WHATSAPP</button>
         <button onClick={() => window.open('https://t.me/', '_blank')} className="flex items-center gap-3 text-[#24A1DE] font-black uppercase text-[10px] tracking-widest"><Send size={20}/> TELEGRAM</button>
      </footer>
    </div>
  );
};
