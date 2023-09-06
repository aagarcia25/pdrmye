import {
  Button,
  Grid,
  MenuItem,
  MenuList,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { AlertS } from "../../../helpers/AlertS";
import { base64ToArrayBuffer } from "../../../helpers/Files";
import SelectValues from "../../../interfaces/Select/SelectValues";
import { IReportes } from "../../../interfaces/menu/menu";
import { USUARIORESPONSE } from "../../../interfaces/user/UserInfo";
import { CatalogosServices } from "../../../services/catalogosServices";
import {
  getUser,
  getcontrolInternoEntidad,
} from "../../../services/localStorage";
import { fanios } from "../../../share/loadAnios";
import { fmeses } from "../../../share/loadMeses";
import SelectFrag from "../Fragmentos/SelectFrag";
import SliderProgress from "../SliderProgress";
import { Titulo } from "../menu/catalogos/Utilerias/AgregarCalculoUtil/Titulo";

export const Reporteador = () => {
  const [openSlider, setOpenSlider] = useState(true);
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));
  const [tipoExportacion, setTipoExportacion] = useState<string>("");
  const [listaReportes, setListaReportes] = useState<IReportes[]>([]);
  const [tipoExportacionSelect, setTipoExportacionSelect] = useState<
    SelectValues[]
  >([]);
  const [reporte, setReporte] = useState<IReportes>();
  const [meses, setMeses] = useState<SelectValues[]>([]);
  const [mes, setMes] = useState<string>("");
  const [anios, setAnios] = useState<SelectValues[]>([]);
  const [anio, setAnio] = useState<string>("");
  const [organismos, setOrganismos] = useState<SelectValues[]>([]);
  const [idORG, setIdORG] = useState("");

  const [trimestreList, setTrimestreList] = useState<SelectValues[]>([]);
  const [idtrimestre, setIdtrimestre] = useState("");

  const handleFiltroORG = (v: string) => {
    setIdORG(v);
  };

  const handleSelectMes = (data: any) => {
    setMes(data);
  };
  const handleFilterChangeAnio = (v: string) => {
    setAnio(v);
  };
  const handleFilterChangetrimeste = (v: string) => {
    setIdtrimestre(v);
  };

  const handleSelectTipoExportacion = (e: any) => {
    setTipoExportacion(e);
  };

  const handleGenerar = () => {
    setOpenSlider(true);
    let flag = true;
    if (tipoExportacion == "") {
      AlertS.fire({
        title: "Es obligatorio el tipo de exportación",
        icon: "warning",
      });
      flag = false;
      setOpenSlider(false);
    }

    if (flag) {
      let data = {
        CHID: reporte?.id,
        FORMATO: tipoExportacion,
        AUXILIAR: reporte?.Auxiliar,
        P_ANIO: anio,
        P_MES: mes,
        P_ID_ORGANISMO: idORG,
        P_PERIODO: idtrimestre,
      };

      try {
        let config = {
          method: "post",
          maxBodyLength: Infinity,
          url: process.env.REACT_APP_APPLICATION_BASE_URL + "handleReport",
          headers: {
            "Content-Type": "application/json",
            responseType: "blob",
          },
          data: data,
        };

        axios
          .request(config)
          .then((response) => {
            var bufferArray = base64ToArrayBuffer(
              String(response.data.RESPONSE)
            );
            var blobStore = new Blob([bufferArray], {
              type: "application/*",
            });

            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blobStore);
            link.download = reporte?.Nombre + "." + tipoExportacion;
            link.click();
            setOpenSlider(false);
          })
          .catch((error) => {
            console.log(error);
            setOpenSlider(false);
          });
      } catch (err: any) {
        setOpenSlider(false);
        console.log(err);
      }
    }
  };

  const loadFilter = (tipo: number) => {
    let data = { NUMOPERACION: tipo, CHID: reporte?.id };
    CatalogosServices.SelectIndex(data).then((res) => {
      if (tipo == 43) {
        setTipoExportacionSelect(res.RESPONSE);
      } else if (tipo == 38) {
        setOrganismos(res.RESPONSE);
        setOpenSlider(false);
      } else if (tipo == 44) {
        setTrimestreList(res.RESPONSE);
        setOpenSlider(false);
      }
    });
  };

  const handleReporte = (data: IReportes) => {
    setMes("");
    setIdtrimestre("");
    setAnio("");
    setTipoExportacion("");
    setReporte(data);
  };

  const consultaReportes = (data: any) => {
    setOpenSlider(true);
    CatalogosServices.reportesAdministracionRelacion(data).then((res) => {
      setListaReportes(res.RESPONSE);
      setOpenSlider(false);
    });
  };

  useEffect(() => {
    setMeses(fmeses());
    setAnios(fanios());
    consultaReportes({
      P_DEPENDENCIA: JSON.parse(String(getcontrolInternoEntidad())),
    });
  }, []);

  useEffect(() => {
    loadFilter(43);
    loadFilter(38);
    loadFilter(44);
  }, [reporte]);

  return (
    <div>
      <SliderProgress open={openSlider} mensaje={"Generando Reporte"} />
      <Titulo name={"Módulo de Generación de Reportes"}></Titulo>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Grid container item xs={12} sm={12} md={12} lg={4}>
          Listado de Reportes
        </Grid>
        <Grid container item xs={12} sm={12} md={12} lg={5}>
          <Typography>Exportar</Typography>
          {reporte !== undefined ? (
            <>
              <Grid container item xs={12} sm={12} md={12} lg={12}>
                <Grid item xs={12} sm={12} md={12} lg={6}>
                  <SelectFrag
                    value={tipoExportacion}
                    options={tipoExportacionSelect}
                    onInputChange={handleSelectTipoExportacion}
                    placeholder={""}
                    label={""}
                    disabled={false}
                  />
                </Grid>
              </Grid>
            </>
          ) : (
            ""
          )}
        </Grid>
        <Grid container item xs={12} sm={12} md={12} lg={1}></Grid>
        <Grid container item xs={12} sm={12} md={12} lg={2}>
          {reporte !== undefined ? (
            <>
              <Button
                className="guardar"
                color="info"
                onClick={() => handleGenerar()}
              >
                {"Generar"}
              </Button>
            </>
          ) : (
            ""
          )}
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Grid container item xs={12} sm={12} md={12} lg={4}>
          <div className="center-col" style={{ height: 400 }}>
            <MenuList>
              {listaReportes.map((item, index) => (
                <Tooltip title={item.Descripcion}>
                  <MenuItem
                    className="menu-Typography-report"
                    onClick={() => handleReporte(item)}
                  >
                    {item.Nombre}
                  </MenuItem>
                </Tooltip>
              ))}
            </MenuList>
          </div>
        </Grid>

        <Grid container item xs={12} sm={12} md={12} lg={8}>
          {reporte?.Auxiliar == "CPH_01" ? (
            <Grid
              paddingTop={1}
              container
              spacing={2}
              paddingLeft={2}
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
            >
              <Grid item xs={12} sm={12} md={3} lg={3}>
                <SelectFrag
                  value={anio}
                  options={anios}
                  onInputChange={handleFilterChangeAnio}
                  placeholder={"Seleccione Año"}
                  label={""}
                  disabled={false}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={3} lg={3}></Grid>

              <Grid item xs={12} sm={12} md={3} lg={3}></Grid>
            </Grid>
          ) : (
            ""
          )}

          {reporte?.Auxiliar == "CPH_02" ? (
            <Grid
              paddingTop={3}
              container
              spacing={2}
              paddingLeft={2}
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
            >
              <Grid item xs={12} sm={12} md={3} lg={3}>
                <SelectFrag
                  value={anio}
                  options={anios}
                  onInputChange={handleFilterChangeAnio}
                  placeholder={"Seleccione Año"}
                  label={""}
                  disabled={false}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={3} lg={3}>
                <SelectFrag
                  value={idtrimestre}
                  options={trimestreList}
                  onInputChange={handleFilterChangetrimeste}
                  placeholder={"Seleccione Trimestre"}
                  label={""}
                  disabled={false}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={3} lg={3}></Grid>

              <Grid item xs={12} sm={12} md={3} lg={3}></Grid>
            </Grid>
          ) : (
            ""
          )}

          {reporte?.Auxiliar == "CPH_03" ||
          reporte?.Auxiliar == "CPH_04" ||
          reporte?.Auxiliar == "CPH_08" ||
          reporte?.Auxiliar == "CPH_13" ||
          reporte?.Auxiliar == "CPH_14" ||
          reporte?.Auxiliar == "CPH_15" ||
          reporte?.Auxiliar == "CPH_07" ? (
            <Grid
              paddingTop={3}
              container
              spacing={2}
              paddingLeft={2}
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
            >
              <Grid item xs={12} sm={12} md={3} lg={3}>
                <SelectFrag
                  value={anio}
                  options={anios}
                  onInputChange={handleFilterChangeAnio}
                  placeholder={"Seleccione Año"}
                  label={""}
                  disabled={false}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={3} lg={3}>
                <SelectFrag
                  value={mes}
                  options={meses}
                  onInputChange={handleSelectMes}
                  placeholder={"Seleccione Mes"}
                  label={""}
                  disabled={false}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={3} lg={3}></Grid>

              <Grid item xs={12} sm={12} md={3} lg={3}></Grid>
            </Grid>
          ) : (
            ""
          )}
        </Grid>
      </Grid>
    </div>
  );
};
