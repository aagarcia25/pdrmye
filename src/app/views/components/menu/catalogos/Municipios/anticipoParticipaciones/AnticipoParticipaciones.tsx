import { useEffect, useState } from "react";
import { Box, Grid, IconButton, ToggleButton, Tooltip } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { PERMISO, RESPONSE } from "../../../../../../interfaces/user/UserInfo";
import { CatalogosServices } from "../../../../../../services/catalogosServices";
import { getPermisos, getUser } from "../../../../../../services/localStorage";
import MUIXDataGrid from "../../../../MUIXDataGrid";
import InfoIcon from "@mui/icons-material/Info";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import InsightsIcon from "@mui/icons-material/Insights";
import { DetalleAnticipoParticipaciones } from "./DetalleAnticipoParticipaciones";
import FileCopyIcon from '@mui/icons-material/FileCopy';
import Swal from "sweetalert2";
import { Toast } from "../../../../../../helpers/Toast";
import { AlertS } from "../../../../../../helpers/AlertS";
import { Titulo } from "../../Utilerias/AgregarCalculoUtil/Titulo";
import ButtonsMunicipio from "../../Utilerias/ButtonsMunicipio";
import DoneIcon from '@mui/icons-material/Done';
import SendIcon from '@mui/icons-material/Send';
import TrazabilidadSolicitud from "../../../../TrazabilidadSolicitud";
import { AnticipoParticipacionesAtenderModal } from "./AnticipoParticipacionesAtenderModal";


export const AnticipoParticipaciones = () => {
    const permisos: PERMISO[] = JSON.parse(String(getPermisos()));
    const [open, setOpen] = useState<boolean>(false);
    const [openAtender, setOpenAtender] = useState<boolean>(false);

    const [eliminar, setEliminar] = useState<boolean>(false);
    const [agregar, setAgregar] = useState<boolean>(false);
    const [importPlant, setImportPlant] = useState<boolean>(false);
    const [openTraz, setOpenTraz] = useState(false);
    const [idSolicitud, setIdSolicitud] = useState<string>();
    const [verTrazabilidad, setVerTrazabilidad] = useState<boolean>(false);
    const [idPrincipal, setIdPrincipal] = useState("");
    const [APC, setAPC] = useState([]);
    const [departamento, setDepartamento] = useState<string>();
    const [perfil, setPerfil] = useState<string>();
    const [data, setData] = useState({});
    const user: RESPONSE = JSON.parse(String(getUser()));
    var hoy = new Date()


    const perfiles = [
        { estatusRef: 'DAMOP_AUT_ANA', accion: 'enviar', per: 'ANA', dep: "DAMOP", estatus: 'DAMOP_ANA_ENV_COOR' },
        { estatusRef: 'DAMOP_AUT_COOR', accion: 'enviar', per: 'COOR', dep: "DAMOP", estatus: 'DAMOP_COOR_ENV_DIR' },
        { estatusRef: 'DAMOP_AUT_DIR', accion: 'enviar', per: 'DIR', dep: "DAMOP", estatus: 'DAMOP_DIR_ENV_ DCCP' },
        { estatusRef: 'DAMOP_INICIO', accion: 'autorizar', per: 'ANA', dep: "DAMOP", estatus: 'AUTORIZAR' },
        { estatusRef: 'INICIO', accion: 'autorizar', per: 'ANA', dep: "DAMOP", estatus: 'AUTORIZAR' },
        { estatusRef: 'DAMOP_ANA_ENV_COOR', accion: 'autorizar', per: 'COOR', dep: "DAMOP", estatus: 'AUTORIZAR' },
        { estatusRef: 'DAMOP_COOR_ENV_DIR', accion: 'autorizar', per: 'DIR', dep: "DAMOP", estatus: 'AUTORIZAR' },
        { estatusRef: 'DAMOP_REG_COR_ANA', accion: 'autorizar', per: 'ANA', dep: "DAMOP", estatus: 'AUTORIZAR' },
        { estatusRef: 'DAMOP_REG_DIR_COOR', accion: 'autorizar', per: 'COOR', dep: "DAMOP", estatus: 'AUTORIZAR' },

    ]


    const consulta = () => {
        //console.log(user.DEPARTAMENTOS[0].NombreCorto)
        //console.log(user.PERFILES[0].Referencia)
        setPerfil(user.PERFILES[0].Referencia);


        if (user.DEPARTAMENTOS[0].NombreCorto === "DAMOP") {
            CatalogosServices.indexAPC({ NUMOPERACION: 1 }).then((res) => {
                //console.log(res.RESPONSE)
                setAPC(res.RESPONSE);
                setDepartamento("DAMOP");
               
            });
        }
    }

    const handleClose = () => {
        setOpen(false);
        setOpenTraz(false);
        setOpenAtender(false);
        let data = {
            NUMOPERACION: 1
        };

        CatalogosServices.indexAPC(data).then((res) => {
            setAPC(res.RESPONSE);
            //console.log(res.RESPONSE)

        });
    };
    const handleVerTazabilidad = (v: any) => {

        setOpenTraz(true);
        setIdSolicitud(v.row.id)
        //console.log(v.row.id);
    };
  

    const columns: GridColDef[] = [
        { field: "id", hide: true, },
        { field: "Mes", hide: true },
        { field: "mesdescripcion", headerName: "Mes", width: 120 },
        { field: "Anio", headerName: "A??o", width: 120 },
        { field: "Total", headerName: "Total", width: 100 },
        { field: "Descripcion", headerName: "Estatus", width: 120 },
        { field: "Comentario", headerName: "Comentarios", width: 200 },
        {
            field: "acciones",  disableExport: true,
            headerName: "Acciones",
            description: "Ver detalle de C??lculo",
            sortable: false,
            width: 150,
            renderCell: (v) => {
                return (
                    <Box>
                        <Tooltip title="Ver detalle de C??lculo">
                            <IconButton onClick={() => handleDetalle(v)}>
                                <InfoIcon />
                            </IconButton>
                        </Tooltip>
                  

                        {agregar ?
                            <Tooltip title="Agregar Ajuste">
                                <IconButton
                                    disabled={
                                        String(v.row.Clave) === "FISM" ||
                                        String(v.row.Clave) === "FORTAMUN"
                                    }
                                >
                                    <AttachMoneyIcon />
                                </IconButton>
                            </Tooltip>
                            :
                            ""
                        }
                              {((Number(v.row.Mes)- hoy.getMonth() )=== 1) ? (
                            <Tooltip title="Clonar">
                                <IconButton onClick={() => handleClonar(v)}
                                >
                                    <FileCopyIcon />
                                </IconButton>
                            </Tooltip>
                        ) : ("")}

                    </Box>
                );
            },
        },
        {
            field: "seguimiento",
            headerName: "Seguimiento",
            description: "Ver detalle de C??lculo",
            sortable: false,
            width: 150,
            renderCell: (v) => {
                return (
                    <Box>

                        {
                            /////////////////////////////  ver trazabilidad //////////////////////////////
                        }
                        {verTrazabilidad ? (
                            <Tooltip title={"Ver Trazabilidad"}>
                                <ToggleButton value="check" onClick={() => handleVerTazabilidad(v)}>
                                    <InsightsIcon />
                                </ToggleButton>
                            </Tooltip>
                        ) : (
                            ""
                        )}
                        {
                            //////////////////////////////////ENVIAR/////////////////////////////////////////
                        }
                        {
                            perfiles.find(({ estatusRef, accion, per, dep }) => estatusRef === v.row.ControlInterno && accion === "enviar" && per === perfil && dep === departamento) ?

                                //departamento == "MUN" && v.row.ControlInterno == "MUN_INICIO" ?
                                <Tooltip title={"Enviar"}>
                                    <ToggleButton
                                        value="check"
                                        onClick={() =>
                                            handleSeg(v, String(perfiles.find(({ estatusRef, accion, per, dep }) => estatusRef === v.row.ControlInterno && accion === "enviar" && per === perfil && dep == departamento)?.estatus))}>
                                        <SendIcon />
                                    </ToggleButton>
                                </Tooltip>
                                : ""}

                        {
                            /////////////////////////////////////atender solicitudes/////////////////////////////////////////////
                        }
                        {
                            perfiles.find(({ estatusRef, accion, per, dep }) => estatusRef === v.row.ControlInterno && accion === "autorizar" && per === perfil && dep === departamento) ?

                                // (departamento == "DAMOP" && user.PERFILES[0].Referencia == "ANA") && v.row.ControlInterno == "DAMOP_INICIO" || v.row.ControlInterno == "DAMOP_REG_COR_ANA" ?
                                <Tooltip title={"Atender Solicitud"}>
                                    <ToggleButton
                                        value="check"
                                        onClick={() =>
                                            handleSeg(v, String(perfiles.find(({ estatusRef, accion, per, dep }) => estatusRef === v.row.ControlInterno && accion === "autorizar" && per === perfil && dep === departamento)?.estatus))}>
                                        <DoneIcon />
                                    </ToggleButton>
                                </Tooltip>
                                : ""}
                    </Box>
                );
            },
        },
    ];

    const handleSeg = (data: any, estatus: string,) => {
        //console.log(estatus);
        if ((estatus !== "AUTORIZAR" && estatus !== "CANCELADO")) {
            let d = {
                NUMOPERACION: 7,
                CHID: data.id,
                CHUSER: user.id,
                ESTATUS: estatus,
                Comentario: data?.row?.Comentario
            };

            Swal.fire({
                icon: "info",
                title: "Enviar",
                text: "Desea Enviar la Solicitud",
                showDenyButton: false,
                showCancelButton: true,
                confirmButtonText: "Aceptar",
                cancelButtonText: "Cancelar",
            }).then((result) => {
                if (result.isConfirmed) {
                    CatalogosServices.SolicitudesInfo(d).then((res) => {
                        if (res.SUCCESS) {
                            //console.log(res.RESPONSE)
                            handleClose();
                        } else {

                            AlertS.fire({
                                title: "Error!",
                                text: "Fallo en la peticion",
                                icon: "error",

                            });
                        }
                    });
                }
                if (result.isDenied) {
                }
            });

        }
        //else 
        ///if (departamento == "DAMOP") {
        //  if (perfil == "ANA" || perfil == "COOR"||perfil == "DIR") {
        //  setOpenSeg(true);
        //   setData(data.row);
        //    setModo(estatus);
        //  }

        //}
        else {
            setOpenAtender(true);
            setData(data.row)
        }
    }

    const handleDetalle = (v: any) => {
        //console.log(String(v.row.id))
        setIdPrincipal(String(v.row.id));
        setData(v.row);
        setOpen(true);
    };
    const handleClonar = (v: any) => {
        //console.log(String(v.row.id))
        setIdPrincipal(String(v.row.id));

        let d = {
            MES: v.row.Mes,
            ANIO: v.row.Anio,
            PRINCIPAL: v.row.id,
            CHUSER: user.id,
            TIPO: 1

        };
        Swal.fire({
            icon: "warning",
            title: "Clonar Anticipo",
            text: "??Desea Autoriza?",
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                CatalogosServices.clonarInformacionAP(d).then((res) => {
                    if (res.SUCCESS) {
                        Toast.fire({
                            icon: "success",
                            title: "Clonado Exitoso!",
                        });

                        CatalogosServices.indexAPC(data).then((res) => {
                            setAPC(res.RESPONSE);
                            //console.log(res.RESPONSE)

                        });
                    } else {
                        AlertS.fire({
                            title: "Error!",
                            text: "Validar informacion",
                            icon: "error",
                        });
                    }
                });
            }
        });


    };
    const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        let file = event?.target?.files?.[0] || "";
        const formData = new FormData();
        formData.append("inputfile", file, "inputfile.xlsx");
        formData.append("tipo", "ANTICIPO_PARTICIPACIONES");
        formData.append("CHUSER", user.id);
        formData.append("ESTATUS", "DAMOP_INICIO");
        CatalogosServices.migraData(formData).then((res) => {
            if (res.SUCCESS) {
                Toast.fire({
                    icon: "success",
                    title: "Carga Exitosa!",

                });
                consulta();
            } else {
                AlertS.fire({
                    title: "Error!",
                    text: res.STRMESSAGE,
                    icon: "error",
                });
            }
        });
    };

    const test = () => {
        //console.log(hoy.getMonth() + "  " + hoy.getFullYear())


    };

    useEffect(() => {
        //console.log("");
        consulta();
        permisos.map((item: PERMISO) => {
            if (String(item.ControlInterno) === "MUNAPC") {
                if (String(item.Referencia) === "AGREG") {
                    setAgregar(true);
                }
                if (String(item.Referencia) === "ELIM") {
                    setEliminar(true);
                }
                if (String(item.Referencia) === "TRAZA") {
                    setVerTrazabilidad(true);
                }
            }
        });

    }, []);



    return (
        <div style={{ height: 600, width: "100%" }}>
            <Grid container spacing={2} sx={{ justifyContent: "center", }} >
                <Grid item xs={12}>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <Titulo name={"Anticipo de Participaciones"} />
                    </Box>
                </Grid>
            </Grid>

            <Grid container>
                <Grid item xs={2} >
                    <ButtonsMunicipio
                        url={"d"}
                        handleUpload={handleUpload}
                        controlInterno={"MUNAPC"} value={"na"} options={[]} onInputChange={handleUpload} placeholder={""} label={""} disabled={false}  />
                </Grid>
                <Grid item xs={3}>


                </Grid>
                <MUIXDataGrid sx={{}} columns={columns} rows={APC} />
            </Grid>




            {open ?
                <DetalleAnticipoParticipaciones idPrincipal={idPrincipal} data={data} open={open} handleClose={handleClose} />
                : ""
            }
            {openTraz ?
                <TrazabilidadSolicitud
                    dt={{
                        TIPO: 2,
                        CHID: idSolicitud,
                    }}
                    open={openTraz} handleClose={handleClose} />
                :
                ""
            }

            {
                openAtender ?
                    <AnticipoParticipacionesAtenderModal departamento={String(departamento)} data={data} open={openAtender} handleClose={handleClose} perfil={String(perfil)} />
                    : ""

            }


        </div>
    );
};
