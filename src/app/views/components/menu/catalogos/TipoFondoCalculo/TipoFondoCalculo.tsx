import { useEffect, useState } from "react";
import { GridColDef, GridSelectionModel } from "@mui/x-data-grid";
import { getMenus, getPermisos, getUser } from "../../../../../services/localStorage";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import Slider from "../../../Slider";
import { Toast } from "../../../../../helpers/Toast";
import { AlertS } from "../../../../../helpers/AlertS";
import Swal from "sweetalert2";
import { PERMISO, RESPONSE } from "../../../../../interfaces/user/UserInfo";
import {
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Title from "../../../componentes/Title";
import TipoFondoCalculoModal from "./TipoFondoCalculoModal";
import MUIXDataGridMun from "../../../MUIXDataGridMun";
import React from "react";
import ButtonsMunBase from "../Utilerias/ButtonsMunBase";
import NombreCatalogo from "../../../componentes/NombreCatalogo";

const TipoFondoCalculo = () => {
  //   VALORES POR DEFAULT
  const [open, setOpen] = useState(false);
  const [modo, setModo] = useState("");
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [dataTipoFondo, setDataTipoFondo] = useState([]);
  const [slideropen, setslideropen] = useState(false);
  const user: RESPONSE = JSON.parse(String(getUser()));
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [agregar, setAgregar] = useState<boolean>(false);
  const [editar, setEditar] = useState<boolean>(false);
  const [eliminar, setEliminar] = useState<boolean>(false);
  const [vrows, setVrows] = useState({});
  const [tipoCalculo, setTipoCalculo] = useState("");
  const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([]);
  const [nombreMenu, setNombreMenu] = useState("");
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
          <Box>
            {/* EDITAR */}
            {editar ? (
              <Tooltip title={"Editar Registro"}>
                <IconButton
                  color="info"
                  onClick={() => handleAccion({ tipo: 2, data: v })}
                >
                  <ModeEditOutlineIcon />
                </IconButton>
              </Tooltip>
            ) : (
              ""
            )}
            {/* ELIMINAR */}
            {eliminar ? (
              <Tooltip title={"Eliminar Registro"}>
                <IconButton
                  color="error"
                  onClick={() => handleAccion({ tipo: 3, data: v })}
                >
                  <DeleteForeverIcon />
                </IconButton>
              </Tooltip>
            ) : (
              ""
            )}
          </Box>
        );
      },
    },
    { field: "FechaCreacion", headerName: "Fecha de Creación", width: 150 },
    { field: "Descripcion", headerName: "Descripcion", width: 350 },
    { field: "NumProyecto", headerName: "NumProyecto	", width: 150, },
    { field: "ConceptoEgreso", headerName: "ConceptoEgreso", width: 150, },
    { field: "Clasificador01", headerName: "ADMINISTRATIVO	", width: 150, },
    { field: "Clasificador02", headerName: "FUNCIONAL	", width: 150, },
    { field: "Clasificador03", headerName: "PROGRAMÁTICO	", width: 150, },
    { field: "Clasificador04", headerName: "OBJETO DE GASTO (PARTIDA)	", width: 150, },
    { field: "Clasificador05", headerName: "TIPO DEL GASTO	", width: 150, },
    { field: "Clasificador06", headerName: "FUENTE DE FINANCIAMIENTO	", width: 150, },
    { field: "Clasificador07", headerName: "RAMO-FONDO CONVENIO	", width: 150, },
    { field: "Clasificador08", headerName: "AÑO DEL RECURSO	", width: 150, },
    { field: "Clasificador09", headerName: "CONTROL INTERNO	", width: 150, },
    { field: "Clasificador10", headerName: "GEOGRÁFICA	", width: 150, },
    { field: "Clasificador11", headerName: "PROYECTO/PROGRAMA	", width: 150, },
    { field: "ClasificacionOP", headerName: "Clasificacion OP", width: 150, },
  ];

  const handlesave = (v: any) => {

    let data = {
      NUMOPERACION: tipoOperacion,
      DESCRIPCION: tipoCalculo,
      CHUSER: user.id,
      CHID: v.id
    };

    CatalogosServices.TipoFondosCalculo(data).then((res) => {
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

  };

  const handleAccion = (v: any) => {
    //console.log(v)
    if (v.tipo === 2) {
      setTipoOperacion(2);
      setVrows(v.data);
      setOpen(true);
      setModo("Editar Registro")
    } else if (v.tipo === 3) {
      Swal.fire({
        icon: "info",
        title: "Estas seguro de eliminar este registro?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Confirmar",
        denyButtonText: `Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {
          let data = {
            NUMOPERACION: 3,
            CHID: v.data.id,
            CHUSER: user.id,
          };

          CatalogosServices.TipoFondosCalculo(data).then((res) => {
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
    }
  };

  const handleOpen = (accion: any) => {

    if (accion === 1) {
      setTipoOperacion(1);
      setOpen(true);
      setTipoCalculo("");
      setVrows({});
      setModo("Nuevo Registro")
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
              NUMOPERACION: 5,
              OBJS: selectionModel,
              CHUSER: user.id
            };
            //console.log(data);

            CatalogosServices.TipoFondosCalculo(data).then((res) => {
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

  const handleClose = () => {
    setOpen(false);
    consulta();
  };
  const handleBorrar = (v: any) => {
    setSelectionModel(v);
  };

  const consulta = () => {
    let data = {
      NUMOPERACION: 4
    };

    CatalogosServices.TipoFondosCalculo(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Consulta Exitosa!",
        });
        setDataTipoFondo(res.RESPONSE);
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
      if (String(item.ControlInterno) === "TIPOCALCULO") {
        setNombreMenu(item.Menu);
        if (String(item.Referencia) === "AGREG") {
          setAgregar(true);
        }
        if (String(item.Referencia) === "ELIM") {
          setEliminar(true);
        }
        if (String(item.Referencia) === "EDIT") {
          setEditar(true);
        }
      }
    });
    consulta();
  }, []);

  return (
    <div style={{ height: 600, width: "100%" }}>
      <Slider open={slideropen}></Slider>

      <NombreCatalogo controlInterno={"TIPOCALCULO"} />
      <ButtonsMunBase handleOpen={handleOpen} agregar={agregar} eliminar={eliminar} />
      <MUIXDataGridMun columns={columns} rows={dataTipoFondo} modulo={nombreMenu.toUpperCase().replace(' ','_')} handleBorrar={handleBorrar} borrar={eliminar} />

      {open ?
        <TipoFondoCalculoModal modo={modo} tipo={tipoOperacion} handleClose={handleClose} dt={vrows} />
        :
        ""
      }
    </div>
  );
};

export default TipoFondoCalculo;
