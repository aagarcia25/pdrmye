import React, { useEffect, useState } from 'react'
import { Box, IconButton } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import { CatalogosServices } from '../../../../../services/catalogosServices'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { messages } from '../../../../styles'
import Swal from 'sweetalert2'
import { Toast } from '../../../../../helpers/Toast'
import { Alert } from "../../../../../helpers/Alert";
import Slider from "../../../Slider";
import MunPoblacionProyeccionModal from '../MunPobProyeccion/MunPoblacionProyeccionModal';
import MUIXDataGrid from '../../../MUIXDataGrid'
import SelectFrag from "../../../Fragmentos/SelectFrag";
import { fanios } from "../../../../../share/loadAnios";
import SelectValues from "../../../../../interfaces/Select/SelectValues";
import { PERMISO, RESPONSE } from '../../../../../interfaces/user/UserInfo';
import { getPermisos, getUser } from '../../../../../services/localStorage';
import ButtonsMunicipio from '../Utilerias/ButtonsMunicipio';
import AccionesGrid from '../Utilerias/AccionesGrid';
import BotonesAcciones from '../../../componentes/BotonesAcciones';


export const MunPobProyeccion = () => {

  const [modo, setModo] = useState("");
  const [open, setOpen] = useState(false);
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [data, setData] = useState({});
  const [Poblacion, setPoblacion] = useState([]);
  const [plantilla, setPlantilla] = useState("");
  const [slideropen, setslideropen] = useState(false);
  const [anios, setAnios] = useState<SelectValues[]>([]);
  const user: RESPONSE = JSON.parse(String(getUser()));
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [editar, setEditar] = useState<boolean>(false);
  const [eliminar, setEliminar] = useState<boolean>(false);



  // VARIABLES PARA LOS FILTROS
  const [filterAnio, setFilterAnio] = useState("");
  //funciones

  const columns: GridColDef[] = [
    { field: "id", headerName: "Identificador", hide: true, width: 150, description: messages.dataTableColum.id },
    {
      field: "idmunicipio",
      headerName: "idmunicipio",
      hide: true,
      width: 150,
    },
    { field: "ClaveEstado", headerName: "Clave Estado", width: 100 },
    { field: "Nombre", headerName: "Municipio", width: 150 },
    { field: "anio", headerName: "Año", width: 150 },
    { field: "Pob", headerName: "Poblacion", width: 150 },

    {
      field: "acciones",
      headerName: "Acciones",
      description: "Campo de Acciones",
      sortable: false,
      width: 200,
      renderCell: (v) => {
        return (

          <BotonesAcciones handleAccion={handleAccion} row={v} editar={editar} eliminar={eliminar}></BotonesAcciones>

        );
      },
    },

  ];
  const handleAccion = (v: any) => {
    if (v.tipo == 1) {
      setTipoOperacion(2);
      setModo("Editar ");
      setOpen(true);
      setData(v.data);
    } else if (v.tipo == 2) {
      handleBorrar(v.data);
    }
  }


  const handleClose = () => {
    console.log('cerrando');
    setOpen(false);
    let data = {
      NUMOPERACION: 4,
      ANIO: filterAnio,
    };
    consulta(data);

  };



  const handleOpen = (v: any) => {
    setTipoOperacion(1);
    setModo("Agregar Registro");
    setOpen(true);
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

        CatalogosServices.munproyec(data).then((res) => {
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
    formData.append("tipo", "MunProyec");
    CatalogosServices.migraData(formData).then((res) => {
      setslideropen(false);
    });
  };


  const consulta = (data: any) => {
    CatalogosServices.munproyec(data).then((res) => {

      console.log('respuesta' + res.RESPONSE + res.NUMCODE);



      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Consulta Exitosa!",
        });

        setPoblacion(res.RESPONSE);

      } else {
        Alert.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };

  const handleFilterChange = (v: string) => {

    let data = {
      NUMOPERACION: 4,
      ANIO: v,
    };
    setFilterAnio(v);
    if (v != "") {
      consulta(data);
    }
  };

  const downloadplantilla = () => {
    let data = {
      NUMOPERACION: "MUNICIPIO_PROYECCION",

    };

    CatalogosServices.descargaplantilla(data).then((res) => {
      setPlantilla(res.RESPONSE);
    });
  };


  useEffect(() => {
    permisos.map((item: PERMISO) => {
      if (String(item.ControlInterno) === "MUNPROYEC") {
        console.log(item)
        if (String(item.Referencia) == "ELIM") {
          setEliminar(true);
        }
        if (String(item.Referencia) == "EDIT") {
          setEditar(true);
        }
      }
    });
    setAnios(fanios());
    downloadplantilla();
  }, []);



  return (


    <div style={{ height: 500, width: "100%" }}>
      <Slider open={slideropen}></Slider>

      <Box
        sx={{ display: 'flex', flexDirection: 'row-reverse', }}>
        <SelectFrag
          options={anios}
          onInputChange={handleFilterChange}
          placeholder={"Seleccione Año"} label={""} disabled={false}
          value={''} />
      </Box>


      {open ? (
        <MunPoblacionProyeccionModal
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
        handleUpload={handleAgregar} controlInterno={"MUNPROYEC"} />
      <MUIXDataGrid columns={columns} rows={Poblacion} />

    </div>



  )
}
