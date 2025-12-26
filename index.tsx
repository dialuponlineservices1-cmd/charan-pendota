
import React, { useState, useEffect, createContext, Component, ErrorInfo, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Monitor, LayoutDashboard, PlusCircle, Database, Film, 
  Image as ImageIcon, Sparkles, Volume2, BrainCircuit, 
  ShoppingBag, PhoneForwarded, 
  FolderLock, Settings, LogOut, UserCircle, 
  Activity as ActivityIcon, Lock, Hexagon, Terminal,
  ShieldCheck, Radio, ChevronRight, Zap, AlertCircle, Layers,
  Target, Cpu, MessageSquare, Compass
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// Modular Components
import { Dashboard } from './Dashboard';
import { ManageJobs } from './ManageJobs';
import { ManageExams } from './ManageExams';
import { PublicPortal } from './PublicPortal';
import { ReelStudio } from './ReelStudio';
import { BannerMaker } from './BannerMaker';
import { MagicEditor } from './MagicEditor';
import { AudioForge } from './AudioForge';
import { DoubtDestroyer } from './DoubtDestroyer';
import { Marketplace } from './Marketplace';
import { ApplyService } from './ApplyService';
import { MaterialVault } from './MaterialVault';
import { PromotionsManager } from './PromotionsManager';
import { Settings as SettingsPanel } from './Settings';

const DB_KEY = 'student_dialup_spectral_v1500';

export const LangContext = createContext<{lang: 'en' | 'te', setLang: (l: 'en' | 'te') => void}>({lang: 'en', setLang: () => {}});

export const getAiClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

class ErrorBoundary extends Component<{children: ReactNode}, {hasError: boolean}> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error: Error, info: ErrorInfo) { console.error("Spectral Core Halt:", error, info); }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#020202] flex flex-col items-center justify-center p-12 text-center font-sans">
          <div className="w-20 h-20 bg-red-600/10 border border-red-600/20 rounded-full flex items-center justify-center animate-pulse mb-8">
            <AlertCircle size={32} className="text-red-500"/>
          </div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-4 italic">CORE_SYNC_FAILURE</h2>
          <p className="text-slate-700 font-bold uppercase tracking-[0.5em] text-[8px] mb-12 italic">RESTORING_NEURAL_PATHWAYS</p>
          <button onClick={() => window.location.reload()} className="px-10 py-4 bg-white text-black rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-emerald-500 hover:text-white transition-all">RE-BOOT</button>
        </div>
      );
    }
    return this.props.children;
  }
}

class StorageService {
  static getLocalDB() {
    try {
      const data = localStorage.getItem(DB_KEY);
      return data ? JSON.parse(data) : this.getDefaults();
    } catch (e) {
      return this.getDefaults();
    }
  }

  static getDefaults() {
    return { 
      jobs: [],
      exams: [],
      products: [],
      promotions: [],
      materials: [],
      ticker: "V1500 SPECTRAL • SYSTEM NOMINAL • NEURAL MESH ONLINE • STATUS: SUPREME",
      analytics: { views: 0, users: 0, activeNow: 1842, revenue: 512000, serviceApplications: 198, storeSales: 642 }, 
      contactInfo: {
        whatsapp: "+91",
        adminKey: "8888" 
      }
    };
  }

  static saveLocalDB(db: any) {
    localStorage.setItem(DB_KEY, JSON.stringify(db));
  }
}

const App = () => {
  const [lang, setLang] = useState<'en' | 'te'>('te');
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPass, setAdminPass] = useState('');
  const [view, setView] = useState('dashboard');
  const [db, setDb] = useState(StorageService.getLocalDB());

  useEffect(() => { 
    StorageService.saveLocalDB(db); 
  }, [db]);

  const updateDB = (updater: (prev: any) => any) => {
    setDb((prev: any) => {
      const next = updater(prev);
      StorageService.saveLocalDB(next);
      return next;
    });
  };

  const handleAdminAuth = () => {
    if (adminPass === db.contactInfo.adminKey) {
      setIsAuthenticated(true);
    } else {
      alert("SPECTRAL SECURITY: Identity rejected.");
    }
  };

  if (!isAdminMode) {
    return (
      <LangContext.Provider value={{lang, setLang}}>
        <PublicPortal db={db} setAdminMode={() => setIsAdminMode(true)} updateDB={updateDB} />
      </LangContext.Provider>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#020202] flex items-center justify-center p-8 font-sans">
        <div className="max-w-md w-full bg-[#050505] border border-white/[0.03] rounded-[80px] p-20 text-center shadow-2xl animate-in zoom-in-95 duration-1000">
           <div className="w-16 h-16 bg-white/[0.02] border border-white/[0.05] rounded-full flex items-center justify-center mx-auto mb-10">
              <Lock size={24} className="text-emerald-500"/>
           </div>
           <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white mb-12">SPECTRAL<span className="text-emerald-500">.</span></h2>
           <div className="space-y-10">
             <input 
               type="password" 
               className="w-full bg-black border border-white/[0.03] rounded-full px-10 py-6 text-white font-black text-center text-5xl outline-none focus:border-emerald-600 transition-all placeholder:text-slate-900 tracking-tighter shadow-inner" 
               placeholder="••••" 
               value={adminPass} 
               onChange={e => setAdminPass(e.target.value)}
               onKeyDown={e => e.key === 'Enter' && handleAdminAuth()}
             />
             <button onClick={handleAdminAuth} className="w-full bg-emerald-600 text-white py-8 rounded-full font-black uppercase text-[10px] tracking-[0.5em] hover:bg-white hover:text-black transition-all shadow-2xl">INITIALIZE</button>
             <button onClick={() => setIsAdminMode(false)} className="text-[7px] font-black text-slate-800 uppercase tracking-widest hover:text-white transition-colors italic">EXIT_MESH</button>
           </div>
        </div>
      </div>
    );
  }

  const menuGroups = [
    {
      name: 'CORE',
      items: [
        { id: 'dashboard', label: 'Nodes', icon: <ActivityIcon size={18}/> },
        { id: 'manage-jobs', label: 'Registry', icon: <PlusCircle size={18}/> },
        { id: 'manage-exams', label: 'Exams', icon: <Database size={18}/> },
      ]
    },
    {
      name: 'SYNTH',
      items: [
        { id: 'reel-studio', label: 'Motion', icon: <Film size={18}/> },
        { id: 'banner-maker', label: 'Assets', icon: <ImageIcon size={18}/> },
        { id: 'magic-editor', label: 'Neural', icon: <Sparkles size={18}/> },
        { id: 'audio-forge', label: 'Sonic', icon: <Volume2 size={18}/> },
      ]
    },
    {
      name: 'VAULT',
      items: [
        { id: 'marketplace', label: 'Store', icon: <ShoppingBag size={18}/> },
        { id: 'material-vault', label: 'Data', icon: <FolderLock size={18}/> },
        { id: 'apply-service', label: 'Desk', icon: <PhoneForwarded size={18}/> },
      ]
    }
  ];

  return (
    <LangContext.Provider value={{lang, setLang}}>
      <ErrorBoundary>
        <div className="min-h-screen bg-[#020202] text-slate-100 flex font-sans overflow-hidden selection:bg-emerald-600 selection:text-white">
          
          {/* V1500 SPECTRAL BLADE SIDEBAR */}
          <aside className="h-screen sticky top-0 bg-[#020202] border-r border-white/[0.03] w-20 hover:w-60 transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] flex flex-col z-[1000] group/sidebar overflow-hidden shrink-0">
            <div className="p-6 flex items-center gap-6 h-28 shrink-0 relative overflow-hidden">
              <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center shrink-0 group-hover/sidebar:rotate-[360deg] transition-transform duration-1000 shadow-2xl shadow-emerald-600/40">
                <Hexagon size={20} className="text-white"/>
              </div>
              <div className="opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-700 whitespace-nowrap">
                 <h1 className="text-xl font-black tracking-tighter text-white uppercase italic leading-none">SPECTRAL<span className="text-emerald-500">.</span></h1>
                 <p className="text-[6px] font-black uppercase text-slate-800 tracking-[0.4em]">ADMIN_V15</p>
              </div>
            </div>
            
            <nav className="flex-1 px-4 space-y-12 mt-12 overflow-y-auto scrollbar-hide pb-48">
              {menuGroups.map((group) => (
                <div key={group.name} className="space-y-3">
                  <p className="px-4 py-1 text-[7px] font-black text-slate-800 uppercase tracking-[0.8em] mb-2 opacity-0 group-hover/sidebar:opacity-100 transition-opacity whitespace-nowrap">
                    {group.name}
                  </p>
                  {group.items.map((item) => (
                    <button 
                      key={item.id} 
                      onClick={() => setView(item.id)} 
                      className={`w-full flex items-center gap-6 px-4 py-3.5 rounded-full transition-all group/item ${view === item.id ? 'bg-white text-black shadow-2xl shadow-white/10' : 'text-slate-700 hover:text-white hover:bg-white/[0.02]'}`}
                    >
                      <span className={`shrink-0 transition-transform duration-500 ${view === item.id ? 'scale-110' : 'group-hover/item:scale-110'}`}>{item.icon}</span>
                      <span className="text-[9px] uppercase tracking-[0.4em] font-black opacity-0 group-hover/sidebar:opacity-100 transition-opacity whitespace-nowrap">{item.label}</span>
                    </button>
                  ))}
                </div>
              ))}
            </nav>

            <div className="p-4 border-t border-white/[0.03]">
              <button onClick={() => setIsAuthenticated(false)} className="w-full h-12 flex items-center justify-center gap-4 text-red-500 bg-red-500/5 rounded-full hover:bg-red-600 hover:text-white transition-all group/logout">
                <LogOut size={16}/>
                <span className="text-[8px] font-black uppercase tracking-[0.4em] italic opacity-0 group-hover/sidebar:opacity-100 transition-opacity whitespace-nowrap">SHUTDOWN</span>
              </button>
            </div>
          </aside>

          {/* MAIN VIEWPORT */}
          <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[#020202] relative">
            <header className="h-28 border-b border-white/[0.03] px-12 flex items-center justify-between shrink-0 relative z-[500] bg-black/40 backdrop-blur-2xl">
               <div className="flex items-center gap-10">
                  <div className="w-10 h-10 bg-white/[0.01] rounded-full flex items-center justify-center border border-white/[0.05]">
                     <Compass className="text-emerald-500" size={18}/>
                  </div>
                  <h2 className="text-[9px] font-black uppercase tracking-[0.8em] text-slate-800 italic flex items-center gap-6">
                    SYSTEM_MESH <ChevronRight className="text-slate-900" size={14}/> <span className="text-white underline decoration-emerald-500 underline-offset-[16px] decoration-[3px]">{view.toUpperCase()}</span>
                  </h2>
               </div>
               <div className="flex items-center gap-8">
                  <div className="hidden lg:flex items-center gap-6 px-8 py-2.5 bg-white/[0.02] rounded-full border border-white/[0.03] shadow-inner">
                     <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.8)]"></div>
                     <span className="text-[8px] font-black text-white uppercase tracking-[0.3em] italic">{db.analytics.activeNow.toLocaleString()} Live Nodes</span>
                  </div>
                  <div onClick={() => setView('settings')} className="w-10 h-10 bg-white/[0.02] border border-white/[0.05] rounded-full flex items-center justify-center text-slate-700 hover:text-emerald-500 transition-all cursor-pointer group shadow-inner"><Settings size={18} className="group-hover:rotate-90 transition-transform duration-1000"/></div>
                  <div className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center shadow-2xl group cursor-pointer border border-white/10 overflow-hidden"><UserCircle size={22}/></div>
               </div>
            </header>
            
            <div className="flex-1 overflow-y-auto p-12 scrollbar-hide relative bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-fixed opacity-[0.99]">
              <div className="max-w-[1500px] mx-auto pb-64">
                {view === 'dashboard' && <Dashboard db={db} setView={setView} />}
                {view === 'manage-jobs' && <ManageJobs db={db} updateDB={updateDB} />}
                {view === 'manage-exams' && <ManageExams db={db} updateDB={updateDB} />}
                {view === 'reel-studio' && <ReelStudio db={db} isAiLoading={false} setIsAiLoading={() => {}} />}
                {view === 'banner-maker' && <BannerMaker db={db} isAiLoading={false} setIsAiLoading={() => {}} />}
                {view === 'magic-editor' && <MagicEditor db={db} isAiLoading={false} setIsAiLoading={() => {}} onPostCreated={(p:any) => updateDB((prev:any)=>({...prev, jobs: [p, ...prev.jobs]}))} />}
                {view === 'audio-forge' && <AudioForge db={db} />}
                {view === 'doubt-destroyer' && <DoubtDestroyer db={db} />}
                {view === 'marketplace' && <Marketplace db={db} updateDB={updateDB} />}
                {view === 'apply-service' && <ApplyService db={db} updateDB={updateDB} />}
                {view === 'material-vault' && <MaterialVault db={db} updateDB={updateDB} />}
                {view === 'promotions' && <PromotionsManager db={db} updateDB={updateDB} />}
                {view === 'settings' && <SettingsPanel db={db} updateDB={updateDB} />}
              </div>
            </div>
          </main>
        </div>
      </ErrorBoundary>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap');
        body { font-family: 'Plus Jakarta Sans', sans-serif; background: #020202; letter-spacing: -0.01em; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}} />
    </LangContext.Provider>
  );
};

const mount = () => {
  const container = document.getElementById('root');
  if (container) {
    const root = createRoot(container);
    root.render(<App />);
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mount);
} else {
  mount();
}
