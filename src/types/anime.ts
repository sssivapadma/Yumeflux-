export interface Episode {
  id: string;
  number: number;
  title: string;
  thumbnail: string;
  duration: string;
  synopsis: string;
  airDate: string;
}

export interface Character {
  id: string;
  name: string;
  japaneseName: string;
  role: 'Main' | 'Supporting';
  image: string;
  voiceActor: string;
}

export type AnimeStatus = 'Airing' | 'Completed' | 'Upcoming';
export type AnimeType = 'TV Series' | 'Movie' | 'OVA' | 'Special';
export type AudioType = 'SUB & DUB' | 'SUB ONLY' | 'DUB ONLY';

export interface Anime {
  id: string;
  title: string;
  japaneseTitle: string;
  romajiTitle: string;
  description: string;
  synopsis: string;
  rating: number; // e.g. 9.1
  rank: number;
  popularityRank: number;
  year: number;
  season: string; // e.g. 'Fall 2023'
  episodesCount: number;
  durationPerEp: string;
  status: AnimeStatus;
  type: AnimeType;
  studio: string;
  genres: string[];
  moodTags: string[];
  lengthCategory: 'Short' | 'Medium' | 'Long'; // Short: <13 eps, Medium: 13-36 eps, Long: 37+ eps
  subDub: AudioType;
  languages: string[];
  bannerImage: string;
  posterImage: string;
  videoSampleUrl: string; // royalty-free / sample demo stream
  episodes: Episode[];
  characters: Character[];
  relatedAnimeIds: string[];
  isTrending?: boolean;
  trendingRank?: number;
  isRecentlyAdded?: boolean;
  releaseDateText?: string;
  latestEpisode?: number;
  featuredInHero?: boolean;
  heroTagline?: string;
  matchScore?: number; // 98% Match
}

export interface ContinueWatchingItem {
  animeId: string;
  animeTitle: string;
  posterImage: string;
  currentEpisode: number;
  episodeTitle: string;
  progressPercent: number; // 0 to 100
  remainingMinutes: number;
  totalDurationMinutes: number;
}

export type PageView = 'home' | 'browse' | 'genres' | 'trending' | 'popular' | 'anime-detail' | 'profile';

export type MoodType = 'Exciting' | 'Emotional' | 'Funny' | 'Relaxing' | 'Dark' | 'Romantic' | 'Epic';
export type TimeCommitment = 'Short' | 'Medium' | 'Long';

export interface DreamFinderAnswers {
  mood: MoodType | null;
  genre: string | null;
  timeCommitment: TimeCommitment | null;
}

export interface UserProfile {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  isVip: boolean;
  memberSince: string;
  stats: {
    animeWatched: number;
    episodesWatched: number;
    hoursWatched: number;
    favoriteGenre: string;
  };
}

export interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'warning';
}
