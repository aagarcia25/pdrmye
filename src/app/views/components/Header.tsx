import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { grey, red } from "@mui/material/colors";

const lightColor = "rgba(255, 255, 255, 0.7)";

interface HeaderProps {
  onDrawerToggle: () => void;
}

export default function Header(props: HeaderProps) {
  const { onDrawerToggle } = props;

  return (
    <React.Fragment>
      <AppBar
        style={{ color: "#FFFFFF", backgroundColor: "#FFFFFF" }}
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
              <Tooltip title="Correo! • No hay correo">
                <Badge
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  badgeContent={4}
                  color="primary"
                >
                  <IconButton color="inherit" sx={{ p: 0.5, backgroundColor:"#B08C55" }}>
                <NotificationsNoneIcon fontSize="large" sx={{ color: "#FFFFFF" }}/>
              </IconButton>
                </Badge>
              </Tooltip>
            </Grid>
            <Grid item>
              <IconButton color="inherit" sx={{ p: 0.5, backgroundColor:"#B08C55" }}>
                <CalendarMonthIcon fontSize="large" sx={{ color: "#FFFFFF" }}/>
              </IconButton>
            </Grid>
            <Grid item>
              <Typography></Typography>
            </Grid>
            <Grid item>
              <IconButton color="inherit" sx={{ p:1.0, backgroundColor:"#B08C55", paddingleft: '100px' }}>
                <PersonIcon fontSize="large" sx={{ color: "#FFFFFF" }}/>
              </IconButton>
            </Grid>
            <Grid item>
              <Typography color="black">Cesar Rivera</Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
