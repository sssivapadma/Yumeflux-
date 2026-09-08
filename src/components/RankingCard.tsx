import React, { useRef } from 'react';
import { Anime } from '../types/anime';
import { Star, Play, Info, Flame, ChevronLeft, ChevronRight } from 'lucide-react';

interface RankingSectionProps {
  animeList: Anime[];
  onPlayAnime: (anime: Anime) => void;
  onSelectAnime: (anime: Anime) => void;
  onViewAll?: () => void;
}

export const RankingSection: React.FC<RankingSectionProps> = ({
  animeList,
  onPlayAnime,
  onSelectAnime,
  onViewAll
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
    <section className="relative w-full py-8 select-none overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-end justify-between mb-6 px-4 sm:px-6 lg:px-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-purple-500/20 text-purple-400 border border-purple-500/30">
              <Flame className="w-4 h-4 text-purple-400" />
            </span>
            <h2 className="text-xl sm:text-3xl font-display font-black text-white tracking-tight">
              Trending Top 10
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            The most streamed anime dreams lighting up the platform today
          </p>
        </div>

        <div className="flex items-center gap-2">
          {onViewAll && (
            <button
              onClick={onViewAll}
              className="text-xs sm:text-sm font-semibold text-cyan-400 hover:text-cyan-300 mr-2 transition-colors"
            >
              Full Rankings →
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

      {/* Horizontal Scroll Track with layered ranking typography */}
      <div
        ref={scrollRef}
        className="flex gap-8 sm:gap-12 overflow-x-auto no-scrollbar px-6 sm:px-10 lg:px-12 pb-6 pt-3 scroll-smooth"
      >
        {animeList.slice(0, 10).map((anime, index) => {
          const rankNumber = (index + 1).toString().padStart(2, '0');
          return (
            <div
              key={anime.id}
              onClick={() => onSelectAnime(anime)}
              className="relative flex items-center shrink-0 group cursor-pointer"
            >
              {/* Giant Cinematic Number layered behind poster */}
              <div
                className="font-display font-black text-8xl sm:text-9xl lg:text-[11rem] leading-none select-none tracking-tighter text-slate-800/80 dark:text-slate-800/90 group-hover:text-purple-500/30 transition-colors duration-300 transform -mr-8 sm:-mr-12 z-0 font-mono drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
                style={{
                  WebkitTextStroke: '2px rgba(168, 85, 247, 0.25)'
                }}
              >
                {rankNumber}
              </div>

              {/* Poster Card */}
              <div className="relative z-10 w-[160px] sm:w-[190px] md:w-[210px] rounded-xl overflow-hidden bg-slate-900 border border-slate-800 group-hover:border-purple-500/60 shadow-xl group-hover:shadow-purple-950/40 transition-all duration-300 transform group-hover:-translate-y-2">
                <div className="aspect-[2/3] w-full relative">
                  <img
                    src={anime.posterImage}
                    alt={anime.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                  {/* Rating badge */}
                  <div className="absolute top-2 right-2 flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-950/80 text-amber-300 border border-amber-500/30 text-[11px] font-bold backdrop-blur-md">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    {anime.rating}
                  </div>

                  {/* Hover Actions */}
                  <div className="absolute inset-0 bg-slate-950/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3 gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onPlayAnime(anime);
                      }}
                      className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md hover:brightness-110"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>Watch Now</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectAnime(anime);
                      }}
                      className="w-full py-1.5 rounded-lg bg-slate-800 text-slate-200 hover:text-white font-semibold text-xs flex items-center justify-center gap-1 border border-slate-700"
                    >
                      <Info className="w-3.5 h-3.5" />
                      <span>Details</span>
                    </button>
                  </div>
                </div>

                <div className="p-3">
                  <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                    {anime.title}
                  </h3>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
                    <span>{anime.year}</span>
                    <span className="text-purple-400 font-medium truncate max-w-[90px]">
                      {anime.genres[0]}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
