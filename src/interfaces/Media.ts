export type MediaType = 'book' | 'videogame' | 'boardgame' | 'vinyl' | 'manga' | 'comics';
export type MediaStatus = 'owned' | 'lend' | 'borrowed';

export type Media = {
  id: string;
  title: string;
  description?: string;
  release?: string;
  image?: string;
  status: MediaStatus;
  comment?: string;
  type: MediaType;
  userUID: string;
};
