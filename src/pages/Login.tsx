import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";

export default function Login() {
  const [email, setEmail] = useState("");  //state to store the email input value
  const [error, setError] = useState("");  //state to store the error message related to email validation
  const navigate = useNavigate();  //router hook to navigate to another page

  // Live domain validation
  const validateEmailLive = (value: string) => {
    const target = "@hpe.com";
    const atIndex = value.indexOf("@");  //position of @ in the email

    if (atIndex === -1) return "";  // No @ yet → no error
    if (value.endsWith("@")) return "";  // Just typed @ → no error yet

    const typedDomain = value.slice(atIndex);  //extracting domain part types so far
    const correctPrefix = target.slice(0, typedDomain.length); //correct domain prefix for comparison

    if (typedDomain !== correctPrefix) { //if typed domain==req domain pattern (is not matching then show error)
      return `Email must end with ${target}`;
    }
    return "";
  };
  //func to handle login button click, checks final validation before navigating
  const handleLogin = () => {
    //empty email check
    if(!email.trim()){
      setError("Email is required");
      return;
    }
    //domain validation
    const err = validateEmailLive(email);
    if (err) {
      setError(err); //show error if invalid
      return;
    }
    navigate("/home", { state: { showLocationModal: true } });  //navigate to homepage and trigger locationModal
  };

  return (
    // FULL PAGE BACKGROUND
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#0b5f4c", // fallback solid color
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1504674900247-0877df9cc836')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      {/* BRANDING */}
      <Box sx={{ textAlign: "center", color: "white", mb: 4 }}>
        <Typography variant="h3" fontWeight="bold">
          OfficeBites
        </Typography>

        <Typography variant="subtitle1" sx={{ opacity: 0.9, mt: 1 }}>
          The Smart Cafeteria Solutions
        </Typography>

        <Typography variant="h6" sx={{ mt: 2, fontWeight: 300 }}>
          Welcome to your office dining experience
        </Typography>
      </Box>

      {/* LOGIN CARD (CENTERED, NO EXTRA HEIGHT) */}
      <Card sx={{ width: 400, maxWidth: "100%" }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Login
          </Typography>

          <Typography variant="body2" gutterBottom>
            Login using your HPE email
          </Typography>

          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => {
              const value = e.target.value;
              setEmail(value);  //update email
              setError(validateEmailLive(value)); //live vaidation
            }}
            error={!!error} //error ui
            helperText={error} //show error msg
          />

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleLogin}
          >
            Login
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}