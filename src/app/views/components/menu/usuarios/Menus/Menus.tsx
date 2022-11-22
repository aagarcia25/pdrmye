import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { AlertS } from "../../../../../helpers/AlertS";
import { Toast } from "../../../../../helpers/Toast";
import { AuthService } from "../../../../../services/AuthService";
import MUIXDataGrid from "../../../MUIXDataGrid";
import ButtonsAdd from "../../catalogos/Utilerias/ButtonsAdd";
import MenuRelPermisos from "./MenuRelPermisos";
import MenuModal from "./MenuModal";
import { getPermisos, getUser } from "../../../../../services/localStorage";
import Swal from "sweetalert2";
import { PERMISO, RESPONSE } from "../../../../../interfaces/user/UserInfo";
import BotonesAcciones from "../../../componentes/BotonesAcciones";

const Menus = () => {
  const [dt, setDt] = useState([]);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modo, setModo] = useState("");
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [vrows, setVrows] = useState({});
  const user: RESPONSE = JSON.parse(String(getUser()));

  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [agregar, setAgregar] = useState<boolean>(false);
  const [editar, setEditar] = useState<boolean>(false);
  const [eliminar, setEliminar] = useState<boolean>(false);

  const handleOpenModal = () => {
    setTipoOperacion(1);
    setModo("Insertar Registro");
    setVrows("");
    setOpenModal(true);
  };

  const handleEditar = (v: any) => {
    setTipoOperacion(2);
    setModo("Editar Registro");
    setVrows(v);
    setOpenModal(true);
  };

  

  const handleAccion = (v: any) => {
    if (v.tipo === 1) {
      handleEditar(v.data);
    } else if (v.tipo === 2) {
      handleDelete(v.data);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setOpenModal(false);
    consulta({ NUMOPERACION: 4 });
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
        AuthService.menusindex(data).then((res) => {
          if (res.SUCCESS) {
            Toast.fire({
              icon: "success",
              title: "Registro Eliminado!",
            });

            handleClose();
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

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Identificador",
      hide: true,
      width: 150,
    },
    {
      field: "acciones",
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
            eliminar={eliminar}  />
        );
      },
    },
    { field: "Menu",
      headerName: "Menu",
      width: 400,
    },
    { field: "Descripcion", headerName: "Descripcion", width: 400 },
    { field: "menupadre", headerName: "Menú Padre", width: 400 },
    { field: "Path", headerName: "Path", width: 200 },
    { field: "ControlInterno", headerName: "ControlInterno", width: 200 },
    { field: "Nivel", headerName: "Nivel", width: 100 },
    { field: "Orden", headerName: "Orden", width: 100 },
   
  ];

  const consulta = (data: any) => {
    AuthService.menusindex(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Consulta Exitosa!",
        });
        setData(res.RESPONSE);
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
      if (String(item.ControlInterno) === "MENUS") {
        //console.log(item);
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
    consulta({ NUMOPERACION: 4 });
  }, []);

  return (
    <div>
      {open ? (
        <MenuRelPermisos
          open={open}
          handleClose={handleClose}
          dt={dt}
        ></MenuRelPermisos>
      ) : (
        ""
      )}
      {openModal ? (
        <MenuModal
          open={openModal}
          handleClose={handleClose}
          tipo={tipoOperacion}
          vrows={vrows}
        ></MenuModal>
      ) : (
        ""
      )}

      <ButtonsAdd handleOpen={handleOpenModal} agregar={agregar} />
      <MUIXDataGrid columns={columns} rows={data} />
    </div>
  );
};

export default Menus;
