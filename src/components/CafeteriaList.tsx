import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Skeleton from "@mui/material/Skeleton";

import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Stack,
} from "@mui/material";

import CardMedia from "@mui/material/CardMedia";

import img from "../assets/image.png"; // fallback image if restaurant image fails
import DealCard from "./DealCard"; // reusable component for deals

/*
This defines the shape of restaurant data coming from the API.
Instead of using 'any', we create a proper type for better safety.
*/

type Restaurant = {
  info: {
    id: string;
    name: string;
    cuisines: string[];
    avgRatingString: string;
    costForTwo: string;
    cloudinaryImageId?: string;
    aggregatedDiscountInfoV3?: any;
  };
};


/* This component receives search text from Home page
so we define it as a prop. */

type CafeteriaListProps = {
  search: string;
};

/*   MAIN COMPONENT */

export default function CafeteriaList({ search }: CafeteriaListProps) {

  /* ---------------- STATE ---------------- */

  // Stores restaurant data from API
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  // Controls shimmer loading UI
  const [loading, setLoading] = useState(true);

  // React Router navigation
  const navigate = useNavigate();



  /*  SHIMMER LOADING UI
  While the API is loading, we show skeleton cards
  to give users a better experience instead of blank page
  */

  const Shimmer = () => (
    <Box sx={{ px: 4, py: 6 }}>

      <Typography variant="h5" fontWeight="bold" mb={4}>
        Loading Cafeteria Stalls...
      </Typography>

      <Grid container spacing={3}>
        {Array.from({ length: 6 }).map((_, i) => (

          <Grid item xs={12} sm={6} md={4} key={i}>
            <Card sx={{ borderRadius: 3, p: 2 }}>

              <Skeleton variant="rectangular" height={200} />
              <Skeleton variant="text" sx={{ mt: 2 }} />
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="text" width="40%" />

            </Card>
          </Grid>

        ))}
      </Grid>
    </Box>
  );



  /* API CALL */
  /* This function fetches restaurant data from the API.
  After receiving data, we extract the restaurant list
  from the nested JSON structure. */

  const fetchRestaurants = async () => {
    try {
      const response = await fetch(
        "https://namastedev.com/api/v1/listRestaurants"
      );

      const json = await response.json();

      // Extract restaurant data safely using optional chaining
      const restaurantData =
        json?.data?.data?.cards?.[1]?.card?.card?.gridElements
          ?.infoWithStyle?.restaurants ?? [];

      setRestaurants(restaurantData);

    } catch (error) {
      console.error("Error fetching restaurants:", error);
    } finally {

      // Loading finished
      setLoading(false);
    }
  };


  /* useEffect runs once when the component mounts.
  This is where we trigger the API call. */

  useEffect(() => {
    fetchRestaurants();
  }, []);



  /* SHOW LOADING UI */

  if (loading) return <Shimmer />;
  /* SEARCH FILTERING */

  /*  Normalize the search text
  (remove spaces + convert to lowercase) */

  const normalizedSearch = search.trim().toLowerCase();
  /* Filter restaurants based on search input */

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const name = restaurant?.info?.name?.toLowerCase() ?? "";
    return normalizedSearch
      ? name.includes(normalizedSearch)
      : true;
  });

  /* DEALS FILTER */

  /* Some restaurants have special deals. We filter them separately for the deals section. */

  const dealRestaurants = restaurants.filter(
    (r) => r.info?.aggregatedDiscountInfoV3
  );

  /* MAIN UI */

  return (
    <Box sx={{ px: 4, py: 6 }}>
      {/*  DEALS SECTION.   */}

      {dealRestaurants.length > 0 && (

        <Box
          sx={{
            mb: 6,
            p: 3,
            borderRadius: 3,
            background:
              "linear-gradient(90deg, #fff7e6 0%, #ffffff 85%)",
          }}
        >

          <Typography variant="h6" fontWeight="bold" mb={2}>
            Deals for You 🔥
          </Typography>

          {/* horizontal scrolling deal cards */}
          <Stack
            direction="row"
            spacing={2}
            sx={{
              overflowX: "auto",
              py: 2,
              px: 1,
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {dealRestaurants.map((item) => (

              <DealCard
                key={item.info.id}
                restaurant={item.info}

                onClick={() =>
                  navigate(`/menu/${item.info.id}`, {
                    state: {
                      offer: item.info.aggregatedDiscountInfoV3,
                    },
                  })
                }
              />

            ))}

          </Stack>
        </Box>

      )}

      {/* RESTAURANT GRID */}

      <Typography variant="h5" fontWeight="bold" mb={4}>
        Cafeteria Stalls
      </Typography>


      <Box sx={{ maxWidth: "1200px", mx: "auto" }}>

        {filteredRestaurants.length === 0 ? (

          <Typography color="text.secondary">
            No restaurants found
          </Typography>

        ) : (

          <Grid container spacing={3}>

            {filteredRestaurants.map((item) => {
              const info = item.info;
              return (
                <Grid item xs={12} sm={6} md={4} key={info.id}>
                  <Card
                    sx={{
                      borderRadius: 3,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",

                      /* hover animation like Swiggy */

                      transition: "all 0.25s ease",
                      boxShadow: "0 3px 10px rgba(0,0,0,0.12)",

                      "&:hover": {
                        transform: "translateY(-6px)",
                        boxShadow:
                          "0 10px 22px rgba(0,0,0,0.18)",
                      },
                    }}
                  >
                    <CardActionArea
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "stretch",
                      }}

                      onClick={() =>
                        navigate(`/menu/${info.id}`, {
                          state: {
                            offer:
                              info.aggregatedDiscountInfoV3,
                          },
                        })
                      }
                    >
                      {/* Restaurant Image */}
                      <CardMedia
                        component="img"
                       
                        image={
                          info.cloudinaryImageId
                            ? `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_400/${info.cloudinaryImageId}`
                            : img
                        }
                        alt={info.name}
                        sx={{
                          height: 200,
                          width: 350,
                          objectFit: "cover",
                          borderTopLeftRadius: 12,
                          borderTopRightRadius: 12,
                        }}
                        onError={(e: any) => {
                          e.target.src = img;
                        }}
                      />

                      {/* Restaurant Info */}

                      <CardContent sx={{ flexGrow: 1 }}>

                        <Typography
                          variant="h6"
                          fontWeight="bold"
                        >
                          {info.name}
                        </Typography>

                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {info.cuisines?.join(", ") ||
                            "Various cuisines"}
                        </Typography>

                        <Typography variant="body2">
                          ⭐ {info.avgRatingString || "N/A"}
                        </Typography>

                        <Typography
                          variant="body2"
                          color="green"
                        >
                          {info.costForTwo}
                        </Typography>

                      </CardContent>

                    </CardActionArea>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Box>
    </Box>
  );
}