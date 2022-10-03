import { useEffect, useState } from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import { CatalogosServices } from '../../../../../services/catalogosServices'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import MUIXDataGrid from '../../../MUIXDataGrid'

export const Departamentos = () => {



  const [conDepartamentos, setDepartamentos] = useState([]);

  const [open, setOpen] = useState(false);

  const columns: GridColDef[] = [


    { field: "NombreCorto", headerName: "Nombre Corto", width: 100 },
    { field: "Descripcion", headerName: "Descripcion", width: 600 },
    { field: "Responsable", headerName: "Responsable", width: 150 },

    {
      field: "acciones", headerName: "Acciones", description: "Campo de Acciones", sortable: false, width: 200, renderCell: (v) => {
        return (
          <Box>

            <ModeEditOutlineIcon />
            <IconButton >
              <DeleteForeverIcon />
            </IconButton>
          </Box>
        );
      },
    },

  ];
  const Descargar = (v: any) => {


  };



  const handleOpen = (v: any) => {
    //setSelectedId(v.row.lastName);

    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const ButtonAdd = () => {
    return (
      <Box>
        <IconButton color="primary" aria-label="upload picture" component="label" onClick={() => handleOpen(1)}>
          <AddIcon />
        </IconButton>
      </Box>
    );
  }


  const DetailsModal = () => {
    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="text"
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


  let data = ({
    NUMOPERACION: 4,
    CHID: "",
    NUMANIO: "",
    NUMTOTALPOB: "",
    CHUSER: 1
  })


  useEffect(() => {
    CatalogosServices.departamentos(data).then((res) => {
      //  console.log(res);
      setDepartamentos(res.RESPONSE);
    });
  }, []);






  return (


    <div style={{ height: 600, width: "100%" }} >
      <DetailsModal />
      <ButtonAdd />

      <MUIXDataGrid columns={columns} rows={conDepartamentos} />

      
    </div>


  )
}

