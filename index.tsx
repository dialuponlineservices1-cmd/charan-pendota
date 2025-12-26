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
  Trophy, SearchCode, Radio, Ghost
} from 'lucide-react';

// Core Components
import { Dashboard } from './Dashboard';
import { PublicPortal } from './PublicPortal';
import { BioScanLogin } from './BioScanLogin';
import { NeuralSentinel } from './NeuralSentinel';
import { MagicEditor } from './MagicEditor';
import { OmniFactory } from './OmniFactory';
import { VeoArchitect } from './VeoArchitect';
import { GazetteAlchemist } from './GazetteAlchemist';
import { PodcastForge } from './PodcastForge';
import { PromotionsManager } from './PromotionsManager';
import { AffiliateManager } from './AffiliateManager';
import { YieldForecaster } from './YieldForecaster';
import { MonetizationOracle } from './MonetizationOracle';
import { ImperialPulse } from './ImperialPulse';
import { GlobalNexus } from './GlobalNexus';
import { HyperspaceTraffic } from './HyperspaceTraffic';
import { AetherSentiment } from './AetherSentiment';
import { ThreatMatrix } from './ThreatMatrix';
import { AegisSecurity } from './AegisSecurity';
import { APIGateway } from './APIGateway';
import { NeuralDefrag } from './NeuralDefrag';
import { BioTelemetry } from './BioTelemetry';
import { RealityWarper } from './RealityWarper';
import { StrategyArchitect } from './StrategyArchitect';

const DB_KEY = 'studentdialup_v3000_core';
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
    contactInfo: { whatsapp: "9100000000", adminKey: "0000" }
  };
};

const App = () => {
  const [lang, setLang] = useState<'en' | 'te'>('te');
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [view, setView] = useState('dashboard');
  const [db, setDb] = useState(getInitialDB());
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => { localStorage.setItem(DB_KEY, JSON.stringify(db)); }, [db]);
  useEffect(() => { setTimeout(() => setIsBooting(false), 1500); }, []);

  const updateDB = (updater: (prev: any) => any) => setDb((prev: any) => updater(prev));

  if (isBooting) return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center overflow-hidden">
       <div className="relative">
         <Atom size={300} className="text-pink-600 animate-spin-slow opacity-10 absolute -inset-24 blur-xl"/>
         <h2 className="text-9xl font-black italic tracking-tighter text-white z-10 relative">V3000<span className="text-pink-600">.CORE</span></h2>
       </div>
       <div className="mt-8 flex items-center gap-4">
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
      color: 'text-indigo-500', 
      bg: 'hover:bg-indigo-500/10',
      active: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
      items: [
        { id: 'dashboard', label: 'Command Hub', icon: <LayoutDashboard size={18}/> },
        { id: 'strategy', label: 'Victory Logic', icon: <Compass size={18}/> },
        { id: 'warper', label: 'Reality Drift', icon: <Ghost size={18}/> },
        { id: 'sentinel', label: 'System Watch', icon: <ShieldCheck size={18}/> },
      ]
    },
    { 
      label: 'Creative', 
      color: 'text-amber-500',
      bg: 'hover:bg-amber-500/10',
      active: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      items: [
        { id: 'magic-editor', label: 'Ascension Forge', icon: <Wand2 size={18}/> },
        { id: 'factory', label: 'Omni Plant', icon: <Cpu size={18}/> },
        { id: 'veo', label: 'Veo Cinema', icon: <Video size={18}/> },
        { id: 'gazette', label: 'Data Alchemy', icon: <Binary size={18}/> },
        { id: 'podcast', label: 'Voice Forge', icon: <Mic size={18}/> },
      ]
    },
    { 
      label: 'Marketplace', 
      color: 'text-emerald-500',
      bg: 'hover:bg-emerald-500/10',
      active: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      items: [
        { id: 'promotions', label: 'Ad Injection', icon: <Megaphone size={18}/> },
        { id: 'affiliates', label: 'Synergy Hub', icon: <ShoppingCart size={18}/> },
        { id: 'yield', label: 'Profit Predict', icon: <Target size={18}/> },
        { id: 'monetize', label: 'Revenue Oracle', icon: <Trophy size={18}/> },
      ]
    },
    { 
      label: 'Security', 
      color: 'text-rose-500',
      bg: 'hover:bg-rose-500/10',
      active: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
      items: [
        { id: 'gateway', label: 'Key Shield', icon: <Lock size={18}/> },
        { id: 'matrix', label: 'Threat Radar', icon: <ShieldAlert size={18}/> },
        { id: 'defrag', label: 'Lattice Clean', icon: <Zap size={18}/> },
        { id: 'biometry', label: 'Bio Registry', icon: <Fingerprint size={18}/> },
      ]
    }
  ];

  return (
    <LangContext.Provider value={{lang, setLang}}>
      <div className="min-h-screen bg-[#020202] text-slate-300 flex overflow-hidden font-sans">
        
        {/* Zenith Ultra Sidebar */}
        <aside className="w-[300px] h-screen bg-black border-r border-white/5 flex flex-col z-[100] shrink-0">
          <div className="h-24 flex items-center px-10 border-b border-white/5 gap-5">
            <div className="w-12 h-12 bg-pink-600 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(236,72,153,0.3)]">
              <Command size={24} className="text-black"/>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-2xl text-white tracking-tighter uppercase italic leading-none">AETHEL_V30</span>
              <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest mt-1">Sovereign Admin Unit</span>
            </div>
          </div>
          
          <nav className="flex-1 overflow-y-auto p-6 space-y-10 scrollbar-hide">
            {menuGroups.map((group) => (
              <div key={group.label} className="space-y-2">
                <p className={`px-4 text-[10px] font-black uppercase tracking-[0.3em] mb-4 ${group.color}`}>{group.label}</p>
                <div className="space-y-1">
                  {group.items.map((item) => {
                    const isActive = view === item.id;
                    return (
                      <button 
                        key={item.id} 
                        onClick={() => setView(item.id)} 
                        className={`w-full flex items-center justify-between px-5 py-3 rounded-2xl transition-all duration-300 border border-transparent ${isActive ? group.active : `text-slate-500 ${group.bg} hover:text-white`}`}
                      >
                        <div className="flex items-center gap-4">
                          <span className={`${isActive ? group.color : 'text-slate-700'}`}>{item.icon}</span>
                          <span className="text-xs font-black uppercase tracking-wide">{item.label}</span>
                        </div>
                        {isActive && <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${group.color.replace('text', 'bg')}`}></div>}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
          
          <div className="p-6 border-t border-white/5 bg-white/[0.01]">
             <button onClick={() => setIsAdminMode(false)} className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-[20px] bg-rose-600/5 text-rose-500 hover:bg-rose-600 hover:text-white transition-all font-black uppercase text-[10px] border border-rose-500/10">
               <LogOut size={16}/> Terminate Link
             </button>
          </div>
        </aside>

        {/* Main Command Center */}
        <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[#020202]">
          <header className="h-24 bg-black/40 backdrop-blur-3xl border-b border-white/5 px-12 flex items-center justify-between z-50">
             <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-ping absolute inset-0"></div>
                  <div className="w-3 h-3 bg-emerald-500 rounded-full relative shadow-[0_0_15px_#10b981]"></div>
                </div>
                <div className="flex flex-col">
                  <h2 className="text-xs font-black uppercase tracking-[0.4em] text-white italic">Protocol: <span className="text-pink-500">{view.toUpperCase().replace('-', '_')}</span></h2>
                  <p className="text-[10px] font-bold text-slate-700 uppercase tracking-widest mt-1">Status: All Nodes Synchronized</p>
                </div>
             </div>
             <div className="flex items-center gap-6">
                <div className="hidden lg:flex items-center gap-4 px-6 py-2.5 bg-white/5 rounded-2xl text-[10px] font-black text-slate-500 uppercase border border-white/5">
                   <Gauge size={14} className="text-pink-500"/> Neural Load: <span className="text-white ml-1">12.4%</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 via-pink-600 to-amber-500 p-[1px] shadow-xl">
                  <div className="w-full h-full bg-black rounded-[15px] flex items-center justify-center">
                    <Fingerprint size={22} className="text-white"/>
                  </div>
                </div>
             </div>
          </header>

          <div className="flex-1 overflow-y-auto p-12 xl:p-20 scrollbar-hide">
              <div className="max-w-7xl mx-auto space-y-16">
                {view === 'dashboard' && <Dashboard db={db} setView={setView} />}
                {view === 'strategy' && <StrategyArchitect db={db} lang={lang} />}
                {view === 'warper' && <RealityWarper db={db} />}
                {view === 'sentinel' && <NeuralSentinel />}
                {view === 'magic-editor' && <MagicEditor onPostCreated={(p:any) => updateDB((prev:any)=>({...prev, jobs:[p, ...prev.jobs]}))} />}
                {view === 'factory' && <OmniFactory db={db} />}
                {view === 'veo' && <VeoArchitect db={db} />}
                {view === 'gazette' && <GazetteAlchemist db={db} updateDB={updateDB} />}
                {view === 'podcast' && <PodcastForge db={db} />}
                {view === 'promotions' && <PromotionsManager db={db} updateDB={updateDB} />}
                {view === 'affiliates' && <AffiliateManager db={db} updateDB={updateDB} />}
                {view === 'yield' && <YieldForecaster db={db} />}
                {view === 'monetize' && <MonetizationOracle db={db} />}
                {view === 'pulse' && <ImperialPulse db={db} />}
                {view === 'traffic' && <HyperspaceTraffic db={db} />}
                {view === 'sentiment' && <AetherSentiment db={db} />}
                {view === 'gateway' && <APIGateway />}
                {view === 'matrix' && <ThreatMatrix />}
                {view === 'defrag' && <NeuralDefrag db={db} updateDB={updateDB} />}
                {view === 'biometry' && <BioTelemetry />}
              </div>
          </div>
        </main>
      </div>
    </LangContext.Provider>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);