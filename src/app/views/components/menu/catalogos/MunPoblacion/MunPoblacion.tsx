import React, { useEffect, useState } from 'react'
import { Box, Grid, Typography } from '@mui/material'
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
import { PERMISO, RESPONSE } from '../../../../../interfaces/user/UserInfo'
import SelectFrag from '../../../Fragmentos/SelectFrag'
import { fanios } from "../../../../../share/loadAnios";
import SelectValues from "../../../../../interfaces/Select/SelectValues";
import ButtonsMunicipio from '../Utilerias/ButtonsMunicipio'
import AccionesGrid from '../Utilerias/AccionesGrid'
import BotonesAcciones from '../../../componentes/BotonesAcciones'



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
  const [eliminar, setEliminar] = useState<boolean>(false);
  const [modo, setModo] = useState("");
  const [nombreMenu, setNombreMenu] = useState("");


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
    {
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
    { field: "FechaCreacion", headerName: "Fecha Creación", width: 150 },
    { field: "ClaveEstado", headerName: "Clave Estado", width: 100 },
    { field: "Nombre", headerName: "Municipio", width: 150 },
    { field: "Anio", headerName: "Año", width: 150 },
    { field: "totalPob", headerName: "Total Población", width: 150 },

  ];

  const handleAccion = (v: any) => {
    if (v.tipo == 1) {
      setTipoOperacion(2);
      setModo("Editar");
      setOpen(true);
      setData(v.data);
    } else if (v.tipo == 2) {
      handleBorrar(v.data);
    }
  }


  const handleClose = (v: string) => {
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
      setPoblacion(res.RESPONSE);
    });
  };



  const handleFilterChange = (v: string) => {
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

      if (item.ControlInterno == "MUNPO")
        setNombreMenu(item.Menu);
      {
        if (String(item.Referencia) == 'EDIT') {
          setUpdate(true);
        }
        if (String(item.Referencia) == 'ELIM') {
          setEliminar(true);
        }

      }
    });
  }, []);




  return (

    <div style={{ height: 600, width: "100%" }}>
      <Slider open={slideropen}></Slider>

      <Box
        sx={{ display: 'flex', flexDirection: 'row-reverse', }}>
        <SelectFrag
          options={anios}
          onInputChange={handleFilterChange}
          placeholder={"Seleccione Año"} label={''} disabled={false}
          value={filterAnio} />
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
      <Grid container
        sx={{ justifyContent: "center" }}>
        <Grid item xs={10} sx={{ textAlign: "center" }}>
          <Typography>
            <h1>{nombreMenu}</h1>
          </Typography>
        </Grid>
      </Grid>

      <ButtonsMunicipio
        url={plantilla}
        handleUpload={handleAgregar} controlInterno={"MUNPO"} />

      <MUIXDataGrid
        columns={columns}
        rows={Poblacion}
      />

    </div>


  )
}

