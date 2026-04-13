import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

const screenshots = [
  {
    image: '/images/talk.png',
    key: 'screenshots.main',
  },
  {
    image: '/images/setting.png',
    key: 'screenshots.settings',
  },
  {
    image: '/images/desk.png',
    key: 'screenshots.usage',
  },
  {
    image: '/images/welcome.png',
    key: 'screenshots.floating',
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
                  alt={t(screenshot.key)}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium mb-1" style={{ color: textColor }}>
                  {t(screenshot.key)}
                </h3>
                <p className="text-sm opacity-60" style={{ color: subtextColor }}>
                  {t(`${screenshot.key}Desc`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}