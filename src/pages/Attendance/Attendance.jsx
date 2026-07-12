import "./Attendance.css";

import {
  CircleCheckBig,
  CircleX,
  Clock3,
  CalendarDays,
  CalendarCheck2,
  Timer,
  Download,
} from "lucide-react";
const stats = [
  {
    title: "Present Days",
    value: "22",
    sub: "This Month",
    color: "#22B573",
    icon: <CircleCheckBig size={22} />,
  },
  {
    title: "Absent Days",
    value: "2",
    sub: "This Month",
    color: "#E5484D",
    icon: <CircleX size={22} />,
  },
  {
    title: "Late Arrivals",
    value: "1",
    sub: "This Month",
    color: "#FF9E44",
    icon: <Clock3 size={22} />,
  },
  {
    title: "Working Hours",
    value: "8.4",
    sub: "Avg / Day",
    color: "#6C3EF4",
    icon: <CalendarDays size={22} />,
  },
  {
    title: "Attendance Rate",
    value: "96%",
    sub: "Current Month",
    color: "#4F8CFF",
    icon: <CalendarDays size={22} />,
  },
  {
  title: "Overtime",
  value: "18 Hrs",
  sub: "This Month",
  color: "#22B573",
  icon: <Timer size={22} />,
},
];

const attendance = {
  checkIn: "09:02 AM",
  checkOut: "-- : --",
  workingHours: "07:35 Hrs",
  breakTime: "00:45 Hrs",
  status: "Present",
};

const calendarDays = [
  "", "", "", 1, 2, 3, 4,
  5, 6, 7, 8, 9, 10, 11,
  12, 13, 14, 15, 16, 17, 18,
  19, 20, 21, 22, 23, 24, 25,
  26, 27, 28, 29, 30, 31
];
const analytics = [
  {
    title: "Attendance Rate",
    value: "96%",
    color: "#22B573",
  },
  {
    title: "Average Hours",
    value: "8.4 Hrs",
    color: "#6C3EF4",
  },
  {
    title: "On-Time Arrival",
    value: "91%",
    color: "#4F8CFF",
  },
  {
    title: "Leave Balance",
    value: "12 Days",
    color: "#FF9E44",
  },
];

const history = [
  {
    date: "10 Jul 2026",
    in: "09:02 AM",
    out: "06:08 PM",
    hours: "9h 06m",
    status: "Present",
  },
  {
    date: "09 Jul 2026",
    in: "09:18 AM",
    out: "06:00 PM",
    hours: "8h 42m",
    status: "Late",
  },
  {
    date: "08 Jul 2026",
    in: "-",
    out: "-",
    hours: "-",
    status: "Leave",
  },
];


function Attendance() {

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

          <p>
            Monitor your attendance and working hours.
          </p>

        </div>

        <div className="header-actions">

          <button className="download-btn">

            <Download size={18} />

            Export Report

          </button>

          <button className="attendance-btn">

            Mark Attendance

          </button>

        </div>

      </div>

      {/* KPI Cards */}

      <div className="stats-grid">

        {stats.map((item, index) => (

          <div
            className="stat-card"
            key={index}
          >

            <div
              className="stat-icon"
              style={{
                background: item.color,
              }}
            >

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

      {/* ---------- Part 2 Starts Here ---------- */}

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

              <h2>{attendance.checkIn}</h2>

            </div>

            <div className="attendance-box">

              <span>Check Out</span>

              <h2>{attendance.checkOut}</h2>

            </div>

            <div className="attendance-box">

              <span>Working Hours</span>

              <h2>{attendance.workingHours}</h2>

            </div>

            <div className="attendance-box">

              <span>Break Time</span>

              <h2>{attendance.breakTime}</h2>

            </div>

          </div>

          <div className="attendance-status">

            <span>Status</span>

            <label>{attendance.status}</label>

          </div>

        </div>

      </div>

      {/* Attendance Calendar */}

      <div className="calendar-card">

        <div className="card-header">

          <h3>Attendance Calendar</h3>

          <button>July 2026</button>

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

          {calendarDays.map((day, index) => (

            <div
              key={index}
              className={`calendar-day ${
                day === 10
                  ? "present"
                  : day === 18
                  ? "leave"
                  : day === 22
                  ? "absent"
                  : ""
              }`}
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

            {history.map((item, index) => (

              <tr key={index}>

                <td>{item.date}</td>

                <td>{item.in}</td>

                <td>{item.out}</td>

                <td>{item.hours}</td>

                <td>

                  <span
                    className={`history-status ${item.status.toLowerCase()}`}
                  >

                    {item.status}

                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* ---------- Part 3 Starts Here ---------- */}

      {/* Attendance Analytics */}

      <div className="analytics-section">

        {analytics.map((item, index) => (

          <div
            className="analytics-card"
            key={index}
          >

            <div
              className="analytics-circle"
              style={{
                borderColor: item.color,
              }}
            >

              <h2
                style={{
                  color: item.color,
                }}
              >

                {item.value}

              </h2>

            </div>

            <h3>{item.title}</h3>

            <p>Monthly Performance</p>

          </div>

        ))}

      </div>

      

      {/* Weekly Progress */}

      <div className="weekly-card">

        <div className="card-header">

          <h3>Weekly Attendance Trend</h3>

          <button>This Week</button>

        </div>

        <div className="weekly-chart">

          {[80,95,70,100,90,60,85].map((height,index)=>(

            <div
              className="bar-box"
              key={index}
            >

              <div
                className="bar"
                style={{
                  height:`${height}px`,
                }}
              ></div>

              <span>

                {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][index]}

              </span>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}

export default Attendance;