import React, { useState, useEffect, createContext } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Zap, Brain, Atom, Cubes, Sparkles, Radar, Video, 
  Mic, BoxSelect, SearchCode, MapPin, Soul, Boxes, 
  Terminal, ShieldCheck, Megaphone, Newspaper, Layout,
  Crown, LogOut, Smartphone, Fingerprint, Activity, Gauge,
  Database, ShoppingCart, Globe, Compass, Target, Sword,
  Wand2, FileText, Cpu, Lock, ShieldAlert, Binary, Heart,
  Trophy, Layers, Search
} from 'lucide-react';

// Core Components
import { Dashboard } from './Dashboard';
import { PublicPortal } from './PublicPortal';
import { BioScanLogin } from './BioScanLogin';
import { NeuralSentinel } from './NeuralSentinel';

// Admin Strategy & Intelligence
import { SentientBot } from './SentientBot';
import { RealityWarper } from './RealityWarper';
import { MindPalace } from './MindPalace';
import { StrategyArchitect } from './StrategyArchitect';
import { ImperialOracle } from './ImperialOracle';

// Content Forge & Automation
import { MagicEditor } from './MagicEditor';
import { OmniFactory } from './OmniFactory';
import { VeoArchitect } from './VeoArchitect';
import { GazetteAlchemist } from './GazetteAlchemist';
import { PodcastForge } from './PodcastForge';
import { PDFAlchemist } from './PDFAlchemist';
import { PrintForge } from './PrintForge';

// Revenue & Business Nodes
import { PromotionsManager } from './PromotionsManager';
import { AffiliateManager } from './AffiliateManager';
import { YieldForecaster } from './YieldForecaster';
import { MonetizationOracle } from './MonetizationOracle';
import { AdCluster } from './AdCluster';

// Telemetry & Global Pulse
import { ImperialPulse } from './ImperialPulse';
import { GlobalNexus } from './GlobalNexus';
import { HyperspaceTraffic } from './HyperspaceTraffic';
import { WorkforceSimulator } from './WorkforceSimulator';
import { AetherSentiment } from './AetherSentiment';

// Security & Infrastructure
import { ThreatMatrix } from './ThreatMatrix';
import { AegisSecurity } from './AegisSecurity';
import { APIGateway } from './APIGateway';
import { NeuralDefrag } from './NeuralDefrag';
import { BioTelemetry } from './BioTelemetry';

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
    analytics: { activeNow: 42405000, revenue: 985400000000, serviceApplications: 120, storeSales: 450 }, 
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
  useEffect(() => { setTimeout(() => setIsBooting(false), 2000); }, []);

  const updateDB = (updater: (prev: any) => any) => setDb((prev: any) => updater(prev));

  if (isBooting) return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-10 overflow-hidden">
       <Atom size={400} className="text-pink-500 animate-spin-slow opacity-20 absolute"/>
       <h2 className="text-[120px] font-black italic tracking-tighter text-white leading-none z-10">V3000<span className="text-pink-500">.GOD</span></h2>
       <p className="text-xl font-black text-white/40 uppercase tracking-[1.5em] animate-pulse italic mt-4 z-10">OMNISCIENCE_PROTOCOL_LOADING</p>
    </div>
  );

  if (!isAdminMode) return (
    <LangContext.Provider value={{lang, setLang}}>
      <PublicPortal db={db} setAdminMode={() => setIsAdminMode(true)} updateDB={updateDB} />
    </LangContext.Provider>
  );

  if (!isAuthenticated) return <BioScanLogin adminKey={db.contactInfo.adminKey} onAuthSuccess={() => setIsAuthenticated(true)} />;

  const menuGroups = [
    { label: 'DIVINE_INTELLIGENCE', items: [
      { id: 'dashboard', label: 'Prime Godhead', icon: <Soul size={18}/> },
      { id: 'bot', label: 'Sentient Mind', icon: <Brain size={18}/> },
      { id: 'warper', label: 'Reality Warper', icon: <Atom size={18}/> },
      { id: 'strategy', label: 'Strategy Architect', icon: <Compass size={18}/> },
      { id: 'sentinel', label: 'Neural Sentinel', icon: <ShieldCheck size={18}/> },
    ]},
    { label: 'CONTENT_FORGE', items: [
      { id: 'magic-editor', label: 'Ascension Forge', icon: <Wand2 size={18}/> },
      { id: 'factory', label: 'Omni Factory', icon: <Cpu size={18}/> },
      { id: 'veo', label: 'Veo Architect', icon: <Video size={18}/> },
      { id: 'gazette', label: 'Gazette Alchemist', icon: <Newspaper size={18}/> },
      { id: 'podcast', label: 'Podcast Forge', icon: <Mic size={18}/> },
    ]},
    { label: 'REVENUE_REACTOR', items: [
      { id: 'promotions', label: 'Brand Matrix', icon: <Megaphone size={18}/> },
      { id: 'affiliates', label: 'Synergy Hub', icon: <ShoppingCart size={18}/> },
      { id: 'yield', label: 'Yield Forecaster', icon: <Activity size={18}/> },
      { id: 'monetize', label: 'Monetize Oracle', icon: <Target size={18}/> },
    ]},
    { label: 'GLOBAL_TELEMETRY', items: [
      { id: 'pulse', label: 'Imperial Pulse', icon: <MapPin size={18}/> },
      { id: 'nexus', label: 'Global Nexus', icon: <Globe size={18}/> },
      { id: 'traffic', label: 'Hyperspace', icon: <Zap size={18}/> },
      { id: 'sentiment', label: 'Aether Sentiment', icon: <Heart size={18}/> },
    ]},
    { label: 'AEGIS_SECURITY', items: [
      { id: 'gateway', label: 'API Gateway', icon: <Lock size={18}/> },
      { id: 'matrix', label: 'Threat Matrix', icon: <ShieldAlert size={18}/> },
      { id: 'defrag', label: 'Neural Defrag', icon: <Binary size={18}/> },
      { id: 'biometry', label: 'Bio Telemetry', icon: <Fingerprint size={18}/> },
    ]}
  ];

  return (
    <LangContext.Provider value={{lang, setLang}}>
      <div className="min-h-screen bg-black text-white flex overflow-hidden font-sans">
        <aside className="h-screen glass w-[320px] flex flex-col z-[100] shrink-0 border-r border-white/5 scrollbar-hide overflow-y-auto">
          <div className="p-8 h-24 flex items-center gap-4 shrink-0 border-b border-white/5 sticky top-0 z-20 glass">
            <div className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center border-[2px] border-black shadow-pink"><Soul size={20} className="text-black"/></div>
            <span className="font-black text-2xl italic tracking-tighter uppercase">Godhead_V3</span>
          </div>
          
          <nav className="flex-1 p-6 space-y-8 mt-4">
            {menuGroups.map((group) => (
              <div key={group.label} className="space-y-3">
                <p className="px-4 text-[10px] font-black text-slate-700 uppercase tracking-widest italic">{group.label}</p>
                {group.items.map((item) => (
                  <button key={item.id} onClick={() => setView(item.id)} className={`w-full flex items-center gap-4 px-6 py-4 rounded-full transition-all border-[1px] ${view === item.id ? 'bg-pink-600 border-black text-black shadow-pink' : 'text-slate-400 border-transparent hover:text-white hover:bg-white/5'}`}>
                    {item.icon}
                    <span className="text-[11px] font-black uppercase tracking-widest italic">{item.label}</span>
                  </button>
                ))}
              </div>
            ))}
          </nav>
          
          <div className="p-6 border-t border-white/5 glass">
             <button onClick={() => setIsAdminMode(false)} className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-full bg-white/5 text-slate-500 hover:text-red-500 hover:bg-red-500/10 transition-all font-black uppercase text-xs italic">
               <LogOut size={16}/> TERMINATE_SYNC
             </button>
          </div>
        </aside>

        <main className="flex-1 flex flex-col h-screen overflow-hidden relative bg-black">
          <header className="h-24 glass px-12 flex items-center justify-between shrink-0 z-10 border-b border-white/5">
             <div className="flex items-center gap-4">
                <div className="w-3 h-3 bg-pink-600 rounded-full animate-pulse"></div>
                <h2 className="text-xl font-black uppercase tracking-widest text-white italic">SESSION: <span className="text-pink-500">{view.toUpperCase()}</span></h2>
             </div>
             <div className="flex items-center gap-6">
                <div className="hidden xl:flex items-center gap-3 px-6 py-2 glass rounded-full text-[10px] font-black text-slate-500 uppercase tracking-widest">
                   <Gauge size={14} className="text-emerald-500"/> STABILITY: 100%
                </div>
                <div className="flex items-center gap-3 px-6 py-2 glass rounded-full text-[10px] font-black text-slate-500 uppercase tracking-widest border border-pink-500/30">
                   <Fingerprint size={14} className="text-pink-500"/> MASTER_ADMIN_AUTH
                </div>
             </div>
          </header>

          <div className="flex-1 overflow-y-auto p-12 xl:p-24 scrollbar-hide relative z-10">
              <div className="max-w-[1600px] mx-auto min-h-screen">
                {view === 'dashboard' && <Dashboard db={db} setView={setView} />}
                {view === 'bot' && <SentientBot updateDB={updateDB} />}
                {view === 'warper' && <RealityWarper db={db} />}
                {view === 'strategy' && <StrategyArchitect db={db} lang={lang} />}
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
                {view === 'nexus' && <GlobalNexus db={db} />}
                {view === 'traffic' && <HyperspaceTraffic db={db} />}
                {view === 'sentiment' && <AetherSentiment db={db} />}
                
                {view === 'gateway' && <APIGateway />}
                {view === 'matrix' && <ThreatMatrix />}
                {view === 'defrag' && <NeuralDefrag db={db} updateDB={updateDB} />}
                {view === 'biometry' && <BioTelemetry />}
              </div>
              <div className="h-[200px]"></div>
          </div>
        </main>
      </div>
    </LangContext.Provider>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);