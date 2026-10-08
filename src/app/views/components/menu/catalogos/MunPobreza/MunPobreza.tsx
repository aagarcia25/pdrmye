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
import { messages } from "../../../../styles";
import MUIXDataGridMun from "../../../MUIXDataGridMun";
import Slider from "../../../Slider";
import BotonesAcciones from "../../../componentes/BotonesAcciones";
import NombreCatalogo from "../../../componentes/NombreCatalogo";
import ButtonsMunicipio from "../Utilerias/ButtonsMunicipio";
import MunPobrezaModal from "./MunPobrezaModal";

export const MunPobreza = () => {
  const [open, setOpen] = useState(false);
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [data, setData] = useState({});
  const [dataMunPobreza, setDataMunPobreza] = useState([]);
  const [slideropen, setslideropen] = useState(false);
  const [anios, setAnios] = useState<SelectValues[]>([]);
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [editar, setEditar] = useState<boolean>(false);
  const [eliminar, setEliminar] = useState<boolean>(false);
  const [selectionModel, setSelectionModel] =
    React.useState<GridSelectionModel>([]);

  // VARIABLES PARA LOS FILTROS
  const [filterAnio, setFilterAnio] = useState("");
  //funciones

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Identificador",
      hide: true,
      width: 150,
      description: messages.dataTableColum.id,
    },
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
    { field: "Total", headerName: "Total", description: "Total", width: 100 },
    {
      field: "CarenciaProm",
      headerName: "Carencia Promedio",
      description: "Carencia Promedio",
      width: 400,
    },
  ];

  const handleAccion = (v: any) => {
    if (v.tipo == 1) {
      setTipoOperacion(2);
      setOpen(true);
      setData(v.data);
    } else if (v.tipo == 2) {
      handleDelete(v.data);
    }
  };

  const handleClose = (v: string) => {
    setOpen(false);
    let data = {
      NUMOPERACION: 4,
      ANIO: filterAnio,
    };
    consulta(data);
  };
  const handleOpen = (v: any) => {
    setTipoOperacion(1);
    setOpen(true);
    setData("");
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

        CatalogosServices.munpobreza(data).then((res) => {
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

  const handleBorrar = (v: any) => {
    setSelectionModel(v);
  };

  const handleUpload = async (data: any) => {
    if (data.tipo == 1) {
      const file: File | undefined = data.data?.target?.files?.[0];
      if (!file || slideropen) return;
      if (!/\.(xlsx|xls)$/i.test(file.name) || file.size > 10 * 1024 * 1024) {
        AlertS.fire({ icon: "warning", title: "Archivo no válido", text: "Seleccione un Excel (.xlsx o .xls) de hasta 10 MB." });
        return;
      }
      setslideropen(true);
      const formData = new FormData();
      formData.append("inputfile", file, file.name);
      formData.append("tipo", "MunPobreza");
      formData.append("CHUSER", String(user.Id));
      try {
        const res = await CatalogosServices.migraData(formData);
        if (!res?.SUCCESS) {
          AlertS.fire({ icon: "error", title: "No se pudo cargar el archivo", text: res?.STRMESSAGE || "No fue posible completar la carga." });
          return;
        }
        setSelectionModel([]);
        setFilterAnio("");
        Toast.fire({ icon: "success", title: `${res.RESPONSE.insertados} registros cargados.` });
        try {
          const listado = await CatalogosServices.munpobreza({ NUMOPERACION: 4, ANIO: "" });
          if (!listado?.SUCCESS) throw new Error("consulta");
          setDataMunPobreza(listado.RESPONSE);
        } catch {
          AlertS.fire({ icon: "warning", title: "La carga se completó", text: "No se pudo actualizar la tabla. Vuelva a consultar los registros." });
        }
      } catch {
        AlertS.fire({ icon: "error", title: "No se pudo confirmar la carga", text: "Revise su conexión y consulte los registros antes de volver a cargar el archivo." });
      } finally {
        setslideropen(false);
      }
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

            CatalogosServices.munpobreza(data).then((res) => {
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
    CatalogosServices.munpobreza(data).then((res) => {
      setDataMunPobreza(res.RESPONSE);
    });
  };

  const handleFilterChange = (v: string) => {
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
    setAnios(fanios());

    permisos.map((item: PERMISO) => {
      if (String(item.menu) == "MUNPOBREZA") {
        if (String(item.ControlInterno) == "ELIM") {
          setEliminar(true);
        }
        if (String(item.ControlInterno) == "EDIT") {
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
      <NombreCatalogo controlInterno={"MUNPOBREZA"} />

      <ButtonsMunicipio
        url={"MUNICIPIO_POBREZA.xlsx"}
        handleUpload={handleUpload}
        controlInterno={"MUNPOBREZA"}
        mostrarCargaVisible
        requerirPermisoCarga={false}
        options={anios}
        onInputChange={handleFilterChange}
        placeholder={"Seleccione Año"}
        label={""}
        disabled={slideropen}
        value={filterAnio}
        handleOpen={handleOpen}
      />

      <p>
        Cargue un Excel con clave, anio, total y carencia_promedio en la segunda fila.
        clave corresponde a ClaveEstado; puede incluir columnas adicionales como municipio, que se ignorarán.
        El año se toma del archivo. El selector solo filtra la tabla.
        Los nuevos registros se agregarán y los registros anteriores permanecerán activos.
      </p>

      <MUIXDataGridMun
        columns={columns}
        rows={dataMunPobreza}
        handleBorrar={handleBorrar}
        modulo={"POBREZA"}
        controlInterno={"MUNPOBREZA"}
      />

      {open ? (
        <MunPobrezaModal
          handleClose={handleClose}
          tipo={tipoOperacion}
          dt={data}
          anios={anios}
        />
      ) : (
        ""
      )}
    </div>
  );
};
