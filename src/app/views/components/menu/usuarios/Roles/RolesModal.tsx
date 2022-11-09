import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    Box,
    TextField,
    InputAdornment,
    DialogActions,
} from "@mui/material";

import { Alert } from "../../../../../helpers/Alert";
import { Toast } from "../../../../../helpers/Toast";
import { AuthService } from "../../../../../services/AuthService";
import {  getUser } from "../../../../../services/localStorage";
import { RESPONSE } from "../../../../../interfaces/user/UserInfo";




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
                Alert.fire({
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
                Alert.fire({
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
        console.log(user.id);

    };
    const agregar = (data: any) => {
        AuthService.rolesindex(data).then((res) => {
            if (res.SUCCESS) {
                Toast.fire({
                    icon: "success",
                    title: "Registro Agregado!",
                });

            } else {
                Alert.fire({
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
        <Dialog open={open} fullScreen>
            <DialogContent>
                <Box>
                    <Box
                        sx={{ display: 'flex', justifyContent: 'center', }}>
                        <label className="Titulo">{modo}</label>
                    </Box>
                    {(modo == "Editar Rol") ?
                        <Box
                            sx={{ display: 'flex', justifyContent: 'center', }}>
                            <label className="contenido">Solo se puede editar la descripcion *</label>
                        </Box> : ""
                    }

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
                </Box>
            </DialogContent>

            <DialogActions>
                <button className="guardar" onClick={() => handleSend()}>Guardar</button>
                <button className="cerrar" onClick={() => handleClose("cerrar")}>Cerrar</button>
            </DialogActions>
        </Dialog>
    );
};

export default RolesModal;
