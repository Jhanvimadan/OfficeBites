//to keep cart, quantities, totals, restaurant name in sync across many pages
//cart belongs to user session not page
import { createContext, useContext, useState } from "react";

//describes what a cart item is
type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};
//describes everything the rest of the app is allowed to do with the cart
type CartContextType = {
  cartItems: CartItem[];
  restaurantName: string | null;
  addItem: (
    item: Omit<CartItem, "quantity">,
    restaurantName: string
  ) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  totalAmount: number;
};


//creates a container for cart data with default as null as without a provide, cart should not exist
const CartContext = createContext<CartContextType | null>(null);

//CartProvider owns cart state and provides functions to manipulate it. It wraps the entire app in App.tsx so that cart is accessible everywhere
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [restaurantName, setRestaurantName] = useState<string | null>(null);
  
  //cart belongs to one restaurant
  const addItem = (
  item: Omit<CartItem, "quantity">,
  restName: string
) => {
  setRestaurantName((prev) => prev ?? restName);

  //check whether item already exists in cart
  //if yes-> increase qty
  //if no -> add new entry
  setCartItems((prev) => {
    const existing = prev.find((i) => i.id === item.id);

    if (existing) {
      return prev.map((i) =>
        i.id === item.id
          ? { ...i, quantity: i.quantity + 1 }
          : i
      );
    }

    return [...prev, { ...item, quantity: 1 }];
  });
};

//removes one quantity of the item. If quantity becomes 0, remove it from cart
  const removeItem = (id: string) => {
    setCartItems((prev) =>
      prev
        .map((i) =>
          i.id === id ? { ...i, quantity: i.quantity - 1 } : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  //clears cart completely
  const clearCart = () => {
  setCartItems([]);
  setRestaurantName(null);  // reset restaurant
};
// completes the order after payment
  const completeOrder = (paymentMode: "UPI" | "COUNTER") => {
  if (cartItems.length === 0 || !restaurantName) {
    throw new Error("Cannot place order: cart or restaurant missing");
  }

  const token = "ORD-" + Math.floor(1000 + Math.random() * 9000);
  const prepTime = 10 + cartItems.length * 2;

  const order = {
    token,
    restaurantName,
    createdAt: Date.now(),
    prepTime,
    paymentMode,
    status: "IN_PROGRESS",
  };

  localStorage.setItem("lastOrder", JSON.stringify(order));
  clearCart();
};
``

// calculate total amount whenever cartItems change
  const totalAmount = cartItems.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

   
  return (
    <CartContext.Provider
      value={{ cartItems, restaurantName, addItem, removeItem, clearCart, completeOrder, totalAmount }}
    >
      {children}
    </CartContext.Provider>
  );
}

//custom hook to access cart from any component
export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return ctx;
};