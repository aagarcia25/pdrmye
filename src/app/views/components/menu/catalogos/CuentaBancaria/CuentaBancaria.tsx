import SendIcon from "@mui/icons-material/Send";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Grid, IconButton, Tooltip, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AlertS } from "../../../../../helpers/AlertS";
import { Toast } from "../../../../../helpers/Toast";
import {
  MUNICIPIO,
  PERMISO,
  ResponseDataAdicional,
  USUARIORESPONSE,
} from "../../../../../interfaces/user/UserInfo";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import {
  getDatosAdicionales,
  getPermisos,
  getUser,
  getcontrolInternoEntidad,
} from "../../../../../services/localStorage";
import MUIXDataGrid from "../../../MUIXDataGrid";
import BotonesAcciones from "../../../componentes/BotonesAcciones";
import ModalAlert from "../../../componentes/ModalAlert";
import ModalForm from "../../../componentes/ModalForm";
import ButtonsAdd from "../Utilerias/ButtonsAdd";
import { CuentaBancariaModal } from "./CuentaBancariaModal";

export const CuentaBancaria = ({
  fullScrean,
  idmunicipio,
  municipio,
  handleCloseModal,
}: {
  fullScrean: boolean;
  handleCloseModal: Function;
  idmunicipio: string;
  municipio: string;
}) => {
  const [slideropen, setslideropen] = useState(true);
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));

  const DA: ResponseDataAdicional = JSON.parse(String(getDatosAdicionales()));
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [agregar, setAgregar] = useState<boolean>(false);
  const [editar, setEditar] = useState<boolean>(false);
  const [eliminar, setEliminar] = useState<boolean>(false);
  const [consCuentas, setConsCuentas] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [texto, setTexto] = useState("");
  const [open, setOpen] = useState(false);
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [vrows, setVrows] = useState({});
  const [cuentaBancaria, setCuentaBancaria] = useState([]);
  const [nombreMun, setnombreMun] = useState("");

  const handleAccion = (v: any, est: string) => {
    if (v.tipo == 1) {
      setTipoOperacion(2);
      setOpen(true);
      setVrows(v.data);
    } else if (v.tipo == 2) {
      Swal.fire({
        icon: "question",
        title: "¿Estás seguro de eliminar este registro?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Confirmar",
        denyButtonText: `Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {
          let data = {
            NUMOPERACION: 3,
            CHID: v.data.row.id,
            CHUSER: user.Id,
          };

          CatalogosServices.CuentaBancaria(data).then((res) => {
            if (res.SUCCESS) {
              Toast.fire({
                icon: "success",
                title: "¡Registro Eliminado!",
              });

              consulta();
            } else {
              AlertS.fire({
                title: "¡Error!",
                text: res.STRMESSAGE,
                icon: "error",
              });
            }
          });
        } else if (result.isDenied) {
          Swal.fire("No se realizaron cambios", "", "info");
        }
      });
    } else if (v.tipo == 3) {
      let data = {
        NUMOPERACION: 5,
        CHID: v.data.row.id,
        CHUSER: user.Id,
        IDESTATUS: est,
        COMENTARIOS: v.texto,
      };

      CatalogosServices.CuentaBancaria(data).then((res) => {
        if (res.SUCCESS) {
          Toast.fire({
            icon: "success",
            title: "¡Registro Enviado a Validación!",
          });

          consulta();
          handleClose();
        } else {
          AlertS.fire({
            title: "¡Error!",
            text: res.STRMESSAGE,
            icon: "error",
          });
        }
      });
    }
  };

  const handleVisualizar = (v: any) => {
    setTipoOperacion(3);
    setOpen(true);
    setVrows(v);
  };

  const handlevalidar = (v: any) => {
    setOpenModal(true);
    setVrows(v);
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      hideable: false,
      hide: true,
    },
    {
      field: "idMunicipio",
      hideable: false,
      hide: true,
    },
    {
      field: "acciones",
      disableExport: true,
      headerName: "Acciones",
      description: "Campo de Acciones",
      sortable: false,
      width: 200,
      renderCell: (v) => {
        return (
          <>
            <Tooltip title="Visualizar">
              <IconButton onClick={() => handleVisualizar(v)}>
                <VisibilityIcon />
              </IconButton>
            </Tooltip>

            {v.row.ControlInterno == "DAMOP_AUTORIZADO" ? (
              <>
                <BotonesAcciones
                  handleAccion={handleAccion}
                  row={v}
                  editar={editar}
                  eliminar={false}
                />
              </>
            ) : (
              ""
            )}

            {(v.row.EstatusDescripcion == "INICIO" ||
              v.row.ControlInterno == "DAMOP_REGRESADO") &&
            JSON.parse(String(getcontrolInternoEntidad())) == "MUN" ? (
              //PER[0]?.Referencia == "MUN"
              <>
                <Tooltip title="Enviar a Validación">
                  <IconButton color="info" onClick={() => handlevalidar(v)}>
                    <SendIcon />
                  </IconButton>
                </Tooltip>

                <BotonesAcciones
                  handleAccion={handleAccion}
                  row={v}
                  editar={editar}
                  eliminar={eliminar}
                />
              </>
            ) : (
              ""
            )}
            {v.row.ControlInterno == "DAMOP_REVISION" &&
            JSON.parse(String(getcontrolInternoEntidad())) == "DAMOP" ? (
              //PER[0]?.Referencia == "ANA"
              <>
                <Tooltip title="Revisar">
                  <IconButton color="info" onClick={() => handlevalidar(v)}>
                    <SendIcon />
                  </IconButton>
                </Tooltip>
              </>
            ) : (
              ""
            )}
          </>
        );
      },
    },
    {
      field: "FechaCreacion",
      headerName: "Fecha Creación",
      description: "Fecha Creación",

      width: 150,
    },
    {
      field: "NAMEUSUARIO",
      headerName: "Usuario Generador",
      description: "Usuario Generador",
      width: 150,
    },
    {
      field: "NombreCuenta",
      headerName: "Nombre de la Cuenta",
      description: "Nombre de la Cuenta",
      width: 250,
    },
    {
      field: "NombreBanco",
      headerName: "Banco",
      description: "Banco",
      width: 150,
    },

    {
      field: "NumeroCuenta",
      headerName: "Cuenta",
      description: "Cuenta",
      width: 250,
    },
    {
      field: "ClabeBancaria",
      headerName: "Clabe",
      description: "Clabe",
      width: 250,
    },

    {
      field: "EstatusDescripcion",
      headerName: "Estatus",
      description: "Estatus",
      width: 250,
    },
  ];

  const handleClose = () => {
    setOpenModal(false);
    setslideropen(false);
    setOpen(false);
    consulta();
  };

  const handleOpen = (v: any) => {
    setTipoOperacion(1);
    setOpen(true);
    setVrows("");
  };

  const consulta = () => {
    let data = {
      CHUSER: idmunicipio !== "" ? idmunicipio : DA.MUNICIPIO[0]?.id,
      NUMOPERACION: idmunicipio !== "" ? 6 : 4,
    };
    CatalogosServices.CuentaBancaria(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "¡Consulta Exitosa!",
        });
        setCuentaBancaria(res.RESPONSE);
      } else {
        AlertS.fire({
          title: "¡Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };
  /////////////////////////////////////////////////////

  async function digestMessage(message: string) {
    const msgUint8 = new TextEncoder().encode(message); // encode as (utf-8) Uint8Array
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8); // hash the message
    const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join(""); // convert bytes to hex string
    return hashHex;
  }

  ///////////////////////////////////////////////
  useEffect(() => {
    permisos.map((item: PERMISO) => {
      if (String(item.menu) == "CUENTABANCARIA") {
        setnombreMun(item.menu);
        if (String(item.ControlInterno) == "AGREG") {
          setAgregar(true);
        }
        if (String(item.ControlInterno) == "EDIT") {
          setEditar(true);
        }
        if (String(item.ControlInterno) == "ELIM") {
          setEliminar(true);
        }
        if (String(item.ControlInterno) == "CONSCUENTAS") {
          setConsCuentas(true);
        }
      }
    });
    consulta();
  }, []);

  return (
    <>
      {" "}
      {open ? (
        <CuentaBancariaModal
          open={open}
          tipo={tipoOperacion}
          handleClose={handleClose}
          dt={vrows}
        />
      ) : (
        ""
      )}
      {openModal ? (
        <ModalAlert
          open={openModal}
          tipo={texto}
          handleClose={handleClose}
          vrows={vrows}
          handleAccion={handleAccion}
          accion={3}
        />
      ) : (
        ""
      )}
      {fullScrean ? (
        <ModalForm title={"Cuentas Bancarias"} handleClose={handleCloseModal}>
          <div style={{ height: 600, width: "100%" }}>
            <Grid container>
              <Grid
                item
                sm={12}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h4">
                  {DA.MUNICIPIO.length == 1
                    ? "Municipio: " + DA.MUNICIPIO[0].Nombre
                    : "Cuentas Bancarias: " + nombreMun}
                </Typography>
              </Grid>
            </Grid>

            <ButtonsAdd handleOpen={handleOpen} agregar={agregar} />

            <MUIXDataGrid columns={columns} rows={cuentaBancaria} />
          </div>
        </ModalForm>
      ) : (
        <div style={{ height: 600, width: "100%" }}>
          <Grid container>
            <Grid
              item
              sm={12}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h4">
                {DA.MUNICIPIO.length == 1
                  ? "Municipio: " + DA.MUNICIPIO[0].Nombre
                  : "Cuentas Bancarias: " + nombreMun}
              </Typography>
            </Grid>
          </Grid>

          <ButtonsAdd handleOpen={handleOpen} agregar={agregar} />

          <MUIXDataGrid columns={columns} rows={cuentaBancaria} />
        </div>
      )}
    </>
  );
};
