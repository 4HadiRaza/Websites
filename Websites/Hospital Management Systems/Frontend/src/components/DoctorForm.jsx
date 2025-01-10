import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DoctorForm = () => {
  const [doctorData, setDoctorData] = useState({
    name: '',
    specialty: '',
    phone: '',
  });

  const [doctors, setDoctors] = useState([]); // To store the list of doctors
  const [selectedDoctorId, setSelectedDoctorId] = useState('');

  // Fetch list of doctors to populate the dropdown
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/get/doctors');
        console.log('Fetched doctors:', response.data); // Debugging the fetched data
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  // Handle input change for form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDoctorData({ ...doctorData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/submit/doctor', doctorData);
      alert('Doctor data successfully submitted!');
      setDoctorData({ name: '', specialty: '', phone: '' });
    } catch (error) {
      alert('Error submitting doctor data');
    }
  };

  // Fetch selected doctor details
  const handleDoctorSelect = async (e) => {
    const doctorId = e.target.value;
    setSelectedDoctorId(doctorId);

    if (doctorId) {
      try {
        const response = await axios.get(`http://localhost:5000/get/doctor/${doctorId}`);
        console.log('Fetched doctor details:', response.data); // Debugging the fetched doctor details
        setDoctorData({
          name: response.data.name,
          specialty: response.data.specialty,
          phone: response.data.phone,
        });
      } catch (error) {
        alert('Error fetching doctor details');
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={doctorData.name}
          onChange={handleInputChange}
          placeholder="Doctor Name"
        />
        <input
          type="text"
          name="specialty"
          value={doctorData.specialty}
          onChange={handleInputChange}
          placeholder="Specialty"
        />
        <input
          type="text"
          name="phone"
          value={doctorData.phone}
          onChange={handleInputChange}
          placeholder="Phone"
        />
        <button type="submit">Submit</button>
      </form>

      {/* Doctor ID Dropdown */}
      <div>
        <label htmlFor="doctor-select">Select a Doctor ID: </label>
        <select
          id="doctor-select"
          value={selectedDoctorId}
          onChange={handleDoctorSelect}
        >
          <option value="">--Select a Doctor--</option>
          {doctors.length > 0 ? (
            doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.id} - {doctor.name}
              </option>
            ))
          ) : (
            <option value="">No doctors available</option>
          )}
        </select>
      </div>
    </div>
  );
};

export default DoctorForm;
