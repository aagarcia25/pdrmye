import { makeStyles, TableRow, TableCell, IconButton, Collapse, Box, Table, TableBody, TableContainer, Paper, List, TableHead } from "@mui/material";
import React from "react";
import { categories } from "./Navigator";


  
  /*
  function createData(name: string) {
    return {
      name,
      children: [
        {
          key: 21,
          name: "Function 1",
          user: <Checkbox></Checkbox>
        },
        {
          key: 21,
          name: "Function 2",
          user: <Checkbox></Checkbox>
        }
      ]
    };
  }
  */
  
  const CollapsedRow = (value:any) => {
//const [openFunction, setOpenFunction] = React.useState(false);
  
    return (
      <React.Fragment>
        <TableRow key={value.children}>
          <TableCell style={{ width: "62px" }}>
         
          </TableCell>
          <TableCell component="th" scope="row">
            {value.id}
          </TableCell>
        </TableRow>
       
      </React.Fragment>
    );
  };
  
  function Row(props: { row: any }) {
    const { row } = props;
    const [openModule, setOpenModule] = React.useState(false);
   
    // const [open, setOpen] = React.useState(false);
  
  
    // console.log("row", row);
    // for (const key in row) {
    //   if (Object.prototype.hasOwnProperty.call(row, key)) {
    //     const element = row[key];
    //     console.log("element", element);
    //   }
    // }
    return (
      <React.Fragment>
        <TableRow style={{ background: "#3f51b5" }}>
          <TableCell style={{ width: "62px" }}>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpenModule(!openModule)}
              style={{ color: "white" }}
            >
              {openModule ? <IconButton /> : <IconButton />} 
            </IconButton>
          </TableCell>
          <TableCell style={{ color: "white" }}>{row.id}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={openModule} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Table size="small" aria-label="purchases">
                  <TableBody>
                    {row.children.map((childrenRow: any) => (
                      <CollapsedRow
                        row={row}
                        childrenRow={childrenRow}
                      />
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  
  
  export default function CollapsibleMenu() {
    return (
      <TableContainer component={Paper}>
        <List aria-label="collapsible table">
          <TableHead >Menu</TableHead>
          <TableBody>
            {categories.map((categorias,categories) => (
              <Row key={categorias.id} row={categories} />
            ))}
          </TableBody>
        </List>
      </TableContainer>
    );
  }
  