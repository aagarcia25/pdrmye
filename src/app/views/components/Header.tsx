import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { grey, red } from "@mui/material/colors";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Input from "@mui/material/Input";
import { Box } from "@mui/system";
import { OutlinedInput } from "@mui/material";

const lightColor = "rgba(255, 255, 255, 0.7)";

interface HeaderProps {
  onDrawerToggle: () => void;
}

export default function Header(props: HeaderProps) {
  const { onDrawerToggle } = props;

  return (
    <React.Fragment>
      <AppBar
        style={{ color: grey[500], backgroundColor: grey[100] }}
        position="sticky"
        elevation={0}
      >
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid sx={{ display: { sm: "none", xs: "block" } }} item>
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
              <TextField
                size="small"
                id="outlined-basic"
                placeholder="Ejemplo: Certificado de Autentificación"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              >
              </TextField>
            </Grid>
            <Grid item>
              <Typography color="#B08C55">Notario Titular</Typography>
              <Typography color="grey">Raymundo Salazar</Typography>
            </Grid>
            <Grid item>
              <IconButton  sx={{backgroundColor:"#B08C55", p: 0.5 }}>
                <PersonIcon sx={{ color: "#ebebeb" }} fontSize="large" />
              </IconButton>
            </Grid>
            <Grid item>
              <Tooltip title="Correo! • No hay correo">
                <Badge
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  badgeContent={4}
                  color="primary"
                >
                  <IconButton sx={{ backgroundColor: "#B08C55" }}>
                    <LocalGroceryStoreIcon sx={{ color: "#ebebeb" }} />
                  </IconButton>
                </Badge>
              </Tooltip>
            </Grid>
            <Grid item>
              <Badge
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                badgeContent={4}
                color="primary"
              >
                <IconButton sx={{ backgroundColor: "#B08C55" }}>
                  <DriveFileRenameOutlineIcon sx={{ color: "#ebebeb" }} />
                </IconButton>
              </Badge>
            </Grid>
            <Grid item>
              <Badge
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                badgeContent={4}
                color="primary"
              >
                <IconButton sx={{ backgroundColor:"#B08C55" }}>
                  <NotificationsNoneIcon sx={{ color: "#ebebeb" }} />
                </IconButton>
              </Badge>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
