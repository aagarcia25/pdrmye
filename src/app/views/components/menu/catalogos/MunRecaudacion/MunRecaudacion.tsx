import React, { useEffect, useState } from "react";

import {
  Box,
  IconButton,
  LinearProgress,
  SelectChangeEvent,
} from "@mui/material";

import { esES, GridColDef } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import { CustomNoRowsOverlay } from "../../CustomNoRowsOverlay";
import { CustomToolbar, Moneda } from "../../CustomToolbar";
import {
  getUser,
} from "../../../../../services/localStorage";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { messages } from "../../../../styles";
import Filtros from "../Utilerias/Filtros";
import Buttons from "../Utilerias/Buttons";
import Slider from "../../../Slider";
import { Toast } from "../../../../../helpers/Toast";
import { Alert } from "../../../../../helpers/Alert";
import Swal from "sweetalert2";
import MunRecaudacionModal from "./MunRecaudacionModal";


export const MunRecaudacion = () => {
   
  const user = getUser();


  const [modo, setModo] = useState("");
  const [open, setOpen] = useState(false);
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [data, setData] = useState({});


  const [Facturacion, setFacturacion] = useState([]);
  const [plantilla, setPlantilla] = useState("");
  const [slideropen, setslideropen] = useState(false);


  // VARIABLES PARA LOS FILTROS
  const [filterAnio, setFilterAnio] = useState("");

  //funciones
  const handleFilterMes = () => {};


const columns: GridColDef[] = [
    { field: "id", headerName: "Identificador", hide:true , width: 150   , description:messages.dataTableColum.id},
    {
      field: "idmunicipio",
      headerName: "idmunicipio",
      hide: true,
      width: 150,
    },
    { field: "ClaveEstado", headerName: "Clave Estado", width: 100 },    
    { field: "Nombre", headerName: "Municipio", width: 400 },
    { field: "Anio", headerName: "Año", width: 100 },
    { field: "Recaudacion", headerName: "Recaudacion", width: 150 ,...Moneda},
    
    {
      field: "acciones",
      headerName: "Acciones",
      description: "Campo de Acciones",
      sortable: false,
      width: 200,
      renderCell: (v) => {
        return (
          <Box>
            <IconButton onClick={() => handleEdit(v)}>
              <ModeEditOutlineIcon />
            </IconButton>
            <IconButton onClick={() => handleDelete(v)}>
              <DeleteForeverIcon />
            </IconButton>
          </Box>
        );
      },
    },
   
  ];

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

  const handleEdit = (v: any) => {
    setTipoOperacion(2);
    setModo("Editar Registro");
    setOpen(true);
    setData(v);
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
        console.log(v);

        let data = {
          NUMOPERACION: 3,
          CHID: v.row.id,
          CHUSER: 1,
        };
        console.log(data);

        CatalogosServices.munrecaudacion(data).then((res) => {
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



  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setslideropen(true);
    let file = event?.target?.files?.[0] || "";
    const formData = new FormData();
    formData.append("inputfile", file, "inputfile.xlsx");
    formData.append("tipo", "MunRecaudacion");
    CatalogosServices.migraData(formData).then((res) => {
      setslideropen(false);
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Carga Exitosa!",
        });
      } else {
        Alert.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }

     

    });
  };

  const consulta = (data: any) => {
    CatalogosServices.munrecaudacion(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Consulta Exitosa!",
        });
        setFacturacion(res.RESPONSE);
      } else {
        Alert.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };



  const handleFilterChange = (event: SelectChangeEvent) => {
    setFilterAnio(event.target.value);
    let data = {
      NUMOPERACION: 4,
      ANIO: event.target.value,
    };
    consulta(data);
  };

  const downloadplantilla = () => {
    let data = {
      NUMOPERACION: "MUNICIPIO_RECAUDACION",
    };

    CatalogosServices.descargaplantilla(data).then((res) => {
      setPlantilla(res.RESPONSE);
    });
  };

  useEffect(() => {
    downloadplantilla();
  }, []);

  return (
    <div style={{ height: 600, width: "100%" }}>
      <Slider open={slideropen}></Slider>

      <Filtros
        anioApply={true}
        mesApply={false}
        handleFilterChangeAnio={handleFilterChange}
        handleFilterChangeMes={handleFilterMes}
        valueFilterAnio={filterAnio}
        valueFilterMes={""}
      />

      {open ? (
        <MunRecaudacionModal
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
        handleUpload={handleUpload}
      />

      <DataGrid
        //checkboxSelection
        pagination
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        components={{
          Toolbar: CustomToolbar,
          LoadingOverlay: LinearProgress,
          NoRowsOverlay: CustomNoRowsOverlay,
        }}
        rowsPerPageOptions={[5, 10, 20, 50, 100]}
        rows={Facturacion}
        columns={columns}

        // loading //agregar validacion cuando se esten cargando los registros
      />
    </div>
  );
};
