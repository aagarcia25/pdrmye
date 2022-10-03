import { useEffect, useState } from "react";
import {
  Box,
  Button,
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



  const [modo, setModo] = useState("");
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [data, setData] = useState({});
  const user: UserReponse = JSON.parse(String(getPU()));
  const [notificacion, setNotificacion] = useState([]);
  const [open, setOpen] = useState(false);
  const [chuser, setChuser] = useState("");

  const columns: GridColDef[] = [
    { field: "id", headerName: "Identificador", width: 150, hide: true },
    { field: "Descripcion", headerName: "Mensage", width: 300, resizable: true },
    { field: "Visto", headerName: "Leido", width: 300, },
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
  const handleNuevoMensaje = () => {
    setTipoOperacion(1);
    setModo("Agregar Aviso");
    setOpen(true);
    setChuser(String(user.IdUsuario));

  };

  const changeView = (v: any) => {
    let data = {
      NUMOPERACION: 6,
      CHID: v.row.id,
      CHUSER: user.IdUsuario
    };
    CatalogosServices.Notificaciones(data).then((res) => {
      setNotificacion(res.RESPONSE);
    });
  };


  const handleClose = () => setOpen(false);

  let dat = {
    NUMOPERACION: 4,
    CHID: 1,
    MODIFICADOPOR: 1,
    CREADOPOR: 1,
    DELETED: '',
    CHUSER: user.IdUsuario

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

        <Box sx={{  bgcolor: 'rgb(245, 245, 245)', height: 600, width: "150px", borderRadius: 3 }}>
        
        <Box sx={{ position: 'relative', top: 10,left: 7,width: "90%",justifyContent:'center',  display: 'flex',borderRadius: 1 }}>
                    
          <Button className="nuevo-mensaje" color="success" variant="contained" endIcon={<AddIcon />}
          onClick={() => handleNuevoMensaje()}>
            Nuevo</Button>
                    
          </Box>

          <Box sx={{ 
             height: "120px",
           justifyContent: 'space-between',
          position: 'relative',
          flexDirection: 'column', 
          top: 50,left: 7,width: "90%",
          display: 'flex',
          borderRadius: 1 }}>

          <Button className="notificaciones-generico" color="success"  startIcon={<SendIcon />}>
            Enviados</Button>
            <Button className="notificaciones-generico" color="success" startIcon ={<InboxIcon />}>
            Recibidos</Button>
            <Button className="notificaciones-generico" color="success"  startIcon={<AutoStoriesIcon />}>
             Leidos </Button>
         


          </Box>
        






        </Box>




        <Box sx={{ height: 600, width: "900px", borderRadius: 3 }}>
          <MUIXDataGrid
            columns={columns} rows={notificacion} />
        </Box>


      </Box>
    </div>
  );
};

