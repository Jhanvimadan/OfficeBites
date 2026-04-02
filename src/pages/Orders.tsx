import { Box, Typography } from "@mui/material";
import CurrentOrder from "../components/CurrentOrder";
import PastOrders from "../components/PastOrders";

export default function Orders() {
  const lastOrder = localStorage.getItem("lastOrder");
  const currentOrder = lastOrder ? JSON.parse(lastOrder) : null;

  const hasActiveOrder =
    currentOrder && currentOrder.status !== "COMPLETED";

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Your Orders
      </Typography>

      {/* ✅ Current order section */}
      {hasActiveOrder && (
        <CurrentOrder order={currentOrder} />
      )}

      {/* ✅ Past orders section (can always show) */}
      <PastOrders />
    </Box>
  );
}