import React from 'react';

interface FormInputProps {
  id: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  required?: boolean;
  minLength?: number;
}

const FormInput: React.FC<FormInputProps> = ({
  id,
  name,
  type,
  value,
  onChange,
  label,
  required = false,
  minLength,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-amber-700 text-sm font-medium mb-2">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full p-3 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
        required={required}
        minLength={minLength}
      />
    </div>
  );
};

export default FormInput;