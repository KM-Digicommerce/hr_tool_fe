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
import { Dashboard, Work, History, CalendarToday, Person, RequestQuote, AttachMoney, Description, AccountBalance, RemoveCircle } from "@mui/icons-material";
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
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  // States to manage the open/close of the sub-menu
  const [attendanceOpen, setAttendanceOpen] = React.useState(false);
  const [leaveRequestsOpen, setLeaveRequestsOpen] = React.useState(false);
  const [payrollOpen, setPayrollOpen] = React.useState(false); // New state for Payroll
  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };
  const handleDrawerClose = () => {
    setDrawerOpen(false);
    setAttendanceOpen(false);
    setLeaveRequestsOpen(false);
  };
  const toggleAttendance = () => {
    setDrawerOpen(true);
    setAttendanceOpen(!attendanceOpen);
  };
  const toggleLeaveRequests = () => {
    setDrawerOpen(true);
    setLeaveRequestsOpen(!leaveRequestsOpen);
  };
  const togglePayroll = () => { // New toggle function for Payroll
    setDrawerOpen(true);
    setPayrollOpen(!payrollOpen);
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
            <ListItemButton component={Link} to="/dashboard" sx={[{ minHeight: 48, px: 2 }, drawerOpen ? { justifyContent: "initial" } : { justifyContent: "center" }]}>
              <ListItemIcon sx={[{ minWidth: 0, justifyContent: "center" }, drawerOpen ? { mr: 2 } : { mr: "auto" }]}>
                <Dashboard />
              </ListItemIcon>
              <ListItemText primary="Dashboard" sx={[drawerOpen ? { opacity: 1 } : { opacity: 0 }]} />
            </ListItemButton>
          </ListItem>

          {/* Attendance Section */}
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton onClick={toggleAttendance} sx={[{ minHeight: 48, px: 2 }, drawerOpen ? { justifyContent: "initial" } : { justifyContent: "center" }]}>
              <ListItemIcon sx={[{ minWidth: 0, justifyContent: "center" }, drawerOpen ? { mr: 2 } : { mr: "auto" }]}>
                <Work />
              </ListItemIcon>
              <ListItemText primary="Attendance" sx={[drawerOpen ? { opacity: 1 } : { opacity: 0 }]} />
            </ListItemButton>
            {attendanceOpen && (
              <List sx={{ pl: 3 }}>
                {/* Attendance Request Sub-item */}
                <ListItemButton component={Link} to="/dashboard/attendance/request" sx={{ paddingLeft: 2 }}>
                  <ListItemIcon sx={{ minWidth: 30 }}>
                    <RequestQuote />
                  </ListItemIcon>
                  <ListItemText primary="Attendance Request" sx={{ marginLeft: 1 }} />
                </ListItemButton>

                {/* Attendance History Sub-item */}
                <ListItemButton component={Link} to="/dashboard/attendance/history" sx={{ paddingLeft: 2 }}>
                  <ListItemIcon sx={{ minWidth: 30 }}>
                    <History />
                  </ListItemIcon>
                  <ListItemText primary="Attendance History" sx={{ marginLeft: 1 }} />
                </ListItemButton>
              </List>
            )}
          </ListItem>

          {/* Leave Requests Section */}
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton onClick={toggleLeaveRequests} sx={[{ minHeight: 48, px: 2 }, drawerOpen ? { justifyContent: "initial" } : { justifyContent: "center" }]}>
              <ListItemIcon sx={[{ minWidth: 0, justifyContent: "center" }, drawerOpen ? { mr: 2 } : { mr: "auto" }]}>
                <CalendarToday />
              </ListItemIcon>
              <ListItemText primary="Leave Requests" sx={[drawerOpen ? { opacity: 1 } : { opacity: 0 }]} />
            </ListItemButton>
            {leaveRequestsOpen && (
          <List sx={{ pl: 3 }}>
            {/* Leave History Sub-item */}
            <ListItemButton component={Link} to="/dashboard/leave/request" sx={{ paddingLeft: 2 }}>
              <ListItemIcon sx={{ minWidth: 30 }}>
              <CalendarToday />
              </ListItemIcon>
              <ListItemText primary="Leave Request" sx={{ marginLeft: 1 }} />
            </ListItemButton>
            {/* Leave Request Sub-item */}
            <ListItemButton component={Link} to="/dashboard/leave/history" sx={{ paddingLeft: 2 }}>
              <ListItemIcon sx={{ minWidth: 30 }}>
              <History />           
              </ListItemIcon>
              <ListItemText primary="Leave History" sx={{ marginLeft: 1 }} />
            </ListItemButton>
          </List>
        )}
          </ListItem>
 {/* Payroll Main Item */}
 <ListItem disablePadding sx={{ display: "block" }}>
      <ListItemButton onClick={togglePayroll} sx={[{ minHeight: 48, px: 2 }, drawerOpen ? { justifyContent: "initial" } : { justifyContent: "center" }]}>
        <ListItemIcon sx={[{ minWidth: 0, justifyContent: "center" }, drawerOpen ? { mr: 2 } : { mr: "auto" }]}>
          <AttachMoney /> {/* Icon for Payroll */}
        </ListItemIcon>
        <ListItemText primary="Payroll" sx={[drawerOpen ? { opacity: 1 } : { opacity: 0 }]} />
      </ListItemButton>
      {payrollOpen && (
        <List sx={{ pl: 3 }}>
          {/* Payslips Sub-item */}
          <ListItemButton component={Link} to="/dashboard/payroll/payslips" sx={{ paddingLeft: 2 }}>
            <ListItemIcon sx={{ minWidth: 30 }}>
              <Description /> {/* Icon for Payslips */}
            </ListItemIcon>
            <ListItemText primary="Payslips" sx={{ marginLeft: 1 }} />
          </ListItemButton>
          {/* Allowances Sub-item */}
          <ListItemButton component={Link} to="/dashboard/payroll/allowances" sx={{ paddingLeft: 2 }}>
            <ListItemIcon sx={{ minWidth: 30 }}>
              <AccountBalance /> {/* Icon for Allowances */}
            </ListItemIcon>
            <ListItemText primary="Allowances" sx={{ marginLeft: 1 }} />
          </ListItemButton>
          {/* Deductions Sub-item */}
          <ListItemButton component={Link} to="/dashboard/payroll/deductions" sx={{ paddingLeft: 2 }}>
            <ListItemIcon sx={{ minWidth: 30 }}>
              <RemoveCircle /> {/* Icon for Deductions */}
            </ListItemIcon>
            <ListItemText primary="Deductions" sx={{ marginLeft: 1 }} />
          </ListItemButton>
        </List>
      )}
    </ListItem>

          {/* My Profile Section */}
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton component={Link} to="/profile" sx={[{ minHeight: 48, px: 2 }, drawerOpen ? { justifyContent: "initial" } : { justifyContent: "center" }]}>
              <ListItemIcon sx={[{ minWidth: 0, justifyContent: "center" }, drawerOpen ? { mr: 2 } : { mr: "auto" }]}>
                <Person />
              </ListItemIcon>
              <ListItemText primary="My Profile" sx={[drawerOpen ? { opacity: 1 } : { opacity: 0 }]} />
            </ListItemButton>
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
