
import React, { useEffect, useState } from 'react'
import { Box, Grid, IconButton, Link, Tooltip, Typography } from '@mui/material'
import { GridColDef, GridSelectionModel } from '@mui/x-data-grid'
import { getPermisos, getUser } from '../../../../../services/localStorage'
import { CatalogosServices } from '../../../../../services/catalogosServices'
import { messages } from '../../../../styles'
import Swal from 'sweetalert2'
import { Toast } from '../../../../../helpers/Toast'
import { AlertS } from "../../../../../helpers/AlertS";
import Slider from "../../../Slider";
import { PERMISO, RESPONSE } from '../../../../../interfaces/user/UserInfo'
import SelectFrag from '../../../Fragmentos/SelectFrag'
import { fanios } from "../../../../../share/loadAnios";
import SelectValues from "../../../../../interfaces/Select/SelectValues";
import BotonesAcciones from '../../../componentes/BotonesAcciones'
import MUIXDataGridMun from '../../../MUIXDataGridMun'
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Moneda } from '../../CustomToolbar'
import ButtonsMunicipio from '../../catalogos/Utilerias/ButtonsMunicipio'


const IsnRecaudacion = () => {
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const user: RESPONSE = JSON.parse(String(getUser()));
  const [update, setUpdate] = useState(false);
  const [open, setOpen] = useState(false);
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [data, setData] = useState([]);
  const [plantilla, setPlantilla] = useState("");
  const [slideropen, setslideropen] = useState(false);
  const [anios, setAnios] = useState<SelectValues[]>([]);
  const [agregar, setAgregar] = useState<boolean>(false);
  const [editar, setEditar] = useState<boolean>(false);
  const [eliminar, setEliminar] = useState<boolean>(false);
  const [modo, setModo] = useState("");
  const [nombreMenu, setNombreMenu] = useState("");
  const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([]);


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
    { field: "FechaCreacion", headerName: "Fecha Creaci??n", width: 150 },
    { field: "ClaveEstado", headerName: "Clave Estado", width: 100 },
    { field: "Nombre", headerName: "Municipio", width: 150 },
    { field: "Anio", headerName: "A??o", width: 150 },
    { field: "Importe", headerName: "Importe", width: 150, ...Moneda },
    { field: "Coeficiente", headerName: "Coeficiente", width: 250 },
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
    consulta(4);

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

        CatalogosServices.indexISN(data).then((res) => {
          if (res.SUCCESS) {
            Toast.fire({
              icon: "success",
              title: "Registro Eliminado!",
            });


          } else {
            AlertS.fire({
              title: "Error!",
              text: res.STRMESSAGE,
              icon: "error",
            });
          }
        });
        consulta(4);
      } else if (result.isDenied) {
        Swal.fire("No se realizaron cambios", "", "info");
      }


    });

  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setslideropen(true);
    let file = event?.target?.files?.[0] || "";
    const formData = new FormData();
    formData.append("inputfile", file, "inputfile.xlxs");
    formData.append("CHUSER", user.id);
    formData.append("tipo", "MUNISNRECAUDACION");
    CatalogosServices.migraData(formData).then((res) => {
      setslideropen(false);
      consulta(4);
    });
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
            CHUSER: user.id
          };
          CatalogosServices.indexISN(data).then((res) => {
            if (res.SUCCESS) {
              Toast.fire({
                icon: "success",
                title: "Borrado!",
              });
              consulta(4);
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

  const consulta = (NUMOPERACION: number) => {
    setslideropen(true);
    let data = {
      NUMOPERACION: NUMOPERACION,
      CHUSER: user.id,
      ANIO: filterAnio
    };

    CatalogosServices.indexISN(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Consulta Exitosa!",
        });
        setData(res.RESPONSE);
      } else {
        AlertS.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
      setslideropen(false);
    });
  };


  const handleFilterChange = (v: string) => {
    setFilterAnio(v);
    if (v !== "") {
      consulta(4);
    }
  };

  const downloadplantilla = () => {
    let data = {
      NUMOPERACION: "PLANTILLA DE CARGA_ISN_RECAUDACION",
    };

    CatalogosServices.descargaplantilla(data).then((res) => {
      setPlantilla(res.RESPONSE);
    });
  };

  useEffect(() => {
    downloadplantilla();
    setAnios(fanios());
    permisos.map((item: PERMISO) => {
      if (String(item.ControlInterno) === "ISNR") {
        setNombreMenu(item.Menu);
        if (String(item.Referencia) === "AGREG") {
          setAgregar(true);
        }
        if (String(item.Referencia) === "ELIM") {
          setEliminar(true);
        }
        if (String(item.Referencia) === "EDIT") {
          setEditar(true);
        }
      }
    });
    consulta(4);

  }, []);




  return (

    <div style={{ height: 600, width: "100%", padding: "2%" }}>
      <Slider open={slideropen}></Slider>
      <Grid container
        sx={{ justifyContent: "center" }}>
        <Grid item xs={10} sx={{ textAlign: "center" }}>
          <Typography variant='h3'>
            {nombreMenu}
          </Typography>
        </Grid>
      </Grid>
     
      <ButtonsMunicipio
        url={plantilla}
        handleUpload={handleUpload} controlInterno={"ISNR"} 
        value={''}
        options={anios}
        onInputChange={handleFilterChange}
        placeholder={"Seleccione A??o"} label={""} disabled={false} />
      < MUIXDataGridMun columns={columns} rows={data} handleBorrar={handleBorrar} modulo={'ISN RECAUDACION'} controlInterno={'ISNR'} />


    </div>


  )
}

export default IsnRecaudacion;
