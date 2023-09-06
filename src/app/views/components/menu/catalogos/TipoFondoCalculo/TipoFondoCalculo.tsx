import { useEffect, useState } from "react";
import { GridColDef, GridSelectionModel } from "@mui/x-data-grid";
import { getPermisos, getUser } from "../../../../../services/localStorage";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import Slider from "../../../Slider";
import { Toast } from "../../../../../helpers/Toast";
import { AlertS } from "../../../../../helpers/AlertS";
import Swal from "sweetalert2";
import {
  PERMISO,
  USUARIORESPONSE,
} from "../../../../../interfaces/user/UserInfo";
import { Box, IconButton, Tooltip } from "@mui/material";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import TipoFondoCalculoModal from "./TipoFondoCalculoModal";
import MUIXDataGridMun from "../../../MUIXDataGridMun";
import React from "react";
import ButtonsMunBase from "../Utilerias/ButtonsMunBase";
import NombreCatalogo from "../../../componentes/NombreCatalogo";
import BotonesAcciones from "../../../componentes/BotonesAcciones";

const TipoFondoCalculo = () => {
  //   VALORES POR DEFAULT
  const [open, setOpen] = useState(false);
  const [modo, setModo] = useState("");
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [dataTipoFondo, setDataTipoFondo] = useState([]);
  const [slideropen, setslideropen] = useState(false);
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [agregar, setAgregar] = useState<boolean>(false);
  const [editar, setEditar] = useState<boolean>(false);
  const [eliminar, setEliminar] = useState<boolean>(false);
  const [eliminarMasivo, setEliminarMasivo] = useState<boolean>(false);

  const [vrows, setVrows] = useState({});
  const [tipoCalculo, setTipoCalculo] = useState("");
  const [selectionModel, setSelectionModel] =
    React.useState<GridSelectionModel>([]);
  const [nombreMenu, setNombreMenu] = useState("");
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
          <BotonesAcciones
            handleAccion={handleAccion}
            row={v}
            editar={editar}
            eliminar={eliminar}
          ></BotonesAcciones>
        );
      },
    },
    {
      field: "FechaCreacion",
      headerName: "Fecha De Creación",
      description: "Fecha De Creación",
      width: 150,
    },
    {
      field: "Descripcion",
      headerName: "Descripción",
      description: "Descripción",
      width: 350,
    },
    {
      field: "NumProyecto",
      headerName: "Número De Proyecto	",
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
      headerName: "Administrativo	",
      description: "Administrativo	",
      width: 150,
    },
    {
      field: "Clasificador02",
      headerName: "Funcional",
      description: "Funcional",
      width: 120,
    },
    {
      field: "Clasificador03",
      headerName: "Programático",
      description: "Programático",
      width: 120,
    },
    {
      field: "Clasificador04",
      headerName: "Objeto De Gastos (Partida)",
      description: "Objeto De Gastos (Partida)",
      width: 220,
    },
    {
      field: "Clasificador05",
      headerName: "Tipo De Gasto",
      description: "Tipo De Gasto",
      width: 130,
    },
    {
      field: "Clasificador06",
      headerName: "Fuente De Financiamiento",
      description: "Fuente De Financiamiento",
      width: 190,
    },
    {
      field: "Clasificador07",
      headerName: "Ramo-Fondo Convenio",
      description: "Ramo-Fondo Convenio",
      width: 180,
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
      headerName: "Geografía	",
      description: "Geografía	",
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
  ];

  const handlesave = (v: any) => {
    let data = {
      NUMOPERACION: tipoOperacion,
      DESCRIPCION: tipoCalculo,
      CHUSER: user.Id,
      CHID: v.id,
    };

    CatalogosServices.TipoFondosCalculo(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "¡Registro Eliminado!",
        });
        consulta(false);
      } else {
        AlertS.fire({
          title: "¡Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };

  const handleAccion = (v: any) => {
    if (v.tipo == 1) {
      setTipoOperacion(2);
      setVrows(v.data);
      setOpen(true);
      setModo("Editar Registro");
    } else if (v.tipo == 2) {
      Swal.fire({
        icon: "question",
        title: "¿Estás seguro de eliminar este registro?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Confirmar",
        denyButtonText: `Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {
          let data = {
            NUMOPERACION: 3,
            CHID: v.data.id,
            CHUSER: user.Id,
          };

          CatalogosServices.TipoFondosCalculo(data).then((res) => {
            if (res.SUCCESS) {
              Toast.fire({
                icon: "success",
                title: "¡Registro Eliminado!",
              });
              consulta(false);
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
    }
  };

  const handleOpen = (accion: any) => {
    if (accion == 1) {
      setTipoOperacion(1);
      setOpen(true);
      setTipoCalculo("");
      setVrows({});
      setModo("Nuevo Registro");
    }

    if (accion == 2) {
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
              NUMOPERACION: 5,
              OBJS: selectionModel,
              CHUSER: user.Id,
            };

            CatalogosServices.TipoFondosCalculo(data).then((res) => {
              if (res.SUCCESS) {
                Toast.fire({
                  icon: "success",
                  title: "Borrado!",
                });

                consulta(false);
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

  const handleClose = () => {
    setOpen(false);
    consulta(false);
  };
  const handleBorrar = (v: any) => {
    setSelectionModel(v);
  };

  const consulta = (mensaje: boolean) => {
    let data = {
      NUMOPERACION: 4,
    };

    CatalogosServices.TipoFondosCalculo(data).then((res) => {
      if (res.SUCCESS) {
        if (mensaje) {
          Toast.fire({
            icon: "success",
            title: "¡Consulta Exitosa!",
          });
        }

        setDataTipoFondo(res.RESPONSE);
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
      if (String(item.Menu) == "TIPOCALCULO") {
        setNombreMenu(item.Menu);
        if (String(item.ControlInterno) == "AGREG") {
          setAgregar(true);
        }
        if (String(item.ControlInterno) == "ELIM") {
          setEliminar(true);
        }
        if (String(item.ControlInterno) == "EDIT") {
          setEditar(true);
        }
        if (String(item.ControlInterno) == "ELIMMAS") {
          setEliminarMasivo(true);
        }
      }
    });
    consulta(true);
  }, []);

  return (
    <div style={{ height: 600, width: "100%" }}>
      <Slider open={slideropen}></Slider>

      <NombreCatalogo controlInterno={"TIPOCALCULO"} />
      <ButtonsMunBase
        handleOpen={handleOpen}
        agregar={agregar}
        eliminar={eliminarMasivo}
      />
      <MUIXDataGridMun
        columns={columns}
        rows={dataTipoFondo}
        modulo={nombreMenu.toUpperCase().replace(" ", "_")}
        handleBorrar={handleBorrar}
        controlInterno={"TIPOCALCULO"}
      />

      {open ? (
        <TipoFondoCalculoModal
          modo={modo}
          tipo={tipoOperacion}
          handleClose={handleClose}
          dt={vrows}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default TipoFondoCalculo;
