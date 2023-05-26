import { Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { AlertS } from '../../../helpers/AlertS';
import { Toast } from '../../../helpers/Toast';
import SelectValues from '../../../interfaces/Select/SelectValues';
import { CatalogosServices } from '../../../services/catalogosServices';
import { getRfToken, getToken, getUser } from '../../../services/localStorage';
import { ParametroServices } from '../../../services/ParametroServices';
import { COLOR } from '../../../styles/colors';
import SelectFrag from '../Fragmentos/SelectFrag';
import IFrame from '../Herramientas/IFrame';
import { Titulo } from '../menu/catalogos/Utilerias/AgregarCalculoUtil/Titulo';




export const Reporteador = () => {
    const [tipoExportacion, setTipoExportacion] = useState<string>("");
    const [tipoExportacionSelect, setTipoExportacionSelect] = useState<SelectValues[]>([]);


    const consulta = () => {

        let data = {
            //   CHUSER: idmunicipio !== "" ? idmunicipio : user.MUNICIPIO[0]?.id,
            NUMOPERACION: 4,

        };
        CatalogosServices.TipoExportacion(data).then((res) => {
            if (res.SUCCESS) {
                Toast.fire({
                    icon: "success",
                    title: "¡Consulta Exitosa!",
                });
                setTipoExportacionSelect(res.RESPONSE);

            } else {
                AlertS.fire({
                    title: "¡Error!",
                    text: res.STRMESSAGE,
                    icon: "error",
                });
            }
        });
    };

    const handleSelectTipoExportacion = (e: any) => {
        setTipoExportacion(e);
    };

    useEffect(() => {

        consulta();
    }, []);

    return (
        <div >
            <Titulo name={'Módulo de Generación de Reportes'}></Titulo>
            <Grid container sx={{ justifyContent: "center" }}>
                <Grid container item xs={3} sx={{ bgcolor: COLOR.grisBotones, textAlign: "center" }}>

                    <div className='containerReporteadorLista'>
                        <Typography variant="h5" paddingBottom={2}>
                            listado de Reportes
                        </Typography>


                        vvdvdv

                    </div>
                </Grid>
                <Grid container item xs={9} justifyContent="flex-end" >
                    <Grid item xs={4}>
                        <Typography>
                            Selecione formato de exportacion
                        </Typography>
                        <SelectFrag value={tipoExportacion} options={tipoExportacionSelect} onInputChange={handleSelectTipoExportacion} placeholder={''} label={''} disabled={false} />
                    </Grid>


                </Grid>
            </Grid>
        </div>
    )
}
