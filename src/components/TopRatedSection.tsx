import React from 'react';
import { Anime } from '../types/anime';
import { Star, Play, Award, TrendingUp, Sparkles, Check, Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

interface TopRatedSectionProps {
  topAnime: Anime[];
  onPlayAnime: (anime: Anime) => void;
  onSelectAnime: (anime: Anime) => void;
}

export const TopRatedSection: React.FC<TopRatedSectionProps> = ({
  topAnime,
  onPlayAnime,
  onSelectAnime
}) => {
  const { isInWatchlist, toggleWatchlist } = useAuth();
  const { showToast } = useToast();

  const handleWatchlist = (e: React.MouseEvent, anime: Anime) => {
    e.stopPropagation();
    const added = toggleWatchlist(anime.id);
    showToast(
      added ? `Added "${anime.title}" to Watchlist` : `Removed "${anime.title}" from Watchlist`,
      added ? 'success' : 'info'
    );
  };

  return (
    <section className="relative w-full py-8 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-md bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <Award className="w-4 h-4 text-amber-400" />
              </span>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
                Top Rated Hall of Fame
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Critically acclaimed anime classics and modern generational masterpieces
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-cyan-400" /> Verified Critic & Community Consensus
            </span>
          </div>
        </div>

        {/* Top 6 Ranked Grid/List Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topAnime.slice(0, 6).map((anime, index) => {
            const inWatchlist = isInWatchlist(anime.id);
            const rank = index + 1;
            return (
              <div
                key={anime.id}
                onClick={() => onSelectAnime(anime)}
                className="group relative flex gap-3.5 p-3 rounded-xl bg-slate-900/70 border border-slate-800/90 hover:border-purple-500/50 hover:bg-slate-900/95 transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-950/20"
              >
                {/* Rank Badge */}
                <div className="absolute -top-2 -left-2 w-7 h-7 rounded-full bg-gradient-to-tr from-purple-600 to-cyan-400 text-white font-display font-black text-xs flex items-center justify-center shadow-lg border border-slate-950">
                  #{rank}
                </div>

                {/* Poster */}
                <div className="relative w-24 aspect-[2/3] rounded-lg overflow-hidden shrink-0 bg-slate-950">
                  <img
                    src={anime.posterImage}
                    alt={anime.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onPlayAnime(anime);
                      }}
                      className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white flex items-center justify-center shadow-lg"
                    >
                      <Play className="w-4 h-4 fill-white ml-0.5" />
                    </button>
                  </div>
                </div>

                {/* Info & Metrics */}
                <div className="flex flex-col justify-between flex-1 py-0.5">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-purple-400 uppercase tracking-wide">
                        {anime.studio}
                      </span>
                      <div className="flex items-center gap-1 text-amber-300 text-xs font-black">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        {anime.rating}
                      </div>
                    </div>

                    <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1 mt-0.5">
                      {anime.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                      {anime.japaneseTitle}
                    </p>
                  </div>

                  {/* Score Bar & Popularity */}
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>{anime.year} • {anime.episodesCount} eps</span>
                      <span className="text-cyan-400 font-semibold">{anime.matchScore || 95}% Approval</span>
                    </div>

                    {/* Progress score bar */}
                    <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 rounded-full"
                        style={{ width: `${(anime.rating / 10) * 100}%` }}
                      />
                    </div>

                    {/* Quick action row */}
                    <div className="flex items-center justify-between pt-1 border-t border-slate-800/50">
                      <span className="text-[10px] text-slate-400 px-1.5 py-0.5 rounded bg-slate-800/80">
                        {anime.genres[0]}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => handleWatchlist(e, anime)}
                          className={`p-1 rounded text-xs transition-colors ${
                            inWatchlist
                              ? 'text-cyan-400'
                              : 'text-slate-400 hover:text-white'
                          }`}
                          title={inWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
                        >
                          {inWatchlist ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onPlayAnime(anime);
                          }}
                          className="text-[11px] font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                        >
                          Watch <Play className="w-3 h-3 fill-current" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
