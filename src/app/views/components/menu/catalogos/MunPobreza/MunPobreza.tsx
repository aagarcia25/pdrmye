import React, { useEffect, useState } from 'react'
import { Box, FormLabel, } from '@mui/material'
import { GridColDef, GridSelectionModel, } from '@mui/x-data-grid'
import { porcentage } from '../../CustomToolbar'
import { CatalogosServices } from '../../../../../services/catalogosServices'
import { messages } from '../../../../styles'
import Swal from 'sweetalert2'
import { Toast } from '../../../../../helpers/Toast'
import { AlertS } from "../../../../../helpers/AlertS";
import MunPobrezaModal from './MunPobrezaModal'
import Slider from "../../../Slider";
import SelectFrag from "../../../Fragmentos/SelectFrag";
import { fanios } from "../../../../../share/loadAnios";
import SelectValues from "../../../../../interfaces/Select/SelectValues";
import { PERMISO, RESPONSE } from '../../../../../interfaces/user/UserInfo'
import { getMenus, getPermisos, getUser } from '../../../../../services/localStorage'
import ButtonsMunicipio from '../Utilerias/ButtonsMunicipio'
import BotonesAcciones from '../../../componentes/BotonesAcciones'
import MUIXDataGridMun from '../../../MUIXDataGridMun'
import NombreCatalogo from '../../../componentes/NombreCatalogo'

export const MunPobreza = () => {


  const [open, setOpen] = useState(false);
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [data, setData] = useState({});
  const [dataMunPobreza, setDataMunPobreza] = useState([]);
  const [plantilla, setPlantilla] = useState("");
  const [slideropen, setslideropen] = useState(false);
  const [anios, setAnios] = useState<SelectValues[]>([]);
  const user: RESPONSE = JSON.parse(String(getUser()));
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [editar, setEditar] = useState<boolean>(false);
  const [eliminar, setEliminar] = useState<boolean>(false);
  const [nombreMenu, setNombreMenu] = useState("");
  const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([]);

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
    { field: "FechaCreacion", headerName: "Fecha Creación", description: "Fecha Creación", width: 150 },
    { field: "ClaveEstado", headerName: "Clave Estado", description: "Clave Estado", width: 100 },
    { field: "Nombre", headerName: "Municipio", description: "Municipio", width: 150 },
    { field: "Anio", headerName: "Año", description: "Año", width: 150 },
    { field: "Total", headerName: "Total", description: "Total", width: 100 },
    {
      field: "CarenciaProm", headerName: "Carencia Promedio", description: "Carencia Promedio", width: 200,
      renderCell: (v) => {
        return (
          <>
            {v.row.CarenciaProm + "%"}
          </>
        );
      },
    },

  ];

  const handleAccion = (v: any) => {
    if (v.tipo === 1) {
      setTipoOperacion(2);
      setOpen(true);
      setData(v.data);
    } else if (v.tipo === 2) {
      handleDelete(v.data);
    }
  }


  const handleClose = (v: string) => {
    setOpen(false);
    let data = {
      NUMOPERACION: 4,
      ANIO: filterAnio,
    };
    consulta(data);

  }
  const handleOpen = (v: any) => {
    setTipoOperacion(1);
    setOpen(true);
    setData(v);
  };

  const handleDelete = (v: any) => {
    Swal.fire({
      icon: "info",
      title: "Solicitar La Eliminación?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Confirmar",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        //console.log(v);

        let data = {
          NUMOPERACION: 3,
          CHID: v.row.id,
          CHUSER: user.id
        };
        //console.log(data);

        CatalogosServices.munpobreza(data).then((res) => {
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




  const handleBorrar = (v: any) => {

    setSelectionModel(v);
  };


  const handleUpload = (data: any) => {

    if (data.tipo === 1) {
      setslideropen(true);
      let file = data.data?.target?.files?.[0] || "";
      const formData = new FormData();
      formData.append("inputfile", file, "inputfile.xlxs");
      formData.append("tipo", "MunPobreza");
      CatalogosServices.migraData(formData).then((res) => {
        setslideropen(false);
      });

    }
    else if (data.tipo === 2) {

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

            CatalogosServices.munpobreza(data).then((res) => {
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
    CatalogosServices.munpobreza(data).then((res) => {
      setDataMunPobreza(res.RESPONSE);
    });
  };

  const handleFilterChange = (v: string) => {
    if (v === null) {
      let data = {
        NUMOPERACION: 4,

      };
      setFilterAnio("");
    } else {

      let data = {
        NUMOPERACION: 4,
        ANIO: v,
      };
      setFilterAnio(v);

      if (v !== "") {
        consulta(data);
      }
    }
  };

  const downloadplantilla = () => {
    let data = {
      NUMOPERACION: "MUNICIPIO_POBREZA",

    };

    CatalogosServices.descargaplantilla(data).then((res) => {
      setPlantilla(res.RESPONSE);
    });
  };


  useEffect(() => {

    permisos.map((item: PERMISO) => {
      if (String(item.ControlInterno) === "MUNPOBREZA") {
        //console.log(item)
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
      <NombreCatalogo controlInterno={"MUNPOBREZA"} />


      <ButtonsMunicipio
        url={plantilla}
        handleUpload={handleUpload} controlInterno={"MUNPOBREZA"}
        options={anios}
        onInputChange={handleFilterChange}
        placeholder={"Seleccione Año"} label={''} disabled={false}
        value={''} />

      < MUIXDataGridMun columns={columns} rows={dataMunPobreza} handleBorrar={handleBorrar} borrar={eliminar} modulo={'POBREZA'} />

      {open ? (
        <MunPobrezaModal
          open={open}
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
