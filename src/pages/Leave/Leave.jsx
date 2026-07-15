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

  // Inline Validation States
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({
    startDate: false,
    endDate: false,
    reason: false
  });

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  useEffect(() => {
    const newErrors = {};

    if (!leaveType) {
      newErrors.leaveType = "Leave Type is required.";
    }

    if (!startDate) {
      newErrors.startDate = "Start Date is required.";
    }

    if (!endDate) {
      newErrors.endDate = "End Date is required.";
    } else if (startDate && new Date(startDate) > new Date(endDate)) {
      newErrors.endDate = "Start Date cannot be after End Date.";
    }

    if (!reason || reason.trim() === "") {
      newErrors.reason = "Reason is required.";
    }

    setErrors(newErrors);
  }, [leaveType, startDate, endDate, reason]);

  const isFormValid = !errors.leaveType && !errors.startDate && !errors.endDate && !errors.reason && startDate && endDate && reason.trim() !== "";

  const fetchLeaveData = async (showSpinner = false) => {
    if (!employee) return;
    try {
      if (showSpinner) setLoading(true);
      const [balancesRes, requestsRes] = await Promise.all([
        leaveAPI.getBalances(),
        leaveAPI.getRequests()
      ]);

      setBalances(balancesRes || null);

      const sortedRequests = (requestsRes || []).sort((a, b) => {
        if (a.id && b.id) return b.id - a.id;
        const dateA = new Date(a.from_date || a.start_date || 0);
        const dateB = new Date(b.from_date || b.start_date || 0);
        return dateB - dateA;
      });
      setRequests(sortedRequests);

      const earnedLeft = (balancesRes?.earned_total || 20) - (balancesRes?.earned_used || 0);
      const sickLeft = (balancesRes?.sick_total || 10) - (balancesRes?.sick_used || 0);
      const casualLeft = (balancesRes?.casual_total || 12) - (balancesRes?.casual_used || 0);

      const parseLeaveTaken = (val) => {
        if (!val) return 0;
        if (typeof val === "number") return val;
        const strVal = String(val).trim();
        if (strVal.includes(":") || strVal.includes("day")) {
          const match = strVal.match(/^(\d+)/);
          if (match) return parseFloat(match[1]);
        }
        const parsed = parseFloat(strVal);
        return isNaN(parsed) ? 0 : parsed;
      };

      const leavesTaken = parseLeaveTaken(balancesRes?.earned_used) + 
                          parseLeaveTaken(balancesRes?.sick_used) + 
                          parseLeaveTaken(balancesRes?.casual_used);

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
      if (showSpinner) setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaveData(true);
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

      // Prepend to requests locally for instant UI update
      if (response) {
        setRequests(prevRequests => {
          const updated = [response, ...prevRequests];
          return updated.sort((a, b) => {
            if (a.id && b.id) return b.id - a.id;
            const dateA = new Date(a.from_date || a.start_date || 0);
            const dateB = new Date(b.from_date || b.start_date || 0);
            return dateB - dateA;
          });
        });
      }

      // Reset form fields
      setStartDate("");
      setEndDate("");
      setReason("");
      setEmergencyContact("");
      setTouched({ startDate: false, endDate: false, reason: false });

      // Re-fetch data in background (non-blocking)
      await fetchLeaveData(false);

      alert("Leave request submitted successfully!");
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

  const handleClearRequests = async () => {
    if (!window.confirm("Are you sure you want to clear all leave requests and reset balances for this demo?")) {
      return;
    }
    try {
      setLoading(true);
      await leaveAPI.clearRequests();
      setRequests([]);
      await fetchLeaveData(false);
      alert("All leave requests cleared and balances reset successfully!");
    } catch (err) {
      console.error("Failed to clear leave requests:", err);
      alert("Failed to clear requests: " + (err.response?.data?.detail || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleExportReport = () => {
    const now = new Date();
    const reportDate = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const empName = employee?.full_name || employee?.username || 'Employee';
    const empId = employee?.employee_id || employee?.id || 'N/A';
    const empDept = employee?.department || 'N/A';
    const empDesignation = employee?.designation || 'N/A';

    const earnedLeft = balances ? (balances.earned_total - balances.earned_used) : 20;
    const sickLeft = balances ? (balances.sick_total - balances.sick_used) : 10;
    const casualLeft = balances ? (balances.casual_total - balances.casual_used) : 12;

    const statsHTML = stats.map(function(s) {
      return '<div class="stat-box"><div class="label">' + s.title + '</div><div class="value">' + s.value + '</div><div class="sub">' + s.sub + '</div></div>';
    }).join('');

    let historyHTML = '';
    requests.forEach(function(item) {
      const leaveType = item.leave_type.toLowerCase().includes('leave') ? item.leave_type : item.leave_type + ' Leave';
      const from = new Date(item.from_date || item.start_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
      const to = new Date(item.to_date || item.end_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
      const days = item.total_days || '-';
      const st = item.status || '';
      let badgeBg = '#FFF3DA'; let badgeColor = '#FF9E44';
      if (st === 'Approved' || st === 'APPROVED') { badgeBg = '#DDF9EA'; badgeColor = '#22B573'; }
      else if (st === 'Rejected' || st === 'REJECTED') { badgeBg = '#FCE5E5'; badgeColor = '#E5484D'; }
      else if (st === 'Pending' || st === 'PENDING') { badgeBg = '#FFF3DA'; badgeColor = '#FF9E44'; }
      historyHTML += '<tr><td style="padding:10px 14px;border-bottom:1px solid #f0f0f0;color:#333;">' + leaveType + '</td><td style="padding:10px 14px;border-bottom:1px solid #f0f0f0;color:#333;">' + from + '</td><td style="padding:10px 14px;border-bottom:1px solid #f0f0f0;color:#333;">' + to + '</td><td style="padding:10px 14px;border-bottom:1px solid #f0f0f0;color:#333;">' + days + '</td><td style="padding:10px 14px;border-bottom:1px solid #f0f0f0;"><span style="background:' + badgeBg + ';color:' + badgeColor + ';padding:4px 14px;border-radius:20px;font-size:12px;font-weight:600;">' + st + '</span></td></tr>';
    });

    const reportHTML = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Leave Report - ' + empName + '</title><style>* { margin: 0; padding: 0; box-sizing: border-box; } body { font-family: Segoe UI, Arial, sans-serif; color: #333; background: #fff; padding: 40px; } .report-header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 3px solid #6C3EF4; padding-bottom: 20px; margin-bottom: 30px; } .report-header h1 { font-size: 26px; color: #6C3EF4; margin-bottom: 4px; } .report-header p { font-size: 13px; color: #666; } .report-header .company { display: flex; flex-direction: column; align-items: flex-end; } .report-logo-wrap { display: flex; align-items: flex-start; gap: 2px; line-height: 1; } .report-logo-text { font-size: 24px; font-weight: 900; letter-spacing: -0.05em; font-family: Arial, sans-serif; } .logo-ze { color: #4200BB; } .logo-ai { color: #191C1E; } .logo-soft { writing-mode: vertical-rl; text-orientation: mixed; font-size: 8px; font-weight: 700; color: #4200BB; letter-spacing: 0.15em; align-self: flex-end; margin-bottom: 2px; font-family: Arial, sans-serif; } .report-logo-sub { color: #4200BB; font-size: 7px; font-weight: 500; letter-spacing: 0.2em; margin-top: 1px; text-transform: uppercase; font-family: Arial, sans-serif; } .emp-info { display: grid; grid-template-columns: 1fr 1fr; gap: 8px 40px; margin-bottom: 28px; padding: 16px 20px; background: #F8F8FC; border-radius: 12px; } .emp-info div { font-size: 13px; color: #555; } .emp-info div strong { color: #222; } .section-title { font-size: 18px; font-weight: 700; color: #222; margin: 28px 0 14px; padding-bottom: 8px; border-bottom: 2px solid #ECECEC; } .stats-row { display: grid; grid-template-columns: repeat(6, 1fr); gap: 14px; margin-bottom: 24px; } .stat-box { background: #F8F8FC; border: 1px solid #ECECEC; border-radius: 14px; padding: 16px; text-align: center; } .stat-box .value { font-size: 26px; font-weight: 700; color: #222; } .stat-box .label { font-size: 11px; color: #777; display: block; margin-bottom: 6px; } .stat-box .sub { font-size: 10px; color: #999; margin-top: 4px; } .balance-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 24px; } .balance-box { background: #F8F8FC; border-radius: 14px; padding: 16px; display: flex; justify-content: space-between; align-items: center; } .balance-box span { font-size: 13px; color: #555; } .balance-box strong { font-size: 15px; color: #222; } table { width: 100%; border-collapse: collapse; } table th { text-align: left; padding: 10px 14px; background: #F8F8FC; color: #666; font-size: 12px; font-weight: 600; } .footer { margin-top: 40px; padding-top: 16px; border-top: 1px solid #ECECEC; font-size: 11px; color: #999; text-align: center; } @media print { body { padding: 20px; } }</style></head><body><div class="report-header"><div><h1>Leave Management Report</h1><p>Annual Leave Summary</p></div><div style="text-align:right;"><div class="company"><div class="report-logo-wrap"><span class="report-logo-text"><span class="logo-ze">Ze</span><span class="logo-ai">AI</span></span><span class="logo-soft">SOFT</span></div><span class="report-logo-sub">EMPOWERING YOU</span></div><p>Generated on ' + reportDate + '</p></div></div><div class="emp-info"><div><strong>Employee:</strong> ' + empName + '</div><div><strong>Employee ID:</strong> ' + empId + '</div><div><strong>Department:</strong> ' + empDept + '</div><div><strong>Designation:</strong> ' + empDesignation + '</div></div><div class="section-title">Leave Overview</div><div class="stats-row">' + statsHTML + '</div><div class="section-title">Leave Balance</div><div class="balance-grid"><div class="balance-box"><span>Earned Leave</span><strong>' + earnedLeft + ' Days</strong></div><div class="balance-box"><span>Sick Leave</span><strong>' + sickLeft + ' Days</strong></div><div class="balance-box"><span>Casual Leave</span><strong>' + casualLeft + ' Days</strong></div><div class="balance-box"><span>Work From Home</span><strong>8 Days</strong></div></div><div class="section-title">Leave Request History</div><table><thead><tr><th>Leave Type</th><th>From</th><th>To</th><th>Days</th><th>Status</th></tr></thead><tbody>' + (historyHTML || '<tr><td colspan="5" style="text-align:center;color:#bfbfbf;padding:20px;">No leave requests found.</td></tr>') + '</tbody></table><div class="footer">This report was auto-generated by ZeAI HRMS &bull; Confidential</div></body></html>';
 
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    document.body.appendChild(iframe);
    
    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write(reportHTML);
    doc.close();
    
    iframe.contentWindow.focus();
    setTimeout(() => {
      iframe.contentWindow.print();
      document.body.removeChild(iframe);
    }, 500);
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
        <button className="download-btn" onClick={handleExportReport}>
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
              <label>Leave Type <span style={{ color: "#E5484D" }}>*</span></label>
              <select 
                value={leaveType} 
                onChange={(e) => setLeaveType(e.target.value)}
                aria-required="true"
              >
                <option value="Earned">Earned Leave (Annual)</option>
                <option value="Sick">Sick Leave</option>
                <option value="Casual">Casual Leave</option>
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Start Date <span style={{ color: "#E5484D" }}>*</span></label>
                <input 
                  type="date" 
                  value={startDate} 
                  onChange={(e) => setStartDate(e.target.value)}
                  onBlur={() => handleBlur("startDate")}
                  className={touched.startDate && errors.startDate ? "invalid-input" : ""}
                  aria-required="true"
                />
                {touched.startDate && errors.startDate && (
                  <span className="error-message" style={{ color: "#E5484D", fontSize: "12px", marginTop: "4px", display: "block" }}>
                    {errors.startDate}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label>End Date <span style={{ color: "#E5484D" }}>*</span></label>
                <input 
                  type="date" 
                  value={endDate} 
                  onChange={(e) => setEndDate(e.target.value)}
                  onBlur={() => handleBlur("endDate")}
                  className={touched.endDate && errors.endDate ? "invalid-input" : ""}
                  aria-required="true"
                />
                {touched.endDate && errors.endDate && (
                  <span className="error-message" style={{ color: "#E5484D", fontSize: "12px", marginTop: "4px", display: "block" }}>
                    {errors.endDate}
                  </span>
                )}
              </div>
            </div>

            <div className="form-group">
              <label>Reason <span style={{ color: "#E5484D" }}>*</span></label>
              <textarea
                rows="4"
                placeholder="Enter leave reason..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                onBlur={() => handleBlur("reason")}
                className={touched.reason && errors.reason ? "invalid-input" : ""}
                aria-required="true"
              ></textarea>
              {touched.reason && errors.reason && (
                <span className="error-message" style={{ color: "#E5484D", fontSize: "12px", marginTop: "4px", display: "block" }}>
                  {errors.reason}
                </span>
              )}
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

            <button className="submit-btn" type="submit" disabled={submitting || !isFormValid}>
              {submitting ? "⏳ Submitting..." : "Submit Leave Request"}
            </button>
          </form>
        </div>
      </div>

      {/* Leave History */}
      <div className="history-card">
        <div className="card-header">
          <h3>Leave History</h3>
          <div style={{ display: "flex", gap: "10px" }}>
            <button 
              className="clear-demo-btn" 
              onClick={handleClearRequests}
              style={{
                background: "rgba(229, 72, 77, 0.1)",
                color: "#E5484D",
                border: "1px solid rgba(229, 72, 77, 0.2)",
                padding: "6px 12px",
                borderRadius: "8px",
                fontSize: "13px",
                fontWeight: "550",
                cursor: "pointer",
                transition: "0.2s"
              }}
              onMouseEnter={(e) => e.target.style.background = "rgba(229, 72, 77, 0.2)"}
              onMouseLeave={(e) => e.target.style.background = "rgba(229, 72, 77, 0.1)"}
            >
              Clear Requests (Demo)
            </button>
            <button>View All</button>
          </div>
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