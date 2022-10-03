import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  LinearProgress,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid, esES, GridColDef } from "@mui/x-data-grid";

import { CustomToolbar } from "./menu/CustomToolbar";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";

import VisibilityIcon from "@mui/icons-material/Visibility";
import { CustomNoRowsOverlay } from "./menu/CustomNoRowsOverlay";
import { messages } from "../styles";
import { getPU, getUser } from "../../services/localStorage";
import { CatalogosServices } from "../../services/catalogosServices";
import { UserReponse } from "../../interfaces/user/UserReponse";

export const ListNotification = () => {
  

  const user: UserReponse = JSON.parse(String(getPU()));
  const [notificacion, setNotificacion] = useState([]);
  const [open, setOpen] = useState(false);

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Identificador",
      width: 150,
      description: messages.dataTableColum.id,
    },
    { field: "Descripcion", headerName: "Mensage", width: 300 },

    {
      field: "acciones",
      headerName: "Acciones",
      description: "Campo de Acciones",
      sortable: false,
      width: 200,
      renderCell: (v) => {
        return (
          <Box>
            <IconButton onClick={() => changeView(v)}>
              <VisibilityIcon />
            </IconButton>
            <IconButton onClick={() => handleOpen(v)}>
              <DeleteForeverIcon />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  const handleOpen = (v: any) => {
    //setSelectedId(v.row.lastName);

    setOpen(true);
  };


  const changeView = (v: any) => {
    let data = {
      NUMOPERACION:6,
      CHID:v.row.id,
      CHUSER:user.IdUsuario
    };
    CatalogosServices.Notificaciones(data).then((res) => {
      setNotificacion(res.RESPONSE);
    });
  };


  const handleClose = () => setOpen(false);

  const ButtonAdd = () => {
    return (
      <Box>
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
          onClick={() => handleOpen(1)}
        >
          <AddIcon />
        </IconButton>
      </Box>
    );
  };

  const DetailsModal = () => {
    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    );
  };


  
  let data = {
    NUMOPERACION:4,
    CHID:1,
    DESCRIPCION:'',
    DESTINATARIO:'',
    MODIFICADOPOR:1,
    CREADOPOR:1,
    DELETED:'',
    CHUSER:user.IdUsuario

  };

  useEffect(() => {
    CatalogosServices.Notificaciones(data).then((res) => {
      setNotificacion(res.RESPONSE);
    });
  }, []);

  return (
    <div style={{ height: 600, width: "100%" }}>
      <DetailsModal />
      <ButtonAdd />
      <DataGrid
        //checkboxSelection
        pagination
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        components={{
          Toolbar: CustomToolbar,
          LoadingOverlay: LinearProgress,
          NoRowsOverlay: CustomNoRowsOverlay,
        }}
        rowsPerPageOptions={[5, 10, 20, 50, 100]}
        rows={notificacion}
        columns={columns}

        // loading //agregar validacion cuando se esten cargando los registros
      />
    </div>
  );
};
