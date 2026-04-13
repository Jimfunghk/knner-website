import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Play } from 'lucide-react';

export function DemoVideo() {
  const { t, language } = useLanguage();
  const { theme } = useTheme();
  
  const textColor = theme === 'dark' ? '#fff' : '#000';
  const subtextColor = theme === 'dark' ? '#E0E0E0' : '#555';

  return (
    <section className="py-20 px-4" style={{ backgroundColor: theme === 'dark' ? '#0a0a0a' : '#f8f9fa' }}>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4" style={{ color: textColor }}>
          {t('video.title')}
        </h2>
        <p className="mb-8 opacity-60" style={{ color: subtextColor }}>
          {t('video.desc')}
        </p>

        <div 
          className="relative aspect-video rounded-2xl overflow-hidden cursor-pointer group"
          style={{ 
            backgroundColor: theme === 'dark' ? '#1a1a1a' : '#000',
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div 
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform group-hover:scale-110"
                style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
              >
                <Play className="w-10 h-10 text-white fill-white" />
              </div>
              <p className="text-white text-sm opacity-60">
                {t('video.play')}
              </p>
            </div>
          </div>

          {/*
          =====================================
          REPLACE THE ABOVE WITH YOUTUBE EMBED:
          =====================================
          <iframe 
            width="100%" 
            height="100%" 
            src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
            title="Knner Demo"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          =====================================
          */}
        </div>

        <div className="mt-8 p-4 rounded-lg text-left" style={{ 
          backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
        }}>
          <h4 className="font-medium mb-2" style={{ color: textColor }}>
            📝 {t('video.script')}
          </h4>
          <div className="text-sm space-y-2" style={{ color: subtextColor }}>
            <p>{t('video.script')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}