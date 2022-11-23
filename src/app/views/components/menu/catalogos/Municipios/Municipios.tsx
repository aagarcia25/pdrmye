import React, { useEffect, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import Slider from "../../../Slider";
import { getPermisos, getUser } from "../../../../../services/localStorage";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import { messages } from "../../../../styles";
import MUIXDataGrid from "../../../MUIXDataGrid";
import { AlertS } from "../../../../../helpers/AlertS";
import Swal from "sweetalert2";
import { Toast } from "../../../../../helpers/Toast";
import MunicipiosModal from "./MunicipiosModal";
import { PERMISO, RESPONSE } from "../../../../../interfaces/user/UserInfo";
import ButtonsMunicipio from "../Utilerias/ButtonsMunicipio";
import BotonesAcciones from "../../../componentes/BotonesAcciones";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import { Box, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import FideicomisoConfig from "./FideicomisoConfig";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import MunicipiosUsuarioResponsable from "./MunicipiosUsuarioResponsable";
import { CuentaBancaria } from "../CuentaBancaria/CuentaBancaria";
import ModalForm from "../../../componentes/ModalForm";

export const Municipios = () => {
  const [id, setId] = useState("");
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
  const user: RESPONSE = JSON.parse(String(getUser()));
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));

  const columns: GridColDef[] = [
    {
      field: "id",
      hide: true,
      headerName: "Identificador",
      width: 150,
      description: messages.dataTableColum.id,
    },
    {
      field: "acciones",
      headerName: "Acciones",
      description: "Campo de Acciones",
      sortable: false,
      width: 200,
      renderCell: (v) => {
        return (
          <>
            <Box>
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
              {viewUR ? (
                <Tooltip title={"Visualizar Usuario Responsable"}>
                  <IconButton onClick={() => handleUR(v)}>
                    <ManageAccountsIcon />
                  </IconButton>
                </Tooltip>
              ) : (
                ""
              )}
            </Box>
            <Box>
              <BotonesAcciones
                handleAccion={handleAccion}
                row={v}
                editar={editar}
                eliminar={eliminar}
              ></BotonesAcciones>
            </Box>
          </>
        );
      },
    },
    { field: "FechaCreacion", headerName: "Fecha Creación", width: 150 },
    { field: "ClaveEstado", headerName: "Clave Estado", width: 120 },
    { field: "Nombre", headerName: "Municipio", width: 250 },

    { field: "NombreCorto", headerName: "Nombre Corto", width: 250 },
    { field: "OrdenSFTGNL", headerName: "Orden SFTGNL", width: 120 },
    { field: "ClaveSIREGOB", headerName: "Clave SIREGOB", width: 120 },
    { field: "ClaveINEGI", headerName: "Clave INEGI", width: 120 },
    {
      field: "MAM",
      headerName: "Área Metropolitana",
      width: 100,
      renderCell: (v) => {
        return v.row.MAM === 1 ? "SI" : "NO";
      },
    },
    {
      field: "Descentralizado",
      headerName: "Descentralizado",
      width: 100,
      renderCell: (v) => {
        return v.row.Descentralizado === 1 ? "SI" : "NO";
      },
    },
    {
      field: "ArtF1",
      headerName: "ARTF1",
      width: 100,
      renderCell: (v) => {
        return v.row.ArtF1 === "1" ? "SI" : "NO";
      },
    },
    {
      field: "ArtF2",
      headerName: "ARTF2",
      width: 100,
      renderCell: (v) => {
        return v.row.ArtF2 === "1" ? "SI" : "NO";
      },
    },
    {
      field: "ArtF3",
      headerName: "ARTF3",
      width: 100,
      renderCell: (v) => {
        return v.row.ArtF3 === "1" ? "SI" : "NO";
      },
    },
  ];

  const handleAccion = (v: any) => {
    if (v.tipo === 1) {
      setTipoOperacion(2);
      setModo("Editar Registro");
      setOpen(true);
      setData(v.data);
    } else if (v.tipo === 2) {
      handleDelete(v.data);
    }
  };
  const handleFideicomiso = (v: any) => {
    setModo("Agregar Fideicomiso");
    setOpenFideicomiso(true);
    setData(v);
  };

  const handleCC = (v: any) => {
    //console.log(v);
    setId(v.row.id);
    setNombreMun(v.row.Nombre)
    setOpenCC(true);
    
  };

  const handleUR = (v: any) => {
    setOpenUR(true);
    setData(v);
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
      icon: "info",
      title: "Estas seguro de eliminar este registro?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Confirmar",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        //console.log(v);
        const user: RESPONSE = JSON.parse(String(getUser()));

        let data = {
          NUMOPERACION: 3,
          CHID: v.row.id,
          CHUSER: user.id,
        };
        //console.log(data);

        CatalogosServices.municipios(data).then((res) => {
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
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setslideropen(true);
    let file = event?.target?.files?.[0] || "";
    const formData = new FormData();
    formData.append("inputfile", file, "inputfile.xlsx");
    formData.append("tipo", "ANTICIPO_PARTICIPACIONES");
    CatalogosServices.migraData(formData).then((res) => {
      setslideropen(false);
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Carga Exitosa!",
        });
      } else {
        AlertS.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };

  const consulta = (data: any) => {
    CatalogosServices.municipios(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Consulta Exitosa!",
        });
        //console.log(data);
        setMunicipio(res.RESPONSE);
      } else {
        AlertS.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
        //console.log(res);
        //console.log(res.SUCCESS);
      }
    });
  };

  useEffect(() => {
    permisos.map((item: PERMISO) => {
      if (String(item.ControlInterno) === "MUNICIPIOS") {
        //console.log(item);
        setNombreMenu(item.Menu);
        if (String(item.Referencia) === "AGREG") {
          setAgregar(true);
        }
        if (String(item.Referencia) === "ELIM") {
          setEliminar(true);
        }
        if (String(item.Referencia) === "EDIT") {
          setEditar(true);
        }
        if (String(item.Referencia) === "FIDE") {
          setFideicomiso(true);
        }
        if (String(item.Referencia) === "VIEWCC") {
          setViewCC(true);
        }

        if (String(item.Referencia) === "VIEWUR") {
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
  }, []);

  return (
    <div style={{ height: 600, width: "100%" }}>
      <Slider open={slideropen}></Slider>


      <Grid container
        sx={{ justifyContent: "center" }}>
        <Grid item xs={10} sx={{ textAlign: "center" }}>
          <Typography variant="h3">
           {nombreMenu}
          </Typography>
        </Grid>
      </Grid>

      <ButtonsMunicipio
        url={plantilla}
        handleUpload={handleUpload}
        controlInterno={"MUNICIPIOS"}
      />

      <MUIXDataGrid sx={{}} columns={columns} rows={municipio} />
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
        <MunicipiosUsuarioResponsable handleClose={handleClose} dt={data} />
      ) : (
        ""
      )}

      {openCC ? (
        // <MunicipiosCuentaBancaria handleClose={handleClose} dt={data} />
        <ModalForm title={"Cuentas Bancarias"} handleClose={handleClose}>
            <CuentaBancaria idmunicipio={id} municipio={nombreMun} ></CuentaBancaria>
        </ModalForm>
      
      ) : (
        ""
      )}
    </div>
  );
};
