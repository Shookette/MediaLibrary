export default interface Media {
  id: string;
  title: string;
  description?: string;
  release?: string;
  image?: string;
  lend: boolean;
  comment?: string;
  type: 'book' | 'videogame' | 'boardgame';
  userUID: string;
}
