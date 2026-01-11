import React from 'react';
import { FormSection, InputField } from '../FormElements';

const DoctorIcon = () => (
  <svg viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M14.84 16.26C17.86 16.83 20 18.29 20 20v2H4v-2c0-1.71 2.14-3.17 5.16-3.74L12 21l2.84-4.74zM8 8a4 4 0 1 1 8 0 4 4 0 0 1-8 0z"
    />
  </svg>
);

const DoctorInfoModule = ({ data, onChange, errors = {}, disabled = false }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  return (
    <FormSection title="Doctor Information" icon={<DoctorIcon />}>
      <div className="form-row">
        <InputField
          label="Doctor ID"
          name="doctorId"
          value={data.doctorId}
          onChange={handleChange}
          placeholder="e.g., DR-2024-001"
          error={errors.doctorId}
          disabled={disabled}
        />
        <InputField
          label="Doctor Name"
          name="doctorName"
          value={data.doctorName}
          onChange={handleChange}
          placeholder="Enter doctor's full name"
          required
          error={errors.doctorName}
          disabled={disabled}
        />
      </div>
      <div className="form-row">
        <InputField
          label="Doctor Phone Number"
          name="doctorPhone"
          type="tel"
          value={data.doctorPhone}
          onChange={handleChange}
          placeholder="10-digit phone number"
          required
          error={errors.doctorPhone}
          disabled={disabled}
          maxLength={10}
        />
        <InputField
          label="Clinic Name"
          name="clinicName"
          value={data.clinicName}
          onChange={handleChange}
          placeholder="Enter clinic name"
          error={errors.clinicName}
          disabled={disabled}
        />
      </div>
      <div className="form-row">
        <InputField
          label="Clinic Phone Number"
          name="clinicPhone"
          type="tel"
          value={data.clinicPhone}
          onChange={handleChange}
          placeholder="Clinic contact number"
          error={errors.clinicPhone}
          disabled={disabled}
        />
        <InputField
          label="Doctor Email"
          name="emailWhatsapp"
          value={data.emailWhatsapp}
          onChange={handleChange}
          placeholder="Email address"
          required
          error={errors.emailWhatsapp}
          disabled={disabled}
        />
      </div>
    </FormSection>
  );
};

export default DoctorInfoModule;
