import { useEffect, useState } from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Tooltip } from '@mui/material';
import { AlertS } from '../../../helpers/AlertS';
import ModalForm from '../componentes/ModalForm';
import MUIXDataGridMun from '../MUIXDataGridMun';
import { GridColDef } from '@mui/x-data-grid';
import ButtonsAdd from '../menu/catalogos/Utilerias/ButtonsAdd';
import CloseIcon from '@mui/icons-material/Close';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { DAFServices } from '../../../services/DAFServices';
import { Toast } from '../../../helpers/Toast';
import { PERMISO, RESPONSE } from '../../../interfaces/user/UserInfo';
import { getPermisos, getToken, getUser } from '../../../services/localStorage';
import ArticleIcon from '@mui/icons-material/Article';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import Slider from '../Slider';

const SpeisAdmin = ({
    handleClose,
    handleAccion,
    vrows,
}: {
    handleClose: Function;
    handleAccion: Function;
    vrows: any;
}) => {

    const [documentPDF, setDocumentPDF] = useState<string>();
    // const [documentType, setDocumentType] = useState<string>();
    // const [documentPDF, setDocumentPDF] = useState<string>();
    const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
    const [agregar, setAgregar] = useState<boolean>(false);
    const [editar, setEditar] = useState<boolean>(false);
    const [eliminar, setEliminar] = useState<boolean>(false);
    const [addSpei, setAddSpei] = useState<boolean>(false);
    const [verSpei, setVerSpei] = useState<boolean>(false);
    const [slideropen, setslideropen] = useState(false);
    const [ruta, setRuta] = useState<string>("");
    const [name, setName] = useState<string>("");

    const [nameSpei, setNameSpei] = useState<string>("");
    const [speiFile, setSpeiFile] = useState(Object);
    const [speis, setSpeis] = useState([]);
    const [fileValid, setFileValid] = useState<boolean>(false);
    const [mensajeError, setMensajeError] = useState<string>("Solo Archivos PDG");




    const user: RESPONSE = JSON.parse(String(getUser()));


    const columns: GridColDef[] = [
        { field: "id", headerName: "Identificador", hide: true, width: 150, },
        {
            field: "acciones", disableExport: true,
            headerName: "Acciones",
            description: "Campo de Acciones",
            sortable: false,
            width: 100,
            renderCell: (v) => {
                return (
                    <Box>
                        <Tooltip title="Ver Spei">
                            <IconButton onClick={() => handleVerSpei(v)}>
                                <ArticleIcon />
                            </IconButton>
                        </Tooltip>
                        {/* {user.DEPARTAMENTOS[0].NombreCorto === "DAF" ? */}
                        {eliminar?
                        <Tooltip title="Eliminar Archivo">
                            <IconButton onClick={() => handleDeleteSpei(v)}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                        :""}
                        
                        {/* : ""} */}

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

    function base64toPDF(data:string , name:string) {
        var bufferArray = base64ToArrayBuffer(data);
        var blobStore = new Blob([bufferArray], { type: "application/pdf" });
       
        var data = window.URL.createObjectURL(blobStore);
        var link = document.createElement('a');
        document.body.appendChild(link);
        link.href = data;
        link.download = name+".pdf";
        link.click();
        window.URL.revokeObjectURL(data);
        link.remove();
        console.log(link.remove())
        setVerSpei(true);

    }
    
    function base64ToArrayBuffer(data:string) {
        var bString = window.atob(data);
        var bLength = bString.length;
        var bytes = new Uint8Array(bLength);
        for (var i = 0; i < bLength; i++) {
            var ascii = bString.charCodeAt(i);
            bytes[i] = ascii;
        }
        return bytes;
    };

    const handleNewSpei = (event: any) => {
        let file = event.target!.files[0]!;
        if (event.target.files.length !== 0 && event.target!.files[0]!.name.slice(-3).toUpperCase() === "PDF") {

            if (Number(event.target!.files[0]!.size) / 1024 <= 512) {
                setNameSpei(event.target!.files[0]!.name);
                setSpeiFile(file);
                setFileValid(true);
            } else {

                Swal.fire({
                    icon: "info",
                    title: "Atencion",
                    text: "Tamaño de archivo Exedido -Limitado a 500 Kb-",
                    showDenyButton: false,
                    showCancelButton: false,
                    confirmButtonText: "Aceptar",
                    cancelButtonText: "Cancelar",
                }).then((result) => {
                    if (result.isConfirmed) {
                        setNameSpei("");
                        setSpeiFile(undefined);
                        setFileValid(false);
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
                title: "Atencion",
                text: "Archivo invalido",
                icon: "info",
            });

        }

    };

    const handleAgregarSpei = (v: string) => {

        setAddSpei(true);
    };

    const handleVerSpei = (v: any) => {
        getfile(v.row.Route)

    };
    const handleDeleteSpei = (data: any) => {

        const formData = new FormData();
        formData.append("NUMOPERACION", "3");
        formData.append("CHID", data.id);
        formData.append("CHUSER", user.id);
        formData.append("REGISTROS", speis[1] ? "1" : "0");
        formData.append("TOKEN", JSON.parse(String(getToken())));


        Swal.fire({
            icon: "info",
            title: "Estas seguro de eliminar este registro?",
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
                            title: "Error!",
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
        nameSpei !== "" ? formData.append("SPEI", speiFile, nameSpei) : formData.append("SPEI", "");
        formData.append("NUMOPERACION", numOp);
        formData.append("IDPA", vrows.id);
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
                    title: "Error!",
                    text: res.STRMESSAGE,
                    icon: "error",
                });
                setslideropen(false);
            }
        });
    };

    const getfile = (name: string) => {
        DAFServices.SpeiAdministracion(
            {
                NUMOPERACION: 5,
                NOMBRE: name,
                TOKEN: JSON.parse(String(getToken()))

            }
        ).then((res) => {
            if (res.SUCCESS) {
                Toast.fire({
                    icon: "success",
                    title: "Consulta Exitosa!",
                });
                console.log(res.RESPONSE.RESPONSE)
                
                setDocumentPDF(String(res.RESPONSE.RESPONSE.FILE))
                base64toPDF(String(res.RESPONSE.RESPONSE.FILE),String(res.RESPONSE.RESPONSE.NOMBRE) )
                
            } else {
                AlertS.fire({
                    title: "Error!",
                    text: res.STRMESSAGE,
                    icon: "error",
                });
            }
        });
    };

    function resolveAfter2Seconds() {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve('resolved');
          }, 2000);
        });
      }
      
      async function asyncCall() {
        console.log('calling');
        const result = await resolveAfter2Seconds();
        console.log(result);
        // Expected output: "resolved"
      }
      
    //   asyncCall();

   async function uploadImage(b64img: string) {
        var file = await urltoFile(b64img,'name.png','name.png');

      }
      
      //return a promise that resolves with a File instance
      function  urltoFile(url:string, filename:string, mimeType:string){
          return (fetch(url)
              .then(function(res){return res.arrayBuffer();})
              .then(function(buf){return new File([buf], filename,{type:mimeType});})
          );
      }
      
    

    const consulta = () => {
        DAFServices.SpeiAdministracion(
            {
                NUMOPERACION: 4,
                P_IDPA: vrows.id,
                TOKEN: JSON.parse(String(getToken()))

            }
        ).then((res) => {
            if (res.SUCCESS) {
                Toast.fire({
                    icon: "success",
                    title: "Consulta Exitosa!",
                });
                setSpeis(res.RESPONSE);
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
        permisos.map((item: PERMISO) => {
            if (String(item.ControlInterno) === "DAFADMINPAG") {
              if (String(item.Referencia) === "AGREGSPEI") {
                setAgregar(true);
              }
              if (String(item.Referencia) === "ELIMSPEI") {
                setEliminar(true);
              }
             
      
            }
          });
        consulta();
    }, []);
    return (
        <>
            <Slider open={slideropen}></Slider>
            <ModalForm title={'Administración de  los Spei'} handleClose={handleClose}>
                <Box>
                    {/* agregar={user.DEPARTAMENTOS[0].NombreCorto==="DAF"} */}
                    <ButtonsAdd handleOpen={handleAgregarSpei} agregar={agregar} />
                    <Grid item xs={12}>
                        <MUIXDataGridMun modulo={''} handleBorrar={handleBorrarMasivo} columns={columns} rows={speis} controlInterno={''} />
                    </Grid>
                </Box>
            </ModalForm>



            {addSpei ?
                <Dialog open={true}>
                    <Grid container item justifyContent="space-between" xs={12}>
                        <DialogTitle>Agregar Spei</DialogTitle>
                        <Tooltip title="Cerrar">
                            <IconButton onClick={() => handleCloseModal()}  >
                                <CloseIcon />
                            </IconButton>
                        </Tooltip>
                    </Grid>
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
                                            onChange={(v) => { handleNewSpei(v) }}
                                            type="file"
                                            style={{ zIndex: 2, opacity: 0, width: '100%', height: '80%', position: "absolute", cursor: "pointer", }} /
                                        >
                                        <UploadFileIcon sx={{ width: "100%", height: "100%", }} />
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12}>
                                <h3>Solo se Permiten Archivos PDF</h3>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button className="guardar" disabled={!fileValid} onClick={() => handleUploadSpei("1")}> Guardar </Button>
                    </DialogActions>
                </Dialog>
                : ""}


            {verSpei ?
                <ModalForm title={'Visualización'} handleClose={handleCloseModal} >

                    <DialogContent dividers={true}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                {/* <h3>Nombre de archivo: {name}</h3> */}
                            </Grid>
                            <Grid item container justifyContent="center" xs={12}>
                                <object
                                    width="100%"
                                    height="700"
                                    data={`data:application/pdf;base64,${documentPDF}`} />
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
