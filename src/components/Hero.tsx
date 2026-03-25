import { Box, Typography, Button } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

//defining props that hero recieve from homepage
type HeroProps = {
  office: string | null; //currently selected office if any
  onChangeLocation: () => void;
};

export default function Hero({ office, onChangeLocation }: HeroProps) {

  return (
    <Box
      sx={{
        minHeight: "65vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: "white",
        px: 3,
        py: 5,
        gap: 4,

        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5')",

        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* LOCATION SELECTOR */}

      <Box
        onClick={onChangeLocation}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          px: 3,
          py: 1.2,
          borderRadius: 3,
          bgcolor: "white",
          color: "#333",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        <LocationOnIcon color="primary" />

        <Typography>
          {office ?? "Select your office location"}
        </Typography>

        <ExpandMoreIcon />
      </Box>


      {/* HEADLINE */}

      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ maxWidth: 650 }}
      >
        Fresh Food, Fast Service — Your Cafeteria Experience, Smarter Than Ever
      </Typography>


      {/* SUBTEXT */}

      <Typography
        variant="h6"
        sx={{ opacity: 0.9, maxWidth: 550 }}
      >
        Explore menus, track orders, and enjoy a seamless cafeteria journey at your office.
      </Typography>


      {/* BUTTON */}

      <Button
        variant="contained"
        sx={{
          mt: 2,
          px: 5,
          py: 1.4,
          borderRadius: 25,
          bgcolor: "white",
          color: "#00A783",
          fontWeight: "bold",
        }}
      >
        Explore Cafeteria
      </Button>

    </Box>
  );
}