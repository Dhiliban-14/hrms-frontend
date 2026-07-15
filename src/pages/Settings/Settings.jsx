import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import "./Settings.css";

import {
  User,
  Lock,
  Bell,
  Globe,
  ShieldCheck,
  Moon,
  Settings2,
  Save,
} from "lucide-react";

import { authAPI, employeeAPI } from "../../services/api";

const cards = [
  {
    title: "Profile",
    desc: "Manage personal information",
    icon: <User size={22} />,
    color: "#6C3EF4",
  },
  {
    title: "Security",
    desc: "Password & Login",
    icon: <Lock size={22} />,
    color: "#E5484D",
  },
  {
    title: "Notifications",
    desc: "Email & Alerts",
    icon: <Bell size={22} />,
    color: "#FF9E44",
  },
  {
    title: "Preferences",
    desc: "Language & Theme",
    icon: <Settings2 size={22} />,
    color: "#22B573",
  },
];

function Settings() {
  const { employee, setEmployee } = useOutletContext() || {};
  
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const [language, setLanguage] = useState("English");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (employee) {
      setFullName(employee.full_name || "");
      setEmail(employee.email || "");
      setPhone(employee.phone_number || "");
      setDarkMode(employee.theme_mode === "Dark");
      setEmailNotifications(employee.email_notifications ?? true);
      
      let lang = "English";
      if (employee.display_language) {
        if (employee.display_language.toLowerCase().includes("tamil")) lang = "Tamil";
        else if (employee.display_language.toLowerCase().includes("hindi")) lang = "Hindi";
      }
      setLanguage(lang);
    }
  }, [employee]);

  const handleSaveChanges = async () => {
    setSaving(true);
    try {
      // 1. Password update if fields are filled
      if (newPassword) {
        if (!currentPassword) {
          alert("Please enter your current password to change it.");
          setSaving(false);
          return;
        }
        if (newPassword !== confirmPassword) {
          alert("New passwords do not match!");
          setSaving(false);
          return;
        }
        if (newPassword.length < 6) {
          alert("Password must be at least 6 characters long!");
          setSaving(false);
          return;
        }
        await authAPI.changePassword(currentPassword, newPassword);
        alert("Password updated successfully!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }

      // 2. Profile update
      const updated = await employeeAPI.updateProfile({
        full_name: fullName,
        phone_number: phone,
        theme_mode: darkMode ? "Dark" : "Light",
        display_language: language,
        email_notifications: emailNotifications,
      });

      // Update layout context
      if (setEmployee) {
        setEmployee(updated);
      }
      alert("Settings and preferences saved successfully!");
    } catch (err) {
      console.error("Failed to save settings:", err);
      let errMsg = "Failed to save settings.";
      if (err.response?.data?.detail) {
        const detail = err.response.data.detail;
        if (typeof detail === "string") {
          errMsg = detail;
        } else if (Array.isArray(detail)) {
          errMsg = detail.map(d => `${d.loc ? d.loc.join('.') : 'error'}: ${d.msg}`).join('\n');
        } else {
          errMsg = JSON.stringify(detail);
        }
      } else if (err.message) {
        errMsg = err.message;
      }
      alert(errMsg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="settings-page fade-in">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        Dashboard
        <span> / </span>
        Settings
      </div>

      {/* Header */}
      <div className="settings-header">
        <div>
          <h1>Settings</h1>
          <p>Customize your employee portal preferences.</p>
        </div>

        <button className="save-btn" onClick={handleSaveChanges} disabled={saving}>
          <Save size={18}/>
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {/* KPI Cards */}
      <div className="settings-grid">
        {cards.map((item, index) => (
          <div className="setting-card" key={index}>
            <div
              className="setting-icon"
              style={{ background: item.color }}
            >
              {item.icon}
            </div>
            <div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Settings Section */}
      <div className="settings-section">
        {/* Profile Settings */}
        <div className="settings-card">
          <div className="card-header">
            <h3>Profile Settings</h3>
          </div>

          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              disabled
              style={{ opacity: 0.6, cursor: "not-allowed" }}
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>

        {/* Security */}
        <div className="settings-card">
          <div className="card-header">
            <h3>Security</h3>
          </div>

          <div className="form-group">
            <label>Current Password</label>
            <input
              type="password"
              placeholder="********"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              placeholder="********"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="********"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="preferences-card">
        <div className="card-header">
          <h3>Preferences</h3>
        </div>

        <div className="preferences-grid">
          <div className="preference-item">
            <Moon size={22} />
            <div>
              <h4>Dark Mode</h4>
              <p>Enable dark appearance</p>
            </div>
            <input 
              type="checkbox" 
              checked={darkMode}
              onChange={(e) => setDarkMode(e.target.checked)}
            />
          </div>

          <div className="preference-item">
            <Bell size={22} />
            <div>
              <h4>Email Notifications</h4>
              <p>Receive HR notifications</p>
            </div>
            <input 
              type="checkbox" 
              checked={emailNotifications}
              onChange={(e) => setEmailNotifications(e.target.checked)}
            />
          </div>

          <div className="preference-item">
            <ShieldCheck size={22} />
            <div>
              <h4>Two Factor Authentication</h4>
              <p>Extra account protection</p>
            </div>
            <input 
              type="checkbox" 
              checked={twoFactor}
              onChange={(e) => setTwoFactor(e.target.checked)}
            />
          </div>

          <div className="preference-item">
            <Globe size={22} />
            <div>
              <h4>Language</h4>
              <p>{language}</p>
            </div>
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="language-select"
            >
              <option value="English">English</option>
              <option value="Tamil">Tamil</option>
              <option value="Hindi">Hindi</option>
            </select>
          </div>
        </div>
      </div>

      {/* Login Sessions */}
      <div className="sessions-card">
        <div className="card-header">
          <h3>Active Login Sessions</h3>
        </div>

        <div className="session-item">
          <div>
            <h4>Windows • Chrome</h4>
            <p>Chennai, India</p>
          </div>
          <span className="active-session">
            Current Session
          </span>
        </div>

        <div className="session-item">
          <div>
            <h4>Android • Chrome</h4>
            <p>Last Active • Yesterday</p>
          </div>
          <button className="logout-btn" onClick={() => alert("Logged out session successfully.")}>
            Logout
          </button>
        </div>
      </div>

      {/* Privacy */}
      <div className="privacy-card">
        <div className="card-header">
          <h3>Privacy & Data</h3>
        </div>

        <div className="privacy-grid">
          <button className="outline-btn" onClick={() => alert("Your data download has started.")}>
            Download My Data
          </button>
          <button className="outline-btn" onClick={() => alert("Settings exported.")}>
            Export Settings
          </button>
          <button className="outline-btn" onClick={() => alert("No login history available.")}>
            Login History
          </button>
          <button className="danger-btn" onClick={() => {
            localStorage.removeItem("access_token");
            window.location.reload();
          }}>
            Logout All Devices
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;