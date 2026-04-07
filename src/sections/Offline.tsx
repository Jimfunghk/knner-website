import { useEffect, useRef } from 'react';
import { TracingPaperCard } from '@/components/TracingPaperCard';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { WifiOff } from 'lucide-react';

export function Offline() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-x-0');
            entry.target.classList.remove('opacity-0', '-translate-x-8');
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url('/images/offline-${theme}.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />

      {/* Overlay */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundColor: theme === 'dark' 
            ? 'rgba(0, 0, 0, 0.4)' 
            : 'rgba(255, 255, 255, 0.3)'
        }}
      />

      {/* Content */}
      <div 
        ref={cardRef}
        className="relative z-10 w-full px-4 opacity-0 -translate-x-8 transition-all duration-700 ease-out"
      >
        <TracingPaperCard 
          rotation={1} 
          width="90%"
          maxWidth="500px"
          position="left"
          className="max-w-md"
        >
          {/* Icon */}
          <div 
            className="w-12 h-12 rounded-lg flex items-center justify-center mb-6"
            style={{
              backgroundColor: theme === 'dark' 
                ? 'rgba(255, 255, 255, 0.1)' 
                : 'rgba(0, 0, 0, 0.08)'
            }}
          >
            <WifiOff className="w-6 h-6" style={{ color: theme === 'dark' ? '#fff' : '#000' }} />
          </div>

          {/* Title */}
          <h2 
            className="text-2xl md:text-3xl font-medium mb-4"
            style={{ color: theme === 'dark' ? '#fff' : '#000' }}
          >
            {t('offline.title')}
          </h2>

          {/* Description */}
          <p 
            className="text-base leading-relaxed"
            style={{ color: theme === 'dark' ? '#F0F0F0' : '#333' }}
          >
            {t('offline.desc')}
          </p>
        </TracingPaperCard>
      </div>
    </section>
  );
}
