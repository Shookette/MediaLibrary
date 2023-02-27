export type MediaType = 'book' | 'videogame' | 'boardgame' | 'vinyl' | 'manga' | 'comics';

export type Media = {
  id: string;
  title: string;
  description?: string;
  release?: string;
  image?: string;
  lend: boolean;
  comment?: string;
  type: MediaType;
  userUID: string;
};
