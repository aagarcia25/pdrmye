import React, { useEffect, useState } from "react";

import {
  Box,
  IconButton,
  LinearProgress,
} from "@mui/material";

import { esES, GridColDef } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import { CustomNoRowsOverlay } from "../../CustomNoRowsOverlay";
import { CustomToolbar, Moneda } from "../../CustomToolbar";
import {
  getUser,
} from "../../../../../services/localStorage";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { messages } from "../../../../styles";
import Slider from "../../../Slider";
import { Toast } from "../../../../../helpers/Toast";
import { Alert } from "../../../../../helpers/Alert";
import Swal from "sweetalert2";
import TipoFondoModal from "./TipoFondoModal";
import ButtonsAdd from "../Utilerias/ButtonsAdd";

const TipoFondo = () => {
  const user = getUser();

//   VALORES POR DEFAULT
  const [modo, setModo] = useState("");
  const [open, setOpen] = useState(false);
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [data, setData] = useState([]);
  const [slideropen, setslideropen] = useState(false);
  const [vrows, setVrows] = useState({});




  

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Identificador",
      hide: true,
      width: 150,
      description: messages.dataTableColum.id,
    },
    {
      field: "Clave",
      headerName: "Clave",
      width: 100,
    },
    { field: "Descripcion", headerName: "Descripcion", width: 350 },
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
    setTipoOperacion(1);
    setModo("Agregar Registro");
    setOpen(true);
    setVrows({});
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
          CHUSER: 1,
        };
        console.log(data);

        CatalogosServices.tipofondo(data).then((res) => {
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
    CatalogosServices.tipofondo(data).then((res) => {
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
    let data = {
        NUMOPERACION: 4
      };
      consulta(data);
  }, []);



  return (
    <div style={{ height: 600, width: "100%" }}>
        <Slider open={slideropen}></Slider>

      {open ? (
        <TipoFondoModal open={open} modo={modo} tipo={tipoOperacion} handleClose={handleClose} dt={vrows} />
      ) : (
        ""
      )}

      <ButtonsAdd handleOpen={handleOpen} />

      <DataGrid
        pagination
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        components={{
          Toolbar: CustomToolbar,
          LoadingOverlay: LinearProgress,
          NoRowsOverlay: CustomNoRowsOverlay,
        }}
        rowsPerPageOptions={[5, 10, 20, 50, 100]}
        rows={data}
        columns={columns}
      />
    </div>
  );
};

export default TipoFondo;
