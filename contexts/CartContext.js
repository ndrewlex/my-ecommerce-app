import { useNavigation } from "@react-navigation/native";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { APP_SCREENS } from "../constants/screens";
import { getCustomerById, updateCartUser } from "../services/firebase/auth";
import { addTransaction } from "../services/firebase/transactions";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext({
  cart: [],
  addCartItem: () => {},
  deleteCartItem: () => {},
  resetCart: () => {},
  subtotal: 0,
  fetchUserData: () => {},
  checkoutCart: () => {},
});

export const convertProductToCart = (product) => {
  return {
    itemId: product?.id ?? null,
    itemTitle: product.title,
    itemPrice: Number(product.price || 0),
    itemImage: product.image,
  };
};

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  const navigation = useNavigation();

  const fetchUserData = useCallback(async () => {
    if (!user.uid) return;
    const res = await getCustomerById(user.uid);
    if (res.isSuccess && res.data) {
      const { cart } = res.data;
      if (cart) {
        setCart(cart);
      }
    }
  }, [user.uid]);

  useEffect(() => {
    fetchUserData();
  }, [user.uid, fetchUserData]);

  const addCartItem = useCallback((product) => {
    setCart((curr) => {
      const cartItem = curr.find((curr) => curr.itemId === product.itemId);

      const newCart = cartItem
        ? curr.map((row) => {
            const quantity = Number(row.quantity) + 1;

            return row.itemId === product.itemId
              ? Object.assign(row, {
                  quantity,
                  price: quantity * product.itemPrice,
                })
              : row;
          })
        : [
            ...curr,
            {
              ...product,
              price: product.itemPrice,
              quantity: 1,
            },
          ];
      updateCartUser({
        uid: user.uid,
        cart: newCart,
      });
      return newCart;
    });
  }, []);

  const deleteCartItem = useCallback((product) => {
    setCart((curr) => {
      const cartItem = curr.find((curr) => curr.itemId === product.itemId);

      if (!cartItem) return curr;

      const newCart =
        cartItem.quantity === 1
          ? curr.filter((row) => row.itemId !== product.itemId)
          : curr.map((row) => {
              const quantity = (row.quantity || 0) - 1;
              const price = quantity * product.itemPrice;

              return row.itemId === product.itemId
                ? Object.assign(row, { quantity, price })
                : row;
            });

      updateCartUser({
        uid: user.uid,
        cart: newCart,
      });

      return newCart;
    });
  }, []);

  const subtotal = useMemo(
    () => cart.reduce((acc, curr) => acc + curr.price, 0),
    [cart]
  );

  const resetCart = useCallback(() => {
    if (user.uid) {
      updateCartUser({ uid: user.uid, cart: [] });
      setCart([]);
    }
  }, [user.uid]);

  const checkoutCart = useCallback(async () => {
    await addTransaction(user.uid, cart, subtotal);
    await resetCart();
    navigation.navigate(APP_SCREENS.THANK_YOU);
  }, [user.uid, cart, resetCart, navigation, subtotal]);

  return (
    <CartContext.Provider
      value={{
        cart,
        subtotal,
        addCartItem,
        deleteCartItem,
        resetCart,
        fetchUserData,
        checkoutCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
