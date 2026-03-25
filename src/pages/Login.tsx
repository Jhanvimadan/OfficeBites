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
  const [email, setEmail] = useState(""); //state to store the email input value
  const [error, setError] = useState(""); //state to store the error msg for live validation
  const navigate = useNavigate(); //router hook to navigate to another page

  // Live domain validation
  const validateEmailLive = (value: string) => {
    const target = "@hpe.com";
    const atIndex = value.indexOf("@"); //position of @ in the email

    if (atIndex === -1) return ""; // No @ yet → no error
    if (value.endsWith("@")) return ""; // Just typed @ → no error yet

    const typedDomain = value.slice(atIndex);  //extracting domain part types so far
    const correctPrefix = target.slice(0, typedDomain.length); //correct domain prefix for comparison

    if (typedDomain !== correctPrefix) { //if typed domain==req domain pattern
      return `Email must end with ${target}`;
    }
    return "";
  };

  //func to handle login button click, checks final validation before navigating
  const handleLogin = () => {
    const err = validateEmailLive(email);
    if (err) {
      setError(err); //show error if invalid
      return;
    }
    navigate("/home", { state: { showLocationModal: true } }); //navigate to homepage and trigger locationModal
  };

  return (
    //outer container to centre the card
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      
      <Card sx={{ width: 400 }}> {/*login card*/}
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Smart Cafeteria
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
              setEmail(value);  //update email state
              setError(validateEmailLive(value)); // Live validation
            }}
            error={!!error}  //error ui
            helperText={error} //show error msg below field
          />

          {/*login button*/}
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
