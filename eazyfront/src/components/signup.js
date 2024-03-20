//signup
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/login.css";
import Footer from "./Footer";
import Header from "./Header";

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const token = localStorage.getItem("accessToken");
  useEffect(() => {
    // localStorage.clear();
    if(token)
    {
      navigate('/Home');
    }
    window.scroll(0,0);
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isEmailValid, setIsEmailValid] = useState(true);
  const handleEmailValidation = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(formData.email);
    setIsEmailValid(isValid);
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async () => {
    try {
      const response = await fetch("http://localhost:3005/customers/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Signup successful:", data);

        navigate("/login");
      }
      else if (response.status === 409) {
        alert("Email is already in use.");
      }
      
      else {
        console.error("Signup failed:", data);
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  const alreadyuser = () => {
    navigate("/login");
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div>
      <Header />
      <div
        className="background-container"
        style={{
          backgroundImage: `url(https://i.ytimg.com/vi/BnggSSaharc/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDCPX6or-vnsPUPgPl3Ntb9yTH82Q)`,
        }}
      ></div>
      <div className="login-container">
        <div className="company">
          {/* <h1>Eazydiner</h1> */}
        </div>
        <div className="login-c">
          <div className="login">
            <div className="text">Sign up</div>
          </div>
          <div className="inputs">
            <div className="input">
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
              />
            </div>
            <div className="input">
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onBlur={handleEmailValidation}
                onChange={handleFormChange}
              />
              {!isEmailValid && (
                <span className="error-message">Invalid email</span>
              )}
            </div>
            <div className="input">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password (atleast 6 characters)"
                name="password"
                value={formData.password}
                onChange={handleFormChange}
              />
              <span
                className="password-toggle"
                onClick={togglePasswordVisibility}
              >
                <img
                  src={
                    showPassword
                      ? "https://i.ibb.co/NxZKCyB/hide.png"
                      : "https://i.ibb.co/s99wjwC/show.png"
                  }
                  alt={showPassword ? "Hide" : "Show"}
                />
              </span>
            </div>
          </div>
          <div className="forgot-password">
            Already have an account? <span onClick={alreadyuser}>Log in</span>
          </div>
          <div className="submit-c">
            <div
              className="submit"
              onClick={handleSignup}
              tabIndex={0}
              role="button"
            >
              Sign Up
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Signup;
