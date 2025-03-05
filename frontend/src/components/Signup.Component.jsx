import React, { useState } from "react";
import { Link } from "react-router-dom";

import Profile from "../svg/ProfileCircle-Linear-32px.svg";
import Email from "../svg/Profile-Linear-32px.svg";
import Lock from "../svg/Unlock-Linear-32px.svg";
import Name from "../svg/Personalcard-Linear-32px.svg";
import Calender from "../svg/Calendar-Linear-32px.svg";
import http from "../axios";

const Login = () => {
  const handleSignUP = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        name: e.target.name.value,
        email: e.target.email.value,
        password: e.target.password.value,
      };
      if (e.target.dob.value) {
        formData.dob = e.target.dob.value;
      }

      const response = await http.post("/register", formData);

      if (response.status == 201) {
        alert(response.data.message);
        window.location.href = "/";
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="row mx-auto justify-content-center bg-card rounded-1 pb-3">
      <div className="box py-2">
        <p className="text-dark text-center my-auto fs-5">Registration</p>
      </div>
      <div className="row justify-content-center mt-3">
        <img src={Profile} alt="" className="profile-img" />
      </div>
      <div>
        <form onSubmit={(e) => handleSignUP(e)}>
          <div className="input-group my-3">
            <span className="input-group-text bg-input-box border-0" id="name">
              <img src={Name} alt="" />
            </span>
            <input
              type="text"
              autoComplete="off"
              className="form-control bg-input-box border-0"
              placeholder="Name"
              aria-label="Name"
              aria-describedby="name"
              name="name"
              required
            />
          </div>
          <div className="input-group my-3">
            <span className="input-group-text bg-input-box border-0" id="email">
              <img src={Email} alt="" />
            </span>
            <input
              type="email"
              autoComplete="off"
              className="form-control bg-input-box border-0"
              placeholder="Email"
              aria-label="Email"
              aria-describedby="email"
              name="email"
              required
            />
          </div>
          <div className="input-group mt-3">
            <span
              className="input-group-text bg-input-box border-0"
              id="password"
            >
              <img src={Lock} alt="" />
            </span>
            <input
              autoComplete="off"
              type="password"
              className="form-control bg-input-box border-0"
              placeholder="Password"
              aria-label="Password"
              aria-describedby="password"
              name="password"
              required
            />
          </div>
          <div className="input-group mt-3 mb-4">
            <span className="input-group-text bg-input-box border-0" id="dob">
              <img src={Calender} alt="" />
            </span>
            <input
              type="date"
              className="form-control bg-input-box border-0"
              placeholder="DataOfBirth"
              aria-label="DataOfBirth"
              aria-describedby="dob"
              name="dob"
            />
          </div>
          <button
            type="submit"
            className="rounded-2 py-1 btn-signup w-100 fs-5"
          >
            Sign Up
          </button>
        </form>
      </div>
      <div className="text-end">
        <Link to="/" className="text-white text-decoration-none">
          Already have an account?
        </Link>
      </div>
    </div>
  );
};

export default Login;
