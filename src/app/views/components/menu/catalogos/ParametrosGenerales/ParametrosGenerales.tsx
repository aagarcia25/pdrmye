import { useEffect, useState } from "react";
import { getMenus, getPermisos, getUser } from "../../../../../services/localStorage";
import { PERMISO, RESPONSE } from "../../../../../interfaces/user/UserInfo";
import { GridColDef } from "@mui/x-data-grid";
import { messages } from "../../../../styles";
import Swal from "sweetalert2";
import { Toast } from "../../../../../helpers/Toast";
import { AlertS } from "../../../../../helpers/AlertS";
import { ParametroServices } from "../../../../../services/ParametroServices";
import MUIXDataGrid from "../../../MUIXDataGrid";
import { ParametrosGeneralesModal } from "./ParametrosGeneralesModal";
import ButtonsAdd from "../Utilerias/ButtonsAdd";
import BotonesAcciones from "../../../componentes/BotonesAcciones";
import { Grid, Typography } from "@mui/material";

import { ITEMS, MENU } from '../../../../../interfaces/user/UserInfo';
import NombreCatalogo from "../../../componentes/NombreCatalogo";
import MUIXDataGridMun from "../../../MUIXDataGridMun";


export const ParametrosGenerales = () => {
  const [parametroGeneral, setParametroGeneral] = useState([]);
  const [modo, setModo] = useState("");
  const [open, setOpen] = useState(false);
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [vrows, setVrows] = useState({});
  const [agregar, setAgregar] = useState<boolean>(false);
  const [editar, setEditar] = useState<boolean>(false);
  const [eliminar, setEliminar] = useState<boolean>(false);
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const menu: MENU[] = JSON.parse(String(getMenus()));
  const [nombreMenu, setNombreMenu] = useState("");

  //console.log("parametroGeneral", parametroGeneral);

  const columns: GridColDef[] = [
    {
      field: "id",
      hide: true,
      headerName: "Identificador",
      width: 150,
      description: messages.dataTableColum.id,
    },
    {
      field: "acciones",  disableExport: true,
      headerName: "Acciones",
      description: "Campo de Acciones",
      sortable: false,
      width: 150,
      renderCell: (v) => {
        return (
          <BotonesAcciones handleAccion={handleAccion} row={v} editar={editar} eliminar={eliminar}></BotonesAcciones>
        );
      },
    },
    { field: "FechaCreacion", headerName: "Fecha Creación", description: "Fecha Creación",width: 200,},
    { field: "CreadoP",       headerName: "Creado Por",     description: "Creado Por",    width: 200, },
    { field: "Nombre",        headerName: "Nombre",         description: "Nombre",        width: 200,},
    { field: "Valor",         headerName: "Valor",          description: "Valor",         width: 250, },
    { field: "slug",          headerName: "Referencia",     description: "Referencia",    width: 250, },
    { field: "Descripcion",   headerName: "Descripción",    description: "Descripción",   width: 250,},

  ];
  const handleAccion = (v: any) => {
    if (v.tipo === 1) {
      setTipoOperacion(2);
      setModo("Editar ");
      setOpen(true);
      setVrows(v.data);
      console.log(v.data);

    } else if (v.tipo === 2) {
      handleDelete(v.data);
    }
  }


  const handleClose = () => {
    setOpen(false);
    consulta({ NUMOPERACION: 4 });
  };

  const handleBorrar = () => {

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
        const user: RESPONSE = JSON.parse(String(getUser()));

        let data = {
          NUMOPERACION: 3,
          CHID: v.row.id,
          CHUSER: user.id,
        };
        //console.log(data);

        ParametroServices.ParametroGeneralesIndex(data).then((res) => {
          if (res.SUCCESS) {
            Toast.fire({
              icon: "success",
              title: "Registro Eliminado!",
            });

            let data = {
              NUMOPERACION: 4,
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
  const consulta = (data: any) => {
    ParametroServices.ParametroGeneralesIndex(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Consulta Exitosa!",
        });
        //console.log(data);
        setParametroGeneral(res.RESPONSE);
        //console.log("parametroGeneral consulta", parametroGeneral);
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
      menu.map((item: MENU) => {
        item.items.map((itemsMenu: ITEMS) => {
          if (String(itemsMenu.ControlInterno) === "PG") {
            setNombreMenu(itemsMenu.Menu);
          }
        });
      });

      if (String(item.ControlInterno) === "PG") {
        //console.log(item)
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
    consulta({ NUMOPERACION: 4 })
  }, []);

  return (
    <div style={{ height: 600, width: "100%" }}>
      {open ?
        <ParametrosGeneralesModal
          open={open}
          modo={modo}
          tipo={tipoOperacion}
          handleClose={handleClose}
          dt={vrows}
        />
        : ""}
      <NombreCatalogo controlInterno={"PG"} />
      <ButtonsAdd handleOpen={handleOpen} agregar={agregar} />
      <MUIXDataGridMun columns={columns} rows={parametroGeneral} modulo={nombreMenu.toUpperCase().replace(' ','_')} handleBorrar={handleBorrar} borrar={false} />
    </div>
  );
};
