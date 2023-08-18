
import { Grid, Tooltip, Typography } from '@mui/material'
import { GridColDef, GridSelectionModel } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { AlertS } from "../../../../../helpers/AlertS"
import { Toast } from '../../../../../helpers/Toast'
import SelectValues from "../../../../../interfaces/Select/SelectValues"
import { PERMISO, USUARIORESPONSE } from '../../../../../interfaces/user/UserInfo'
import { CatalogosServices } from '../../../../../services/catalogosServices'
import { getPermisos, getUser } from '../../../../../services/localStorage'
import { fanios } from "../../../../../share/loadAnios"
import { messages } from '../../../../styles'
import MUIXDataGridMun from '../../../MUIXDataGridMun'
import Slider from "../../../Slider"
import BotonesAcciones from '../../../componentes/BotonesAcciones'
import { Moneda } from '../../CustomToolbar'
import ButtonsMunicipio from '../../catalogos/Utilerias/ButtonsMunicipio'


const IsnRecaudacion = () => {
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const user: USUARIORESPONSE= JSON.parse(String(getUser()));
  const [update, setUpdate] = useState(false);
  const [open, setOpen] = useState(false);
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [data, setData] = useState([]);
  const [plantilla, setPlantilla] = useState("");
  const [slideropen, setslideropen] = useState(false);
  const [anios, setAnios] = useState<SelectValues[]>([]);
  const [editar, setEditar] = useState<boolean>(false);
  const [eliminar, setEliminar] = useState<boolean>(false);
  const [modo, setModo] = useState("");
  const [nombreMenu, setNombreMenu] = useState("");
  const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([]);


  // VARIABLES PARA LOS FILTROS
  const [filterAnio, setFilterAnio] = useState("");
  //funciones

  const handleFilterChange = (v: string) => {
    setFilterAnio(v);
    // console.log(v);
    if(v==="false"){
      consulta(4,"");
    } else {
      consulta(4,v);
    }
    
  };


  const columns: GridColDef[] = [
    { field: "id", headerName: "Identificador", width: 150, hide: true, description: messages.dataTableColum.id },
    {
      field: "idmunicipio",
      headerName: "idmunicipio",
      hide: true,
      width: 150,
    },
    { disableExport: true,
      field: "acciones",
      headerName: "Acciones",
      description: "Campo de Acciones",
      sortable: false,
      width: 100,
      renderCell: (v) => {
        return (
          <BotonesAcciones handleAccion={handleAccion} row={v} editar={update} eliminar={eliminar}></BotonesAcciones>

        );
      },
    },
    { field: "FechaCreacion", headerName: "Fecha Creación", description: "Fecha Creación",width: 180 },
    { field: "ClaveEstado", headerName: "Clave Estado", description: "Clave Estado",width: 100 },
    { field: "Nombre", headerName: "Municipio", description: "Municipio",width: 150 },
    { field: "Anio", headerName: "Año", description: "Año",width: 150 },
    { field: "Importe", headerName: "Importe", description: "Importe",width: 150, ...Moneda },
    { field: "Coeficiente", headerName: "Coeficiente", description: "Coeficiente",width: 250 },
  ];

  const handleAccion = (v: any) => {
    if (v.tipo === 1) {
      setTipoOperacion(2);
      setModo("Editar");
      setOpen(true);
    } else if (v.tipo === 2) {
      handleDelete(v.data);
    }
  }
  const handleClose = (v: string) => {
    setOpen(false);
    consulta(4,v);

  };
  const handleBorrar = (v: any) => {
    setSelectionModel(v);
  };
  const handleOpen = (v: any) => {
    setTipoOperacion(1);
    setModo("Agregar Registro");
    setOpen(false);

  };
  const handleDelete = (v: any) => {
    Swal.fire({
      icon: "question",
      title: "¿Estás seguro de eliminar este registro?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Confirmar",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        let data = {
          NUMOPERACION: 3,
          CHID: v.row.id,
          CHUSER: user.Id
        };

        CatalogosServices.indexISN(data).then((res) => {
          if (res.SUCCESS) {
            Toast.fire({
              icon: "success",
              title: "¡Registro Eliminado!",
            });


          } else {
            AlertS.fire({
              title: "¡Error!",
              text: res.STRMESSAGE,
              icon: "error",
            });
          }
        });
        consulta(4,"");
      } else if (result.isDenied) {
        Swal.fire("No se realizaron cambios", "", "info");
      }


    });

  };
 
 

  const handleUpload = (data: any) => {

    if (data.tipo === 1) {
      setslideropen(true);
      let file = data.data?.target?.files?.[0] || "";
      const formData = new FormData();
      formData.append("inputfile", file, "inputfile.xlxs");
      formData.append("CHUSER", user.Id);
      formData.append("tipo", "MUNISNRECAUDACION");
      CatalogosServices.migraData(formData).then((res) => {
        setslideropen(false);
      });

    } /*
    else if (data.tipo === 2) {
      //console.log("borrado de toda la tabla")
      //console.log(selectionModel)

      if(selectionModel.length!==0){
      Swal.fire({
        icon: "question",
        title: selectionModel.length +" Registros Se Eliminaran!!",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Confirmar",
        denyButtonText: `Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {
  
          let data = {
           NUMOPERACION: 5,
           OBJS: selectionModel,
           CHUSER: user.Id
          };
          //console.log(data);
  
          CatalogosServices.munpoblacion(data).then((res) => {
            if (res.SUCCESS) {
              Toast.fire({
                icon: "success",
                title: "Borrado!",
              });
  
              consulta({
                NUMOPERACION: 4,
                ANIO: filterAnio,
              });
  
            } else {
              AlertS.fire({
                title: "¡Error!",
                text: res.STRMESSAGE,
                icon: "error",
              });
            }
          });
  
        } else if (result.isDenied) {
          Swal.fire("No se realizaron cambios", "", "info");
        }
      });
    } else {
      Swal.fire({
        icon: "warning",
        title: "Seleccione Registros Para Borrar",
        confirmButtonText: "Aceptar",
      });
    }


    }*/

  };

  

  const eliminacionMasiva = () => {
    if (selectionModel.length !== 0) {
      Swal.fire({
        icon: "question",
        title: selectionModel.length + " Registros Se Eliminaran!!",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Confirmar",
        denyButtonText: `Cancelar`,
      }).then((result) => {
        if (result.isConfirmed) {

          let data = {
            NUMOPERACION: 5,
            OBJS: selectionModel,
            CHUSER: user.Id
          };
          CatalogosServices.indexISN(data).then((res) => {
            if (res.SUCCESS) {
              Toast.fire({
                icon: "success",
                title: "Borrado!",
              });
              consulta(4,"");
            } else {
              AlertS.fire({
                title: "¡Error!",
                text: res.STRMESSAGE,
                icon: "error",
              });
            }
          });

        } else if (result.isDenied) {
          Swal.fire("No se realizaron cambios", "", "info");
        }
      });
    } else {
      Swal.fire({
        icon: "warning",
        title: "Seleccione Registros Para Borrar",
        confirmButtonText: "Aceptar",
      });
    }

  }

  const consulta = (NUMOPERACION: number, ANIO: string) => {
    setslideropen(true);
    let data = {
      NUMOPERACION: NUMOPERACION,
      CHUSER: user.Id,
      ANIO: ANIO
    };

    CatalogosServices.indexISN(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "¡Consulta Exitosa!",
        });
        setData(res.RESPONSE);
      } else {
        AlertS.fire({
          title: "¡Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
      setslideropen(false);
    });
  };


  const handleOpenn = () => {
   
  };



  useEffect(() => {
    setAnios(fanios());
    permisos.map((item: PERMISO) => {
      if (String(item.ControlInterno) === "ISNR") {
        setNombreMenu(item.Menu);
        
        if (String(item.Referencia) === "ELIM") {
          setEliminar(true);
        }
        if (String(item.Referencia) === "EDIT") {
          setEditar(true);
        }
      }
    });
    consulta(4,"");

  }, []);




  return (

    <div style={{ height: 600, width: "100%" }}>
      <Slider open={slideropen}></Slider>
      <Grid container
        sx={{ justifyContent: "center" }}>
        <Grid item xs={10} sx={{ textAlign: "center" }}>
        <Tooltip title="ISN Recaudación">
          <Typography variant='h3'>
            {nombreMenu}
          </Typography>
        </Tooltip>
        </Grid>
      </Grid>
     
      <ButtonsMunicipio
        url={"PLANTILLA DE CARGA_ISN_RECAUDACION.xlsx"}
        handleUpload={handleUpload} controlInterno={"ISNR"}
        value={''}
        options={anios}
        onInputChange={handleFilterChange}
        placeholder={"Seleccione Año"} label={""} disabled={false} handleOpen={handleOpenn} />
      < MUIXDataGridMun columns={columns} rows={data} handleBorrar={handleBorrar} modulo={'ISN RECAUDACION'} controlInterno={'ISNR'} />


    </div>


  )
}

export default IsnRecaudacion;
