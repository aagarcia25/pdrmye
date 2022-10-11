import React, { useEffect, useState } from "react";

import { Modal, Typography, Button, Checkbox } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { AuthService } from "../../../../../services/AuthService";
import { messages } from "../../../../styles";
import MUIXDataGridSimple from "../../../MUIXDataGridSimple";
import Slider from "../../../Slider";
import { Toast } from "../../../../../helpers/Toast";
import { Alert } from "../../../../../helpers/Alert";

const MenuAsignaPermisos = ({
  dt,
  open,
  handleClose,
}: {
  dt: any;
  open: boolean;
  handleClose: Function;
}) => {
  const [data, setData] = useState([]);

  const [openSlider, setOpenSlider] = useState(false);


  const consulta = (data: any) => {
    setOpenSlider(true);
    AuthService.menuPermisosSinRel(data).then((res) => {
      setData(res.RESPONSE);
      setOpenSlider(false);
    });

  };

  const handleChange = (v: any) => {
    let data = {
      TIPO: 1,
      IDPERMISO: v.row.id,
      IDMENU: dt?.row?.id
    }
    AuthService.menuPermisosRelacionar(data).then((res) => {
      setData(res.RESPONSE);
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Permiso Relacionado!",
        });
        consulta({ CHID: dt?.row?.id });
      } else {
        Alert.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });

  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Identificador",
      hide: true,
      width: 10,
      description: messages.dataTableColum.id,
    },
    {
      field: "acciones",
      headerName: "",
      description: "Relacionar Permisos",
      sortable: false,
      width: 10,
      renderCell: (v) => {
        return <Checkbox onChange={() => handleChange(v)} />;
      },
    },
    { field: "Permiso", headerName: "Permiso", width: 100 },
    { field: "Descripcion", headerName: "Descripcion", width: 250 },
  ];



  useEffect(() => {
    consulta({ CHID: dt?.row?.id });
  }, []);

  return (
    <div>


      <Slider open={openSlider} ></Slider>
      <Box>
        <Modal open={open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "30vw",
              height: "50vh",
              bgcolor: "background.paper",
              boxShadow: 50,
              p: 2,
              borderRadius: 3,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{
                  textAlign: "center",
                  fontFamily: "MontserratBold",
                  fontSize: "1vw",
                  color: "#808080",
                }}
              >
                Relacionar Permisos a Menú
              </Typography>
            </Box>

            <Box sx={{ mt: "3vh" }}>
              <Typography
                sx={{
                  mt: "1vh",
                  textAlign: "left",
                  fontFamily: "MontserratMedium",
                  fontSize: ".8vw",
                  color: "#4db6ac",
                }}
              >
                Para Relacionar el Permiso solo Marca la Casilla
              </Typography>
            </Box>

            <Box
              sx={{
                mt: "2vh",
                width: "100%",
                height: "30vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                flexWrap: "wrap",
              }}
            >
              <Box sx={{ height: "100%", width: "80%" }}>
                <MUIXDataGridSimple columns={columns} rows={data} />
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "right",
                justifyContent: "right",
                mt: "2vh",
                // mr: "5vw",
                // ml: "5vw",
              }}
            >
              <Button
                sx={{ color: "#000", fontFamily: "MontserratMedium" }}
                onClick={() => handleClose()}
              >
                Salir
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </div>
  );
};

export default MenuAsignaPermisos;
