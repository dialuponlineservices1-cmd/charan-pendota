
import React, { useState, useEffect, createContext } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Activity, Briefcase, GraduationCap, Ticket, FileText, 
  Sparkles, Newspaper, MapPin, Zap, Cpu, Settings, 
  LogOut, UserCircle, Hexagon, ShieldCheck, Megaphone, 
  ShoppingBag, FolderLock, MessageSquare, Flame, Swords, Ghost,
  Compass, Target, Radio, Layers, Terminal, Rocket, DollarSign, Languages, Scale,
  Radar, BarChart3, TrendingUp, Trophy, ScanFace, Brain, Mic, Globe, Crown, Headphones,
  Eye, ZapOff, HardDrive, LineChart, Shield, Box, Share2, Server, Key, Activity as PulseIcon,
  ShieldAlert, Database, FileOutput, Wind, EyeOff, Timer, Send, Layout, Wrench, Zap as Bolt,
  Fingerprint, Eye as EyeIcon, Binary, Waves, Gauge, PieChart, Heart, Satellite, BarChart,
  Sword, Wand2, TrendingDown, Landmark, FolderSync, BookOpenCheck, History, ExternalLink,
  ChevronDown, Search, Filter, Lock, Download, ChevronRight, PlayCircle, Infinity,
  Medal, Star, BarChart4, TrendingUp as TrendUp, Zap as Lightning, ShieldAlert as Alert, 
  Waves as Flux, Gem, BookOpen, Flag, Mic2, Map, ShieldPlus, ShoppingCart, Volume2, Film,
  Crosshair, BarChartHorizontal, Video, UserPlus, Share, Smartphone, Presentation, Dna, 
  Newspaper as NewsIcon, MicOff, BoxSelect, Network, Zap as BoltIcon, SearchCode, Camera,
  Boxes, Orbit, Atom, FastForward, Scan, AlertTriangle, Cubes, Ghost as Soul, Lightbulb
} from 'lucide-react';

import { Dashboard } from './Dashboard';
import { PublicPortal } from './PublicPortal';
import { MagicEditor } from './MagicEditor';
import { NeuralSentinel } from './NeuralSentinel';
import { ImperialPulse } from './ImperialPulse';
import { ImperialOracle } from './ImperialOracle';
import { AetherAvatar } from './AetherAvatar';
import { SovereignVoice } from './SovereignVoice';
import { NeuroLobby } from './NeuroLobby';
import { DarkMatterScraper } from './DarkMatterScraper';
import { OmniFactory } from './OmniFactory';
import { VeoArchitect } from './VeoArchitect';
import { CutoffPredictor } from './CutoffPredictor';
import { HyperspaceTraffic } from './HyperspaceTraffic';
import { BioScanLogin } from './BioScanLogin';
import { SentientBot } from './SentientBot';
import { RealityWarper } from './RealityWarper';
import { MindPalace } from './MindPalace';
import { HolographicYield } from './HolographicYield';
import { QuantumForesight } from './QuantumForesight';

const DB_KEY = 'aethegard_v3000_omniscience';
export const LangContext = createContext<{lang: 'en' | 'te', setLang: (l: 'en' | 'te') => void}>({lang: 'en', setLang: () => {}});

const getInitialDB = () => {
  const data = localStorage.getItem(DB_KEY);
  if (data) return JSON.parse(data);
  return { 
    jobs: [], 
    exams: [],
    promotions: [],
    affiliates: [],
    analytics: { activeNow: 42405000, revenue: 985400000000 }, 
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
  useEffect(() => { setTimeout(() => setIsBooting(false), 3000); }, []);

  const updateDB = (updater: (prev: any) => any) => setDb((prev: any) => updater(prev));

  if (isBooting) return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-10 overflow-hidden relative">
       <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#f472b6_0%,_transparent_70%)] opacity-20 animate-pulse"></div>
       <div className="relative">
         <Atom size={600} className="text-pink-500 animate-spin-slow opacity-10"/>
         <Soul size={220} className="text-pink-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse shadow-[0_0_500px_pink]"/>
       </div>
       <h2 className="text-[350px] font-black italic tracking-tighter text-white leading-none mt-12">V3000<span className="text-pink-500">.GOD</span></h2>
       <p className="text-[32px] font-black text-white/40 uppercase tracking-[4em] animate-pulse italic">OMNISCIENCE_PROTOCOL_LIVE</p>
    </div>
  );

  if (!isAdminMode) return <LangContext.Provider value={{lang, setLang}}><PublicPortal db={db} setAdminMode={() => setIsAdminMode(true)} updateDB={updateDB} /></LangContext.Provider>;

  if (!isAuthenticated) return <BioScanLogin adminKey={db.contactInfo.adminKey} onAuthSuccess={() => setIsAuthenticated(true)} />;

  const menu = [
    { label: 'OMNISCIENT_NODES', items: [
      { id: 'dashboard', label: 'Prime Godhead', icon: <Soul size={32}/> },
      { id: 'bot', label: 'Sentient Bot', icon: <Brain size={32}/> },
      { id: 'warper', label: 'Reality Warper', icon: <Atom size={32}/> },
      { id: 'palace', label: 'Mind Palace', icon: <Cubes size={32}/> },
    ]},
    { label: 'FINANCIAL_DIVINITY', items: [
      { id: 'yield', label: 'Holographic Yield', icon: <Sparkles size={32}/> },
      { id: 'foresight', label: 'Quantum Foresight', icon: <Radar size={32}/> },
      { id: 'veo-architect', label: 'Veo Architect', icon: <Video size={32}/> },
      { id: 'factory', label: 'Omni-Factory', icon: <BoltIcon size={32}/> },
    ]},
    { label: 'LEGACY_COMMAND', items: [
      { id: 'voice', label: 'Sovereign Voice', icon: <Mic size={32}/> },
      { id: 'lobby', label: 'Neuro-Lobby', icon: <BoxSelect size={32}/> },
      { id: 'dark-matter', label: 'Dark-Matter Scraper', icon: <SearchCode size={32}/> },
      { id: 'pulse', label: 'Imperial Pulse', icon: <MapPin size={32}/> },
    ]}
  ];

  return (
    <LangContext.Provider value={{lang, setLang}}>
      <div className="min-h-screen bg-black text-white flex overflow-hidden selection:bg-pink-600">
        <aside className="h-screen bg-black border-r-[30px] border-white/5 w-[550px] transition-all duration-700 flex flex-col z-[100] group shrink-0 overflow-y-auto scrollbar-hide">
          <div className="p-16 h-40 flex items-center gap-8 shrink-0">
            <div className="w-24 h-24 bg-pink-600 rounded-full flex items-center justify-center shadow-4xl border-[8px] border-black"><Soul size={48} className="text-black"/></div>
            <span className="font-black text-8xl italic tracking-tighter text-white">GOD_V3.</span>
          </div>
          <nav className="flex-1 px-12 space-y-16 mt-16 pb-100">
            {menu.map((group: any) => (
              <div key={group.label} className="space-y-10">
                <p className="px-10 text-[16px] font-black text-slate-900 uppercase tracking-[1.2em] italic">{group.label}</p>
                {group.items.map((item: any) => (
                  <button key={item.id} onClick={() => setView(item.id)} className={`w-full flex items-center gap-10 px-12 py-8 rounded-full transition-all border-[15px] ${view === item.id ? 'bg-pink-600 border-black text-black shadow-[0_0_8000px_pink] scale-105' : 'text-slate-800 border-transparent hover:text-white hover:bg-white/5'}`}>
                    {item.icon}
                    <span className="text-3xl font-black uppercase tracking-widest whitespace-nowrap italic">{item.label}</span>
                  </button>
                ))}
              </div>
            ))}
          </nav>
        </aside>

        <main className="flex-1 flex flex-col h-screen overflow-hidden bg-black relative">
          <header className="h-40 border-b-[20px] border-white/5 px-16 flex items-center justify-between bg-black/95 backdrop-blur-6xl shrink-0 relative z-10">
             <div className="flex items-center gap-10">
                <div className="w-8 h-8 bg-pink-600 rounded-full animate-ping"></div>
                <h2 className="text-5xl font-black uppercase tracking-widest text-slate-900 italic leading-none">OMNISCIENCE_CMD: <span className="text-white">{view.toUpperCase()}</span></h2>
             </div>
             <button onClick={() => setIsAdminMode(false)} className="px-16 py-6 bg-white/5 border-[15px] border-white/10 rounded-full text-2xl font-black uppercase tracking-[0.5em] hover:bg-white hover:text-black transition-all shadow-4xl italic">TERMINATE_PRESENCE</button>
          </header>
          <div className="flex-1 overflow-y-auto p-16 lg:p-32 scrollbar-hide relative z-10 pb-[2000px]">
              {view === 'dashboard' && <Dashboard db={db} setView={setView} />}
              {view === 'bot' && <SentientBot updateDB={updateDB} />}
              {view === 'warper' && <RealityWarper db={db} />}
              {view === 'palace' && <MindPalace db={db} setView={setView} />}
              {view === 'yield' && <HolographicYield db={db} />}
              {view === 'foresight' && <QuantumForesight />}
              {view === 'veo-architect' && <VeoArchitect db={db} />}
              {view === 'cutoff' && <CutoffPredictor db={db} />}
              {view === 'hyperspace' && <HyperspaceTraffic db={db} />}
              {view === 'voice' && <SovereignVoice setView={setView} />}
              {view === 'factory' && <OmniFactory db={db} />}
              {view === 'lobby' && <NeuroLobby db={db} />}
              {view === 'dark-matter' && <DarkMatterScraper />}
              {view === 'pulse' && <ImperialPulse db={db} />}
              {view === 'sentinel' && <NeuralSentinel />}
              {view === 'magic-editor' && <MagicEditor onPostCreated={(p:any) => updateDB((prev:any)=>({...prev, jobs:[p, ...prev.jobs]}))} />}
          </div>
        </main>
      </div>
    </LangContext.Provider>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
