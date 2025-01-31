// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/patients">Patients</Link></li>
        <li><Link to="/doctors">Doctors</Link></li>
        <li><Link to="/appointments">Appointments</Link></li>
        <li><Link to="/prescriptions">Prescriptions</Link></li>
        <li><Link to="/departments">Departments</Link></li> {/* Departments link */}
      </ul>
    </nav>
  );
};

export default Navbar;
