import {
  Button,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { AlertS } from "../../../helpers/AlertS";
import { Toast } from "../../../helpers/Toast";
import SelectValues from "../../../interfaces/Select/SelectValues";
import { RESPONSE } from "../../../interfaces/user/UserInfo";
import { CatalogosServices } from "../../../services/catalogosServices";
import { getUser } from "../../../services/localStorage";
import SelectFrag from "../Fragmentos/SelectFrag";
import { Titulo } from "../menu/catalogos/Utilerias/AgregarCalculoUtil/Titulo";
import Slider from "../Slider";
import { IReportes } from "../../../interfaces/menu/menu";
import { fmeses } from "../../../share/loadMeses";
import { fanios } from "../../../share/loadAnios";
import { ReportesServices } from "../../../services/ReportesServices";

export const Reporteador = () => {
  const [openSlider, setOpenSlider] = useState(true);
  const user: RESPONSE = JSON.parse(String(getUser()));
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

  const handleSelectMes = (data: any) => {
    setMes(data);
  };
  const handleFilterChangeAnio = (v: string) => {
    setAnio(v);
  };

  const handleSelectTipoExportacion = (e: any) => {
    setTipoExportacion(e);
  };


  const handleGenerar = () => {
   let flag= true;
      if( tipoExportacion ===""){
          AlertS.fire({
                       title: "Es obligatorio el tipo de exportación",
                       icon: "warning",
                     });
                     flag= false;
      }
      
      if(flag){
        setOpenSlider(true);

        const params = {
          P_ANIO:anio,
          P_MES: mes,
        };

        let data = {
          CHID: reporte?.id,
          FORMATO: tipoExportacion,
          PARAMETROS : params
        };
        ReportesServices.handleReport(data, reporte?.Nombre +'.'+tipoExportacion).then((res) => {
        setOpenSlider(false);
        });

      }



 
  };



  const loadFilter = (tipo: number) => {

    let data = { NUMOPERACION: tipo ,CHID:reporte?.id};
    CatalogosServices.SelectIndex(data).then((res) => {
      if (tipo === 43) {
        setTipoExportacionSelect(res.RESPONSE);
      }
    });
   
  };
  

  const handleReporte = (data: IReportes) => {
    setReporte(data);
    loadFilter(43);
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
    consultaReportes({ CHID: user.idUsuarioCentral, TIPO: 5 });
  }, []);

  return (
    <div>
      <Slider open={openSlider}></Slider>
      <Titulo name={"Módulo de Generación de Reportes"}></Titulo>
      <Grid container sx={{ justifyContent: "center" }}>
        <Grid container item xs={12} md={2} lg={2} sx={{ textAlign: "center" }}>
          <div className="containerReporteadorLista">
            <Typography variant="h5" paddingBottom={2}>
              Listado de Reportes
            </Typography>
            <List>
              <ListItem disablePadding>
                {listaReportes.map((item, index) => {
                  return (
                    <>
                      <Divider />
                      <ListItemButton
                        className="itemMenu"
                        key={index}
                        sx={{ pl: 4 }}
                      >
                        <ListItemText
                          key={index}
                          primary={
                            <>
                              <Tooltip title={item.Descripcion}>
                                <Typography
                                  variant="h5"
                                  className="menu-Typography"
                                  gutterBottom
                                >
                                  {item.Nombre}
                                </Typography>
                              </Tooltip>
                            </>
                          }
                          onClick={() => handleReporte(item)}
                        />
                      </ListItemButton>
                      <Divider />
                    </>
                  );
                })}
              </ListItem>
            </List>
          </div>
        </Grid>

        <Grid container item xs={12} md={1} lg={1} sx={{ textAlign: "center" }}>
          <Grid item xs={12} >
            <Typography variant="h5" paddingBottom={2}>
              Exportar
            </Typography>
            {reporte !== undefined ? (
              <>
                <Grid paddingTop={2}>
                  <SelectFrag
                    value={tipoExportacion}
                    options={tipoExportacionSelect}
                    onInputChange={handleSelectTipoExportacion}
                    placeholder={""}
                    label={""}
                    disabled={false}
                  />
                </Grid>

                <Grid
                  paddingTop={2}
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  sx={{ textAlign: "center" }}
                >
                  <Button
                    className="guardar"
                    color="info"
                    onClick={() => handleGenerar()}
                  >
                    {"Generar"}
                  </Button>
                </Grid>
              </>
            ) : (
              ""
            )}
          </Grid>
        </Grid>

        <Grid container item xs={12} md={12} lg={9}>
          {/* GRID PÁRA CADA FILTRO POR SECCION TODAS DE 4 */}
          <Grid container item xs={12} sm={12} md={12} lg={12}>
            <Typography variant="h5" paddingLeft={2}>
              Filtros
            </Typography>

            {reporte?.Auxiliar == "CPH_01" ? (
              <Grid
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
                    value={mes}
                    options={meses}
                    onInputChange={handleSelectMes}
                    placeholder={"Seleccione Mes"}
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
