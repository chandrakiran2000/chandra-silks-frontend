import React from "react";
import { NavLink, useNavigate, useLocation  } from "react-router-dom";

import Cookies from "js-cookie";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';


import logo2 from "../../assets/Logos/logo2.png"




const pages = [{name: "Products", path: "/"}, {name: "Cart", path: "/cart"}, {name: "Orders", path: "/orders"}, {name: "Logout"}]


const Navbar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const navigate = useNavigate()
    const location = useLocation()

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogout = () => {
    Cookies.remove("jwt_token")
    localStorage.removeItem("userData")
    navigate("/login", {replace: true})
  }

    return(
        <AppBar position="sticky" sx={{top: 0 , left: 0, right: 0, bgcolor: ' #ffffff', color: "#475569", boxShadow: "0 2px 10px rgba(0,0,0,0.05)"}}>
          <Container maxWidth="xl">
            <Toolbar disableGutters sx={{ minHeight: 64 }}>
              <Box
                component={NavLink}
                to="/"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "none",
                  gap: 1,
                }}
              >
                <Box
                  component="img"
                  src={logo2}
                  alt="Chandra Silks Logo"
                  sx={{
                    width: 55,
                    height: 55,
                    objectFit: "contain",
                  }}
                />

                <Typography
                  variant="h6"
                  noWrap
                  sx={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 700,
                    letterSpacing: "0.08rem",
                    color: "#e2a139",
                  }}
                >
                  Chandra Silks
                </Typography>
              </Box>
              
              <Box sx={{ flexGrow: 1 }} />
              {/*Mobile nav*/}
              <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'flex-end' }}>
                <IconButton
                  size="large"
                  aria-label="menu"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color=  'inherit'
                  sx={{ "&:hover": {color: "#1e293b", backgroundColor: "transparent"} }}
                >
                  <MenuIcon  />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{ display: { xs: 'block', md: 'none' }, color: '#475569', fontWeight: 500  }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page.name} onClick={() => {
                        handleCloseNavMenu()
                        if(page.name === "Logout"){
                          handleLogout()
                        } else{
                          navigate(page.path)
                        }
                      }} sx={{color : page.name === "Logout" ? "#ef4444": location.pathname === page.path ? "#e2a139" : "#475569",}}>
                      <Typography sx={{ textAlign: 'center',}}>{page.name}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            

              {/* Desktop Nav*/}
              <Box  sx={{ gap: 1, alignItems: 'center', justifyContent: 'flex-end', display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page) => (
                  <Button
                    key={page.name}
                    onClick={() => {
                      handleCloseNavMenu()

                      if (page.name === "Logout") {
                        handleLogout()
                      } else {
                        navigate(page.path)
                      }
                    }}
                    sx={{
                      my: 2,
                      display: "block",
                      fontWeight: 600,
                      borderRadius: 0,

                      color:
                        page.name === "Logout"
                          ? "#ef4444"
                          : location.pathname === page.path
                          ? "#e2a139"
                          : "#1e293b",

                      boxShadow:
                        location.pathname === page.path
                          ? "inset 0 -2px 0 #e2a139"
                          : "none",

                      "&:hover": {
                        backgroundColor: "transparent",
                        color: page.name === "Logout" ? "#dc2626" : "#1e293b",
                        boxShadow:
                          page.name !== "Logout"
                            ? "inset 0 -2px 0 #e2a139"
                            : "none",
                      },
                    }}
                  >
                    {page.name}
                  </Button>
                ))}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
    )
}

export default Navbar