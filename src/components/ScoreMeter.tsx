'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useNorel } from '@/contexts/NorelContext';

export default function ScoreMeter() {
  const { norelScore } = useNorel();

  // Score range: 300-850 (typical credit score range)
  const minScore = 300;
  const maxScore = 850;
  const normalizedScore = Math.min(Math.max(norelScore, minScore), maxScore);

  // Convert score to angle (0 to 180 degrees for half circle)
  const scorePercentage = (normalizedScore - minScore) / (maxScore - minScore);
  const needleAngle = -90 + scorePercentage * 180; // -90 to 90 degrees

  // Determine score level and color (Bronze/Silver/Gold/Platinum)
  const getScoreLevel = (score: number) => {
    if (score >= 750) return { label: 'プラチナ', color: '#6366F1', bgColor: 'from-indigo-400 to-purple-600', icon: '💎' };
    if (score >= 650) return { label: 'ゴールド', color: '#F59E0B', bgColor: 'from-yellow-400 to-amber-500', icon: '🥇' };
    if (score >= 550) return { label: 'シルバー', color: '#9CA3AF', bgColor: 'from-gray-400 to-gray-500', icon: '🥈' };
    return { label: 'ブロンズ', color: '#CD7F32', bgColor: 'from-orange-400 to-orange-600', icon: '🥉' };
  };

  const scoreLevel = getScoreLevel(norelScore);

  // Center point of the meter
  const cx = 150;
  const cy = 130;
  const radius = 85;

  // Generate tick marks
  const ticks = [];
  const tickCount = 11;
  for (let i = 0; i < tickCount; i++) {
    const angle = -180 + (i / (tickCount - 1)) * 180;
    const radian = (angle * Math.PI) / 180;
    const innerRadius = radius - 8;
    const outerRadius = i % 2 === 0 ? radius : radius - 5;
    const x1 = cx + innerRadius * Math.cos(radian);
    const y1 = cy + innerRadius * Math.sin(radian);
    const x2 = cx + outerRadius * Math.cos(radian);
    const y2 = cy + outerRadius * Math.sin(radian);

    ticks.push(
      <line
        key={i}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={i % 2 === 0 ? '#6B7280' : '#9CA3AF'}
        strokeWidth={i % 2 === 0 ? 2 : 1}
      />
    );

    // Add labels for major ticks (only at ends and middle)
    if (i === 0 || i === tickCount - 1 || i === Math.floor(tickCount / 2)) {
      const labelRadius = radius + 15;
      const lx = cx + labelRadius * Math.cos(radian);
      const ly = cy + labelRadius * Math.sin(radian);
      const labelValue = minScore + (i / (tickCount - 1)) * (maxScore - minScore);
      ticks.push(
        <text
          key={`label-${i}`}
          x={lx}
          y={ly}
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-[9px] fill-gray-500 font-medium"
        >
          {Math.round(labelValue)}
        </text>
      );
    }
  }

  // Arc path for the meter background and progress
  const arcStartX = cx - radius;
  const arcEndX = cx + radius;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="mx-4 mt-4 mb-2"
    >
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-4 shadow-xl">
        {/* Title */}
        <div className="text-center mb-1">
          <h3 className="text-white/80 text-xs font-medium tracking-wider">NOREL SCORE</h3>
        </div>

        {/* Meter */}
        <div className="relative flex justify-center">
          <svg viewBox="0 0 300 155" className="w-full max-w-[300px]">
            {/* Background arc gradient */}
            <defs>
              <linearGradient id="meterGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#EF4444" />
                <stop offset="25%" stopColor="#F59E0B" />
                <stop offset="50%" stopColor="#84CC16" />
                <stop offset="75%" stopColor="#22C55E" />
                <stop offset="100%" stopColor="#00A040" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Outer ring background */}
            <path
              d={`M ${arcStartX} ${cy} A ${radius} ${radius} 0 0 1 ${arcEndX} ${cy}`}
              fill="none"
              stroke="#374151"
              strokeWidth="14"
              strokeLinecap="round"
            />

            {/* Colored arc (progress) */}
            <motion.path
              d={`M ${arcStartX} ${cy} A ${radius} ${radius} 0 0 1 ${arcEndX} ${cy}`}
              fill="none"
              stroke="url(#meterGradient)"
              strokeWidth="12"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: scorePercentage }}
              transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
            />

            {/* Tick marks */}
            {ticks}

            {/* Center decoration */}
            <circle cx={cx} cy={cy} r="10" fill="#1F2937" stroke="#374151" strokeWidth="2" />

            {/* Needle - using CSS transform with exact center */}
            <g style={{ transform: `rotate(${needleAngle}deg)`, transformOrigin: `${cx}px ${cy}px`, transition: 'transform 1s cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
              {/* Needle body */}
              <polygon
                points={`${cx},${cy - 60} ${cx - 3},${cy - 5} ${cx + 3},${cy - 5}`}
                fill={scoreLevel.color}
                filter="url(#glow)"
              />
              {/* Needle base */}
              <circle cx={cx} cy={cy} r="8" fill={scoreLevel.color} />
            </g>
            {/* Center cap overlay */}
            <circle cx={cx} cy={cy} r="5" fill="#1F2937" />
          </svg>
        </div>

        {/* Score Display */}
        <div className="text-center -mt-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.8 }}
            className="inline-block"
          >
            <span className="text-4xl font-bold text-white tracking-tight">
              {norelScore}
            </span>
            <span className="text-white/50 text-sm ml-1">pt</span>
          </motion.div>

          {/* Score Level Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-2"
          >
            <span
              className={`inline-block px-4 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${scoreLevel.bgColor}`}
            >
              {scoreLevel.label}
            </span>
          </motion.div>
        </div>

        {/* Score Reasons */}
        <div className="mt-4 pt-3 border-t border-gray-700">
          <p className="text-gray-500 text-xs mb-2">最近のスコアUPへの感謝</p>
          <div className="space-y-2">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1 }}
              className="flex items-start gap-2"
            >
              <span className="text-green-400 text-sm">✓</span>
              <p className="text-white/90 text-xs">期日内に前受金をしっかりお支払いいただきました！</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 }}
              className="flex items-start gap-2"
            >
              <span className="text-green-400 text-sm">✓</span>
              <p className="text-white/90 text-xs">オイル交換をしてくれてありがとう！</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.3 }}
              className="flex items-start gap-2"
            >
              <span className="text-green-400 text-sm">✓</span>
              <p className="text-white/90 text-xs">毎月の引き落としが順調です！</p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
