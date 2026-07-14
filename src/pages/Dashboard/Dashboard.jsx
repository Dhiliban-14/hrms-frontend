import { useState, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import "./Dashboard.css";

import {
  CalendarCheck,
  ClipboardList,
  Wallet,
  Bell,
  TrendingUp,
  BadgeCheck,
  Clock3,
  Download,
  User,
  Headphones,
} from "lucide-react";

import {
  attendanceAPI,
  taskAPI,
  leaveAPI,
  payrollAPI,
  notificationAPI
} from "../../services/api";

function Dashboard() {
  const { employee } = useOutletContext() || {};
  const navigate = useNavigate();
  const [stats, setStats] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [activities, setActivities] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [leaves, setLeaves] = useState(null);
  const [payroll, setPayroll] = useState(null);
  const [loading, setLoading] = useState(true);
  const [todayLog, setTodayLog] = useState(null);
  const [workingTime, setWorkingTime] = useState("00h 00m");

  const formatWorkingHours = (decimalHours) => {
    if (!decimalHours) return "00h 00m";
    const totalSecs = Math.round(Number(decimalHours) * 3600);
    const mins = Math.floor((totalSecs / 60) % 60);
    const hours = Math.floor(totalSecs / 3600);
    return `${hours}h ${mins}m`;
  };

  const formatTimeString = (timeStr) => {
    if (!timeStr) return "--:--";
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

  useEffect(() => {
    let interval = null;
    if (todayLog && !todayLog.check_out) {
      const checkInDate = new Date(`${todayLog.date}T${todayLog.check_in}Z`);
      const updateTimer = () => {
        const now = new Date();
        let diffMs = now.getTime() - checkInDate.getTime();
        if (diffMs < 0) diffMs = 0;
        
        const mins = Math.floor((diffMs / 1000 / 60) % 60);
        const hours = Math.floor(diffMs / 1000 / 60 / 60);
        setWorkingTime(`${hours}h ${mins}m`);
      };
      updateTimer();
      interval = setInterval(updateTimer, 60000); // Update every minute
    } else if (todayLog && todayLog.check_out) {
      setWorkingTime(formatWorkingHours(todayLog.working_hours));
    } else {
      setWorkingTime("00h 00m");
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [todayLog]);

  useEffect(() => {
    if (!employee) return;

    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [
          attendanceMetrics,
          assignedTasks,
          leaveBalances,
          payrollHistory,
          notifyList,
          attendanceLogs
        ] = await Promise.allSettled([
          attendanceAPI.getMetrics(),
          taskAPI.getTasks(),
          leaveAPI.getBalances(),
          payrollAPI.getHistory(),
          notificationAPI.getNotifications(),
          attendanceAPI.getLogs()
        ]);

        const presentDaysVal = attendanceMetrics.status === "fulfilled" ? attendanceMetrics.value.present_days : "0";

        let todayEntry = null;
        if (attendanceLogs.status === "fulfilled" && attendanceLogs.value) {
          const logsRes = attendanceLogs.value;
          const now = new Date();
          const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
          todayEntry = logsRes.find(log => log.date === todayStr);
          setTodayLog(todayEntry || null);
        }
        
        let tasksData = [];
        let pendingTasksCount = 0;
        if (assignedTasks.status === "fulfilled") {
          tasksData = assignedTasks.value || [];
          pendingTasksCount = tasksData.filter(t => t.status !== "Completed" && t.status !== "Cancelled").length;
        }

        let leaveBalanceLeft = 0;
        let leavesObj = null;
        if (leaveBalances.status === "fulfilled" && leaveBalances.value) {
          leavesObj = leaveBalances.value;
          const casualLeft = (leavesObj.casual_total || 12) - (leavesObj.casual_used || 0);
          const sickLeft = (leavesObj.sick_total || 10) - (leavesObj.sick_used || 0);
          const earnedLeft = (leavesObj.earned_total || 20) - (leavesObj.earned_used || 0);
          leaveBalanceLeft = casualLeft + sickLeft + earnedLeft;
          setLeaves(leavesObj);
        }

        let payrollObj = null;
        let netSalaryVal = "₹0";
        if (payrollHistory.status === "fulfilled" && payrollHistory.value && payrollHistory.value.length > 0) {
          payrollObj = payrollHistory.value[0];
          netSalaryVal = `₹${Number(payrollObj.net_pay).toLocaleString("en-IN")}`;
          setPayroll(payrollObj);
        }

        let notifData = [];
        let unreadCount = 0;
        if (notifyList.status === "fulfilled") {
          notifData = notifyList.value || [];
          unreadCount = notifData.filter(n => !n.is_read).length;
          setNotifications(notifData.slice(0, 4));
        }

        setStats([
          {
            title: "Present Days",
            value: presentDaysVal.toString(),
            sub: "This Month",
            color: "#22B573",
            icon: <CalendarCheck size={22} />,
            path: "/employee/attendance",
          },
          {
            title: "Assigned Tasks",
            value: pendingTasksCount.toString(),
            sub: "Pending",
            color: "#6C3EF4",
            icon: <ClipboardList size={22} />,
            path: "/employee/assigned-task",
          },
          {
            title: "Leave Balance",
            value: leaveBalanceLeft.toString(),
            sub: "Days Left",
            color: "#FF9E44",
            icon: <BadgeCheck size={22} />,
            path: "/employee/leave",
          },
          {
            title: "Net Salary",
            value: netSalaryVal,
            sub: payrollObj ? payrollObj.pay_period : "No payslip yet",
            color: "#4F8CFF",
            icon: <Wallet size={22} />,
            path: "/employee/payroll",
          },
          {
            title: "Performance",
            value: employee.performance_rating || "90%",
            sub: "Overall",
            color: "#E5484D",
            icon: <TrendingUp size={22} />,
            path: "/employee/profile",
          },
          {
            title: "Notifications",
            value: unreadCount.toString(),
            sub: "Unread",
            color: "#9B5CF6",
            icon: <Bell size={22} />,
            path: "/employee/notifications",
          },
        ]);

        setTasks(tasksData.slice(0, 3));

        const derivedActivities = [];
        if (attendanceMetrics.status === "fulfilled" && attendanceMetrics.value.present_days > 0) {
          derivedActivities.push({
            title: "Checked in successfully",
            time: "09:00 AM",
          });
        }
        if (tasksData.length > 0) {
          const lastTask = tasksData[0];
          derivedActivities.push({
            title: `Assigned task: ${lastTask.title}`,
            time: "Recently",
          });
        }
        if (payrollObj) {
          derivedActivities.push({
            title: `Payroll released for ${payrollObj.month}`,
            time: "Monthly",
          });
        }
        if (derivedActivities.length === 0) {
          derivedActivities.push(
            { title: "Workspace initialized", time: "Just now" }
          );
        }
        setActivities(derivedActivities);

      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [employee]);

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
        <div>Loading dashboard data...</div>
      </div>
    );
  }

  return (

    <div className="dashboard-page fade-in">

      {/* Breadcrumb */}

      <div className="breadcrumb">

        Dashboard

      </div>

      {/* Header */}

      <div className="dashboard-header">

        <div>

          <h1>

            Welcome Back, {employee?.full_name?.split(" ")[0] || "User"} 👋

          </h1>

          <p>

            Here's an overview of your work today.

          </p>

        </div>

      </div>

      {/* KPI Cards */}

      <div className="stats-grid">

        {stats.map((item,index)=>(

          <div
            className="stat-card"
            key={index}
            onClick={() => navigate(item.path)}
            style={{ cursor: "pointer" }}
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
            {/* Dashboard Middle */}

      <div className="dashboard-middle">

        {/* Today's Attendance */}

        <div className="attendance-card">

          <div className="card-header">

            <h3>Today's Attendance</h3>

            <button onClick={() => navigate("/employee/attendance")}>View Details</button>

          </div>

          <div className="attendance-grid">

            <div className="attendance-box">

              <Clock3 size={20} />

              <span>Check In</span>

              <h2>{todayLog?.check_in ? formatTimeString(todayLog.check_in) : "--:--"}</h2>

            </div>

            <div className="attendance-box">

              <Clock3 size={20} />

              <span>Check Out</span>

              <h2>{todayLog?.check_out ? formatTimeString(todayLog.check_out) : "--:--"}</h2>

            </div>

            <div className="attendance-box">

              <CalendarCheck size={20} />

              <span>Working Hours</span>

              <h2>{workingTime}</h2>

            </div>

            <div className="attendance-box">

              <BadgeCheck size={20} />

              <span>Status</span>

              <label className={todayLog ? `status-${todayLog.status.toLowerCase()}` : "status-absent"}>

                {todayLog ? todayLog.status : "Not Checked In"}

              </label>

            </div>

          </div>

        </div>

        {/* My Tasks */}

        <div className="tasks-card">

          <div className="card-header">

            <h3>My Tasks</h3>

            <button onClick={() => navigate("/employee/assigned-task")}>View All</button>

          </div>

          <div className="task-list">

            {tasks.map((task,index)=>(

              <div
                className="task-item"
                key={index}
              >

                <div>

                  <h4>

                    {task.title}

                  </h4>

                  <small>

                    {task.priority} Priority

                  </small>

                </div>

                <span
                  className={`task-status ${task.status
                    .toLowerCase()
                    .replace(" ","-")}`}
                >

                  {task.status}

                </span>

              </div>

            ))}

          </div>

        </div>

      </div>

      {/* Leave Summary */}

      <div className="leave-card">

          <div className="card-header">

            <h3>Leave Summary</h3>

            <button onClick={() => navigate("/employee/leave")}>Apply Leave</button>

          </div>

        <div className="leave-progress">

          <div className="leave-item">

            <div>

              <span>Earned Leave</span>

              <strong>{leaves ? `${leaves.earned_total - leaves.earned_used} / ${leaves.earned_total}` : "0 / 20"} Days</strong>

            </div>

            <div className="progress-bar">

              <div
                className="progress-fill"
                style={{ width: leaves ? `${((leaves.earned_total - leaves.earned_used) / leaves.earned_total) * 100}%` : "0%" }}
              ></div>

            </div>

          </div>

          <div className="leave-item">

            <div>

              <span>Sick Leave</span>

              <strong>{leaves ? `${leaves.sick_total - leaves.sick_used} / ${leaves.sick_total}` : "0 / 10"} Days</strong>

            </div>

            <div className="progress-bar">

              <div
                className="progress-fill"
                style={{ width: leaves ? `${((leaves.sick_total - leaves.sick_used) / leaves.sick_total) * 100}%` : "0%" }}
              ></div>

            </div>

          </div>

          <div className="leave-item">

            <div>

              <span>Casual Leave</span>

              <strong>{leaves ? `${leaves.casual_total - leaves.casual_used} / ${leaves.casual_total}` : "0 / 12"} Days</strong>

            </div>

            <div className="progress-bar">

              <div
                className="progress-fill"
                style={{ width: leaves ? `${((leaves.casual_total - leaves.casual_used) / leaves.casual_total) * 100}%` : "0%" }}
              ></div>

            </div>

          </div>

        </div>

      </div>
            {/* Bottom Section */}

      <div className="bottom-section">

        {/* Payroll Snapshot */}

        <div className="payroll-card">

          <div className="card-header">

            <h3>Payroll Snapshot</h3>

            <button onClick={() => navigate("/employee/payroll")}>

              <Download size={16} />

              Payslip

            </button>

          </div>

          <div className="payroll-grid">

            <div className="payroll-box">

              <span>Net Salary</span>

              <h2>₹{Number(payroll?.net_pay || 0).toLocaleString("en-IN")}</h2>

            </div>

            <div className="payroll-box">

              <span>Gross Salary</span>

              <h2>₹{Number(payroll ? payroll.net_pay + 1320 : 0).toLocaleString("en-IN")}</h2>

            </div>

            <div className="payroll-box">

              <span>Tax Deduction (TDS)</span>

              <h2>₹{payroll ? "580" : "0"}</h2>

            </div>

            <div className="payroll-box">

              <span>Salary Status</span>

              <label className={`status-${payroll?.status?.toLowerCase() === "credited" ? "paid" : "pending"}`}>

                {payroll?.status === "CREDITED" ? "Paid" : (payroll?.status || "Pending")}

              </label>

            </div>

          </div>

        </div>

        {/* Weekly Attendance */}

        <div className="weekly-card">

          <div className="card-header">

            <h3>Weekly Attendance</h3>

            <button onClick={() => navigate("/employee/attendance")}>This Week</button>

          </div>

          <div className="weekly-chart">

            {[78,95,82,100,90,65,88].map((height,index)=>(

              <div
                className="bar-box"
                key={index}
              >

                <div
                  className="bar"
                  style={{
                    height:`${height}px`
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

      {/* Recent Activity */}

      <div className="activity-card">

          <div className="card-header">

            <h3>Recent Activity</h3>

            <button onClick={() => navigate("/employee/notifications")}>View All</button>

          </div>

        <div className="activity-list">

          {activities.map((activity,index)=>(

            <div
              className="activity-item"
              key={index}
            >

              <div className="activity-dot"></div>

              <div>

                <h4>

                  {activity.title}

                </h4>

                <span>

                  {activity.time}

                </span>

              </div>

            </div>

          ))}

        </div>

      </div>
            {/* Dashboard Footer */}

      <div className="dashboard-footer">

        {/* Quick Actions */}

        <div className="quick-card">

          <div className="card-header">

            <h3>Quick Actions</h3>

          </div>

          <div className="quick-grid">

            <div className="quick-action" onClick={() => navigate("/employee/attendance")} style={{ cursor: "pointer" }}>

              <CalendarCheck size={24} />

              <span>Attendance</span>

            </div>

            <div className="quick-action" onClick={() => navigate("/employee/assigned-task")} style={{ cursor: "pointer" }}>

              <ClipboardList size={24} />

              <span>Tasks</span>

            </div>

            <div className="quick-action" onClick={() => navigate("/employee/payroll")} style={{ cursor: "pointer" }}>

              <Wallet size={24} />

              <span>Payroll</span>

            </div>

            <div className="quick-action" onClick={() => navigate("/employee/leave")} style={{ cursor: "pointer" }}>

              <BadgeCheck size={24} />

              <span>Apply Leave</span>

            </div>

            <div className="quick-action" onClick={() => navigate("/employee/profile")} style={{ cursor: "pointer" }}>

              <User size={24} />

              <span>Profile</span>

            </div>

            <div className="quick-action" onClick={() => navigate("/employee/support")} style={{ cursor: "pointer" }}>

              <Headphones size={24} />

              <span>Support</span>

            </div>

          </div>

        </div>

        {/* Notifications */}

        <div className="dashboard-notification-card">

          <div className="card-header">

            <h3>Notifications</h3>

            <button onClick={() => navigate("/employee/notifications")}>View All</button>

          </div>

          <div className="notification-list">

            {notifications.length === 0 ? (
              <div style={{ color: "#bfbfbf", fontSize: "14px", padding: "10px" }}>No new notifications</div>
            ) : (
              notifications.map((notif, index) => (
                <div className="notification-item" key={notif.id || index}>
                  <div className={`notify-dot ${notif.type === 'Alert' ? 'orange' : notif.type === 'Task' ? 'blue' : notif.type === 'Leave' ? 'green' : 'purple'}`}></div>
                  <div>
                    <h4>{notif.title}</h4>
                    <span>{notif.message}</span>
                  </div>
                </div>
              ))
            )}

          </div>

        </div>

      </div>

      {/* Upcoming Events */}

      <div className="events-card">

        <div className="card-header">

          <h3>Upcoming Events</h3>

          <button onClick={() => navigate("/employee/calendar")}>View Calendar</button>

        </div>

        <div className="events-grid">

          <div className="event-box">

            <h4>🎉 Company Holiday</h4>

            <span>15 Aug 2026</span>

          </div>

          <div className="event-box">

            <h4>🎂 Employee Birthday</h4>

            <span>18 Jul 2026</span>

          </div>

          <div className="event-box">

            <h4>📅 Performance Review</h4>

            <span>25 Jul 2026</span>

          </div>

          <div className="event-box">

            <h4>🤝 Monthly Team Meeting</h4>

            <span>30 Jul 2026</span>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Dashboard;