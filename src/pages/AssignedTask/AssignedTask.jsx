import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import "./AssignedTask.css";

import {
  FolderKanban,
  ClipboardList,
  CircleCheckBig,
  ClipboardCheck,
  TrendingUp,
  FolderOpen,
  Plus,
  FileText,
  Eye,
} from "lucide-react";

import { taskAPI } from "../../services/api";

function AssignedTask() {
  const { employee } = useOutletContext() || {};
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState([]);
  const [taskOverview, setTaskOverview] = useState([]);
  const [loading, setLoading] = useState(true);

  const [timesheets, setTimesheets] = useState([]);
  const [deliverables, setDeliverables] = useState([]);

  // Timesheet Modal states
  const [showTimesheetModal, setShowTimesheetModal] = useState(false);
  const [tsHours, setTsHours] = useState("");
  const [tsDescription, setTsDescription] = useState("");
  const [tsChallenges, setTsChallenges] = useState("");
  const [tsPlanTomorrow, setTsPlanTomorrow] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);

  // Deliverable Modal states
  const [showDeliverableModal, setShowDeliverableModal] = useState(false);
  const [delType, setDelType] = useState("Source Code");
  const [delDescription, setDelDescription] = useState("");
  const [delVersion, setDelVersion] = useState("1.0.0");
  const [delVisibility, setDelVisibility] = useState("Private (Only Team)");
  const [delFileName, setDelFileName] = useState("");
  const [delFilePath, setDelFilePath] = useState("");

  const fetchTasksData = async () => {
    if (!employee) return;
    try {
      setLoading(true);
      const [tasksRes, timesheetsRes, deliverablesRes] = await Promise.allSettled([
        taskAPI.getTasks(),
        taskAPI.getTimesheets(),
        taskAPI.getDeliverables()
      ]);

      const data = tasksRes.status === "fulfilled" ? tasksRes.value : [];
      setTasks(data || []);

      if (timesheetsRes.status === "fulfilled") {
        setTimesheets(timesheetsRes.value || []);
      }
      if (deliverablesRes.status === "fulfilled") {
        setDeliverables(deliverablesRes.value || []);
      }

      // Calculate stats
      const totalTasks = data.length;
      const completedTasks = data.filter(t => t.status === "Completed").length;
      const inProgressTasks = data.filter(t => t.status === "In Progress").length;
      const reviewTasks = data.filter(t => t.status === "Review").length;
      const pendingTasks = data.filter(t => t.status === "To Do" || t.status === "Pending").length;
      
      const activeProjectsCount = new Set(data.filter(t => t.status !== "Completed").map(t => t.project_name)).size;
      
      const completionPct = totalTasks > 0 
        ? Math.round(data.reduce((acc, curr) => acc + (curr.progress_pct || 0), 0) / totalTasks) 
        : 0;

      const dueTodayCount = data.filter(t => {
        if (!t.due_date) return false;
        const todayStr = new Date().toISOString().split("T")[0];
        return t.due_date === todayStr && t.priority === "High";
      }).length;

      setStats([
        {
          icon: <FolderKanban size={20} />,
          title: "Projects Active",
          value: activeProjectsCount.toString(),
          sub: "In Progress",
          color: "#6C3EF4",
        },
        {
          icon: <ClipboardList size={20} />,
          title: "Assigned Tasks",
          value: totalTasks.toString(),
          sub: "Total Tasks",
          color: "#4F8CFF",
        },
        {
          icon: <CircleCheckBig size={20} />,
          title: "Tasks Completed",
          value: completedTasks.toString(),
          sub: "This Month",
          color: "#36C98C",
        },
        {
          icon: <ClipboardCheck size={20} />,
          title: "Pending Reviews",
          value: reviewTasks.toString(),
          sub: "Awaiting Review",
          color: "#FF9E44",
        },
        {
          icon: <TrendingUp size={20} />,
          title: "Completion",
          value: `${completionPct}%`,
          sub: "Overall Progress",
          color: "#8B5CF6",
        },
        {
          title: "Due Today",
          value: dueTodayCount.toString(),
          sub: "High Priority",
          color: "#E5484D",
          icon: <FolderOpen size={22} />,
        },
      ]);

      setTaskOverview([
        {
          title: "Completed",
          value: completedTasks,
          color: "#22B573",
        },
        {
          title: "In Progress",
          value: inProgressTasks,
          color: "#6C3EF4",
        },
        {
          title: "Review / Pending",
          value: reviewTasks + pendingTasks,
          color: "#FF9E44",
        },
      ]);

    } catch (err) {
      console.error("Failed to fetch tasks data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasksData();
  }, [employee]);

  const handleUpdateProgress = async (taskId, currentProgress, status) => {
    const newProgress = prompt("Enter new progress percentage (0 - 100):", currentProgress);
    if (newProgress === null) return;
    
    const pct = parseInt(newProgress);
    if (isNaN(pct) || pct < 0 || pct > 100) {
      alert("Invalid percentage. Please enter a number between 0 and 100.");
      return;
    }

    let newStatus = status;
    if (pct === 100) {
      newStatus = "Completed";
    } else if (pct > 0 && status === "To Do") {
      newStatus = "In Progress";
    }

    try {
      await taskAPI.updateTask(taskId, {
        progress_pct: pct,
        status: newStatus
      });
      alert("Progress updated successfully!");
      await fetchTasksData();
    } catch (err) {
      console.error("Failed to update task progress:", err);
      alert("Failed to update task progress.");
    }
  };

  const handleLogTimesheetSubmit = async (e) => {
    e.preventDefault();
    if (!selectedTask || !tsHours || !tsDescription) {
      alert("Please fill in required fields.");
      return;
    }
    try {
      await taskAPI.createTimesheet({
        project_name: selectedTask.project_name,
        task_name: selectedTask.title,
        date: new Date().toISOString().split("T")[0],
        hours_worked: parseFloat(tsHours),
        description: tsDescription,
        challenges: tsChallenges || null,
        plan_tomorrow: tsPlanTomorrow || null
      });
      alert("Timesheet logged successfully!");
      setShowTimesheetModal(false);
      setTsHours("");
      setTsDescription("");
      setTsChallenges("");
      setTsPlanTomorrow("");
      await fetchTasksData();
    } catch (err) {
      console.error("Failed to log timesheet:", err);
      alert(err.response?.data?.detail || "Failed to log timesheet.");
    }
  };

  const handleDeliverableSubmit = async (e) => {
    e.preventDefault();
    if (!selectedTask || !delFileName || !delFilePath) {
      alert("Please fill in all file details.");
      return;
    }
    try {
      await taskAPI.createDeliverable({
        project_name: selectedTask.project_name,
        task_name: selectedTask.title,
        deliverable_type: delType,
        description: delDescription || null,
        version: delVersion,
        visibility: delVisibility,
        file_name: delFileName,
        file_size: "12 KB", // Mock size
        file_path: delFilePath
      });
      alert("Deliverable submitted successfully!");
      setShowDeliverableModal(false);
      setDelFileName("");
      setDelFilePath("");
      setDelDescription("");
      await fetchTasksData();
    } catch (err) {
      console.error("Failed to submit deliverable:", err);
      alert(err.response?.data?.detail || "Failed to submit deliverable.");
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
        <div>Loading assigned tasks...</div>
      </div>
    );
  }

  return (
    <div className="assigned-page fade-in">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        Dashboard
        <span> / </span>
        Assigned Task
      </div>

      {/* Header */}
      <div className="assigned-header">
        <div>
          <h1>Project Progress</h1>
          <p>Track your projects, tasks and update your daily progress.</p>
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

      {/* Projects + Quick Actions */}
      <div className="project-section">
        {/* Left */}
        <div className="projects-card">
          <div className="card-header">
            <h3>My Assigned Tasks</h3>
            <button onClick={fetchTasksData}>Refresh</button>
          </div>

          <div className="table-header">
            <span>Project & Task</span>
            <span>Priority</span>
            <span>Status</span>
            <span>Deadline</span>
            <span>Progress</span>
            <span>Action</span>
          </div>

          {tasks.length === 0 ? (
            <div style={{ padding: "20px", textAlign: "center", color: "#bfbfbf" }}>No tasks assigned.</div>
          ) : (
            tasks.map((task, index) => (
              <div className="project-row" key={task.id || index}>
                <span className="project-name">
                  <strong>{task.project_name}</strong>
                  <small style={{ display: "block", color: "#bfbfbf", marginTop: "4px" }}>{task.title}</small>
                </span>

                <span>{task.priority}</span>

                <span className={`status ${task.status.toLowerCase().replace(" ", "-")}`}>
                  {task.status}
                </span>

                <span>
                  {task.due_date 
                    ? new Date(task.due_date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
                    : "No Deadline"}
                </span>

                <div className="progress-wrapper">
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${task.progress_pct || 0}%` }}
                    ></div>
                  </div>
                  <small>{task.progress_pct || 0}%</small>
                </div>

                <div style={{ display: "flex", gap: "6px" }}>
                  <button 
                    className="view-btn" 
                    onClick={() => handleUpdateProgress(task.id, task.progress_pct, task.status)}
                  >
                    Update
                  </button>
                  <button 
                    className="view-btn" 
                    onClick={() => { setSelectedTask(task); setShowTimesheetModal(true); }}
                    style={{ background: "#4F8CFF" }}
                  >
                    Log Time
                  </button>
                  <button 
                    className="view-btn" 
                    onClick={() => { setSelectedTask(task); setShowDeliverableModal(true); }}
                    style={{ background: "#22B573" }}
                  >
                    Submit File
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="bottom-section">
          {/* Recent Activity */}
          <div className="bottom-card">
            <div className="card-header">
              <h3>Recent Activity</h3>
              <button>View All</button>
            </div>

            {tasks.slice(0, 3).map((item, index) => (
              <div className="activity-item" key={index}>
                <div className="activity-dot"></div>
                <div>
                  <h4>Progress updated to {item.progress_pct}% on "{item.title}"</h4>
                  <span>Recently</span>
                </div>
              </div>
            ))}
          </div>

          {/* Task Overview */}
          <div className="bottom-card">
            <div className="card-header">
              <h3>Task Overview</h3>
            </div>

            <div className="task-circle">
              <h1>{tasks.length}</h1>
              <p>Total Tasks</p>
            </div>

            {taskOverview.map((item, index) => (
              <div className="task-row" key={index}>
                <div className="task-color" style={{ background: item.color }}></div>
                <span>{item.title}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timesheet & Deliverables History */}
      <div className="history-section">
        {/* Timesheets */}
        <div className="history-card">
          <div className="card-header">
            <h3>Logged Timesheets</h3>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table>
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Hours</th>
                  <th>Date</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {timesheets.length === 0 ? (
                  <tr>
                    <td colSpan="4" style={{ textAlign: "center", color: "#bfbfbf" }}>No logged timesheets found.</td>
                  </tr>
                ) : (
                  timesheets.map((ts, idx) => (
                    <tr key={ts.id || idx}>
                      <td>{ts.task_name}</td>
                      <td>{ts.hours_worked} hrs</td>
                      <td>{new Date(ts.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</td>
                      <td>{ts.description}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Deliverables */}
        <div className="history-card">
          <div className="card-header">
            <h3>Submitted Deliverables</h3>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table>
              <thead>
                <tr>
                  <th>Task</th>
                  <th>File Name</th>
                  <th>Type</th>
                  <th>Uploaded</th>
                </tr>
              </thead>
              <tbody>
                {deliverables.length === 0 ? (
                  <tr>
                    <td colSpan="4" style={{ textAlign: "center", color: "#bfbfbf" }}>No submitted deliverables found.</td>
                  </tr>
                ) : (
                  deliverables.map((del, idx) => (
                    <tr key={del.id || idx}>
                      <td>{del.task_name}</td>
                      <td>
                        <a href={del.file_path} target="_blank" rel="noreferrer" style={{ color: "#4F8CFF", textDecoration: "underline" }}>
                          {del.file_name}
                        </a>
                      </td>
                      <td>{del.deliverable_type}</td>
                      <td>{new Date(del.uploaded_at || del.due_date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Timesheet Modal */}
      {showTimesheetModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3>Log Timesheet for {selectedTask?.title}</h3>
              <button className="modal-close" onClick={() => setShowTimesheetModal(false)}>×</button>
            </div>
            <form className="modal-form" onSubmit={handleLogTimesheetSubmit}>
              <div className="form-group">
                <label>Hours Worked</label>
                <input
                  type="number"
                  step="0.5"
                  placeholder="e.g. 8.0"
                  value={tsHours}
                  onChange={(e) => setTsHours(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description of Work</label>
                <textarea
                  rows="3"
                  placeholder="What did you work on?"
                  value={tsDescription}
                  onChange={(e) => setTsDescription(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="form-group">
                <label>Challenges (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Server down, API issues"
                  value={tsChallenges}
                  onChange={(e) => setTsChallenges(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Plan for Tomorrow (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Complete leave page integration"
                  value={tsPlanTomorrow}
                  onChange={(e) => setTsPlanTomorrow(e.target.value)}
                />
              </div>
              <div className="btn-group">
                <button type="button" className="cancel-btn" onClick={() => setShowTimesheetModal(false)}>Cancel</button>
                <button type="submit" className="submit-btn">Submit Log</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Deliverable Modal */}
      {showDeliverableModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3>Submit Deliverable for {selectedTask?.title}</h3>
              <button className="modal-close" onClick={() => setShowDeliverableModal(false)}>×</button>
            </div>
            <form className="modal-form" onSubmit={handleDeliverableSubmit}>
              <div className="form-group">
                <label>Deliverable Type</label>
                <select value={delType} onChange={(e) => setDelType(e.target.value)}>
                  <option value="Source Code">Source Code</option>
                  <option value="Design Document">Design Document</option>
                  <option value="Test Report">Test Report</option>
                  <option value="API Spec">API Spec</option>
                </select>
              </div>
              <div className="form-group">
                <label>File Name</label>
                <input
                  type="text"
                  placeholder="e.g. index.js"
                  value={delFileName}
                  onChange={(e) => setDelFileName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>File Path (Mock Link)</label>
                <input
                  type="text"
                  placeholder="e.g. /uploads/project/index.js"
                  value={delFilePath}
                  onChange={(e) => setDelFilePath(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Version</label>
                <input
                  type="text"
                  placeholder="e.g. 1.0.0"
                  value={delVersion}
                  onChange={(e) => setDelVersion(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Visibility</label>
                <select value={delVisibility} onChange={(e) => setDelVisibility(e.target.value)}>
                  <option value="Private (Only Team)">Private (Only Team)</option>
                  <option value="Public (All Employees)">Public (All Employees)</option>
                </select>
              </div>
              <div className="form-group">
                <label>Description (Optional)</label>
                <textarea
                  rows="2"
                  placeholder="Briefly describe the file..."
                  value={delDescription}
                  onChange={(e) => setDelDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="btn-group">
                <button type="button" className="cancel-btn" onClick={() => setShowDeliverableModal(false)}>Cancel</button>
                <button type="submit" className="submit-btn">Submit File</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AssignedTask;