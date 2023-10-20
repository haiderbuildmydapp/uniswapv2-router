import React from "react";
import ErrorMessage from "../ErroMessage";
import { NftForms, FormControl } from "./inputElement";

const InputField = ({
  inputLabel,
  inputLabelText,
  inputRequired,
  inputType,
  placeholder,
  value,
  maxLength,
  disabled,
  onChange,
  error,
  min,
  name,
  onBlur,
  id,
}) => {
  return (
    <div>
      <NftForms.Group>
        <NftForms.Label style={{ marginTop: "1rem" }}>
          {" "}
          {inputLabel}
          {inputRequired ? (
            <span
              style={{ color: "red", marginLeft: "0.2rem", marginTop: "5rem" }}
            >
              *
            </span>
          ) : (
            ""
          )}
        </NftForms.Label>
        <NftForms.Text className="text-muted">{inputLabelText}</NftForms.Text>

        <FormControl
          type={inputType}
          // disabled={disabled}
          onChange={onChange}
          value={value}
          onBlur={onBlur}
          id={id}
          name={name}
          min={min}
          placeholder={placeholder}
        ></FormControl>
        <ErrorMessage error={error} />
      </NftForms.Group>
    </div>
  );
};

export default InputField;
