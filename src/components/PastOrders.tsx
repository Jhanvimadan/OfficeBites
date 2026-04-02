import { Box, Typography, Card } from "@mui/material";

export default function PastOrders() {
  const history = JSON.parse(
    localStorage.getItem("orderHistory") || "[]"
  );

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
          <Typography>
            {order.restaurantName}
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