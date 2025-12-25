
import React, { useState } from 'react';
import { 
  RefreshCw, Smartphone, ShieldCheck, Instagram, Send, MessageCircle, Youtube, 
  Facebook, Twitter, Globe, Search, Download, Upload, Cloud, Key, Wifi, Server,
  Database, Zap, Lock, Users, Infinity, Share2, Activity
} from 'lucide-react';

export const Settings = ({ db, updateDB }: any) => {
  const [isSaving, setIsSaving] = useState(false);
  const [form, setForm] = useState(db.contactInfo);
  const [tickerText, setTickerText] = useState(db.ticker || '');

  const saveConfig = () => {
    setIsSaving(true);
    updateDB((p: any) => ({ ...p, contactInfo: form, ticker: tickerText }));
    setTimeout(() => {
      setIsSaving(false);
      alert("ETERNAL SYNC: SUCCESSFUL. Changes are now global.");
    }, 800);
  };

  const exportDB = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(db));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `studentdialup_eternal_sync_${Date.now()}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const importDB = (event: any) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e: any) => {
      try {
        const importedData = JSON.parse(e.target.result);
        updateDB(() => importedData);
        alert("TEAM DATA SYNCED. All posts are now visible on this system.");
      } catch (err) { alert("Invalid data file."); }
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-16 animate-in fade-in duration-700 pb-32">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-10 border-b border-white/5 pb-16">
        <div className="space-y-4">
          <h2 className="text-8xl font-black tracking-tighter text-white uppercase italic leading-none">FREE <span className="text-emerald-500">NODES.</span></h2>
          <p className="text-[11px] font-black uppercase text-slate-500 tracking-[0.8em]">Shared Admin Sync Configuration</p>
        </div>
        <button onClick={saveConfig} disabled={isSaving} className="bg-emerald-600 px-12 py-6 rounded-3xl font-black uppercase tracking-widest text-[12px] flex items-center gap-6 shadow-4xl hover:bg-white hover:text-black transition-all italic">
          {isSaving ? <RefreshCw className="animate-spin" size={20}/> : <ShieldCheck size={20}/>} SYNC TEAM CHANGES
        </button>
      </div>

      <div className="grid lg:grid-cols-12 gap-10">
        
        {/* API BALANCING MODULE */}
        <div className="lg:col-span-12">
          <div className="bg-cyan-600/10 border border-cyan-500/20 rounded-[64px] p-16 space-y-12 shadow-4xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-12 opacity-5 rotate-45"><Activity size={300}/></div>
             <div className="flex items-center gap-6 text-cyan-500">
               <Zap size={40}/>
               <h3 className="text-4xl font-black italic uppercase text-white">AI Load Balancing (Unlimited API)</h3>
             </div>
             <div className="space-y-6">
                <p className="text-xl font-bold text-slate-400 italic max-w-3xl leading-relaxed">ఒక API Key లిమిట్ అయిపోతుందా? అయితే ఒకటి కన్నా ఎక్కువ కీలను వాడండి. Vercel లో `API_KEY` వాల్యూ ఇచ్చేటప్పుడు కామాలతో కలిపి ఇవ్వండి.</p>
                <div className="p-8 bg-black/50 rounded-3xl border border-white/5 font-mono text-emerald-500 text-sm break-all">
                  API_KEY = key_one, key_two, key_three
                </div>
                <p className="text-sm font-bold text-slate-600 italic">మన సిస్టమ్ ఆటోమేటిక్‌గా ఒక్కో రిక్వెస్ట్‌కి ఒక్కో కీని వాడుకుంటుంది, దీనివల్ల లిమిట్ అయిపోయే ఛాన్స్ ఉండదు.</p>
             </div>
          </div>
        </div>

        {/* TEAM SYNC MODULE */}
        <div className="lg:col-span-12">
          <div className="bg-emerald-600/10 border border-emerald-500/20 rounded-[64px] p-16 space-y-12 shadow-4xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-12 opacity-5 rotate-45"><Users size={300}/></div>
             <div className="flex items-center gap-6 text-emerald-500">
               <Share2 size={40}/>
               <h3 className="text-4xl font-black italic uppercase text-white">Multi-Admin Team Sync</h3>
             </div>
             <p className="text-xl font-bold text-slate-400 italic max-w-3xl leading-relaxed">వేరే సిస్టమ్ లో కూర్చున్న టీమ్ మెంబర్ కి మీరు చేసిన పోస్ట్‌లు కనిపించాలంటే: ఇక్కడ 'Share Local Backup' కొట్టి ఆ ఫైల్ ని వాళ్లకి పంపండి. వాళ్లు 'Import Team Backup' చేస్తే చాలు.</p>
             <div className="flex flex-col md:flex-row gap-8 relative z-10">
                <button onClick={exportDB} className="flex-1 bg-white text-black py-8 rounded-[40px] font-black uppercase text-[12px] tracking-widest flex items-center justify-center gap-4 shadow-4xl hover:bg-emerald-600 hover:text-white transition-all italic">
                   <Download size={24}/> SHARE LOCAL BACKUP
                </button>
                <label className="flex-1 bg-white/5 border border-white/10 text-white py-8 rounded-[40px] font-black uppercase text-[12px] tracking-widest flex items-center justify-center gap-4 cursor-pointer hover:bg-white/10 transition-all italic">
                   <Upload size={24}/> IMPORT TEAM BACKUP
                   <input type="file" className="hidden" accept=".json" onChange={importDB} />
                </label>
             </div>
          </div>
        </div>

        {/* ACCESS KEY */}
        <div className="lg:col-span-12">
          <div className="bg-[#050505] border border-white/5 rounded-[64px] p-16 space-y-12 shadow-4xl">
             <div className="flex items-center gap-6 text-red-500">
               <Key size={40}/>
               <h3 className="text-4xl font-black italic uppercase text-white">Sovereign Admin Key</h3>
             </div>
             <div className="space-y-4 max-w-xl">
                <label className="text-[10px] font-black text-slate-700 uppercase tracking-widest px-8 italic">Admin Password (టీమ్ అందరికీ ఇదే ఇవ్వండి)</label>
                <input 
                  type="text"
                  className="w-full bg-black border border-white/5 rounded-3xl px-12 py-6 text-2xl font-black text-emerald-500 outline-none focus:border-red-600 italic shadow-inner" 
                  value={form.adminKey} 
                  onChange={e => setForm({...form, adminKey: e.target.value})} 
                />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
