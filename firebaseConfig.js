// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD7ICZNa4CCeP2ApD7rJBKCrsFAUN22Nmo",
  authDomain: "vsos-4bd38.firebaseapp.com",
  projectId: "vsos-4bd38",
  storageBucket: "vsos-4bd38.firebasestorage.app",
  messagingSenderId: "397522633014",
  appId: "1:397522633014:web:767cfddc7d6670581bb397",
  measurementId: "G-2D60BVJX16",
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
