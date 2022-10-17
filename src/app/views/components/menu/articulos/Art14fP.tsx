import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { GridColDef } from "@mui/x-data-grid";
import { getUser } from "../../../../services/localStorage";
import { ArticulosServices } from "../../../../services/ArticulosServices";
import MUIXDataGrid from "../../MUIXDataGrid";
import {
  Box,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import AutoModeIcon from "@mui/icons-material/AutoMode";
import Slider from "../../Slider";
import { RESPONSE } from "../../../../interfaces/user/UserInfo";
import Art14m from "./Art14m";

export const Art14fP = () => {
  const navigate = useNavigate();
  const [step, setstep] = useState(0);
  const [slideropen, setslideropen] = useState(false);
  const user: RESPONSE = JSON.parse(String(getUser()));
  const [data, setData] = useState([]);
  const [tipo, setTipo] = useState<Number>(0);


  const handleBack = (v: any) => {
    loaddata(tipo);
    setstep(0);
  };

  const handleView = (v: any) => {
    navigate(`/inicio/articulos/art14d/${tipo}/${v.row.id}`);
  };

  const handleVersion = () => {
    setstep(1);
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "Identificador", width: 150, hide: true },
    { field: "FechaCreacion", headerName: "Fecha de Creación", width: 150 },
    { field: "Version", headerName: "Versión", width: 150 },
    { field: "Articulo", headerName: "Articulo", width: 150 },
    {
      field: "deleted",
      headerName: "Activo",
      width: 150,
      renderCell: (v) => {
        return v.row.deleted === "0" ? "SI" : "NO";
      },
    },
    {
      field: "acciones",
      headerName: "Acciones",
      description: "Ver detalle",
      sortable: false,
      width: 150,
      renderCell: (v) => {
        return (
          <Box>
            <Tooltip title="Ver detalle de Cálculo">
              <IconButton onClick={() => handleView(v)}>
                <InfoIcon />
              </IconButton>
            </Tooltip>
          </Box>
        );
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
    loaddata(Number(params.tipo));
  }, [params.tipo]);

  return (
    <>
     <Slider open={slideropen} ></Slider>
    
     <Box sx={{ display: step == 0 ? "block" : "none" }}>
      <Box >
        <ToggleButtonGroup color="primary" exclusive aria-label="Platform">
          <Tooltip title="Generar Nueva Versión">
            <ToggleButton value="check" onClick={() => handleVersion()}>
              <AutoModeIcon />
            </ToggleButton>
          </Tooltip>
        </ToggleButtonGroup>
      </Box>
      <div style={{ height: 600, width: "100%" }}>
        <MUIXDataGrid columns={columns} rows={data} />
      </div>
      </Box>
      <Box sx={{ display: step == 1 ? "block" : "none" }}>
       <Art14m titulo={
       tipo == 1 ? "Articulo 14 F I" : ( tipo == 2 ? "Articulo 14 F II" : ( tipo == 3 ? "Articulo 14 F III" :"")  )
       } onClickBack={handleBack} tipo={tipo}></Art14m>
      </Box>


    </>
  );
};

export default Art14fP;
