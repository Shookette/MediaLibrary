import {Media} from '../interfaces/Media';
import {v4 as uuidv4} from 'uuid';
import {GoogleBookApiVolume, GoogleBookApiVolumeList} from '../interfaces/GoogleBookApiType';

const getMediaBookByISBNAndUserId = async (
  isbn: string,
  userID = ''
): Promise<Media | undefined> => {
  const url = `${import.meta.env.VITE_GOOGLE_BOOK_API_BASE_URL}/volumes?q=isbn:${isbn}`;
  const response = await fetch(url, {
    headers: {
      'X-goog-api-key': `${import.meta.env.VITE_GOOGLE_BOOK_API_KEY}`,
    },
  });

  const responseJSON: GoogleBookApiVolumeList = await response.json();

  if (!responseJSON.totalItems || !responseJSON.items) {
    return;
  }

  return getBookDetailById(responseJSON.items[0].id ?? '', userID);
};

const getBookDetailById = async (id: string, userID = '') => {
  const url = `${import.meta.env.VITE_GOOGLE_BOOK_API_BASE_URL}/volumes/${id}`;
  const response = await fetch(url, {
    headers: {
      'X-goog-api-key': `${import.meta.env.VITE_GOOGLE_BOOK_API_KEY}`,
    },
  });

  return formatMediaFromGoogleBookAPIResponseAndUserId(await response.json(), userID);
};

const formatMediaFromGoogleBookAPIResponseAndUserId = (
  googleBookApiResponse?: GoogleBookApiVolume,
  userid = ''
): Media => {
  const media: Media = {
    id: uuidv4(),
    userUID: userid,
    title: '',
    description: '',
    release: '',
    image: '',
    status: 'owned',
    type: 'book',
  };

  if (googleBookApiResponse && googleBookApiResponse.volumeInfo) {
    media.title = googleBookApiResponse.volumeInfo.title;
    media.release = googleBookApiResponse.volumeInfo.publishedDate;
    media.description = googleBookApiResponse.volumeInfo.description;
    media.image = googleBookApiResponse.volumeInfo.imageLinks
      ? googleBookApiResponse.volumeInfo.imageLinks.thumbnail
      : '';
  }

  return media;
};

export {
  getMediaBookByISBNAndUserId,
  getBookDetailById,
  formatMediaFromGoogleBookAPIResponseAndUserId,
};
