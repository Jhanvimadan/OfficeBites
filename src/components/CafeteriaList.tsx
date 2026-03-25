import { useEffect, useState } from "react";
import Skeleton from "@mui/material/Skeleton";
import hero from "../assets/hero.png"
import { useNavigate } from "react-router-dom";

import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";

export default function CafeteriaList() {
  // Holds the list of restaurants coming from the API
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const navigate = useNavigate();
  // Just to show a loading text before we get the actual data
  const [loading, setLoading] = useState(true);

  const Shimmer = () => {
  return (
    <Box sx={{ px: 4, py: 6 }}>
      <Typography variant="h5" fontWeight="bold" mb={4}>
        Loading Cafeteria Stalls...
      </Typography>

      <Grid container spacing={3}>
        {Array.from({ length: 6 }).map((_, i) => (
          <Grid key={i} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card
              sx={{
                borderRadius: 3,
                padding: 2,
                boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
              }}
            >
              {/* Shimmer image */}
              <Skeleton
                variant="rectangular"
                width="100%"
                height={180}
                sx={{ borderRadius: 2 }}
              />

              {/* Text lines */}
              <Skeleton variant="text" sx={{ mt: 2 }} />
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="text" width="40%" />
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

  // Fetch restaurant list from API
  const fetchRestaurants = async () => {
    try {
      // Hitting the NamasteDev API (CORS extension must be enabled)
      const response = await fetch(
        "https://namastedev.com/api/v1/listRestaurants"
      );

      // Convert response to JSON
      const json = await response.json();

      console.log("API JSON:", json); // Helpful while debugging

      // The API sends restaurants deep inside nested objects
      // So we extract them from json.data.data.cards[1]...
      const restaurantData =
        json.data.data.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants;

      // Save the list in state (or empty list if undefined)
      setRestaurants(restaurantData || []);
    } catch (error) {
      console.error("Error while fetching restaurants:", error);
    } finally {
      // Hide loading text after API completes (success or fail)
      setLoading(false);
    }
  };

  // Run the API call once when the component mounts
  useEffect(() => {
    fetchRestaurants();
  }, []);

  // Show a simple loading message while waiting for the API
  if (loading) return <Shimmer />;

  return (
    <Box sx={{ px: 4, py: 6 }}>
      {/* Section heading */}
      <Typography variant="h5" fontWeight="bold" mb={4}>
        Cafeteria Stalls
      </Typography>

      {/* Grid containing the restaurant cards */}
      <Grid container spacing={3}>
        {restaurants.map((item) => {
          const info = item.info;

          return (
            // Each restaurant card needs a unique key for React
            <Grid key={info.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
                }}
              >
                <CardActionArea onClick={() => navigate(`/menu/${info.id}`)}>

                  {/* Restaurant image (Swiggy CDN auto-handles the ID) */}
                  <CardMedia
  component="img"
  height="180"
  image={
    info.cloudinaryImageId
      ? `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_400/${info.cloudinaryImageId}`
      : hero        // 👈 fallback image here
  }
  onError={(e: any) => {
    e.target.src = hero; // 👈 if Swiggy image fails, load fallback
  }}
  alt={info.name}
/>

                  <CardContent>
                    
                    {/* Restaurant Name */}
                    <Typography variant="h6" fontWeight="bold">
                      {info.name}
                    </Typography>

                    {/* Cuisines list */}
                    <Typography variant="body2" color="text.secondary">
                      {info.cuisines.join(", ")}
                    </Typography>

                    {/* Rating */}
                    <Typography variant="body2">
                      ⭐ {info.avgRatingString}
                    </Typography>

                    {/* Cost display */}
                    <Typography variant="body2" color="green">
                      {info.costForTwo}
                    </Typography>

                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}