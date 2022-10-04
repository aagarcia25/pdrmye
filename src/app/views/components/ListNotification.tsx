import { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormLabel,
  IconButton,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { getPU } from "../../services/localStorage";
import { CatalogosServices } from "../../services/catalogosServices";
import MUIXDataGrid from "./MUIXDataGrid";
import { UserReponse } from "../../interfaces/user/UserReponse";
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import InboxIcon from '@mui/icons-material/Inbox';
import ListNotificationsModal from "./ListNotificationsModal";


export const ListNotification = () => {


  const [data, setData] = useState({});
  const [modo, setModo] = useState("");
  const [tipoOperacion, setTipoOperacion] = useState(4);  
  const user: UserReponse = JSON.parse(String(getPU()));
  const [notificacion, setNotificacion] = useState([]);
  const [open, setOpen] = useState(false);
  const [numOperacion, setNumOperacion] = useState(8);
  const [chuser, setChuser] = useState("");
  const [message, setMessage] = useState("");
  const [viewMessageModo, setViewMessageModo] = useState<string>("Entrada");

  const columns: GridColDef[] = [
    { field: "id", headerName: "Identificador", width: 150, hide:true  },
    { field: "deleted", headerName: "eliminado", width: 300, hide:true },
    { field: "ModificadoPor", headerName: "ModificadoPor", width: 300, hide:true},
    { field: "CreadoPor", headerName: "CreadoPor", width: 300, hide:true},
    { field: "Encabezado", headerName: "Encabezado", width: 300, },
    { field: "Descripcion", headerName: "Mensage", width: 300,hide:true },
    { field: "Visto", headerName: "Visto", width: 300,hide:true },
    { field: "Destinatario", headerName: "destinatario", width: 300, hide:true},
    { field: "acciones",
      headerName: "Acciones",
      description: "Campo de Acciones",
      sortable: false,
      width: 110,
      renderCell: (v) => {
        return (
          <Box>
            <IconButton onClick={() => viewMessageModal(v)}>
              <VisibilityIcon />
            </IconButton>
          
          </Box>
        );
      },
    },
  ];




  const handleNuevoMensaje = () => {
    setTipoOperacion(1);
    setModo("NewMessage");
    setOpen(true);
    setChuser(String(user.IdUsuario));
  };

  const viewMessageModal = (v: any) => {  
    setTipoOperacion(6);
    setModo("ViewMessage");
    setOpen(true);
    setData(v);

    
    


    

  };
  const viewMessageReading = () => {  
    let dat = {
      NUMOPERACION: 7, 
      CHUSER: user.IdUsuario  
    };  
    CatalogosServices.Notificaciones(dat).then((res) => {
      setNotificacion(res.RESPONSE);
    }); 
  };

  
  const viewMessageSend = () => {  
    let dat = {
      NUMOPERACION: 9, 
      CHUSER: user.IdUsuario  
    };  
    CatalogosServices.Notificaciones(dat).then((res) => {
      setNotificacion(res.RESPONSE);
    }); 
  };
  const viewMessage = () => {  
    let dat = {
      NUMOPERACION: 8, 
      CHUSER: user.IdUsuario  
    };  
    CatalogosServices.Notificaciones(dat).then((res) => {
      setNotificacion(res.RESPONSE);
    }); 
  };





  const handleClose = () => {
    let dat = {
      NUMOPERACION: 8, 
      CHUSER: user.IdUsuario  
    };  
    CatalogosServices.Notificaciones(dat).then((res) => {
      setNotificacion(res.RESPONSE);
    });  
    
    
    setOpen(false); 
  }

  let dat = {
    NUMOPERACION: numOperacion,    
    CHUSER: user.IdUsuario,


  };
  useEffect(() => {
    CatalogosServices.Notificaciones(dat).then((res) => {
      setNotificacion(res.RESPONSE);
    });
  }, []);

  return (
    <div style={{ height: 600, width: "100%" }}>

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

        <Box sx={{ height: "600px", width: "150px", borderRadius: 3 }}>

          <Box sx={{ position: 'relative', top: 10, left: 7, width: "90%", justifyContent: 'center', display: 'flex', borderRadius: 1 }}>

            <Button className="nuevo-mensaje" color="success" variant="contained" endIcon={<AddIcon />}
              onClick={() => handleNuevoMensaje()}>
              Nuevo</Button>

          </Box>

          <Box sx={{
            height: "120px",

            justifyContent: 'space-between',
            position: 'relative',
            flexDirection: 'column',
            top: 50, left: 7, width: "90%",
            display: 'flex',
            borderRadius: 1
          }}>

            <Button className="notificaciones-generico" color="success" startIcon={<SendIcon />}
            onClick={() => viewMessageSend()}>
              Enviados</Button>

            <Button className="notificaciones-generico" color="success" startIcon={<InboxIcon />}
             onClick={() => viewMessage()}>
              Recibidos</Button>

            <Button className="notificaciones-generico" color="success" startIcon={<AutoStoriesIcon />}
            onClick={() => viewMessageReading()}>
              Leidos </Button>
              
          </Box>
        </Box>


        <Box  sx={{  left: 7, height: "600px", width: "50%",borderRadius:3}} >
          
         
         
         
          <Box sx={{ height: "600px", width: "100%", borderRadius: 3 }}>
            <MUIXDataGrid
              columns={columns} rows={notificacion} />
          </Box>       
        

       
        </Box>

      </Box>
    </div>
  );
};

