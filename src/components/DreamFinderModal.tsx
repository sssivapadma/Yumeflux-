import React, { useState } from 'react';
import { Anime, MoodType, TimeCommitment } from '../types/anime';
import { Sparkles, Star, Play, Info, RefreshCw, X, Check, Flame, Heart, Smile, Coffee, Skull, Compass, Zap } from 'lucide-react';
import { useToast } from '../context/ToastContext';

interface DreamFinderProps {
  allAnime: Anime[];
  onPlayAnime: (anime: Anime) => void;
  onSelectAnime: (anime: Anime) => void;
  isModal?: boolean;
  onClose?: () => void;
}

const MOODS: { id: MoodType; label: string; icon: React.ReactNode; color: string }[] = [
  { id: 'Exciting', label: 'Exciting', icon: <Zap className="w-4 h-4" />, color: 'from-amber-500 to-orange-500' },
  { id: 'Emotional', label: 'Emotional', icon: <Heart className="w-4 h-4" />, color: 'from-rose-500 to-pink-500' },
  { id: 'Funny', label: 'Funny', icon: <Smile className="w-4 h-4" />, color: 'from-yellow-400 to-amber-500' },
  { id: 'Relaxing', label: 'Relaxing', icon: <Coffee className="w-4 h-4" />, color: 'from-teal-400 to-cyan-500' },
  { id: 'Dark', label: 'Dark', icon: <Skull className="w-4 h-4" />, color: 'from-purple-900 to-slate-900' },
  { id: 'Romantic', label: 'Romantic', icon: <Heart className="w-4 h-4" />, color: 'from-fuchsia-500 to-pink-600' },
  { id: 'Epic', label: 'Epic', icon: <Flame className="w-4 h-4" />, color: 'from-blue-600 to-cyan-500' }
];

const GENRES = [
  'Action', 'Fantasy', 'Romance', 'Comedy', 'Thriller', 'Sci-Fi', 'Adventure', 'Supernatural'
];

const TIMES: { id: TimeCommitment; label: string; desc: string }[] = [
  { id: 'Short', label: 'Quick Binge', desc: '< 13 episodes / Movie' },
  { id: 'Medium', label: 'Standard Series', desc: '13 - 36 episodes' },
  { id: 'Long', label: 'Epic Journey', desc: '40+ episodes' }
];

export const DreamFinder: React.FC<DreamFinderProps> = ({
  allAnime,
  onPlayAnime,
  onSelectAnime,
  isModal = false,
  onClose
}) => {
  const [selectedMood, setSelectedMood] = useState<MoodType | null>('Epic');
  const [selectedGenre, setSelectedGenre] = useState<string | null>('Action');
  const [selectedTime, setSelectedTime] = useState<TimeCommitment | null>('Medium');
  const [isFinding, setIsFinding] = useState(false);
  const [recommendation, setRecommendation] = useState<{
    anime: Anime;
    matchReason: string;
    matchScore: number;
  } | null>(() => {
    // default initial pick
    const initialPick = allAnime.find((a) => a.id === 'jujutsu-kaisen') || allAnime[0];
    return initialPick
      ? {
          anime: initialPick,
          matchReason: 'Perfect synchronization with high-adrenaline supernatural battles, stunning MAPPA animation, and an epic atmospheric score.',
          matchScore: 99
        }
      : null;
  });

  const { showToast } = useToast();

  const handleFindAnime = () => {
    setIsFinding(true);

    setTimeout(() => {
      // Recommendation algorithm based on chosen filters
      let candidates = allAnime.filter((a) => {
        let matches = 0;
        if (selectedMood && a.moodTags.includes(selectedMood)) matches += 2;
        if (selectedGenre && a.genres.includes(selectedGenre)) matches += 2;
        if (selectedTime && a.lengthCategory === selectedTime) matches += 1;
        return matches > 0;
      });

      if (candidates.length === 0) candidates = allAnime;

      // Pick top candidate or high-rated match
      candidates.sort((a, b) => b.rating - a.rating);
      const topPick = candidates[Math.floor(Math.random() * Math.min(candidates.length, 3))] || allAnime[0];

      const reasons = [
        `Matched for your "${selectedMood}" mood with breathtaking world-building and ${topPick.genres.slice(0, 2).join(' & ')} synergy.`,
        `Curated specifically for your ${selectedTime?.toLowerCase()} series preference, delivering non-stop cinematic payoff.`,
        `Top community rated at ${topPick.rating}/10, blending ${selectedMood} story beats with elite animation by ${topPick.studio}.`
      ];

      setRecommendation({
        anime: topPick,
        matchReason: reasons[Math.floor(Math.random() * reasons.length)],
        matchScore: Math.floor(Math.random() * 6) + 94 // 94-99%
      });

      setIsFinding(false);
      showToast(`Found your dream anime: ${topPick.title}!`, 'success');
    }, 600);
  };

  const content = (
    <div className="relative w-full rounded-2xl bg-gradient-to-b from-slate-900/90 via-slate-950 to-slate-950 border border-purple-500/30 p-6 sm:p-8 lg:p-10 shadow-2xl shadow-purple-950/40 overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Modal Close Button */}
      {isModal && onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {/* Title & Subtitle */}
      <div className="relative z-10 text-center max-w-2xl mx-auto mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-cyan-300 border border-cyan-400/30 mb-3 shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          Yumeflux Signature Feature
        </span>
        <h2 className="text-2xl sm:text-4xl font-display font-black text-white tracking-tight">
          Can't decide what to watch?
        </h2>
        <p className="text-sm sm:text-base text-slate-300 mt-2">
          Tell Yumeflux what you're in the mood for, and let our dream engine match your next binge.
        </p>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive Selectors */}
        <div className="lg:col-span-7 space-y-6">
          {/* Step 1: Mood */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-purple-300 mb-2.5 block flex items-center gap-1.5">
              <span>1. Select Your Current Mood</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {MOODS.map((mood) => {
                const isSelected = selectedMood === mood.id;
                return (
                  <button
                    key={mood.id}
                    onClick={() => setSelectedMood(mood.id)}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                      isSelected
                        ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-md shadow-purple-950/50 border border-white/20 scale-105'
                        : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {mood.icon}
                    <span>{mood.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Preferred Genre */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-cyan-300 mb-2.5 block flex items-center gap-1.5">
              <span>2. Preferred Core Genre</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {GENRES.map((genre) => {
                const isSelected = selectedGenre === genre;
                return (
                  <button
                    key={genre}
                    onClick={() => setSelectedGenre(genre)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 font-bold'
                        : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    {genre}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Time Commitment */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-blue-300 mb-2.5 block">
              3. Time Commitment
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {TIMES.map((time) => {
                const isSelected = selectedTime === time.id;
                return (
                  <button
                    key={time.id}
                    onClick={() => setSelectedTime(time.id)}
                    className={`p-3 rounded-xl text-left border transition-all ${
                      isSelected
                        ? 'bg-purple-950/60 border-purple-400 text-white shadow-md'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                    }`}
                  >
                    <p className={`text-xs font-bold ${isSelected ? 'text-cyan-300' : 'text-slate-200'}`}>
                      {time.label}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{time.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Prominent Action Button */}
          <button
            onClick={handleFindAnime}
            disabled={isFinding}
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-purple-950/50 hover:shadow-cyan-900/40 border border-white/20 transition-all transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
          >
            {isFinding ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Scanning 20+ Masterpieces...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-cyan-200" />
                <span>✨ Find My Anime</span>
              </>
            )}
          </button>
        </div>

        {/* Right: Recommendation Card Result */}
        <div className="lg:col-span-5">
          {recommendation ? (
            <div className="relative rounded-2xl bg-slate-900/90 border border-purple-500/40 p-4 sm:p-5 shadow-2xl backdrop-blur-md overflow-hidden animate-in fade-in slide-in-from-right-4 duration-300">
              {/* Match score pill */}
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded-full text-xs font-black bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-sm">
                  {recommendation.matchScore}% Match
                </span>
                <span className="text-[11px] font-mono text-purple-300">
                  {recommendation.anime.studio}
                </span>
              </div>

              <div className="flex gap-4 mb-3">
                {/* Poster */}
                <div className="relative w-28 sm:w-32 aspect-[2/3] rounded-xl overflow-hidden shrink-0 bg-slate-950 shadow-md">
                  <img
                    src={recommendation.anime.posterImage}
                    alt={recommendation.anime.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-slate-950/80 text-amber-300 text-[10px] font-bold flex items-center gap-0.5">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    {recommendation.anime.rating}
                  </div>
                </div>

                {/* Details */}
                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-base sm:text-lg font-display font-black text-white line-clamp-1">
                      {recommendation.anime.title}
                    </h3>
                    <p className="text-[11px] text-purple-400 font-mono mt-0.5">
                      {recommendation.anime.japaneseTitle}
                    </p>
                    <p className="text-xs text-slate-300 line-clamp-3 mt-2 leading-relaxed">
                      {recommendation.anime.description}
                    </p>
                  </div>

                  <div className="pt-2 flex flex-wrap gap-1">
                    {recommendation.anime.genres.slice(0, 3).map((g) => (
                      <span key={g} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        {g}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Why It Was Recommended */}
              <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/20 text-xs text-purple-200 mb-4">
                <strong className="text-cyan-300 block mb-0.5 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                  Why Yumeflux recommends this:
                </strong>
                {recommendation.matchReason}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    onPlayAnime(recommendation.anime);
                    if (onClose) onClose();
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:brightness-110"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Watch Now</span>
                </button>

                <button
                  onClick={() => {
                    onSelectAnime(recommendation.anime);
                    if (onClose) onClose();
                  }}
                  className="py-2.5 px-4 rounded-xl bg-slate-800 text-slate-200 hover:text-white font-semibold text-xs border border-slate-700 hover:border-slate-500 transition-colors"
                >
                  More Info
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center p-8 rounded-2xl border border-dashed border-slate-800 text-center text-slate-500">
              Select your mood and click Find My Anime to reveal your match!
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
        <div className="w-full max-w-4xl animate-in zoom-in-95 duration-200 my-auto">
          {content}
        </div>
      </div>
    );
  }

  return (
    <section className="relative w-full py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto select-none">
      {content}
    </section>
  );
};
