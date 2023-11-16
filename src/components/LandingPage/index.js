import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import "./landing.css";

function LandingPage() {

  const text = "Welcome to D&D!";
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const output = document.getElementById("output");

    const typeText = (currentIndex) => {
      if (currentIndex <= text.length) {
        output.innerHTML =
          text.substring(0, currentIndex) + '<span class="cursor"></span>';
        setTimeout(function () {
          typeText(currentIndex + 1);
        }, 200);
      } else {
        setTimeout(function () {
          output.innerHTML = "";
          typeText(0);
        }, 1000);
      }
    };

    typeText(index);

    // Cleanup function to clear the timeout on component unmount
    return () => clearTimeout();
  }, [index, text]);

  return (
    <div className="main-div">
      <div className="content">
        <h1 style={{ fontSize: '60px', fontWeight: 400 }} id="output"></h1>
        <p>Just experience the Drag & Drop here...</p>

        <Link to="/signup">
          <button className="signup-btn">Create Account</button>
        </Link>

        <Link to="/login">
          <button className="login-btn">Already Registered? Login</button>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
