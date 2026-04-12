import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Monitor, Smartphone, Settings, BarChart3 } from 'lucide-react';

const screenshots = [
  {
    icon: Monitor,
    title: '主要介面',
    titleEn: 'Main Interface',
    desc: '簡潔易用，一鍵錄音',
    descEn: 'Clean interface, one-tap recording',
    placeholder: '📸 主要介面截圖',
  },
  {
    icon: Settings,
    title: '設定頁面',
    titleEn: 'Settings Page',
    desc: '自訂語言、按鍵、速記',
    descEn: 'Customize language, hotkeys, shortcuts',
    placeholder: '📸 設定頁面截圖',
  },
  {
    icon: BarChart3,
    title: '用量追蹤',
    titleEn: 'Usage Tracking',
    desc: '清晰顯示已用 / 剩餘額度',
    descEn: 'Clear usage limits display',
    placeholder: '📸 用量追蹤截圖',
  },
  {
    icon: Smartphone,
    title: '悬浮球模式',
    titleEn: 'Floating Ball Mode',
    desc: '隨時錄音，不阻礙',
    descEn: 'Record anytime, stays out of the way',
    placeholder: '📸 悬浮球模式截圖',
  },
];

export function Screenshots() {
  const { language } = useLanguage();
  const { theme } = useTheme();
  
  const textColor = theme === 'dark' ? '#fff' : '#000';
  const subtextColor = theme === 'dark' ? '#E0E0E0' : '#555';

  return (
    <section className="py-20 px-4" style={{ backgroundColor: theme === 'dark' ? '#111' : '#fff' }}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4" style={{ color: textColor }}>
          {language === 'zh' ? '截圖預覽' : 'Screenshot Preview'}
        </h2>
        <p className="text-center mb-12 opacity-60" style={{ color: subtextColor }}>
          {language === 'zh' 
            ? '了解 Knner 如何提升你的工作效率' 
            : 'See how Knner boosts your productivity'}
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
                className="aspect-video flex items-center justify-center"
                style={{ backgroundColor: theme === 'dark' ? '#1a1a1a' : '#f0f0f0' }}
              >
                <div className="text-center">
                  <screenshot.icon className="w-16 h-16 mx-auto mb-4 opacity-30" style={{ color: textColor }} />
                  <p className="text-sm opacity-50" style={{ color: subtextColor }}>
                    {screenshot.placeholder}
                  </p>
                  <p className="text-xs mt-2 opacity-30" style={{ color: subtextColor }}>
                    (Replace with actual screenshot)
                  </p>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium mb-1" style={{ color: textColor }}>
                  {language === 'zh' ? screenshot.title : screenshot.titleEn}
                </h3>
                <p className="text-sm opacity-60" style={{ color: subtextColor }}>
                  {language === 'zh' ? screenshot.desc : screenshot.descEn}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 rounded-lg text-center" style={{ 
          backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
        }}>
          <p className="text-sm" style={{ color: subtextColor }}>
            💡 {language === 'zh' 
              ? '截圖尺寸建議：1920x1080 (16:9)，可使用 Lightshot 或 Windows Snipping Tool'
              : 'Recommended screenshot size: 1920x1080 (16:9), use Lightshot or Windows Snipping Tool'}
          </p>
        </div>
      </div>
    </section>
  );
}
