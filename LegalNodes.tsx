
import React from 'react';
import { ShieldCheck, Scale, FileText, Lock, Ghost } from 'lucide-react';

export const LegalNodes = ({ db }: any) => {
  return (
    <div className="max-w-[1600px] mx-auto space-y-32 animate-in fade-in duration-1000 pb-[500px]">
      
      <div className="text-center space-y-10 border-b border-white/5 pb-24">
         <h2 className="text-9xl font-black italic uppercase tracking-tighter text-white">LEGAL <span className="text-emerald-500">NODES.</span></h2>
         <p className="text-[16px] font-black uppercase text-slate-700 tracking-[1.5em] italic">Monetization Compliance Singularity</p>
      </div>

      <div className="grid md:grid-cols-2 gap-20">
         <div className="bg-[#050505] border border-white/5 rounded-[100px] p-24 space-y-12 shadow-4xl group hover:border-emerald-600 transition-all relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-5 rotate-12 transition-transform duration-1000 group-hover:rotate-0"><Scale size={300}/></div>
            <h3 className="text-6xl font-black italic uppercase tracking-tighter text-white flex items-center gap-8"><ShieldCheck size={48} className="text-emerald-500"/> Terms of Sovereignty</h3>
            <div className="prose prose-invert prose-2xl max-w-none text-slate-500 font-medium italic leading-relaxed h-[400px] overflow-y-auto pr-8 scrollbar-hide">
               <p>By accessing Sovereign Zenith V6, you agree to the imperial protocols of data synchronization. All notifications and registry nodes are for educational purposes. We do not guarantee civil service selection—only absolute informational dominance.</p>
               <p>Users must respect the Intellectual Property of our Neural Forge. Any scraping of the Emperor Registry will result in permanent node termination.</p>
            </div>
         </div>

         <div className="bg-[#050505] border border-white/5 rounded-[100px] p-24 space-y-12 shadow-4xl group hover:border-red-600 transition-all relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-5 -rotate-12 transition-transform duration-1000 group-hover:rotate-0"><Lock size={300}/></div>
            <h3 className="text-6xl font-black italic uppercase tracking-tighter text-white flex items-center gap-8"><FileText size={48} className="text-red-500"/> Privacy Singularity</h3>
            <div className="prose prose-invert prose-2xl max-w-none text-slate-500 font-medium italic leading-relaxed h-[400px] overflow-y-auto pr-8 scrollbar-hide">
               <p>Your bio-telemetry is sacred. We only collect basic synchronization data to optimize your Victory Blueprint. We use high-performance cookies for ad-revenue matrix optimization.</p>
               <p>Third-party ad nodes (AdSense/Ezoic) may track your synchronization patterns across the imperial network. You can opt-out by terminating your browser session.</p>
            </div>
         </div>
      </div>
    </div>
  );
};
