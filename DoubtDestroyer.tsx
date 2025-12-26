
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { MessageSquare, Send, Sparkles, RefreshCw, GraduationCap, Brain, Zap } from 'lucide-react';

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
        model: 'gemini-3-pro-preview',
        contents: `You are an elite competitive exam tutor for Telugu aspirants (TSPSC, APPSC). Solve this doubt clearly in Telugu/English mix: ${userMsg}`,
        config: { thinkingConfig: { thinkingBudget: 20000 } }
      });
      setChat(prev => [...prev, {role: 'ai', text: response.text || ''}]);
    } catch (e) {
      alert("AI Bridge Offline.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-700">
      <div className="text-center space-y-4">
        <h2 className="text-8xl font-black tracking-tighter text-white uppercase italic">DOUBT <span className="text-red-500">DESTROYER.</span></h2>
        <p className="text-slate-500 font-black uppercase text-[11px] tracking-[0.7em]">Neural Academic Tutoring Node</p>
      </div>

      <div className="bg-[#050505] border border-white/5 rounded-[60px] h-[700px] flex flex-col overflow-hidden shadow-4xl">
        <div className="flex-1 p-14 overflow-y-auto space-y-10 scrollbar-hide">
          {chat.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-30 space-y-8">
              <Brain size={100} className="text-red-600"/>
              <p className="text-3xl font-black uppercase tracking-widest text-white italic">Awaiting Inquiry...</p>
            </div>
          )}
          {chat.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-10 rounded-[45px] text-xl font-bold leading-relaxed italic ${msg.role === 'user' ? 'bg-red-600 text-white rounded-tr-none shadow-2xl' : 'bg-white/5 border border-white/10 text-slate-300 rounded-tl-none shadow-xl'}`}>
                {msg.text}
              </div>
            </div>
          ))}
          {loading && <div className="flex justify-start animate-pulse"><div className="bg-white/5 p-10 rounded-[45px] text-red-500 font-black uppercase tracking-widest italic">AI is reasoning...</div></div>}
        </div>
        
        <div className="p-10 bg-black/50 border-t border-white/5 flex gap-6">
           <input title="Chat Input" className="flex-1 bg-black border border-white/10 rounded-[40px] px-12 py-8 text-2xl font-black text-white outline-none focus:border-red-600 transition-all placeholder:text-slate-900" placeholder="Ask your doubt..." value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSolve()} />
           <button onClick={handleSolve} disabled={loading} className="w-28 h-28 bg-red-600 rounded-full flex items-center justify-center text-white shadow-4xl hover:bg-white hover:text-black transition-all active:scale-90">
             {loading ? <RefreshCw className="animate-spin"/> : <Send size={36}/>}
           </button>
        </div>
      </div>
    </div>
  );
};
