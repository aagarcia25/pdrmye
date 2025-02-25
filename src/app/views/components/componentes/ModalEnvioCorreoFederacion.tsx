import { Button, Grid } from "@mui/material";
import ReactQuill from "react-quill";
import ModalForm from "./ModalForm";
import { useState } from "react";

export const ModalCorreoEditable = (
    {handleClose,handleAccion}:
    {handleClose:Function, handleAccion:Function}
) => {
    const [cuerpoCorreo, setCuerpoCorreo] = useState<string>();
    return (
        <>
            <ModalForm title="Envio de Correo a Federación" handleClose={() => {handleClose() }}>
                <Grid item xs={12}>
                    <h3>Cuerpo del Correo:</h3>
                </Grid>
                <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid item xl={6} xs={12} lg={6} md={8} sm={6}>
                        <ReactQuill
                            value={cuerpoCorreo}
                            onChange={setCuerpoCorreo}
                            placeholder="Escribe el cuerpo del correo..."
                            style={{ height: "250px", marginBottom: "50px" }}
                        />
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
            <Grid container direction="row" justifyContent="center" alignItems="center">
              <Button
                className="actualizar"
                onClick={()=>
                    handleAccion({
                        anio: 2024,
                        mes: 1,
                        cuerpo: cuerpoCorreo
                    })
                }
                //disabled={visibleselect == 0 && !(cuerpoCorreo || mensaje)}
                /*
                onClick={() =>
                  handleAccion({
                    mensaje: showInputs ? mensaje : "Mensaje",
                    usuario: chuserDestin,
                    cuerpoCorreo: cuerpoCorreo ? cuerpoCorreo : 0,
                  })
                }
                  */
              >
                Enviar  
              </Button>
            </Grid>
          </Grid>
            </ModalForm>
        </>
        // <div style={{ textAlign: "center", marginTop: "20px" }}>


        // </div>
    );
};