import { useEffect, useRef, useState } from 'react';
import { TracingPaperCard } from '@/components/TracingPaperCard';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Mail, Send } from 'lucide-react';

export function Contact() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setEmail('');
      setMessage('');
    }, 3000);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url('/images/contact-${theme}.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      />

      {/* Overlay */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundColor: theme === 'dark' 
            ? 'rgba(0, 0, 0, 0.5)' 
            : 'rgba(255, 255, 255, 0.4)'
        }}
      />

      {/* Content */}
      <div 
        ref={cardRef}
        className="relative z-10 w-full px-4 opacity-0 translate-y-5 transition-all duration-700 ease-out"
      >
        <TracingPaperCard 
          rotation={-0.3} 
          width="90%"
          maxWidth="600px"
          position="center"
          className="max-w-xl"
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
            <Mail className="w-6 h-6" style={{ color: theme === 'dark' ? '#fff' : '#000' }} />
          </div>

          {/* Title */}
          <h2 
            className="text-2xl md:text-3xl font-medium mb-4 text-center"
            style={{ color: theme === 'dark' ? '#fff' : '#000' }}
          >
            {t('contact.title')}
          </h2>

          {/* Description */}
          <p 
            className="text-base leading-relaxed text-center mb-8"
            style={{ color: theme === 'dark' ? '#F0F0F0' : '#333' }}
          >
            {t('contact.desc')}
          </p>

          {/* Contact form */}
          <div className="space-y-4">
            <a
              href="mailto:jimfunghk@gmail.com?subject=Knner Feedback"
              className="w-full px-4 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.02]"
              style={{
                backgroundColor: theme === 'dark' 
                  ? 'rgba(255, 255, 255, 0.15)' 
                  : 'rgba(0, 0, 0, 0.1)',
                color: theme === 'dark' ? '#fff' : '#000',
                border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)'}`,
                textDecoration: 'none',
              }}
            >
              <Mail className="w-4 h-4" />
              jimfunghk@gmail.com
            </a>
          </div>
        </TracingPaperCard>
      </div>
    </section>
  );
}
