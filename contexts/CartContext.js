import { createContext, useMemo, useState } from "react";

export const CartContext = createContext({
  cart: [],
  addCartItem: () => {},
  deleteCartItem: () => {},
  resetCart: () => {},
  subtotal: 0,
});

/* Cart item data
    - title
    - quantity
    - price
*/

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const addCartItem = (product) => {
    const { id, title, image, price = "" } = product || {};
    const cartItem = cart.find((item) => item.id === product.id) || {};

    if (cartItem.id) {
      setCart((curr) =>
        curr.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart((curr) => [...curr, { id, title, price, quantity: 1, image }]);
    }
  };

  const deleteCartItem = (product) => {
    const { id, quantity } = cart.find((item) => item.id === product.id) || {};

    if (!id) return;

    if (quantity === 1) {
      setCart((curr) => curr.filter((item) => item.id !== id));
    } else {
      setCart((curr) =>
        curr.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    }
  };

  const subtotal = useMemo(
    () =>
      cart.reduce((acc, curr) => {
        const itemTotal = Number(curr.price) * Number(curr.quantity);
        return acc + itemTotal;
      }, 0),
    [cart]
  );

  const resetCart = () => {
    setCart([]);
  };

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
