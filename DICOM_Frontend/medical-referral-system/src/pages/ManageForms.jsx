import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from '../context/FormContext';
import TableView from '../components/TableView/TableView';
import Modal from '../components/Modal/Modal';
import BranchIndicator from '../components/BranchIndicator/BranchIndicator';
import { getScanTypeSummary, formatDate } from '../utils/formUtils';
import './Pages.css';

const ManageForms = () => {
  const navigate = useNavigate();
  const { forms, deleteForm } = useFormContext();
  const [deleteModal, setDeleteModal] = useState({ open: false, form: null });

  const columns = [
    {
      key: 'patientId',
      label: 'Patient ID',
      render: (_, row) => row.patient.patientId || '-',
    },
    {
      key: 'patientName',
      label: 'Patient Name',
      render: (_, row) => row.patient.patientName,
    },
    {
      key: 'doctorName',
      label: 'Doctor Name',
      render: (_, row) => row.doctor.doctorName,
    },
    {
      key: 'date',
      label: 'Date',
      render: (_, row) => formatDate(row.patient.date),
    },
    {
      key: 'scanType',
      label: 'Scan Type',
      render: (_, row) => (
        <span className="scan-badge">{getScanTypeSummary(row.diagnosticServices)}</span>
      ),
    },
  ];

  const handleView = (form) => {
    navigate(`/view/${form.id}`);
  };

  const handleEdit = (form) => {
    navigate(`/edit/${form.id}`);
  };

  const handleDeleteClick = (form) => {
    setDeleteModal({ open: true, form });
  };

  const handleDeleteConfirm = () => {
    if (deleteModal.form) {
      deleteForm(deleteModal.form.id);
    }
    setDeleteModal({ open: false, form: null });
  };

  const renderActions = (row) => (
    <div className="action-buttons">
      <button
        className="action-btn view"
        onClick={() => handleView(row)}
        title="View Form"
        aria-label="View form"
      >
        <svg viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
          />
        </svg>
      </button>
      <button
        className="action-btn edit"
        onClick={() => handleEdit(row)}
        title="Edit Form"
        aria-label="Edit form"
      >
        <svg viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
          />
        </svg>
      </button>
      <button
        className="action-btn delete"
        onClick={() => handleDeleteClick(row)}
        title="Delete Form"
        aria-label="Delete form"
      >
        <svg viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
          />
        </svg>
      </button>
    </div>
  );

  return (
    <div className="page-container">
      <BranchIndicator />
      
      <div className="page-header">
        <div>
          <h1 className="page-title">Manage Forms</h1>
          <p className="page-subtitle">View, edit, or delete submitted referral forms</p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/create')}>
          <svg viewBox="0 0 24 24" className="btn-icon">
            <path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
          </svg>
          New Form
        </button>
      </div>

      <div className="forms-summary">
        <div className="summary-card">
          <span className="summary-number">{forms.length}</span>
          <span className="summary-label">Total Forms</span>
        </div>
      </div>

      <TableView
        columns={columns}
        data={forms}
        actions={renderActions}
        emptyMessage="No referral forms yet. Create your first form to get started."
      />

      <Modal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, form: null })}
        title="Confirm Delete"
        actions={
          <>
            <button
              className="btn btn-outline"
              onClick={() => setDeleteModal({ open: false, form: null })}
            >
              Cancel
            </button>
            <button className="btn btn-danger" onClick={handleDeleteConfirm}>
              Delete
            </button>
          </>
        }
      >
        <div className="delete-warning">
          <svg viewBox="0 0 24 24" className="warning-icon">
            <path
              fill="currentColor"
              d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"
            />
          </svg>
          <p>Are you sure you want to delete this referral form?</p>
          {deleteModal.form && (
            <p className="delete-detail">
              Patient: <strong>{deleteModal.form.patient.patientName}</strong>
              <br />
              Doctor: <strong>{deleteModal.form.doctor.doctorName}</strong>
            </p>
          )}
          <p className="delete-note">This action cannot be undone.</p>
        </div>
      </Modal>
    </div>
  );
};

export default ManageForms;
