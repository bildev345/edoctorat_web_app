import React from 'react';

export const CVAttachments = ({ candidat }) => {
  if (!candidat) return null;

  return (
    <div className="card shadow-sm border-0 mt-4">
      <div className="card-body">
        <h6 className="fw-bold mb-3"><i className="bi bi-file-earmark-person me-2"></i>Pièces Jointes</h6>
        <div className="d-flex align-items-center justify-content-between p-3 bg-light rounded border">
          <div>
            <div className="fw-bold text-dark">Curriculum Vitae</div>
            <div className="small text-muted text-truncate" style={{ maxWidth: '150px' }}>{candidat.pathCv || "cv.pdf"}</div>
          </div>
          <button className="btn btn-sm btn-outline-primary"><i className="bi bi-download"></i></button>
        </div>
      </div>
    </div>
  );
};
