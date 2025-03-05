import React from "react";
import { Outlet } from "react-router-dom";

const SignIn = () => {
  return (
    <div className="container-fluid bg-cyan">
      <div className="row justify-content-center vh-100">
        <div className="col-lg-6 col-md-8 col-sm-9 align-self-center">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
