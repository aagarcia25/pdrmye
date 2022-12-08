import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { GridColDef, GridSelectionModel } from '@mui/x-data-grid'
import { CatalogosServices } from '../../../../../services/catalogosServices'
import { messages } from '../../../../styles'
import Swal from 'sweetalert2'
import { Toast } from '../../../../../helpers/Toast'
import { AlertS } from "../../../../../helpers/AlertS";
import Slider from "../../../Slider";
import MunPoblacionProyeccionModal from '../MunPobProyeccion/MunPoblacionProyeccionModal';
import SelectFrag from "../../../Fragmentos/SelectFrag";
import { fanios } from "../../../../../share/loadAnios";
import SelectValues from "../../../../../interfaces/Select/SelectValues";
import { MENU, PERMISO, RESPONSE } from '../../../../../interfaces/user/UserInfo';
import { getMenus, getPermisos, getUser } from '../../../../../services/localStorage';
import ButtonsMunicipio from '../Utilerias/ButtonsMunicipio';
import BotonesAcciones from '../../../componentes/BotonesAcciones';
import MUIXDataGridMun from '../../../MUIXDataGridMun';
import NombreCatalogo from '../../../componentes/NombreCatalogo'


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
      field: "acciones",  disableExport: true,
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
    { field: "ClaveEstado", headerName: "Clave Estado", width: 100 },
    { field: "Nombre", headerName: "Municipio", width: 150 },
    { field: "anio", headerName: "Año", width: 150 },
    { field: "Pob", headerName: "Poblacion", width: 150 },


  ];
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

  const handleDelete = (v: any) => {

    Swal.fire({
      icon: "info",
      title: "Estas seguro de eliminar este registro?",
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
              title: "Solicitud de Eliminado Enviada!",
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


  const handleClose = () => {
    //console.log('cerrando');
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
    //console.log(v)
    setTipoOperacion(2);
    setModo("Editar Registro");
    setOpen(true);
    setData(v);
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
      formData.append("tipo", "MunProyec");
      CatalogosServices.migraData(formData).then((res) => {
        setslideropen(false);
      });

    } 
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
           CHUSER: user.id
          };
          //console.log(data);
  
          CatalogosServices.munproyec(data).then((res) => {
            if (res.SUCCESS) {
              Toast.fire({
                icon: "success",
                title: "Borrado!",
              });
  
              consulta({
                NUMOPERACION: 4,
                CHUSER: user.id,
                ANIO: filterAnio

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
    CatalogosServices.munproyec(data).then((res) => {
      setPoblacion(res.RESPONSE);
    });
  };

  const handleFilterChange = (v: string) => {

    let data = {
      NUMOPERACION: 4,
      ANIO: v,
    };
    setFilterAnio(v);
    if (v != "false") {
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


    <div style={{ height: 500, width: "100%" , padding:"2%"  }}>
      <Slider open={slideropen}></Slider>
      <NombreCatalogo controlInterno={"MUNPROYEC"} />
      <Box
        sx={{ display: 'flex', flexDirection: 'row-reverse', }}>
        <SelectFrag
          options={anios}
          onInputChange={handleFilterChange}
          placeholder={"Seleccione Año"} label={""} disabled={false}
          value={''} />
      </Box>
      <ButtonsMunicipio
        url={plantilla}
        handleUpload={handleUpload} controlInterno={"MUNPROYEC"} />
      < MUIXDataGridMun columns={columns} rows={Poblacion} handleBorrar={handleBorrar} borrar={eliminar} modulo={'PROYECCION'}   />
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
    </div>
  )
}
