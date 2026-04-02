import { Box, Typography, Card } from "@mui/material";

export default function PastOrders() {
  const history = JSON.parse(
    localStorage.getItem("orderHistory") || "[]"
  );
  const formatDateTime = (timestamp: number) => {
  return new Date(timestamp).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};
  if (history.length === 0) {
    return <Typography>No past orders</Typography>;
  }

  return (
    <Box mt={4}>
      <Typography fontWeight="bold" mb={2}>
        Past Orders
      </Typography>

      {history.map((order: any) => (
        <Card key={order.token} sx={{ p: 2, mb: 2 }}>
  <Typography fontWeight="bold">
    {order.restaurantName}
  </Typography>

  <Typography variant="body2" color="text.secondary">
    {formatDateTime(order.completedAt)}
  </Typography>

  <Typography variant="caption">
    Token: {order.token}
  </Typography>
</Card>
      ))}
    </Box>
  );
}
``