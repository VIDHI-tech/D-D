import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signup.css";

function SignupPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
    companyName: "",
    radio: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Store user data in an object
    const userData = {
      name: formData.name,
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      password: formData.password,
      companyName: formData.companyName,
      radio: formData.radio,
    };

    // Store the user data in localStorage
    localStorage.setItem("userData", JSON.stringify(userData));

    navigate("/profile");
  };

  return (
    <div className="main-div">
      <div>
        <h1>Create your D&D account</h1>
        <form onSubmit={handleSubmit} className="signup-container">
          <div className="signup-info">
            <label htmlFor="name">Full Name*</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Jhon Doe"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="signup-info">
            <label htmlFor="phoneNumber">Phone Number*</label>
            <input
              type="number"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="1234567890"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="signup-info">
            <label htmlFor="email">Email address*</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="jhon@gmail.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="signup-info">
            <label htmlFor="password">Password*</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Jhon@1989"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="signup-info">
            <label htmlFor="companyName">Company Name</label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              placeholder="Qurinom Solutions"
              value={formData.companyName}
              onChange={handleChange}
            />
          </div>
          
          <button type="submit" className="signup-btn">
            Create Account
          </button>
          
        </form>
      </div>
    </div>
  );
}

export default SignupPage;
