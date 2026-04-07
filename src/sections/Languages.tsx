import { useEffect, useRef } from 'react';
import { TracingPaperCard } from '@/components/TracingPaperCard';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage, type Language } from '@/contexts/LanguageContext';
import { Globe } from 'lucide-react';

const languages: { code: Language; name: string; native: string }[] = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'zh', name: 'Chinese', native: '中文' },
  { code: 'ja', name: 'Japanese', native: '日本語' },
  { code: 'es', name: 'Spanish', native: 'Español' },
  { code: 'fr', name: 'French', native: 'Français' },
  { code: 'de', name: 'German', native: 'Deutsch' },
  { code: 'pt', name: 'Portuguese', native: 'Português' },
  { code: 'ru', name: 'Russian', native: 'Русский' },
  { code: 'it', name: 'Italian', native: 'Italiano' },
  { code: 'ko', name: 'Korean', native: '한국어' },
];

export function Languages() {
  const { theme } = useTheme();
  const { language: currentLang, setLanguage, t } = useLanguage();
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
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background - solid color with subtle gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: theme === 'dark' 
            ? 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)' 
            : 'linear-gradient(180deg, #f5f5f5 0%, #ffffff 100%)'
        }}
      />

      {/* Content */}
      <div 
        ref={cardRef}
        className="relative z-10 w-full px-4 opacity-0 translate-y-5 transition-all duration-700 ease-out"
      >
        <TracingPaperCard 
          rotation={-0.5} 
          width="90%"
          maxWidth="800px"
          position="center"
          className="max-w-3xl"
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
            <Globe className="w-6 h-6" style={{ color: theme === 'dark' ? '#fff' : '#000' }} />
          </div>

          {/* Title */}
          <h2 
            className="text-2xl md:text-3xl font-medium mb-4 text-center"
            style={{ color: theme === 'dark' ? '#fff' : '#000' }}
          >
            {t('languages.title')}
          </h2>

          {/* Description */}
          <p 
            className="text-base leading-relaxed text-center mb-8"
            style={{ color: theme === 'dark' ? '#F0F0F0' : '#333' }}
          >
            {t('languages.desc')}
          </p>

          {/* Language grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`
                  p-3 rounded-lg text-sm transition-all duration-300
                  ${currentLang === lang.code 
                    ? 'font-medium' 
                    : 'opacity-70 hover:opacity-100'
                  }
                `}
                style={{
                  backgroundColor: currentLang === lang.code
                    ? theme === 'dark' 
                      ? 'rgba(255, 255, 255, 0.15)' 
                      : 'rgba(0, 0, 0, 0.1)'
                    : theme === 'dark' 
                      ? 'rgba(255, 255, 255, 0.05)' 
                      : 'rgba(0, 0, 0, 0.03)',
                  color: theme === 'dark' ? '#fff' : '#000',
                  border: currentLang === lang.code
                    ? `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)'}`
                    : '1px solid transparent',
                }}
              >
                <div className="font-medium">{lang.native}</div>
                <div className="text-xs opacity-60 mt-1">{lang.name}</div>
              </button>
            ))}
          </div>
        </TracingPaperCard>
      </div>
    </section>
  );
}
