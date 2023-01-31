import {  FormControl } from '@mui/material';
import Select from 'react-select';
import SelectValues from '../../../interfaces/Select/SelectValues'

const SelectFrag = ({
  value,
  options,
  onInputChange,
  placeholder,
  label,
  disabled
}: {
  value: string,
  options: SelectValues[],
  onInputChange: Function,
  placeholder: string,
  label: string,
  disabled: boolean
}

) => {
  return (
    <FormControl sx={{ width:"100%" }}  >
    <Select
    value ={value != null ?options.find(element => element.value === value) :[]}
      options={options}
      isDisabled={disabled}
      isClearable={true}
      isSearchable={true}
      backspaceRemovesValue={true}
      onChange={(v) => (v === null) ?
        onInputChange(String(disabled))
        :
        onInputChange(v.value)
      }
      placeholder={(label !== "") ? label : placeholder}
      styles={{
        menu: (base) => ({
          position: 'absolute',
          paddingLeft: '1rem',
          zIndex: 500,
          ...base
        })
      }}
    />
    </FormControl>
  )
}

export default SelectFrag
