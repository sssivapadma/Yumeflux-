import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { PageView } from '../types/anime';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import {
  Search,
  Sparkles,
  Sun,
  Moon,
  User,
  Menu,
  X,
  Compass,
  Flame,
  Grid,
  TrendingUp,
  Bookmark,
  LogOut
} from 'lucide-react';

interface NavbarProps {
  activePage: PageView;
  setActivePage: (page: PageView) => void;
  onOpenSearch: () => void;
  onOpenDreamFinder: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  setActivePage,
  onOpenSearch,
  onOpenDreamFinder
}) => {
  const { theme, toggleTheme } = useTheme();
  const { user, isLoggedIn, logout, setIsAuthModalOpen, setAuthModalMode } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { id: PageView; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Compass className="w-4 h-4" /> },
    { id: 'browse', label: 'Browse', icon: <Grid className="w-4 h-4" /> },
    { id: 'genres', label: 'Genres', icon: <Grid className="w-4 h-4" /> },
    { id: 'trending', label: 'Trending', icon: <Flame className="w-4 h-4" /> },
    { id: 'popular', label: 'Popular', icon: <TrendingUp className="w-4 h-4" /> }
  ];

  const handleNavClick = (page: PageView) => {
    setActivePage(page);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/85 dark:bg-slate-950/90 light:bg-white/85 backdrop-blur-md border-b border-purple-500/15 shadow-lg shadow-black/20 py-3'
          : 'bg-gradient-to-b from-slate-950/95 via-slate-950/60 to-transparent dark:from-slate-950/95 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Left: Logo */}
        <div
          onClick={() => handleNavClick('home')}
          className="cursor-pointer group flex items-center shrink-0"
        >
          <Logo size="md" />
        </div>

        {/* Center: Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const isActive = activePage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 relative ${
                  isActive
                    ? 'text-cyan-300 dark:text-cyan-400 font-semibold'
                    : 'text-slate-300 hover:text-white dark:text-slate-300 dark:hover:text-white light:text-slate-700 light:hover:text-slate-950'
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search Button */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/70 dark:bg-slate-900/80 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-200 text-slate-400 hover:text-white dark:hover:text-cyan-300 hover:border-cyan-500/40 transition-all duration-200 text-xs sm:text-sm group"
            title="Search anime, characters, genres (Press /)"
          >
            <Search className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span className="hidden lg:inline text-slate-300 dark:text-slate-300 light:text-slate-600">Search anime...</span>
            <kbd className="hidden lg:inline px-1.5 py-0.5 text-[10px] rounded bg-slate-800 border border-slate-700 text-slate-400 font-mono">
              /
            </kbd>
          </button>

          {/* "What Should I Watch?" Signature Feature Button */}
          <button
            onClick={onOpenDreamFinder}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-purple-600/90 via-indigo-600 to-cyan-600/90 hover:from-purple-500 hover:to-cyan-500 text-white text-xs sm:text-sm font-semibold shadow-md shadow-purple-950/40 border border-purple-400/30 hover:border-cyan-400/50 hover:shadow-cyan-900/30 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-200 animate-pulse" />
            <span>Dream Finder</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-slate-900/70 dark:bg-slate-900/80 light:bg-slate-100 border border-slate-800 dark:border-slate-800 light:border-slate-200 text-slate-300 hover:text-amber-400 dark:hover:text-amber-300 transition-colors"
            aria-label="Toggle theme"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-300" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600" />
            )}
          </button>

          {/* User Auth / Profile */}
          {isLoggedIn && user ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center gap-2 p-1 rounded-full border border-purple-500/40 hover:border-cyan-400 transition-all group"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border border-purple-400/50"
                  referrerPolicy="no-referrer"
                />
                <span className="hidden xl:inline text-xs font-semibold text-slate-200 pr-1">
                  {user.name}
                </span>
              </button>

              {/* Profile Dropdown */}
              {isProfileDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 rounded-xl bg-slate-900/95 border border-slate-800 shadow-2xl p-2 z-50 backdrop-blur-xl animate-in fade-in slide-in-from-top-2"
                  onMouseLeave={() => setIsProfileDropdownOpen(false)}
                >
                  <div className="px-3 py-2 border-b border-slate-800">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold text-white">{user.name}</p>
                      <span className="px-1.5 py-0.5 text-[9px] font-bold rounded bg-gradient-to-r from-purple-500 to-cyan-500 text-white uppercase tracking-wider">
                        VIP
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 truncate">{user.email}</p>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        handleNavClick('profile');
                        setIsProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-purple-950/40 rounded-lg transition-colors text-left"
                    >
                      <User className="w-4 h-4 text-cyan-400" />
                      <span>My Profile & Stats</span>
                    </button>
                    <button
                      onClick={() => {
                        handleNavClick('profile');
                        setIsProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-purple-950/40 rounded-lg transition-colors text-left"
                    >
                      <Bookmark className="w-4 h-4 text-purple-400" />
                      <span>Watchlist & Favorites</span>
                    </button>
                  </div>

                  <div className="pt-1 border-t border-slate-800">
                    <button
                      onClick={() => {
                        logout();
                        setIsProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-400 hover:text-red-300 hover:bg-red-950/30 rounded-lg transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => {
                setAuthModalMode('login');
                setIsAuthModalOpen(true);
              }}
              className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-slate-900 border border-purple-500/40 text-purple-300 hover:text-white hover:border-cyan-400 hover:bg-purple-950/40 transition-all duration-200"
            >
              Sign In
            </button>
          )}

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-900/60"
            aria-label="Open menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-950/95 border-b border-purple-500/20 px-4 pt-3 pb-6 space-y-3 backdrop-blur-2xl animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2 pb-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  activePage === link.id
                    ? 'bg-purple-950/60 text-cyan-300 border border-purple-500/40'
                    : 'text-slate-300 hover:bg-slate-900/80 hover:text-white'
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-2 pt-2 border-t border-slate-800/80">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenDreamFinder();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white font-semibold text-sm shadow-md"
            >
              <Sparkles className="w-4 h-4 text-cyan-200" />
              <span>What Should I Watch? (AI Finder)</span>
            </button>

            {isLoggedIn ? (
              <button
                onClick={() => handleNavClick('profile')}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-slate-300 hover:bg-slate-900"
              >
                <User className="w-4 h-4 text-cyan-400" />
                <span>My Profile ({user?.name})</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setAuthModalMode('login');
                  setIsAuthModalOpen(true);
                }}
                className="w-full py-2 rounded-xl border border-purple-500/40 text-purple-300 font-semibold text-sm text-center"
              >
                Sign In / Register
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
