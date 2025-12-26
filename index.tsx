
import React, { useState, useEffect, createContext } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Activity, Briefcase, GraduationCap, Ticket, FileText, 
  Sparkles, Newspaper, MapPin, Zap, Cpu, Settings, 
  LogOut, UserCircle, Hexagon, ShieldCheck, Megaphone, 
  ShoppingBag, FolderLock, MessageSquare, Flame, Swords, Ghost
} from 'lucide-react';

// Advanced Modular Nodes
import { Dashboard } from './Dashboard';
import { ManageJobs } from './ManageJobs';
import { PublicPortal } from './PublicPortal';
import { PromotionsManager } from './PromotionsManager';
import { Marketplace } from './Marketplace';
import { MaterialVault } from './MaterialVault';
import { NewsNode } from './NewsNode';
import { ManageExams } from './ManageExams';
import { StrategyArchitect } from './StrategyArchitect';
import { WarRoom } from './WarRoom';

const DB_KEY = 'student_dialup_legacy_v2000';
export const LangContext = createContext<{lang: 'en' | 'te', setLang: (l: 'en' | 'te') => void}>({lang: 'en', setLang: () => {}});

const getInitialDB = () => {
  const data = localStorage.getItem(DB_KEY);
  if (data) return JSON.parse(data);
  return { 
    jobs: [], internships: [], walkins: [], schemes: [], 
    hallTickets: [], results: [], materials: [], news: [], exams: [],
    promotions: [], products: [],
    ticker: "V2000 LEGACY • SYSTEM INITIALIZED • ALL AD NODES ACTIVE • REVENUE MAXIMIZED",
    analytics: { activeNow: 18450, revenue: 850000, serviceApplications: 412, storeSales: 2100 }, 
    contactInfo: { whatsapp: "+91", adminKey: "8888" }
  };
};

const App = () => {
  const [lang, setLang] = useState<'en' | 'te'>('te');
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPass, setAdminPass] = useState('');
  const [view, setView] = useState('dashboard');
  const [db, setDb] = useState(getInitialDB());

  useEffect(() => { localStorage.setItem(DB_KEY, JSON.stringify(db)); }, [db]);
  const updateDB = (updater: (prev: any) => any) => setDb((prev: any) => updater(prev));

  const handleAdminAuth = () => {
    if (adminPass === db.contactInfo.adminKey) setIsAuthenticated(true);
    else alert("Access Denied.");
  };

  if (!isAdminMode) {
    return (
      <LangContext.Provider value={{lang, setLang}}>
        <PublicPortal db={db} setAdminMode={() => setIsAdminMode(true)} />
      </LangContext.Provider>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-[#080808] border border-white/5 rounded-[50px] p-16 text-center space-y-12 shadow-4xl">
           <div className="w-24 h-24 bg-emerald-600 rounded-[35px] mx-auto flex items-center justify-center shadow-2xl animate-pulse"><Cpu size={48}/></div>
           <h2 className="text-5xl font-black italic tracking-tighter text-white uppercase">LEGACY <span className="text-emerald-500">.</span></h2>
           <input type="password" className="w-full bg-black border border-white/10 rounded-3xl px-10 py-6 text-white font-black text-center text-4xl outline-none focus:border-emerald-500 transition-all" placeholder="KEY" value={adminPass} onChange={e => setAdminPass(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAdminAuth()}/>
           <button onClick={handleAdminAuth} className="w-full bg-emerald-600 text-white py-6 rounded-3xl font-black uppercase tracking-[0.5em] text-[10px] hover:bg-white hover:text-black transition-all">DECRYPT COMMAND</button>
        </div>
      </div>
    );
  }

  const menuGroups = [
    {
      name: 'CAREER ARCHITECTURE',
      items: [
        { id: 'dashboard', label: 'Overview', icon: <Activity size={20}/> },
        { id: 'manage-jobs', label: 'Govt Nodes', icon: <Briefcase size={20}/> },
        { id: 'manage-walkins', label: 'Walk-ins', icon: <MapPin size={20}/> },
        { id: 'manage-internships', label: 'Internships', icon: <GraduationCap size={20}/> },
      ]
    },
    {
      name: 'ACADEMIC REGISTRY',
      items: [
        { id: 'manage-halltickets', label: 'Hall Tickets', icon: <Ticket size={20}/> },
        { id: 'manage-results', label: 'Exam Results', icon: <FileText size={20}/> },
        { id: 'manage-schemes', label: 'Schemes', icon: <Sparkles size={20}/> },
      ]
    },
    {
      name: 'PREPARATION & INTEL',
      items: [
        { id: 'manage-exams', label: 'Mock Arena', icon: <Zap size={20}/> },
        { id: 'manage-news', label: 'News Node', icon: <Newspaper size={20}/> },
        { id: 'material-vault', label: 'Library', icon: <FolderLock size={20}/> },
      ]
    },
    {
      name: 'MONETIZATION NODES',
      items: [
        { id: 'ad-matrix', label: 'Ad Matrix', icon: <Megaphone size={20}/> },
        { id: 'marketplace', label: 'Asset Store', icon: <ShoppingBag size={20}/> },
        { id: 'war-room', label: 'War Room', icon: <Swords size={20}/> },
      ]
    }
  ];

  return (
    <LangContext.Provider value={{lang, setLang}}>
      <div className="min-h-screen bg-obsidian text-slate-100 flex overflow-hidden">
        
        {/* SIDEBAR NAVIGATION */}
        <aside className="h-screen bg-[#050505] border-r border-white/5 w-20 lg:w-80 transition-all duration-500 flex flex-col z-[100] group shrink-0 overflow-y-auto scrollbar-hide">
          <div className="p-10 h-28 flex items-center gap-5 shrink-0 overflow-hidden">
            <div className="w-12 h-12 bg-emerald-600 rounded-2xl shrink-0 flex items-center justify-center shadow-xl group-hover:rotate-12 transition-transform"><Hexagon size={28}/></div>
            <span className="font-black text-3xl italic tracking-tighter opacity-0 lg:opacity-100 transition-opacity">LEGACY.</span>
          </div>
          
          <nav className="flex-1 px-6 space-y-12 mt-10 pb-32">
            {menuGroups.map((group) => (
              <div key={group.name} className="space-y-4">
                <p className="px-4 text-[9px] font-black text-slate-800 uppercase tracking-[0.4em] opacity-0 lg:opacity-100">{group.name}</p>
                {group.items.map((item) => (
                  <button key={item.id} onClick={() => setView(item.id)} className={`w-full flex items-center gap-6 px-6 py-4.5 rounded-[24px] transition-all ${view === item.id ? 'bg-emerald-600 text-white shadow-2xl shadow-emerald-600/20' : 'text-slate-600 hover:text-white hover:bg-white/5'}`}>
                    <span className="shrink-0">{item.icon}</span>
                    <span className="text-[11px] font-black uppercase tracking-widest opacity-0 lg:opacity-100 whitespace-nowrap">{item.label}</span>
                  </button>
                ))}
              </div>
            ))}
          </nav>

          <div className="p-8 border-t border-white/5 mt-auto">
            <button onClick={() => setIsAuthenticated(false)} className="w-full h-16 flex items-center justify-center gap-4 text-red-500 hover:bg-red-500/10 rounded-3xl transition-all font-black text-[10px] tracking-widest uppercase">
              <LogOut size={22}/>
              <span className="hidden lg:block">TERMINATE COMMAND</span>
            </button>
          </div>
        </aside>

        {/* MAIN COMMAND AREA */}
        <main className="flex-1 flex flex-col h-screen overflow-hidden bg-obsidian">
          <header className="h-28 border-b border-white/5 px-12 flex items-center justify-between bg-black/40 backdrop-blur-3xl shrink-0">
             <div className="flex items-center gap-6">
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-ping"></div>
                <h2 className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-500 italic">SYSTEM_NODE: <span className="text-white">{view.toUpperCase()}</span></h2>
             </div>
             <div className="flex items-center gap-8">
                <button onClick={() => setIsAdminMode(false)} className="px-10 py-3.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all">VIEW EMPIRE PORTAL</button>
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 shadow-xl"><UserCircle size={32}/></div>
             </div>
          </header>
          
          <div className="flex-1 overflow-y-auto p-12 scrollbar-hide">
            <div className="max-w-7xl mx-auto pb-48">
              {view === 'dashboard' && <Dashboard db={db} setView={setView} />}
              {view === 'manage-jobs' && <ManageJobs db={db} updateDB={updateDB} type="jobs" title="Govt Nodes" />}
              {view === 'manage-walkins' && <ManageJobs db={db} updateDB={updateDB} type="walkins" title="Walk-ins" />}
              {view === 'manage-internships' && <ManageJobs db={db} updateDB={updateDB} type="internships" title="Internships" />}
              {view === 'manage-schemes' && <ManageJobs db={db} updateDB={updateDB} type="schemes" title="Schemes" />}
              {view === 'manage-halltickets' && <ManageJobs db={db} updateDB={updateDB} type="hallTickets" title="Hall Tickets" />}
              {view === 'manage-results' && <ManageJobs db={db} updateDB={updateDB} type="results" title="Exam Results" />}
              {view === 'ad-matrix' && <PromotionsManager db={db} updateDB={updateDB} />}
              {view === 'manage-news' && <NewsNode />}
              {view === 'manage-exams' && <ManageExams db={db} updateDB={updateDB} />}
              {view === 'material-vault' && <MaterialVault db={db} updateDB={updateDB} />}
              {view === 'marketplace' && <Marketplace db={db} updateDB={updateDB} />}
              {view === 'war-room' && <WarRoom db={db} updateDB={updateDB} />}
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
