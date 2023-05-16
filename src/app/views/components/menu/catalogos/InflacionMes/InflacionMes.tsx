import { GridColDef, GridSelectionModel } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AlertS } from "../../../../../helpers/AlertS";
import { Toast } from "../../../../../helpers/Toast";
import SelectValues from "../../../../../interfaces/Select/SelectValues";
import { PERMISO, RESPONSE } from "../../../../../interfaces/user/UserInfo";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import { getPermisos, getUser } from "../../../../../services/localStorage";
import { fanios } from "../../../../../share/loadAnios";
import { messages } from "../../../../styles";
import MUIXDataGridMun from "../../../MUIXDataGridMun";
import Slider from "../../../Slider";
import BotonesAcciones from "../../../componentes/BotonesAcciones";
import NombreCatalogo from "../../../componentes/NombreCatalogo";
import { porcentage } from "../../CustomToolbar";
import ButtonsMunicipio from "../Utilerias/ButtonsMunicipio";
import InflacionMesModal from "./InflacionMesModal";




const InflacionMes = () => {

  const [modo, setModo] = useState("");
  const [open, setOpen] = useState(false);
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [vrows, setVrows] = useState({});
  const [dataInflacionMes, setDataInflacionMes] = useState([]);
  const user: RESPONSE = JSON.parse(String(getUser()));
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [agregar, setAgregar] = useState<boolean>(false);
  const [editar, setEditar] = useState<boolean>(false);
  const [eliminar, setEliminar] = useState<boolean>(false);
  const [nombreMenu, setNombreMenu] = useState("");
  const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([]);
  const [slideropen, setslideropen] = useState(false);
  const [anios, setAnios] = useState<SelectValues[]>([]);
  const [filterAnio, setFilterAnio] = useState("");



  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Identificador",
      hide: true,
      width: 150,
      description: messages.dataTableColum.id,
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
    { field: "Anio", headerName: "Año", description: "Año", width: 150 },
    { field: "Mes", headerName: "Mes", description: "Mes", width: 150, hide: true, },
    { field: "Descripcion", headerName: "Mes", description: "Mes", width: 150 },
    { field: "Inflacion", headerName: "Inflación", description: "Inflación", width: 150, ...porcentage },
  ];

  const handleAccion = (v: any) => {
    if (v.tipo === 1) {
      setTipoOperacion(2);
      setModo("Editar");
      setOpen(true);
      setVrows(v.data);
    } else if (v.tipo === 2) {
      handleDelete(v.data);
    }
  }


  const handleClose = () => {
    setOpen(false);
    consulta({ NUMOPERACION: 4 },"")

  };
  const handleBorrar = () => {

  };

  const handleOpen = (v: any) => {
    setTipoOperacion(1);
    setModo("Agregar Registro");
    setOpen(true);
    setVrows("");
  };
  const handleUpload = (data: any) => {

    if (data.tipo === 1) {
      Swal.fire({
        icon: "warning",
        title: "Opción aun no Disponible",
        confirmButtonText: "Aceptar",
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
              CHUSER: user.id
            };
           

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



  const handleDelete = (v: any) => {
    Swal.fire({
      icon: "info",
      title: "¿Estás seguro de eliminar este registro?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Confirmar",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {

        let data = {
          NUMOPERACION: 3,
          CHID: v.row.id,
          CHUSER: user.id
        };

        CatalogosServices.inflacionMes(data).then((res) => {
          if (res.SUCCESS) {
            Toast.fire({
              icon: "success",
              title: "¡Registro Eliminado!",
            });

            consulta({ NUMOPERACION: 4 },"");

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

  const handleFilterChange = (v: string) => {
    setFilterAnio(v);

    let data = {
      NUMOPERACION: 4,
      ANIO: v,
    };
    if (v !== "false") {
      setFilterAnio(v);
      consulta(data,"");
    } else {
      consulta({ NUMOPERACION: 4, ANIO: "", }, "");
      setFilterAnio("");

    }
  };

  const consulta = (data: any, mensaje: string) => {
    CatalogosServices.inflacionMes(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "¡Consulta Exitosa!",
        });
  
        setDataInflacionMes(res.RESPONSE);
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
      if (String(item.ControlInterno) === "INFMES") {
        //console.log(item)
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
    consulta({ NUMOPERACION: 4 },"")
    setAnios(fanios());


  }, []);



  return (
    <div style={{ height: 600, width: "100%" }}>
      <Slider open={slideropen}></Slider>

      {open ? (
        <InflacionMesModal
          modo={modo}
          tipo={tipoOperacion}
          handleClose={handleClose}
          dt={vrows}
        />
      ) : (
        ""
      )}
      <NombreCatalogo controlInterno={"INFMES"} />
      <ButtonsMunicipio
        url={""}
        handleUpload={handleUpload} controlInterno={"INFMES"}
        options={anios}
        onInputChange={handleFilterChange}
        placeholder={"Seleccione Año"} label={''} disabled={false}
        value={filterAnio} handleOpen={handleOpen} />

      <MUIXDataGridMun columns={columns} rows={dataInflacionMes} modulo={nombreMenu.toUpperCase().replace(' ', '_')} handleBorrar={handleBorrar} controlInterno={"INFMES"} />

    </div>
  )





}

export default InflacionMes
