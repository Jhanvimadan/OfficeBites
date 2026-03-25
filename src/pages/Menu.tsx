import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Card, CardContent, Divider } from "@mui/material";

export default function Menu() {
  // Get restaurant id from the URL (/menu/:id)
  const { id } = useParams();

  // Stores restaurant header info (name, rating, cuisines)
  const [restaurantInfo, setRestaurantInfo] = useState<any>(null);

  // Stores all menu items (dishes)
  const [menuItems, setMenuItems] = useState<any[]>([]);

  // Loading state for shimmer / text
  const [loading, setLoading] = useState(true);

  const fetchMenu = async () => {
    try {
      // ✅ Correct menu API endpoint
      const response = await fetch(
        `https://namastedev.com/api/v1/listRestaurantMenu/${id}`
      );

      const json = await response.json();
      console.log("Menu API JSON:", json);

      // ✅ Extract restaurant basic info
      const info =
        json?.data?.cards?.find(
          (card: any) => card?.card?.card?.info
        )?.card?.card?.info;

      setRestaurantInfo(info);

      // ✅ Menu items live under REGULAR cards
      const menuCards =
        json?.data?.cards?.find(
          (card: any) => card?.groupedCard
        )?.groupedCard?.cardGroupMap?.REGULAR?.cards;

      const items: any[] = [];

      // Loop through categories and collect dishes
      menuCards?.forEach((card: any) => {
        if (card?.card?.card?.itemCards) {
          card.card.card.itemCards.forEach((item: any) => {
            items.push(item.card.info);
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

  // Fetch menu when page loads or id changes
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
      {/* Restaurant header */}
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

      <Divider sx={{ mb: 3 }} />

      {/* Menu items */}
      {menuItems.map((item) => (
        <Card key={item.id} sx={{ mb: 2 }}>
          <CardContent>
            <Typography fontWeight="bold">
              {item.name}
            </Typography>

            <Typography color="text.secondary">
              ₹{(item.price || item.defaultPrice) / 100}
            </Typography>

            <Typography variant="body2">
              {item.description}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}