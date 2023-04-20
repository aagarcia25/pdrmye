
import Select from 'react-select'

const SelectFragMulti = ({
    options,
    onInputChange,
    placeholder,
    disabled
  }: {
    options: [],
    onInputChange: Function,
    placeholder: string,
    label: string,
    disabled:boolean
  }) => {
  return (
    <div>
    <Select
      isDisabled={disabled}
      onChange={ (v) => (v === null) ?         onInputChange(String(disabled)) : onInputChange(v) }
      closeMenuOnSelect={false}
      isMulti
      options={options}
      placeholder={placeholder}
      isClearable={true}
    />
  </div>
  )
}

export default SelectFragMulti
