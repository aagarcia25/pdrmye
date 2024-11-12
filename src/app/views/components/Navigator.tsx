import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { Collapse, Grid, Tooltip, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer, { DrawerProps } from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/img/logo.svg";
import { menus } from "../../interfaces/user/UserInfo";
import { getMenus } from "../../services/localStorage";

export default function Navigator(props: DrawerProps, logoFijo: any) {
  const { ...other } = props;
  const openNavigator=props.open;
  
  const navigate = useNavigate();
  const list: menus[] = JSON.parse(String(getMenus()));
  const actualPath = localStorage.getItem("actualPath");
  const [open, setOpen] = useState(-1);

  const handleClick = (index: number) => {
    // Cambia solo si el menú seleccionado es diferente al actual
    setOpen((prevOpen) => (prevOpen === index ? -1 : index));
  };

  const reedireccion = (path: string) => {
    navigate(path);
    localStorage.setItem("actualPath", path);
  };

  useEffect(()=>{
    const openIndex = list.findIndex(
      (item) =>
        item.Path === actualPath || item.item?.some((subitem) => subitem.Path === actualPath)
    );
    if (openIndex !== -1) setOpen(openIndex);
  },[openNavigator])
  return (
    <>
      <Drawer variant="permanent" {...other} {...logoFijo}>
        <Grid
          container
          position="sticky"
          alignContent="center"
          sx={{ bgcolor: "rgb(255, 255, 255)", width: "100%",  justifyContent: 'center' }}
        >
           <Grid item xs={10.5}sx={{ width: "auto" }}>
          <img
            src={Logo}
            style={{ width: "100%" }}
            onClick={() => reedireccion("/")}
          />
        </Grid>
        <Grid
          item
          sx={{ width: "auto", textAlign: "center", paddingLeft: "3%" }}
        >
          <Typography variant="h6" sx={{ fontWeight: "550px" }}>
           
            DISTRIBUCIÓN DE RECURSOS
          </Typography>
          </Grid>
          
        </Grid>
        <Divider sx={{ m: '1vh' }} />
        <Box sx={{ overflow: "auto", scrollbarWidth: "thin", "&::-webkit-scrollbar": { width: "0.4em" }, "&::-webkit-scrollbar-track": { background: "#f1f1f1" }, "&::-webkit-scrollbar-thumb": { backgroundColor: "#888" }, "&::-webkit-scrollbar-thumb:hover": { background: "#555" } }}>
          <List>
            {list.map((item, index) => (
              <div key={index}>
                <ListItemButton
                  sx={{
                    bgcolor: open === index ? "rgba(195, 165, 117)" : "rgba(255, 255, 255, 0.291)",
                  }}
                  onClick={() => handleClick(index)}
                >
                  <ListItemText
                    primary={
                      <Tooltip title={item.Descripcion}>
                        <Typography variant="caption" sx={{ fontFamily: "sans-serif", fontWeight: "800" }} gutterBottom>
                          {item.Menu}
                        </Typography>
                      </Tooltip>
                    }
                  />
                  {open === index ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                </ListItemButton>

                {item?.item?.map((subitem, subindex) => (
                  <Collapse
                    key={subindex}
                    in={open === index}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      <Divider />
                      <ListItemButton
                        onClick={() => reedireccion(subitem.Path)}
                        sx={{
                          pl: 4,
                          bgcolor: subitem.Path === actualPath ? "rgba(225, 203, 163)" : null,
                        }}
                      >
                        <ListItemText
                          primary={
                            <Tooltip title={subitem.Descripcion}>
                              <Typography
                                variant="h5"
                                className="menu-Typography"
                                gutterBottom
                                sx={{ color: subitem.Path === actualPath ? "black" : null }}
                              >
                                {subitem.Menu}
                              </Typography>
                            </Tooltip>
                          }
                        />
                      </ListItemButton>
                      <Divider />
                    </List>
                  </Collapse>
                ))}
              </div>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
