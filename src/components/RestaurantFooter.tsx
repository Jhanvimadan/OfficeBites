import { Box, Typography, Divider, Button } from "@mui/material";

type RestaurantFooterProps = {
  name: string;
  outlet: string;
  address: string;
  fssai: string;
};

export default function RestaurantFooter({
  name,
  outlet,
  address,
  fssai,
}: RestaurantFooterProps) {
  return (
    <Box sx={{ mt: 6, px: 2, py: 3, bgcolor: "#fafafa" }}>
      <Divider sx={{ mb: 2 }} />

      <Typography fontWeight="bold">FSSAI</Typography>
      <Typography variant="body2" color="text.secondary">
        License No. {fssai}
      </Typography>

      <Typography sx={{ mt: 2 }} fontWeight="bold">
        {name}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        (Outlet: {outlet})
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        {address}
      </Typography>

      <Divider sx={{ my: 2 }} />

    </Box>
  );
}