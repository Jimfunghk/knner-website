import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

const screenshots = [
  {
    image: '/images/talk.png',
    titleKey: 'screenshots.main',
    descKey: 'screenshots.mainDesc',
  },
  {
    image: '/images/setting.png',
    titleKey: 'screenshots.settings',
    descKey: 'screenshots.settingsDesc',
  },
  {
    image: '/images/desk.png',
    titleKey: 'screenshots.usage',
    descKey: 'screenshots.usageDesc',
  },
  {
    image: '/images/welcome.png',
    titleKey: 'screenshots.floating',
    descKey: 'screenshots.floatingDesc',
  },
];

export function Screenshots() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  
  const textColor = theme === 'dark' ? '#fff' : '#000';
  const subtextColor = theme === 'dark' ? '#E0E0E0' : '#555';

  return (
    <section className="py-20 px-4" style={{ backgroundColor: theme === 'dark' ? '#111' : '#fff' }}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4" style={{ color: textColor }}>
          {t('screenshots.title')}
        </h2>
        <p className="text-center mb-12 opacity-60" style={{ color: subtextColor }}>
          {t('screenshots.subtitle')}
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {screenshots.map((screenshot, index) => (
            <div 
              key={index}
              className="rounded-2xl overflow-hidden"
              style={{ 
                backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
                border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
              }}
            >
              <div 
                className="aspect-video flex items-center justify-center bg-black"
              >
                <img 
                  src={screenshot.image} 
                  alt={t(screenshot.titleKey)}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium mb-1" style={{ color: textColor }}>
                  {t(screenshot.titleKey)}
                </h3>
                <p className="text-sm opacity-60" style={{ color: subtextColor }}>
                  {t(screenshot.descKey)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
