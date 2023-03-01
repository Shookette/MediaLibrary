import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  getDocs,
  collection,
  DocumentReference,
  CollectionReference,
  QuerySnapshot,
  DocumentSnapshot,
  Firestore,
  DocumentData,
  deleteDoc,
  query,
  where,
} from 'firebase/firestore';
import {Media} from '../interfaces/Media';
import {sortList, transformCollectionToArray} from './utils';

const getDocRef = (collectionName: string, id: string): DocumentReference => {
  const db = getFirestore();
  return doc(db, collectionName, id);
};

const getCollectionRef = (collectionName: string): CollectionReference<DocumentData> => {
  const db: Firestore = getFirestore();
  return collection(db, collectionName);
};

const getMedias = async (userUID: string): Promise<Media[]> => {
  const result: QuerySnapshot = await getDocs(
    query(getCollectionRef('medias'), where('userUID', '==', userUID))
  );

  const resultArray = transformCollectionToArray<Media>(result);
  sortList(resultArray, 'title');

  return resultArray;
};

const getMediaByID = async (id: string): Promise<Media | null> => {
  const result: DocumentSnapshot = await getDoc(getDocRef('medias', id));
  return result.exists() ? (result.data() as Media) : null;
};

const setMedia = async (media: Media): Promise<void> => {
  const mediaCollection = getCollectionRef('medias');
  const mediaDocument = doc(mediaCollection, media.id);
  await setDoc<DocumentData>(mediaDocument, media);
};

const deleteMedia = async (id: string): Promise<void> => {
  return await deleteDoc(getDocRef('medias', id));
};

export {getMedias, getMediaByID, setMedia, deleteMedia};
