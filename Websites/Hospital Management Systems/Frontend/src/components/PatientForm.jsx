import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PatientForm = () => {
  const [patientData, setPatientData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState('');

  // Fetch list of patients to populate the dropdown
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:5000/get/patients');
        console.log("Fetched patients:", response.data); // Debugging the fetched data
        setPatients(response.data);
      } catch (error) {
        console.error('Error fetching patients', error);
      }
    };

    fetchPatients();
  }, []);

  // Handle input change for form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientData({ ...patientData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/submit/patient', patientData);
      alert('Patient data successfully submitted!');
      setPatientData({ name: '', email: '', phone: '', address: '' });
    } catch (error) {
      alert('Error submitting patient data');
    }
  };

  // Fetch selected patient details
  const handlePatientSelect = async (e) => {
    const patientId = e.target.value;
    setSelectedPatientId(patientId);

    if (patientId) {
      try {
        const response = await axios.get(`http://localhost:5000/get/patient/${patientId}`);
        console.log('Fethched Details',response.data);
          setPatientData({
            name: response.data.name,
            email: response.data.email,
            phone: response.data.phone,
            address: response.data.address,
          });
      } catch (error) {
        alert('Error fetching patient details');
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={patientData.name}
          onChange={handleInputChange}
          placeholder="Patient Name"
        />
        <input
          type="email"
          name="email"
          value={patientData.email}
          onChange={handleInputChange}
          placeholder="Patient Email"
        />
        <input
          type="text"
          name="phone"
          value={patientData.phone}
          onChange={handleInputChange}
          placeholder="Patient Phone"
        />
        <textarea
          name="address"
          value={patientData.address}
          onChange={handleInputChange}
          placeholder="Patient Address"
        />
        <button type="submit">Submit</button>
      </form>

      {/* Patient ID Dropdown */}
      <div>
        <label htmlFor="patient-select">Select a Patient ID: </label>
        <select id="patient-select" value={selectedPatientId} onChange={handlePatientSelect}>
          <option value="">--Select a Patient--</option>
          {patients.length > 0 ? (
            patients.map((patient) => (
              <option key={patient.id} value={patient.id}>
                {patient.id}
              </option>
            ))
          ) : (
            <option value="">No patients available</option>
          )}
        </select>
      </div>
    </div>
  );
};

export default PatientForm;
