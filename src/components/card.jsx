import React from 'react';

const Card = ({ children, className }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-4 ${className}`}>
      {children}
    </div>
  );
};

const CardTitle = ({ children }) => {
  return <h3 className="text-xl font-bold mb-2">{children}</h3>;
};

const CardContent = ({ children }) => {
  return <div className="mt-2">{children}</div>;
};

export { Card, CardTitle, CardContent };