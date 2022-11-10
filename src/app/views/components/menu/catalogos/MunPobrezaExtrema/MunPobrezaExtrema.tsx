import React, { useEffect, useState } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import { GridColDef, } from '@mui/x-data-grid'
import { porcentage } from '../../CustomToolbar'
import { CatalogosServices } from '../../../../../services/catalogosServices'
import { messages } from '../../../../styles'
import Swal from 'sweetalert2'
import { Toast } from '../../../../../helpers/Toast'
import { Alert } from "../../../../../helpers/Alert";
import Slider from "../../../Slider";
import MUIXDataGrid from '../../../MUIXDataGrid'
import SelectFrag from "../../../Fragmentos/SelectFrag";
import { fanios } from "../../../../../share/loadAnios";
import SelectValues from "../../../../../interfaces/Select/SelectValues";
import { PERMISO, RESPONSE } from '../../../../../interfaces/user/UserInfo'
import { getPermisos, getUser } from '../../../../../services/localStorage'
import MunPobrezaExtremaModal from './MunPobrezaExtremaModal'
import ButtonsMunicipio from '../Utilerias/ButtonsMunicipio'
import BotonesAcciones from '../../../componentes/BotonesAcciones'

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
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [nombreMenu, setNombreMenu] = useState("");
  const [agregar, setAgregar] = useState<boolean>(false);
  const [editar, setEditar] = useState<boolean>(false);
  const [eliminar, setEliminar] = useState<boolean>(false);



  // VARIABLES PARA LOS FILTROS
  const [filterAnio, setFilterAnio] = useState("");


  const columns: GridColDef[] = [
    { field: "id", headerName: "Identificador", hide: true },
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
          <BotonesAcciones handleAccion={handleAccion} row={v} editar={editar} eliminar={eliminar}></BotonesAcciones>

        );
      },
    },
    { field: "FechaCreacion", headerName: "Fecha Creación", width: 150 },
    { field: "Nombre", headerName: "Municipio", width: 150 },
    { field: "Anio", headerName: "Año", width: 150 },
    { field: "Personas", headerName: "Total", width: 150 },
    { field: "CarenciaProm", headerName: "Carencia Promedio", width: 250, ...porcentage }


  ];

  const handleClose = (v: string) => {

    setOpen(false);
    setOpen(false);
    let data = {
      NUMOPERACION: 4,
      ANIO: filterAnio,
    };
    consulta(data);


  }

  const handleOpen = (v: any) => {
    setTipoOperacion(1);
    setModo("Agregar Registro");
    setOpen(true);
    setData(v);
  };

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
      setPobrezaExtrema(res.RESPONSE);

      console.log('respuesta' + res.RESPONSE + res.NUMCODE);

    });
  };

  const handleFilterChange = (v: string) => {
    setFilterAnio(v)
    let data = {
      NUMOPERACION: 4,
      ANIO: v,

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
    permisos.map((item: PERMISO) => {
      if (String(item.ControlInterno) === "MUNPOEX") {
        console.log(item)
        setNombreMenu(item.Menu);

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


    <div style={{ height: 600, width: "100%" }}>
      <Slider open={slideropen}></Slider>



      <Grid container
        sx={{ justifyContent: "center" }}>
        <Grid item xs={10} sx={{ textAlign: "center" }}>
          <Typography>
            <h1>{nombreMenu}</h1>
          </Typography>
        </Grid>
      </Grid>
      <Box
        sx={{ display: 'flex', flexDirection: 'row-reverse', }}>
        <SelectFrag
          value={filterAnio}
          options={anios}
          onInputChange={handleFilterChange}
          placeholder={"Seleccione Año"} label={""} disabled={false} />
      </Box>

      <ButtonsMunicipio
        url={plantilla}
        handleUpload={handleAgregar} controlInterno={"MUNPOEX"} />
      <MUIXDataGrid columns={columns} rows={PobrezaExtrema} />

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
    </div>



  )
}
