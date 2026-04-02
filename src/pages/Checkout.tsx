import {
  Box,
  Typography,
  Button,
  Card,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";

/*
Checkout page is responsible ONLY for:
- letting user choose payment method
- showing UPI payment modal
- triggering order completion
*/

export default function Checkout() {
  const { totalAmount, completeOrder } = useCart(); // ✅ cart logic lives in context
  const navigate = useNavigate();

  // Tracks which payment option user selected
  const [paymentMode, setPaymentMode] = useState<
    "UPI" | "COUNTER" | null
  >(null);

  /*
  Called after successful payment (UPI or counter)
  */
  const handleCompleteOrder = (mode: "UPI" | "COUNTER") => {
  completeOrder(mode);        // create order + clear cart
  setPaymentMode(null);       // close UPI modal if open
  navigate("/confirmation");        // move user forward 
};

  return (
    <Box sx={{ p: 4, display: "flex", justifyContent: "center" }}>
      <Card sx={{ p: 3, width: 400 }}>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Payment
        </Typography>

        <Typography mb={2}>
          Total Amount: ₹{totalAmount}
        </Typography>

        {/* ---- Pay with UPI ---- */}
        <Button
          fullWidth
          variant="contained"
          onClick={() => setPaymentMode("UPI")}
        >
          Pay with UPI
        </Button>

        {/* ---- Pay at Counter ---- */}
        <Button
       fullWidth
       variant="outlined"
       sx={{ mt: 2 }}
       onClick={() => handleCompleteOrder("COUNTER")}
     >
       Pay at Counter
     </Button>
      </Card>

      {/* --------- UPI PAYMENT MODAL --------- */}
      {paymentMode === "UPI" && (
        <Dialog
          open
          onClose={() => setPaymentMode(null)}
        >
          <DialogTitle>UPI Payment</DialogTitle>

          <DialogContent>
            <Typography>
              Enter your UPI ID
            </Typography>

            <TextField
              fullWidth
              placeholder="name@upi"
              sx={{ mt: 2 }}
            />
          </DialogContent>

          <DialogActions>
            <Button
              variant="contained"
              onClick={() => handleCompleteOrder("UPI")}
            >
              Pay ₹{totalAmount}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
}
