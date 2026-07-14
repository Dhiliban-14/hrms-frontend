import { useState, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
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

import { employeeAPI } from "../../services/api";

function Profile() {
  const { employee } = useOutletContext() || {};
  const navigate = useNavigate();
  const [hierarchyList, setHierarchyList] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [requestingLetter, setRequestingLetter] = useState(false);

  useEffect(() => {
    if (!employee) return;

    const fetchProfileDetails = async () => {
      try {
        setLoading(true);
        const [hierarchyData, docsData] = await Promise.allSettled([
          employeeAPI.getHierarchy(),
          employeeAPI.getDocuments()
        ]);

        if (hierarchyData.status === "fulfilled" && hierarchyData.value) {
          // Flatten manager tree: CEO -> CTO -> EM
          const list = [];
          let current = hierarchyData.value.manager;
          while (current) {
            list.unshift(current); // unshift to keep top-level managers first
            current = current.manager;
          }
          setHierarchyList(list);
        }

        if (docsData.status === "fulfilled" && docsData.value) {
          setDocuments(docsData.value);
        }
      } catch (err) {
        console.error("Failed to load profile details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileDetails();
  }, [employee]);

  const handleRequestVerification = async () => {
    if (requestingLetter) return;
    setRequestingLetter(true);
    try {
      const purpose = prompt(
        "Enter the purpose for the Employment Verification Letter (e.g., Bank Loan, Visa Application):",
        "General Employment Verification"
      );
      if (!purpose) {
        setRequestingLetter(false);
        return;
      }

      const recipient = prompt("Enter the recipient authority (e.g., State Bank, US Embassy):", "To Whom It May Concern");
      if (!recipient) {
        setRequestingLetter(false);
        return;
      }

      await employeeAPI.requestVerificationLetter({
        purpose,
        recipient,
        email: employee?.email || "",
        address: employee?.current_address || "Office Headquarters",
        additional_notes: "Requested via Employee Self Service Portal"
      });

      alert("Employment Verification Letter request submitted and auto-generated successfully!");
    } catch (err) {
      console.error("Verification letter request failed:", err);
      alert(err.response?.data?.detail || "Failed to submit request.");
    } finally {
      setRequestingLetter(false);
    }
  };

  if (loading) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "60vh",
        color: "#ffffff",
        fontFamily: "Segoe UI, sans-serif"
      }}>
        <div>Loading profile details...</div>
      </div>
    );
  }

  const employeeInfo = [
    {
      icon: <BadgeCheck size={18} />,
      label: "Employee ID",
      value: employee?.employee_id || "N/A",
    },
    {
      icon: <User size={18} />,
      label: "Reporting Manager",
      value: hierarchyList.length > 0 ? hierarchyList[hierarchyList.length - 1].full_name : "CEO / Board",
    },
    {
      icon: <Building2 size={18} />,
      label: "Department",
      value: employee?.department || "N/A",
    },
    {
      icon: <Briefcase size={18} />,
      label: "Designation",
      value: employee?.designation || "N/A",
    },
    {
      icon: <User size={18} />,
      label: "Email Address",
      value: employee?.email || "N/A",
    },
    {
      icon: <ShieldCheck size={18} />,
      label: "Employment Status",
      value: employee?.status || "Active",
      status: true,
    },
    {
      icon: <CalendarDays size={18} />,
      label: "Date of Joining",
      value: employee?.date_of_joining || "N/A",
    },
    {
      icon: <Landmark size={18} />,
      label: "Work Location",
      value: employee?.work_location || "N/A",
    },
    {
      icon: <Clock3 size={18} />,
      label: "Shift",
      value: employee?.shift || "N/A",
    },
    {
      icon: <Home size={18} />,
      label: "Work Mode",
      value: employee?.work_mode || "N/A",
    },
    {
      icon: <Building2 size={18} />,
      label: "Cost Center",
      value: employee?.cost_center || "N/A",
    },
  ];

  return (
    <div className="profile-page fade-in">
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
            <div className="employee-item" key={index}>
              <div className="employee-icon">{item.icon}</div>
              <div className="employee-text">
                <span>{item.label}</span>
                {item.status ? (
                  <label className="status-active">{item.value}</label>
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
            {hierarchyList.map((mgr, index) => (
              <div className="hierarchy-item" key={mgr.id || index}>
                <div className="hierarchy-box">
                  <strong>{mgr.full_name}</strong>
                  <span>{mgr.designation}</span>
                </div>
                <div className="hierarchy-line"></div>
              </div>
            ))}

            <div className="employee-node">
              <img
                src={employee?.photo_url || "https://i.pravatar.cc/100?img=8"}
                alt="Employee"
                onError={(e) => {
                  e.target.src = "https://i.pravatar.cc/100?img=8";
                }}
              />
              <h4>{employee?.full_name}</h4>
              <span>{employee?.designation} (You)</span>
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
                onClick={() => {
                  if (doc.name === "Offer Letter") {
                    navigate("/employee/offer-letter");
                  } else if (doc.name === "Employment Contract") {
                    navigate("/employee/employment-contract");
                  } else if (doc.name === "NDA") {
                    navigate("/employee/nda");
                  }
                }}
                style={{ cursor: (doc.name === "Offer Letter" || doc.name === "Employment Contract" || doc.name === "NDA") ? "pointer" : "default" }}
              >
                <FileText size={32} />
                <h4>{doc.name}</h4>
                <span>{doc.type} ({doc.file_size})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Download */}
      <div className="download-section">
        <button 
          className="download-btn" 
          onClick={handleRequestVerification}
          disabled={requestingLetter}
        >
          <Download size={18} />
          {requestingLetter ? "Requesting..." : "Download Employee Verification"}
        </button>
      </div>

      <footer className="profile-footer">
        © 2026 ZeAI HRMS Portal. All Rights Reserved.
      </footer>
    </div>
  );
}

export default Profile;