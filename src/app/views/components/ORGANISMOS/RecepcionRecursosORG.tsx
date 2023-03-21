import {
    Box,
    Button,
    createTheme,
    Grid,
    IconButton,
    ThemeProvider,
    Tooltip,
    Typography,
} from "@mui/material";
import clsx from 'clsx';
import React, { useEffect, useState } from "react";
import SelectValues from "../../../interfaces/Select/SelectValues";
import { CatalogosServices } from "../../../services/catalogosServices";
import SelectFrag from "../Fragmentos/SelectFrag";
import SendIcon from "@mui/icons-material/Send";
import { AlertS } from "../../../helpers/AlertS";
import { Moneda } from "../menu/CustomToolbar";
import { PERMISO, RESPONSE } from "../../../interfaces/user/UserInfo";
import { getPermisos, getUser } from "../../../services/localStorage";
import { DPCPServices } from "../../../services/DPCPServices";
import { Toast } from "../../../helpers/Toast";
import Slider from "../Slider";
import {
    DataGrid,
    GridSelectionModel,
    GridToolbar,
    esES as gridEsES,
} from "@mui/x-data-grid";
import { esES as coreEsES } from "@mui/material/locale";
import FilePresentIcon from '@mui/icons-material/FilePresent';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import InfoIcon from "@mui/icons-material/Info";
import ModalForm from "../componentes/ModalForm";
import ParticipacionesDetalle from "../DAMOP/ParticipacionesDetalle";
import SpeisAdmin from "../DAF/SpeisAdmin";
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import CfdiAdmin from "../DAF/CfdiAdmin";
import { DAMOPServices } from "../../../services/DAMOPServices";
const RecepcionRecursosORG = () => {
    const theme = createTheme(coreEsES, gridEsES);
    const [slideropen, setslideropen] = useState(true);
    //MODAL
    //Constantes para llenar los select
    const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([]);

    const [tipos, setTipos] = useState<SelectValues[]>([]);
    const [checkboxSelection, setCheckboxSelection] = useState(true);
    const [vrows, setVrows] = useState<{}>("");
    //Constantes de los filtros
    const [idtipo, setIdTipo] = useState("");
    const [idFondo, setIdFondo] = useState("");
    const [idMunicipio, setidMunicipio] = useState("");
    //Constantes para las columnas
    const [data, setData] = useState([]);
    const user: RESPONSE = JSON.parse(String(getUser()));
    const [openModalDetalle, setOpenModalDetalle] = useState<boolean>(false);
    const [openVerSpei, setOpenVerSpei] = useState<boolean>(false);
    const [openVerCfdi, setOpenVerCfdi] = useState<boolean>(false);

    const [idORG, setidORG] = useState("");
    const [organismos, setOrganismos] = useState<SelectValues[]>([]);


    /// Permisos
    const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
    const handleDescuento = (data: any) => { };

    const handleAccion = () => { };


    const handleVerSpei = (data: any) => {
        setOpenVerSpei(true);
        setData(data.row);
    };

    const handleSubirCfdi = (data: any) => {
        setOpenVerCfdi(true);
        setData(data.row);
    };


    const handleClose = () => {
        setOpenModalDetalle(false);
        setOpenVerSpei(false);
        setOpenVerCfdi(false);
        handleClick("");
    };

    const handleDetalle = (data: any) => {
        setVrows(data);
        setOpenModalDetalle(true);

    };
    const columnsParticipaciones = [
        { field: "id", hide: true },
        // {
        //     field: "Detalle",
        //     disableExport: true,
        //     headerName: "Ver Detalle",
        //     description: "Ver Detalle",
        //     sortable: false,
        //     width: 100,
        //     renderCell: (v: any) => {
        //         return (
        //             <Box>
        //                 {v.row.detalle === 1 ? (
        //                     <Tooltip title="Ver Detalle del Registro">
        //                         <IconButton onClick={() => handleDetalle(v)}>
        //                             <InfoIcon />
        //                         </IconButton>
        //                     </Tooltip>
        //                 ) : (
        //                     ""
        //                 )}
        //             </Box>
        //         );
        //     },
        // },
        {
            field: "acciones",
            disableExport: true,
            headerName: "Acción",
            description: "Acción",
            sortable: false,
            width: 150,
            renderCell: (v: any) => {
                return (
                    <Box>
                        {/* {v.row.estatusCI === "DAF_SPEI" || v.row.estatusCI === "MUN_CFDI" ? */}
                        <Tooltip title="Subir CFDI">
                            <IconButton onClick={() => handleSubirCfdi(v)}>
                                <DriveFolderUploadIcon />
                            </IconButton>
                        </Tooltip>
                        {/* : ""} */}
                        {/* {v.row.estatusCI === "DAF_SPEI" || v.row.estatusCI === "MUN_CFDI" ? */}
                        <Tooltip title="Administración SPEI">
                            <IconButton onClick={() => handleVerSpei(v)}>
                                <FolderOpenIcon />
                            </IconButton>
                        </Tooltip>
                        {/* : ""} */}
                    </Box>
                );
            },
        },
        {
            field: "NumOrdenPago",
            headerName: "NumOrdenPago",
            width: 100,
            description: "NumOrdenPago",
        },
        {
            field: "NumProyecto",
            headerName: "NumProyecto",
            width: 100,
            description: "NumProyecto",
        },

        {
            field: "NumEgreso",
            headerName: "Num Egreso",
            width: 100,
            description: "Num Egreso",
        },
        {
            field: "NumCheque",
            headerName: "Num Cheque",
            width: 150,
            description: "Num Cheque",
        },
        {
            field: "total",
            headerName: "Total",
            description: "Total",
            width: 200,
        },

        {
            field: "Organismo",
            headerName: "Organismo",
            width: 400,
            description: "Organismo",
        },

    ];

    // "id"
    // "Anio"
    // "numMes"
    // "Observaciones"
    // ""
    // ""
    // ""
    // ""
    // "Cuenta"
    // "TipoSolicitud"
    // "IdConCheque"
    // "ConCheque"
    // "Organismo"
    // "IdOrg"
    // "UResponsable"
    // "IdUres"
    // "Mes"
    // "Divisa"

    const loadFilter = (tipo: number) => {
        let data = { NUMOPERACION: tipo };
        CatalogosServices.SelectIndex(data).then((res) => {
            if (tipo === 27) {
                setOrganismos(res.RESPONSE);
                setslideropen(false);
            }
        });
    };

    const handleFiltroORG = (v: string) => {
        setidORG(v);
    };

    const handleClick = (id: string) => {
        setslideropen(true);
console.log("id:  "+id);
        let data = {
            NUMOPERACION: user.DEPARTAMENTOS[0]?.NombreCorto === "ORG" ? 6 : 4,
            P_IDORG: idORG === "false" ? "" : id===""?idORG: id,
            // DEP: user.[0]?.id ? "MUN" : ""
        };
        DAMOPServices.indexCabecera(data).then((res) => {
            if (res.SUCCESS) {
                setData(res.RESPONSE)
                setslideropen(false)

            } else {
                AlertS.fire({
                    title: "Error!",
                    text: "Error!",
                    icon: "error",
                });
                setslideropen(false)

            }
        });
    };

    useEffect(() => {

        if (user.DEPARTAMENTOS[0]?.NombreCorto !== "ORG") {
            loadFilter(27);
        } else if (user.DEPARTAMENTOS[0]?.NombreCorto === "ORG") {
            // setidORG(user.DEPARTAMENTOS[0]?.NombreCorto === "ORG" ? user.ORG[0]?.id : "")
            handleClick(user.DEPARTAMENTOS[0]?.NombreCorto === "ORG" ? user.ORG[0]?.id : "")

        }



    }, []);

    return (
        <div>
            <Slider open={slideropen}></Slider>

            {openModalDetalle ? (
                <ModalForm title={"Detalles de Registro"} handleClose={handleClose}>
                    <ParticipacionesDetalle
                        data={vrows} />
                </ModalForm>
            ) : (
                ""
            )}


            <Grid container spacing={1} padding={2}>
                <Grid container spacing={1} item xs={12} sm={12} md={12} lg={12}>
                    <Grid container sx={{ justifyContent: "center" }}>
                        <Grid item xs={10} sx={{ textAlign: "center" }}>
                            <Typography variant="h4" paddingBottom={2}>
                                Recepción de Recursos de Organismos
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>

                {user.DEPARTAMENTOS[0]?.NombreCorto !== "ORG" ?
                    <>
                        <Grid container spacing={1} item xs={12} sm={12} md={12} lg={12}>
                            <Grid item xs={13} sm={12} md={8} lg={6}>
                                <Typography sx={{ fontFamily: "MontserratMedium" }}>
                                    Organismos:
                                </Typography>
                                <SelectFrag
                                    value={idORG}
                                    options={organismos}
                                    onInputChange={handleFiltroORG}
                                    placeholder={"Seleccione Un Organismo"}
                                    label={""}
                                    disabled={false}
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} paddingBottom={2}>
                            <Button
                                onClick={()=>handleClick("")}
                                variant="contained"
                                color="success"
                                endIcon={<SendIcon sx={{ color: "white" }} />}
                            >
                                <Typography sx={{ color: "white" }}> Buscar </Typography>
                            </Button>
                        </Grid>
                    </>
                    :
                    ""
                }

                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <div
                        style={{
                            height: "58vh",
                            width: "100%",
                        }}
                    >
                        <ThemeProvider theme={theme}>
                            <DataGrid
                                columns={columnsParticipaciones}
                                rows={data}
                                density="compact"
                                rowsPerPageOptions={[10, 25, 50, 100]}
                                disableSelectionOnClick
                                disableColumnFilter
                                disableColumnSelector
                                disableDensitySelector
                                getRowHeight={() => "auto"}
                                // getRowClassName={(params) =>
                                //   {
                                //     if (params.row.Presupuesto == null) {
                                //       return '';
                                //     }
                                //     return clsx('super-app', {
                                //       negative: params.row.Presupuesto !== params.row.total,
                                //       positive: params.row.Presupuesto == params.row.total,
                                //     });
                                //   }
                                // } 
                                components={{ Toolbar: GridToolbar }}
                                sx={{
                                    fontFamily: "Poppins,sans-serif", fontWeight: '600',
                                    //   '& .super-app.negative': {
                                    //     color: "rgb(84, 3, 3)",
                                    //     backgroundColor: "rgb(196, 40, 40, 0.384)",
                                    //   },
                                    //   '& .super-app.positive': {
                                    //     backgroundColor: 'rgb(16, 145, 80, 0.567)',

                                    //   },
                                }}
                                componentsProps={{
                                    toolbar: {
                                        label: "buscar",
                                        showQuickFilter: true,
                                        quickFilterProps: { debounceMs: 500 },
                                        csvOptions: {
                                            fileName: 'Export',
                                            utf8WithBom: true,
                                        }
                                    },
                                }}
                                checkboxSelection={checkboxSelection}
                                onSelectionModelChange={(newSelectionModel: any) => {
                                    setSelectionModel(newSelectionModel);
                                }}
                                selectionModel={selectionModel}
                                localeText={{
                                    noRowsLabel: "No se ha encontrado datos.",
                                    noResultsOverlayLabel: "No se ha encontrado ningún resultado",
                                    toolbarColumns: "Columnas",
                                    toolbarExport: "Exportar",
                                    toolbarColumnsLabel: "Seleccionar columnas",
                                    toolbarFilters: "Filtros",
                                    toolbarFiltersLabel: "Ver filtros",
                                    toolbarFiltersTooltipHide: "Quitar filtros",
                                    toolbarFiltersTooltipShow: "Ver filtros",
                                    toolbarQuickFilterPlaceholder: "Buscar",
                                    toolbarExportCSV: 'Descargar como CSV',
                                    toolbarExportPrint: 'Imprimir',
                                    checkboxSelectionSelectRow: "Filas seleccionadas",
                                    checkboxSelectionSelectAllRows: 'Seleccionar todas las filas',
                                    errorOverlayDefaultLabel: 'Ha ocurrido un error.',
                                    footerRowSelected: (count) =>
                                        count > 1 ?
                                            `${count.toLocaleString()} filas seleccionadas`
                                            :
                                            `${count.toLocaleString()} fila seleccionada`,
                                    footerTotalRows: 'Filas Totales:',
                                    columnMenuLabel: 'Menú',
                                    columnMenuShowColumns: 'Mostrar columnas',
                                    columnMenuFilter: 'Filtro',
                                    columnMenuHideColumn: 'Ocultar',
                                    columnMenuUnsort: 'Desordenar',
                                    columnMenuSortAsc: 'Ordenar ASC',
                                    columnMenuSortDesc: 'Ordenar DESC',
                                    columnHeaderFiltersTooltipActive: (count) =>
                                        count > 1 ? `${count} filtros activos` : `${count} filtro activo`,
                                    columnHeaderFiltersLabel: 'Mostrar filtros',
                                    columnHeaderSortIconLabel: 'Ordenar',
                                }}
                            />
                        </ThemeProvider>
                    </div>
                </Grid>
            </Grid>
            {openVerSpei ?
                <SpeisAdmin handleClose={handleClose} handleAccion={handleAccion} vrows={data} />
                : ""}
            {openVerCfdi ?
                <CfdiAdmin handleClose={handleClose} handleAccion={handleAccion} vrows={data} />
                : ""}

        </div>
    );
};

export default RecepcionRecursosORG;
