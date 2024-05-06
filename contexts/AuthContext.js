import { createContext, useEffect, useState } from "react";

import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import {
  getCustomerById,
  loginUser,
  logoutUser,
} from "../services/firebase/auth";

const initialUser = {
  isAuth: false,
  firstName: "",
  lastName: "",
  email: null,
  uid: null,
};
export const AuthContext = createContext({
  login: () => {},
  logout: () => {},
  user: initialUser,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(initialUser);
  const [initialized, setInitialized] = useState(true);
  const { getItem, setItem, removeItem } = useAsyncStorage("user");

  useEffect(() => {
    const initStorage = async () => {
      const data = await getItem();

      if (data) {
        const currentUser = JSON.parse(data);
        setUser(currentUser);
      }
      setInitialized(false);
    };

    initStorage();
  }, []);

  const login = async (data) => {
    const res = await loginUser(data);

    if (res.isSuccess && res.data.user) {
      const { email, uid } = res.data.user || {};

      const customer = await getCustomerById(uid);

      //check customer in firestore
      if (!customer.isSuccess || !customer?.data) return;

      const currentUser = {
        isAuth: true,
        email,
        uid,
        firstName: customer.data.firstName,
        lastName: customer.data.lastName,
      };

      await setItem(JSON.stringify(currentUser));
      setUser(currentUser);
    }

    return res.isSuccess;
  };

  // call this function to sign out logged in user
  const logout = async () => {
    const res = await logoutUser();
    if (!res.isSuccess) return;

    await removeItem();
    setUser(initialUser);
    return res.isSuccess;
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        user,
        initialized,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
