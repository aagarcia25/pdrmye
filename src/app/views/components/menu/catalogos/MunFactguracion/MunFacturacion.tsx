import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  LinearProgress,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { esES, GridColDef } from "@mui/x-data-grid";
import { DataGrid, GridColTypeDef } from "@mui/x-data-grid";

import { CustomNoRowsOverlay } from "../../CustomNoRowsOverlay";
import { CustomToolbar, Moneda } from "../../CustomToolbar";
import { getUser } from "../../../../../services/localStorage";
import { CatalogosServices } from "../../../../../services/catalogosServices";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { messages } from "../../../../styles";
import Filtros from "../Utilerias/Filtros";
import Buttons from "../Utilerias/Buttons";
import Slider from "../../../Slider";
import { Toast } from "../../../../../helpers/Toast";
import { Alert, AlertD } from "../../../../../helpers/Alert";




export const MunFacturacion = () => {
  const user = getUser();
  const [Facturacion, setFacturacion] = useState([]);
  const [plantilla, setPlantilla] = useState("");
  const [open, setOpen] = useState(false);
  const [slideropen, setslideropen] = useState(false);




  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Identificador",
      hide: true,
      width: 150,
      description: messages.dataTableColum.id,
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
            <IconButton onClick={() => handleOpen(v)}>
              <ModeEditOutlineIcon />
            </IconButton>
            <IconButton onClick={() => handleOpen(v)}>
              <DeleteForeverIcon />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  const handleOpen = (v: any) => {
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

 
  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setslideropen(true);
    let file = event?.target?.files?.[0] || '';
    const formData = new FormData();
    formData.append("inputfile",file,"inputfile");
    formData.append("tipo","MunFacturacion");
   
    CatalogosServices.migraData(formData).then((res) => {
      console.log(res);
      setslideropen(false);
    });



  }

  const handleFilterChange = (event: SelectChangeEvent) => {
     console.log(event.target.value);
    consulta(4, Number(event.target.value), 0);
}

  const DetailsModal = () => {
    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    );
  };

  const consulta = (
    numOperacion: Number,
    anio: Number,
    numpoblacion: Number
  ) => {
    let data = {
      NUMOPERACION: numOperacion,
      CHID: "1",
      ANIO: anio,
      NUMTOTALPOB: "",
      CHUSER: 1,
    };

    CatalogosServices.munfacturacion(data).then((res) => {
      console.log(res);
      setFacturacion(res.RESPONSE);
      Toast.fire({
        icon: "success",
        title: "Consulta Exitosamente",
        });

        AlertD.fire({
          title: 'Error!',
          text: 'Do you want to continue',
          icon: 'error',
        })


    });
  };

  const downloadplantilla= ()=>{
    let data = {
      NUMOPERACION: "MUNICIPIO_FACTURACION",
    };

    CatalogosServices.descargaplantilla(data).then((res) => {
      console.log(res);
      setPlantilla(res.RESPONSE);
    
    });

  };


  useEffect(() => {
    consulta(4, 2022, 0);
    downloadplantilla();
  }, []);

  return (
    <div style={{ height: 600, width: "100%" }}>
      <Slider open={slideropen} ></Slider>
      <DetailsModal />
      <Filtros handleFilterChange={handleFilterChange} />
      <Buttons handleOpen={handleOpen} url={plantilla} handleUpload={handleUpload} />


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


