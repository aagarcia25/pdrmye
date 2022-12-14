import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Toast } from "../../../../../helpers/Toast";
import { MUNICIPIO, PERMISO, RESPONSE } from "../../../../../interfaces/user/UserInfo";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import { getMunicipio, getPermisos, getUser } from "../../../../../services/localStorage";
import BotonesAcciones from "../../../componentes/BotonesAcciones";
import MUIXDataGrid from "../../../MUIXDataGrid";
import ButtonsAdd from "../Utilerias/ButtonsAdd";
import { CuentaBancariaModal } from "./CuentaBancariaModal";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Grid, IconButton, Tooltip, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ModalAlert from "../../../componentes/ModalAlert";
import { AlertS } from "../../../../../helpers/AlertS";

export const CuentaBancaria = ({
  idmunicipio,
  municipio
}: {
  idmunicipio: string,
  municipio: string

}) => {


  const [slideropen, setslideropen] = useState(true);
  const user: RESPONSE = JSON.parse(String(getUser()));
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [agregar, setAgregar] = useState<boolean>(false);
  const [editar, setEditar] = useState<boolean>(false);
  const [eliminar, setEliminar] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [texto, setTexto] = useState("");
  const [open, setOpen] = useState(false);
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [vrows, setVrows] = useState({});
  const [cuentaBancaria, setCuentaBancaria] = useState([]);
  const [nombreMun, setnombreMun] = useState("");
  const mun: MUNICIPIO[] = JSON.parse(String(getMunicipio()));


  const handleAccion = (v: any ,est:string) => {
    if (v.tipo === 1) {
      setTipoOperacion(2);
      setOpen(true);
      setVrows(v.data);
    } else if (v.tipo === 2) {
      Swal.fire({
        icon: "info",
        title: "Estas seguro de eliminar este registro?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Confirmar",
        denyButtonText: `Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {
          let data = {
            NUMOPERACION: 3,
            CHID: v.data.row.id,
            CHUSER: user.id,
          };

          CatalogosServices.CuentaBancaria(data).then((res) => {
            if (res.SUCCESS) {
              Toast.fire({
                icon: "success",
                title: "Registro Eliminado!",
              });

              consulta();
            } else {
              AlertS.fire({
                title: "Error!",
                text: res.STRMESSAGE,
                icon: "error",
              });
            }
          });
        } else if (result.isDenied) {
          Swal.fire("No se realizaron cambios", "", "info");
        }
      });
    } else if (v.tipo === 3) {

      let data = {
        NUMOPERACION: 5,
        CHID: v.data.row.id,
        CHUSER: user.id,
        IDESTATUS: est,
        COMENTARIOS: v.texto
      };
      //console.log(v);

      CatalogosServices.CuentaBancaria(data).then((res) => {
        if (res.SUCCESS) {
          Toast.fire({
            icon: "success",
            title: "Registro Enviado a Validaci??n!",
          });

          consulta();
          handleClose();
        } else {
          AlertS.fire({
            title: "Error!",
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
      headerName: "Identificador",
      hide: true,
      width: 10,
    },
    {
      field: "acciones",  disableExport: true,
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

            { 
              ((v.row.EstatusDescripcion === "INICIO" || v.row.ControlInterno === "DAMOP_REGRESADO") && (user.DEPARTAMENTOS[0]?.NombreCorto === "MUN" && user.PERFILES[0]?.Referencia === "MUN") ? (
                <>
                  <Tooltip title="Enviar a Validaci??n">
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
              ) : 
                "")
            }
            {
              ((v.row.ControlInterno === "DAMOP_REVISION") && (user.DEPARTAMENTOS[0]?.NombreCorto === "DAMOP" && user.PERFILES[0]?.Referencia === "ANA") ? (

                <>
                  <Tooltip title="Revisar">
                    <IconButton color="info" onClick={() => handlevalidar(v)}>
                      <SendIcon />
                    </IconButton>
                  </Tooltip>
                </>) : (""

              ))}


          </>
        );
      },
    },
    {
      field: "FechaCreacion",
      headerName: "Fecha Creacion",
      width: 150,
    },
    {
      field: "NAMEUSUARIO",
      headerName: "Usuario Generador",
      width: 150,
    },
    {
      field: "idusuario",
      headerName: "Identificador Usuario",
      width: 50,
      hide: true,
    },
    { field: "NombreCuenta", headerName: "Nombre de la Cuenta", width: 250 },
    { field: "NombreBanco", headerName: "Banco", width: 150 },
    {
      field: "idbanco",
      headerName: "Identificador Banco",
      width: 50,
      hide: true,
    },

    { field: "NumeroCuenta", headerName: "Cuenta", width: 250 },
    { field: "ClabeBancaria", headerName: "Clabe", width: 250 },
    {
      field: "idestatus",
      headerName: "Identificador Estatus",
      width: 50,
      hide: true,
    },
    { field: "EstatusDescripcion", headerName: "Estatus", width: 250 },
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

    let data ={
      CHUSER: idmunicipio !== "" ? idmunicipio : user.MUNICIPIO[0]?.id, 
      NUMOPERACION: idmunicipio !== "" ?6:4,

    };
    CatalogosServices.CuentaBancaria(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Consulta Exitosa!",
        });
        setCuentaBancaria(res.RESPONSE);

      } else {
        AlertS.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };

  useEffect(() => {
    if (!mun[0]) {
      setnombreMun(municipio)
    }
    else {
      mun.map((item: MUNICIPIO) => {
        setnombreMun(item.Nombre);
      });
    }
    permisos.map((item: PERMISO) => {
      if (String(item.ControlInterno) === "CUENTABANCARIA") {
        //console.log(item);
        if (String(item.Referencia) === "AGREG") {
          setAgregar(true);
        }
        if (String(item.Referencia) === "EDIT") {
          setEditar(true);
        }
        if (String(item.Referencia) === "ELIM") {
          setEliminar(true);
        }
      }
    });
    consulta();
  }, []);

  return (
    <div style={{ height: 600, width: "100%", paddingLeft:"1%", paddingRight:"1%"}}>
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
          accion={3} />
      ) : (
        ""
      )}

      <Grid container >
        <Grid item sm={12} sx={{ display: "flex", alignItems: "center", justifyContent: "center", }}>
          <Typography
            sx={{ textAlign: "center", fontFamily: "sans-serif", fontSize: "3vw", color: "#000000", }}>
            {idmunicipio !== "" ? "Municipio: "+nombreMun: "Cuentas Bancarias: "+nombreMun}
          </Typography>
        </Grid>
      </Grid>

      <ButtonsAdd handleOpen={handleOpen} agregar={agregar} />
      <MUIXDataGrid columns={columns} rows={cuentaBancaria} />
    </div>
  );
};
