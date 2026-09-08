import React, { useState } from 'react';
import { Anime } from '../types/anime';
import { RankingSection } from '../components/RankingCard';
import { AnimeCard } from '../components/AnimeCard';
import { Flame, Calendar, Clock, Sparkles } from 'lucide-react';

interface TrendingPageProps {
  allAnime: Anime[];
  onPlayAnime: (anime: Anime) => void;
  onSelectAnime: (anime: Anime) => void;
}

export const TrendingPage: React.FC<TrendingPageProps> = ({
  allAnime,
  onPlayAnime,
  onSelectAnime
}) => {
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'allTime'>('daily');

  const getRankedList = () => {
    if (timeframe === 'daily') {
      return allAnime.filter((a) => a.isTrending).sort((a, b) => (a.trendingRank || 99) - (b.trendingRank || 99));
    } else if (timeframe === 'weekly') {
      return [...allAnime].sort((a, b) => b.rating - a.rating);
    } else {
      return [...allAnime].sort((a, b) => a.popularityRank - b.popularityRank);
    }
  };

  const rankedList = getRankedList();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto select-none space-y-8">
      {/* Header & Timeframe Tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30">
              <Flame className="w-5 h-5 text-purple-400" />
            </span>
            <h1 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight">
              Trending Leaderboards
            </h1>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Real-time viral streams, social mentions, and community binge metrics
          </p>
        </div>

        {/* Timeframe selector */}
        <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-xl self-start md:self-auto">
          <button
            onClick={() => setTimeframe('daily')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              timeframe === 'daily'
                ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Today</span>
          </button>
          <button
            onClick={() => setTimeframe('weekly')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              timeframe === 'weekly'
                ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>This Week</span>
          </button>
          <button
            onClick={() => setTimeframe('allTime')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              timeframe === 'allTime'
                ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>All-Time</span>
          </button>
        </div>
      </div>

      {/* Top 10 Dominance Carousel with large numbers */}
      <RankingSection
        animeList={rankedList}
        onPlayAnime={onPlayAnime}
        onSelectAnime={onSelectAnime}
      />

      {/* Complete Ranked Grid */}
      <div className="pt-6 border-t border-slate-800">
        <h2 className="text-xl font-display font-bold text-white mb-6 flex items-center gap-2">
          <span>Complete Trending Roster</span>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-cyan-400">
            {rankedList.length} Ranked
          </span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
          {rankedList.map((anime, index) => (
            <AnimeCard
              key={anime.id}
              anime={anime}
              rankingNumber={index + 1}
              onPlay={onPlayAnime}
              onSelect={onSelectAnime}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
