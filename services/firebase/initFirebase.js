import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEd5l6TAD_iYFOxKoPyWRzltyjfPHeQx0",
  authDomain: "my-ecommerce-ce75a.firebaseapp.com",
  projectId: "my-ecommerce-ce75a",
  storageBucket: "my-ecommerce-ce75a.appspot.com",
  messagingSenderId: "942735355529",
  appId: "1:942735355529:web:da6913fd1d09794470e058",
};

export const firebaseApp = initializeApp(firebaseConfig);

export const auth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
