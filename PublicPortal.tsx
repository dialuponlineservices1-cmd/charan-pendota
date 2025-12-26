
import React, { useState, useMemo, useContext, useEffect, useRef } from 'react';
import { LangContext } from './index';
import { 
  Search, Zap, Crown, Cpu, Clock, Sparkles, DollarSign, Target, ArrowRight, X, 
  Download, Activity, ShieldCheck, ChevronDown, FolderSync, BookOpenCheck, 
  History, PlayCircle, Eye, Rocket, Brain, Briefcase, Infinity, Radar, ScanFace,
  MessageCircle, Star, Gem, Medal, Trophy, TrendingUp, Send, GraduationCap,
  Filter, ChevronRight, Layers, Fingerprint, BookOpen, Wrench, Award, Heart, ShieldAlert,
  Share2, MessageSquare, ExternalLink, Ghost, Compass, Bot, User, SendHorizonal, MapPin, Flag,
  Database, FileText, Radio, Flame, Youtube, TrendingDown
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const AdPlacement = ({ type, category }: { type: 'horizontal' | 'square' | 'gate' | 'inline', category?: string }) => (
  <div className={`bg-[#080808] border-[12px] border-yellow-500/10 rounded-[300px] flex items-center justify-center relative overflow-hidden group hover:border-yellow-500/30 transition-all ${
    type === 'horizontal' ? 'h-96 w-full' : 
    type === 'gate' ? 'h-[1000px] w-full' : 
    type === 'inline' ? 'h-[400px] w-full' :
    'aspect-square w-full'
  }`}>
     <div className="absolute inset-0 bg-yellow-500/5 animate-pulse"></div>
     <div className="relative z-10 text-center space-y-32">
        <span className="bg-yellow-500 text-black px-64 py-16 rounded-full text-[24px] font-black uppercase tracking-[1.5em] italic">REVENUE_NODE: {category || 'GLOBAL'}</span>
        <p className="text-[28px] font-black text-slate-800 uppercase tracking-[2em] italic">AETHELGARD_AD_EXCHANGE_V8</p>
     </div>
  </div>
);

const BrandBanner = ({ promotions, category }: { promotions: any[], category?: string }) => {
  const activePromo = useMemo(() => {
    const now = new Date();
    // V800 Feature: Filter promos targeted to this specific section
    return promotions.find(p => 
      new Date(p.startDate) <= now && 
      new Date(p.endDate) >= now && 
      (!p.targetCategory || p.targetCategory === category || p.targetCategory === 'GLOBAL')
    );
  }, [promotions, category]);

  if (!activePromo) return <AdPlacement type="horizontal" category={category} />;

  return (
    <div onClick={() => window.open(activePromo.link, '_blank')} className="w-full h-[500px] relative rounded-[500px] overflow-hidden border-[25px] border-yellow-600/30 cursor-pointer group shadow-4xl animate-in zoom-in-95 duration-1000">
       <img src={activePromo.bannerUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[10000ms]" alt="Partner Banner"/>
       <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-70"></div>
       <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-24">
          <div className="bg-yellow-600 text-black px-12 py-4 rounded-full font-black text-3xl italic mb-8 animate-bounce border-[10px] border-black uppercase tracking-widest">OFFICIAL_PARTNER</div>
          <h3 className="text-[180px] font-black text-white italic uppercase tracking-tighter leading-none">{activePromo.brandName}</h3>
       </div>
    </div>
  );
};

export const PublicPortal = ({ db, setAdminMode, updateDB }: any) => {
  const { lang, setLang } = useContext(LangContext);
  const [search, setSearch] = useState('');
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [isGateWaiting, setIsGateWaiting] = useState(false);
  const [gateCountdown, setGateCountdown] = useState(5);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const sections = [
    { id: 'TS_GOVT', label: 'TELANGANA GOVT JOBS', icon: <MapPin/>, color: 'emerald' },
    { id: 'AP_GOVT', label: 'ANDHRA GOVT JOBS', icon: <Flag/>, color: 'blue' },
    { id: 'PRIVATE', label: 'PRIVATE SECTOR', icon: <Briefcase/>, color: 'pink' },
    { id: 'ENTRANCE', label: 'ENTRANCE EXAMS', icon: <GraduationCap/>, color: 'yellow' }
  ];

  const handlePostClick = (post: any) => {
    setSelectedPost(post);
    setIsGateWaiting(true);
    setGateCountdown(5);
  };

  useEffect(() => {
    let timer: any;
    if (isGateWaiting && gateCountdown > 0) {
      timer = setInterval(() => setGateCountdown(c => c - 1), 1000);
    } else if (gateCountdown === 0) {
      setIsGateWaiting(false);
    }
    return () => clearInterval(timer);
  }, [isGateWaiting, gateCountdown]);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-yellow-500 font-sans pb-[4000px] overflow-x-hidden">
      
      {/* SOVEREIGN STATUS BAR */}
      <div className="bg-yellow-600 py-32 text-center border-b-[20px] border-black sticky top-0 z-[1000000] shadow-4xl overflow-hidden group">
         <div className="flex animate-marquee whitespace-nowrap gap-600 items-center">
            {[1,2,3,4,5].map(i => (
              <span key={i} className="text-black font-black uppercase text-[42px] tracking-[2em] italic flex items-center gap-12">
                <ShieldCheck size={48}/> SOVEREIGN_REC_V8 • TS_MASTERY • AP_MASTERY • PRIVATE_CLUSTERS_ONLINE • AI_BROTHER_ON
              </span>
            ))}
         </div>
      </div>

      <header className="bg-black/95 backdrop-blur-5xl border-b-[30px] border-white/5 p-150 space-y-120 sticky top-[120px] z-[9999]">
         <div className="max-w-[16000px] mx-auto flex items-center justify-between">
            <div className="flex items-center gap-120 cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
               <div className="w-250 h-250 bg-yellow-600 rounded-full flex items-center justify-center shadow-[0_0_8000px_gold] border-[35px] border-black group-hover:rotate-180 transition-all duration-1000">
                  <Infinity size={150} className="text-black"/>
               </div>
               <div className="space-y-12">
                  <h1 className="text-[250px] font-black tracking-tighter italic leading-none text-white uppercase italic">STUDENT<span className="text-yellow-600">DIALUP.</span></h1>
                  <p className="text-[32px] font-black text-slate-900 uppercase tracking-[4em] italic leading-none">PREDATORY_JOB_MESH_V8</p>
               </div>
            </div>
            <button onClick={setAdminMode} className="p-100 bg-white/5 rounded-full hover:text-yellow-500 transition-all border-[20px] border-white/10 shadow-4xl"><Crown size={150}/></button>
         </div>

         <div className="max-w-[16000px] mx-auto relative group">
            <input className="w-full bg-black border-[40px] border-white/10 rounded-full px-300 py-150 text-[180px] font-black text-white outline-none focus:border-yellow-600 transition-all placeholder:text-slate-950 italic" placeholder="SEARCH_THE_SOVEREIGN_VOID..." value={search} onChange={e => setSearch(e.target.value)}/>
            <Search size={250} className="absolute right-150 top-1/2 -translate-y-1/2 text-slate-950 group-hover:text-yellow-600 transition-colors"/>
         </div>
      </header>

      <main className="max-w-[16000px] mx-auto p-120 lg:p-600 space-y-1200">
         <BrandBanner promotions={db.promotions} category="GLOBAL" />

         {sections.map(section => {
            const sectionJobs = db.jobs.filter((j: any) => j.category === section.id && (j.title_en + j.title_te).toLowerCase().includes(search.toLowerCase()));
            if (sectionJobs.length === 0 && search) return null;
            
            return (
              <section key={section.id} className="space-y-400">
                 <div className="flex items-center justify-between border-b-[40px] border-white/5 pb-120">
                    <div className="flex items-center gap-120">
                       <div className={`w-300 h-300 rounded-[80px] bg-${section.color}-600/10 flex items-center justify-center text-${section.color}-600 border-[20px] border-${section.color}-600/20 shadow-4xl`}>
                          {React.cloneElement(section.icon as React.ReactElement, { size: 180 })}
                       </div>
                       <h2 className="text-[350px] font-black italic tracking-tighter text-white uppercase leading-none italic">{section.label}</h2>
                    </div>
                    <div className="flex items-center gap-48">
                       <div className="bg-red-600 text-white px-48 py-16 rounded-full font-black text-3xl animate-pulse italic uppercase border-4 border-black">LIVE_SYNC</div>
                       <div className="bg-white/5 px-80 py-32 rounded-full text-5xl font-black text-slate-800 uppercase italic tracking-widest leading-none">{sectionJobs.length} NODES</div>
                    </div>
                 </div>

                 {/* SECTION TARGETED BRANDING */}
                 <BrandBanner promotions={db.promotions} category={section.id} />

                 <div className="grid lg:grid-cols-2 gap-400">
                    {sectionJobs.map((item: any) => {
                       const isTrending = Math.random() > 0.7; // Simulated trending algorithm
                       const isNew = (Date.now() - (item.id || 0)) < 7 * 24 * 60 * 60 * 1000;
                       return (
                          <div key={item.id} onClick={() => handlePostClick(item)} className="bg-black border-[50px] border-white/5 rounded-[4000px] overflow-hidden hover:border-yellow-600 transition-all group cursor-pointer shadow-4xl relative group">
                             <div className="h-[2500px] relative bg-slate-950 overflow-hidden">
                                <img src={item.thumbnail} className="w-full h-full object-cover opacity-20 group-hover:scale-125 transition-all duration-[20000ms] grayscale group-hover:grayscale-0" alt={item.title_en} />
                                <div className="absolute top-100 left-100 bg-yellow-600 text-black px-150 py-48 rounded-full text-[120px] font-black uppercase tracking-[2em] italic border-[80px] border-black z-10 leading-none">{item.org}</div>
                                <div className="absolute top-100 right-100 flex flex-col gap-32 items-end">
                                   {isTrending && <div className="bg-red-600 text-white px-100 py-32 rounded-full text-[64px] font-black uppercase tracking-widest italic z-10 animate-bounce border-[40px] border-black flex items-center gap-12"><Flame size={64}/> EXPLODING</div>}
                                   {isNew && <div className="bg-emerald-600 text-white px-100 py-32 rounded-full text-[64px] font-black uppercase tracking-widest italic z-10 animate-pulse border-[40px] border-black">NEW_NODE</div>}
                                </div>
                             </div>
                             <div className="p-600 space-y-400">
                                <h3 className="text-[550px] md:text-[650px] font-black italic uppercase tracking-tighter leading-[0.2] group-hover:text-yellow-600 transition-colors italic">
                                   {lang === 'en' ? item.title_en : item.title_te}
                                </h3>
                                <div className="flex items-center justify-between pt-400 border-t-[80px] border-white/5">
                                   <div className="flex items-center gap-150 text-[120px] font-black text-slate-900 uppercase italic leading-none"><Clock size={300}/> {item.lastDate}</div>
                                   <div className="flex items-center gap-150 text-yellow-600 font-black text-[150px] tracking-[4em] uppercase group-hover:translate-x-200 transition-transform italic leading-none">
                                      VIEW <ArrowRight size={300}/>
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

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 80s linear infinite; }
      `}} />
    </div>
  );
};
