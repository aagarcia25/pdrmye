import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import { Grid, IconButton, Tooltip } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AlertS } from "../../../../../helpers/AlertS";
import { Toast } from "../../../../../helpers/Toast";
import {
  ITEMS,
  MUNICIPIO,
  PERMISO,
  USUARIORESPONSE,
  menus,
} from "../../../../../interfaces/user/UserInfo";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import {
  getMenus,
  getMunicipio,
  getPermisos,
  getUser,
} from "../../../../../services/localStorage";
import UsuarioResponsable from "../../../DAMOP/UsuarioResponsable";
import MUIXDataGridMun from "../../../MUIXDataGridMun";
import Slider from "../../../Slider";
import BotonesAcciones from "../../../componentes/BotonesAcciones";
import NombreCatalogo from "../../../componentes/NombreCatalogo";
import { CuentaBancaria } from "../CuentaBancaria/CuentaBancaria";
import FideicomisoConfig from "./FideicomisoConfig";
import MunicipiosModal from "./MunicipiosModal";

export const Municipios = () => {
  const [id, setId] = useState("");
  const [idMun, setIdMun] = useState("");

  const [nombreMun, setNombreMun] = useState("");

  const [municipio, setMunicipio] = useState([]);
  const [editar, setEditar] = useState<boolean>(false);
  const [eliminar, setEliminar] = useState<boolean>(false);
  const [agregar, setAgregar] = useState<boolean>(false);
  const [viewCC, setViewCC] = useState<boolean>(false);
  const [viewUR, setViewUR] = useState<boolean>(false);
  const [modo, setModo] = useState("");
  const [open, setOpen] = useState(false);
  const [openFideicomiso, setOpenFideicomiso] = useState(false);
  const [openUR, setOpenUR] = useState(false);
  const [openCC, setOpenCC] = useState(false);
  const [nombreMenu, setNombreMenu] = useState("");
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [data, setData] = useState({});
  const [plantilla, setPlantilla] = useState("");
  const [fideicomiso, setFideicomiso] = useState<boolean>(false);
  const [slideropen, setslideropen] = useState(false);
  const user: USUARIORESPONSE = JSON.parse(String(getUser()));
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const mun: MUNICIPIO[] = JSON.parse(String(getMunicipio()));
  const item: menus[] = JSON.parse(String(getMenus()));

  const columns: GridColDef[] = [
    {
      field: "id",
      hideable: false,
      hide: true,
    },
    {
      field: "acciones",
      disableExport: true,
      headerName: "Acciones",
      description: "Campo de Acciones",
      sortable: false,
      width: 250,
      renderCell: (v) => {
        return (
          <>
            <Grid item xs={8}>
              {fideicomiso ? (
                <Tooltip title={"Visualizar Fideicomisos"}>
                  <IconButton onClick={() => handleFideicomiso(v)}>
                    <RequestQuoteIcon />
                  </IconButton>
                </Tooltip>
              ) : (
                ""
              )}
              {viewCC ? (
                <Tooltip title={"Visualizar Cuenta Bancaria"}>
                  <IconButton onClick={() => handleCC(v)}>
                    <AccountBalanceWalletIcon />
                  </IconButton>
                </Tooltip>
              ) : (
                ""
              )}
              {true ? (
                <Tooltip title={"Visualizar Usuario Responsable"}>
                  <IconButton onClick={() => handleUR(v)}>
                    <ManageAccountsIcon />
                  </IconButton>
                </Tooltip>
              ) : (
                ""
              )}
            </Grid>
            <Grid item xs={4}>
              <BotonesAcciones
                handleAccion={handleAccion}
                row={v}
                editar={editar}
                eliminar={false}
              ></BotonesAcciones>
            </Grid>
          </>
        );
      },
    },
    {
      field: "FechaCreacion",
      headerName: "Fecha Creación",
      description: "Fecha Creación",
      width: 180,
    },
    {
      field: "ClaveEstado",
      headerName: "Clave Estado",
      description: "Clave Estado",
      width: 120,
    },
    {
      field: "Nombre",
      headerName: "Municipio",
      description: "Municipio",
      width: 250,
    },
    {
      field: "NombreCorto",
      headerName: "Nombre Corto",
      description: "Nombre Corto",
      width: 250,
    },
    {
      field: "OrdenSFTGNL",
      headerName: "Orden SFTGNL",
      description: "Orden SFTGNL",
      width: 120,
    },
    {
      field: "ClavePSIREGOB",
      headerName: "Clave Proveedor SIREGOB",
      description: "Clave Proveedor SIREGOB",
      width: 120,
    },
    {
      field: "ClaveDSIREGOB",
      headerName: "Clave Deudor SIREGOB",
      description: "Clave Deudor SIREGOB",
      width: 120,
    },
    {
      field: "ClaveINEGI",
      headerName: "Clave INEGI",
      description: "Clave INEGI",
      width: 120,
    },
    {
      field: "MAM",
      headerName: "Área Metropolitana",
      description: "Área Metropolitana",
      width: 100,
      renderCell: (v) => {
        return v.row.MAM == 1 ? "SI" : "NO";
      },
    },
    {
      field: "Descentralizado",
      headerName: "Descentralizado",
      description: "Descentralizado",
      width: 100,
      renderCell: (v) => {
        return v.row.Descentralizado == 1 ? "SI" : "NO";
      },
    },
    {
      field: "ArtF1",
      headerName: "ARTF1",
      description: "ARTF1",
      width: 100,
      renderCell: (v) => {
        return v.row.ArtF1 == "1" ? "SI" : "NO";
      },
    },
    {
      field: "ArtF2",
      headerName: "ARTF2",
      description: "ARTF2",
      width: 100,
      renderCell: (v) => {
        return v.row.ArtF2 == "1" ? "SI" : "NO";
      },
    },
    {
      field: "ArtF3",
      headerName: "ARTF3",
      description: "ARTF3",
      width: 100,
      renderCell: (v) => {
        return v.row.ArtF3 == "1" ? "SI" : "NO";
      },
    },
  ];

  const handleAccion = (v: any) => {
    if (v.tipo == 1) {
      setTipoOperacion(2);
      setModo("Editar Registro");
      setOpen(true);
      setData(v.data);
    } else if (v.tipo == 2) {
      handleDelete(v.data);
    }
  };
  const handleFideicomiso = (v: any) => {
    setModo("Agregar Fideicomiso");
    setOpenFideicomiso(true);
    setData(v);
  };

  const handleCC = (v: any) => {
    setId(v.row.id);
    setNombreMun(v.row.Nombre);
    setOpenCC(true);
  };

  const handleUR = (v: any) => {
    setOpenUR(true);
    setData(v);
    setIdMun(v.row.id);
    setNombreMun(v.row.Nombre);
  };

  const handleClose = () => {
    setOpenCC(false);
    setOpen(false);
    setOpenFideicomiso(false);
    setOpenUR(false);
    consulta({ NUMOPERACION: 4 });
  };

  const handleDelete = (v: any) => {
    Swal.fire({
      icon: "question",
      title: "¿Estás seguro de eliminar este registro?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Confirmar",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        const user: USUARIORESPONSE = JSON.parse(String(getUser()));

        let data = {
          NUMOPERACION: 3,
          CHID: v.row.id,
          CHUSER: user.Id,
        };

        CatalogosServices.municipios(data).then((res) => {
          if (res.SUCCESS) {
            Toast.fire({
              icon: "success",
              title: "¡Registro Eliminado!",
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
  };

  const handleUpload = (data: any) => {
    if (data.tipo == 1) {
    }
  };

  const consulta = (data: any) => {
    CatalogosServices.municipios(data).then((res) => {
      if (res.SUCCESS) {
        setMunicipio(res.RESPONSE);
      } else {
        AlertS.fire({
          title: "¡Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };
  const handleBorrar = (v: any) => {};

  const downloadplantilla = () => {
    let data = {
      NUMOPERACION: "MUNICIPIOS",
    };

    CatalogosServices.descargaplantilla(data).then((res) => {
      setPlantilla(res.RESPONSE);
    });
  };

  useEffect(() => {
    permisos.map((item: PERMISO) => {
      if (String(item.menu) == "MUNICIPIOS") {
        setNombreMenu(item.menu);
        if (String(item.ControlInterno) == "AGREG") {
          setAgregar(true);
        }
        if (String(item.ControlInterno) == "ELIM") {
          setEliminar(true);
        }
        if (String(item.ControlInterno) == "EDIT") {
          setEditar(true);
        }
        if (String(item.ControlInterno) == "FIDE") {
          setFideicomiso(true);
        }
        if (String(item.ControlInterno) == "VIEWCC") {
          setViewCC(true);
        }

        if (String(item.ControlInterno) == "VIEWUR") {
          setViewUR(true);
        }
      }
    });
    let data = {
      NUMOPERACION: 4,
    };

    CatalogosServices.municipios(data).then((res) => {
      setMunicipio(res.RESPONSE);
    });
    downloadplantilla();
  }, []);

  return (
    <div style={{ height: 600, width: "100%" }}>
      <Slider open={slideropen}></Slider>

      <NombreCatalogo controlInterno={"MUNICIPIOS"} />

      <MUIXDataGridMun
        columns={columns}
        rows={municipio}
        handleBorrar={handleBorrar}
        modulo={nombreMenu.toUpperCase().replace(" ", "_")}
        controlInterno={"MUNICIPIOS"}
      />
      {open ? (
        <MunicipiosModal
          open={open}
          modo={modo}
          handleClose={handleClose}
          tipo={tipoOperacion}
          dt={data}
        />
      ) : (
        ""
      )}

      {openFideicomiso ? (
        <FideicomisoConfig
          open={openFideicomiso}
          handleClose={handleClose}
          dt={data}
        />
      ) : (
        ""
      )}

      {openUR ? (
        <UsuarioResponsable
          handleClose={handleClose}
          id={idMun}
          nombre={nombreMun}
          tipo={"MUN"}
        />
      ) : (
        ""
      )}

      {openCC ? (
        // <MunicipiosCuentaBancaria handleClose={handleClose} dt={data} />
        <CuentaBancaria
          idmunicipio={id}
          municipio={nombreMun}
          handleCloseModal={handleClose}
          fullScrean={true}
        />
      ) : (
        ""
      )}
    </div>
  );
};
