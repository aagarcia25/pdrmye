
import React from "react";
import { useEffect, useState } from "react";
import { GridColDef, GridSelectionModel } from "@mui/x-data-grid";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import { messages } from "../../../../styles";
import UmasModel from "./UmasModel";
import ButtonsAdd from "../Utilerias/ButtonsAdd";
import Swal from "sweetalert2";
import { Toast } from "../../../../../helpers/Toast";
import { AlertS } from "../../../../../helpers/AlertS";
import MUIXDataGrid from "../../../MUIXDataGrid";
import { PERMISO, RESPONSE } from "../../../../../interfaces/user/UserInfo";
import { getPermisos, getUser } from "../../../../../services/localStorage";
import BotonesAcciones from "../../../componentes/BotonesAcciones";
import ButtonsMunicipio from "../Utilerias/ButtonsMunicipio";
import MUIXDataGridMun from "../../../MUIXDataGridMun";




export const Umas = () => {
  const [modo, setModo] = useState("");
  const [open, setOpen] = useState(false);
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [vrows, setVrows] = useState({});
  const [conUmas, setUmas] = useState([]);
  const user: RESPONSE = JSON.parse(String(getUser()));
  const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([]);


  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [agregar, setAgregar] = useState<boolean>(false);
  const [editar, setEditar] = useState<boolean>(false);
  const [eliminar, setEliminar] = useState<boolean>(false);

  const handleAccion=(v: any)=>{
    if(v.tipo ==1){
      console.log(v)
      setTipoOperacion(2);
      setModo("Editar Registro");
      setOpen(true);
      setVrows(v.data);
    }else if(v.tipo ==2){
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
            CHID: v.data.row.id,
            CHUSER: user.id
          };
          console.log(data);
  
          CatalogosServices.umas(data).then((res) => {
            if (res.SUCCESS) {
              Toast.fire({
                icon: "success",
                title: "Registro Eliminado!",
              });
  
              consulta({ NUMOPERACION: 4 });
  
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
  }

  const columns: GridColDef[] = [
    {
      field: "id",
      hide: true,
    },
    {
      field: "acciones",
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
            eliminar={eliminar} />
        );
      },
    },
    { field: "Anio", headerName: "Año", width: 150 },
    { field: "Diario", headerName: "Diario", width: 150 },
    { field: "Mensual", headerName: "Mensual", width: 150 },
    { field: "Anual", headerName: "Anual", width: 150 },


  ];

  const handleClose = () => {
    setOpen(false);
    consulta({ NUMOPERACION: 4 })

  };

  const handleOpen = (v: any) => {
    setTipoOperacion(1);
    setModo("Agregar Registro");
    setOpen(true);
    setVrows("");
  };

  const handleBorrar = (v: any) => {
    setSelectionModel(v);
  };


  const handleUpload = (data: any) => {

    if (data.tipo == 1) {


    } 
    else if (data.tipo == 2) {
      console.log("borrado de toda la tabla")
      console.log(selectionModel)

      if(selectionModel.length!==0){
      Swal.fire({
        icon: "question",
        title: selectionModel.length +" Registros Se Eliminaran!!",
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
          console.log(data);
  
          CatalogosServices.umas(data).then((res) => {
            if (res.SUCCESS) {
              Toast.fire({
                icon: "success",
                title: "Borrado!",
              });
  
              consulta({
                NUMOPERACION: 4,
                CHUSER: user.id
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
    CatalogosServices.umas(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Consulta Exitosa!",
        });
        setUmas(res.RESPONSE);
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
      if (String(item.ControlInterno) === "UMAS") {
        console.log(item)
        if (String(item.Referencia) == "AGREG") {
          setAgregar(true);
        }
        if (String(item.Referencia) == "ELIM") {
          setEliminar(true);
        }
        if (String(item.Referencia) == "EDIT") {
          setEditar(true);
        }
        
      }
    });
    consulta({ NUMOPERACION: 4 })
  }, []);



  return (
    <div style={{ height: 600, width: "100%" }}>
      {open ? (
        <UmasModel
          open={open}
          tipo={tipoOperacion}
          handleClose={handleClose}
          dt={vrows}
        />
      ) : (
        ""
      )}
       <ButtonsMunicipio
        url={""}
        handleUpload={handleUpload} controlInterno={"UMAS"} />

      <ButtonsAdd handleOpen={handleOpen} agregar={agregar} />
     < MUIXDataGridMun columns={columns} rows={conUmas} handleBorrar={handleBorrar} borrar={eliminar}   />



    </div>
  );
};
