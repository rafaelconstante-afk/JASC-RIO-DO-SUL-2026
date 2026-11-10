import React from 'react';

export const TopWave: React.FC = () => (
  <svg
    className="pointer-events-none absolute inset-x-0 top-0 h-16 w-full sm:h-24 z-10"
    viewBox="0 0 1440 260"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <path d="M0 0 L1440 0 L1440 40 C 1000 220, 520 -40, 0 150 Z" fill="#00552E" />
    <path d="M0 150 C 520 -40, 1000 220, 1440 40 L1440 70 C 1000 250, 520 0, 0 190 Z" fill="#E44E21" />
    <path d="M0 190 C 520 0, 1000 250, 1440 70 L1440 88 C 1000 270, 520 26, 0 214 Z" fill="#F5B02E" />
  </svg>
);

export const FooterWave: React.FC = () => (
  <svg
    className="pointer-events-none absolute -top-[86px] left-0 h-[90px] w-full rotate-180 z-10"
    viewBox="0 0 1440 220"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <path d="M0 160 C 380 40, 760 260, 1440 70 L1440 220 L0 220 Z" fill="#F5B02E" />
    <path d="M0 190 C 420 80, 820 260, 1440 110 L1440 220 L0 220 Z" fill="#E44E21" />
    <path d="M0 210 C 460 120, 860 260, 1440 150 L1440 220 L0 220 Z" fill="#00552E" />
  </svg>
);
