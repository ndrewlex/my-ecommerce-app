import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getCustomerById, updateCartUser } from "../services/firebase/auth";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext({
  cart: [],
  addCartItem: () => {},
  deleteCartItem: () => {},
  resetCart: () => {},
  subtotal: 0,
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

  const fetchUserData = useCallback(async () => {
    if (!user.uid) return;
    const res = await getCustomerById(user.uid);
    if (res.isSuccess && res.data) {
      const { cart } = res.data;
      setCart(cart);
    }
  }, [user.uid]);

  useEffect(() => {
    fetchUserData();
  }, [user.uid, fetchUserData]);

  const addCartItem = useCallback((product) => {
    setCart((curr) => {
      const cartItem = curr.find((curr) => curr.itemId === product.itemId);
      const newCart = cartItem
        ? curr.map((row) =>
            row.itemId === product.itemId
              ? Object.assign(row, { quantity: row.quantity + 1 })
              : row
          )
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

      const newCart = !cartItem
        ? curr
        : cartItem.quantity === 1
        ? curr.filter((row) => row.itemId !== product.itemId)
        : curr.map((row) => {
            const quantity = (row.quantity || 0) - 1;
            const price = quantity * product.price;

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
    setCart([]);
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        subtotal,
        addCartItem,
        deleteCartItem,
        resetCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
