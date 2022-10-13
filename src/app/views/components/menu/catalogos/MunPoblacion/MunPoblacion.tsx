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
import Buttons from '../Utilerias/Buttons'
import MunPoblacionModal from './MunPoblacionModal'
import MUIXDataGrid from '../../../MUIXDataGrid'
import AccionesGrid from '../../../AccionesGrid'
import { PERMISO, RESPONSE} from '../../../../../interfaces/user/UserInfo'
import SelectFrag from '../../../Fragmentos/Select/SelectFrag'
import { fanios } from "../../../../../share/loadAnios";
import SelectValues from "../../../../../interfaces/Select/SelectValues";


const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
const user: RESPONSE = JSON.parse(String(getUser()));

export const MunPoblacion = () => {



  const [eliminar, setEliminar] = useState(false);
  const [update, setUpdate] = useState(false);
  const [modo, setModo] = useState("");
  const [open, setOpen] = useState(false);
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [data, setData] = useState({});
  const [Poblacion, setPoblacion] = useState([]);
  const [plantilla, setPlantilla] = useState("");
  const [slideropen, setslideropen] = useState(false);
  const [anios, setAnios] = useState<SelectValues[]>([]);

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
          <AccionesGrid handleEditar={handleEditar} handleBorrar={handleBorrar} v={v} update={update} pdelete={eliminar} />
        );
      },
    },

  ];


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



  const handleEditar = (v: any) => {
    console.log(v)
    setTipoOperacion(2);
    setModo("Editar Registro");
    setOpen(true);
    setData(v);
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



  const handleFilterChange = (event:any) => {
    setFilterAnio(event.value);

    let data = {
      NUMOPERACION: 4,
      ANIO: event.value,
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
    setAnios(fanios());




    permisos.map((item: PERMISO) => {
      console.log(item.Menu + ' --' + item.Permiso);

      if (item.Menu == 'munpob') {
        if (item.Permiso == 'Editar') {
          setUpdate(true);
        }
        if (item.Permiso == 'Eliminar') {
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
            placeholder={"Seleccione Año"}/>
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
      <Buttons
        handleOpen={handleOpen}
        url={plantilla}
        handleUpload={handleAgregar}
      />

      <MUIXDataGrid
        columns={columns}
        rows={Poblacion}
      />

    </div>


  )
}

