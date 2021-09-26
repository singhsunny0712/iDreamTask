// import { Logout } from "@mui/icons-material";
import React, { useState } from "react";
import LOGIN from "./Login";
import SIGNUP from "./SignUp";

const LandingPage = () => {
  const [flag, setflag] = useState("login");

  function changeFlagState(data) {
    setflag(data);
  }

  // const [toggle, setToggle] = useState("login");
  // const handleClick = () => {
  //       if(toggle) {
  //             setToggle(false)
  //       } else {
  //             setToggle(true)
  //       }
  // }
  return (
    <div>
      <div className="row p-5">
        <div className="col-md-6">
          <h1>Image</h1>
        </div>
        <div className="col-md-6">
          <div className="mainCard p-5">
            <div className="row">
              <div className="col-md-3">
                <button
                  className="btn1"
                  onClick={() => changeFlagState("login")}
                >
                  <h2>Login</h2>
                </button>
                <hr className="upperDivider" />
              </div>
              <div className="col-md-4">
                <button
                  className="btn1"
                  onClick={() => changeFlagState("signin")}
                >
                  <h2>Sign up</h2>
                </button>
                <hr className="upperDivider" />
              </div>
            </div>
            <div className="row">
              {flag === "login" ? <LOGIN /> : <SIGNUP changeFlagState={changeFlagState}/>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
