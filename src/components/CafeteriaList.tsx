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

import img from "../assets/image.png";
import DealCard from "./DealCard";
import { useSearch } from "../context/SearchContext";

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

export default function CafeteriaList() {
  /* ---------------- STATE ---------------- */

  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  const ITEMS_PER_BATCH = 6;
  const [page, setPage] = useState(1);

  const navigate = useNavigate();
  const { query } = useSearch();
const [loadingNextBatch, setLoadingNextBatch] = useState(false);
  /* ---------------- HELPERS ---------------- */

  const simulateLargeDataset = (
    data: Restaurant[],
    repeat = 10
  ): Restaurant[] =>
    Array.from({ length: repeat }).flatMap(() => data);

  /* ---------------- API CALL ---------------- */

  const fetchRestaurants = async () => {
    try {
      const response = await fetch(
        "https://namastedev.com/api/v1/listRestaurants"
      );
      const json = await response.json();

      const restaurantData =
        json?.data?.data?.cards?.[1]?.card?.card?.gridElements
          ?.infoWithStyle?.restaurants ?? [];

      setRestaurants(restaurantData);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  /* ---------------- SEARCH FILTER ---------------- */

  const filteredRestaurants = restaurants.filter((r) =>
    r.info.name.toLowerCase().includes(query.toLowerCase())
  );

  /* Reset pagination when search changes */
  useEffect(() => {
    setPage(1);
  }, [query]);

  /* ---------------- SIMULATED DATA ---------------- */

  const simulatedRestaurants =
    simulateLargeDataset(filteredRestaurants);

  const visibleRestaurants = simulatedRestaurants.slice(
    0,
    page * ITEMS_PER_BATCH
  );

  const hasMore =
    visibleRestaurants.length < simulatedRestaurants.length;

  /* ---------------- INFINITE SCROLL ---------------- */

useEffect(() => {
  const handleScroll = () => {
    if (!hasMore || loadingNextBatch) return;

    const nearBottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 200;

    if (nearBottom) {
      setLoadingNextBatch(true);

      // Simulate backend latency
      setTimeout(() => {
        setPage((prev) => prev + 1);
        setLoadingNextBatch(false);
      }, 800);
    }
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, [hasMore, loadingNextBatch]);

  /* ---------------- SHIMMER ---------------- */

  const Shimmer = () => (
    <Box sx={{ px: 4, py: 6 }}>
      <Skeleton width="40%" height={32} sx={{ mb: 4 }} />
      <Grid container spacing={5}>
        {Array.from({ length: 6 }).map((_, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <Skeleton variant="rectangular" height={200} width={250} />
            <Skeleton />
            <Skeleton width="60%" />
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  if (loading) return <Shimmer />;
  const BatchShimmer = () => (
  <Grid container spacing={3} sx={{ mt: 2 }}>
    {Array.from({ length: ITEMS_PER_BATCH }).map((_, i) => (
      <Grid item xs={12} sm={6} md={4} key={i}>
        <Card>
          <Skeleton variant="rectangular" height={200} width={250} />
          <CardContent>
            <Skeleton />
            <Skeleton width="60%" />
            <Skeleton width="40%" />
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
);

  /* ---------------- DEALS ---------------- */

  const dealRestaurants = restaurants.filter(
    (r) => r.info.aggregatedDiscountInfoV3
  );

  /* ---------------- UI ---------------- */

  return (
    <Box sx={{ px: 4, py: 6 }}>
      {dealRestaurants.length > 0 && (
        <Box sx={{ mb: 6 }}>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Deals for You 🔥
          </Typography>
          <Stack direction="row" spacing={2} sx={{ overflowX: "auto" }}>
            {dealRestaurants.map((item) => (
              <DealCard
                key={item.info.id}
                restaurant={item.info}
                onClick={() =>
                  navigate(`/menu/${item.info.id}`, {
                    state: { offer: item.info.aggregatedDiscountInfoV3 },
                  })
                }
              />
            ))}
          </Stack>
        </Box>
      )}

      <Typography variant="h5" fontWeight="bold" mb={4}>
        Cafeteria Stalls
      </Typography>

      {visibleRestaurants.length === 0 ? (
        <Typography>No restaurants found</Typography>
      ) : (
        <>
          <Grid container spacing={3}>
            {visibleRestaurants.map((item, index) => {
              const info = item.info;
              return (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  key={`${info.id}-${index}`}
                >
                  <Card>
                    <CardActionArea
                      onClick={() =>
                        navigate(`/menu/${info.id}`, {
                          state: {
                            offer: info.aggregatedDiscountInfoV3,
                          },
                        })
                      }
                    >
                      <CardMedia
                        component="img"
                        height="200"
                        width="350"
                        image={
                          info.cloudinaryImageId
                            ? `https://media-assets.swiggy.com/swiggy/image/upload/w_400/${info.cloudinaryImageId}`
                            : img
                        }

                      alt={info.name}
                        sx={{
                          width: 260,       // ✅ force full card width
                          height: 220,         // ✅ fixed height (key!)
                          objectFit: "cover",  // ✅ crop consistently
                          backgroundColor: "#f5f5f5", // ✅ smooth fallback
                        }}
                      
                        onError={(e: any) =>
                          (e.target.src = img)
                        }
                      />

                      <CardContent>
                        <Typography fontWeight="bold">
                          {info.name}
                        </Typography>
                        <Typography variant="body2">
                          {info.cuisines?.join(", ")}
                        </Typography>
                        <Typography variant="body2">
                          ⭐ {info.avgRatingString}
                        </Typography>
                        <Typography color="green">
                          {info.costForTwo}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              );
            })}
          </Grid>

          {/* Loader once at bottom */}
{loadingNextBatch && <BatchShimmer />}

{hasMore && !loadingNextBatch && (
  <Typography
    align="center"
    sx={{ mt: 4, color: "text.secondary" }}
  >
    Scroll to load more stalls
  </Typography>
)}

        </>
      )}
    </Box>
  );
}