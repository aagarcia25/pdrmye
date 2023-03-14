import { Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { getRfToken, getToken, getUser } from '../../../services/localStorage';
import { ParametroServices } from '../../../services/ParametroServices';
import IFrame from './IFrame';




export const Reporteador = () => {
    const [URL, setURL] = useState("");
    const jwtToken = String(getToken()).replace(/["']/g, "");
    const RFToken = String(getRfToken()).replace(/["']/g, "");


    const handleURL = () => {
        let dataAppId = {
            NUMOPERACION: 5,
            NOMBRE: "URL_GEN_REP",
        }
        ParametroServices.ParametroGeneralesIndex(dataAppId).then((resURL) => {
            setURL(String(resURL?.RESPONSE?.Valor));
        });
    }
    useEffect(() => {

        handleURL();
    }, []);

    return (
        <div >

            <Grid container sx={{ justifyContent: "center" }}>
                <Grid item xs={10} sx={{ textAlign: "center" }}>
                    <Typography variant="h4" paddingBottom={2}>
                        Módulo de Generación de Reportes
                    </Typography>
                </Grid>
            </Grid>
            <IFrame source={"/?jwToken=" + jwtToken+"&rfToken="+RFToken} baseURL={URL} />
        </div>
    )
}
