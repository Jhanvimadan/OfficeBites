import { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MyLocationIcon from "@mui/icons-material/MyLocation";

type LocationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (location: string) => void;
};

const officeData: Record<string, string[]> = {
  Bangalore: [
    "Mahadevapura (Whitefield Road)",
    "Bagmane Tech Park (CV Raman Nagar)",
    "Pritech Park SEZ (Bellandur)",
    "Whitefield (Kalyani Platina)",
    "Electronic City (Tower 1 E City)",
    "Adugodi (Salarpuria Arena)",
  ],
  Mumbai: ["Goregaon East (Oberoi Garden City)"],
  Gurugram: ["HPE Gurugram Office"],
  Hyderabad: ["HPE Hyderabad Engineering Unit"],
};

export default function LocationModal({
  isOpen,
  onClose,
  onSelect,
}: LocationModalProps) {
  const [city, setCity] = useState("");
  const [selectedOffice, setSelectedOffice] = useState("");
  const [search, setSearch] = useState("");

  const offices = city ? officeData[city] : [];

  const filteredOffices = offices.filter((office) =>
    office.toLowerCase().includes(search.toLowerCase())
  );

  const handleContinue = () => {
    if (selectedOffice) {
      const fullLocation = `${selectedOffice}, ${city}`;

      localStorage.setItem("office", fullLocation);
      onSelect(fullLocation);
      onClose();
    }
  };

  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        console.log(pos.coords.latitude, pos.coords.longitude);
      });
    }
  };

  return (
    <Modal open={isOpen} onClose={() => {}}
    disableEscapeKeyDown>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 500,
          maxHeight: "80vh",
          overflowY: "auto",
          bgcolor: "background.paper",
          borderRadius: 3,
          boxShadow: 24,
          p: 4,
        }}
      >
        {/* Title */}
        <Typography variant="h6" fontWeight="bold">
          Select Your Office
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={2}>
          Choose your office location to explore cafeteria stalls
        </Typography>

        {/* Detect location */}
        <Button
          startIcon={<MyLocationIcon />}
          onClick={detectLocation}
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
        >
          Detect My Location
        </Button>

        {/* City dropdown */}
        <TextField
          select
          fullWidth
          label="Select City"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
            setSelectedOffice("");
          }}
          sx={{ mb: 3 }}
        >
          {Object.keys(officeData).map((cityName) => (
            <MenuItem key={cityName} value={cityName}>
              {cityName}
            </MenuItem>
          ))}
        </TextField>

        {/* Search office */}
        {city && (
          <TextField
            fullWidth
            placeholder="Search office..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ mb: 3 }}
          />
        )}

        {/* Office cards */}
        <Grid container spacing={2}>
          {filteredOffices.map((office) => (
            <Grid item xs={12} sm={6} key={office}>
              <Card
                sx={{
                  border:
                    selectedOffice === office
                      ? "2px solid #1976d2"
                      : "1px solid #ddd",
                }}
              >
                <CardActionArea onClick={() => setSelectedOffice(office)}>
                  <CardContent
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <LocationOnIcon color="primary" />
                    <Typography>{office}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Continue */}
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 3 }}
          disabled={!selectedOffice}
          onClick={handleContinue}
        >
          Continue
        </Button>
      </Box>
    </Modal>
  );
}