import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    Box,
    TextField,
    InputAdornment,
    DialogActions,
    Button,
    Grid,
} from "@mui/material";

import { AlertS } from "../../../../../helpers/AlertS";
import { Toast } from "../../../../../helpers/Toast";
import { AuthService } from "../../../../../services/AuthService";
import { getUser } from "../../../../../services/localStorage";
import { RESPONSE } from "../../../../../interfaces/user/UserInfo";
import ModalForm from "../../../componentes/ModalForm";




const RolesModal = ({
    open,
    modo,
    handleClose,
    tipo,
    dt
}: {
    open: boolean;
    modo: string;
    tipo: number;
    handleClose: Function,
    dt: any
}) => {

    // CAMPOS DE LOS FORMULARIOS

    const user: RESPONSE = JSON.parse(String(getUser()));
    const [nombre, setNombre] = useState<string>();
    const [descripcion, setDescripcion] = useState<string>();
    const [id, setId] = useState<string>();

    const handleSend = () => {

        if (modo === "Agregar Rol") {

            if (nombre === null || descripcion === null || nombre === "" || descripcion === "") {
                AlertS.fire({
                    title: "Error!",
                    text: "Favor de Completar los Campos",
                    icon: "error",
                });
            } else {
                let data = {
                    NUMOPERACION: tipo,
                    CHUSER: user.id,
                    NOMBRE: nombre,
                    DESCRIPCION: descripcion,
                };

                handleRequest(data);
                handleClose("saved");
            }
        }
        if (modo == "Editar Rol") {

            if (nombre == null || descripcion == null || nombre == "" || descripcion == "") {
                AlertS.fire({
                    title: "Error!",
                    text: "Favor de Completar los Campos",
                    icon: "error",
                });
            } else {
                let data = {
                    NUMOPERACION: tipo,
                    CHID: id,
                    CHUSER: user.id,
                    NOMBRE: nombre,
                    DESCRIPCION: descripcion,
                };

                handleRequest(data);
                handleClose("saved");
            }

        }


    };

    const handleRequest = (data: any) => {
        agregar(data);
    };

    const handleTeste = () => {
        //console.log(user.id);

    };
    const agregar = (data: any) => {
        AuthService.rolesindex(data).then((res) => {
            if (res.SUCCESS) {
                Toast.fire({
                    icon: "success",
                    title: "Registro Agregado!",
                });

            } else {
                AlertS.fire({
                    title: "Error!",
                    text: res.STRMESSAGE,
                    icon: "error",
                });
            }
        });
    };
    useEffect(() => {




        if (dt === '') {


        } else {
            setNombre(dt?.row?.Nombre)
            setDescripcion(dt?.row?.Descripcion)
            setId(dt?.row?.id)


            if (modo == "Agregar Rol") {

                setNombre('');
                setDescripcion('');
            }

        }

    }, [dt]);



    return (
        <ModalForm title={modo} handleClose={handleClose}>
            <DialogContent>

                <Grid container
                    sx={{
                        height: "30vh",
                        justifyContent: "center"

                    }}

                >
                    {(modo == "Editar Rol") ?
                        <Grid sm={12}
                            sx={{ display: 'flex', justifyContent: 'center', }}>
                            <label className="contenido">Solo se puede editar la descripcion *</label>
                        </Grid> : ""
                    }

                    <Grid item sm={7}>
                        <TextField
                            required
                            margin="dense"
                            id="anio"
                            label="Nombre"
                            value={nombre}
                            disabled={modo == "Editar Rol"}
                            fullWidth
                            variant="standard"
                            onChange={(v) => setNombre(String(v.target.value))}
                            error={nombre == null ? true : false}
                            InputProps={{
                                readOnly: tipo == 1 ? false : true,

                            }}
                        />

                    </Grid>


                    <Grid item sm={7}>


                        <TextField
                            margin="dense"
                            required
                            id="fac"
                            label="Descripcion"
                            value={descripcion}
                            multiline
                            fullWidth
                            variant="standard"
                            onChange={(v) => setDescripcion(String(v.target.value))}
                            error={descripcion == null ? true : false}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start"></InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                </Grid>


            </DialogContent>

            <DialogActions>
                <Button className="guardar" onClick={() => handleSend()}>Guardar</Button>
                {/* <button className="cerrar" onClick={() => handleClose("cerrar")}>Cerrar</button> */}
            </DialogActions>

        </ModalForm>

    );
};

export default RolesModal;
