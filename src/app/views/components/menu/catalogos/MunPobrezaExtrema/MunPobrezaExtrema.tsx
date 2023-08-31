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
import { CatalogosServices } from "../../../../../services/catalogosServices";
import { getPermisos, getUser } from "../../../../../services/localStorage";
import { fanios } from "../../../../../share/loadAnios";
import MUIXDataGridMun from "../../../MUIXDataGridMun";
import Slider from "../../../Slider";
import BotonesAcciones from "../../../componentes/BotonesAcciones";
import ButtonsMunicipio from "../Utilerias/ButtonsMunicipio";
import MunPobrezaExtremaModal from "./MunPobrezaExtremaModal";

import NombreCatalogo from "../../../componentes/NombreCatalogo";

export const MunPobrezaExtrema = () => {
  const [modo, setModo] = useState("");
  const [open, setOpen] = useState(false);
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [data, setData] = useState({});
  const [PobrezaExtrema, setPobrezaExtrema] = useState([]);
  const [slideropen, setslideropen] = useState(false);
  const [anios, setAnios] = useState<SelectValues[]>([]);
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [nombreMenu, setNombreMenu] = useState("");
  const [editar, setEditar] = useState<boolean>(false);
  const [eliminar, setEliminar] = useState<boolean>(false);
  const [selectionModel, setSelectionModel] =
    React.useState<GridSelectionModel>([]);
  // VARIABLES PARA LOS FILTROS
  const [filterAnio, setFilterAnio] = useState("");

  const columns: GridColDef[] = [
    { field: "id", headerName: "Identificador", hide: true },
    {
      field: "idmunicipio",
      headerName: "idmunicipio",
      hide: true,
      width: 150,
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
      width: 100,
    },
    {
      field: "Nombre",
      headerName: "Municipio",
      description: "Municipio",
      width: 150,
    },
    { field: "Anio", headerName: "Año", description: "Año", width: 150 },
    {
      field: "Personas",
      headerName: "Total",
      description: "Total",
      width: 150,
    },
    {
      field: "CarenciaProm",
      headerName: "Carencia Promedio",
      description: "Carencia Promedio",
      width: 400,
    },
  ];

  const handleClose = (v: string) => {
    setOpen(false);
    setOpen(false);
    let data = {
      NUMOPERACION: 4,
      ANIO: filterAnio,
    };
    consulta(data);
  };

  const handleOpen = () => {
    setTipoOperacion(1);
    setModo("Agregar Registro");
    setOpen(true);
    setData("");
  };

  const handleAccion = (v: any) => {
    if (v.tipo === 1) {
      setTipoOperacion(2);
      setModo("Editar ");
      setOpen(true);
      setData(v.data);
    } else if (v.tipo === 2) {
      handleDelete(v.data);
    }
  };
  const handleBorrar = (v: any) => {
    setSelectionModel(v);
  };

  const handleDelete = (v: any) => {
    Swal.fire({
      icon: "info",
      title: "¿Solicita la eliminación?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Confirmar",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        let data = {
          NUMOPERACION: 3,
          CHID: v.row.id,
          CHUSER: user.Id,
        };

        CatalogosServices.munpobrezaext(data).then((res) => {
          if (res.SUCCESS) {
            Toast.fire({
              icon: "success",
              title: "Solicitud Enviada!",
            });

            let data = {
              NUMOPERACION: 4,
              ANIO: filterAnio,
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

  const handleAgregar = (event: React.ChangeEvent<HTMLInputElement>) => {};

  const handleUpload = (data: any) => {
    if (data.tipo === 1) {
      setslideropen(true);
      let file = data.data?.target?.files?.[0] || "";
      const formData = new FormData();
      formData.append("inputfile", file, "inputfile.xlxs");
      formData.append("tipo", "MunPobrezaExt");
      CatalogosServices.migraData(formData).then((res) => {
        setslideropen(false);
      });
    } else if (data.tipo === 2) {
      //console.log("borrado de toda la tabla")
      //console.log(selectionModel)

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

            CatalogosServices.munpobrezaext(data).then((res) => {
              if (res.SUCCESS) {
                Toast.fire({
                  icon: "success",
                  title: "Borrado!",
                });

                consulta({
                  NUMOPERACION: 4,
                  CHUSER: user.Id,
                  ANIO: filterAnio,
                });
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

  const consulta = (data: any) => {
    CatalogosServices.munpobrezaext(data).then((res) => {
      setPobrezaExtrema(res.RESPONSE);
    });
  };

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

  useEffect(() => {
    permisos.map((item: PERMISO) => {
      if (String(item.Menu) === "MUNPOEX") {
        setNombreMenu(item.Menu);
        if (String(item.ControlInterno) === "ELIM") {
          setEliminar(true);
        }
        if (String(item.ControlInterno) === "EDIT") {
          setEditar(true);
        }
      }
    });

    setAnios(fanios());

    let data = {
      NUMOPERACION: 4,
      ANIO: "",
    };

    consulta(data);
  }, []);

  return (
    <div style={{ height: 600, width: "100%" }}>
      <Slider open={slideropen}></Slider>

      <NombreCatalogo controlInterno={"MUNPOEX"} />

      <ButtonsMunicipio
        url={"MUNICIPIO_POBREZA_EXTREMA.xlsx"}
        handleUpload={handleUpload}
        controlInterno={"MUNPOEX"}
        value={filterAnio}
        options={anios}
        onInputChange={handleFilterChange}
        placeholder={"Seleccione Año"}
        label={""}
        disabled={false}
        handleOpen={() => handleOpen()}
      />

      <MUIXDataGridMun
        columns={columns}
        rows={PobrezaExtrema}
        handleBorrar={handleBorrar}
        modulo={nombreMenu.toUpperCase().replace(" ", "_")}
        controlInterno={"MUNPOEX"}
      />
      {open ? (
        <MunPobrezaExtremaModal
          open={open}
          modo={modo}
          handleClose={handleClose}
          tipo={tipoOperacion}
          dt={data}
        />
      ) : (
        ""
      )}
    </div>
  );
};
