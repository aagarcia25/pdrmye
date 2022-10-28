import React, { useEffect, useState } from 'react'
import { Box, Dialog, Grid } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid';
import { CatalogosServices } from '../../../services/catalogosServices';
import BotonesAPD from '../componentes/BotonesAPD'
import { Titulo } from '../menu/catalogos/Utilerias/AgregarCalculoUtil/Titulo';
import MUIXDataGrid from '../MUIXDataGrid';
import Slider from '../Slider';






const SolicitudRecursos = () => {
  const [solicitud, setSolicitud] = useState([]);

  const columns: GridColDef[] = [
    { field: "id", hide: true, },
    { field: "IdMunicipio", hide: true, },
    { field: "idPrincipal", hide: true, },
    { field: "ClaveEstado", headerName: "Clave Estado", width: 120 },
    { field: "Nombre", headerName: "Municipio", width: 250 },
    { field: "Descripcion", headerName: "Mes", width: 120 },
    { field: "Anio", headerName: "Año", width: 120 },
    { field: "Total", headerName: "Total", width: 100 },
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


  const handleAccion = (v: number) => {
    if (v == 1) {
    } else
      if (v == 2) {
      }  

  };
   useEffect(() => {
      let d = {
        MES: "",

      };


      CatalogosServices.SolicitudesInfo(d).then((res) => {
        setSolicitud(res.RESPONSE);
        console.log(res.RESPONSE)
      });
    }, []);
  return (
    <div style={{ height: 600, width: "80%" }}>
      <Box>

        <Slider open={false}></Slider>



        <Grid container spacing={2} sx={{ justifyContent: "center", }} >
          <Grid item xs={12}>
            <Box sx={{ display: "flex", justifyContent: "center", bgcolor: "rgb(245,245,245)" }}>
              <Titulo name={"Solicitud de Anticipo "} />
            </Box>
          </Grid>
        </Grid>
        <Grid
          container spacing={1}
          sx={{ display: "flex", justifyContent: "center", }} >

          <Grid item xs={1} sx={{ alignItems: "center", }} >

            <label className="subtitulo">{""}<br /><br /><br /></label>
          </Grid>
        </Grid>
        <Grid
          container spacing={1}
          sx={{ justifyContent: "center", width: "100%" }} >

          <Grid item xs={1} >
            <label className="subtitulo">{""} <br /><br /><br /></label>
          </Grid>
        </Grid>
        <Grid container
          sx={{ justifyContent: "center", width: '100%' }} >

          <Grid container>
            <Grid item xs={1} md={1} lg={1}>
              <BotonesAPD handleAccion={handleAccion} eliminar={false} />

            </Grid>



          </Grid>
          <MUIXDataGrid columns={columns} rows={solicitud} />
        </Grid>
      </Box>
    </div>
  )
}

export default SolicitudRecursos
