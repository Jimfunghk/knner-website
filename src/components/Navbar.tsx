import { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage, type Language } from '@/contexts/LanguageContext';
import { Mic, Sun, Moon, Globe, Menu, X } from 'lucide-react';

const languages: { code: Language; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'zh', label: '中文' },
  { code: 'ja', label: 'JP' },
  { code: 'es', label: 'ES' },
  { code: 'fr', label: 'FR' },
  { code: 'de', label: 'DE' },
  { code: 'pt', label: 'PT' },
  { code: 'ru', label: 'RU' },
  { code: 'it', label: 'IT' },
  { code: 'ko', label: 'KO' },
];

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-500 ease-out
        ${scrolled ? 'py-3' : 'py-4'}
      `}
      style={{
        backgroundColor: scrolled 
          ? theme === 'dark' 
            ? 'rgba(0, 0, 0, 0.8)' 
            : 'rgba(255, 255, 255, 0.8)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled 
          ? `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`
          : 'none',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <a 
          href="#" 
          className="flex items-center gap-2"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
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
            className="font-medium text-lg"
            style={{ color: theme === 'dark' ? '#fff' : '#000' }}
          >
            Knner
          </span>
        </a>

        {/* Desktop controls */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language selector */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300"
              style={{
                backgroundColor: theme === 'dark' 
                  ? 'rgba(255, 255, 255, 0.08)' 
                  : 'rgba(0, 0, 0, 0.05)',
                color: theme === 'dark' ? '#fff' : '#000',
              }}
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm">{languages.find(l => l.code === language)?.label}</span>
            </button>

            {/* Language dropdown */}
            {showLangMenu && (
              <div 
                className="absolute top-full right-0 mt-2 py-2 rounded-lg min-w-[120px]"
                style={{
                  backgroundColor: theme === 'dark' 
                    ? 'rgba(0, 0, 0, 0.95)' 
                    : 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(12px)',
                  border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
                }}
              >
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setShowLangMenu(false);
                    }}
                    className={`
                      w-full px-4 py-2 text-left text-sm transition-all duration-200
                      ${language === lang.code ? 'font-medium' : 'opacity-70 hover:opacity-100'}
                    `}
                    style={{ color: theme === 'dark' ? '#fff' : '#000' }}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg transition-all duration-300"
            style={{
              backgroundColor: theme === 'dark' 
                ? 'rgba(255, 255, 255, 0.08)' 
                : 'rgba(0, 0, 0, 0.05)',
              color: theme === 'dark' ? '#fff' : '#000',
            }}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg"
          style={{
            backgroundColor: theme === 'dark' 
              ? 'rgba(255, 255, 255, 0.08)' 
              : 'rgba(0, 0, 0, 0.05)',
            color: theme === 'dark' ? '#fff' : '#000',
          }}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden mt-4 px-4 pb-4"
          style={{
            backgroundColor: theme === 'dark' 
              ? 'rgba(0, 0, 0, 0.95)' 
              : 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(12px)',
          }}
        >
          {/* Language grid */}
          <div className="grid grid-cols-5 gap-2 mb-4">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setMobileMenuOpen(false);
                }}
                className={`
                  p-2 rounded-lg text-sm transition-all duration-200
                  ${language === lang.code ? 'font-medium' : 'opacity-70'}
                `}
                style={{
                  backgroundColor: language === lang.code
                    ? theme === 'dark' 
                      ? 'rgba(255, 255, 255, 0.15)' 
                      : 'rgba(0, 0, 0, 0.1)'
                    : theme === 'dark' 
                      ? 'rgba(255, 255, 255, 0.05)' 
                      : 'rgba(0, 0, 0, 0.03)',
                  color: theme === 'dark' ? '#fff' : '#000',
                }}
              >
                {lang.label}
              </button>
            ))}
          </div>

          {/* Theme toggle */}
          <button
            onClick={() => {
              toggleTheme();
              setMobileMenuOpen(false);
            }}
            className="w-full flex items-center justify-center gap-2 p-3 rounded-lg"
            style={{
              backgroundColor: theme === 'dark' 
                ? 'rgba(255, 255, 255, 0.08)' 
                : 'rgba(0, 0, 0, 0.05)',
              color: theme === 'dark' ? '#fff' : '#000',
            }}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            <span className="text-sm">
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </span>
          </button>
        </div>
      )}
    </nav>
  );
}
