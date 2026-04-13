import { Box, Typography } from "@mui/material";

type DealCardProps = {
  restaurant: any;
  onClick: () => void;
};

export default function DealCard({ restaurant, onClick }: DealCardProps) {
  const offer = restaurant.aggregatedDiscountInfoV3;

  if (!offer) return null;

  return (
    
    <Box
  onClick={onClick}
  sx={{
    minWidth: 200,
    maxWidth: 200,
    cursor: "pointer",
    borderRadius: 3,
    p: 2,
    bgcolor: "#ffffff",
    boxShadow: "0 4px 10px rgba(0,0,0,0.12)",
    transition: "all 0.25s ease",

    "&:hover": {
  transform: "translateY(-6px) scale(0.84)",
  boxShadow: "0 14px 28px rgba(0,0,0,0.22)",
  outline: "2px solid #2e7d32",
  outlineOffset: "-2px",
},
  }}
    >
      {/* Offer headline */}
      <Typography
        sx={{
          color: "#1e7b34",
          fontWeight: "bold",
          fontSize: "1rem",
        }}
      >
        {offer.header}
      </Typography>

      {/* Offer sub text */}
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 1 }}
      >
        {offer.subHeader}
      </Typography>

      {/* Restaurant name */}
      <Typography
        fontWeight="bold"
        sx={{
          fontSize: "0.9rem",
          lineHeight: 1.2,
        }}
        noWrap
      >
        {restaurant.name}
      </Typography>

      <Typography
        variant="caption"
        color="text.secondary"
      >
        Limited time offer
      </Typography>
    </Box>
  );
}