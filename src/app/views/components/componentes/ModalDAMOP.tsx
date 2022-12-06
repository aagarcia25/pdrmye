import React, { useEffect, useState } from "react";
import { Button, Grid } from "@mui/material";
import ModalForm from "./ModalForm";
import Slider from "../Slider";
import { CatalogosServices } from "../../../services/catalogosServices";
import SelectValues from "../../../interfaces/Select/SelectValues";
import SelectFrag from "../Fragmentos/SelectFrag";

const ModalDAMOP = ({
  tipo,
  handleClose,
  handleAccion,
}: {
  tipo: string;
  handleClose: Function;
  handleAccion: Function;
}) => {
  
  const [mensaje, setMensaje] = useState<string>();


  useEffect(() => {
 
  }, []);


  return (
    <div>
      <ModalForm title={tipo} handleClose={handleClose}>
    
        
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
                  onClick={() => handleAccion({mensaje:mensaje})}
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

export default ModalDAMOP;
