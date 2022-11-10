import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  Box,
  TextField,
  DialogActions,
  IconButton,
  Typography,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import imagenGenerica from "../../../../../../app/assets/img/archivoImagen.jpg";
import PdfLogo from "../../../../../../app/assets/img/PDF_file_icon.svg";
import {getUser} from "../../../../../services/localStorage";
import {  RESPONSE } from "../../../../../interfaces/user/UserInfo";
import { Alert } from "../../../../../helpers/Alert";
import { Toast } from "../../../../../helpers/Toast";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import SelectFrag from "../../../Fragmentos/SelectFrag";
import SelectValues from "../../../../../interfaces/Select/SelectValues";
import Swal from "sweetalert2";

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
  const [nameNewDoc, setNameNewDoc] = useState<string>();
  const [editDoc, setEditDoc] = useState<boolean>(false);
  const [newDoc, setNewDoc] = useState(Object);
  const [urlDoc, setUrlDoc] = useState("");

 

  const [mensajeLabel, setMensajeLabel] = useState(
    "Agrega un archivo PDF de tú carta de banco."
  );
  const [iconoPDF, setIconoPDF] = useState(imagenGenerica);


  const handleNewFile = (event: any) => {
    let file = event.target!.files[0]!;
    let sizeByte = Number(file.size);
    setNameNewDoc("mensajePrincipal");
    setMensajeLabel("Agrega un archivo PDF de tú carta de banco.");
   
    if (event.target.files.length) {
      if (
        String(event.target!.files[0]!.name).slice(-4) === ".pdf" ||
        String(event.target!.files[0]!.name).slice(-4) === ".PDF"
      ) {
        if (sizeByte <= 2000000) {
          setNameNewDoc("EsPDFYMenorDe2MB");
          setEditDoc(true);
          setMensajeLabel(event.target!.files[0]!.name);
          setNewDoc(file);
          setIconoPDF(PdfLogo);
        } else {
          setNameNewDoc("ElDocEsMayorA2MB");
          setMensajeLabel("El archivo es muy grande, tiene más de 2 hojas.");
        }
      } else {
        setNameNewDoc("noEsPDF");
        setMensajeLabel("El archivo no es un PDF, intenta de nuevo.");
        setIconoPDF(imagenGenerica);
      }
    } else {
      setIconoPDF(imagenGenerica);
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

    editDoc
      ? formData.append("RUTADOCUMENTO", newDoc, mensajeLabel)
      : formData.append("RUTADOCUMENTO", "");
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
      !newDoc
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
      {tipo == 1 || tipo == 2  ? (
        <Box>
          <DialogContent>
            <Box>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <label className="Titulo">{tipo == 1 ? "Agregar Registro" : "Editar Registro"}</label>
              </Box>
              <Box
               
               >
                 <SelectFrag
                   value={idBancos}
                   options={bancos}
                   onInputChange={handleFilterChange1}
                   placeholder={"Seleccione Banco"}
                   label={""}
                   disabled={false}
                 />
               </Box>

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
                  maxLength: 18 ,
                  pattern: '[0-9]*'
                }}
                InputLabelProps={{ shrink: true }}
              />

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
                  maxLength: 18 ,
                  pattern: '[0-9]*'
                }}
                InputLabelProps={{ shrink: true }}
              />

              <Box sx={{ width: "100%" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    flexDirection: "column",
                    justifyContent: "center",
                    p: 1,
                    m: 1,
                    bgcolor: "background.paper",
                    borderRadius: 1,
                  }}
                >
                 
                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Box>
                      <img
                        src={iconoPDF}
                        style={{ objectFit: "scale-down", width: "100%" }}
                      />
                    </Box>
                    <Box>
                      <Typography>Nombre del documento:</Typography>
                      <Typography>{mensajeLabel}</Typography>
                    </Box>
                  </Box>
                  <Box>
                    <IconButton
                      aria-label="upload picture"
                      component="label"
                      size="large"
                    >
                      <input
                        required
                        type="file"
                        hidden
                        onChange={(event) => {
                          handleNewFile(event);
                        }}
                      />
                      <UploadFileIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <button className="guardar" onClick={() => handleSend()}>
              Guardar
            </button>
            <button className="cerrar" onClick={() => handleClose()}>
              Cancelar
            </button>
          </DialogActions>
        </Box>
      ) : (
        ""
      )}

      {tipo == 3  ? (
        <Box>
          <DialogContent>
            <Box>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <label className="Titulo">Cuenta Bancaria</label>
              </Box>
              <Typography>Nombre de la cuenta:</Typography>
              <Typography>{nombreCuenta}</Typography>
              <Typography>Banco:</Typography>

                <SelectFrag
                  value={idBancos}
                  options={bancos}
                  onInputChange={handleFilterChange1}
                  placeholder={"Seleccione Banco"}
                  label={""}
                  disabled={true}
                />
              <Typography>Número de la cuenta:</Typography>
              <Typography>{numeroCuenta}</Typography>
              <Typography>Clabe:</Typography>
              <Typography>{clabeBancaria}</Typography>
              <Box sx={{ width: "100%" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    flexDirection: "column",
                    justifyContent: "center",
                    p: 1,
                    m: 1,
                    bgcolor: "background.paper",
                    borderRadius: 1,
                  }}
                >
                  
                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
                  >
                    <Box>
                      <iframe
                        id="inlineFrameExample"
                        title="Inline Frame Example"
                        width="500"
                        height="350"
                        src={urlDoc}
                      />
                    </Box>
                    <Box>
                      <Typography>Nombre del documento:</Typography>
                      <Typography>{mensajeLabel}</Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <button className="cerrar" onClick={() => handleClose()}>
              Cancelar
            </button>
          </DialogActions>
        </Box>
      ) : (
        ""
      )}
    </Dialog>
  );
};
