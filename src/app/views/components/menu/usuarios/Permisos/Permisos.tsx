import { GridColDef } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react'
import { Alert } from '../../../../../helpers/Alert';
import { Toast } from '../../../../../helpers/Toast';
import { AuthService } from '../../../../../services/AuthService';
import { messages } from '../../../../styles';
import AccionesGrid from '../../../AccionesGrid';
import MUIXDataGrid from '../../../MUIXDataGrid';

const Permisos = () => {

    const [data, setData] = useState([]);



    const handleEdit = (v: any) => {
        /* setTipoOperacion(2);
         setModo("Editar Registro");
         setOpen(true);
         setData(v);*/
       };
     
      
       const handleDelete = (v: any) => {
       /*  Swal.fire({
           icon: "info",
           title: "Estas seguro de eliminar este registro?",
           showDenyButton: true,
           showCancelButton: false,
           confirmButtonText: "Confirmar",
           denyButtonText: `Cancelar`,
         }).then((result) => {
           if (result.isConfirmed) {
             console.log(v);
     
             let data = {
               NUMOPERACION: 3,
               CHID: v.row.id,
               CHUSER: 1,
             };
             console.log(data);
     
             CatalogosServices.munfacturacion(data).then((res) => {
               if (res.SUCCESS) {
                 Toast.fire({
                   icon: "success",
                   title: "Registro Eliminado!",
                 });
     
                 let data = {
                   NUMOPERACION: 4,
                   ANIO: filterAnio,
                 };
                 consulta(data);
     
               } else {
                 Alert.fire({
                   title: "Error!",
                   text: res.STRMESSAGE,
                   icon: "error",
                 });
               }
             });
     
           } else if (result.isDenied) {
             Swal.fire("No se realizaron cambios", "", "info");
           }
         });*/
       };
 
 
     const columns: GridColDef[] = [
         {
           field: "id",
           headerName: "Identificador",
           hide: true,
           width: 150,
           description: messages.dataTableColum.id,
         },
         {
           field: "Permiso",
           headerName: "Permiso",
           width: 150,
         },
         { field: "Descripcion", headerName: "Descripcion", width: 150 },
        
         {
           field: "acciones",
           headerName: "Acciones",
           description: "Campo de Acciones",
           sortable: false,
           width: 200,
           renderCell: (v) => {
             return (
               <AccionesGrid handleEditar={handleEdit} handleBorrar={handleDelete} v={v} update={false} pdelete={false} />
             );
           },
         },
       ];


    
 const consulta = (data: any) => {
    AuthService.permisosindex(data).then((res) => {
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


  useEffect(() => {
    consulta({NUMOPERACION:4});
  }, []);
  return (
    <div>
       <MUIXDataGrid
              columns={columns}
              rows={data}
            />
    </div>
  )
}

export default Permisos
