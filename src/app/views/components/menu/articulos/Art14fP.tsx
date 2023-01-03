import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { GridColDef } from "@mui/x-data-grid";
import { getPermisos } from "../../../../services/localStorage";
import { ArticulosServices } from "../../../../services/ArticulosServices";
import MUIXDataGrid from "../../MUIXDataGrid";
import {
  Box,
  Grid,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import AutoModeIcon from "@mui/icons-material/AutoMode";
import Slider from "../../Slider";
import { PERMISO } from "../../../../interfaces/user/UserInfo";
import Art14m from "./Art14m";
import MUIXDataGridMun from "../../MUIXDataGridMun";

export const Art14fP = () => {
  const navigate = useNavigate();
  const [step, setstep] = useState(0);
  const [slideropen, setslideropen] = useState(false);
  const [data, setData] = useState([]);
  const [tipo, setTipo] = useState<Number>(0);
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [agregar, setAgregar] = useState<boolean>(false);

  const handleBack = (v: any) => {
    loaddata(tipo);
    setstep(0);
  };
  const handleBorrar = () => {
  };
  const handleView = (v: any) => {
    navigate(`/inicio/articulos/art14d/${tipo}/${v.row.id}/${v.row.deleted}/${v.row.Version}`);
  };

  const handleVersion = () => {
    setstep(1);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "Identificador", width: 150, hide: true },
    {
      field: "acciones",  disableExport: true,
      headerName: "Acciones",
      description: "Ver detalle",
      sortable: false,
      width: 150,
      renderCell: (v) => {
        return (
          <Box>
            <Tooltip title="Ver Detalle de Cálculo">
              <IconButton onClick={() => handleView(v)}>
                <InfoIcon />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
    { field: "FechaCreacion", headerName: "Fecha de Creación",description: "Fecha de Creación", width: 150 },
    { field: "UC",            headerName: "Creado Por",       description: "Creado Por",        width: 150 },
    { field: "Version",       headerName: "Versión",          description: "Versión",           width: 150 },
    { field: "Articulo",      headerName: "Articulo",         description: "Articulo",          width: 150 },
    {
      field: "deleted",      headerName: "Activo",            description: "Activo",
      width: 150,
      renderCell: (v) => {
        return v.row.deleted === "0" ? "SI" : "NO";
      },
    },
  ];

  const loaddata = (tipo: Number) => {
    let data = {
      CLAVE: tipo,
    };
    setTipo(tipo);
    ArticulosServices.articuloprincipal(data).then((res) => {
      setData(res.RESPONSE);
    });
  };

  let params = useParams();
  useEffect(() => {
    permisos.map((item: PERMISO) => {
      if (
        String(item.ControlInterno) === "ART14F1" ||
        String(item.ControlInterno) === "ART14F2" ||
        String(item.ControlInterno) === "ART14F3"
      ) {
        //console.log(item);
        if (String(item.Referencia) === "AGREG") {
          setAgregar(true);
        }
      }
    });
    loaddata(Number(params.tipo));
  }, [params.tipo]);

  return (
    <>
      <Slider open={slideropen}></Slider>

      <Box sx={{ display: step == 0 ? "block" : "none" }}>
        <Box>
          <Grid container >
            <Grid item sm={12} sx={{ display: "flex", alignItems: "center", justifyContent: "center", }}>
              <Typography variant='h3'>
                {tipo == 1
                  ? "Artículo 14 F I"
                  : tipo === 2
                    ? "Artículo 14 F II"
                    : tipo === 3
                      ? "Artículo 14 F III"
                      : ""}
              </Typography>
            </Grid>
          </Grid>
          {agregar ? (
            <ToggleButtonGroup color="primary" exclusive aria-label="Platform">
              <Tooltip title="Generar Nueva Versión">
                <ToggleButton value="check" onClick={() => handleVersion()}>
                  <AutoModeIcon />
                </ToggleButton>
              </Tooltip>
            </ToggleButtonGroup>
          ) : (
            ""
          )}
        </Box>
        <div style={{ height: 600, width: "100%" }}>
          <MUIXDataGridMun columns={columns} rows={data} modulo={tipo == 1
            ? "Articulo_14_FI"
            : tipo === 2
              ? "Articulo_14_FII"
              : tipo === 3
                ? "Articulo_14_FIII"
                : ""}
          handleBorrar={handleBorrar} controlInterno={""}  />
        </div>
      </Box>

      {step == 1 ? (
        <Art14m
          titulo={
            tipo == 1
              ? "Artículo 14 F I"
              : tipo === 2
                ? "Artículo 14 F II"
                : tipo === 3
                  ? "Artículo 14 F III"
                  : ""
          }
          onClickBack={handleBack}
          tipo={tipo}
        ></Art14m>
      ) : (
        ""
      )}
    </>
  );
};

export default Art14fP;
