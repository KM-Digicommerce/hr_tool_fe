import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: 180, // Drawer width
    width: `calc(100% - 250px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const user = JSON.parse(localStorage.getItem('user'));
const CustomAppBar = ({ open, onMenuClick }) => (
  <AppBar position="fixed" open={open} sx={{boxShadow:'none'}}>
    <Box sx={{display:'flex' , justifyContent:'space-between' , alignItems:'center'}}>
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={onMenuClick}
        edge="start"
        sx={[{ marginRight: 3 }, open && { display: "none" }]}
      >
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" noWrap component="div">
      HR Tool
      </Typography>
    </Toolbar>

    <Box sx={{paddingRight:'24px'}}>
      <Typography>{user?.name}</Typography>
    </Box>
    </Box>
  </AppBar>
);

export default CustomAppBar;
