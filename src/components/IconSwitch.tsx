import { Switch } from "@mui/material";

type IconSwitchProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  icon: string;
  activeColor: string;
};

export default function IconSwitch({
  checked,
  onChange,
  icon,
  activeColor,
}: IconSwitchProps) {

  // ✅ SVG wrapped and sized properly
  const ThumbIcon = (
    <img
      src={icon}
      alt=""
      style={{
        width:24,
        height: 24,
        objectFit: "contain",
      }}
    />
  );

  return (
    <Switch
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      icon={ThumbIcon}
      checkedIcon={ThumbIcon}
      disableRipple
      sx={{
        width: 44,
        height: 26,
        padding: 0,

        "& .MuiSwitch-switchBase": {
          padding: 2,
        },

        "& .MuiSwitch-thumb": {
          width: 22,
          height: 22,
          backgroundColor: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
        },

        "& .MuiSwitch-track": {
          borderRadius: 13,
          backgroundColor: checked ? activeColor : "#d0d0d0",
          opacity: 1,
        },
      }}
    />
  );
}
