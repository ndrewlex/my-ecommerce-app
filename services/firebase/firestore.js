import { getFirestore } from "firebase/firestore";
import { firebaseApp } from "./initFirebase";

export const db = getFirestore(firebaseApp);
