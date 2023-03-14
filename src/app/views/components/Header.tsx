import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
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
import { env_var } from "../../environments/env";
import { Button, Hidden } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import { AlertS } from "../../helpers/AlertS";
interface HeaderProps {
  onDrawerToggle: () => void;
  name: string;
  id: any;
}

export default function Header(props: HeaderProps) {
  const btnPerson = "120%";
  const btnAll = "130%";

  const user: RESPONSE = JSON.parse(String(getUser()));
  const navigate = useNavigate();
  const [cnotif, setCnotif] = React.useState(0);
  const [rutaFoto, setRutaFoto] = React.useState("");

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
    ventana.location.replace(env_var.BASE_URL_LOGIN);

  };

  const onOpenCalendar = () => {
    navigate("/Calendario");
  };

  const onOpenHelp = () => {
    //navigate("/");
    AlertS.fire({
      title: "Sección de ayuda actualmente en Desarrollo",
      icon: "info",
    });
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

  let data = {
    NUMOPERACION: 5,
    CHUSER: user?.id? user?.id :"",
  };

  React.useEffect(() => {
    setRutaFoto(String(user?.RutaFoto))
    // setPuesto(user?.Puesto? user.Puesto.toLowerCase(): " ")
    CatalogosServices.Notificaciones(data).then((res) => {
      let result = res.RESPONSE;
      setCnotif(result[0].count);
    });
  });

  return (
    <React.Fragment>
      <AppBar
        style={{ color: COLOR.blanco, backgroundColor: COLOR.blanco, paddingBottom: "1%", margin: "0" }}
        position="sticky"
        elevation={0}
        sx={{ width: "100%" }}
      >
        <Grid container xs={12} md={12} spacing={2} alignItems="center" justifyContent="space-between" sx={{ padding: "0", margin: "0" }} >
          <Grid item container xs={12} sm={1} justifyContent="center" alignItems="center" alignContent="center"  >
            <Tooltip title="Menú">
              <Button sx={{ width: "100%", height: "100%", }} className="menu" color="inherit" variant="outlined" onClick={() => onDrawerToggle()}>
                <IconButton className="menu" color="inherit" onClick={() => onDrawerToggle()}
                  sx={{ width: "100%", height: "100%", }}>
                  <MenuIcon />
                </IconButton>
              </Button>
            </Tooltip>
          </Grid>
          <Hidden smDown>
            <Grid item container direction="row" justifyContent="flex-end" alignItems="center" xs={5} sm={6} md={8} xl={9} >

              <Grid xs={12} container direction="row" justifyContent="flex-end" alignItems="center">
                <Typography variant="subtitle1" color="black">
                  {props.name}
                </Typography>
              </Grid>

              <Grid xs={12} container direction="row" justifyContent="flex-end" alignItems="center">
                <Typography  textTransform={"capitalize"}  color="black" >
                {user?.Puesto? user.Puesto.toLowerCase(): ""}
                 
                </Typography>
              </Grid>
              <Grid xs={12} container direction="row" justifyContent="flex-end" alignItems="center">
                <Typography  color="black">
                  {(user?.PERFILES[0]?.Referencia === "MUN" ? "Enlace: " : " ") +
                    (user?.ROLES[0]?.Nombre === "Municipio" ? user.ROLES[0].Nombre + " " : " ") +
                    ((user?.DEPARTAMENTOS[0]?.NombreCorto !== "MUN")? user?.DEPARTAMENTOS[0]?.NombreCorto !== "ORG"? user?.DEPARTAMENTOS[0]?.Descripcion + " " : " ":"") +
                    (user?.MUNICIPIO[0]?.Nombre ? " " + user?.MUNICIPIO[0]?.Nombre + " " : " ")
                    +((user?.MUNICIPIO[0]?.Nombre || user?.DEPARTAMENTOS[0]?.NombreCorto !== "MUN" )? "": "* Sin Municipio asignado *")
                    +(user?.ORG[0]?.Descripcion ? " " + user?.ORG[0]?.Descripcion + " " : " ")
                    +((user?.ORG[0]?.Descripcion || user?.DEPARTAMENTOS[0]?.NombreCorto !== "ORG" )? "": "* Sin Organismo asignado *")
                    }
                </Typography>
              </Grid>

            </Grid>
          </Hidden>
          <Grid item xs={5} sm={4} md={2.9} lg={2.4} xl={1.9} >
            <Grid container item xs={12} direction="row" justifyContent="space-evenly" alignItems="center"  >
              <Hidden smDown>
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
                      width: "2.9rem",
                      height: "2.9rem",
                      fontSize: btnPerson,
                      p: 0.1,
                      border: 2,
                      borderColor: COLOR.azul,
                      backgroundColor: user?.RutaFoto ? COLOR.blanco : COLOR.azul,
                      "&:hover": { backgroundColor: COLOR.grisTarjetaBienvenido },
                      
                    }}
                  >
                    {rutaFoto ? (
                      <img
                        style={{
                          objectFit: "scale-down",
                          width: "100%",
                          height: "100%",
                          borderRadius: '50%',
                        }}
                        src={rutaFoto}
                      />
                    ) : (
                      <PersonIcon sx={{
                        width: "100%", height: "100%",
                        "&:hover": { color: COLOR.negro }
                      }} />
                    )}
                  </IconButton>


                </Tooltip>
                <Popper
                  open={open}
                  role={undefined}
                  placement="bottom-start"
                  anchorEl={anchorRef.current}
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
                              <ManageAccountsIcon sx={{ color: COLOR.azul }} />
                              Configuración de perfil
                            </MenuItem>
                            <MenuItem onClick={onLogOut}>
                              <LogoutIcon sx={{ color: COLOR.azul }} />
                              Cerrar sesión
                            </MenuItem>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </Hidden>
              <Hidden smDown>
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
                        backgroundColor: COLOR.azul,
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
                            color: COLOR.azul,
                          },
                        }}
                      />
                    </IconButton>
                  </Badge>
                </Tooltip>
              </Hidden>
              <Hidden smDown>
                <Tooltip title="Calendario">
                  <IconButton
                    color="inherit"
                    sx={{
                      mt: 0.1,
                      backgroundColor: COLOR.azul,
                      "&:hover": { backgroundColor: COLOR.grisTarjetaBienvenido },
                    }}
                    onClick={onOpenCalendar}
                  >
                    <CalendarMonthIcon
                      sx={{
                        fontSize: btnAll,
                        color: COLOR.blanco,
                        "&:hover": {
                          color: COLOR.azul,
                        },
                      }}
                    />
                  </IconButton>
                </Tooltip>
              </Hidden>
              <Hidden smDown>
                <Tooltip title="Guía Rapida">
                  <IconButton
                    color="inherit"
                    sx={{
                      mt: 0.1,
                      backgroundColor: COLOR.azul,
                      "&:hover": { backgroundColor: COLOR.grisTarjetaBienvenido },
                    }}
                    onClick={onOpenHelp}
                  >
                    <HelpIcon
                      sx={{
                        fontSize: btnAll,
                        color: COLOR.blanco,
                        "&:hover": {
                          color: COLOR.azul,
                        },
                      }}
                    />
                  </IconButton>
                </Tooltip>
              </Hidden>
            </Grid>
          </Grid>
        </Grid>
      </AppBar>
    </React.Fragment>
  );
}
