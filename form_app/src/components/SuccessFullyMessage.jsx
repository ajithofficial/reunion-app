
import React from 'react';


const SuccessFullyMessage = ({ show = false, onClose, message = "Form successfully submitted!", title = "Success!", icon = null, okText = "OK" }) => {
  if (!show) return null;

  return (
    <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-success text-white">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
          </div>
          <div className="modal-body text-center py-4">
            <div className="mb-3">
              {icon || (
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" className="bi bi-check-circle-fill text-success" viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                </svg>
              )}
            </div>
            <h4>{message}</h4>
          </div>
          <div className="modal-footer justify-content-center">
            <button type="button" className="btn btn-success" onClick={onClose}>
              {okText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessFullyMessage;