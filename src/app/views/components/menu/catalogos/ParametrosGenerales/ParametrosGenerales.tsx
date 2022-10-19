import React, { useEffect, useState } from "react";
import { getUser } from "../../../../../services/localStorage";
import { RESPONSE } from "../../../../../interfaces/user/UserInfo";
import { GridColDef } from "@mui/x-data-grid";
import { messages } from "../../../../styles";
import AccionesGrid from "../../../AccionesGrid";
import Swal from "sweetalert2";
import { Toast } from "../../../../../helpers/Toast";
import { Alert } from "../../../../../helpers/Alert";
import { ParametroServices } from "../../../../../services/ParametroServices";
import Slider from "../../../Slider";
import Buttons from "../Utilerias/Buttons";
import MUIXDataGrid from "../../../MUIXDataGrid";
import { ParametrosGeneralesModal } from "./ParametrosGeneralesModal";
import { Box, IconButton } from "@mui/material";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ButtonsAdd from "../Utilerias/ButtonsAdd";

export const ParametrosGenerales = () => {
  const [parametroGeneral, setParametroGeneral] = useState([]);
  const [modo, setModo] = useState("");
  const [open, setOpen] = useState(false);
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [vrows, setVrows] = useState({});

  console.log("parametroGeneral", parametroGeneral);

  const columns: GridColDef[] = [
    {
      field: "id",
      hide: true,
      headerName: "Identificador",
      width: 150,
      description: messages.dataTableColum.id,
    },
    {
      field: "Nombre",
      headerName: "Nombre",
      width: 150,
    },
    {
      field: "Valor",
      headerName: "Valor",
      width: 120,
    },
    {
      field: "acciones",
      headerName: "Acciones",
      description: "Campo de Acciones",
      sortable: false,
      width: 150,
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
  console.log("Columns: ", columns);

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
    console.log(v)
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
        const user: RESPONSE = JSON.parse(String(getUser()));

        let data = {
          NUMOPERACION: 3,
          CHID: v.row.id,
          CHUSER: user.id,
        };
        console.log(data);

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
    ParametroServices.ParametroGeneralesIndex(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Consulta Exitosa!",
        });
        console.log(data);
        setParametroGeneral(res.RESPONSE);
        console.log("parametroGeneral consulta", parametroGeneral);
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
    consulta({ NUMOPERACION: 4 })
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

      <ButtonsAdd handleOpen={handleOpen} />
      <MUIXDataGrid columns={columns} rows={parametroGeneral} />


    </div>
  );
};