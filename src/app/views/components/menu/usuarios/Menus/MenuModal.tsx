import { Modal, Typography, Button, TextField, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import MUIXDataGridSimple from "../../../MUIXDataGridSimple";
import Slider from "../../../Slider";

const MenuModal = ({
  id,
  open,
  modo,
  handleClose,
}: {
  id: string;
  open: boolean;
  modo: string;
  handleClose: Function;
}) => {
  const [openSlider, setOpenSlider] = useState(false);

  const [menu, setMenu] = useState("");
  const [descripcion, setDescripcion] = useState("");

  return (
    <div>
      <Slider open={openSlider}></Slider>
      <Box>
        <Modal open={open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "30vw",
              height: "50vh",
              bgcolor: "background.paper",
              boxShadow: 50,
              p: 2,
              borderRadius: 3,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{
                  textAlign: "center",
                  fontFamily: "MontserratBold",
                  fontSize: "1vw",
                  color: "#808080",
                }}
              >
                {modo}
              </Typography>
            </Box>

            <Box
              sx={{
                mt: "2vh",
                width: "100%",
                height: "10vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <TextField
                    required
                    id="menu"
                    label="Menú"
                    value={menu}
                    type="text"
                    variant="standard"
                    onChange={(v) => setMenu(v.target.value)}
                    error={menu == "" ? true : false}
                  />
                </Grid>

                <Grid item xs={12} md={12}>
                  <TextField
                    required
                    id="descripcion"
                    label="Descripcion"
                    value={descripcion}
                    type="text"
                    variant="standard"
                    onChange={(v) => setDescripcion(v.target.value)}
                    error={descripcion == "" ? true : false}
                  />
                </Grid>
              </Grid>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "right",
                justifyContent: "right",
                mt: "2vh",
                // mr: "5vw",
                // ml: "5vw",
              }}
            >
              <Button
                sx={{ color: "#000", fontFamily: "MontserratMedium" }}
                onClick={() => handleClose()}
              >
                Guardar
              </Button>
              <Button
                sx={{ color: "#000", fontFamily: "MontserratMedium" }}
                onClick={() => handleClose()}
              >
                Salir
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </div>
  );
};

export default MenuModal;
