import React, { useState, useEffect } from 'react';
import { Anime, PageView } from './types/anime';
import { MOCK_ANIME_DATABASE, GENRE_LIST } from './data/animeData';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider, useToast } from './context/ToastContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { AuthModal } from './components/AuthModal';
import { DreamFinder } from './components/DreamFinderModal';

// Pages
import { HomePage } from './pages/HomePage';
import { BrowsePage } from './pages/BrowsePage';
import { GenresPage } from './pages/GenresPage';
import { TrendingPage } from './pages/TrendingPage';
import { PopularPage } from './pages/PopularPage';
import { AnimeDetailPage } from './pages/AnimeDetailPage';
import { ProfilePage } from './pages/ProfilePage';

const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedAnime, setSelectedAnime] = useState<Anime>(MOCK_ANIME_DATABASE[0]);
  const [playingAnime, setPlayingAnime] = useState<Anime | null>(null);
  const [currentEpisodeNum, setCurrentEpisodeNum] = useState<number>(1);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDreamFinderOpen, setIsDreamFinderOpen] = useState(false);
  const [selectedGenreFilter, setSelectedGenreFilter] = useState<string | null>(null);

  const { setIsAuthModalOpen, setAuthModalMode } = useAuth();
  const { showToast } = useToast();

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Keyboard shortcut: Cmd/Ctrl + K for quick search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigate = (page: PageView) => {
    setCurrentPage(page);
  };

  const handleSelectAnime = (anime: Anime) => {
    setSelectedAnime(anime);
    setCurrentPage('details');
  };

  const handlePlayAnime = (anime: Anime, episodeNum: number = 1) => {
    setPlayingAnime(anime);
    setCurrentEpisodeNum(episodeNum);
    setIsPlayerOpen(true);
  };

  const handleSelectGenre = (genreId: string) => {
    setSelectedGenreFilter(genreId);
    setCurrentPage('genres');
  };

  const handleOpenAuth = (mode: 'login' | 'signup') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-purple-500 selection:text-white">
      {/* Persistent Navigation Bar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenDreamFinder={() => setIsDreamFinderOpen(true)}
        onOpenAuth={handleOpenAuth}
      />

      {/* Main Page View Router */}
      <main className="flex-1 w-full">
        {currentPage === 'home' && (
          <HomePage
            allAnime={MOCK_ANIME_DATABASE}
            onPlayAnime={handlePlayAnime}
            onSelectAnime={handleSelectAnime}
            onNavigate={handleNavigate}
            onSelectGenre={handleSelectGenre}
          />
        )}

        {currentPage === 'browse' && (
          <BrowsePage
            allAnime={MOCK_ANIME_DATABASE}
            onPlayAnime={handlePlayAnime}
            onSelectAnime={handleSelectAnime}
            initialGenre={selectedGenreFilter}
          />
        )}

        {currentPage === 'genres' && (
          <GenresPage
            allAnime={MOCK_ANIME_DATABASE}
            onPlayAnime={handlePlayAnime}
            onSelectAnime={handleSelectAnime}
            selectedGenreId={selectedGenreFilter}
          />
        )}

        {currentPage === 'trending' && (
          <TrendingPage
            allAnime={MOCK_ANIME_DATABASE}
            onPlayAnime={handlePlayAnime}
            onSelectAnime={handleSelectAnime}
          />
        )}

        {currentPage === 'popular' && (
          <PopularPage
            allAnime={MOCK_ANIME_DATABASE}
            onPlayAnime={handlePlayAnime}
            onSelectAnime={handleSelectAnime}
          />
        )}

        {currentPage === 'details' && selectedAnime && (
          <AnimeDetailPage
            anime={selectedAnime}
            allAnime={MOCK_ANIME_DATABASE}
            onPlayEpisode={(anime, epNum) => handlePlayAnime(anime, epNum)}
            onSelectAnime={handleSelectAnime}
            onBack={() => handleNavigate('home')}
          />
        )}

        {currentPage === 'profile' && (
          <ProfilePage
            allAnime={MOCK_ANIME_DATABASE}
            onPlayAnime={handlePlayAnime}
            onSelectAnime={handleSelectAnime}
          />
        )}
      </main>

      {/* Persistent Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        allAnime={MOCK_ANIME_DATABASE}
        onPlayAnime={handlePlayAnime}
        onSelectAnime={handleSelectAnime}
      />

      {/* Dream Recommendation Modal (when launched from navbar button) */}
      {isDreamFinderOpen && (
        <DreamFinder
          allAnime={MOCK_ANIME_DATABASE}
          onPlayAnime={handlePlayAnime}
          onSelectAnime={handleSelectAnime}
          isModal={true}
          onClose={() => setIsDreamFinderOpen(false)}
        />
      )}

      {/* Demo Video Player Modal */}
      <VideoPlayerModal
        anime={playingAnime}
        episodeNumber={currentEpisodeNum}
        isOpen={isPlayerOpen}
        onClose={() => setIsPlayerOpen(false)}
        onEpisodeChange={(newEp) => setCurrentEpisodeNum(newEp)}
      />

      {/* Auth Modal (Login / Sign Up) */}
      <AuthModal />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
