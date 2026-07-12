import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import "./Attendance.css";

import {
  CircleCheckBig,
  CircleX,
  Clock3,
  CalendarDays,
  Timer,
  Download,
} from "lucide-react";

import { attendanceAPI } from "../../services/api";

function Attendance() {
  const { employee } = useOutletContext() || {};
  const [stats, setStats] = useState([]);
  const [logs, setLogs] = useState([]);
  const [metrics, setMetrics] = useState(null);
  const [todayLog, setTodayLog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [workingTime, setWorkingTime] = useState("00:00:00");

  const formatWorkingHours = (decimalHours) => {
    const totalSecs = Math.round(Number(decimalHours) * 3600);
    const secs = totalSecs % 60;
    const mins = Math.floor((totalSecs / 60) % 60);
    const hours = Math.floor(totalSecs / 3600);
    const pad = (num) => String(num).padStart(2, "0");
    return `${pad(hours)}:${pad(mins)}:${pad(secs)}`;
  };

  useEffect(() => {
    let interval = null;
    if (todayLog && !todayLog.check_out) {
      const [h, m, s] = todayLog.check_in.split(":").map(Number);
      const checkInDate = new Date();
      checkInDate.setUTCHours(h, m, s, 0);

      const updateTimer = () => {
        const now = new Date();
        let diffMs = now.getTime() - checkInDate.getTime();
        if (diffMs < 0) diffMs = 0;
        
        const secs = Math.floor((diffMs / 1000) % 60);
        const mins = Math.floor((diffMs / 1000 / 60) % 60);
        const hours = Math.floor(diffMs / 1000 / 60 / 60);
        
        const pad = (num) => String(num).padStart(2, "0");
        setWorkingTime(`${pad(hours)}:${pad(mins)}:${pad(secs)}`);
      };

      updateTimer();
      interval = setInterval(updateTimer, 1000);
    } else if (todayLog && todayLog.check_out) {
      setWorkingTime(todayLog.working_hours ? formatWorkingHours(todayLog.working_hours) : "00:00:00");
    } else {
      setWorkingTime("00:00:00");
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [todayLog]);

  const fetchAttendanceData = async () => {
    if (!employee) return;
    try {
      const [logsRes, metricsRes] = await Promise.all([
        attendanceAPI.getLogs(),
        attendanceAPI.getMetrics()
      ]);

      setLogs(logsRes || []);
      setMetrics(metricsRes || null);

      // Check if there is a log for today
      const now = new Date();
      const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
      const todayEntry = logsRes?.find(log => log.date === todayStr);
      setTodayLog(todayEntry || null);

      // Setup stats
      const presentCount = metricsRes?.present_days || 0;
      const absentCount = metricsRes?.absent_days || 0;
      const lateCount = metricsRes?.late_days || 0;
      const totalHours = metricsRes?.total_hours || 0;
      const avgHours = presentCount > 0 ? (totalHours / presentCount).toFixed(1) : "0";
      const attendanceRate = (presentCount + absentCount) > 0 
        ? Math.round((presentCount / (presentCount + absentCount)) * 100) 
        : 100;
      const overtime = metricsRes?.overtime_hours || 0;

      setStats([
        {
          title: "Present Days",
          value: presentCount.toString(),
          sub: "This Month",
          color: "#22B573",
          icon: <CircleCheckBig size={22} />,
        },
        {
          title: "Absent Days",
          value: absentCount.toString(),
          sub: "This Month",
          color: "#E5484D",
          icon: <CircleX size={22} />,
        },
        {
          title: "Late Arrivals",
          value: lateCount.toString(),
          sub: "This Month",
          color: "#FF9E44",
          icon: <Clock3 size={22} />,
        },
        {
          title: "Working Hours",
          value: `${avgHours}h`,
          sub: "Avg / Day",
          color: "#6C3EF4",
          icon: <CalendarDays size={22} />,
        },
        {
          title: "Attendance Rate",
          value: `${attendanceRate}%`,
          sub: "Current Month",
          color: "#4F8CFF",
          icon: <CalendarDays size={22} />,
        },
        {
          title: "Overtime",
          value: `${overtime}h`,
          sub: "This Month",
          color: "#22B573",
          icon: <Timer size={22} />,
        },
      ]);
    } catch (err) {
      console.error("Failed to fetch attendance data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendanceData();
  }, [employee]);

  const handleMarkAttendance = async () => {
    if (submitting) return;
    setSubmitting(true);
    try {
      if (!todayLog) {
        // Check In
        const now = new Date();
        const checkInTime = now.toTimeString().split(" ")[0]; // e.g. "09:00:00"
        await attendanceAPI.checkIn({
          remarks: "Web check-in"
        });
        alert("Checked in successfully!");
      } else if (!todayLog.check_out) {
        // Check Out
        await attendanceAPI.checkOut({
          remarks: "Web check-out"
        });
        alert("Checked out successfully!");
      } else {
        alert("You have already completed your attendance for today.");
      }
      await fetchAttendanceData();
    } catch (err) {
      console.error("Failed to mark attendance:", err);
      alert(err.response?.data?.detail || "Operation failed.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetAttendance = async () => {
    if (!confirm("Are you sure you want to clear today's attendance log for demo purposes?")) return;
    try {
      await attendanceAPI.resetTodayAttendance();
      alert("Today's log has been cleared! You can now check in again.");
      await fetchAttendanceData();
    } catch (err) {
      console.error("Failed to reset attendance:", err);
      alert("Failed to reset attendance.");
    }
  };

  // Generate calendar days for the current month
  const getCalendarDays = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth(); // 0-indexed
    
    const firstDayIndex = new Date(year, month, 1).getDay(); // 0 (Sun) to 6 (Sat)
    const totalDays = new Date(year, month + 1, 0).getDate(); // e.g. 31

    const days = [];
    // Pad start of month
    for (let i = 0; i < firstDayIndex; i++) {
      days.push("");
    }
    // Add calendar days
    for (let i = 1; i <= totalDays; i++) {
      days.push(i);
    }
    return days;
  };

  const getDayStatus = (day) => {
    if (!day) return "";
    const year = new Date().getFullYear();
    const month = String(new Date().getMonth() + 1).padStart(2, "0");
    const dayStr = String(day).padStart(2, "0");
    const targetDateStr = `${year}-${month}-${dayStr}`;

    const log = logs.find(l => l.date === targetDateStr);
    if (!log) return "";

    const statusMap = {
      "PRESENT": "present",
      "ABSENT": "absent",
      "LATE": "present", // map late to present in terms of color highlight, or style customly
      "LEAVE": "leave"
    };
    return statusMap[log.status] || "";
  };

  const formatTimeString = (timeStr) => {
    if (!timeStr) return "-- : --";
    try {
      const parts = timeStr.split(":");
      const hours = parseInt(parts[0]);
      const minutes = parts[1];
      const ampm = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 || 12;
      return `${formattedHours}:${minutes} ${ampm}`;
    } catch (e) {
      return timeStr;
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
        <div>Loading attendance logs...</div>
      </div>
    );
  }

  // Calculate button state
  let actionButtonText = "Check In";
  let actionButtonDisabled = false;
  if (todayLog) {
    if (!todayLog.check_out) {
      actionButtonText = "Check Out";
    } else {
      actionButtonText = "Attendance Completed";
      actionButtonDisabled = true;
    }
  }

  return (
    <div className="attendance-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        Dashboard
        <span> / </span>
        Attendance
      </div>

      {/* Header */}
      <div className="attendance-header">
        <div>
          <h1>Attendance</h1>
          <p>Monitor your attendance and working hours.</p>
        </div>

        <div className="header-actions">
          <button className="download-btn" onClick={() => window.print()}>
            <Download size={18} />
            Export Report
          </button>

          <button 
            className="download-btn" 
            onClick={handleResetAttendance}
            style={{ borderColor: "#E5484D", color: "#E5484D", marginRight: "10px" }}
          >
            Reset Today (Demo)
          </button>

          <button 
            className={`attendance-btn ${actionButtonText === "Check Out" ? "checkout-btn" : ""}`}
            onClick={handleMarkAttendance}
            disabled={actionButtonDisabled || submitting}
          >
            {submitting ? "Processing..." : actionButtonText}
          </button>
        </div>
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

      {/* Today's Attendance */}
      <div className="attendance-section">
        <div className="today-card">
          <div className="card-header">
            <div>
              <h3>Today's Attendance</h3>
              <p>Track today's working hours</p>
            </div>
          </div>

          <div className="attendance-grid">
            <div className="attendance-box">
              <span>Check In</span>
              <h2>{formatTimeString(todayLog?.check_in)}</h2>
            </div>

            <div className="attendance-box">
              <span>Check Out</span>
              <h2>{formatTimeString(todayLog?.check_out)}</h2>
            </div>

            <div className="attendance-box">
              <span>Working Hours</span>
              <h2>{workingTime}</h2>
            </div>

            <div className="attendance-box">
              <span>Break Time</span>
              <h2>{todayLog?.break_time ? `${todayLog.break_time} Hrs` : "00:00 Hrs"}</h2>
            </div>
          </div>

          <div className="attendance-status">
            <span>Status</span>
            <label className={todayLog ? "status-present" : "status-absent"}>
              {todayLog?.status || "Not Logged"}
            </label>
          </div>
        </div>
      </div>

      {/* Attendance Calendar */}
      <div className="calendar-card">
        <div className="card-header">
          <h3>Attendance Calendar</h3>
          <button>{new Date().toLocaleString("default", { month: "long", year: "numeric" })}</button>
        </div>

        <div className="week-days">
          <span>Sun</span>
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
        </div>

        <div className="calendar-grid">
          {getCalendarDays().map((day, index) => (
            <div
              key={index}
              className={`calendar-day ${getDayStatus(day)}`}
            >
              {day}
            </div>
          ))}
        </div>

        <div className="calendar-legend">
          <div>
            <span className="legend present"></span>
            Present
          </div>
          <div>
            <span className="legend leave"></span>
            Leave
          </div>
          <div>
            <span className="legend absent"></span>
            Absent
          </div>
        </div>
      </div>

      {/* Attendance History */}
      <div className="history-card">
        <div className="card-header">
          <h3>Attendance History</h3>
          <button>View All</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Hours</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {logs.slice(0, 10).map((item, index) => (
              <tr key={index}>
                <td>{new Date(item.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</td>
                <td>{formatTimeString(item.check_in)}</td>
                <td>{formatTimeString(item.check_out)}</td>
                <td>{item.working_hours ? `${item.working_hours}h` : "-"}</td>
                <td>
                  <span className={`history-status ${item.status.toLowerCase()}`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Attendance;