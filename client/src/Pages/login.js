import React, { useState } from "react";
import "./login.css";
// import { BoxIcon } from "boxicons";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    
    if (!validatePassword(password)) {
      toast.error("Please enter a valid password.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  return (
    <div className="main" style={{ height: "100vh" }}>
      <ToastContainer />
      <div>
        <img
          src="http://agency.infinyweb.com/wp-content/uploads/2022/12/LGP-1-1.png"
          className="logo"
          alt="logo-brand"
        />
      </div>
      <div className="login-page">
        <div className="image-container">
          <img
            src="https://img.freepik.com/premium-vector/flat-illustration-design-cybersecurity_9206-2585.jpg?w=740"
            alt="loginanimtedimage"
            width="100%"
            style={{ objectFit: "contain", maxHeight: "100%" }}
          />
        </div>
        <div className="form-section">
          <div className="form-wrapper">
            <h2>Welcome Back! 👋🏻</h2>
            <p>Enter your credentials to access your account.</p>

            <div className="input-container">
              <div className="form-group">
                <label>Email</label>
                <br />
                <input
                  type="text"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <br />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="remember-forgot">
              <div className="remember-me">
                <input type="checkbox" value="remember-me" id="remember-me" />
                <label>Remember me</label>
              </div>

              <a href="/forgotpassword">Forgot password?</a>
            </div>

            <button className="login-btn" onClick={handleLogin}>
              Log In
            </button>

            <div className="or-divider">or</div>

            <button className="google-signin">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="96px"
                height="96px"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                />
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                />
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                />
              </svg>
              <span>Sign in with Google</span>
            </button>
            <button
              className="google-signin"
              onClick={() => navigate("/signup")}
            >
              <box-icon
                name="user-circle"
                className="custom-icon-class"
              ></box-icon>
              <span>New User?</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
