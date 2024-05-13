import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { getErrorMessage } from "./errorMessage";
import { db } from "./firestore";
import { firebaseApp } from "./initFirebase";

async function registerUser({ email, firstName, lastName, password }) {
  try {
    const auth = getAuth(firebaseApp);
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await setDoc(doc(db, "customer", userCredential.user.uid), {
      firstName,
      lastName,
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

async function getCustomerById(uid) {
  try {
    const docRef = doc(db, "customer", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        isSuccess: true,
        data: docSnap.data(),
      };
    } else {
      throw new Error("Not exist");
    }
  } catch (e) {
    return {
      isSuccess: false,
      error: getErrorMessage(e),
    };
  }
}

async function updateCartUser({ uid, cart = [] }) {
  try {
    const res = await updateDoc(doc(db, "customer", uid), {
      cart,
    });

    return {
      isSuccess: true,
      data: res,
    };
  } catch (e) {
    return {
      isSuccess: false,
      error: getErrorMessage(e),
    };
  }
}

export { getCustomerById, loginUser, logoutUser, registerUser, updateCartUser };
