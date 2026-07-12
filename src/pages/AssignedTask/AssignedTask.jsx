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

  const fetchTasksData = async () => {
    if (!employee) return;
    try {
      setLoading(true);
      const data = await taskAPI.getTasks();
      setTasks(data || []);

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
    <div className="assigned-page">
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

                <button 
                  className="view-btn" 
                  onClick={() => handleUpdateProgress(task.id, task.progress_pct, task.status)}
                >
                  Update
                </button>
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
    </div>
  );
}

export default AssignedTask;