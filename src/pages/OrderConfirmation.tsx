import { Box, Typography, Card, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

export default function OrderConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();

  // Try route state first
  const routeData = location.state as {
    token?: string;
    prepTime?: number;
  } | null;

  // Fallback to localStorage
  const storedOrder = localStorage.getItem("lastOrder");
  const parsedOrder = storedOrder ? JSON.parse(storedOrder) : null;

  const token = routeData?.token || parsedOrder?.token;
  const prepTime = routeData?.prepTime || parsedOrder?.prepTime;

  if (!token || !prepTime) {
    return <Typography>Invalid or expired order</Typography>;
  }

  return (
    <Box sx={{ p: 4, display: "flex", justifyContent: "center" }}>
      <Card sx={{ p: 4, width: 420, textAlign: "center" }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          ✅ Order Confirmed
        </Typography>

        <Typography mb={2}>
          Please collect your order from the food stall.
        </Typography>

        <Typography
          fontSize="2.2rem"
          fontWeight="bold"
          color="primary"
          mb={1}
        >
          Token No: {token}
        </Typography>

        <Typography color="text.secondary" mb={3}>
          Estimated preparation time:{" "}
          <strong>{prepTime} minutes</strong>
        </Typography>

        <Button
          variant="contained"
          fullWidth
          onClick={() => navigate("/home")}
        >
          Back to Home
        </Button>
      </Card>
    </Box>
  );
}