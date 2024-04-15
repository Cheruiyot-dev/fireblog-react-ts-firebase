import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyDQ8-Y4T8lYNmV-vrcL7QoTj8qcIUj3Eq0",
    authDomain: "fireblog-2c10e.firebaseapp.com",
    projectId: "fireblog-2c10e",
    storageBucket: "fireblog-2c10e.appspot.com",
    messagingSenderId: "233960854132",
    appId: "1:233960854132:web:1b2e8cf9c59e7f2242b721",
    measurementId: "G-RKWH6SE6ZK"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const storage = getStorage(app);

  export { auth, db, storage };