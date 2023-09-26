import { Button, Grid } from "@mui/material";
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
import SelectFrag from "../Fragmentos/SelectFrag";
import SelectFragMulti from "../Fragmentos/SelectFragMulti";
import SliderProgress from "../SliderProgress";
import { TextFieldFormatoMoneda } from "../componentes/TextFieldFormatoMoneda";
import { Titulo } from "../menu/catalogos/Utilerias/AgregarCalculoUtil/Titulo";

export const Reporteador = () => {
  const [openSlider, setOpenSlider] = useState(true);
  const [disableMes, setdisableMes] = useState(false);
  const [disableTrimestre, setdisableTrimestre] = useState(false);

  const user: USUARIORESPONSE = JSON.parse(String(getUser()));

  //Listado de reporte
  const [idReport, setidReport] = useState<string>("");
  const [ListReport, setListReport] = useState<SelectValues[]>([]);

  const [listaReportes, setListaReportes] = useState<IReportes[]>([]);
  const [tipoExportacion, setTipoExportacion] = useState<string>("");
  const [tipoExportacionSelect, setTipoExportacionSelect] = useState<
    SelectValues[]
  >([]);

  const [reporte, setReporte] = useState<IReportes>();

  const [anios, setAnios] = useState<SelectValues[]>([]);
  const [anio, setAnio] = useState<string>("");
  const [organismos, setOrganismos] = useState<SelectValues[]>([]);
  const [idORG, setIdORG] = useState("");
  const [total, setTotal] = useState<number>(0);

  // trimestre multi
  const [trimestreList, setTrimestreList] = useState<[]>([]);
  const [idtrimestre, setIdtrimestre] = useState<SelectValues[]>([]);

  // mes multifiltro
  const [meses, setMeses] = useState<[]>([]);
  const [mes, setMes] = useState<SelectValues[]>([]);
  // mes multifiltro
  const [idFondo, setIdFondo] = useState<SelectValues[]>([]);
  const [fondos, setFondos] = useState<[]>([]);

  const handleListReport = (v: string) => {
    setdisableMes(false);
    setdisableTrimestre(false);
    setTotal(0);
    setMes([]);
    setIdtrimestre([]);
    setAnio("");
    setTipoExportacion("");
    setidReport(v);
    consultaReportes({
      P_DEPENDENCIA: JSON.parse(String(getcontrolInternoEntidad())),
      CHID: v,
    });
  };

  const handleFilterChange2 = (v: SelectValues[]) => {
    setIdFondo(v);
  };

  const handleChange = (value: number) => {
    setTotal(Number(value));
  };

  const handleFiltroORG = (v: string) => {
    setIdORG(v);
  };

  const handleSelectMes = (v: SelectValues[]) => {
    setMes(v);
    if (v.length > 0) {
      setdisableTrimestre(true);
    } else {
      setdisableTrimestre(false);
    }
  };
  const handleFilterChangeAnio = (v: string) => {
    setAnio(v);
  };
  const handleFilterChangetrimeste = (v: SelectValues[]) => {
    setIdtrimestre(v);
    if (v.length > 0) {
      setdisableMes(true);
    } else {
      setdisableMes(false);
    }
  };

  const handleSelectTipoExportacion = (e: any) => {
    setTipoExportacion(e);
  };

  const handleGenerar = () => {
    setOpenSlider(true);
    let flag = true;
    if (tipoExportacion == "" || tipoExportacion == "false") {
      AlertS.fire({
        title: "Es obligatorio el tipo de exportación",
        icon: "warning",
      });
      flag = false;
      setOpenSlider(false);
    }

    if (reporte?.Auxiliar == "CPH_01" || reporte?.Auxiliar == "CPH_03") {
      if (anio == "" || anio == "false") {
        AlertS.fire({
          title: "Es obligatorio el Año",
          icon: "warning",
        });
        flag = false;
        setOpenSlider(false);
      }
    }

    if (reporte?.Auxiliar == "CPH_02") {
      if (anio == "" || anio == "false") {
        AlertS.fire({
          title: "Es obligatorio el Año",
          icon: "warning",
        });
        flag = false;
        setOpenSlider(false);
      } else if (idFondo.length > 1) {
        AlertS.fire({
          title: "Solo se Permite un Fondo para este reporte",
          icon: "warning",
        });
        flag = false;
        setOpenSlider(false);
      } else if (idFondo.length == 0) {
        AlertS.fire({
          title: "Es Obligatorio seleccionar el Fondo",
          icon: "warning",
        });
        flag = false;
        setOpenSlider(false);
      } else if (total == 0) {
        AlertS.fire({
          title: "Es Obligatorio la cantidad ",
          icon: "warning",
        });
        flag = false;
        setOpenSlider(false);
      }
    }

    if (reporte?.Auxiliar == "CPH_04") {
      if (anio == "" || anio == "false") {
        AlertS.fire({
          title: "Es obligatorio el Año",
          icon: "warning",
        });
        flag = false;
        setOpenSlider(false);
      } else if (idFondo.length > 1) {
        AlertS.fire({
          title: "Solo se Permite un Fondo para este reporte",
          icon: "warning",
        });
        flag = false;
        setOpenSlider(false);
      } else if (mes.length == 0) {
        AlertS.fire({
          title: "Es obligatorio el Mes",
          icon: "warning",
        });
        flag = false;
        setOpenSlider(false);
      } else if (mes.length > 1) {
        AlertS.fire({
          title: "Solo se Permite un Mes",
          icon: "warning",
        });
        flag = false;
        setOpenSlider(false);
      }
    }

    if (flag) {
      let data = {
        CHID: reporte?.id,
        FORMATO: tipoExportacion,
        AUXILIAR: reporte?.Auxiliar,
        P_ANIO: anio,
        P_PERIODO: idtrimestre,
        P_MES: mes,
        P_FONDO: idFondo,
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

  const loadFilter = (
    tipo: number,
    tipofondo?: string,
    federal?: string,
    id?: string
  ) => {
    let data = {
      NUMOPERACION: tipo,
      CHID: id,
      P_DEPENDENCIA: JSON.parse(String(getcontrolInternoEntidad())),
      P_TIPO: tipofondo,
      P_FEDERAL: federal,
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
      } else if (tipo == 2) {
        setMeses(res.RESPONSE);
      } else if (tipo == 49) {
        setAnios(res.RESPONSE);
      } else if (tipo == 48) {
        setListReport(res.RESPONSE);
      } else if (tipo == 50) {
        setFondos(res.RESPONSE);
      }
    });
  };

  const consultaReportes = (data: any) => {
    setOpenSlider(true);
    CatalogosServices.reportesAdministracionRelacion(data).then((res) => {
      setReporte(res.RESPONSE[0]);
      loadFilter(43, "", "", res.RESPONSE[0]?.id);
      if (res.RESPONSE[0]?.Auxiliar == "CPH_01") {
        loadFilter(50, "c79a2db3-2b0c-11ed-afdb-040300000000", "1");
      } else if (res.RESPONSE[0]?.Auxiliar == "CPH_02") {
        loadFilter(50, "dc9c84ff-2b0c-11ed-afdb-040300000000", "1");
      } else if (res.RESPONSE[0]?.Auxiliar == "CPH_03") {
        loadFilter(50, "d5c9a65b-2b0c-11ed-afdb-040300000000", "0");
      } else if (res.RESPONSE[0]?.Auxiliar == "CPH_04") {
        loadFilter(50, "e7179b31-2b0c-11ed-afdb-040300000000", "0");
      }

      setOpenSlider(false);
    });
  };

  useEffect(() => {
    loadFilter(2);
    loadFilter(38);
    loadFilter(49);
    loadFilter(48);
    loadFilter(44);
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
        <Grid container item xs={12} sm={12} md={12} lg={3}>
          <SelectFrag
            value={idReport}
            options={ListReport}
            onInputChange={handleListReport}
            placeholder={"Seleccione el Reporte.."}
            label={""}
            disabled={false}
          />
        </Grid>

        <Grid container item xs={12} sm={12} md={12} lg={9}>
          {reporte?.Auxiliar == "CPH_01" || reporte?.Auxiliar == "CPH_03" ? (
            <>
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
                    value={tipoExportacion}
                    options={tipoExportacionSelect}
                    onInputChange={handleSelectTipoExportacion}
                    placeholder={"Seleccione el Tipo de Exportación.."}
                    label={""}
                    disabled={false}
                  />
                </Grid>

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

                <Grid item xs={12} sm={12} md={3} lg={3}></Grid>
              </Grid>

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
                  <SelectFragMulti
                    options={trimestreList}
                    onInputChange={handleFilterChangetrimeste}
                    placeholder={"Seleccione Trimestre"}
                    label={""}
                    disabled={disableTrimestre}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={3} lg={3}>
                  <SelectFragMulti
                    options={meses}
                    onInputChange={handleSelectMes}
                    placeholder={"Seleccione Mes"}
                    label={""}
                    disabled={disableMes}
                  />
                </Grid>
              </Grid>

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
                  <SelectFragMulti
                    options={fondos}
                    onInputChange={handleFilterChange2}
                    placeholder={"Seleccione Fondo(s)"}
                    label={""}
                    disabled={false}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={3} lg={3}></Grid>

                <Grid item xs={12} sm={12} md={3} lg={3}></Grid>
              </Grid>
            </>
          ) : (
            ""
          )}

          {reporte?.Auxiliar == "CPH_02" ? (
            <>
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
                    value={tipoExportacion}
                    options={tipoExportacionSelect}
                    onInputChange={handleSelectTipoExportacion}
                    placeholder={"Seleccione el Tipo de Exportación.."}
                    label={""}
                    disabled={false}
                  />
                </Grid>

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

                <Grid item xs={12} sm={12} md={3} lg={3}></Grid>
              </Grid>

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
                  <SelectFragMulti
                    options={fondos}
                    onInputChange={handleFilterChange2}
                    placeholder={"Seleccione Fondo(s)"}
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
              </Grid>

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
                <Grid item xs={12} sm={12} md={3} lg={3}></Grid>

                <Grid item xs={12} sm={12} md={3} lg={3}></Grid>

                <Grid item xs={12} sm={12} md={3} lg={3}></Grid>
              </Grid>
            </>
          ) : (
            ""
          )}

          {reporte?.Auxiliar == "CPH_04" ? (
            <>
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
                    value={tipoExportacion}
                    options={tipoExportacionSelect}
                    onInputChange={handleSelectTipoExportacion}
                    placeholder={"Seleccione el Tipo de Exportación.."}
                    label={""}
                    disabled={false}
                  />
                </Grid>

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

                <Grid item xs={12} sm={12} md={3} lg={3}></Grid>
              </Grid>

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
                  <SelectFragMulti
                    options={meses}
                    onInputChange={handleSelectMes}
                    placeholder={"Seleccione Mes"}
                    label={""}
                    disabled={disableMes}
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
            </>
          ) : (
            ""
          )}

          {/* {reporte?.Auxiliar == "CPH_02" ? (
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
          )} */}

          {/* {reporte?.Auxiliar == "CPH_03" ||
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
          )} */}

          {/* {reporte?.Auxiliar == "CPH_11" || reporte?.Auxiliar == "CPH_12" ? (
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
          )} */}
        </Grid>
      </Grid>
    </div>
  );
};
