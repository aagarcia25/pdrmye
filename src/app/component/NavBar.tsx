import React, { useEffect, useState } from "react";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";


import { phone, table, pc, colores } from "./styles";
import { useAppDispatch } from "../hooks/hooks";
import { logoutUser } from "../store/authSlice/authSlice";
import { MenuC } from "./MenuC";
import { menusByIdUser } from "../services/menuService";
import { calendarios } from "../services/calendarioService";
import { Notificaciones } from "../services/catalogosServices";

const settings = ["Profile", "Account", "Dashboard", "Logout"];


interface Props {
  children?: ReactNode;
  drawerWidth?: number;
}

const NavBar = ({ children, drawerWidth, ...props }: Props) => {
  // validacion de pantalla
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const md = useMediaQuery(theme.breakpoints.down("md"));
  const lg = useMediaQuery(theme.breakpoints.down("lg"));
  const xl = useMediaQuery(theme.breakpoints.down("xl"));
  let style = pc;

  if (sm) {
    style = phone;
   // console.log("la pantalla es sm");
  } else if (md) {
    style = table;
   // console.log("la pantalla es md");
  } else if (lg || xl) {
    style = pc;
   // console.log("la pantalla es lg o xl");
  }

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
//  let pages :  []= [];

  const [menu, setMenu] = useState([]);

  //conteo de notificaciones

  const [calen, setCalen] = useState(0);
  const [notif, setNotif] = useState(0);


  useEffect(() => {
    calendarios({ NUMOPERACION: "5" , CHUSER:1 }).then((res) => {
      let r = res.RESPONSE;
      setCalen( r[0].count);
      
      
    });
  }, []);

  useEffect(() => {
    Notificaciones({ NUMOPERACION: "5" ,CHUSER:1}).then((res) => {
      let r = res.RESPONSE;
      setNotif( r[0].count);
    });
  }, []);




  useEffect(() => {
    menusByIdUser({ CHID: "1" }).then((res) => {
      setMenu(res.RESPONSE);
     
    });
  }, []);









  function redir() {
    window.location.reload();
  }

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  //const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleSettings = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if ((event.currentTarget.innerText = "Logout")) {
      dispatch(logoutUser());
      redir();
    }
  };

  const handleListNotificationOpen = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    navigate("/ListNotification");
  };
  const handleCalendarOpen = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    navigate("/Calendar");
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };


  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      color="primary"
      position="fixed"
      sx={{
        backgroundColor: colores.blanco,
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: style.xs, md: style.md },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: colores.gris,
              textDecoration: "none",
            }}
          >
            PDRMyE
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: style.xs, md: "none" } }}>
           
           
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon color="primary" />
            </IconButton>
           
             <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              //onClose={}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              
              
              
              {settings.map((page) => (
                <MenuItem
                  key={page}
                  //onClick={handleCloseNavMenu}
                  color="primary"
                >
                  <Typography textAlign="center" sx={{ color: colores.gris }}>
                    {page}
                  </Typography>
                </MenuItem>
              ))}





            </Menu>  
        
        
        
        
        
        
        
        
        
          </Box>

          <Box sx={{ flexGrow: 2, display: { xs: 'none', md:style.md} }}>
                    <MenuC  menus={menu}></MenuC>  
          </Box>

          <Box sx={{ display: { xs: style.box_xs, md: style.box_md } }}>
            {/* <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="primary"
              onClick={handleDocumentOpen}
            >
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton> */}
            <IconButton
              size="large"
              aria-label=""
              color="primary"
              onClick={handleListNotificationOpen}
            >
              <Badge badgeContent= {notif}  color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="Mostrar Calendario"
              color="primary"
              onClick={handleCalendarOpen}
            >
              <Badge badgeContent={calen} color="error">
                <CalendarMonthIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              // onClick={handleProfileMenuOpen}
              color="primary"
            ></IconButton>
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
              // onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleSettings}>
                  <Typography textAlign="center" sx={{ color: colores.gris }}>
                    {setting}
                  </Typography>
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
