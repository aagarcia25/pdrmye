
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
      theme={(theme) => ({
        ...theme,
        borderRadius: 0,
        colors: {
          ...theme.colors,
          primary25: '#41b883',
          primary: 'rgb(175, 140, 85)',
        },
      })}
    />
  </div>
  )
}

export default SelectFragMulti
