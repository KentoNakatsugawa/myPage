'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, Star, Sparkles, ArrowRight, Cog, Zap, Fuel, Users } from 'lucide-react';

type VehicleRecommendModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const recommendedVehicles = [
  {
    id: 1,
    name: 'BMW 420i クーペ',
    year: '2020年式',
    color: 'アルピンホワイト',
    monthlyPrice: 49800,
    rating: 4,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80',
    specs: {
      engine: '2.0L ターボ',
      power: '184PS',
      fuel: '14.3km/L',
      seats: '4人乗り',
    },
    matchScore: 95,
  },
  {
    id: 2,
    name: 'Audi A5 Sportback',
    year: '2021年式',
    color: 'ミトスブラック',
    monthlyPrice: 52800,
    rating: 5,
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80',
    specs: {
      engine: '2.0L TFSI',
      power: '190PS',
      fuel: '15.0km/L',
      seats: '5人乗り',
    },
    matchScore: 92,
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
          className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-white rounded-t-3xl max-h-[90vh] overflow-y-auto shadow-2xl"
          >
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-norel-blue to-sky-500 text-white px-5 py-4 z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                    className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
                  >
                    <Sparkles className="w-5 h-5" />
                  </motion.div>
                  <div>
                    <h2 className="text-lg font-bold">AIおすすめ車両</h2>
                    <p className="text-xs text-white/80">あなたにぴったりの1台を</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {/* Vehicle Selector */}
            <div className="p-4 space-y-4">
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {recommendedVehicles.map((vehicle) => (
                  <motion.button
                    key={vehicle.id}
                    onClick={() => setSelectedVehicle(vehicle)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex-shrink-0 w-40 rounded-xl p-3 border-2 transition-all ${
                      selectedVehicle.id === vehicle.id
                        ? 'border-norel-blue bg-norel-blue-light shadow-md'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="aspect-[16/9] relative rounded-lg overflow-hidden mb-2">
                      <Image
                        src={vehicle.image}
                        alt={vehicle.name}
                        fill
                        className="object-cover"
                        sizes="160px"
                      />
                    </div>
                    <p className="text-xs font-bold text-gray-900 truncate">{vehicle.name}</p>
                    <p className="text-xs text-gray-500">{vehicle.year}</p>
                  </motion.button>
                ))}
              </div>

              {/* Selected Vehicle Detail */}
              <motion.div
                key={selectedVehicle.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-50 rounded-2xl overflow-hidden"
              >
                {/* Vehicle Image */}
                <div className="aspect-[16/10] relative">
                  <Image
                    src={selectedVehicle.image}
                    alt={selectedVehicle.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 448px"
                    priority
                  />
                  <div className="absolute top-4 right-4">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.2 }}
                      className="bg-white shadow-lg rounded-full px-3 py-1.5 flex items-center gap-1"
                    >
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm font-bold text-gray-900">{selectedVehicle.matchScore}%</span>
                    </motion.div>
                  </div>
                </div>

                {/* Vehicle Info */}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="text-xl font-bold text-gray-900">{selectedVehicle.name}</h3>
                    <div className="flex">
                      {[...Array(selectedVehicle.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: i * 0.1 + 0.3 }}
                        >
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-4">
                    {selectedVehicle.year} / {selectedVehicle.color}
                  </p>

                  {/* Specs Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    <div className="bg-white rounded-xl p-3 flex items-center gap-2 shadow-sm">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Cog className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">エンジン</p>
                        <p className="text-sm font-bold text-gray-900">{selectedVehicle.specs.engine}</p>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-3 flex items-center gap-2 shadow-sm">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Zap className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">出力</p>
                        <p className="text-sm font-bold text-gray-900">{selectedVehicle.specs.power}</p>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-3 flex items-center gap-2 shadow-sm">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Fuel className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">燃費</p>
                        <p className="text-sm font-bold text-gray-900">{selectedVehicle.specs.fuel}</p>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-3 flex items-center gap-2 shadow-sm">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Users className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">定員</p>
                        <p className="text-sm font-bold text-gray-900">{selectedVehicle.specs.seats}</p>
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="bg-white rounded-xl p-4 mb-5 shadow-sm">
                    <p className="text-xs text-gray-500 mb-1">月額料金</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-norel-blue">
                        ¥{selectedVehicle.monthlyPrice.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-500">/月</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-norel-blue to-sky-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg flex items-center justify-center gap-2"
                  >
                    この車両を詳しく見る
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
