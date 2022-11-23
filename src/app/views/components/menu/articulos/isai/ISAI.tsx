import { useEffect, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { getPermisos, getUser } from "../../../../../services/localStorage";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import Slider from "../../../Slider";
import { Toast } from "../../../../../helpers/Toast";
import { AlertS } from "../../../../../helpers/AlertS";
import Swal from "sweetalert2";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MUIXDataGrid from "../../../MUIXDataGrid";
import { PERMISO, RESPONSE } from "../../../../../interfaces/user/UserInfo";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import {
  Box,
  Grid,
  IconButton,
  Link,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import ModalForm from "../../../componentes/ModalForm";
import SaveButton from "../../../componentes/SaveButton";
import Title from "../../../componentes/Title";
import { Moneda } from "../../CustomToolbar";

const ISAI = () => {
  //   VALORES POR DEFAULT
  const [open, setOpen] = useState(false);
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [dataTipoFondo, setDataTipoFondo] = useState([]);
  const [slideropen, setslideropen] = useState(true);
  const user: RESPONSE = JSON.parse(String(getUser()));
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [agregar, setAgregar] = useState<boolean>(false);
  const [editar, setEditar] = useState<boolean>(false);
  const [eliminar, setEliminar] = useState<boolean>(false);
  const [nombreMenu, setNombreMenu] = useState("");
  const [vrows, setVrows] = useState({});
  const [tipoCalculo, setTipoCalculo] = useState("");
  const [version, setVersion] = useState(0);
  const [modo, setModo] =  useState(0);
  const [plantilla, setPlantilla] = useState("");


  const columns1: GridColDef[] = [
    {
      field: "id",
      headerName: "Identificador",
      hide: true,
    },
    { field: "Version", headerName: "Versión", width: 150 },
    { field: "FechaCreacion", headerName: "Fecha de Creación", width: 200 },
    { field: "municipio", headerName: "Municipio", width: 250 },
    { field: "Importe", headerName: "Importe", width: 500,...Moneda },
    { field: "Coeficiente", headerName: "Coeficiente", width: 250 },
    { field: "UC", headerName: "Usuario Creo", width: 350 },
    { field: "UM", headerName: "Usuario Modifico", width: 350 },
  ];

  const columns0: GridColDef[] = [
    {
        field: "acciones",
        headerName: "Acciones",
        description: "Campo de Acciones",
        sortable: false,
        width: 200,
        renderCell: (v) => {
          return (
            <Box>
              <Tooltip title={"Ver Detalle"}>
                <IconButton onClick={() => handleView(v)}>
                  <RemoveRedEyeIcon />
                </IconButton>
              </Tooltip>
            </Box>
          );
        },
      },
    {field: "id",headerName: "Versión",},
    { field: "Importe", headerName: "Importe", width: 500,...Moneda },
    { field: "UC", headerName: "Usuario Creo", width: 350 },
    { field: "UM", headerName: "Usuario Modifico", width: 350 },
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
        consulta(5);
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
    if (v.tipo === 2) {
      setTipoOperacion(2);
      setVrows(v.data);
      setOpen(true);
    } else if (v.tipo === 3) {
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
              consulta(5);
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

  const handleView = (v: any) => {
    consulta(4);
    setVersion(v.id);
    setModo(1)
  };

  const handleBack = () => {
    consulta(5);
    setModo(0)
   
  };
  const handleClose = () => {
    consulta(5);
    setVrows({});
    setOpen(false);
  };

  const handleOpen = (v: any) => {
    setTipoOperacion(1);
    setOpen(true);
    setTipoCalculo("");
    setVrows({});
  };

  const consulta = (NUMOPERACION:number) => {
    setslideropen(true);
    let data = {
      NUMOPERACION: NUMOPERACION,
    };

    CatalogosServices.MUNISAI(data).then((res) => {
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
      setslideropen(false);
    });
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setslideropen(true);
    let file = event?.target?.files?.[0] || "";
    const formData = new FormData();
    formData.append("inputfile", file, "inputfile.xlxs");
    formData.append("NUMOPERACION", "1");
    formData.append("CHUSER",  user.id);
    CatalogosServices.MUNISAI(formData).then((res) => {
      setslideropen(false);
      consulta(5);
    });
  };

  const downloadplantilla = () => {
    let data = {
      NUMOPERACION: "PLANTILLA DE CARGA_ISAI",
    };

    CatalogosServices.descargaplantilla(data).then((res) => {
      setPlantilla(res.RESPONSE);
    });
  };

  useEffect(() => {
    permisos.map((item: PERMISO) => {
      if (String(item.ControlInterno) === "ISAI") {
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
      }
    });
    downloadplantilla();
    consulta(5);
  
  }, []);

  return (
    
    
    
    <div >
      <Slider open={slideropen}></Slider>
      <Title titulo={nombreMenu} tooltip={"Coeficiente Generado para el cálculo del ISAI"}></Title>
      
      <div style={{ height: 600, width: "100%" ,display : modo === 0 ? "block":"none"}}>
      <Box >
        {agregar ?
        <>
          <Tooltip title="Descargar Plantilla">
          <IconButton aria-label="upload documento" component="label" size="large">
            <Link href={plantilla}>
              <ArrowDownwardIcon />
            </Link>
            </IconButton>
        </Tooltip>

        <Tooltip title="Cargar Plantilla">
        <IconButton aria-label="upload documento" component="label" size="large">
        <input   hidden accept=".xlsx, .XLSX, .xls, .XLS" type="file" value="" onChange={(v) => handleUpload(v)} />
        <DriveFolderUploadIcon />
        </IconButton>
        </Tooltip>
        </>
         :""}
      </Box>

      <MUIXDataGrid columns={columns0} rows={dataTipoFondo} />
      </div>

      <div style={{height: 600, width: "100%", display : modo === 1 ? "block":"none"}}>
      <Box >
      <ToggleButtonGroup color="primary" exclusive aria-label="Platform">
      <Tooltip title="Regresar">
        <ToggleButton value="check" onClick={ () =>handleBack()}>
          <ArrowBackIcon />
        </ToggleButton>
      </Tooltip>
    </ToggleButtonGroup>
      </Box>

      <MUIXDataGrid columns={columns1} rows={dataTipoFondo} />
      </div>
      





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
                error={tipoCalculo === null ? true : false}
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

export default ISAI;
