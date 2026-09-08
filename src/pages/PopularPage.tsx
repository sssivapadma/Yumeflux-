import React, { useState } from 'react';
import { Anime } from '../types/anime';
import { AnimeCard } from '../components/AnimeCard';
import { TrendingUp, Award, Flame, Star, Sparkles } from 'lucide-react';

interface PopularPageProps {
  allAnime: Anime[];
  onPlayAnime: (anime: Anime) => void;
  onSelectAnime: (anime: Anime) => void;
}

export const PopularPage: React.FC<PopularPageProps> = ({
  allAnime,
  onPlayAnime,
  onSelectAnime
}) => {
  const [filterTab, setFilterTab] = useState<'all' | 'season' | 'legendary'>('all');

  const popularAnime = [...allAnime].sort((a, b) => a.popularityRank - b.popularityRank);

  const displayedAnime = popularAnime.filter((a) => {
    if (filterTab === 'season') return a.year >= 2023;
    if (filterTab === 'legendary') return a.rating >= 8.9;
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto select-none space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-400/30">
              <TrendingUp className="w-5 h-5 text-cyan-400" />
            </span>
            <h1 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight">
              Most Popular Anime
            </h1>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            The definitive global favorites with millions of streams across Yumeflux
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-xl self-start md:self-auto">
          <button
            onClick={() => setFilterTab('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterTab === 'all'
                ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All-Time Popular
          </button>
          <button
            onClick={() => setFilterTab('season')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterTab === 'season'
                ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Top This Season
          </button>
          <button
            onClick={() => setFilterTab('legendary')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterTab === 'legendary'
                ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Masterpiece Tier (8.9+)
          </button>
        </div>
      </div>

      {/* Hero Spotlight on #1 Popular Anime */}
      {popularAnime[0] && (
        <div
          onClick={() => onSelectAnime(popularAnime[0])}
          className="relative rounded-2xl overflow-hidden border border-purple-500/40 p-6 sm:p-8 bg-slate-900 cursor-pointer group shadow-2xl shadow-purple-950/30"
        >
          <img
            src={popularAnime[0].bannerImage}
            alt={popularAnime[0].title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 opacity-30 group-hover:opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />

          <div className="relative z-10 max-w-2xl space-y-3">
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 inline-flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 fill-slate-950" /> #1 Most Popular Worldwide
            </span>

            <h2 className="text-2xl sm:text-4xl font-display font-black text-white group-hover:text-cyan-300 transition-colors">
              {popularAnime[0].title}
            </h2>
            <p className="text-xs sm:text-sm text-purple-300 font-mono">
              {popularAnime[0].japaneseTitle} • {popularAnime[0].studio}
            </p>
            <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed">
              {popularAnime[0].synopsis}
            </p>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onPlayAnime(popularAnime[0]);
                }}
                className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 text-white font-bold text-xs shadow-lg hover:brightness-110"
              >
                Stream Now
              </button>
              <span className="text-xs text-amber-300 font-bold flex items-center gap-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                {popularAnime[0].rating} Rating
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
        {displayedAnime.map((anime) => (
          <AnimeCard
            key={anime.id}
            anime={anime}
            onPlay={onPlayAnime}
            onSelect={onSelectAnime}
          />
        ))}
      </div>
    </div>
  );
};
