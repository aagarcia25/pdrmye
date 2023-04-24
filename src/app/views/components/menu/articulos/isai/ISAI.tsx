import { useEffect, useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import { getPermisos, getUser } from "../../../../../services/localStorage";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import Slider from "../../../Slider";
import { Toast } from "../../../../../helpers/Toast";
import { AlertS } from "../../../../../helpers/AlertS";
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
import ButtonsMunicipio from "../../catalogos/Utilerias/ButtonsMunicipio";

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
        field: "acciones",  disableExport: true,
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

 
 

  const handleView = (v: any) => {
    setVersion(v.id);
    setModo(1)
    consulta(4);
  };

  const handleBack = () => {
    setModo(0)
    consulta(5);
  };


 

  const consulta = (NUMOPERACION:number) => {
    setslideropen(true);
    let data = {
      NUMOPERACION: NUMOPERACION,
      VERSION:version
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
          title: "¡Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
      setslideropen(false);
    });
  };

  const handleUpload = (data: any) => {
    var  event :React.ChangeEvent<HTMLInputElement> = data.data;
    setslideropen(true);
    let file = event.target?.files?.[0] || "";
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

  const handleFilterChange = (v: string) => {

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


      <ButtonsMunicipio
        url={plantilla}
        handleUpload={handleUpload} controlInterno={"ISAI"}
        options={[]}
        onInputChange={handleFilterChange}
        placeholder={"Seleccione Año"} label={''} disabled={false}
        value={""} handleOpen={handleFilterChange} />
        {/* {agregar ?
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
         :""} */}
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
      
    </div>
  );
};

export default ISAI;
