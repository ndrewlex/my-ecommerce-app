import { getCustomerById } from "./auth";

async function addOrderUser({ cart, userId }) {
  try {
    // Add a new document with a generated id
    const currentUserRef = await getCustomerById(userId);
    // const currentUserRefOrders = await getDoc(currentUserRef);

    // await updateDoc(doc(db, "users", doc.id), {
    //     foo: 'bar'
    //   });
    // await updateDoc(currentUserRef, {
    //   orders: [...cart],
    // });
    return { isSuccess: true };
  } catch (e) {
    return {
      isSuccess: false,
      error: getErrorMessage(e),
    };
  }
}
