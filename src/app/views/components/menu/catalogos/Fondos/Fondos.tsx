import { useEffect, useState } from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { getPermisos, getUser } from "../../../../../services/localStorage";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ButtonsAdd from "../Utilerias/ButtonsAdd";
import Swal from "sweetalert2";
import { Toast } from "../../../../../helpers/Toast";
import { Alert } from "../../../../../helpers/Alert";
import FondosModal from "./FondosModal";
import MUIXDataGrid from "../../../MUIXDataGrid";
import { PERMISO, RESPONSE } from "../../../../../interfaces/user/UserInfo";
import FondosView from "./FondosView";
import BotonesAcciones from "../../../componentes/BotonesAcciones";

const Fondos = () => {

  const [modo, setModo] = useState("");
  const [open, setOpen] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const user: RESPONSE = JSON.parse(String(getUser()));
  const [vrows, setVrows] = useState({});
  const [fondos, setFondos] = useState([]);
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [agregar, setAgregar] = useState<boolean>(false);
  const [editar, setEditar] = useState<boolean>(false);
  const [eliminar, setEliminar] = useState<boolean>(false);
  const [view, setView] = useState<boolean>(false);

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Identificador",
      hide: true,
      width: 10,
    },
    {
      field: "acciones",
      headerName: "Acciones",
      description: "Campo de Acciones",
      sortable: false,
      width: 200,
      renderCell: (v) => {
        return (
          <Box>
            <BotonesAcciones handleAccion={handleAccion} row={v} editar={editar} eliminar={eliminar}></BotonesAcciones>
           
            {view ? 
             <Tooltip title={"Visualizar Ajustes"}>
              <IconButton onClick={() => handleView(v)}>
              <RemoveRedEyeIcon />
            </IconButton>
            </Tooltip>
             : ""}
            
          
          </Box>
        );
      },
    },
    { field: "Clave", headerName: "Clave", width: 150 },
    { field: "Descripcion", headerName: "Descripcion", width: 450 },
    {
      field: "AplicaCalculo",
      headerName: "Aplica Cálculo",
      width: 120,
      renderCell: (v) => {
        return <Box>{v.row.AplicaCalculo === 1 ? "SI" : "No"}</Box>;
      },
    },
    {
      field: "Vigente",
      headerName: "Vigente",
      width: 100,
      renderCell: (v) => {
        return <Box>{v.row.Vigente === 1 ? "SI" : "No"}</Box>;
      },
    },
    {
      field: "Estatal",
      headerName: "Estatal",
      width: 100,

      renderCell: (v) => {
        return <Box>{v.row.Estatal === 1 ? "SI" : "No"}</Box>;
      },
    },
    {
      field: "Federal",
      headerName: "Federal",
      width: 100,
      renderCell: (v) => {
        return <Box>{v.row.Federal === 1 ? "SI" : "No"}</Box>;
      },
    },
    { field: "idtipo", headerName: "idtipo", width: 150, hide: true },
    { field: "dtipo", headerName: "Tipo", width: 250 },

    
  ];
  const handleAccion = (v: any) => {
    if (v.tipo == 1) {
      setTipoOperacion(2);
      setModo("Editar Registro");
      setOpen(true);
      setVrows(v.data);
    } else if (v.tipo == 2) {
      handleDelete(v.data);
    }
  }


  const handleClose = () => {
    setOpen(false);
    setOpenView(false);
    consulta({ NUMOPERACION: 4 });
  };

  const handleView = (v: any) => {
    setOpenView(true);
    setVrows(v);



  };
  const handleOpen = (v: any) => {
    setTipoOperacion(1);
    setModo("Agregar Registro");
    setOpen(true);
    setVrows("");
  };

  const handleEdit = (v: any) => {
    console.log(v);
    setTipoOperacion(2);
    setModo("Editar Registro");
    setOpen(true);
    setVrows(v);
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
          CHUSER: user.id
        };
        console.log(data);

        CatalogosServices.fondos(data).then((res) => {
          if (res.SUCCESS) {
            Toast.fire({
              icon: "success",
              title: "Registro Eliminado!",
            });

            consulta({ NUMOPERACION: 4 });
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

  const consulta = (data: any) => {
    CatalogosServices.fondos(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Consulta Exitosa!",
        });
        setFondos(res.RESPONSE);
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

    permisos.map((item: PERMISO) => {
      if (String(item.ControlInterno) === "FONDOS") {
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
        if (String(item.Referencia) == "VIS") {
          setView(true);
        }
      }
    });
    consulta({ NUMOPERACION: 4 });
  }, []);

  return (
    <div style={{ height: 600, width: "100%" }}>
      {(open) ? (
        <FondosModal
          open={open}
          modo={modo}
          tipo={tipoOperacion}
          handleClose={handleClose}
          dt={vrows}
        />
      ) : (
        ""
      )}
      {(openView) ? (
        <FondosView
          open={openView}
          modo={modo}
          tipo={tipoOperacion}
          handleClose={handleClose}
          dt={vrows}
        />
      ) : (
        ""
      )}

      <ButtonsAdd handleOpen={handleOpen} agregar={agregar} />
      <MUIXDataGrid columns={columns} rows={fondos} />


    </div>
  );
};

export default Fondos;
