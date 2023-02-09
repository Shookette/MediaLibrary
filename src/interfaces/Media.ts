export default interface Media {
  id: string;
  title: string;
  description?: string;
  creationDate?: string;
  image?: string;
  lend: boolean;
  comment?: string;
  type: 'book' | 'videogame' | 'boardgame';
};
