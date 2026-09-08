import React, { useState } from 'react';
import { Logo } from './Logo';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { X, Mail, Lock, User, ArrowRight, Sparkles } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, authModalMode, setAuthModalMode, login } = useAuth();
  const { showToast } = useToast();

  const [email, setEmail] = useState('sssivapadma@gmail.com');
  const [password, setPassword] = useState('••••••••••••');
  const [name, setName] = useState('Sivapadma');
  const [confirmPassword, setConfirmPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      showToast('Please enter an email address', 'warning');
      return;
    }
    login(email, authModalMode === 'signup' ? name : email.split('@')[0]);
    showToast(
      authModalMode === 'login' ? `Welcome back to Yumeflux!` : `Account created! Welcome to Yumeflux VIP.`,
      'success'
    );
  };

  const handleGoogleLogin = () => {
    login('sssivapadma@gmail.com', 'Sivapadma');
    showToast('Signed in with Google account (Demo)', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-2xl bg-slate-900 border border-purple-500/30 p-6 sm:p-8 shadow-2xl shadow-purple-950/60 overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <Logo size="md" showTagline={false} />
          </div>
          <h2 className="text-xl font-display font-black text-white">
            {authModalMode === 'login' ? 'Welcome Back' : 'Create Your Stream Account'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {authModalMode === 'login'
              ? 'Enter your credentials to access your anime watchlist and history.'
              : 'Join Yumeflux to unlock HD anime streaming and dream recommendations.'}
          </p>
        </div>

        {/* Google Continue Button */}
        <button
          onClick={handleGoogleLogin}
          className="w-full py-2.5 px-4 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-slate-500 text-slate-200 font-semibold text-xs flex items-center justify-center gap-2.5 transition-all mb-4"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        <div className="relative flex items-center justify-center my-4">
          <div className="border-t border-slate-800 w-full" />
          <span className="bg-slate-900 px-2 text-[10px] text-slate-500 uppercase tracking-wider">
            or continue with email
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {authModalMode === 'signup' && (
            <div>
              <label className="text-[11px] font-bold text-slate-300 block mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sivapadma"
                  className="w-full pl-9 pr-3 py-2 bg-slate-950/80 border border-slate-800 focus:border-cyan-400 rounded-xl text-xs text-white outline-none"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-[11px] font-bold text-slate-300 block mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-9 pr-3 py-2 bg-slate-950/80 border border-slate-800 focus:border-cyan-400 rounded-xl text-xs text-white outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-300 block mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-3 py-2 bg-slate-950/80 border border-slate-800 focus:border-cyan-400 rounded-xl text-xs text-white outline-none"
                required
              />
            </div>
          </div>

          {authModalMode === 'signup' && (
            <div>
              <label className="text-[11px] font-bold text-slate-300 block mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-3 py-2 bg-slate-950/80 border border-slate-800 focus:border-cyan-400 rounded-xl text-xs text-white outline-none"
                  required
                />
              </div>
            </div>
          )}

          {authModalMode === 'login' && (
            <div className="flex items-center justify-between text-[11px] pt-1">
              <label className="flex items-center gap-1.5 cursor-pointer text-slate-300">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="accent-purple-500 rounded"
                />
                <span>Remember me</span>
              </label>
              <button
                type="button"
                onClick={() => showToast('Password reset link sent to demo email', 'info')}
                className="text-cyan-400 hover:underline"
              >
                Forgot password?
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-purple-950/40 hover:brightness-110 active:scale-95 transition-all"
          >
            <span>{authModalMode === 'login' ? 'Sign In to Stream' : 'Create Free Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Switch mode footer */}
        <div className="mt-5 text-center text-xs text-slate-400 pt-3 border-t border-slate-800">
          {authModalMode === 'login' ? (
            <p>
              Don't have an account?{' '}
              <button
                onClick={() => setAuthModalMode('signup')}
                className="font-bold text-cyan-400 hover:text-cyan-300 ml-1 underline"
              >
                Sign up free
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button
                onClick={() => setAuthModalMode('login')}
                className="font-bold text-cyan-400 hover:text-cyan-300 ml-1 underline"
              >
                Log in
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
