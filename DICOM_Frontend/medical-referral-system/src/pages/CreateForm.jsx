import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from '../context/FormContext';
import {
  DoctorInfoModule,
  PatientInfoModule,
  DiagnosticServicesModule,
  ReasonForReferralModule,
  ClinicalNotesModule,
} from '../components/FormModules';
import Modal from '../components/Modal/Modal';
import BranchIndicator from '../components/BranchIndicator/BranchIndicator';
import { getInitialFormState, validateForm } from '../utils/formUtils';
import './Pages.css';

const CreateForm = () => {
  const navigate = useNavigate();
  const { addForm } = useFormContext();
  const [formData, setFormData] = useState(getInitialFormState());
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { title: 'Doctor Info', component: 'doctor' },
    { title: 'Patient Info', component: 'patient' },
    { title: 'Diagnostic Services', component: 'services' },
    { title: 'Referral Reason', component: 'reason' },
    { title: 'Clinical Notes', component: 'notes' },
  ];

  const handleDoctorChange = (data) => {
    setFormData((prev) => ({ ...prev, doctor: data }));
    if (errors.doctor) {
      setErrors((prev) => ({ ...prev, doctor: {} }));
    }
  };

  const handlePatientChange = (data) => {
    setFormData((prev) => ({ ...prev, patient: data }));
    if (errors.patient) {
      setErrors((prev) => ({ ...prev, patient: {} }));
    }
  };

  const handleServicesChange = (data) => {
    setFormData((prev) => ({ ...prev, diagnosticServices: data }));
  };

  const handleReasonChange = (data) => {
    setFormData((prev) => ({ ...prev, reasonForReferral: data }));
  };

  const handleNotesChange = (value) => {
    setFormData((prev) => ({ ...prev, clinicalNotes: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Navigate to first step with errors
      if (validationErrors.doctor) setCurrentStep(0);
      else if (validationErrors.patient) setCurrentStep(1);
      return;
    }

    addForm(formData);
    setShowSuccess(true);
  };

  const handleReset = () => {
    setFormData(getInitialFormState());
    setErrors({});
    setCurrentStep(0);
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    handleReset();
    navigate('/manage');
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <DoctorInfoModule
            data={formData.doctor}
            onChange={handleDoctorChange}
            errors={errors.doctor || {}}
          />
        );
      case 1:
        return (
          <PatientInfoModule
            data={formData.patient}
            onChange={handlePatientChange}
            errors={errors.patient || {}}
          />
        );
      case 2:
        return (
          <DiagnosticServicesModule
            data={formData.diagnosticServices}
            onChange={handleServicesChange}
          />
        );
      case 3:
        return (
          <ReasonForReferralModule
            data={formData.reasonForReferral}
            onChange={handleReasonChange}
          />
        );
      case 4:
        return (
          <ClinicalNotesModule
            value={formData.clinicalNotes}
            onChange={handleNotesChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="page-container">
      <BranchIndicator />
      
      <div className="page-header">
        <h1 className="page-title">Create Referral Form</h1>
        <p className="page-subtitle">Fill in the diagnostic referral details</p>
      </div>

      <div className="stepper">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`step ${index === currentStep ? 'active' : ''} ${
              index < currentStep ? 'completed' : ''
            }`}
            onClick={() => setCurrentStep(index)}
          >
            <div className="step-number">{index + 1}</div>
            <span className="step-title">{step.title}</span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        {renderStepContent()}

        <div className="form-actions">
          <div className="action-left">
            <button type="button" className="btn btn-secondary" onClick={handleReset}>
              Reset Form
            </button>
          </div>
          <div className="action-right">
            {currentStep > 0 && (
              <button type="button" className="btn btn-outline" onClick={prevStep}>
                Previous
              </button>
            )}
            {currentStep < steps.length - 1 ? (
              <button type="button" className="btn btn-primary" onClick={nextStep}>
                Next
              </button>
            ) : (
              <button type="submit" className="btn btn-success">
                Submit Form
              </button>
            )}
          </div>
        </div>
      </form>

      <Modal
        isOpen={showSuccess}
        onClose={handleSuccessClose}
        title="Form Submitted Successfully"
        actions={
          <button className="btn btn-primary" onClick={handleSuccessClose}>
            View All Forms
          </button>
        }
      >
        <div className="success-message">
          <svg viewBox="0 0 24 24" className="success-icon">
            <path
              fill="currentColor"
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
            />
          </svg>
          <p>The referral form has been saved successfully.</p>
          <p className="success-detail">
            Patient: <strong>{formData.patient.patientName}</strong>
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default CreateForm;
