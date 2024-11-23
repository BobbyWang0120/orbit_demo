'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Plane, Send, MapPin } from 'lucide-react';
import './styles/theme.css';
import Navbar from '../components/Navbar';

const MapComponent = dynamic(() => import('../components/Map'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-[var(--hover-color)] animate-pulse rounded-lg"></div>
});

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  isLoading?: boolean;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');

    // 添加 AI 的加载消息
    const aiLoadingMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: '',
      sender: 'ai',
      timestamp: new Date(),
      isLoading: true
    };
    
    setMessages(prev => [...prev, aiLoadingMessage]);
  };

  return (
    <main className="min-h-screen bg-background-light">
      <Navbar />

      {/* 主内容区域 */}
      <div className="max-w-[1800px] mx-auto p-6">
        <div className="flex gap-6 h-[calc(100vh-7rem)]">
          {/* 聊天区域 */}
          <div className="w-1/3 flex flex-col bg-white rounded-xl border border-[var(--border-color)] overflow-hidden">
            {/* 聊天标题 */}
            <div className="px-6 py-4 border-b border-[var(--border-color)]">
              <h2 className="text-lg font-medium text-text-primary">Chat with AI Travel Assistant</h2>
              <p className="text-sm text-text-secondary mt-1">Let's plan your perfect trip together</p>
            </div>

            {/* 消息列表 */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 px-6">
                  <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center">
                    <Plane className="w-8 h-8 text-primary-color" />
                  </div>
                  <div>
                    <h3 className="font-medium text-text-primary mb-2">Start Your Journey</h3>
                    <p className="text-sm text-text-secondary">Tell me where you'd like to go, and I'll help you create the perfect itinerary.</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-xl p-3 ${
                          message.sender === 'user'
                            ? 'bg-primary-color text-white'
                            : 'bg-[var(--chat-bubble-ai)]'
                        }`}
                      >
                        {message.sender === 'ai' && (
                          <div className="flex items-center gap-2 mb-2 text-primary-color">
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm font-medium">Travel Assistant</span>
                          </div>
                        )}
                        {message.sender === 'ai' && message.isLoading ? (
                          <div className="flex gap-1.5 py-2">
                            <div className="w-2 h-2 rounded-full bg-primary-color animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-2 h-2 rounded-full bg-primary-color animate-bounce" style={{ animationDelay: '150ms' }}></div>
                            <div className="w-2 h-2 rounded-full bg-primary-color animate-bounce" style={{ animationDelay: '300ms' }}></div>
                          </div>
                        ) : (
                          <p className="text-sm leading-relaxed">{message.content}</p>
                        )}
                        <span className={`text-[10px] ${
                          message.sender === 'user' 
                            ? 'text-white/80' 
                            : 'text-text-secondary'
                        } block text-right mt-1`}>
                          {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 输入区域 */}
            <div className="p-4 border-t border-[var(--border-color)]">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Where would you like to go?"
                  className="flex-1 px-4 py-3 rounded-lg bg-[var(--hover-color)] placeholder-text-secondary text-sm focus:outline-none focus:ring-2 focus:ring-primary-color/20 transition-shadow"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="p-3 bg-primary-color text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* 地图区域 */}
          <div className="w-2/3 bg-white rounded-xl border border-[var(--border-color)] overflow-hidden">
            <MapComponent />
          </div>
        </div>
      </div>
    </main>
  );
}
