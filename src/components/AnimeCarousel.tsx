import React, { useRef } from 'react';
import { Anime } from '../types/anime';
import { AnimeCard } from './AnimeCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface AnimeCarouselProps {
  title: string;
  subtitle?: string;
  animeList: Anime[];
  onPlayAnime: (anime: Anime) => void;
  onSelectAnime: (anime: Anime) => void;
  onViewAll?: () => void;
  showNewBadge?: boolean;
}

export const AnimeCarousel: React.FC<AnimeCarouselProps> = ({
  title,
  subtitle,
  animeList,
  onPlayAnime,
  onSelectAnime,
  onViewAll,
  showNewBadge = false
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.75;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative w-full py-5 select-none">
      {/* Section Header */}
      <div className="flex items-end justify-between mb-4 px-4 sm:px-6 lg:px-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-gradient-to-b from-purple-500 to-cyan-400 rounded-full inline-block" />
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5 ml-3.5">
              {subtitle}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          {onViewAll && (
            <button
              onClick={onViewAll}
              className="text-xs sm:text-sm font-semibold text-cyan-400 hover:text-cyan-300 mr-2 transition-colors"
            >
              Explore All →
            </button>
          )}

          <button
            onClick={() => scroll('left')}
            className="p-1.5 sm:p-2 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-purple-500/40 transition-colors"
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

      {/* Horizontal Carousel Track */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto no-scrollbar px-4 sm:px-6 lg:px-8 pb-4 scroll-smooth"
      >
        {animeList.map((anime) => (
          <div
            key={anime.id}
            className="w-[180px] sm:w-[210px] md:w-[230px] shrink-0"
          >
            <AnimeCard
              anime={anime}
              onPlay={onPlayAnime}
              onSelect={onSelectAnime}
              showNewBadge={showNewBadge}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
