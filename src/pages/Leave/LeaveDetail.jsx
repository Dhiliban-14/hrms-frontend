import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import { leaveAPI } from "../../services/api";
import "./LeaveDetail.css";

export default function LeaveDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [leave, setLeave] = useState(location.state?.leaveRequest || null);
  const [loading, setLoading] = useState(!leave);

  useEffect(() => {
    // Inject Tailwind CSS Play CDN script
    const script = document.createElement("script");
    script.src = "https://cdn.tailwindcss.com";
    script.id = "tailwind-cdn-script-leavedetail";
    document.head.appendChild(script);

    // Inject fonts
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=Hanken+Grotesk:wght@400;500;700&family=Manrope:wght@400;500;700&family=Material+Icons&display=swap";
    link.rel = "stylesheet";
    link.id = "leavedetail-fonts";
    document.head.appendChild(link);

    const fetchLeaveRequest = async () => {
      if (leave) return;
      try {
        setLoading(true);
        const requests = await leaveAPI.getRequests();
        const found = requests.find(r => String(r.id) === String(id));
        if (found) {
          setLeave(found);
        } else {
          // Mock fallback if id not found (e.g. for mock UI demo)
          setLeave({
            leave_type: "Casual Leave",
            from_date: "2026-07-22",
            to_date: "2026-07-23",
            total_days: 2,
            session: "Full Day",
            leave_reason: "Family vacation and medical checkup.",
            reason_details: "Emergency Contact: +1 (555) 019-2834",
            status: "Pending",
            applied_on: "2026-07-15"
          });
        }
      } catch (err) {
        console.error("Failed to load leave requests:", err);
        setLeave({
          leave_type: "Casual Leave",
          from_date: "2026-07-22",
          to_date: "2026-07-23",
          total_days: 2,
          session: "Full Day",
          leave_reason: "Family vacation and medical checkup.",
          reason_details: "Emergency Contact: +1 (555) 019-2834",
          status: "Pending",
          applied_on: "2026-07-15"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchLeaveRequest();

    return () => {
      // Clean up script
      const el = document.getElementById("tailwind-cdn-script-leavedetail");
      if (el) el.remove();

      // Clean up fonts
      const f = document.getElementById("leavedetail-fonts");
      if (f) f.remove();

      // Clean up dynamically generated style tags from Tailwind CDN
      const styles = document.querySelectorAll("style");
      styles.forEach(s => {
        if (s.textContent.includes("--tw-") || s.id?.includes("tailwind")) {
          s.remove();
        }
      });
    };
  }, [id]);

  if (loading || !leave) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#FEFEFE]">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#6C3EF4]"></div>
          <p className="text-gray-500 font-inter text-sm">Loading leave request details...</p>
        </div>
      </div>
    );
  }

  const statusLower = leave.status.toLowerCase();
  let statusColor = "bg-amber-50 text-amber-600 border-amber-200";
  if (statusLower === "approved" || statusLower === "approved") {
    statusColor = "bg-emerald-50 text-emerald-600 border-emerald-200";
  } else if (statusLower === "rejected" || statusLower === "rejected") {
    statusColor = "bg-rose-50 text-rose-600 border-rose-200";
  }

  return (
    <div className="leave-detail-page fade-in flex flex-col items-start gap-6 w-full pb-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 select-none">
        <span 
          className="text-[#9CA3AF] font-inter text-xs leading-4 cursor-pointer hover:text-[#6C3EF4]"
          onClick={() => navigate("/employee/dashboard")}
        >
          Dashboard
        </span>
        <span className="text-[#9CA3AF] font-inter text-xs">/</span>
        <span 
          className="text-[#9CA3AF] font-inter text-xs leading-4 cursor-pointer hover:text-[#6C3EF4]"
          onClick={() => navigate("/employee/leave")}
        >
          Apply Leave
        </span>
        <span className="text-[#9CA3AF] font-inter text-xs">/</span>
        <span className="text-[#6C3EF4] font-inter text-xs leading-4 font-medium">
          Leave Details
        </span>
      </div>

      {/* Back Button */}
      <div 
        className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity" 
        onClick={() => navigate("/employee/leave")}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4 overflow-hidden relative"
        >
          <path
            d="M10.6667 14.6667L4 8L10.6667 1.33334L11.6167 2.28334L5.9 8L11.6167 13.7167L10.6667 14.6667Z"
            fill="#6C3EF4"
          />
        </svg>
        <p className="text-[#6C3EF4] font-inter text-[13px] font-semibold leading-[19.5px]">
          Back to Leave History
        </p>
      </div>

      {/* Main Details Card */}
      <div className="flex flex-col items-start gap-8 rounded-[32px] border border-[#E9E4F5] bg-[#FFF] p-8 md:p-10 shadow-[0_4px_30px_rgba(0,0,0,0.01)] w-full max-w-[850px] mt-2">
        {/* Header Info */}
        <div className="flex justify-between items-center w-full pb-6 border-b border-[#F3F4F6]">
          <div className="flex flex-col gap-1">
            <h2 className="text-[#1E293B] font-inter text-2xl font-bold tracking-tight">
              {leave.leave_type.toLowerCase().includes("leave") ? leave.leave_type : `${leave.leave_type} Leave`}
            </h2>
            <p className="text-[#9CA3AF] font-inter text-xs">
              Applied on {new Date(leave.applied_on || leave.requested_on || new Date()).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
            </p>
          </div>
          <div>
            <span className={`px-4 py-2 border rounded-full text-xs font-semibold uppercase tracking-wider ${statusColor}`}>
              {leave.status}
            </span>
          </div>
        </div>

        {/* Quick Info Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full bg-[#F8F9FD] rounded-2xl p-6 border border-[#E9E4F5]">
          <div className="flex flex-col gap-1">
            <span className="text-[#9CA3AF] font-inter text-[10px] uppercase font-bold tracking-wider">Start Date</span>
            <span className="text-[#1E293B] font-inter text-sm font-semibold">
              {new Date(leave.from_date || leave.start_date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[#9CA3AF] font-inter text-[10px] uppercase font-bold tracking-wider">End Date</span>
            <span className="text-[#1E293B] font-inter text-sm font-semibold">
              {new Date(leave.to_date || leave.end_date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[#9CA3AF] font-inter text-[10px] uppercase font-bold tracking-wider">Total Duration</span>
            <span className="text-[#6C3EF4] font-inter text-sm font-bold">
              {leave.total_days} {leave.total_days === 1 ? "Day" : "Days"}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[#9CA3AF] font-inter text-[10px] uppercase font-bold tracking-wider">Session</span>
            <span className="text-[#1E293B] font-inter text-sm font-semibold">
              {leave.session || "Full Day"}
            </span>
          </div>
        </div>

        {/* Leave Reason Card */}
        <div className="flex flex-col gap-3 w-full">
          <h3 className="text-[#1E293B] font-inter text-sm font-bold tracking-tight">
            Reason for Leave
          </h3>
          <div className="bg-[#FFF] border border-[#E9E4F5] rounded-xl p-5 w-full">
            <p className="text-[#4B5563] font-inter text-sm leading-relaxed whitespace-pre-line">
              {leave.leave_reason || "No reason specified."}
            </p>
          </div>
        </div>

        {/* Leave Details Card (e.g. emergency details/address) */}
        <div className="flex flex-col gap-3 w-full">
          <h3 className="text-[#1E293B] font-inter text-sm font-bold tracking-tight">
            Additional Details
          </h3>
          <div className="bg-[#FFF] border border-[#E9E4F5] rounded-xl p-5 w-full">
            <p className="text-[#4B5563] font-inter text-sm leading-relaxed whitespace-pre-line">
              {leave.reason_details || "No additional details provided."}
            </p>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <p className="text-center text-[#9CA3AF] font-inter text-[11px] leading-4 w-full mt-6 select-none">
        &copy; 2026 ZeAI HRMS Portal. All Rights Reserved.
      </p>
    </div>
  );
}
