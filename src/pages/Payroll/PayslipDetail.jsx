import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { employeeAPI, payrollAPI } from "../../services/api";
import logo from "../../assets/logos/logo.png";

export default function PayslipDetail() {
  const navigate = useNavigate();
  const { payslipNo } = useParams();
  const [employee, setEmployee] = useState(null);
  const [payslipData, setPayslipData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [profileRes, payslipRes] = await Promise.all([
          employeeAPI.getProfile(),
          payrollAPI.getPayslip(payslipNo)
        ]);
        setEmployee(profileRes);
        setPayslipData(payslipRes);
      } catch (err) {
        console.error("Failed to load payslip data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [payslipNo]);

  useEffect(() => {
    // Inject Tailwind CSS Play CDN script
    const script = document.createElement("script");
    script.src = "https://cdn.tailwindcss.com";
    script.id = "tailwind-cdn-script-payslip";
    document.head.appendChild(script);

    // Inject fonts
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=Hanken+Grotesk:wght@400;500;700&family=Manrope:wght@400;500;700&family=Material+Icons&display=swap";
    link.rel = "stylesheet";
    link.id = "payslip-fonts";
    document.head.appendChild(link);

    // Inject custom print styles
    const printStyle = document.createElement("style");
    printStyle.id = "payslip-print-style";
    printStyle.innerHTML = `
      @media print {
        body {
          background: #ffffff !important;
          color: #000000 !important;
        }
        body * {
          visibility: hidden !important;
        }
        #payslip-print-area, #payslip-print-area * {
          visibility: visible !important;
        }
        #payslip-print-area {
          position: absolute !important;
          left: 0 !important;
          top: 0 !important;
          width: 100% !important;
          padding: 20px !important;
          border: none !important;
          box-shadow: none !important;
          background: white !important;
        }
      }
    `;
    document.head.appendChild(printStyle);

    return () => {
      // Clean up script
      const el = document.getElementById("tailwind-cdn-script-payslip");
      if (el) el.remove();

      // Clean up fonts
      const f = document.getElementById("payslip-fonts");
      if (f) f.remove();

      // Clean up print styles
      const p = document.getElementById("payslip-print-style");
      if (p) p.remove();

      // Clean up dynamically generated style tags from Tailwind CDN
      const styles = document.querySelectorAll("style");
      styles.forEach(s => {
        if (s.textContent.includes("--tw-") || s.id?.includes("tailwind")) {
          s.remove();
        }
      });
    };
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#FEFEFE]">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#4A00C1]"></div>
          <p className="text-gray-500 font-inter text-sm">Loading payslip details...</p>
        </div>
      </div>
    );
  }

  if (!payslipData) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#FEFEFE]">
        <div className="text-center">
          <p className="text-red-500 font-bold mb-4">Error loading payslip details.</p>
          <button className="px-4 py-2 bg-[#4A00C1] text-white rounded-lg" onClick={() => navigate("/employee/payroll")}>
            Back to Payroll
          </button>
        </div>
      </div>
    );
  }

  const payroll = payslipData.payroll;
  const details = payslipData.details;
  const empInfo = payslipData.employee;

  // Calculate gross salary from detail values
  const grossVal = details ? (
    Number(details.basic_salary || 0) +
    Number(details.hra || 0) +
    Number(details.transport_allowance || 0) +
    Number(details.special_allowance || 0) +
    Number(details.performance_bonus || 0) +
    Number(details.other_allowances || 0)
  ) : 0;

  // Calculate total deductions
  const deductionVal = details ? (
    Number(payroll?.tax_deductions || details.tds || 0) +
    Number(details.pf || 0) +
    Number(details.professional_tax || 0) +
    Number(details.health_insurance || 0) +
    Number(details.loan_emi || 0)
  ) : 0;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-[#FEFEFE] min-w-screen min-h-screen flex relative">
      <div className="flex flex-col items-start bg-[#CBC3D9] w-px h-8 absolute left-[1229px] top-6 overflow-hidden"></div>
      <div className="w-[297px] shrink-0 min-h-screen sticky top-0">
        <div className="bg-[#000] w-[297px] h-full absolute left-0 top-0"></div>
        <img
          src={logo}
          className="w-[230px] h-[93px] absolute left-[30px] top-[29px] max-w-none cursor-pointer"
          alt="ZeAI Logo"
          onClick={() => navigate("/employee/dashboard")}
        />
        <div className="flex flex-col items-start gap-5 w-[236px] absolute left-5 top-[169px]">
          <div className="flex py-3 px-4 items-center gap-3 rounded-lg w-full cursor-pointer hover:bg-[rgba(255,255,255,0.05)]" onClick={() => navigate("/employee/dashboard")}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex flex-col items-start w-fit "
            >
              <path
                d="M10 6V0H18V6H10ZM0 10V0H8V10H0ZM10 18V8H18V18H10ZM0 18V12H8V18H0Z"
                fill="#9CA3AF"
              />
            </svg>
            <div className="flex flex-col items-start w-fit">
              <p className="text-[#9CA3AF] font-plusJakartaSans text-sm font-semibold leading-5 w-fit">
                Dashboard
              </p>
            </div>
          </div>
          <div className="flex py-3 px-4 items-center gap-3 rounded-lg bg-[#4648D4] w-full cursor-pointer" onClick={() => navigate("/employee/profile")}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 overflow-hidden relative "
            >
              <g clipPath="url(#clip0_2141_3581)">
                <path
                  d="M14.1665 16.6668H18.3332V15.0002C18.3331 13.9352 17.6583 12.9872 16.6521 12.6383C15.6459 12.2894 14.5291 12.6163 13.8698 13.4527M14.1665 16.6668H5.83317M14.1665 16.6668V15.0002C14.1665 14.4535 14.0615 13.931 13.8698 13.4527M5.83317 16.6668H1.6665V15.0002C1.66658 13.9352 2.34133 12.9872 3.34755 12.6383C4.35377 12.2894 5.47053 12.6163 6.12984 13.4527M5.83317 16.6668V15.0002C5.83317 14.4535 5.93817 13.931 6.12984 13.4527M6.12984 13.4527C6.76299 11.8704 8.29558 10.8329 9.99984 10.8329C11.7041 10.8329 13.2367 11.8704 13.8698 13.4527M12.4998 5.8335C12.4998 7.21328 11.3796 8.3335 9.99984 8.3335C8.62005 8.3335 7.49984 7.21328 7.49984 5.8335C7.49984 4.45371 8.62005 3.3335 9.99984 3.3335C11.3796 3.3335 12.4998 4.45371 12.4998 5.8335L14.1665 16.6668M19.1665 19.1668C19.1665 20.0867 18.4197 20.8335 17.4998 20.8335C16.58 20.8335 15.8332 20.0867 15.8332 19.1668C15.8332 18.247 16.58 17.5002 17.4998 17.5002C18.4197 17.5002 19.1665 18.247 19.1665 19.1668V19.1668M5.83317 8.3335C5.83317 9.25335 5.08636 10.0002 4.1665 10.0002C3.24665 10.0002 2.49984 9.25335 2.49984 8.3335C2.49984 7.41364 3.24665 6.66683 4.1665 6.66683C5.08636 6.66683 5.83317 7.41364 5.83317 8.3335V8.3335"
                  stroke="white"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_2141_3581">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <div className="flex flex-col items-start w-fit">
              <p className="text-[#FFF] font-inter text-sm font-medium leading-5 w-fit">
                Employee Information
              </p>
            </div>
          </div>
          <div className="flex py-3 px-4 items-center gap-3 rounded-lg w-full cursor-pointer hover:bg-[rgba(255,255,255,0.05)]" onClick={() => navigate("/employee/assigned-task")}>
            <div className="w-5 h-[21px] relative">
              <svg
                width="22"
                height="23"
                viewBox="0 0 22 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-[21px] absolute left-0 top-0 "
              >
                <path
                  d="M18.2203 9V3H13.9153V5H5.30508V3H1V21H8.5339M5.30508 5V1H13.9153V5M16.0678 15.752V17L17.1441 18M16.0678 21.5C14.7833 21.5 13.5514 21.0259 12.6431 20.182C11.7348 19.3381 11.2246 18.1935 11.2246 17C11.2246 15.8065 11.7348 14.6619 12.6431 13.818C13.5514 12.9741 14.7833 12.5 16.0678 12.5C17.3523 12.5 18.5842 12.9741 19.4925 13.818C20.4007 14.6619 20.911 15.8065 20.911 17C20.911 18.1935 20.4007 19.3381 19.4925 20.182C18.5842 21.0259 17.3523 21.5 16.0678 21.5Z"
                  stroke="#9CA3AF"
                  strokeWidth="2"
                  strokeLinecap="square"
                />
              </svg>
            </div>
            <div className="flex flex-col items-start w-fit">
              <p className="text-[#9CA3AF] font-inter text-sm font-medium leading-5 w-fit">
                Assigned task
              </p>
            </div>
          </div>
          <div className="flex py-3 px-4 items-center gap-3 rounded-lg w-full cursor-pointer hover:bg-[rgba(255,255,255,0.05)]" onClick={() => navigate("/employee/attendance")}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 overflow-hidden relative "
            >
              <g clipPath="url(#clip0_2141_3582)">
                <path
                  d="M10.0003 18.3335C14.6027 18.3335 18.3337 14.6025 18.3337 10.0002C18.3337 5.3978 14.6027 1.66683 10.0003 1.66683C5.39798 1.66683 1.66699 5.3978 1.66699 10.0002C1.66699 14.6025 5.39798 18.3335 10.0003 18.3335Z"
                  stroke="#9CA3AF"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 5V10L13.3333 11.6667"
                  stroke="#9CA3AF"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_2141_3582">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <div className="flex flex-col items-start w-fit">
              <p className="text-[#9CA3AF] font-inter text-sm font-semibold leading-5 w-fit">
                Attendance
              </p>
            </div>
          </div>
          <div className="flex py-3 px-4 items-center gap-3 rounded-lg w-full cursor-pointer hover:bg-[rgba(255,255,255,0.05)]" onClick={() => navigate("/employee/leave")}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 overflow-hidden relative "
            >
              <path
                d="M1.66699 17.5V15.8333H18.3337V17.5H1.66699ZM9.16699 9.16667H10.8337V12.5H14.167L10.0003 16.6667L5.83366 12.5H9.16699V9.16667Z"
                fill="#9CA3AF"
              />
            </svg>
            <div className="flex flex-col items-start w-fit">
              <p className="text-[#9CA3AF] font-inter text-sm font-semibold leading-5 w-fit">
                Apply Leave
              </p>
            </div>
          </div>
          <div className="flex py-3 px-4 items-center gap-3 rounded-lg bg-[rgba(255,255,255,0.08)] w-full cursor-pointer" onClick={() => navigate("/employee/payroll")}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 overflow-hidden relative "
            >
              <path
                d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z"
                stroke="#4648D4"
                strokeWidth="2"
              />
              <path
                d="M7 10H13"
                stroke="#4648D4"
                strokeWidth="2"
              />
              <path
                d="M9 7L13 10L9 13"
                stroke="#4648D4"
                strokeWidth="2"
              />
            </svg>
            <div className="flex flex-col items-start w-fit">
              <p className="text-[#FFF] font-inter text-sm font-semibold leading-5 w-fit">
                Payroll Status
              </p>
            </div>
          </div>
          <div className="flex py-3 px-4 items-center gap-3 rounded-lg w-full cursor-pointer hover:bg-[rgba(255,255,255,0.05)]" onClick={() => navigate("/employee/support")}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 overflow-hidden relative "
            >
              <path
                d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z"
                stroke="#9CA3AF"
                strokeWidth="2"
              />
              <path
                d="M10 14V13"
                stroke="#9CA3AF"
                strokeWidth="2"
              />
              <path
                d="M10 10C11.5 10 12 9 12 8C12 7 11 6 10 6C9 6 8 7 8 8"
                stroke="#9CA3AF"
                strokeWidth="2"
              />
            </svg>
            <div className="flex flex-col items-start w-fit">
              <p className="text-[#9CA3AF] font-inter text-sm font-semibold leading-5 w-fit">
                Employee Support
              </p>
            </div>
          </div>
          <div className="flex py-3 px-4 items-center gap-3 rounded-lg w-full cursor-pointer hover:bg-[rgba(255,255,255,0.05)]" onClick={() => navigate("/employee/settings")}>
            <svg
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex flex-col items-start w-fit "
            >
              <path
                d="M7.3 20L6.9 16.8C6.68333 16.7167 6.47917 16.6167 6.2875 16.5C6.09583 16.3833 5.90833 16.2583 5.725 16.125L2.75 17.375L0 12.625L2.575 10.675C2.55833 10.5583 2.55 10.4458 2.55 10.3375C2.55 10.2292 2.55 10.1167 2.55 10C2.55 9.88333 2.55 9.77083 2.55 9.6625C2.55 9.55417 2.55833 9.44167 2.575 9.325L0 7.375L2.75 2.625L5.725 3.875C5.90833 3.74167 6.1 3.61667 6.3 3.5C6.5 3.38333 6.7 3.28333 6.9 3.2L7.3 0H12.8L13.2 3.2C13.4167 3.28333 13.6208 3.38333 13.8125 3.5C14.0042 3.61667 14.1917 3.74167 14.375 3.875L17.35 2.625L20.1 7.375L17.525 9.325C17.5417 9.44167 17.55 9.55417 17.55 9.6625C17.55 9.77083 17.55 9.88333 17.55 10C17.55 10.1167 17.55 10.2292 17.55 10.3375C17.55 10.4458 17.5333 10.5583 17.5 10.675L20.075 12.625L17.325 17.375L14.375 16.125C14.1917 16.2583 14 16.3833 13.8 16.5C13.6 16.6167 13.4 16.7167 13.2 16.8L12.8 20H7.3ZM9.05 18H11.025L11.375 15.35C11.8917 15.2167 12.3708 15.0208 12.8125 14.7625C13.2542 14.5042 13.6583 14.1917 14.025 13.825L16.5 14.85L17.475 13.15L15.325 11.525C15.4083 11.2917 15.4667 11.0458 15.5 10.7875C15.5333 10.5292 15.55 10.2667 15.55 10C15.55 9.73333 15.5333 9.47083 15.5 9.2125C15.4667 8.95417 15.4083 8.70833 15.325 8.475L17.475 6.85L16.5 5.15L14.025 6.2C13.6583 5.81667 13.2542 5.49583 12.8125 5.2375C12.3708 4.97917 11.8917 4.78333 11.375 4.65L11.05 2H9.075L8.725 4.65C8.20833 4.78333 7.72917 4.97917 7.2875 5.2375C6.84583 5.49583 6.44167 5.80833 6.075 6.175L3.6 5.15L2.625 6.85L4.775 8.45C4.69167 8.7 4.63333 8.95 4.6 9.2C4.56667 9.45 4.55 9.71667 4.55 10C4.55 10.2667 4.56667 10.525 4.6 10.775C4.63333 11.025 4.69167 11.275 4.775 11.525L2.625 13.15L3.6 14.85L6.075 13.8C6.44167 14.1833 6.84583 14.5042 7.2875 14.7625C7.72917 15.0208 8.20833 15.2167 8.725 15.35L9.05 18ZM10.1 13.5C11.0667 13.5 11.8917 13.1583 12.575 12.475C13.2583 11.7917 13.6 10.9667 13.6 10C13.6 9.03333 13.2583 8.20833 12.575 7.525C11.8917 6.84167 11.0667 6.5 10.1 6.5C9.11667 6.5 8.2875 6.84167 7.6125 7.525C6.9375 8.20833 6.6 9.03333 6.6 10C6.6 10.9667 6.9375 11.7917 7.6125 12.475C8.2875 13.1583 9.11667 13.5 10.1 13.5Z"
                fill="#9CA3AF"
              />
            </svg>
            <div className="flex flex-col items-start w-fit">
              <p className="text-[#9CA3AF] font-plusJakartaSans text-sm leading-5 w-fit">
                Settings
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-start gap-6 pt-[80px] pr-6 pb-[25px] pl-6 min-h-screen">
        <div className="flex items-center gap-2 w-[147px] h-5 cursor-pointer" onClick={() => navigate("/employee/profile")}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 overflow-hidden relative "
          >
            <path
              d="M10.6667 14.6667L4 8L10.6667 1.33334L11.6167 2.28334L5.9 8L11.6167 13.7167L10.6667 14.6667Z"
              fill="#4200BB"
            />
          </svg>
          <p className="text-[#4200BB] font-inter text-[13px] font-semibold leading-[19.5px]">
            Back to Employee Information
          </p>
        </div>

        <div className="flex w-full gap-6 items-start">
          {/* Main Document Card */}
          <div id="payslip-print-area" className="flex p-12 flex-col items-start gap-8 rounded-[32px] border border-[#E9E4F5] bg-[#FFF] shadow-[0_4px_30px_rgba(0,0,0,0.02)] w-[820px] shrink-0">
            <div className="flex justify-between items-start w-full">
              <div className="flex flex-col items-start gap-1">
                <h1 className="text-3xl font-extrabold text-[#4A00C1] tracking-tight font-inter">ZeAI</h1>
                <p className="text-[10px] text-gray-400 font-semibold tracking-wider font-inter">GLOBAL SOLUTIONS | HR DEPT</p>
              </div>
              <div className="text-right">
                <h2 className="text-xl font-bold text-gray-800 font-inter">PAYSLIP</h2>
                <p className="text-xs text-gray-500 font-medium font-inter mt-1">Pay Period: {payroll?.pay_period}</p>
                <p className="text-[10px] text-gray-400 font-mono mt-0.5">Payslip No: {payroll?.payslip_no}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-3 w-full bg-[#F8F9FD] rounded-2xl p-6 border border-[#E9E4F5]">
              <div className="text-xs text-gray-600 font-inter"><span className="font-semibold text-gray-800">Employee Name:</span> {employee?.full_name}</div>
              <div className="text-xs text-gray-600 font-inter"><span className="font-semibold text-gray-800">Employee ID:</span> {employee?.employee_id || "N/A"}</div>
              <div className="text-xs text-gray-600 font-inter"><span className="font-semibold text-gray-800">Designation:</span> {employee?.designation}</div>
              <div className="text-xs text-gray-600 font-inter"><span className="font-semibold text-gray-800">Department:</span> {employee?.department}</div>
              <div className="text-xs text-gray-600 font-inter"><span className="font-semibold text-gray-800">Bank Name:</span> {empInfo?.bank_name || "State Bank of India"}</div>
              <div className="text-xs text-gray-600 font-inter"><span className="font-semibold text-gray-800">Account No:</span> {empInfo?.bank_account_no ? `XXXX XXXX ${empInfo.bank_account_no.slice(-4)}` : "XXXX XXXX 4589"}</div>
            </div>

            <div className="w-full">
              <div className="flex border-b-2 border-gray-100 pb-2 mb-3">
                <div className="w-1/2 text-xs font-bold text-gray-700 font-inter">Earnings</div>
                <div className="w-1/2 text-xs font-bold text-gray-700 font-inter pl-8">Deductions</div>
              </div>
              <div className="flex w-full">
                <div className="w-1/2 pr-6 border-r border-gray-100">
                  <div className="flex justify-between py-1.5 text-xs text-gray-600 font-inter"><span>Basic Salary</span><span className="font-semibold text-gray-800">₹{details ? Number(details.basic_salary).toLocaleString("en-IN") : "0"}</span></div>
                  <div className="flex justify-between py-1.5 text-xs text-gray-600 font-inter"><span>HRA</span><span className="font-semibold text-gray-800">₹{details ? Number(details.hra).toLocaleString("en-IN") : "0"}</span></div>
                  <div className="flex justify-between py-1.5 text-xs text-gray-600 font-inter"><span>Transport Allowance</span><span className="font-semibold text-gray-800">₹{details ? Number(details.transport_allowance || 0).toLocaleString("en-IN") : "0"}</span></div>
                  <div className="flex justify-between py-1.5 text-xs text-gray-600 font-inter"><span>Special Allowance</span><span className="font-semibold text-gray-800">₹{details ? Number(details.special_allowance || 0).toLocaleString("en-IN") : "0"}</span></div>
                  <div className="flex justify-between py-1.5 text-xs text-gray-600 font-inter"><span>Performance Bonus</span><span className="font-semibold text-gray-800">₹{details ? Number(details.performance_bonus || 0).toLocaleString("en-IN") : "0"}</span></div>
                  <div className="flex justify-between py-1.5 text-xs text-gray-600 font-inter"><span>Other Allowances</span><span className="font-semibold text-gray-800">₹{details ? Number(details.other_allowances || 0).toLocaleString("en-IN") : "0"}</span></div>
                </div>
                <div className="w-1/2 pl-8">
                  <div className="flex justify-between py-1.5 text-xs text-gray-600 font-inter"><span>Income Tax (TDS)</span><span className="font-semibold text-gray-800">₹{details ? Number(details.tds || 0).toLocaleString("en-IN") : "0"}</span></div>
                  <div className="flex justify-between py-1.5 text-xs text-gray-600 font-inter"><span>Provident Fund (PF)</span><span className="font-semibold text-gray-800">₹{details ? Number(details.pf || 0).toLocaleString("en-IN") : "0"}</span></div>
                  <div className="flex justify-between py-1.5 text-xs text-gray-600 font-inter"><span>Professional Tax</span><span className="font-semibold text-gray-800">₹{details ? Number(details.professional_tax || 0).toLocaleString("en-IN") : "0"}</span></div>
                  <div className="flex justify-between py-1.5 text-xs text-gray-600 font-inter"><span>Health Insurance</span><span className="font-semibold text-gray-800">₹{details ? Number(details.health_insurance || 0).toLocaleString("en-IN") : "0"}</span></div>
                  <div className="flex justify-between py-1.5 text-xs text-gray-600 font-inter"><span>Loan EMI</span><span className="font-semibold text-gray-800">₹{details ? Number(details.loan_emi || 0).toLocaleString("en-IN") : "0"}</span></div>
                </div>
              </div>
              <div className="flex border-t border-b border-gray-100 bg-[#FAF9FD] py-2 mt-4">
                <div className="w-1/2 flex justify-between pr-6 border-r border-gray-100 text-xs font-bold text-gray-700 font-inter">
                  <span>Gross Earnings</span>
                  <span>₹{grossVal.toLocaleString("en-IN")}</span>
                </div>
                <div className="w-1/2 flex justify-between pl-8 text-xs font-bold text-gray-700 font-inter">
                  <span>Total Deductions</span>
                  <span>₹{deductionVal.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col items-center bg-[#4A00C1] text-white p-6 rounded-2xl gap-1">
              <span className="text-xs opacity-75 font-inter">NET SALARY CREDITED</span>
              <strong className="text-3xl font-extrabold font-inter">₹{payroll ? Number(payroll.net_pay).toLocaleString("en-IN") : "0"}</strong>
            </div>

            <div className="w-full text-center text-[10px] text-gray-400 font-inter border-t border-gray-100 pt-4 leading-relaxed">
              This payslip is a system-generated document and does not require a physical signature.<br />
              &bull; ZeAI Soft Confidential &bull;
            </div>
          </div>

          {/* Right Action/Info Sidebar */}
          <div className="flex flex-col items-start gap-6 w-[360px]">
            <div className="flex p-6 flex-col items-start gap-4 rounded-[32px] border border-[#E9E4F5] bg-[#FFF] shadow-[0_4px_30px_rgba(0,0,0,0.02)] w-full">
              <h3 className="text-[#191C1E] font-inter text-lg font-bold">Payslip Information</h3>
              <div className="flex flex-col gap-3 w-full">
                <div className="flex justify-between border-b border-gray-50 pb-2.5">
                  <span className="text-xs text-gray-400 font-inter">Status</span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${payroll?.status === "CREDITED" ? "bg-green-50 text-green-600" : "bg-orange-50 text-orange-600"}`}>
                    {payroll?.status === "CREDITED" ? "Paid" : "Pending"}
                  </span>
                </div>
                <div className="flex justify-between border-b border-gray-50 pb-2.5">
                  <span className="text-xs text-gray-400 font-inter">Net Salary</span>
                  <span className="text-xs text-gray-800 font-bold font-inter">₹{payroll ? Number(payroll.net_pay).toLocaleString("en-IN") : "0"}</span>
                </div>
                <div className="flex justify-between border-b border-gray-50 pb-2.5">
                  <span className="text-xs text-gray-400 font-inter">Payment Period</span>
                  <span className="text-xs text-gray-600 font-medium font-inter">{payroll?.pay_period}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-gray-400 font-inter">Credit Date</span>
                  <span className="text-xs text-gray-600 font-medium font-inter">
                    {payroll?.payment_date 
                      ? new Date(payroll.payment_date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
                      : "Pending"}
                  </span>
                </div>
              </div>

              <button className="flex py-3 px-6 justify-center items-center gap-2 rounded-xl bg-[#4200BB] text-white hover:bg-[#340096] transition-all w-full mt-4 font-semibold text-sm font-inter" onClick={handlePrint}>
                <span className="material-icons text-lg">print</span>
                Print Payslip
              </button>
            </div>

            <div className="flex p-6 flex-col items-start gap-4 rounded-[32px] border border-[#E9E4F5] bg-[#FFF] shadow-[0_4px_30px_rgba(0,0,0,0.02)] w-full">
              <h3 className="text-[#191C1E] font-inter text-lg font-bold">Need Help?</h3>
              <p className="text-xs text-gray-500 leading-relaxed font-inter">
                If you find any discrepancy in your salary structure, earnings, or deductions, please contact HR Support or raise a support ticket.
              </p>
              <button className="flex py-3 px-6 justify-center items-center gap-2 rounded-xl border border-[#CAC3D9] text-[#4200BB] hover:bg-[#FAF9FD] transition-all w-full font-semibold text-sm font-inter" onClick={() => navigate("/employee/support")}>
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Top Header Navbar */}
      <div className="w-[1143px] h-20 absolute left-[297px] top-0">
        <div className="bg-[rgba(0,0,0,0.10)] w-[1143px] h-20 absolute left-0 top-0"></div>
        <div className="flex pt-3 pr-[265px] pb-3 pl-[13px] items-center gap-[11px] rounded-xl bg-[#FFF] w-[453px] h-12 absolute left-[39px] top-4 overflow-hidden">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0 w-6 h-6 overflow-hidden relative "
          >
            <path
              d="M19.6 21L13.3 14.7C12.8 15.1 12.225 15.4167 11.575 15.65C10.925 15.8833 10.2333 16 9.5 16C7.68333 16 6.146 15.3707 4.888 14.112C3.63 12.8533 3.00067 11.316 3 9.5C2.99933 7.684 3.62867 6.14667 4.888 4.888C6.14733 3.62933 7.68467 3 9.5 3C11.3153 3 12.853 3.62933 14.113 4.888C15.373 6.14667 16.002 7.684 16 9.5C16 10.2333 15.8833 10.925 15.65 11.575C15.4167 12.225 15.1 12.8 14.7 13.3L21 19.6L19.6 21ZM9.5 14C10.75 14 11.8127 13.5627 12.688 12.688C13.5633 11.8133 14.0007 10.7507 14 9.5C13.9993 8.24933 13.562 7.187 12.688 6.313C11.814 5.439 10.7513 5.00133 9.5 5C8.24867 4.99867 7.18633 5.43633 6.313 6.313C5.43967 7.18967 5.002 8.252 5 9.5C4.998 10.748 5.43567 11.8107 6.313 12.688C7.19033 13.5653 8.25267 14.0027 9.5 14Z"
              fill="#9593AC"
            />
          </svg>
          <p className="flex flex-col justify-center shrink-0 text-[#9593AC] font-hankenGrotesk text-[13px] font-bold leading-6 w-[140px] h-[15px]">
            Search here......
          </p>
        </div>
        <div className="w-[149px] h-10 absolute left-[758px] top-5">
          <button className="cursor-pointer text-nowrap flex justify-center items-center rounded-full w-[51px] h-10 absolute left-0 top-0 overflow-hidden" onClick={() => navigate("/employee/notifications")}>
            <p className="shrink-0 text-[#494456] material-icons text-2xl w-6 text-center">
              notifications
            </p>
            <div className="flex justify-center items-center absolute right-1.5 bottom-0 rounded-full border-[1.6px] border-[#FFF] bg-[#4A00C1] w-4 h-4 overflow-hidden">
              <p className="shrink-0 text-[#FFF] font-manrope text-[10px] w-1.5 text-center">
                8
              </p>
            </div>
          </button>
          <button className="cursor-pointer text-nowrap flex justify-center items-center rounded-full w-[50px] h-10 absolute left-[57px] top-0 overflow-hidden" onClick={() => navigate("/employee/inbox")}>
            <p className="shrink-0 text-[#494456] material-icons text-2xl w-6 text-center">
              mail
            </p>
            <div className="flex justify-center items-center absolute right-1.5 bottom-0 rounded-full border-[1.6px] border-[#FFF] bg-[#4A00C1] w-4 h-4 overflow-hidden">
              <p className="shrink-0 text-[#FFF] font-manrope text-[10px] w-1.5 text-center">
                5
              </p>
            </div>
          </button>
          <button className="cursor-pointer text-nowrap flex justify-center items-center w-[30px] h-6 absolute left-[119px] top-2" onClick={() => navigate("/employee/calendar")}>
            <p className="shrink-0 text-[#494456] material-icons text-2xl w-[30px] h-6 text-center">
              calendar_month
            </p>
          </button>
        </div>
        <div className="flex items-center gap-3 w-[205px] h-10 absolute left-[930px] top-5 overflow-hidden cursor-pointer" onClick={() => navigate("/employee/profile")}>
          <button className="cursor-pointer text-nowrap flex justify-center items-center shrink-0 rounded-full bg-[#4A00C1] w-10 h-10 overflow-hidden">
            <p className="shrink-0 text-[#FFF] font-manrope text-sm font-bold w-[19px] text-center">
              {employee?.full_name ? employee.full_name[0].toUpperCase() : "E"}
            </p>
          </button>
          <div className="flex flex-col items-start shrink-0 w-[117px] h-[30px] overflow-hidden">
            <p className="text-[#191C1D] font-manrope text-xs font-semibold w-[117px] h-full">
              {employee?.full_name || "Employee"}
            </p>
            <p className="text-[#494456] font-manrope text-[11px] font-medium w-[117px] h-full">
              {employee?.email || "Employee@zeai.com"}
            </p>
          </div>
          <p className="shrink-0 text-[#494456] material-icons text-2xl w-6">
            expand_more
          </p>
        </div>
      </div>
    </div>
  );
}
