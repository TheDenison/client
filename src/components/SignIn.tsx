// import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import "/src/styles/SignIn.css";
import "/src/styles/Header.css";

const SignIn: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Здесь логика проверки логина и пароля
    console.log("Logged in successfully!");

    // Переход на /home после успешного входа
    navigate("/home");
  };
  return (
    <header className="header">
      <nav className="header_nav">
        <div className="header_logo">
          <a href="https://google.ru/" target="_blank">
            <img className="header_icon" src="assets/image_icon.png"></img>
          </a>
        </div>
      </nav>

      <div className="login-container">
        <div className="login-title">Sign In</div>
        <p className="login-subtitle">Enter your login and password below:</p>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">USERNAME:</label>
            <div className="input-wrapper">
              <FaUser className="icon fa-user" />
              <input type="text" id="username" name="username" required />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="password">PASSWORD:</label>
            <div className="input-wrapper">
              <FaLock className="icon password-icon" />
              <input type="password" id="password" name="password" required />
            </div>
          </div>
          <button type="submit" className="login-button">
            SIGN IN
          </button>
        </form>
      </div>
    </header>
  );
};

export default SignIn;
