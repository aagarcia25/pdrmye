import { Box, Button, Container, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { AlertS } from "../../../../../helpers/AlertS";
import { Toast } from "../../../../../helpers/Toast";
import { USUARIORESPONSE } from "../../../../../interfaces/user/UserInfo";
import { getUser } from "../../../../../services/localStorage";
import { ParametroServices } from "../../../../../services/ParametroServices";
import ModalForm from "../../../componentes/ModalForm";
import { userInfo } from "os";
import { CatalogosServices } from "../../../../../services/catalogosServices";


export const PresupuestoRecaudacionModal = (
    {
        handleClose
    }
        : 
    {  
        handleClose: Function;
    }
) =>{

    const user: USUARIORESPONSE = JSON.parse(String(getUser()));

    const [presupuesto, setPresupuesto] = useState<number>();

    const handleSend = () => {
        if(presupuesto == null){
            AlertS.fire({
                title: "¡Error!",
                text: "Favor de Completar los Campos",
                icon: "error",
            });
        }else{
            let fechaActual = new Date();
            let data = {
                //CHID: id, 
                CHUSER: user.Id,
                ANIO: fechaActual.getFullYear(),
                MES: fechaActual.getMonth()+1,
                PRESUPUESTO: presupuesto
            }
            // Hacer la peticion al servico 
            CatalogosServices.presupuestoporrecaudacion(data).then(
                (res) => {
                    if(res.SUCCESS){
                        Toast.fire({
                            icon: "success",
                            title: "¡Registro Agregado!",
                        });
                        handleClose();
                    }else{
                         console.error("Error al obtener datos:", res.STRMESSAGE);
                    }
                }
            );
        }
    }
        

  return (
    <div>
        <ModalForm 
            title="Presupuesto Por Recaudación" 
            handleClose={handleClose}
        >
            <Box>
                <Container maxWidth="md">
                    <TextField 
                        margin = "dense"
                        required
                        id = "presupuesto"
                        label = "Presupuesto"
                        value = {presupuesto}
                        type="number"
                        fullWidth
                        variant="standard"
                        onChange={(v) => setPresupuesto(Number(v.target.value))}
                        error={presupuesto == null ? true : false}
                    />
                </Container>
            </Box>
            
            <Grid
                container
                sx={{
                mt: "2vh",
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                }}
            >

                <Box>
                    <Button
                        className="guardar"
                        onClick={() => handleSend()}
                    >
                        Guardar
                    </Button>
                </Box>
          </Grid>
            
            
        </ModalForm>
    </div>
  );
};