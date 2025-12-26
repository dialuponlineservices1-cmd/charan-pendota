import React, { useState, useEffect, createContext } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Zap, Brain, Atom, Sparkles, Video, 
  Mic, BoxSelect, MapPin, Soul, 
  Terminal, ShieldCheck, Megaphone, Newspaper, 
  LogOut, Fingerprint, Activity, Gauge,
  ShoppingCart, Globe, Compass, Target, 
  Wand2, Lock, ShieldAlert, Binary, Heart,
  Cpu, LayoutDashboard, Database, Layers,
  ChevronRight
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
    { label: 'Intelligence', items: [
      { id: 'dashboard', label: 'Command Center', icon: <LayoutDashboard size={18}/> },
      { id: 'strategy', label: 'Victory Blueprint', icon: <Compass size={18}/> },
      { id: 'warper', label: 'Reality Warp', icon: <Atom size={18}/> },
      { id: 'sentinel', label: 'Neural Watch', icon: <ShieldCheck size={18}/> },
    ]},
    { label: 'Production', items: [
      { id: 'magic-editor', label: 'Ascension Forge', icon: <Wand2 size={18}/> },
      { id: 'factory', label: 'Omni Factory', icon: <Cpu size={18}/> },
      { id: 'veo', label: 'Veo Cinema', icon: <Video size={18}/> },
      { id: 'gazette', label: 'Gazette Alchemy', icon: <Newspaper size={18}/> },
      { id: 'podcast', label: 'Podcast Forge', icon: <Mic size={18}/> },
    ]},
    { label: 'Revenue', items: [
      { id: 'promotions', label: 'Ad Matrix', icon: <Megaphone size={18}/> },
      { id: 'affiliates', label: 'Synergy Hub', icon: <ShoppingCart size={18}/> },
      { id: 'yield', label: 'Yield Predict', icon: <Activity size={18}/> },
      { id: 'monetize', label: 'Profit Oracle', icon: <Target size={18}/> },
    ]},
    { label: 'Telemetry', items: [
      { id: 'pulse', label: 'Global Pulse', icon: <Globe size={18}/> },
      { id: 'traffic', label: 'Warp Speed', icon: <Zap size={18}/> },
      { id: 'sentiment', label: 'Aether Mood', icon: <Heart size={18}/> },
    ]},
    { label: 'Security', items: [
      { id: 'gateway', label: 'API Firewall', icon: <Lock size={18}/> },
      { id: 'matrix', label: 'Threat Radar', icon: <ShieldAlert size={18}/> },
      { id: 'defrag', label: 'Lattice Clean', icon: <Binary size={18}/> },
      { id: 'biometry', label: 'Bio Telemetry', icon: <Fingerprint size={18}/> },
    ]}
  ];

  return (
    <LangContext.Provider value={{lang, setLang}}>
      <div className="min-h-screen bg-[#020202] text-slate-300 flex overflow-hidden font-sans">
        {/* Modern Advanced Sidebar */}
        <aside className="w-[300px] h-screen bg-black border-r border-white/5 flex flex-col z-[100] shrink-0">
          <div className="h-24 flex items-center px-10 border-b border-white/5 gap-5">
            <div className="w-10 h-10 bg-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-pink-600/20 rotate-3">
              <Soul size={24} className="text-black"/>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-2xl text-white tracking-tighter uppercase italic leading-none">Master_V3</span>
              <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest mt-1">Sovereign Admin Unit</span>
            </div>
          </div>
          
          <nav className="flex-1 overflow-y-auto p-5 space-y-9 scrollbar-hide">
            {menuGroups.map((group) => (
              <div key={group.label} className="space-y-1">
                <p className="px-4 text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-3">{group.label}</p>
                {group.items.map((item) => (
                  <button 
                    key={item.id} 
                    onClick={() => setView(item.id)} 
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-300 group ${view === item.id ? 'bg-pink-600 text-white shadow-xl shadow-pink-600/20' : 'text-slate-500 hover:bg-white/5 hover:text-white'}`}
                  >
                    <div className="flex items-center gap-4">
                      <span className={`transition-colors ${view === item.id ? 'text-white' : 'text-slate-600 group-hover:text-pink-500'}`}>{item.icon}</span>
                      <span className="text-xs font-bold uppercase tracking-wide">{item.label}</span>
                    </div>
                    {view === item.id && <ChevronRight size={14} className="animate-pulse"/>}
                  </button>
                ))}
              </div>
            ))}
          </nav>
          
          <div className="p-6 border-t border-white/5 bg-white/[0.02]">
             <button onClick={() => setIsAdminMode(false)} className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-red-600/10 text-red-500 hover:bg-red-600 hover:text-white transition-all font-black uppercase text-[11px] border border-red-500/20 shadow-lg">
               <LogOut size={16}/> Terminate Session
             </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col h-screen overflow-hidden">
          <header className="h-24 bg-black/40 backdrop-blur-3xl border-b border-white/5 px-12 flex items-center justify-between z-50">
             <div className="flex items-center gap-5">
                <div className="relative">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-ping absolute inset-0"></div>
                  <div className="w-3 h-3 bg-emerald-500 rounded-full relative"></div>
                </div>
                <div className="flex flex-col">
                  <h2 className="text-xs font-black uppercase tracking-[0.4em] text-white italic">Node Intelligence Grid</h2>
                  <p className="text-[10px] font-bold text-pink-500 uppercase tracking-widest mt-0.5">{view.replace('-', ' ')}</p>
                </div>
             </div>
             <div className="flex items-center gap-6">
                <div className="hidden lg:flex items-center gap-4 px-6 py-2.5 bg-white/5 rounded-2xl text-[10px] font-black text-slate-400 uppercase border border-white/5">
                   <Gauge size={14} className="text-pink-500"/> Stability Index: <span className="text-white ml-1">99.98%</span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-600 via-purple-600 to-indigo-600 p-[1.5px] shadow-xl">
                  <div className="w-full h-full bg-black rounded-[14px] flex items-center justify-center">
                    <Fingerprint size={20} className="text-white"/>
                  </div>
                </div>
             </div>
          </header>

          <div className="flex-1 overflow-y-auto p-10 xl:p-16 scrollbar-hide bg-[#020202]">
              <div className="max-w-7xl mx-auto space-y-12">
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