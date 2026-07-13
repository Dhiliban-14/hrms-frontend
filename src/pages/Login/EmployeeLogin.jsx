import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  User,
  Lock,
  Eye,
  EyeOff,
  Globe,
  Moon,
  ArrowRight,
} from "lucide-react";

import "./EmployeeLogin.css";
import loginLogo from "../../assets/logos/logo-login.png";
import employeeIllustration from "../../assets/images/emp.jpg";

import { authAPI } from "../../services/api";

function EmployeeLogin() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await authAPI.login(email, password);
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("user_email", data.email);
      localStorage.setItem("user_id", data.user_id);
      
      navigate("/employee/dashboard");
    } catch (err) {
      console.error("Login failed:", err);
      const errMsg = err.response?.data?.detail || "Invalid email or password. Please try again.";
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="login-page">

      <div className="login-overlay"></div>

      <div className="background-glow"></div>

      {/* ================= NAVBAR ================= */}

      <header className="login-navbar">

        <div className="login-logo">

          <img
            src={loginLogo}
            alt="ZeAI Logo"
          />

        </div>

        <div className="login-navbar-right">

          <button className="nav-icon">

            <Globe size={18} />

          </button>

          <button className="nav-icon">

            <Moon size={18} />

          </button>

        </div>

      </header>

      {/* ================= MAIN ================= */}

      <div className="login-main">

        {/* LEFT */}

        <motion.div
          className="login-left"
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: .8 }}
        >

          <img
            src={employeeIllustration}
            alt="Employee Illustration"
            className="employee-illustration"
          />

          <h1>

            Welcome Back!

          </h1>

          <p>

            Login to access attendance,
            payroll,
            leave management,
            employee profile,
            assigned tasks,
            and your complete HR workspace.

          </p>

        </motion.div>

        {/* RIGHT */}

        <motion.div
          className="login-card"
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: .8 }}
        >

          <h2>

            Employee Login

          </h2>

          <span>

            Sign in to continue to your workspace

          </span>

          {error && (
            <div className="login-error" style={{
              color: "#E5484D",
              backgroundColor: "rgba(229, 72, 77, 0.1)",
              border: "1px solid rgba(229, 72, 77, 0.2)",
              borderRadius: "8px",
              padding: "10px",
              marginTop: "12px",
              fontSize: "13px",
              textAlign: "center",
              fontWeight: "500"
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>

            {/* Email */}

            <div className="input-box">

              <User size={18} />

              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

            </div>

            {/* Password */}

            <div className="input-box">

              <Lock size={18} />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button
                type="button"
                className="eye-btn"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >

                {

                  showPassword

                    ? <EyeOff size={18} />

                    : <Eye size={18} />

                }

              </button>

            </div>

            {/* Remember */}

            <div className="login-options">

              <label>

                <input
                  type="checkbox"
                  checked={remember}
                  onChange={() =>
                    setRemember(!remember)
                  }
                />

                Remember Me

              </label>

              <a href="/">

                Forgot Password?

              </a>

            </div>

            {/* Login */}

            <button
              className="login-btn"
              type="submit"
              disabled={loading}
            >

              {loading ? "Logging in..." : "Login to Workspace"}

              <ArrowRight size={18} />

            </button>

          </form>

        </motion.div>

      </div>

    </div>

  );

}

export default EmployeeLogin;