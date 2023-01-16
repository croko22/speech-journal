import { initializeApp } from "firebase/app";
import { getFirestore, onSnapshot, collection, getDocs, getDoc, doc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCp6dl3-SftKiR5eXk-kZrojnd5RAcauow",
  authDomain: "firestore-js-a700b.firebaseapp.com",
  projectId: "firestore-js-a700b",
  storageBucket: "firestore-js-a700b.appspot.com",
  messagingSenderId: "114839049147",
  appId: "1:114839049147:web:4a94b5406de2599adcaa9e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

//Get tasks
// export const getTasks = (callback) => {
//   onSnapshot(collection(db, "tasks"), (querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//       console.log(`${doc.id} => ${doc.data()}`);
//     });
//   });
// }
export const getTasks = () => getDocs(collection(db, "tasks"));