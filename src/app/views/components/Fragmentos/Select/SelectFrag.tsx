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
     defaultValue={options[0]}
     options={options} 
     isClearable={true}
     onChange={(v)=>onInputChange(v)}
     placeholder={placeholder}
     />  
    </div>
  )
}

export default SelectFrag
