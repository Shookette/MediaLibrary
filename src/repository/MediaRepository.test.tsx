import {getMediaByID, getMedias} from './MediaRepository';
import {Media} from '../interfaces/Media';
import initFirebase from '../firebaseLoader';

const mockedGetDoc = jest.fn();

jest.mock('firebase/firestore', () => ({
  ...jest.requireActual('firebase/firestore'),
  getDocs: () => [
    {data: () => defaultMedia, exists: () => true},
    {data: () => ({...defaultMedia, id: '5678', title: 'Test'}), exists: () => true},
  ],
  getDoc: () => ({data: () => defaultMedia, exists: () => true}),
}));

const defaultMedia: Media = {
  id: '1234',
  title: 'Dai Dark',
  type: 'book',
  lend: false,
  image: 'https://m.media-amazon.com/images/I/81eN2lF9MmL.jpg',
  release: '',
  description: `Necromancy, space action, and dark humor collide in this wildly creative new series from the creator of Dorohedoro!
Zaha Sanko's body has great and terrible powers--they say that possessing his bones will grant you any wish, even the desire to become ruler of the universe.
But Sanko is still a teenage dude with his own life, and he isn't about to let every monstrous lowlife in the galaxy rip him limb from limb.
He and his skeletal buddy Avakian will use their dark powers to fend off any murder attempts while they search space for whomever put this curse on Sanko's bones...because killing them might end the madness.
(And then Sanko can celebrate with his favorite spaghetti.) Don't miss this hilariously twisted and gruesome new series from the unique mind of Q Hayashida, creator of the manga and Netflix anime Dorohedoro!`,
  userUID: '123',
};

describe('Media Repository', () => {
  beforeEach(() => {
    initFirebase();
  });

  it('should return a media when calling getMediaById', async () => {
    const media = await getMediaByID('1234');
    expect(media).toBeTruthy();
    expect(media?.id).toEqual(defaultMedia.id);
  });

  it('should return an array of media when calling getMedias', async () => {
    const medias = await getMedias('1234');
    expect(medias).toBeTruthy();
    expect(medias.length).toEqual(2);
    expect(medias[0].title).toEqual('Dai Dark');
    expect(medias[1].title).toEqual('Test');
  });
});
