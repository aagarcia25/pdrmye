import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {GridColDef } from "@mui/x-data-grid";
import {  Moneda } from "../CustomToolbar";
import { getUser } from "../../../../services/localStorage";
import { ArticulosServices } from "../../../../services/ArticulosServices";
import MUIXDataGrid from "../../MUIXDataGrid";
import { Box, ToggleButton, ToggleButtonGroup, Tooltip } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";


export const Art14f = () => {
  const navigate = useNavigate();
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
    { field: "Municipio", headerName: "Municipio", width: 150 , description:"Nombre del Municipio"},
    { field: "a", headerName: "Poblacion", width: 150 ,description:"PO"},
    { field: "b", headerName: "Coeficiente Población", width: 150 ,description:"POi/∑POi "},
    { field: "c", headerName: "Proyección de Póblacion", width: 200 ,description:"PC" },
    { field: "d", headerName: "Coeficiente Proyeccion de Población", width: 280 ,description:"PC/∑PC" },
  ];


  const columnsArticulo14f3: GridColDef[] = [
    { field: "id", headerName: "Identificador", width: 150   ,hide: true},
    { field: "Municipio", headerName: "Municipio", width: 150 , description:"Nombre del Municipio"},
    
    
    { field: "a", headerName: "Facturación", width: 150 ,description:"PO"},
    { field: "b", headerName: "Recaudación", width: 150 ,description:"POi/∑POi "},
    { field: "c", headerName: "Eficiencia Recaudatoria", width: 200 ,description:"PC" },
    { field: "d", headerName: "Coeficiente Eficiencia Recaudatoria", width: 280 ,description:"PC/∑PC" },

    { field: "b", headerName: "Recaudación", width: 150 ,description:"POi/∑POi "},
    { field: "b", headerName: "Recaudación", width: 150 ,description:"POi/∑POi "},
    { field: "b", headerName: "Recaudación", width: 150 ,description:"POi/∑POi "},
    { field: "b", headerName: "Recaudación", width: 150 ,description:"POi/∑POi "},
    { field: "b", headerName: "Recaudación", width: 150 ,description:"POi/∑POi "},




  ];


  const loaddata = (tipo : Number) => {
    let data = {
      NUMOPERACION: 4,
      TIPO:tipo
    };
    setTipo(tipo);
    ArticulosServices.articulof1(data).then((res) => {
      setData(res.RESPONSE);
    });

  };


  let params = useParams();
  useEffect(() => {
    console.log(params.tipo)
    loaddata(Number(params.tipo));

  }, [params.tipo]);

  return (
    
    <Box sx={{}}>
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
