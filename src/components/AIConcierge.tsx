'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, HelpCircle } from 'lucide-react';

// よくある質問とその回答
const faqData = [
  {
    id: 1,
    question: '月額料金に含まれるものは何ですか？',
    answer: '月額料金には、車両代、登録諸費用、自動車税、重量税、自賠責保険料、車検費用が含まれています。ガソリン代、駐車場代、任意保険料は別途お客様のご負担となります。',
  },
  {
    id: 2,
    question: '契約期間中に解約はできますか？',
    answer: 'はい、中途解約は可能です。ただし、残りのリース期間に応じた中途解約金が発生いたします。詳しくは契約書の「中途解約」条項をご確認いただくか、サポートセンターまでお問い合わせください。',
  },
  {
    id: 3,
    question: '走行距離に制限はありますか？',
    answer: 'ご契約プランにより月間走行距離の上限が設定されています。標準プランは月2,000km、超過した場合は1kmあたり所定の追加料金が発生します。走行距離が多い方向けのプランもご用意しております。',
  },
  {
    id: 4,
    question: '車検や点検はどうなりますか？',
    answer: '車検費用は月額料金に含まれています。車検時期が近づきましたら、当社よりご案内いたします。日常点検や消耗品の交換については、提携整備工場をご利用いただけます。',
  },
  {
    id: 5,
    question: '事故を起こした場合はどうすればいいですか？',
    answer: 'まずは安全を確保し、警察へ届け出てください。その後、NORELサポートセンター（0120-XXX-XXX）へご連絡ください。任意保険にご加入の場合は、保険会社への連絡もお願いいたします。',
  },
  {
    id: 6,
    question: '契約終了後、車はどうなりますか？',
    answer: '契約満了時には、①車両を返却、②新しい車に乗り換え、③残価をお支払いいただき買取、の3つの選択肢からお選びいただけます。満了の3ヶ月前にご案内をお送りいたします。',
  },
];

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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when new message arrives
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleFaqClick = (faq: typeof faqData[0]) => {
    // Add user's question
    const userMessage = {
      id: messages.length + 1,
      text: faq.question,
      isUser: true,
    };
    setMessages((prev) => [...prev, userMessage]);
    setShowFaq(false);

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
    }, 500);
  };

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputText,
      isUser: true,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setShowFaq(false);

    // Mock AI response
    setTimeout(() => {
      const aiResponses = [
        'ありがとうございます。確認いたしますので少々お待ちください。',
        'かしこまりました。詳しい情報をお調べいたします。',
        '承知いたしました。担当者にお繋ぎすることもできますが、いかがでしょうか？',
        'ご質問ありがとうございます。こちらについては、契約書をご確認いただくか、サポートセンターまでお問い合わせください。',
      ];
      const randomResponse =
        aiResponses[Math.floor(Math.random() * aiResponses.length)];

      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          text: randomResponse,
          isUser: false,
        },
      ]);
    }, 1000);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 25, delay: 0.5 }}
        className="fixed bottom-24 right-6 w-14 h-14 bg-norel-green rounded-full shadow-lg flex items-center justify-center z-40 hover:bg-norel-green-dark transition-colors"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </motion.button>

      {/* Label */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7 }}
        className="fixed bottom-[104px] right-24 bg-white px-3 py-1 rounded-full shadow-md z-40 pointer-events-none"
      >
        <span className="text-xs text-gray-700 font-medium">AIコンシェルジュ</span>
      </motion.div>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center sm:items-center"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-white rounded-t-2xl sm:rounded-2xl overflow-hidden h-[80vh] sm:h-[600px] flex flex-col"
            >
              {/* Header */}
              <div className="bg-norel-green px-4 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold">AIコンシェルジュ</h3>
                    <p className="text-white/80 text-xs">いつでもお手伝いします</p>
                  </div>
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </motion.button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                        message.isUser
                          ? 'bg-norel-green text-white rounded-br-md'
                          : 'bg-white text-gray-800 rounded-bl-md shadow-sm'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                    </div>
                  </motion.div>
                ))}

                {/* FAQ Suggestions */}
                {showFaq && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-2"
                  >
                    <div className="flex items-center gap-2 text-gray-500 text-xs mb-2">
                      <HelpCircle className="w-4 h-4" />
                      <span>よくある質問</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {faqData.map((faq) => (
                        <motion.button
                          key={faq.id}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleFaqClick(faq)}
                          className="px-3 py-2 bg-white border border-norel-green text-norel-green text-xs rounded-full hover:bg-norel-green-light transition-colors shadow-sm"
                        >
                          {faq.question}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 bg-white border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="メッセージを入力..."
                    className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-norel-green"
                  />
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={handleSend}
                    className="w-10 h-10 bg-norel-green rounded-full flex items-center justify-center"
                  >
                    <Send className="w-5 h-5 text-white" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
