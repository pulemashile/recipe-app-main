import React from 'react';

const Input = ({
  type = "text",
  placeholder,
  value,
  onChange,
  className = "",
  name,
  onBlur,
  ...props 
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      name={name}
      className={`border rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500 ${className}`}
      {...props}
    />
  );
};

export { Input };