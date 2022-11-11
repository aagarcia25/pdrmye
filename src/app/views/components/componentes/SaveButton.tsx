import { Button, Grid } from '@mui/material'

const SaveButton = ({
    vrow,
    handleAccion,
    tipoOperacion
}:{
    vrow:any
    handleAccion:Function  
    tipoOperacion:number  
}) => {
  return (
    <div>
     
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
           <Grid item xs={4} sm={3} md={2} lg={1}   >
             <Button className={tipoOperacion==1?"guardar":"actualizar"}  onClick={() => handleAccion(vrow)}>{tipoOperacion==1?"Guardar":"Actualizar"}</Button>
           </Grid>
         </Grid>
    </div>
  )
}

export default SaveButton
