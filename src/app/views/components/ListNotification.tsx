import React, {useEffect, useState } from "react";
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
import { GridColDef } from "@mui/x-data-grid";

import { CustomToolbar } from "./menu/CustomToolbar";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";

import VisibilityIcon from "@mui/icons-material/Visibility";
import { CustomNoRowsOverlay } from "./menu/CustomNoRowsOverlay";
import { messages } from "../styles";
import { getUser } from "../../services/localStorage";
import { CatalogosServices } from "../../services/catalogosServices";
import MUIXDataGrid from "./MUIXDataGrid";
import ListNotificationsModal from "./ListNotificationsModal";


export const ListNotification = () => {

  

  const user = getUser();
  const [notificacion, setNotificacion] = useState([]);
  const [modo, setModo] = useState("");
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [data, setData] = useState({});

  const [open, setOpen] = useState(false);

  const columns: GridColDef[] = [
    {field: "id", headerName: "Identificador", width: 150, hide:true},
    { field: "Descripcion", headerName: "Mensage", width: 300, resizable:true},
    { field: "Visto", headerName: "Leido", width: 300,},
    { field: "acciones",
      headerName: "Acciones",
      description: "Campo de Acciones",
      sortable: false,
      width: 200,      
      renderCell: (v) => {
        return (
          <Box>
            <IconButton onClick={() => handleOpen(v)}>
              <VisibilityIcon />
            </IconButton>
            <IconButton onClick={() => handleClose()}>
              <DeleteForeverIcon />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  const handleOpen = (v: any) => {
    setTipoOperacion(2);
    setModo("Aviso");
    setOpen(true);
    setData(v);
  };

  const handleClose = () => setOpen(false);


   let dat = {
    NUMOPERACION:4,
    CHID:1,
    DESCRIPCION:'',
    DESTINATARIO:'',
    MODIFICADOPOR:1,
    CREADOPOR:1,
    DELETED:'',
    CHUSER:1

  };

  useEffect(() => {
    CatalogosServices.Notificaciones(dat).then((res) => {
      setNotificacion(res.RESPONSE);
    });
  }, []);

  return (
    <div style={{ height: 600, width: "100%" }} >
    {open ? (
      <ListNotificationsModal
        open={open}
        modo={modo}
        handleClose={handleClose}
        tipo={tipoOperacion}
        dt={data}
      />
    ) : (
      ""
    )}

    
    <Box sx={{
      display: 'flex',
      justifyContent: 'content-position',
      p: 1,
      m: 1,
      bgcolor: 'background.paper',
      borderRadius: 2,
    }} >
    <Box sx={{ height: 600, width: "900px", borderRadius: 3}}>
      <MUIXDataGrid 
      columns={columns} rows={notificacion} />
      </Box>


   </Box>
   </div>
  );
};

