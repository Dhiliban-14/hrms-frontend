import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar/Sidebar";
import TopNavbar from "../components/TopNavbar/TopNavbar";
import { employeeAPI } from "../services/api";

import "./EmployeeLayout.css";

function EmployeeLayout() {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/employee/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const profileData = await employeeAPI.getProfile();
        setEmployee(profileData);
      } catch (error) {
        console.error("Failed to load employee profile:", error);
        // Clear tokens and redirect if auth fails
        localStorage.removeItem("access_token");
        localStorage.removeItem("user_email");
        localStorage.removeItem("user_id");
        navigate("/employee/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#0f0f1a",
        color: "#ffffff",
        fontFamily: "Segoe UI, sans-serif"
      }}>
        <div>Loading your workspace...</div>
      </div>
    );
  }

  return (
    <div className="employee-layout">

      <Sidebar />

      <div className="employee-main">

        <TopNavbar employee={employee} />

        <main className="employee-content">
          <Outlet context={{ employee, setEmployee }} />
        </main>

      </div>

    </div>
  );
}

export default EmployeeLayout;