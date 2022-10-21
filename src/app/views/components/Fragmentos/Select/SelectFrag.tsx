import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import SelectValues from '../../../../interfaces/Select/SelectValues'

const SelectFrag = ({
  options,
  onInputChange,
  placeholder,
  label,
  disabled
}: {
  options: SelectValues[],
  onInputChange: Function,
  placeholder: string,
  label: string,
  disabled:boolean
}) => {

  return (
    <div>


      <Select
        options={options}
        isDisabled={disabled}
        isClearable={true}
        isSearchable={true}
        backspaceRemovesValue={true}
        onChange={
          (v) => (v == null) ?
          onInputChange(String(disabled))
            :
            onInputChange(v.value)
        }
        placeholder={(label != "") ? label : placeholder}
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
