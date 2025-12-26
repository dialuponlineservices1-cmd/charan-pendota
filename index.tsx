
import React, { useState, useEffect, createContext } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  LayoutDashboard, PlusCircle, Database, Sparkles, 
  ShoppingBag, FolderLock, LogOut, UserCircle, 
  Activity as ActivityIcon, Hexagon, Briefcase, 
  GraduationCap, Ticket, FileText, Newspaper, 
  MapPin, BookOpen, MessageSquare, Zap, Cpu
} from 'lucide-react';

// Modular Components
import { Dashboard } from './Dashboard';
import { ManageJobs } from './ManageJobs';
import { PublicPortal } from './PublicPortal';
import { Marketplace } from './Marketplace';
import { MaterialVault } from './MaterialVault';
import { Settings as SettingsPanel } from './Settings';
import { ManageExams } from './ManageExams';

const DB_KEY = 'student_dialup_titan_v1700';
export const LangContext = createContext<{lang: 'en' | 'te', setLang: (l: 'en' | 'te') => void}>({lang: 'en', setLang: () => {}});

const getInitialDB = () => {
  const data = localStorage.getItem(DB_KEY);
  if (data) return JSON.parse(data);
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
    ticker: "V1700 TITAN • NEW WALK-INS ADDED • HALL TICKETS LIVE • INTERNSHIPS OPEN",
    analytics: { activeNow: 4120, revenue: 125000, serviceApplications: 540, storeSales: 2100 }, 
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
        <div className="w-full max-w-md bg-[#080808] border border-white/5 rounded-[40px] p-12 text-center space-y-8 shadow-2xl">
           <h2 className="text-4xl font-black italic text-white tracking-tighter">TITAN <span className="text-emerald-500">ADMIN</span></h2>
           <input type="password" className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white font-black text-center text-2xl outline-none focus:border-emerald-500 transition-all" placeholder="Enter Key" value={adminPass} onChange={e => setAdminPass(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAdminAuth()}/>
           <button onClick={handleAdminAuth} className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">Enter Command Center</button>
        </div>
      </div>
    );
  }

  const menuGroups = [
    {
      name: 'CAREER CENTER',
      items: [
        { id: 'dashboard', label: 'Overview', icon: <ActivityIcon size={20}/> },
        { id: 'manage-jobs', label: 'Govt Jobs', icon: <Briefcase size={20}/> },
        { id: 'manage-walkins', label: 'Walk-in Jobs', icon: <MapPin size={20}/> },
        { id: 'manage-internships', label: 'Internships', icon: <GraduationCap size={20}/> },
      ]
    },
    {
      name: 'STUDENT REGISTRY',
      items: [
        { id: 'manage-schemes', label: 'Student Schemes', icon: <Sparkles size={20}/> },
        { id: 'manage-halltickets', label: 'Hall Tickets', icon: <Ticket size={20}/> },
        { id: 'manage-results', label: 'Results', icon: <FileText size={20}/> },
        { id: 'manage-news', label: 'Breaking News', icon: <Newspaper size={20}/> },
      ]
    },
    {
      name: 'PREPARATION',
      items: [
        { id: 'manage-exams', label: 'Mock Tests', icon: <Zap size={20}/> },
        { id: 'material-vault', label: 'Materials', icon: <FolderLock size={20}/> },
        { id: 'marketplace', label: 'Storefront', icon: <ShoppingBag size={20}/> },
      ]
    }
  ];

  return (
    <LangContext.Provider value={{lang, setLang}}>
      <div className="min-h-screen bg-obsidian text-slate-100 flex overflow-hidden">
        
        {/* TITAN SIDEBAR */}
        <aside className="h-screen bg-[#050505] border-r border-white/5 w-20 hover:w-64 transition-all duration-300 flex flex-col z-[100] group shrink-0 overflow-y-auto scrollbar-hide">
          <div className="p-6 h-20 flex items-center gap-4 shrink-0 overflow-hidden">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl shrink-0 flex items-center justify-center shadow-lg"><Hexagon size={20}/></div>
            <span className="font-black text-xl italic opacity-0 group-hover:opacity-100 transition-opacity">TITAN.</span>
          </div>
          
          <nav className="flex-1 px-4 space-y-10 mt-10">
            {menuGroups.map((group) => (
              <div key={group.name} className="space-y-3">
                <p className="px-4 text-[10px] font-black text-slate-700 uppercase tracking-widest opacity-0 group-hover:opacity-100">{group.name}</p>
                {group.items.map((item) => (
                  <button key={item.id} onClick={() => setView(item.id)} className={`w-full flex items-center gap-5 px-4 py-3.5 rounded-2xl transition-all ${view === item.id ? 'bg-emerald-600 text-white' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}>
                    <span className="shrink-0">{item.icon}</span>
                    <span className="text-[11px] font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 whitespace-nowrap">{item.label}</span>
                  </button>
                ))}
              </div>
            ))}
          </nav>

          <div className="p-4 border-t border-white/5">
            <button onClick={() => setIsAuthenticated(false)} className="w-full h-12 flex items-center justify-center gap-4 text-red-500 hover:bg-red-500/10 rounded-2xl transition-all">
              <LogOut size={20}/>
              <span className="text-[11px] font-black opacity-0 group-hover:opacity-100">LOGOUT</span>
            </button>
          </div>
        </aside>

        {/* MAIN AREA */}
        <main className="flex-1 flex flex-col h-screen overflow-hidden">
          <header className="h-20 border-b border-white/5 px-10 flex items-center justify-between bg-black/40 backdrop-blur-xl shrink-0">
             <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">TITAN_NODE: <span className="text-white">{view.toUpperCase()}</span></h2>
             </div>
             <div className="flex items-center gap-4">
                <button onClick={() => setIsAdminMode(false)} className="px-6 py-2 bg-white/5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">View Portal</button>
                <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center"><UserCircle size={24}/></div>
             </div>
          </header>
          
          <div className="flex-1 overflow-y-auto p-10 scrollbar-hide">
            <div className="max-w-6xl mx-auto">
              {view === 'dashboard' && <Dashboard db={db} setView={setView} />}
              {view === 'manage-jobs' && <ManageJobs db={db} updateDB={updateDB} type="jobs" title="Govt Jobs" />}
              {view === 'manage-walkins' && <ManageJobs db={db} updateDB={updateDB} type="walkins" title="Walk-in Interviews" />}
              {view === 'manage-internships' && <ManageJobs db={db} updateDB={updateDB} type="internships" title="Internships" />}
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
