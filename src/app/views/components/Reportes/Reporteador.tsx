import { Divider, Grid,  List,  ListItem,  ListItemButton,  ListItemText,  Tooltip,  Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { AlertS } from '../../../helpers/AlertS';
import { Toast } from '../../../helpers/Toast';
import SelectValues from '../../../interfaces/Select/SelectValues';
import { RESPONSE } from '../../../interfaces/user/UserInfo';
import { CatalogosServices } from '../../../services/catalogosServices';
import { getUser } from '../../../services/localStorage';
import SelectFrag from '../Fragmentos/SelectFrag';
import { Titulo } from '../menu/catalogos/Utilerias/AgregarCalculoUtil/Titulo';
import Slider from '../Slider';
import { IReportes } from '../../../interfaces/menu/menu';




export const Reporteador = () => {
    const [openSlider, setOpenSlider] = useState(false);
    const user: RESPONSE = JSON.parse(String(getUser()));
    const [tipoExportacion, setTipoExportacion] = useState<string>("");
    const [listaReportes, setListaReportes] = useState<IReportes[]>([]);
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

    
  const consultaReportes = (data: any) => {
    CatalogosServices.reportesAdministracionRelacion(data).then((res) => {
        setListaReportes(res.RESPONSE);
        setOpenSlider(false)
    });
  };


    const handleSelectTipoExportacion = (e: any) => {
        setTipoExportacion(e);
    };

    useEffect(() => {
        consultaReportes({ CHID: user.idUsuarioCentral ,TIPO:5 });
        consulta();
       
    }, []);

    return (
        <div >
            <Slider open={openSlider} ></Slider>
            <Titulo name={'Módulo de Generación de Reportes'}></Titulo>
            <Grid container sx={{ justifyContent: "center" }}>
                <Grid container item xs={2} sx={{  textAlign: "center" }}>

                    <div className='containerReporteadorLista'>
                        <Typography variant="h5" paddingBottom={2}>
                            Listado de Reportes
                        </Typography>



                        <List>
                        <ListItem disablePadding>
                         {
 
                            listaReportes.map((item,index) => {
                              return (
                                <>
                                 <Divider />
                                <ListItemButton className="itemMenu" key={index} sx={{ pl: 4 }}>
                                  <ListItemText key={index} primary={
                                    <>
                                      <Tooltip title={item.Descripcion}>
                                        <Typography variant="h5" className="menu-Typography"  gutterBottom>
                                          {item.Nombre}
                                        </Typography>
                                      </Tooltip>
                                    </>
                                  } />
                                </ListItemButton>
                                <Divider /> 
                                
                                </>
                              
                              )
                            })
                         
                         } 
                        </ListItem>
                        </List>
                          


                    </div>
                </Grid>
                <Grid container item xs={10} justifyContent="flex-end" >
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
