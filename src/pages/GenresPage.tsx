import React, { useState } from 'react';
import { Anime } from '../types/anime';
import { GENRE_LIST } from '../data/animeData';
import { GenreCard } from '../components/GenreCard';
import { AnimeCard } from '../components/AnimeCard';
import { Sparkles, Layers } from 'lucide-react';

interface GenresPageProps {
  allAnime: Anime[];
  onPlayAnime: (anime: Anime) => void;
  onSelectAnime: (anime: Anime) => void;
  selectedGenreId?: string | null;
}

export const GenresPage: React.FC<GenresPageProps> = ({
  allAnime,
  onPlayAnime,
  onSelectAnime,
  selectedGenreId: initialGenreId
}) => {
  const [activeGenre, setActiveGenre] = useState<string>(initialGenreId || 'Action');

  const activeGenreData = GENRE_LIST.find((g) => g.id === activeGenre) || GENRE_LIST[0];

  const animeInGenre = allAnime.filter((a) =>
    a.genres.some((g) => g.toLowerCase() === activeGenre.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto select-none space-y-10">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-8 bg-gradient-to-b from-purple-500 via-blue-500 to-cyan-400 rounded-full" />
          <h1 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight">
            Browse All Genres
          </h1>
        </div>
        <p className="text-sm text-slate-400 mt-1 ml-5">
          Select any theme below to filter curated anime collections and top picks
        </p>
      </div>

      {/* Genre Grid Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
        {GENRE_LIST.map((genre) => {
          const isSelected = activeGenre.toLowerCase() === genre.id.toLowerCase();
          return (
            <div
              key={genre.id}
              className={`rounded-xl transition-all ${
                isSelected ? 'ring-2 ring-cyan-400 ring-offset-2 ring-offset-slate-950 scale-102' : ''
              }`}
            >
              <GenreCard
                id={genre.id}
                name={genre.name}
                count={genre.count}
                color={genre.color}
                description={genre.description}
                onClick={(id) => setActiveGenre(id)}
              />
            </div>
          );
        })}
      </div>

      {/* Active Genre Showcase */}
      <div className="pt-6 border-t border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
              Active Selection
            </span>
            <h2 className="text-2xl font-display font-bold text-white tracking-tight flex items-center gap-2 mt-0.5">
              <span>{activeGenreData.name} Anime</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-sans font-normal">
                {animeInGenre.length} Titles Available
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              {activeGenreData.description}
            </p>
          </div>
        </div>

        {/* Anime in active genre */}
        {animeInGenre.length === 0 ? (
          <div className="py-16 text-center text-slate-500 rounded-2xl border border-dashed border-slate-800">
            No titles cataloged in this genre yet. Check back next season!
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
            {animeInGenre.map((anime) => (
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
    </div>
  );
};
