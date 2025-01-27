import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar"; // For user profile image
import { Popover, ListItem, ListItemButton, ListItemText } from "@mui/material"; // For Logout button
import Logout from "../../Auth/Logout"; // For Logout functionality

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

const CustomAppBar = ({ open, onMenuClick }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [anchorEl, setAnchorEl] = React.useState(null); // For handling the popover visibility

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget); // Open the popover when profile is clicked
  };

  const handleClose = () => {
    setAnchorEl(null); // Close the popover
  };

  const openPopover = Boolean(anchorEl); // Check if the popover is open
  const id = openPopover ? "profile-popover" : undefined;

  // Get the first letter of the user's name (if avatar is not available)
  const profileLetter = user?.name?.charAt(0).toUpperCase();

  return (
    <AppBar position="fixed" open={open} sx={{ boxShadow: "none" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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

        <Box sx={{ display: "flex", alignItems: "center", paddingRight: "24px" }}>
          <Typography>{user?.name}</Typography>

          {/* Profile Avatar */}
          <Avatar
            src={user?.avatar} // Add the profile image if exists
            sx={{
              width: 40,
              height: 40,
              marginLeft: 2,
              cursor: "pointer", // Make it clickable
              backgroundColor: user?.avatar ? undefined : "#1976d2", // Default background color if no avatar
            }}
            onClick={handleProfileClick}
          >
            {!user?.avatar && profileLetter} {/* Display first letter of the name if no avatar */}
          </Avatar>

          {/* Popover for Logout */}
          <Popover
            id={id}
            open={openPopover}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <Box sx={{ mt: "auto", mb: 2, px: 2 }}>
              <ListItem sx={{ mt: "15px" }} disablePadding>
                <ListItemButton component={Logout}>
                  <ListItemText primary="Logout" />
                </ListItemButton>
              </ListItem>
            </Box>
          </Popover>
        </Box>
      </Box>
    </AppBar>
  );
};

export default CustomAppBar;
