import { useState } from "react";
import Cookies from "js-cookie"
import { useLocation, useNavigate } from "react-router-dom"
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PeopleIcon from "@mui/icons-material/People";
import LogoutIcon from "@mui/icons-material/Logout";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import logo1 from "../../assets/Logos/logo1.png"
import logo2 from "../../assets/Logos/logo2.png"

const adminMenu = [
  { text: "Dashboard", icon: <DashboardIcon  />, path: "/admin/dashboard" },
  { text: "Products", icon: <Inventory2Icon />, path: "/admin/products" },
  { text: "Orders", icon: <ReceiptLongIcon />, path: "/admin/orders" },
  { text: "Customers", icon: <PeopleIcon />, path: "/admin/customers"},
];

const AdminSideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  

  const navigate = useNavigate()
  const location = useLocation()

  const handleNav = (text, path) => {
    navigate(path)
  }

  const handleAdminLogout = () => {
  Cookies.remove("admin_jwt_token")

  localStorage.removeItem("adminData")

  navigate("/admin/login")
}

  return (
    <Box
      sx={{
        height: "100dvh",
        minHeight: "100dvh",
        bgcolor: "#ffffff",
        borderRight: "1px solid #e2e8f0",
        transition: "width 0.3s",
        width: collapsed ? { xs: "70px", sm: "75px", md: "80px" } : { xs: "220px", sm: "260px", md: "280px" },
        flexShrink: 0,
        display: "flex",
        overflow:"hidden",
        flexDirection: "column", position: "sticky", top:0}}>
      {/* HEADER TOGGLE BUTTON */}
      <Box
  sx={{
    py: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }}
>
  <Box component="img" src={collapsed ? logo2 : logo1} alt="Chandra Silks Logo" onClick={() => setCollapsed(!collapsed)}
    sx={{ cursor: "pointer", objectFit: "contain",  width: collapsed ? { xs: 40, sm: 45, md: 50 }: { xs: 90, sm: 110, md: 130 }, 
      height: collapsed ? { xs: 40, sm: 45, md: 50 }: { xs: 70, sm: 90, md: 110 }, }}
  />

</Box>

      {/* MENU ITEMS */}
      <List sx={{ flexGrow: 1 }}>
        {adminMenu.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ my: 0.5 }}>
            <Tooltip title={collapsed ? item.text : ""} placement="right">
              <ListItemButton selected = {location.pathname === item.path} sx={{display: "flex", justifyContent: "center" ,"&.Mui-selected": {bgcolor: "#FDE68A",borderRadius: "8px",}, "&.Mui-selected:hover": {bgcolor: "#FCD34D",}, px: collapsed ? 5 : 3, py: 1.5,}} 
              onClick={() => handleNav(item.text, item.path)}>
                <ListItemIcon sx={{ minWidth: "40px" }}>
                  {item.icon}
                </ListItemIcon>

                {/* HIDE TEXT WHEN COLLAPSED */}
                {!collapsed && <ListItemText primary={item.text} />}
              </ListItemButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>

      <Box sx={{ flexGrow: 1 }} />

      <Divider />

      {/* LOGOUT BUTTON */}
      <List>
        <ListItem disablePadding>
          <Tooltip title={collapsed ? "Logout" : ""} placement="right">
            <ListItemButton sx={{ color: "#ef4444" }} onClick={handleAdminLogout}>
              <ListItemIcon sx={{ color: "#ef4444", minWidth: "40px" }}>
                <LogoutIcon />
              </ListItemIcon>
              {!collapsed && <ListItemText primary="Logout" />}
            </ListItemButton>
          </Tooltip>
        </ListItem>
      </List>
    </Box>
  );
};

export default AdminSideBar;
