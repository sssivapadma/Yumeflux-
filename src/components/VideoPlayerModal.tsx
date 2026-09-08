import React, { useState, useRef, useEffect } from 'react';
import { Anime, Episode } from '../types/anime';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  RotateCw,
  Maximize2,
  Minimize2,
  SkipBack,
  SkipForward,
  Settings,
  Sparkles,
  X,
  Subtitles,
  Gauge,
  Sliders,
  Tv,
  Check
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

interface VideoPlayerModalProps {
  anime: Anime | null;
  episodeNumber?: number;
  isOpen: boolean;
  onClose: () => void;
  onEpisodeChange?: (newEpisodeNumber: number) => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  anime,
  episodeNumber = 1,
  isOpen,
  onClose,
  onEpisodeChange
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(145); // simulated starting at 2m 25s
  const [duration, setDuration] = useState(1440); // 24 minutes in seconds
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [quality, setQuality] = useState<'1080p' | '720p' | '4K HDR'>('1080p');
  const [subtitle, setSubtitle] = useState<'English [CC]' | 'Japanese' | 'Spanish' | 'Off'>('English [CC]');
  const [autoplayNext, setAutoplayNext] = useState(true);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [activeSettingsTab, setActiveSettingsTab] = useState<'main' | 'speed' | 'quality' | 'subs'>('main');
  const [showControls, setShowControls] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { showToast } = useToast();

  const currentEp: Episode = anime?.episodes.find((e) => e.number === episodeNumber) || {
    id: 'ep-default',
    number: episodeNumber,
    title: `Episode ${episodeNumber}`,
    thumbnail: anime?.bannerImage || '',
    duration: '24:00',
    synopsis: anime?.synopsis || anime?.description || '',
    airDate: anime?.year?.toString() || '2024'
  };

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay may be blocked by browser policy without user gesture
        setIsPlaying(false);
      });
    }
  }, [isOpen, episodeNumber]);

  // Hide controls after 3 seconds of inactivity
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3500);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    if (isMuted) {
      videoRef.current.muted = false;
      setIsMuted(false);
    } else {
      videoRef.current.muted = true;
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
      setIsMuted(val === 0);
    }
  };

  const skipTime = (seconds: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = Math.max(0, Math.min(videoRef.current.currentTime + seconds, duration));
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) videoRef.current.playbackRate = speed;
    setActiveSettingsTab('main');
    showToast(`Speed set to ${speed}x`, 'info');
  };

  const handleQualityChange = (q: '1080p' | '720p' | '4K HDR') => {
    setQuality(q);
    setActiveSettingsTab('main');
    showToast(`Streaming quality set to ${q}`, 'success');
  };

  const handleSubtitlesChange = (sub: 'English [CC]' | 'Japanese' | 'Spanish' | 'Off') => {
    setSubtitle(sub);
    setActiveSettingsTab('main');
    showToast(`Subtitles: ${sub}`, 'info');
  };

  const toggleFullscreen = () => {
    if (!playerContainerRef.current) return;
    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleNextEpisode = () => {
    const nextEp = episodeNumber + 1;
    if (nextEp <= (anime?.episodesCount || 100)) {
      onEpisodeChange?.(nextEp);
      showToast(`Loading Episode ${nextEp}...`, 'info');
    } else {
      showToast('You have reached the latest episode!', 'info');
    }
  };

  const handlePrevEpisode = () => {
    const prevEp = Math.max(1, episodeNumber - 1);
    onEpisodeChange?.(prevEp);
  };

  if (!isOpen || !anime) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl overflow-y-auto p-2 sm:p-4 md:p-6 select-none animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl rounded-2xl bg-slate-950 border border-purple-500/30 overflow-hidden shadow-2xl shadow-purple-950/60 my-auto flex flex-col">
        {/* Top bar with close button & Demo alert */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950/90 border-b border-slate-800/80 z-20">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-400/40">
              Demo Video Player
            </span>
            <span className="text-xs font-semibold text-slate-300 truncate max-w-md">
              {anime.title} — Episode {episodeNumber}: {currentEp.title}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close player"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Screen Container */}
        <div
          ref={playerContainerRef}
          onMouseMove={handleMouseMove}
          className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden group"
        >
          {/* Real Video Element (Royalty-free sample video) */}
          <video
            ref={videoRef}
            src={anime.videoSampleUrl}
            className="w-full h-full object-contain cursor-pointer"
            onClick={togglePlay}
            onTimeUpdate={() => {
              if (videoRef.current) {
                setCurrentTime(videoRef.current.currentTime);
                if (videoRef.current.duration) setDuration(videoRef.current.duration);
              }
            }}
            onEnded={() => {
              if (autoplayNext) {
                handleNextEpisode();
              }
            }}
            loop={false}
            playsInline
          />

          {/* Watermark Prototype Disclaimer in player */}
          <div className="absolute top-4 left-4 pointer-events-none z-10 flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-950/80 border border-purple-500/30 backdrop-blur-md text-[11px] text-slate-300">
              <Tv className="w-3.5 h-3.5 text-purple-400" />
              <span>Yumeflux Player</span>
              <span className="text-cyan-400 font-mono">[{quality}]</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-bold">
              Royalty-free Sample Stream
            </span>
          </div>

          {/* Center Play/Pause indicator on click / pause */}
          {!isPlaying && (
            <div
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer z-10"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-purple-600/90 hover:bg-purple-500 text-white flex items-center justify-center shadow-2xl shadow-purple-950/80 transform transition-transform hover:scale-110">
                <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-white ml-1" />
              </div>
            </div>
          )}

          {/* Custom Subtitles Display */}
          {subtitle !== 'Off' && isPlaying && (
            <div className="absolute bottom-16 left-0 right-0 text-center pointer-events-none z-10 px-6">
              <span className="inline-block px-3 py-1 rounded bg-black/75 text-white font-medium text-xs sm:text-sm shadow-md font-sans border border-white/10">
                [ {anime.title}: Cursed energy resonating within the domain... ]
              </span>
            </div>
          )}

          {/* Player Overlays: Controls Bar */}
          <div
            className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-3 sm:p-5 pt-8 z-20 transition-opacity duration-300 ${
              showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            {/* Scrubber Progress Bar */}
            <div className="relative mb-3 flex items-center group/scrubber cursor-pointer">
              <input
                type="range"
                min={0}
                max={duration || 100}
                value={currentTime}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  setCurrentTime(val);
                  if (videoRef.current) videoRef.current.currentTime = val;
                }}
                className="w-full h-1.5 bg-slate-700/80 rounded-full appearance-none outline-none cursor-pointer accent-cyan-400 group-hover/scrubber:h-2 transition-all"
              />
            </div>

            {/* Bottom Controls Row */}
            <div className="flex items-center justify-between gap-2 text-slate-200 text-xs sm:text-sm">
              {/* Left Controls */}
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={togglePlay}
                  className="p-2 rounded-lg hover:bg-white/10 text-white transition-colors"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white" />}
                </button>

                <button
                  onClick={handlePrevEpisode}
                  disabled={episodeNumber <= 1}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 disabled:opacity-40 transition-colors"
                  title="Previous Episode"
                >
                  <SkipBack className="w-4 h-4" />
                </button>

                <button
                  onClick={() => skipTime(-10)}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 transition-colors"
                  title="Rewind 10s"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  onClick={() => skipTime(10)}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 transition-colors"
                  title="Skip 10s"
                >
                  <RotateCw className="w-4 h-4" />
                </button>

                <button
                  onClick={handleNextEpisode}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 transition-colors"
                  title="Next Episode"
                >
                  <SkipForward className="w-4 h-4" />
                </button>

                {/* Volume slider */}
                <div className="flex items-center gap-1.5 ml-1">
                  <button onClick={toggleMute} className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300">
                    {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-14 sm:w-20 h-1 bg-slate-700 rounded-full appearance-none outline-none accent-purple-400"
                  />
                </div>

                {/* Time Display */}
                <span className="text-[11px] font-mono text-slate-400 ml-1 hidden sm:inline">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              {/* Right Controls */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                {/* Autoplay toggle */}
                <button
                  onClick={() => {
                    setAutoplayNext(!autoplayNext);
                    showToast(`Autoplay next episode ${!autoplayNext ? 'Enabled' : 'Disabled'}`, 'info');
                  }}
                  className={`hidden md:flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold border transition-all ${
                    autoplayNext
                      ? 'bg-purple-600/30 text-cyan-300 border-purple-500/40'
                      : 'bg-slate-900/60 text-slate-400 border-slate-800'
                  }`}
                  title="Toggle Autoplay Next Episode"
                >
                  <span>Auto-Next</span>
                  <span className={`w-2 h-2 rounded-full ${autoplayNext ? 'bg-cyan-400' : 'bg-slate-600'}`} />
                </button>

                {/* Settings Dropdown Button */}
                <div className="relative">
                  <button
                    onClick={() => setShowSettingsMenu(!showSettingsMenu)}
                    className="p-2 rounded-lg hover:bg-white/10 text-slate-300 transition-colors"
                    title="Player Settings"
                  >
                    <Settings className="w-4 h-4" />
                  </button>

                  {/* Settings Popover */}
                  {showSettingsMenu && (
                    <div className="absolute bottom-12 right-0 w-60 rounded-xl bg-slate-900 border border-slate-800 p-2 shadow-2xl z-30 text-xs backdrop-blur-xl animate-in fade-in">
                      {activeSettingsTab === 'main' && (
                        <div className="space-y-1">
                          <button
                            onClick={() => setActiveSettingsTab('quality')}
                            className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-800 text-slate-200"
                          >
                            <span className="flex items-center gap-2">
                              <Sliders className="w-3.5 h-3.5 text-cyan-400" /> Quality
                            </span>
                            <span className="text-purple-400 font-mono">{quality}</span>
                          </button>

                          <button
                            onClick={() => setActiveSettingsTab('speed')}
                            className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-800 text-slate-200"
                          >
                            <span className="flex items-center gap-2">
                              <Gauge className="w-3.5 h-3.5 text-amber-400" /> Speed
                            </span>
                            <span className="text-purple-400 font-mono">{playbackSpeed}x</span>
                          </button>

                          <button
                            onClick={() => setActiveSettingsTab('subs')}
                            className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-800 text-slate-200"
                          >
                            <span className="flex items-center gap-2">
                              <Subtitles className="w-3.5 h-3.5 text-emerald-400" /> Subtitles
                            </span>
                            <span className="text-purple-400 font-mono truncate max-w-[80px]">{subtitle}</span>
                          </button>
                        </div>
                      )}

                      {/* Speed selector view */}
                      {activeSettingsTab === 'speed' && (
                        <div>
                          <p className="text-[11px] font-bold text-slate-400 p-1 mb-1 border-b border-slate-800">
                            Playback Speed
                          </p>
                          {[0.75, 1.0, 1.25, 1.5, 2.0].map((s) => (
                            <button
                              key={s}
                              onClick={() => handleSpeedChange(s)}
                              className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-800 text-slate-200"
                            >
                              <span>{s}x</span>
                              {playbackSpeed === s && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Quality selector view */}
                      {activeSettingsTab === 'quality' && (
                        <div>
                          <p className="text-[11px] font-bold text-slate-400 p-1 mb-1 border-b border-slate-800">
                            Streaming Quality
                          </p>
                          {(['4K HDR', '1080p', '720p'] as const).map((q) => (
                            <button
                              key={q}
                              onClick={() => handleQualityChange(q)}
                              className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-800 text-slate-200"
                            >
                              <span>{q}</span>
                              {quality === q && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Subtitles selector view */}
                      {activeSettingsTab === 'subs' && (
                        <div>
                          <p className="text-[11px] font-bold text-slate-400 p-1 mb-1 border-b border-slate-800">
                            Subtitles & Audio
                          </p>
                          {(['English [CC]', 'Japanese', 'Spanish', 'Off'] as const).map((sub) => (
                            <button
                              key={sub}
                              onClick={() => handleSubtitlesChange(sub)}
                              className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-800 text-slate-200"
                            >
                              <span>{sub}</span>
                              {subtitle === sub && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Fullscreen Button */}
                <button
                  onClick={toggleFullscreen}
                  className="p-2 rounded-lg hover:bg-white/10 text-slate-300 transition-colors"
                  aria-label="Toggle Fullscreen"
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Below Player: Episode info, switcher & description */}
        <div className="p-4 sm:p-6 bg-slate-950 border-t border-slate-800 flex flex-col md:flex-row items-start justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-xs font-bold bg-purple-900/60 text-purple-300 border border-purple-500/40">
                Episode {episodeNumber}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white">
                {currentEp.title}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentEp.synopsis || anime.synopsis}
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-400 pt-1">
              <span>{anime.studio}</span>
              <span>•</span>
              <span>{anime.genres.join(', ')}</span>
              <span>•</span>
              <span className="text-amber-400 font-bold">★ {anime.rating}</span>
            </div>
          </div>

          {/* Episode switch buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handlePrevEpisode}
              disabled={episodeNumber <= 1}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-40 text-xs font-semibold"
            >
              Previous Ep
            </button>
            <button
              onClick={handleNextEpisode}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-xs font-bold shadow-md hover:brightness-110"
            >
              Next Ep
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
