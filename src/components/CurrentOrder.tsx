import { useEffect, useState, useRef } from "react";
import { Box, Typography, Card } from "@mui/material";
import toast from "react-hot-toast";

/*
CurrentOrder shows the live order that is currently being prepared.
It:
- shows countdown till order is ready
- notifies user when ready
- moves order to history once completed
*/

export default function CurrentOrder({ order }: any) {

  // Calculate the exact time when order should be ready
  // (created time + preparation time)
  const endTime = order.createdAt + order.prepTime * 60 * 1000;

  // Remaining time (in milliseconds)
  const [remaining, setRemaining] = useState(endTime - Date.now());

  // This flag ensures toast fires only once
  const hasNotified = useRef(false);

  /*
  Countdown timer:
  Runs every second and updates remaining time.
  */
  useEffect(() => {
    const timer = setInterval(() => {
      setRemaining(endTime - Date.now());
    }, 1000);

    // Cleanup interval when component unmounts
    return () => clearInterval(timer);
  }, [endTime]);

  /*
  Order completion effect:
  - Fires once when remaining time reaches 0
  - Shows toast
  - Moves order from "lastOrder" to "orderHistory"
  */
  useEffect(() => {
    if (remaining <= 0 && !hasNotified.current) {
      hasNotified.current = true;

      // Notify user
      //toast.success("🎉 Your order is ready! Please collect it.");

      // Read existing order history (or empty array)
      const history = JSON.parse(
        localStorage.getItem("orderHistory") || "[]"
      );

      // Add completed order to history
      history.unshift({
        ...order,
        status: "COMPLETED",
        completedAt: Date.now(),
      });

      // Save updated history
      localStorage.setItem("orderHistory", JSON.stringify(history));

      // Remove current active order
      localStorage.removeItem("lastOrder");
    }
  }, [remaining, order]);

  // Convert remaining milliseconds to minutes and seconds
  const minutes = Math.max(0, Math.floor(remaining / 60000));
  const seconds = Math.max(0, Math.floor((remaining % 60000) / 1000));

  return (
    <Card sx={{ p: 3 }}>
      {/* Restaurant name */}
      <Typography fontWeight="bold">
        Preparing at {order.restaurantName}
      </Typography>

      {/* Token number */}
      <Typography mt={1}>
        Token: <strong>{order.token}</strong>
      </Typography>

      {/* Countdown / Ready message */}
      <Typography color="primary" mt={1}>
        {remaining > 0
          ? `Ready in ${minutes}:${seconds.toString().padStart(2, "0")} mins`
          : "✅ Ready for pickup"}
      </Typography>
    </Card>
  );
}