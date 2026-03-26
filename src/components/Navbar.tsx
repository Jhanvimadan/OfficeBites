import { Box, Typography, IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; //profile icon
import logo from "../assets/logo.png";
export default function Navbar() {

  return (
    // Main navbar container
    <Box
      sx={{
        display: "flex", //horizontal placement
        justifyContent: "space-between",
        alignItems: "center",
        px: 4,
        py: 2,
        bgcolor: "white",
        borderBottom: "1px solid #e0e0e0",
        position: "sticky",  // Keeps navbar visible when scrolling
        top: 0,
        zIndex: 100, // Ensures navbar stays above other elements
      }}
    >

       {/* LEFT SIDE : logo +title */}
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
       <img
        src={logo}
        alt="Smart Cafeteria Logo"
        style={{ height: "60px", borderRadius: "20px" }}
    />
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "left" }}>
       <Typography variant="h5" fontWeight="bold">
         OfficeBites
       </Typography>
     
       <Typography variant="subtitle2" color="text.secondary">
         Smart Cafeteria Solutions
       </Typography>
     </Box>
     </Box>

      {/* RIGHT SIDE */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 4,
          color: "#333",
        }}
      >

        {/* Home */}
        <Typography
        variant= "h6"
          sx={{
            cursor: "pointer",
            fontWeight: "bold",
            color: "#00A783", // highlight current
          }}
        >
          Home
        </Typography>

        {/* Menu */}
        <Typography
        variant= "h6"
          sx={{
            cursor: "pointer",

            // change color on hover
            "&:hover": {
              color: "#00A783",
            },
          }}
        >
          Menu
        </Typography>

        {/* Orders */}
        <Typography
        variant= "h6"
          sx={{
            cursor: "pointer",
            "&:hover": {
              color: "#00A783",
            },
          }}
        >
          Orders
        </Typography>

        {/* Profile icon */}
        <IconButton
        size="large"
          sx={{
            color: "#brown",
            "&:hover": {
              bgcolor: "#E7F8F3",
            },
          }}
        >
          <AccountCircleIcon />
        </IconButton>

      </Box>
    </Box>
  );
}