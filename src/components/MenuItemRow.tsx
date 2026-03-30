import { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CardMedia from "@mui/material/CardMedia";

type MenuItemRowProps = {
  item: any;
  onQuantityChange: (delta: number) => void;
};

export default function MenuItemRow({
  item,
  onQuantityChange,
}: MenuItemRowProps) {
  if (!item) return null;

  const [quantity, setQuantity] = useState(0);

  const price = item.price ?? item.defaultPrice ?? 0;

  // ADD button (0 → 1)
  const handleAdd = () => {
    setQuantity(1);
    onQuantityChange(1);
  };

  // + button
  const increment = () => {
    setQuantity((q) => {
        const nextq = q + 1;
    onQuantityChange(1);
    return nextq;
    });
  };

  // - button 
  const decrement = () => {
    setQuantity((prevQty) => {
        if (prevQty===0) return0;
        
        const nextQty = prevQty - 1;
        onQuantityChange(-1);
      return nextQty;
    });
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
          ₹{price / 100}
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
            <Box onClick={decrement} sx={{ cursor: "pointer" }}>
              <RemoveIcon />
            </Box>

            <Typography>{quantity}</Typography>

            <Box onClick={increment} sx={{ cursor: "pointer" }}>
              <AddIcon />
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}