import React, { useEffect, useState } from "react";

import {
  Box,
  SelectChangeEvent,
} from "@mui/material";

import { GridColDef } from "@mui/x-data-grid";
import {
  getUser,
} from "../../../../../services/localStorage";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import { messages } from "../../../../styles";
import Filtros from "../Utilerias/Filtros";
import Buttons from "../Utilerias/Buttons";
import Slider from "../../../Slider";
import { Toast } from "../../../../../helpers/Toast";
import { Alert } from "../../../../../helpers/Alert";
import Swal from "sweetalert2";
import MunFacturacionModal from "./MunFacturacionModal";
import MUIXDataGrid from "../../../MUIXDataGrid";
import AccionesGrid from "../../../AccionesGrid";
import { currencyFormatter } from "../../CustomToolbar";
import SelectFrag from "../../../Fragmentos/Select/SelectFrag";
import { fanios } from "../../../../../share/loadAnios";
import SelectValues from "../../../../../interfaces/Select/SelectValues";
import { RESPONSE } from "../../../../../interfaces/user/UserInfo";



export const MunFacturacion = () => {

  const [modo, setModo] = useState("");
  const [open, setOpen] = useState(false);
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [data, setData] = useState({});
  const [Facturacion, setFacturacion] = useState([]);
  const [plantilla, setPlantilla] = useState("");
  const [slideropen, setslideropen] = useState(false);
  const [anios, setAnios] = useState<SelectValues[]>([]);
  const user: RESPONSE = JSON.parse(String(getUser()));



  // VARIABLES PARA LOS FILTROS
  const [filterAnio, setFilterAnio] = useState("");

  //funciones
  const handleFilterMes = () => { };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Identificador",
      hide: true,
      width: 150,
      description: messages.dataTableColum.id,
    },
    {
      field: "idmunicipio",
      headerName: "idmunicipio",
      hide: true,
      width: 150,
    },
    { field: "ClaveEstado", headerName: "Clave Estado", width: 100 },
    { field: "Nombre", headerName: "Municipio", width: 220 },
    { field: "Anio", headerName: "Año", width: 150 },
    {
      field: "Facturacion",
      headerName: "Facturado",
      width: 150,
      align: "right",
      ...currencyFormatter
    },
    {
      field: "acciones",
      headerName: "Acciones",
      description: "Campo de Acciones",
      sortable: false,
      width: 200,
      renderCell: (v) => {
        return (
          <AccionesGrid handleEditar={handleEdit} handleBorrar={handleDelete} v={v} update={true} pdelete={true} />
        );
      },
    },
  ];

  const handleClose = (v: string) => {
   
    if (v === "close") {
      setOpen(false);
    }
    else if(v === "save") {
      setOpen(false);
      let data = {
        NUMOPERACION: 4,
        ANIO: filterAnio,
      };
      consulta(data);

    }


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
          CHUSER: user.id
        };
        console.log(data);

        CatalogosServices.munfacturacion(data).then((res) => {
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
    formData.append("tipo", "MunFacturacion");
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
    CatalogosServices.munfacturacion(data).then((res) => {
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
      NUMOPERACION: "MUNICIPIO_FACTURACION",
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
            options={anios} 
            onInputChange={handleFilterChange} 
            placeholder={"Seleccione Año"}/>
            </Box>

      {open ? (
        <MunFacturacionModal
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

      <MUIXDataGrid columns={columns} rows={Facturacion} />
    </div>
  );
};
