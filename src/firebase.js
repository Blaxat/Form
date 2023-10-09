import { initializeApp } from "firebase/app"
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAu4cDbTzCuM-xrwmTA775Headh94o1s8w",
  authDomain: "msform-7f3e0.firebaseapp.com",
  databaseURL: "https://msform-7f3e0-default-rtdb.firebaseio.com",
  projectId: "msform-7f3e0",
  storageBucket: "msform-7f3e0.appspot.com",
  messagingSenderId: "906555176951",
  appId: "1:906555176951:web:5891e3f2043fa666b160f2",
  measurementId: "G-V6XZGG3R64"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export {db};