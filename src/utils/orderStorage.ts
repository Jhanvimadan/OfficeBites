//a utility that abstracts localStorage access for order history
//ensures order data is always stored and retrieved per user consistently
const getUserKey = (email: string) =>
  `orderHistory_${email}`;

// Get order history for current user
export const getOrderHistory = (email: string): Order[] => {
  const data = localStorage.getItem(getUserKey(email));
  return data ? JSON.parse(data) : [];
};

// Save new order to history
export const saveOrderToHistory = (
  email: string,
  order: Order
) => {
  const history = getOrderHistory(email);
  history.unshift(order); // newest first
  localStorage.setItem(
    getUserKey(email),
    JSON.stringify(history)
  );
};

// Clear history if needed (rare)
export const clearOrderHistory = (email: string) => {
  localStorage.removeItem(getUserKey(email));
};
``