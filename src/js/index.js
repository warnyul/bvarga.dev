import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDJMVkse8Mla3rqrVak1qkfXYxlh2AmUd8",
  authDomain: "bvarga-fe600.firebaseapp.com",
  projectId: "bvarga-fe600",
  storageBucket: "bvarga-fe600.appspot.com",
  messagingSenderId: "443364341536",
  appId: "1:443364341536:web:d7b91d4ecfa7618f594945",
  measurementId: "G-PB70YSPDG1"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);