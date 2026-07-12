import "./TopNavbar.css";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Bell,
  CalendarDays,
  MessageCircle,
  ChevronDown,
  LogOut,
} from "lucide-react";

import profile from "../../assets/images/profile.png";

function TopNavbar({ employee }) {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_email");
    localStorage.removeItem("user_id");
    navigate("/employee/login");
  };

  return (
    <header className="top-navbar">

      {/* Search */}

      <div className="search-box">

        <Search size={18} />

        <input
          type="text"
          placeholder="Search..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              navigate("/employee/search");
            }
          }}
        />

      </div>

      {/* Right */}

      <div className="navbar-right">

        {/* Notifications */}

        <button
          className="nav-btn"
          onClick={() => navigate("/employee/notifications")}
        >
          <Bell size={18} />
        </button>

        {/* Calendar */}

        <button
          className="nav-btn"
          onClick={() => navigate("/employee/calendar")}
        >
          <CalendarDays size={18} />
        </button>

        {/* Messages */}

        <button
          className="nav-btn"
          onClick={() => navigate("/employee/messages")}
        >
          <MessageCircle size={18} />
        </button>

        {/* Profile */}

        <div
          className="profile"
          onClick={() => navigate("/employee/profile")}
          style={{ cursor: "pointer" }}
        >

          <img
            src={employee?.photo_url || profile}
            alt="Profile"
            onError={(e) => {
              e.target.src = profile;
            }}
          />

          <div className="profile-info">

            <h4>{employee?.full_name || "Employee"}</h4>

            <span>{employee?.designation || "Staff"}</span>

          </div>

          <ChevronDown size={18} />

        </div>

        {/* Logout */}

        <button
          className="nav-btn logout-btn"
          onClick={handleLogout}
          title="Logout"
          style={{ marginLeft: "10px", color: "#E5484D" }}
        >
          <LogOut size={18} />
        </button>

      </div>

    </header>
  );
}

export default TopNavbar;