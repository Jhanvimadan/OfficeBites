import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Divider,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

import MenuItemRow from "../components/MenuItemRow";
import IconSwitch from "../components/IconSwitch";
import RestaurantFooter from "../components/RestaurantFooter";
import CartBar from "../components/CartBar";

// SVG assets for Veg / Non-Veg switches
import VegIcon from "../assets/veg.svg";
import NonVegIcon from "../assets/non-veg.svg";

type FilterType = "ALL" | "BESTSELLER";

export default function Menu() {
  // Restaurant id from route
  const { id } = useParams();

  // Header information for restaurant
  const [restaurantInfo, setRestaurantInfo] = useState<any>(null);

  // All menu items fetched from API
  const [menuItems, setMenuItems] = useState<any[]>([]);

  // Veg / Non‑Veg filters (independent switches)
  const [showVeg, setShowVeg] = useState(false);
  const [showNonVeg, setShowNonVeg] = useState(false);

  // Bestseller filter
  const [filter, setFilter] = useState<FilterType>("ALL");

  // Search box value
  const [searchText, setSearchText] = useState("");

  // ✅ GLOBAL cart count (VERY IMPORTANT)
  // This controls whether CartBar appears or not
  const [cartCount, setCartCount] = useState(0);

  // Loading indicator
  const [loading, setLoading] = useState(true);

  //deals for you section
  const offer = restaurantInfo?.aggregatedDiscountInfoV3;

  /**
   * Combined filtering logic
   * Order of filters:
   * 1. Veg / Non‑Veg
   * 2. Bestseller
   * 3. Search text
   */
  const filteredMenuItems = menuItems.filter((item) => {
    const isVeg = item.isVeg === 1;
    const isNonVeg = item.isVeg === 0;

    let allowed = true;

    // Veg / Non-Veg logic
    if (showVeg !== showNonVeg) {
      if (showVeg && !isVeg) allowed = false;
      if (showNonVeg && !isNonVeg) allowed = false;
    }

    // Bestseller filter
    if (filter === "BESTSELLER" && !item.isBestseller) {
      allowed = false;
    }

    // Search filter
    if (
      searchText.trim() &&
      !item.name.toLowerCase().includes(searchText.toLowerCase())
    ) {
      allowed = false;
    }

    return allowed;
  });

  /**
   * Fetch menu + restaurant data
   */
  const fetchMenu = async () => {
    try {
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

      // Extract menu items
      const menuCards =
        json?.data?.cards?.find(
          (c: any) => c?.groupedCard
        )?.groupedCard?.cardGroupMap?.REGULAR?.cards;

      const items: any[] = [];

      menuCards?.forEach((card: any) => {
        if (card?.card?.card?.itemCards) {
          card.card.card.itemCards.forEach((i: any) => {
            items.push({
              ...i.card.info,
              // Mocked bestseller flag (API doesn't provide this)
              isBestseller: Math.random() > 0.7,
            });
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

  // Load menu on mount or restaurant change
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
      {/* ---------- Restaurant Header ---------- */}
      {restaurantInfo && (
        <Box sx={{ mb: 4 }}>
  <Typography variant="h4" fontWeight="bold">
    {restaurantInfo.name}
  </Typography>

  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
    ⭐ {restaurantInfo.avgRatingString} (
    {restaurantInfo.totalRatingsString}) •{" "}
    {restaurantInfo.costForTwoMessage}
  </Typography>

  <Typography variant="body2" color="text.secondary">
    {restaurantInfo.cuisines?.join(", ")}
  </Typography>

  <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
    <Typography variant="body2" color="primary">
      {restaurantInfo.locality}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      {restaurantInfo.sla?.slaString}
    </Typography>
  </Box>

  {/* ✅ Deal banner on its own line */}
  {offer && (
    <Box
      sx={{
        mt: 2,
        px: 2,
        py: 1,
        bgcolor: "#f1f8e9",
        borderRadius: 2,
        display: "inline-flex",
        alignItems: "center",
        gap: 1,
      }}
    >
      <Typography fontWeight="bold" color="green">
        {offer.header}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {offer.subHeader}
      </Typography>
    </Box>
  )}
</Box>
      )}

      {/* ---------- Menu Header ---------- */}
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
        MENU
      </Typography>

      {/* ---------- Search Bar ---------- */}
      <TextField
        fullWidth
        placeholder="Search for dishes"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        sx={{ mb: 3, bgcolor: "#fff", borderRadius: 2 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
          endAdornment:
            searchText && (
              <InputAdornment position="end">
                <IconButton onClick={() => setSearchText("")}>
                  <CloseIcon />
                </IconButton>
              </InputAdornment>
            ),
        }}
      />

      {/* ---------- Filters ---------- */}
      <Stack direction="row" alignItems="center" spacing={3} sx={{ mb: 3 }}>
        <IconSwitch
          checked={showVeg}
          onChange={setShowVeg}
          icon={VegIcon}
          activeColor="#4CAF50"
        />

        <IconSwitch
          checked={showNonVeg}
          onChange={setShowNonVeg}
          icon={NonVegIcon}
          activeColor="#D32F2F"
        />

        <ToggleButtonGroup
          value={filter === "ALL" ? null : filter}
          exclusive
          onChange={(_, value) => setFilter(value ?? "ALL")}
          sx={{
            "& .MuiToggleButton-root": {
              borderRadius: "999px",
              px: 2.5,
              py: 0.75,
              fontWeight: 600,
              textTransform: "none",
            },
          }}
        >
          <ToggleButton value="BESTSELLER">
            <StarIcon sx={{ mr: 1, color: "#f4b400" }} />
            Bestseller
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      <Divider sx={{ mb: 3 }} />

      {/* ---------- Menu Items ---------- */}
      {filteredMenuItems.map((item) => (
        <MenuItemRow
          key={item.id}
          item={item}
          // ✅ This callback is CRITICAL for cart bar behaviour
          onQuantityChange={(delta: number) => {
            setCartCount((count) => Math.max(0, count + delta));
          }}
        />
      ))}

      {/* ---------- Restaurant footer (Swiggy-style) ---------- */}
      <RestaurantFooter
        name={restaurantInfo.name}
        outlet={restaurantInfo.locality}
        address={restaurantInfo.completeAddress}
        fssai={restaurantInfo.fssaiLicenseNo}
      />

      {/* ---------- Sticky cart bar ---------- */}
      <CartBar itemCount={cartCount} />
    </Box>
  );
}