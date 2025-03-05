import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Profile from "../svg/ProfileCircle-Linear-32px.svg";
import Email from "../svg/Profile-Linear-32px.svg";
import Lock from "../svg/Unlock-Linear-32px.svg";

import http from "../axios.js";

const Login = () => {
  const [checked, setChecked] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        email: e.target.email.value,
        password: e.target.password.value,
        rememberMe: e.target.rememberMe.checked,
      };

      const response = await http.post("/login", formData);

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        window.location.href = "/home";
      } 
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const checkAuthority = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      window.location.href = "/home";
    }
  }

  useEffect(() => {
    checkAuthority();
  }, [])

  return (
    <div className="row mx-auto justify-content-center bg-card rounded-1 pb-3">
      <div className="box py-2">
        <p className="text-dark text-center my-auto fs-5">Sign in</p>
      </div>
      <div className="row justify-content-center mt-3">
        <img src={Profile} alt="Profile" className="profile-img" />
      </div>
      <div>
        <form onSubmit={handleLogin}>
          <div className="input-group my-3">
            <span className="input-group-text bg-input-box border-0" id="email">
              <img src={Email} alt="Email" />
            </span>
            <input
              type="email"
              className="form-control bg-input-box border-0"
              placeholder="Email"
              aria-label="Email"
              aria-describedby="email"
              name="email"
              autoComplete="off"
            />
          </div>
          <div className="input-group mt-3">
            <span
              className="input-group-text bg-input-box border-0"
              id="password"
            >
              <img src={Lock} alt="Email" />
            </span>
            <input
              type="password"
              className="form-control bg-input-box border-0"
              placeholder="Password"
              aria-label="Password"
              aria-describedby="password"
              name="password"
              autoComplete="off"
            />
          </div>
          <div className="d-flex justify-content-between mt-2 mb-4">
            <div>
              <input
                type="checkbox"
                className="form-check-input"
                checked={checked}
                onChange={() => setChecked(!checked)}
                name="rememberMe"
              />
              <label
                className="form-check-label text-white ms-1 user-select-none"
                onClick={(e) => setChecked(!checked)}
              >
                Remember me
              </label>
            </div>
            <Link to="/" className="text-white text-decoration-none">
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            className="rounded-2 py-1 btn-signup w-100 fs-5"
          >
            Login
          </button>
        </form>
      </div>
      <div className="text-end">
        <Link to="/register" className="text-white text-decoration-none">
          Register as a new User?
        </Link>
      </div>
    </div>
  );
};

export default Login;
