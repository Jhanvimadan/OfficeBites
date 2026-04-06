import { Box, Typography, Button } from "@mui/material";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function CartBar() {
  const { cartItems, totalAmount } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) return null;

  return (
   <Box
  sx={{
    position: "fixed",
    bottom: 16,
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "#1ba672",
    color: "white",
    px: 3,
    py: 1.5,
    borderRadius: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    maxWidth: 420,
    zIndex: 1500,
  }}
>
      <Typography>
        {cartItems.length} items • ₹{totalAmount}
      </Typography>
      <Button onClick={() => navigate("/cart")}>View Cart</Button>
    </Box>
  );
}
