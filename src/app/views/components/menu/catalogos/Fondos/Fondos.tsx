import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Box, Grid, IconButton, Tooltip } from "@mui/material";
import { GridColDef, GridSelectionModel } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AlertS } from "../../../../../helpers/AlertS";
import { Toast } from "../../../../../helpers/Toast";
import {
  PERMISO,
  USUARIORESPONSE,
} from "../../../../../interfaces/user/UserInfo";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import { getPermisos, getUser } from "../../../../../services/localStorage";
import MUIXDataGridMun from "../../../MUIXDataGridMun";
import BotonesAcciones from "../../../componentes/BotonesAcciones";
import NombreCatalogo from "../../../componentes/NombreCatalogo";
import ButtonsMunBase from "../Utilerias/ButtonsMunBase";
import FondosModal from "./FondosModal";
import FondosTipoView from "./FondosTipoView";
import FondosView from "./FondosView";
const Fondos = () => {
  const [modo, setModo] = useState("");
  const [open, setOpen] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openViewAjustes, setOpenViewAjustes] = useState(false);
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));
  const [vrows, setVrows] = useState({});
  const [fondos, setFondos] = useState([]);
  const [nombreMenu, setNombreMenu] = useState("");
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [agregar, setAgregar] = useState<boolean>(false);
  const [editar, setEditar] = useState<boolean>(false);
  const [eliminar, setEliminar] = useState<boolean>(false);
  const [view, setView] = useState<boolean>(false);
  const [selectionModel, setSelectionModel] =
    React.useState<GridSelectionModel>([]);

  const columns: GridColDef[] = [
    {
      field: "id",
      hide: true,
      hideable: false,
    },

    {
      field: "acciones",
      disableExport: true,
      headerName: "Acciones",
      description: "Campo de Acciones",
      sortable: false,
      width: 200,
      renderCell: (v) => {
        return (
          <Grid container>
            <BotonesAcciones
              handleAccion={handleAccion}
              row={v}
              editar={editar}
              eliminar={eliminar}
            ></BotonesAcciones>

            {view ? (
              <Tooltip title={"Visualizar Ajustes"}>
                <IconButton onClick={() => handleView(v)}>
                  <RemoveRedEyeIcon />
                </IconButton>
              </Tooltip>
            ) : (
              ""
            )}

            {view ? (
              <Tooltip title={"Visualizar Tipo de Cálculos"}>
                <IconButton onClick={() => handleViewAjustes(v)}>
                  <MiscellaneousServicesIcon />
                </IconButton>
              </Tooltip>
            ) : (
              ""
            )}
          </Grid>
        );
      },
    },
    {
      field: "FechaCreacion",
      headerName: "Fecha Creación",
      description: "Fecha Creación",
      width: 180,
    },
    { field: "Clave", headerName: "Clave", description: "Clave", width: 150 },
    {
      field: "Descripcion",
      headerName: "Descripción",
      description: "Descripción",
      width: 450,
    },
    {
      field: "AplicaCalculo",
      headerName: "Aplica Cálculo",
      description: "Aplica Cálculo",
      width: 120,
      renderCell: (v) => {
        return <Box>{v.row.AplicaCalculo === 1 ? "SI" : "No"}</Box>;
      },
    },
    {
      field: "Vigente",
      headerName: "Vigente",
      description: "Vigente",
      width: 100,
      renderCell: (v) => {
        return <Box>{v.row.Vigente === 1 ? "SI" : "No"}</Box>;
      },
    },
    {
      field: "Estatal",
      headerName: "Estatal",
      description: "Estatal",
      width: 100,
      renderCell: (v) => {
        return <Box>{v.row.Estatal === 1 ? "SI" : "No"}</Box>;
      },
    },
    {
      field: "Federal",
      headerName: "Federal",
      description: "Federal",
      width: 100,
      renderCell: (v) => {
        return <Box>{v.row.Federal === 1 ? "SI" : "No"}</Box>;
      },
    },
    { field: "idtipo", hide: true },
    { field: "dtipo", headerName: "Tipo", description: "Tipo", width: 250 },
    {
      field: "PorcentajeDistribucion	",
      headerName: "Porcentaje De Distribución",
      description: "Porcentaje De Distribución",
      width: 150,
    },
    {
      field: "Garantia",
      headerName: "Garantía",
      description: "Garantía	",
      width: 80,
    },
    {
      field: "Articulo",
      headerName: "Articulo",
      description: "Articulo	",
      width: 150,
    },
    {
      field: "Comentarios",
      headerName: "Comentarios",
      hide: true,
      hideable: false,
    },
    {
      field: "NumProyecto",
      headerName: "Número De Proyecto",
      description: "Número De Proyecto	",
      width: 150,
    },
    {
      field: "ConceptoEgreso",
      headerName: "Concepto De Egreso",
      description: "Concepto De Egreso",
      width: 150,
    },
    {
      field: "Clasificador01",
      headerName: "Administrativo",
      description: "Administrativo	",
      width: 150,
    },
    {
      field: "Clasificador02",
      headerName: "Funcional",
      description: "Funcional",
      width: 150,
    },
    {
      field: "Clasificador03",
      headerName: "Programático",
      description: "Programático	",
      width: 150,
    },
    {
      field: "Clasificador04",
      headerName: "Objeto De Gasto (Partida)",
      description: "Objeto De Gasto (Partida)",
      width: 150,
    },
    {
      field: "Clasificador05",
      headerName: "Tipo De Gasto",
      description: "Tipo De Gasto",
      width: 150,
    },
    {
      field: "Clasificador06",
      headerName: "Fuente De Financiamiento",
      description: "Fuente De Financiamiento",
      width: 150,
    },
    {
      field: "Clasificador07",
      headerName: "Ramo-Fondoi Convenio",
      description: "Ramo-Fondoi Convenio",
      width: 150,
    },
    {
      field: "Clasificador08",
      headerName: "Año Del Recurso",
      description: "Año Del Recurso",
      width: 150,
    },
    {
      field: "Clasificador09",
      headerName: "Control Interno",
      description: "Control Interno",
      width: 150,
    },
    {
      field: "Clasificador10",
      headerName: "Geográfica",
      description: "Geográfica",
      width: 150,
    },
    {
      field: "Clasificador11",
      headerName: "Proyecto/Programa",
      description: "Proyecto/Programa",
      width: 150,
    },
    {
      field: "ClasificacionOP",
      headerName: "Clasificación OP",
      description: "Clasificación OP",
      width: 150,
    },
    { field: "Orden	", hide: true },
  ];
  const handleAccion = (v: any) => {
    if (v.tipo === 1) {
      setTipoOperacion(2);
      setModo("Editar Registro");
      setOpen(true);
      setVrows(v.data);
    } else if (v.tipo === 2) {
      handleDelete(v.data);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setOpenView(false);
    setOpenViewAjustes(false);
    consulta();
  };

  const handleView = (v: any) => {
    setOpenView(true);
    setVrows(v);
  };

  const handleViewAjustes = (v: any) => {
    setOpenViewAjustes(true);
    setVrows(v);
  };

  const handleOpen = (accion: any) => {
    if (accion === 1) {
      setTipoOperacion(1);
      setModo("Agregar Registro");
      setOpen(true);
      setVrows("");
    }
    if (accion === 2) {
      if (selectionModel.length !== 0) {
        Swal.fire({
          icon: "question",
          title: selectionModel.length + " Registros Se Eliminaran!!",
          showDenyButton: true,
          showCancelButton: false,
          confirmButtonText: "Confirmar",
          denyButtonText: `Cancelar`,
        }).then((result) => {
          if (result.isConfirmed) {
            let data = {
              NUMOPERACION: 7,
              OBJS: selectionModel,
              CHUSER: user.Id,
            };
            //console.log(data);

            CatalogosServices.fondos(data).then((res) => {
              if (res.SUCCESS) {
                Toast.fire({
                  icon: "success",
                  title: "Borrado!",
                });

                consulta();
              } else {
                AlertS.fire({
                  title: "¡Error!",
                  text: res.STRMESSAGE,
                  icon: "error",
                });
              }
            });
          } else if (result.isDenied) {
            Swal.fire("No se realizaron cambios", "", "info");
          }
        });
      } else {
        Swal.fire({
          icon: "warning",
          title: "Seleccione Registros Para Borrar",
          confirmButtonText: "Aceptar",
        });
      }
    }
  };

  const handleBorrar = (v: any) => {
    setSelectionModel(v);
  };

  const handleDelete = (v: any) => {
    Swal.fire({
      icon: "question",
      title: "¿Estás seguro de eliminar este registro?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Confirmar",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        //console.log(v);

        let data = {
          NUMOPERACION: 3,
          CHID: v.row.id,
          CHUSER: user.Id,
        };
        //console.log(data);

        CatalogosServices.fondos(data).then((res) => {
          if (res.SUCCESS) {
            Toast.fire({
              icon: "success",
              title: "¡Registro Eliminado!",
            });

            consulta();
          } else {
            AlertS.fire({
              title: "¡Error!",
              text: res.STRMESSAGE,
              icon: "error",
            });
          }
        });
      } else if (result.isDenied) {
        Swal.fire("No se realizaron cambios", "", "info");
      }
    });
  };

  const consulta = () => {
    let data = {
      NUMOPERACION: 4,
    };
    CatalogosServices.fondos(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "¡Consulta Exitosa!",
        });
        setFondos(res.RESPONSE);
      } else {
        AlertS.fire({
          title: "¡Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };

  useEffect(() => {
    permisos.map((item: PERMISO) => {
      if (String(item.Menu) === "FONDOS") {
        setNombreMenu(item.Menu);
        //console.log(item.Menu)
        if (String(item.ControlInterno) === "AGREG") {
          setAgregar(true);
        }
        if (String(item.ControlInterno) === "ELIM") {
          setEliminar(true);
        }
        if (String(item.ControlInterno) === "EDIT") {
          setEditar(true);
        }
        if (String(item.ControlInterno) === "VIS") {
          setView(true);
        }
      }
    });
    consulta();
  }, []);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      {open ? (
        <FondosModal
          modo={modo}
          tipo={tipoOperacion}
          handleClose={handleClose}
          dt={vrows}
        />
      ) : (
        ""
      )}

      {openView ? <FondosView handleClose={handleClose} dt={vrows} /> : ""}

      {openViewAjustes ? (
        <FondosTipoView handleClose={handleClose} dt={vrows} />
      ) : (
        ""
      )}

      <NombreCatalogo controlInterno={"FONDOS"} />
      <Grid container sx={{ alignItems: "center", justifyContent: "center" }}>
        <Grid
          item
          sm={12}
          sx={{ display: "flex", alignItems: "left", justifyContent: "left" }}
        >
          <ButtonsMunBase
            handleOpen={handleOpen}
            agregar={agregar}
            eliminar={eliminar}
          />
        </Grid>
        <Grid
          item
          sm={12}
          sx={{ alignItems: "center", justifyContent: "center" }}
        >
          <MUIXDataGridMun
            columns={columns}
            rows={fondos}
            modulo={nombreMenu.toUpperCase().replace(" ", "_")}
            handleBorrar={handleBorrar}
            controlInterno={"FONDOS"}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default Fondos;
