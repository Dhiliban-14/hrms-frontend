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
    setSubmitting(true);

    try {
      if (!startDate || !endDate) {
        alert("Please select start and end dates.");
        setSubmitting(false);
        return;
      }

      await leaveAPI.createRequest({
        leave_type: leaveType,
        start_date: startDate,
        end_date: endDate,
        reason: reason,
        emergency_contact: emergencyContact || null
      });

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
      alert(err.response?.data?.detail || "Failed to submit request.");
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
    <div className="leave-page">
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
                  <td>{item.leave_type} Leave</td>
                  <td>{new Date(item.start_date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</td>
                  <td>{new Date(item.end_date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</td>
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