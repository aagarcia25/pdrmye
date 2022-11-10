import React, { useEffect, useState } from "react";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { Moneda } from "../../CustomToolbar";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { messages } from "../../../../styles";
import ButtonsMunicipio from "../Utilerias/ButtonsMunicipio";

import Slider from "../../../Slider";
import { Toast } from "../../../../../helpers/Toast";
import { Alert } from "../../../../../helpers/Alert";
import Swal from "sweetalert2";
import MunRecaudacionModal from "./MunRecaudacionModal";
import MUIXDataGrid from "../../../MUIXDataGrid";
import SelectFrag from "../../../Fragmentos/SelectFrag";
import SelectValues from "../../../../../interfaces/Select/SelectValues";
import { fanios } from "../../../../../share/loadAnios";
import { PERMISO, RESPONSE } from "../../../../../interfaces/user/UserInfo";
import { getPermisos, getUser } from "../../../../../services/localStorage";
import AccionesGrid from "../Utilerias/AccionesGrid";
import BotonesAcciones from "../../../componentes/BotonesAcciones";

export const MunRecaudacion = () => {
  const [open, setOpen] = useState(false);
  const [tipoOperacion, setTipoOperacion] = useState(0);
  const [data, setData] = useState({});
  const [Facturacion, setFacturacion] = useState([]);
  const [plantilla, setPlantilla] = useState("");
  const [slideropen, setslideropen] = useState(false);
  const user: RESPONSE = JSON.parse(String(getUser()));
  const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
  const [agregar, setAgregar] = useState<boolean>(false);
  const [editar, setEditar] = useState<boolean>(false);
  const [eliminar, setEliminar] = useState<boolean>(false);
  const [modo, setModo] = useState("");
  const [nombreMenu, setNombreMenu] = useState("");

  // VARIABLES PARA LOS FILTROS
  const [filterAnio, setFilterAnio] = useState("");
  const [anios, setAnios] = useState<SelectValues[]>([]);
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
    { field: "ClaveEstado", headerName: "Clave Estado", width: 100 },
    { field: "Nombre", headerName: "Municipio", width: 400 },
    { field: "Anio", headerName: "Año", width: 100 },
    { field: "Recaudacion", headerName: "Recaudacion", width: 150, ...Moneda },


  ];

  const handleAccion = (v: any) => {
    if (v.tipo == 1) {
      setTipoOperacion(2);
      setModo("Editar ");
      setOpen(true);
      setData(v.data);
    } else if (v.tipo == 2) {
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
      NUMOPERACION: "MUNICIPIO_RECAUDACION",
    };

    CatalogosServices.descargaplantilla(data).then((res) => {
      setPlantilla(res.RESPONSE);
    });
  };

  useEffect(() => {
    permisos.map((item: PERMISO) => {
      if (String(item.ControlInterno) === "MUNRECAU") {
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

      <Box
        sx={{ display: 'flex', flexDirection: 'row-reverse', }}>
        <SelectFrag
          value={''}
          options={anios}
          onInputChange={handleFilterChange}
          placeholder={"Seleccione Año"} label={""} disabled={false} />
      </Box>


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
        handleUpload={handleUpload} controlInterno={"MUNRECAU"} />
      <MUIXDataGrid columns={columns} rows={Facturacion} />
    </div>
  );
};
