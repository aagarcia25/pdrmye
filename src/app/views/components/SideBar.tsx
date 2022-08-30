import { Box , Drawer, Toolbar} from "@mui/material"
import { ReactNode } from "react"

interface Props{
    children? :  ReactNode,
    drawerWidth ? : number
   }
   
const SideBar = ({children,drawerWidth, ...props} : Props) => {
  return (
    <Box
      component='nav'
      sx={{width:{ sm:drawerWidth}, flexShrink:{ sm :0}}}
      > 

         <Drawer 
           variant='permanent'
           open
           sx={{
              display: { xs: 'block'},
              '& .MuiDrawer-paper':{boxSizing: 'border-box' , width: drawerWidth}
           }}
           >
            <Toolbar>
                menu lateral
            </Toolbar>

         </Drawer>


    </Box>  
            
            
     

  )
}

export default SideBar
