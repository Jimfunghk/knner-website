import { useEffect, useRef } from 'react';
import { TracingPaperCard } from '@/components/TracingPaperCard';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mic } from 'lucide-react';

export function Hero() {
  const { theme } = useTheme();
  const { t, language } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-5');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Slogan based on language
  const slogan = language === 'zh' 
    ? '思緒成文。離線。零延遲。'
    : 'Thoughts → text. Off-grid. Zero lag.';

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image with parallax */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url('/images/hero-${theme}.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />

      {/* Overlay for better text readability */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundColor: theme === 'dark' 
            ? 'rgba(0, 0, 0, 0.3)' 
            : 'rgba(255, 255, 255, 0.2)'
        }}
      />

      {/* Content */}
      <div 
        ref={cardRef}
        className="relative z-10 w-full max-w-4xl px-4 opacity-0 translate-y-5 transition-all duration-700 ease-out"
      >
        <TracingPaperCard 
          rotation={-1.5} 
          width="100%"
          maxWidth="600px"
          position="center"
          className="max-w-2xl"
        >
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{
                backgroundColor: theme === 'dark' 
                  ? 'rgba(255, 255, 255, 0.15)' 
                  : 'rgba(0, 0, 0, 0.1)'
              }}
            >
              <Mic className="w-5 h-5" style={{ color: theme === 'dark' ? '#fff' : '#000' }} />
            </div>
            <span 
              className="text-xl font-medium tracking-tight"
              style={{ color: theme === 'dark' ? '#fff' : '#000' }}
            >
              {t('hero.title')}
            </span>
          </div>

          {/* Main title */}
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-medium text-center mb-4 tracking-tight"
            style={{ color: theme === 'dark' ? '#fff' : '#000' }}
          >
            {t('hero.subtitle')}
          </h1>

          {/* Slogan */}
          <p 
            className="text-lg md:text-xl text-center mb-6 font-medium tracking-wide"
            style={{ color: theme === 'dark' ? '#F0F0F0' : '#333' }}
          >
            {slogan}
          </p>

          {/* Tagline */}
          <p 
            className="text-sm md:text-base text-center mb-8 opacity-70"
            style={{ color: theme === 'dark' ? '#E0E0E0' : '#555' }}
          >
            {t('hero.tagline')}
          </p>

          {/* CTA Button */}
          <div className="flex justify-center">
            <a 
              href="https://github.com/Jimfunghk/knotwhisper/releases/download/v1.0.1/Knner_1.0.1_x64-setup.exe"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-lg font-medium text-sm tracking-wide transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: theme === 'dark' 
                  ? 'rgba(255, 255, 255, 0.15)' 
                  : 'rgba(0, 0, 0, 0.1)',
                color: theme === 'dark' ? '#fff' : '#000',
                border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)'}`,
                textDecoration: 'none',
              }}
            >
              Download Now
            </a>
          </div>
        </TracingPaperCard>
      </div>

      {/* Scroll indicator */}
      <div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
        style={{ color: theme === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)' }}
      >
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
