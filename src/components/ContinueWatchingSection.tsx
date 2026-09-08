import React, { useRef } from 'react';
import { ContinueWatchingItem, Anime } from '../types/anime';
import { Play, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

interface ContinueWatchingSectionProps {
  items: ContinueWatchingItem[];
  allAnime: Anime[];
  onResume: (anime: Anime, episodeNum: number) => void;
  onSelectAnime: (anime: Anime) => void;
}

export const ContinueWatchingSection: React.FC<ContinueWatchingSectionProps> = ({
  items,
  allAnime,
  onResume,
  onSelectAnime
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!items || items.length === 0) return null;

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.75;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const getAnimeObj = (animeId: string): Anime | undefined => {
    return allAnime.find((a) => a.id === animeId);
  };

  return (
    <section className="relative w-full py-6 select-none">
      {/* Section Header */}
      <div className="flex items-end justify-between mb-4 px-4 sm:px-6 lg:px-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full inline-block" />
            Continue Watching
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5 ml-3.5">
            Pick up right where you left off in your dream stream
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            className="p-1.5 sm:p-2 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-cyan-500/40 transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-1.5 sm:p-2 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-cyan-500/40 transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>

      {/* Horizontal Cards */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto no-scrollbar px-4 sm:px-6 lg:px-8 pb-3 scroll-smooth"
      >
        {items.map((item) => {
          const anime = getAnimeObj(item.animeId);
          return (
            <div
              key={item.animeId}
              onClick={() => anime && onSelectAnime(anime)}
              className="w-[280px] sm:w-[320px] md:w-[340px] shrink-0 group rounded-xl bg-slate-900/80 dark:bg-slate-900/80 light:bg-white border border-slate-800 hover:border-cyan-500/50 p-3 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-950/20"
            >
              <div className="flex gap-3">
                {/* Poster Thumbnail */}
                <div className="relative w-20 sm:w-24 aspect-[2/3] rounded-lg overflow-hidden shrink-0 bg-slate-950">
                  <img
                    src={item.posterImage}
                    alt={item.animeTitle}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-slate-950/30 group-hover:bg-slate-950/10 transition-colors flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-cyan-500/80 group-hover:bg-cyan-400 text-slate-950 flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                      <Play className="w-4 h-4 fill-slate-950 ml-0.5" />
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="flex flex-col justify-between flex-1 py-1">
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                      {item.animeTitle}
                    </h4>
                    <p className="text-xs font-semibold text-purple-400 mt-1">
                      Episode {item.currentEpisode}
                    </p>
                    <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                      {item.episodeTitle}
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-2">
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-cyan-400" />
                        {item.remainingMinutes}m remaining
                      </span>
                      <span>{item.progressPercent}%</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 rounded-full"
                        style={{ width: `${item.progressPercent}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Resume Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (anime) onResume(anime, item.currentEpisode);
                }}
                className="mt-3 w-full py-2 px-3 rounded-lg bg-slate-800/80 hover:bg-gradient-to-r hover:from-purple-600 hover:to-cyan-600 text-slate-200 hover:text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Continue Episode {item.currentEpisode}</span>
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};
