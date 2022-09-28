import React from 'react'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { TabContext, TabList, TabPanel } from '@mui/lab';


const RecepcionRecursos = () => {


    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
      };




  return (
    <div>

        
      <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Participaciones Federales" value="1" />
            <Tab label="Participaciones Estatales" value="2" />
            <Tab label="Aportaciones Federales" value="3" />
            <Tab label="Aportaciones Estatales" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1">Participaciones Federales</TabPanel>
        <TabPanel value="2">Participaciones Estatales</TabPanel>
        <TabPanel value="3">Aportaciones Federales</TabPanel>
        <TabPanel value="4">Aportaciones Estatales</TabPanel>
      </TabContext>
    </Box>
    </div>
  )
}

export default RecepcionRecursos
