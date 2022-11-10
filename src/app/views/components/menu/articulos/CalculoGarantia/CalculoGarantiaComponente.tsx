import { Box, Grid, IconButton, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { messages } from "../../../../styles";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Swal from "sweetalert2";
import { PERMISO, RESPONSE } from "../../../../../interfaces/user/UserInfo";
import { getPermisos, getUser } from "../../../../../services/localStorage";
import { Toast } from "../../../../../helpers/Toast";
import { Alert } from "../../../../../helpers/Alert";
import ButtonsAdd from "../../catalogos/Utilerias/ButtonsAdd";
import MUIXDataGrid from "../../../MUIXDataGrid";
import { calculosServices } from "../../../../../services/calculosServices";
import { CalculoGarantiaModal } from "./CalculoGarantiaModal";
import { Moneda } from "../../CustomToolbar";
import BotonesAcciones from "../../../componentes/BotonesAcciones";

export const CalculoGarantiaComponente = () => {
  const [calculoGarantia, setCalculoGarantia] = useState([]);
  const [modo, setModo] = useState("");
  const [open, setOpen] = useState(false);
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [vrows, setVrows] = useState({});
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [agregar, setAgregar] = useState<boolean>(false);
  const [editar, setEditar] = useState<boolean>(false);
  const [eliminar, setEliminar] = useState<boolean>(false);
  const [nombreMenu, setNombreMenu] = useState("");

  const columns: GridColDef[] = [
    {
      field: "id",
      hide: true,
    },
    {
      field: "idmunicipio",
      hide: true,
    },
    {
      field: "acciones",
      headerName: "Acciones",
      description: "Campo de Acciones",
      sortable: false,
      width: 100,
      renderCell: (v) => {
        return (
          <BotonesAcciones handleAccion={handleAccion} row={v} editar={editar} eliminar={eliminar}></BotonesAcciones>

        );
      },
    },
    { field: "FechaCreacion", headerName: "Fecha Creación", width: 150 },
    { field: "ClaveEstado", headerName: "Clave Estado", width: 150 },
    { field: "Nombre", headerName: "Municipio", width: 250 },
    {
      field: "clave",
      hide: false,
      headerName: "Clave Fondo",
      width: 100,
    },
    {
      field: "Descripcion",
      headerName: "Descripción de fondo",
      width: 420,
    },
    {
      field: "Anio",
      headerName: "Año",
      width: 120,
    },
    {
      field: "Garantia",
      headerName: "Garantía",
      width: 150,
      ...Moneda,
    },
    {
      field: "Distribucion",
      headerName: "Distribucion",
      width: 150,

    },


  ];
  const handleAccion = (v: any) => {
    if (v.tipo == 1) {
      setTipoOperacion(2);
      setModo("Editar ");
      setOpen(true);
      setVrows(v.data);
    } else if (v.tipo == 2) {
      handleDelete(v.data);
    }
  }

  const handleClose = () => {
    setOpen(false);
    consulta({ NUMOPERACION: 4 });
  };

  const handleOpen = (v: any) => {
    setTipoOperacion(1);
    setModo("Agregar Registro");
    setOpen(true);
    setVrows("");
  };

  const handleEdit = (v: any) => {
    console.log(v);
    setTipoOperacion(2);
    setModo("Editar Registro");
    setOpen(true);
    setVrows(v);
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
        console.log(v);
        const user: RESPONSE = JSON.parse(String(getUser()));

        let data = {
          NUMOPERACION: 3,
          CHID: v.row.id,
          CHUSER: user.id,
        };
        console.log(data);

        calculosServices.CalculoGarantia(data).then((res) => {
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
            Alert.fire({
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

  const consulta = (data: any) => {
    calculosServices.CalculoGarantia(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Consulta Exitosa!",
        });
        console.log(data);
        setCalculoGarantia(res.RESPONSE);
        console.log("parametroGeneral consulta", calculoGarantia);
      } else {
        Alert.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };

  useEffect(() => {
    permisos.map((item: PERMISO) => {
      if (String(item.ControlInterno) === "CA") {
        console.log(item)

        setNombreMenu(item.Menu);
        if (String(item.Referencia) == "AGREG") {
          setAgregar(true);
        }
        if (String(item.Referencia) == "ELIM") {
          setEliminar(true);
        }
        if (String(item.Referencia) == "EDIT") {
          setEditar(true);
        }
      }
    });
    consulta({ NUMOPERACION: 4 });
  }, []);

  return (
    <div style={{ height: 600, width: "100%" }}>

      <Grid container
        sx={{ justifyContent: "center" }}>
        <Grid item xs={10} sx={{ textAlign: "center" }}>
          <Typography>
            <h1>Calculo Garantía</h1>
          </Typography>
        </Grid>
      </Grid>
      <ButtonsAdd handleOpen={handleOpen} agregar={agregar} />
      <MUIXDataGrid columns={columns} rows={calculoGarantia} />
      {open ? (
        <CalculoGarantiaModal
          open={open}
          modo={modo}
          tipo={tipoOperacion}
          handleClose={handleClose}
          dt={vrows}
        />
      ) : (
        ""
      )}

    </div>
  );
};
