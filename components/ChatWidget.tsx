import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "Hello. I'm Nikunja's portfolio AI. Ask me about his system architecture experience or tech stack." }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: inputValue };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const responseText = await sendMessageToGemini(userMsg.text, messages);
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Error connecting to AI service." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      {/* FAB */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-full bg-primary text-background shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:scale-110 transition-transform z-50 ${isOpen ? 'hidden' : 'flex'}`}
      >
        <MessageSquare size={24} strokeWidth={2.5} />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 md:w-96 h-[500px] bg-background border border-primary/30 rounded-lg shadow-[0_0_30px_rgba(0,0,0,0.5)] flex flex-col z-50 overflow-hidden font-sans">
          {/* Header */}
          <div className="p-4 bg-surface border-b border-border flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="font-mono text-sm font-bold text-primary">NIKUNJA_AI_V1.0</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-textMuted hover:text-white transition-colors">
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background/95">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded border flex items-center justify-center flex-shrink-0 ${msg.role === 'model' ? 'border-primary bg-primary/10 text-primary' : 'border-secondary bg-secondary/10 text-secondary'}`}>
                  {msg.role === 'model' ? <Bot size={16} /> : <User size={16} />}
                </div>
                <div className={`text-sm p-3 rounded-md max-w-[80%] border ${msg.role === 'model' ? 'border-border bg-surface text-textPrimary' : 'border-secondary/30 bg-secondary/5 text-textPrimary'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
               <div className="flex gap-3">
                 <div className="w-8 h-8 rounded border border-primary bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                   <Bot size={16} />
                 </div>
                 <div className="flex items-center gap-2 text-primary/50 text-sm font-mono mt-2">
                   <Loader2 size={14} className="animate-spin" />
                   <span>PROCESSING...</span>
                 </div>
               </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-surface border-t border-border flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask about my tech stack..."
              className="flex-1 bg-background border border-border rounded px-3 py-2 text-sm text-textPrimary focus:outline-none focus:border-primary font-mono placeholder:text-gray-700"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading}
              className="p-2 bg-primary/10 border border-primary text-primary rounded hover:bg-primary hover:text-background transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
