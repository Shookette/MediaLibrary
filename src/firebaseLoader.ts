import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBTlpihyWt7I8aSshetUhaoNrFAKI6ZW4w",
  authDomain: "medialibrary-38be1.firebaseapp.com",
  projectId: "medialibrary-38be1",
  storageBucket: "medialibrary-38be1.appspot.com",
  messagingSenderId: "78507185124",
  appId: "1:78507185124:web:40f4b77d3c985375a8adf1"
};

const initFirebase = () => {
  initializeApp(firebaseConfig)
}

export default initFirebase