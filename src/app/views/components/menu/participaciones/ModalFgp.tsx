import { Box, Grid, IconButton, Input } from "@mui/material";
import { useEffect, useState } from "react";
import { Alert } from "../../../../helpers/Alert";
import { Toast } from "../../../../helpers/Toast";
import { CatalogosServices } from "../../../../services/catalogosServices";
import { BtnRegresar } from "../catalogos/Utilerias/AgregarCalculoUtil/BtnRegresar";
import { SubTitulo } from "../catalogos/Utilerias/AgregarCalculoUtil/SubTitulo";
import { Titulo } from "../catalogos/Utilerias/AgregarCalculoUtil/Titulo";
import CalculateIcon from "@mui/icons-material/Calculate";
import { COLOR } from "../../../../styles/colors";
import { calculosServices } from "../../../../services/calculosServices";
import { RESPONSE } from "../../../../interfaces/user/UserInfo";
import { getUser } from "../../../../services/localStorage";
import Slider from "../../Slider";
import SelectValues from "../../../../interfaces/Select/SelectValues";
import SelectFrag from "../../Fragmentos/Select/SelectFrag";
import { fmeses } from "../../../../share/loadMeses";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useNavigate } from "react-router-dom";

const ModalFgp = ({
  idCalculo,
  step,
  clave,
  titulo,
  onClickBack,
  modo,
  anio,
  mes,
}: {
  idCalculo:string
  step: number;
  clave: string;
  titulo: string;
  onClickBack: Function;
  modo: string;
  anio: number;
  mes: string;
}) => {
  const navigate = useNavigate();
  const user: RESPONSE = JSON.parse(String(getUser()));
  const [slideropen, setslideropen] = useState(false);
  const [monto, setMonto] = useState<number>();
  const [meses, setMeses] = useState<SelectValues[]>([]);
  const [meselect, setMeselect] = useState("");
  const [ajustes, setAjustes] = useState<SelectValues[]>([]);
  const [nameNewDoc, setNameNewDoc] = useState("");
  const [ajusteselect, setajusteselect] = useState("");
  const [labelAjuste, setLabelAjuste] = useState("");
  let year: number = new Date().getFullYear();

  const handleSelectMes = (v: SelectValues) => {
    setMeselect(String(v.value));
  };

  const handleSelectAjuste = (v: SelectValues) => {
    console.log("cambiando select");
    console.log(v)
    setLabelAjuste(String(v.label));
    setajusteselect(String(v.value));
  };

  const [file, setFile] = useState(Object);

  const handleNewFile = (event: any) => {
    setFile(event?.target?.files?.[0] || "");
    ///// SE VALIDA SI NO SE CARGO ARCHIVO EN EL INPUT PARA PODER EXTRAER EL NOMBRE
    if (event.target.files.length === 0) {
    } else {
      setNameNewDoc(event.target!.files[0]!.name);
    }
  };

  const AjusteEstatal = () => {
    setslideropen(true);
    const formData = new FormData();
    formData.append("inputfile", file, "inputfile.xlsx");
    formData.append("tipo", "CalculoAjuste");
    formData.append("CHUSER", user.id);
    formData.append("ANIO", String(year));
    formData.append("MES", meselect);
    formData.append("IMPORTE", String(monto));
    formData.append("IDCALCULO", idCalculo);
    formData.append("AJUSTE", String(ajusteselect));
    CatalogosServices.migraData(formData).then((res) => {
      setslideropen(false);
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Carga Exitosa!",
        });

        onClickBack();
      } else {
        Alert.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };

  const isrnomina = () => {
    setslideropen(true);
    const formData = new FormData();
    formData.append("inputfile", file, "inputfile.xlsx");
    formData.append("tipo", "ISRNOMINA");
    formData.append("CHUSER", user.id);
    formData.append("ANIO", String(year));
    formData.append("MES", meselect);
    formData.append("IMPORTE", "0");
    CatalogosServices.migraData(formData).then((res) => {
      setslideropen(false);
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Carga Exitosa!",
        });

        onClickBack();
      } else {
        Alert.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };

  const isrinmuebles = () => {
    setslideropen(true);
    const formData = new FormData();
    formData.append("inputfile", file, "inputfile.xlsx");
    formData.append("tipo", "ISRINMUEBLES");
    formData.append("CHUSER", user.id);
    formData.append("ANIO", String(year));
    formData.append("MES", meselect);
    formData.append("IMPORTE", String(monto));
    CatalogosServices.migraData(formData).then((res) => {
      setslideropen(false);
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Carga Exitosa!",
        });

        onClickBack();
      } else {
        Alert.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };

  const icv = () => {
    setslideropen(true);
    const formData = new FormData();
    formData.append("inputfile", file, "inputfile.xlsx");
    formData.append("tipo", "RefrendosICV");
    formData.append("CHUSER", user.id);
    formData.append("ANIO", String(year));
    formData.append("MES", meselect);
    CatalogosServices.migraData(formData).then((res) => {
      setslideropen(false);
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Carga Exitosa!",
        });

        onClickBack();
      } else {
        Alert.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };

  const handleSend = () => {
    if (modo === "calculo") {
      if (clave === "ICV") {
        icv();
      } else if (clave === "ISR INMUEBLES") {
        isrinmuebles();
      } else if (clave === "ISR NOMINA") {
        isrnomina();
      }

      if (monto == null || anio) {
        Alert.fire({
          title: "Error!",
          text: "Favor de Completar los Campos",
          icon: "error",
        });
      } else {
        let data = {
          CLAVEFONDO: clave,
          CHUSER: user.id,
          IMPORTE: monto,
          ANIO: year,
          MES: meselect,
        };
        agregar(data);
      }
    } else {
      
      // AJUSTE ESTATAL
      if(labelAjuste === "Ajuste Estatal" ){
        AjusteEstatal();
      }


    }
  };

  const agregar = (data: any) => {
    console.log(data);
    calculosServices.CalculoPrincipalindex(data).then((res) => {
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

  const ajusteesc = () => {
    let data = {
      NUMOPERACION: 3,
      CLAVE: clave,
    };
    CatalogosServices.SelectIndex(data).then((res) => {
      setAjustes(res.RESPONSE);
    });
  };

  useEffect(() => {
    // SE ESTABLECE EL TIEMPO EN ESPERA PARA QUE SE CARGEN DE FORMA CORRECTA LOS COMPONENTES
    setNameNewDoc("");
    setTimeout(() => {
      setslideropen(true);
      setMeses(fmeses());
      ajusteesc();
      setslideropen(false);
    }, 3000);
  }, [step]);

  return (
    <div>
      <Slider open={slideropen}></Slider>
      <Grid container spacing={1} sx={{}}>
        <Grid item xs={3} md={2.1} lg={2.5}>
          <BtnRegresar onClick={onClickBack} />
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ justifyContent: "center" }}>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Titulo name={titulo} />
          </Box>
        </Grid>
      </Grid>

      {modo == "ajuste" ? (
        <Box>
          <Grid container spacing={1} sx={{ justifyContent: "center" }}>
            <Grid item xs={7} md={2.1} lg={2.5}>
              <label className="subtitulo">
                Ingrese monto y periodo <br />
                <br />
                <br />
              </label>
            </Grid>
          </Grid>

          <Grid container spacing={6}>
            <Grid
              item
              xs={5}
              sx={{
                display: "flex",
                justifyContent: "right",
              }}
            >
              <label className="contenido">Año:</label>
            </Grid>
            <Grid
              item
              xs={6}
              sx={{
                display: "flex",
                justifyContent: "left",
              }}
            >
              <label className="contenido"> {anio}</label>
            </Grid>

            <Grid
              item
              xs={5}
              sx={{
                display: "flex",
                justifyContent: "right",
                alignItems: "center",
              }}
            >
              <label className="contenido">Mes:</label>
            </Grid>

            <Grid item xs={5} md={6} lg={6} sx={{}}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  alignItems: "center",
                }}
              >
                <label className="contenido">{mes}</label>
              </Box>
            </Grid>

            <Grid
              item
              xs={5}
              md={5}
              lg={5}
              sx={{
                display: "flex",
                justifyContent: "right",
              }}
            >
              <label className="contenido">Monto:</label>
            </Grid>
            <Grid item xs={6} md={6}>
              <Input
                placeholder="1500000*"
                id="monto"
                onChange={(v) => setMonto(Number(v.target.value))}
                error={monto == null ? true : false}
                type="number"
              ></Input>
            </Grid>

            <Grid
              item
              xs={5}
              md={5}
              lg={5}
              sx={{
                display: "flex",
                justifyContent: "right",
              }}
            >
              <label className="contenido">Periodo:</label>
            </Grid>

            <Grid item xs={5} md={6} lg={6}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <SelectFrag
                  options={ajustes}
                  onInputChange={handleSelectAjuste}
                  placeholder={"Seleccione el Ajuste"} label={""} id={""}                ></SelectFrag>
              </Box>
            </Grid>

            {labelAjuste === "Ajuste Estatal" ? (
              <>
                <Grid
                  item
                  xs={5}
                  md={5}
                  lg={5}
                  sx={{
                    display: "flex",
                    justifyContent: "right",
                  }}
                >
                  <label className="contenido">Cargar Archivo:</label>
                </Grid>
                <Grid item xs={6} md={6}>
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

                  <Box>
                    <label>{nameNewDoc}</label>
                  </Box>
                </Grid>
              </>
            ) : (
              ""
            )}

            <Grid
              item
              xs={12}
              sx={{ mt: 3, display: "flex", justifyContent: "center" }}
            >
              <IconButton
                className="contenido"
                onClick={handleSend}
                sx={{
                  borderRadius: 1,
                  border: 1,
                  bgcolor: COLOR.negro,
                  color: COLOR.blanco,
                  "&:hover": {
                    bgcolor: COLOR.grisTarjetaBienvenido,
                    color: COLOR.negro,
                    fontFamily: "MontserratMedium",
                  },
                }}
              >
                <CalculateIcon />
                Calcular
              </IconButton>
            </Grid>
          </Grid>
        </Box>
      ) : (
        ""
      )}

      {modo == "calculo" ? (
        <Box>
          <Grid container spacing={1} sx={{ justifyContent: "center" }}>
            <Grid item xs={7} md={2.1} lg={2.5}>
              <SubTitulo />
            </Grid>
          </Grid>

          <Grid container spacing={6}>
            <Grid
              item
              xs={5}
              sx={{
                display: "flex",
                justifyContent: "right",
              }}
            >
              <label className="contenido">Año:</label>
            </Grid>
            <Grid
              item
              xs={6}
              sx={{
                display: "flex",
                justifyContent: "left",
              }}
            >
              <label className="contenido">{year}</label>
            </Grid>

            <Grid
              item
              xs={5}
              sx={{
                display: "flex",
                justifyContent: "right",
                alignItems: "center",
              }}
            >
              <label className="contenido">Mes:</label>
            </Grid>

            <Grid item xs={5} md={6} lg={6} sx={{}}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  alignItems: "center",
                }}
              >
                <SelectFrag
                  options={meses}
                  onInputChange={handleSelectMes}
                  placeholder={"Seleccione el Mes"} label={""} id={""}                ></SelectFrag>
              </Box>
            </Grid>

            {clave !== "ICV" && clave !== "ISR NOMINA" ? (
              <>
                <Grid
                  item
                  xs={5}
                  md={5}
                  lg={5}
                  sx={{
                    display: "flex",
                    justifyContent: "right",
                  }}
                >
                  <label className="contenido">Monto:</label>
                </Grid>
                <Grid item xs={6} md={6}>
                  <Input
                    sx={{ fontWeight: "MontserratMedium" }}
                    required
                    placeholder="1500000*"
                    id="monto"
                    onChange={(v) => setMonto(Number(v.target.value))}
                    error={monto == null ? true : false}
                    type="number"
                  ></Input>
                </Grid>
              </>
            ) : (
              ""
            )}

            {clave === "ICV" ||
            clave === "ISR INMUEBLES" ||
            clave === "ISR NOMINA" ? (
              <>
                <Grid
                  item
                  xs={5}
                  md={5}
                  lg={5}
                  sx={{
                    display: "flex",
                    justifyContent: "right",
                  }}
                >
                  <label className="contenido">Cargar Archivo:</label>
                </Grid>
                <Grid item xs={6} md={6}>
                  <IconButton
                    aria-label="upload picture"
                    component="label"
                    size="large"
                  >
                    <input
                      id="ICV"
                      required
                      type="file"
                      hidden
                      onChange={(event) => {
                        handleNewFile(event);
                      }}
                    />
                    <UploadFileIcon />
                  </IconButton>

                  <Box>
                    <label>{nameNewDoc}</label>
                  </Box>
                </Grid>
              </>
            ) : (
              ""
            )}

            <Grid
              item
              xs={12}
              sx={{ mt: 3, display: "flex", justifyContent: "center" }}
            >
              <IconButton
                onClick={handleSend}
                sx={{
                  borderRadius: 1,
                  border: 1,
                  bgcolor: COLOR.negro,
                  color: COLOR.blanco,
                  "&:hover": {
                    bgcolor: COLOR.grisTarjetaBienvenido,
                    color: COLOR.negro,
                  },
                }}
              >
                <CalculateIcon />
                Calcular
              </IconButton>
            </Grid>
          </Grid>
        </Box>
      ) : (
        ""
      )}
    </div>
  );
};

export default ModalFgp;
