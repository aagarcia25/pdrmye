import React from "react";
import { ReactNode } from "react";
import { useNavigate } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { pc,phone,table } from "../styles";




const settings = ["Profile", "Account", "Dashboard", "Logout"];

interface Props{
    children? :  ReactNode,
    drawerWidth ? : number
   }
   




const NavBar = ({children,drawerWidth, ...props} : Props) => {
   
    // validacion de pantalla
    const theme = useTheme();
    //const xs = useMediaQuery(theme.breakpoints.down('xs'));
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const lg = useMediaQuery(theme.breakpoints.down('lg'));
    const xl = useMediaQuery(theme.breakpoints.down('xl'));
    let style = pc;
   // if(xs){
   //   style=phone;
   //   console.log("la pantalla es xs");
   // }else
     if(sm){
      style=phone;
      console.log("la pantalla es sm");
    }else if(md){
      style=table;
      console.log("la pantalla es md");
    }else if(lg || xl){
      style=pc;
      console.log("la pantalla es lg o xl");
    }
    
  
  
  
  
  
  
  const navigate = useNavigate();


  const [anchorElNav, setAnchorElNav, ] =React.useState<null | HTMLElement>(null);
  const [anchorElUser,setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  
  const handleSettings= (event: React.MouseEvent<HTMLElement>)=>{
    console.log(event.currentTarget.innerText);
    if(event.currentTarget.innerText ='Logout'){
      event.preventDefault();
    }

    
  }
  const handleListNotificationOpen = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    console.log("Abri bandeja de notificaciones ") ;
  };
  const handleCalendarOpen = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    console.log("Abri calendario ") ;
  };
  const handleDocumentOpen = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    console.log("Abri calendario ") ;
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";

  return (
    <AppBar 
    color="primary"
    position="fixed" 
    sx={{
        backgroundColor: `{$theme.primary.light}` ,
        width:{ sm: `calc(100% - ${drawerWidth}px)`},
        ml:   { sm: `${drawerWidth}px`}
    }}>
      <Container maxWidth="xl">
       
       
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: style.xs, md: style.md }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: style.xs, md: style.md},
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            PDRMyE
          </Typography>



          <Box sx={{ flexGrow: 1, display: { xs: style.xs, md: style.box_md } }}>
         
          </Box>

         
          <Box sx={{ display: {  xs: style.box_xs, md: style.box_md} }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
              onClick={handleDocumentOpen}
            >
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={handleListNotificationOpen}
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="Mostrar Calendario"
              color="inherit"
              onClick={handleCalendarOpen}
            >
              <Badge  color="error">
                <CalendarMonthIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
           
            </IconButton>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleSettings}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>




      </Container>
    </AppBar>
  );
};
export default NavBar;
