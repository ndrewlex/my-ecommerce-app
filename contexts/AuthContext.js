import { createContext, useEffect, useState } from "react";

import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { loginUser, logoutUser } from "../services/firebase/auth";

const initialUser = {
  isAuth: false,
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
      const currentUser = { isAuth: true, email, uid };

      await setItem(JSON.stringify(currentUser));
      setUser(currentUser);
    }
    return res;
  };

  // call this function to sign out logged in user
  const logout = async () => {
    const res = await logoutUser();
    if (res.isSuccess) {
      await removeItem();
      setUser(initialUser);
    }
    return res;
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
