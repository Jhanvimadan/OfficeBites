import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

/**
 * SearchBar is a reusable, controlled input.
 * It does NOT manage state.
 * It receives value and onChange from the parent.
 */
type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search",
}: SearchBarProps) {
  return (
    <TextField
      fullWidth
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)} // ✅ correct callback
      sx={{ mb: 3, bgcolor: "#fff", borderRadius: 2 }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon color="action" />
          </InputAdornment>
        ),
        endAdornment:
          value && (
            <InputAdornment position="end">
              <IconButton onClick={() => onChange("")}>
                <CloseIcon />
              </IconButton>
            </InputAdornment>
          ),
      }}
    />
  );
}