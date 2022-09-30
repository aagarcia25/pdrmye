import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

import { Box } from '@mui/material'
import { Moneda } from '../../CustomToolbar'
import { Toast } from "../../../../../helpers/Toast";
import { Alert } from "../../../../../helpers/Alert";
import { calculosServices } from '../../../../../services/calculosServices'
import ButtonsBack from "../../catalogos/Utilerias/ButtonsBack";
import MUIXDataGrid from '../../../MUIXDataGrid'



const DetalleFgp = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    
    const handleBack = (v: any) => {
      navigate(`/inicio/participaciones/fpg`)
    };
    
    const consulta = (data: any) => {
        calculosServices.calculosInfodetalle(data).then((res) => {
          if (res.SUCCESS) {
            Toast.fire({
              icon: "success",
              title: "Consulta Exitosa!",
            });
            setData(res.RESPONSE);
          } else {
            Alert.fire({
              title: "Error!",
              text: res.STRMESSAGE,
              icon: "error",
            });
          }
        });
      };
         
    const columns= [
      { field: "id", headerName: "Identificador", width: 150   ,hide: true},
      { field: "ClaveEstado", headerName: "Clave Estado", width: 150 , description:"Identificador del Municipio"},
      { field: "Nombre", headerName: "Municipio", width: 150 , description:"Nombre del Municipio"},
      { field: "Mensual", headerName: "Importe", width: 150 ,description:"Importe" ,...Moneda},
      { field: "PrimerAjuste", headerName: "Primer Ajuste", width: 150 ,description:"Importe" ,...Moneda},
      { field: "SegundoAjuste", headerName: "Segundo Ajuste", width: 150 ,description:"Importe" ,...Moneda},
      { field: "TercerAjuste", headerName: "Tercer Ajuste", width: 150 ,description:"Importe" ,...Moneda},
      { field: "CuartoAjuste", headerName: "Cuarto Ajuste", width: 150 ,description:"Importe" ,...Moneda},
      { field: "AjusteAnual", headerName: "Ajuste Anual", width: 150 ,description:"Importe" ,...Moneda},
      { field: "AjusteSemestral", headerName: "Ajuste Semestral", width: 150 ,description:"Importe" ,...Moneda},
      { field: "AjusteDefinitivo", headerName: "Ajuste Definitivo", width: 150 ,description:"Importe" ,...Moneda},
      { field: "CompensacionFEIF", headerName: "Compensación FEIF", width: 150 ,description:"Compensación FEIF",...Moneda},
      { field: "RetencionFEIF", headerName: "Retención FEIF", width: 150 ,description:"Retención FEIF",...Moneda},
      { field: "total", headerName: "Total", width: 150 ,description:"Total",...Moneda},
      ];
    
      let params = useParams();
      useEffect(() => {
        consulta({IDCALCULOTOTAL: params.id})
      }, []);



  return (
    <div>
      <Box >
           <ButtonsBack handleOpen={handleBack} />
           <MUIXDataGrid columns={columns} rows={data} />
      </Box>
     
    </div>
  )
}

export default DetalleFgp
