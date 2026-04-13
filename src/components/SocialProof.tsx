import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Star, Users, Shield, Zap } from 'lucide-react';

const testimonialKeys = ['testimonial1', 'testimonial2', 'testimonial3'];

export function SocialProof() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  
  const textColor = theme === 'dark' ? '#fff' : '#000';
  const subtextColor = theme === 'dark' ? '#E0E0E0' : '#555';

  return (
    <section className="py-20 px-4" style={{ backgroundColor: theme === 'dark' ? '#0a0a0a' : '#f8f9fa' }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <StatCard 
            icon={<Users className="w-6 h-6" />}
            value="10,000+"
            label={t('social.users')}
          />
          <StatCard 
            icon={<Zap className="w-6 h-6" />}
            value="100+"
            label={t('social.languages')}
          />
          <StatCard 
            icon={<Shield className="w-6 h-6" />}
            value="100%"
            label={t('social.offline')}
          />
          <StatCard 
            icon={<Star className="w-6 h-6" />}
            value="4.9"
            label={t('social.rating')}
          />
        </div>

        <h2 className="text-3xl font-bold text-center mb-12" style={{ color: textColor }}>
          {t('social.testimonials')}
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {testimonialKeys.map((key) => (
            <div 
              key={key}
              className="p-6 rounded-xl backdrop-blur"
              style={{ 
                backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
              }}
            >
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="mb-4 text-sm" style={{ color: subtextColor }}>
                "{t(`${key}.content`)}"
              </p>
              <div>
                <p className="font-medium" style={{ color: textColor }}>{t(`${key}.name`)}</p>
                <p className="text-xs opacity-60" style={{ color: subtextColor }}>{t(`${key}.role`)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-8 mt-12">
          <TrustBadge icon="🔒" text={t('social.localData')} />
          <TrustBadge icon="🚫" text={t('social.noCloud')} />
          <TrustBadge icon="🇭🇰" text={t('social.madeHK')} />
          <TrustBadge icon="💳" text={t('social.securePayment')} />
        </div>
      </div>
    </section>
  );
}

function StatCard({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  const { theme } = useTheme();
  return (
    <div className="text-center p-4 rounded-xl" style={{ 
      backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
    }}>
      <div className="flex justify-center mb-2 opacity-60">{icon}</div>
      <div className="text-2xl font-bold" style={{ color: theme === 'dark' ? '#fff' : '#000' }}>{value}</div>
      <div className="text-xs opacity-60" style={{ color: theme === 'dark' ? '#E0E0E0' : '#555' }}>{label}</div>
    </div>
  );
}

function TrustBadge({ icon, text }: { icon: string; text: string }) {
  const { theme } = useTheme();
  return (
    <div className="flex items-center gap-2 text-sm" style={{ color: theme === 'dark' ? '#E0E0E0' : '#555' }}>
      <span>{icon}</span>
      <span>{text}</span>
    </div>
  );
}