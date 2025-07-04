import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {  
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert(data.message); // Show success message
        navigate("/login");
      } else {
        alert(data.message); // Show error message if registration fails
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };
  
  return (
    
    <div form>
      <div className="video-background">
            <video autoPlay loop muted playsInline className="background-video">
              <source src="/videos/background2.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            </div>
    <div className="form-container">
      <h2 style={{marginRight:30}}>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <span><Link to="/login"  className="link-style">Login</Link></span></p>
    </div>
   
    </div>
    
  );
};

export default Register;
