import React, { useEffect, useState } from 'react'
import { Box, Dialog, Grid, IconButton, ToggleButton, Tooltip } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid';
import { CatalogosServices } from '../../../services/catalogosServices';
import BotonesAPD from '../componentes/BotonesAPD'
import { Titulo } from '../menu/catalogos/Utilerias/AgregarCalculoUtil/Titulo';
import MUIXDataGrid from '../MUIXDataGrid';
import Slider from '../Slider';
import AddIcon from '@mui/icons-material/Add';
import { SolicitudModal } from './SolicitudModal';
import VisibilityIcon from '@mui/icons-material/Visibility';






const SolicitudRecursos = () => {
  const [solicitud, setSolicitud] = useState([]);
  const [open, setOpen] = useState(false);
  const [modo, setModo] = useState("");
  const [data, setData] = useState({});


  const columns: GridColDef[] = [
    { field: "id", hide: true, },
    { field: "IdEstatus", hide: true, },
    { field: "IdArchivo", hide: true, },
    { field: "Concepto", headerName: "Concepto", width: 250 },
    { field: "Total", headerName: "Total", width: 120 },
    {
      field: "RutaArchivo", headerName: " Archivo", width: 120,
      renderCell: (v) => {
        return (
          <Box>
            {v.row.RutaArchivo ? 
            <IconButton onClick={() => handleVisualizar(v)}>
              <VisibilityIcon />
            </IconButton>
              : ""}

          </Box>
        );
      },
    },
    { field: "NombreArchivo", headerName: "Nombre Archivo", width: 300 },
    { field: "RutaSpei", headerName: " Spei", width: 120 },
    { field: "Descripcion", headerName: "Estatus", width: 120 },
    {
      field: "acciones",
      headerName: "Acciones",
      description: "Ver detalle de Cálculo",
      sortable: false,
      width: 150,
      renderCell: (v) => {
        return (
          <Box>

          </Box>
        );
      },
    },
  ];
  const handleClose = (v: any) => {
    setOpen(false);
    CatalogosServices.SolicitudesInfo({ NUMOPERACION: "4" }).then((res) => {
      setSolicitud(res.RESPONSE);
      console.log(res.RESPONSE)
    });
  };

  const Solicitar = () => {
    setOpen(true);
    setModo("");

  };
  const handleVisualizar = (v: any) => {
    setModo("ver");
    setOpen(true);
    setData(v.row);

  };

  useEffect(() => {
    let d = {
      NUMOPERACION: "4",

    };


    CatalogosServices.SolicitudesInfo(d).then((res) => {
      setSolicitud(res.RESPONSE);
      console.log(res.RESPONSE)
    });
  }, []);



  return (
    <div style={{ height: 600, width: "100%" }}>
      <Box>

        <Slider open={false}></Slider>



        <Grid container spacing={2} sx={{ justifyContent: "center", }} >
          <Grid item xs={12}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Titulo name={"Solicitud de Recurso "} />
            </Box>
          </Grid>
        </Grid>
        <Grid
          container spacing={1}
          sx={{ display: "flex", justifyContent: "center", }} >

        </Grid>
        <Grid
          container spacing={1}
          sx={{ justifyContent: "center", width: "100%" }} >

        </Grid>
        <Grid container
          sx={{ justifyContent: "center", width: '100%' }} >

          <Grid container>
            <Grid item xs={1} md={1} lg={1}>
              <Tooltip title={"Agregar"}>
                <ToggleButton value="check" onClick={() => Solicitar()}>
                  <AddIcon />
                </ToggleButton>
              </Tooltip>
            </Grid>



          </Grid>
          <MUIXDataGrid columns={columns} rows={solicitud} />
        </Grid>
      </Box>

      {open ?
        <SolicitudModal modo={modo} data={data} open={open} handleClose={handleClose} /> : ""}
    </div>
  )
}

export default SolicitudRecursos
