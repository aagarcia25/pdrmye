import { useEffect, useState } from "react";
import {
    TextField,
    InputAdornment,
    DialogActions,
    Button,
    Grid,
    Box,
    Typography,
    BottomNavigation,
    BottomNavigationAction,
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
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import VpnKeyIcon from '@mui/icons-material/VpnKey';



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
    const [value, setValue] = useState('');

    function enCambioFile(event: any) {
        setslideropen(true)
        console.log(event.target.files[0]);
        if (event?.target?.files[0] && event.target.files[0].type.split("/")[0] === "video") {
            setNombreArchivo(event?.target?.value?.split("\\")[2]);
            let file = event?.target!?.files[0]!;
            setVideoPreview(URL.createObjectURL(event.target.files[0]));
            setNewVideo(file);
            setslideropen(false);
        }

       else if (event?.target?.files[0] && event.target.files[0].type === "application/pdf") {
            setNombreArchivo(event?.target?.value?.split("\\")[2]);
            let file = event?.target!?.files[0]!;
            setVideoPreview(URL.createObjectURL(event.target.files[0]));
            setNewVideo(file);
            setslideropen(false);
        }
        else  {
            Swal.fire("¡No es un archivo valido!", "", "warning");
            setslideropen(false)
        }
        setslideropen(false);

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

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
        setNombreArchivo("");
        setVideoPreview("");
    };

    const agregar = (data: any) => {
        AuthService.rolesindex(data).then((res) => {
            if (res.SUCCESS) {
                Toast.fire({
                    icon: "success",
                    title: "¡Registro Agregado!",
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

                <Grid item xs={12} sm={5} >
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
                <Grid item xs={12} sm={3} container
                    direction="row"
                    justifyContent="space-around"
                    alignItems="center" paddingTop={3}  >

                    <Button
                        hidden
                        disabled={modo === "Editar Nombre Video" || !value}
                        component="label"
                        className="cancelar"
                    >
                        Seleccionar {value}
                        <input
                            hidden
                            // id="imagencargada"
                            accept={value === "video" ? "video/*" : "application/pdf"}
                            onChange={(v) => { enCambioFile(v) }}
                            type="file" />
                    </Button>

                    <Button
                        disabled={!idMenu || idMenu === "false" || !nombreArchivo}
                        className="guardar"
                        onClick={() => SaveVideo()} >Guardar
                    </Button>

                </Grid>
                <Grid container item sm={4} direction="row" justifyContent="flex-end" alignItems="center" paddingTop="2%" paddingBottom={1} >
                    <BottomNavigation showLabels sx={{ width: 500, borderRadius: "10px", }} value={value} onChange={handleChange}>
                        <BottomNavigationAction
                            label="Video Tutorial"
                            value="video"
                            icon={<AccountBoxIcon />}
                        />
                        <BottomNavigationAction
                            label="Guia Rapida"
                            value="guia"
                            icon={<VpnKeyIcon />}
                        />
                        <BottomNavigationAction
                            label="Preguntas Frecuentes"
                            value="preguntas"
                            icon={<VpnKeyIcon />}
                        />
                    </BottomNavigation>
                </Grid>


            </Grid>
            {value === "video" || value === "guia" ?
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
                : ""}
            {value === "video" || value === "guia" ?
                <div>

                    <div className='containerModalCargarVideos'>

                        <div className='containerPreVisualizarVideo'>
                            <Grid container
                                direction="column"
                                justifyContent="center"
                                alignItems="center" >

                                <Grid className='contenedorDeReproductorVideo' item xs={12}>
                                    {value === "video" ?
                                        <video
                                            loop
                                            autoPlay
                                            width={"100%"}
                                            height={"100%"}
                                            hidden={modo === "Editar Nombre Video" || videoPreview?.length === 0}
                                            src={videoPreview}
                                            id="videoPlayer"
                                            controls
                                        /> :
                                        <object
                                            className="responsive-iframe"
                                            data={videoPreview}
                                            type="text/html">
                                        </object>
                                    }
                                </Grid>


                            </Grid>
                        </div>
                    </div>

                </div>

                : ""
            }



        </ModalForm>

    );
};

export default AdminVideosModal;
