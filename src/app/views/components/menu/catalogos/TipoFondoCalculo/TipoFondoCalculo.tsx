import { useEffect, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { getPermisos, getUser } from "../../../../../services/localStorage";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import Slider from "../../../Slider";
import { Toast } from "../../../../../helpers/Toast";
import { AlertS } from "../../../../../helpers/AlertS";
import Swal from "sweetalert2";
import ButtonsAdd from "../Utilerias/ButtonsAdd";
import MUIXDataGrid from "../../../MUIXDataGrid";
import { PERMISO, RESPONSE } from "../../../../../interfaces/user/UserInfo";
import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import ModalForm from "../../../componentes/ModalForm";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SaveButton from "../../../componentes/SaveButton";
import Title from "../../../componentes/Title";

const TipoFondoCalculo = () => {
  //   VALORES POR DEFAULT
  const [open, setOpen] = useState(false);
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [dataTipoFondo, setDataTipoFondo] = useState([]);
  const [slideropen, setslideropen] = useState(false);
  const user: RESPONSE = JSON.parse(String(getUser()));
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [agregar, setAgregar] = useState<boolean>(false);
  const [editar, setEditar] = useState<boolean>(false);
  const [eliminar, setEliminar] = useState<boolean>(false);
  const [nombreMenu, setNombreMenu] = useState("");
  const [vrows, setVrows] = useState({});
  const [tipoCalculo, setTipoCalculo] = useState("");

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Identificador",
      hide: true,
      width: 10,
    },
    {
      field: "acciones",
      headerName: "Acciones",
      description: "Campo de Acciones",
      sortable: false,
      width: 200,
      renderCell: (v) => {
        return (
          <Box>
            {/* EDITAR */}
            {editar ? (
              <Tooltip title={"Editar Registro"}>
                <IconButton
                  color="info"
                  onClick={() => handleAccion({ tipo: 2, data: v })}
                >
                  <ModeEditOutlineIcon />
                </IconButton>
              </Tooltip>
            ) : (
              ""
            )}
            {/* ELIMINAR */}
            {eliminar ? (
              <Tooltip title={"Eliminar Registro"}>
                <IconButton
                  color="error"
                  onClick={() => handleAccion({ tipo: 3, data: v })}
                >
                  <DeleteForeverIcon />
                </IconButton>
              </Tooltip>
            ) : (
              ""
            )}
          </Box>
        );
      },
    },
    { field: "FechaCreacion", headerName: "Fecha de Creación", width: 150 },
    { field: "Descripcion", headerName: "Descripcion", width: 350 },
  ];

  const handlesave = (v: any) => {
    
    let data = {
      NUMOPERACION: tipoOperacion,
      DESCRIPCION: tipoCalculo,
      CHUSER: user.id,
      CHID:v.id
    };

    CatalogosServices.TipoFondosCalculo(data).then((res) => {
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

  };

  const handleAccion = (v: any) => {
    //console.log(v)
    if (v.tipo == 2) {
      setTipoOperacion(2);
      setVrows(v.data);
      setOpen(true);
    } else if (v.tipo == 3) {
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
            CHID: v.data.id,
            CHUSER: user.id,
          };

          CatalogosServices.TipoFondosCalculo(data).then((res) => {
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
    }
  };

  const handleClose = () => {
    consulta();
    setVrows({});
    setOpen(false);
  };

  const handleOpen = (v: any) => {
    setTipoOperacion(1);
    setOpen(true);
    setTipoCalculo("");
    setVrows({});
  };

  const consulta = () => {
    let data = {
      NUMOPERACION: 4,
    };

    CatalogosServices.TipoFondosCalculo(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Consulta Exitosa!",
        });
        setDataTipoFondo(res.RESPONSE);
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
    permisos.map((item: PERMISO) => {
      if (String(item.ControlInterno) === "TIPOCALCULO") {
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
    consulta();
  }, []);

  return (
    <div style={{ height: 600, width: "100%" }}>
      <Slider open={slideropen}></Slider>
      <Title titulo={nombreMenu} tooltip={"Cátalogo para Agregar los tipos de Cálculos Permitidos generar"}></Title>
      <ButtonsAdd handleOpen={handleOpen} agregar={agregar} />
      <MUIXDataGrid columns={columns} rows={dataTipoFondo} />

      {open ? (
        <ModalForm
          title={
            tipoOperacion === 1 ? "Agregar Registro" : "Modificar Registro"
          }
          handleClose={handleClose}
        >
          <Grid
            container
            sx={{
              mt: "2vh",
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Grid item xs={3} sm={3} md={3} lg={3}>
              <Typography>
                Descripción de Tipo de Cálculo:
              </Typography>
            </Grid>
            <Grid item xs={9} sm={9} md={9} lg={9}>
              <TextField
                required
                margin="dense"
                label="Descripción"
                value={tipoCalculo}
                type="text"
                fullWidth
                variant="standard"
                onChange={(v) => setTipoCalculo(v.target.value)}
                error={tipoCalculo == null ? true : false}
              />
            </Grid>

            <SaveButton
              vrow={vrows}
              handleAccion={handlesave}
              tipoOperacion={tipoOperacion}
            ></SaveButton>
          </Grid>
        </ModalForm>
      ) : (
        ""
      )}
    </div>
  );
};

export default TipoFondoCalculo;
