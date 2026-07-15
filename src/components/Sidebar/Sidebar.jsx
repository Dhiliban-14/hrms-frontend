import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  UserRound,
  ClipboardList,
  Clock3,
  CalendarDays,
  Wallet,
  Headset,
  Settings,
} from "lucide-react";

import logo from "../../assets/logos/logo.png";
import "./Sidebar.css";

const menuItems = [
  {
    title: "Dashboard",
    icon: <LayoutDashboard size={18} />,
    path: "/employee/dashboard",
  },
  {
    title: "Employee Information",
    icon: <UserRound size={18} />,
    path: "/employee/profile",
  },
  {
    title: "Assigned Task",
    icon: <ClipboardList size={20} />,
    path: "/employee/assigned-task",
  },
  {
    title: "Attendance",
    icon: <Clock3 size={18} />,
    path: "/employee/attendance",
  },
  {
    title: "Apply Leave",
    icon: <CalendarDays size={18} />,
    path: "/employee/leave",
  },
  {
    title: "Payroll Status",
    icon: <Wallet size={18} />,
    path: "/employee/payroll",
  },
  {
    title: "Employee Support",
    icon: <Headset size={18} />,
    path: "/employee/support",
  },
  {
    title: "Settings",
    icon: <Settings size={18} />,
    path: "/employee/settings",
  },
];

function Sidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const isItemActive = (itemPath) => {
    if (currentPath === itemPath) return true;
    if (itemPath === "/employee/profile") {
      return [
        "/employee/offer-letter",
        "/employee/employment-contract",
        "/employee/nda",
        "/employee/handbook",
        "/employee/verification-letter"
      ].some(p => currentPath.startsWith(p));
    }
    if (itemPath === "/employee/payroll") {
      return currentPath.startsWith("/employee/payslip");
    }
    return false;
  };

  return (
    <aside className="sidebar">

      <div className="sidebar-logo">
        <img src={logo} alt="ZeAI Logo" />
      </div>

      <nav className="sidebar-menu">
        {menuItems.map((item) => (
          <NavLink
            key={item.title}
            to={item.path}
            data-tooltip={item.title}
            className={({ isActive }) =>
              isActive || isItemActive(item.path) ? "menu-item active" : "menu-item"
            }
          >
            <div className="menu-icon">
              {item.icon}
            </div>

            <span>{item.title}</span>
          </NavLink>
        ))}
      </nav>

    </aside>
  );
}

export default Sidebar;