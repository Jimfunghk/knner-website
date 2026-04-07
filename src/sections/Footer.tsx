import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mic } from 'lucide-react';

export function Footer() {
  const { theme } = useTheme();
  const { t } = useLanguage();

  return (
    <footer 
      className="py-12 px-4"
      style={{
        backgroundColor: theme === 'dark' ? '#000' : '#fff',
        borderTop: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
      }}
    >
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div 
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{
              backgroundColor: theme === 'dark' 
                ? 'rgba(255, 255, 255, 0.1)' 
                : 'rgba(0, 0, 0, 0.08)'
            }}
          >
            <Mic className="w-4 h-4" style={{ color: theme === 'dark' ? '#fff' : '#000' }} />
          </div>
          <span 
            className="font-medium"
            style={{ color: theme === 'dark' ? '#fff' : '#000' }}
          >
            Knner
          </span>
        </div>

        {/* Copyright */}
        <div 
          className="text-sm text-center"
          style={{ color: theme === 'dark' ? '#aaa' : '#666' }}
        >
          {t('footer.copyright')} • {t('footer.tagline')}
        </div>

        {/* Links */}
        <div className="flex items-center gap-4">
          <a 
            href="#" 
            className="text-sm transition-opacity hover:opacity-70"
            style={{ color: theme === 'dark' ? '#aaa' : '#666' }}
          >
            GitHub
          </a>
          <a 
            href="#" 
            className="text-sm transition-opacity hover:opacity-70"
            style={{ color: theme === 'dark' ? '#aaa' : '#666' }}
          >
            Twitter
          </a>
        </div>
      </div>
    </footer>
  );
}
