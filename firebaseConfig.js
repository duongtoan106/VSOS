// Import Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCrqc7StMaxAssov6G6usd_8-4wGjSx1sI",
  authDomain: "vsos-f1c4e.firebaseapp.com",
  projectId: "vsos-f1c4e",
  storageBucket: "vsos-f1c4e.firebasestorage.app", // 🔥 ĐÃ SỬA LỖI storageBucket
  messagingSenderId: "490065434349",
  appId: "1:490065434349:web:d02a03a4cf704468855ee4",
  measurementId: "G-CDSBJGS5JC",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Hàm upload ảnh lên Firebase Storage
export const uploadImage = async (file) => {
  if (!file) {
    console.error("❌ Không có file nào được chọn!");
    return null;
  }

  try {
    // Initialize Storage
    const storage = getStorage(app);
    const uniqueFileName = `${Date.now()}-${file.name}`;
    const storageRef = ref(storage, `products/${uniqueFileName}`);

    console.log("📤 Bắt đầu tải lên:", uniqueFileName);
    const snapshot = await uploadBytes(storageRef, file);
    console.log("✅ Upload thành công:", snapshot);

    // Lấy URL tải về
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log("🔗 URL của ảnh:", downloadURL);
    return downloadURL;
  } catch (error) {
    console.error("🔥 Lỗi khi upload ảnh:", error);
    return null; // Trả về null khi lỗi
  }
};
