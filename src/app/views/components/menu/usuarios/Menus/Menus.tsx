import { Tooltip, IconButton } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Alert } from "../../../../../helpers/Alert";
import { Toast } from "../../../../../helpers/Toast";
import { AuthService } from "../../../../../services/AuthService";
import { messages } from "../../../../styles";
import AccionesGrid from "../../../AccionesGrid";
import MUIXDataGrid from "../../../MUIXDataGrid";
import ButtonsAdd from "../../catalogos/Utilerias/ButtonsAdd";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import MenuRelPermisos from "./MenuRelPermisos";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import MenuAsignaPermisos from "./MenuAsignaPermisos";
import MenuModal from "./MenuModal";
import { getUser } from "../../../../../services/localStorage";
import Swal from "sweetalert2";
import { RESPONSE } from "../../../../../interfaces/user/UserInfo";

const Menus = () => {
  const [dt, setDt] = useState([]);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [openRel, setOpenRel] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modo, setModo] = useState("");
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [vrows, setVrows] = useState({});
  const user: RESPONSE = JSON.parse(String(getUser()));




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


  const handleRel = (v: any) => {
    setDt(v);
    setOpenRel(true);

  };

  const handleViewPermisos = (v: any) => {
    setDt(v);
    setOpen(true);
  };


  const handleClose = () => {
    setOpen(false);
    setOpenRel(false);
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
          console.log(v);
  
          let data = {
            NUMOPERACION: 3,
            CHID: v.row.id,
            CHUSER:user.id,
          };
          console.log(data);  
          AuthService.menusindex(data).then((res) => {
            if (res.SUCCESS) {
              Toast.fire({
                icon: "success",
                title: "Registro Eliminado!",
              });
  
              handleClose();
            } else {
              Alert.fire({
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
      description: messages.dataTableColum.id,
    },
    {
      field: "Menu",
      headerName: "Menu",
      width: 150,
    },
    { field: "Descripcion", headerName: "Descripcion", width: 400 },

    {
      field: "acciones",
      headerName: "Acciones",
      description: "Campo de Acciones",
      sortable: false,
      width: 200,
      renderCell: (v) => {
        return (
          <>
            <AccionesGrid
              handleEditar={handleEditar}
              handleBorrar={handleDelete}
              v={v}
              update={true}
              pdelete={true}
            />

            <Tooltip title={"Ver Permisos Relaciados al Menpu"}>
              <IconButton onClick={() => handleViewPermisos(v)}>
                <RemoveRedEyeIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title={"Relacionar Menú"}>
              <IconButton onClick={() => handleRel(v)}>
                <AccountTreeIcon />
              </IconButton>
            </Tooltip>
          </>
        );
      },
    },
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
        Alert.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };

  useEffect(() => {
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


      {openRel ? (
        <MenuAsignaPermisos
          open={openRel}
          handleClose={handleClose}
          dt={dt}
        ></MenuAsignaPermisos>
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



      <ButtonsAdd handleOpen={handleOpenModal} />
      <MUIXDataGrid columns={columns} rows={data} />
    </div>
  );
};

export default Menus;
