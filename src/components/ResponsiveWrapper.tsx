'use client';

import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface ResponsiveWrapperProps {
  children: React.ReactNode;
}

export default function ResponsiveWrapper({ children }: ResponsiveWrapperProps) {
  const siteUrl = typeof window !== 'undefined' ? window.location.href : 'https://norel-with.vercel.app';

  return (
    <>
      {/* PC View - Side panels with QR code */}
      <div className="hidden lg:flex fixed inset-0 bg-gradient-to-br from-gray-100 to-gray-200 z-0">
        {/* Left Panel */}
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-norel-green rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                viewBox="0 0 24 24"
                className="w-10 h-10 text-white"
                fill="currentColor"
              >
                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">NOREL WITH</h1>
            <p className="text-gray-600 mb-8">All in One Place</p>

            <div className="bg-white p-6 rounded-2xl shadow-lg inline-block">
              <QRCodeSVG
                value={siteUrl}
                size={180}
                level="H"
                includeMargin={true}
              />
            </div>

            <p className="text-sm text-gray-500 mt-4 max-w-xs">
              QRコードをスマートフォンで<br />読み取ってアクセスしてください
            </p>
          </div>
        </div>

        {/* Center - Mobile View Container (placeholder for spacing) */}
        <div className="w-[430px] shrink-0" />

        {/* Right Panel */}
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="text-center max-w-sm">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-6">
              <p className="text-amber-800 font-medium">
                このサイトはスマートフォンでの<br />閲覧を推奨しております
              </p>
            </div>

            <div className="space-y-4 text-left">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-norel-green/10 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-norel-green font-bold text-sm">1</span>
                </div>
                <p className="text-sm text-gray-600">
                  左のQRコードをスマートフォンのカメラで読み取ります
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-norel-green/10 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-norel-green font-bold text-sm">2</span>
                </div>
                <p className="text-sm text-gray-600">
                  表示されたリンクをタップしてアクセス
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-norel-green/10 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-norel-green font-bold text-sm">3</span>
                </div>
                <p className="text-sm text-gray-600">
                  最適化された画面でサービスをお楽しみください
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Container */}
      <div className="lg:fixed lg:left-1/2 lg:-translate-x-1/2 lg:top-0 lg:bottom-0 lg:w-[430px] lg:shadow-2xl lg:z-10 lg:overflow-hidden">
        <div className="lg:h-full lg:overflow-y-auto">
          {children}
        </div>
      </div>
    </>
  );
}
