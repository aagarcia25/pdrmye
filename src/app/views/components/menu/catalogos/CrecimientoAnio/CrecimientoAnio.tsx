import { useEffect, useState } from "react";
import {
  Box,
  IconButton,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { messages } from "../../../../styles";
import ButtonsAdd from "../Utilerias/ButtonsAdd";
import Swal from "sweetalert2";
import { Toast } from "../../../../../helpers/Toast";
import { AlertS } from "../../../../../helpers/AlertS";
import CrecimietoModal from "./CrecimietoModal";
import MUIXDataGrid from "../../../MUIXDataGrid";
import { getPermisos, getUser } from "../../../../../services/localStorage";
import { PERMISO, RESPONSE } from "../../../../../interfaces/user/UserInfo";
import BotonesAcciones from "../../../componentes/BotonesAcciones";


const CrecimientoAnio = () => {

  const [modo, setModo] = useState("");
  const [open, setOpen] = useState(false);
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [vrows, setVrows] = useState({});
  const [dataCrecimientoAnio, setDataCrecimientoAnio] = useState([]);
  const user: RESPONSE = JSON.parse(String(getUser()));
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [agregar, setAgregar] = useState<boolean>(false);
  const [editar, setEditar] = useState<boolean>(false);
  const [eliminar, setEliminar] = useState<boolean>(false);

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Identificador",
      hide: true,
      width: 150,
      description: messages.dataTableColum.id,
    },
    { field: "Anio", headerName: "Año", width: 150 },
    { field: "Crecimiento", headerName: "Crecimiento", width: 150 },

    {
      field: "acciones",
      headerName: "Acciones",
      description: "Campo de Acciones",
      sortable: false,
      width: 200,
      renderCell: (v) => {
        return (
          <BotonesAcciones handleAccion={handleAccion} row={v} editar={editar} eliminar={eliminar}></BotonesAcciones>

        );
      },
    },
  ];
  const handleAccion = (v: any) => {
    if (v.tipo == 1) {
      setTipoOperacion(2);
      setModo("Editar ");
      setOpen(true);
      setVrows(v.data);
    } else if (v.tipo == 2) {
      handleDelete(v.data);
    }
  }

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
          CHUSER: user.id,
        };
        //console.log(data);

        CatalogosServices.crecimientoAnio(data).then((res) => {
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
  };

  const consulta = (data: any) => {
    CatalogosServices.crecimientoAnio(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Consulta Exitosa!",
        });
        setDataCrecimientoAnio(res.RESPONSE);
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
      if (String(item.ControlInterno) === "CRECANIO") {
        //console.log(item)
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
        <CrecimietoModal
          open={open}
          modo={modo}
          tipo={tipoOperacion}
          handleClose={handleClose}
          dt={vrows}
        />
      ) : (
        ""
      )}

      <ButtonsAdd handleOpen={handleOpen} agregar={agregar} />
      <MUIXDataGrid columns={columns} rows={dataCrecimientoAnio} />

    </div>
  )
}

export default CrecimientoAnio
