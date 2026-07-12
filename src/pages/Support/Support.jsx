import "./Support.css";

import {
  LifeBuoy,
  MessageCircle,
  Ticket,
  CheckCircle2,
  Plus,
  Clock3,
  Star,
  FileDown,
} from "lucide-react";
const stats = [
  {
    title: "Open Tickets",
    value: "3",
    sub: "Pending",
    color: "#FF9E44",
    icon: <Ticket size={22} />,
  },
  {
    title: "Resolved",
    value: "14",
    sub: "Completed",
    color: "#22B573",
    icon: <CheckCircle2 size={22} />,
  },
  {
    title: "Support Team",
    value: "24/7",
    sub: "Available",
    color: "#6C3EF4",
    icon: <LifeBuoy size={22} />,
  },
  {
    title: "Live Chat",
    value: "Online",
    sub: "HR Support",
    color: "#4F8CFF",
    icon: <MessageCircle size={22} />,
  },
  {
    title: "Avg Response",
    value: "2 Min",
    sub: "Today",
    color: "#E5484D",
    icon: <Clock3 size={22} />,
  },
  {
    title: "Satisfaction",
    value: "98%",
    sub: "Employee Rating",
    color: "#22B573",
    icon: <Star size={22} />,
  },
];

function Support() {

  return (

    <div className="support-page">

      {/* Breadcrumb */}

      <div className="breadcrumb">

        Dashboard

        <span> / </span>

        Support

      </div>

      {/* Header */}

      <div className="support-header">

    <div>

        <h1>Support Center</h1>

        <p>
            Raise tickets, contact HR and get instant help.
        </p>

    </div>

    <div className="header-actions">

        <button className="download-btn">

            <FileDown size={18} />

            Export Report

        </button>

        <button className="raise-btn">

            <Plus size={18} />

            Raise Ticket

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
            {/* Support Section */}

      <div className="support-section">

        {/* Raise Ticket */}

        <div className="ticket-card">

          <div className="card-header">

            <h3>Raise a Support Ticket</h3>

          </div>

          <div className="ticket-form">

            <div className="form-group">

              <label>Category</label>

              <select>

                <option>Payroll</option>

                <option>Attendance</option>

                <option>Leave</option>

                <option>IT Support</option>

                <option>General Query</option>

              </select>

            </div>

            <div className="form-group">

              <label>Priority</label>

              <select>

                <option>Low</option>

                <option>Medium</option>

                <option>High</option>

              </select>

            </div>

            <div className="form-group">

              <label>Subject</label>

              <input
                type="text"
                placeholder="Enter subject"
              />

            </div>

            <div className="form-group">

              <label>Description</label>

              <textarea
                rows="5"
                placeholder="Describe your issue..."
              ></textarea>

            </div>

            <button className="submit-btn">

              Submit Ticket

            </button>

          </div>

        </div>

        {/* Right Side */}

        <div className="support-right">

          {/* HR Contact */}

          <div className="contact-card">

            <div className="card-header">

              <h3>HR Contact</h3>

            </div>

            <div className="contact-info">

              <h4>HR Department</h4>

              <p>hr@zeaisoft.com</p>

              <p>+91 98765 43210</p>

              <button className="contact-btn">

                Contact HR

              </button>

            </div>

          </div>

          {/* Live Chat */}

          <div className="chat-card">

            <div className="card-header">

              <h3>Live Support</h3>

            </div>

            <div className="chat-info">

              <div className="online-dot"></div>

              <span>Support Team Online</span>

            </div>

            <p>

              Average Response Time

            </p>

            <h2>2 Minutes</h2>

            <button className="chat-btn">

              Start Live Chat

            </button>

          </div>

        </div>

      </div>
            {/* Ticket History */}

      <div className="history-card">

        <div className="card-header">

          <h3>My Support Tickets</h3>

          <button>View All</button>

        </div>

        <table>

          <thead>

            <tr>

              <th>Ticket ID</th>

              <th>Category</th>

              <th>Date</th>

              <th>Status</th>

            </tr>

          </thead>

          <tbody>

            <tr>

              <td>#SUP001</td>

              <td>Payroll</td>

              <td>10 Jul 2026</td>

              <td>

                <span className="status open">

                  Open

                </span>

              </td>

            </tr>

            <tr>

              <td>#SUP002</td>

              <td>Attendance</td>

              <td>08 Jul 2026</td>

              <td>

                <span className="status progress">

                  In Progress

                </span>

              </td>

            </tr>

            <tr>

              <td>#SUP003</td>

              <td>Leave</td>

              <td>04 Jul 2026</td>

              <td>

                <span className="status closed">

                  Closed

                </span>

              </td>

            </tr>

          </tbody>

        </table>

      </div>

      {/* Bottom Section */}

      <div className="support-bottom">

        {/* FAQ */}

        <div className="faq-card">

          <div className="card-header">

            <h3>Frequently Asked Questions</h3>

          </div>

          <div className="faq-list">

            <div className="faq-item">

              <h4>How do I apply for leave?</h4>

              <p>

                Navigate to Leave Management and submit your leave request.

              </p>

            </div>

            <div className="faq-item">

              <h4>How can I download my payslip?</h4>

              <p>

                Open the Payroll page and click "Download Payslip".

              </p>

            </div>

            <div className="faq-item">

              <h4>Who approves attendance corrections?</h4>

              <p>

                Your Team Lead or HR Manager will review the request.

              </p>

            </div>

          </div>

        </div>

        {/* Emergency Contact */}

        <div className="emergency-card">

          <div className="card-header">

            <h3>Emergency Contact</h3>

          </div>

          <div className="emergency-content">

            <h2>HR Helpline</h2>

            <p>+91 98765 43210</p>

            <p>support@zeaisoft.com</p>

            <button className="emergency-btn">

              Contact Immediately

            </button>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Support;