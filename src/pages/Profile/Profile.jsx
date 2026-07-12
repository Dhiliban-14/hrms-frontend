import "./Profile.css";

import {
  BadgeCheck,
  Building2,
  CalendarDays,
  Briefcase,
  User,
  Users,
  MapPin,
  Clock3,
  Building,
  ShieldCheck,
  Landmark,
  Home,
  FileText,
  Download,
} from "lucide-react";
const employeeInfo = [
  {
    icon: <BadgeCheck size={18} />,
    label: "Employee ID",
    value: "EMP-2048",
  },
  {
    icon: <User size={18} />,
    label: "Reporting Manager",
    value: "John Smith",
  },

  {
    icon: <Building2 size={18} />,
    label: "Department",
    value: "Engineering",
  },
  {
    icon: <Users size={18} />,
    label: "Team",
    value: "Product Development",
  },

  {
    icon: <Briefcase size={18} />,
    label: "Designation",
    value: "Software Engineer",
  },
  {
    icon: <Building size={18} />,
    label: "Business Unit",
    value: "Technology",
  },

  {
    icon: <User size={18} />,
    label: "Employment Type",
    value: "Full-Time",
  },
  {
    icon: <ShieldCheck size={18} />,
    label: "Employment Status",
    value: "Active",
    status: true,
  },

  {
    icon: <CalendarDays size={18} />,
    label: "Date of Joining",
    value: "Jan 10, 2022",
  },
  {
    icon: <Landmark size={18} />,
    label: "Office Branch",
    value: "San Francisco HQ",
  },

  {
    icon: <MapPin size={18} />,
    label: "Work Location",
    value: "San Francisco Office",
  },
  {
    icon: <Clock3 size={18} />,
    label: "Shift",
    value: "General Shift (09:00 AM - 06:00 PM)",
  },

  {
    icon: <Home size={18} />,
    label: "Work Mode",
    value: "Hybrid",
  },
  {
    icon: <Building2 size={18} />,
    label: "Cost Center",
    value: "ENG-001",
  },
];

const hierarchy = [
  "CEO",
  "CTO",
  "Engineering Manager",
  "Alex Rivera (You)",
];

const documents = [
  "Offer Letter",
  "Employment Contract",
  "NDA",
  "Employee Handbook",
];
function Profile() {
  return (
    <div className="profile-page">

      <div className="breadcrumb">

        Dashboard

        <span> / </span>

        Employee Information

      </div>

      <h1>Employee Information</h1>

      <p className="subtitle">
        View your employment and organizational information.
      </p>

      <div className="employee-card">

        <div className="employee-grid">

          {employeeInfo.map((item, index) => (

            <div
              className="employee-item"
              key={index}
            >

              <div className="employee-icon">
                {item.icon}
              </div>

              <div className="employee-text">

                <span>{item.label}</span>

                {item.status ? (

                  <label className="status-active">
                    {item.value}
                  </label>

                ) : (

                  <h4>{item.value}</h4>

                )}

              </div>

            </div>

          ))}

        </div>

          </div>

      {/* Bottom Section */}

      <div className="bottom-grid">

        {/* Organization */}

        <div className="organization-card">

          <h3>Organization Hierarchy</h3>

<div className="hierarchy">

  <div className="hierarchy-item">

    <div className="hierarchy-box">
      Chief Executive Officer
    </div>

    <div className="hierarchy-line"></div>

  </div>

  <div className="hierarchy-item">

    <div className="hierarchy-box">
      Chief Technology Officer
    </div>

    <div className="hierarchy-line"></div>

  </div>

  <div className="hierarchy-item">

    <div className="hierarchy-box">
      Engineering Manager
    </div>

    <div className="hierarchy-line"></div>

  </div>

  <div className="employee-node">

    <img
      src="https://i.pravatar.cc/100?img=8"
      alt="Employee"
    />

    <h4>Alex Rivera</h4>

    <span>Software Engineer</span>

  </div>

</div>

        </div>

        {/* Documents */}

        <div className="documents-card">

          <h3>Documents Assigned</h3>

          <div className="documents-grid">

            {documents.map((doc, index) => (

              <div
                key={index}
                className="document-box"
              >

                <FileText size={32} />

                <h4>{doc}</h4>

                <span>PDF</span>

              </div>

            ))}

          </div>

        </div>

      </div>

      {/* Download */}

      <div className="download-section">

        <button className="download-btn">

          <Download size={18} />

          Download Employee Verification

        </button>

      </div>

      <footer className="profile-footer">

        © 2026 ZeAI HRMS Portal. All Rights Reserved.

      </footer>

    </div>
  );
}

export default Profile;