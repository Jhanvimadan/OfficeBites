import { createContext, useContext, useState } from "react";

/* ---------------- TYPES ---------------- */

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type Offer = {
  header?: string;
  subHeader?: string;
};

type RepeatableOrder = {
  restaurantName: string;
  restaurantImageId?: string;
  items: CartItem[];
};

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
  repeatOrder: (order: RepeatableOrder) => void;
  totalAmount: number;
  discountAmount: number;
  finalAmount: number;
};

const CartContext = createContext<CartContextType | null>(null);

/* ---------------- PROVIDER ---------------- */

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [restaurantName, setRestaurantName] = useState<string | null>(null);
  const [appliedOffer, setAppliedOffer] = useState<Offer | null>(null);
  const [restaurantImageId, setRestaurantImageId] = useState<string | null>(null);

  /* ---------- CART ACTIONS ---------- */

  const addItem = (
    item: Omit<CartItem, "quantity">,
    restName: string,
    offer?: Offer,
    restaurantImageId?: string
  ) => {
    if (restaurantName && restaurantName !== restName) {
      throw new Error("DIFFERENT_RESTAURANT");
    }

    setRestaurantName(prev => prev ?? restName);
    setRestaurantImageId(prev => prev ?? restaurantImageId ?? null);

    if (offer && !appliedOffer) {
      setAppliedOffer(offer);
    }

    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeItem = (id: string) => {
    setCartItems(prev =>
      prev
        .map(i =>
          i.id === id ? { ...i, quantity: i.quantity - 1 } : i
        )
        .filter(i => i.quantity > 0)
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setRestaurantName(null);
    setAppliedOffer(null);
    setRestaurantImageId(null);
  };

  /* ---------- DERIVED VALUES ---------- */

  const totalAmount = cartItems.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  let discountAmount = 0;

  if (appliedOffer?.header?.includes("%")) {
    const percent = parseInt(appliedOffer.header);
    const percentDiscount = (totalAmount * percent) / 100;

    let maxCap = Infinity;
    if (appliedOffer.subHeader) {
      const match = appliedOffer.subHeader.match(/₹(\d+)/);
      if (match) maxCap = parseInt(match[1]);
    }
    discountAmount = Math.min(percentDiscount, maxCap);
  }

  const finalAmount = Math.max(totalAmount - discountAmount, 0);

  /* ---------- ORDER FLOW ---------- */

  const completeOrder = (paymentMode: "UPI" | "COUNTER") => {
    if (cartItems.length === 0 || !restaurantName) {
      throw new Error("Cannot place order");
    }

    const now = Date.now();
    const prepTime = 10 + cartItems.length * 2;
    const endTime = now + prepTime * 60 * 1000;

    const order = {
      token: "ORD-" + Math.floor(1000 + Math.random() * 9000),
      restaurantName,
      restaurantImageId,
      items: cartItems,
      totalAmount: finalAmount,
      paymentMode,
      prepTime,
      createdAt: now,
      endTime,
      status: "IN_PROGRESS",
    };

    localStorage.setItem("lastOrder", JSON.stringify(order));
    clearCart();
  };

  /* ---------- REPEAT ORDER ---------- */

  const repeatOrder = (order: RepeatableOrder) => {
    clearCart();
    setRestaurantName(order.restaurantName);
    setRestaurantImageId(order.restaurantImageId || null);
    setCartItems(order.items.map(item => ({ ...item })));
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
        repeatOrder,
        totalAmount,
        discountAmount,
        finalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

/* ---------------- HOOK ---------------- */

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return ctx;
};