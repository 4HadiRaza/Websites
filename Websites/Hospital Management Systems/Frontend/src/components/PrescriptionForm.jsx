import React, { useState } from 'react';
import axios from 'axios';

const PrescriptionForm = () => {
  const [prescriptionData, setPrescriptionData] = useState({
    patient_id: '',
    doctor_id: '',
    medication: '',
    date_prescribed: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPrescriptionData({ ...prescriptionData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/submit/prescription', prescriptionData);
      alert('Prescription data successfully submitted!');
      setPrescriptionData({ patient_id: '', doctor_id: '', medication: '', date_prescribed: '' });
    } catch (error) {
      alert('Error submitting prescription data');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="patient_id"
        value={prescriptionData.patient_id}
        onChange={handleInputChange}
        placeholder="Patient ID"
      />
      <input
        type="text"
        name="doctor_id"
        value={prescriptionData.doctor_id}
        onChange={handleInputChange}
        placeholder="Doctor ID"
      />
      <input
        type="text"
        name="medication"
        value={prescriptionData.medication}
        onChange={handleInputChange}
        placeholder="Medication"
      />
      <input
        type="date"
        name="date_prescribed"
        value={prescriptionData.date_prescribed}
        onChange={handleInputChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default PrescriptionForm;
