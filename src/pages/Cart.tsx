import {
  Box,
  Typography,
  Divider,
  Button,
  Card,
  IconButton,
  Avatar,
  Stack
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {

  const {
    cartItems,
    restaurantName,
    restaurantImageId,
    addItem,
    removeItem,
    totalAmount,
    discountAmount,
    finalAmount,
    appliedOffer
  } = useCart();

  const navigate = useNavigate();
  const isCartEmpty = cartItems.length === 0;
  // OLD bill logic (kept for reference, NOT used anymore)
  // const convenienceFee = 10;
  // const tax = Math.round(totalAmount * 0.05);
  // const grandTotal = totalAmount + convenienceFee + tax;


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
  {isCartEmpty ? (
  <Box
    sx={{
      textAlign: "center",
      py: 8,
      color: "text.secondary",
    }}
  >
    <Typography variant="h6" fontWeight="bold" mb={1}>
      Your cart is empty 🛒
    </Typography>

    <Typography mb={3}>
      No items added yet. Please add items to continue.
    </Typography>

    <Button
      variant="contained"
      onClick={() => navigate("/home")}
    >
      Browse Cafeteria Stalls
    </Button>
  </Box>
  ) : (
      /* Main Cart Card */
      <Card
        sx={{
          width: 420,
          p: 3,
          borderRadius: 3
        }}>

        {/* Title */}
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Your Cart
        </Typography>

        {/* Restaurant Name */}
        {/* Restaurant Name + Logo */}
      {restaurantName && (
        <Stack direction="row" alignItems="center" spacing={2} mb={2}>
          {restaurantImageId && (
            <Avatar
              src={`https://media-assets.swiggy.com/swiggy/image/upload/w_80/${restaurantImageId}`}
              sx={{
                width: 40,
                height: 40,
                borderRadius: 1,
                border: "1px solid #e0e0e0",
              }}
            />
          )}
      
          <Typography
            fontWeight="bold"
            color="text.secondary"
          >
            {restaurantName}
          </Typography>
        </Stack>
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
                    addItem(
                      {
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

        {/* Subtotal */}
        <Typography>
          Subtotal: ₹{totalAmount}
        </Typography>

        {/* Discount (only show if applied) */}
        {discountAmount > 0 && (
          <>
            <Typography color="green">
              Offer applied ({appliedOffer?.header})
            </Typography>

            <Typography color="green">
              You saved ₹{Math.round(discountAmount)}
            </Typography>
          </>
        )}

        <Divider sx={{ my: 2 }} />

        {/* Final Payable Amount (IMPORTANT:
            this replaces old grandTotal logic) */}
        <Typography fontWeight="bold" variant="h6">
          Payable Amount: ₹{Math.round(finalAmount)}
        </Typography>

        {/* Bill Details (old logic kept for reference) */}
        {/* 
        <Typography fontWeight="bold" mb={1}>
          Bill Details
        </Typography>

        <Box display="flex" justifyContent="space-between">
          <Typography>Item Total</Typography>
          <Typography>₹{totalAmount}</Typography>
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Typography>Convenience Fee</Typography>
          <Typography>₹{convenienceFee}</Typography>
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Typography>GST (5%)</Typography>
          <Typography>₹{tax}</Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box display="flex" justifyContent="space-between">
          <Typography fontWeight="bold">
            TO PAY
          </Typography>

          <Typography fontWeight="bold">
            ₹{grandTotal}
          </Typography>
        </Box>
        */}

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
          disabled={isCartEmpty}
        >
          Proceed to Checkout
        </Button>

      </Card>
)}
    </Box>
  );
}