import { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import { getUser } from "../../../../../services/localStorage";
import { RESPONSE } from "../../../../../interfaces/user/UserInfo";
import { AlertS } from "../../../../../helpers/AlertS";
import { Toast } from "../../../../../helpers/Toast";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import SelectFrag from "../../../Fragmentos/SelectFrag";
import SelectValues from "../../../../../interfaces/Select/SelectValues";
import Swal from "sweetalert2";
import ModalForm from "../../../componentes/ModalForm";
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

  const [urlDoc, setUrlDoc] = useState("");
  const [urlDocCarta, setUrlDocCarta] = useState("");
  const [newDoc, setNewDoc] = useState(Object);
  const [nameNewDoc, setNameNewDoc] = useState<string>();
  const [DocSubido, setDocSubido] = useState<boolean>(false);
  const [newDocCarta, setNewDocCarta] = useState(Object);
  const [nameNewDocCarta, setNameNewDocCarta] = useState<string>();
  const [DocSubidoCarta, setDocSubidoCarta] = useState<boolean>(false);
  const [uploadFile, setUploadFile] = useState("");
  const [uploadFileCarta, setUploadFileCarta] = useState("");

  const handleNewFile = (event: any) => {

    let file = event.target!.files[0]!;
    var sizeByte = Number(file.size);
    // setSizeFile(Number(sizeByte) / 1024 >= 3072 ? true : false)
    if (Number(sizeByte) / 1024 >= 3072) {
      AlertS.fire({
        title: "Atencion",
        text: "Tamaño de archivo Exedido -Limitado a 3Mb-",
        icon: "info",
      });
    } else if ((event.target!.files[0]!.name.slice(-4) === ".pdf" || event.target!.files[0]!.name.slice(-4) === ".PDF")) {
      setUploadFile(URL.createObjectURL(event.target.files[0]));
      setNewDoc(file);
      setNameNewDoc(event.target!.files[0]!.name);
      //if(String(event.target!.files[0]!.name).slice)
      setDocSubido(true);

    } else {
      AlertS.fire({
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
      AlertS.fire({
        title: "Atencion",
        text: "Tamaño de archivo Exedido -Limitado a 3Mb-",
        icon: "info",
      });
    } else if ((event.target!.files[0]!.name.slice(-4) === ".pdf" || event.target!.files[0]!.name.slice(-4) === ".PDF")) {
      setUploadFileCarta(URL.createObjectURL(event.target.files[0]));
      setNewDocCarta(file2);
      setNameNewDocCarta(event.target!.files[0]!.name);
      //if(String(event.target!.files[0]!.name).slice)
      setDocSubidoCarta(true);
    } else {
      AlertS.fire({
        title: "Atencion",
        text: "Agrega un archivo PDF",
        icon: "info",
      });

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
    if (tipo===1? !nombreCuenta ||!numeroCuenta || !idBancos ||!clabeBancaria || !newDoc || newDocCarta=== null: !nombreCuenta ||!numeroCuenta || !idBancos ||!clabeBancaria ) 
    {
      AlertS.fire({
        title: "Atencion",
        text: "Verifique los campos",
        icon: "warning",
      });

      setslideropen(false);
    } else {
      const formData = new FormData();
      if(nameNewDoc !== undefined && tipo===1 ){
        formData.append("RUTADOCUMENTO", newDoc, nameNewDoc) ;
      }

      if( nameNewDocCarta !== undefined && tipo===1 ){
        formData.append("CARTA", newDocCarta, nameNewDocCarta); 
      }
      formData.append("NUMOPERACION", String(tipo));
      formData.append("CHID", id);
      formData.append("CHUSER", String(user.id));
      formData.append("IDBANCOS", String(idBancos));
      formData.append("NUMEROCUENTA", numeroCuenta);
      formData.append("NOMBRECUENTA", nombreCuenta);
      formData.append("CLABEBANCARIA", clabeBancaria);
      formData.append("COMENTARIOS", comentarios);
      formData.append("IDMUNICIPIO", user.MUNICIPIO[0]?.id);

      CatalogosServices.CuentaBancaria(formData).then((res) => {
        setslideropen(false);
        //console.log("res en service", res);
        if (res.SUCCESS) {
          Toast.fire({
            icon: "success",
            title: "Carga Exitosa!",
          });
          handleClose();
        } else {
          setslideropen(false);
          //console.log("res en Sí res.SUCCESS no tiene nada", res);
          Swal.fire("Verifique los campos", "Error!", "warning");
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
        AlertS.fire({
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
      //console.log(dt);
    } else {
      setId(dt?.row?.id);
      setIdBancos(dt?.row?.idbanco);
      setNombreCuenta(dt?.row?.NombreCuenta);
      setNumeroCuenta(dt?.row?.NumeroCuenta);
      setClabeBancaria(dt?.row?.ClabeBancaria);
      setUrlDoc(dt?.row?.RutaDocumento);
      setUrlDocCarta(dt?.row?.RutaCarta)
      setComentarios(dt?.row?.Comentarios);
    }
    bancosc();
  }, [dt]);



  return (
<div>
    {tipo === 1 || tipo === 2 ? (

        <ModalForm title={tipo === 1 ? "Agregar Datos Bancarios" : "Editar Registro"} handleClose={handleClose}>
           <Box boxShadow={3} >
          <Grid container
            sx={{
              mt: "2vh",
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              padding:"2%"
            }}
          >
            <Grid item xs={12} sm={8} md={8} lg={8} paddingBottom={2}>
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
            <Grid item xs={12} sm={8} md={8} lg={8} paddingBottom={3}>
              <Box paddingBottom={2}>
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

              <Box paddingBottom={2}>
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
              </Box >
              <Box paddingBottom={2} >

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

                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-around", width: "100%" }}>
                  <Typography variant="h6">
                  {DocSubido ? "" : dt?.row?.NombreDocumento}
                  </Typography>

                </Box>
                <Box sx={{ width: "50%", height: "50%", border: "3px dashed  grey", }}>
                  <input
                    id="imagencargada"
                    accept="application/pdf"
                    onChange={(event) => { handleNewFile(event) }}
                    type="file"
                    style={{ zIndex: 2, opacity: 0, width: "25%", height: "40%", position: "absolute", cursor: "pointer", }} />

                  {dt?.row?.NombreDocumento? < PictureAsPdfOutlinedIcon sx={{ width: "100%", height: "100%" }} /> : <CloudUploadIcon sx={{ width: "100%", height: "100%" }} />}

                </Box>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-around", width: "100%" }}>
                <Typography variant="h6"> 
                    {DocSubido ? nameNewDoc : ""}
                  </Typography>

                </Box>
                <Grid item xs={12} sm={12} md={12} lg={12 }
                  sx={{ paddingTop:"1%", width: "50%", height: "50%", display: "flex", justifyContent: "center", alignItems: "center",  }}>
                  <Typography sx={{ textAlign: "center" }}>
                  {dt?.row?.NombreDocumento? "Arrastre El Nuevo Documento o Presione el icono Para Seleccionar" : "Arrastre El Documento o Presione el icono Para Seleccionar"} 
                    </Typography>
                </Grid>
              </Grid>

              {/* //// archivo de carta*/}

              <Grid item xs={3} sm={3} md={3} lg={3} alignContent="center" alignItems="center">
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-around", width: "100%" , bgcolor:"green" }}>
                  <Typography variant="h6">
                  {DocSubidoCarta ? "" : dt?.row?.NombreCarta}
                  </Typography>

                </Box>
                <Box sx={{ width: "50%", height: "50%", border: "3px dashed  grey"  }}>
                  <input
                    id="imagencargada"
                    accept="application/pdf"
                    onChange={(event) => { handleNewFileCarta(event) }}
                    type="file"
                    style={{ zIndex: 2, opacity: 0, width: "25%", height: "40%", position: "absolute", cursor: "pointer", }} />

                  {dt?.row?.NombreCarta? < PictureAsPdfOutlinedIcon sx={{ width: "100%", height: "100%" }} /> : <CloudUploadIcon sx={{ width: "100%", height: "100%" }} />}

                </Box>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-around", width: "100%" }}>
                <Typography variant="h6"> 
                    {DocSubidoCarta ? nameNewDocCarta : ""}
                  </Typography>
                </Box>
                <Grid item xs={12} sm={12} md={12} lg={12}
                  sx={{paddingTop:"1%", width: "50%", height: "50%", display: "flex", justifyContent: "center", alignItems: "center" ,  }}>
                  <Typography sx={{ textAlign: "center" }}>
                  {dt?.row?.NombreCarta? "Arrastre El Nuevo Documento Carta o Presione el icono Para Seleccionar" : "Arrastre El Documento Carta o Presione el icono Para Seleccionar"} 
                    </Typography>
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
                <Button className={tipo === 1 ? "guardar" : "actualizar"} onClick={() => handleSend()}>{tipo === 1 ? "Guardar" : "Actualizar"}</Button>
              </Grid>
            </Grid>
          </Grid>
          </Box>
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

            <Grid item xs={12} sm={3} md={3} lg={3} textAlign="center">
            <label><h2>Nombre de la cuenta:</h2>   <h4>{" "+ nombreCuenta}</h4></label>
            </Grid>
            <Grid item xs={12} sm={3} md={3} lg={3} textAlign="center">
               <label><h2>Banco:</h2>  <h4>{" "+ dt?.row?.NombreBanco}</h4></label>
            </Grid>
            <Grid item xs={12} sm={3} md={3} lg={3} textAlign="center">
             <label><h2>Numero de Cuenta: </h2>   <h4>{" "+ dt?.row?.NumeroCuenta}</h4></label>
            </Grid>
            <Grid item xs={12} sm={3} md={3} lg={3} textAlign="center">
             <label><h2>Clave bancaria:</h2><h4>{" "+ dt?.row?.ClabeBancaria}</h4></label>
            </Grid>
          </Grid>

          <Grid container>

            <Grid item xs={12} sm={6} md={6} lg={6}>

              <Box>
                <iframe
                  id="inlineFrameExample"
                  title="Inline Frame Example"
                  width="100%"
                  height="700"
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
                  height="700"
                  src={urlDocCarta}
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

      ) : ""}

</div>
  );
};
