import React from 'react'
import Select from 'react-select'
import SelectValues from '../../../../interfaces/Select/SelectValues'

const SelectFrag = ({
  options,
  onInputChange
}:{
  options:SelectValues[],
  onInputChange:Function
}) => {

   


  return (
    <div>
     <Select 
     
     options={options} 
     isClearable={true}
     onChange={(v)=>onInputChange(v)}
     />  
    </div>
  )
}

export default SelectFrag
