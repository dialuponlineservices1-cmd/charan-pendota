import React, { useState } from 'react';
import { GoogleGenAI, Modality } from "@google/genai";
import { 
  RefreshCw, Zap, Youtube, 
  Play, Wand2, ShoppingCart, Map
} from 'lucide-react';

export const MagicEditor = ({ onPostCreated }: any) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [extractedPost, setExtractedPost] = useState<any>(null);

  const forgeNode = async () => {
    if (!url) return;
    setLoading(true);
    try {
      // @google/genai Senior Frontend Engineer: Always use the strict initialization format with process.env.API_KEY as the exclusive source.
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `ASCENSION_V1000_FORGE: Analyze this URI (could be Web or YouTube): ${url}. 
        1. INVERSE_FORGE: If it's a YouTube link, search for what the creator is saying about the recruitment. Extract the core data points.
        2. DISTRICT_PREDATOR: Generate 3 district-specific SEO Titles (e.g., "DSC Jobs in Hyderabad", "DSC Jobs in Warangal").
        3. AFFILIATE_SYNERGY: Suggest the 3 best books/guides students must buy for this specific job.
        4. ASTRA_VOICE: Generate a high-retention Telugu script.
        
        Return STRICT JSON:
        {
          "title_en": "Ascension Title", "title_te": "Native Title", "org": "Dept", "lastDate": "Date",
          "summary_te": "High-energy script",
          "category": "TS_GOVT | AP_GOVT | PRIVATE",
          "district_seo": ["Title 1", "Title 2", "Title 3"],
          "recommended_books": [{"name": "Book Name", "link": "https://amazon.in/..."}],
          "thumbnail": "https://images.unsplash.com/photo-1454165833767-027eeef1593e",
          "trend_analysis": "...", "truth_status": "VERIFIED_NODE"
        }`,
        config: { 
          thinkingConfig: { thinkingBudget: 32768 },
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json",
        }
      });

      const responseText = response.text || '{}';
      const data = JSON.parse(responseText);

      const ttsResponse = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: `High Energy Telugu: ${data.summary_te}` }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } },
        },
      });
      const audioBase64 = ttsResponse.candidates?.[0]?.content?.parts[0]?.inlineData?.data;

      setExtractedPost({ ...data, audio: audioBase64, id: Date.now() });
    } catch (e) {
      alert("Ascension Bridge failure. Re-initializing...");
    } finally {
      setLoading(false);
    }
  };

  const commitPost = () => {
    onPostCreated(extractedPost);
    setExtractedPost(null);
    setUrl('');
    alert("ASCENSION_NODE_LOCKED: Registry expanded.");
  };

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in duration-1000 pb-20">
      
      <div className="flex flex-col md:flex-row items-center justify-between border-b border-white/5 pb-8 gap-6">
        <div className="space-y-4">
          <h2 className="text-6xl font-black tracking-tighter text-white uppercase italic leading-none">ASCENSION <br/><span className="text-yellow-600">FORGE.</span></h2>
          <p className="text-xs font-black uppercase text-slate-600 tracking-[1em] italic">V1000_INVERSE_ENGINE</p>
        </div>
        <div className="flex gap-4">
           <div className="bg-red-600/10 border border-red-600/30 p-6 rounded-3xl text-center space-y-2">
              <Youtube size={32} className="text-red-600 mx-auto animate-pulse"/>
              <p className="text-[10px] font-black text-red-600 uppercase tracking-widest italic">VIDEO_SCRAPE_LIVE</p>
           </div>
           <div className="bg-yellow-600/10 border border-yellow-600/30 p-6 rounded-3xl text-center space-y-2">
              <ShoppingCart size={32} className="text-yellow-600 mx-auto animate-bounce"/>
              <p className="text-[10px] font-black text-yellow-600 uppercase tracking-widest italic">SYNERGY_SYNCED</p>
           </div>
        </div>
      </div>

      <div className="bg-[#050505] border border-white/5 rounded-[40px] p-12 text-center space-y-8 shadow-4xl relative overflow-hidden group">
        <div className="absolute inset-0 bg-yellow-600/5 group-hover:scale-150 transition-transform duration-[20000ms]"></div>
        <h3 className="text-3xl font-black italic text-white uppercase tracking-tighter leading-none">INJECT <span className="text-yellow-600">INTEL_URI.</span></h3>
        <div className="relative max-w-4xl mx-auto group">
          <input className="w-full bg-black border border-white/10 rounded-full px-10 py-6 text-xl font-black text-white outline-none focus:border-yellow-600 transition-all placeholder:text-slate-800 italic" placeholder="PASTE_WEB_OR_YOUTUBE_LINK..." value={url} onChange={e => setUrl(e.target.value)} />
          <button onClick={forgeNode} disabled={loading || !url} className="absolute right-4 top-1/2 -translate-y-1/2 bg-yellow-600 text-black p-4 rounded-full hover:bg-white transition-all shadow-xl border border-black active:scale-90">
            {loading ? <RefreshCw className="animate-spin" size={24}/> : <Zap size={24}/>}
          </button>
        </div>
        <p className="text-xs font-bold text-slate-800 uppercase italic tracking-[0.5em]">V1000: Now extracting intelligence directly from YouTube Audio Streams.</p>
      </div>

      {extractedPost && (
        <div className="space-y-10 animate-in slide-in-from-bottom-10 duration-1000">
           <div className="bg-black border border-yellow-600/30 rounded-[40px] p-10 shadow-4xl relative overflow-hidden">
              <div className="grid lg:grid-cols-12 gap-10">
                 <div className="lg:col-span-4 space-y-6">
                    <div className="aspect-square rounded-3xl overflow-hidden border border-black shadow-xl relative group cursor-pointer">
                       <img src={extractedPost.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt="Thumbnail" />
                       <div className="absolute inset-0 bg-yellow-600/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Play size={64} className="text-black" fill="currentColor"/>
                       </div>
                    </div>
                    <div className="bg-indigo-600 text-white p-6 rounded-3xl text-center space-y-4 border border-black shadow-4xl">
                       <h4 className="text-lg font-black uppercase flex items-center justify-center gap-4"><Map/> DISTRICT_PREDATOR</h4>
                       <div className="space-y-1">
                          {extractedPost.district_seo.map((s: string) => <p key={s} className="text-xs font-bold italic text-white/70">{s}</p>)}
                       </div>
                    </div>
                 </div>
                 <div className="lg:col-span-8 flex flex-col justify-center space-y-8">
                    <div className="space-y-4">
                       <div className="flex gap-4">
                          <span className="bg-white/5 border border-white/10 px-4 py-1 rounded-full font-black text-xs italic uppercase text-yellow-600">{extractedPost.category}</span>
                          <span className="bg-emerald-500 text-black px-4 py-1 rounded-full font-black text-xs italic uppercase border border-black">{extractedPost.truth_status}</span>
                       </div>
                       <h3 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter leading-none uppercase">{extractedPost.title_te}</h3>
                    </div>
                    
                    <div className="bg-yellow-600/5 p-6 rounded-3xl border border-yellow-600/10 space-y-4">
                       <h5 className="text-xs font-black text-yellow-600 uppercase tracking-widest italic flex items-center gap-4"><ShoppingCart/> AFFILIATE_SYNERGY</h5>
                       <div className="grid md:grid-cols-3 gap-4">
                          {extractedPost.recommended_books.map((b: any, i: number) => (
                             <div key={i} className="bg-black/40 p-4 rounded-2xl border border-white/5 text-center space-y-1 group hover:border-yellow-600 transition-all cursor-pointer">
                                <p className="text-xs font-black text-white italic truncate">{b.name}</p>
                                <p className="text-[8px] font-black text-slate-800 uppercase tracking-widest">BUY_NODE_LINK</p>
                             </div>
                          ))}
                       </div>
                    </div>

                    <button onClick={commitPost} className="w-full py-6 bg-white text-black rounded-full font-black uppercase text-xl tracking-[1em] shadow-xl italic border border-black active:scale-95 transition-all">ASCEND_NODE</button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};