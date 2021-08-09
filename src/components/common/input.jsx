import React from "react";

const Input = ({ name, label, className, error, ...rest }) => {
  return (
    <div className={className}>
      <label htmlFor={name}><h6>{label}</h6></label>
      <input {...rest} name={name} id={name} className="form-control" />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};
export default Input;