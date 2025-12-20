'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, Car } from 'lucide-react';
import { useNorel } from '@/contexts/NorelContext';
import { stations, getStationIndex, phaseInfo } from '@/mocks';

export default function RoadPath() {
  const { currentStep } = useNorel();
  const currentStationIndex = getStationIndex(currentStep);
  const progressPercentage = (currentStationIndex / (stations.length - 1)) * 100;
  const phase = phaseInfo[currentStep as keyof typeof phaseInfo];

  return (
    <div className="mx-4 mt-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 overflow-hidden">
        {/* Phase Badge */}
        {phase && (
          <div className="flex items-center gap-2 mb-4">
            <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${phase.bgColor} ${phase.textColor}`}>
              {phase.name}
            </span>
            {currentStep < 8 && (
              <span className="text-xs text-gray-500">
                ステップ {currentStep}/8
              </span>
            )}
          </div>
        )}

        {/* SVG Road */}
        <div className="relative">
          <svg
            viewBox="0 0 300 80"
            className="w-full"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Background Path */}
            <path
              d="M30 40 Q75 40 100 40 Q130 25 165 40 Q200 55 235 40 Q260 40 270 40"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="10"
              strokeLinecap="round"
            />

            {/* Progress Path */}
            <motion.path
              d="M30 40 Q75 40 100 40 Q130 25 165 40 Q200 55 235 40 Q260 40 270 40"
              fill="none"
              stroke="url(#progressGradient)"
              strokeWidth="10"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: progressPercentage / 100 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />

            {/* Gradient Definition */}
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00A040" />
                <stop offset="100%" stopColor="#10B981" />
              </linearGradient>
            </defs>

            {/* Stations */}
            {stations.map((station, index) => {
              const isCompleted = index < currentStationIndex;
              const isCurrent = index === currentStationIndex;
              const position = [30, 100, 165, 235, 270][index];
              const yOffset = [40, 40, 40, 40, 40][index];

              return (
                <g key={station.id}>
                  {/* Station Circle */}
                  <motion.circle
                    cx={position}
                    cy={yOffset}
                    r={isCurrent ? 16 : 14}
                    fill={isCompleted || isCurrent ? '#00A040' : '#e5e7eb'}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  />

                  {/* Completed Check or Current Indicator */}
                  {isCompleted && (
                    <motion.g
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                    >
                      <path
                        d={`M${position - 5} ${yOffset} L${position - 1} ${yOffset + 4} L${position + 5} ${yOffset - 3}`}
                        fill="none"
                        stroke="white"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </motion.g>
                  )}

                  {isCurrent && (
                    <motion.circle
                      cx={position}
                      cy={yOffset}
                      r={8}
                      fill="white"
                      initial={{ scale: 0 }}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}

                  {/* Station Label */}
                  <text
                    x={position}
                    y={yOffset + 28}
                    textAnchor="middle"
                    className="fill-gray-600 text-[9px] font-medium"
                  >
                    {station.label}
                  </text>
                </g>
              );
            })}

            {/* Animated Car */}
            <motion.g
              initial={{ x: 30 }}
              animate={{ x: [30, 100, 165, 235, 270][currentStationIndex] - 10 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            >
              <circle cx="10" cy="22" r="10" fill="#00A040" />
              <Car
                x="3"
                y="15"
                width="14"
                height="14"
                className="text-white"
              />
            </motion.g>
          </svg>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-norel-green to-emerald-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>お申込み</span>
            <span>納車</span>
          </div>
        </div>
      </div>
    </div>
  );
}
