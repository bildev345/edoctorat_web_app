import React, { useEffect } from "react";

export const Snackbar = ({ open, message, type = "info", onClose }) => {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onClose();
      }, 3500);

      return () => clearTimeout(timer);
    }
  }, [open, onClose]);

  if (!open) return null;

  const bgColor = {
    success: "bg-success",
    error: "bg-danger",
    warning: "bg-warning text-dark",
    info: "bg-primary",
  };

  const icon = {
    success: "bi-check-circle-fill",
    error: "bi-x-circle-fill",
    warning: "bi-exclamation-triangle-fill",
    info: "bi-info-circle-fill",
  };

  return (
    <div
      className="position-fixed bottom-0 end-0 p-4"
      style={{ zIndex: 9999 }}
    >
      <div
        className={`toast show text-white shadow ${bgColor[type]}`}
        role="alert"
      >
        <div className="toast-body d-flex align-items-center">
          <i className={`bi ${icon[type]} me-3 fs-5`}></i>
          <span className="flex-grow-1">{message}</span>
          <button
            className="btn-close btn-close-white ms-3"
            onClick={onClose}
          ></button>
        </div>
      </div>
    </div>
  );
};
