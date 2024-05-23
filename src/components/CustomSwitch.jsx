import { tokens } from "../theme";
import { styled } from "@mui/material/styles";
import Switch, { switchClasses } from "@mui/material/Switch";
const pxToRem = (px, oneRemPx = 17) => `${px / oneRemPx}rem`;

export const CustomSwitch = styled(Switch)(({ theme }) => {
  const colors = tokens(theme.palette.mode);
  const borderWidth = 2;
  const width = pxToRem(56);
  const height = pxToRem(26);
  const size = pxToRem(20);
  const gap = (26 - 20) / 2;
  return {
    width,
    height,
    padding: 0,
    margin: theme.spacing(1),
    overflow: "unset",
    [`& .${switchClasses.switchBase}`]: {
      padding: pxToRem(gap),
      [`&.${switchClasses.checked}`]: {
        color: "#fff",
        transform: `translateX(calc(${width} - ${size} - ${pxToRem(2 * gap)}))`,
        [`& + .${switchClasses.track}`]: {
          backgroundColor: colors.greenAccent[500],
          opacity: 1,
          border: "none",
        },
        [`& .${switchClasses.thumb}`]: {
          backgroundColor: "#fff",
        },
      },
    },
    [`& .${switchClasses.thumb}`]: {
      boxShadow: "none",
      backgroundColor: "white",
      width: size,
      height: size,
    },
    [`& .${switchClasses.track}`]: {
      borderRadius: 40,
      border: "none",
      borderWidth,
      backgroundColor: colors.redAccent[500],
      opacity: 1,
      transition: theme.transitions.create(["background-color", "border"]),
      boxSizing: "border-box",
    },
  };
});
