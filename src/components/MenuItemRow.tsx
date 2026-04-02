import { Box, Typography, Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CardMedia from "@mui/material/CardMedia";
import { useCart } from "../context/CartContext";
type MenuItemRowProps = {
  item: any;
  restaurantName: string;
  offer?: any;     // ✅ ADD
};
export default function MenuItemRow({ item, restaurantName, offer, }: { item: any; restaurantName: string; offer: any }) {
  if (!item) return null;

  const { cartItems, addItem, removeItem } = useCart();

  const cartItem = cartItems.find((i) => i.id === item.id);
  const quantity = cartItem?.quantity ?? 0;

  const price = (item.price ?? item.defaultPrice ?? 0) / 100;

  // intent handlers

  // ADD button (0 → 1)
  const handleAdd = () => {
    addItem({ 
        id: item.id, 
        name: item.name, 
        price
    }, 
    restaurantName,
    offer
    );
    // setQuantity(1);
    // onQuantityChange(1);
  };

  // + button
  const handleIncrement = () => {
    addItem({ id: item.id, name: item.name, price}, restaurantName);
    // setQuantity((q) => {
    //   const nextq = q + 1;
    //   onQuantityChange(1);
    //   return nextq;
    // });
  };

  // - button
  const handleDecrement = () => {
    removeItem(item.id);
    // setQuantity((prevQty) => {
    //   if (prevQty === 0) return 0;
    //
    //   const nextQty = prevQty - 1;
    //   onQuantityChange(-1);
    //   return nextQty;
    // });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        py: 2,
        borderBottom: "1px solid #eee",
      }}
    >
      {/* LEFT */}
      <Box sx={{ maxWidth: "65%" }}>
        <Typography fontWeight="bold">
          {item.name} {item.isVeg === 1 ? "🌱" : "🍗"}
        </Typography>

        <Typography color="text.secondary">
          ₹{price}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {item.description || " "}
        </Typography>

        <Typography variant="caption" color="primary">
          Customisable
        </Typography>
      </Box>

      {/* RIGHT */}
      <Box textAlign="center">
        {item.imageId && (
          <CardMedia
            component="img"
            image={`https://media-assets.swiggy.com/swiggy/image/upload/w_200/${item.imageId}`}
            sx={{ width: 120, height: 90, borderRadius: 2, mb: 1 }}
          />
        )}

        {quantity === 0 ? (
          <Button variant="outlined" onClick={handleAdd}>
            ADD
          </Button>
        ) : (
          <Box display="flex" alignItems="center" gap={1}>
            <IconButton onClick={handleDecrement}>
              <RemoveIcon />
            </IconButton>

            <Typography>{quantity}</Typography>

            <IconButton onClick={handleIncrement}>
              <AddIcon />
            </IconButton>
          </Box>
        )}
      </Box>
    </Box>
  );
}
