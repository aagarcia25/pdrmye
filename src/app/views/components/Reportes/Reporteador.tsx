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

export const Reporteador = () => {
  const [openSlider, setOpenSlider] = useState(false);
  const user: RESPONSE = JSON.parse(String(getUser()));
  const [tipoExportacion, setTipoExportacion] = useState<string>("");
  const [listaReportes, setListaReportes] = useState<IReportes[]>([]);
  const [tipoExportacionSelect, setTipoExportacionSelect] = useState<SelectValues[]>([]);





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


  const handleGenerar = () => {
    AlertS.fire({
      title: "Generando Reporte",
      icon: "info",
    });

    // if (idDepartamento === "" || idPerfil === "" || idDepartamento === undefined || idPerfil === undefined) {
    //   AlertS.fire({
    //     title: "Verificar los campos!, Departamento y Perfil Son Obligatorios",
    //     icon: "warning",
    //   });
    // } else {

    //   setOpenSlider(true);

    //   Swal.fire({
    //     icon: "question",
    //     title: "Modificar Registros?",
    //     showDenyButton: true,
    //     showCancelButton: false,
    //     confirmButtonText: "Confirmar",
    //     denyButtonText: `Cancelar`,
    //   }).then((result) => {
    //     if (result.isConfirmed) {

    //       let dat = {
    //         NUMOPERACION: 9,
    //         CHUSER: user.id,
    //         CHID: idRegistro,
    //         IDDEPARTAMENTO: idDepartamento,
    //         IDPERFIL: idPerfil,
    //         IDURESP: idUresp === undefined ? "" : idUresp
    //       };

    //       AuthService.adminUser(dat).then((res) => {
    //         if (res.SUCCESS) {
    //           setOpenSlider(false);
    //           AlertS.fire({
    //             title: res.RESPONSE,
    //             icon: "success",
    //           }).then((result) => {
    //             if (result.isConfirmed) {
    //               handleClose();
    //             }
    //           });

    //         }
    //         else {
    //           setOpenSlider(false);
    //         }
    //       });
    //     } else if (result.isDenied) {
    //       Swal.fire("Solicitud no Realizada", "", "info");
    //     }
    //   });
    // }
  };

  const consulta = () => {
    let data = {
      IDREPORTE: 4,
    };
    CatalogosServices.TipoExportacion(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "¡Consulta Exitosa!",
        });
        setTipoExportacionSelect(res.RESPONSE);
      } else {
        AlertS.fire({
          title: "¡Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };

  const consultaReportes = (data: any) => {
    CatalogosServices.reportesAdministracionRelacion(data).then((res) => {
      setListaReportes(res.RESPONSE);
      setOpenSlider(false);
    });
  };

  const handleSelectTipoExportacion = (e: any) => {
    setTipoExportacion(e);
  };

  useEffect(() => {
    setMeses(fmeses());
    setAnios(fanios());
    consultaReportes({ CHID: user.idUsuarioCentral, TIPO: 5 });
    consulta();
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
          <Grid item xs={12}>
            <Typography variant="h5" paddingBottom={2}>
              Exportar
            </Typography>

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
          </Grid>
        </Grid>

        <Grid container item xs={12} md={12} lg={9}   >

            {/* GRID PÁRA CADA FILTRO POR SECCION TODAS DE 4 */}
            <Grid container item xs={12} sm={12} md={12} lg={12}>
            <Typography variant="h5" paddingLeft={2} >
              Filtros
            </Typography>


            <Grid container  spacing={2} paddingLeft={2}  item xs={12} sm={12} md={12} lg={12}>
          
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

            <Grid item xs={12} sm={12} md={3} lg={3}>
             
            </Grid>

            <Grid item xs={12} sm={12} md={3} lg={3}>
             
            </Grid>

             </Grid>

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
