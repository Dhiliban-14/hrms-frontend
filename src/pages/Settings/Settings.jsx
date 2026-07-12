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

  return (

    <div className="settings-page">

      {/* Breadcrumb */}

      <div className="breadcrumb">

        Dashboard

        <span> / </span>

        Settings

      </div>

      {/* Header */}

      <div className="settings-header">

        <div>

          <h1>

            Settings

          </h1>

          <p>

            Customize your employee portal preferences.

          </p>

        </div>

        <button className="save-btn">

          <Save size={18}/>

          Save Changes

        </button>

      </div>

      {/* KPI */}

      <div className="settings-grid">

        {cards.map((item,index)=>(

          <div
            className="setting-card"
            key={index}
          >

            <div
              className="setting-icon"
              style={{
                background:item.color,
              }}
            >

              {item.icon}

            </div>

            <div>

              <h3>

                {item.title}

              </h3>

              <p>

                {item.desc}

              </p>

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
              defaultValue="Alex Rivera"
            />

          </div>

          <div className="form-group">

            <label>Email</label>

            <input
              type="email"
              defaultValue="alex@zeaisoft.com"
            />

          </div>

          <div className="form-group">

            <label>Phone Number</label>

            <input
              type="text"
              defaultValue="+91 98765 43210"
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
            />

          </div>

          <div className="form-group">

            <label>New Password</label>

            <input
              type="password"
              placeholder="********"
            />

          </div>

          <div className="form-group">

            <label>Confirm Password</label>

            <input
              type="password"
              placeholder="********"
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

            <input type="checkbox" />

          </div>

          <div className="preference-item">

            <Bell size={22} />

            <div>

              <h4>Email Notifications</h4>

              <p>Receive HR notifications</p>

            </div>

            <input type="checkbox" defaultChecked />

          </div>

          <div className="preference-item">

            <ShieldCheck size={22} />

            <div>

              <h4>Two Factor Authentication</h4>

              <p>Extra account protection</p>

            </div>

            <input type="checkbox" />

          </div>

          <div className="preference-item">

            <Globe size={22} />

            <div>

              <h4>Language</h4>

              <select>

                <option>English</option>

                <option>Tamil</option>

                <option>Hindi</option>

              </select>

            </div>

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

          <button className="logout-btn">

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

          <button className="outline-btn">

            Download My Data

          </button>

          <button className="outline-btn">

            Export Settings

          </button>

          <button className="outline-btn">

            Login History

          </button>

          <button className="danger-btn">

            Logout All Devices

          </button>

        </div>

      </div>

    </div>

  );

}

export default Settings;