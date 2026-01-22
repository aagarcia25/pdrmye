import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Box,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Moneda } from "../../../menu/CustomToolbar";

import Slider from "../../../Slider";
import MUIXDataGrid from "../../../MUIXDataGrid";
import { calculosServices } from "../../../../../services/calculosServices";

const IsnParticipacionDetalle = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [slideropen, setslideropen] = useState(false);
  const [data, setData] = useState<any[]>([]);

  const totalMunicipios = data.length;

  const montoTotal = data.reduce(
    (acc, item) => acc + Number(item.mensual || 0),
    0
  );
  const [selectedRow, setSelectedRow] = useState<any>(null);

  const StatCard = ({
    title,
    value,
  }: {
    title: string;
    value: string | number;
  }) => (
    <Box
      sx={{
        p: 2.5,
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        height: "100%",
      }}
    >
      <Typography variant="body2" color="text.secondary">
        {title}
      </Typography>
      <Typography variant="h5" fontWeight={600}>
        {value}
      </Typography>
    </Box>
  );



  const handleBack = () => {
    navigate("/inicio/articulos/isnP");
  };

const columnsISNParticipacionDetalle = [
  {
    field: "id",
    headerName: "ID",
    width: 150,
    hide: true,
  },
  {
    field: "anio",
    headerName: "Año",
    width: 120,
  },
  {
    field: "fechaCreacion",
    headerName: "Fecha Creación",
    width: 180,
  },
  {
    field: "ClaveEstado",
    headerName: "Clave",
    width: 220,
  },
  {
    field: "nombre",
    headerName: "Municipio",
    width: 220,
  },
  {
    field: "mensual",
    headerName: "Mensual",
    width: 160,
    ...Moneda,
  }
];




  useEffect(() => {
    setslideropen(true);

    calculosServices
      .IsnParticipacion({
        NUMOPERACION: 2,
        P_IDISNP: id
      })
      .then((res) => {
        if (res.SUCCESS) {
          setData(res.RESPONSE);
        }
        setslideropen(false);
      });
  }, [id]);

  return (
    <Box>
     <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
      <Grid item>
        <Tooltip title="Regresar">
          <ToggleButton value="back" onClick={handleBack}>
            <ArrowBackIcon />
          </ToggleButton>
        </Tooltip>
      </Grid>

      <Grid item xs>
        <Typography variant="h5" fontWeight={600}>
          Detalle ISN Participación — Año {data?.[0]?.anio ?? "—"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Visualización detallada de los montos mensuales por municipio
        </Typography>
      </Grid>
    </Grid>

    
      <Box
        sx={{
          border: "1px solid",
          borderColor: "divider",
          p: 2,
        }}
      >


        <Grid container spacing={2} sx={{ mb: 3 }}>
  <Grid item xs={12} md={4}>
    <StatCard
      title="Total Municipalidades"
      value={totalMunicipios}
    />
  </Grid>

  <Grid item xs={12} md={4}>
    <StatCard
      title="Monto Total"
      value={montoTotal.toLocaleString("es-MX", {
        style: "currency",
        currency: "MXN",
      })}
    />
  </Grid>

  <Grid item xs={12} md={4}>
    <StatCard
      title="Año"
      value={data?.[0]?.anio ?? "—"}
    />
  </Grid>
</Grid>


        <div style={{ height: 600, width: "100%" }}>
          <MUIXDataGrid
            columns={columnsISNParticipacionDetalle}
            rows={data}
          />
        </div>
      </Box>

    </Box>

    
  );
};


export default IsnParticipacionDetalle;