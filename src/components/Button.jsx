// 

// Button.jsx
import React from 'react';

const Button = ({ children, onClick, type = "button", variant = "primary", className = "" }) => {
  const baseStyle = "px-4 py-2 rounded font-medium";
  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-500 text-white hover:bg-gray-600",
    danger: "bg-red-500 text-white hover:bg-red-600",
    outline: "border border-gray-300 hover:bg-gray-100"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export { Button };