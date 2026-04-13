import { useState } from "react";
import {
  Box,
  Typography,
  Card,
  Button,
  Divider,
  Stack,
} from "@mui/material";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

//structure of single food item in an order
type OrderItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
};

//structure of a past order
type Order = {
  token: string;
  restaurantName: string;
  restaurantImageId?: string;
  items: OrderItem[];
  completedAt: number;
  totalAmount: number;
};

//component props
type Props = {
  history: Order[]; //list of all past orders
};

export default function PastOrders({ history }: Props) {
  //state to track which order's details are currently expanded
  const [expanded, setExpanded] = useState<string | null>(null);
  //cart context to restore order to cart when repeating
  const { repeatOrder } = useCart();
  //navigation to cart page on repeat
  const navigate = useNavigate();

  //if no orders, show message
  if (history.length === 0) {
    return <Typography>No past orders</Typography>;
  }

  //helper to format timestamp into readable date-time string
  const formatDateTime = (timestamp: number) =>
    new Date(timestamp).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  return (
    <Box mt={4}>
      <Typography fontWeight="bold" mb={2} color="success">
        Past Orders
      </Typography>
       {/*iterate over order history and display each order in a card*/}
      {history.map(order => {
        const isExpanded = expanded === order.token;

        return (
          <Card key={order.token} 
          //clicking the card expands/collapses the order details
          onClick={() => setExpanded(order.token)}
           sx={{ p: 2, mb: 2, cursor: "pointer", border: "1px solid transparent", 
           //highlight card when expanded
           borderColor: isExpanded ? "green" : "transparent" }}>
            <Typography fontWeight="bold">
              {order.restaurantName}
            </Typography>

            {/*order completion date*/}
            <Typography variant="body2" color="text.secondary">
              {formatDateTime(order.completedAt)}
            </Typography>

            {/* show ordered items only if the card is expanded */}
            {isExpanded && (
              <>
                <Box mt={2}>
                  {order.items.map(item => (
                    <Typography
                      key={item.id}
                      variant="body2"
                      sx={{ ml: 1 }}
                    >
                      • {item.name} × {item.quantity}
                    </Typography>
                  ))}
                </Box>


                <Divider sx={{ my: 2 }} />
              </>
            )}
          {/* Bottom section: price + action buttons */}
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              //bg when expanded
              bgcolor={isExpanded ? "action.hover" : "transparent"}
              p={isExpanded ? 2 : 0}
              mt={2}
            >
              {/* order total */}
              <Typography fontWeight="bold">
                ₹{Math.round(order.totalAmount)}
              </Typography>

              <Stack direction="row" spacing={1}>
                {/* toggle item visibility */}
                <Button
                  size="small"
                  variant="outlined"
                  color="success"
                  onClick={() =>
                    setExpanded(isExpanded ? null : order.token)
                  }
                >
                  {isExpanded ? "Hide Items" : "View Items"}
                </Button>
              
              <Button
                size="small"
                variant="contained"
                color="success"
                onClick={() => {
                  //restores cart state and navigates the user intentionally
                  repeatOrder({
                    restaurantName: order.restaurantName,
                    restaurantImageId: order.restaurantImageId,
                    items: order.items,
                  });              

                  navigate("/cart");
                }}
              >
                Repeat Order
              </Button>
              </Stack>
            </Stack>
          </Card>
        );
      })}
    </Box>
  );
}