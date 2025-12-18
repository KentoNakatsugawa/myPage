'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Fuel, Gauge, Calendar, Star, TrendingUp, Leaf, Shield, ChevronRight } from 'lucide-react';

interface VehicleRecommendModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const recommendedVehicles = [
  {
    id: 1,
    name: 'BMW 320d Mスポーツ',
    grade: 'Mスポーツ',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&auto=format&fit=crop&q=80',
    monthlyPrice: 39800,
    fuelEfficiency: '21.4km/L',
    year: '2018年式',
    recommendation: 'スポーティな走りと低燃費ディーゼルで通勤にも最適！',
    matchScore: 98,
    highlights: [
      { icon: Fuel, text: 'クリーンディーゼルで燃費21.4km/L' },
      { icon: TrendingUp, text: 'Mスポーツ専用エアロで走りの質感向上' },
      { icon: Shield, text: 'BMW先進安全装備搭載' },
    ],
    specs: {
      engine: '2.0L ディーゼルターボ',
      power: '190ps',
      seats: '5名',
      drive: 'FR',
    },
  },
  {
    id: 2,
    name: 'ホンダ ヴェゼル',
    grade: 'e:HEV PLaY',
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&auto=format&fit=crop&q=80',
    monthlyPrice: 52300,
    fuelEfficiency: '25.0km/L',
    year: '2024年式',
    recommendation: 'SUVの使い勝手を維持しながら燃費も改善！',
    matchScore: 92,
    highlights: [
      { icon: TrendingUp, text: '広い荷室で週末のアウトドアにも最適' },
      { icon: Fuel, text: '現在のお車より燃費15%アップ' },
      { icon: Shield, text: 'Honda SENSING標準装備' },
    ],
    specs: {
      engine: '1.5L e:HEV',
      power: '131ps',
      seats: '5名',
      drive: '2WD',
    },
  },
  {
    id: 3,
    name: '日産 ノート',
    grade: 'AUTECH',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&auto=format&fit=crop&q=80',
    monthlyPrice: 45800,
    fuelEfficiency: '28.4km/L',
    year: '2024年式',
    recommendation: 'コンパクトで取り回しやすく、街乗りに最適！',
    matchScore: 88,
    highlights: [
      { icon: Gauge, text: 'e-POWERで滑らかな加速を実現' },
      { icon: Fuel, text: '月々のコストを約12,000円削減可能' },
      { icon: Leaf, text: '静粛性が高く快適なドライブ' },
    ],
    specs: {
      engine: '1.2L e-POWER',
      power: '116ps',
      seats: '5名',
      drive: '2WD',
    },
  },
];

export default function VehicleRecommendModal({ isOpen, onClose }: VehicleRecommendModalProps) {
  const [selectedVehicle, setSelectedVehicle] = React.useState(recommendedVehicles[0]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 z-[100] flex items-end sm:items-center justify-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-white rounded-t-2xl sm:rounded-2xl max-h-[90vh] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-4 flex items-center justify-between shrink-0">
              <div>
                <h2 className="text-white font-bold text-lg">AI査定 & おすすめ車両</h2>
                <p className="text-white/80 text-xs">あなたの利用傾向に基づいた提案</p>
              </div>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </motion.button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {/* Current Vehicle Value */}
              <div className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 border-b">
                <p className="text-xs text-gray-600 mb-1">現在のお車の推定評価額</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-purple-600">¥1,450,000</span>
                  <span className="text-sm text-green-600 font-medium flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    市場価格上昇中
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">※今なら高価買取のチャンスです</p>
              </div>

              {/* AI Recommendation Banner */}
              <div className="p-4 bg-amber-50 border-b border-amber-100">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-xl">🤖</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-amber-800">AIからのアドバイス</p>
                    <p className="text-xs text-amber-700 mt-1">
                      過去6ヶ月の走行データを分析した結果、月間走行距離は約800km、
                      主に通勤利用が中心です。燃費効率の良いハイブリッド車への乗り換えで、
                      <span className="font-bold">年間約6万円の燃料費削減</span>が見込めます。
                    </p>
                  </div>
                </div>
              </div>

              {/* Vehicle Selector */}
              <div className="p-4 border-b">
                <p className="text-sm font-bold text-gray-700 mb-3">おすすめ車両 TOP3</p>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {recommendedVehicles.map((vehicle) => (
                    <motion.button
                      key={vehicle.id}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedVehicle(vehicle)}
                      className={`shrink-0 p-2 rounded-xl border-2 transition-all ${
                        selectedVehicle.id === vehicle.id
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 bg-white'
                      }`}
                    >
                      <div className="w-20 h-14 bg-gray-100 rounded-lg overflow-hidden mb-1">
                        <img
                          src={vehicle.image}
                          alt={vehicle.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-xs font-medium text-gray-800 truncate w-20">{vehicle.name}</p>
                      <div className="flex items-center gap-1 justify-center mt-1">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span className="text-xs text-gray-600">{vehicle.matchScore}%</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Selected Vehicle Detail */}
              <div className="p-4">
                {/* Match Score */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    マッチ度 {selectedVehicle.matchScore}%
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.round(selectedVehicle.matchScore / 20)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Vehicle Image & Info */}
                <div className="bg-gray-100 rounded-xl overflow-hidden mb-4">
                  <img
                    src={selectedVehicle.image}
                    alt={selectedVehicle.name}
                    className="w-full h-48 object-cover"
                  />
                </div>

                <div className="mb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{selectedVehicle.name}</h3>
                      <p className="text-sm text-gray-500">{selectedVehicle.grade} / {selectedVehicle.year}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">月額リース料</p>
                      <p className="text-xl font-bold text-purple-600">
                        ¥{selectedVehicle.monthlyPrice.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* AI Recommendation Message */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 mb-4">
                  <p className="text-sm font-medium text-green-800 flex items-center gap-2">
                    <span className="text-lg">💡</span>
                    {selectedVehicle.recommendation}
                  </p>
                </div>

                {/* Highlights */}
                <div className="mb-4">
                  <p className="text-sm font-bold text-gray-700 mb-2">推しポイント</p>
                  <div className="space-y-2">
                    {selectedVehicle.highlights.map((highlight, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3 bg-gray-50 rounded-lg p-3"
                      >
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center shrink-0">
                          <highlight.icon className="w-4 h-4 text-purple-600" />
                        </div>
                        <p className="text-sm text-gray-700">{highlight.text}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Specs */}
                <div className="mb-4">
                  <p className="text-sm font-bold text-gray-700 mb-2">スペック</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500">エンジン</p>
                      <p className="text-sm font-medium text-gray-800">{selectedVehicle.specs.engine}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500">最高出力</p>
                      <p className="text-sm font-medium text-gray-800">{selectedVehicle.specs.power}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500">燃費</p>
                      <p className="text-sm font-medium text-gray-800">{selectedVehicle.fuelEfficiency}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500">乗車定員</p>
                      <p className="text-sm font-medium text-gray-800">{selectedVehicle.specs.seats}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer CTA */}
            <div className="p-4 bg-white border-t shrink-0">
              <motion.button
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg"
              >
                この車両で乗り換えを相談する
                <ChevronRight className="w-5 h-5" />
              </motion.button>
              <p className="text-xs text-gray-500 text-center mt-2">
                専門スタッフが最適なプランをご提案します
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
