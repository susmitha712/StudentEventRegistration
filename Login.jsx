import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import WelcomeCard from "./WelcomeCard";
const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const response = await fetch("http://localhost:5000/api/auth/login", {  // Ensure this matches backend
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
  
    const data = await response.json();
  
    if (response.ok) {
      localStorage.setItem("token", data.token);  // Store token in localStorage
      alert("Login successful!");
      window.location.href = "/dashboard"; // Redirect after login
    } else {
      alert(data.message);
    }
  };
  
const PhoneNumberInput = () => {
  const [phone, setPhone] = useState("");

  const handleChange = (event) => {
    setPhone(event.target.value);
  }
  };

  return (
    
    <div className="form-containers">
    
    <div className="video-background">
            <video autoPlay loop muted playsInline className="background-video">
              <source src="/videos/background2.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            </div>
            <div className="form-container">
      <h2 style={{marginRight:30}}>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
        <p>Don't you have an account? <Link to="/register" className="link-style">Register</Link></p>
      </form>
    </div>
            
    </div>
    
  );
};
export default Login;
