import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
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

import { supportAPI } from "../../services/api";

function Support() {
  const { employee } = useOutletContext() || {};
  const [faqs, setFaqs] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ticket chat states
  const [activeTicket, setActiveTicket] = useState(null);
  const [chatLoading, setChatLoading] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [sendingReply, setSendingReply] = useState(false);

  // Form states
  const [category, setCategory] = useState("IT Support");
  const [priority, setPriority] = useState("Medium");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchSupportData = async () => {
    if (!employee) return;
    try {
      setLoading(true);
      const [faqsRes, ticketsRes] = await Promise.all([
        supportAPI.getFAQs(),
        supportAPI.getTickets()
      ]);

      // Flatten FAQs if they come grouped by category
      let flatFaqs = [];
      if (Array.isArray(faqsRes)) {
        faqsRes.forEach(group => {
          if (group.questions) {
            flatFaqs.push(...group.questions);
          }
        });
      }
      setFaqs(flatFaqs.length > 0 ? flatFaqs : faqsRes || []);
      setTickets(ticketsRes || []);

      const openCount = ticketsRes?.filter(t => t.status === "Open" || t.status === "Pending").length || 0;
      const resolvedCount = ticketsRes?.filter(t => t.status === "Resolved" || t.status === "Closed").length || 0;

      setStats([
        {
          title: "Open Tickets",
          value: openCount.toString(),
          sub: "Pending",
          color: "#FF9E44",
          icon: <Ticket size={22} />,
        },
        {
          title: "Resolved",
          value: resolvedCount.toString(),
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
      ]);

    } catch (err) {
      console.error("Failed to load support center details:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSupportData();
  }, [employee]);

  const handleSubmitTicket = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    try {
      if (!subject || !description) {
        alert("Please enter subject and description.");
        setSubmitting(false);
        return;
      }

      await supportAPI.createTicket({
        category,
        priority,
        subject,
        description
      });

      alert("Support ticket raised successfully!");
      setSubject("");
      setDescription("");

      // Re-fetch tickets
      await fetchSupportData();
    } catch (err) {
      console.error("Failed to submit support ticket:", err);
      alert(err.response?.data?.detail || "Failed to submit ticket.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleOpenTicketChat = async (ticketId) => {
    setChatLoading(true);
    try {
      const details = await supportAPI.getTicketDetails(ticketId);
      setActiveTicket(details);
    } catch (err) {
      console.error("Failed to fetch ticket messages:", err);
      alert("Failed to load conversation thread.");
    } finally {
      setChatLoading(false);
    }
  };

  const handleSendTicketReply = async (e) => {
    e.preventDefault();
    if (!replyText.trim() || !activeTicket) return;
    setSendingReply(true);
    try {
      await supportAPI.sendTicketMessage(activeTicket.ticket_id, {
        message: replyText
      });
      setReplyText("");
      // Refresh chat window messages list
      const details = await supportAPI.getTicketDetails(activeTicket.ticket_id);
      setActiveTicket(details);
      // Refresh background ticket status list
      await fetchSupportData();
    } catch (err) {
      console.error("Failed to send message reply:", err);
      alert(err.response?.data?.detail || "Failed to submit message.");
    } finally {
      setSendingReply(false);
    }
  };

  const handleExportReport = () => {
    const now = new Date();
    const reportDate = now.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    const empName = employee?.full_name || employee?.username || "Employee";
    const empId = employee?.employee_id || employee?.id || "N/A";
    const empDept = employee?.department || "N/A";
    const empDesignation = employee?.designation || "N/A";

    const totalTickets = tickets.length;
    const openTickets = tickets.filter(t => t.status === "Open" || t.status === "Pending").length;
    const resolvedTickets = tickets.filter(t => t.status === "Resolved" || t.status === "Closed").length;

    let ticketsHTML = '';
    tickets.forEach((item) => {
      const dateStr = new Date(item.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
      const st = item.status || '';
      let badgeBg = '#FFF3DA'; let badgeColor = '#FF9E44';
      if (st === 'Resolved' || st === 'Closed') { badgeBg = '#DDF9EA'; badgeColor = '#22B573'; }
      else if (st === 'In Progress') { badgeBg = '#F3EEFF'; badgeColor = '#6C3EF4'; }
      ticketsHTML += `<tr>
        <td style="padding:10px 14px;border-bottom:1px solid #f0f0f0;color:#333;">#${item.ticket_id}</td>
        <td style="padding:10px 14px;border-bottom:1px solid #f0f0f0;color:#333;">${item.category}</td>
        <td style="padding:10px 14px;border-bottom:1px solid #f0f0f0;color:#333;">${item.subject}</td>
        <td style="padding:10px 14px;border-bottom:1px solid #f0f0f0;color:#333;">${dateStr}</td>
        <td style="padding:10px 14px;border-bottom:1px solid #f0f0f0;"><span style="background:${badgeBg};color:${badgeColor};padding:4px 14px;border-radius:20px;font-size:12px;font-weight:600;">${st}</span></td>
      </tr>`;
    });

    const reportHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Support Tickets Report - ${empName}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', Arial, sans-serif; color: #333; background: #fff; padding: 40px; }
    .report-header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 3px solid #6C3EF4; padding-bottom: 20px; margin-bottom: 30px; }
    .report-header h1 { font-size: 26px; color: #6C3EF4; margin-bottom: 4px; }
    .report-header p { font-size: 13px; color: #666; }
    .report-header .company { display: flex; flex-direction: column; align-items: flex-end; }
    .report-logo-wrap { display: flex; align-items: flex-start; gap: 2px; line-height: 1; }
    .report-logo-text { font-size: 24px; font-weight: 900; letter-spacing: -0.05em; font-family: Arial, sans-serif; }
    .logo-ze { color: #4200BB; }
    .logo-ai { color: #191C1E; }
    .logo-soft { writing-mode: vertical-rl; text-orientation: mixed; font-size: 8px; font-weight: 700; color: #4200BB; letter-spacing: 0.15em; align-self: flex-end; margin-bottom: 2px; font-family: Arial, sans-serif; }
    .report-logo-sub { color: #4200BB; font-size: 7px; font-weight: 500; letter-spacing: 0.2em; margin-top: 1px; text-transform: uppercase; font-family: Arial, sans-serif; }
    .emp-info { display: grid; grid-template-columns: 1fr 1fr; gap: 8px 40px; margin-bottom: 28px; padding: 16px 20px; background: #F8F8FC; border-radius: 12px; }
    .emp-info div { font-size: 13px; color: #555; }
    .emp-info div strong { color: #222; }
    .section-title { font-size: 18px; font-weight: 700; color: #222; margin: 28px 0 14px; padding-bottom: 8px; border-bottom: 2px solid #ECECEC; }
    .stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-bottom: 24px; }
    .stat-box { background: #F8F8FC; border: 1px solid #ECECEC; border-radius: 14px; padding: 16px; text-align: center; }
    .stat-box .value { font-size: 26px; font-weight: 700; color: #222; }
    .stat-box .label { font-size: 11px; color: #777; display: block; margin-bottom: 6px; }
    table { width: 100%; border-collapse: collapse; }
    table th { text-align: left; padding: 10px 14px; background: #F8F8FC; color: #666; font-size: 12px; font-weight: 600; }
    .footer { margin-top: 40px; padding-top: 16px; border-top: 1px solid #ECECEC; font-size: 11px; color: #999; text-align: center; }
    @media print { body { padding: 20px; } }
  </style>
</head>
<body>
  <div class="report-header">
    <div>
      <h1>Support Tickets Report</h1>
      <p>Summary of raised tickets and queries</p>
    </div>
    <div style="text-align:right;">
      <div class="company">
        <div class="report-logo-wrap">
          <span class="report-logo-text"><span class="logo-ze">Ze</span><span class="logo-ai">AI</span></span>
          <span class="logo-soft">SOFT</span>
        </div>
        <span class="report-logo-sub">EMPOWERING YOU</span>
      </div>
      <p>Generated on ${reportDate}</p>
    </div>
  </div>
  <div class="emp-info">
    <div><strong>Employee:</strong> ${empName}</div>
    <div><strong>Employee ID:</strong> ${empId}</div>
    <div><strong>Department:</strong> ${empDept}</div>
    <div><strong>Designation:</strong> ${empDesignation}</div>
  </div>
  <div class="section-title">Ticket Statistics</div>
  <div class="stats-row">
    <div class="stat-box"><div class="label">Total Tickets</div><div class="value">${totalTickets}</div></div>
    <div class="stat-box"><div class="label">Open Tickets</div><div class="value">${openTickets}</div></div>
    <div class="stat-box"><div class="label">Resolved Tickets</div><div class="value">${resolvedTickets}</div></div>
  </div>
  <div class="section-title">Ticket List</div>
  <table>
    <thead>
      <tr>
        <th>Ticket ID</th>
        <th>Category</th>
        <th>Subject</th>
        <th>Date</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      ${ticketsHTML || '<tr><td colspan="5" style="text-align:center;color:#bfbfbf;padding:20px;">No support tickets found.</td></tr>'}
    </tbody>
  </table>
  <div class="footer">This report was auto-generated by ZeAI HRMS &bull; Confidential</div>
</body>
</html>`;

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
        <div>Loading support center...</div>
      </div>
    );
  }

  return (
    <div className="support-page fade-in">
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
          <p>Raise tickets, contact HR and get instant help.</p>
        </div>
        <div className="header-actions">
          <button className="download-btn" onClick={handleExportReport}>
            <FileDown size={18} />
            Export Report
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

      {/* Support Section */}
      <div className="support-section">
        {/* Raise Ticket Form */}
        <div className="ticket-card">
          <div className="card-header">
            <h3>Raise a Support Ticket</h3>
          </div>

          <form className="ticket-form" onSubmit={handleSubmitTicket}>
            <div className="form-group">
              <label>Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="IT Support">IT Support</option>
                <option value="Payroll">Payroll</option>
                <option value="Attendance">Attendance</option>
                <option value="Leave">Leave Management</option>
                <option value="General Query">General Query</option>
              </select>
            </div>

            <div className="form-group">
              <label>Priority</label>
              <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div className="form-group">
              <label>Subject</label>
              <input
                type="text"
                placeholder="Enter subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                rows="5"
                placeholder="Describe your issue..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>

            <button className="submit-btn" type="submit" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit Ticket"}
            </button>
          </form>
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
              <p>hr@zeai.com</p>
              <p>+1 (555) 019-2834</p>
              <button className="contact-btn" onClick={() => window.open("mailto:hr@zeai.com")}>
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
            <p>Average Response Time</p>
            <h2>2 Minutes</h2>
            <button className="chat-btn" onClick={() => alert("Connecting to a live HR support agent...")}>
              Start Live Chat
            </button>
          </div>
        </div>
      </div>

      {/* Ticket History */}
      <div className="history-card">
        <div className="card-header">
          <h3>My Support Tickets</h3>
          <button onClick={fetchSupportData}>Refresh</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Ticket ID</th>
              <th>Category</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tickets.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", color: "#bfbfbf" }}>No tickets raised.</td>
              </tr>
            ) : (
              tickets.map((item, index) => (
                <tr key={index}>
                  <td>#{item.ticket_id}</td>
                  <td>{item.category}</td>
                  <td>{new Date(item.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</td>
                  <td>
                    <span className={`status ${item.status === 'Closed' || item.status === 'Resolved' ? 'closed' : item.status === 'In Progress' ? 'progress' : 'open'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="view-conversation-btn"
                      onClick={() => handleOpenTicketChat(item.ticket_id)}
                    >
                      View Chat
                    </button>
                  </td>
                </tr>
              ))
            )}
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
            {faqs.slice(0, 3).map((item, index) => (
              <div className="faq-item" key={index}>
                <h4>{item.question}</h4>
                <p>{item.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="emergency-card">
          <div className="card-header">
            <h3>Emergency Contact</h3>
          </div>
          <div className="emergency-content">
            <h2>HR Helpline</h2>
            <p>+1 (555) 019-2834</p>
            <p>support@zeai.com</p>
            <button className="emergency-btn" onClick={() => window.open("mailto:support@zeai.com")}>
              Contact Immediately
            </button>
          </div>
        </div>
      </div>

      {/* Ticket Chat Modal */}
      {activeTicket && (
        <div className="chat-modal-overlay">
          <div className="chat-modal-container">
            <div className="chat-modal-header">
              <div>
                <h3>Ticket #{activeTicket.ticket_id}: {activeTicket.subject}</h3>
                <small style={{ color: "#a0a0a0" }}>Category: {activeTicket.category} | Priority: {activeTicket.priority} | Status: {activeTicket.status}</small>
              </div>
              <button className="chat-modal-close" onClick={() => setActiveTicket(null)}>×</button>
            </div>
            
            <div className="chat-messages-box">
              {/* Initial ticket description as first message */}
              <div className="chat-bubble received">
                <span className="chat-bubble-sender">{activeTicket.employee?.full_name || "Employee"}</span>
                <p style={{ margin: "4px 0 0 0" }}>{activeTicket.description}</p>
                <span className="chat-meta">
                  {new Date(activeTicket.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>

              {activeTicket.messages?.map((msg, idx) => (
                <div key={msg.id || idx} className={`chat-bubble ${msg.sender_id === employee?.id ? 'sent' : 'received'}`}>
                  <span className="chat-bubble-sender">{msg.sender_name}</span>
                  <p style={{ margin: "4px 0 0 0" }}>{msg.message}</p>
                  <span className="chat-meta">
                    {new Date(msg.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              ))}
            </div>

            {activeTicket.status !== "Closed" && activeTicket.status !== "Cancelled" ? (
              <form className="chat-input-form" onSubmit={handleSendTicketReply}>
                <textarea
                  placeholder="Type a message reply to HR support..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  rows="2"
                  required
                ></textarea>
                <button type="submit" className="chat-send-btn" disabled={sendingReply}>
                  {sendingReply ? "..." : "Send"}
                </button>
              </form>
            ) : (
              <div style={{ textAlign: "center", color: "#a0a0a0", fontSize: "14px", padding: "10px" }}>
                This ticket is closed and read-only.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Support;