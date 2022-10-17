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
import { getUser } from "../../services/localStorage";
import { RESPONSE } from "../../interfaces/user/UserInfo";

interface HeaderProps {
  onDrawerToggle: () => void;
  name: string;
  id: any;
}

export default function Header(props: HeaderProps) {
  const btnPerson = "2.5vw";
  const btnAll = "3.0vw";

  const user: RESPONSE = JSON.parse(String(getUser()));
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

  const onNotification = () => {
    navigate("/Notification");
  };

  const onLogOut = () => {
    localStorage.clear();
    var ventana = window.self;
    ventana.opener = window.self;
    ventana.close();
    // window.location.replace("http://10.200.4.106/");
  };

  const onOpenCalendar = () => {
    navigate("/Calendario");
  };

  const onConfigProfile = () => {
    navigate("/perfil");
    setOpen((prevOpen) => !prevOpen);
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
    NUMOPERACION: 5,
    CHUSER: user.id,
  };

  console.log("user foto", user.RutaFoto);
  console.log("personIcon", PersonIcon);

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
            <Grid
              sx={{
                display: {
                  sm: "none",
                  xs: "block",
                  backgroundColor: COLOR.negro,
                },
              }}
              item
            >
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
              <Typography variant="h6" color="black">
                {props.name}
              </Typography>
            </Grid>

            <Grid item>
              <Tooltip title="Haz click para ver más">
                <IconButton
                  ref={anchorRef}
                  id="composition-button"
                  aria-controls={open ? "composition-menu" : undefined}
                  aria-expanded={open ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={handleToggle}
                  color="inherit"
                  sx={{
                    width: "3.8vw",
                    height: "7vh",
                    fontSize: btnPerson,
                    p: 0.1,
                    border: 4,
                    borderColor: COLOR.negro,
                    backgroundColor: COLOR.negro,
                    "&:hover": { backgroundColor: COLOR.grisTarjetaBienvenido },
                  }}
                >
                  {/* <PersonIcon sx={{ fontSize: btnPerson, color: COLOR.blanco,
                "&:hover":{
                  color:COLOR.negro,
                } }} /> */}
                  {user.RutaFoto ? (
                    <img
                      style={{ width: "3vw", height: "7vh" }}
                      src={user.RutaFoto}
                    />
                  ) : (
                    <PersonIcon sx={{ width: "3vw", height: "7vh",
                    "&:hover":{color:COLOR.negro}}} />
                  )}
                </IconButton>
              </Tooltip>
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
                          <MenuItem onClick={onConfigProfile}>
                            <ManageAccountsIcon sx={{ color: COLOR.negro }} />
                            Configuración de perfil
                          </MenuItem>
                          <MenuItem onClick={onLogOut}>
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
                      mt: 0.1,
                      backgroundColor: COLOR.negro,
                      "&:hover": {
                        backgroundColor: COLOR.grisTarjetaBienvenido,
                      },
                    }}
                    onClick={onNotification}
                  >
                    <NotificationsNoneIcon
                      sx={{
                        color: COLOR.blanco,
                        fontSize: btnAll,
                        "&:hover": {
                          color: COLOR.negro,
                        },
                      }}
                    />
                  </IconButton>
                </Badge>
              </Tooltip>
            </Grid>

            <Grid item>
              <Tooltip title="Calendario">
                <IconButton
                  color="inherit"
                  sx={{
                    mt: 0.1,
                    backgroundColor: COLOR.negro,
                    "&:hover": { backgroundColor: COLOR.grisTarjetaBienvenido },
                  }}
                  onClick={onOpenCalendar}
                >
                  <CalendarMonthIcon
                    sx={{
                      fontSize: btnAll,
                      color: COLOR.blanco,
                      "&:hover": {
                        color: COLOR.negro,
                      },
                    }}
                  />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
