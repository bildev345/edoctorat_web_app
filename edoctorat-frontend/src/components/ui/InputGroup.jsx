import React from 'react';

export const InputGroup = ({ label, name, value, onChange, type = "text", error, ...props }) => {
  return (
    <div className="mb-3">
      <label className="form-label fw-bold text-secondary" style={{ fontSize: '0.9rem' }}>
        {label} {props.required && <span className="text-danger">*</span>}
      </label>
      
      {type === 'select' ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={`form-select ${error ? 'is-invalid' : ''}`}
          {...props}
        >
          {props.children}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={`form-control ${error ? 'is-invalid' : ''}`}
          {...props}
        />
      )}
      
      {/* Message d'erreur Bootstrap */}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};