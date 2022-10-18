import { Box } from '@mui/system';
import { GridColDef } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react'
import { Alert } from '../../../../../helpers/Alert';
import { Toast } from '../../../../../helpers/Toast';
import { CatalogosServices } from '../../../../../services/organismosServices';
import AccionesGrid from '../../../AccionesGrid';
import MUIXDataGrid from '../../../MUIXDataGrid'

const CFuenteFinanciamiento = () => {
  
    const [id,              setId] = useState("");
    const [data,            setData] = useState([]);
    const [open,            setOpen] = useState(false);
    const [modo,            setModo] = useState("");
    const [tipoOperacion,   setTipoOperacion] = useState(0);
    const [vrows,           setVrows] = useState({});

    const handleEditar = (v: any) => {
        setTipoOperacion(2);
        setModo("Editar Registro");
        setVrows(v);
        setOpen(true);
      };

    const handleBorrar = (v: any) => {
        setTipoOperacion(2);
        setModo("Editar Registro");
        setVrows(v);
        setOpen(true);
      };


      const consulta = (data: any) => {
        CatalogosServices.Class_FFIndex(data).then((res) => {
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

    const columns: GridColDef[] = [
        { field: "id", headerName: "Identificador", width: 150   , hide:true },
        { field: "Tipo", headerName: "Tipo", width: 100 },
        { field: "Descripcion", headerName: "Descripcion", width: 550 },
        {
          field: "acciones",
          headerName: "Acciones",
          description: "Campo de Acciones",
          sortable: false,
          width: 200,
          renderCell: (v: any) => {
            return (
             <AccionesGrid handleEditar={handleEditar} handleBorrar={handleBorrar} v={v} update={true} pdelete={true}/>
            );
          },
        },
       
      ];
    
    
      
      useEffect(() => {
        consulta({ NUMOPERACION: 4 });
      }, []);
    
    
    return (
    <div>
        <Box sx={{margin:2}}>Catálogo de Fuentes de Financiamiento</Box>
       <MUIXDataGrid
              columns={columns}
              rows={data}
            />
    </div>
  )




}

export default CFuenteFinanciamiento
