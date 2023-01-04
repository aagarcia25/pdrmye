import { useEffect, useState } from "react";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { getUser } from "../../services/localStorage";
import { CatalogosServices } from "../../services/catalogosServices";
import MUIXDataGrid from "./MUIXDataGrid";
import AddIcon from "@mui/icons-material/Add";
import ListNotificationsModal from "./ListNotificationsModal";
import { RESPONSE } from "../../interfaces/user/UserInfo";
import { COLOR } from "../../styles/colors";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";

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
    { field: "id", hide: true },
    { field: "deleted", hide: true },
    { field: "ModificadoPor", hide: true },
    {
      field: "FechaCreacion",
      headerName: "Fecha Creación",
      description: "Fecha Creación",
      width: 160,
    },
    {
      field: "acciones",
      disableExport: true,
      headerName: "Acciones",
      description: "Campo de Acciones",
      sortable: false,
      width: 110,
      renderCell: (v) => {
        return (
          <Box>
            <Tooltip title={"Ver Mensaje"}>
              <IconButton onClick={() => viewMessageModal(v)}>
                <VisibilityIcon  />
              </IconButton>
            </Tooltip>

            {modo === "ViewMessage" ? (
              <Tooltip title={"Ir A"}>
                <IconButton onClick={() => goa(v)}>
                  <DoubleArrowIcon />
                </IconButton>
              </Tooltip>
            ) : (
              ""
            )}
          </Box>
        );
      },
    },
    { field: "CreadoPor", headerName: "CreadoPor", width: 300, hide: true },
    {
      field: "origen",
      headerName: "Remitente",
      description: "Remitente",
      width: 300,
      hide: modo === "MessageSend",
    },
    {
      field: "destinatario",
      headerName: "Destinatario",
      description: "Destinatario",
      width: 300,
      hide: modo === "viewMessageReading" || modo === "ViewMessage",
    },
    {
      field: "Encabezado",
      headerName: "Encabezado",
      description: "Encabezado",
      width: 550,
    },
    { field: "Descripcion", headerName: "Mensaje", width: 550 },
    { field: "Visto", headerName: "Visto", width: 300, hide: true },
    {
      field: "Destinatario",
      headerName: "destinatario",
      width: 300,
      hide: true,
    },
  ];

  const handleNuevoMensaje = () => {
    setTipoOperacion(1);
    setModo("NewMessage");
    setOpen(true);
  };

  const viewMessageModal = (v: any) => {
    setTipoOperacion(6);
    if (v.row.Visto === "0") {
      setDestinatario(v.row.destinatario);
      setRemitente(v.row.origen);
    }
    setDestinatario(v.row.destinatario);
    setRemitente(v.row.origen);

    setOpen(true);
    setData(v);
  };

  

  const goa = (v: any) => {
   
    console.log(v);
   /* let dat = {
      NUMOPERACION: v,
      CHUSER: user.id,
    };
    CatalogosServices.getliga(dat).then((res) => {
      setNotificacion(res.RESPONSE);
    });*/
  };


  const viewMessageReading = (v: number) => {
    setModo("viewMessageReading");
    setTipoOperacion(v);
    let dat = {
      NUMOPERACION: v,
      CHUSER: user.id,
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
      CHUSER: user.id,
    };
    CatalogosServices.Notificaciones(data).then((res) => {
      setNotificacion(res.RESPONSE);
    });
  };

  const viewMessage = (v: number) => {
    setTipoOperacion(v);
    setModo("ViewMessage");
    let dat = {
      NUMOPERACION: v,
      CHUSER: user.id,
    };
    CatalogosServices.Notificaciones(dat).then((res) => {
      setNotificacion(res.RESPONSE);
    });
  };

  const handleClose = (v: string) => {
    if (v === "9") {
      setModo("MessageSend");
      setOpen(false);
      viewMessageSend(9);
    }
    if (v === "8") {
      setModo("ViewMessage");
      let dat = {
        NUMOPERACION: Number(v),
        CHUSER: user.id,
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
  };

  useEffect(() => {
    setPerfil(user.PERFILES[0].Referencia);
    let dat = {
      NUMOPERACION: 8,
      CHUSER: user.id,
    };

    CatalogosServices.Notificaciones(dat).then((res) => {
      setNotificacion(res.RESPONSE);
    });
  }, []);

  return (
    <div style={{ height: "90%", width: "100%", paddingTop: "3%" }}>
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

      <Box
        sx={{
          display: "flex",
          height: "90%",
          justifyContent: "content-position",
          p: 1,
          m: 1,
          // bgcolor:"red",
          // bgcolor: 'background.paper',
        }}
      >
        <Box sx={{ width: "150px", paddingRight: ".5%" }}>
          <Box
            sx={{
              position: "relative",
              top: 10,
              left: 7,
              width: "90%",
              justifyContent: "center",
              display: "flex",
              borderRadius: 1,
            }}
          >
            {perfil != "MUN" ? (
              <Button
                className="nuevo-mensaje"
                color="success"
                variant="contained"
                endIcon={<AddIcon />}
                onClick={() => handleNuevoMensaje()}
              >
                Nuevo
              </Button>
            ) : (
              ""
            )}
          </Box>

          <Box
            sx={{
              height: "120px",

              justifyContent: "space-between",
              position: "relative",
              flexDirection: "column",
              top: 50,
              left: 7,
              width: "90%",
              display: "flex",
              borderRadius: 1,
            }}
          >
            <Button
              className="notificaciones"
              onClick={() => viewMessage(8)}
              sx={{
                backgroundColor:
                  modo === "ViewMessage"
                    ? COLOR.grisTarjetaBienvenido
                    : COLOR.blanco,
                "&:hover": { backgroundColor: COLOR.grisTarjetaBienvenido },
              }}
            >
              Recibidos
              {/* <InboxIcon /> */}
            </Button>

            {perfil != "MUN" ? (
              <Button
                className="notificaciones"
                onClick={() => viewMessageSend(9)}
                sx={{
                  backgroundColor:
                    modo === "MessageSend"
                      ? COLOR.grisTarjetaBienvenido
                      : COLOR.blanco,
                  "&:hover": { backgroundColor: COLOR.grisTarjetaBienvenido },
                }}
              >
                Enviados
                {/* <SendIcon /> */}
              </Button>
            ) : (
              ""
            )}

            <Button
              className="notificaciones"
              onClick={() => viewMessageReading(7)}
              sx={{
                backgroundColor:
                  modo == "viewMessageReading"
                    ? COLOR.grisTarjetaBienvenido
                    : COLOR.blanco,
                "&:hover": { backgroundColor: COLOR.grisTarjetaBienvenido },
              }}
            >
              Leídos
              {/* <AutoStoriesIcon /> */}
            </Button>
          </Box>
        </Box>

        <Box sx={{ left: 7, height: "600px", width: "90%", display: "flow" }}>
          <MUIXDataGrid columns={columns} rows={notificacion} />
        </Box>
      </Box>
    </div>
  );
};
