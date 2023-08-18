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
import SelectValues from "../../../interfaces/Select/SelectValues";
import { IReportes } from "../../../interfaces/menu/menu";
import { USUARIORESPONSE } from "../../../interfaces/user/UserInfo";
import { CatalogosServices } from "../../../services/catalogosServices";
import { getUser } from "../../../services/localStorage";
import { getHeaderInfoReporte } from "../../../services/tokenCreator";
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
    if (tipoExportacion === "") {
      AlertS.fire({
        title: "Es obligatorio el tipo de exportación",
        icon: "warning",
      });
      flag = false;
      setOpenSlider(false);
    }

    if (flag) {
      const params = {
        P_ANIO: anio,
        P_MES: mes,
        P_ID_ORGANISMO: idORG,
        P_PERIODO: idtrimestre,
      };

      let data = {
        CHID: reporte?.id,
        FORMATO: tipoExportacion,
        PARAMETROS: params,
      };

      try {
        let header = getHeaderInfoReporte();
        axios
          .post(
            process.env.REACT_APP_APPLICATION_BASE_URL + "handleReport",
            data,
            { responseType: "blob" }
          )
          .then((response) => {
            const blobStore = new Blob([response.data], {
              type: "application/" + tipoExportacion,
            });
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blobStore);
            link.download = reporte?.Nombre + "." + tipoExportacion;
            link.click();
            setOpenSlider(false);
          })
          .catch((error) => {
            setOpenSlider(false);
            console.log(error);
            AlertS.fire({
              title: "Error en la Generación de Reporte",
              icon: "warning",
            });
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
      if (tipo === 43) {
        setTipoExportacionSelect(res.RESPONSE);
      } else if (tipo === 38) {
        setOrganismos(res.RESPONSE);
        setOpenSlider(false);
      } else if (tipo === 44) {
        setTrimestreList(res.RESPONSE);
        setOpenSlider(false);
      }
    });
  };

  const handleReporte = (data: IReportes) => {
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
    consultaReportes({ P_DEPENDENCIA: user.controlinternodependencia });
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
      <Grid container sx={{ justifyContent: "center" }}>
        <Grid container item xs={12} md={3} lg={3} sx={{ textAlign: "center" }}>
          <Typography variant="h5" paddingBottom={2}>
            Listado de Reportes
          </Typography>

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
        </Grid>

        <Grid container item xs={12} md={1} lg={1} sx={{ textAlign: "center" }}>
          <Grid container item xs={12} sm={12} md={12} lg={12}>
            <Typography variant="h5" paddingBottom={2}>
              Exportar
            </Typography>
            {reporte !== undefined ? (
              <>
                <Grid container item xs={12} sm={12} md={12} lg={12}>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
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

          <Grid container item xs={12} sm={12} md={12} lg={12}>
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

        <Grid container item xs={12} md={8} lg={8} sx={{ textAlign: "center" }}>
          {/* GRID PÁRA CADA FILTRO POR SECCION TODAS DE 4 */}
          <Grid container item xs={12} sm={12} md={12} lg={12}>
            <Typography variant="h5" paddingLeft={2}>
              Filtros
            </Typography>

            {reporte?.Auxiliar == "CPH_01" ? (
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

            {reporte?.Auxiliar == "CPH_03" ? (
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

            {reporte?.Auxiliar == "ORG_01" ? (
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
                    value={idORG}
                    options={organismos}
                    onInputChange={handleFiltroORG}
                    placeholder={"Seleccione Organismos"}
                    label={""}
                    disabled={false}
                  />
                </Grid>

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

            {reporte?.Auxiliar == "ORG_02" ? (
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
                    value={idORG}
                    options={organismos}
                    onInputChange={handleFiltroORG}
                    placeholder={"Seleccione Organismos"}
                    label={""}
                    disabled={false}
                  />
                </Grid>

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
              </Grid>
            ) : (
              ""
            )}

            {/* <Grid container item xs={12} sm={12} md={12} lg={12}>
            <Grid item xs={12} sm={12} md={3} lg={3}>
              ds
            </Grid>

            <Grid item xs={12} sm={12} md={3} lg={3}>
              sds
            </Grid>

            <Grid item xs={12} sm={12} md={3} lg={3}>
              ds
            </Grid>

            <Grid item xs={12} sm={12} md={3} lg={3}>
              ds
            </Grid>

          </Grid> */}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
