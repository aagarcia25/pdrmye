import AddIcon from "@mui/icons-material/Add";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Box, Button, Grid, IconButton, Tooltip } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { USUARIORESPONSE } from "../../interfaces/user/UserInfo";
import { CatalogosServices } from "../../services/catalogosServices";
import { getUser, getcontrolInternoEntidad } from "../../services/localStorage";
import ListNotificationsModal from "./ListNotificationsModal";
import MUIXDataGridMun from "./MUIXDataGridMun";

export const ListNotification = () => {
  const [notificacion, setNotificacion] = useState([]);
  const [data, setData] = useState({});
  const [modo, setModo] = useState("ViewMessage");
  const [destinatario, setDestinatario] = useState("");
  const navigate = useNavigate();
  const [remitente, setRemitente] = useState("");
  const [tipoOperacion, setTipoOperacion] = useState<number>(8);
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));
  const [open, setOpen] = useState(false);

  const handleBorrar = (v: string) => {};
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

            {(modo === "ViewMessage" || modo === "viewMessageReading") &&
            "CPH" === JSON.parse(String(getcontrolInternoEntidad())) ? (
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
      field: "personades",
      headerName: "Destinatario",
      description: "Destinatario",
      width: 200,
      hide: modo === "viewMessageReading" || modo === "ViewMessage",
    },
    {
      field: "Encabezado",
      headerName: "Encabezado",
      description: "Encabezado",
      width: 200,
    },
    { field: "Descripcion", headerName: "Mensaje", width: 550 },
  ];

  const handleNuevoMensaje = () => {
    setTipoOperacion(1);
    setModo("NewMessage");
    setOpen(true);
  };

  const viewMessageModal = (v: any) => {
    setTipoOperacion(6);
    if (v.row.Visto === "0") {
      setDestinatario(v.row.personades);
      setRemitente(v.row.origen);
    }
    setDestinatario(v.row.personades);
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

      <Grid
        container
        item
        spacing={1}
        xs={12}
        sm={12}
        md={12}
        lg={12}
        justifyContent="center"
        alignItems="center"
      >
        <Grid container item xs={12} sm={12} md={12} lg={12}>
          <Grid item xs={12} sm={12} md={12} lg={1}>
            <Button
              className="nuevo-mensaje"
              color="success"
              variant="contained"
              endIcon={<AddIcon />}
              onClick={() => handleNuevoMensaje()}
            >
              Nuevo
            </Button>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={1}>
            <Button
              className={"notificacionesSelected"}
              onClick={() => viewMessageReading(7)}
            >
              Leídos
            </Button>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={1}>
            <Button
              className={"notificacionesSelected"}
              onClick={() => viewMessageSend(9)}
            >
              Enviados
            </Button>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={1}>
            <Button
              className={"notificacionesSelected"}
              onClick={() => viewMessage(8)}
            >
              Recibidos
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <MUIXDataGridMun
            columns={columns}
            rows={notificacion}
            handleBorrar={handleBorrar}
            modulo={"Notificacion"}
            controlInterno={""}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default ListNotification;
