import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { 
  PenTool, RefreshCw, Zap, Search, 
  Target, TrendingUp, Globe, Copy, 
  CheckCircle, FileText, Sparkles, Rocket, 
  DollarSign, BarChart3, Share2, Save, 
  Image as ImageIcon, Edit3, Type, Eye,
  Layout, List, Table, Link, Settings as SettingsIcon,
  ChevronDown, ExternalLink, ShieldCheck, Smartphone, Monitor,
  BookOpen, HelpCircle, Trophy, Megaphone, Send, MessageCircle,
  Hash, LayoutGrid, MousePointer2, Trash2, Plus, GripVertical
} from 'lucide-react';

export const AIBlogForge = ({ db, updateDB }: any) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'content' | 'mock-test' | 'links' | 'revenue' | 'preview'>('content');
  const [previewDevice, setPreviewDevice] = useState<'mobile' | 'desktop'>('mobile');
  
  const [post, setPost] = useState<any>({
    title_en: '',
    title_te: '',
    content_html: '',
    summary_te: '',
    study_plan: '',
    thumbnail: 'https://images.unsplash.com/photo-1521791136064-7986c2953d18',
    whatsapp_link: '',
    telegram_link: '',
    official_link: '',
    slug: '',
    ad_slots: ['TOP', 'MID', 'BOTTOM'],
    stickers: ['🔥 TRENDING', '🚨 LATEST', '✅ VERIFIED'],
    questions: [],
    keywords: [],
    meta_desc: ''
  });

  const forgeSupremeNode = async () => {
    if (!url) return;
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `DEEP_INTEL_FORGE: Analyze recruitment details from ${url}. 
        Research official gazettes, PDF notices, and salary structures.
        Create a world-best recruitment post for StudentDialup.com.
        
        OUTPUT_JSON_STRICT_SCHEMA:
        {
          "title_en": "SEO Click-Bait Title",
          "title_te": "High-Impact Emotional Telugu Title (Primary)",
          "slug": "url-slug",
          "content_html": "Full HTML. Must include a colorful <table> for vacancy/age/salary. Use <h2> and <ul>.",
          "summary_te": "300-word emotional Telugu narrative for WhatsApp.",
          "study_plan": "Step-by-step 5-point victory roadmap for this specific job.",
          "questions": [
             {"q": "Deep analytical question 1?", "options": ["A", "B", "C", "D"], "correct": 0, "exp": "Explanation in Telugu"},
             ... (Total 5 MCQs)
          ],
          "keywords": ["tag1", "tag2"],
          "meta_desc": "155 char SEO desc"
        }`,
        config: {
          thinkingConfig: { thinkingBudget: 32768 },
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json",
        }
      });

      const data = JSON.parse(response.text || '{}');
      setPost({
        ...post,
        ...data,
        official_link: url,
        last_updated: new Date().toLocaleDateString()
      });
      setActiveTab('content');
    } catch (e) {
      alert("Neural Overload. Recruitment data stream restricted.");
    } finally {
      setLoading(false);
    }
  };

  const publishNode = () => {
    updateDB((prev: any) => ({
      ...prev,
      jobs: [{ ...post, id: Date.now() }, ...prev.jobs]
    }));
    alert("IMPERIAL_POST_PUBLISHED: Node is now live.");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-1000 pb-32 max-w-full font-sans overflow-x-hidden">
      
      {/* CMS CONTROL CENTER */}
      <div className="flex flex-col sm:flex-row items-center justify-between border-b border-white/5 pb-4 gap-4">
        <div className="text-center sm:text-left">
          <h2 className="text-3xl font-black italic tracking-tighter text-white uppercase">EMPEROR <span className="text-emerald-500">CMS.</span></h2>
          <p className="text-[10px] font-black uppercase text-slate-600 tracking-[0.4em] italic">V4000_SUPREME_MASTERY</p>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
           {['content', 'mock-test', 'links', 'revenue', 'preview'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab as any)} 
                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-emerald-600 text-white shadow-lg' : 'bg-white/5 text-slate-500 border border-white/10 hover:text-white'}`}
              >
                {tab.replace('-', '_')}
              </button>
           ))}
           <button onClick={publishNode} className="px-6 py-2 bg-pink-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-xl border border-pink-500/20">PUBLISH</button>
        </div>
      </div>

      {/* URL INJECTION DECK */}
      <div className="bg-[#050505] border border-white/5 rounded-[40px] p-6 sm:p-10 shadow-4xl relative overflow-hidden group">
         <div className="absolute inset-0 bg-emerald-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
         <div className="relative z-10 space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
               <input 
                 className="flex-1 bg-black border border-white/10 rounded-full px-8 py-5 text-white font-bold outline-none focus:border-emerald-600 transition-all text-xl italic shadow-inner" 
                 placeholder="INJECT_URI (Sakshi, Eenadu, Official Notification...)" 
                 value={url} 
                 onChange={e => setUrl(e.target.value)} 
               />
               <button 
                 onClick={forgeSupremeNode} 
                 disabled={loading || !url} 
                 className="bg-emerald-600 text-white px-12 py-5 rounded-full font-black uppercase text-[12px] tracking-[0.3em] hover:bg-white hover:text-black transition-all shadow-2xl disabled:opacity-30 flex items-center justify-center gap-4 border-[10px] border-black"
               >
                 {loading ? <RefreshCw className="animate-spin" size={24}/> : <Zap size={24}/>}
                 {loading ? "ANALYZING..." : "FORGE_DEEP_POST"}
               </button>
            </div>
         </div>
      </div>

      {activeTab === 'content' && (
        <div className="grid lg:grid-cols-12 gap-8 animate-in slide-in-from-bottom-4 duration-700">
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-black border border-white/5 rounded-[60px] p-10 sm:p-14 space-y-12 shadow-4xl">
               <div className="space-y-8">
                  <div className="space-y-2">
                     <label className="text-[11px] font-black text-emerald-500 uppercase tracking-[0.5em] ml-8">PRIMARY TELUGU HEADER (EMOTIONAL)</label>
                     <input className="w-full bg-white/5 border border-white/10 rounded-[30px] px-8 py-6 text-white font-black text-4xl outline-none focus:border-emerald-600 transition-all italic shadow-inner" value={post.title_te} onChange={e => setPost({...post, title_te: e.target.value})} placeholder="మెగా నోటిఫికేషన్ విడుదల..." />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[11px] font-black text-slate-600 uppercase tracking-[0.5em] ml-8">GLOBAL SEO HEADER (ENGLISH)</label>
                     <input className="w-full bg-white/5 border border-white/10 rounded-[30px] px-8 py-4 text-white font-black text-xl outline-none focus:border-blue-600 transition-all italic" value={post.title_en} onChange={e => setPost({...post, title_en: e.target.value})} placeholder="TS Govt Jobs 2025: Mega Recruitment..." />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[11px] font-black text-slate-600 uppercase tracking-[0.5em] ml-8">CONTENT MATRIX (HTML SOURCE)</label>
                     <textarea className="w-full bg-white/5 border border-white/10 rounded-[40px] px-8 py-8 text-slate-300 font-medium text-lg outline-none focus:border-emerald-600 min-h-[700px] leading-relaxed font-mono shadow-inner" value={post.content_html} onChange={e => setPost({...post, content_html: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[11px] font-black text-amber-500 uppercase tracking-[0.5em] ml-8">VICTORY STUDY ROADMAP</label>
                     <textarea className="w-full bg-white/5 border border-white/10 rounded-[30px] px-8 py-6 text-slate-400 font-bold text-sm outline-none focus:border-amber-600 min-h-[200px]" value={post.study_plan} onChange={e => setPost({...post, study_plan: e.target.value})} placeholder="5 steps to crack this exam..." />
                  </div>
               </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8">
             <div className="bg-[#050505] border border-white/5 rounded-[40px] p-8 space-y-6 shadow-xl relative overflow-hidden group">
                <h4 className="text-[11px] font-black text-emerald-500 uppercase flex items-center gap-3 tracking-[0.3em]"><ImageIcon size={16}/> THUMBNAIL_REGISTRY</h4>
                <div className="aspect-video bg-black rounded-3xl overflow-hidden border border-white/10 relative">
                   <img src={post.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[5000ms]" />
                   <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-6">
                      <input className="w-full bg-white/10 border border-white/20 rounded-full px-4 py-2 text-[10px] text-white outline-none italic" value={post.thumbnail} onChange={e => setPost({...post, thumbnail: e.target.value})} placeholder="Asset URI..." />
                   </div>
                </div>
             </div>

             <div className="bg-white/5 border border-white/10 rounded-[40px] p-8 space-y-4">
                <h4 className="text-[11px] font-black text-pink-500 uppercase flex items-center gap-3 tracking-[0.3em]"><Hash size={16}/> VIRAL_STICKERS</h4>
                <div className="flex flex-wrap gap-2">
                   {post.stickers.map((s: string, i: number) => (
                      <span key={i} className="bg-black border border-white/10 px-3 py-1 rounded-full text-[10px] font-black text-white italic flex items-center gap-2 group cursor-pointer hover:border-pink-600 transition-all">
                        {s} <button onClick={() => setPost({...post, stickers: post.stickers.filter((_:any,idx:number)=>idx!==i)})}><Trash2 size={10} className="text-slate-700 hover:text-red-500"/></button>
                      </span>
                   ))}
                   <button className="bg-white/5 border border-dashed border-white/10 px-3 py-1 rounded-full text-[10px] text-slate-600 hover:text-white transition-all">+</button>
                </div>
             </div>

             <div className="bg-emerald-600/5 border border-emerald-500/10 rounded-[40px] p-8 space-y-6">
                <h4 className="text-[11px] font-black text-emerald-500 uppercase flex items-center gap-3 tracking-[0.3em]"><Target size={16}/> SEO_LATTICE</h4>
                <div className="space-y-4">
                   <div className="space-y-1">
                      <label className="text-[9px] font-black text-slate-700 uppercase">URL SLUG</label>
                      <input className="w-full bg-black border border-white/10 rounded-2xl px-4 py-2 text-xs text-emerald-400 font-bold" value={post.slug} onChange={e => setPost({...post, slug: e.target.value})} />
                   </div>
                   <div className="space-y-1">
                      <label className="text-[9px] font-black text-slate-700 uppercase">KEYWORDS</label>
                      <textarea className="w-full bg-black border border-white/10 rounded-2xl px-4 py-2 text-xs text-slate-500 h-24" value={post.keywords.join(', ')} onChange={e => setPost({...post, keywords: e.target.value.split(', ')})} />
                   </div>
                </div>
             </div>
          </div>
        </div>
      )}

      {activeTab === 'mock-test' && (
        <div className="bg-black border border-white/5 rounded-[60px] p-12 space-y-10 animate-in slide-in-from-right-4 duration-700 shadow-4xl">
           <div className="flex items-center justify-between border-b border-white/5 pb-8">
              <div className="flex items-center gap-4">
                <HelpCircle className="text-pink-500" size={32}/>
                <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter">NEURAL <span className="text-pink-600">ARENA FORGE.</span></h3>
              </div>
              <button className="bg-pink-600 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase flex items-center gap-2">AUTO_GENERATE <Sparkles size={12}/></button>
           </div>
           
           <div className="space-y-8">
              {post.questions?.map((q: any, i: number) => (
                 <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-[40px] space-y-6">
                    <div className="flex items-center justify-between">
                       <span className="text-pink-500 font-black text-xl italic tracking-tighter">QUESTION_0{i+1}</span>
                       <button className="text-red-500 hover:scale-110 transition-transform"><Trash2 size={20}/></button>
                    </div>
                    <input className="w-full bg-black border border-white/5 rounded-2xl px-6 py-4 text-white font-bold text-lg" value={q.q} onChange={()=>{}} />
                    <div className="grid md:grid-cols-2 gap-4">
                       {q.options?.map((opt: string, idx: number) => (
                          <div key={idx} className={`flex items-center gap-4 bg-black p-4 rounded-2xl border ${q.correct === idx ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-white/5'}`}>
                             <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs ${q.correct === idx ? 'bg-emerald-500 text-black' : 'bg-white/5 text-slate-700'}`}>{idx+1}</div>
                             <input className="bg-transparent flex-1 text-sm font-medium text-slate-300 outline-none" value={opt} onChange={()=>{}} />
                          </div>
                       ))}
                    </div>
                 </div>
              ))}
              <button className="w-full py-10 border-2 border-dashed border-white/10 rounded-[40px] text-slate-800 hover:text-white transition-all flex items-center justify-center gap-4 font-black uppercase text-xs">
                 <Plus size={20}/> ADD_NEW_INQUIRY_NODE
              </button>
           </div>
        </div>
      )}

      {activeTab === 'links' && (
        <div className="bg-black border border-white/5 rounded-[60px] p-12 space-y-12 animate-in slide-in-from-right-4 duration-700 shadow-4xl">
           <div className="flex items-center gap-4 border-b border-white/5 pb-8">
              <Link className="text-indigo-500" size={32}/>
              <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter">SYNDICATE <span className="text-indigo-500">URIS.</span></h3>
           </div>
           <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                 <div className="bg-white/5 p-8 rounded-[40px] space-y-6">
                    <h4 className="text-[11px] font-black text-pink-500 uppercase tracking-[0.5em]">DIRECT_LINKS</h4>
                    <div className="space-y-4">
                       <div className="flex items-center gap-4 bg-black p-4 rounded-3xl border border-white/5">
                          <MessageCircle className="text-emerald-500" size={24}/>
                          <input className="bg-transparent flex-1 text-sm font-bold text-white outline-none" placeholder="WhatsApp Hub URI" value={post.whatsapp_link} onChange={e => setPost({...post, whatsapp_link: e.target.value})} />
                       </div>
                       <div className="flex items-center gap-4 bg-black p-4 rounded-3xl border border-white/5">
                          <Send className="text-blue-500" size={24}/>
                          <input className="bg-transparent flex-1 text-sm font-bold text-white outline-none" placeholder="Telegram Node URI" value={post.telegram_link} onChange={e => setPost({...post, telegram_link: e.target.value})} />
                       </div>
                       <div className="flex items-center gap-4 bg-black p-4 rounded-3xl border border-white/5">
                          <ExternalLink className="text-orange-500" size={24}/>
                          <input className="bg-transparent flex-1 text-sm font-bold text-white outline-none" placeholder="Official Portal URI" value={post.official_link} onChange={e => setPost({...post, official_link: e.target.value})} />
                       </div>
                    </div>
                 </div>
              </div>
              <div className="bg-[#050505] p-12 rounded-[100px] flex items-center justify-center text-center italic relative overflow-hidden group">
                 <div className="absolute inset-0 bg-indigo-600/5 group-hover:scale-110 transition-transform duration-[10000ms]"></div>
                 <div className="space-y-6 relative z-10">
                    <Hash size={64} className="text-indigo-500 mx-auto animate-pulse"/>
                    <p className="text-4xl font-black text-white uppercase tracking-tighter leading-none">Syndicate <br/> Nodes <br/> Synchronized</p>
                 </div>
              </div>
           </div>
        </div>
      )}

      {activeTab === 'revenue' && (
        <div className="bg-black border border-white/5 rounded-[60px] p-12 space-y-12 animate-in slide-in-from-bottom-4 duration-700 shadow-4xl">
           <div className="flex items-center gap-4 border-b border-white/5 pb-8">
              <DollarSign className="text-emerald-500" size={32}/>
              <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter">REVENUE <span className="text-emerald-500">MATRIX.</span></h3>
           </div>
           <div className="grid md:grid-cols-3 gap-8">
              {['TOP_ZONE', 'MID_ZONE', 'FOOTER_ZONE'].map(zone => (
                 <div key={zone} className="bg-emerald-600/5 border border-emerald-500/20 p-10 rounded-[40px] text-center space-y-6 group hover:bg-emerald-500/10 transition-all cursor-move">
                    <div className="flex justify-between items-center px-4">
                       <GripVertical className="text-slate-800" size={16}/>
                       <h4 className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">{zone}</h4>
                       <LayoutGrid className="text-slate-800" size={16}/>
                    </div>
                    <div className="h-48 bg-black/60 rounded-3xl border border-dashed border-emerald-500/40 flex items-center justify-center text-[10px] font-black text-slate-800 uppercase italic">
                       Ad_Sense_Slot_Active
                    </div>
                    <button className="w-full py-4 bg-white text-black rounded-2xl font-black text-[9px] uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all">CONFIGURE_AD_CODE</button>
                 </div>
              ))}
           </div>
        </div>
      )}

      {activeTab === 'preview' && (
        <div className="animate-in zoom-in-95 duration-500 space-y-8 pb-40">
           <div className="flex justify-center gap-4 border-b border-white/5 pb-4">
              <button onClick={() => setPreviewDevice('mobile')} className={`p-3 rounded-2xl transition-all ${previewDevice === 'mobile' ? 'bg-white text-black shadow-lg' : 'bg-white/5 text-slate-500'}`}><Smartphone size={24}/></button>
              <button onClick={() => setPreviewDevice('desktop')} className={`p-3 rounded-2xl transition-all ${previewDevice === 'desktop' ? 'bg-white text-black shadow-lg' : 'bg-white/5 text-slate-500'}`}><Monitor size={24}/></button>
           </div>
           
           <div className="flex justify-center">
              <div className={`bg-white text-black overflow-y-auto scrollbar-hide rounded-[50px] shadow-4xl border-[16px] border-black transition-all duration-1000 ${previewDevice === 'mobile' ? 'w-[380px] h-[800px]' : 'w-full max-w-6xl h-[800px]'}`}>
                 <img src={post.thumbnail} className="w-full h-64 object-cover" />
                 <div className="p-8 space-y-10">
                    <div className="flex flex-wrap gap-2">
                       {post.stickers.map((s: string) => <span key={s} className="bg-pink-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase italic leading-none">{s}</span>)}
                    </div>
                    
                    <div className="space-y-6">
                       <h1 className="text-4xl font-black leading-[0.85] italic tracking-tighter uppercase text-emerald-600">{post.title_te}</h1>
                       <h2 className="text-xl font-bold text-slate-400 italic leading-tight">{post.title_en}</h2>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4">
                       <div className="bg-[#25D366] text-white p-5 rounded-3xl flex items-center justify-center gap-3 font-black text-xs italic shadow-lg cursor-pointer hover:scale-105 transition-transform"><MessageCircle size={18}/> WhatsApp</div>
                       <div className="bg-[#0088cc] text-white p-5 rounded-3xl flex items-center justify-center gap-3 font-black text-xs italic shadow-lg cursor-pointer hover:scale-105 transition-transform"><Send size={18}/> Telegram</div>
                    </div>

                    <div className="prose prose-sm max-w-none prose-headings:font-black prose-table:shadow-2xl prose-table:rounded-3xl prose-table:overflow-hidden prose-table:border prose-table:border-slate-100" 
                         dangerouslySetInnerHTML={{ __html: post.content_html }}>
                    </div>

                    <div className="bg-indigo-600 text-white p-8 rounded-[40px] space-y-6 shadow-2xl relative overflow-hidden">
                       <div className="absolute top-0 right-0 p-4 opacity-10"><Zap size={100}/></div>
                       <h3 className="text-xl font-black italic uppercase tracking-tighter flex items-center gap-4"><BookOpen size={24}/> VICTORY_STUDY_PLAN</h3>
                       <p className="text-sm font-bold leading-relaxed italic whitespace-pre-wrap pl-6 border-l-4 border-white/30">{post.study_plan}</p>
                    </div>

                    <div className="bg-pink-50 p-8 rounded-[40px] border border-pink-100 space-y-10 shadow-inner">
                       <h3 className="text-xl font-black italic uppercase tracking-tighter text-pink-600 flex items-center gap-4"><HelpCircle size={24}/> NEURAL_ARENA_TEST</h3>
                       <div className="space-y-10">
                          {post.questions?.map((q: any, i: number) => (
                             <div key={i} className="space-y-4">
                                <p className="text-sm font-black text-slate-800 uppercase italic">Q{i+1}: {q.q}</p>
                                <div className="grid grid-cols-1 gap-3">
                                   {q.options?.map((opt: string, idx: number) => (
                                      <div key={idx} className="bg-white border border-slate-200 px-6 py-3 rounded-2xl text-[11px] font-black text-slate-500 hover:border-pink-500 hover:text-pink-600 transition-all cursor-pointer shadow-sm">
                                         {opt}
                                      </div>
                                   ))}
                                </div>
                             </div>
                          ))}
                       </div>
                    </div>

                    <div className="bg-amber-50 p-6 rounded-[30px] border border-amber-200">
                       <p className="text-[10px] font-black text-amber-800 uppercase tracking-widest mb-3">WhatsApp Narrative Payload</p>
                       <p className="text-sm font-medium text-slate-700 italic leading-relaxed">{post.summary_te}</p>
                    </div>

                    <div className="pt-8">
                       <div className="bg-emerald-600 text-white p-8 rounded-full text-center font-black text-2xl italic shadow-2xl hover:scale-105 transition-all cursor-pointer animate-pulse border-[10px] border-white">Official Website Apply Now</div>
                    </div>

                    <div className="h-40 bg-slate-100 flex items-center justify-center border-dashed border-2 border-slate-300 rounded-[30px]">
                       <p className="text-[10px] font-black text-slate-400 uppercase italic tracking-widest">Revenue Zone: MID_INJECTION</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}
      
      {!post.title_en && !loading && (
        <div className="h-96 flex flex-col items-center justify-center text-center opacity-10 space-y-6">
           <PenTool size={80}/>
           <p className="text-3xl font-black uppercase tracking-[1em] italic">Awaiting Registry Injection...</p>
        </div>
      )}
    </div>
  );
};