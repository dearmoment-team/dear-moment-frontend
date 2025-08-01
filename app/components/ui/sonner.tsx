'use client';

import { useTheme } from 'next-themes';
import { Toaster as Sonner, ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      style={
        {
          '--normal-bg': 'rgba(0, 0, 0, 0.8)',
          // '--normal-text': '#ffffff',
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
