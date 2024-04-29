import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  useTheme,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import DeskIcon from "@mui/icons-material/Desk";
import { Link, NavLink } from "react-router-dom";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const [alignment, setAlignment] = useState("web");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      <Box display="flex">
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          <ToggleButton
            component={NavLink}
            to={"/desk1"}
            variant="contained"
            style={{
              margin: "10px 0 20px 0",
              color: "white",
              background: colors.primary[400],
            }}
          >
            Desk 1
          </ToggleButton>
          <ToggleButton
            component={NavLink}
            to={"/desk2"}
            variant="contained"
            style={{
              margin: "10px 0 20px 0",
              color: "white",
              background: colors.primary[400],
            }}
          >
            Desk 2
          </ToggleButton>
        </ToggleButtonGroup>
        {/* <ButtonGroup variant="outlined" aria-label="Basic button group">
          <Button
            component={NavLink}
            to={"/desk1"}
            variant="contained"
            style={{
              margin: "10px 0 20px 0",
              color: "white",
              background: colors.primary[400],
            }}
            sx={{
              "& .active": {
                background: colors.greenAccent[400],
              },
            }}
          >
            Desk 1
          </Button>

          <Link to="/desk2">
            <Button
              variant="contained"
              style={{
                margin: "10px 0 20px 0",
                color: "white",
                background: colors.primary[400],
              }}
            >
              Desk 2
            </Button>
          </Link>
        </ButtonGroup> */}
      </Box>
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton></IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
