import React from "react";

const Select = ({ name, label, error, options, ...rest }) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <select name={name} id={name} {...rest} className="custom-select">
                <option disabled value="">
                Choose...
                </option>
                {options.map((option) => (
                    <option key={option._id} value={option._id}>
                        {option.name}
                    </option>
                ))}
            </select>
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
};

export default Select;