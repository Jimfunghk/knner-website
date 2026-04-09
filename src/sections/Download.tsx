import { useEffect, useRef } from 'react';
import { TracingPaperCard } from '@/components/TracingPaperCard';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Download, Apple, Monitor, Laptop } from 'lucide-react';
//hahaha
//force rebuild
export function DownloadSection() {
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

  const platforms = [
    { icon: Monitor, name: t('download.windows'), status: 'ready', link: 'https://github.com/Jimfunghk/knotwhisper/releases/download/v1.0.3/Knner_1.0.3_x64-setup.exe' },
    { icon: Apple, name: t('download.macos'), status: 'soon', link: null },
    { icon: Laptop, name: t('download.linux'), status: 'soon', link: null },
  ];

  return (
    <section id="download" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background - solid color */}
      <div 
        className="absolute inset-0"
        style={{
          background: theme === 'dark' 
            ? 'linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)' 
            : 'linear-gradient(180deg, #ffffff 0%, #f5f5f5 100%)'
        }}
      />

      {/* Content */}
      <div 
        ref={cardRef}
        className="relative z-10 w-full px-4 opacity-0 scale-95 transition-all duration-700 ease-out"
      >
        <TracingPaperCard 
          rotation={0.5} 
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
            <Download className="w-6 h-6" style={{ color: theme === 'dark' ? '#fff' : '#000' }} />
          </div>

          {/* Title */}
          <h2 
            className="text-2xl md:text-3xl font-medium mb-4 text-center"
            style={{ color: theme === 'dark' ? '#fff' : '#000' }}
          >
            {t('download.title')}
          </h2>

          {/* Description */}
          <p 
            className="text-base leading-relaxed text-center mb-8"
            style={{ color: theme === 'dark' ? '#F0F0F0' : '#333' }}
          >
            {t('download.desc')}
          </p>

          {/* Platform buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {platforms.map((platform) => (
              platform.link ? (
                <a
                  key={platform.name}
                  href={platform.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-lg flex flex-col items-center gap-2 transition-all duration-300 hover:scale-105"
                  style={{
                    backgroundColor: theme === 'dark' 
                      ? 'rgba(255, 255, 255, 0.08)' 
                      : 'rgba(0, 0, 0, 0.05)',
                    color: theme === 'dark' ? '#fff' : '#000',
                    border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
                    textDecoration: 'none',
                  }}
                >
                  <platform.icon className="w-6 h-6" />
                  <span className="font-medium">{platform.name}</span>
                  {platform.status === 'ready' && (
                    <span 
                      className="text-xs"
                      style={{ color: '#22c55e' }}
                    >
                      Download
                    </span>
                  )}
                </a>
              ) : (
                <button
                  key={platform.name}
                  disabled={platform.status === 'soon'}
                  className={`
                    p-4 rounded-lg flex flex-col items-center gap-2 transition-all duration-300
                    ${platform.status === 'soon' ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}
                  `}
                  style={{
                    backgroundColor: theme === 'dark' 
                      ? 'rgba(255, 255, 255, 0.08)' 
                      : 'rgba(0, 0, 0, 0.05)',
                    color: theme === 'dark' ? '#fff' : '#000',
                    border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
                  }}
                >
                  <platform.icon className="w-6 h-6" />
                  <span className="font-medium">{platform.name}</span>
                  {platform.status === 'soon' && (
                    <span 
                      className="text-xs"
                      style={{ color: theme === 'dark' ? '#aaa' : '#666' }}
                    >
                      {t('download.soon')}
                    </span>
                  )}
                  {platform.status === 'ready' && (
                    <span 
                      className="text-xs"
                      style={{ color: '#22c55e' }}
                    >
                      Download
                    </span>
                  )}
                </button>
              )
            ))}
          </div>
        </TracingPaperCard>
      </div>
    </section>
  );
}
