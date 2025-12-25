
import React, { useState } from 'react';
import { PhoneForwarded, MessageSquare, ShieldCheck, History, UserCheck, Zap, ArrowRight, CheckCircle, FileText } from 'lucide-react';

export const ApplyService = ({ db, updateDB }: any) => {
  return (
    <div className="space-y-16 animate-in fade-in duration-700">
      <div className="bg-slate-950/40 border border-white/5 p-16 rounded-[64px] flex flex-col xl:flex-row justify-between items-center gap-12 shadow-3xl overflow-hidden relative">
         <div className="absolute top-0 right-0 p-10 opacity-5 rotate-12"><PhoneForwarded size={400}/></div>
         <div className="space-y-4 text-center xl:text-left relative z-10">
            <h2 className="text-8xl font-black tracking-tighter text-white uppercase italic leading-none">APPLY <span className="text-emerald-500">SERVICE.</span></h2>
            <p className="text-[11px] font-black uppercase text-slate-700 tracking-[0.9em]">Managed Application Business Desk</p>
         </div>
         <div className="flex gap-6 relative z-10">
            <div className="bg-emerald-600/10 border border-emerald-500/20 p-10 rounded-[48px] text-center space-y-2">
               <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Active Requests</p>
               <h4 className="text-5xl font-black text-white italic">14</h4>
            </div>
            <div className="bg-white/5 border border-white/10 p-10 rounded-[48px] text-center space-y-2">
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Completed</p>
               <h4 className="text-5xl font-black text-white italic">{db.analytics.serviceApplications}</h4>
            </div>
         </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-12">
         <div className="lg:col-span-8 space-y-12">
            <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter flex items-center gap-6"><History className="text-emerald-500"/> Recent Service Inquiries</h3>
            <div className="space-y-4">
               {[1, 2, 3].map(i => (
                 <div key={i} className="bg-slate-950/40 border border-white/5 p-10 rounded-[48px] flex items-center justify-between group hover:border-emerald-500/40 transition-all">
                    <div className="flex items-center gap-10">
                       <div className="w-20 h-20 bg-black rounded-3xl flex items-center justify-center text-emerald-500 shadow-xl border border-white/5"><UserCheck size={32}/></div>
                       <div>
                          <h4 className="text-2xl font-black text-white italic uppercase tracking-tighter">Candidate {i * 42}</h4>
                          <p className="text-[10px] font-black text-slate-700 uppercase tracking-widest mt-2">Job: TS Police Constable • Status: <span className="text-amber-500 italic">Document Verification</span></p>
                       </div>
                    </div>
                    <button className="h-16 px-10 bg-white/5 border border-white/10 rounded-3xl text-xs font-black uppercase text-slate-500 hover:bg-emerald-600 hover:text-white transition-all flex items-center gap-4">MANAGE <ArrowRight size={14}/></button>
                 </div>
               ))}
            </div>
         </div>

         <div className="lg:col-span-4 space-y-12">
            <div className="bg-emerald-600/5 border border-emerald-500/20 rounded-[64px] p-16 space-y-12 shadow-3xl">
               <h4 className="text-2xl font-black text-emerald-500 italic uppercase tracking-tighter leading-none">SERVICE <br/> CONFIGURATION</h4>
               <div className="space-y-6">
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest">WhatsApp Link</label>
                     <input className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white font-bold" value={db.contactInfo.whatsapp} />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Base Service Fee (INR)</label>
                     <input className="w-full bg-black border border-white/10 rounded-2xl px-6 py-4 text-white font-bold" value="50" />
                  </div>
                  <button className="w-full bg-emerald-600 py-6 rounded-3xl font-black text-white uppercase tracking-widest text-[11px] shadow-3xl hover:bg-emerald-500 transition-all flex items-center justify-center gap-4">
                     <Zap size={20}/> SYNC BUSINESS NODES
                  </button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};
