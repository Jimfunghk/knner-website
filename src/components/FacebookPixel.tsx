import { useEffect } from 'react';

interface FacebookPixelProps {
  pixelId: string;
}

export function FacebookPixel({ pixelId }: FacebookPixelProps) {
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://connect.facebook.net/en_US/fbevents.js`;
    document.head.appendChild(script);

    script.onload = () => {
      if (typeof window.fbq !== 'undefined') {
        window.fbq('init', pixelId);
        window.fbq('track', 'PageView');
      }
    };

    script.onerror = () => {
      console.warn('Facebook Pixel failed to load');
    };

    return () => {
      document.head.removeChild(script);
    };
  }, [pixelId]);

  return null;
}

export function trackEvent(eventName: string, params?: Record<string, any>) {
  if (typeof window.fbq !== 'undefined') {
    window.fbq('track', eventName, params);
  }
}

declare global {
  interface Window {
    fbq: any;
  }
}
