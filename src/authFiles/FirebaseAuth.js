import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  getFirestore,
  deleteDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// let localUser = localStorage.getItem("user");

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

//init firestore DB
export const db = getFirestore(app);


async function connectUserNameAcc(userName, userId) {
  await setDoc(
    doc(db, "users", userId),
    {
      userName: userName,
    },
    { merge: true }
  ).then((err) => {
    console.error("error adding document", err);
  });
}

async function getPersonName(userId) {
  try {
    let docRef = doc(db, "users", userId);
    let document = await getDoc(docRef);
    let data = document.data();
    let name = data.userName;
    return name;
  } catch (err) {
    console.log(err);
  }
}


/**
 * 
 * @param {String} userID - User String Identifier for Firebase Collection Ref
 * @param {String} category - Category of cashFlow
 * @param {Object} object - name, amount, id, date
 * @param {String} action - "add" or "del" firebase document
 */
async function updateFirebaseValues(userID, category, object, action) {
  const userRef = doc(db, "users", userID);

  if (action === "add") {
    try {
      await updateDoc(userRef, {
        [category]: arrayUnion(object),
      });
    } catch (err) {
      console.error("error adding document", err);
    }
  } else if (action === "del") {
    try {
      await setDoc(userRef, { [category]: object }, { merge: true });
    } catch (err) {
      console.error("error deleting document", err);
    }
  }
  else if (action === "edit") {
    try {
      await setDoc(userRef, {[category]: object}, {merge: true});
      
    } catch(err) {
      console.error("Error Editing Item: ", err);
    }
  }
}

export { connectUserNameAcc, getPersonName, updateFirebaseValues };
