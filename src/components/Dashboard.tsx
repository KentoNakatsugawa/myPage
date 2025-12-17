'use client';

import React from 'react';
import Header from './Header';
import ScoreMeter from './ScoreMeter';
import RoadPath from './RoadPath';
import MissionCard from './MissionCard';
import PaymentWidget from './PaymentWidget';
import MenuDrawer from './MenuDrawer';
import AIConcierge from './AIConcierge';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="pb-24">
        {/* NOREL Score Meter */}
        <ScoreMeter />

        {/* WITH Path (The Compass) */}
        <RoadPath />

        {/* Active Mission / Value Card */}
        <MissionCard />

        {/* WITH Payment Widget */}
        <PaymentWidget />
      </main>

      {/* Side Menu Drawer */}
      <MenuDrawer />

      {/* AI Concierge Floating Action */}
      <AIConcierge />
    </div>
  );
}
