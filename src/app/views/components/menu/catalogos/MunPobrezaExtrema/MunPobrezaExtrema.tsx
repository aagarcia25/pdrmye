import React, { useEffect, useState } from 'react'
import { Box, IconButton } from '@mui/material'
import { GridColDef, } from '@mui/x-data-grid'
import { porcentage } from '../../CustomToolbar'
import { CatalogosServices } from '../../../../../services/catalogosServices'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { messages } from '../../../../styles'
import Swal from 'sweetalert2'
import { Toast } from '../../../../../helpers/Toast'
import { Alert } from "../../../../../helpers/Alert";
import Slider from "../../../Slider";
import MUIXDataGrid from '../../../MUIXDataGrid'
import SelectFrag from "../../../Fragmentos/Select/SelectFrag";
import { fanios } from "../../../../../share/loadAnios";
import SelectValues from "../../../../../interfaces/Select/SelectValues";
import { RESPONSE } from '../../../../../interfaces/user/UserInfo'
import { getUser } from '../../../../../services/localStorage'
import MunPobrezaExtremaModal from './MunPobrezaExtremaModal'
import ButtonsMunicipio from '../Utilerias/ButtonsMunicipio'

export const MunPobrezaExtrema = () => {


  const [modo, setModo] = useState("");
  const [open, setOpen] = useState(false);
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [data, setData] = useState({});
  const [PobrezaExtrema, setPobrezaExtrema] = useState([]);
  const [plantilla, setPlantilla] = useState("");
  const [slideropen, setslideropen] = useState(false);
  const [anios, setAnios] = useState<SelectValues[]>([]);
  const user: RESPONSE = JSON.parse(String(getUser()));




  // VARIABLES PARA LOS FILTROS
  const [filterAnio, setFilterAnio] = useState("");
  //funciones
  const handleFilterMes = () => { };

  const columns: GridColDef[] = [
    { field: "id", headerName: "Identificador", hide: true, width: 150, description: messages.dataTableColum.id },
    {
      field: "idmunicipio",
      headerName: "idmunicipio",
      hide: true,
      width: 150,
    },
    { field: "Nombre", headerName: "Municipio", width: 150 },
    { field: "Anio", headerName: "Año", width: 150 },
    { field: "Personas", headerName: "Total", width: 150 },
    { field: "CarenciaProm", headerName: "Carencia Promedio", width: 250, ...porcentage },
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


  const handleClose = (v:string) => {
    if (v === "close"){
      setOpen(false);
    } else if (v === "save"){
      setOpen(false);
    let data = {
      NUMOPERACION: 4,
      ANIO: filterAnio,
    };
    consulta(data);
    }  


  }

  const handleOpen = (v: any) => {
    setTipoOperacion(1);
    setModo("Agregar Registro");
    setOpen(true);
    setData(v);
  };


  const handleEditar = (v: any) => {
    console.log(v)
    setTipoOperacion(2);
    setModo("Editar Registro");
    setOpen(true);
    setData(v);

    let data = {
      NUMOPERACION: 4,
      ANIO: filterAnio,
    };
    consulta(data);
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

        CatalogosServices.munpobrezaext(data).then((res) => {
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


    });
  };

  const handleAgregar = (event: React.ChangeEvent<HTMLInputElement>) => {
    setslideropen(true);
    let file = event?.target?.files?.[0] || "";
    const formData = new FormData();
    formData.append("inputfile", file, "inputfile.xlxs");
    formData.append("tipo", "MunPobrezaExt");
    CatalogosServices.migraData(formData).then((res) => {
      setslideropen(false);
    });
  };


  const consulta = (data: any) => {
    CatalogosServices.munpobrezaext(data).then((res) => {

      console.log('respuesta' + res.RESPONSE + res.NUMCODE);



      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Consulta Exitosa!",
        });

        setPobrezaExtrema(res.RESPONSE);

      } else {
        Alert.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };

  const handleFilterChange = (event: any) => {

    setFilterAnio(event.value);
    let data = {
      NUMOPERACION: 4,
      ANIO: event.value,

    }; 

    consulta(data);
  };

  
  const downloadplantilla = () => {
    let data = {
      NUMOPERACION: "MUNICIPIO_POBREZA_EXTREMA",

    };

    CatalogosServices.descargaplantilla(data).then((res) => {
      setPlantilla(res.RESPONSE);
    });
  };


  useEffect(() => {
    setAnios(fanios());
    downloadplantilla();
  }, []);



  return (


    <div style={{ height: 600, width: "100%" }}>
      <Slider open={slideropen}></Slider>

      <Box  
         sx={{ display: 'flex', flexDirection: 'row-reverse',}}>
            <SelectFrag 
            value={''}
          options={anios}
          onInputChange={handleFilterChange}
          placeholder={"Seleccione Año"} label={""} disabled={false}/>
            </Box>

      {open ? (
        <MunPobrezaExtremaModal
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
        handleUpload={handleAgregar} controlInterno={"MUNPOEX"}      />

      <MUIXDataGrid columns={columns} rows={PobrezaExtrema} />


    </div>



  )
}
