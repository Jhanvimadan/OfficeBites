import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";

export default function Menu() {
  // Restaurant id from URL
  const { id } = useParams();

  // Restaurant header info
  const [restaurantInfo, setRestaurantInfo] = useState<any>(null);

  // All menu items
  const [menuItems, setMenuItems] = useState<any[]>([]);

  // Veg / Non-veg filter
  const [vegFilter, setVegFilter] =
    useState<"ALL" | "VEG" | "NON_VEG">("ALL");

  //ADD button
   const [quantity, setQuantity] = useState(0);


  // Loading state
  const [loading, setLoading] = useState(true);

  // Apply veg filter safely
  const filteredMenuItems = menuItems.filter((item) => {
    if (item.isVeg === undefined) return true;
    if (vegFilter === "VEG") return item.isVeg === 1;
    if (vegFilter === "NON_VEG") return item.isVeg === 0;
    return true;
  });

  const fetchMenu = async () => {
    try {
      // ✅ Correct API endpoint
      const response = await fetch(
        `https://namastedev.com/api/v1/listRestaurantMenu/${id}`
      );
      const json = await response.json();

      // Restaurant header info
      const info =
        json?.data?.cards?.find(
          (c: any) => c?.card?.card?.info
        )?.card?.card?.info;

      setRestaurantInfo(info);

      // Menu extraction
      const menuCards =
        json?.data?.cards?.find(
          (c: any) => c?.groupedCard
        )?.groupedCard?.cardGroupMap?.REGULAR?.cards;

      const items: any[] = [];

      menuCards?.forEach((card: any) => {
        if (card?.card?.card?.itemCards) {
          card.card.card.itemCards.forEach((i: any) => {
            items.push(i.card.info);
          });
        }
      });

      setMenuItems(items);
    } catch (error) {
      console.error("Menu API error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, [id]);

  if (loading) {
    return (
      <Typography mt={5} textAlign="center">
        Loading menu...
      </Typography>
    );
  }

  return (
    <Box sx={{ px: 4, py: 4 }}>
      {/* Restaurant Header */}
      {restaurantInfo && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight="bold">
            {restaurantInfo.name}
          </Typography>

          <Typography color="text.secondary">
            {restaurantInfo.cuisines?.join(", ")}
          </Typography>

          <Typography mt={1}>
            ⭐ {restaurantInfo.avgRatingString} •{" "}
            {restaurantInfo.costForTwoMessage}
          </Typography>
        </Box>
      )}

      {/* Veg Filter Buttons */}
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <button onClick={() => setVegFilter("ALL")}>All</button>
        <button onClick={() => setVegFilter("VEG")}>Veg 🌱</button>
        <button onClick={() => setVegFilter("NON_VEG")}>Non‑Veg 🍗</button>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Menu Items */}
      {filteredMenuItems.map((item) => (
        <Card key={item.id} sx={{ mb: 2 }}>
          <CardContent sx={{ display: "flex", gap: 2 }}>
            {item.imageId && (
              <CardMedia
                component="img"
                sx={{ width: 100, borderRadius: 1 }}
                image={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_200/${item.imageId}`}
                alt={item.name}
              />
            )}

            <Box>
              <Typography fontWeight="bold">
                {item.name} {item.isVeg === 1 ? "🌱" : "🍗"}
              </Typography>

              <Typography color="text.secondary">
                ₹{(item.price || item.defaultPrice) / 100}
              </Typography>

              <Typography variant="body2">
                {item.description}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
``