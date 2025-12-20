'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, HelpCircle, Loader2, Sparkles } from 'lucide-react';
import { faqData, aiMockResponses } from '@/mocks';

// Geometric pattern background for chat area
function GeometricPattern() {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="geometric" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M30 0L60 30L30 60L0 30Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="30" cy="30" r="10" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#geometric)" />
    </svg>
  );
}

export default function AIConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<
    { id: number; text: string; isUser: boolean }[]
  >([
    {
      id: 1,
      text: 'こんにちは！NOREL AIコンシェルジュです。下のよくある質問をタップするか、お気軽にメッセージをお送りください。',
      isUser: false,
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [showFaq, setShowFaq] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto scroll to bottom when new message arrives
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Auto-resize textarea
  const adjustTextareaHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  }, []);

  useEffect(() => {
    adjustTextareaHeight();
  }, [inputText, adjustTextareaHeight]);

  const handleFaqClick = (faq: typeof faqData[0]) => {
    // Add user's question
    const userMessage = {
      id: messages.length + 1,
      text: faq.question,
      isUser: true,
    };
    setMessages((prev) => [...prev, userMessage]);
    setShowFaq(false);
    setIsSending(true);

    // Add AI's answer after a short delay
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          text: faq.answer,
          isUser: false,
        },
      ]);
      setIsSending(false);
    }, 500);
  };

  const handleSend = () => {
    if (!inputText.trim() || isSending) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputText,
      isUser: true,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setShowFaq(false);
    setIsSending(true);

    // Mock AI response
    setTimeout(() => {
      const randomResponse =
        aiMockResponses[Math.floor(Math.random() * aiMockResponses.length)];

      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          text: randomResponse,
          isUser: false,
        },
      ]);
      setIsSending(false);
    }, 1000);
  };

  // Handle Enter key (send) and Shift+Enter (newline)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button - with glow animation */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 25, delay: 0.5 }}
        className="fixed bottom-24 right-6 w-14 h-14 bg-gradient-to-r from-norel-green to-emerald-500 rounded-full shadow-glow-green flex items-center justify-center z-40 hover:shadow-lg hover:shadow-norel-green/50 transition-all"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </motion.button>

      {/* Label - glassmorphism */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7 }}
        className="fixed bottom-[104px] right-24 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full shadow-glass z-40 pointer-events-none border border-white/30"
      >
        <span className="text-xs text-gray-700 font-medium flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-norel-green" />
          AIコンシェルジュ
        </span>
      </motion.div>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end justify-center sm:items-center"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-white/90 backdrop-blur-2xl rounded-t-[32px] sm:rounded-[32px] overflow-hidden h-[80vh] sm:h-[600px] flex flex-col shadow-glass-lg border-t border-white/30"
            >
              {/* Header - Gradient with glassmorphism */}
              <div className="bg-gradient-to-r from-norel-green to-emerald-500 px-5 py-4 flex items-center justify-between relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                <div className="absolute -bottom-5 -left-5 w-20 h-20 bg-white/10 rounded-full blur-xl" />

                <div className="flex items-center gap-3 relative z-10">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="w-11 h-11 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30"
                  >
                    <MessageCircle className="w-5 h-5 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-white font-bold flex items-center gap-1.5">
                      AIコンシェルジュ
                      <Sparkles className="w-4 h-4 text-yellow-300" />
                    </h3>
                    <p className="text-white/80 text-xs">いつでもお手伝いします</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="p-3 hover:bg-white/20 rounded-full transition-colors relative z-10"
                  aria-label="閉じる"
                >
                  <X className="w-6 h-6 text-white" />
                </motion.button>
              </div>

              {/* Messages - with geometric pattern background */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 relative bg-gradient-to-b from-gray-50 to-white">
                <GeometricPattern />

                <div className="relative z-10 space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] px-4 py-3 ${
                          message.isUser
                            ? 'bg-gradient-to-r from-norel-green to-emerald-500 text-white rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl shadow-lg shadow-norel-green/20'
                            : 'bg-white/80 backdrop-blur-md text-gray-800 rounded-tr-2xl rounded-tl-2xl rounded-br-2xl shadow-glass border border-white/50'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.text}</p>
                      </div>
                    </motion.div>
                  ))}

                  {/* Typing indicator - enhanced */}
                  {isSending && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="bg-white/80 backdrop-blur-md text-gray-500 px-4 py-3 rounded-tr-2xl rounded-tl-2xl rounded-br-2xl shadow-glass border border-white/50">
                        <div className="flex items-center gap-1.5">
                          {[0, 1, 2].map((i) => (
                            <motion.span
                              key={i}
                              className="w-2.5 h-2.5 bg-gradient-to-r from-norel-green to-emerald-400 rounded-full"
                              animate={{ y: [0, -6, 0] }}
                              transition={{
                                duration: 0.6,
                                repeat: Infinity,
                                delay: i * 0.15,
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* FAQ Suggestions - glassmorphism cards */}
                  {showFaq && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="space-y-3"
                    >
                      <div className="flex items-center gap-2 text-gray-500 text-xs">
                        <HelpCircle className="w-4 h-4" />
                        <span>よくある質問</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {faqData.map((faq, index) => (
                          <motion.button
                            key={faq.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 + index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleFaqClick(faq)}
                            className="px-3 py-2 bg-white/70 backdrop-blur-sm border border-norel-green/30 text-norel-green text-xs rounded-full hover:bg-norel-green-light hover:border-norel-green transition-all shadow-sm"
                          >
                            {faq.question}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Input - Floating style with glassmorphism */}
              <div className="p-4 bg-transparent">
                <motion.div
                  className="flex items-end gap-2 bg-white/80 backdrop-blur-xl border border-white/50 rounded-full px-4 py-2 shadow-glass-lg"
                  whileFocus={{ boxShadow: '0 0 20px rgba(0, 160, 64, 0.2)' }}
                >
                  <div className="flex-1">
                    <textarea
                      ref={textareaRef}
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="メッセージを入力..."
                      rows={1}
                      className="w-full resize-none outline-none text-sm bg-transparent min-h-[24px] max-h-[120px]"
                      disabled={isSending}
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleSend}
                    disabled={isSending || !inputText.trim()}
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                      isSending || !inputText.trim()
                        ? 'bg-gray-200 cursor-not-allowed'
                        : 'bg-gradient-to-r from-norel-green to-emerald-500 shadow-lg shadow-norel-green/30'
                    }`}
                    aria-label="送信"
                  >
                    {isSending ? (
                      <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
                    ) : (
                      <Send className="w-5 h-5 text-white" />
                    )}
                  </motion.button>
                </motion.div>
                <p className="text-[10px] text-gray-400 text-center mt-2">
                  Shift + Enter で改行
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
