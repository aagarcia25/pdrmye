import { useEffect, useState } from "react";
import { Box, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import { GridColDef, GridSelectionModel } from "@mui/x-data-grid";
import { getPermisos, getUser } from "../../../../../services/localStorage";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ButtonsAdd from "../Utilerias/ButtonsAdd";
import Swal from "sweetalert2";
import { Toast } from "../../../../../helpers/Toast";
import { AlertS } from "../../../../../helpers/AlertS";
import FondosModal from "./FondosModal";
import MUIXDataGrid from "../../../MUIXDataGrid";
import { PERMISO, RESPONSE } from "../../../../../interfaces/user/UserInfo";
import FondosView from "./FondosView";
import BotonesAcciones from "../../../componentes/BotonesAcciones";
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import FondosTipoView from "./FondosTipoView";
import MUIXDataGridMun from "../../../MUIXDataGridMun";
import React from "react";
import ButtonsMunBase from "../Utilerias/ButtonsMunBase";
const Fondos = () => {

  const [modo, setModo] = useState("");
  const [open, setOpen] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openViewAjustes, setOpenViewAjustes] = useState(false);
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const user: RESPONSE = JSON.parse(String(getUser()));
  const [vrows, setVrows] = useState({});
  const [fondos, setFondos] = useState([]);
  const [nombreMenu, setNombreMenu] = useState("");
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [agregar, setAgregar] = useState<boolean>(false);
  const [editar, setEditar] = useState<boolean>(false);
  const [eliminar, setEliminar] = useState<boolean>(false);
  const [view, setView] = useState<boolean>(false);
  const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([]);

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Identificador",
      hide: true,
      width: 10,
    },

    {
      field: "acciones",
      headerName: "Acciones",
      description: "Campo de Acciones",
      sortable: false,
      width: 200,
      renderCell: (v) => {
        return (
          <Grid container>


            <BotonesAcciones handleAccion={handleAccion} row={v} editar={editar} eliminar={eliminar}></BotonesAcciones>


            {view ?
              <Tooltip title={"Visualizar Ajustes"}>
                <IconButton onClick={() => handleView(v)}>
                  <RemoveRedEyeIcon />
                </IconButton>
              </Tooltip>
              : ""}

            {view ?
              <Tooltip title={"Visualizar Tipo de Cálculos"}>
                <IconButton onClick={() => handleViewAjustes(v)}>
                  <MiscellaneousServicesIcon />
                </IconButton>
              </Tooltip>
              : ""}


          </Grid>
        );
      },
    },
    { field: "FechaCreacion", headerName: "Fecha Creación", width: 150, },
    { field: "Clave", headerName: "Clave", width: 150 },
    { field: "Descripcion", headerName: "Descripcion", width: 450 },
    {
      field: "AplicaCalculo",
      headerName: "Aplica Cálculo",
      width: 120,
      renderCell: (v) => {
        return <Box>{v.row.AplicaCalculo === 1 ? "SI" : "No"}</Box>;
      },
    },
    {
      field: "Vigente",
      headerName: "Vigente",
      width: 100,
      renderCell: (v) => {
        return <Box>{v.row.Vigente === 1 ? "SI" : "No"}</Box>;
      },
    },
    {
      field: "Estatal",
      headerName: "Estatal",
      width: 100,

      renderCell: (v) => {
        return <Box>{v.row.Estatal === 1 ? "SI" : "No"}</Box>;
      },
    },
    {
      field: "Federal",
      headerName: "Federal",
      width: 100,
      renderCell: (v) => {
        return <Box>{v.row.Federal === 1 ? "SI" : "No"}</Box>;
      },
    },
    { field: "idtipo", headerName: "idtipo", width: 150, hide: true },
    { field: "dtipo", headerName: "Tipo", width: 250 },
    { field: "PorcentajeDistribucion	", headerName: "	PorcentajeDistribucion	", width: 150, },
    { field: "Garantia", headerName: "Garantia	", width: 150, },
    { field: "Articulo", headerName: "Articulo	", width: 150, },
    { field: "Comentarios", hide: true },
    { field: "NumProyecto", headerName: "NumProyecto	", width: 150, },
    { field: "ConceptoEgreso", headerName: "ConceptoEgreso", width: 150, },
    { field: "Clasificador01", headerName:"ADMINISTRATIVO	", width: 150, },
    { field: "Clasificador02", headerName:"FUNCIONAL	", width: 150, },
    { field: "Clasificador03", headerName:"PROGRAMÁTICO	", width: 150, },
    { field: "Clasificador04", headerName:"OBJETO DE GASTO (PARTIDA)	", width: 150, },
    { field: "Clasificador05", headerName:"TIPO DEL GASTO	", width: 150, },
    { field: "Clasificador06", headerName:"FUENTE DE FINANCIAMIENTO	", width: 150, },
    { field: "Clasificador07", headerName:"RAMO-FONDO CONVENIO	", width: 150, },
    { field: "Clasificador08", headerName:"AÑO DEL RECURSO	", width: 150, },
    { field: "Clasificador09", headerName:"CONTROL INTERNO	", width: 150, },
    { field: "Clasificador10", headerName:"GEOGRÁFICA	", width: 150, },
    { field: "Clasificador11", headerName:"PROYECTO/PROGRAMA	", width: 150, },
    { field: "ClasificacionOP", headerName: "Clasificacion OP", width: 150, },
    { field: "Orden	", hide: true},



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
  }


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
                      CHUSER: user.id
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
                              title: "Error!",
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
      icon: "info",
      title: "Estas seguro de eliminar este registro?",
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
          CHUSER: user.id
        };
        //console.log(data);

        CatalogosServices.fondos(data).then((res) => {
          if (res.SUCCESS) {
            Toast.fire({
              icon: "success",
              title: "Registro Eliminado!",
            });

            consulta();
          } else {
            AlertS.fire({
              title: "Error!",
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
          title: "Consulta Exitosa!",
        });
        setFondos(res.RESPONSE);
      } else {
        AlertS.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };

  useEffect(() => {

    permisos.map((item: PERMISO) => {

      if (String(item.ControlInterno) === "FONDOS") {
        setNombreMenu(item.Menu);
        //console.log(item.Menu)
        if (String(item.Referencia) === "AGREG") {
          setAgregar(true);
        }
        if (String(item.Referencia) === "ELIM") {
          setEliminar(true);
        }
        if (String(item.Referencia) === "EDIT") {
          setEditar(true);
        }
        if (String(item.Referencia) === "VIS") {
          setView(true);
        }
      }
    });
    consulta();
  }, []);

  return (
    <div style={{ height: 600, width: "100%" }}>
      {(open) ? (
        <FondosModal
          modo={modo}
          tipo={tipoOperacion}
          handleClose={handleClose}
          dt={vrows}
        />
      ) : (
        ""
      )}

      {(openView) ? (
        <FondosView
          handleClose={handleClose}
          dt={vrows}
        />
      ) : (
        ""
      )}

      {(openViewAjustes) ? (

        <FondosTipoView
          handleClose={handleClose}
          dt={vrows}
        />

      ) : (
        ""
      )}

      <Grid container
        sx={{ justifyContent: "center" }}>
        <Grid item xs={10} sx={{ textAlign: "center" }}>
          <Typography>
            <h1>{nombreMenu}</h1>
          </Typography>
        </Grid>
      </Grid>
      <ButtonsMunBase handleOpen={handleOpen} agregar={agregar} eliminar={eliminar} />
      <MUIXDataGridMun columns={columns} rows={fondos} modulo={nombreMenu} handleBorrar={handleBorrar} borrar={eliminar} />
    </div>
  );
};

export default Fondos;




