import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
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
  Button,
  Avatar
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
import { useSearch } from "../context/SearchContext";
import MenuShimmer from "../components/MenuShimmer";
type FilterType = "ALL" | "BESTSELLER";

export default function Menu() {
  // Restaurant id from route
  const { id } = useParams();

  // Header information for restaurant
  const [restaurantInfo, setRestaurantInfo] = useState<any>(null);
  const restaurantName = restaurantInfo?.name || "";
  const [restaurantImageId, setRestaurantImageId] = useState<string | null>(null);

  // All menu items fetched from API
  const [menuItems, setMenuItems] = useState<any[]>([]);

  // Veg / Non‑Veg filters (independent switches)
  const [showVeg, setShowVeg] = useState(false);
  const [showNonVeg, setShowNonVeg] = useState(false);

  // Bestseller filter
  const [filter, setFilter] = useState<FilterType>("ALL");

  // Search box value
 // const [searchText, setSearchText] = useState("");

  // GLOBAL cart count
  // This controls whether CartBar appears or not
  //const [cartCount, setCartCount] = useState(0);

  // Loading indicator
  const [loading, setLoading] = useState(true);

  //deals for you section
  // Prefer deal passed from Home, fallback to API if ever provided
  const location = useLocation();

  // Deal info passed from Home (Restaurant List page)
  const dealFromHome = location.state?.offer;
  //const offer = dealFromHome || restaurantInfo?.aggregatedDiscountInfoV3;

  // Local search inside this restaurant (below filters)
  const [menuQuery, setMenuQuery] = useState("");

  // Category filter
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const categories = [
    "ALL",
    ...Array.from(
      new Set(menuItems.map(item => item.category))
    ),
  ];  /**
   * Combined filtering logic
   * Order of filters:
   * 1. Veg / Non‑Veg
   * 2. Bestseller
   * 3. Search text
   */
  //dish name filter
  const { query } = useSearch();  

const filteredMenuItems = menuItems.filter((item) => {
  // 1. Global search (Navbar)
  const globalMatch = item.name
    ?.toLowerCase()
    .includes(query.toLowerCase());

  // 2. Local menu search
  const localMatch = item.name
    .toLowerCase()
    .includes(menuQuery.toLowerCase());

  // 3. Category filter
  const categoryMatch = selectedCategory === "ALL" || item.category === selectedCategory;

  // 4. Veg / Non‑veg filter
  const isVeg = item.isVeg === 1;
  const isNonVeg = item.isVeg === 0;

  let allowed = true;

  if (showVeg !== showNonVeg) {
    if (showVeg && !isVeg) allowed = false;
    if (showNonVeg && !isNonVeg) allowed = false;
  }

  // 5. Bestseller filter
  if (filter === "BESTSELLER" && !item.isBestseller) {
    allowed = false;
  }

  return (
    allowed &&
    globalMatch &&
    localMatch &&
    categoryMatch
  );
});

//  // Search filter
//  if (
//    searchText.trim() &&
//    !item.name.toLowerCase().includes(searchText.toLowerCase())
//  ) {
//    allowed = false;
//  }
//
//  return allowed;
//});
const groupedMenuItems = filteredMenuItems.reduce(
  (acc: Record<string, any[]>, item: any) => {
    const category = item.category || "Others";

    if (!acc[category]) {
      acc[category] = [];
    }

    acc[category].push(item);
    return acc;
  },
  {}
);

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
      
// FINAL offer source
const offer =
  restaurantInfo?.aggregatedDiscountInfoV3 ||
  dealFromHome ||
  null;

      // Extract menu items
      const menuCards =
        json?.data?.cards?.find(
          (c: any) => c?.groupedCard
        )?.groupedCard?.cardGroupMap?.REGULAR?.cards;

      const items: any[] = [];

      menuCards?.forEach((card: any) => {
     if (card?.card?.card?.itemCards) {
       const categoryTitle =
         card.card.card.title || "Others";

       card.card.card.itemCards.forEach((i: any) => {
         items.push({
           ...i.card.info,
           category: categoryTitle, 
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
  return <MenuShimmer />;
}

  return (
<Box sx={{ px: 4, py: 4 }}>
    {/* ---------- Restaurant Header ---------- */}
    {restaurantInfo && (
      <Box sx={{ mb: 4 }}>
        <Stack direction="row" alignItems="center" spacing={2}>
  {/* Stall / Restaurant Logo */}
  {restaurantInfo.cloudinaryImageId && (
    <Avatar
      src={`https://media-assets.swiggy.com/swiggy/image/upload/w_100/${restaurantInfo.cloudinaryImageId}`}
      alt={restaurantInfo.name}
      sx={{
        width: 56,
        height: 56,
        borderRadius: 2,
        border: "1px solid #e0e0e0",
      }}
    />
  )}

  {/* Restaurant Name */}
  <Typography variant="h4" fontWeight="bold">
    {restaurantInfo.name}
  </Typography>
</Stack>


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

        {/* ---------- Deals for This Restaurant ---------- */}
        {dealFromHome && (
  <Box
    sx={{
      mt: 3,
      mb: 4,
      p: 3,
      borderRadius: 3,
      background:
        "linear-gradient(90deg, #fff7e6 0%, #ffffff 85%)",
      border: "1px solid #ffe0b2",
    }}
  >
    <Typography
      variant="subtitle1"
      fontWeight="bold"
      sx={{ mb: 1 }}
    >
      Deals for You
    </Typography>

    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        flexWrap: "wrap",
      }}
    >
      <Typography
        sx={{
          fontSize: "1.1rem",
          fontWeight: "bold",
          color: "#2e7d32",
        }}
      >
        {dealFromHome.header}
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
      >
        {dealFromHome.subHeader}
      </Typography>
    </Box>

    <Typography
      variant="caption"
      color="text.secondary"
      sx={{ mt: 1, display: "block" }}
    >
      Offer will be applied automatically at checkout
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
  placeholder="Search in this menu"
  value={menuQuery}
  onChange={(e) => setMenuQuery(e.target.value)}
  sx={{ mb: 3, bgcolor: "#fff", borderRadius: 2 }}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <SearchIcon />
      </InputAdornment>
    ),
    
  }}
  
/>
 {/*    <TextField
 //       fullWidth
 //       placeholder="Search for dishes"
 //       value={searchText}
 //       onChange={(e) => setSearchText(e.target.value)}
 //       sx={{ mb: 3, bgcolor: "#fff", borderRadius: 2 }}
 //       InputProps={{
 //         startAdornment: (
 //           <InputAdornment position="start">
 //             <SearchIcon color="action" />
 //           </InputAdornment>
 //         ),
 //         endAdornment:
 //           searchText && (
 //             <InputAdornment position="end">
 //               <IconButton onClick={() => setSearchText("")}>
 //                 <CloseIcon />
 //               </IconButton>
 //             </InputAdornment>
 //           ),
 //       }}
 //     />

      {/* ---------- Filters ---------- */}
      <Stack direction="row" alignItems="center" spacing={3} sx={{ mb: 3 }}>
        <IconSwitch
          checked={showVeg}
          onChange={setShowVeg}
          icon={VegIcon}
          activeColor="#2ecc71"
        />

        <IconSwitch
          checked={showNonVeg}
          onChange={setShowNonVeg}
          icon={NonVegIcon}
          activeColor="#e74c3c"
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
      
<Stack
  direction="row"
  spacing={1}
  sx={{ mb: 2, overflowX: "auto" }}
>
  {categories.map((cat) => (
    <Button
  key={cat}
  onClick={() => setSelectedCategory(cat)}
  variant={selectedCategory === cat ? "contained" : "outlined"}
  sx={{
    borderRadius: 5,
    whiteSpace: "nowrap",

    /* Border color */
    borderColor: "#00A783",

    /* Text color when NOT selected */
    color:
      selectedCategory === cat ? "#fff" : "#00906f",

    /* Background color when selected */
    backgroundColor:
      selectedCategory === cat ? "#00906f" : "transparent",

    /* Hover styles */
    "&:hover": {
      backgroundColor:
        selectedCategory === cat ? "#00906f" : "#E7F8F3",
      borderColor: "#00A783",
    },
  }}
>
  {cat}
</Button>
  ))}
</Stack>
      <Divider sx={{ mb: 3 }} />
     {/* <TextField
  fullWidth
  placeholder="Search in this menu"
  value={menuQuery}
  onChange={(e) => setMenuQuery(e.target.value)}
  sx={{ mb: 3, bgcolor: "#fff", borderRadius: 2 }}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <SearchIcon />
      </InputAdornment>
    ),
  }}
/>*/}

      {/* ---------- Menu Items ---------- */}
      {/*
      {filteredMenuItems.map((item: any) => (
        <MenuItemRow
          key={item.id}
          item={item}
          restaurantName={restaurantName}
          // This callback is CRITICAL for cart bar behaviour
         // onQuantityChange={(delta: number) => {
        //    setCartCount((count) => Math.max(0, count + delta));
        //  }}
        />
      ))}
*/}
{/* ---------- Menu Items (Category‑wise rendering) ---------- */}
{selectedCategory === "ALL" ? (
  /*
    When ALL is selected:
    → Show all categories
    → Each category has its own heading
    → Items are shown grouped under headings
  */
  Object.entries(groupedMenuItems).map(
    ([categoryName, items]) => (
      <Box key={categoryName} sx={{ mb: 4}}>
        {/* Category heading */}
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ mb: 2 }}
        >
          {categoryName}
        </Typography>

        {/* Items under this category */}
        {items.map((item) => (
          <MenuItemRow
            key={item.id}
            item={item}
            restaurantName={restaurantName}
            offer={dealFromHome}
            restaurantImageId={restaurantInfo?.cloudinaryImageId}
          />
        ))}
      </Box>
    )
  )
) : (
  /*
    When a specific category is selected:
    → Show items in that category only
    → No category headings needed
  */
  filteredMenuItems.map((item: any) => (
    <MenuItemRow
      key={item.id}
      item={item}
      restaurantName={restaurantName}
    />
  ))
)}

      {/* ---------- Restaurant footer (Swiggy-style) ---------- */}
      <RestaurantFooter
        name={restaurantInfo.name}
        outlet={restaurantInfo.locality}
        address={restaurantInfo.completeAddress}
        fssai={restaurantInfo.fssaiLicenseNo}
      />

      {/* ---------- Sticky cart bar ---------- }
      <CartBar itemCount={cartCount} /> */}
      <CartBar />
    </Box>
  );
  
}
