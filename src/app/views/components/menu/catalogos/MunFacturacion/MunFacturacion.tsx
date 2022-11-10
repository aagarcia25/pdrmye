import React, { useEffect, useState } from "react";

import {
  Box,
} from "@mui/material";

import { GridColDef } from "@mui/x-data-grid";
import {
  getPermisos,
  getUser,
} from "../../../../../services/localStorage";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import { messages } from "../../../../styles";
import ButtonsMunicipio from "../Utilerias/ButtonsMunicipio";

import Slider from "../../../Slider";
import { Toast } from "../../../../../helpers/Toast";
import { Alert } from "../../../../../helpers/Alert";
import Swal from "sweetalert2";
import MunFacturacionModal from "./MunFacturacionModal";
import MUIXDataGrid from "../../../MUIXDataGrid";
import { currencyFormatter } from "../../CustomToolbar";
import SelectFrag from "../../../Fragmentos/SelectFrag";
import { fanios } from "../../../../../share/loadAnios";
import SelectValues from "../../../../../interfaces/Select/SelectValues";
import { PERMISO, RESPONSE } from "../../../../../interfaces/user/UserInfo";
import BotonesAcciones from "../../../componentes/BotonesAcciones";



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
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [agregar, setAgregar] = useState<boolean>(false);
  const [editar, setEditar] = useState<boolean>(false);
  const [eliminar, setEliminar] = useState<boolean>(false);


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

          <BotonesAcciones handleAccion={handleAccion} row={v} editar={editar} eliminar={eliminar}></BotonesAcciones>



        );
      },
    },
  ];


  const handleAccion = (v: any) => {
    if(v.tipo ==1){
      setTipoOperacion(2);
      setModo("Editar ");
      setOpen(true);
      setData(v.data);
    }else if(v.tipo ==2){
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

        setFacturacion(res.RESPONSE);
    
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
      NUMOPERACION: "MUNICIPIO_FACTURACION",
    };

    CatalogosServices.descargaplantilla(data).then((res) => {
      setPlantilla(res.RESPONSE);
    });
  };

  useEffect(() => {
    setAnios(fanios());
    downloadplantilla();
    permisos.map((item: PERMISO) => {
      if (String(item.ControlInterno) === "MUNFA") {
        console.log(item)
        if (String(item.Referencia) == "ELIM") {
          setEliminar(true);
        }
        if (String(item.Referencia) == "EDIT") {
          setEditar(true);
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
          value={''}
          options={anios}
          onInputChange={handleFilterChange}
          placeholder={"Seleccione Año"} label={""} disabled={false} />
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

      <ButtonsMunicipio
        url={plantilla}
        handleUpload={handleUpload} controlInterno={"MUNFA"}      />

      <MUIXDataGrid columns={columns} rows={Facturacion} />
    </div>
  );
};
