export type GoogleBookApiVolumeList = {
  totalItems: number;
  kind: string;
  items?: GoogleBookApiVolume[];
};

export type GoogleBookApiVolume = {
  etag: string;
  id: string;
  kind: string;
  volumeInfo: {
    selfLink: string;
    language: string;
    title: string;
    publisher?: string;
    publishedDate?: string;
    description?: string;
    author?: string[];
    imageLinks?: {
      smallThumbnail: string;
      thumbnail: string;
    };
  };
};
