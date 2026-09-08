import React, { useState, useMemo, useEffect } from 'react';
import { Anime } from '../types/anime';
import { Search, X, Star, Play, History, Filter, ArrowRight, User } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  allAnime: Anime[];
  onPlayAnime: (anime: Anime) => void;
  onSelectAnime: (anime: Anime) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  allAnime,
  onPlayAnime,
  onSelectAnime
}) => {
  const [query, setQuery] = useState('');
  const [selectedGenreFilter, setSelectedGenreFilter] = useState<string>('All');
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'Jujutsu Kaisen', 'Frieren', 'MAPPA', 'Demon Slayer'
  ]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // toggle search handled elsewhere
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();

    return allAnime.filter((anime) => {
      const matchTitle = anime.title.toLowerCase().includes(q);
      const matchJap = anime.japaneseTitle.toLowerCase().includes(q);
      const matchRomaji = anime.romajiTitle.toLowerCase().includes(q);
      const matchStudio = anime.studio.toLowerCase().includes(q);
      const matchGenre = anime.genres.some((g) => g.toLowerCase().includes(q));
      const matchChar = anime.characters?.some((c) => c.name.toLowerCase().includes(q) || c.japaneseName.includes(q));

      const matchesQuery = matchTitle || matchJap || matchRomaji || matchStudio || matchGenre || matchChar;
      const matchesGenre = selectedGenreFilter === 'All' || anime.genres.includes(selectedGenreFilter);

      return matchesQuery && matchesGenre;
    });
  }, [query, allAnime, selectedGenreFilter]);

  // Extract matching characters
  const matchingCharacters = useMemo(() => {
    if (!query.trim() || query.length < 2) return [];
    const q = query.toLowerCase().trim();
    const chars: { anime: Anime; name: string; japaneseName: string; role: string; image: string }[] = [];

    allAnime.forEach((a) => {
      a.characters?.forEach((c) => {
        if (c.name.toLowerCase().includes(q) || c.japaneseName.includes(q)) {
          chars.push({
            anime: a,
            name: c.name,
            japaneseName: c.japaneseName,
            role: c.role,
            image: c.image
          });
        }
      });
    });

    return chars.slice(0, 4);
  }, [query, allAnime]);

  const handleRecentClick = (term: string) => {
    setQuery(term);
  };

  const handleSelectAnime = (anime: Anime) => {
    // Add to recent searches if not present
    if (!recentSearches.includes(anime.title)) {
      setRecentSearches((prev) => [anime.title, ...prev.slice(0, 5)]);
    }
    onSelectAnime(anime);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl rounded-2xl bg-slate-900 border border-purple-500/30 shadow-2xl shadow-purple-950/50 overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-800 bg-slate-950/60">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search anime titles, characters, studios, or genres..."
            className="w-full bg-transparent text-slate-100 placeholder:text-slate-500 text-sm sm:text-base outline-none font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-white rounded-md transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-1 text-xs font-mono text-slate-400 hover:text-slate-200 bg-slate-800/80 rounded border border-slate-700"
          >
            ESC
          </button>
        </div>

        {/* Filter chips when searching */}
        {query && (
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-950/40 border-b border-slate-800/60 overflow-x-auto no-scrollbar text-xs">
            <span className="text-slate-400 flex items-center gap-1 shrink-0">
              <Filter className="w-3 h-3 text-cyan-400" /> Filter:
            </span>
            {['All', 'Action', 'Fantasy', 'Sci-Fi', 'Comedy', 'Drama', 'Supernatural'].map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenreFilter(genre)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors shrink-0 ${
                  selectedGenreFilter === genre
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'bg-slate-800/60 text-slate-400 hover:text-white'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        )}

        {/* Results Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          {/* If no query, show recent searches and popular shortcuts */}
          {!query.trim() && (
            <div className="space-y-6 py-2">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                  <History className="w-3.5 h-3.5 text-purple-400" /> Recent Searches
                </p>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => handleRecentClick(term)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800/60 hover:bg-purple-950/50 hover:border-purple-500/40 border border-slate-800 text-xs text-slate-300 hover:text-white transition-all"
                    >
                      <span>{term}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                  Popular Anime Discoveries
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {allAnime.slice(0, 4).map((anime) => (
                    <div
                      key={anime.id}
                      onClick={() => handleSelectAnime(anime)}
                      className="flex items-center gap-3 p-2 rounded-xl bg-slate-800/40 hover:bg-slate-800/80 border border-slate-800/60 hover:border-cyan-500/40 cursor-pointer transition-all"
                    >
                      <img
                        src={anime.posterImage}
                        alt={anime.title}
                        className="w-10 h-14 object-cover rounded-lg shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-white truncate">{anime.title}</p>
                        <p className="text-[11px] text-slate-400 truncate">{anime.genres.join(', ')}</p>
                        <span className="text-[10px] text-amber-400 font-semibold flex items-center gap-0.5 mt-0.5">
                          ★ {anime.rating}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-500 pr-1" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* If query has matches */}
          {query.trim() && (
            <>
              {/* Character Matches */}
              {matchingCharacters.length > 0 && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-cyan-300 mb-2 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-cyan-400" /> Matching Characters
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {matchingCharacters.map((c, i) => (
                      <div
                        key={i}
                        onClick={() => handleSelectAnime(c.anime)}
                        className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-800/50 hover:bg-purple-950/40 border border-slate-800 hover:border-purple-500/40 cursor-pointer transition-colors"
                      >
                        <img
                          src={c.image}
                          alt={c.name}
                          className="w-9 h-9 rounded-full object-cover border border-cyan-400/30"
                          referrerPolicy="no-referrer"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-white truncate">{c.name}</p>
                          <p className="text-[10px] text-slate-400 truncate">
                            {c.japaneseName} • from <strong className="text-slate-300">{c.anime.title}</strong>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Anime Matches */}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-purple-300 mb-2">
                  Matching Anime ({searchResults.length})
                </p>

                {searchResults.length === 0 ? (
                  <div className="py-12 text-center">
                    <p className="text-sm font-semibold text-slate-300">
                      No anime found for "{query}"
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Try searching by Japanese title, studio (like MAPPA, Ufotable), or genre.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {searchResults.map((anime) => (
                      <div
                        key={anime.id}
                        onClick={() => handleSelectAnime(anime)}
                        className="group flex items-center justify-between gap-3 p-2.5 rounded-xl bg-slate-800/40 hover:bg-slate-800/90 border border-slate-800/80 hover:border-cyan-500/40 cursor-pointer transition-all"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={anime.posterImage}
                            alt={anime.title}
                            className="w-12 h-16 object-cover rounded-lg shrink-0 shadow"
                            referrerPolicy="no-referrer"
                          />
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                                {anime.title}
                              </h4>
                              <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-950 text-purple-300 border border-purple-500/30">
                                {anime.subDub}
                              </span>
                            </div>
                            <p className="text-xs text-slate-400 font-mono truncate">
                              {anime.japaneseTitle} • {anime.studio}
                            </p>
                            <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1">
                              <span className="text-amber-400 font-bold flex items-center gap-0.5">
                                <Star className="w-3 h-3 fill-amber-400" />
                                {anime.rating}
                              </span>
                              <span>•</span>
                              <span>{anime.year}</span>
                              <span>•</span>
                              <span>{anime.episodesCount} Eps</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onPlayAnime(anime);
                              onClose();
                            }}
                            className="p-2 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 text-white hover:brightness-110"
                            title="Watch Now"
                          >
                            <Play className="w-4 h-4 fill-white" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
