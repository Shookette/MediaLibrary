import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  getDocs,
  collection,
  DocumentReference,
  CollectionReference,
  QueryDocumentSnapshot,
  QuerySnapshot,
  DocumentSnapshot,
  Firestore,
  DocumentData
} from 'firebase/firestore'
import Media from "../interfaces/Media";

const getDocRef = (collectionName: string, id: string): DocumentReference => {
  const db = getFirestore();
  return doc(db, collectionName, id);
}

const getCollectionRef = (collectionName: string): CollectionReference<DocumentData> => {
  const db: Firestore = getFirestore();
  return collection(db, collectionName);
}

const getMedias = async (): Promise<Media[]> => {
  const result: QuerySnapshot = await getDocs(getCollectionRef('medias'));
  const arrayMedia: Media[] = [];

  result.forEach((media: QueryDocumentSnapshot) => {
    arrayMedia.push(media.data() as Media);
  });
  return arrayMedia;
}

const getMediaByID = async (id: string): Promise<Media | null> => {
  const result: DocumentSnapshot = await getDoc(getDocRef('medias', id));
  return (result.exists()) ? result.data() as Media : null;
}

const setMedia = async (media: Media): Promise<void> => {
  const mediaCollection = getCollectionRef('medias');
  const mediaDocument = doc(mediaCollection, media.id);
  await setDoc<DocumentData>(mediaDocument, media);
}


export {
  getMedias,
  getMediaByID,
  setMedia
}