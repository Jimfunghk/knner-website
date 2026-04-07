import { useTheme } from '@/contexts/ThemeContext';

interface TracingPaperCardProps {
  children: React.ReactNode;
  className?: string;
  rotation?: number;
  width?: string;
  maxWidth?: string;
  position?: 'left' | 'center' | 'right';
}

export function TracingPaperCard({ 
  children, 
  className = '', 
  rotation = 0,
  width = 'auto',
  maxWidth = 'none',
  position = 'center'
}: TracingPaperCardProps) {
  const { theme } = useTheme();

  const positionClasses = {
    left: 'ml-8 md:ml-16 lg:ml-24 mr-auto',
    center: 'mx-auto',
    right: 'mr-8 md:mr-16 lg:mr-24 ml-auto'
  };

  return (
    <div 
      className={`
        relative
        ${positionClasses[position]}
        ${className}
      `}
      style={{ 
        width,
        maxWidth,
        transform: `rotate(${rotation}deg)`,
        transition: 'all 500ms ease-out'
      }}
    >
      {/* Main card with real paper texture */}
      <div 
        className={`
          relative
          rounded-sm
          p-8 md:p-12 lg:p-16
          backdrop-blur-sm
          transition-all duration-300 ease-out
          hover:backdrop-blur-md
          group
        `}
        style={{
          backgroundImage: `url('/images/paper-${theme}.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: theme === 'dark' ? 0.85 : 0.75,
        }}
      >
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </div>

      {/* Hover effect - return to 0 rotation */}
      <style>{`
        .group:hover {
          transform: rotate(0deg) translateY(-4px) !important;
        }
      `}</style>
    </div>
  );
}
