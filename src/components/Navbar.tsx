import {
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  TextField, // ✅ added
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate, useLocation } from "react-router-dom"; // ✅ useLocation added
import { useState } from "react";
import logo from "../assets/logo.png";
import { useSearch } from "../context/SearchContext"; // ✅ added

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation(); // ✅ needed for route-aware search
  const { query, setQuery } = useSearch(); // ✅ navbar controls global search

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // show search only on Home & Menu
  const showSearch =
    location.pathname === "/home" ||
    location.pathname.startsWith("/menu/");

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
        position: "sticky", // Keeps navbar visible when scrolling
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

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            onClick={() => navigate("/home")} // ✅ fixed casing
            sx={{
              cursor: "pointer",
              "&:hover": {
                color: "#00A783",
              },
            }}
          >
            OfficeBites
          </Typography>

          <Typography variant="subtitle2" color="text.secondary">
            Smart Cafeteria Solutions
          </Typography>
        </Box>
      </Box>

      {/* CENTER : Search bar */}
      {showSearch && (
        <TextField
          size="small"
          placeholder={
            location.pathname === "/home"
              ? "Search restaurants"
              : "Search dishes"
          }
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{ minWidth: 260 }}
        />
      )}

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
          variant="h6"
          onClick={() => navigate("/home")} // ✅ fixed casing
          sx={{
            cursor: "pointer",
            fontWeight: "bold",
            color: "#00A783", // highlight current
          }}
        >
          Home
        </Typography>

        {/* Cart */}
        <Typography
          variant="h6"
          onClick={() => navigate("/cart")} // ✅ fixed casing
          sx={{
            cursor: "pointer",
            "&:hover": {
              color: "#00A783",
            },
          }}
        >
          Cart
        </Typography>

        {/* Orders */}
        {/* ❌ moved out of navbar (now only in profile dropdown) */}
        {/* 
        <Typography
          variant="h6"
          onClick={() => navigate("/orders")}
          sx={{
            cursor: "pointer",
            "&:hover": {
              color: "#00A783",
            },
          }}
        >
          Orders
        </Typography>
        */}

        {/* Profile Icon */}
        <IconButton
          size="large"
          onClick={handleProfileClick}
          sx={{
            color: "#555",
            "&:hover": {
              bgcolor: "#E7F8F3",
            },
          }}
        >
          <AccountCircleIcon fontSize="large" />
        </IconButton>

        {/* Profile Dropdown */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MenuItem
            onClick={() => {
              navigate("/orders");
              handleClose();
            }}
          >
            My Orders
          </MenuItem>

          <MenuItem
            onClick={() => {
              navigate("/profile");
              handleClose();
            }}
          >
            Profile
          </MenuItem>

          <MenuItem
            onClick={() => {
              // future: clear auth, clear cart, redirect to login
              console.log("Logout");
              handleClose();
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
}