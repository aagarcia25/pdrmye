import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {GridColDef } from "@mui/x-data-grid";
import {  Moneda } from "../CustomToolbar";
import { getUser } from "../../../../services/localStorage";
import { ArticulosServices } from "../../../../services/ArticulosServices";
import MUIXDataGrid from "../../MUIXDataGrid";
import { Box, IconButton, Tooltip } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";


export const Art14fP = () => {
    const navigate = useNavigate();
    const user = getUser();
    const [data, setData] = useState([]);
    const [tipo, setTipo] = useState<Number>(0);

    const handleView = (v: any) => {
        navigate(`/inicio/articulos/art14d/${tipo}`);
      };


    const columns: GridColDef[] = [
      { field: "id", headerName: "Identificador", width: 150   ,hide: true},
      { field: "Municipio", headerName: "Fecha de Creación", width: 150 },
      { field: "Municipio", headerName: "Versión", width: 150 },
      { field: "a", headerName: "Articulo", width: 150 },
      { field: "b", headerName: "Activo", width: 150 ,},
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
      loaddata(Number(params.tipo));
    }, [params.tipo]);
  
    return (
      
      <div style={{ height: 600, width: "100%" }}>
         <MUIXDataGrid columns={columns} rows={data} />
      </div>
    );
  };
  

export default Art14fP
