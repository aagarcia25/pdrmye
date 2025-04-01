import { Button, Grid } from "@mui/material";
import ReactQuill from "react-quill";
import ModalForm from "./ModalForm";
import { useState } from "react";
import axios from "axios";
import { base64ToArrayBuffer } from "../../../helpers/Files";
import { USUARIORESPONSE } from "../../../interfaces/user/UserInfo";
import { getUser } from "../../../services/localStorage";

export const ModalCorreoEditable = (
    {handleClose,handleAccion}:
    {handleClose:Function, handleAccion:Function}
) => {
    const user: USUARIORESPONSE = JSON.parse(String(getUser()));
    console.log(user);
    // Estado local del correo
    const [cuerpoCorreo, setCuerpoCorreo] = useState<string>();

    // Funcion que me optine la fecha y mes actuales
    const getFechaActual = () => {
        const fecha = new Date();
        let mes = fecha.getMonth() + 1;
        mes === 1 ? mes = 12 : mes = mes - 1;
        return {
            anio: fecha.getFullYear(),
            mes: mes
        }
    }
    
    // Funcio que me mandara la informacion nesesaria al endpiont 
    // para el envio del correo 
    const envioCorreo = async () => {
        try{
            const { anio, mes } = getFechaActual();
            let obj = {
                anio: anio, 
                mes: mes,
                cuerpo: cuerpoCorreo,
                idUser: user.Id,
                USER_NAME: user.Nombre + ' ' + user.ApellidoPaterno + ' ' + user.ApellidoMaterno
            }

            const response = await axios.post(process.env.REACT_APP_APPLICATION_BASE_URL + 'envioCorreoFederacion', obj);

           console.log(process.env.REACT_APP_APPLICATION_BASE_URL+"envioCorreoFederacion");


           console.log('Correo enviado:', response.data);
           // Guardamos la fecha cunado se manda el correo
           localStorage.setItem("fechaCorreoFederacion", new Date().toISOString());
           
           handleClose();
           window.location.reload();

        }catch(error){
            console.error("Error en el envio del correo", error);
        }
    }

    // Descargar el Archivo de la Federacion correspondiente al mes
    const descargarExcel = async () => {
        try{
            console.log("Descargar Excel");
            const { anio, mes } = getFechaActual();
          await axios.post(
                process.env.REACT_APP_APPLICATION_BASE_URL + 'DescargarArchivoFederacion', 
                {
                    anio: anio,
                    mes: mes,
                    export: true
                }
            )
            .then( response => {
                const reporte = response.data.RESPONSE;
                console.log("Descargar Excel ...");

                const bufferArray = base64ToArrayBuffer(String(reporte.response64 || reporte));
                
                const blobStore = new Blob([bufferArray], {
                    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                  });

                  // Crea un enlace para descargar el archivo
                const link = document.createElement("a");
                link.href = window.URL.createObjectURL(blobStore);
                link.download = "ARCHIVO_FEDERACION.xlsx"; // El nombre del archivo con la extensión
                link.click();
           
            })
            .catch(error => {
                console.error("Error al descargar el excel", error);
            });
           
        }catch(error){
            console.error("Error al descargar el excel", error);
        }
    }

    return (
        <>
            <ModalForm title="Envio de Correo a la Federación" handleClose={() => {handleClose() }}>
                <Grid container spacing={1} direction="row" >
        
                    <Button
                        className="actualizar"
                        onClick={ descargarExcel }
                    >
                        Descargar Excel
                    </Button>
                    
                </Grid>
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
                onClick={ envioCorreo }
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
        // <div style={{ textAlign: "center", marginTop: "20px" }}


        // </div>
    );
};