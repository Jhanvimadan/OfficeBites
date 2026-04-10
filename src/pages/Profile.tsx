import {
  Box,
  Card,
  Typography,
  Divider,
  Stack,
  Avatar,
  Button,
  Chip,
} from "@mui/material";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";

export default function Profile() {
  const { restaurantName, restaurantImageId, clearCart } = useCart();
  const navigate = useNavigate();


// SESSION IDENTITY
  const userEmail = localStorage
    .getItem("currentUserEmail")
    ?.toLowerCase();

  // Temporary demo data
  const userName = userEmail
    ? userEmail.split("@")[0]
    : "User";
  const officeLocation = "Bangalore";
  const ordersCount = 12;


  const handleLogout = () => {
    clearCart();
    navigate("/");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        py: 4,
        px: 2,
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 500 }}>
        {/* Profile Card */}
        <Card sx={{ p: 3, borderRadius: 3, mb: 2, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          {/* Header */}
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
            <Avatar sx={{ width: 64, height: 64, bgcolor: "#00906f", fontSize: "1.5rem" }}>
              {userName.charAt(0)}
            </Avatar>

            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" fontWeight="bold">
                {userName}
              </Typography>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <LocationOnIcon sx={{ width: 16, height: 16, color: "#666" }} />
                <Typography variant="body2" color="text.secondary">
                  {officeLocation}
                </Typography>
              </Stack>
              <Typography variant="caption" color="text.secondary">
                {userEmail}
              </Typography>
            </Box>
          </Stack>

          <Divider sx={{ my: 2 }} />

          {/* Stats Section */}
          <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
            <Card
              sx={{
                flex: 1,
                p: 2,
                textAlign: "center",
                backgroundColor: "#E7F8F3",
                border: "1px solid #00906f20",
              }}
            >
              <Typography variant="h5" fontWeight="bold" sx={{ color: "#00906f" }}>
                {ordersCount}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Total Orders
              </Typography>
            </Card>

            <Card
              sx={{
                flex: 1,
                p: 2,
                textAlign: "center",
                backgroundColor: "#FFF3E0",
                border: "1px solid #FF900070",
              }}
            >
              <Typography variant="h5" fontWeight="bold" sx={{ color: "#F57C00" }}>
                ₹1,240
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Total Spent
              </Typography>
            </Card>
          </Stack>

          <Divider sx={{ my: 2 }} />

          {/* Session Info */}
          <Typography fontWeight="bold" mb={2}>
            Current Session
          </Typography>

          {restaurantName ? (
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3, p: 2, backgroundColor: "#f9f9f9", borderRadius: 1 }}>
              {restaurantImageId && (
                <Avatar
                  src={`https://media-assets.swiggy.com/swiggy/image/upload/w_80/${restaurantImageId}`}
                  sx={{ width: 48, height: 48 }}
                />
              )}
              <Box sx={{ flex: 1 }}>
                <Typography fontWeight="500">{restaurantName}</Typography>
                <Chip
                  icon={<PointOfSaleIcon />}
                  label="Active"
                  size="small"
                  sx={{ mt: 0.5, backgroundColor: "#E7F8F3", color: "#00906f" }}
                />
              </Box>
            </Stack>
          ) : (
            <Typography color="text.secondary" sx={{ mb: 3, p: 2, backgroundColor: "#f9f9f9", borderRadius: 1 }}>
              No active restaurant session
            </Typography>
          )}

          <Divider sx={{ my: 2 }} />

          {/* Quick Actions */}
          <Stack spacing={2}>
            <Button
              variant="outlined"
              fullWidth
              startIcon={<ShoppingBagIcon />}
              onClick={() => navigate("/orders")}
              sx={{
                borderColor: "#00906f",
                color: "#00906f",
                "&:hover": {
                  backgroundColor: "#E7F8F3",
                  borderColor: "#00906f",
                },
              }}
            >
              View My Orders
            </Button>

            <Button
              variant="contained"
              fullWidth
              startIcon={<LogoutIcon />}
              color="error"
              onClick={handleLogout}
              sx={{
                backgroundColor: "#d32f2f",
                "&:hover": {
                  backgroundColor: "#b71c1c",
                },
              }}
            >
              Logout
            </Button>
          </Stack>
        </Card>

        {/* Help Section */}
        <Card sx={{ p: 3, borderRadius: 3, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Need Help?
          </Typography>
          <Stack spacing={1}>
            <Typography variant="body2" color="text.secondary">
              📧 Email: support@officebites.com
            </Typography>
            <Typography variant="body2" color="text.secondary">
              📞 Phone: +91 1234567890
            </Typography>
            <Typography variant="body2" color="text.secondary">
              💬 Chat with our support team
            </Typography>
          </Stack>
        </Card>
      </Box>
    </Box>
  );
}