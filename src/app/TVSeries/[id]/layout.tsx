// app/TVSeries/layout.tsx

import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Detail TV Series',
  description: 'Khám phá những series truyền hình hot nhất hiện nay!',
};

export default function TVSeriesDetailLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#0F0F0F] min-h-screen static">
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
