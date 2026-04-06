// to keep cart, quantities, totals, restaurant name in sync across many pages
// cart belongs to user session not page
import { createContext, useContext, useState } from "react";

// describes what a cart item is
type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

// describes offer coming from API
type Offer = {
  header?: string;     // e.g. "20% OFF"
  subHeader?: string;  // e.g. "UPTO ₹100"
};

// describes everything the rest of the app is allowed to do with the cart
type CartContextType = {
  cartItems: CartItem[];
  restaurantName: string | null;
  appliedOffer: Offer | null;
  restaurantImageId: string | null;
  addItem: (
    item: Omit<CartItem, "quantity">,
    restaurantName: string,
    offer?: Offer,
    restaurantImageId?: string
  ) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  completeOrder: (paymentMode: "UPI" | "COUNTER") => void;
  totalAmount: number;
  discountAmount: number;
  finalAmount: number;
};

// creates a container for cart data
const CartContext = createContext<CartContextType | null>(null);

// CartProvider owns cart state and provides functions to manipulate it
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [restaurantName, setRestaurantName] = useState<string | null>(null);
  const [appliedOffer, setAppliedOffer] = useState<Offer | null>(null);
  const [restaurantImageId, setRestaurantImageId] = useState<string | null>(null);

  // cart belongs to one restaurant
  const addItem = (
  item: Omit<CartItem, "quantity">,
  restName: string,
  offer?: Offer,
  restaurantImageId?: string,
  force = false
) => {
  // CART RESTAURANT MISMATCH CHECK
  if (restaurantName && restaurantName !== restName) {
    throw new Error("DIFFERENT_RESTAURANT");
  }

  setRestaurantName((prev) => prev ?? restName);

  setRestaurantImageId((prev) => prev ?? restaurantImageId ?? null);

    // capture offer only once (first item)
    if (offer && !appliedOffer) {
      setAppliedOffer(offer);
    }

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

  // removes one quantity of item
  const removeItem = (id: string) => {
    setCartItems((prev) =>
      prev
        .map((i) =>
          i.id === id ? { ...i, quantity: i.quantity - 1 } : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  // clears cart completely
  const clearCart = () => {
    setCartItems([]);
    setRestaurantName(null);
    setAppliedOffer(null);
    setRestaurantImageId(null);
  };

  // subtotal                    
  const totalAmount = cartItems.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  // discount calculation
  let discountAmount = 0;

  if (appliedOffer?.header?.includes("%")) {
    const percent = parseInt(appliedOffer.header); // "20% OFF" → 20
    const percentDiscount = (totalAmount * percent) / 100;

    let maxCap = Infinity;
    if (appliedOffer.subHeader) {
      const match = appliedOffer.subHeader.match(/₹(\d+)/);
      if (match) {
        maxCap = parseInt(match[1]);
      }
    }

    discountAmount = Math.min(percentDiscount, maxCap);
  }

  // final payable amount
  const finalAmount = Math.max(
    totalAmount - discountAmount,
    0
  );

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

  return (
    <CartContext.Provider
      value={{
        cartItems,
        restaurantName,
        restaurantImageId,
        appliedOffer,
        addItem,
        removeItem,
        clearCart,
        completeOrder,
        totalAmount,
        discountAmount,
        finalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// custom hook to access cart safely
export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return ctx;
};
