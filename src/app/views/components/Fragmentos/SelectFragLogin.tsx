import Select from "react-select";
import SelectValues from "../../../interfaces/Select/SelectValues";

const SelectFragLogin = ({
  value,
  options,
  onInputChange,
  placeholder,
  label,
  disabled,
}: {
  value: string;
  options: SelectValues[];
  onInputChange: Function;
  placeholder: string;
  label: string;
  disabled: boolean;
}) => {
  return (
    <div>
      <Select
        value={
          value !== null
            ? options.find((element) => element.value == value)
            : []
        }
        options={options}
        isDisabled={disabled}
        isClearable={true}
        isSearchable={true}
        backspaceRemovesValue={true}
        onChange={(v) =>
          v == null ? onInputChange(String(disabled)) : onInputChange(v)
        }
        placeholder={label != "" ? label : placeholder}
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          colors: {
            ...theme.colors,
            primary25: "rgb(175, 140, 85)",
            primary: "rgb(175, 140, 85)",
          },
        })}
        styles={{
          menu: (base) => ({
            position: "fixed",
            zIndex: 500,
            ...base,
          }),
        }}
      />
    </div>
  );
};

export default SelectFragLogin;
