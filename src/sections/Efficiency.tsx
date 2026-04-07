import { useEffect, useRef } from 'react';
import { TracingPaperCard } from '@/components/TracingPaperCard';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Zap } from 'lucide-react';

export function Efficiency() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'scale-100');
            entry.target.classList.remove('opacity-0', 'scale-95');
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url('/images/efficiency-${theme}.jpg')`,
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
        className="relative z-10 w-full px-4 opacity-0 scale-95 transition-all duration-700 ease-out"
      >
        <TracingPaperCard 
          rotation={0.8} 
          width="90%"
          maxWidth="700px"
          position="center"
          className="max-w-2xl"
        >
          {/* Icon */}
          <div 
            className="w-12 h-12 rounded-lg flex items-center justify-center mb-6 mx-auto"
            style={{
              backgroundColor: theme === 'dark' 
                ? 'rgba(255, 255, 255, 0.1)' 
                : 'rgba(0, 0, 0, 0.08)'
            }}
          >
            <Zap className="w-6 h-6" style={{ color: theme === 'dark' ? '#fff' : '#000' }} />
          </div>

          {/* Title */}
          <h2 
            className="text-2xl md:text-3xl font-medium mb-4 text-center"
            style={{ color: theme === 'dark' ? '#fff' : '#000' }}
          >
            {t('efficiency.title')}
          </h2>

          {/* Description */}
          <p 
            className="text-base leading-relaxed text-center"
            style={{ color: theme === 'dark' ? '#F0F0F0' : '#333' }}
          >
            {t('efficiency.desc')}
          </p>
        </TracingPaperCard>
      </div>
    </section>
  );
}
