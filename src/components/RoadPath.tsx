'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useNorel } from '@/contexts/NorelContext';
import { stations, getStationIndex, phaseInfo as phaseData } from '@/mocks';

// Ripple effect component for current station
function RippleEffect({ x, y }: { x: number; y: number }) {
  return (
    <>
      {[0, 1, 2].map((i) => (
        <motion.circle
          key={i}
          cx={x}
          cy={y}
          r={16}
          fill="none"
          stroke="#00A040"
          strokeWidth="2"
          initial={{ scale: 1, opacity: 0.6 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.6,
            ease: 'easeOut',
          }}
        />
      ))}
    </>
  );
}

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/70 backdrop-blur-md rounded-2xl p-4 mx-4 mt-4 mb-2 overflow-hidden shadow-glass border border-white/50 relative"
    >
      {/* Decorative gradient orb */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-orb-1 blur-3xl opacity-40" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-orb-2 blur-2xl opacity-30" />

      {/* Header with current phase */}
      <div className="flex items-center justify-between mb-3 relative z-10">
        <div>
          <h3 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
            WITH Path
          </h3>
          <p className="text-xs text-gray-600">あなたの納車までの道のり</p>
        </div>
        <div className="text-right">
          <motion.p
            className="text-sm font-bold text-norel-green"
            animate={{ opacity: [1, 0.7, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {currentPhaseInfo.name}
          </motion.p>
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
              <stop offset="50%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#06C755" />
            </linearGradient>
            {/* Glow filter */}
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Road Path - Background (thicker for better visibility) */}
          <path
            d="M 30 160 Q 55 120 85 100 Q 115 80 150 140 Q 180 180 215 80 Q 245 20 280 130 Q 310 180 340 90"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="20"
            strokeLinecap="round"
          />

          {/* Road Path - Progress Line with glow (green, thicker) */}
          <motion.path
            d="M 30 160 Q 55 120 85 100 Q 115 80 150 140 Q 180 180 215 80 Q 245 20 280 130 Q 310 180 340 90"
            fill="none"
            stroke="url(#progressGradient)"
            strokeWidth="10"
            strokeLinecap="round"
            filter="url(#glow)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: progressPercent / 100 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />

          {/* Dashed center line */}
          <path
            d="M 30 160 Q 55 120 85 100 Q 115 80 150 140 Q 180 180 215 80 Q 245 20 280 130 Q 310 180 340 90"
            fill="none"
            stroke="rgba(255, 255, 255, 0.8)"
            strokeWidth="2"
            strokeDasharray="8 8"
          />

          {/* Ripple effect for current station */}
          <RippleEffect x={currentStation.x} y={currentStation.y} />

          {/* Stations */}
          {stations.map((station, index) => {
            const isCompleted = index < currentStationIndex;
            const isCurrent = index === currentStationIndex;

            return (
              <g key={station.id}>
                {/* Station Circle - larger with gradient fill */}
                <motion.circle
                  cx={station.x}
                  cy={station.y}
                  r={isCurrent ? 18 : 14}
                  fill={isCompleted ? 'url(#progressGradient)' : isCurrent ? '#00A040' : 'rgba(255, 255, 255, 0.9)'}
                  stroke={isCurrent ? 'rgba(0, 160, 64, 0.5)' : isCompleted ? 'transparent' : '#d1d5db'}
                  strokeWidth={isCurrent ? 6 : 2}
                  filter={isCurrent ? 'url(#glow)' : undefined}
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
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  />
                )}
                {/* Station number for current */}
                {isCurrent && (
                  <text
                    x={station.x}
                    y={station.y + 5}
                    textAnchor="middle"
                    fill="white"
                    className="text-sm font-bold"
                  >
                    {index + 1}
                  </text>
                )}
                {/* Station Label - improved font size (12px instead of 10px) */}
                <text
                  x={station.x}
                  y={station.y + 32}
                  textAnchor="middle"
                  className="text-xs font-semibold"
                  fill={isCompleted || isCurrent ? '#00A040' : '#6b7280'}
                >
                  {station.label}
                </text>
              </g>
            );
          })}

          {/* Car Avatar with glow */}
          <motion.g
            initial={{ x: stations[0].x, y: stations[0].y }}
            animate={{
              x: currentStation.x,
              y: currentStation.y - 36,
            }}
            transition={{
              type: 'spring',
              stiffness: 100,
              damping: 15,
            }}
            filter="url(#glow)"
          >
            {/* Car Body */}
            <rect
              x={-14}
              y={-7}
              width="28"
              height="14"
              rx="4"
              fill="url(#progressGradient)"
            />
            {/* Car Top */}
            <rect
              x={-7}
              y={-13}
              width="14"
              height="7"
              rx="2"
              fill="url(#progressGradient)"
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
              fill="rgba(255, 255, 255, 0.8)"
            />
          </motion.g>
        </svg>
      </div>

      {/* Progress Indicator - glassmorphism style */}
      <div className="mt-2 flex items-center justify-between px-2 relative z-10">
        <span className="text-xs text-gray-600 font-medium">進捗状況</span>
        <div className="flex-1 mx-3 h-4 bg-white/50 backdrop-blur-sm rounded-full overflow-hidden shadow-inner border border-white/30">
          <motion.div
            className="h-full bg-gradient-to-r from-norel-green via-emerald-400 to-line-green rounded-full relative overflow-hidden"
            initial={{ width: 0 }}
            animate={{ width: `${(currentStationIndex / 5) * 100}%` }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          >
            {/* Shimmer effect on progress bar */}
            <motion.div
              className="absolute inset-0 bg-shimmer-gradient"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>
        </div>
        <span className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-norel-green to-emerald-500">
          {Math.round((currentStationIndex / 5) * 100)}%
        </span>
      </div>
    </motion.div>
  );
}
