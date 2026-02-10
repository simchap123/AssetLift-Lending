'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getGeminiResponse } from '@/services/geminiService';
import { sendNotification } from '@/services/notificationService';
import { Message } from '@/lib/types';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Hi! I'm your AssetLift deal analyst. Send me your numbers (Purchase Price, Rehab, ARV) and I'll run a quick analysis for you." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [contactState, setContactState] = useState<'none' | 'asked_email' | 'asked_phone' | 'captured'>('none');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', text: input };
    const updatedHistory = [...messages, userMsg];
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const hasEmail = /[^@\s]+@[^@\s]+\.[^@\s]+/.test(input);
    const hasPhone = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/.test(input);

    if (hasEmail || hasPhone) {
      setContactState('captured');
    }

    const result = await getGeminiResponse(updatedHistory);

    const cleanedText = result.text.replace(/\*\*/g, '');

    const modelMsg: Message = {
      role: 'model',
      text: cleanedText,
      sources: result.sources
    };

    setMessages(prev => [...prev, modelMsg]);
    setIsLoading(false);

    if (contactState === 'none' && (cleanedText.toLowerCase().includes('email') || cleanedText.toLowerCase().includes('address'))) {
      setContactState('asked_email');
    } else if (contactState === 'asked_email' && (cleanedText.toLowerCase().includes('phone') || cleanedText.toLowerCase().includes('cell'))) {
      setContactState('asked_phone');
    }

    if (cleanedText.toLowerCase().includes('summary') || cleanedText.toLowerCase().includes('loan amount') || hasEmail || hasPhone) {
      sendNotification('chat', {
        user_input: userMsg.text,
        analysis_result: cleanedText,
        full_history: [...updatedHistory, modelMsg]
      });
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
            className="w-80 md:w-[400px] h-[550px] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary text-primary-foreground p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Deal Analyst</h3>
                  <p className="text-xs opacity-80">Powered by AI</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-primary-foreground hover:bg-primary-foreground/20"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Messages */}
            <ScrollArea ref={scrollRef} className="flex-grow p-4 bg-background">
              <div className="space-y-4">
                {messages.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                      m.role === 'user'
                        ? 'bg-primary text-primary-foreground rounded-br-md'
                        : 'bg-secondary text-secondary-foreground rounded-bl-md'
                    }`}>
                      <p className="whitespace-pre-wrap">{m.text}</p>

                      {m.sources && m.sources.length > 0 && (
                        <div className="mt-3 pt-2 border-t border-current/10">
                          <p className="text-[10px] font-medium opacity-60 mb-1">Sources:</p>
                          <div className="flex flex-wrap gap-1">
                            {m.sources.map((source, idx) => (
                              <a
                                key={idx}
                                href={source.uri}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[10px] underline opacity-70 hover:opacity-100"
                              >
                                {source.title.substring(0, 25)}...
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-secondary text-secondary-foreground p-3 rounded-2xl rounded-bl-md">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 bg-card border-t border-border">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={
                    contactState === 'asked_email'
                      ? "Enter your email..."
                      : contactState === 'asked_phone'
                        ? "Enter your phone..."
                        : "Ex: Buy $200k, Rehab $50k..."
                  }
                  className="flex-grow bg-background"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  size="icon"
                  className="shrink-0"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <Button
              onClick={() => setIsOpen(true)}
              size="lg"
              className="rounded-full h-14 px-6 shadow-lg glow-primary gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="hidden sm:inline">Analyze Deal</span>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatBot;
