import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { GridColDef } from "@mui/x-data-grid";
import { getPU } from "../../../../services/localStorage";
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
import { UserReponse } from "../../../../interfaces/user/UserReponse";
import Swal from "sweetalert2";
import Slider from "../../Slider";

export const Art14fP = () => {
  const navigate = useNavigate();
  const [slideropen, setslideropen] = useState(false);
  const user: UserReponse = JSON.parse(String(getPU()));
  const [data, setData] = useState([]);
  const [tipo, setTipo] = useState<Number>(0);




  const handleView = (v: any) => {
    navigate(`/inicio/articulos/art14d/${tipo}/${v.row.id}`);
  };

  const handleVersion = () => {
    console.log("Se generara una nueva version del calculo");
    let data = {
      CLAVE: tipo,
      CHUSER: user.IdUsuario,
      P_ANIO: 2022,
      P_IMPORTE: 12,
      
    };

    Swal.fire({
      icon: 'info',
      title: "Se Generar una nueva versión del Articulo ",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Aceptar",
    }).then((result) => {

      if (result.isConfirmed) {
        setslideropen(true);
        ArticulosServices.generarVersion(data).then((res) => {
          console.log(res);
          loaddata(tipo);
          setslideropen(false);
        });
      }
    });
  };

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
      <Box sx={{
       
      }}>
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
    </>
  );
};

export default Art14fP;
