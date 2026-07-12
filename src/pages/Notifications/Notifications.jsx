import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import "./Notifications.css";

import {
  Bell,
  Trash2,
  CheckCheck,
  CalendarRange,
  Wallet,
  Clock3,
  ClipboardCheck,
  Megaphone,
  Settings,
  Check,
} from "lucide-react";

import { notificationAPI } from "../../services/api";

function Notifications() {
  const { employee } = useOutletContext() || {};
  const [notifications, setNotifications] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    if (!employee) return;
    try {
      setLoading(true);
      const data = await notificationAPI.getNotifications();
      setNotifications(data || []);
    } catch (err) {
      console.error("Failed to load notifications:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [employee]);

  const handleMarkAllAsRead = async () => {
    try {
      await notificationAPI.markAllAsRead();
      alert("All notifications marked as read!");
      await fetchNotifications();
    } catch (err) {
      console.error("Failed to mark all as read:", err);
      alert("Failed to mark all as read.");
    }
  };

  const handleDeleteAll = async () => {
    if (!confirm("Are you sure you want to delete all notifications?")) return;
    try {
      await notificationAPI.deleteAllNotifications();
      alert("All notifications deleted.");
      await fetchNotifications();
    } catch (err) {
      console.error("Failed to delete all notifications:", err);
      alert("Failed to delete all notifications.");
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await notificationAPI.markAsRead(id);
      await fetchNotifications();
    } catch (err) {
      console.error(`Failed to mark notification ${id} as read:`, err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await notificationAPI.deleteNotification(id);
      await fetchNotifications();
    } catch (err) {
      console.error(`Failed to delete notification ${id}:`, err);
    }
  };

  // Helper to map type to icon and styling
  const getTypeConfig = (type) => {
    switch (type) {
      case "Leave":
        return { icon: <CalendarRange size={18} />, className: "icon-leave" };
      case "Payroll":
        return { icon: <Wallet size={18} />, className: "icon-payroll" };
      case "Attendance":
        return { icon: <Clock3 size={18} />, className: "icon-attendance" };
      case "Task":
      case "Project":
        return { icon: <ClipboardCheck size={18} />, className: "icon-task" };
      case "Announcement":
        return { icon: <Megaphone size={18} />, className: "icon-announcement" };
      default:
        return { icon: <Settings size={18} />, className: "icon-system" };
    }
  };

  const formatTimeDifference = (dateStr) => {
    try {
      const now = new Date();
      const notifDate = new Date(dateStr);
      const diffMs = now - notifDate;
      const diffMins = Math.floor(diffMs / (1000 * 60));
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      if (diffMins < 1) return "Just now";
      if (diffMins < 60) return `${diffMins} mins ago`;
      if (diffHours < 24) return `${diffHours} hours ago`;
      if (diffDays === 1) return "Yesterday";
      return `${diffDays} days ago`;
    } catch (e) {
      return dateStr;
    }
  };

  // Filter calculations
  const totalCount = notifications.length;
  const unreadCount = notifications.filter((n) => !n.is_read).length;
  const leaveCount = notifications.filter((n) => n.type === "Leave").length;
  const payrollCount = notifications.filter((n) => n.type === "Payroll").length;
  const attendanceCount = notifications.filter((n) => n.type === "Attendance").length;
  const taskCount = notifications.filter((n) => n.type === "Task" || n.type === "Project").length;
  const announceCount = notifications.filter((n) => n.type === "Announcement").length;
  const systemCount = notifications.filter((n) => n.type === "System" || (!["Leave", "Payroll", "Attendance", "Task", "Project", "Announcement"].includes(n.type))).length;

  // Apply filters
  const filteredNotifications = notifications.filter((n) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Unread") return !n.is_read;
    if (activeFilter === "Leave") return n.type === "Leave";
    if (activeFilter === "Payroll") return n.type === "Payroll";
    if (activeFilter === "Attendance") return n.type === "Attendance";
    if (activeFilter === "Task") return n.type === "Task" || n.type === "Project";
    if (activeFilter === "Announcement") return n.type === "Announcement";
    if (activeFilter === "System") return n.type === "System" || (!["Leave", "Payroll", "Attendance", "Task", "Project", "Announcement"].includes(n.type));
    return true;
  });

  // Apply sorting
  const sortedNotifications = [...filteredNotifications].sort((a, b) => {
    const timeA = new Date(a.created_at).getTime();
    const timeB = new Date(b.created_at).getTime();
    return sortBy === "newest" ? timeB - timeA : timeA - timeB;
  });

  const sidebarFilters = [
    { name: "All", label: "All Notifications", count: totalCount, icon: <Bell size={18} /> },
    { name: "Unread", label: "Unread", count: unreadCount, icon: <Bell size={18} /> },
    { name: "Leave", label: "Leave Requests", count: leaveCount, icon: <CalendarRange size={18} /> },
    { name: "Payroll", label: "Payroll Updates", count: payrollCount, icon: <Wallet size={18} /> },
    { name: "Attendance", label: "Attendance Logs", count: attendanceCount, icon: <Clock3 size={18} /> },
    { name: "Task", label: "Task / Project", count: taskCount, icon: <ClipboardCheck size={18} /> },
    { name: "Announcement", label: "Announcements", count: announceCount, icon: <Megaphone size={18} /> },
    { name: "System", label: "System", count: systemCount, icon: <Settings size={18} /> },
  ];

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
        <div>Loading notifications...</div>
      </div>
    );
  }

  return (
    <div className="notifications-page">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        Dashboard
        <span> / </span>
        Notifications
      </div>

      {/* Header */}
      <div className="notifications-header">
        <div>
          <h1>Notifications</h1>
          <p>Stay updated with the latest alerts and important updates.</p>
        </div>
        <div className="notifications-actions">
          <button className="action-btn read-all" onClick={handleMarkAllAsRead}>
            <CheckCheck size={16} />
            Mark all as read
          </button>
          <button className="action-btn delete-all" onClick={handleDeleteAll}>
            <Trash2 size={16} />
            Delete all
          </button>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="notifications-layout">
        {/* Sidebar Panel */}
        <aside className="notifications-sidebar">
          <div className="sidebar-title">Notification Filters</div>
          <div className="filter-list">
            {sidebarFilters.map((filter) => (
              <button
                key={filter.name}
                className={`filter-item ${activeFilter === filter.name ? "active" : ""}`}
                onClick={() => setActiveFilter(filter.name)}
              >
                <div className="filter-item-left">
                  {filter.icon}
                  <span>{filter.label}</span>
                </div>
                <span className="filter-count">{filter.count}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* Main Panel */}
        <main className="notifications-panel">
          <div className="panel-header">
            <h3>{activeFilter} Notifications ({sortedNotifications.length})</h3>
            <div className="sort-container">
              <span>Sort by:</span>
              <select
                className="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>

          <div className="notifications-list">
            {sortedNotifications.length === 0 ? (
              <div className="empty-notifications">
                <Bell size={48} />
                <p>No notifications found in this category.</p>
              </div>
            ) : (
              sortedNotifications.map((notif) => {
                const config = getTypeConfig(notif.type);
                return (
                  <div
                    key={notif.id}
                    className={`notification-card ${!notif.is_read ? "unread" : ""}`}
                  >
                    <div className={`notification-icon-container ${config.className}`}>
                      {config.icon}
                    </div>

                    <div className="notification-content">
                      <div className="notification-title-row">
                        <h4 className="notification-title">{notif.title}</h4>
                        <span className="notification-time">
                          {formatTimeDifference(notif.created_at)}
                        </span>
                      </div>
                      <p className="notification-desc">{notif.message}</p>
                      
                      <div className="notification-footer">
                        <span className="category-badge">{notif.type}</span>
                        <div className="notification-actions-row">
                          {!notif.is_read && (
                            <button
                              className="card-action-btn read"
                              onClick={() => handleMarkAsRead(notif.id)}
                              title="Mark as read"
                            >
                              <Check size={16} />
                            </button>
                          )}
                          <button
                            className="card-action-btn delete"
                            onClick={() => handleDelete(notif.id)}
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Notifications;