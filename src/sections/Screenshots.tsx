import { useTheme } from '@/contexts/ThemeContext';

const screenshots = [
  {
    image: '/images/talk.png',
    zhTitle: '100%離線運作',
    zhDesc: '100%離線運作，無需網絡、無需訂閱，所有語音與文字留存本地，私隱絕對保障。',
    enTitle: '100% Offline Operation',
    enDesc: '100% offline operation, no network needed, all data stored locally, absolute privacy',
  },
  {
    image: '/images/setting.png',
    zhTitle: '個人化視覺體驗',
    zhDesc: '完全個人化的視覺體驗，15款背景主題配合透明度調節，打造專屬你的工作美學。',
    enTitle: 'Personalized Visual Experience',
    enDesc: 'Fully personalized visual experience, 15 background themes with transparency adjustment',
  },
  {
    image: '/images/desk.png',
    zhTitle: '極簡浮窗設計',
    zhDesc: '極簡浮窗設計，無干擾的書寫介面，讓你專注思緒流動，沉浸式創作不受打擾。',
    enTitle: 'Minimalist Floating Window',
    enDesc: 'Minimalist floating window design, distraction-free writing interface, focus on your thoughts',
  },
  {
    image: '/images/welcome.png',
    zhTitle: '100+語言支援',
    zhDesc: '支援100+語言，智能偵測地區推薦最適語言，為你的聲音度身訂造精準轉寫。',
    enTitle: '100+ Language Support',
    enDesc: 'Supports 100+ languages, smart region detection for optimal language settings',
  },
];

export function Screenshots() {
  const { theme } = useTheme();
  
  const textColor = theme === 'dark' ? '#fff' : '#000';
  const subtextColor = theme === 'dark' ? '#E0E0E0' : '#555';

  return (
    <section className="py-20 px-4" style={{ backgroundColor: theme === 'dark' ? '#111' : '#fff' }}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4" style={{ color: textColor }}>
          Screenshots
        </h2>
        <p className="text-center mb-12 opacity-60" style={{ color: subtextColor }}>
          See KnotWhisper in action
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
                  alt={screenshot.enTitle}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium mb-1" style={{ color: textColor }}>
                  {screenshot.zhTitle}
                </h3>
                <p className="text-sm opacity-60 mb-2" style={{ color: subtextColor }}>
                  {screenshot.zhDesc}
                </p>
                <p className="text-sm opacity-60" style={{ color: subtextColor }}>
                  {screenshot.enDesc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}