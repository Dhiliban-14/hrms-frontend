import "./Leave.css";

import {
  CalendarDays,
  HeartPulse,
  Plane,
  Briefcase,
  CalendarRange,
  CalendarHeart,
  Download,
} from "lucide-react";
const stats = [
  {
    title: "Annual Leave",
    value: "12",
    sub: "Remaining",
    color: "#6C3EF4",
    icon: <CalendarDays size={20} />,
  },
  {
    title: "Sick Leave",
    value: "6",
    sub: "Remaining",
    color: "#22B573",
    icon: <HeartPulse size={20} />,
  },
  {
    title: "Casual Leave",
    value: "5",
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
    value: "9",
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
];

function Leave() {

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

  <button className="download-btn">

    <Download size={18} />

    Download Report

  </button>

</div>

      {/* KPI Cards */}

      <div className="stats-grid">

        {stats.map((item,index)=>(

          <div
            className="stat-card"
            key={index}
          >

            <div
              className="stat-icon"
              style={{
                background:item.color,
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

      {/* Part 2 Starts Here */}
      <div className="leave-section">

  {/* Leave Balance */}

  <div className="balance-card">

    <div className="card-header">

      <h3>Leave Balance</h3>

      <button>View Details</button>

    </div>

    <div className="balance-list">

      <div className="balance-item">

        <span>Annual Leave</span>

        <strong>12 Days</strong>

      </div>

      <div className="balance-item">

        <span>Sick Leave</span>

        <strong>6 Days</strong>

      </div>

      <div className="balance-item">

        <span>Casual Leave</span>

        <strong>5 Days</strong>

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

    <div className="leave-form">

      <div className="form-group">

        <label>Leave Type</label>

        <select>

          <option>Annual Leave</option>

          <option>Sick Leave</option>

          <option>Casual Leave</option>

          <option>Work From Home</option>

        </select>

      </div>

      <div className="form-row">

        <div className="form-group">

          <label>Start Date</label>

          <input type="date" />

        </div>

        <div className="form-group">

          <label>End Date</label>

          <input type="date" />

        </div>

      </div>

      <div className="form-group">

        <label>Reason</label>

        <textarea
          rows="4"
          placeholder="Enter leave reason..."
        ></textarea>

      </div>

      <div className="form-group">

        <label>Emergency Contact</label>

        <input
          type="text"
          placeholder="Phone Number"
        />

      </div>

      <div className="form-group">

        <label>Attach Document</label>

        <input type="file" />

      </div>

      <button className="submit-btn">

        Submit Leave Request

      </button>

    </div>

  </div>

</div>

{/* ---------- Part 3 Starts Here ---------- */}
{/* Leave Calendar */}

<div className="calendar-card">

  <div className="card-header">

    <h3>Leave Calendar</h3>

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

    {[
      "", "", "", 1,2,3,4,
      5,6,7,8,9,10,11,
      12,13,14,15,16,17,18,
      19,20,21,22,23,24,25,
      26,27,28,29,30,31
    ].map((day,index)=>(

      <div
        key={index}
        className={`calendar-day ${
          day===10 || day===11
            ? "approved"
            : day===20
            ? "pending"
            : ""
        }`}
      >

        {day}

      </div>

    ))}

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

      <tr>

        <td>Annual Leave</td>

        <td>10 Jul</td>

        <td>11 Jul</td>

        <td>2</td>

        <td>

          <span className="approved">

            Approved

          </span>

        </td>

      </tr>

      <tr>

        <td>Sick Leave</td>

        <td>22 Jul</td>

        <td>22 Jul</td>

        <td>1</td>

        <td>

          <span className="pending">

            Pending

          </span>

        </td>

      </tr>

    </tbody>

  </table>

</div>
{/* Approval Timeline */}

<div className="timeline-card">

  <div className="card-header">

    <h3>Approval Timeline</h3>

  </div>

  <div className="timeline">

    <div className="timeline-item">

      <div className="timeline-dot"></div>

      <div>

        <h4>Leave Applied</h4>

        <p>08 Jul 2026 • 09:20 AM</p>

      </div>

    </div>

    <div className="timeline-item">

      <div className="timeline-dot active"></div>

      <div>

        <h4>Manager Review</h4>

        <p>Pending Approval</p>

      </div>

    </div>

    <div className="timeline-item">

      <div className="timeline-dot"></div>

      <div>

        <h4>HR Approval</h4>

        <p>Waiting</p>

      </div>

    </div>

  </div>

</div>

    </div>

  );

}

export default Leave;