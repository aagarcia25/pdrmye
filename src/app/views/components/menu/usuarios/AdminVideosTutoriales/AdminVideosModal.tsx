import { useEffect, useState } from "react";
import {
    TextField,
    InputAdornment,
    DialogActions,
    Button,
    Grid,
    Box,
} from "@mui/material";

import { AlertS } from "../../../../../helpers/AlertS";
import { Toast } from "../../../../../helpers/Toast";
import { AuthService } from "../../../../../services/AuthService";
import { getUser } from "../../../../../services/localStorage";
import { RESPONSE } from "../../../../../interfaces/user/UserInfo";
import ModalForm from "../../../componentes/ModalForm";
import SelectFrag from "../../../Fragmentos/SelectFrag";
import SelectValues from "../../../../../interfaces/Select/SelectValues";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import ModalCargarVideos from "../../catalogos/Utilerias/ModalCargarVideos";

const AdminVideosModal = ({
    openRoles,
    modo,
    handleClose,
    tipo,
    dt
}: {
    openRoles: boolean;
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
    const [menus, setMenus] = useState<SelectValues[]>([]);
    const [idMenu, setIdMenu] = useState("");
    const [openCarga, setOpenCarga] = useState(false);

    const handleSend = () => {
        setOpenCarga(true);

    };

    const loadFilter = (operacion: number) => {
        let data = { NUMOPERACION: operacion };
        CatalogosServices.SelectIndex(data).then((res) => {
            if (operacion === 16) {
                setMenus(res.RESPONSE);
            }
        });
    };

    const handleCloseCarga = () => {
        setOpenCarga(false);

    };

    const handleFilterChange2 = (v: string) => {
        setIdMenu(v);
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
                    title: "¡Error!",
                    text: res.STRMESSAGE,
                    icon: "error",
                });
            }
        });
    };
    useEffect(() => {
        loadFilter(16);



        if (dt === '') {


        } else {
            setNombre(dt?.row?.Nombre)
            setDescripcion(dt?.row?.Descripcion)
            setId(dt?.row?.id)


            if (modo === "Agregar Rol") {

                setNombre('');
                setDescripcion('');
            }

        }

    }, [dt]);

    return (
        <ModalForm title={modo} handleClose={handleClose}>
            <Box sx={{ boxShadow: 3 }} >

                <Grid container
                    sx={{
                        height: "30vh",
                        justifyContent: "center"
                    }}
                >
                    {(modo === "Editar Rol") ?
                        <Grid sm={12}
                            sx={{ display: 'flex', justifyContent: 'center', paddingTop: "1%" }}>
                            <label className="contenido">  Sólo se puede editar la Descripción * </label>
                        </Grid> : ""
                    }

                    <Grid item sm={7}>
                        <SelectFrag
                            value={idMenu}
                            options={menus}
                            onInputChange={handleFilterChange2}
                            placeholder={"Seleccione Menú"}
                            label={""}
                            disabled={modo !== "Agregar"}
                        />
                    </Grid>

                    <ModalCargarVideos openCarga={openCarga} idMenu={idMenu} handleClose={handleCloseCarga} />
                </Grid>


                <DialogActions sx={{ padding: "2%" }}>
                    <Button className="guardar"
                    disabled={idMenu===""||idMenu==="false"}
                    onClick={() => handleSend()}>Seleccionar Video</Button>
                    {/* <button className="cerrar" onClick={() => handleClose("cerrar")}>Cerrar</button> */}
                </DialogActions>

            </Box>
        </ModalForm>

    );
};

export default AdminVideosModal;
