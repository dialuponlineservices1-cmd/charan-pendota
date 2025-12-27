import React, { useState, useEffect, createContext } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Zap, Atom, Sparkles, Video, 
  Mic, MapPin, 
  Terminal, ShieldCheck, Megaphone, Newspaper, 
  LogOut, Fingerprint, Activity, Gauge,
  ShoppingCart, Globe, Compass, Target, 
  Wand2, Lock, ShieldAlert, Binary, Heart,
  Cpu, LayoutDashboard, Database, Layers,
  ChevronRight, Command, Boxes, Brain,
  Trophy, SearchCode, Radio, Ghost, Power, PenTool, Link, Smartphone
} from 'lucide-react';

// Core Components
import { Dashboard } from './Dashboard';
import { PublicPortal } from './PublicPortal';
import { BioScanLogin } from './BioScanLogin';
import { AIBlogForge } from './AIBlogForge';
import { MagicEditor } from './MagicEditor';
import { VeoArchitect } from './VeoArchitect';
import { GazetteAlchemist } from './GazetteAlchemist';
import { PodcastForge } from './PodcastForge';
import { PromotionsManager } from './PromotionsManager';
import { AffiliateManager } from './AffiliateManager';
import { YieldForecaster } from './YieldForecaster';
import { MonetizationOracle } from './MonetizationOracle';
import { ImperialPulse } from './ImperialPulse';
import { APIGateway } from './APIGateway';
import { NeuralDefrag } from './NeuralDefrag';
import { RealityWarper } from './RealityWarper';
import { StrategyArchitect } from './StrategyArchitect';

const DB_KEY = 'studentdialup_v3000_core';
const LANG_KEY = 'studentdialup_lang';

export const LangContext = createContext<{lang: 'en' | 'te', setLang: (l: 'en' | 'te') => void}>({lang: 'en', setLang: () => {}});

const getInitialDB = () => {
  try {
    const data = localStorage.getItem(DB_KEY);
    if (data) return JSON.parse(data);
  } catch (e) { console.error("DB Corrupted, resetting..."); }
  return { 
    jobs: [], 
    exams: [],
    promotions: [],
    affiliates: [],
    leaderboard: [],
    analytics: { activeNow: 42405, revenue: 9854000, serviceApplications: 120, storeSales: 450 }, 
    contactInfo: { whatsapp: "9100000000", adminKey: "8888" }
  };
};

const App = () => {
  const [lang, setLang] = useState<'en' | 'te'>(() => {
    return (localStorage.getItem(LANG_KEY) as 'en' | 'te') || 'te';
  });
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [view, setView] = useState('dashboard');
  const [db, setDb] = useState(getInitialDB());
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => { localStorage.setItem(DB_KEY, JSON.stringify(db)); }, [db]);
  useEffect(() => { localStorage.setItem(LANG_KEY, lang); }, [lang]);
  useEffect(() => { setTimeout(() => setIsBooting(false), 1500); }, []);

  const updateDB = (updater: (prev: any) => any) => setDb((prev: any) => updater(prev));

  if (isBooting) return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center overflow-hidden">
       <div className="relative">
         <div className="absolute inset-0 bg-pink-600/20 blur-[100px] animate-pulse"></div>
         <Atom size={150} className="text-pink-600 animate-spin-slow opacity-20 absolute -inset-12 blur-xl"/>
         <h2 className="text-6xl font-black italic tracking-tighter text-white z-10 relative">V3000<span className="text-pink-600">.CORE</span></h2>
       </div>
       <div className="mt-8 flex flex-col items-center gap-4">
         <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden">
           <div className="h-full bg-pink-600 animate-[loading_2s_ease-in-out_infinite]"></div>
         </div>
       </div>
    </div>
  );

  if (!isAdminMode) return (
    <LangContext.Provider value={{lang, setLang}}>
      <PublicPortal db={db} setAdminMode={() => setIsAdminMode(true)} updateDB={updateDB} />
    </LangContext.Provider>
  );

  if (!isAuthenticated) return <BioScanLogin adminKey={db.contactInfo.adminKey} onAuthSuccess={() => setIsAuthenticated(true)} />;

  const menuGroups = [
    { 
      label: 'Intelligence', 
      color: 'indigo', 
      items: [
        { id: 'dashboard', label: 'Command Hub', icon: <LayoutDashboard size={18}/> },
        { id: 'blog-forge', label: 'Sovereign Editor', icon: <PenTool size={18}/> },
        { id: 'strategy', label: 'Victory Logic', icon: <Compass size={18}/> },
      ]
    },
    { 
      label: 'Fabrication', 
      color: 'pink',
      items: [
        { id: 'magic-editor', label: 'Magic Scraper', icon: <Wand2 size={18}/> },
        { id: 'veo', label: 'Veo Cinematic', icon: <Video size={18}/> },
        { id: 'podcast', label: 'Voice Casting', icon: <Mic size={18}/> },
      ]
    },
    { 
      label: 'Monetization', 
      color: 'emerald',
      items: [
        { id: 'monetize', label: 'Yield Oracle', icon: <Trophy size={18}/> },
        { id: 'promotions', label: 'Ad Matrix', icon: <Megaphone size={18}/> },
        { id: 'affiliates', label: 'Link Syndicate', icon: <Link size={18}/> },
      ]
    },
    { 
      label: 'Infrastructure', 
      color: 'rose',
      items: [
        { id: 'gateway', label: 'API Shield', icon: <Lock size={18}/> },
        { id: 'defrag', label: 'Neural Defrag', icon: <Zap size={18}/> },
      ]
    }
  ];

  const activeColor = menuGroups.find(g => g.items.some(i => i.id === view))?.color || 'pink';

  return (
    <LangContext.Provider value={{lang, setLang}}>
      <div className="min-h-screen bg-[#020202] text-slate-300 flex overflow-hidden font-sans">
        
        {/* Sidebar */}
        <aside className="w-[260px] h-screen bg-black border-r border-white/5 flex flex-col z-[100] shrink-0">
          <div className="h-20 flex items-center px-6 border-b border-white/5 gap-3">
            <div className={`w-10 h-10 bg-${activeColor}-600 rounded-xl flex items-center justify-center shadow-lg transition-colors duration-500`}>
              <Command size={18} className="text-black"/>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-lg text-white tracking-tighter uppercase italic leading-none">EMPEROR_V3</span>
              <span className="text-[8px] font-bold text-slate-600 uppercase tracking-widest mt-1 italic">SOVEREIGN_ADMIN</span>
            </div>
          </div>
          
          <nav className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide">
            {menuGroups.map((group) => (
              <div key={group.label} className="space-y-1">
                <p className={`px-4 text-[9px] font-black uppercase tracking-[0.3em] mb-2 text-${group.color}-500/60`}>{group.label}</p>
                {group.items.map((item) => {
                  const isActive = view === item.id;
                  return (
                    <button 
                      key={item.id} 
                      onClick={() => setView(item.id)} 
                      className={`w-full flex items-center justify-between px-4 py-2 rounded-xl transition-all duration-300 group border ${isActive ? `bg-${group.color}-500/10 text-${group.color}-400 border-${group.color}-500/20 shadow-sm` : 'text-slate-600 hover:bg-white/5 hover:text-white border-transparent'}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`${isActive ? `text-${group.color}-400` : 'text-slate-800 group-hover:text-white transition-colors'}`}>{item.icon}</span>
                        <span className="text-[11px] font-black uppercase tracking-wider">{item.label}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            ))}
          </nav>
          
          <div className="p-4 border-t border-white/5 bg-white/[0.01]">
             <button onClick={() => setIsAdminMode(false)} className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-rose-600/5 text-rose-500 hover:bg-rose-600 hover:text-white transition-all font-black uppercase text-[10px] border border-rose-500/10">
               <Power size={14}/> DISCONNECT
             </button>
          </div>
        </aside>

        {/* Workspace */}
        <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
          <header className="h-20 bg-black/40 backdrop-blur-3xl border-b border-white/5 px-8 flex items-center justify-between z-50">
             <div className="flex items-center gap-4">
                <div className={`w-2 h-2 bg-${activeColor}-500 rounded-full animate-pulse shadow-[0_0_10px_#fff]`}></div>
                <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-white italic">ADMIN_PROTOCOL: <span className={`text-${activeColor}-500`}>{view.toUpperCase()}</span></h2>
             </div>
             <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center`}>
                    <Fingerprint size={14} className="text-white"/>
                </div>
             </div>
          </header>

          <div className="flex-1 overflow-y-auto p-8 xl:p-12 scrollbar-hide bg-[#020202]">
              <div className="max-w-6xl mx-auto">
                {view === 'dashboard' && <Dashboard db={db} setView={setView} />}
                {view === 'blog-forge' && <AIBlogForge db={db} updateDB={updateDB} />}
                {view === 'strategy' && <StrategyArchitect db={db} lang={lang} />}
                {view === 'magic-editor' && <MagicEditor onPostCreated={(p:any) => updateDB((prev:any)=>({...prev, jobs:[p, ...prev.jobs]}))} />}
                {view === 'veo' && <VeoArchitect db={db} />}
                {view === 'gazette' && <GazetteAlchemist db={db} updateDB={updateDB} />}
                {view === 'podcast' && <PodcastForge db={db} />}
                {view === 'promotions' && <PromotionsManager db={db} updateDB={updateDB} />}
                {view === 'affiliates' && <AffiliateManager db={db} updateDB={updateDB} />}
                {view === 'yield' && <YieldForecaster db={db} />}
                {view === 'monetize' && <MonetizationOracle db={db} />}
                {view === 'gateway' && <APIGateway />}
                {view === 'defrag' && <NeuralDefrag db={db} updateDB={updateDB} />}
              </div>
          </div>
        </main>
      </div>
    </LangContext.Provider>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);