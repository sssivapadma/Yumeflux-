import React from 'react';
import { Anime, PageView } from '../types/anime';
import { HeroBanner } from '../components/HeroBanner';
import { ContinueWatchingSection } from '../components/ContinueWatchingSection';
import { RankingSection } from '../components/RankingCard';
import { AnimeCarousel } from '../components/AnimeCarousel';
import { AnimeCard } from '../components/AnimeCard';
import { GenreCard } from '../components/GenreCard';
import { TopRatedSection } from '../components/TopRatedSection';
import { DreamFinder } from '../components/DreamFinderModal';
import { GENRE_LIST } from '../data/animeData';
import { Sparkles, Compass, Flame, Star, Play, Check, Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

interface HomePageProps {
  allAnime: Anime[];
  onPlayAnime: (anime: Anime, episodeNum?: number) => void;
  onSelectAnime: (anime: Anime) => void;
  onNavigate: (page: PageView) => void;
  onSelectGenre: (genreId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  allAnime,
  onPlayAnime,
  onSelectAnime,
  onNavigate,
  onSelectGenre
}) => {
  const { continueWatching, isInWatchlist, toggleWatchlist } = useAuth();
  const { showToast } = useToast();

  const featuredAnime = allAnime.filter((a) => a.featuredInHero).slice(0, 5);
  const trendingAnime = allAnime.filter((a) => a.isTrending).sort((a, b) => (a.trendingRank || 99) - (b.trendingRank || 99));
  const popularAnime = [...allAnime].sort((a, b) => a.popularityRank - b.popularityRank);
  const recentlyAddedAnime = allAnime.filter((a) => a.isRecentlyAdded);
  const topRatedAnime = [...allAnime].sort((a, b) => b.rating - a.rating);

  // Section 8: Recommended for You ("Because you watched Jujutsu Kaisen")
  const primaryWatched = allAnime.find((a) => a.id === 'jujutsu-kaisen') || allAnime[0];
  const recommendedAnime = allAnime.filter((a) => primaryWatched.relatedAnimeIds?.includes(a.id)).slice(0, 4);

  return (
    <div className="min-h-screen bg-slate-950 dark:bg-slate-950 text-slate-100 pb-16 space-y-4">
      {/* SECTION 1 — CINEMATIC HERO */}
      <HeroBanner
        featuredAnime={featuredAnime}
        onPlayAnime={onPlayAnime}
        onSelectAnime={onSelectAnime}
      />

      {/* SECTION 2 — CONTINUE WATCHING */}
      <ContinueWatchingSection
        items={continueWatching}
        allAnime={allAnime}
        onResume={(anime, ep) => onPlayAnime(anime, ep)}
        onSelectAnime={onSelectAnime}
      />

      {/* SECTION 3 — TRENDING NOW */}
      <RankingSection
        animeList={trendingAnime}
        onPlayAnime={(anime) => onPlayAnime(anime)}
        onSelectAnime={onSelectAnime}
        onViewAll={() => onNavigate('trending')}
      />

      {/* SECTION 4 — POPULAR ANIME */}
      <section className="relative w-full py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 select-none">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-6 bg-gradient-to-b from-purple-500 to-cyan-400 rounded-full inline-block" />
              <h2 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
                Popular Anime
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5 ml-3.5">
              Top tracked streams by global viewers this month
            </p>
          </div>

          <button
            onClick={() => onNavigate('popular')}
            className="text-xs sm:text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            View All Popular →
          </button>
        </div>

        {/* Responsive Anime Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
          {popularAnime.slice(0, 10).map((anime) => (
            <AnimeCard
              key={anime.id}
              anime={anime}
              onPlay={onPlayAnime}
              onSelect={onSelectAnime}
            />
          ))}
        </div>
      </section>

      {/* SECTION 5 — RECENTLY ADDED */}
      <AnimeCarousel
        title="Recently Added & Updated"
        subtitle="Fresh episode drops and newly licensed seasons"
        animeList={recentlyAddedAnime}
        onPlayAnime={onPlayAnime}
        onSelectAnime={onSelectAnime}
        showNewBadge={true}
        onViewAll={() => onNavigate('browse')}
      />

      {/* SECTION 6 — BROWSE BY GENRE */}
      <section className="relative w-full py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 select-none">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-6 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full inline-block" />
              <h2 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
                Browse by Genre
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5 ml-3.5">
              Discover your taste across 14 specialized anime themes
            </p>
          </div>

          <button
            onClick={() => onNavigate('genres')}
            className="text-xs sm:text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            All Genres →
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
          {GENRE_LIST.map((genre) => (
            <GenreCard
              key={genre.id}
              id={genre.id}
              name={genre.name}
              count={genre.count}
              color={genre.color}
              description={genre.description}
              onClick={(id) => onSelectGenre(id)}
            />
          ))}
        </div>
      </section>

      {/* SECTION 7 — TOP RATED */}
      <TopRatedSection
        topAnime={topRatedAnime}
        onPlayAnime={onPlayAnime}
        onSelectAnime={onSelectAnime}
      />

      {/* SECTION 8 — RECOMMENDED FOR YOU */}
      <section className="relative w-full py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 select-none">
        <div className="mb-6">
          <span className="text-[11px] font-mono text-purple-400 uppercase tracking-widest font-semibold">
            Personalized Algorithm
          </span>
          <div className="flex items-center gap-2 mt-0.5">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
              Because you watched <span className="text-cyan-300">{primaryWatched.title}</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Dark supernatural stakes, high-level combat choreography, and transcendent animation
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {recommendedAnime.map((anime) => {
            const inWatchlist = isInWatchlist(anime.id);
            return (
              <div
                key={anime.id}
                onClick={() => onSelectAnime(anime)}
                className="group relative rounded-xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/50 p-3.5 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-950/30"
              >
                <div>
                  <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden bg-slate-950 mb-3">
                    <img
                      src={anime.bannerImage}
                      alt={anime.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-slate-950/30 group-hover:bg-slate-950/10 transition-colors" />

                    <div className="absolute top-2 right-2 flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-950/80 text-amber-300 text-[10px] font-bold">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      {anime.rating}
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                    {anime.title}
                  </h3>
                  <p className="text-[11px] text-purple-300 font-mono">
                    {anime.studio} • {anime.genres.slice(0, 2).join(', ')}
                  </p>

                  <div className="mt-2 p-2 rounded-lg bg-purple-950/30 border border-purple-500/20 text-[11px] text-slate-300">
                    <strong className="text-cyan-300 block text-[10px] font-semibold uppercase tracking-wider">
                      Why Recommended:
                    </strong>
                    Shared supernatural combat themes, intense psychological drama, and MAPPA/Ufotable studio pedigree.
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-3 mt-2 border-t border-slate-800/80">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onPlayAnime(anime);
                    }}
                    className="flex-1 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 hover:brightness-110"
                  >
                    <Play className="w-3 h-3 fill-white" />
                    <span>Watch Now</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const added = toggleWatchlist(anime.id);
                      showToast(
                        added ? `Added "${anime.title}" to Watchlist` : `Removed from Watchlist`,
                        added ? 'success' : 'info'
                      );
                    }}
                    className={`p-1.5 rounded-lg border transition-colors ${
                      inWatchlist ? 'bg-cyan-950/80 border-cyan-400 text-cyan-300' : 'bg-slate-800 border-slate-700 text-slate-400'
                    }`}
                    title={inWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
                  >
                    {inWatchlist ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 9 — "WHAT SHOULD I WATCH?" DREAM FINDER */}
      <DreamFinder
        allAnime={allAnime}
        onPlayAnime={onPlayAnime}
        onSelectAnime={onSelectAnime}
      />
    </div>
  );
};
