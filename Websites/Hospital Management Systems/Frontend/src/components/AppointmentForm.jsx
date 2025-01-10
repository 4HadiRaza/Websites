import React, { useState } from 'react';
import axios from 'axios';

const AppointmentForm = () => {
  const [appointmentData, setAppointmentData] = useState({
    patient_id: '',
    doctor_id: '',
    appointment_date: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData({ ...appointmentData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/submit/appointment', appointmentData);
      alert('Appointment data successfully submitted!');
      setAppointmentData({ patient_id: '', doctor_id: '', appointment_date: '' });
    } catch (error) {
      alert('Error submitting appointment data');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="patient_id"
        value={appointmentData.patient_id}
        onChange={handleInputChange}
        placeholder="Patient ID"
      />
      <input
        type="text"
        name="doctor_id"
        value={appointmentData.doctor_id}
        onChange={handleInputChange}
        placeholder="Doctor ID"
      />
      <input
        type="date"
        name="appointment_date"
        value={appointmentData.appointment_date}
        onChange={handleInputChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default AppointmentForm;
