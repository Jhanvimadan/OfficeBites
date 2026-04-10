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

type OrderItem = {
  id: string;
  name: string;
  quantity: number;
  price: number;
};

type Order = {
  token: string;
  restaurantName: string;
  restaurantImageId?: string;
  items: OrderItem[];
  completedAt: number;
  totalAmount: number;
};

type Props = {
  history: Order[];
};

export default function PastOrders({ history }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const { repeatOrder } = useCart();
  const navigate = useNavigate();
  if (history.length === 0) {
    return <Typography>No past orders</Typography>;
  }

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
      <Typography fontWeight="bold" mb={2}>
        Past Orders
      </Typography>

      {history.map(order => {
        const isExpanded = expanded === order.token;

        return (
          <Card key={order.token} sx={{ p: 2, mb: 2 }}>
            <Typography fontWeight="bold">
              {order.restaurantName}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {formatDateTime(order.completedAt)}
            </Typography>

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

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              mt={2}
            >
              <Typography fontWeight="bold">
                ₹{Math.round(order.totalAmount)}
              </Typography>

              <Stack direction="row" spacing={1}>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() =>
                    setExpanded(isExpanded ? null : order.token)
                  }
                >
                  {isExpanded ? "Hide Items" : "View Items"}
                </Button>

              <Button
                size="small"
                variant="contained"
                onClick={() => {
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