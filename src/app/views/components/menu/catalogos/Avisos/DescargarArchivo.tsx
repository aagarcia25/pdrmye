
import React from 'react';
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
export default (props:any) => {
  const cellValue = props.valueFormatted ? props.valueFormatted : props.value;

  const buttonClicked = () => {
    alert(`${cellValue} medals won!`);
    //<Link to= cellValue ></Link>
  };

  return (
    <span>
      <span>{cellValue}</span>&nbsp;
      
      <button onClick ={(event) =>  Navigate (cellValue) }> ,<BrowserUpdatedIcon/></button>
    </span>
  );
};