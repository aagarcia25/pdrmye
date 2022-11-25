import React, { useState } from "react";
import { Button, Grid } from "@mui/material";
import ModalForm from "./ModalForm";
import Slider from "../Slider";

const ModalCalculos = ({
  tipo,
  handleClose,
  handleAccion,
}: {
  tipo: string;
  handleClose: Function;
  handleAccion: Function;
}) => {
  const [mensaje, setMensaje] = useState<string>();
  const [openSlider, setOpenSlider] = useState(false);
  return (
    <div>
      <ModalForm title={tipo} handleClose={handleClose}>
      <Slider open={openSlider}></Slider>

        <Grid
          container
          spacing={1}
          sx={{
            mt: "2vh",
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Grid item xs={12}>
            <h3> Comentarios:</h3>
          </Grid>
          <Grid item xs={12}>
            <textarea
              required
              spellCheck="true"
              rows={5}
              onChange={(v) => setMensaje(v.target.value)}
              style={{ width: "100%" }}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
                <Button
                  className="actualizar"
                  onClick={() => handleAccion(mensaje)}
                >
                  Guardar
                </Button>
            </Grid>
          </Grid>
        </Grid>
      </ModalForm>
    </div>
  );
};

export default ModalCalculos;
