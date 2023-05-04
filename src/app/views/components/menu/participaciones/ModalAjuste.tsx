import { useEffect, useState } from "react";
import { Box,  Button,  Grid, IconButton,  Typography } from "@mui/material";
import SelectValues from "../../../../interfaces/Select/SelectValues";
import { CatalogosServices } from "../../../../services/catalogosServices";
import SelectFrag from "../../Fragmentos/SelectFrag";
import { BtnRegresar } from "../catalogos/Utilerias/AgregarCalculoUtil/BtnRegresar";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { RESPONSE } from "../../../../interfaces/user/UserInfo";
import { getUser } from "../../../../services/localStorage";
import { Toast } from "../../../../helpers/Toast";
import { AlertS } from "../../../../helpers/AlertS";
import { calculosServices } from "../../../../services/calculosServices";
import Slider from "../../Slider";
import { ParametroServices } from "../../../../services/ParametroServices";
import { TextFieldFormatoMoneda } from "../../componentes/TextFieldFormatoMoneda";

const ModalAjuste = ({
  idCalculo,
  clave,
  titulo,
  onClickBack,
}: {
  idCalculo: string;
  clave: string;
  titulo: string;
  onClickBack: Function;
}) => {

  const user: RESPONSE = JSON.parse(String(getUser()));
  const [year, setyear] = useState<number>();
  //LLENADO DE FILTRO
  const [mes, setMeses] = useState<SelectValues[]>([]);
  const [tipoCalculo, setTipoCalculo] = useState<SelectValues[]>([]);
  const [ajustes, setAjustes] = useState<SelectValues[]>([]);

  //SETEO DE VALORES DE FILTRO
  const [idmes, setIdmes] = useState<SelectValues>();
  const [idTipoCalculo, setIdTipoCalculo] = useState<SelectValues>();
  const [idAjustes, setIdAjustes] = useState("");
  // VARIABLES
  const [monto, setMonto] = useState<number>();
  const [nameNewDoc, setNameNewDoc] = useState("");
  const [file, setFile] = useState(Object);
  const [slideropen, setslideropen] = useState(true);
  const [labelAjuste, setLabelAjuste] = useState<number>();

  const parametros = () => {
    let data = {
      NUMOPERACION: 5,
      NOMBRE: "ANIO_OPERACION"
    }
    ParametroServices.ParametroGeneralesIndex(data).then((res) => {
      setyear(Number(res.RESPONSE.Valor));
    });

  };

  const handleNewFile = (event: any) => {
    setFile(event?.target?.files?.[0] || "");
    if (event.target.files.length === 0) {
    } else {
      setNameNewDoc(event.target!.files[0]!.name);
    }
  };


  const handleSelect01 = (v: SelectValues) => {
    setIdAjustes(String(v));
    if (String(v) !== "") {

      let data = {
        NUMOPERACION: 5,
        CHID: String(v)
      };
      CatalogosServices.AjustesIndex(data).then((res) => {
        if (res.SUCCESS) {
          //console.log(res.RESPONSE);
          setLabelAjuste(Number(res.RESPONSE.keys));

        } else {
          AlertS.fire({
            title: "¡Error!",
            text: res.STRMESSAGE,
            icon: "error",
          });
        }
      });
    } else {
      setLabelAjuste(0);
    }
  };

  const AjusteEstatal = () => {
    setslideropen(true);
    const formData = new FormData();
    formData.append("inputfile", file, "inputfile.xlsx");
    formData.append("tipo", "CalculoAjuste");
    formData.append("FONDO", clave);
    formData.append("CHUSER", user.id);
    formData.append("IMPORTE", String(monto));
    formData.append("IDCALCULO", idCalculo);
    formData.append("IDAJUSTE", String(idAjustes));

    CatalogosServices.migraData(formData).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Carga Exitosa!",
        });
        onClickBack();
      } else {
        AlertS.fire({
          title: "¡Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
      setslideropen(false);
    });
  };

  const handleSend = () => {
    // AJUSTE ESTATAL
    if (labelAjuste === 10) {
      AjusteEstatal();
    } else if (labelAjuste === 9) {
      AjusteEstatal();
    } else if (labelAjuste === 8) {
      AjusteEstatal();
    }


  };

  const loadFilter = (operacion: number) => {
    let data = { NUMOPERACION: operacion, CHID: clave, CLAVE: clave };
    CatalogosServices.SelectIndex(data).then((res) => {
      if (operacion === 2) {
        setMeses(res.RESPONSE);
      } else if (operacion === 15) {
        setTipoCalculo(res.RESPONSE);
      } else if (operacion === 3) {
        setAjustes(res.RESPONSE);
      }

    });
  };

  const loadInfoCalculo = () => {
    let data = { CHID: idCalculo };
    calculosServices.infoCalculo(data).then((res) => {
      let mesDescripcion = mes.find(el => el.value === res.RESPONSE.Mes);
      let tipoDescripcion = tipoCalculo.find(el => el.value === res.RESPONSE.idtipo);
      setIdmes(mesDescripcion);
      setIdTipoCalculo(tipoDescripcion);
      setslideropen(false);
    });
  };

  const handleChange = (value: number) => {
    setMonto(Number(value))
  };


  useEffect(() => {
    parametros();
    setNameNewDoc("");
    loadFilter(2);
    loadFilter(15);
    loadFilter(3);
    //loadInfoCalculo();
  }, [idCalculo]);

  useEffect(() => {
    loadInfoCalculo();
  }, [tipoCalculo]);


  return (
    <div>
      <Slider open={slideropen}></Slider>
      <Grid container spacing={1} sx={{}}>
        <Grid item xs={3} md={2.1} lg={2.5}>
          <BtnRegresar onClick={onClickBack} />
        </Grid>
      </Grid>

      <Grid container spacing={1} sx={{ justifyContent: "center" }}>
        <Grid item xs={12} sm={12} md={12} sx={{ textAlign: "center" }}>
          <Typography sx={{ fontFamily: "MontserratMedium" }}>
            {titulo}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={12} md={12}>
          <Grid container spacing={1} sx={{ justifyContent: "center" }}>
            <Grid item xs={6} sm={6} md={6} sx={{ textAlign: "right" }}>
              <Typography sx={{ fontFamily: "MontserratMedium" }}>
                Año:
              </Typography>
            </Grid>
            <Grid item xs={6} sm={6} md={6} sx={{ textAlign: "left" }}>
              <Typography sx={{ fontFamily: "MontserratMedium" }}>
                {year}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={12} md={12}>
          <Grid container spacing={1} sx={{ justifyContent: "center" }}>
            <Grid item xs={6} sm={6} md={6} sx={{ textAlign: "right" }}>
              <Typography sx={{ fontFamily: "MontserratMedium" }}>
                Mes:
              </Typography>
            </Grid>

            <Grid item xs={2} sm={2} md={2} sx={{ textAlign: "left" }}>
              <Typography sx={{ fontFamily: "MontserratMedium" }}>
                {idmes?.label}
              </Typography>


            </Grid>
            <Grid item xs={4} sm={4} md={4}></Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={12} md={12}>
          <Grid container spacing={1} sx={{ justifyContent: "center" }}>
            <Grid item xs={6} sm={6} md={6} sx={{ textAlign: "right" }}>
              <Typography sx={{ fontFamily: "MontserratMedium" }}>
                Tipo de Cálculo:
              </Typography>
            </Grid>
            <Grid item xs={2} sm={2} md={2} sx={{ textAlign: "left" }}>
              {idTipoCalculo?.label}
            </Grid>
            <Grid item xs={4} sm={4} md={4}></Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={12} md={12}>
          <Grid container spacing={1} sx={{ justifyContent: "center" }}>
            <Grid item xs={6} sm={6} md={6} sx={{ textAlign: "right" }}>
              <Typography sx={{ fontFamily: "MontserratMedium" }}>
                Tipo de Ajuste:
              </Typography>
            </Grid>

            <Grid item xs={2} sm={2} md={2} sx={{ textAlign: "left" }}>
              <SelectFrag
                value={idAjustes}
                options={ajustes}
                onInputChange={handleSelect01}
                placeholder={"Seleccione el Ajuste"}
                label={""}
                disabled={false}
              ></SelectFrag>
            </Grid>
            <Grid item xs={4} sm={4} md={4}></Grid>
          </Grid>
        </Grid>



        <Grid item xs={12} sm={12} md={12}
          sx={{
            justifyContent: "center",
            display: clave !== 'ICV' ? 'block' : 'none'
          }}
        >
          <Grid container spacing={1} sx={{ justifyContent: "center" }}>
            <Grid item xs={6} sm={6} md={6} sx={{ textAlign: "right" }}>
              <Typography sx={{ fontFamily: "MontserratMedium" }}>
                Importe:
              </Typography>
            </Grid>
            <Grid item xs={6} sm={6} md={6} sx={{ textAlign: "left" }}>
              <TextFieldFormatoMoneda
                disable={false}
                valor={0}
                handleSetValor={handleChange}
                error={!monto} modo={"moneda"} />

            </Grid>
          </Grid>
        </Grid>




        <Grid item xs={12} sm={12} md={12}
          sx={{
            justifyContent: "center",
            display: labelAjuste === 10 || labelAjuste === 9 || labelAjuste === 8 ? 'block' : 'none'
          }}
        >

          <Grid container spacing={0} >
            <Grid item xs={6} sm={6} md={6} sx={{ textAlign: "right" }}>
              <Typography sx={{ fontFamily: "MontserratMedium" }}>
                Cargar Archivo:
              </Typography>
            </Grid>
            <Grid item xs={6} sm={6} md={6} sx={{ textAlign: "left" }}>
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
          </Grid>
        </Grid>




      <Grid item xs={9} sm={9} md={1} sx={{ textAlign: "center" }}>
        <Button
                    disabled={
                      !monto
                      || idAjustes === "" || idAjustes==="false"
                    }
                    onClick={() => handleSend()}
                    color="primary" fullWidth variant="contained"> <Typography color="white"> Calcular </Typography>
                  </Button>
        </Grid>



    </Grid>
    </div >
  );
};

export default ModalAjuste;
