import { GridColDef } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react'
import { Alert } from '../../../../../helpers/Alert';
import { Toast } from '../../../../../helpers/Toast';
import { AuthService } from '../../../../../services/AuthService';
import { messages } from '../../../../styles';
import BotonesAcciones from '../../../componentes/BotonesAcciones';
import MUIXDataGrid from '../../../MUIXDataGrid';
import ButtonsAdd from '../../catalogos/Utilerias/ButtonsAdd';
import PermisosModal from './PermisosModal';

const Permisos = () => {

    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [modo, setModo] = useState("");
    const [tipoOperacion, setTipoOperacion] = useState(0);
    const [vrows, setVrows] = useState({});


    const handleClose = () => {
      setOpen(false);
    };
    const handleAccion = (v: any) => {
      
    }
    const handleOpen = (v: any) => {
      setTipoOperacion(1);
      setModo("Agregar Registro");
      setVrows("");
      setOpen(true);
    };

  

    const handleEditar = (v: any) => {
         setTipoOperacion(2);
         setModo("Editar Registro");
         setVrows(v);
         setOpen(true);
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
               CHUSER: user.id
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
           width: 100,
           renderCell: (v) => {
             return (
               <BotonesAcciones 
                handleAccion={handleAccion}
                row={undefined}
                editar={false}
                eliminar={false}              
                 />
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

{open ? (
      <PermisosModal
        open={open}
        modo={modo}
        tipo={tipoOperacion}
        handleClose={handleClose}
        dt={vrows}
      />
    ) : (
      ""
    )}
<ButtonsAdd handleOpen={handleOpen} agregar={false} />
       <MUIXDataGrid
              columns={columns}
              rows={data}
            />
    </div>
  )
}

export default Permisos
