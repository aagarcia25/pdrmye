import { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { getPermisos, getUser } from "../../services/localStorage";
import { CatalogosServices } from "../../services/catalogosServices";
import MUIXDataGrid from "./MUIXDataGrid";
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import InboxIcon from '@mui/icons-material/Inbox';
import ListNotificationsModal from "./ListNotificationsModal";
import { PERMISO, RESPONSE } from "../../interfaces/user/UserInfo";
import { COLOR } from "../../styles/colors";


export const ListNotification = () => {
  const [notificacion, setNotificacion] = useState([]);
  const [data, setData] = useState({});
  const [modo, setModo] = useState("ViewMessage");
  const [destinatario, setDestinatario] = useState("");
  const [perfil, setPerfil] = useState<string>();

  const [remitente, setRemitente] = useState("");
  const [tipoOperacion, setTipoOperacion] = useState<number>(8);
  const user: RESPONSE = JSON.parse(String(getUser()));
  const [open, setOpen] = useState(false);


  const columns: GridColDef[] = [
    { field: "id", headerName: "Identificador", width: 150, hide: true },
    { field: "deleted", headerName: "eliminado", width: 300, hide: true },
    { field: "ModificadoPor", headerName: "ModificadoPor", width: 300, hide: true },
    { field: "CreadoPor", headerName: "CreadoPor", width: 300, hide: true },
    { field: "origen", headerName: "Remitente", width: 300, hide: modo == "MessageSend" },
    { field: "destinatario", headerName: "Destinatario", width: 300, hide: modo == "viewMessageReading" || modo == "ViewMessage" },
    { field: "Encabezado", headerName: "Encabezado", width: 300, },
    { field: "Descripcion", headerName: "Mensage", width: 300, hide: true },
    { field: "Visto", headerName: "Visto", width: 300, hide: true },
    { field: "Destinatario", headerName: "destinatario", width: 300, hide: true },
    {
      field: "acciones",
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

  };

  const viewMessageModal = (v: any) => {
    setTipoOperacion(6);
    console.log(v.row)
    if (v.row.Visto === "0") {
      setDestinatario(v.row.destinatario)
      setRemitente(v.row.origen)
    }
    setDestinatario(v.row.destinatario)
    setRemitente(v.row.origen)

    setOpen(true);
    setData(v);
  };

  const viewMessageReading = (v: number) => {
    setModo("viewMessageReading");
    setTipoOperacion(v);
    let dat = {
      NUMOPERACION: v,
      CHUSER: user.id
    };
    CatalogosServices.Notificaciones(dat).then((res) => {
      setNotificacion(res.RESPONSE);
    });

  };

  const viewMessageSend = (v: number) => {
    setTipoOperacion(v);
    setModo("MessageSend");
    let data = {
      NUMOPERACION: v,
      CHUSER: user.id
    };
    CatalogosServices.Notificaciones(data).then((res) => {
      setNotificacion(res.RESPONSE);
    });
  };

  const viewMessage = (v: number) => {
    setTipoOperacion(v)
    setModo("ViewMessage");
    let dat = {
      NUMOPERACION: v,
      CHUSER: user.id
    };
    CatalogosServices.Notificaciones(dat).then((res) => {
      setNotificacion(res.RESPONSE);
    });
  };


  const testeoVariables = () => {

    console.log("tipo de operacio  " + tipoOperacion);
    console.log("modo de operacion  " + modo);

  }

  const handleClose = (v: string) => {
    console.log("valor de v  " + v)
    if (v === "9") {
      setModo("MessageSend");
      setOpen(false);
      viewMessageSend(9);
    }
    if (v === "8") {
      setModo("ViewMessage");
      let dat = {
        NUMOPERACION: Number(v),
        CHUSER: user.id
      };
      CatalogosServices.Notificaciones(dat).then((res) => {
        setNotificacion(res.RESPONSE);
      });
      setOpen(false);

    }
    if (v === "cerrar") {
      setOpen(false);
    }
    if (v === "7") {
      setOpen(false);
    }


  }

  useEffect(() => {

    console.log(user.PERFILES[0].Referencia)
    setPerfil(user.PERFILES[0].Referencia)

    let dat = {
      NUMOPERACION: 8,
      CHUSER: user.id
    };

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
          destinatario={destinatario}
          remitente={remitente}
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
            {perfil != "MUN" ?
              < Button className="nuevo-mensaje" color="success" variant="contained" endIcon={<AddIcon />}
                onClick={() => handleNuevoMensaje()}>
                Nuevo
              </Button>
              : ""}
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
            {perfil != "MUN" ?
            <Button
              className="notificaciones"
              onClick={() => viewMessageSend(9)}
              sx={{
                backgroundColor: modo == "MessageSend" ? COLOR.grisTarjetaBienvenido : COLOR.blanco,
                "&:hover": { backgroundColor: COLOR.grisTarjetaBienvenido },
              }}
            >
              Enviados
              <SendIcon />
            </Button>
            :""}


            <Button
              className="notificaciones"
              onClick={() => viewMessage(8)}
              sx={{
                backgroundColor: modo == "ViewMessage" ? COLOR.grisTarjetaBienvenido : COLOR.blanco,
                "&:hover": { backgroundColor: COLOR.grisTarjetaBienvenido },
              }}
            >
              Recibidos
              <InboxIcon />
            </Button>



            <Button
              className="notificaciones"
              onClick={() => viewMessageReading(7)}
              sx={{
                backgroundColor: modo == "viewMessageReading" ? COLOR.grisTarjetaBienvenido : COLOR.blanco,
                "&:hover": { backgroundColor: COLOR.grisTarjetaBienvenido },
              }}
            >
              Leidos
              <AutoStoriesIcon />
            </Button>







          </Box>
        </Box>


        <Box sx={{ left: 7, height: "600px", width: "90%", borderRadius: 3 }} >




          <Box sx={{ height: "600px", width: "100%", borderRadius: 3 }}>
            <MUIXDataGrid
              columns={columns} rows={notificacion} />
          </Box>



        </Box>

      </Box>
    </div >
  );
};

