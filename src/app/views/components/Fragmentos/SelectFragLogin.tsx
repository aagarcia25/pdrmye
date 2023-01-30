import Select from 'react-select'
import SelectValues from '../../../interfaces/Select/SelectValues'

const SelectFragLogin = ({
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
}) => {





  return (
    <div>


      <Select
        value ={value !== null ?options.find(element => element.value === value) :[]}
        options={options}
        isDisabled={disabled}
        isClearable={true}
        isSearchable={true}
        backspaceRemovesValue={true}
        onChange={
          (v) => (v === null) ?
          onInputChange(String(disabled))
            :
            onInputChange(v)
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

export default SelectFragLogin
