import React from 'react';

interface LogoProps {
  className?: string;
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = '', showTagline = true, size = 'md' }) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Custom Anime-inspired Emblem: Crescent dream moon + celestial star sparkle + orbital flux ring */}
      <div className={`relative flex items-center justify-center ${iconSizes[size]} shrink-0`}>
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-600 via-blue-500 to-cyan-400 rounded-xl blur-[6px] opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
        
        <div className="relative w-full h-full rounded-xl bg-slate-950 border border-purple-500/40 flex items-center justify-center overflow-hidden shadow-inner">
          {/* Subtle Japanese Kana watermark 'ユメ' (Yume) */}
          <span className="absolute text-[8px] font-mono tracking-widest text-purple-400/20 select-none top-0.5 right-1">
            夢
          </span>

          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4/5 h-4/5">
            {/* Celestial Dream Crescent Moon */}
            <path
              d="M20 6C13.373 6 8 11.373 8 18C8 24.627 13.373 30 20 30C22.1 30 24.06 29.46 25.77 28.52C21.43 27.25 18.25 23.27 18.25 18.5C18.25 13.73 21.43 9.75 25.77 8.48C24.06 7.54 22.1 6 20 6Z"
              fill="url(#moonGrad)"
            />
            {/* Flowing Energy Flux Arcs */}
            <path
              d="M25 12C28.314 12 31 14.686 31 18C31 21.314 28.314 24 25 24"
              stroke="url(#arcGrad)"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeDasharray="1 2"
            />
            {/* Central Anime Dream Star */}
            <path
              d="M24 18L26 21L29 21.5L26.8 23.5L27.5 26.5L24 24.5L20.5 26.5L21.2 23.5L19 21.5L22 21L24 18Z"
              fill="#38bdf8"
            />
            <circle cx="24" cy="18" r="1.5" fill="#ffffff" />

            <defs>
              <linearGradient id="moonGrad" x1="8" y1="6" x2="30" y2="30" gradientUnits="userSpaceOnUse">
                <stop stopColor="#a855f7" />
                <stop offset="0.5" stopColor="#6366f1" />
                <stop offset="1" stopColor="#06b6d4" />
              </linearGradient>
              <linearGradient id="arcGrad" x1="25" y1="12" x2="31" y2="24" gradientUnits="userSpaceOnUse">
                <stop stopColor="#38bdf8" />
                <stop offset="1" stopColor="#c084fc" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Typography with Japanese aesthetic touch and modern readability */}
      <div className="flex flex-col leading-none">
        <div className="flex items-center gap-1.5">
          <span className={`font-display font-extrabold tracking-tight ${textSizes[size]} bg-gradient-to-r from-white via-slate-100 to-purple-200 dark:from-white dark:via-slate-100 dark:to-cyan-200 bg-clip-text text-transparent`}>
            Yume<span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">flux</span>
          </span>
          <span className="text-[10px] font-semibold tracking-wider text-purple-400/90 dark:text-cyan-400/90 border border-purple-500/30 rounded px-1 py-0.2 uppercase">
            夢
          </span>
        </div>
        {showTagline && (
          <span className="text-[9px] font-medium tracking-widest text-slate-400 dark:text-slate-400 uppercase mt-0.5">
            Stream your dreams
          </span>
        )}
      </div>
    </div>
  );
};
