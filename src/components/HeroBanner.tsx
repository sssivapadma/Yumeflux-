import React, { useState, useEffect } from 'react';
import { Anime } from '../types/anime';
import { Play, Info, Star, Plus, Check, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

interface HeroBannerProps {
  featuredAnime: Anime[];
  onPlayAnime: (anime: Anime, episodeNum?: number) => void;
  onSelectAnime: (anime: Anime) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  featuredAnime,
  onPlayAnime,
  onSelectAnime
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const { isInWatchlist, toggleWatchlist } = useAuth();
  const { showToast } = useToast();

  const currentAnime = featuredAnime[currentIndex] || featuredAnime[0];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredAnime.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [featuredAnime.length]);

  if (!currentAnime) return null;

  const inWatchlist = isInWatchlist(currentAnime.id);

  const handleToggleWatchlist = () => {
    const added = toggleWatchlist(currentAnime.id);
    showToast(
      added ? `Added "${currentAnime.title}" to Watchlist` : `Removed "${currentAnime.title}" from Watchlist`,
      added ? 'success' : 'info'
    );
  };

  return (
    <section className="relative w-full min-h-[85vh] lg:min-h-[92vh] flex items-end pb-16 pt-24 overflow-hidden select-none">
      {/* Background Banner with layered gradient overlays */}
      <div className="absolute inset-0 z-0">
        <img
          key={currentAnime.id}
          src={currentAnime.bannerImage}
          alt={currentAnime.title}
          className="w-full h-full object-cover object-center transform scale-105 transition-all duration-1000 animate-in fade-in zoom-in-95"
          referrerPolicy="no-referrer"
        />

        {/* Cinematic atmospheric overlays: deep bottom gradient, side vignettes, subtle purple-blue glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent max-w-4xl" />
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-950/40 via-transparent to-cyan-950/30 mix-blend-screen pointer-events-none" />
      </div>

      {/* Hero Content Box */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl lg:max-w-3xl space-y-4 sm:space-y-5">
          {/* Top metadata badge row */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm">
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 font-semibold tracking-wide shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              # {currentIndex + 1} Spotlight
            </span>

            <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              {currentAnime.rating}
            </span>

            <span className="px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700 font-medium">
              {currentAnime.year}
            </span>

            <span className="px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700 font-medium">
              {currentAnime.episodesCount} Eps
            </span>

            <span className="px-2 py-0.5 rounded-md bg-purple-900/60 text-purple-300 border border-purple-500/40 font-semibold">
              {currentAnime.subDub}
            </span>

            <span className="px-2 py-0.5 rounded-md bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 font-medium">
              {currentAnime.status}
            </span>
          </div>

          {/* Titles: English + Japanese */}
          <div>
            <div className="flex items-baseline gap-3">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-white tracking-tight leading-tight drop-shadow-md">
                {currentAnime.title}
              </h1>
            </div>
            <p className="text-sm sm:text-lg text-purple-300/80 font-medium tracking-wide mt-1 font-mono">
              {currentAnime.japaneseTitle} • {currentAnime.romajiTitle}
            </p>
          </div>

          {/* Tagline or Description */}
          <p className="text-sm sm:text-base text-slate-300 line-clamp-3 leading-relaxed max-w-2xl drop-shadow">
            {currentAnime.heroTagline || currentAnime.description}
          </p>

          {/* Genre Badges */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-1">
            {currentAnime.genres.map((genre) => (
              <span
                key={genre}
                className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-900/80 text-slate-300 border border-slate-700/80 hover:border-purple-400/50 hover:text-white transition-colors"
              >
                {genre}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
            <button
              onClick={() => onPlayAnime(currentAnime, 1)}
              className="flex items-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-bold text-sm sm:text-base shadow-lg shadow-purple-950/50 hover:shadow-cyan-900/40 border border-white/20 transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              <Play className="w-5 h-5 fill-white" />
              <span>Watch Now</span>
            </button>

            <button
              onClick={() => onSelectAnime(currentAnime)}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-100 font-semibold text-sm sm:text-base border border-slate-700 hover:border-slate-500 backdrop-blur-md transition-all duration-200"
            >
              <Info className="w-5 h-5 text-cyan-400" />
              <span>More Info</span>
            </button>

            <button
              onClick={handleToggleWatchlist}
              className={`p-3 rounded-xl border transition-all duration-200 ${
                inWatchlist
                  ? 'bg-cyan-950/60 border-cyan-400 text-cyan-300'
                  : 'bg-slate-900/70 border-slate-700 text-slate-300 hover:text-white hover:border-slate-500'
              }`}
              title={inWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
              aria-label="Toggle Watchlist"
            >
              {inWatchlist ? <Check className="w-5 h-5 text-cyan-400" /> : <Plus className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setIsMuted(!isMuted)}
              className="hidden sm:flex p-3 rounded-xl bg-slate-900/70 border border-slate-800 text-slate-400 hover:text-white transition-colors"
              title={isMuted ? 'Muted Preview' : 'Unmuted Preview'}
              aria-label="Audio preview toggle"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5 text-cyan-400" />}
            </button>
          </div>
        </div>

        {/* Carousel Indicators / Thumbnails Navigation */}
        <div className="flex items-center justify-between pt-8 sm:pt-10 border-t border-slate-800/40 mt-8">
          <div className="flex items-center gap-2">
            {featuredAnime.map((anime, idx) => (
              <button
                key={anime.id}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 transition-all duration-300 rounded-full ${
                  currentIndex === idx
                    ? 'w-8 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)]'
                    : 'w-2.5 bg-slate-700 hover:bg-slate-500'
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Quick next/prev title preview */}
          <div className="hidden sm:flex items-center gap-3">
            <span className="text-xs text-slate-400">
              Next Up: <strong className="text-slate-200">{featuredAnime[(currentIndex + 1) % featuredAnime.length]?.title}</strong>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
