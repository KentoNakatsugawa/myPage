'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useNorel } from '@/contexts/NorelContext';
import { stations, getStationIndex, phaseInfo as phaseData } from '@/mocks';

export default function RoadPath() {
  const { currentStep } = useNorel();
  const currentStationIndex = getStationIndex(currentStep);

  // Calculate car position based on current station
  const currentStation = stations[currentStationIndex];

  // Get current phase info
  const currentPhaseInfo = phaseData[currentStationIndex] || phaseData[0];

  // Calculate path progress for colored line
  const progressPercent = (currentStationIndex / (stations.length - 1)) * 100;

  return (
    <div className="bg-gradient-to-br from-norel-green-light to-green-100 rounded-2xl p-4 mx-4 mt-4 mb-2 overflow-hidden shadow-card">
      {/* Header with current phase */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-lg font-bold text-gray-800">WITH Path</h3>
          <p className="text-xs text-gray-600">あなたの納車までの道のり</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-bold text-norel-green">{currentPhaseInfo.name}</p>
          <p className="text-xs text-gray-500">{currentPhaseInfo.desc}</p>
        </div>
      </div>

      <div className="relative h-56">
        <svg
          viewBox="0 0 370 200"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Definitions for gradient */}
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00A040" />
              <stop offset="100%" stopColor="#06C755" />
            </linearGradient>
          </defs>

          {/* Road Path - Background (thicker for better visibility) */}
          <path
            d="M 30 160 Q 55 120 85 100 Q 115 80 150 140 Q 180 180 215 80 Q 245 20 280 130 Q 310 180 340 90"
            fill="none"
            stroke="#d1d5db"
            strokeWidth="20"
            strokeLinecap="round"
          />

          {/* Road Path - Progress Line (green, thicker) */}
          <motion.path
            d="M 30 160 Q 55 120 85 100 Q 115 80 150 140 Q 180 180 215 80 Q 245 20 280 130 Q 310 180 340 90"
            fill="none"
            stroke="url(#progressGradient)"
            strokeWidth="8"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: progressPercent / 100 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />

          {/* Dashed center line */}
          <path
            d="M 30 160 Q 55 120 85 100 Q 115 80 150 140 Q 180 180 215 80 Q 245 20 280 130 Q 310 180 340 90"
            fill="none"
            stroke="#9ca3af"
            strokeWidth="2"
            strokeDasharray="8 8"
          />

          {/* Stations */}
          {stations.map((station, index) => {
            const isCompleted = index < currentStationIndex;
            const isCurrent = index === currentStationIndex;

            return (
              <g key={station.id}>
                {/* Station Circle - larger for better tap target */}
                <motion.circle
                  cx={station.x}
                  cy={station.y}
                  r={isCurrent ? 16 : 12}
                  fill={isCompleted || isCurrent ? '#00A040' : '#e5e7eb'}
                  stroke={isCurrent ? '#00A040' : 'transparent'}
                  strokeWidth={isCurrent ? 4 : 0}
                  strokeOpacity={0.3}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 25,
                    delay: index * 0.1,
                  }}
                />
                {/* Checkmark for completed */}
                {isCompleted && (
                  <motion.path
                    d={`M ${station.x - 5} ${station.y} L ${station.x - 1} ${station.y + 4} L ${station.x + 6} ${station.y - 4}`}
                    fill="none"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  />
                )}
                {/* Station Label - improved font size (12px instead of 10px) */}
                <text
                  x={station.x}
                  y={station.y + 28}
                  textAnchor="middle"
                  className="text-xs font-semibold"
                  fill={isCompleted || isCurrent ? '#00A040' : '#6b7280'}
                >
                  {station.label}
                </text>
              </g>
            );
          })}

          {/* Car Avatar */}
          <motion.g
            initial={{ x: stations[0].x, y: stations[0].y }}
            animate={{
              x: currentStation.x,
              y: currentStation.y - 32,
            }}
            transition={{
              type: 'spring',
              stiffness: 100,
              damping: 15,
            }}
          >
            {/* Car Body */}
            <rect
              x={-14}
              y={-7}
              width="28"
              height="14"
              rx="4"
              fill="#00A040"
            />
            {/* Car Top */}
            <rect
              x={-7}
              y={-13}
              width="14"
              height="7"
              rx="2"
              fill="#00A040"
            />
            {/* Wheels */}
            <circle cx={-7} cy={7} r="4" fill="#374151" />
            <circle cx={7} cy={7} r="4" fill="#374151" />
            {/* Window */}
            <rect
              x={-5}
              y={-11}
              width="10"
              height="5"
              rx="1"
              fill="#87CEEB"
            />
          </motion.g>
        </svg>
      </div>

      {/* Progress Indicator - thicker bar */}
      <div className="mt-2 flex items-center justify-between px-2">
        <span className="text-xs text-gray-600 font-medium">進捗状況</span>
        <div className="flex-1 mx-3 h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
          <motion.div
            className="h-full bg-gradient-to-r from-norel-green to-line-green rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(currentStationIndex / 5) * 100}%` }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          />
        </div>
        <span className="text-sm font-bold text-norel-green">
          {Math.round((currentStationIndex / 5) * 100)}%
        </span>
      </div>
    </div>
  );
}
