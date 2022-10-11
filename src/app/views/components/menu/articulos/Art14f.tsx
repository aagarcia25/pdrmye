import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {GridColDef } from "@mui/x-data-grid";
import {  Moneda } from "../CustomToolbar";
import { getUser } from "../../../../services/localStorage";
import { ArticulosServices } from "../../../../services/ArticulosServices";
import MUIXDataGrid from "../../MUIXDataGrid";
import { Box, ToggleButton, ToggleButtonGroup, Tooltip } from "@mui/material";
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
    { field: "Municipio", headerName: "Municipio", width: 150 , description:"Nombre del Municipio"},
    
    { field: "Facturacion", headerName: "Facturación", width: 150 ,description:"BGt-2",...Moneda},
    { field: "Recaudacion", headerName: "Recaudación", width: 150 ,description:"RPt-1",...Moneda},
    { field: "Proporcion", headerName: "Proporcion De Recaudación", width: 200 ,description:"P=RP/BG" },
    { field: "Ponderado", headerName: "Recaudación Ponderado Por Eficiencia", width: 280 ,description:"ER=P*RP" ,...Moneda},
    { field: "Coeficiente", headerName: "Coeficiente Efectividad Rec Predial", width: 250  ,description:"CER= ER/∑ER"},
    { field: "Poblacion", headerName: "Población", width: 150  ,description:"PO"},
    { field: "EstructuraP", headerName: "Estructura  %", width: 150  ,description:"POi/∑POi"},
    { field: "EstructuraP85", headerName: "85%", width: 150  ,description:"0.85(PO/∑PO)" },
    { field: "Km", headerName: "Territorio (Km2)", width: 150  ,description:"TE"},
    { field: "EstructuraT", headerName: "Estructura %", width: 150  ,description:"TEi/∑TEi "},
    { field: "EstructuraT15", headerName: "15%", width: 150  ,description:"0.15(TE/∑TE)"},
    { field: "Coeficientecpt", headerName: "Coeficiente  Población Y Territorio", width: 250 ,description:"CEPT=0.85(PO/∑PO)+0.15(TE/∑TE)" },
    
    { field: "a", headerName: "Población en Pobreza del Municipio i", width: 300 ,description:"PP2i" },
    { field: "b", headerName: "Población en Pobreza del Municipio i", width: 300  ,description:"PP1i"},
    { field: "c", headerName: "Incidencia de la pobreza en el Municipio i ", width: 300 ,description:"ICPi" },
    { field: "d", headerName: "Carencias promedio en situación de pobreza 2020", width: 350 ,description:"CPP1i" },
    { field: "e", headerName: "Intensidad de la pobreza en el Municipio i", width: 300  ,description:"IPi =CPP1i*ICPi"},
    { field: "f", headerName: "Coeficiente Intensidad de la pobreza en el Municipio i", width: 350 ,description:"IPi/∑IPi" },
    { field: "g", headerName: "Coeficiente Intensidad de la pobreza en el Municipio i 85%", width: 350  ,description:"80% * IPi/∑IPi"},
    { field: "h", headerName: "Eficacia en la disminución de la pobreza del Municipio i", width: 350 ,description:"EPi =PP2i/PP1i" },
    { field: "i", headerName: "Coeficiente de Eficacia en disminución de la pobreza del Municipio i", width: 300  ,description:"EPi/∑EPi"},
    { field: "j", headerName: "15% Coeficiente de Eficacia", width: 200  ,description:"20% EPi/∑EPi"},
    { field: "k", headerName: "Coeficiente  Índice Municipal De Pobreza", width: 300  ,description:"CIMP=0.85(CS2/∑CS2)+0.15(MS/∑MS)"},

    

   
  ];


  const columnsArticulo14f2: GridColDef[] = [
    { field: "id", headerName: "Identificador", width: 150   ,hide: true},
    { field: "ClaveEstado", headerName: "Clave Estado", width: 150 , description:""},
    { field: "Nombre", headerName: "Municipio", width: 150 , description:"Nombre del Municipio"},
    { field: "Poblacion", headerName: "Población", width: 150 ,description:"PO"},
    { field: "Coeficientepoblacion", headerName: "Coeficiente Población", width: 150 ,description:"POi/∑POi "},
    { field: "Proyeccion", headerName: "Proyección de Póblacion", width: 200 ,description:"PC" },
    { field: "Coeficienteproyeccion", headerName: "Coeficiente Proyeccion de Población", width: 280 ,description:"PC/∑PC" },
  ];


  const columnsArticulo14f3: GridColDef[] = [
    { field: "id", headerName: "Identificador", width: 150   ,hide: true},
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
        Number(params.tipo) == 1 ? columnsArticulo14f1 : (Number(params.tipo) == 2 ? columnsArticulo14f2 : ( Number(params.tipo) == 3 ?columnsArticulo14f3 :[])  )
      
      } rows={data} />

      
    </div>
    </Box>
  );
};
