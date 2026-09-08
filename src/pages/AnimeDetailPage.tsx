import React, { useState } from 'react';
import { Anime } from '../types/anime';
import { AnimeCard } from '../components/AnimeCard';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import {
  Play,
  Plus,
  Check,
  Share2,
  Download,
  Star,
  Tv,
  Calendar,
  Layers,
  Sparkles,
  Clock,
  ArrowLeft,
  ChevronRight,
  Info
} from 'lucide-react';

interface AnimeDetailPageProps {
  anime: Anime;
  allAnime: Anime[];
  onPlayEpisode: (anime: Anime, episodeNum: number) => void;
  onSelectAnime: (anime: Anime) => void;
  onBack: () => void;
}

export const AnimeDetailPage: React.FC<AnimeDetailPageProps> = ({
  anime,
  allAnime,
  onPlayEpisode,
  onSelectAnime,
  onBack
}) => {
  const [activeTab, setActiveTab] = useState<'episodes' | 'characters' | 'details'>('episodes');
  const [selectedSeason, setSelectedSeason] = useState('Season 1');
  const { isInWatchlist, toggleWatchlist } = useAuth();
  const { showToast } = useToast();

  const inWatchlist = isInWatchlist(anime.id);

  const handleWatchlist = () => {
    const added = toggleWatchlist(anime.id);
    showToast(
      added ? `Added "${anime.title}" to your Watchlist` : `Removed "${anime.title}" from Watchlist`,
      added ? 'success' : 'info'
    );
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Anime stream link copied to clipboard!', 'success');
    } else {
      showToast('Share link: ' + anime.title, 'info');
    }
  };

  const handleDownload = () => {
    showToast(`Offline download simulation queued for "${anime.title} (1080p)"`, 'info');
  };

  const relatedAnime = allAnime.filter((a) => anime.relatedAnimeIds?.includes(a.id));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20 select-none">
      {/* Cinematic Banner Header with Back Button */}
      <div className="relative w-full h-[380px] sm:h-[460px] md:h-[540px] overflow-hidden">
        <img
          src={anime.bannerImage}
          alt={anime.title}
          className="w-full h-full object-cover object-center filter brightness-90"
          referrerPolicy="no-referrer"
        />

        {/* Multi-layered gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent" />

        {/* Floating Back Button */}
        <button
          onClick={onBack}
          className="absolute top-24 left-4 sm:left-8 z-30 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 backdrop-blur-md text-xs font-semibold transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
      </div>

      {/* Main Container Overlapping Header */}
      <div className="relative -mt-44 sm:-mt-56 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Left Column: Poster & Quick Specs */}
          <div className="w-48 sm:w-60 md:w-72 shrink-0 mx-auto md:mx-0">
            <div className="rounded-2xl overflow-hidden border-2 border-purple-500/40 shadow-2xl shadow-purple-950/70 aspect-[2/3] bg-slate-900">
              <img
                src={anime.posterImage}
                alt={anime.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Quick Specs Card */}
            <div className="mt-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-2.5">
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Studio</span>
                <span className="text-cyan-300 font-semibold">{anime.studio}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Status</span>
                <span className="text-emerald-400 font-semibold">{anime.status}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Episodes</span>
                <span className="text-white font-semibold">{anime.episodesCount} ({anime.duration})</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Season</span>
                <span className="text-white font-semibold">{anime.season} {anime.year}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Format / Audio</span>
                <span className="text-purple-300 font-semibold">{anime.type} • {anime.subDub}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Quality</span>
                <span className="text-cyan-400 font-mono font-bold">1080p Ultra HD</span>
              </div>
            </div>
          </div>

          {/* Right Column: Title, Metadata, Actions, Synopsis */}
          <div className="flex-1 space-y-5">
            {/* Tag Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-purple-950/80 text-purple-300 border border-purple-500/40 text-xs font-bold">
                {anime.type}
              </span>
              <span className="px-2.5 py-1 rounded-md bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 text-xs font-bold">
                {anime.subDub}
              </span>
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-extrabold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {anime.rating} / 10
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Rank #{anime.popularityRank} Most Popular
              </span>
            </div>

            {/* Titles */}
            <div>
              <h1 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight leading-tight">
                {anime.title}
              </h1>
              <p className="text-sm sm:text-base text-cyan-300 font-mono mt-1">
                {anime.japaneseTitle} • <span className="text-slate-400">{anime.romajiTitle}</span>
              </p>
            </div>

            {/* Genres Chips */}
            <div className="flex flex-wrap gap-2 pt-1">
              {anime.genres.map((g) => (
                <span
                  key={g}
                  className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-300 font-medium"
                >
                  {g}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onPlayEpisode(anime, 1)}
                className="py-3 px-6 rounded-xl bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-purple-950/50 flex items-center gap-2 hover:brightness-110 active:scale-95 transition-all"
              >
                <Play className="w-5 h-5 fill-white" />
                <span>Watch Episode 1</span>
              </button>

              <button
                onClick={handleWatchlist}
                className={`py-3 px-5 rounded-xl border text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                  inWatchlist
                    ? 'bg-cyan-950/80 border-cyan-400 text-cyan-300'
                    : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-slate-200'
                }`}
              >
                {inWatchlist ? (
                  <>
                    <Check className="w-4 h-4 text-cyan-400" />
                    <span>In Watchlist</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Add to Watchlist</span>
                  </>
                )}
              </button>

              <button
                onClick={handleShare}
                className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-colors"
                title="Share stream"
              >
                <Share2 className="w-4 h-4" />
              </button>

              <button
                onClick={handleDownload}
                className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-colors"
                title="Download offline"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>

            {/* Synopsis */}
            <div className="pt-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2 font-mono">
                Synopsis
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
                {anime.synopsis}
              </p>
            </div>
          </div>
        </div>

        {/* Content Navigation Tabs: Episodes | Characters | Details */}
        <div className="mt-12 border-b border-slate-800 flex items-center gap-8 text-sm font-bold">
          <button
            onClick={() => setActiveTab('episodes')}
            className={`pb-3 transition-colors relative ${
              activeTab === 'episodes'
                ? 'text-cyan-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>Episodes ({anime.episodes.length})</span>
            {activeTab === 'episodes' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-400" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('characters')}
            className={`pb-3 transition-colors relative ${
              activeTab === 'characters'
                ? 'text-cyan-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>Characters ({anime.characters?.length || 0})</span>
            {activeTab === 'characters' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-400" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('details')}
            className={`pb-3 transition-colors relative ${
              activeTab === 'details'
                ? 'text-cyan-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>Production & Lore</span>
            {activeTab === 'details' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-400" />
            )}
          </button>
        </div>

        {/* Tab Content */}
        <div className="py-6">
          {/* TAB 1: EPISODES */}
          {activeTab === 'episodes' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <select
                    value={selectedSeason}
                    onChange={(e) => setSelectedSeason(e.target.value)}
                    className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-bold text-slate-200 outline-none focus:border-cyan-400"
                  >
                    <option value="Season 1">Season 1 (Episodes 1 - {anime.episodes.length})</option>
                  </select>
                </div>
                <span className="text-xs text-slate-400">
                  Full HD 1080p • Japanese & English Audio
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {anime.episodes.map((ep) => (
                  <div
                    key={ep.id}
                    onClick={() => onPlayEpisode(anime, ep.number)}
                    className="group relative rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-purple-500/50 p-3 flex flex-col justify-between cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-slate-950 mb-2.5">
                      <img
                        src={ep.thumbnail}
                        alt={ep.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-slate-950/30 group-hover:bg-slate-950/10 flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white flex items-center justify-center opacity-90 group-hover:opacity-100 group-hover:scale-110 shadow-lg transition-all">
                          <Play className="w-4 h-4 fill-white ml-0.5" />
                        </div>
                      </div>

                      <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-white text-[10px] font-mono">
                        {ep.duration}
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-[11px] text-purple-400 font-mono">
                        <span>Episode {ep.number}</span>
                        <span className="text-slate-500">{ep.airDate}</span>
                      </div>
                      <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1 mt-0.5">
                        {ep.title}
                      </h4>
                      <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                        {ep.synopsis}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: CHARACTERS */}
          {activeTab === 'characters' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {anime.characters?.map((char) => (
                <div
                  key={char.id}
                  className="rounded-xl bg-slate-900/60 border border-slate-800 p-3 text-center group hover:border-cyan-500/40 transition-colors"
                >
                  <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full overflow-hidden mb-2.5 border-2 border-purple-500/30 group-hover:border-cyan-400 transition-colors shadow-md">
                    <img
                      src={char.image}
                      alt={char.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                    {char.name}
                  </h4>
                  <p className="text-[10px] text-purple-300 font-mono truncate">
                    {char.japaneseName}
                  </p>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[9px] font-semibold bg-slate-800 text-slate-300">
                    {char.role}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: DETAILS */}
          {activeTab === 'details' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-2xl bg-slate-900/40 border border-slate-800">
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                  Production Information
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Produced under the creative direction of <strong>{anime.studio}</strong>. Officially licensed for high-bitrate streaming on Yumeflux with multi-track Dolby sound and master color profiles.
                </p>
                <div className="space-y-1.5 text-xs text-slate-400">
                  <p>• <strong>Premiered:</strong> {anime.season} {anime.year}</p>
                  <p>• <strong>Broadcast:</strong> Weekly on Yumeflux FastTrack</p>
                  <p>• <strong>Rating Classification:</strong> PG-13 / TV-MA (Varies by episode)</p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                  Community Consensus
                </h4>
                <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/30 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300">Critic Score</span>
                    <span className="text-amber-400 font-bold">{anime.rating} / 10</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300">Popularity Standing</span>
                    <span className="text-cyan-400 font-bold">Top {anime.popularityRank} Globally</span>
                  </div>
                  <p className="text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
                    "{anime.description}"
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Related / Recommended Anime Section */}
        {relatedAnime.length > 0 && (
          <div className="mt-12 pt-8 border-t border-slate-800">
            <h3 className="text-xl font-display font-bold text-white mb-4">
              More Like This
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
              {relatedAnime.map((rel) => (
                <AnimeCard
                  key={rel.id}
                  anime={rel}
                  onPlay={(a) => onPlayEpisode(a, 1)}
                  onSelect={onSelectAnime}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
