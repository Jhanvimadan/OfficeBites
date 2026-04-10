import {
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Avatar,
  Divider,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate, useLocation } from "react-router-dom"; 
import { useState } from "react";
import logo from "../assets/logo.png";
import { useSearch } from "../context/SearchContext";
import { useCart } from "../context/CartContext"; 
import { logout } from "../utils/logout";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation(); // needed for route-aware search
  const { query, setQuery } = useSearch(); // navbar controls global search
  const { clearCart } = useCart(); // for logout functionality

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

// SESSION IDENTITY
  const userEmail = localStorage
    .getItem("currentUserEmail")
    ?.toLowerCase();

  const userLocation = "Bangalore";
  // Temporary demo data
  const userName = userEmail
    ? userEmail.split("@")[0]
    : "User";
  const officeLocation = "Bangalore";

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

 //const handleLogout = () => {
 //  clearCart();
 //  setQuery("");
 //  navigate("/");
 //  handleClose();
 //};

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
            onClick={() => navigate("/home")}
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
          onClick={() => navigate("/home")}
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
          onClick={() => navigate("/cart")}
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
        {/* moved out of navbar (now only in profile dropdown) */}
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
          slotProps={{
            paper: {
              sx: {
                minWidth: 280,
                mt: 1,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              },
            },
          }}
        >
          {/* User Info Header */}
          <Box sx={{ px: 2, py: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar sx={{ width: 40, height: 40, bgcolor: "#00906f" }}>
                {userName.charAt(0)}
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" fontWeight="bold">
                  {userName}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {userLocation}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Divider sx={{ my: 1 }} />

          <MenuItem
            onClick={() => {
              navigate("/orders");
              handleClose();
            }}
            sx={{
              "&:hover": {
                backgroundColor: "#E7F8F3",
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              <ShoppingBagIcon fontSize="small" sx={{ color: "#00906f" }} />
            </ListItemIcon>
            <ListItemText primary="My Orders" />
          </MenuItem>

          <MenuItem
            onClick={() => {
              navigate("/profile");
              handleClose();
            }}
            sx={{
              "&:hover": {
                backgroundColor: "#E7F8F3",
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              <PersonIcon fontSize="small" sx={{ color: "#00906f" }} />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </MenuItem>

          <Divider sx={{ my: 1 }} />

          <MenuItem
            onClick={() => {
              handleClose();
              clearCart();          // clear cart context
              setQuery("");         // clear search context
              logout(navigate);     // clear session + redirect
            }}
          
            sx={{
              "&:hover": {
                backgroundColor: "#ffebee",
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              <LogoutIcon fontSize="small" sx={{ color: "#d32f2f" }} />
            </ListItemIcon>
            <ListItemText
              primary="Logout"
              sx={{ "& .MuiTypography-root": { color: "#d32f2f" } }}
            />
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
}