import { useState } from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Tooltip } from '@mui/material';
import { AlertS } from '../../../helpers/AlertS';
import ModalForm from '../componentes/ModalForm';
import MUIXDataGridMun from '../MUIXDataGridMun';
import { GridColDef } from '@mui/x-data-grid';
import ButtonsAdd from '../menu/catalogos/Utilerias/ButtonsAdd';
import CloseIcon from '@mui/icons-material/Close';
import UploadFileIcon from '@mui/icons-material/UploadFile';
const SpeisAdmin = ({
    handleClose,
    handleAccion,
    vrows,
}: {
    handleClose: Function;
    handleAccion: Function;
    vrows: any;
}) => {



    const [mensaje, setMensaje] = useState<string>();
    const [addSpei, setAddSpei] = useState<boolean>(false);

    const columns: GridColDef[] = [
        { field: "id", headerName: "Identificador", hide: true, width: 150, },
        {
            field: "idmunicipio",
            headerName: "idmunicipio",
            hide: true,
            width: 150,
        },
        {
            field: "acciones", disableExport: true,
            headerName: "Acciones",
            description: "Campo de Acciones",
            sortable: false,
            width: 100,
            renderCell: (v) => {
                return (
                    //   <BotonesAcciones handleAccion={handleAccion} row={v} editar={editar} eliminar={eliminar}></BotonesAcciones>
                    <></>
                );
            },
        },
        { field: "FechaCreacion", headerName: "Fecha Creación", description: "Fecha Creación", width: 180 },
        { field: "ClaveEstado", headerName: "Clave Estado", description: "Clave Estado", width: 100 },
        { field: "Nombre", headerName: "Municipio", description: "Municipio", width: 150 },
        { field: "anio", headerName: "Año", description: "Año", width: 150 },
        { field: "Pob", headerName: "Población", description: "Población", width: 150 },


    ];

    const handleBorrarMasivo = (v: string) => {
    };
    const enCambioFile = (event: any) => {
    };
    const handleCloseModal = () => {
        setAddSpei(false);
    };

    const handleAgregarSpei = (v: string) => {

        setAddSpei(true);
    };

    const validacion = () => {
        if (mensaje === "" || mensaje === null) {
            AlertS.fire({
                title: "Error!",
                text: "Favor de llenar el campo Comentarios*",
                icon: "error",
            });
        } else {
            handleAccion({ data: vrows, texto: mensaje })
        }

    }



    return (
        <>
            <ModalForm title={'Administración de  los Spei'} handleClose={handleClose}>
                <Box>
                    <ButtonsAdd handleOpen={handleAgregarSpei} agregar={true} />
                    <Grid item xs={12}>
                        <MUIXDataGridMun modulo={''} handleBorrar={handleBorrarMasivo} columns={columns} rows={[]} controlInterno={''} />
                    </Grid>
                </Box>
            </ModalForm>



            {addSpei ?
                <Dialog open={true}>
                    <Grid container item justifyContent="space-between" xs={12}>
                        <DialogTitle>Agregar Spei</DialogTitle>
                        <Tooltip title="Cerrar">
                                    <IconButton onClick={() => handleCloseModal()}  >
                                        <CloseIcon />
                                    </IconButton>
                                </Tooltip>
                    </Grid>
                    <DialogContent dividers={true}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <h3>Nombre de archivo:</h3>
                            </Grid>
                            <Grid item container justifyContent="center" xs={12}>
                                <Tooltip title="Click para cargar un archivo">
                                    <IconButton  >
                                        <input
                                            id="imagencargada"
                                            accept="pdf"
                                            onChange={(v) => { enCambioFile(v) }}
                                            type="file"
                                            style={{ zIndex: 2, opacity: 0, width: '100%', height: '80%', position: "absolute", cursor: "pointer", }} /
                                        >
                                        <UploadFileIcon sx={{ width: "100%", height: "100%", }} />
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <button className="guardar" onClick={() => handleCloseModal()}> Guardar </button>
                    </DialogActions>
                </Dialog>
                : ""}
        </>

    )
}

export default SpeisAdmin
