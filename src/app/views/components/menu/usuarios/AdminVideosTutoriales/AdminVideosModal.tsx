import { useEffect, useState } from "react";
import {
    TextField,
    InputAdornment,
    DialogActions,
    Button,
    Grid,
    Box,
    Typography,
} from "@mui/material";

import { AlertS } from "../../../../../helpers/AlertS";
import { Toast } from "../../../../../helpers/Toast";
import { AuthService } from "../../../../../services/AuthService";
import { getToken, getUser } from "../../../../../services/localStorage";
import { RESPONSE } from "../../../../../interfaces/user/UserInfo";
import ModalForm from "../../../componentes/ModalForm";
import SelectFrag from "../../../Fragmentos/SelectFrag";
import SelectValues from "../../../../../interfaces/Select/SelectValues";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import SliderProgress from "../../../SliderProgress";
import Swal from "sweetalert2";
import { ValidaSesion } from "../../../../../services/UserServices";
import UploadIcon from '@mui/icons-material/Upload';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
const AdminVideosModal = ({
    IdMenu,
    modo,
    handleClose,
    tipo,
    dt
}: {
    IdMenu: string;
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
    const [idMenu, setIdMenu] = useState(IdMenu);
    const [openCarga, setOpenCarga] = useState(false);
    const [slideropen, setslideropen] = useState(false);
    const [newVideo, setNewVideo] = useState(Object);
    const [nombreArchivo, setNombreArchivo] = useState("");
    const [videoPreview, setVideoPreview] = useState("");

    function enCambioFile(event: any) {
        setslideropen(true)
        if (event?.target?.files[0] && event.target.files[0].type.split("/")[0] === "video") {
            setNombreArchivo(event?.target?.value?.split("\\")[2]);
            let file = event?.target!?.files[0]!;
            setVideoPreview(URL.createObjectURL(event.target.files[0]));
            setNewVideo(file);
            setslideropen(false);
        }
        else {

            Swal.fire("¡No es un video!", "", "warning");
        }

    }
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


    const SaveVideo = () => {
        ValidaSesion();
        setVideoPreview("");
        setslideropen(true)
        const formData = new FormData();

        formData.append("VIDEO", newVideo, nombreArchivo);
        formData.append("CHUSER", user.id);
        formData.append("CHID", idMenu);
        formData.append("NAME", nombreArchivo);
        formData.append("TOKEN", JSON.parse(String(getToken())));

        AuthService.SaveVideoTutorial(formData).then((res) => {
            if (res.SUCCESS || res.RESPONSE) {
                Toast.fire({
                    icon: "success",
                    title: "Video Cargado ",
                });
                handleClose();
                setslideropen(false);
                setNombreArchivo("");
                setNewVideo(null);
            }
            if (!res.SUCCESS) {
                Toast.fire({
                    icon: "error",
                    title: "Error Carga de Video",
                });
                handleClose();
                setslideropen(false);
            }
        });
        // handleClose();
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


        if (dt.length === 0) {


        } else {
            setNombreArchivo(dt?.row?.nombreOriginal)

            if (modo === "Carga Videos") {

            }

        }

    }, [dt]);

    return (
        <ModalForm title={modo} handleClose={handleClose}>
            <SliderProgress open={slideropen} />
            <Grid container
                direction="row"
                justifyContent="center"
                alignItems="center" >

                <Grid item xs={12} sm={8} >
                    <Typography variant="h6">Menú</Typography>
                    <SelectFrag
                        value={idMenu}
                        options={menus}
                        onInputChange={handleFilterChange2}
                        placeholder={"Seleccione Menú"}
                        label={"Seleccione Menú"}
                        disabled={modo !== "Agregar"}
                    />

                </Grid>
                <Grid container
                    direction="row"
                    justifyContent="space-around"
                    alignItems="center" item xs={12} sm={4} paddingTop={3}  >

                    <Button
                        hidden
                        disabled={modo === "Editar Nombre Video"}
                        component="label"
                        className="cancelar"
                    >
                        Seleccionar Video
                        <input
                            hidden
                            // id="imagencargada"
                            accept="video/*"
                            onChange={(v) => { enCambioFile(v) }}
                            type="file" />
                    </Button>

                    <Button
                        disabled={!idMenu || idMenu === "false" || !nombreArchivo}
                        className="guardar"
                        onClick={() => SaveVideo()} >Guardar
                    </Button>
                </Grid>

            </Grid>
            <Grid>
                <Grid>
                    <Typography variant='h6'>Nombre del archivo: </Typography>
                </Grid>
                <Grid>
                    <TextField

                        margin="dense"
                        id="nombreEvento"
                        value={nombreArchivo}
                        fullWidth
                        variant="outlined"
                        size='small'
                        onChange={(v) => setNombreArchivo(v.target.value)}
                        sx={{ paddingBottom: "10px" }}
                    />
                </Grid>
            </Grid>
            <div>

                <div className='containerModalCargarVideos'>

                    <div className='containerPreVisualizarVideo'>
                        <Grid container
                            direction="column"
                            justifyContent="center"
                            alignItems="center" >

                            <Grid className='contenedorDeReproductorVideo' item xs={12}>

                                <video
                                    loop
                                    autoPlay
                                    width={"100%"}
                                    height={"100%"}
                                    hidden={modo === "Editar Nombre Video" || videoPreview?.length === 0}
                                    src={videoPreview}
                                    id="videoPlayer"
                                    controls
                                />
                            </Grid>


                        </Grid>
                    </div>
                </div>

            </div>

        </ModalForm>

    );
};

export default AdminVideosModal;
