export interface ITrack {
  title: string;
  album: string;
  albumCover: string;
  artist: string;
  id: string;
  preview: number;
  link: string
  isFavorite?: boolean;
}