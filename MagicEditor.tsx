
import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { Terminal, RefreshCw, Rocket, Zap, Link, ShieldCheck, Sparkles, CheckCircle, Database, Globe, Languages, SearchCode, Table } from 'lucide-react';

export const MagicEditor = ({ onPostCreated }: any) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [extractedPost, setExtractedPost] = useState<any>(null);

  const forgeNode = async () => {
    if (!url) return;
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      // Using gemini-3-pro-preview for deep structural analysis
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `DEEP ANALYZE this job URL: ${url}. 
        Return a perfect structured JSON notification in BOTH English and Formal Telugu.
        Include eligibility, vacancies, and a high-CTR SEO package.
        
        REQUIRED JSON SCHEMA:
        {
          "title_en": "Global English Title",
          "title_te": "Native Telugu Title",
          "org": "Organization Name",
          "lastDate": "YYYY-MM-DD",
          "summary_en": "Professional summary with 3 bullet points",
          "summary_te": "ప్రొఫెషనల్ తెలుగు సమ్మరీ",
          "thumbnail": "High-quality career image URL",
          "link": "Original URL",
          "seo": { "keywords": "comma separated keywords", "description": "Meta description for SEO" },
          "tables": [ { "label": "Key", "value": "Value", "color": "emerald/red/indigo/amber" } ]
        }`,
        config: { 
          thinkingConfig: { thinkingBudget: 25000 },
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title_en: { type: Type.STRING },
              title_te: { type: Type.STRING },
              org: { type: Type.STRING },
              lastDate: { type: Type.STRING },
              summary_en: { type: Type.STRING },
              summary_te: { type: Type.STRING },
              thumbnail: { type: Type.STRING },
              link: { type: Type.STRING },
              seo: {
                type: Type.OBJECT,
                properties: {
                  keywords: { type: Type.STRING },
                  description: { type: Type.STRING }
                }
              },
              tables: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    label: { type: Type.STRING },
                    value: { type: Type.STRING },
                    color: { type: Type.STRING }
                  }
                }
              }
            }
          }
        }
      });
      const data = JSON.parse(response.text);
      setExtractedPost({ ...data, id: Date.now() });
    } catch (e) {
      alert("Neural SEO Forge failed. Bridge offline or URL protected.");
    } finally {
      setLoading(false);
    }
  };

  const commitPost = () => {
    onPostCreated(extractedPost);
    setExtractedPost(null);
    setUrl('');
    alert("GLOBAL ZENITH SYNC: Node is now trending in the Registry.");
  };

  return (
    <div className="max-w-[1700px] mx-auto space-y-32 animate-in fade-in duration-1000 pb-[600px]">
      
      <div className="flex flex-col md:flex-row items-center justify-between border-b border-white/5 pb-24 gap-16">
        <div className="space-y-10">
          <h2 className="text-9xl font-black tracking-tighter text-white uppercase italic leading-[0.75]">SEO <span className="text-red-600">FORGE.</span></h2>
          <p className="text-[16px] font-black uppercase text-slate-700 tracking-[2em] italic">Automated Bilingual Registry Synthesis Engine</p>
        </div>
        <div className="flex gap-8">
           <div className="px-12 py-5 bg-red-600/10 border border-red-600/20 rounded-full text-red-500 text-[12px] font-black uppercase tracking-widest flex items-center gap-5 animate-pulse"><SearchCode size={24}/> SEO_MASTER_ACTIVE</div>
        </div>
      </div>

      <div className="bg-[#050505] border border-white/5 rounded-[120px] p-36 space-y-24 shadow-4xl group relative overflow-hidden">
        <div className="absolute top-0 right-0 p-24 opacity-5 rotate-12 transition-transform group-hover:scale-125 duration-1000"><Terminal size={500}/></div>
        <div className="flex items-center gap-16 relative z-10">
           <div className="w-32 h-32 bg-red-600 rounded-[45px] flex items-center justify-center shadow-4xl group-hover:rotate-12 transition-all border-4 border-white/5"><Link size={64}/></div>
           <div className="space-y-4">
              <h3 className="text-7xl font-black text-white italic tracking-tighter uppercase leading-none">Universal Ingestion</h3>
              <p className="text-2xl font-bold text-slate-800 uppercase tracking-[0.5em] italic">Paste the job URI to forge a global bilingual node with tables.</p>
           </div>
        </div>

        <div className="relative z-10">
           <input className="w-full bg-black border border-white/10 rounded-[100px] px-24 py-20 text-5xl font-black text-white outline-none focus:border-red-600 focus:ring-16 focus:ring-red-600/10 transition-all placeholder:text-slate-950 shadow-inner italic" placeholder="Paste URI (e.g. tspsc.gov.in/...)" value={url} onChange={e => setUrl(e.target.value)} onKeyDown={e => e.key === 'Enter' && forgeNode()} />
           <button onClick={forgeNode} disabled={loading || !url} className="absolute right-16 top-1/2 -translate-y-1/2 bg-red-600 text-white p-14 rounded-full hover:bg-white hover:text-black transition-all shadow-4xl disabled:opacity-30 active:scale-90">
             {loading ? <RefreshCw className="animate-spin" size={64}/> : <Rocket size={64}/>}
           </button>
        </div>
      </div>

      {extractedPost && (
        <div className="bg-[#050505] border border-red-600/40 rounded-[150px] p-40 animate-in slide-in-from-top-40 duration-1000 space-y-32 shadow-4xl relative overflow-hidden">
           <div className="absolute top-0 right-0 p-24 opacity-5 scale-[4] rotate-12"><Sparkles size={600}/></div>
           <div className="flex justify-between items-center relative z-10">
              <h4 className="text-8xl font-black text-white italic tracking-tighter uppercase">ZENITH <span className="text-red-500">FORGED NODE</span></h4>
              <button onClick={commitPost} className="px-32 py-12 bg-white text-black rounded-full font-black uppercase text-[18px] tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-4xl flex items-center gap-8 active:scale-95 italic"><CheckCircle size={40}/> COMMIT SYNC</button>
           </div>
           
           <div className="grid lg:grid-cols-2 gap-32 relative z-10">
              <div className="h-[800px] rounded-[110px] overflow-hidden border border-white/10 shadow-inner relative group">
                 <img src={extractedPost.thumbnail} className="w-full h-full object-cover opacity-80 group-hover:scale-125 transition-transform duration-1000" alt="Thumbnail Preview" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              </div>
              <div className="space-y-20 flex flex-col justify-center">
                 <div className="space-y-10">
                    <p className="text-[16px] font-black text-red-500 uppercase tracking-[0.8em] italic">ZENITH_METADATA_PACKAGE</p>
                    <h3 className="text-7xl font-black text-white italic tracking-tighter uppercase leading-[0.85]">{extractedPost.title_te}</h3>
                    <p className="text-4xl font-bold text-slate-500 italic">"{extractedPost.summary_en}"</p>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-16 pt-16 border-t border-white/5">
                    <div>
                       <p className="text-[14px] font-black text-slate-800 uppercase tracking-widest italic flex items-center gap-4"><Table size={16}/> Data Matrix</p>
                       <div className="space-y-4 mt-6">
                          {extractedPost.tables?.map((t:any, i:number) => (
                             <div key={i} className="flex justify-between text-white font-black italic text-xl">
                                <span className="text-slate-700">{t.label}:</span>
                                <span>{t.value}</span>
                             </div>
                          ))}
                       </div>
                    </div>
                    <div>
                       <p className="text-[14px] font-black text-slate-800 uppercase tracking-widest italic flex items-center gap-4"><SearchCode size={16}/> SEO Nodes</p>
                       <p className="text-xl font-bold text-slate-500 italic mt-6 break-words">{extractedPost.seo.keywords}</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};
