import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Dashboard, FileCopy,Work,Person } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Logout from "../../Auth/Logout";
import UserRoutes from "./UserRoutes";
import CustomAppBar from "./AppBar";  
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const drawerWidth = 250;


const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "drawerOpen",
})(({ theme, drawerOpen }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(drawerOpen && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!drawerOpen && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = React.useState(false); // Rename 'open' to 'drawerOpen'
  const [employeeOpen, setEmployeeOpen] = React.useState(false); // New state for Payroll

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };
  const handleDrawerClose = () => {
    setDrawerOpen(false);
    setEmployeeOpen(false);
  };
  const toggleEmployee = () => { // New toggle function for Payroll
    setDrawerOpen(true);
    setEmployeeOpen(!employeeOpen);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <CustomAppBar open={drawerOpen} onMenuClick={handleDrawerOpen} />
      <Drawer variant="permanent" drawerOpen={drawerOpen}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {/* Dashboard */}
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton component={Link} to="/hr/dashboard" sx={[{ minHeight: 48, px: 2 }, drawerOpen ? { justifyContent: "initial" } : { justifyContent: "center" }]}>
              <ListItemIcon sx={[{ minWidth: 0, justifyContent: "center" }, drawerOpen ? { mr: 2 } : { mr: "auto" }]}>
                <Dashboard />
              </ListItemIcon>
              <ListItemText primary="Dashboard" sx={[drawerOpen ? { opacity: 1 } : { opacity: 0 }]} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ display: "block" }}>
  <ListItemButton onClick={toggleEmployee} sx={[{ minHeight: 48, px: 2 }, drawerOpen ? { justifyContent: "initial" } : { justifyContent: "center" }]}>
    <ListItemIcon sx={[{ minWidth: 0, justifyContent: "center" }, drawerOpen ? { mr: 2 } : { mr: "auto" }]}>
      <Person /> {/* Icon for Employee */}
    </ListItemIcon>
    <ListItemText primary="Employee" sx={[drawerOpen ? { opacity: 1 } : { opacity: 0 }]} />
  </ListItemButton>
  {employeeOpen && (
    <List sx={{ pl: 3, paddingTop: 0, paddingBottom: 0 }}>
      {/* Profile Sub-item */}
      <ListItemButton component={Link} to="/hr/employee-list" sx={{ paddingLeft: 2, paddingTop: 0.5, paddingBottom: 0.5, "&:hover": { backgroundColor: "#2066b0", color: "white" }, "&.Mui-selected": { backgroundColor: "#0074d9", color: "white" } }}>
        <ListItemIcon sx={{ minWidth: 30 }}>
        <Person /> {/* Icon for Employee */}
        </ListItemIcon>
        <ListItemText primary="Employees" sx={{ marginLeft: 1 }} />
      </ListItemButton>
      {/* Document Request Sub-item */}
      <ListItemButton component={Link} to="/employee/document-request" sx={{ paddingLeft: 2, paddingTop: 0.5, paddingBottom: 0.5, "&:hover": { backgroundColor: "#2066b0", color: "white" }, "&.Mui-selected": { backgroundColor: "#0074d9", color: "white" } }}>
        <ListItemIcon sx={{ minWidth: 30 }}>
          <FileCopy /> {/* Icon for Document Request */}
        </ListItemIcon>
        <ListItemText primary="Document Request" sx={{ marginLeft: 1 }} />
      </ListItemButton>
      {/* Work Type Request Sub-item */}
      <ListItemButton component={Link} to="/employee/work-type-request" sx={{ paddingLeft: 2, paddingTop: 0.5, paddingBottom: 0.5, "&:hover": { backgroundColor: "#2066b0", color: "white" }, "&.Mui-selected": { backgroundColor: "#0074d9", color: "white" } }}>
        <ListItemIcon sx={{ minWidth: 30 }}>
          <Work /> {/* Icon for Work Type Request */}
        </ListItemIcon>
        <ListItemText primary="Work Type Request" sx={{ marginLeft: 1 }} />
      </ListItemButton>
    </List>
  )}
</ListItem>
        </List>
        <Divider />
        <Box sx={{ mt: "auto", mb: 2, px: 2 }}>
          <ListItem sx={{ mt: "15px" }} disablePadding>
            <ListItemButton component={Logout}>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <UserRoutes />
      </Box>
    </Box>
  );
}
