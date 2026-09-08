import React, { useState } from 'react';
import { Anime } from '../types/anime';
import { Play, Info, Star, Plus, Check, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

interface AnimeCardProps {
  anime: Anime;
  onPlay: (anime: Anime) => void;
  onSelect: (anime: Anime) => void;
  showNewBadge?: boolean;
  size?: 'sm' | 'md' | 'lg';
  rankingNumber?: number;
}

export const AnimeCard: React.FC<AnimeCardProps> = ({
  anime,
  onPlay,
  onSelect,
  showNewBadge = false,
  size = 'md',
  rankingNumber
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { isInWatchlist, toggleWatchlist } = useAuth();
  const { showToast } = useToast();

  const inWatchlist = isInWatchlist(anime.id);

  const handleToggleWatchlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    const added = toggleWatchlist(anime.id);
    showToast(
      added ? `Added "${anime.title}" to Watchlist` : `Removed "${anime.title}" from Watchlist`,
      added ? 'success' : 'info'
    );
  };

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onPlay(anime);
  };

  const handleSelectClick = () => {
    onSelect(anime);
  };

  return (
    <div
      onClick={handleSelectClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col rounded-xl bg-slate-900/60 dark:bg-slate-900/70 light:bg-white border border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 overflow-hidden cursor-pointer transition-all duration-300 transform hover:-translate-y-1.5 hover:shadow-xl hover:shadow-purple-950/30 hover:border-purple-500/50"
    >
      {/* Poster Image Area */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-950">
        <img
          src={anime.posterImage}
          alt={anime.title}
          loading="lazy"
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-108"
          referrerPolicy="no-referrer"
        />

        {/* Subtle base vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-1.5">
            {showNewBadge && (
              <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-950/50">
                NEW
              </span>
            )}
            <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-slate-900/80 text-purple-300 border border-purple-500/30 backdrop-blur-md">
              {anime.subDub}
            </span>
          </div>

          <span className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[11px] font-bold bg-slate-900/90 text-amber-300 border border-amber-500/30 backdrop-blur-md">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            {anime.rating}
          </span>
        </div>

        {/* Ranking number (if provided for trending or popular rankings) */}
        {rankingNumber !== undefined && (
          <div className="absolute -bottom-6 -left-3 font-display font-black text-6xl lg:text-7xl text-slate-800/80 group-hover:text-purple-500/40 transition-colors pointer-events-none select-none tracking-tighter drop-shadow-md">
            {rankingNumber.toString().padStart(2, '0')}
          </div>
        )}

        {/* Hover Overlay with Action Buttons */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-purple-950/40 p-4 flex flex-col justify-end gap-3 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="space-y-1">
            <p className="text-[11px] font-mono text-cyan-300 truncate">
              {anime.japaneseTitle}
            </p>
            <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
              {anime.description}
            </p>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handlePlayClick}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 text-white font-semibold text-xs shadow-md shadow-purple-950/60 hover:brightness-110 active:scale-95 transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Watch Now</span>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleSelectClick();
              }}
              className="p-2 rounded-lg bg-slate-800/90 text-slate-200 hover:text-white border border-slate-700 hover:border-slate-500 transition-colors"
              title="More Info"
            >
              <Info className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleToggleWatchlist}
              className={`p-2 rounded-lg border transition-colors ${
                inWatchlist
                  ? 'bg-cyan-950/80 border-cyan-500 text-cyan-300'
                  : 'bg-slate-800/90 border-slate-700 text-slate-300 hover:text-white hover:border-slate-500'
              }`}
              title={inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
            >
              {inWatchlist ? <Check className="w-3.5 h-3.5 text-cyan-400" /> : <Plus className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Card Info Area */}
      <div className="p-3.5 flex flex-col flex-1 justify-between gap-2">
        <div>
          <h3 className="text-sm font-bold text-slate-100 dark:text-slate-100 light:text-slate-900 group-hover:text-cyan-300 transition-colors line-clamp-1">
            {anime.title}
          </h3>
          <p className="text-[11px] text-slate-400 dark:text-slate-400 light:text-slate-500 flex items-center gap-1.5 mt-0.5">
            <span>{anime.year}</span>
            <span>•</span>
            <span>{anime.episodesCount} Eps</span>
            <span>•</span>
            <span className="truncate">{anime.genres[0]}</span>
          </p>
        </div>

        <div className="flex items-center justify-between pt-1 border-t border-slate-800/60 dark:border-slate-800/60 light:border-slate-100 text-[10px]">
          <span className="text-purple-400/90 dark:text-purple-300 font-medium">
            {anime.studio}
          </span>
          <span className="text-emerald-400 font-medium">
            {anime.status}
          </span>
        </div>
      </div>
    </div>
  );
};
