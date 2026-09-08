import React from 'react';
import { Sparkles, Sword, Compass, Laugh, Heart, Wand2, Rocket, Eye, Skull, Trophy, Coffee, Globe, ShieldAlert, Film, Flame } from 'lucide-react';

interface GenreCardProps {
  id: string;
  name: string;
  count: number;
  color: string;
  description?: string;
  onClick: (genreId: string) => void;
}

export const getGenreIcon = (genre: string) => {
  switch (genre.toLowerCase()) {
    case 'action':
      return <Sword className="w-5 h-5" />;
    case 'adventure':
      return <Compass className="w-5 h-5" />;
    case 'comedy':
      return <Laugh className="w-5 h-5" />;
    case 'romance':
      return <Heart className="w-5 h-5" />;
    case 'fantasy':
      return <Wand2 className="w-5 h-5" />;
    case 'sci-fi':
      return <Rocket className="w-5 h-5" />;
    case 'mystery':
      return <Eye className="w-5 h-5" />;
    case 'horror':
      return <Skull className="w-5 h-5" />;
    case 'sports':
      return <Trophy className="w-5 h-5" />;
    case 'slice of life':
      return <Coffee className="w-5 h-5" />;
    case 'isekai':
      return <Globe className="w-5 h-5" />;
    case 'thriller':
      return <ShieldAlert className="w-5 h-5" />;
    case 'drama':
      return <Film className="w-5 h-5" />;
    case 'supernatural':
      return <Flame className="w-5 h-5" />;
    default:
      return <Sparkles className="w-5 h-5" />;
  }
};

export const GenreCard: React.FC<GenreCardProps> = ({
  id,
  name,
  count,
  color,
  description,
  onClick
}) => {
  return (
    <div
      onClick={() => onClick(id)}
      className="group relative rounded-xl p-4 sm:p-5 overflow-hidden cursor-pointer border border-slate-800/80 hover:border-purple-500/50 bg-slate-900/60 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-950/30 flex flex-col justify-between min-h-[110px]"
    >
      {/* Background Gradient Splash */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${color} opacity-15 group-hover:opacity-30 transition-opacity duration-300`}
      />

      {/* Futuristic pattern accent */}
      <div className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full border border-white/5 group-hover:border-white/10 transition-colors pointer-events-none" />

      {/* Top row: Icon + Count */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 text-cyan-400 group-hover:text-white group-hover:bg-purple-600/80 group-hover:border-purple-400/50 transition-all">
          {getGenreIcon(name)}
        </div>
        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-950/60 text-slate-400 group-hover:text-cyan-300 border border-slate-800 transition-colors">
          {count} Titles
        </span>
      </div>

      {/* Bottom row: Name & Subtitle */}
      <div className="relative z-10 pt-3">
        <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
          {name}
        </h4>
        {description && (
          <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5 group-hover:text-slate-300">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};
