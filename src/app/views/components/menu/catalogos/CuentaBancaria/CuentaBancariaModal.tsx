import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  Box,
  TextField,
  DialogActions,
  IconButton,
  Typography,
  Grid,
  Button,
  InputAdornment,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import imagenGenerica from "../../../../../../app/assets/img/archivoImagen.jpg";
import PdfLogo from "../../../../../../app/assets/img/PDF_file_icon.svg";
import { getUser } from "../../../../../services/localStorage";
import { RESPONSE } from "../../../../../interfaces/user/UserInfo";
import { Alert } from "../../../../../helpers/Alert";
import { Toast } from "../../../../../helpers/Toast";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import SelectFrag from "../../../Fragmentos/SelectFrag";
import SelectValues from "../../../../../interfaces/Select/SelectValues";
import Swal from "sweetalert2";
import ModalForm from "../../../componentes/ModalForm";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
export const CuentaBancariaModal = ({
  open,
  handleClose,
  tipo,
  dt,
}: {
  open: boolean;
  tipo: number;
  handleClose: Function;
  dt: any;
}) => {


  // CAMPOS DE LOS FORMULARIOS
  const [slideropen, setslideropen] = useState(true);
  const [id, setId] = useState("");
  const [numeroCuenta, setNumeroCuenta] = useState("");
  const [nombreCuenta, setNombreCuenta] = useState("");
  const [clabeBancaria, setClabeBancaria] = useState("");
  const user: RESPONSE = JSON.parse(String(getUser()));
  const [idBancos, setIdBancos] = useState("");
  const [bancos, setBancos] = useState<SelectValues[]>([]);
  const [comentarios, setComentarios] = useState("");
  //TODO LO QUE COPIE Y PEGUE

  const [editDoc, setEditDoc] = useState<boolean>(false);
  const [editDocCarta, setEditDocCarta] = useState<boolean>(false);
  const [urlDoc, setUrlDoc] = useState("");
  const [urlDocCarta, setUrlDocCarta] = useState("");

  const [newDoc, setNewDoc] = useState(Object);
  const [nameNewDoc, setNameNewDoc] = useState<string>();
  const [DocSubido, setDocSubido] = useState<boolean>(false);
  const [sizeFile, setSizeFile] = useState<boolean>();

  const [newDocCarta, setNewDocCarta] = useState(Object);
  const [nameNewDocCarta, setNameNewDocCarta] = useState<string>();
  const [DocSubidoCarta, setDocSubidoCarta] = useState<boolean>(false);
  const [sizeFileCarta, setSizeFileCarta] = useState<boolean>();




  const [mensajeLabel, setMensajeLabel] = useState("Agrega un archivo PDF de tú carta de banco.");
  const [iconoPDF, setIconoPDF] = useState(imagenGenerica);


  const handleNewFile = (event: any) => {

    let file = event.target!.files[0]!;
    var sizeByte = Number(file.size);
    // setSizeFile(Number(sizeByte) / 1024 >= 3072 ? true : false)
    if (Number(sizeByte) / 1024 >= 3072) {
      Alert.fire({
        title: "Atencion",
        text: "Tamaño de archivo Exedido -Limitado a 3Mb-",
        icon: "info",
      });
    } else if ((event.target!.files[0]!.name.slice(-4) === ".pdf" || event.target!.files[0]!.name.slice(-4) === ".PDF")) {
      setNewDoc(file);
      setNameNewDoc(event.target!.files[0]!.name);
      //if(String(event.target!.files[0]!.name).slice)
      setDocSubido(true);

    } else {
      Alert.fire({
        title: "Atencion",
        text: "Agrega un archivo PDF",
        icon: "info",
      });

    }

  };

  const handleNewFileCarta = (event: any) => {

    let file2 = event.target!.files[0]!;
    var sizeByte = Number(file2.size);
    //setSizeFileCarta(Number(sizeByte) / 1024 >= 3072 ? true : false)
    if (Number(sizeByte) / 1024 >= 3072) {
      Alert.fire({
        title: "Atencion",
        text: "Tamaño de archivo Exedido -Limitado a 3Mb-",
        icon: "info",
      });
    } else {
      setNewDocCarta(file2);
      setNameNewDocCarta(event.target!.files[0]!.name);
      //if(String(event.target!.files[0]!.name).slice)
      setDocSubidoCarta(true);
    }
  };

  const handleFilterChange1 = (v: string) => {
    setIdBancos(v);
  };


  const bancosc = () => {
    let data = { NUMOPERACION: 11 };
    CatalogosServices.SelectIndex(data).then((res) => {
      setBancos(res.RESPONSE);
    });
  };

  const handleSend = () => {
    setslideropen(true);
    const formData = new FormData();

    newDoc ? formData.append("RUTADOCUMENTO", newDoc, nameNewDoc) : formData.append("RUTADOCUMENTO", "");
    newDocCarta ? formData.append("CARTA", newDocCarta, nameNewDocCarta) : formData.append("CARTA", "");
    formData.append("NUMOPERACION", String(tipo));
    formData.append("CHID", id);
    formData.append("CHUSER", String(user.id));
    formData.append("IDBANCOS", String(idBancos));
    formData.append("NUMEROCUENTA", numeroCuenta);
    formData.append("NOMBRECUENTA", nombreCuenta);
    formData.append("CLABEBANCARIA", clabeBancaria);
    formData.append("COMENTARIOS", comentarios);

    if (
      !nombreCuenta ||
      !numeroCuenta ||
      !idBancos ||
      !clabeBancaria ||
      !newDoc ||
      !newDocCarta
    ) {
      Swal.fire("Campos Vacios", "Error!", "error");
      setslideropen(false);
    } else {
      CatalogosServices.CuentaBancaria(formData).then((res) => {
        setslideropen(false);
        console.log("res en service", res);
        if (res.SUCCESS) {
          Toast.fire({
            icon: "success",
            title: "Carga Exitosa!",
          });
          handleClose();
        } else {
          setslideropen(false);
          console.log("res en Sí res.SUCCESS no tiene nada", res);
          Swal.fire("Error inesperado", "Error!", "error");
        }
      });
    }
  };




  const editar = (data: any) => {
    CatalogosServices.CuentaBancaria(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Registro Editado!",
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

  // function enCambioFile(event: any) {
  //   setUploadFile(URL.createObjectURL(event.target.files[0]));
  //   setNombreArchivo(event.target.value.split("\\")[2]);
  //   let file = event.target!.files[0]!;
  //   setTipoArchivo((event.target.value.split(".")[1]))
  //   setFile(file);
  //   {
  //     nombreArchivo === null
  //       ? setDisabledButton(true)
  //       : setDisabledButton(false);
  //   }
  // }



  /// archivo de carta


  useEffect(() => {
    if (dt === "") {
      console.log(dt);
    } else {
      setId(dt?.row?.id);
      setIdBancos(dt?.row?.idbanco);
      setNombreCuenta(dt?.row?.NombreCuenta);
      setNumeroCuenta(dt?.row?.NumeroCuenta);
      setClabeBancaria(dt?.row?.ClabeBancaria);
      setUrlDoc(dt?.row?.RutaDocumento);
      setUrlDocCarta(dt?.row?.RutaCarta)
      setComentarios(dt?.row?.Comentarios);
      setMensajeLabel(dt?.row?.NombreDocumento);
      if (dt?.row?.NombreDocumento.length > 0) {
        setIconoPDF(PdfLogo);
      }
    }
    bancosc();
  }, [dt]);



  return (
    <Dialog open={open} keepMounted>
      {tipo == 1 || tipo == 2 ? (

        <ModalForm title={tipo == 1 ? "Agregar Datos bancarios" : "Editar Registro"} handleClose={handleClose}>
          <Grid container
            sx={{
              mt: "2vh",
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}

          >
            <Grid item xs={12} sm={8} md={8} lg={8}>

              <Box>
                <SelectFrag
                  value={idBancos}
                  options={bancos}
                  onInputChange={handleFilterChange1}
                  placeholder={"Seleccione Banco"}
                  label={""}
                  disabled={false}
                />

              </Box>

            </Grid>


            <Grid item xs={12} sm={8} md={8} lg={8}>
              <Box>
                <TextField
                  required
                  margin="dense"
                  id="NombreCuenta"
                  label="Nombre de la Cuenta"
                  value={nombreCuenta}
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={(v) => setNombreCuenta(v.target.value)}
                  error={nombreCuenta == "" ? true : false}
                  InputProps={{}}
                />

              </Box>

              <Box>


                <TextField
                  required
                  margin="dense"
                  id="NumeroCuenta"
                  label="Número de la Cuenta"
                  value={numeroCuenta}
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={(v) => setNumeroCuenta(v.target.value)}
                  error={numeroCuenta == "" ? true : false}
                  inputProps={{
                    maxLength: 18,
                    pattern: '[0-9]*'
                  }}
                  InputLabelProps={{ shrink: true }}
                />
              </Box>
              <Box>

                <TextField
                  required
                  margin="dense"
                  id="ClabeBancaria"
                  label="Clabe"
                  value={clabeBancaria}
                  type="text"
                  fullWidth
                  variant="standard"
                  onChange={(v) => setClabeBancaria(v.target.value)}
                  error={clabeBancaria == "" ? true : false}
                  inputProps={{
                    maxLength: 18,
                    pattern: '[0-9]*'
                  }}
                  InputLabelProps={{ shrink: true }}
                />
              </Box>

            </Grid>

            <Grid container direction="row" justifyContent="space-around" alignItems="center">
              <Grid item xs={3} sm={3} md={3} lg={3} alignContent="center" alignItems="center">
                <Box sx={{ width: "100%", height: "100%", border: "5px dashed  black" }}>
                  <input
                    id="imagencargada"
                    accept="application/pdf"
                    onChange={(event) => { handleNewFile(event) }}
                    type="file"
                    style={{ zIndex: 2, opacity: 0, width: "25%", height: "40%", position: "absolute", cursor: "pointer", }} />

                  {nameNewDoc ? < PictureAsPdfOutlinedIcon sx={{ width: "100%", height: "100%" }} /> : <CloudUploadIcon sx={{ width: "100%", height: "100%" }} />}
                </Box>

                {DocSubido ?
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-around", width: "100%" }}>
                    <label >
                      {nameNewDoc}
                    </label>

                  </Box>
                  : ""}
                <Grid item xs={12} sm={12} md={12} lg={12}
                  sx={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <Typography sx={{ textAlign: "center" }}>Arrastre El Documento o Presione el icono Para Seleccionar</Typography>
                </Grid>
              </Grid>

              {/* //// archivo de carta*/}

              <Grid item xs={3} sm={3} md={3} lg={3} alignContent="center" alignItems="center">
                <Box sx={{ width: "100%", height: "100%", border: "5px dashed  black" }}>
                  <Grid >
                    <input
                      id="imagencargada"
                      accept="application/pdf"
                      onChange={(event) => { handleNewFileCarta(event) }}
                      type="file"
                      style={{ zIndex: 2, opacity: 0, width: "25%", height: "40%", position: "absolute", cursor: "pointer", }} />

                    {nameNewDocCarta ? < PictureAsPdfOutlinedIcon sx={{ width: "100%", height: "100%" }} /> : <CloudUploadIcon sx={{ width: "100%", height: "100%" }} />}

                  </Grid>
                </Box>

                {DocSubidoCarta ?
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-around", width: "100%" }}>
                    <label >
                      {nameNewDocCarta}
                    </label>

                  </Box>
                  : ""}
                <Grid item xs={12} sm={12} md={12} lg={12}
                  sx={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <Typography sx={{ textAlign: "center" }}>Arrastre La Carta o Presione el Icono Para Seleccionar</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid container
              sx={{
                mt: "2vh",
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Grid item xs={4} sm={3} md={2} lg={1}
              >
                <Button className={tipo == 1 ? "guardar" : "actualizar"} onClick={() => handleSend()}>{tipo == 1 ? "Guardar" : "Actualizar"}</Button>
              </Grid>
            </Grid>
          </Grid>
        </ModalForm>
      ) : (
        ""
      )}

      {tipo == 3 ? (

        <ModalForm title={"Cuenta Bancaria"} handleClose={handleClose}>

          <Grid container
            sx={{
              mt: "2vh",
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}

          >

            <Grid item xs={12} sm={8} md={8} lg={7} textAlign="center">
              <Box>
                <Typography>Nombre de la cuenta:</Typography>
                <Typography>{nombreCuenta}</Typography>
                <br />
                <Typography>Banco:</Typography>
                <Typography> {dt?.row?.NombreBanco}</Typography>
                <br />
                <Typography>Numero de Cuenta</Typography>
                <Typography>{dt?.row?.NumeroCuenta}</Typography>

                <br />
                <Typography>Clave bancaria</Typography>
                <Typography>{dt?.row?.ClabeBancaria}</Typography>

              </Box>
            </Grid>





          </Grid>
          <Grid container>  
          
              <Grid item xs={12} sm={6} md={6} lg={6}>

            <Box>
              <iframe
                id="inlineFrameExample"
                title="Inline Frame Example"
                width="100%"
                height="500"
                src={urlDoc}
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-around", width: "100%" }}>
                    <label >
                    {dt?.row?.NombreDocumento}
                    </label>

                  </Box>

          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6}>

            <Box>
              <iframe
                id="inlineFrameExample"
                title="Inline Frame Example"
                width="100%"
                height="500"
                src={urlDocCarta }
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-around", width: "100%" }}>
                    <label >
                      {dt?.row?.NombreCarta}
                    </label>

                  </Box>

          </Grid>
          </Grid>

      




        </ModalForm>



        // <Box>
        //   <DialogContent>
        //     <Box>
        //       <Box sx={{ display: "flex", justifyContent: "center" }}>
        //         <label className="Titulo">Cuenta Bancaria</label>
        //       </Box>
        //       <Typography>Nombre de la cuenta:</Typography>
        //       <Typography>{nombreCuenta}</Typography>
        //       <Typography>Banco:</Typography>

        //       <SelectFrag
        //         value={idBancos}
        //         options={bancos}
        //         onInputChange={handleFilterChange1}
        //         placeholder={"Seleccione Banco"}
        //         label={""}
        //         disabled={true}
        //       />
        //       <Typography>Número de la cuenta:</Typography>
        //       <Typography>{numeroCuenta}</Typography>
        //       <Typography>Clabe:</Typography>
        //       <Typography>{clabeBancaria}</Typography>
        //       <Box sx={{ width: "100%" }}>
        //         <Box
        //           sx={{
        //             display: "flex",
        //             alignItems: "flex-start",
        //             flexDirection: "column",
        //             justifyContent: "center",
        //             p: 1,
        //             m: 1,
        //             bgcolor: "background.paper",
        //             borderRadius: 1,
        //           }}
        //         >

        //           <Box
        //             sx={{
        //               display: "flex",
        //               width: "100%",
        //               justifyContent: "center",
        //               flexDirection: "column",
        //             }}
        //           >
        //             <Box>
        //               <iframe
        //                 id="inlineFrameExample"
        //                 title="Inline Frame Example"
        //                 width="500"
        //                 height="350"
        //                 src={urlDoc}
        //               />
        //             </Box>
        //             <Box>
        //               <iframe
        //                 id="inlineFrameExample"
        //                 title="Inline Frame Example"
        //                 width="500"
        //                 height="350"
        //                 src={urlDocCarta}
        //               />
        //             </Box>


        //             <Box>
        //               <Typography>Nombre del documento:</Typography>
        //               <Typography>{mensajeLabel}</Typography>
        //             </Box>
        //           </Box>
        //         </Box>
        //       </Box>
        //     </Box>
        //   </DialogContent>
        //   <DialogActions>
        //     <button className="cerrar" onClick={() => handleClose()}>
        //       Cancelar
        //     </button>
        //   </DialogActions>
        // </Box>
      ) : (
        ""
      )}
    </Dialog>
  );
};
