import { Link } from "react-router-dom";
import React,{ useEffect } from "react";
import "./Navbar.css";
// import ACMlogo from "./assets/ACMlogo.jpg";  // Correct path
// import ACMWlogo from "./assets/ACMWlogo.png";  // Correct path

const Navbar = ({ teamType,setTeamType, setYear }) => {
  useEffect(() => {
    const trails = [];
  
    const createTrail = (e) => {
      const trail = document.createElement("div");
      trail.classList.add("trail");
      document.body.appendChild(trail);
  
      trail.style.left = `${e.clientX}px`;
      trail.style.top = `${e.clientY}px`;
  
      trails.push(trail);
  
      setTimeout(() => {
        trail.style.opacity = "0";
        setTimeout(() => {
          document.body.removeChild(trail);
        }, 500);
      }, 100);
    };
  
    document.addEventListener("mousemove", createTrail);
    return () => document.removeEventListener("mousemove", createTrail);
  }, []);
 
  
  return (
    <nav className="navbar">
      {/* ACM Logo */}
      <div className="logos">
      {/* <img src="/assets/ACMlogo.jpg" alt="ACM Logo" className="logo" /> */}
      
      {/* ACM-W Logo */}
      {/* <img src="/assets/ACMWlogo.png" alt="ACM-W Logo" className="logo" /> */}
      </div>
      
      <div class="custom-cursor"></div>

      {/* Navigation Links */}
      <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          {/* <li><Link to="/about">About</Link></li> */}
          {/* <li className="dropdown">
          <span>Our Team</span>
          <ul className="dropdown-content">
          <li><Link to="/faculty" onClick={() => setTeamType("faculty")}>Faculty</Link></li>
            <li><Link to="#" onClick={() => setTeamType("students")}>Students</Link></li>
          </ul>
        </li> */}
          <li><a href="/register"  rel="noopener noreferrer">Register</a></li>
          <li><a href="/login"  rel="noopener noreferrer">Login</a></li> 
          <li><a href="/loginform"  rel="noopener noreferrer">Create Event</a></li> 
          {/* <li><Link to="/upload-event">Create Event</Link></li> */}
        </ul>
    </nav>

  );
};

export default Navbar;
