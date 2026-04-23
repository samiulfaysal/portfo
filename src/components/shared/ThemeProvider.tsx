'use client';

import * as React from 'react';
import { type PropsWithChildren } from 'react';

const ThemeProvider = ({ children }: PropsWithChildren<{ children: React.ReactNode }>) => {
  // Force dark mode on first load
  React.useEffect(() => {
    document.documentElement.classList.add('dark');

    // Also store preference in localStorage
    localStorage.setItem('theme', 'dark');
  }, []);

  return <div className="min-h-screen">{children}</div>;
};

export default ThemeProvider;