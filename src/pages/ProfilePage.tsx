import React, { useState } from 'react';
import { Anime } from '../types/anime';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { AnimeCard } from '../components/AnimeCard';
import {
  User,
  Crown,
  Heart,
  History,
  Bookmark,
  Settings,
  Shield,
  Bell,
  Sparkles,
  LogOut,
  Clock,
  Play,
  Trash2
} from 'lucide-react';

interface ProfilePageProps {
  allAnime: Anime[];
  onPlayAnime: (anime: Anime, episodeNum?: number) => void;
  onSelectAnime: (anime: Anime) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  allAnime,
  onPlayAnime,
  onSelectAnime
}) => {
  const { user, watchlist, continueWatching, logout } = useAuth();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'watchlist' | 'history' | 'preferences' | 'settings'>('watchlist');

  // Watchlist anime objects
  const watchlistAnime = allAnime.filter((a) => watchlist.includes(a.id));

  const handleLogout = () => {
    logout();
    showToast('Signed out of Yumeflux', 'info');
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Profile and streaming preferences updated successfully!', 'success');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto select-none space-y-8">
      {/* Profile Header Card */}
      <div className="relative rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-purple-950/40 border border-purple-500/30 p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          {/* Avatar */}
          <div className="relative">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-cyan-400 p-1 bg-slate-950 shadow-xl">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80'}
                alt={user?.name || 'User Avatar'}
                className="w-full h-full object-cover rounded-xl"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 p-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-md border border-slate-900">
              <Crown className="w-4 h-4" />
            </div>
          </div>

          {/* User Info */}
          <div className="flex-1 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-display font-black text-white">
                {user?.name || 'Sivapadma'}
              </h1>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-gradient-to-r from-amber-500/20 to-purple-500/20 text-amber-300 border border-amber-400/30 w-fit mx-auto sm:mx-0">
                <Crown className="w-3.5 h-3.5 text-amber-400" /> {user?.membershipTier || 'Flux VIP Member'}
              </span>
            </div>

            <p className="text-xs text-slate-400 font-mono">
              {user?.email || 'sssivapadma@gmail.com'} • Member since {user?.joinedDate || 'March 2024'}
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2 text-xs text-slate-300">
              <div className="px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700">
                <strong className="text-cyan-400 font-bold mr-1">{watchlist.length}</strong>
                <span>in Watchlist</span>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700">
                <strong className="text-purple-400 font-bold mr-1">{continueWatching.length}</strong>
                <span>in Active Binge</span>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700">
                <strong className="text-amber-400 font-bold mr-1">1080p Ultra</strong>
                <span>Default Stream</span>
              </div>
            </div>
          </div>

          {/* Logout Action */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-rose-950/60 hover:text-rose-400 border border-slate-700 hover:border-rose-500/50 text-slate-300 text-xs font-semibold transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-3 border-b border-slate-800 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('watchlist')}
          className={`flex items-center gap-2 pb-3 px-2 text-sm font-bold transition-all relative shrink-0 ${
            activeTab === 'watchlist'
              ? 'text-cyan-400'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>My Watchlist ({watchlist.length})</span>
          {activeTab === 'watchlist' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-400" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`flex items-center gap-2 pb-3 px-2 text-sm font-bold transition-all relative shrink-0 ${
            activeTab === 'history'
              ? 'text-cyan-400'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <History className="w-4 h-4" />
          <span>Continue Watching ({continueWatching.length})</span>
          {activeTab === 'history' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-400" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('preferences')}
          className={`flex items-center gap-2 pb-3 px-2 text-sm font-bold transition-all relative shrink-0 ${
            activeTab === 'preferences'
              ? 'text-cyan-400'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Favorite Genres</span>
          {activeTab === 'preferences' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-400" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-2 pb-3 px-2 text-sm font-bold transition-all relative shrink-0 ${
            activeTab === 'settings'
              ? 'text-cyan-400'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Account Settings</span>
          {activeTab === 'settings' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-400" />
          )}
        </button>
      </div>

      {/* Tab Panels */}
      <div>
        {/* WATCHLIST TAB */}
        {activeTab === 'watchlist' && (
          <div>
            {watchlistAnime.length === 0 ? (
              <div className="py-20 text-center rounded-2xl border border-dashed border-slate-800 p-8">
                <Bookmark className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                <h3 className="text-base font-bold text-white">Your Watchlist is empty</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                  Browse the catalog and click the "+" icon on any anime card to save it for your next stream session.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
                {watchlistAnime.map((anime) => (
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
        )}

        {/* CONTINUE WATCHING TAB */}
        {activeTab === 'history' && (
          <div className="space-y-4">
            {continueWatching.map((item) => {
              const animeObj = allAnime.find((a) => a.id === item.animeId);
              return (
                <div
                  key={item.animeId}
                  onClick={() => animeObj && onSelectAnime(animeObj)}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.posterImage}
                      alt={item.animeTitle}
                      className="w-16 h-24 object-cover rounded-lg shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="text-base font-bold text-white hover:text-cyan-300 transition-colors">
                        {item.animeTitle}
                      </h4>
                      <p className="text-xs text-purple-400 font-semibold mt-0.5">
                        Episode {item.currentEpisode}: {item.episodeTitle}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-slate-400 mt-2">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-cyan-400" />
                          {item.remainingMinutes}m remaining
                        </span>
                        <span>•</span>
                        <span>{item.progressPercent}% completed</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (animeObj) onPlayAnime(animeObj, item.currentEpisode);
                      }}
                      className="py-2 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-xs flex items-center gap-2 shadow-md hover:brightness-110"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>Resume Ep {item.currentEpisode}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* FAVORITE GENRES TAB */}
        {activeTab === 'preferences' && (
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6">
            <div>
              <h3 className="text-base font-bold text-white">Your Anime Taste Profile</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                These preferences help power the "What Should I Watch?" dream recommendation engine.
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {user?.favoriteGenres.map((genre) => (
                <span
                  key={genre}
                  className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-600/30 to-cyan-500/30 text-cyan-300 border border-cyan-400/40 text-xs font-bold"
                >
                  ★ {genre}
                </span>
              ))}
              {['Adventure', 'Sci-Fi', 'Horror', 'Sports', 'Romance'].map((g) => (
                <button
                  key={g}
                  onClick={() => showToast(`Added ${g} to your genre tastes`, 'success')}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 text-xs font-medium"
                >
                  + {g}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === 'settings' && (
          <form onSubmit={handleSaveSettings} className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 max-w-2xl space-y-5">
            <h3 className="text-base font-bold text-white">Account & Playback Settings</h3>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Display Name</label>
              <input
                type="text"
                defaultValue={user?.name}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Account Email</label>
              <input
                type="email"
                defaultValue={user?.email}
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-cyan-400"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Default Streaming Quality</label>
                <select className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-cyan-400">
                  <option>1080p Ultra HD (Recommended)</option>
                  <option>4K HDR Stream</option>
                  <option>720p Balanced</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Default Audio Language</label>
                <select className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white outline-none focus:border-cyan-400">
                  <option>Japanese with English Subtitles</option>
                  <option>English Dub</option>
                  <option>Japanese Original (No subs)</option>
                </select>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold text-xs shadow-md hover:brightness-110 transition-all"
              >
                Save Changes
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
