import { useEffect, useState } from "react";
import {
  Box,
  IconButton,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { getUser } from "../../../../../services/localStorage";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CoeficientesModal from "./CoeficientesModal";
import { Toast } from "../../../../../helpers/Toast";
import { Alert } from "../../../../../helpers/Alert";
import Swal from "sweetalert2";
import ButtonsAdd from "../Utilerias/ButtonsAdd";
import MUIXDataGrid from "../../../MUIXDataGrid";
import { RESPONSE } from "../../../../../interfaces/user/UserInfo";

export const Coeficientes = () => {



  //   VALORES POR DEFAULT
  const [modo, setModo] = useState("");
  const [open, setOpen] = useState(false);
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [dataCoeficientes, setDataCoeficientes] = useState([]);
  const [slideropen, setslideropen] = useState(false);
  const [vrows, setVrows] = useState({});
  const user: RESPONSE = JSON.parse(String(getUser()));


  const columns: GridColDef[] = [
    { field: "id", headerName: "Id", hide: true, width: 250 },
    { field: "Descripcion", headerName: "Descripcion", width: 700 },
    {
      field: "Vigente",
      headerName: "Vigente",
      width: 150,
      renderCell: (v) => {
        return (
          <Box>
            {v.row.Vigente == 1 ? 'Vigente' : 'No Vigente'}
          </Box>
        );
      },
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
    let data = {
      NUMOPERACION: 4
    };
    consulta(data);
  };

  const handleOpen = (v: any) => {
    setVrows({});
    setTipoOperacion(1);
    setModo("Agregar Registro");
    setOpen(true);

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

        let data = {
          NUMOPERACION: 3,
          CHID: v.row.id,
          CHUSER: user.id
        };
        console.log(data);

        CatalogosServices.coeficientes(data).then((res) => {
          if (res.SUCCESS) {
            Toast.fire({
              icon: "success",
              title: "Registro Eliminado!",
            });


            let data = {
              NUMOPERACION: 4
            };
            consulta(data);


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
    CatalogosServices.coeficientes(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Consulta Exitosa!",
        });
        setDataCoeficientes(res.RESPONSE);
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
    let data = {
      NUMOPERACION: 4
    };
    consulta(data);
  }, []);

  return (
    <div style={{ height: 600, width: "100%" }}>

      <ButtonsAdd handleOpen={handleOpen}></ButtonsAdd>
      <CoeficientesModal open={open} modo={modo} tipo={tipoOperacion} handleClose={handleClose} dt={vrows} />

      <MUIXDataGrid columns={columns} rows={dataCoeficientes} />

    </div>
  );
};
