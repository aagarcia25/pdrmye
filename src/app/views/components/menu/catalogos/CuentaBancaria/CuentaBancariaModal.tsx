import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AlertS } from "../../../../../helpers/AlertS";
import { Toast } from "../../../../../helpers/Toast";
import SelectValues from "../../../../../interfaces/Select/SelectValues";
import { USUARIORESPONSE } from "../../../../../interfaces/user/UserInfo";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import { getToken, getUser } from "../../../../../services/localStorage";
import SelectFrag from "../../../Fragmentos/SelectFrag";
import ModalForm from "../../../componentes/ModalForm";
import { ValidaSesion } from "../../../../../services/UserServices";
import { base64ToArrayBuffer } from "../../../../../helpers/Files";
import SliderProgress from "../../../SliderProgress";
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
  const [numeroCuenta, setNumeroCuenta] = useState<string>("");
  const [numeroCuentaCoded, setNumeroCuentaCoded] = useState<string>("");
  const [nombreCuenta, setNombreCuenta] = useState("");
  const [clabeBancaria, setClabeBancaria] = useState("");
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));
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
    var sizeByte = Number(file?.size);
    // setSizeFile(Number(sizeByte) / 1024 >= 3072 ? true : false)
    if (Number(sizeByte) / 1024 >= 3072) {
      AlertS.fire({
        title: "Atención",
        text: "Tamaño de archivo Exedido -Limitado a 3Mb-",
        icon: "info",
      });
    } else if (
      event.target!.files[0]!.name.slice(-4) == ".pdf" ||
      event.target!.files[0]!.name.slice(-4) == ".PDF"
    ) {
      setUploadFile(URL.createObjectURL(event.target.files[0]));
      setNewDoc(file);
      setNameNewDoc(event.target!.files[0]!.name);
      //if(String(event.target!.files[0]!.name).slice)
      setDocSubido(true);
    } else {
      AlertS.fire({
        title: "Atención",
        text: "Agrega un archivo PDF",
        icon: "info",
      });
    }
  };

  const handleNewFileCarta = (event: any) => {
    let file2 = event.target!.files[0]!;
    var sizeByte = Number(file2.size);
    if (Number(sizeByte) / 1024 >= 3072) {
      AlertS.fire({
        title: "Atención",
        text: "Tamaño de archivo Exedido -Limitado a 3Mb-",
        icon: "info",
      });
    } else if (
      event.target!.files[0]!.name.slice(-4) == ".pdf" ||
      event.target!.files[0]!.name.slice(-4) == ".PDF"
    ) {
      setUploadFileCarta(URL.createObjectURL(event.target.files[0]));
      setNewDocCarta(file2);
      setNameNewDocCarta(event.target!.files[0]!.name);
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
    if (
      tipo == 1
        ? !nombreCuenta ||
          !numeroCuenta ||
          !idBancos ||
          !clabeBancaria ||
          !newDoc ||
          newDocCarta == null
        : !nombreCuenta || !numeroCuenta || !idBancos || !clabeBancaria
    ) {
      AlertS.fire({
        title: "Atención",
        text: "Verifique los campos",
        icon: "warning",
      });

      setslideropen(false);
    } else {
      const formData = new FormData();
      if (nameNewDoc !== undefined) {
        formData.append("RUTADOCUMENTO", newDoc, nameNewDoc);
      }

      if (nameNewDocCarta !== undefined) {
        formData.append("CARTA", newDocCarta, nameNewDocCarta);
      }
      formData.append("TOKEN", JSON.parse(String(getToken())));
      formData.append("NUMOPERACION", String(tipo));
      formData.append("CHID", id);
      formData.append("CHUSER", String(user.Id));
      formData.append("IDBANCOS", String(idBancos));
      formData.append("NUMEROCUENTA", numeroCuenta);
      formData.append("NOMBRECUENTA", nombreCuenta);
      formData.append("CLABEBANCARIA", clabeBancaria);
      formData.append("COMENTARIOS", comentarios);
      formData.append("IDMUNICIPIO", dt.idMunicipio);

      CatalogosServices.CuentaBancaria(formData).then((res) => {
        setslideropen(false);
        if (res.SUCCESS) {
          Toast.fire({
            icon: "success",
            title: "Carga Exitosa!",
          });
        } else {
          setslideropen(false);
          Swal.fire("Verifique los campos", "¡Error!", "warning");
        }
      });
    }
  };

  const editar = (data: any) => {
    CatalogosServices.CuentaBancaria(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "¡Registro Editado!",
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

  const handleNumCuenta = (v: string) => {
    setNumeroCuenta(v);
  };

  const handleClabe = (v: string) => {
    setClabeBancaria(v);
  };

  const getdocumento = (name: string, tipo: number) => {
    setslideropen(true);
    let data = {
      TOKEN: JSON.parse(String(getToken())),
      RUTA: "/DAMOP/OFICIOS/",
      NOMBRE: name,
    };
    if (name !== "" && name !== null) {
      ValidaSesion();
      CatalogosServices.obtenerDoc(data).then((res) => {
        if (res.SUCCESS) {
          var bufferArray = base64ToArrayBuffer(res.RESPONSE.RESPONSE.FILE);
          var blobStore = new Blob([bufferArray], {
            type: res.RESPONSE.RESPONSE.TIPO,
          });
          var data = window.URL.createObjectURL(blobStore);
          var link = document.createElement("a");
          document.body.appendChild(link);
          link.href = data;
          if (tipo == 1) {
            setUrlDoc(link.href);
          } else {
            setUrlDocCarta(link.href);
          }
          setslideropen(false);
        } else {
          setslideropen(false);
        }
      });
    } else {
      setslideropen(false);
    }
  };

  useEffect(() => {
    bancosc();
    if (dt == "") {
    } else {
      setId(dt?.row?.id);
      setIdBancos(dt?.row?.idbanco);
      setNombreCuenta(dt?.row?.NombreCuenta);
      setNumeroCuenta(dt?.row?.NumeroCuenta);
      setClabeBancaria(dt?.row?.ClabeBancaria);
      setComentarios(dt?.row?.Comentarios);
      getdocumento(dt?.row?.RutaDocumento, 1);
      getdocumento(dt?.row?.RutaCarta, 2);
    }
  }, [dt]);

  return (
    <div>
      <SliderProgress open={slideropen}></SliderProgress>
      {tipo == 1 || tipo == 2 ? (
        <ModalForm
          title={tipo == 1 ? "Agregar Datos Bancarios" : "Editar Registro"}
          handleClose={handleClose}
        >
          <Box boxShadow={3}>
            <Grid
              container
              sx={{
                mt: "2vh",
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                padding: "2%",
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
                    onChange={(v) => handleNumCuenta(v.target.value)}
                    error={String(Number(numeroCuenta)) == "NaN"}
                    inputProps={{
                      maxLength: 18,
                      pattern: "[0-9]*",
                    }}
                    InputLabelProps={{ shrink: true }}
                  />
                </Box>
                <Box paddingBottom={2}>
                  <TextField
                    required
                    margin="dense"
                    id="ClabeBancaria"
                    label="Clabe"
                    value={clabeBancaria}
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={(v) => handleClabe(v.target.value)}
                    error={String(Number(clabeBancaria)) == "NaN"}
                    inputProps={{
                      maxLength: 18,
                      pattern: "[0-9]*",
                    }}
                    InputLabelProps={{ shrink: true }}
                  />
                </Box>
              </Grid>

              <Grid
                container
                direction="row"
                justifyContent="space-around"
                alignItems="center"
              >
                <Grid
                  item
                  xs={3}
                  sm={3}
                  md={4}
                  lg={3}
                  alignContent="center"
                  alignItems="center"
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-around",
                      width: "100%",
                    }}
                  >
                    <Typography variant="h6">
                      {DocSubido !== null ? "" : dt?.row?.NombreDocumento}
                    </Typography>
                  </Box>
                  <div className="CargaDeArchivosCuenta">
                    <Grid container justifyContent="center" alignItems="center">
                      <input
                        id="imagencargada"
                        accept="application/pdf"
                        onChange={(event) => {
                          handleNewFile(event);
                        }}
                        type="file"
                        style={{
                          opacity: 0,
                          width: "100%",
                          height: "100%",
                          position: "absolute",
                          cursor: "pointer",
                        }}
                      />

                      <Typography sx={{ textAlign: "center", marginTop: 15 }}>
                        Presione aqui para subir el documento de apertura de la
                        cuenta bancaria
                      </Typography>
                    </Grid>
                  </div>
                  <Box
                    sx={{
                      alignItems: "center",
                      justifyContent: "space-around",
                      width: "100%",
                    }}
                  >
                    <Typography variant="h6">
                      {DocSubido ? nameNewDoc : ""}
                    </Typography>
                  </Box>
                </Grid>

                {/* //// archivo de carta*/}

                <Grid
                  item
                  xs={3}
                  sm={3}
                  md={4}
                  lg={3}
                  alignContent="center"
                  alignItems="center"
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-around",
                      width: "100%",
                      bgcolor: "green",
                    }}
                  >
                    <Typography variant="h6" className="PieDeImagen">
                      {DocSubidoCarta !== null ? "" : dt?.row?.NombreCarta}
                    </Typography>
                  </Box>
                  <div className="CargaDeArchivosCuenta">
                    <Grid container justifyContent="center" alignItems="center">
                      <input
                        id="imagencargada"
                        accept="application/pdf"
                        onChange={(event) => {
                          handleNewFileCarta(event);
                        }}
                        type="file"
                        style={{
                          opacity: 0,
                          width: "100%",
                          height: "100%",
                          position: "absolute",
                          cursor: "pointer",
                        }}
                      />
                      <Typography sx={{ textAlign: "center", marginTop: 15 }}>
                        Presione aqui para subir el oficio para registrar la
                        cuenta bancaria
                      </Typography>
                    </Grid>
                  </div>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-around",
                      width: "100%",
                    }}
                  >
                    <Typography variant="h6">
                      {DocSubidoCarta ? nameNewDocCarta : ""}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              <Grid
                container
                sx={{
                  mt: "2vh",
                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <Grid item xs={4} sm={3} md={2} lg={1}>
                  <Button
                    disabled={
                      String(Number(numeroCuenta)) == "NaN" ||
                      String(Number(clabeBancaria)) == "NaN" ||
                      clabeBancaria.length !== 18 ||
                      !DocSubido ||
                      !DocSubidoCarta ||
                      !nombreCuenta ||
                      idBancos == "" ||
                      idBancos == "false"
                    }
                    className={tipo == 1 ? "guardar" : "actualizar"}
                    onClick={() => handleSend()}
                  >
                    {tipo == 1 ? "Guardar" : "Actualizar"}
                  </Button>
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
          <Grid
            container
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
              <Typography variant="h5">Nombre de la cuenta:</Typography>
              <Typography variant="h6" className="TextoHeaderCuentaModal">
                {" " + nombreCuenta}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={3} md={3} lg={3} textAlign="center">
              <Typography variant="h5">Banco:</Typography>
              <Typography variant="h6" className="TextoHeaderCuentaModal">
                {" " + dt?.row?.NombreBanco}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={3} md={3} lg={3} textAlign="center">
              <Typography variant="h5"> Número de cuenta:</Typography>
              <Typography variant="h6" className="TextoHeaderCuentaModal">
                {" " + dt?.row?.NumeroCuenta}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={3} md={3} lg={3} textAlign="center">
              <Typography variant="h5">Clabe Bancaria:</Typography>
              <Typography variant="h6" className="TextoHeaderCuentaModal">
                {" " + dt?.row?.ClabeBancaria}
              </Typography>
            </Grid>
          </Grid>

          <Grid container marginTop={3}>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                  width: "100%",
                }}
              >
                <label>
                  {dt?.row?.NombreDocumento !== "null"
                    ? dt?.row?.NombreDocumento
                    : ""}
                </label>
              </Box>
              <Box>
                {" "}
                {urlDoc !== "null" ? (
                  <iframe
                    id="inlineFrameExample"
                    title="Inline Frame Example"
                    width="100%"
                    height="700"
                    src={urlDoc}
                  />
                ) : (
                  ""
                )}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                  width: "100%",
                }}
              >
                <label>
                  {dt?.row?.NombreCarta ? dt?.row?.NombreCarta : ""}
                </label>
              </Box>

              <Box>
                {urlDocCarta !== null ? (
                  <iframe
                    id="inlineFrameExample"
                    title="Inline Frame Example"
                    width="100%"
                    height="700"
                    src={urlDocCarta}
                  />
                ) : (
                  ""
                )}
              </Box>
            </Grid>
          </Grid>
        </ModalForm>
      ) : (
        ""
      )}
    </div>
  );
};
