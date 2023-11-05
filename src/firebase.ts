import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB_O3-SWyUlgy7ruWiTh8oWIA91sfO_NYQ",
  authDomain: "nwitter-re-c8325.firebaseapp.com",
  projectId: "nwitter-re-c8325",
  storageBucket: "nwitter-re-c8325.appspot.com",
  messagingSenderId: "1054676738162",
  appId: "1:1054676738162:web:615d755a499806539862eb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
