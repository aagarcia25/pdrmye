
import { Box } from '@mui/material';
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
  value:string,
  options: SelectValues[],
  onInputChange: Function,
  placeholder: string,
  label: string,
  disabled:boolean
}

) => {
  return (
      <Select 
        options={options}
        isDisabled={disabled}
        isClearable={true}
        isSearchable={true}
        backspaceRemovesValue={true}
        //styles={styles}
        onChange={
          (v) => (v === null) ?
          onInputChange(String(disabled))
            :
            onInputChange(v.value)
        }
        placeholder={(label != "") ? label : placeholder}
        styles={{
          menu: (base) => ({
            position: 'absolute',
            paddingLeft: '1rem',
            zIndex: 500,
            ...base
          })
        }}
      />
  )
}

export default SelectFrag
