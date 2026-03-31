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

  //icon inside thumb
  const ThumbIcon = (
    <img
      src={icon}
      alt=""
      style={{
        width:14,
        height: 14,
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
        height: 28,
        padding: 0,

        /*switch base controls thumb movement */
        "& .MuiSwitch-switchBase": {
          padding: 2,
          transitionDuration: "300ms",
        },
        /*movement distance when checked */
        "& .MuiSwitch-switchBase.Mui-checked": {
          transform: "translateX(16px)",
          color: '#fff',
        },
        /* thumb(circle) */
        "& .MuiSwitch-thumb": {
          width: 22,
          height: 22,
          backgroundColor: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
        },
        /* track(background) */
        "& .MuiSwitch-track": {
          borderRadius: 13,
          backgroundColor: checked ? activeColor : "#d0d0d0",
          opacity: 1,
        },
      }}
    />
  );
}
