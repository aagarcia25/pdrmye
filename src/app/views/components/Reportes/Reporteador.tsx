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
import { TextFieldFormatoMoneda } from "../componentes/TextFieldFormatoMoneda";
import SelectFragMulti from "../Fragmentos/SelectFragMulti";

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
  const [total, setTotal] = useState<number>();

  const [trimestreList, setTrimestreList] = useState<SelectValues[]>([]);
  const [idtrimestre, setIdtrimestre] = useState("");

  const [ReporteList, setReporteList] = useState<SelectValues[]>([]);
  const [idreporte, setidreporte] = useState("");

  const [fondos, setFondos] = useState<[]>([]);
  const [idFondo, setIdFondo] = useState<SelectValues[]>([]);

  const handleFilterChange2 = (v: SelectValues[]) => {
    setIdFondo(v);
  };

  const handleChange = (value: number) => {
    setTotal(Number(value));
  };

  const handleFiltroORG = (v: string) => {
    setIdORG(v);
  };

  const handleFilterChangeReporte = (v: string) => {
    setidreporte(v);
    consultaReportes({ CHID: v });
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
        P_TOTAL: total,
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
    let data = {
      NUMOPERACION: tipo,
      CHID: reporte?.id,
      P_DEPENDENCIA: JSON.parse(String(getcontrolInternoEntidad())),
    };
    CatalogosServices.SelectIndex(data).then((res) => {
      if (tipo == 43) {
        setTipoExportacionSelect(res.RESPONSE);
      } else if (tipo == 38) {
        setOrganismos(res.RESPONSE);
        setOpenSlider(false);
      } else if (tipo == 44) {
        setTrimestreList(res.RESPONSE);
        setOpenSlider(false);
      } else if (tipo == 48) {
        setReporteList(res.RESPONSE);
      } else if (tipo == 31) {
        setFondos(res.RESPONSE);
      }
    });
  };

  const consultaReportes = (data: any) => {
    setOpenSlider(true);
    setTotal(0);
    setMes("");
    setIdtrimestre("");
    setAnio("");
    setTipoExportacion("");

    CatalogosServices.reportesAdministracionRelacion(data).then((res) => {
      setReporte(res.RESPONSE[0]);
      setOpenSlider(false);
    });
  };

  useEffect(() => {
    setMeses(fmeses());
    setAnios(fanios());
  }, []);

  useEffect(() => {
    loadFilter(43);
    loadFilter(38);
    loadFilter(44);
    loadFilter(31);
    loadFilter(48);
  }, []);

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
        <Grid container item xs={12} sm={12} md={12} lg={12}>
          <Grid item xs={12} sm={12} md={3} lg={3}>
            <Typography> Listado de Reportes</Typography>
            <SelectFrag
              value={idreporte}
              options={ReporteList}
              onInputChange={handleFilterChangeReporte}
              placeholder={"Seleccione Reporte"}
              label={""}
              disabled={false}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3}>
            <Typography>Exportar</Typography>
            {reporte !== undefined ? (
              <>
                <SelectFrag
                  value={tipoExportacion}
                  options={tipoExportacionSelect}
                  onInputChange={handleSelectTipoExportacion}
                  placeholder={""}
                  label={""}
                  disabled={false}
                />
              </>
            ) : (
              ""
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3}></Grid>
          <Grid item xs={12} sm={12} md={3} lg={3}>
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
      </Grid>

      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
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
              <Grid item xs={12} sm={12} md={3} lg={3}>
                <SelectFragMulti
                  options={fondos}
                  onInputChange={handleFilterChange2}
                  placeholder={"Seleccione Fondo(s)"}
                  label={""}
                  disabled={false}
                />
              </Grid>
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

          {reporte?.Auxiliar == "CPH_11" || reporte?.Auxiliar == "CPH_12" ? (
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

              <Grid item xs={12} sm={12} md={3} lg={3}>
                <TextFieldFormatoMoneda
                  disable={false}
                  valor={0}
                  handleSetValor={handleChange}
                  error={!total}
                  modo={"moneda"}
                />
              </Grid>

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
