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
const stats = [
  {
    icon: <FolderKanban size={20} />,
    title: "Projects Active",
    value: "3",
    sub: "In Progress",
    color: "#6C3EF4",
  },
  {
    icon: <ClipboardList size={20} />,
    title: "Assigned Tasks",
    value: "18",
    sub: "Total Tasks",
    color: "#4F8CFF",
  },
  {
    icon: <CircleCheckBig size={20} />,
    title: "Tasks Completed",
    value: "12",
    sub: "This Month",
    color: "#36C98C",
  },
  {
    icon: <ClipboardCheck size={20} />,
    title: "Pending Reviews",
    value: "4",
    sub: "Awaiting Review",
    color: "#FF9E44",
  },
  {
    icon: <TrendingUp size={20} />,
    title: "Completion",
    value: "74%",
    sub: "Overall Progress",
    color: "#8B5CF6",
  },
  {
  title: "Due Today",
  value: "3",
  sub: "High Priority",
  color: "#E5484D",
  icon: <FolderOpen size={22} />,
},
];

const projects = [
  {
    name: "Employee HRMS",
    client: "ZeAI Soft",
    status: "Active",
    deadline: "15 Jul 2026",
    progress: 82,
  },
  {
    name: "Payroll Module",
    client: "ZeAI Soft",
    status: "Review",
    deadline: "18 Jul 2026",
    progress: 65,
  },
  {
    name: "Leave Management",
    client: "ZeAI Soft",
    status: "Pending",
    deadline: "22 Jul 2026",
    progress: 40,
  },
];

const activities = [
  {
    title: "Completed Employee Dashboard",
    time: "2 hours ago",
  },
  {
    title: "Uploaded Payroll Module",
    time: "5 hours ago",
  },
  {
    title: "Leave Module Assigned",
    time: "Yesterday",
  },
  {
    title: "Updated Employee Profile",
    time: "Yesterday",
  },
];

const taskStats = [
  {
    title: "Completed",
    value: 12,
    color: "#22B573",
  },
  {
    title: "In Progress",
    value: 4,
    color: "#6C3EF4",
  },
  {
    title: "Pending",
    value: 2,
    color: "#FF9E44",
  },
];

function AssignedTask() {
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

          <p>
            Track your projects, tasks and update your daily progress.
          </p>

        </div>

        <button className="update-btn">

          <Plus size={18} />

          Update Progress

        </button>

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
              style={{ background: item.color }}
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

      {/* Projects + Quick Actions */}

      <div className="project-section">

        {/* Left */}

        <div className="projects-card">

          <div className="card-header">

            <h3>My Projects</h3>

            <button>View All</button>

          </div>

          <div className="table-header">

            <span>Project</span>

            <span>Client</span>

            <span>Status</span>

            <span>Deadline</span>

            <span>Progress</span>

            <span>Action</span>

          </div>

          {projects.map((project, index) => (

            <div
              className="project-row"
              key={index}
            >

              <span className="project-name">
                {project.name}
              </span>

              <span>
                {project.client}
              </span>

              <span
                className={`status ${project.status.toLowerCase()}`}
              >
                {project.status}
              </span>

              <span>
                {project.deadline}
              </span>

              <div className="progress-wrapper">

                <div className="progress-bar">

                  <div
                    className="progress-fill"
                    style={{
                      width: `${project.progress}%`,
                    }}
                  ></div>

                </div>

                <small>
                  {project.progress}%
                </small>

              </div>

              <button className="view-btn">
                View
              </button>

            </div>

          ))}

        </div>
        <div className="bottom-section">
    
  {/* Recent Activity */}

  <div className="bottom-card">

    <div className="card-header">

      <h3>Recent Activity</h3>

      <button>View All</button>

    </div>

    {activities.map((item, index) => (

      <div
        className="activity-item"
        key={index}
      >

        <div className="activity-dot"></div>

        <div>

          <h4>{item.title}</h4>

          <span>{item.time}</span>

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

      <h1>18</h1>

      <p>Total Tasks</p>

    </div>

    {taskStats.map((item, index) => (

      <div
        className="task-row"
        key={index}
      >

        <div
          className="task-color"
          style={{
            background: item.color,
          }}
        ></div>

        <span>{item.title}</span>

        <strong>{item.value}</strong>

      </div>

    ))}

  </div>

  {/* Weekly Progress */}

<div className="bottom-card">

  <div className="card-header">

    <h3>Weekly Progress</h3>

    <button>Oct 21 - Oct 27</button>

  </div>

  <div className="chart">

    {[12, 18, 14, 22, 20, 16, 10].map((value, index) => (

      <div className="bar-item" key={index}>

        <div
          className="bar"
          style={{
            height: `${value * 4}px`,
          }}
        ></div>

        <span>
          {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][index]}
        </span>

      </div>

    ))}

  </div>

  <div className="week-summary">

    <div>

      <h4>38.5</h4>

      <span>Total Hours</span>

    </div>

    <div>

      <h4>7</h4>

      <span>Completed</span>

    </div>

    <div>

      <h4>91%</h4>

      <span>Efficiency</span>

    </div>

  </div>

</div>
        </div>
        {/* Right */}

        <div className="quick-card">

          <div className="card-header">

            <h3>Quick Actions</h3>

          </div>

          <div className="quick-grid">

            <div className="quick-action">
              
              <div className="quick-icon">
                <TrendingUp size={24} />
              </div>

              <h4>Update Progress</h4>

              <p>Update today's work</p>

            </div>

            <div className="quick-action">

              <div className="quick-icon">
                <FileText size={24} />
              </div>

              <h4>Daily Report</h4>

              <p>Submit report</p>

            </div>

            <div className="quick-action">

              <div className="quick-icon">
                <FolderOpen size={24} />
              </div>

              <h4>Upload Files</h4>

              <p>Attach project files</p>

            </div>

            <div className="quick-action">

              <div className="quick-icon">
                <Eye size={24} />
              </div>

              <h4>Request Review</h4>

              <p>Send for approval</p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AssignedTask;