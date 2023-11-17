"use client";
import Select from "react-select";
import React from "react";
import { Controller, Control } from "react-hook-form";

interface Props {
  control: Control;
  data: Array<object>;
  selectName: string;
  placeholder: string;
  isMulti: boolean;
  isClearable: boolean;
  className?: string;
}

const CustomSelect = ({
  control,
  data,
  selectName,
  placeholder,
  isMulti,
  isClearable,
  className,
}: Props) => {
  return (
    <Controller
      name={selectName}
      control={control}
      render={({ field: { onChange, name, ref } }) => (
        <>
          <label htmlFor={name} style={{ display: "none"}}>{name}</label>
          <Select
            className={className ? className : ""}
            ref={ref}
            name={name}
            inputId={name}
            placeholder={placeholder}
            isClearable={isClearable}
            isSearchable
            isMulti={isMulti}
            onChange={(e: any) =>
              e.value ? onChange(e.value) : onChange(e.map((c: any) => c.value))
            }
            options={data}
          />
        </>
      )}
    ></Controller>
  );
};

export default CustomSelect;
