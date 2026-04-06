import { Box, Typography } from "@mui/material";

/*
Global footer shown on all pages
except Menu page (handled in App.tsx)
*/

export default function Footer() {
  return (
    <Box
      sx={{
        mt: 6,
        py: 3,
        textAlign: "center",
        backgroundColor: "#f5f5f5",
        borderTop: "1px solid #e0e0e0",
      }}
    >
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} OfficeBites — Smart Cafeteria Solutions
      </Typography>
    </Box>
  );
}