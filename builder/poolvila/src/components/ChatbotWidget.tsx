import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user'|'model', text: string}[]>([
    { role: 'model', text: '안녕하세요! 세부빌라 AI 매니저입니다. 👋\\n\\n인원수, 원하시는 위치(세부시티/막탄), 여행 목적 등을 알려주시면 딱 맞는 풀빌라를 추천해 드릴게요!' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg,
          history: messages.slice(1) // skip the initial greeting if it's not needed, or include it
        })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setMessages(prev => [...prev, { role: 'model', text: data.reply }]);
      } else {
        setMessages(prev => [...prev, { role: 'model', text: data.error || data.reply || '죄송합니다. 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: '네트워크 오류가 발생했습니다.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-[env(safe-area-inset-bottom)] right-0 z-[100] md:bottom-6 md:right-6 md:p-0 p-4 w-full md:w-auto pointer-events-none flex flex-col items-end">
      
      {/* Chat Window */}
      {isOpen && (
        <div className="cebuvilla-chatbot bg-white rounded-2xl shadow-2xl border border-gray-100 w-full md:w-[400px] h-[500px] max-h-[70vh] flex flex-col overflow-hidden mb-4 pointer-events-auto transform transition-all">
          {/* Header */}
          <div className="bg-brand-navy p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <Bot className="w-6 h-6 text-brand-emerald" />
              <span className="font-bold">AI 맞춤 추천 매니저</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors p-1">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Messages */}
          <div className="flex-grow p-4 overflow-y-auto bg-gray-50 flex flex-col gap-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-brand-emerald text-white' : 'bg-brand-orange/20 text-brand-orange'}`}>
                  {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                </div>
                <div className={`max-w-[75%] rounded-2xl px-4 py-3 ${msg.role === 'user' ? 'bg-brand-emerald text-white rounded-tr-sm' : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-sm'}`}>
                  {msg.role === 'user' ? (
                    <div className="text-sm whitespace-pre-wrap">{msg.text}</div>
                  ) : (
                    <div className="markdown-body prose prose-sm prose-p:leading-relaxed prose-a:text-brand-emerald max-w-none text-sm break-words">
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2 flex-row">
                <div className="w-8 h-8 rounded-full bg-brand-orange/20 text-brand-orange flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="bg-white text-gray-500 shadow-sm border border-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">입력하신 내용을 분석 중입니다...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input Area */}
          <div className="p-3 bg-white border-t border-gray-100">
            <div className="flex gap-2 relative bg-gray-50 rounded-xl p-1 border border-gray-200 focus-within:border-brand-emerald focus-within:ring-1 focus-within:ring-brand-emerald transition-all">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="어떤 풀빌라를 찾으시나요?"
                className="w-full bg-transparent px-3 py-2 outline-none text-sm text-gray-700"
                disabled={isLoading}
              />
              <button 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="w-10 h-10 flex-shrink-0 bg-brand-navy hover:bg-brand-emerald text-white rounded-lg flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`pointer-events-auto flex items-center justify-center gap-2 bg-brand-navy hover:bg-brand-navy/90 text-white rounded-full shadow-lg transition-transform hover:scale-105 ${isOpen ? 'w-14 h-14' : 'px-5 h-14'}`}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <>
            <MessageSquare className="w-6 h-6" />
            <span className="font-bold hidden sm:inline">AI 추천 받기</span>
          </>
        )}
      </button>
    </div>
  );
}
