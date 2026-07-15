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

  const [showLoginHistory, setShowLoginHistory] = useState(false);
  const [sessions, setSessions] = useState([
    { id: 1, device: "Windows • Chrome", details: "Chennai, India", current: true },
    { id: 2, device: "Android • Chrome", details: "Last Active • Yesterday", current: false }
  ]);

  const loginHistoryLogs = [
    { date: "15 Jul 2026, 11:45 AM", device: "Windows 11 • Chrome 126.0", location: "Chennai, India", ip: "103.241.12.89", status: "Active Now" },
    { date: "14 Jul 2026, 09:12 AM", device: "Android 14 • Chrome Mobile", location: "Chennai, India", ip: "103.241.12.89", status: "Logged Out" },
    { date: "13 Jul 2026, 02:22 PM", device: "macOS Sonoma • Safari 17.4", location: "Bengaluru, India", ip: "122.164.45.102", status: "Logged Out" },
    { date: "10 Jul 2026, 06:15 PM", device: "Windows 11 • Chrome 126.0", location: "Chennai, India", ip: "103.241.12.89", status: "Expired" }
  ];

  const handleDownloadMyData = () => {
    try {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
        employee_profile: {
          id: employee?.id,
          employee_id: employee?.employee_id,
          full_name: fullName,
          email: email,
          phone_number: phone
        },
        preferences: {
          theme_mode: darkMode ? "Dark" : "Light",
          display_language: language,
          email_notifications: emailNotifications,
          two_factor_auth: twoFactor
        },
        exported_at: new Date().toISOString()
      }, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `employee_data_${employee?.employee_id || 'profile'}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    } catch (err) {
      console.error(err);
      alert("Failed to compile and download data.");
    }
  };

  const handleExportSettings = () => {
    try {
      const settingsStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
        theme_mode: darkMode ? "Dark" : "Light",
        display_language: language,
        email_notifications: emailNotifications,
        two_factor_auth: twoFactor,
        exported_at: new Date().toISOString()
      }, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", settingsStr);
      downloadAnchor.setAttribute("download", `settings_export.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    } catch (err) {
      console.error(err);
      alert("Failed to export settings.");
    }
  };

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

        {sessions.map((sess) => (
          <div className="session-item" key={sess.id}>
            <div>
              <h4>{sess.device}</h4>
              <p>{sess.details}</p>
            </div>
            {sess.current ? (
              <span className="active-session">
                Current Session
              </span>
            ) : (
              <button 
                className="logout-btn" 
                onClick={() => {
                  setSessions(sessions.filter(s => s.id !== sess.id));
                  alert(`Logged out of session on ${sess.device} successfully.`);
                }}
              >
                Logout
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Privacy */}
      <div className="privacy-card">
        <div className="card-header">
          <h3>Privacy & Data</h3>
        </div>

        <div className="privacy-grid">
          <button className="outline-btn" onClick={handleDownloadMyData}>
            Download My Data
          </button>
          <button className="outline-btn" onClick={handleExportSettings}>
            Export Settings
          </button>
          <button className="outline-btn" onClick={() => setShowLoginHistory(true)}>
            Login History
          </button>
          <button className="danger-btn" onClick={async () => {
            if (window.confirm("Are you sure you want to log out of all active devices and sessions globally?")) {
              try {
                await authAPI.logoutAll();
              } catch (err) {
                console.error("Global logout error:", err);
              }
              localStorage.removeItem("access_token");
              localStorage.removeItem("user_email");
              localStorage.removeItem("user_id");
              window.location.reload();
            }
          }}>
            Logout All Devices
          </button>
        </div>
      </div>

      {/* Login History Modal */}
      {showLoginHistory && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(15, 23, 42, 0.4)",
          backdropFilter: "blur(4px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 9999,
          animation: "fadeIn 0.2s ease-out"
        }}>
          <div style={{
            background: "#FFF",
            width: "90%",
            maxWidth: "600px",
            borderRadius: "24px",
            border: "1px solid #E9E4F5",
            padding: "24px",
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
          }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #F3F4F6",
              paddingBottom: "16px",
              marginBottom: "16px"
            }}>
              <h3 style={{
                color: "#1E293B",
                fontSize: "18px",
                fontWeight: "700",
                fontFamily: "Inter, sans-serif",
                margin: 0
              }}>Login History</h3>
              <button 
                onClick={() => setShowLoginHistory(false)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "24px",
                  color: "#9CA3AF",
                  cursor: "pointer",
                  padding: "4px"
                }}
              >
                &times;
              </button>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid #F3F4F6", textAlign: "left" }}>
                    <th style={{ padding: "10px 6px", fontSize: "11px", color: "#9CA3AF", textTransform: "uppercase" }}>Date & Time</th>
                    <th style={{ padding: "10px 6px", fontSize: "11px", color: "#9CA3AF", textTransform: "uppercase" }}>Device</th>
                    <th style={{ padding: "10px 6px", fontSize: "11px", color: "#9CA3AF", textTransform: "uppercase" }}>IP & Location</th>
                    <th style={{ padding: "10px 6px", fontSize: "11px", color: "#9CA3AF", textTransform: "uppercase" }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {loginHistoryLogs.map((log, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid #F3F4F6" }}>
                      <td style={{ padding: "12px 6px", fontSize: "12px", color: "#4B5563" }}>{log.date}</td>
                      <td style={{ padding: "12px 6px", fontSize: "12px", color: "#1E293B", fontWeight: "600" }}>{log.device}</td>
                      <td style={{ padding: "12px 6px", fontSize: "12px", color: "#4B5563" }}>
                        <div>{log.location}</div>
                        <div style={{ fontSize: "10px", color: "#9CA3AF" }}>{log.ip}</div>
                      </td>
                      <td style={{ padding: "12px 6px" }}>
                        <span style={{
                          fontSize: "10px",
                          fontWeight: "600",
                          padding: "3px 8px",
                          borderRadius: "20px",
                          backgroundColor: log.status === "Active Now" ? "rgba(34, 181, 115, 0.1)" : "rgba(156, 163, 175, 0.1)",
                          color: log.status === "Active Now" ? "#22B573" : "#9CA3AF"
                        }}>
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
              <button 
                onClick={() => setShowLoginHistory(false)}
                style={{
                  background: "#6C3EF4",
                  color: "#FFF",
                  border: "none",
                  borderRadius: "8px",
                  padding: "8px 16px",
                  fontSize: "13px",
                  fontWeight: "600",
                  cursor: "pointer"
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Settings;