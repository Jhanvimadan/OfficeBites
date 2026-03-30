import { Box, Typography, Button } from "@mui/material";

type CartBarProps = {
  itemCount: number;
};

export default function CartBar({ itemCount }: CartBarProps) {
  if (itemCount === 0) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        bgcolor: "#1ba672",
        color: "white",
        p: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <Typography fontWeight="bold">
        {itemCount} item{itemCount > 1 ? "s" : ""} added
      </Typography>

      <Button variant="contained" color="success">
        View Cart
      </Button>
    </Box>
  );
}