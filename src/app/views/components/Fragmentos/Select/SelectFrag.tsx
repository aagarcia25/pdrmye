import React from 'react'
import Select from 'react-select'
import SelectValues from '../../../../interfaces/Select/SelectValues'

const SelectFrag = ({
  options,
  onInputChange,
  placeholder,
}:{
  options:SelectValues[],
  onInputChange:Function,
  placeholder:string
}) => {

   


  return (
    <div>
     <Select 
     options={options} 
     isClearable={true}
     isSearchable={true}
     backspaceRemovesValue={true}
     onChange={(v)=>onInputChange(v)}
     placeholder={placeholder}
     />  
    </div>
  )
}

export default SelectFrag
