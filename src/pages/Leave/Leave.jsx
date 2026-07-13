import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import "./Leave.css";

import {
  CalendarDays,
  HeartPulse,
  Plane,
  Briefcase,
  CalendarRange,
  Download,
} from "lucide-react";

import { leaveAPI } from "../../services/api";

function Leave() {
  const { employee } = useOutletContext() || {};
  const [stats, setStats] = useState([]);
  const [balances, setBalances] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [leaveType, setLeaveType] = useState("Earned");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchLeaveData = async () => {
    if (!employee) return;
    try {
      setLoading(true);
      const [balancesRes, requestsRes] = await Promise.all([
        leaveAPI.getBalances(),
        leaveAPI.getRequests()
      ]);

      setBalances(balancesRes || null);
      setRequests(requestsRes || []);

      const earnedLeft = (balancesRes?.earned_total || 20) - (balancesRes?.earned_used || 0);
      const sickLeft = (balancesRes?.sick_total || 10) - (balancesRes?.sick_used || 0);
      const casualLeft = (balancesRes?.casual_total || 12) - (balancesRes?.casual_used || 0);
      const leavesTaken = (balancesRes?.earned_used || 0) + (balancesRes?.sick_used || 0) + (balancesRes?.casual_used || 0);

      setStats([
        {
          title: "Earned Leave",
          value: earnedLeft.toString(),
          sub: "Remaining",
          color: "#6C3EF4",
          icon: <CalendarDays size={20} />,
        },
        {
          title: "Sick Leave",
          value: sickLeft.toString(),
          sub: "Remaining",
          color: "#22B573",
          icon: <HeartPulse size={20} />,
        },
        {
          title: "Casual Leave",
          value: casualLeft.toString(),
          sub: "Remaining",
          color: "#FF9E44",
          icon: <Plane size={20} />,
        },
        {
          title: "Work From Home",
          value: "8",
          sub: "Available",
          color: "#4F8CFF",
          icon: <Briefcase size={20} />,
        },
        {
          title: "Leave Taken",
          value: leavesTaken.toString(),
          sub: "This Year",
          color: "#E5484D",
          icon: <CalendarDays size={20} />,
        },
        {
          title: "Upcoming Holiday",
          value: "3",
          sub: "This Month",
          color: "#FF9E44",
          icon: <CalendarRange size={20} />,
        },
      ]);
    } catch (err) {
      console.error("Failed to load leave details:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaveData();
  }, [employee]);

  const handleSubmitLeave = async (e) => {
    e.preventDefault();
    if (submitting) return;

    // Frontend validations
    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }

    const fromDate = new Date(startDate);
    const toDate = new Date(endDate);
    
    // Normalize dates for day calculation
    fromDate.setHours(0, 0, 0, 0);
    toDate.setHours(0, 0, 0, 0);

    const timeDiff = toDate.getTime() - fromDate.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1; // Inclusive day count

    if (daysDiff <= 0) {
      alert("End Date must be on or after Start Date.");
      return;
    }

    if (!reason.trim()) {
      alert("Please provide a reason for the leave request.");
      return;
    }

    setSubmitting(true);

    // Map leave type to expected values
    const leaveTypeName = leaveType === "Earned" ? "Earned Leave" : leaveType === "Sick" ? "Sick Leave" : "Casual Leave";

    const payload = {
      leave_type: leaveTypeName,
      from_date: startDate,
      to_date: endDate,
      total_days: daysDiff,
      session: "Full Day", // Required backend field default
      leave_reason: reason,
      reason_details: emergencyContact ? `Emergency Contact: ${emergencyContact}` : null
    };

    console.log("Outgoing Leave Request Payload:", payload);

    try {
      const response = await leaveAPI.createRequest(payload);
      console.log("Backend Leave Request Response:", response);

      alert("Leave request submitted successfully!");
      // Reset form fields
      setStartDate("");
      setEndDate("");
      setReason("");
      setEmergencyContact("");

      // Re-fetch data
      await fetchLeaveData();
    } catch (err) {
      console.error("Failed to submit leave request:", err);
      
      // Parse FastAPI validation details for robust alerts
      let errorMsg = "Failed to submit request.";
      if (err.response?.data?.detail) {
        if (Array.isArray(err.response.data.detail)) {
          errorMsg = err.response.data.detail
            .map(d => `${d.loc.join(".")}: ${d.msg}`)
            .join("\n");
        } else if (typeof err.response.data.detail === "string") {
          errorMsg = err.response.data.detail;
        }
      } else if (err.message) {
        errorMsg = err.message;
      }
      alert(errorMsg);
    } finally {
      setSubmitting(false);
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
        <div>Loading leave details...</div>
      </div>
    );
  }

  return (
    <div className="leave-page fade-in">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        Dashboard
        <span> / </span>
        Apply Leave
      </div>

      {/* Header */}
      <div className="leave-header">
        <div>
          <h1>Leave Management</h1>
          <p>Apply leave and track approval status.</p>
        </div>
        <button className="download-btn" onClick={() => window.print()}>
          <Download size={18} />
          Download Report
        </button>
      </div>

      {/* KPI Cards */}
      <div className="stats-grid">
        {stats.map((item, index) => (
          <div className="stat-card" key={index}>
            <div className="stat-icon" style={{ background: item.color }}>
              {item.icon}
            </div>
            <div className="stat-content">
              <span>{item.title}</span>
              <h2>{item.value}</h2>
              <p>{item.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Leave Balance & Form */}
      <div className="leave-section">
        {/* Leave Balance */}
        <div className="balance-card">
          <div className="card-header">
            <h3>Leave Balance</h3>
            <button>View Details</button>
          </div>

          <div className="balance-list">
            <div className="balance-item">
              <span>Earned Leave</span>
              <strong>{balances ? balances.earned_total - balances.earned_used : 20} Days</strong>
            </div>

            <div className="balance-item">
              <span>Sick Leave</span>
              <strong>{balances ? balances.sick_total - balances.sick_used : 10} Days</strong>
            </div>

            <div className="balance-item">
              <span>Casual Leave</span>
              <strong>{balances ? balances.casual_total - balances.casual_used : 12} Days</strong>
            </div>

            <div className="balance-item">
              <span>Work From Home</span>
              <strong>8 Days</strong>
            </div>
          </div>
        </div>

        {/* Apply Leave Form */}
        <div className="leave-form-card">
          <div className="card-header">
            <h3>Apply Leave</h3>
          </div>

          <form className="leave-form" onSubmit={handleSubmitLeave}>
            <div className="form-group">
              <label>Leave Type</label>
              <select value={leaveType} onChange={(e) => setLeaveType(e.target.value)}>
                <option value="Earned">Earned Leave (Annual)</option>
                <option value="Sick">Sick Leave</option>
                <option value="Casual">Casual Leave</option>
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Start Date</label>
                <input 
                  type="date" 
                  value={startDate} 
                  onChange={(e) => setStartDate(e.target.value)} 
                  required 
                />
              </div>

              <div className="form-group">
                <label>End Date</label>
                <input 
                  type="date" 
                  value={endDate} 
                  onChange={(e) => setEndDate(e.target.value)} 
                  required 
                />
              </div>
            </div>

            <div className="form-group">
              <label>Reason</label>
              <textarea
                rows="4"
                placeholder="Enter leave reason..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="form-group">
              <label>Emergency Contact</label>
              <input
                type="text"
                placeholder="Phone Number"
                value={emergencyContact}
                onChange={(e) => setEmergencyContact(e.target.value)}
              />
            </div>

            <button className="submit-btn" type="submit" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit Leave Request"}
            </button>
          </form>
        </div>
      </div>

      {/* Leave History */}
      <div className="history-card">
        <div className="card-header">
          <h3>Leave History</h3>
          <button>View All</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Leave Type</th>
              <th>From</th>
              <th>To</th>
              <th>Days</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", color: "#bfbfbf" }}>No leave requests found.</td>
              </tr>
            ) : (
              requests.map((item, index) => (
                <tr key={index}>
                  <td>{item.leave_type.toLowerCase().includes("leave") ? item.leave_type : `${item.leave_type} Leave`}</td>
                  <td>{new Date(item.from_date || item.start_date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</td>
                  <td>{new Date(item.to_date || item.end_date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</td>
                  <td>{item.total_days}</td>
                  <td>
                    <span className={`history-status ${item.status.toLowerCase()}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leave;