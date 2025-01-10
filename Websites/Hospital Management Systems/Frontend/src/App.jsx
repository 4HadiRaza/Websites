import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PatientForm from './components/PatientForm';
import DoctorForm from './components/DoctorForm';
import AppointmentForm from './components/AppointmentForm';
import PrescriptionForm from './components/PrescriptionForm';
import DepartmentForm from './components/DepartmentForm';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navbar */}
        <nav className="p-4 bg-blue-500 text-white">
          <ul className="flex space-x-4">
            <li><Link to="/patients" className="hover:underline">Patients</Link></li>
            <li><Link to="/doctors" className="hover:underline">Doctors</Link></li>
            <li><Link to="/appointments" className="hover:underline">Appointments</Link></li>
            <li><Link to="/prescriptions" className="hover:underline">Prescriptions</Link></li>
            <li><Link to="/departments" className="hover:underline">Departments</Link></li> {/* Added the Departments link */}
          </ul>
        </nav>

        {/* Main content */}
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold text-center my-8">Welcome to the Admin Dashboard</h1>
          
          {/* Set up routes for the forms */}
          <Routes>
            {/* Home Page */}
            <Route path="/" element={<HomePage />} />

            {/* Form Routes */}
            <Route path="/patients" element={<PatientForm />} />
            <Route path="/doctors" element={<DoctorForm />} />
            <Route path="/appointments" element={<AppointmentForm />} />
            <Route path="/prescriptions" element={<PrescriptionForm />} />
            <Route path="/departments" element={<DepartmentForm />} /> {/* Added route for Departments */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

const HomePage = () => (
  <div className="text-center">
    <h2 className="text-xl mb-4">Admin Panel</h2>
    <p>Use the navigation above to manage Patients, Doctors, Appointments, Prescriptions, and Departments.</p>
  </div>
);

export default App;
