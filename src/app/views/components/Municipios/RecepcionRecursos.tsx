import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { ta } from 'date-fns/locale';
import { Button, ButtonGroup, Grid } from '@mui/material';
import MUIXDataGrid from '../MUIXDataGrid';
import { GridColDef } from '@mui/x-data-grid';


const RecepcionRecursos = () => {

  const columns: GridColDef[] = [
    {
      field: "id",
      hide: true,

    },
    {
      field: "acciones",
      headerName: "Acciones",
      description: "Campo de Acciones",
      sortable: false,
      width: 200,
      renderCell: (v) => {
        return (
          <>
            {/* <Box>
              {fideicomiso ? (
                <Tooltip title={"Visualizar Fideicomisos"}>
                  <IconButton onClick={() => handleFideicomiso(v)}>
                    <RequestQuoteIcon />
                  </IconButton>
                </Tooltip>
              ) : (
                ""
              )}
              {viewCC ? (
                <Tooltip title={"Visualizar Cuenta Bancaria"}>
                  <IconButton onClick={() => handleCC(v)}>
                    <AccountBalanceWalletIcon />
                  </IconButton>
                </Tooltip>
              ) : (
                ""
              )}
              {viewUR ? (
                <Tooltip title={"Visualizar Usuario Responsable"}>
                  <IconButton onClick={() => handleUR(v)}>
                    <ManageAccountsIcon />
                  </IconButton>
                </Tooltip>
              ) : (
                ""
              )}
            </Box> */}
            <Box>
              {/* <BotonesAcciones
                handleAccion={handleAccion}
                row={v}
                editar={editar}
                eliminar={eliminar}
              ></BotonesAcciones> */}
            </Box>
          </>
        );
      },
    },
    { field: "FechaCreacion", headerName: "Fecha Creación", width: 150 },
    { field: "ClaveEstado", headerName: "Clave Estado", width: 120 },
    { field: "Nombre", headerName: "Municipio", width: 250 },

    { field: "NombreCorto", headerName: "Nombre Corto", width: 250 },
    { field: "OrdenSFTGNL", headerName: "Orden SFTGNL", width: 120 },
    { field: "ClaveSIREGOB", headerName: "Clave SIREGOB", width: 120 },
    { field: "ClaveINEGI", headerName: "Clave INEGI", width: 120 },
    {
      field: "MAM",
      headerName: "Área Metropolitana",
      width: 100,
      renderCell: (v) => {
        return v.row.MAM === 1 ? "SI" : "NO";
      },
    },
    {
      field: "Descentralizado",
      headerName: "Descentralizado",
      width: 100,
      renderCell: (v) => {
        return v.row.Descentralizado === 1 ? "SI" : "NO";
      },
    },
    {
      field: "ArtF1",
      headerName: "ARTF1",
      width: 100,
      renderCell: (v) => {
        return v.row.ArtF1 === "1" ? "SI" : "NO";
      },
    },
    {
      field: "ArtF2",
      headerName: "ARTF2",
      width: 100,
      renderCell: (v) => {
        return v.row.ArtF2 === "1" ? "SI" : "NO";
      },
    },
    {
      field: "ArtF3",
      headerName: "ARTF3",
      width: 100,
      renderCell: (v) => {
        return v.row.ArtF3 === "1" ? "SI" : "NO";
      },
    },
  ];

  const [recursoButton, setRecursoButton] = useState("");

  const handleAjustesRel = (v: string) => {
    setRecursoButton(v)

  };

  return (
    <div>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <Grid container sm={12} sx={{ display: "flex", alignItems: "center", justifyContent: "center", }}>

          <ButtonGroup variant="outlined" aria-label="outlined primary button group">
            
            <Button className='subtitulo'  color={recursoButton == "PF" ? "secondary" : "inherit"} onClick={() => handleAjustesRel("PF")}> 
             Participaciones Federales 
             </Button>
            <Button className='subtitulo' color={recursoButton == "PE" ? "secondary" : "inherit"} onClick={() => handleAjustesRel("PE")}>
              Participaciones Estatales
            </Button>
            <Button className='subtitulo' color={recursoButton == "AF" ? "secondary" : "inherit"} onClick={() => handleAjustesRel("AF")}>
              Aportaciones Federales
            </Button>
            <Button className='subtitulo' color={recursoButton == "AE" ? "secondary" : "inherit"} onClick={() => handleAjustesRel("AE")}>
              Aportaciones Estatales
            </Button>
          </ButtonGroup>
        </Grid>

        <Grid container>
          <Grid item xs={12} textAlign="center">
            {recursoButton}
            <MUIXDataGrid sx={{}} columns={columns} rows={{}} />
          </Grid>
        </Grid>

      </Box>
    </div>
  )
}

export default RecepcionRecursos
