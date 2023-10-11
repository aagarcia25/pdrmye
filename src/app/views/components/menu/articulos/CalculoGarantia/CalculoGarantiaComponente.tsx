import { Grid, Tooltip, Typography } from "@mui/material";
import { GridColDef, GridSelectionModel } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AlertS } from "../../../../../helpers/AlertS";
import { Toast } from "../../../../../helpers/Toast";
import SelectValues from "../../../../../interfaces/Select/SelectValues";
import {
  PERMISO,
  USUARIORESPONSE,
} from "../../../../../interfaces/user/UserInfo";
import { calculosServices } from "../../../../../services/calculosServices";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import { getPermisos, getUser } from "../../../../../services/localStorage";
import { fanios } from "../../../../../share/loadAnios";
import MUIXDataGridMun from "../../../MUIXDataGridMun";
import Slider from "../../../Slider";
import BotonesAcciones from "../../../componentes/BotonesAcciones";
import { Moneda } from "../../CustomToolbar";
import ButtonsMunicipio from "../../catalogos/Utilerias/ButtonsMunicipio";

export const CalculoGarantiaComponente = () => {
  const [slideropen, setslideropen] = useState(true);
  const [calculoGarantia, setCalculoGarantia] = useState([]);
  const [modo, setModo] = useState("");
  const [open, setOpen] = useState(false);
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [vrows, setVrows] = useState({});
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [agregar, setAgregar] = useState<boolean>(false);
  const [editar, setEditar] = useState<boolean>(false);
  const [eliminar, setEliminar] = useState<boolean>(false);
  const [nombreMenu, setNombreMenu] = useState("");
  const [plantilla, setPlantilla] = useState("");
  const [selectionModel, setSelectionModel] =
    React.useState<GridSelectionModel>([]);
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));
  const [anios, setAnios] = useState<SelectValues[]>([]);

  // VARIABLES PARA LOS FILTROS
  const [filterAnio, setFilterAnio] = useState("");
  //funciones

  const handleFilterChange = (v: string) => {
    setFilterAnio(v);

    let data = {
      NUMOPERACION: 4,
      ANIO: v,
    };
    if (v !== "false") {
      setFilterAnio(v);
      consulta(data);
    } else {
      consulta({ NUMOPERACION: 4, ANIO: "" });
      setFilterAnio("");
    }
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      hide: true,
    },
    {
      field: "idmunicipio",
      hide: true,
    },
    {
      field: "acciones",
      disableExport: true,
      headerName: "Acciones",
      description: "Campo de Acciones",
      sortable: false,
      width: 100,
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
      headerName: "Fecha Creación",
      description: "Fecha Creación",
      width: 180,
    },
    {
      field: "ClaveEstado",
      headerName: "Clave Estado",
      description: "Clave Estado",
      width: 150,
    },
    {
      field: "Nombre",
      headerName: "Municipio",
      description: "Municipio",
      width: 250,
    },
    {
      field: "clave",
      headerName: "Clave Fondo",
      description: "Clave Fondo",
      width: 100,
    },
    {
      field: "Descripcion",
      headerName: "Descripción de fondo",
      description: "Descripción de fondo",
      width: 420,
    },
    { field: "Anio", headerName: "Año", description: "Año", width: 120 },
    {
      field: "Garantia",
      headerName: "Garantía",
      description: "Garantía",
      width: 250,
    },
    {
      field: "Distribucion",
      headerName: "Distribución",
      description: "Distribución",
      width: 150,
    },
  ];
  const handleAccion = (v: any) => {
    if ((v.tipo = 1)) {
      setTipoOperacion(2);
      setModo("Editar ");
      setOpen(true);
      setVrows(v.data);
    } else if (v.tipo == 2) {
      handleDelete(v.data);
    }
  };

  const handleClose = () => {
    setOpen(false);
    consulta({ NUMOPERACION: 4 });
  };

  const handleOpen = (v: any) => {
    setTipoOperacion(1);
    setModo("Agregar Registro");
    setOpen(true);
    setVrows("");
  };

  const handleEdit = (v: any) => {
    setTipoOperacion(2);
    setModo("Editar Registro");
    setOpen(true);
    setVrows(v);
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
        const user: USUARIORESPONSE = JSON.parse(String(getUser()));

        let data = {
          NUMOPERACION: 3,
          CHID: v.row.id,
          CHUSER: user.Id,
        };

        calculosServices.CalculoGarantia(data).then((res) => {
          if (res.SUCCESS) {
            Toast.fire({
              icon: "success",
              title: "¡Registro Eliminado!",
            });

            let data = {
              NUMOPERACION: 4,
            };
            consulta(data);
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

  const handleUpload = (data: any) => {
    if (data.tipo == 1) {
      setslideropen(true);
      let file = data.data?.target?.files?.[0] || "";
      const formData = new FormData();
      formData.append("inputfile", file, "inputfile.xlsx");
      formData.append("tipo", "CalculoGarantia");
      formData.append("CHUSER", user.Id);
      CatalogosServices.migraData(formData).then((res) => {
        setslideropen(false);
        if (res.SUCCESS) {
          consulta({ NUMOPERACION: 4 });
          Toast.fire({
            icon: "success",
            title: "Carga Exitosa!",
          });
        } else {
          consulta({ NUMOPERACION: 4 });
          AlertS.fire({
            title: "¡Error!",
            text: res.STRMESSAGE,
            icon: "error",
          });
        }
      });
    } else if (data.tipo == 2) {
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

            calculosServices.CalculoGarantia(data).then((res) => {
              if (res.SUCCESS) {
                Toast.fire({
                  icon: "success",
                  title: "Borrado!",
                });

                consulta({ NUMOPERACION: 4 });
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

  const consulta = (data: any) => {
    calculosServices.CalculoGarantia(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "¡Consulta Exitosa!",
        });
        setCalculoGarantia(res.RESPONSE);
        setslideropen(false);
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
    setAnios(fanios());
    permisos.map((item: PERMISO) => {
      if (String(item.menu) == "CA") {
        setNombreMenu(item.menu);
        if (String(item.ControlInterno) == "AGREG") {
          setAgregar(true);
        }
        if (String(item.ControlInterno) == "ELIM") {
          setEliminar(true);
        }
        if (String(item.ControlInterno) == "EDIT") {
          setEditar(true);
        }
      }
    });
    consulta({ NUMOPERACION: 4 });
  }, []);

  return (
    <div style={{ height: 600, width: "100%" }}>
      <Slider open={slideropen}></Slider>
      <Grid container sx={{ justifyContent: "center" }}>
        <Grid item xs={10} sx={{ textAlign: "center" }}>
          <Tooltip title="Cálculo que garantiza a los municipios recibir mínimo el mísmo monto del año anterior, y no menos">
            <Typography variant="h3">{nombreMenu}</Typography>
          </Tooltip>
        </Grid>
      </Grid>

      {/* <ButtonsAdd handleOpen={handleOpen} agregar={agregar} /> */}
      <ButtonsMunicipio
        url={"PLANTILLA DE CARGA DE GARANTIA.xlsx"}
        handleUpload={handleUpload}
        controlInterno={"CA"}
        options={anios}
        onInputChange={handleFilterChange}
        placeholder={"Seleccione Año"}
        label={""}
        disabled={false}
        value={filterAnio}
        handleOpen={handleOpen}
      />
      <MUIXDataGridMun
        columns={columns}
        rows={calculoGarantia}
        handleBorrar={handleBorrar}
        modulo={"Garantia"}
        controlInterno={"CA"}
      />
    </div>
  );
};
