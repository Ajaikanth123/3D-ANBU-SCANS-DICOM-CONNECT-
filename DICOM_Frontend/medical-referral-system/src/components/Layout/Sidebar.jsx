import React from 'react';
import { NavLink } from 'react-router-dom';
import './Layout.css';

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      <div
        className={`sidebar-overlay ${isOpen ? 'active' : ''}`}
        onClick={onClose}
      />
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo">
            <svg viewBox="0 0 24 24" className="logo-icon">
              <path
                fill="currentColor"
                d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"
              />
            </svg>
            <div className="logo-text">
              <span className="logo-title">3D Anbu Dental Diagnostics LLP</span>
              <span className="logo-subtitle">Diagnostic Center</span>
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <NavLink
            to="/create"
            className={({ isActive }) =>
              `nav-item ${isActive ? 'active' : ''}`
            }
            onClick={onClose}
          >
            <svg viewBox="0 0 24 24" className="nav-icon">
              <path
                fill="currentColor"
                d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
              />
            </svg>
            <span>Create Form</span>
          </NavLink>

          <NavLink
            to="/manage"
            className={({ isActive }) =>
              `nav-item ${isActive ? 'active' : ''}`
            }
            onClick={onClose}
          >
            <svg viewBox="0 0 24 24" className="nav-icon">
              <path
                fill="currentColor"
                d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"
              />
            </svg>
            <span>Manage Forms</span>
          </NavLink>

          <NavLink
            to="/branches"
            className={({ isActive }) =>
              `nav-item ${isActive ? 'active' : ''}`
            }
            onClick={onClose}
          >
            <svg viewBox="0 0 24 24" className="nav-icon">
              <path
                fill="currentColor"
                d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
              />
            </svg>
            <span>Manage Branches</span>
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <p>© 2026 3D Anbu Dental Diagnostics LLP</p>
          <p className="version">v1.0.0</p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
