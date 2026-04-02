import { Box, Skeleton, Stack } from "@mui/material";

/*
 Shimmer UI for Menu page.
 This is shown while restaurant info and menu items are loading.
*/

export default function MenuShimmer() {
  return (
    <Box sx={{ px: 4, py: 4 }}>
      {/* Restaurant title */}
      <Skeleton variant="text" width="60%" height={40} />

      {/* Restaurant meta info */}
      <Skeleton variant="text" width="40%" height={20} />
      <Skeleton variant="text" width="50%" height={20} />

      {/* Category chips shimmer */}
      <Stack direction="row" spacing={2} sx={{ mt: 4, mb: 3 }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton
            key={i}
            variant="rounded"
            width={100}
            height={40}
          />
        ))}
      </Stack>

      {/* Menu items shimmer */}
      <Stack spacing={3}>
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton
            key={i}
            variant="rounded"
            height={120}
          />
        ))}
      </Stack>
    </Box>
  );
}
