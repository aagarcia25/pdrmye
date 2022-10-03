import { useEffect, useState } from "react";
import { Box, IconButton } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { getUser } from "../../../../../services/localStorage";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { messages } from "../../../../styles";
import ButtonsAdd from "../Utilerias/ButtonsAdd";
import Swal from "sweetalert2";
import { Toast } from "../../../../../helpers/Toast";
import { Alert } from "../../../../../helpers/Alert";
import FondosModal from "./FondosModal";
import MUIXDataGrid from "../../../MUIXDataGrid";

const Fondos = () => {
  
  const [modo, setModo] = useState("");
  const [open, setOpen] = useState(false);
  const [tipoOperacion, setTipoOperacion] = useState(0);

  const [vrows, setVrows] = useState({});
  const [fondos, setFondos] = useState([]);

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Identificador",
      hide: true,
      width: 150,
      description: messages.dataTableColum.id,
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

    {
      field: "acciones",
      headerName: "Acciones",
      description: "Campo de Acciones",
      sortable: false,
      width: 200,
      renderCell: (v) => {
        return (
          <Box>
            <IconButton onClick={() => handleEdit(v)}>
              <ModeEditOutlineIcon />
            </IconButton>
            <IconButton onClick={() => handleDelete(v)}>
              <DeleteForeverIcon />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  const handleClose = () => {
    setOpen(false);
    consulta({ NUMOPERACION: 4 });
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
          CHUSER: 1,
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
    consulta({ NUMOPERACION: 4 });
  }, []);

  return (
    <div style={{ height: 600, width: "100%" }}>
      {open ? (
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

      <ButtonsAdd handleOpen={handleOpen} />
      <MUIXDataGrid columns={columns} rows={fondos} />


    </div>
  );
};

export default Fondos;
