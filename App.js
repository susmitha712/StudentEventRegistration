import './App.css';
import Navbar from './components/Navbar';
import WelcomeCard from "./components/WelcomeCard";
import React, { useState,useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import UploadEvent from './components/UploadEvent';
import Dashboard from './components/Dashboard';
import LoginForm from './components/Loginform';

function App() {
  const [refreshDashboard, setRefreshDashboard] = useState(false);
  const aboutRef = useRef(null);
  const handleScrollToAbout = () => {
    if (aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: "smooth" }); // Smooth scrolling
    }
  };
  const handleEventAdded = () => {
    setRefreshDashboard((prev) => !prev); // Toggle state to force re-fetch in Dashboard
  };

  return (
    <div class="bg">
    <Router>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
       
        {/* <Route path="/upload-event" element={<UploadEvent onEventAdded={handleEventAdded} />} /> */}
        <Route path="/loginform" element={<LoginForm />} />
        <Route path="/uploadevent" element={<UploadEvent />} />
       
        <Route path="/dashboard" element={<Dashboard key={refreshDashboard} />} />
        <Route path="/" element={
          <div>
          <div className="video-background">
            <video autoPlay loop muted playsInline className="background-video">
              <source src="/videos/background2.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <WelcomeCard />
            </div>
          
          </div>
        } />
      </Routes>
      
    </Router>
   
    </div>
  );
}

export default App;
