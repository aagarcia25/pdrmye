import { Grid } from '@mui/material';
import React from 'react';


export const IFrame = (
    {
        baseURL,
        source
    }: {
        source: string,
        baseURL: string

    }

) => {

    if (!source) {
        return <div>Loading...</div>;
    }

    return (
        // basic bootstrap classes. you can change with yours.
        <div className="containerCenter">
            <Grid container>
                <object
                    className="responsive-iframe"
                    data={String(baseURL) + String(source)}
                    type="text/html">
                </object>
            </Grid>
        </div>
    );
};

export default IFrame;