import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, ContinueWatchingItem } from '../types/anime';
import { INITIAL_USER_PROFILE, INITIAL_CONTINUE_WATCHING } from '../data/animeData';

interface AuthContextType {
  user: UserProfile | null;
  isLoggedIn: boolean;
  watchlist: string[]; // anime IDs
  continueWatching: ContinueWatchingItem[];
  login: (email: string, name?: string) => void;
  logout: () => void;
  toggleWatchlist: (animeId: string) => boolean; // returns isNowInWatchlist
  isInWatchlist: (animeId: string) => boolean;
  updateContinueWatching: (item: ContinueWatchingItem) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalMode: 'login' | 'signup';
  setAuthModalMode: (mode: 'login' | 'signup') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('yumeflux_user');
    return saved ? JSON.parse(saved) : INITIAL_USER_PROFILE; // Default logged in for rich prototype preview
  });

  const [watchlist, setWatchlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('yumeflux_watchlist');
    return saved ? JSON.parse(saved) : ['jujutsu-kaisen', 'frieren', 'solo-leveling', 'attack-on-titan'];
  });

  const [continueWatching, setContinueWatching] = useState<ContinueWatchingItem[]>(() => {
    const saved = localStorage.getItem('yumeflux_continue_watching');
    return saved ? JSON.parse(saved) : INITIAL_CONTINUE_WATCHING;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');

  useEffect(() => {
    if (user) {
      localStorage.setItem('yumeflux_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('yumeflux_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('yumeflux_watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  useEffect(() => {
    localStorage.setItem('yumeflux_continue_watching', JSON.stringify(continueWatching));
  }, [continueWatching]);

  const login = (email: string, name = 'Sivapadma') => {
    const newUser: UserProfile = {
      ...INITIAL_USER_PROFILE,
      email,
      name,
      username: email.split('@')[0] || 'flux_user'
    };
    setUser(newUser);
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setUser(null);
  };

  const toggleWatchlist = (animeId: string): boolean => {
    if (watchlist.includes(animeId)) {
      setWatchlist((prev) => prev.filter((id) => id !== animeId));
      return false;
    } else {
      setWatchlist((prev) => [...prev, animeId]);
      return true;
    }
  };

  const isInWatchlist = (animeId: string) => watchlist.includes(animeId);

  const updateContinueWatching = (item: ContinueWatchingItem) => {
    setContinueWatching((prev) => {
      const filtered = prev.filter((i) => i.animeId !== item.animeId);
      return [item, ...filtered];
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        watchlist,
        continueWatching,
        login,
        logout,
        toggleWatchlist,
        isInWatchlist,
        updateContinueWatching,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalMode,
        setAuthModalMode
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
