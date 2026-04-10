import { Box, Typography } from "@mui/material";
import CurrentOrder from "../components/CurrentOrder";
import PastOrders from "../components/PastOrders";
import { saveOrderToHistory } from "../utils/orderStorage";
export default function Orders() {

// Getting session identity
  const email = localStorage
    .getItem("currentUserEmail")
    ?.toLowerCase();

  if (!email) {
    return <Typography>Please log in</Typography>;
  }

  const lastOrder = localStorage.getItem("lastOrder");
  const currentOrder = lastOrder ? JSON.parse(lastOrder) : null;

if (
  email &&
  currentOrder &&
  currentOrder.status === "IN_PROGRESS" &&
  Date.now() >= currentOrder.endTime
) {
  // Finalize order even after refresh
  saveOrderToHistory(email, {
    ...currentOrder,
    status: "COMPLETED",
    completedAt: Date.now(),
  });

  localStorage.removeItem("lastOrder");
}

  const hasActiveOrder =
    currentOrder && currentOrder.status !== "COMPLETED";

  //Read past orders (account-scoped)
  const history = JSON.parse(
    localStorage.getItem(`orderHistory_${email}`) || "[]"
  );


  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Your Orders
      </Typography>

      {/* Current order section */}
      {hasActiveOrder && (
        <CurrentOrder order={currentOrder} />
      )}

      {/* Past orders section (can always show) */}
      <PastOrders history={history}/>
    </Box>
  );
}