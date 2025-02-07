import { Dialog, Grid } from "@mui/material";
import ReactQuill from "react-quill";
import ModalForm from "./ModalForm";

export const ModalCorreoEditable = (
    {handleClose,}:
    {handleClose:Function}
) => {
    return (
        <>
            <ModalForm title="Envio de Correo a Federación" handleClose={() => {handleClose() }}>
                <Grid item xs={12}>
                    <h3>Cuerpo del Correo:</h3>
                </Grid>
                <Grid item xl={6} xs={12} lg={6} md={8} sm={6}>
                    <ReactQuill
                        //value={cuerpoCorreo}
                        //onChange={setCuerpoCorreo}
                        placeholder="Escribe el cuerpo del correo..."
                        style={{ height: "250px", marginBottom: "50px" }}
                    />
                </Grid>
            </ModalForm>
        </>
        // <div style={{ textAlign: "center", marginTop: "20px" }}>


        // </div>
    );
};