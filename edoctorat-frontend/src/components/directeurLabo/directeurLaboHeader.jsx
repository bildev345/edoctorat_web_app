import React, { useState } from 'react';

// Header Component
export const DirecteurLaboHeader = () =>  {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="bg-dark text-white p-3 d-flex justify-content-between align-items-center w-100">
      <h4 className="mb-0">My Application</h4>
      
      {/* Dropdown Menu */}
      <div className="position-relative">
        <button 
          className="btn btn-secondary dropdown-toggle"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          Menu
        </button>
        {dropdownOpen && (
          <div className="position-absolute end-0 mt-2 bg-white rounded shadow" style={{minWidth: '160px', zIndex: 1000}}>
            <a href="#profile" className="d-block px-4 py-2 text-decoration-none text-dark hover-bg-light">Profile</a>
            <a href="#settings" className="d-block px-4 py-2 text-decoration-none text-dark hover-bg-light">Settings</a>
          </div>
        )}
      </div>
    </header>
  );
}