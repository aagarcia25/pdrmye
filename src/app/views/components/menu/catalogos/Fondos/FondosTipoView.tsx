import React, { useEffect, useState } from "react";
import {
    Box,
    Checkbox,
    Grid,
    Button,
    ButtonGroup,
} from "@mui/material";
import { GridColDef } from '@mui/x-data-grid';
import MUIXDataGridSimple from "../../../MUIXDataGridSimple";
import { Toast } from "../../../../../helpers/Toast";
import { AuthService } from "../../../../../services/AuthService";
import { AlertS } from "../../../../../helpers/AlertS";
import ModalForm from "../../../componentes/ModalForm";
import Slider from "../../../Slider";

const FondosTipoView = ({
    handleClose,
    dt,
}: {
    handleClose: Function;
    dt: any;
}) => {

    const [data, setData] = useState([]);
    const [openRel, setOpenRel] = useState(true);
    const [openSlider, setOpenSlider] = useState(true);
    const [descripcion, setDescripcion] = useState<string>();
    const [idFondo, setIdFondo] = useState<string>();

 
    const consulta = (data: any) => {
        AuthService.tipoCalculo(data).then((res) => {
            setData(res.RESPONSE);
            setOpenSlider(false);
        });

    };


    const handleChange = (v: any) => {

        if (openRel != true) {
            AuthService.tipoCalculo(
                {
                    NUMOPERACION: 1,
                    IDTIPOCALCULO: v?.row?.id,
                    IDFONDO: idFondo,
                }
            ).then((res) => {
                if (res.SUCCESS) {
                    Toast.fire({
                        icon: "success",
                        title: "Ajuste Asignado!",
                    });
                } else {
                    AlertS.fire({
                        title: "Error!",
                        text: res.STRMESSAGE,
                        icon: "error",
                    });
                }
            });
        }
        else {
            AuthService.tipoCalculo(
                {
                    NUMOPERACION: 3,
                    CHID: v?.row?.idrelacion,
                }
            ).then((res) => {
                if (res.SUCCESS) {
                    Toast.fire({
                        icon: "success",
                        title: "Ajuste Eliminado!",
                    });
                    consulta({
                        NUMOPERACION: 4,
                    });
                } else {
                    AlertS.fire({
                        title: "Error!",
                        text: res.STRMESSAGE,
                        icon: "error",
                    });
                }
            });
        }


    };



    const columns: GridColDef[] = [
        {
            field: "id",
            headerName: "Identificador",
            hide: true,
            width: 10,
        },
        {
            field: "idrelacion",
            hide: true,
        },
        
        {
            field: "acciones",
            headerName: "",
            description: "Relacionar",
            sortable: false,
            width: 10,
            renderCell: (v) => {
                return <Checkbox onChange={() => handleChange(v)} />;
            },
        },
        { field: "Descripcion", headerName: "Descripcion", width: 400 },
    ];


    const handleAjustesRel = () => {
        setOpenRel(true);
        consulta({ CHID: dt?.row?.id, NUMOPERACION: 4, });
    };

    const handleAjustesDis = () => {
        setOpenRel(false);
        consulta({ CHID: dt?.row?.id, NUMOPERACION: 5, });
    };

    useEffect(() => {
        handleAjustesRel();
        setDescripcion(dt?.row?.Descripcion);
        setIdFondo(dt?.row?.id);
    }, []);


    return (
        <div>
        
            <ModalForm title={"Tipo de Cálculos Relacionados"} handleClose={handleClose}>
            <Slider open={openSlider}></Slider>
                <Grid container
                    sx={{
                        mt: "2vh",
                        width: "100%",
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row",
                    }}
                >


                    <Grid container sm={12} sx={{ display: "flex", alignItems: "center", justifyContent: "center", }}>

                        <ButtonGroup variant="outlined" aria-label="outlined primary button group">
                            <Button
                                color={openRel?"info":"inherit"}
                                onClick={handleAjustesRel}
                            > Relacionados</Button>
                            <Button
                                color={openRel?"inherit":"info"}
                                onClick={handleAjustesDis}

                            >Disponibles Para Relacionar</Button>
                        </ButtonGroup>
                    </Grid>

                    <Grid
                        container
                        sx={{
                            display: "flex",
                            width: "100%",
                            height: "100%",
                            boxShadow: 50,
                            borderRadius: 3,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >

                        {openRel ?

                            <Grid container
                                sx={{
                                    textAlign: 'center',
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",

                                }}>
                                
                                <Grid item xs={12} >
                                    *Para Eliminar el Registro Seleccione la Casilla*
                                </Grid>
                            </Grid>
                            :
                            <Grid container
                                sx={{
                                    textAlign: 'center',
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",

                                }}>
                              
                                <Grid item xs={12}>
                                    *Para Asignar el Registro  Seleccione la Casilla*
                                </Grid>
                            </Grid>
                        }
                        <Box>

                            <br />
                            <label>{descripcion} </label>
                        </Box>

                        <Grid container sm={12} sx={{ alignItems: "center", justifyContent: "center", }}>

                            <Grid item xs={12} sx={{
                                width: "100%",
                                height: "60vh",
                            }}>
                                <MUIXDataGridSimple columns={columns} rows={data} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>



            </ModalForm>

        </div>

    )
}



export default FondosTipoView;
