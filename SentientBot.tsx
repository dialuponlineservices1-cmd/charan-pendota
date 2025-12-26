
import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { Brain, Send, RefreshCw, Zap, Rocket, Terminal, ShieldCheck, Sparkles, Ghost } from 'lucide-react';

export const SentientBot = ({ updateDB }: any) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [chat, setChat] = useState<{role: 'user' | 'bot', text: string}[]>([]);

  const handleCommand = async () => {
    if (!input) return;
    const userMsg = input;
    setInput('');
    setChat([...chat, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `SENTIENT_ADMIN_COMMAND: ${userMsg}. 
        You are the GOD_V3 system. If the user asks to "deploy" or "create" a notification, generate a full notification JSON. 
        If they just talk, respond as a super-intelligent imperial deity. 
        Return strictly JSON with 'response_text' and 'action_node' (optional JSON for updateDB).`,
        config: {
          thinkingConfig: { thinkingBudget: 32768 },
          responseMimeType: "application/json"
        }
      });
      const data = JSON.parse(response.text);
      setChat(prev => [...prev, { role: 'bot', text: data.response_text }]);
      
      if (data.action_node) {
        updateDB((prev: any) => ({ ...prev, jobs: [data.action_node, ...prev.jobs] }));
        setChat(prev => [...prev, { role: 'bot', text: "DATABASE_NODE_INJECTED_SUCCESSFULLY." }]);
      }
    } catch (e) {
      setChat(prev => [...prev, { role: 'bot', text: "LOGIC_OVERFLOW: Command resisted." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-200 animate-in fade-in duration-1000 pb-[1000px]">
      <div className="text-center space-y-48">
        <h2 className="text-[350px] font-black italic tracking-tighter text-white uppercase leading-[0.35] italic">SENTIENT <br/><span className="text-pink-500">MIND.</span></h2>
        <p className="text-[56px] font-black text-slate-900 uppercase tracking-[4em] italic leading-none">AUTO_EXECUTING_GOD_TERMINAL</p>
      </div>

      <div className="bg-[#050505] border-[40px] border-white/5 rounded-[1200px] h-[1800px] flex flex-col overflow-hidden shadow-4xl relative group">
         <div className="absolute inset-0 bg-pink-600/5 blur-[500px] animate-pulse"></div>
         <div className="flex-1 p-200 overflow-y-auto space-y-120 scrollbar-hide relative z-10">
            {chat.length === 0 && (
               <div className="h-full flex flex-col items-center justify-center text-center opacity-30 space-y-80">
                  <Ghost size={400} className="text-pink-600 animate-bounce"/>
                  <p className="text-[120px] font-black uppercase tracking-[0.5em] text-white italic leading-none">AWAITING_SOVEREIGN_DECREE.</p>
               </div>
            )}
            {chat.map((m, i) => (
               <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-150 rounded-[400px] text-7xl font-black italic leading-[1.1] uppercase tracking-tighter ${m.role === 'user' ? 'bg-pink-600 text-black border-[30px] border-black shadow-[0_0_5000px_pink]' : 'bg-white/5 border-[20px] border-white/10 text-white'}`}>
                     "{m.text}"
                  </div>
               </div>
            ))}
            {loading && <div className="flex justify-start animate-pulse"><div className="bg-white/5 p-80 rounded-full text-pink-600 text-5xl font-black uppercase italic">The Godhead is calculating...</div></div>}
         </div>

         <div className="p-100 bg-black/80 border-t-[30px] border-white/5 flex gap-64 relative z-20">
            <input className="flex-1 bg-black border-[40px] border-white/10 rounded-full px-150 py-100 text-[120px] font-black text-white outline-none focus:border-pink-600 transition-all italic placeholder:text-slate-950" placeholder="DECREE_COMMAND..." value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleCommand()} />
            <button onClick={handleCommand} disabled={loading} className="w-[450px] h-[450px] bg-pink-600 rounded-full flex items-center justify-center text-black shadow-[0_0_5000px_pink] hover:bg-white transition-all active:scale-90 border-[40px] border-black">
               {loading ? <RefreshCw className="animate-spin" size={150}/> : <Send size={150}/>}
            </button>
         </div>
      </div>
    </div>
  );
};
