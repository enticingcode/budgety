import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { setDoc, doc, getDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

//init firestore DB

const db = getFirestore(app);

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
    // let docRef = doc(db, "users", userId);
    let document = await getDoc(doc(db, "users", userId));
    let data = document.data();
    console.log(data);

    // return name;
  } catch (err) {
    console.log(err);
  }
}

async function updateMoneyValues(userID, state, stateName) {
  const userRef = doc(db, "users", userID);
  try {
    await setDoc(userRef, { [stateName]: [...state] }, { merge: true });
  } catch (err) {
    console.error("error adding document", err);
  }
}

export { connectUserNameAcc, getPersonName, updateMoneyValues };
