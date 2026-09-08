import React, { useState, useMemo } from 'react';
import { Anime } from '../types/anime';
import { AnimeCard } from '../components/AnimeCard';
import { GENRE_LIST } from '../data/animeData';
import { Search, Filter, SlidersHorizontal, RotateCcw, Sparkles } from 'lucide-react';

interface BrowsePageProps {
  allAnime: Anime[];
  onPlayAnime: (anime: Anime) => void;
  onSelectAnime: (anime: Anime) => void;
  initialGenre?: string | null;
}

export const BrowsePage: React.FC<BrowsePageProps> = ({
  allAnime,
  onPlayAnime,
  onSelectAnime,
  initialGenre
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>(initialGenre || 'All');
  const [selectedYear, setSelectedYear] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedSubDub, setSelectedSubDub] = useState<string>('All');
  const [selectedStudio, setSelectedStudio] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'Popular' | 'Rating' | 'Newest' | 'A-Z'>('Popular');

  const studios = useMemo(() => {
    const list = Array.from(new Set(allAnime.map((a) => a.studio.split('/')[0].trim())));
    return ['All', ...list];
  }, [allAnime]);

  const years = ['All', '2024', '2023', '2022', '2021', '2020', 'Classic (Pre-2020)'];

  const filteredAnime = useMemo(() => {
    return allAnime
      .filter((anime) => {
        // Query search
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = anime.title.toLowerCase().includes(q);
          const matchJap = anime.japaneseTitle.toLowerCase().includes(q);
          if (!matchTitle && !matchJap) return false;
        }

        // Genre filter
        if (selectedGenre !== 'All' && !anime.genres.includes(selectedGenre)) {
          return false;
        }

        // Year filter
        if (selectedYear !== 'All') {
          if (selectedYear === 'Classic (Pre-2020)' && anime.year >= 2020) return false;
          if (selectedYear !== 'Classic (Pre-2020)' && anime.year.toString() !== selectedYear) return false;
        }

        // Status filter
        if (selectedStatus !== 'All' && anime.status !== selectedStatus) {
          return false;
        }

        // Type filter
        if (selectedType !== 'All' && anime.type !== selectedType) {
          return false;
        }

        // Sub/Dub filter
        if (selectedSubDub !== 'All' && anime.subDub !== selectedSubDub) {
          return false;
        }

        // Studio filter
        if (selectedStudio !== 'All' && !anime.studio.includes(selectedStudio)) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'Popular') return a.popularityRank - b.popularityRank;
        if (sortBy === 'Rating') return b.rating - a.rating;
        if (sortBy === 'Newest') return b.year - a.year;
        if (sortBy === 'A-Z') return a.title.localeCompare(b.title);
        return 0;
      });
  }, [
    allAnime,
    searchQuery,
    selectedGenre,
    selectedYear,
    selectedStatus,
    selectedType,
    selectedSubDub,
    selectedStudio,
    sortBy
  ]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedGenre('All');
    setSelectedYear('All');
    setSelectedStatus('All');
    setSelectedType('All');
    setSelectedSubDub('All');
    setSelectedStudio('All');
    setSortBy('Popular');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto select-none">
      {/* Page Title & Search Bar */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight flex items-center gap-3">
          <span className="w-2 h-8 bg-gradient-to-b from-purple-500 via-blue-500 to-cyan-400 rounded-full" />
          Browse Anime Library
        </h1>
        <p className="text-sm text-slate-400 mt-1 ml-5">
          Filter through our complete catalog of high-definition anime series and movies
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, Japanese name..."
              className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-cyan-400 text-sm text-white outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-200 outline-none focus:border-purple-400 cursor-pointer"
            >
              <option value="Popular">Sort: Most Popular</option>
              <option value="Rating">Sort: Top Rated</option>
              <option value="Newest">Sort: Release Year</option>
              <option value="A-Z">Sort: A-Z Alphabetical</option>
            </select>

            <button
              onClick={resetFilters}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-600 transition-colors"
              title="Reset all filters"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Comprehensive Filter Panel */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/70 border border-slate-800/90 mb-8 space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-300">
          <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
          <span>Advanced Filter Controls</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          {/* Genre */}
          <div>
            <label className="text-[11px] text-slate-400 block mb-1 font-medium">Genre</label>
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 outline-none focus:border-purple-400"
            >
              <option value="All">All Genres</option>
              {GENRE_LIST.map((g) => (
                <option key={g.id} value={g.id}>{g.name}</option>
              ))}
            </select>
          </div>

          {/* Year */}
          <div>
            <label className="text-[11px] text-slate-400 block mb-1 font-medium">Release Year</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 outline-none focus:border-purple-400"
            >
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="text-[11px] text-slate-400 block mb-1 font-medium">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 outline-none focus:border-purple-400"
            >
              <option value="All">All Statuses</option>
              <option value="Airing">Currently Airing</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Type */}
          <div>
            <label className="text-[11px] text-slate-400 block mb-1 font-medium">Format</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 outline-none focus:border-purple-400"
            >
              <option value="All">All Formats</option>
              <option value="TV Series">TV Series</option>
              <option value="Movie">Movie</option>
            </select>
          </div>

          {/* Sub / Dub */}
          <div>
            <label className="text-[11px] text-slate-400 block mb-1 font-medium">Audio / Sub</label>
            <select
              value={selectedSubDub}
              onChange={(e) => setSelectedSubDub(e.target.value)}
              className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 outline-none focus:border-purple-400"
            >
              <option value="All">Any Audio</option>
              <option value="SUB & DUB">Sub & Dub</option>
              <option value="SUB ONLY">Sub Only</option>
            </select>
          </div>

          {/* Studio */}
          <div>
            <label className="text-[11px] text-slate-400 block mb-1 font-medium">Animation Studio</label>
            <select
              value={selectedStudio}
              onChange={(e) => setSelectedStudio(e.target.value)}
              className="w-full p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 outline-none focus:border-purple-400"
            >
              {studios.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Result Meta */}
      <div className="flex items-center justify-between mb-6 text-xs text-slate-400">
        <span>
          Showing <strong className="text-white">{filteredAnime.length}</strong> anime titles
          {selectedGenre !== 'All' && <span> in <strong className="text-cyan-400">{selectedGenre}</strong></span>}
        </span>
      </div>

      {/* Grid of Results */}
      {filteredAnime.length === 0 ? (
        <div className="py-20 text-center rounded-2xl border border-dashed border-slate-800 p-8">
          <p className="text-base font-bold text-slate-300">No matching anime found</p>
          <p className="text-xs text-slate-500 mt-1 mb-4">
            Try adjusting your active filters or clear them to view the full catalog.
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 rounded-xl bg-purple-600 text-white text-xs font-semibold"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
          {filteredAnime.map((anime) => (
            <AnimeCard
              key={anime.id}
              anime={anime}
              onPlay={onPlayAnime}
              onSelect={onSelectAnime}
            />
          ))}
        </div>
      )}
    </div>
  );
};
