import {
  addDoc,
  collection,
  doc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { getErrorMessage } from "./errorMessage";
import { db } from "./firestore";

async function addTransaction(uid, cart = [], totalPrice = 0) {
  try {
    const userRef = doc(db, "customer", uid);
    const collectionRef = collection(userRef, "transactions");

    const data = await addDoc(collectionRef, {
      cart,
      totalPrice,
      timestamp: serverTimestamp(),
      status: "Paid",
    });

    return {
      isSuccess: true,
      data,
    };
  } catch (e) {
    return {
      isSuccess: false,
      error: getErrorMessage(e),
    };
  }
}

async function getTransactions(uid) {
  try {
    const querySnapshot = await getDocs(
      collection(db, "customer", uid, "transactions")
    );

    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    if (data) {
      return {
        isSuccess: true,
        data: data,
      };
    }

    throw new Error("Not exist");
  } catch (e) {
    return {
      isSuccess: false,
      error: getErrorMessage(e),
    };
  }
}

export { addTransaction, getTransactions };
