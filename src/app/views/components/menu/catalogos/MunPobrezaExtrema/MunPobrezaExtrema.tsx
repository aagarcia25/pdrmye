import React, { useEffect, useState } from 'react'
import { GridColDef, GridSelectionModel, } from '@mui/x-data-grid'
import { porcentage } from '../../CustomToolbar'
import { CatalogosServices } from '../../../../../services/catalogosServices'
import Swal from 'sweetalert2'
import { Toast } from '../../../../../helpers/Toast'
import { AlertS } from "../../../../../helpers/AlertS";
import Slider from "../../../Slider";
import { fanios } from "../../../../../share/loadAnios";
import SelectValues from "../../../../../interfaces/Select/SelectValues";
import { PERMISO, RESPONSE } from '../../../../../interfaces/user/UserInfo'
import { getPermisos, getUser } from '../../../../../services/localStorage'
import MunPobrezaExtremaModal from './MunPobrezaExtremaModal'
import ButtonsMunicipio from '../Utilerias/ButtonsMunicipio'
import BotonesAcciones from '../../../componentes/BotonesAcciones'
import MUIXDataGridMun from '../../../MUIXDataGridMun'

import NombreCatalogo from '../../../componentes/NombreCatalogo'

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
  const [editar, setEditar] = useState<boolean>(false);
  const [eliminar, setEliminar] = useState<boolean>(false);
  const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([]);
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
      field: "acciones", disableExport: true,
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
    { field: "FechaCreacion",   headerName: "Fecha Creaci??n",   description: "Fecha Creaci??n",    width: 180 },
    { field: "ClaveEstado",     headerName: "Clave Estado",     description: "Clave Estado",      width: 100 },
    { field: "Nombre",          headerName: "Municipio",        description: "Municipio",         width: 150 },
    { field: "Anio",            headerName: "A??o",              description: "A??o",               width: 150 },
    { field: "Personas",        headerName: "Total",            description: "Total",             width: 150 },
    { field: "CarenciaProm",    headerName: "Carencia Promedio",description: "Carencia Promedio", width: 180, ...porcentage }


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
    if (v.tipo === 1) {
      setTipoOperacion(2);
      setModo("Editar ");
      setOpen(true);
      setData(v.data);
    } else if (v.tipo === 2) {
      handleDelete(v.data);
    }
  }
  const handleBorrar = (v: any) => {
    setSelectionModel(v);
  };

  const handleDelete = (v: any) => {

    Swal.fire({
      icon: "info",
      title: "Solicitar La Eliminaci??n?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Confirmar",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {

        let data = {
          NUMOPERACION: 3,
          CHID: v.row.id,
          CHUSER: user.id
        };


        CatalogosServices.munpobrezaext(data).then((res) => {
          if (res.SUCCESS) {
            Toast.fire({
              icon: "success",
              title: "Solicitud Enviada!",
            });

            let data = {
              NUMOPERACION: 4,
              ANIO: filterAnio,
            };
            consulta(data);
          } else {
            AlertS.fire({
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

  };

  const handleUpload = (data: any) => {

    if (data.tipo === 1) {
      setslideropen(true);
      let file = data.data?.target?.files?.[0] || "";
      const formData = new FormData();
      formData.append("inputfile", file, "inputfile.xlxs");
      formData.append("tipo", "MunPobrezaExt");
      CatalogosServices.migraData(formData).then((res) => {
        setslideropen(false);
      });

    }
    else if (data.tipo === 2) {
      //console.log("borrado de toda la tabla")
      //console.log(selectionModel)

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
              CHUSER: user.id
            };
            //console.log(data);

            CatalogosServices.munpobrezaext(data).then((res) => {
              if (res.SUCCESS) {
                Toast.fire({
                  icon: "success",
                  title: "Borrado!",
                });

                consulta({
                  NUMOPERACION: 4,
                  CHUSER: user.id,
                  ANIO: filterAnio,

                });

              } else {
                AlertS.fire({
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
      } else {
        Swal.fire({
          icon: "warning",
          title: "Seleccione Registros Para Borrar",
          confirmButtonText: "Aceptar",
        });
      }


    }

  };

  const consulta = (data: any) => {
    CatalogosServices.munpobrezaext(data).then((res) => {
      setPobrezaExtrema(res.RESPONSE);

    });
  };

  const handleFilterChange = (v: string) => {
    setFilterAnio(v)
    let data = {
      NUMOPERACION: 4,
      ANIO: v,
    };
    if (v !== "false") {
      setFilterAnio(v);
      consulta(data);
    } else {
      consulta({ NUMOPERACION: 4,ANIO: "",});
      setFilterAnio("");

    }
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
        setNombreMenu(item.Menu);
        if (String(item.Referencia) === "ELIM") {
          setEliminar(true);
        }
        if (String(item.Referencia) === "EDIT") {
          setEditar(true);
        }
      }
    });

    setAnios(fanios());
    downloadplantilla();

    let data = {
      NUMOPERACION: 4,
      ANIO: "",

    };

    consulta(data);

  }, []);



  return (


    <div style={{ height: 600, width: "100%" }}>
      <Slider open={slideropen}></Slider>

      <NombreCatalogo controlInterno={"MUNPOEX"} />


      <ButtonsMunicipio
        url={plantilla}
        handleUpload={handleUpload} controlInterno={"MUNPOEX"} 
        
        value={filterAnio}
          options={anios}
          onInputChange={handleFilterChange}
          placeholder={"Seleccione A??o"} label={""} disabled={false}  />

      <MUIXDataGridMun columns={columns} rows={PobrezaExtrema} handleBorrar={handleBorrar} modulo={nombreMenu.toUpperCase().replace(' ', '_')} controlInterno={"MUNPOEX"} />
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
