import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { Grid, IconButton, Tooltip, Typography } from "@mui/material";
import { GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import { AlertS } from '../../../../../helpers/AlertS';
import { Toast } from '../../../../../helpers/Toast';
import { PERMISO, RESPONSE } from '../../../../../interfaces/user/UserInfo';
import { CatalogosServices } from '../../../../../services/catalogosServices';
import { getPermisos, getUser } from '../../../../../services/localStorage';
import UsuarioResponsable from "../../../DAMOP/UsuarioResponsable";
import MUIXDataGrid from '../../../MUIXDataGrid';
import BotonesAcciones from '../../../componentes/BotonesAcciones';
import ModalForm from "../../../componentes/ModalForm";
import { CuentaBancaria } from "../CuentaBancaria/CuentaBancaria";
import ButtonsAdd from '../Utilerias/ButtonsAdd';
import { CATORGModal } from "./CATORGModal";




export const CATORG = () => {
  const [data, setData] = useState([]);
  const [modo, setModo] = useState("");
  const [open, setOpen] = useState(false);
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [vrows, setVrows] = useState({});
  const user: RESPONSE = JSON.parse(String(getUser()));

  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [agregar, setAgregar] = useState<boolean>(false);
  const [editar, setEditar] = useState<boolean>(false);
  const [eliminar, setEliminar] = useState<boolean>(false);
  const [visualizarUsuarioResponsable, setVisualizarUsuarioResponsable] = useState<boolean>(false);
  const [viewCC, setViewCC] = useState<boolean>(false);
  const [id, setId] = useState("");
  const [anchoAcciones, setAnchoAcciones] = useState<number>(0);

  const [openCC, setOpenCC] = useState(false);
  const [nombreProv, setNombreProv] = useState("");

  const [openUR, setOpenUR] = useState(false);
  const [idOrg, setIdOrg] = useState("");
  const [nombreOrg, setNombreOrg] = useState("");



  const columns: GridColDef[] = [
    { field: "id", hide: true },
    {
      field: "acciones", disableExport: true,
      headerName: "Acciones",
      description: "Campo de Acciones",
      sortable: false,
      width: 100 + anchoAcciones ,
      renderCell: (v) => {
        return (
          <>
            <BotonesAcciones
              handleAccion={handleAccion}
              row={v}
              editar={editar}
              eliminar={eliminar} />

            {visualizarUsuarioResponsable ? (
              <Tooltip title={"Visualizar Usuario Responsable"}>
                <IconButton onClick={() => handleUR(v)}>
                  <ManageAccountsIcon />
                </IconButton>
              </Tooltip>
            ) : (
              ""
            )}

            {viewCC ? (
              <Tooltip title={"Visualizar CuentaBancaria"}>
                <IconButton onClick={() => handleCC(v)}>
                <AccountBalanceWalletIcon />
                </IconButton>
              </Tooltip>
            ) : (
              ""
            )}
          </>
        );
      },
    },
    { field: "Descripcion", headerName: "Descripción", description: "Descripción", width: 450 },
    { field: "ClavePSIREGOB", headerName: "Clave Proveedor SIREGOB ", description: "Clave Proveedor SIREGOB ", width: 300 },
    { field: "ClaveDSIREGOB", headerName: "Clave Deudor SIREGOB", description: "Clave Deudor SIREGOB", width: 300 },
    { field: "Clasificador01", headerName: "Clasificador 01", description: "Clasificador 01", width: 300 },
    { field: "Clasificador02", headerName: "Clasificador 02", description: "Clasificador 02", width: 300 },
    { field: "Clasificador03", headerName: "Clasificador 03", description: "Clasificador 03", width: 300 },
    { field: "Clasificador04", headerName: "Clasificador 04", description: "Clasificador 04", width: 300 },
    { field: "Clasificador05", headerName: "Clasificador 05", description: "Clasificador 05", width: 300 },
    { field: "Clasificador06", headerName: "Clasificador 06", description: "Clasificador 06", width: 300 },
    { field: "Clasificador07", headerName: "Clasificador 07", description: "Clasificador 07", width: 300 },
    { field: "Clasificador08", headerName: "Clasificador 08", description: "Clasificador 08", width: 300 },
    { field: "Clasificador09", headerName: "Clasificador 09", description: "Clasificador 09", width: 300 },
    { field: "Clasificador10", headerName: "Clasificador 10", description: "Clasificador 10", width: 300 },
    { field: "Clasificador11", headerName: "Clasificador 11", description: "Clasificador 11", width: 300 },


  ];

  const handleUR = (v: any) => {
    setOpenUR(true);
    // setData(v);
    setIdOrg(v.row.id);
    setNombreOrg(v.row.Descripcion);
  };

  const handleCC = (v: any) => {
    setId(v.row.id);
    setNombreProv(v.row.Descripcion)
    setOpenCC(true);

  };

  const handleAccion = (v: any) => {
    if (v.tipo === 1) {
      //console.log(v);
      setTipoOperacion(2);
      setModo("Editar Registro");
      setOpen(true);
      setVrows(v.data);
    } else if (v.tipo == 2) {
      Swal.fire({
        icon: "info",
        title: "¿Estás seguro de eliminar este registro??",
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
          //console.log(data);

          CatalogosServices.Organismos(data).then((res) => {
            if (res.SUCCESS) {
              Toast.fire({
                icon: "success",
                title: "Registro Eliminado!",
              });

              let data = {
                NUMOPERACION: 4,
              };
              consulta(data);
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
    }
  };

  const handleClose = () => {
    setOpen(false);
    setOpenUR(false);
    setOpenCC(false);
    consulta({ NUMOPERACION: 4 });


  };

  const handleOpen = (v: any) => {
    setTipoOperacion(1);
    setModo("Agregar Registro");
    setOpen(true);
    setVrows(v);
  };

  const consulta = (data: any) => {
    CatalogosServices.Organismos(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "¡Consulta Exitosa!",
        });
        //console.log(res);
        setData(res.RESPONSE);
      } else {
        AlertS.fire({
          title: "¡Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };


  useEffect(() => {
    var ancho = 0;
    permisos.map((item: PERMISO) => {
      if (String(item.ControlInterno) === "ORG") {
        //console.log(item)
        if (String(item.Referencia) === "AGREG") {
          setAgregar(true);
        }
        if (String(item.Referencia) === "ELIM") {
          setEliminar(true);
        }
        if (String(item.Referencia) === "EDIT") {
          setEditar(true);
        }
        if (String(item.Referencia) === "VUSUARIOR") {
          setVisualizarUsuarioResponsable(true);
          ancho = ancho + 50;
        }
        if (String(item.Referencia) === "VIEWCC") {
          setViewCC(true);
          ancho = ancho + 50;
        }
      }
      setAnchoAcciones(ancho)
    });
    consulta({ NUMOPERACION: 4 });
  }, []);

  return (
    <div style={{ height: 600, width: "100%", padding: "1%" }}>
      {openUR ? (
        <UsuarioResponsable handleClose={handleClose} id={idOrg} nombre={nombreOrg} tipo={"ORG"} />
      ) : (
        ""
      )}
      {open ? (
        <CATORGModal
          open={open}
          modo={modo}
          tipo={tipoOperacion}
          handleClose={handleClose}
          dt={vrows}
        />
      ) : (
        ""
      )}

      <Grid container justifyContent="space-between">
        <Grid item md={12} textAlign="center" >
          <Typography variant="h3" >
            {"Organismos"}
          </Typography>
        </Grid>
      </Grid>


      <ButtonsAdd handleOpen={handleOpen} agregar={agregar} />
      <MUIXDataGrid columns={columns} rows={data} />
      {openCC ? (
        // <MunicipiosCuentaBancaria handleClose={handleClose} dt={data} />
        <ModalForm title={"Cuentas Bancarias"} handleClose={handleClose}>
          <CuentaBancaria idmunicipio={id} municipio={nombreProv} ></CuentaBancaria>
        </ModalForm>

      ) : (
        ""
      )}
    </div>
  )
}
