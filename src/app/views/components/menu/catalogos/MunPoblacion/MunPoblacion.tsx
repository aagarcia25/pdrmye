import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import { getPermisos, getUser } from '../../../../../services/localStorage'
import { CatalogosServices } from '../../../../../services/catalogosServices'
import { messages } from '../../../../styles'
import Swal from 'sweetalert2'
import { Toast } from '../../../../../helpers/Toast'
import { Alert } from "../../../../../helpers/Alert";
import Slider from "../../../Slider";
import MunPoblacionModal from './MunPoblacionModal'
import MUIXDataGrid from '../../../MUIXDataGrid'
import { PERMISO, RESPONSE} from '../../../../../interfaces/user/UserInfo'
import SelectFrag from '../../../Fragmentos/Select/SelectFrag'
import { fanios } from "../../../../../share/loadAnios";
import SelectValues from "../../../../../interfaces/Select/SelectValues";
import ButtonsMunicipio from '../Utilerias/ButtonsMunicipio'
import AccionesGrid from '../Utilerias/AccionesGrid'
import BotonesAcciones from '../../../componentes/BotonesAcciones'

<<<<<<< Updated upstream


export const MunPoblacion = () => {

  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const user: RESPONSE = JSON.parse(String(getUser()));
  

  const [update, setUpdate] = useState(false);
  const [open, setOpen] = useState(false);
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [data, setData] = useState({});
  const [Poblacion, setPoblacion] = useState([]);
  const [plantilla, setPlantilla] = useState("");
  const [slideropen, setslideropen] = useState(false);
  const [anios, setAnios] = useState<SelectValues[]>([]);
  const [editar, setEditar] = useState<boolean>(false);
  const [eliminar, setEliminar] = useState<boolean>(false);
  const [modo, setModo] = useState("");


  // VARIABLES PARA LOS FILTROS
  const [filterAnio, setFilterAnio] = useState("");
  //funciones


  const columns: GridColDef[] = [
    { field: "id", headerName: "Identificador", width: 150, hide: true, description: messages.dataTableColum.id },
    {
      field: "idmunicipio",
      headerName: "idmunicipio",
      hide: true,
      width: 150,
    },
    { field: "ClaveEstado", headerName: "Clave Estado", width: 100 },
    { field: "Nombre", headerName: "Municipio", width: 150 },
    { field: "Anio", headerName: "Año", width: 150 },
    { field: "totalPob", headerName: "Total Población", width: 150 },

    {
      field: "acciones",
      headerName: "Acciones",
      description: "Campo de Acciones",
      sortable: false,
      width: 200,
      renderCell: (v: any) => {
        return (
          <BotonesAcciones handleAccion={handleAccion} row={v} editar={editar} eliminar={eliminar}></BotonesAcciones>
          );
      },
    },

  ];

  const handleAccion = (v: any) => {
    if(v.tipo ==1){
      setTipoOperacion(2);
      setModo("Editar");
      setOpen(true);
      setData(v.data);
    }else if(v.tipo ==2){
      handleBorrar(v.data);
    }
  }
  

  const handleClose = (v: string) => {
    console.log('cerrando');
    if (v === "cerrar") {
      setOpen(false);
    }
    else {
      let data = {
        NUMOPERACION: 4,
        ANIO: filterAnio,
      };
      consulta(data);
      setOpen(false);


    }

  };

  const handleOpen = (v: any) => {
    setTipoOperacion(1);
    setModo("Agregar Registro");
    setOpen(false);
    setData("");
  };



  const handleBorrar = (v: any) => {

    Swal.fire({
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


        CatalogosServices.munpoblacion(data).then((res) => {
          if (res.SUCCESS) {
            Toast.fire({
              icon: "success",
              title: "Registro Eliminado!",
            });


          } else {
            Alert.fire({
              title: "Error!",
              text: res.STRMESSAGE,
              icon: "error",
            });
          }
        });

        let dat = {
          NUMOPERACION: 4,
          ANIO: filterAnio,
        };
        consulta(dat);

      } else if (result.isDenied) {
        Swal.fire("No se realizaron cambios", "", "info");
      }


    });

  };



  const handleAgregar = (event: React.ChangeEvent<HTMLInputElement>) => {
    setslideropen(true);
    let file = event?.target?.files?.[0] || "";
    const formData = new FormData();
    formData.append("inputfile", file, "inputfile.xlxs");
    formData.append("tipo", "MunPoblacion");
    CatalogosServices.migraData(formData).then((res) => {
      setslideropen(false);
    });
  };


  const consulta = (data: any) => {
    CatalogosServices.munpoblacion(data).then((res) => {

      console.log('respuesta' + res.RESPONSE + res.NUMCODE);



      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Consulta Exitosa!",
        });

        setPoblacion(res.RESPONSE);
        console.log('respuesta' + setPoblacion);
      } else {
        Alert.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };



  const handleFilterChange = (v:string) => {
    setFilterAnio(v);

    let data = {
      NUMOPERACION: 4,
      ANIO: v,
    };
    if (v != "") {
    consulta(data);
    }
  };

  const downloadplantilla = () => {
    let data = {
      NUMOPERACION: "MUNICIPIO_POBLACION",
    };

    CatalogosServices.descargaplantilla(data).then((res) => {
      setPlantilla(res.RESPONSE);
    });
  };

  useEffect(() => {
    downloadplantilla();
    setAnios(fanios());
    permisos.map((item: PERMISO) => {
      console.log(item.ControlInterno + ' --' + String(item.Referencia));

      if (item.ControlInterno == "MUNPOB") {
        if (String(item.Referencia) == 'Editar') {
          setUpdate(true);
        }
        if (String(item.Referencia) == 'Eliminar') {
          setEliminar(true);
        }

      }
    });
  }, []);




  return (

    <div style={{ height: 600, width: "100%" }}>
      <Slider open={slideropen}></Slider>

      <Box  
         sx={{ display: 'flex', flexDirection: 'row-reverse',}}>
          <SelectFrag 
          options={anios}
          onInputChange={handleFilterChange}
          placeholder={"Seleccione Año"} label={''} disabled={false} 
          value={filterAnio}/>
            </Box>

      

      {open ? (
        <MunPoblacionModal
          open={open}
          modo={modo}
          handleClose={handleClose}
          tipo={tipoOperacion}
          dt={data}
        />
      ) : (
        ""
      )}
      <ButtonsMunicipio
        url={plantilla}
        handleUpload={handleAgregar} controlInterno={"MUNPO"}      />

      <MUIXDataGrid
        columns={columns}
        rows={Poblacion}
      />

    </div>


  )
}

=======
     import React, { useEffect, useState } from 'react'
     import { Box, Button, Dialog, DialogActions, 
       DialogContent, DialogContentText, DialogTitle, IconButton, 
       Input, LinearProgress, Modal, SelectChangeEvent, TextField, Typography } from '@mui/material'
     import { DataGrid, esES, GridColDef } from '@mui/x-data-grid'
     import { CustomNoRowsOverlay } from '../../CustomNoRowsOverlay'
     import { CustomToolbar } from '../../CustomToolbar'
     import { getUser } from '../../../../../services/localStorage'
     import { CatalogosServices } from '../../../../../services/catalogosServices'
     import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
     import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
     import AddIcon from '@mui/icons-material/Add';
     import { messages } from '../../../../styles'
     import Swal from 'sweetalert2'
     import { Toast } from '../../../../../helpers/Toast'
     import { Alert } from "../../../../../helpers/Alert";
     import Filtros from '../Utilerias/Filtros'
     import Slider from "../../../Slider";
     import MunFacturacionModal from '../MunFacturacion/MunFacturacionModal'
     import Buttons from '../Utilerias/Buttons'
     import MunPoblacionModal from './MunPoblacionModal'
     
     
     
     export const MunPoblacion = () => {
     
       const user = getUser();
       const [modo, setModo] = useState("");
       const [open, setOpen] = useState(false);
       const [tipoOperacion, setTipoOperacion] = useState(0);
       const [data, setData] = useState({});
       const [Poblacion, setPoblacion] = useState([]);
       const [plantilla, setPlantilla] = useState("");
       const [slideropen, setslideropen] = useState(false);
       // VARIABLES PARA LOS FILTROS
       const [filterAnio, setFilterAnio] = useState("");
       //funciones
       const handleFilterMes = () => {};
     
     
       
       
       const columns: GridColDef[] = [
         { field: "id", headerName: "Identificador", width: 150   , hide:true , description:messages.dataTableColum.id},
         { field: "Nombre", headerName: "Municipio", width: 150 },
         { field: "Anio", headerName: "Año", width: 150 },
         { field: "totalPob", headerName: "Total Población", width: 150 },
         {
           field: "acciones",
           headerName: "Acciones",
           description: "Campo de Acciones",
           sortable: false,
           width: 200,
           renderCell: (v) => {
             return (
               <Box>
                 <IconButton onClick={() => handleEditar(v)}>
                   
                   <ModeEditOutlineIcon />
                 </IconButton>
                 <IconButton onClick={() => handleBorrar(v)}>
                   <DeleteForeverIcon />
                 </IconButton>
               </Box>
             );
           },
         },
        
       ];
     
       
       const handleClose = () => {
       
       setOpen(false);
     }
     
     
     const handleOpen = (v: any) => {
       setTipoOperacion(1);
       setModo("Agregar Registro");
       setOpen(true);
       setData("");
     };
     
     
     
       const handleEditar = (v:any) => { 
     
     
       console.log(v)
       setTipoOperacion(2);
       setModo("Editar Registro");
       setOpen(true);
       setData(v);
       };
     
       const handleBorrar = (v:any) => {
     
         Swal.fire({
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
     
             CatalogosServices.munpoblacion(data).then((res) => {
               if (res.SUCCESS) {
                 Toast.fire({
                   icon: "success",
                   title: "Registro Eliminado!",
                 });
     
     
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
     
           
         });
       };
       
     
     
       const handleAgregar =(event: React.ChangeEvent<HTMLInputElement>) => {
         setslideropen(true);
         let file = event?.target?.files?.[0] || "";
         const formData = new FormData();
         formData.append("inputfile", file, "inputfile.xlsx");
         formData.append("tipo", "MunPoblacion");
         CatalogosServices.migraData(formData).then((res) => {
           setslideropen(false);
         });
       };
     
     
       const consulta = (data: any) => {
         CatalogosServices.munpoblacion(data).then((res) => {
     
           console.log('respuesta'+res.RESPONSE );
     
     
     
           if (res.SUCCESS) {
             Toast.fire({
               icon: "success",
               title: "Consulta Exitosa!",
             });
        
             setPoblacion(res.RESPONSE); 
                 console.log('respuesta'+setPoblacion);
           } else {
             Alert.fire({
               title: "Error!",
               text: res.STRMESSAGE,
               icon: "error",
             });
           }
         });
       };
     
     
     
       const handleFilterChange = (event: SelectChangeEvent) => {
         //setFilterAnio(event.target.value);
         
         let data = {
          NUMOPERACION: 4,
          NUMANIO: event.target.value,
           
         };
    
          
         consulta(data);
       };
     
       const downloadplantilla = () => {
         let data = {
           NUMOPERACION: "MUNICIPIO_POBLACION",
         };
     
         CatalogosServices.descargaplantilla(data).then((res) => {
           setPlantilla(res.RESPONSE);
         });
       };
     
       useEffect(() => {
         downloadplantilla();
       }, []);
     
     
     
     
       return (
     
     
         <div style={{ height: 600, width: "100%" }}>
           <Slider open={slideropen}></Slider>
     
           <Filtros
             anioApply={true}
             mesApply={false}
             handleFilterChangeAnio={handleFilterChange}
             handleFilterChangeMes={handleFilterMes}
             valueFilterAnio={filterAnio}
             valueFilterMes={""}
           />
     
           {open ? (
             <MunPoblacionModal
               open={open}
               modo={modo}
               handleClose={handleClose}
               tipo={tipoOperacion}
               dt={data}
             />
           ) : (
             ""
           )}
     
           <Buttons
             handleOpen={handleOpen}
             url={plantilla}
             handleUpload={handleAgregar}
           />
     
           <DataGrid
             //checkboxSelection
             pagination
             localeText={esES.components.MuiDataGrid.defaultProps.localeText}
             components={{
               Toolbar: CustomToolbar,
               LoadingOverlay: LinearProgress,
               NoRowsOverlay: CustomNoRowsOverlay,
             }}
             rowsPerPageOptions={[5, 10, 20, 50, 100]}
             rows={Poblacion}
             columns={columns}
     
             // loading //agregar validacion cuando se esten cargando los registros
           />
         </div>
     
       
       )
     }
     
     
>>>>>>> Stashed changes
