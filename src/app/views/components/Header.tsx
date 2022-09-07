import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { COLOR } from "../../styles/colors";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { CatalogosServices } from "../../services/catalogosServices";

interface HeaderProps {
  onDrawerToggle: () => void;
  name: string;
  id:any;
}

export default function Header(props: HeaderProps) {
 
  const navigate = useNavigate();
  
  const [cnotif, setCnotif] = React.useState(0); 



  
  const { onDrawerToggle } = props;
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };


  

 const onNotification = () =>{
  navigate("/Notification");
 }

  const onOpenCalendar = () => {
    navigate("/Calendar");
  };


  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  function pathLogin(path: string) {
    return path;
  }


  let data = {
    NUMOPERACION:5,
    CHUSER:1
  };

  React.useEffect(() => {
    CatalogosServices.Notificaciones(data).then((res) => {
     let result = res.RESPONSE;
     setCnotif(result[0].count);
    });
  }, []);




















  return (
    <React.Fragment>
      <AppBar
        style={{ color: COLOR.blanco, backgroundColor: COLOR.blanco }}
        position="sticky"
        elevation={0}
      >
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid sx={{ display: { sm: "none", xs: "block",backgroundColor: COLOR.doradoNL } }} item>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={onDrawerToggle}
                edge="start"
              >
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item xs />
           
           
           
            <Grid item>
              <Tooltip title="Bandeja de correo">
                <Badge
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  badgeContent={cnotif}
                  color="primary"
                >
                  <IconButton
                    color="inherit"
                    sx={{
                      p: 0.5,
                      backgroundColor: COLOR.doradoNL,
                      "&:hover": {
                        backgroundColor: COLOR.grisTarjetaBienvenido,
                      },
                    }}
                  >
                    <NotificationsNoneIcon
                      fontSize="large"
                      sx={{ color: COLOR.blanco }}
                      onClick={onNotification}
                    />
                  </IconButton>
                </Badge>
              </Tooltip>
            </Grid>




            <Grid item>
              <IconButton
                color="inherit"
                sx={{
                  p: 0.5,
                  backgroundColor: COLOR.doradoNL,
                  "&:hover": { backgroundColor: COLOR.grisTarjetaBienvenido },
                }}
                
              >
                <CalendarMonthIcon
                  fontSize="large"
                  sx={{ color: COLOR.blanco }}
                  onClick={onOpenCalendar}
                />
              </IconButton>
            </Grid>
           
           
           
            <Grid item>
              <Typography></Typography>
            </Grid>
          
          
          
            <Grid item>
              <IconButton
                ref={anchorRef}
                id="composition-button"
                aria-controls={open ? "composition-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                color="inherit"
                sx={{
                  p: 1.0,
                  backgroundColor: COLOR.doradoNL,
                  "&:hover": { backgroundColor: COLOR.grisTarjetaBienvenido },
                }}
              >
                <PersonIcon fontSize="large" sx={{ color: COLOR.blanco }} />
              </IconButton>

              <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-start"
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === "bottom-start"
                          ? "left top"
                          : "left bottom",
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList
                          autoFocusItem={open}
                          id="composition-menu"
                          aria-labelledby="composition-button"
                          onKeyDown={handleListKeyDown}
                        >
                          <MenuItem
                            onClick={() =>
                              console.log("Clicked ManageAccounts")
                            }
                          >
                            <ManageAccountsIcon sx={{ color: COLOR.negro }} />
                            Configuración de perfil
                          </MenuItem>
                          <MenuItem
                            onClick={() => console.log("Clicked logout")}
                          >
                            <LogoutIcon sx={{ color: COLOR.negro }} />
                            Cerrar sesión
                          </MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </Grid>
          
          
            <Grid item>
              <Typography color="black">{props.name}</Typography>
            </Grid>
         
         
         
          </Grid>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}