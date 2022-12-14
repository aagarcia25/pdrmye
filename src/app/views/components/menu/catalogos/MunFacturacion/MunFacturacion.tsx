import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { GridColDef, GridSelectionModel } from "@mui/x-data-grid";
import { getPermisos, getUser, } from "../../../../../services/localStorage";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import { messages } from "../../../../styles";
import ButtonsMunicipio from "../Utilerias/ButtonsMunicipio";
import Slider from "../../../Slider";
import { Toast } from "../../../../../helpers/Toast";
import { AlertS } from "../../../../../helpers/AlertS";
import Swal from "sweetalert2";
import MunFacturacionModal from "./MunFacturacionModal";
import { Moneda } from "../../CustomToolbar";
import SelectFrag from "../../../Fragmentos/SelectFrag";
import { fanios } from "../../../../../share/loadAnios";
import SelectValues from "../../../../../interfaces/Select/SelectValues";
import { PERMISO, RESPONSE } from "../../../../../interfaces/user/UserInfo";
import BotonesAcciones from "../../../componentes/BotonesAcciones";
import MUIXDataGridMun from "../../../MUIXDataGridMun";
import NombreCatalogo from "../../../componentes/NombreCatalogo";

export const MunFacturacion = () => {

  const [modo, setModo] = useState("");
  const [open, setOpen] = useState(false);
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [data, setData] = useState({});
  const [Facturacion, setFacturacion] = useState([]);
  const [plantilla, setPlantilla] = useState("");
  const [slideropen, setslideropen] = useState(false);
  const [anios, setAnios] = useState<SelectValues[]>([]);
  const user: RESPONSE = JSON.parse(String(getUser()));
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  // const [agregar, setAgregar] = useState<boolean>(false);
  const [editar, setEditar] = useState<boolean>(false);
  const [eliminar, setEliminar] = useState<boolean>(false);
  const [nombreMenu, setNombreMenu] = useState("");
  const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([]);



  // VARIABLES PARA LOS FILTROS
  const [filterAnio, setFilterAnio] = useState("");

  //funciones
  const handleFilterMes = () => { };

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
      field: "acciones", disableExport: true,
      headerName: "Acciones",
      description: "Campo de Acciones",
      sortable: false,
      width: 100,
      renderCell: (v) => {
        return (
          <BotonesAcciones handleAccion={handleAccion} row={v} editar={editar} eliminar={eliminar}></BotonesAcciones>

        );
      },
    },
    { field: "FechaCreacion", headerName: "Fecha Creaci??n",description: "Fecha Creaci??n", width: 180 },
    { field: "ClaveEstado",   headerName: "Clave Estado",  description: "Clave Estado",   width: 100 },
    { field: "Nombre",        headerName: "Municipio",     description: "Municipio",      width: 220 },
    { field: "Anio",          headerName: "A??o",           description: "A??o",            width: 150 },
    { field: "Facturacion",   headerName: "Facturado",     description: "Facturado",      width: 150, ...Moneda}

  ];


  const handleAccion = (v: any) => {
    if (v.tipo === 1) {
      setTipoOperacion(2);
      setModo("Editar ");
      setOpen(true);
      setData(v.data);
    } else if (v.tipo === 2) {
      handleDelete(v.data);
    }
  }


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
    setModo("Agregar Registro");
    setOpen(true);
    setData("");
  };

  const handleEdit = (v: any) => {
    setTipoOperacion(2);
    setModo("Editar Registro");
    setOpen(true);
    setData(v);
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

        CatalogosServices.munfacturacion(data).then((res) => {
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



  const handleUpload = (data: any) => {

    if (data.tipo === 1) {
      setslideropen(true);
      let file = data.data?.target?.files?.[0] || "";
      const formData = new FormData();
      formData.append("inputfile", file, "inputfile.xlsx");
      formData.append("tipo", "MunFacturacion");
      CatalogosServices.migraData(formData).then((res) => {
        setslideropen(false);
        if (res.SUCCESS) {
          Toast.fire({
            icon: "success",
            title: "Carga Exitosa!",
          });
        } else {
          AlertS.fire({
            title: "Error!",
            text: res.STRMESSAGE,
            icon: "error",
          });
        }



      });
    }
    else if (data.tipo === 2) {

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
              CHUSER: user.id,

            };
            //console.log(data);

            CatalogosServices.munfacturacion(data).then((res) => {
              if (res.SUCCESS) {
                Toast.fire({
                  icon: "success",
                  title: "Borrado!",
                });

                consulta({
                  NUMOPERACION: 4,
                  CHUSER: user.id,
                  ANIO: filterAnio,
                });

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


  const consulta = (data: any) => {
    CatalogosServices.munfacturacion(data).then((res) => {
      setFacturacion(res.RESPONSE);
    });
  };

  const handleBorrar = (v: any) => {
    setSelectionModel(v);
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
      consulta({ NUMOPERACION: 4,ANIO: "",});
      setFilterAnio("");

    }
  };

  const downloadplantilla = () => {
    let data = {
      NUMOPERACION: "MUNICIPIO_FACTURACION",
    };

    CatalogosServices.descargaplantilla(data).then((res) => {
      setPlantilla(res.RESPONSE);
    });
  };

  useEffect(() => {
    setAnios(fanios());
    downloadplantilla();

    permisos.map((item: PERMISO) => {
      if (String(item.ControlInterno) === "MUNFA") {
        setNombreMenu(item.Menu);
        if (String(item.Referencia) === "ELIM") {
          setEliminar(true);
        }
        if (String(item.Referencia) === "EDIT") {
          setEditar(true);
        }
      }
    });
    let data = {
      NUMOPERACION: 4,
      ANIO: "",
    };
    consulta(data);
  }, []);

  return (
    <div style={{ height: 600, width: "100%", padding: "2%" }}>
      <Slider open={slideropen}></Slider>
      <NombreCatalogo controlInterno={"MUNFA"} />

      <ButtonsMunicipio
        url={plantilla}
        handleUpload={handleUpload} controlInterno={"MUNFA"} 
        value={''}
        options={anios}
        onInputChange={handleFilterChange}
        placeholder={"Seleccione A??o"} label={""} disabled={false} />
      < MUIXDataGridMun columns={columns} rows={Facturacion} handleBorrar={handleBorrar} modulo={nombreMenu.toUpperCase().replace(' ', '_')} controlInterno={"MUNFA"} />

      {open ? (
        <MunFacturacionModal
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
