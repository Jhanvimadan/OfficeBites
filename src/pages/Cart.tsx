import {
  Box,
  Typography,
  Divider,
  Button,
  Card,
  IconButton
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Navigate } from "react-router-dom";
export default function Cart() {

  const { cartItems, restaurantName, addItem, removeItem, totalAmount } = useCart();
  const navigate = useNavigate();
  const deliveryFee = 30;
  const tax = Math.round(totalAmount * 0.05);
  const grandTotal = totalAmount + deliveryFee + tax;
  return (

    <Box
      sx={{
        background: "#f5f5f5",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        py: 5
      }}
    >

      {/* Main Cart Card */}

      <Card
        sx={{
          width: 420,
          p: 3,
          borderRadius: 3
        }}
      >

        {/* Title */}

        <Typography variant="h5" fontWeight="bold" mb={2}>
          Your Cart
        </Typography>

        {/*Restaurant Name */}
        {restaurantName && (
          <Typography
            fontWeight="bold"
            color="text.secondary"
            mb={2}
          >
            {restaurantName}
          </Typography>
        )}        

        {/* Cart Items */}

        {cartItems.map((item) => (

          <Box key={item.id} sx={{ mb: 3 }}>
            <Typography fontWeight="bold">
              {item.name}
            </Typography>


            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              mt={1}
            >

              {/* Quantity Buttons */}

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #ddd",
                  borderRadius: 1
                }}
              >

                <IconButton
                  size="small"
                  onClick={() => removeItem(item.id)}
                >
                  <RemoveIcon fontSize="small" />
                </IconButton>

                <Typography mx={1}>
                  {item.quantity}
                </Typography>

                <IconButton
                  size="small"
                  onClick={() =>
                    addItem({
                      id: item.id,
                      name: item.name,
                      price: item.price
                    },
                    restaurantName || ""
                )
                  }
                >
                  <AddIcon fontSize="small" />
                </IconButton>

              </Box>


              {/* Item Price */}

              <Typography fontWeight="bold">
                ₹{item.price * item.quantity}
              </Typography>

            </Box>

          </Box>

        ))}


        <Divider sx={{ my: 2 }} />


        {/* Bill Details */}

        <Typography fontWeight="bold" mb={1}>
          Bill Details
        </Typography>


        <Box display="flex" justifyContent="space-between">
          <Typography>Item Total</Typography>
          <Typography>₹{totalAmount}</Typography>
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Typography>Delivery Fee</Typography>
          <Typography>₹{deliveryFee}</Typography>
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Typography>GST (5%)</Typography>
          <Typography>₹{tax}</Typography>
        </Box>


        <Divider sx={{ my: 2 }} />


        {/* Grand Total */}

        <Box display="flex" justifyContent="space-between">

          <Typography fontWeight="bold">
            TO PAY
          </Typography>

          <Typography fontWeight="bold">
            ₹{grandTotal}
          </Typography>

        </Box>


        {/* Checkout Button */}

        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
            background: "#008000",
            "&:hover": {
              background: "#e64a00"
            }
          }}
          onClick={() => navigate("/checkout")}
        >
          Proceed to Checkout
        </Button>

      </Card>

    </Box>
  );
}