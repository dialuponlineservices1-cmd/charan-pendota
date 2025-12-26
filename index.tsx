
import React, { useState, useEffect, createContext } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Activity, Briefcase, GraduationCap, Ticket, FileText, 
  Sparkles, Newspaper, MapPin, Zap, Cpu, Settings, 
  LogOut, UserCircle, Hexagon, ShieldCheck, Megaphone, 
  ShoppingBag, FolderLock, MessageSquare, Flame, Swords, Ghost,
  Compass, Target, Radio, Layers, Terminal
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
import { DoubtDestroyer } from './DoubtDestroyer';
import { ReelStudio } from './ReelStudio';
import { ApplyService } from './ApplyService';
import { Settings as SettingsPanel } from './Settings';

const DB_KEY = 'student_dialup_supremacy_v2500';
export const LangContext = createContext<{lang: 'en' | 'te', setLang: (l: 'en' | 'te') => void}>({lang: 'en', setLang: () => {}});

const getInitialDB = () => {
  const data = localStorage.getItem(DB_KEY);
  if (data) return JSON.parse(data);
  
  // High-End Initial Data for "Advanced" Look
  return { 
    jobs: [
      { id: 1, title: "TSPSC Group 1 Notification 2025", org: "TSPSC", lastDate: "2025-05-12", summary: "High-tier administrative roles for Telangana state. Apply now for executive positions.", thumbnail: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1000" },
      { id: 2, title: "Railway Recruitment Board (RRB) NTPC", org: "Railways", lastDate: "2025-06-20", summary: "Central government opportunity for 10,000+ vacancies across India.", thumbnail: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=1000" }
    ], 
    internships: [], 
    walkins: [], 
    schemes: [
      { id: 3, title: "Narayana Educational Support", org: "Govt", lastDate: "Open", summary: "Financial aid for meritorious students in rural areas.", thumbnail: "https://images.unsplash.com/photo-1523050335392-93851179ae22?q=80&w=1000" }
    ], 
    hallTickets: [], 
    results: [], 
    materials: [], 
    news: [], 
    exams: [],
    promotions: [
      { id: 'p1', brandName: 'SUPERMAN STUDY KITS', bannerUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1000', link: '#', revenue: '50000', isGlobal: true }
    ], 
    products: [
      { id: 101, name: "Mastery PDF Bundle", price: "499", type: "Premium Bundle", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1000", sales: 1240 }
    ],
    ticker: "SUPREMACY V2500 • MONETIZATION ACTIVE • ALL NODES SYNCED • REVENUE MAXIMIZED • JOIN 24K+ ASPIRANTS",
    analytics: { activeNow: 24580, revenue: 1250000, serviceApplications: 840, storeSales: 4100 }, 
    contactInfo: { whatsapp: "9100000000", adminKey: "8888" }
  };
};

const App = () => {
  const [lang, setLang] = useState<'en' | 'te'>('te');
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPass, setAdminPass] = useState('');
  const [view, setView] = useState('dashboard');
  const [db, setDb] = useState(getInitialDB());
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    localStorage.setItem(DB_KEY, JSON.stringify(db));
  }, [db]);

  useEffect(() => {
    const timer = setTimeout(() => setIsBooting(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const updateDB = (updater: (prev: any) => any) => setDb((prev: any) => updater(prev));

  const handleAdminAuth = () => {
    if (adminPass === db.contactInfo.adminKey) setIsAuthenticated(true);
    else alert("Access Denied. Integrity check failed.");
  };

  if (isBooting) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-10 space-y-8">
         <div className="w-20 h-20 bg-red-600 rounded-[30px] flex items-center justify-center animate-spin-slow shadow-[0_0_60px_rgba(220,38,38,0.5)]">
            <Hexagon size={40} className="text-white"/>
         </div>
         <div className="text-center space-y-2">
            <h2 className="text-3xl font-black italic tracking-tighter text-white">SUPREMACY.OS</h2>
            <div className="flex gap-1 justify-center">
               <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce"></div>
               <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce [animation-delay:0.2s]"></div>
               <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
         </div>
         <style dangerouslySetInnerHTML={{ __html: `
            @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            .animate-spin-slow { animation: spin-slow 4s linear infinite; }
         `}} />
      </div>
    );
  }

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
        <div className="w-full max-w-md bg-[#080808] border border-white/5 rounded-[60px] p-16 text-center space-y-12 shadow-4xl relative overflow-hidden">
           <div className="absolute top-0 right-0 p-10 opacity-5"><ShieldCheck size={100}/></div>
           <div className="w-24 h-24 bg-red-600 rounded-[40px] mx-auto flex items-center justify-center shadow-2xl animate-pulse relative z-10"><Cpu size={48}/></div>
           <div className="space-y-2 relative z-10">
              <h2 className="text-5xl font-black italic tracking-tighter text-white uppercase leading-none">COMMAND <span className="text-red-500">CENTRAL</span></h2>
              <p className="text-[9px] font-black text-slate-700 uppercase tracking-[0.4em]">Aspiration Registry Management</p>
           </div>
           <div className="space-y-4 relative z-10">
              <input type="password" title="Access Key" className="w-full bg-black border border-white/10 rounded-3xl px-10 py-7 text-white font-black text-center text-4xl outline-none focus:border-red-500 transition-all shadow-inner" placeholder="••••" value={adminPass} onChange={e => setAdminPass(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAdminAuth()}/>
              <button onClick={handleAdminAuth} className="w-full bg-red-600 text-white py-6 rounded-3xl font-black uppercase tracking-[0.5em] text-[10px] hover:bg-white hover:text-black transition-all shadow-4xl">INITIATE DECRYPT</button>
           </div>
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
      name: 'AI INTELLIGENCE',
      items: [
        { id: 'doubt-destroyer', label: 'AI Tutor', icon: <MessageSquare size={20}/> },
        { id: 'reel-studio', label: 'Video Forge', icon: <Zap size={20}/> },
        { id: 'strategy-architect', label: 'Victory Blueprint', icon: <Compass size={20}/> },
      ]
    },
    {
      name: 'MONETIZATION & TOOLS',
      items: [
        { id: 'ad-matrix', label: 'Ad Matrix', icon: <Megaphone size={20}/> },
        { id: 'apply-service', label: 'Service Desk', icon: <Layers size={20}/> },
        { id: 'marketplace', label: 'Asset Store', icon: <ShoppingBag size={20}/> },
        { id: 'settings', label: 'Core Settings', icon: <Settings size={20}/> },
      ]
    }
  ];

  return (
    <LangContext.Provider value={{lang, setLang}}>
      <div className="min-h-screen bg-obsidian text-slate-100 flex overflow-hidden">
        
        {/* SIDEBAR NAVIGATION */}
        <aside className="h-screen bg-[#050505] border-r border-white/5 w-24 lg:w-80 transition-all duration-500 flex flex-col z-[100] group shrink-0 overflow-y-auto scrollbar-hide">
          <div className="p-10 h-28 flex items-center gap-5 shrink-0 overflow-hidden">
            <div className="w-14 h-14 bg-red-600 rounded-2xl shrink-0 flex items-center justify-center shadow-xl group-hover:rotate-12 transition-transform"><Hexagon size={32}/></div>
            <span className="font-black text-3xl italic tracking-tighter opacity-0 lg:opacity-100 transition-opacity">SUPREMACY.</span>
          </div>
          
          <nav className="flex-1 px-8 space-y-12 mt-10 pb-40">
            {menuGroups.map((group) => (
              <div key={group.name} className="space-y-4">
                <p className="px-4 text-[9px] font-black text-slate-800 uppercase tracking-[0.4em] opacity-0 lg:opacity-100">{group.name}</p>
                {group.items.map((item) => (
                  <button key={item.id} onClick={() => setView(item.id)} className={`w-full flex items-center gap-6 px-6 py-5 rounded-[28px] transition-all ${view === item.id ? 'bg-red-600 text-white shadow-2xl shadow-red-600/30' : 'text-slate-600 hover:text-white hover:bg-white/5'}`}>
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
          <header className="h-28 border-b border-white/5 px-14 flex items-center justify-between bg-black/40 backdrop-blur-3xl shrink-0">
             <div className="flex items-center gap-6">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                <h2 className="text-[11px] font-black uppercase tracking-[0.6em] text-slate-500 italic">SYSTEM_NODE: <span className="text-white">{view.toUpperCase()}</span></h2>
             </div>
             <div className="flex items-center gap-10">
                <button onClick={() => setIsAdminMode(false)} className="px-10 py-4 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all shadow-xl">LIVE PORTAL VIEW</button>
                <div className="w-14 h-14 bg-white/5 rounded-3xl flex items-center justify-center border border-white/10 shadow-xl group cursor-pointer hover:border-red-500 transition-all"><UserCircle size={32}/></div>
             </div>
          </header>
          
          <div className="flex-1 overflow-y-auto p-12 lg:p-16 scrollbar-hide">
            <div className="max-w-7xl mx-auto pb-64">
              {view === 'dashboard' && <Dashboard db={db} setView={setView} />}
              {view === 'manage-jobs' && <ManageJobs db={db} updateDB={updateDB} type="jobs" title="Govt Nodes" />}
              {view === 'manage-walkins' && <ManageJobs db={db} updateDB={updateDB} type="walkins" title="Walk-ins" />}
              {view === 'manage-internships' && <ManageJobs db={db} updateDB={updateDB} type="internships" title="Internships" />}
              {view === 'manage-schemes' && <ManageJobs db={db} updateDB={updateDB} type="schemes" title="Schemes" />}
              {view === 'manage-halltickets' && <ManageJobs db={db} updateDB={updateDB} type="hallTickets" title="Hall Tickets" />}
              {view === 'manage-results' && <ManageJobs db={db} updateDB={updateDB} type="results" title="Exam Results" />}
              {view === 'ad-matrix' && <PromotionsManager db={db} updateDB={updateDB} />}
              {view === 'doubt-destroyer' && <DoubtDestroyer db={db} />}
              {view === 'reel-studio' && <ReelStudio db={db} isAiLoading={false} setIsAiLoading={()=>{}} />}
              {view === 'strategy-architect' && <StrategyArchitect db={db} lang={lang} />}
              {view === 'apply-service' && <ApplyService db={db} updateDB={updateDB} />}
              {view === 'marketplace' && <Marketplace db={db} updateDB={updateDB} />}
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
