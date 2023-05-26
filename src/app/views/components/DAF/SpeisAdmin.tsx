import DeleteIcon from '@mui/icons-material/Delete';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Box, Button, DialogActions, DialogContent, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import IconSPEIPDFDown from '../../../assets/img/PDFDown.svg';
import IconSPEIPDF from '../../../assets/img/PDF_icon.svg';
import IconeXML from '../../../assets/img/xmlLogo.svg';
import { AlertS } from '../../../helpers/AlertS';
import { base64ToArrayBuffer } from '../../../helpers/Files';
import { Toast } from '../../../helpers/Toast';
import { PERMISO, RESPONSE, SPEIS } from '../../../interfaces/user/UserInfo';
import { DAFServices } from '../../../services/DAFServices';
import { MunServices } from '../../../services/MunServices';
import { getPermisos, getToken, getUser } from '../../../services/localStorage';
import MUIXDataGridMun from '../MUIXDataGridMun';
import SliderProgress from '../SliderProgress';
import ModalForm from '../componentes/ModalForm';
import { currencyFormatter } from '../menu/CustomToolbar';
import ButtonsAdd from '../menu/catalogos/Utilerias/ButtonsAdd';




const SpeisAdmin = ({
    handleClose,
    handleAccion,
    vrows,
    modo
}: {
    handleClose: Function;
    handleAccion: Function;
    vrows: any;
    modo: string
}) => {

    const [documentPDF, setDocumentPDF] = useState<string>();
    const [filePDF, setFilePDF] = useState<File>();

    // const [documentType, setDocumentType] = useState<string>();
    // const [documentPDF, setDocumentPDF] = useState<string>();
    const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
    const [agregar, setAgregar] = useState<boolean>(false);
    const [agregarCFDI, setAgregarCFDI] = useState<boolean>(false);

    const [PERMISOVerSpei, setPERMISOVerSpei] = useState<boolean>(false);
    const [PERMISOAgregCfdi, setPERMISOAgregCfdi] = useState<boolean>(false);

    const [permisoDescargarSpei, setPermisoDescargarSpei] = useState<boolean>(false);

    const [editar, setEditar] = useState<boolean>(false);
    const [eliminar, setEliminar] = useState<boolean>(false);
    const [addSpei, setAddSpei] = useState<boolean>(false);
    const [verSpei, setVerSpei] = useState<boolean>(false);
    const [slideropen, setslideropen] = useState(false);
    const [TipoDeArchivoPDF, setTipoDeArchivoPDF] = useState(false);

    const [URLruta, setURLRuta] = useState<string>("");

    const [ruta, setRuta] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [anchoAcciones, setAnchoAcciones] = useState<number>(0);

    const [nameSpei, setNameSpei] = useState<string>("");
    const [speiFile, setSpeiFile] = useState(Object);
    const [speis, setSpeis] = useState([]);
    const [fileValid, setFileValid] = useState<boolean>(false);
    const [mensajeError, setMensajeError] = useState<string>("Solo Archivos PDF");





    const user: RESPONSE = JSON.parse(String(getUser()));


    const columns: GridColDef[] = [
        { field: "id", hide: true, hideable: false },
        {
            field: "acciones", disableExport: true,
            headerName: "Acciones",
            description: "Campo de Acciones",
            sortable: false,
            width: 100 + anchoAcciones,
            renderCell: (v) => {
                return (
                    <Box>
                        {PERMISOVerSpei && v.row.Nombre.slice(-3).toUpperCase() === "PDF" ?
                            <Tooltip
                                title={"Ver Documento"}>
                                <IconButton onClick={() => handleVerSpei(v)}>
                                    <img className="iconButton"
                                        src={
                                            v.row.Nombre.slice(-3).toUpperCase() === "PDF" ?
                                                IconSPEIPDF : IconeXML} />
                                </IconButton>
                            </Tooltip>
                            : ""}
                        {/* {user.DEPARTAMENTOS[0].NombreCorto === "DAF" ? */}

                        {permisoDescargarSpei
                            // && v.row.Nombre.slice(-3).toUpperCase() === "PDF"
                            ?
                            <Tooltip title={"Descargar Archivo"}>
                                <IconButton onClick={() => handleDescargarSpei(v)}>
                                    <img className="iconButton" src={
                                        v.row.Nombre.slice(-3).toUpperCase() === "PDF" ?
                                            IconSPEIPDFDown
                                            :
                                            IconeXML
                                    } />
                                </IconButton>
                            </Tooltip>

                            : ""}

                        {eliminar ?
                            <Tooltip title={"Eliminar Archivo"}>
                                <IconButton onClick={() => handleDeleteSpei(v)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                            : ""}


                    </Box>
                );
            },
        },
        { field: "FechaCreacion", headerName: "Fecha Creación", description: "Fecha Creación", width: 180 },
        { field: "Nombre", headerName: "Nombre Documento", description: "Nombre Documento", width: 650 },


    ];

    const handleBorrarMasivo = (v: string) => {
    };

    const handleCloseModal = () => {
        setAddSpei(false);
        setVerSpei(false);
        setNameSpei("");
        setSpeiFile(undefined);
        setFileValid(false);
    };


    function base64toPDF(data: string, tipo: string, name: string, descargar: boolean) {
        if (data === "undefined") {
            setslideropen(false);
            AlertS.fire({
                text: "Archivo no encontrado ",
                icon: "info",
            });

        } else {

            var bufferArray = base64ToArrayBuffer(data);
            var blobStore = new Blob([bufferArray], { type: tipo });
            var data = window.URL.createObjectURL(blobStore);
            var link = document.createElement('a');
            document.body.appendChild(link);
            link.href = data;

            if (!descargar) {
                setURLRuta(link.href);
                setVerSpei(true);
                setslideropen(false);
            }
            if (descargar) {
                link.download = name;
                link.click();
                window.URL.revokeObjectURL(data);
                link.remove();
                setslideropen(false);
            }
        }

    }



    const handleNewComprobante = (event: any) => {
        // setslideropen(true);
        let file = event.target!.files[0]!;
        if ((event.target.files.length !== 0 &&
            (event.target!.files[0]!.name.slice(-3).toUpperCase() === "PDF"
                || event.target!.files[0]!.name.slice(-4).toUpperCase() === "XML"
            ))
            // && (event.target!.files[0]!.name === (vrows.row.a3 + ".pdf") || modo === "CFDI" )
        ) {


            if (Number(event.target!.files[0]!.size) / 1024 <= 520) {

                if (modo === "CFDI") {
                    setNameSpei(event.target!.files[0]!.name);
                    setSpeiFile(file);
                    setFileValid(true);
                    setslideropen(false);

                }

                if (speis.length !== 0) {
                    speis.map((item: SPEIS) => {
                        // if ((item.Nombre) === event?.target?.files[0]?.name && modo === "SPEI") {

                        //     Swal.fire({
                        //         icon: "warning",
                        //         title: "Atención",
                        //         text: "No se Puede Repetir Archivos con el mismo numero de Solicitud de pago",
                        //         showDenyButton: false,
                        //         showCancelButton: false,
                        //         confirmButtonText: "Aceptar",
                        //         cancelButtonText: "Cancelar",
                        //     }).then((result) => {
                        //         if (result.isConfirmed) {
                        //             setNameSpei("");
                        //             setSpeiFile(null);
                        //             setFileValid(false);
                        //             setslideropen(false);

                        //         }
                        //         if (result.isDenied) {
                        //         }
                        //     });
                        // } else {

                        setNameSpei(event.target!.files[0]!.name);
                        setSpeiFile(file);
                        setFileValid(true);
                        setslideropen(false);

                        // }

                    });

                }
                else if (speis.length === 0) {

                    setNameSpei(event.target!.files[0]!.name);
                    setSpeiFile(file);
                    setFileValid(true);
                    setslideropen(false);

                }

            } else {

                Swal.fire({
                    icon: "info",
                    title: "Atención",
                    text: "Tamaño de archivo Excedido -Limitado a 500 KB-",
                    showDenyButton: false,
                    showCancelButton: false,
                    confirmButtonText: "Aceptar",
                    cancelButtonText: "Cancelar",
                }).then((result) => {
                    if (result.isConfirmed) {
                        setNameSpei("");
                        setSpeiFile(null);
                        setFileValid(false);
                        setslideropen(false);

                    }
                    if (result.isDenied) {
                    }
                });


            }

        } else {
            setNameSpei("");
            setSpeiFile(undefined);
            setFileValid(false);
            AlertS.fire({
                title: "Atención",
                text:
                    event.target!.files[0]!.name.slice(-3).toUpperCase() !== "PDF" && modo === "SPEI" ?
                        "Archivo invalido. Solo Extensiones PDF"
                        : "Nombre incorrecto",
                icon: "info",
            });
            setslideropen(false)

        }

    };

    const handleAgregarSpei = (v: string) => {
        setAddSpei(true);
    };

    const handleVerSpei = (v: any) => {
        setslideropen(true);
        // {
        if (v.row.Nombre.slice(-3).toUpperCase() === "PDF") {
            setTipoDeArchivoPDF(true)
        } else {
            setTipoDeArchivoPDF(false)
        }
        getfile(v.row.Nombre, v.row.Route, false)
        setslideropen(true);
        // }


    };

    const handleDescargarSpei = (v: any) => {
        setslideropen(true);
        setslideropen(false);
        getfile(v.row.Nombre, v.row.Route, true);


    };
    const handleDeleteSpei = (data: any) => {

        const formData = new FormData();
        formData.append("NUMOPERACION", "3");
        formData.append("TIPO", "SPEI");
        formData.append("CHID", data.id);
        formData.append("CHUSER", user.id);
        formData.append("REGISTROS", speis[1] ? "1" : "0");
        formData.append("TOKEN", JSON.parse(String(getToken())));


        Swal.fire({
            icon: "info",
            title: "¿Estás seguro de eliminar este registro?",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Confirmar",
            denyButtonText: `Cancelar`,
        }).then((result) => {
            if (result.isConfirmed) {
                setslideropen(true);
                DAFServices.SpeiAdministracion(formData).then((res) => {
                    //   setslideropen(false);
                    if (res.SUCCESS) {
                        Toast.fire({
                            icon: "success",
                            title: "Borrado Exitosa!",
                        });
                        setNameSpei("");
                        setSpeiFile(null)
                        consulta();
                        setslideropen(false);
                        handleCloseModal();
                    } else {
                        setslideropen(false);
                        AlertS.fire({
                            title: "¡Error!",
                            text: res.STRMESSAGE,
                            icon: "error",
                        });
                    }
                });

            } else if (result.isDenied) {
                Swal.fire("No se realizaron cambios", "", "info");
            }


        });

    };

    const handleUploadSpei = (numOp: string) => {
        setslideropen(true);
        const formData = new FormData();
        nameSpei !== "" ? formData.append("FILE", speiFile, nameSpei) : formData.append("FILE", "");
        formData.append("TIPO", modo);
        formData.append("NUMOPERACION", numOp);
        formData.append("IDPROV", vrows.id);
        formData.append("CHUSER", user.id);
        formData.append("TOKEN", JSON.parse(String(getToken())));

        DAFServices.SpeiAdministracion(formData).then((res) => {
            if (res.SUCCESS) {
                Toast.fire({
                    icon: "success",
                    title: "Carga Exitosa!",
                });
                setNameSpei("");
                setSpeiFile(null)
                consulta();
                handleCloseModal();
                setslideropen(false);
            } else {
                AlertS.fire({
                    title: "¡Error!",
                    text: res.STRMESSAGE,
                    icon: "error",
                });
                setslideropen(false);
            }
        });
    };

    const getfile = (nameFile: string, name: string, descargar: boolean) => {
        setslideropen(true);

        DAFServices.SpeiAdministracion(
            {
                NUMOPERACION: 5,
                NOMBRE: name,
                TIPO: modo,
                TOKEN: JSON.parse(String(getToken()))

            }
        ).then((res) => {
            if (res.SUCCESS) {
                Toast.fire({
                    icon: "success",
                    title: "¡Consulta Exitosa!",
                });
                base64toPDF(String(res.RESPONSE.RESPONSE.FILE), String(res.RESPONSE.RESPONSE.TIPO), nameFile, descargar)
                setslideropen(false);


            } else {
                AlertS.fire({
                    title: "¡Error!",
                    text: res.STRMESSAGE,
                    icon: "error",
                });
                setslideropen(false);
            }
        });
    };
    ///////////////////////////////////////////////

    const dataUrlToFile = async (dataUrl: string, fileName: string, mimeType: string): Promise<Blob> => {
        const binStr = (dataUrl);
        const len = binStr.length;
        const arr = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            arr[i] = binStr.charCodeAt(i);
        }
        return new Blob([arr], { type: mimeType });
    }


    //   asyncCall();

    //////////////////////////////////////////
    //return a promise that resolves with a File instance




    const consulta = () => {
        setslideropen(true);
        if (modo === "SPEI") {
            DAFServices.SpeiAdministracion(
                {
                    NUMOPERACION: 4,
                    P_IDPROV: vrows.id,
                    TOKEN: JSON.parse(String(getToken())),
                    TPROV: vrows.row.a17

                }
            ).then((res) => {
                if (res.SUCCESS) {

                    setSpeis(res.RESPONSE);
                    setslideropen(false);
                } else {
                    AlertS.fire({
                        title: "¡Error!",
                        text: res.STRMESSAGE,
                        icon: "error",
                    });
                    setslideropen(false);
                }
            });
        }

        if (modo === "CFDI") {
            MunServices.CfdiAdministracion({ NUMOPERACION: 4, P_IDPA: vrows.id }).then((res) => {
                if (res.SUCCESS) {

                    setSpeis(res.RESPONSE);
                    setslideropen(false);
                } else {
                    AlertS.fire({
                        title: "¡Error!",
                        text: res.STRMESSAGE,
                        icon: "error",
                    });
                    setslideropen(false);
                }
            });
        }




    };
    useEffect(() => {
        consulta();
        var ancho = 0;
        permisos.map((item: PERMISO) => {
            if (String(item.ControlInterno) === "DAFADMINPAG" || String(item.ControlInterno) === "PARTMUN") {


                if (String(item.Referencia) === "AGREGSPEI") {
                    setAgregar(true);
                }
                if (String(item.Referencia) === "ELIMSPEI") {
                    setEliminar(true);
                    ancho = ancho + 50;
                }
                if (String(item.Referencia) === "DESCARGARSPEI") {
                    setPermisoDescargarSpei(true);
                    ancho = ancho + 50;
                }
                if (String(item.Referencia) === "VERSPEI") {
                    setPERMISOVerSpei(true);
                    ancho = ancho + 50;
                }
                if (String(item.Referencia) === "AGREGCFDI") {
                    setAgregarCFDI(true);
                }
                if (String(item.Referencia) === "VERCFDI") {
                    setPERMISOVerSpei(true);
                    ancho = ancho + 50;
                }
                if (String(item.Referencia) === "DESCARGARCFDI") {
                    setPERMISOVerSpei(true);
                    ancho = ancho + 50;
                }
            }
            setAnchoAcciones(ancho)
        });
    }, []);
    return (
        <>

            <ModalForm title={'Administración de  ' + modo + '´S'} handleClose={handleClose}>
                <SliderProgress open={slideropen}></SliderProgress>
                <Grid container spacing={1} rowSpacing={3}>
                    <Grid item xs={12} md={6} lg={4}>
                        <Typography variant="h5" className='DatosSpeiCfdiTitulo'>
                            Fondo:
                        </Typography>
                        <Typography variant="h5" className='DatosSpeiCfdi'>
                            {vrows.row.a9}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <Typography variant="h5" className='DatosSpeiCfdiTitulo'>
                            Número Solicitud de Pago:
                        </Typography>
                        <Typography variant="h5" className='DatosSpeiCfdi'>
                            {vrows.row.a3}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4} >
                        <Typography variant="h5" className='DatosSpeiCfdiTitulo'>
                            Importe:
                        </Typography>
                        <Typography variant="h5" className='DatosSpeiCfdi'>
                            {currencyFormatter.format(vrows.row.a5)}
                        </Typography>
                    </Grid>
                </Grid>
                <Box>
                    <ButtonsAdd handleOpen={handleAgregarSpei} agregar={agregar || (modo === "CFDI" && agregarCFDI && (user.MUNICIPIO.length > 0 || user.ORG.length > 0))} />
                    <Grid item xs={12}>
                        <MUIXDataGridMun modulo={''} handleBorrar={handleBorrarMasivo} columns={columns} rows={speis} controlInterno={''} />
                    </Grid>
                </Box>
            </ModalForm>



            {addSpei ?
                <ModalForm title={"Agregar " + modo} handleClose={handleCloseModal}>
                    <DialogContent dividers={true}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <h3>Nombre de archivo: {" " + nameSpei ? nameSpei : ""}</h3>
                            </Grid>
                            <Grid item container justifyContent="center" xs={12}>
                                <Tooltip title="Click para cargar un archivo">
                                    <IconButton  >
                                        <input
                                            id="imagencargada"
                                            accept="pdf"
                                            onChange={(v) => { handleNewComprobante(v) }}
                                            type="file"
                                            style={{ zIndex: 2, opacity: 0, width: '100%', height: '80%', position: "absolute", cursor: "pointer", }} /
                                        >
                                        <UploadFileIcon sx={{ width: "100%", height: "100%", }} />
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12}>
                                <h3>
                                    {
                                        modo === "CFDI" ? "Solo Extensiones PDF, XLS Y XLSX"
                                            : "Solo Extensiones PDF"
                                    }
                                </h3>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button className="guardar" disabled={!fileValid} onClick={() => handleUploadSpei("1")}> Guardar </Button>
                    </DialogActions>
                </ModalForm>
                : ""}


            {verSpei ?
                <ModalForm title={'Visualización'} handleClose={handleCloseModal} >
                    <DialogContent dividers={true}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                {/* <h3>Nombre de archivo: {name}</h3> */}
                            </Grid>
                            <Grid item container justifyContent="center" xs={12}>
                                <div className='ContainerVisualizacionSPEI'>

                                    <iframe
                                        width="100%"
                                        height="100%"
                                        src={
                                            TipoDeArchivoPDF ?
                                                URLruta
                                                :
                                                "http://docs.google.com/viewer?url=" + URLruta + "&embedded=true"
                                        } />
                                </div>

                            </Grid>
                        </Grid>
                    </DialogContent>

                </ModalForm>
                :
                ""}


        </>

    )
}

export default SpeisAdmin
