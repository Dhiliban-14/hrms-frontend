import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import "./Calendar.css";

import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  ListTodo,
  Calendar as CalendarIcon,
  Info,
} from "lucide-react";

import { calendarAPI } from "../../services/api";

function Calendar() {
  const { employee } = useOutletContext() || {};
  const [events, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState("Month"); // Month, Week, List
  const [filterType, setFilterType] = useState("All");
  const [filterDept, setFilterDept] = useState("All");
  const [myEventsOnly, setMyEventsOnly] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch events from API
  const fetchEvents = async () => {
    if (!employee) return;
    try {
      setLoading(true);
      const data = await calendarAPI.getEvents();
      setEvents(data || []);
    } catch (err) {
      console.error("Failed to fetch calendar events:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [employee]);

  // Navigate months
  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // Helper to check if two dates are same calendar day
  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  // Helper to check if a date is within a range (for multi-day events like Leaves)
  const isDateInRange = (checkDate, startDateStr, endDateStr) => {
    const check = new Date(checkDate.getFullYear(), checkDate.getMonth(), checkDate.getDate());
    const start = new Date(startDateStr);
    const end = endDateStr ? new Date(endDateStr) : start;
    
    // Normalize times
    check.setHours(0,0,0,0);
    start.setHours(0,0,0,0);
    end.setHours(0,0,0,0);

    return check >= start && check <= end;
  };

  // Filter logic
  const filteredEvents = events.filter((ev) => {
    // 1. Event Type filter
    if (filterType !== "All" && ev.type !== filterType) return false;
    
    // 2. Department mock filter
    if (filterDept !== "All") {
      // Holidays and Company Events are generally global, others might match department
      if (ev.type !== "Holiday" && ev.type !== "Company Event" && employee?.department !== filterDept) {
        return false;
      }
    }

    // 3. My Events Only filter
    if (myEventsOnly) {
      // Show only personal leaves, assigned tasks, or meetings
      return ev.type === "Personal" || ev.type === "Meeting" || ev.id.startsWith("task-");
    }

    return true;
  });

  // Calculate days for the month grid
  const getMonthDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // First day of current month
    const firstDayIndex = new Date(year, month, 1).getDay();

    // Total days in current month
    const totalDays = new Date(year, month + 1, 0).getDate();

    // Total days in previous month
    const prevMonthTotalDays = new Date(year, month, 0).getDate();

    const days = [];

    // Pad previous month days
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthTotalDays - i),
        isCurrentMonth: false,
      });
    }

    // Current month days
    for (let i = 1; i <= totalDays; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
      });
    }

    // Pad next month days to complete 6-row grid (42 cells)
    const remainingCells = 42 - days.length;
    for (let i = 1; i <= remainingCells; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      });
    }

    return days;
  };

  // Get week days (for Week view)
  const getWeekDays = () => {
    const days = [];
    const dayOfWeek = currentDate.getDay();
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - dayOfWeek);

    for (let i = 0; i < 7; i++) {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      days.push(d);
    }
    return days;
  };

  // Helper to style event type
  const getEventColors = (type) => {
    switch (type) {
      case "Holiday":
        return { background: "rgba(186, 26, 26, 0.12)", color: "#ff888b", borderLeftColor: "#ba1a1a" };
      case "Company Event":
        return { background: "rgba(90, 24, 238, 0.12)", color: "#b89eff", borderLeftColor: "#5a18ee" };
      case "Meeting":
        return { background: "rgba(0, 108, 73, 0.12)", color: "#6cf8bb", borderLeftColor: "#006c49" };
      case "Important Update":
        return { background: "rgba(89, 54, 0, 0.12)", color: "#ffbd6b", borderLeftColor: "#593600" };
      default:
        return { background: "rgba(121, 116, 136, 0.12)", color: "#d2cfda", borderLeftColor: "#797488" };
    }
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const weekdayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

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
        <div>Loading calendar events...</div>
      </div>
    );
  }

  const monthDays = getMonthDays();
  const weekDays = getWeekDays();

  return (
    <div className="calendar-page">
      {/* Breadcrumbs */}
      <div className="breadcrumb">
        Dashboard
        <span> / </span>
        Calendar
      </div>

      <div className="calendar-layout">
        {/* Main Panel */}
        <div className="calendar-main">
          {/* Header Controls */}
          <div className="calendar-header">
            <div className="header-left">
              <h2 className="current-month-title">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>

              <div className="view-selector">
                <button
                  className={`view-btn ${viewMode === "Month" ? "active" : ""}`}
                  onClick={() => setViewMode("Month")}
                >
                  Month
                </button>
                <button
                  className={`view-btn ${viewMode === "Week" ? "active" : ""}`}
                  onClick={() => setViewMode("Week")}
                >
                  Week
                </button>
                <button
                  className={`view-btn ${viewMode === "List" ? "active" : ""}`}
                  onClick={() => setViewMode("List")}
                >
                  List
                </button>
              </div>
            </div>

            <div className="nav-buttons">
              <button className="nav-btn" onClick={handlePrevMonth}>
                <ChevronLeft size={16} />
              </button>
              <button
                className="nav-btn"
                style={{ fontSize: "13px", padding: "6px 14px" }}
                onClick={() => setCurrentDate(new Date())}
              >
                Today
              </button>
              <button className="nav-btn" onClick={handleNextMonth}>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* VIEW: Month Grid */}
          {viewMode === "Month" && (
            <>
              <div className="weekdays-grid">
                {weekdayNames.map((name) => (
                  <div key={name} className="weekday-label">
                    {name}
                  </div>
                ))}
              </div>

              <div className="days-grid">
                {monthDays.map((cell, index) => {
                  const dayEvents = filteredEvents.filter((ev) =>
                    isDateInRange(cell.date, ev.start_date, ev.end_date)
                  );
                  const isToday = isSameDay(cell.date, new Date());

                  return (
                    <div
                      key={index}
                      className={`day-cell ${!cell.isCurrentMonth ? "other-month" : ""} ${isToday ? "today" : ""}`}
                    >
                      <div className="day-header">
                        <span className="day-number">{cell.date.getDate()}</span>
                      </div>

                      <div className="cell-events">
                        {dayEvents.map((ev) => {
                          const colors = getEventColors(ev.type);
                          return (
                            <div
                              key={ev.id}
                              className="event-badge"
                              style={{
                                background: colors.background,
                                color: colors.color,
                                borderLeft: `3px solid ${colors.borderLeftColor}`,
                              }}
                              onClick={() =>
                                alert(
                                  `Event: ${ev.title}\nType: ${ev.type}\nDate: ${ev.start_date}${ev.end_date ? ` to ${ev.end_date}` : ""}\n\nDescription: ${ev.description || "No description provided."}`
                                )
                              }
                              title={ev.title}
                            >
                              {ev.title}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* VIEW: Week Grid */}
          {viewMode === "Week" && (
            <>
              <div className="weekdays-grid">
                {weekdayNames.map((name, i) => (
                  <div key={name} className="weekday-label">
                    {name} ({weekDays[i].getDate()})
                  </div>
                ))}
              </div>

              <div className="days-grid" style={{ gridAutoRows: "350px" }}>
                {weekDays.map((day, index) => {
                  const dayEvents = filteredEvents.filter((ev) =>
                    isDateInRange(day, ev.start_date, ev.end_date)
                  );
                  const isToday = isSameDay(day, new Date());

                  return (
                    <div
                      key={index}
                      className={`day-cell ${isToday ? "today" : ""}`}
                    >
                      <div className="day-header">
                        <span className="day-number">{day.getDate()}</span>
                      </div>

                      <div className="cell-events">
                        {dayEvents.map((ev) => {
                          const colors = getEventColors(ev.type);
                          return (
                            <div
                              key={ev.id}
                              className="event-badge"
                              style={{
                                background: colors.background,
                                color: colors.color,
                                borderLeft: `3px solid ${colors.borderLeftColor}`,
                                whiteSpace: "normal",
                                padding: "6px 8px",
                              }}
                              onClick={() =>
                                alert(
                                  `Event: ${ev.title}\nType: ${ev.type}\nDate: ${ev.start_date}${ev.end_date ? ` to ${ev.end_date}` : ""}\n\nDescription: ${ev.description || "No description."}`
                                )
                              }
                            >
                              <strong>{ev.title}</strong>
                              <div style={{ fontSize: "9px", opacity: 0.8, marginTop: "2px" }}>
                                {ev.description}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* VIEW: List View */}
          {viewMode === "List" && (
            <div className="list-view-container">
              {filteredEvents.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px", color: "#9CA3AF" }}>
                  <Info style={{ marginBottom: "8px" }} />
                  <div>No events scheduled for this period.</div>
                </div>
              ) : (
                [...filteredEvents]
                  .sort((a, b) => new Date(a.start_date) - new Date(b.start_date))
                  .map((ev) => {
                    const colors = getEventColors(ev.type);
                    const startDate = new Date(ev.start_date);
                    return (
                      <div key={ev.id} className="list-event-card">
                        <div className="list-event-date-box">
                          <span className="date-box-day">{startDate.getDate()}</span>
                          <span className="date-box-month">
                            {monthNames[startDate.getMonth()].substring(0, 3)}
                          </span>
                        </div>

                        <div className="list-event-info">
                          <div className="list-event-title-row">
                            <h4 className="list-event-title">{ev.title}</h4>
                            <span
                              className="list-event-type-badge"
                              style={{
                                background: colors.background,
                                color: colors.color,
                              }}
                            >
                              {ev.type}
                            </span>
                          </div>
                          <p className="list-event-desc">
                            {ev.description || "No description provided."}
                            {ev.end_date && ` (Until ${ev.end_date})`}
                          </p>
                        </div>
                      </div>
                    );
                  })
              )}
            </div>
          )}
        </div>

        {/* Sidebar Controls */}
        <aside className="calendar-sidebar">
          {/* Quick Navigation / Mini Calendar */}
          <div className="sidebar-card">
            <h4 className="sidebar-card-title">Quick Navigation</h4>
            <div className="mini-calendar">
              <div className="mini-month-title">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </div>
              <div className="mini-grid-header">
                {weekdayNames.map((name) => (
                  <span key={name}>{name[0]}</span>
                ))}
              </div>
              <div className="mini-grid-days">
                {monthDays.slice(0, 35).map((cell, idx) => {
                  const hasEvents = events.some((ev) =>
                    isDateInRange(cell.date, ev.start_date, ev.end_date)
                  );
                  return (
                    <div
                      key={idx}
                      className={`mini-day ${!cell.isCurrentMonth ? "other" : ""} ${hasEvents ? "active" : ""}`}
                      onClick={() => setCurrentDate(cell.date)}
                    >
                      {cell.date.getDate()}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="sidebar-card">
            <h4 className="sidebar-card-title">Calendar Filters</h4>
            <div className="filter-group">
              <div className="filter-control">
                <label>Event Type</label>
                <select
                  className="filter-select"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="All">All Event Types</option>
                  <option value="Holiday">Holidays</option>
                  <option value="Meeting">Meetings</option>
                  <option value="Company Event">Company Events</option>
                  <option value="Important Update">Important Updates</option>
                  <option value="Personal">Personal / Leaves</option>
                </select>
              </div>

              <div className="filter-control">
                <label>Department</label>
                <select
                  className="filter-select"
                  value={filterDept}
                  onChange={(e) => setFilterDept(e.target.value)}
                >
                  <option value="All">All Departments</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Sales">Sales</option>
                  <option value="HR">HR / People</option>
                  <option value="Finance">Finance</option>
                </select>
              </div>

              <label className="checkbox-control">
                <input
                  type="checkbox"
                  checked={myEventsOnly}
                  onChange={(e) => setMyEventsOnly(e.target.checked)}
                />
                <span>My Events Only</span>
              </label>
            </div>
          </div>

          {/* Legend */}
          <div className="sidebar-card">
            <h4 className="sidebar-card-title">Calendar Legend</h4>
            <div className="legend-list">
              <div className="legend-item">
                <div className="legend-color" style={{ background: "#ba1a1a" }} />
                <span>Holiday</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{ background: "#5a18ee" }} />
                <span>Company Event</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{ background: "#006c49" }} />
                <span>Meeting</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{ background: "#593600" }} />
                <span>Important Update</span>
              </div>
              <div className="legend-item">
                <div className="legend-color" style={{ background: "#797488" }} />
                <span>Personal</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Calendar;