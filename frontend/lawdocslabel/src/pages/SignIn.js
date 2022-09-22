import React, { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import './SignIn.css'

function SignIn() {
  const [toggleSignIn, settoggleSignIn] = useState(false);
  return (
    <div>
      <p className="tip">LEARNING AT WORK</p>

      <div className={toggleSignIn?"outer-container s--signup":"outer-container"}>
        
        <Login />

        <div className="sub-container">
          <div className="img">
            <div className="img__text m--up">
              <h2>New here?</h2>
              <p>Sign up and SOME CATCHY LINE AGAIN HERE!</p>
            </div>
            <div className="img__text m--in">
              <h2>Existing User?</h2>
              <p>If you already has an account, just sign in!</p>
            </div>
            <div className="img__btn" onClick={() => settoggleSignIn(s => !s)}>
              <span className="m--up">Sign Up</span>
              <span className="m--in">Sign In</span>
            </div>
          </div>
          
          <Register />

        </div>
      </div>
    </div>
  );
}

export default SignIn;
