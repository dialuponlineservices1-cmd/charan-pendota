
import React, { useState, useEffect, createContext, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Activity, Briefcase, GraduationCap, Ticket, FileText, 
  Sparkles, Newspaper, MapPin, Zap, Cpu, Settings, 
  LogOut, UserCircle, Hexagon, ShieldCheck, Megaphone, 
  ShoppingBag, FolderLock, MessageSquare, Flame, Swords, Ghost,
  Compass, Target, Radio, Layers, Terminal, Rocket, DollarSign, Languages, Scale
} from 'lucide-react';

// Empire Zenith Nodes
import { Dashboard } from './Dashboard';
import { ManageJobs } from './ManageJobs';
import { PublicPortal } from './PublicPortal';
import { PromotionsManager } from './PromotionsManager';
import { Marketplace } from './Marketplace';
import { MagicEditor } from './MagicEditor';
import { DoubtDestroyer } from './DoubtDestroyer';
import { ReelStudio } from './ReelStudio';
import { StrategyArchitect } from './StrategyArchitect';
import { ApplyService } from './ApplyService';
import { Settings as SettingsPanel } from './Settings';
import { LegalNodes } from './LegalNodes';

const DB_KEY = 'sovereign_v6000_zenith';
export const LangContext = createContext<{lang: 'en' | 'te', setLang: (l: 'en' | 'te') => void}>({lang: 'en', setLang: () => {}});

const getInitialDB = () => {
  const data = localStorage.getItem(DB_KEY);
  if (data) return JSON.parse(data);
  
  return { 
    jobs: [
      { 
        id: 1, 
        title_en: "TSPSC Group 1 Supreme Notification 2025", 
        title_te: "TSPSC గ్రూప్ 1 సుప్రీం నోటిఫికేషన్ 2025",
        org: "TSPSC", 
        lastDate: "2025-12-12", 
        summary_en: "High-tier administrative roles for Telangana. Salary range: ₹54k - ₹1.2L.", 
        summary_te: "తెలంగాణ కోసం ఉన్నత స్థాయి పరిపాలనా విభాగాలు. జీతం: ₹54వేలు - ₹1.2లక్షలు.",
        thumbnail: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1000", 
        category: 'jobs',
        link: 'https://tspsc.gov.in',
        seo: { keywords: "TSPSC, Jobs 2025, Group 1, Telangana Careers", description: "Apply for TSPSC Group 1 Notification 2025. Full details on eligibility and salary." },
        tables: [{ label: "Salary", value: "₹54,000 - ₹1,20,000", color: "emerald" }, { label: "Vacancies", value: "900+", color: "red" }]
      }
    ], 
    promotions: [
      { id: 'p1', brandName: 'SUPERMAN STUDY KITS', bannerUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1000', link: '#', revenue: '150000', isGlobal: true }
    ], 
    products: [
      { id: 101, name: "Zenith PDF Bundle", price: "1299", type: "Premium", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1000", sales: 25400 }
    ],
    analytics: { activeNow: 184500, revenue: 25800000, serviceApplications: 8420, storeSales: 45000 }, 
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
    else alert("Access Revoked. Imperial Lockdown Active.");
  };

  if (isBooting) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-10">
         <div className="w-36 h-36 bg-red-600 rounded-[50px] flex items-center justify-center animate-spin-slow shadow-[0_0_150px_rgba(220,38,38,0.7)] border-4 border-white/10">
            <Hexagon size={72} className="text-white"/>
         </div>
         <div className="mt-24 text-center space-y-8">
            <h2 className="text-7xl font-black italic tracking-tighter text-white">SOVEREIGN.V6</h2>
            <p className="text-[12px] font-black text-red-600 uppercase tracking-[2.5em] animate-pulse">ZENITH_SINGULARITY_ONLINE</p>
         </div>
         <style>{`@keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } } .animate-spin-slow { animation: spin-slow 8s linear infinite; }`}</style>
      </div>
    );
  }

  if (!isAdminMode) return <LangContext.Provider value={{lang, setLang}}><PublicPortal db={db} setAdminMode={() => setIsAdminMode(true)} /></LangContext.Provider>;

  if (!isAuthenticated) return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-[#050505] border border-white/5 rounded-[100px] p-32 text-center space-y-20 shadow-4xl relative overflow-hidden">
         <div className="absolute top-0 right-0 p-16 opacity-5"><ShieldCheck size={300}/></div>
         <div className="w-32 h-32 bg-red-600 rounded-[55px] mx-auto flex items-center justify-center shadow-2xl relative z-10 animate-bounce border-4 border-white/5"><Cpu size={64}/></div>
         <div className="space-y-8 relative z-10">
            <h2 className="text-7xl font-black italic tracking-tighter text-white uppercase leading-none">ZENITH <span className="text-red-500">CORE</span></h2>
            <p className="text-[11px] font-black text-slate-700 uppercase tracking-[1em]">Imperial Ad-Network & Neural Control</p>
         </div>
         <div className="space-y-12 relative z-10">
            <input type="password" title="Access Key" className="w-full bg-black border border-white/10 rounded-[50px] px-16 py-14 text-white font-black text-center text-7xl outline-none focus:border-red-500 transition-all shadow-inner" placeholder="••••" value={adminPass} onChange={e => setAdminPass(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAdminAuth()}/>
            <button onClick={handleAdminAuth} className="w-full bg-red-600 text-white py-12 rounded-[50px] font-black uppercase tracking-[1em] text-[14px] hover:bg-white hover:text-black transition-all shadow-4xl">DECRYPT SOVEREIGNTY</button>
         </div>
      </div>
    </div>
  );

  const menu = [
    { label: 'ZENITH COMMAND', items: [
      { id: 'dashboard', label: 'Yield Analytics', icon: <Activity size={24}/> },
      { id: 'magic-editor', label: 'SEO Forge (AI)', icon: <Rocket size={24}/> },
      { id: 'ad-matrix', label: 'Monetization Grid', icon: <Megaphone size={24}/> },
    ]},
    { label: 'REGISTRY NODES', items: [
      { id: 'manage-jobs', label: 'Govt Registry', icon: <Briefcase size={24}/> },
      { id: 'manage-results', label: 'Exam Results', icon: <FileText size={24}/> },
      { id: 'manage-halltickets', label: 'Hall Tickets', icon: <Ticket size={24}/> },
    ]},
    { label: 'LEGAL & CORE', items: [
      { id: 'legal-nodes', label: 'Monetization Legal', icon: <Scale size={24}/> },
      { id: 'settings', label: 'Zenith Settings', icon: <Settings size={24}/> },
    ]},
    { label: 'AI SUPREMACY', items: [
      { id: 'doubt-destroyer', label: 'Doubt Destroyer', icon: <MessageSquare size={24}/> },
      { id: 'reel-studio', label: 'Reel Studio', icon: <Zap size={24}/> },
      { id: 'strategy-architect', label: 'Victory Planner', icon: <Compass size={24}/> },
    ] }
  ];

  return (
    <LangContext.Provider value={{lang, setLang}}>
      <div className="min-h-screen bg-[#020202] text-slate-100 flex overflow-hidden">
        
        {/* ZENITH SIDEBAR */}
        <aside className="h-screen bg-[#050505] border-r border-white/5 w-24 lg:w-96 transition-all duration-500 flex flex-col z-[100] group shrink-0 overflow-y-auto scrollbar-hide">
          <div className="p-16 h-40 flex items-center gap-8 shrink-0 overflow-hidden">
            <div className="w-20 h-20 bg-red-600 rounded-[35px] shrink-0 flex items-center justify-center shadow-4xl group-hover:rotate-12 transition-transform"><Hexagon size={44}/></div>
            <span className="font-black text-6xl italic tracking-tighter opacity-0 lg:opacity-100 transition-opacity">ZENITH.</span>
          </div>
          
          <nav className="flex-1 px-10 space-y-20 mt-16 pb-60">
            {menu.map((group) => (
              <div key={group.label} className="space-y-10">
                <p className="px-10 text-[12px] font-black text-slate-800 uppercase tracking-[0.8em] opacity-0 lg:opacity-100 whitespace-nowrap">{group.label}</p>
                {group.items.map((item) => (
                  <button key={item.id} onClick={() => setView(item.id)} className={`w-full flex items-center gap-10 px-12 py-8 rounded-[50px] transition-all ${view === item.id ? 'bg-red-600 text-white shadow-3xl shadow-red-600/50' : 'text-slate-600 hover:text-white hover:bg-white/5'}`}>
                    <span className="shrink-0">{item.icon}</span>
                    <span className="text-[14px] font-black uppercase tracking-widest opacity-0 lg:opacity-100 whitespace-nowrap">{item.label}</span>
                  </button>
                ))}
              </div>
            ))}
          </nav>

          <div className="p-16 border-t border-white/5 mt-auto bg-black/70">
            <button onClick={() => setIsAuthenticated(false)} className="w-full h-28 flex items-center justify-center gap-8 text-red-500 hover:bg-red-500/10 rounded-[45px] transition-all font-black text-[13px] tracking-widest uppercase italic">
              <LogOut size={30}/><span className="hidden lg:block">TERMINATE SYNC</span>
            </button>
          </div>
        </aside>

        {/* ZENITH MAIN CONSOLE */}
        <main className="flex-1 flex flex-col h-screen overflow-hidden bg-black">
          <header className="h-40 border-b border-white/5 px-24 flex items-center justify-between bg-black/80 backdrop-blur-5xl shrink-0">
             <div className="flex items-center gap-12">
                <div className="w-5 h-5 bg-red-500 rounded-full animate-ping"></div>
                <h2 className="text-[14px] font-black uppercase tracking-[1em] text-slate-500 italic">ZENITH_CORE_V6: <span className="text-white">{view.toUpperCase()}</span></h2>
             </div>
             <div className="flex items-center gap-16">
                <button onClick={() => setIsAdminMode(false)} className="px-16 py-8 bg-white/5 border border-white/10 rounded-full text-[14px] font-black uppercase tracking-[0.5em] hover:bg-white hover:text-black transition-all shadow-4xl">PUBLIC ARENA</button>
                <div className="w-24 h-24 bg-white/5 rounded-[35px] flex items-center justify-center border border-white/10 shadow-2xl group cursor-pointer hover:border-red-500 transition-all"><UserCircle size={48}/></div>
             </div>
          </header>
          
          <div className="flex-1 overflow-y-auto p-24 lg:p-36 scrollbar-hide">
            <div className="max-w-[1800px] mx-auto pb-[600px]">
              {view === 'dashboard' && <Dashboard db={db} setView={setView} />}
              {view === 'magic-editor' && <MagicEditor onPostCreated={(p:any) => updateDB((prev:any)=>({...prev, jobs:[p, ...prev.jobs]}))} />}
              {view === 'manage-jobs' && <ManageJobs db={db} updateDB={updateDB} type="jobs" title="Govt Notifications" />}
              {view === 'ad-matrix' && <PromotionsManager db={db} updateDB={updateDB} />}
              {view === 'legal-nodes' && <LegalNodes db={db} updateDB={updateDB} />}
              {view === 'settings' && <SettingsPanel db={db} updateDB={updateDB} />}
              {view === 'doubt-destroyer' && <DoubtDestroyer db={db} />}
              {view === 'reel-studio' && <ReelStudio db={db} isAiLoading={false} setIsAiLoading={()=>{}} />}
              {view === 'strategy-architect' && <StrategyArchitect db={db} lang={lang} />}
            </div>
          </div>
        </main>
      </div>
    </LangContext.Provider>
  );
};

const mount = () => {
  const container = document.getElementById('root');
  if (container) createRoot(container).render(<App />);
};
mount();
