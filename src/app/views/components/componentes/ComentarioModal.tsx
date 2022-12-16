import { useEffect, useState } from "react";
import {
    Box,
    Grid,
} from "@mui/material";
import { AlertS } from "../../../helpers/AlertS";
import ModalForm from "./ModalForm";
import Swal from "sweetalert2";

const ComentarioModal = ({
    accion,
    tipo,
    handleClose,
    handleAccion,
    vrows,
}: {
    accion: number;
    tipo: string;
    handleClose: Function;
    handleAccion: Function;
    vrows: any;
}) => {


    const [mensaje, setMensaje] = useState<string>();

    const validacion = (v: string) => {
        if (mensaje === "" || mensaje === null) {
            AlertS.fire({
                title: "Error!",
                text: "Favor de llenar el campo Comentarios*",
                icon: "error",
            });
        } else {
            Swal.fire({
                icon: v === "DAMOP_REGRESADO" ? "error" : "success",
                title: "Enviar",
                text: v === "DAMOP_REGRESADO" ? "Desea Regresar La Solicitud" : "Desea Autorizar La Cuenta",
                showDenyButton: false,
                showCancelButton: true,
                confirmButtonText: "Aceptar",
                cancelButtonText: "Cancelar",
            }).then((result) => {
                if (result.isConfirmed) {
                    handleAccion({ data: vrows, texto: mensaje, tipo: accion }, v)
                }
                if (result.isDenied) {
                }
            });



        }

    }
    useEffect(() => {

        //console.log(vrows);


    }, []);


    return (
        <div>
            <ModalForm title={tipo} handleClose={handleClose}>
                <Grid container spacing={1}
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
                </Grid>

                <Grid container spacing={3} sx={{ width: "100%", justifyContent: "center", alignItems: "center", direction: "row", }}>

                    <Grid item xs={6} sm={6} md={4} lg={3} sx={{ display: "flex", alignItems: "center", justifyContent: "center", }}>
                        <Box >
                            <button className="guardar" onClick={() => validacion("autorizar")}>Autorizar Solicitud</button>
                        </Box>
                    </Grid>
                    <Grid item xs={6} sm={6} md={4} lg={3} sx={{ display: "flex", alignItems: "center", justifyContent: "center", }}>
                        <Box>
                            <button className="regresar" onClick={() => validacion("cancelar")}> Cancelar Solicitud</button>
                        </Box>
                    </Grid>
                </Grid>
            </ModalForm>
        </div >
    );
};
export default ComentarioModal;
