import { HashRouter, Routes, Route } from "react-router-dom";

import Splash from "../pages/Splash/Splash";
import PortalSelection from "../pages/PortalSelection/PortalSelection";
import EmployeeLogin from "../pages/Login/EmployeeLogin";

import EmployeeLayout from "../layouts/EmployeeLayout";

// Main Pages
import Dashboard from "../pages/Dashboard/Dashboard";
import Profile from "../pages/Profile/Profile";
import Empinfo from "../pages/Profile/Empinfo";
import EmpContract from "../pages/Profile/EmpContract";
import NDA from "../pages/Profile/NDA";
import Handbook from "../pages/Profile/Handbook";
import AssignedTask from "../pages/AssignedTask/AssignedTask";
import Attendance from "../pages/Attendance/Attendance";
import Leave from "../pages/Leave/Leave";
import Payroll from "../pages/Payroll/Payroll";
import Support from "../pages/Support/Support";
import Settings from "../pages/Settings/Settings";

// Extra Pages
import Notifications from "../pages/Notifications/Notifications";
import Messages from "../pages/Messages/Messages";
import Calendar from "../pages/Calendar/Calendar";
import Reports from "../pages/Reports/Reports";
import Downloads from "../pages/Downloads/Downloads";
import Documents from "../pages/Documents/Documents";
import ActivityLog from "../pages/ActivityLog/ActivityLog";
import HelpCenter from "../pages/HelpCenter/HelpCenter";
import Search from "../pages/Search/Search";
import Security from "../pages/Security/Security";
import ExportCenter from "../pages/ExportCenter/ExportCenter";

function AppRoutes() {
  return (
    <HashRouter>
      <Routes>

        {/* Splash */}
        <Route path="/" element={<Splash />} />

        {/* Portal Selection */}
        <Route
          path="/portal-selection"
          element={<PortalSelection />}
        />

        {/* Employee Login */}
        <Route
          path="/employee/login"
          element={<EmployeeLogin />}
        />

        {/* Employee Layout */}
        <Route
          path="/employee"
          element={<EmployeeLayout />}
        >

          {/* Main Pages */}

          <Route
            path="dashboard"
            element={<Dashboard />}
          />

          <Route
            path="profile"
            element={<Profile />}
          />

          <Route
            path="assigned-task"
            element={<AssignedTask />}
          />

          <Route
            path="attendance"
            element={<Attendance />}
          />

          <Route
            path="leave"
            element={<Leave />}
          />

          <Route
            path="payroll"
            element={<Payroll />}
          />

          <Route
            path="support"
            element={<Support />}
          />

          <Route
            path="settings"
            element={<Settings />}
          />

          {/* Extra Pages */}

          <Route
            path="notifications"
            element={<Notifications />}
          />

          <Route
            path="messages"
            element={<Messages />}
          />

          <Route
            path="calendar"
            element={<Calendar />}
          />

          <Route
            path="reports"
            element={<Reports />}
          />

          <Route
            path="downloads"
            element={<Downloads />}
          />

          <Route
            path="documents"
            element={<Documents />}
          />

          <Route
            path="activity-log"
            element={<ActivityLog />}
          />

          <Route
            path="help-center"
            element={<HelpCenter />}
          />

          <Route
            path="search"
            element={<Search />}
          />

          <Route
            path="security"
            element={<Security />}
          />

          <Route
            path="export"
            element={<ExportCenter />}
          />

        </Route>

        <Route
          path="/employee/offer-letter"
          element={<Empinfo />}
        />

        <Route
          path="/employee/employment-contract"
          element={<EmpContract />}
        />

        <Route
          path="/employee/nda"
          element={<NDA />}
        />

        <Route
          path="/employee/handbook"
          element={<Handbook />}
        />

      </Routes>
    </HashRouter>
  );
}

export default AppRoutes;