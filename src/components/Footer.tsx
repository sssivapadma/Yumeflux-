import React from 'react';
import { Logo } from './Logo';
import { PageView } from '../types/anime';
import { Instagram, Youtube, Twitter, Disc as Discord, Shield, Sparkles, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageView) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="relative bg-slate-950 border-t border-purple-500/20 text-slate-400 select-none pt-12 pb-8 overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-32 bg-purple-900/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800/80">
          {/* Col 1: Logo & Mission */}
          <div className="md:col-span-2 space-y-4">
            <Logo size="md" />
            <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed">
              Yumeflux is the next-generation anime streaming and discovery platform engineered for anime lovers worldwide. Discover transcendent stories, follow weekly season releases, and stream your dreams.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#social-x"
                onClick={(e) => e.preventDefault()}
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-400 hover:text-cyan-400 transition-colors"
                aria-label="X (Twitter)"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#social-instagram"
                onClick={(e) => e.preventDefault()}
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-purple-400 hover:text-purple-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#social-youtube"
                onClick={(e) => e.preventDefault()}
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-red-400 hover:text-red-400 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="#social-discord"
                onClick={(e) => e.preventDefault()}
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-indigo-400 hover:text-indigo-400 transition-colors"
                aria-label="Discord"
              >
                <Discord className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3 font-mono">
              Explore
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-cyan-300 transition-colors"
                >
                  Home Spotlight
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('browse')}
                  className="hover:text-cyan-300 transition-colors"
                >
                  Browse Anime Directory
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('genres')}
                  className="hover:text-cyan-300 transition-colors"
                >
                  All 14 Genres
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('trending')}
                  className="hover:text-cyan-300 transition-colors"
                >
                  Trending Top 10
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('popular')}
                  className="hover:text-cyan-300 transition-colors"
                >
                  Most Popular Anime
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Support & Legal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3 font-mono">
              Platform & Legal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('profile')}
                  className="hover:text-purple-300 transition-colors"
                >
                  Account Profile
                </button>
              </li>
              <li>
                <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-purple-300 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:text-purple-300 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#dmca" onClick={(e) => e.preventDefault()} className="hover:text-purple-300 transition-colors">
                  DMCA & Copyright Notice
                </a>
              </li>
              <li>
                <a href="#help" onClick={(e) => e.preventDefault()} className="hover:text-purple-300 transition-colors">
                  Help Center & FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Prototype Disclaimer Banner */}
        <div className="mt-8 p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <Shield className="w-4 h-4 text-purple-400 shrink-0" />
            <span>
              <strong>Demonstration Prototype:</strong> Yumeflux is a UI demonstration showcase. All video player media utilizes open royalty-free test reels and public demo streams. No copyrighted anime files are hosted or illegally distributed.
            </span>
          </div>
          <span className="text-[11px] text-slate-500 font-mono shrink-0">
            v2.4.0-FluxEngine
          </span>
        </div>

        {/* Copyright notice */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Yumeflux Inc. All rights reserved. "Stream your dreams."</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for anime fans worldwide
          </p>
        </div>
      </div>
    </footer>
  );
};
