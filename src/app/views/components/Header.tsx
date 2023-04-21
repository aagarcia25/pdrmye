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
import { getPerfilFoto, getToken, getUser } from "../../services/localStorage";
import { RESPONSE, RESPONSESTORAGE } from "../../interfaces/user/UserInfo";
import { Backdrop, Button, Hidden, SpeedDialAction } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import { base64ToArrayBuffer } from "../../helpers/Files";
import { styled } from '@mui/material/styles';
import SpeedDial from '@mui/material/SpeedDial';
import HomeIcon from '@mui/icons-material/Home';
import { useState } from "react";
interface HeaderProps {
  onDrawerToggle: () => void;
  name: string;
  id: any;
  imgData: string;
  imgTipo: string;
}

export default function Header(props: HeaderProps) {
  const btnPerson = "120%";
  const btnAll = "130%";
  const [openSlider, setOpenSlider] = React.useState(false);
  const user: RESPONSE = JSON.parse(String(getUser()));
  const [responseStorage, setResponseStorage] = useState<RESPONSESTORAGE>(JSON.parse(String(getPerfilFoto())));
  const navigate = useNavigate();
  const [cnotif, setCnotif] = React.useState(0);
  const [rutaFoto, setRutaFoto] = React.useState("");

  
  const { onDrawerToggle } = props;
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const onOpenCalendar = () => {
    navigate("/Calendario");
  };
  const onOpenHelp = () => {
    let guia = window.location.hash.replace('#', '');
    guia = guia.replace(/[^a-zA-Z0-9 ]/g, '');

    let data = {
      NOMBRE: guia,
      TOKEN: JSON.parse(String(getToken())),
    };
    CatalogosServices.obtenerguias(data).then((res) => {
      var bufferArray = base64ToArrayBuffer(String(res.RESPONSE.RESPONSE.FILE));
      var blobStore = new Blob([bufferArray], { type: "application/pdf" });

      var data = window.URL.createObjectURL(blobStore);
      var link = document.createElement('a');
      document.body.appendChild(link);
      link.href = data;
      window.open(link.href, "_blank");
    });

  };


  const onNotification = () => {
    navigate("/Notification");
  };


  const [openDial, setOpenDial] = React.useState(false);
  const handleOpenDial = () => setOpenDial(true);
  const handleCloseDial = () => setOpenDial(false);
  const actions = [
    {
      icon: <> 
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
          {user.RutaFoto !== null ? (
              <img style={{ objectFit: "scale-down", width: "100%", height: "100%", borderRadius: '50%', }}
              src={"data:"+props.imgTipo+";base64," +props.imgData}
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
        </Popper> </>, name: 'Configuración'
    },
    {
      icon: <> <IconButton
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
      </IconButton>   </>, name: 'Calendario'
    },
    {
      icon: <>
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
      </>, name: 'Notificaciones'
    },
    {
      icon: <>   <Tooltip title="Guía Rapida">
        <IconButton
          color="inherit"
          sx={{

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
      </Tooltip>  </>, name: 'Guía'
    },

  ];



  const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
    position: 'fixed',
    '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
    },
    '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
    },
  }));


  ///////////////////////////////////




  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };



  const onLogOut = () => {
    localStorage.clear();
    var ventana = window.self;
    ventana.location.replace(String(process.env.REACT_APP_APPLICATION_BASE_URL_LOGIN));

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
    CHUSER: user?.id ? user?.id : "",
  };
  React.useEffect(() => {

      // setResponseStorage(JSON.parse(String(getPerfilFoto())))
  });

  React.useEffect(() => {

    // setResponseStorage(JSON.parse(String(getPerfilFoto())))
    setRutaFoto(String(user?.RutaFoto))
    
    CatalogosServices.Notificaciones(data).then((res) => {
      let result = res.RESPONSE;
      setCnotif(result[0].count);
      // setResponseStorage(JSON.parse(String(getPerfilFoto())))
    });
  });

  // export const OnChangeProfilePhoto = (v:any) => {
  //   setResponseStorage(JSON.parse(String(getPerfilFoto())))
  // };

  return (
    <React.Fragment>
      <AppBar
        style={{ color: COLOR.blanco, backgroundColor: COLOR.blanco, paddingBottom: "1%", margin: "0" }}
        position="sticky"
        elevation={0}
        sx={{ width: "95%" }}
      >
        <Grid container item xs={12} md={12} spacing={2} alignItems="center" justifyContent="space-between" sx={{ padding: "0", margin: "0" }} >


          <Grid  container item xs={6} sm={1} justifyContent="center" alignItems="center" alignContent="center" >
            <Tooltip title="Menú">
              <Button sx={{ width: "100%", height: "100%", }} className="menu" color="inherit" variant="outlined" onClick={() => onDrawerToggle()}>
                {/* <IconButton className="menu" color="inherit" onClick={() => onDrawerToggle()} */}
                  {/* sx={{ width: "100%", height: "100%", }}> */}
                  <MenuIcon />
                {/* </IconButton> */}
              </Button>
            </Tooltip>
          </Grid>

          <Grid container item   xs={6} sm={11} direction="row" justifyContent="flex-end" alignItems="center" >

            <Grid item container xs={6} sm={11}
              sx={{ bgcolor: "rgb(25,245,245)" }}

            >
              <Hidden smUp >
                <Backdrop open={openDial} />
                <Grid item xs={12}>



                  <StyledSpeedDial
                    ariaLabel="SpeedDial tooltip example"
                    sx={{  top: "1%", bottom: 1, right: "10%" }}
                    icon={
                      <IconButton className="menuHome" color="default"
                        sx={{ width: "100%", height: "100%", }}>
                        <HomeIcon />
                      </IconButton>}
                    onClose={handleCloseDial}
                    onOpen={handleOpenDial}
                    open={openDial}
                    direction={"down"}
                  >
                    {actions.map((action) => (
                      <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        tooltipOpen
                        onClick={handleClose}
                      />
                    ))}
                  </StyledSpeedDial>
                </Grid>
              </Hidden >
            </Grid>

            <Hidden smDown >

              <Grid container item  direction="row" justifyContent="flex-end" alignItems="center" xs={12} sm={5} md={8} xl={9} >

                <Grid 
                // sx={{bgcolor:"rgb(45,45,42)"}} 
                container direction="row" justifyContent="flex-end" alignItems="center">
                  <Typography variant="subtitle1" color="black">
                    {props.name}
                  </Typography>
                </Grid>

                <Grid container direction="row" justifyContent="flex-end" alignItems="center">
                  <Typography textTransform={"capitalize"} color="black" >
                    {user?.Puesto ? user.Puesto.toLowerCase() : ""}

                  </Typography>
                </Grid>
                <Grid container item xs={12} sm={12} direction="row" justifyContent="flex-end" alignItems="center">
                  <Typography color="black">
                    {(user?.PERFILES[0]?.Referencia === "MUN" ? "Enlace: " : " ") +
                      (user?.ROLES[0]?.Nombre === "Municipio" ? user.ROLES[0].Nombre + " " : " ") +
                      ((user?.DEPARTAMENTOS[0]?.NombreCorto !== "MUN") ? user?.DEPARTAMENTOS[0]?.NombreCorto !== "ORG" ? user?.DEPARTAMENTOS[0]?.Descripcion + " " : " " : "") +
                      (user?.MUNICIPIO[0]?.Nombre ? " " + user?.MUNICIPIO[0]?.Nombre + " " : " ")
                      + ((user?.MUNICIPIO[0]?.Nombre || user?.DEPARTAMENTOS[0]?.NombreCorto !== "MUN") ? "" : "* Sin Municipio asignado *")
                      + (user?.ORG[0]?.Descripcion ? " " + user?.ORG[0]?.Descripcion + " " : " ")
                      + ((user?.ORG[0]?.Descripcion || user?.DEPARTAMENTOS[0]?.NombreCorto !== "ORG") ? "" : "* Sin Organismo asignado *")
                    }
                  </Typography>
                </Grid>

              </Grid>
            </Hidden >
            <Grid item xs={12} sm={5} md={3.5} lg={2.4} xl={1.9} >
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
                      {rutaFoto !== null ? (
                        <>
                             <img
                          style={{
                            objectFit: "scale-down",
                            width: "100%",
                            height: "100%",
                            borderRadius: '50%',
                          }}
                          src={"data:"+props.imgTipo+";base64," +props.imgData}
                        />
                            {/* <ProfilePhoto/> */}
                        </>
                   
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
        </Grid>
      </AppBar>
    </React.Fragment>
  );
}

