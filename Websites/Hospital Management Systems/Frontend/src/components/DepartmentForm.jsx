import React, { useState } from 'react';
import axios from 'axios';

const DepartmentForm = () => {
  const [departmentData, setDepartmentData] = useState({
    name: '',
    location: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDepartmentData({ ...departmentData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/submit/department', departmentData);
      alert('Department data successfully submitted!');
      setDepartmentData({ name: '', location: '' });
    } catch (error) {
      alert('Error submitting department data');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={departmentData.name}
        onChange={handleInputChange}
        placeholder="Department Name"
      />
      <input
        type="text"
        name="location"
        value={departmentData.location}
        onChange={handleInputChange}
        placeholder="Location"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default DepartmentForm;
