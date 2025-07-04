import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Ensure you're using React Router
import "./Loginform.css";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Using React Router navigation

  // Hardcoded credentials
  const validUsername = "admin";
  const validPassword = "acm&acmw";

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Both fields are required");
      return;
    }

    if (username === validUsername && password === validPassword) {
      navigate("/uploadevent"); // Redirecting using React Router
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div class="form-con">
      <div className="video-background">
            <video autoPlay loop muted playsInline className="background-video">
              <source src="/videos/background2.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            </div>
    <div className="form-container">
      <h2 style={{marginRight:30}}>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username} // Controlled Input
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password} // Controlled Input
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>} {/* Display error message */}
        <button type="submit">Login</button>
      </form>
    </div>
    </div>
  );
}
