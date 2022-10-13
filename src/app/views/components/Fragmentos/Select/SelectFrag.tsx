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
     styles={{
      menu: (base) => ({
        position: 'fixed',
        
        zIndex: 500,
        ...base
      })
    }}
     />  
    </div>
  )
}

export default SelectFrag
