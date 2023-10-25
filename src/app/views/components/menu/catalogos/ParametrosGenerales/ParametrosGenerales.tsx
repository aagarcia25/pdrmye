/* eslint-disable array-callback-return */
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AlertS } from "../../../../../helpers/AlertS";
import { Toast } from "../../../../../helpers/Toast";
import {
  ITEMS,
  PERMISO,
  USUARIORESPONSE,
  menus,
} from "../../../../../interfaces/user/UserInfo";
import { ParametroServices } from "../../../../../services/ParametroServices";
import {
  getMenus,
  getPermisos,
  getUser,
} from "../../../../../services/localStorage";
import { messages } from "../../../../styles";
import MUIXDataGridMun from "../../../MUIXDataGridMun";
import BotonesAcciones from "../../../componentes/BotonesAcciones";
import NombreCatalogo from "../../../componentes/NombreCatalogo";
import ButtonsAdd from "../Utilerias/ButtonsAdd";
import { ParametrosGeneralesModal } from "./ParametrosGeneralesModal";

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
  const menu: menus[] = JSON.parse(String(getMenus()));
  const [nombreMenu, setNombreMenu] = useState("");

  const columns: GridColDef[] = [
    {
      field: "id",
      hide: true,
      headerName: "Identificador",
      width: 150,
      description: messages.dataTableColum.id,
    },
    {
      field: "acciones",
      disableExport: true,
      headerName: "Acciones",
      description: "Campo de Acciones",
      sortable: false,
      width: 150,
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
      width: 200,
    },
    {
      field: "CreadoP",
      headerName: "Creado Por",
      description: "Creado Por",
      width: 200,
    },
    {
      field: "Nombre",
      headerName: "Nombre",
      description: "Nombre",
      width: 360,
    },
    { field: "Valor", headerName: "Valor", description: "Valor", width: 250 },
    {
      field: "slug",
      headerName: "Referencia",
      description: "Referencia",
      width: 250,
    },
    {
      field: "Descripcion",
      headerName: "Descripción",
      description: "Descripción",
      width: 450,
    },
  ];
  const handleAccion = (v: any) => {
    if (v.tipo == 1) {
      setTipoOperacion(2);
      setModo("Editar");
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

  const handleBorrar = () => {};

  const handleOpen = (v: any) => {
    setTipoOperacion(1);
    setModo("Agregar Registro");
    setOpen(true);
    setVrows("");
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

        ParametroServices.ParametroGeneralesIndex(data).then((res) => {
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
  const consulta = (data: any) => {
    ParametroServices.ParametroGeneralesIndex(data).then((res) => {
      if (res.SUCCESS) {
        setParametroGeneral(res.RESPONSE);
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
      if (String(item.menu) === "PG") {
        if (String(item.ControlInterno) === "AGREG") {
          setAgregar(true);
        }
        if (String(item.ControlInterno) === "ELIM") {
          setEliminar(true);
        }
        if (String(item.ControlInterno) === "EDIT") {
          setEditar(true);
        }
      }
    });

    consulta({ NUMOPERACION: 4 });
  }, []);

  return (
    <div style={{ height: 600, width: "100%" }}>
      {open ? (
        <ParametrosGeneralesModal
          open={open}
          modo={modo}
          tipo={tipoOperacion}
          handleClose={handleClose}
          dt={vrows}
        />
      ) : (
        ""
      )}
      <NombreCatalogo controlInterno={"PG"} />
      <ButtonsAdd handleOpen={handleOpen} agregar={agregar} />
      <MUIXDataGridMun
        columns={columns}
        rows={parametroGeneral}
        modulo={nombreMenu.toUpperCase().replace(" ", "_")}
        handleBorrar={handleBorrar}
        controlInterno={"PG"}
      />
    </div>
  );
};
