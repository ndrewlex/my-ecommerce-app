import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getErrorMessage } from "./errorMessage";
import { db } from "./firestore";
import { firebaseApp } from "./initFirebase";

async function registerUser({ email, password }) {
  try {
    const auth = getAuth(firebaseApp);
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await setDoc(doc(db, "company", userCredential.user.uid), {
      email,
    });

    return {
      isSuccess: true,
      data: userCredential,
    };
  } catch (e) {
    return {
      isSuccess: false,
      error: getErrorMessage(e),
    };
  }
}

async function loginUser({ email, password }) {
  try {
    const auth = getAuth(firebaseApp);
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return { isSuccess: true, data: userCredential };
  } catch (e) {
    return {
      isSuccess: false,
      error: getErrorMessage(e),
    };
  }
}

async function logoutUser() {
  const auth = getAuth(firebaseApp);

  try {
    await signOut(auth);
    return {
      isSuccess: true,
    };
  } catch (e) {
    return {
      isSuccess: false,
      error: getErrorMessage(e),
    };
  }
}

export { loginUser, logoutUser, registerUser };
