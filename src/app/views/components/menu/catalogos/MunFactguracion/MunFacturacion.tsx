import React, { useEffect, useState } from "react";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";

import { esES, GridColDef } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import { CustomNoRowsOverlay } from "../../CustomNoRowsOverlay";
import { CustomToolbar, Moneda } from "../../CustomToolbar";
import {
  getMunicipios,
  getUser,
  setMunicipios,
  validaLocalStorage,
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

import { Imunicipio } from "../../../../../interfaces/municipios/FilterMunicipios";

export const MunFacturacion = () => {
  
  
  const user = getUser();

  const [tipoOperacion, setTipoOperacion]  = useState(0);
  const [modo, setModo]                    = useState("");
  const [Facturacion, setFacturacion]      = useState([]);
  const [plantilla, setPlantilla]          = useState("");
  const [open, setOpen]                    = useState(false);
  const [slideropen, setslideropen]        = useState(false);
  // CAMPOS DE LOS FORMULARIOS
  const [id, setId]                        = useState("");
  const [anio, setAnio]                    = useState("");
  const [fac, setFac]                      = useState("");
  const [idMunicipio, setIdmunicipio]      = useState("");
  //valor del filtro municipio
  const [values, setValues]                = useState<Imunicipio[]>();
  const [filterAnio, setFilterAnio]        = useState("");

  //funciones
  const handleFilterMes = () => {
   
  };

  const onChangeAnio = (v: string) => {
    setAnio(v);
  };

  const onChangeFact = (v: string) => {
    setFac(v);
  };

  const agregar = (data: any) => {
    CatalogosServices.munfacturacion(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Registro Agregado!",
        });

        handleClose();

      } else {
        Alert.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };

  const editar = (data: any) => {
    CatalogosServices.munfacturacion(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Registro Editado!",
        });
        handleClose();
      } else {
        Alert.fire({
          title: "Error!",
          text: res.STRMESSAGE,
          icon: "error",
        });
      }
    });
  };

  const eliminar = (data: any) => {
    CatalogosServices.munfacturacion(data).then((res) => {
      if (res.SUCCESS) {
        Toast.fire({
          icon: "success",
          title: "Registro Eliminado!",
        });
        handleClose();
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

  const handleClose = () => {
    setOpen(false);
  };

  const municipiosc = () => {
    let data = {};
    if (!validaLocalStorage("FiltroMunicipios")) {
      CatalogosServices.Filtromunicipios(data).then((res) => {
        setMunicipios(res.RESPONSE);
      });
    }
    let m: Imunicipio[] = JSON.parse(getMunicipios() || "");
    setValues(m);
  };

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
    { field: "Nombre", headerName: "Municipio", width: 150 },
    { field: "Anio", headerName: "Año", width: 150 },
    {
      field: "Facturacion",
      headerName: "Facturado",
      width: 150,
      ...Moneda,
      align: "right",
    },
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

  const handleOpen = (v: any) => {
    setModo("Agregar Registro");
    setOpen(true);
    setTipoOperacion(1);
    setId("");
    setIdmunicipio("");
    setAnio("");
    setFac("");
  };

  const handleEdit = (v: any) => {
    setModo("Editar Registro");
    setOpen(true);
    setTipoOperacion(2);
    setId(v.row.id);
    setIdmunicipio(v.row.idmunicipio);
    setAnio(v.row.Anio);
    setFac(v.row.Facturacion);
  };

  const handleSend = () => {
    if (fac == "") {
      Alert.fire({
        title: "Error!",
        text: "Favor de Completar los Campos",
        icon: "error",
      });
    } else {
      let data = {
        NUMOPERACION: tipoOperacion,
        CHID: id,
        CHUSER: 1,
        ANIO: anio,
        IDMUNICIPIO: idMunicipio,
        FACTURACION: fac,
      };

      handleRequest(data);
    }
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
        setTipoOperacion(3);
        setId(v.row.id);
        setIdmunicipio(v.row.idmunicipio);
        setAnio(v.row.Anio);
        setFac(v.row.Facturacion);

        let data = {
          NUMOPERACION: tipoOperacion,
          CHID: id,
          CHUSER: 1,
        };
        console.log(data);
        handleRequest(data);
      } else if (result.isDenied) {
        Swal.fire("No se realizaron cambios", "", "info");
      }
    });
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setslideropen(true);
    let file = event?.target?.files?.[0] || "";
    const formData = new FormData();
    formData.append("inputfile", file, "inputfile");
    formData.append("tipo", "MunFacturacion");
    CatalogosServices.migraData(formData).then((res) => {
      setslideropen(false);
    });
  };

  const handleFilterMunicipiosChange = (v: string) => {
    setIdmunicipio(v);
  };

  const handleFilterChange = (event: SelectChangeEvent) => {
    setTipoOperacion(4);
    setFilterAnio(event.target.value);
    let data = {
      NUMOPERACION: tipoOperacion,
      ANIO: event.target.value,
    };
    handleRequest(data);
  };

  const DetailsModal = () => {
    return (
      <Dialog open={open}>
        <DialogTitle>{modo}</DialogTitle>
        <DialogContent>
          <Box>
            <FormControl variant="standard" fullWidth>
              <InputLabel>Municipio</InputLabel>
              <Select
                required
                onChange={(v) => handleFilterMunicipiosChange(v.target.value) }
                value={idMunicipio}
                label="Municipio"
                inputProps={{
                  readOnly: tipoOperacion == 1 ? false : true,
                }}
              >
                {values?.map((item: Imunicipio) => {
                  return (
                    <MenuItem key={item.id} value={item.id}>
                      {item.Nombre}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            <TextField
              required
              margin="dense"
              id="anio"
              label="Año"
              value={anio}
              type="number"
              fullWidth
              variant="standard"
              onChange={(v) => onChangeAnio(v.target.value)}
              error={anio == "" ? true : false}
              InputProps={{
                readOnly: tipoOperacion == 1 ? false : true,
                inputMode: "numeric",
              }}
            />

            <TextField
              margin="dense"
              required
              id="fac"
              label="Facturación"
              value={fac}
              type="number"
              fullWidth
              variant="standard"
              onChange={(v) => onChangeFact(v.target.value)}
              error={fac == "" ? true : false}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => handleSend}>Guardar</Button>
          <Button onClick={() => handleClose}>Cancelar</Button>
        </DialogActions>
      </Dialog>
    );
  };

  const handleRequest = (data: any) => {
    setslideropen(true);
    console.log(data);
    if (tipoOperacion == 1) {
      //AGREGAR
      agregar(data);
    } else if (tipoOperacion == 2) {
      //EDITAR
      editar(data);
    } else if (tipoOperacion == 3) {
      //ELIMINAR
      eliminar(data);
    } else if (tipoOperacion == 4) {
      //CONSULTAR
      consulta(data);
    }
    setslideropen(false);
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
    downloadplantilla();
    municipiosc();
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
      <DetailsModal />
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
