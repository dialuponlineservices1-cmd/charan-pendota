
import React, { useState, useEffect, createContext, Component, ErrorInfo, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  LayoutDashboard, PlusCircle, Database, Film, 
  Image as ImageIcon, Sparkles, Volume2, BrainCircuit, 
  ShoppingBag, PhoneForwarded, FolderLock, Settings, LogOut, 
  UserCircle, Activity as ActivityIcon, Lock, Hexagon, Terminal,
  ShieldCheck, Radio, ChevronRight, Zap, AlertCircle, Layers,
  Target, Cpu, MessageSquare, Compass, Briefcase, GraduationCap, 
  Ticket, FileText, Newspaper, MapPin
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// Modular Components
import { Dashboard } from './Dashboard';
import { ManageJobs } from './ManageJobs';
import { ManageExams } from './ManageExams';
import { PublicPortal } from './PublicPortal';
import { Marketplace } from './Marketplace';
import { ApplyService } from './ApplyService';
import { MaterialVault } from './MaterialVault';
import { Settings as SettingsPanel } from './Settings';

const DB_KEY = 'student_dialup_supreme_v1600';

export const LangContext = createContext<{lang: 'en' | 'te', setLang: (l: 'en' | 'te') => void}>({lang: 'en', setLang: () => {}});

class StorageService {
  static getLocalDB() {
    try {
      const data = localStorage.getItem(DB_KEY);
      return data ? JSON.parse(data) : this.getDefaults();
    } catch (e) { return this.getDefaults(); }
  }

  static getDefaults() {
    return { 
      jobs: [], 
      internships: [],
      walkins: [],
      schemes: [],
      exams: [],
      hallTickets: [],
      results: [],
      products: [],
      materials: [],
      news: [],
      ticker: "V1600 SUPREME • HALL TICKETS UPDATED • LIVE INTERNSHIPS OPEN • SYSTEM NOMINAL",
      analytics: { views: 0, users: 0, activeNow: 2452, revenue: 840000, serviceApplications: 412, storeSales: 1205 }, 
      contactInfo: { whatsapp: "+91", adminKey: "8888" }
    };
  }

  static saveLocalDB(db: any) { localStorage.setItem(DB_KEY, JSON.stringify(db)); }
}

const App = () => {
  const [lang, setLang] = useState<'en' | 'te'>('te');
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPass, setAdminPass] = useState('');
  const [view, setView] = useState('dashboard');
  const [db, setDb] = useState(StorageService.getLocalDB());

  useEffect(() => { StorageService.saveLocalDB(db); }, [db]);

  const updateDB = (updater: (prev: any) => any) => {
    setDb((prev: any) => {
      const next = updater(prev);
      StorageService.saveLocalDB(next);
      return next;
    });
  };

  const handleAdminAuth = () => {
    if (adminPass === db.contactInfo.adminKey) setIsAuthenticated(true);
    else alert("IDENTITY REJECTED.");
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
      <div className="min-h-screen bg-[#020202] flex items-center justify-center p-8">
        <div className="max-w-md w-full bg-[#050505] border border-white/5 rounded-[60px] p-16 text-center shadow-2xl animate-pulse">
           <h2 className="text-4xl font-black italic text-white mb-10 tracking-tighter">SUPREME<span className="text-emerald-500">.</span></h2>
           <input type="password" className="w-full bg-black border border-white/10 rounded-full px-8 py-5 text-white font-black text-center text-4xl outline-none mb-8" placeholder="••••" value={adminPass} onChange={e => setAdminPass(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAdminAuth()}/>
           <button onClick={handleAdminAuth} className="w-full bg-emerald-600 text-white py-6 rounded-full font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">INITIALIZE COMMAND</button>
        </div>
      </div>
    );
  }

  const menuGroups = [
    {
      name: 'CAREER',
      items: [
        { id: 'dashboard', label: 'Overview', icon: <ActivityIcon size={18}/> },
        { id: 'manage-jobs', label: 'Govt Jobs', icon: <Briefcase size={18}/> },
        { id: 'manage-internships', label: 'Internships', icon: <GraduationCap size={18}/> },
        { id: 'manage-walkins', label: 'Walk-ins', icon: <MapPin size={18}/> },
      ]
    },
    {
      name: 'ACADEMIC',
      items: [
        { id: 'manage-exams', label: 'Exams/Mock', icon: <Database size={18}/> },
        { id: 'manage-halltickets', label: 'Hall Tickets', icon: <Ticket size={18}/> },
        { id: 'manage-results', label: 'Results', icon: <FileText size={18}/> },
      ]
    },
    {
      name: 'EXTRAS',
      items: [
        { id: 'manage-schemes', label: 'Schemes', icon: <Sparkles size={18}/> },
        { id: 'manage-news', label: 'Breaking News', icon: <Newspaper size={18}/> },
        { id: 'material-vault', label: 'Material Vault', icon: <FolderLock size={18}/> },
        { id: 'marketplace', label: 'Marketplace', icon: <ShoppingBag size={18}/> },
      ]
    }
  ];

  return (
    <LangContext.Provider value={{lang, setLang}}>
      <div className="min-h-screen bg-[#020202] text-slate-100 flex overflow-hidden">
        
        {/* V1600 SUPREME SIDEBAR */}
        <aside className="h-screen bg-[#020202] border-r border-white/5 w-20 hover:w-64 transition-all duration-500 flex flex-col z-[100] group/sidebar shrink-0 overflow-y-auto scrollbar-hide">
          <div className="p-6 h-24 flex items-center gap-4 shrink-0 overflow-hidden">
            <div className="w-10 h-10 bg-emerald-600 rounded-full shrink-0 flex items-center justify-center shadow-lg shadow-emerald-500/20"><Hexagon size={20} className="text-white"/></div>
            <span className="font-black text-xl italic tracking-tighter opacity-0 group-hover/sidebar:opacity-100 transition-opacity whitespace-nowrap">SUPREME.</span>
          </div>
          
          <nav className="flex-1 px-4 space-y-10 mt-10">
            {menuGroups.map((group) => (
              <div key={group.name} className="space-y-2">
                <p className="px-4 text-[8px] font-black text-slate-800 uppercase tracking-widest opacity-0 group-hover/sidebar:opacity-100 whitespace-nowrap">{group.name}</p>
                {group.items.map((item) => (
                  <button key={item.id} onClick={() => setView(item.id)} className={`w-full flex items-center gap-5 px-4 py-3.5 rounded-2xl transition-all ${view === item.id ? 'bg-white text-black' : 'text-slate-600 hover:text-white hover:bg-white/5'}`}>
                    <span className="shrink-0">{item.icon}</span>
                    <span className="text-[10px] uppercase font-black tracking-widest opacity-0 group-hover/sidebar:opacity-100 whitespace-nowrap">{item.label}</span>
                  </button>
                ))}
              </div>
            ))}
          </nav>

          <div className="p-4 border-t border-white/5">
            <button onClick={() => setIsAuthenticated(false)} className="w-full h-12 flex items-center justify-center gap-4 text-red-500 hover:bg-red-500 hover:text-white rounded-2xl transition-all group/logout">
              <LogOut size={18}/>
              <span className="text-[10px] font-black opacity-0 group-hover/sidebar:opacity-100">LOGOUT</span>
            </button>
          </div>
        </aside>

        {/* MAIN VIEWPORT */}
        <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
          <header className="h-24 border-b border-white/5 px-10 flex items-center justify-between bg-black/50 backdrop-blur-xl shrink-0">
             <div className="flex items-center gap-6">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                <h2 className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-600 italic">SYSTEM_PATH: <span className="text-white">{view.toUpperCase()}</span></h2>
             </div>
             <div className="flex items-center gap-6">
                <button onClick={() => setIsAdminMode(false)} className="px-6 py-2 border border-white/10 rounded-full text-[9px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">Public Portal</button>
                <div className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center shadow-lg"><UserCircle size={22}/></div>
             </div>
          </header>
          
          <div className="flex-1 overflow-y-auto p-10 scrollbar-hide">
            <div className="max-w-7xl mx-auto">
              {view === 'dashboard' && <Dashboard db={db} setView={setView} />}
              {view === 'manage-jobs' && <ManageJobs db={db} updateDB={updateDB} type="jobs" title="Govt Jobs" />}
              {view === 'manage-internships' && <ManageJobs db={db} updateDB={updateDB} type="internships" title="Internships" />}
              {view === 'manage-walkins' && <ManageJobs db={db} updateDB={updateDB} type="walkins" title="Walk-in Jobs" />}
              {view === 'manage-schemes' && <ManageJobs db={db} updateDB={updateDB} type="schemes" title="Student Schemes" />}
              {view === 'manage-halltickets' && <ManageJobs db={db} updateDB={updateDB} type="hallTickets" title="Hall Tickets" />}
              {view === 'manage-results' && <ManageJobs db={db} updateDB={updateDB} type="results" title="Exam Results" />}
              {view === 'manage-news' && <ManageJobs db={db} updateDB={updateDB} type="news" title="Breaking News" />}
              {view === 'manage-exams' && <ManageExams db={db} updateDB={updateDB} />}
              {view === 'marketplace' && <Marketplace db={db} updateDB={updateDB} />}
              {view === 'material-vault' && <MaterialVault db={db} updateDB={updateDB} />}
              {view === 'settings' && <SettingsPanel db={db} updateDB={updateDB} />}
            </div>
          </div>
        </main>
      </div>
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
mount();
