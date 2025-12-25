
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { MessageSquareWarning, Send, Sparkles, RefreshCw, GraduationCap, Brain, HelpCircle, Zap } from 'lucide-react';

export const DoubtDestroyer = ({ db }: any) => {
  const [chat, setChat] = useState<{role: 'user' | 'ai', text: string}[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSolve = async () => {
    if (!input) return;
    const userMsg = input;
    setInput('');
    setChat([...chat, {role: 'user', text: userMsg}]);
    setLoading(true);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `You are an elite competitive exam tutor for TSPSC, APPSC, and UPSC. Solve this doubt with deep reasoning and clear steps: ${userMsg}. Keep it authoritative and encouraging.`,
        config: {
          thinkingConfig: { thinkingBudget: 15000 }
        }
      });
      setChat(prev => [...prev, {role: 'ai', text: response.text || ''}]);
    } catch (e) {
      alert("Neural tutor offline.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-700">
      <div className="text-center space-y-4">
        <h2 className="text-8xl font-black tracking-tighter text-white uppercase italic">DOUBT <span className="text-indigo-500">DESTROYER.</span></h2>
        <p className="text-slate-500 font-black uppercase text-[11px] tracking-[0.7em]">Deep-Reasoning Personal Academic Tutor</p>
      </div>

      <div className="bg-slate-950 border border-white/5 rounded-[64px] h-[600px] flex flex-col overflow-hidden shadow-4xl">
        <div className="flex-1 p-12 overflow-y-auto space-y-8 scrollbar-hide">
          {chat.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-30 space-y-6">
              <Brain size={80}/>
              <p className="text-2xl font-black uppercase tracking-widest">Awaiting Neural Inquiry...</p>
            </div>
          )}
          {chat.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-8 rounded-[40px] text-lg font-bold leading-relaxed italic ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white/5 border border-white/10 text-slate-300 rounded-tl-none'}`}>
                {msg.text}
              </div>
            </div>
          ))}
          {loading && <div className="flex justify-start animate-pulse"><div className="bg-white/5 p-8 rounded-[40px] rounded-tl-none text-indigo-500 font-black uppercase tracking-widest">AI is reasoning...</div></div>}
        </div>
        
        <div className="p-8 bg-black/50 border-t border-white/5 flex gap-4">
           <input 
             className="flex-1 bg-black border border-white/10 rounded-[32px] px-10 py-6 text-xl font-bold text-white outline-none focus:border-indigo-600 transition-all" 
             placeholder="Enter your academic doubt (e.g. Explain Article 370 steps)..."
             value={input}
             onChange={e => setInput(e.target.value)}
             onKeyDown={e => e.key === 'Enter' && handleSolve()}
           />
           <button onClick={handleSolve} disabled={loading} className="w-24 h-24 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-3xl hover:bg-indigo-500 transition-all active:scale-90">
             {loading ? <RefreshCw className="animate-spin"/> : <Send size={32}/>}
           </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          { l: "Tutor IQ", v: "Omega Level", i: <GraduationCap/> },
          { l: "Response Latency", v: "24ms", i: <Zap/> },
          { l: "Subject Mapping", v: "Infinite", i: <HelpCircle/> }
        ].map((s, i) => (
          <div key={i} className="bg-white/5 border border-white/10 p-10 rounded-[48px] flex items-center gap-6 group hover:border-indigo-500 transition-all">
             <div className="text-indigo-500 group-hover:scale-110 transition-transform">{s.i}</div>
             <div>
                <p className="text-[10px] font-black text-slate-700 uppercase tracking-widest">{s.l}</p>
                <h4 className="text-2xl font-black text-white italic uppercase">{s.v}</h4>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};
