
import React, { useState, useMemo, useContext, useEffect } from 'react';
import { LangContext } from './index';
import { 
  Search, X, Users, Globe, Landmark, Briefcase, GraduationCap as ScholarshipIcon, 
  Instagram, Youtube, Facebook, Twitter, MessageCircle, Send, ArrowLeft, ArrowRight,
  Zap, Flame, Target, Trophy, Microscope, Cpu, Crown, Radio, Clock, Smartphone,
  CheckCircle, Gem, ExternalLink, ChevronRight
} from 'lucide-react';

export const PublicPortal = ({ db, setAdminMode, updateDB }: any) => {
  const { lang, setLang } = useContext(LangContext);
  const [search, setSearch] = useState('');
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [filter, setFilter] = useState('all');
  const [visitorCount, setVisitorCount] = useState(15420);

  useEffect(() => {
    const interval = setInterval(() => setVisitorCount(v => v + Math.floor(Math.random() * 5)), 3000);
    return () => clearInterval(interval);
  }, []);

  const categories = [
    { id: 'govt', label: lang === 'en' ? 'Central' : 'కేంద్ర ప్రభుత్వ', icon: <Globe size={18}/> },
    { id: 'ts_govt', label: lang === 'en' ? 'TS Govt' : 'తెలంగాణ', icon: <Landmark size={18}/> },
    { id: 'ap_govt', label: lang === 'en' ? 'AP Govt' : 'ఆంధ్రప్రదేశ్', icon: <Landmark size={18}/> },
    { id: 'pvt', label: lang === 'en' ? 'Private' : 'ప్రైవేటు', icon: <Briefcase size={18}/> },
    { id: 'scholar', label: lang === 'en' ? 'Scholarships' : 'స్కాలర్‌షిప్‌లు', icon: <ScholarshipIcon size={18}/> },
  ];

  const filteredJobs = useMemo(() => {
    return db.jobs.filter((j: any) => 
      (j.title + (j.title_te || '')).toLowerCase().includes(search.toLowerCase()) &&
      (filter === 'all' || j.section === filter)
    );
  }, [db.jobs, search, filter]);

  const openSocial = (type: string) => {
    const links = db.contactInfo;
    if (type === 'whatsapp') window.open(`https://wa.me/${links.whatsapp.replace(/\D/g, '')}`, '_blank');
    else if (links[type]) window.open(links[type], '_blank');
  };

  return (
    <div className="min-h-screen bg-[#000] text-white font-sans selection:bg-emerald-600 overflow-x-hidden pb-64 relative">
      
      {/* TICKER */}
      <div className="bg-emerald-600 py-3 px-6 flex items-center justify-between sticky top-0 z-[1000] shadow-2xl">
         <div className="flex items-center gap-6 overflow-hidden w-full">
            <span className="bg-white text-emerald-600 text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shrink-0 animate-pulse italic">STUDENT DIALUP FEED</span>
            <p className="text-[12px] font-black text-white whitespace-nowrap animate-marquee uppercase tracking-tight italic">
              {db.ticker}
            </p>
         </div>
      </div>

      <header className="bg-black/95 backdrop-blur-5xl border-b border-white/5 pt-12 pb-12">
        <div className="max-w-[1700px] mx-auto px-6 md:px-12 flex items-center justify-between">
           <div className="flex items-center gap-5 group cursor-pointer" onClick={() => setSelectedJob(null)}>
              <div className="w-14 h-14 bg-gradient-to-tr from-emerald-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-4xl group-hover:rotate-[360deg] transition-all">
                <Crown size={28} className="text-white"/>
              </div>
              <div className="hidden sm:block">
                 <h1 className="text-3xl font-black tracking-tighter uppercase italic leading-none">STUDENT<span className="text-emerald-500">DIALUP.</span></h1>
                 <p className="text-[9px] font-black text-slate-800 uppercase tracking-[0.5em] mt-2">THE SOVEREIGN RECRUITMENT HUB</p>
              </div>
           </div>
           <div className="flex items-center gap-5">
              <button onClick={() => setLang(lang === 'en' ? 'te' : 'en')} className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all italic">{lang === 'en' ? 'తెలుగు' : 'ENGLISH'}</button>
              <button onClick={setAdminMode} className="p-4 bg-white/5 border border-white/10 rounded-2xl text-slate-500 hover:text-emerald-500 transition-all shadow-inner"><Cpu size={24}/></button>
           </div>
        </div>
        <div className="max-w-[1700px] mx-auto px-6 mt-12 flex gap-4 overflow-x-auto scrollbar-hide pb-2">
           {categories.map(cat => (
             <button key={cat.id} onClick={() => {setFilter(cat.id); setSelectedJob(null);}} className={`px-8 py-4 rounded-[28px] text-[11px] font-black uppercase tracking-widest transition-all whitespace-nowrap flex items-center gap-4 ${filter === cat.id ? 'bg-white text-black shadow-4xl scale-105' : 'bg-white/5 text-slate-600 hover:text-white'}`}>
               {cat.icon} {cat.label}
             </button>
           ))}
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-6 md:px-12 pt-12">
        {!selectedJob ? (
          <div className="space-y-12">
             <div className="relative group w-full">
                <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-800" size={28}/>
                <input className="bg-[#0A0A0A] border border-white/5 rounded-[40px] pl-20 pr-10 py-8 text-xl font-bold text-white outline-none focus:border-emerald-600 w-full shadow-inner italic" placeholder={lang === 'en' ? "Search notifications..." : "నోటిఫికేషన్ల కోసం వెతకండి..."} value={search} onChange={e => setSearch(e.target.value)}/>
             </div>
             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                {filteredJobs.map((job: any, index: number) => (
                  <React.Fragment key={job.id}>
                     <div onClick={() => setSelectedJob(job)} className="bg-[#080808] border border-white/5 rounded-[64px] overflow-hidden hover:border-emerald-500/50 transition-all cursor-pointer group shadow-2xl relative">
                        <div className="h-72 relative overflow-hidden">
                           <img src={job.thumbnail} className="w-full h-full object-cover grayscale opacity-20 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
                           <div className="absolute inset-0 bg-gradient-to-t from-[#080808] to-transparent"></div>
                           <div className="absolute top-8 left-8 flex gap-3"><span className="bg-emerald-600 text-white px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest italic">{job.org}</span></div>
                           <div className="absolute bottom-8 left-8 right-8"><h4 className="text-3xl font-black text-white italic uppercase tracking-tighter line-clamp-2">{lang === 'en' ? job.title : (job.title_te || job.title)}</h4></div>
                        </div>
                        <div className="p-10 flex items-center justify-between border-t border-white/5">
                           <div className="flex items-center gap-4"><div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-emerald-500 shadow-xl"><Clock size={20}/></div><div><p className="text-[10px] font-black text-slate-700 uppercase tracking-widest">{lang === 'en' ? 'LAST DATE' : 'చివరి తేదీ'}</p><p className="text-lg font-black text-white italic tracking-tighter">{job.lastDate}</p></div></div>
                           <ChevronRight size={24} className="text-slate-800 group-hover:text-emerald-500 group-hover:translate-x-3 transition-all"/>
                        </div>
                     </div>
                     {(index + 1) % 3 === 0 && (
                        <div className="bg-gradient-to-tr from-indigo-950/30 to-emerald-950/30 border border-white/10 rounded-[64px] p-12 flex flex-col items-center text-center space-y-8 group hover:border-emerald-400 transition-all relative overflow-hidden">
                           <div className="absolute top-0 right-0 p-10 opacity-5 rotate-12 group-hover:scale-150 transition-transform duration-1000"><Gem size={250}/></div>
                           <div className="w-24 h-24 bg-emerald-600/20 border border-emerald-500/30 rounded-[40px] flex items-center justify-center text-emerald-500 animate-pulse"><Zap size={48}/></div>
                           <div className="space-y-3"><p className="text-[11px] font-black text-emerald-500 uppercase tracking-widest italic">SPONSORED BY STUDENTDIALUP</p><h4 className="text-4xl font-black text-white italic uppercase tracking-tighter leading-none">Elite Study <br/> PDF Packs 2025</h4><p className="text-[12px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed">Boost your preparation with TSPSC & APPSC Material.</p></div>
                           <button className="w-full py-6 bg-white text-black rounded-full font-black uppercase text-[13px] tracking-[0.4em] hover:bg-emerald-600 hover:text-white transition-all shadow-4xl active:scale-95 italic">BUY NOW (₹49/-)</button>
                        </div>
                     )}
                  </React.Fragment>
                ))}
             </div>
          </div>
        ) : (
           <article className="max-w-[1100px] mx-auto animate-in fade-in slide-in-from-bottom-10 duration-700 pb-96">
              <button onClick={() => setSelectedJob(null)} className="mb-12 flex items-center gap-5 text-slate-700 hover:text-emerald-500 transition-all font-black uppercase text-[13px] tracking-[0.5em] italic"><ArrowLeft size={24}/> BACK TO FEED</button>
              <div className="bg-[#080808] border border-white/5 rounded-[80px] overflow-hidden shadow-4xl p-12 md:p-20 space-y-12">
                 <div className="space-y-6"><span className="bg-emerald-600 text-white px-8 py-3 rounded-full text-[11px] font-black uppercase tracking-[0.2em] italic shadow-4xl">{selectedJob.org}</span><h2 className="text-6xl md:text-9xl font-black italic uppercase tracking-tighter leading-none text-white">{lang === 'en' ? selectedJob.title : (selectedJob.title_te || selectedJob.title)}</h2></div>
                 <div className="grid md:grid-cols-2 gap-8">
                    <button onClick={() => openSocial('whatsapp')} className="bg-emerald-600 p-10 rounded-[48px] flex items-center justify-center gap-8 hover:bg-white hover:text-black transition-all group shadow-4xl"><MessageCircle size={40} className="text-white group-hover:text-black transition-colors"/><span className="font-black uppercase tracking-[0.3em] text-[18px] italic">JOIN WHATSAPP</span></button>
                    <button onClick={() => openSocial('telegram')} className="bg-[#24A1DE] p-10 rounded-[48px] flex items-center justify-center gap-8 hover:bg-white hover:text-black transition-all group shadow-4xl"><Send size={40} className="text-white group-hover:text-black transition-colors"/><span className="font-black uppercase tracking-[0.3em] text-[18px] italic">JOIN TELEGRAM</span></button>
                 </div>
                 <div className="relative group overflow-hidden rounded-[64px] border border-white/5 shadow-4xl"><img src={selectedJob.thumbnail} className="w-full h-[600px] object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[3000ms]" /></div>
                 <div className="space-y-10 py-12 border-b border-white/5"><h3 className="text-5xl font-black italic uppercase tracking-tighter text-white border-l-[12px] border-emerald-600 pl-12">Job Description</h3><p className="text-3xl text-slate-400 font-medium italic leading-relaxed whitespace-pre-wrap">{selectedJob.summary}</p></div>
                 <div className="bg-white/5 border border-white/10 rounded-[72px] p-20 space-y-12 text-center relative overflow-hidden group"><h4 className="text-5xl font-black italic uppercase text-white tracking-tighter leading-none">STUDENTDIALUP EXCLUSIVE MATERIAL</h4><p className="text-2xl font-bold text-slate-500 uppercase tracking-widest italic leading-relaxed max-w-3xl mx-auto">Get the full preparation guide for this job. <br/> Price: <span className="text-emerald-500 text-4xl">₹49/-</span> only.</p><button className="px-24 py-8 bg-emerald-600 text-white rounded-full font-black uppercase text-[18px] tracking-[0.5em] hover:bg-white hover:text-black transition-all shadow-4xl italic">BUY PDF NOW</button></div>
              </div>
           </article>
        )}
      </main>

      <footer className="mt-40 p-20 md:p-32 bg-[#020202] border border-white/10 rounded-[100px] relative overflow-hidden mx-6 shadow-4xl text-center md:text-left">
         <div className="grid lg:grid-cols-12 gap-20">
            <div className="lg:col-span-4 space-y-10">
               <div className="flex items-center gap-6 justify-center md:justify-start"><div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center"><Crown size={32}/></div><h4 className="text-4xl font-black uppercase tracking-tighter text-white italic leading-none">STUDENT <br/> <span className="text-emerald-500">DIALUP.</span></h4></div>
               <p className="text-xl font-bold text-slate-600 uppercase italic">The Sovereign Recruitment Hub for Telugu Students.</p>
            </div>
            <div className="lg:col-span-4 space-y-10">
               <h4 className="text-2xl font-black uppercase tracking-tighter text-white italic border-b border-white/5 pb-4">Social Connect</h4>
               <div className="grid grid-cols-3 gap-6">
                  {['whatsapp', 'telegram', 'instagram', 'youtube', 'facebook', 'x'].map((s) => (
                    <button key={s} onClick={() => openSocial(s)} className={`w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center hover:scale-110 transition-all border border-white/5 shadow-inner`}>{s === 'whatsapp' ? <MessageCircle size={28}/> : s === 'telegram' ? <Send size={28}/> : s === 'instagram' ? <Instagram size={28}/> : s === 'youtube' ? <Youtube size={28}/> : s === 'facebook' ? <Facebook size={28}/> : <Twitter size={28}/>}</button>
                  ))}
               </div>
            </div>
            <div className="lg:col-span-4 space-y-10 md:text-right">
               <h4 className="text-2xl font-black uppercase tracking-tighter text-white italic border-b border-white/5 pb-4">Registry</h4>
               <p className="text-[11px] font-black text-slate-800 uppercase tracking-[0.6em] leading-relaxed">© 2025 studentDialup.in <br/> All rights reserved.</p>
            </div>
         </div>
         <div className="mt-24 pt-12 border-t border-white/5 opacity-10 hover:opacity-100 transition-opacity flex flex-wrap gap-6 text-[11px] font-bold text-slate-600 uppercase italic justify-center md:justify-start">
            {db.seoKeywords?.split(',').map((kw: string, i: number) => (<span key={i} className="cursor-default hover:text-emerald-500 transition-colors">{kw.trim()}</span>))}
         </div>
      </footer>

      {/* STICKY AD-BAR */}
      <div className="fixed bottom-0 left-0 right-0 h-28 bg-emerald-600/95 backdrop-blur-5xl border-t border-white/10 z-[2000] flex items-center justify-center px-8 shadow-4xl group">
         <div className="max-w-[1500px] w-full flex items-center justify-between">
            <div className="flex items-center gap-8">
               <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center animate-pulse"><Flame size={32} className="text-emerald-600"/></div>
               <div className="hidden sm:block"><p className="text-[18px] font-black italic uppercase text-white tracking-[0.2em] leading-none">FLASH OFFER: ALL PREVIOUS PAPERS BUNDLE @ ₹99/-</p><p className="text-[10px] font-black text-white/60 uppercase tracking-widest mt-2">Valid for 24 Hours Only!</p></div>
               <p className="text-[16px] font-black italic uppercase text-white tracking-widest sm:hidden">BUNDLE @ ₹99/- ONLY!</p>
            </div>
            <button className="px-12 py-5 bg-white text-emerald-600 rounded-full font-black uppercase text-[15px] tracking-[0.4em] hover:bg-black hover:text-white transition-all shadow-4xl italic">GET NOW</button>
         </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-100%); } }
        .animate-marquee { display: inline-block; padding-left: 100%; animation: marquee 65s linear infinite; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; background: #000; overflow-x: hidden; -webkit-overflow-scrolling: touch; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}} />
    </div>
  );
};
