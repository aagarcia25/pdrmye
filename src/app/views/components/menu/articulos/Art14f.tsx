import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {GridColDef } from "@mui/x-data-grid";
import {  Moneda } from "../CustomToolbar";
import { getUser } from "../../../../services/localStorage";
import { ArticulosServices } from "../../../../services/ArticulosServices";
import MUIXDataGrid from "../../MUIXDataGrid";
import { Box, Grid, ToggleButton, ToggleButtonGroup, Tooltip, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Slider from "../../Slider";


export const Art14f = () => {
  const navigate = useNavigate();
  const [slideropen, setslideropen] = useState(false);
  const user = getUser();
  const [data, setData] = useState([]);
  const [tipo, setTipo] = useState<Number>(0);

  let columns:GridColDef[]=[];

  const handleBack = (v: any) => {
    navigate(`/inicio/articulos/art14f/${tipo}`);
  };



  const columnsArticulo14f1: GridColDef[] = [
    { field: "id", headerName: "Identificador", width: 150   ,hide: true},
    { field: "ClaveEstado", headerName: "Clave Estado", width: 150 , description:"Clave del Estado"},
    { field: "Nombre", headerName: "Municipio", width: 150 , description:"Nombre del Municipio"},
    { field: "Facturacion1", headerName: "Facturación", width: 150 ,description:"BGt-2",...Moneda},
    { field: "Recaudacion1", headerName: "Recaudación", width: 150 ,description:"RPt-1",...Moneda},
    { field: "ProporcionRecaudacion", headerName: "Proporcion De Recaudación", width: 200 ,description:"P=RP/BG" },
    { field: "RecaudacionPonderada", headerName: "Recaudación Ponderado Por Eficiencia", width: 280 ,description:"ER=P*RP" ,...Moneda},
    { field: "CoeficienteEfectividadReca", headerName: "Coeficiente Efectividad Rec Predial", width: 250  ,description:"CER= ER/∑ER"},
    { field: "Poblacion", headerName: "Población", width: 150  ,description:"PO"},
    { field: "EstructuraPoblacion1", headerName: "Estructura  %", width: 150  ,description:"POi/∑POi"},
    { field: "EstructuraPoblacion2", headerName: "85%", width: 150  ,description:"0.85(PO/∑PO)" },
    { field: "Territorio", headerName: "Territorio (Km2)", width: 150  ,description:"TE"},
    { field: "EstructuraTerritorio1", headerName: "Estructura %", width: 150  ,description:"TEi/∑TEi "},
    { field: "EstructuraTerritorio2", headerName: "15%", width: 150  ,description:"0.15(TE/∑TE)"},
    { field: "CoeficienteTerritorio", headerName: "Coeficiente  Población Y Territorio", width: 250 ,description:"CEPT=0.85(PO/∑PO)+0.15(TE/∑TE)" },
    { field: "Pobreza1", headerName: "Personas en Pobreza", width: 300 ,description:"PP2i" },
    { field: "Pobreza2", headerName: "Personas en Pobreza", width: 300  ,description:"PP1i"},
    { field: "Carencia1", headerName: "Carencias promedio en situación de pobreza", width: 350 ,description:"CPP1i" },
    { field: "Incidencia", headerName: "Incidencia de la Pobreza", width: 300  ,description:"ICPi=(PP1i/∑PP1i)"},
    { field: "Intensidad", headerName: "Intensidad de la Pobreza", width: 350 ,description:"IP=(ICPi*CPP!i)" },
    { field: "ProporcionIntensidad", headerName: "Proporción de Intensidad de la Pobreza", width: 350  ,description:"IP/∑IP"},
    { field: "DisPobreza", headerName: "Distribución del 85% por Pobreza", width: 350 ,description:"(0.85*IP/∑IP)(Monto)" },
    { field: "MejoraPobreza", headerName: "Mejora en Pobreza Municipal", width: 300  ,description:"EP=PP2i/PP1i"},
    { field: "ProporcionPobreza", headerName: "Proporción de la Eficacia en Pobreza", width: 200  ,description:"EP/∑EP"},
    { field: "DisEficacia", headerName: "Distribución del 15 % por Eficacia de Pobreza", width: 300  ,description:"(0.15*(EP/∑EP)(Monto)"},
    { field: "DisPobreza15", headerName: "Distribución por Indice de Pobreza", width: 300  ,description:"DIPi"},
    { field: "CoeficientePobreza", headerName: "Coeficiente  Índice Municipal De Pobreza", width: 300  ,description:"CDPEi"},
    { field: "A1_1", headerName: "Distribución por Efectividad Recaudacion Predial", width: 300  ,description:"CER*50%"},
    { field: "A1_2", headerName: "Distribución por Poblacion y Territorio", width: 300  ,description:"CEPT*25%"},
    { field: "A1_3", headerName: "Distribución por Índice de Pobreza", width: 300  ,description:"CIMP*25%"},
    { field: "A1_4", headerName: "Monto OBS + Estim. de Participaciones", width: 300  ,description:"MAE1=(CEPT*25%)+(CIMP*25%)+(CER*50%)"},
    { field: "A1_5_COF", headerName: "Coeficiente de Participación", width: 300  ,description:"CEP= MAE1/∑MAE1"},


   
  ];


  const columnsArticulo14f2: GridColDef[] = [
    { field: "id", headerName: "Identificador", width: 150   ,hide: true},
    { field: "ClaveEstado", headerName: "Clave Estado", width: 150 , description:"Clave del Estado"},
    { field: "Nombre", headerName: "Municipio", width: 150 , description:"Nombre del Municipio"},
    { field: "Poblacion", headerName: "Población", width: 150 ,description:"PO"},
    { field: "Coeficientepoblacion", headerName: "Coeficiente Población", width: 150 ,description:"POi/∑POi "},
    { field: "Proyeccion", headerName: "Proyección de Póblacion", width: 200 ,description:"PC" },
    { field: "Coeficienteproyeccion", headerName: "Coeficiente Proyeccion de Población", width: 280 ,description:"PC/∑PC" },

    { field: "A2_1",     headerName: "Coeficiente de Participación", width: 280 ,description:"CEP= MAE1/∑MAE1" },
    { field: "A2_2",     headerName: "Distribución por Población", width: 280 ,description:"PO*35%" },
    { field: "A2_3",     headerName: "Distribución por Proyección de Población", width: 280 ,description:"PC*35%" },
    { field: "A2_4",     headerName: "Distribución por Coeficiente", width: 280 ,description:"CEP*30%" },
    { field: "A2_5",     headerName: "Monto Observado", width: 280 ,description:"MAE2=(PI*35%)+(PC*35%)+(CD*30%)" },
    { field: "A2_6_COF", headerName: "Coeficiente de Participación", width: 280 ,description:"CEG=MAE2/∑MAE2" },






  ];


  const columnsArticulo14f3: GridColDef[] = [
    { field: "id", headerName: "Identificador", width: 150   ,hide: true},
    { field: "ClaveEstado", headerName: "Clave Estado", width: 150 , description:"Clave del Estado"},
    { field: "Nombre", headerName: "Municipio", width: 150 , description:"Nombre del Municipio"},
    { field: "Facturacion1", headerName: "Facturación", width: 150 ,description:"BGt-1"},
    { field: "Recaudacion1", headerName: "Recaudación (Ri,t-1)", width: 150 ,description:"Ri,t-1 "},
    { field: "EficienciaRecaudatoria", headerName: "Eficiencia Recaudatoria", width: 300 ,description:"ERt-1 = Ri,t-1 / BGi,t-1" },
    { field: "CoeficienteEficienciaRecaudatoria", headerName: "Coeficiente Eficiencia Recaudatoria", width: 300 ,description:"CERi,t = ERi,t-1 /∑ERi,t-1" },
    { field: "Recaudacion2", headerName: "Recaudación (Ri,t-2)", width: 300 ,description:"Ri,t-2"},
    { field: "Tasa1", headerName: "Tasa de Crecimiento", width: 300 ,description:"CRi,t=(Ri,t-1/Ri,t-2)- 1 "},
    { field: "Tasa2", headerName: "Tasa>0", width: 150 ,description:" "},
    { field: "CoeficienteCrecimientoRecaudacion", headerName: "Coeficiente Crecimiento Recaudación", width: 300 ,description:"CCRi,t=CRi,t /∑CRi,t"},
    { field: "CoeficienteimpuestoPredial", headerName: "Coeficiente por Monto de Recaudación Impuesto Predial", width: 300 ,description:"REi,t = Ri,t-1 /∑Ri,t-1"},
    { field: "A1_1", headerName: "Distribución por Eficiencia en la Recaudación", width: 300 ,description:"50%"},
    { field: "A1_2", headerName: "Distribución Crecimiento Recaudación", width: 300 ,description:"30%"},
    { field: "A1_3", headerName: "Distribución por Recaudación", width: 300 ,description:"20%"},
    { field: "A1_4", headerName: "Estimacion 30%", width: 300 ,description:"50%*CERi,t+20%*REi,t+30%*CCRi,t"},
    { field: "A1_5_COF", headerName: "Coeficiente de Participación", width: 300 ,description:""},



  ];


  const loaddata = (tipo : Number , idc: string) => {
    setslideropen(true);
    let data = {
      NUMOPERACION: 4,
      ID:idc
    };
    setTipo(tipo);
    ArticulosServices.articulof1(data).then((res) => {
      setData(res.RESPONSE);
      setslideropen(false);
    });

  };


  let params = useParams();
  useEffect(() => {
    loaddata(Number(params.tipo),String(params.id));
  }, [params.tipo,params.id]);



  return (
    
    <Box sx={{}}>
       <Slider open={slideropen} ></Slider>

       <Grid container >
            <Grid item sm={12} sx={{ display: "flex", alignItems: "center", justifyContent: "center", }}>
              <Typography variant='h3'>
                {tipo == 1
                  ? "Articulo 14 F I"
                  : tipo === 2
                    ? "Articulo 14 F II"
                    : tipo === 3
                      ? "Articulo 14 F III"
                      : ""}
              </Typography>
            </Grid>
          </Grid>
    <Box sx={{}}>
    <ToggleButtonGroup color="primary" exclusive aria-label="Platform">
      <Tooltip title="Regresar">
        <ToggleButton value="check" onClick={() => handleBack(1)}>
          <ArrowBackIcon />
        </ToggleButton>
      </Tooltip>
    </ToggleButtonGroup>
  </Box>
    <div style={{ height: 600, width: "100%" }}>
       <MUIXDataGrid columns={
        Number(params.tipo) === 1 ? columnsArticulo14f1 : (Number(params.tipo) === 2 ? columnsArticulo14f2 : ( Number(params.tipo) === 3 ?columnsArticulo14f3 :[])  )
      
      } rows={data} />

      
    </div>
    </Box>
  );
};
