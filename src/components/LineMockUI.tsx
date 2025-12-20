'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NextImage from 'next/image';
import { ChevronLeft, Phone, Menu, Send, Image as ImageIcon, Mic, Plus } from 'lucide-react';

interface LineMockUIProps {
  onLaunchMiniApp: () => void;
}

export default function LineMockUI({ onLaunchMiniApp }: LineMockUIProps) {
  const [showRichMenu, setShowRichMenu] = useState(true);

  const messages = [
    {
      id: 1,
      type: 'received',
      content: 'NOREL WITHをご利用いただきありがとうございます！',
      time: '14:30',
    },
    {
      id: 2,
      type: 'received',
      content: '下のメニューから「マイページ」をタップして、契約状況や支払い情報をご確認いただけます。',
      time: '14:30',
    },
    {
      id: 3,
      type: 'received',
      isCard: true,
      cardData: {
        image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&q=80',
        title: 'BMW 320d Mスポーツ',
        subtitle: '次回お支払い: 1月5日',
        buttonText: 'マイページを開く',
      },
      time: '14:31',
    },
  ];

  return (
    <div className="h-full flex flex-col bg-[#7494C0]">
      {/* LINE Header */}
      <div className="bg-[#4A6FA5] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ChevronLeft className="w-6 h-6 text-white" />
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-[#00A040] flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
              </svg>
            </div>
            <div>
              <p className="text-white font-bold text-sm">NOREL WITH</p>
              <p className="text-white/70 text-xs">公式アカウント</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Phone className="w-5 h-5 text-white" />
          <Menu className="w-5 h-5 text-white" />
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {/* Date Divider */}
        <div className="flex justify-center">
          <span className="bg-black/20 text-white text-xs px-3 py-1 rounded-full">
            今日
          </span>
        </div>

        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: message.id * 0.2 }}
            className="flex justify-start"
          >
            <div className="max-w-[80%]">
              {message.isCard ? (
                /* Card Message */
                <motion.div
                  whileTap={{ scale: 0.98 }}
                  onClick={onLaunchMiniApp}
                  className="bg-white rounded-2xl overflow-hidden shadow-md cursor-pointer"
                >
                  {message.cardData?.image ? (
                    <NextImage
                      src={message.cardData.image}
                      alt=""
                      className="w-full h-32 object-cover"
                      width={400}
                      height={200}
                    />
                  ) : null}
                  <div className="p-3">
                    <p className="font-bold text-gray-800 text-sm">{message.cardData?.title}</p>
                    <p className="text-gray-500 text-xs mt-1">{message.cardData?.subtitle}</p>
                    <div className="mt-3 bg-[#00B900] text-white text-center py-2 rounded-lg text-sm font-bold">
                      {message.cardData?.buttonText}
                    </div>
                  </div>
                </motion.div>
              ) : (
                /* Text Message */
                <div className="bg-white rounded-2xl rounded-tl-md px-4 py-2 shadow-sm">
                  <p className="text-sm text-gray-800">{message.content}</p>
                </div>
              )}
              <p className="text-[10px] text-white/70 mt-1 ml-2">{message.time}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Rich Menu */}
      <AnimatePresence>
        {showRichMenu && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            className="bg-white border-t border-gray-200"
          >
            <div className="grid grid-cols-3 gap-[1px] bg-gray-200">
              <motion.button
                whileTap={{ scale: 0.95, backgroundColor: '#f0f0f0' }}
                onClick={onLaunchMiniApp}
                className="bg-white p-4 flex flex-col items-center justify-center gap-2"
              >
                <div className="w-12 h-12 bg-[#00A040] rounded-xl flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-7 h-7 text-white" fill="currentColor">
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-gray-700">マイページ</span>
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95, backgroundColor: '#f0f0f0' }}
                className="bg-white p-4 flex flex-col items-center justify-center gap-2"
              >
                <div className="w-12 h-12 bg-[#5B8DEF] rounded-xl flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-7 h-7 text-white" fill="currentColor">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-gray-700">契約情報</span>
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95, backgroundColor: '#f0f0f0' }}
                className="bg-white p-4 flex flex-col items-center justify-center gap-2"
              >
                <div className="w-12 h-12 bg-[#FF6B6B] rounded-xl flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-7 h-7 text-white" fill="currentColor">
                    <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 12h-2v-2h2v2zm0-4h-2V6h2v4z" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-gray-700">お問い合わせ</span>
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95, backgroundColor: '#f0f0f0' }}
                className="bg-white p-4 flex flex-col items-center justify-center gap-2"
              >
                <div className="w-12 h-12 bg-[#FFB74D] rounded-xl flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-7 h-7 text-white" fill="currentColor">
                    <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-gray-700">車両情報</span>
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95, backgroundColor: '#f0f0f0' }}
                className="bg-white p-4 flex flex-col items-center justify-center gap-2"
              >
                <div className="w-12 h-12 bg-[#9575CD] rounded-xl flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-7 h-7 text-white" fill="currentColor">
                    <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-gray-700">お支払い</span>
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95, backgroundColor: '#f0f0f0' }}
                className="bg-white p-4 flex flex-col items-center justify-center gap-2"
              >
                <div className="w-12 h-12 bg-[#4DB6AC] rounded-xl flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-7 h-7 text-white" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-gray-700">よくある質問</span>
              </motion.button>
            </div>

            {/* Toggle Rich Menu */}
            <button
              onClick={() => setShowRichMenu(false)}
              className="w-full py-2 text-center text-xs text-gray-500 border-t"
            >
              ▼ メニューを閉じる
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input Area */}
      <div className="bg-[#F7F7F7] px-3 py-2 flex items-center gap-2">
        <button className="p-2" aria-label="添付">
          <Plus className="w-6 h-6 text-gray-500" aria-hidden="true" />
        </button>
        <button className="p-2" aria-label="画像">
          <ImageIcon className="w-6 h-6 text-gray-500" aria-hidden="true" />
        </button>
        <div className="flex-1 bg-white rounded-full px-4 py-2 flex items-center">
          <input
            type="text"
            placeholder="メッセージを入力"
            className="flex-1 text-sm outline-none"
            disabled
          />
        </div>
        <button className="p-2" aria-label="音声入力">
          <Mic className="w-6 h-6 text-gray-500" aria-hidden="true" />
        </button>
        {!showRichMenu && (
          <button
            onClick={() => setShowRichMenu(true)}
            className="p-2"
          >
            <Menu className="w-6 h-6 text-[#00B900]" />
          </button>
        )}
      </div>
    </div>
  );
}
