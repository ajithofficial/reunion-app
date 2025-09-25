import React from 'react';
import '../FormFields.css';

export const FormInput = ({ type = 'text', id, name, value, onChange, placeholder, icon, error, ...rest }) => (
  <div className="mb-4">
    <label htmlFor={id} className="form-label invitation-label">{placeholder}</label>
    <div className="input-group">
      {icon && (
        <span className="input-group-text invitation-input-icon">
          <i className={icon}></i>
        </span>
      )}
      <input
        type={type}
        className={`form-control invitation-input`}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...rest}
      />
    </div>
    {error && <div className="invalid-feedback d-block">{error}</div>}
  </div>
);

export const FormTextArea = ({ id, name, value, onChange, placeholder, icon, error, rows = 3, ...rest }) => (
  <div className="mb-4">
    <label htmlFor={id} className="form-label invitation-label">{placeholder}</label>
    <div className="input-group">
      {icon && (
        <span className="input-group-text invitation-input-icon">
          <i className={icon}></i>
        </span>
      )}
      <textarea
        className={`form-control input-background`}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        {...rest}
      ></textarea>
    </div>
    {error && <div className="invalid-feedback d-block">{error}</div>}
  </div>
);
