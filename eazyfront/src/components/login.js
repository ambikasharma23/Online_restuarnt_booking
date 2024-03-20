import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/login.css";
import Footer from "./Footer";
import Header from "./Header";

const Login = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  useEffect(() => {
    // localStorage.clear();
    if(token){
      navigate('/Home');
    }
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isEmailValid, setIsEmailValid] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

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

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const newuser = () => {
    navigate("/");
  };

  const forgotpass=()=>{
    alert("Feature coming soon");
  }

  const gotohome = async () => {
    if (!isEmailValid) {
      console.log("Invalid email");
      return;
    }



    try {
      const response = await fetch("http://localhost:3005/customers/signin", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        window.alert("Login failed");
        throw new Error("Login failed");
      }

      const responseData = await response.json();

      localStorage.setItem("accessToken", responseData.meta.AccessToken);
      localStorage.setItem("user_id", responseData.customer.customer_id);
      localStorage.setItem("user_name", responseData.customer.customer_name);

      navigate("/home");
    } catch (error) {
      console.error("Error during login:", error);
    }
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
        <div className="company"></div>
        <div className="login-c">
          <div className="login">
            <div className="text">Log in</div>
          </div>
          <div className="inputs">
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
                  {/* <p style={{color:'GrayText',fontSize:'15px',paddingLeft:'62px'}}>Note: Password must contain atleast 6 characters</p> */}
            </div>
          </div>
          <div className="forgot-password">
            Forgot Password? <span onClick={forgotpass}>Click here</span>
          </div>
          <div className="forgot-password">
            New user? <span onClick={newuser}>Sign up</span>
          </div>
          <div className="submit-c">
            <div className="submit" onClick={gotohome} data-testid="login-button">
              Log in
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Login;
