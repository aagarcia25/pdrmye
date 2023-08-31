import AddIcon from "@mui/icons-material/Add";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import { GridColDef, GridSelectionModel } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PERFILES, USUARIORESPONSE } from "../../interfaces/user/UserInfo";
import { CatalogosServices } from "../../services/catalogosServices";
import { getUser } from "../../services/localStorage";
import ListNotificationsModal from "./ListNotificationsModal";
import MUIXDataGridMun from "./MUIXDataGridMun";

export const ListNotification = () => {
  const [slideropen, setslideropen] = useState(false);
  const [notificacion, setNotificacion] = useState([]);
  const [data, setData] = useState({});
  const [plantilla, setPlantilla] = useState("");
  const [modo, setModo] = useState("ViewMessage");
  const [destinatario, setDestinatario] = useState("");
  const [perfil, setPerfil] = useState<string>();
  const navigate = useNavigate();
  const [remitente, setRemitente] = useState("");
  const [tipoOperacion, setTipoOperacion] = useState<number>(8);
  const [selectionModel, setSelectionModel] =
    React.useState<GridSelectionModel>([]);
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));
  const [open, setOpen] = useState(false);
  const [nombreMenu, setNombreMenu] = useState("");

  const handleBorrar = (v: any) => {
    setSelectionModel(v);
  };

  const columns: GridColDef[] = [
    { field: "id", hide: true, hideable: false },
    { field: "deleted", hide: true, hideable: false },
    { field: "ModificadoPor", hide: true, hideable: false },
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
                <VisibilityIcon />
              </IconButton>
            </Tooltip>

            {modo === "ViewMessage" || modo === "viewMessageReading" ? (
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
    {
      field: "CreadoPor",
      headerName: "CreadoPor",
      width: 300,
      hide: true,
      hideable: false,
    },
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
      hideable: false,
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
    CatalogosServices.Notificaciones({
      NUMOPERACION: 6,
      CHUSER: user.Id,
      CHID: v.row.id,
    }).then((res) => {});

    let dat = {
      P_ID: v.row.idCalculo,
    };
    CatalogosServices.getliga(dat).then((res) => {
      // console.log(res.RESPONSE[0].route);
      navigate(res.RESPONSE[0].route + "?id=" + v.row.idCalculo);
    });
  };

  const viewMessageReading = (v: number) => {
    setModo("viewMessageReading");
    setTipoOperacion(v);
    let dat = {
      NUMOPERACION: v,
      CHUSER: user.Id,
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
      CHUSER: user.Id,
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
      CHUSER: user.Id,
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
        CHUSER: user.Id,
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
    //  setPerfil(PER[0].Referencia);
    let dat = {
      NUMOPERACION: 8,
      CHUSER: user.Id,
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
              className={
                modo === "ViewMessage"
                  ? "notificacionesSelected"
                  : "notificaciones"
              }
              onClick={() => viewMessage(8)}
            >
              Recibidos
            </Button>

            {perfil != "MUN" ? (
              <Button
                className={
                  modo === "MessageSend"
                    ? "notificacionesSelected"
                    : "notificaciones"
                }
                onClick={() => viewMessageSend(9)}
              >
                Enviados
                {/* <SendIcon /> */}
              </Button>
            ) : (
              ""
            )}

            <Button
              className={
                modo === "viewMessageReading"
                  ? "notificacionesSelected"
                  : "notificaciones"
              }
              onClick={() => viewMessageReading(7)}
            >
              Leídos
              {/* <AutoStoriesIcon /> */}
            </Button>
          </Box>
        </Box>

        <MUIXDataGridMun
          columns={columns}
          rows={notificacion}
          handleBorrar={handleBorrar}
          modulo={"Notificacion"}
          controlInterno={""}
        />
      </Box>
    </div>
  );
};

export default ListNotification;
