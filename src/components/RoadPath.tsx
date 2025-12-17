'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useNorel } from '@/contexts/NorelContext';

const stations = [
  { id: 1, label: '申込', x: 30, y: 160 },
  { id: 2, label: '契約', x: 85, y: 100 },
  { id: 3, label: '書類', x: 150, y: 140 },
  { id: 4, label: '車両準備', x: 215, y: 80 },
  { id: 5, label: '納車', x: 280, y: 130 },
  { id: 6, label: '利用中', x: 340, y: 90 },
];

// Map step numbers (1-8) to station index (0-5)
function getStationIndex(step: number): number {
  if (step <= 2) return 0; // Steps 1-2: Entry (申込)
  if (step <= 4) return 1; // Steps 3-4: Contract (契約)
  if (step === 5) return 2; // Step 5: Docs (書類)
  if (step === 6) return 3; // Step 6: Vehicle Preparation (車両準備)
  if (step === 7) return 4; // Step 7: Delivery (納車)
  return 5; // Step 8: Active (利用中)
}

export default function RoadPath() {
  const { currentStep } = useNorel();
  const currentStationIndex = getStationIndex(currentStep);

  // Calculate car position based on current station
  const currentStation = stations[currentStationIndex];

  return (
    <div className="bg-gradient-to-br from-norel-green-light to-green-100 rounded-2xl p-4 mx-4 my-4 overflow-hidden">
      <h3 className="text-sm font-bold text-gray-700 mb-2">WITH Path</h3>

      <div className="relative h-52">
        <svg
          viewBox="0 0 370 200"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Road Path */}
          <path
            d="M 30 160 Q 55 120 85 100 Q 115 80 150 140 Q 180 180 215 80 Q 245 20 280 130 Q 310 180 340 90"
            fill="none"
            stroke="#d1d5db"
            strokeWidth="18"
            strokeLinecap="round"
          />
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
                {/* Station Circle */}
                <motion.circle
                  cx={station.x}
                  cy={station.y}
                  r={isCurrent ? 14 : 10}
                  fill={isCompleted || isCurrent ? '#00A040' : '#e5e7eb'}
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
                    d={`M ${station.x - 4} ${station.y} L ${station.x - 1} ${station.y + 3} L ${station.x + 5} ${station.y - 3}`}
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  />
                )}
                {/* Station Label */}
                <text
                  x={station.x}
                  y={station.y + 26}
                  textAnchor="middle"
                  className="text-[10px] font-medium"
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
              y: currentStation.y - 30,
            }}
            transition={{
              type: 'spring',
              stiffness: 100,
              damping: 15,
            }}
          >
            {/* Car Body */}
            <rect
              x={-12}
              y={-6}
              width="24"
              height="12"
              rx="3"
              fill="#00A040"
            />
            {/* Car Top */}
            <rect
              x={-6}
              y={-11}
              width="12"
              height="6"
              rx="2"
              fill="#00A040"
            />
            {/* Wheels */}
            <circle cx={-6} cy={6} r="3" fill="#374151" />
            <circle cx={6} cy={6} r="3" fill="#374151" />
            {/* Window */}
            <rect
              x={-4}
              y={-9}
              width="8"
              height="4"
              rx="1"
              fill="#87CEEB"
            />
          </motion.g>
        </svg>
      </div>

      {/* Progress Indicator */}
      <div className="mt-2 flex items-center justify-between px-2">
        <span className="text-xs text-gray-500">進捗状況</span>
        <div className="flex-1 mx-3 h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-norel-green rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(currentStationIndex / 5) * 100}%` }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          />
        </div>
        <span className="text-xs font-bold text-norel-green">
          {Math.round((currentStationIndex / 5) * 100)}%
        </span>
      </div>
    </div>
  );
}
