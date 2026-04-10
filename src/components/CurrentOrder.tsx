import { useEffect, useState, useRef } from "react";
import { Box, Typography, Card } from "@mui/material";
import { saveOrderToHistory } from "../utils/orderStorage";
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
   const hasNotified = useRef(false);
  /*
  Order completion effect:
  - Fires once when remaining time reaches 0
  - Shows toast
  - Moves order from "lastOrder" to "orderHistory"
  */
useEffect(() => {
  if (remaining <= 0 && !hasNotified.current) {
    hasNotified.current = true;

    // Get session identity
    const email = localStorage
      .getItem("currentUserEmail")
      ?.toLowerCase();

    if (!email) return;

   // const historyKey = `orderHistory_${email}`;



 //  // Read user-specific order history
 //  const history = JSON.parse(
 //    localStorage.getItem(historyKey) || "[]"
 //  );

   // Add completed order
 //  history.unshift({
 //    ...order,
 //    status: "COMPLETED",
 //    completedAt: Date.now(),
 //  });

 //  // Save back to user-specific history
 //  localStorage.setItem(
 //    historyKey,
 //    JSON.stringify(history)
 //  );

 //  // Remove active order
 //  localStorage.removeItem("lastOrder");

 //  // Optional toast
 //  // toast.success("🎉 Your order is ready! Please collect it.");
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