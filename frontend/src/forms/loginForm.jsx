import React, { useState } from "react";
import axios from "axios";  // Assuming you're using axios for HTTP requests
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer from react-toastify
 // Import the CSS for toast notifications
import '../styles/login.css';
import 'react-toastify/dist/ReactToastify.css'; 

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:7000/api/login", {
        email,
        password,
      }, {
        withCredentials: true
      });
     
      if (response.status === 200) {
        // Handle successful login
        console.log("Login successful", response.data);
        
        // Save token or user data as needed
       

        // Notify success
        toast.success("Login successful! Redirecting to dashboard...");

        // Navigate to the dashboard
        navigate("/dashboard"); // Adjust the path according to your routes
      }
    } catch (error) {
      if (error.response && error.response.data.error) {
        toast.error(error.response.data.error); // Show error toast
      } else {
        toast.error("An unexpected error occurred."); // Show general error toast
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className="login" type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
      <ToastContainer /> {/* Add ToastContainer to render the toast notifications */}
    </div>
  );
};

export default LoginForm;
