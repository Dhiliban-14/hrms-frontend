import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { employeeAPI } from "../../services/api";
import logo from "../../assets/logos/logo.png";
export default function VerificationLetter() {
  const navigate = useNavigate();
  const location = useLocation();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get letter from location state or fallback to a default mock letter
  const letter = location.state?.letter || {
    request_id: "EVL-2024-0018",
    purpose: "Visa Application",
    recipient: "US Embassy",
    requested_on: "Oct 24, 2024",
    status: "GENERATED"
  };

  useEffect(() => {
    // Inject Tailwind CSS Play CDN script
    const script = document.createElement("script");
    script.src = "https://cdn.tailwindcss.com";
    script.id = "tailwind-cdn-script-evl";
    document.head.appendChild(script);

    // Inject fonts
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=Hanken+Grotesk:wght@400;500;700&family=Manrope:wght@400;500;700&family=Material+Icons&display=swap";
    link.rel = "stylesheet";
    link.id = "empevl-fonts";
    document.head.appendChild(link);

    // Fetch employee info
    employeeAPI.getProfile()
      .then(res => {
        setEmployee(res);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load profile:", err);
        setLoading(false);
      });

    return () => {
      // Clean up script
      const el = document.getElementById("tailwind-cdn-script-evl");
      if (el) el.remove();

      // Clean up fonts
      const f = document.getElementById("empevl-fonts");
      if (f) f.remove();

      // Clean up dynamically generated style tags from Tailwind CDN
      const styles = document.querySelectorAll("style");
      styles.forEach(s => {
        if (s.textContent.includes("--tw-") || s.id?.includes("tailwind")) {
          s.remove();
        }
      });
    };
  }, []);

  return (
    <div className="bg-[#FEFEFE] min-w-screen min-h-screen flex relative">
      <div className="flex flex-col items-start bg-[#CBC3D9] w-px h-8 absolute left-[1229px] top-6 overflow-hidden"></div>
      <div className="w-[297px] shrink-0 min-h-screen sticky top-0">
        <div className="bg-[#000] w-[297px] h-full absolute left-0 top-0"></div>
        <img
          src={logo}
          className="w-[230px] h-[93px] absolute left-[30px] top-[29px] max-w-none"
          alt="ZeAI Logo"
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
              <g clipPath="url(#clip0_2141_1452)">
                <path
                  d="M14.1667 16.6668H18.3334V15.0002C18.3333 13.9352 17.6586 12.9872 16.6524 12.6383C15.6462 12.2894 14.5294 12.6163 13.8701 13.4527M14.1667 16.6668H5.83341M14.1667 16.6668V15.0002C14.1667 14.4535 14.0617 13.931 13.8701 13.4527M5.83341 16.6668H1.66675V15.0002C1.66683 13.9352 2.34157 12.9872 3.34779 12.6383C4.35401 12.2894 5.47078 12.6163 6.13008 13.4527M5.83341 16.6668V15.0002C5.83341 14.4535 5.93841 13.931 6.13008 13.4527M6.13008 13.4527C6.76323 11.8704 8.29583 10.8329 10.0001 10.8329C11.7043 10.8329 13.2369 11.8704 13.8701 13.4527M12.5001 5.8335C12.5001 7.21328 11.3799 8.3335 10.0001 8.3335C8.62029 8.3335 7.50008 7.21328 7.50008 5.8335C7.50008 4.45371 8.62029 3.3335 10.0001 3.3335C11.3799 3.3335 12.5001 4.45371 12.5001 5.8335L14.1667 16.6668M19.1667 19.1668C19.1667 20.0867 18.4199 20.8335 17.5001 20.8335C16.5802 20.8335 15.8334 20.0867 15.8334 19.1668C15.8334 18.247 16.5802 17.5002 17.5001 17.5002C18.4199 17.5002 19.1667 18.247 19.1667 19.1668V19.1668M5.83341 8.3335C5.83341 9.25335 5.08661 10.0002 4.16675 10.0002C3.24689 10.0002 2.50008 9.25335 2.50008 8.3335C2.50008 7.41364 3.24689 6.66683 4.16675 6.66683C5.08661 6.66683 5.83341 7.41364 5.83341 8.3335V8.3335"
                  stroke="white"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_2141_1452">
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
          <div className="flex py-3 px-4 items-center gap-3 rounded-lg w-full cursor-pointer hover:bg-[rgba(255,255,255,0.05)]" onClick={() => navigate("/employee/dashboard")}>
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
          <div className="flex py-3 px-4 items-center gap-3 rounded-lg w-full cursor-pointer hover:bg-[rgba(255,255,255,0.05)]" onClick={() => navigate("/employee/dashboard")}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 overflow-hidden relative "
            >
              <path
                d="M6.66667 5.83333V2.5M13.3333 5.83333V2.5M5.83333 9.16667H14.1667M4.16667 17.5H15.8333C16.7538 17.5 17.5 16.7538 17.5 15.8333V5.83333C17.5 4.91286 16.7538 4.16667 15.8333 4.16667H4.16667C3.24619 4.16667 2.5 4.91286 2.5 5.83333V15.8333C2.5 16.7538 3.24619 17.5 4.16667 17.5L6.66667 5.83333"
                stroke="#9CA3AF"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-[#9CA3AF] font-inter text-sm font-medium leading-5 w-fit">
              Attendance
            </p>
          </div>
          <div className="flex py-3 px-4 items-center gap-3 rounded-lg w-full cursor-pointer hover:bg-[rgba(255,255,255,0.05)]" onClick={() => navigate("/employee/dashboard")}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 overflow-hidden relative "
            >
              <path
                d="M7.50008 10H12.5001M7.50008 13.3333H12.5001M14.1667 17.5H5.83341C4.91294 17.5 4.16675 16.7538 4.16675 15.8333V4.16667C4.16675 3.24619 4.91294 2.5 5.83341 2.5H10.4884C10.7094 2.50005 10.9213 2.58788 11.0776 2.74417L15.5892 7.25583C15.7455 7.41208 15.8334 7.624 15.8334 7.845V15.8333C15.8334 16.7538 15.0872 17.5 14.1667 17.5L7.50008 10"
                stroke="#9CA3AF"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="flex flex-col items-start w-fit">
              <div className="flex flex-col items-start w-fit">
                <p className="text-[#9CA3AF] font-inter text-sm font-medium leading-5 w-fit">
                  Apply Leave
                </p>
              </div>
            </div>
          </div>
          <div className="flex py-3 px-4 items-center gap-3 rounded-lg w-full cursor-pointer hover:bg-[rgba(255,255,255,0.05)]" onClick={() => navigate("/employee/dashboard")}>
            <svg
              width="22"
              height="16"
              viewBox="0 0 22 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex flex-col items-start w-fit "
            >
              <path
                d="M13 9C12.1667 9 11.4583 8.70833 10.875 8.125C10.2917 7.54167 10 6.83333 10 6C10 5.16667 10.2917 4.45833 10.875 3.875C11.4583 3.29167 12.1667 3 13 3C13.8333 3 14.5417 3.29167 15.125 3.875C15.7083 4.45833 16 5.16667 16 6C16 6.83333 15.7083 7.54167 15.125 8.125C14.5417 8.70833 13.8333 9 13 9ZM6 12C5.45 12 4.97917 11.8042 4.5875 11.4125C4.19583 11.0208 4 10.55 4 10V2C4 1.45 4.19583 0.979167 4.5875 0.5875C4.97917 0.195833 5.45 0 6 0H20C20.55 0 21.0208 0.195833 21.4125 0.5875C21.8042 0.979167 22 1.45 22 2V10C22 10.55 21.8042 11.0208 21.4125 11.4125C21.0208 11.8042 20.55 12 20 12H6ZM8 10H18C18 9.45 18.1958 8.97917 18.5875 8.5875C18.9792 8.19583 19.45 8 20 8V4C19.45 4 18.9792 3.80417 18.5875 3.4125C18.1958 3.02083 18 2.55 18 2H8C8 2.55 7.80417 3.02083 7.4125 3.4125C7.02083 3.80417 6.55 4 6 4V8C6.55 8 7.02083 8.19583 7.4125 8.5875C7.80417 8.97917 8 9.45 8 10ZM19 16H2C1.45 16 0.979167 15.8042 0.5875 15.4125C0.195833 15.0208 0 14.55 0 14V3H2V14H19V16ZM6 10V2V10Z"
                fill="#9CA3AF"
              />
            </svg>
            <p className="text-[#9CA3AF] font-plusJakartaSans text-sm leading-5 w-fit">
              Payroll Status
            </p>
          </div>
          <div className="flex py-3 px-4 items-center gap-3 rounded-lg w-full cursor-pointer hover:bg-[rgba(255,255,255,0.05)]" onClick={() => navigate("/employee/dashboard")}>
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
                Employee Support
              </p>
            </div>
          </div>
          <div className="flex py-3 px-4 items-center gap-3 rounded-lg w-full cursor-pointer hover:bg-[rgba(255,255,255,0.05)]" onClick={() => navigate("/employee/dashboard")}>
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
      <div className="flex-1 flex flex-col items-start rounded-[40px] border-t border-t-[#FEFEFE] border-l border-l-[#FEFEFE] bg-[rgba(249,250,251,0.50)] pt-8 pr-6 pb-8 pl-6 min-h-screen">
        <div className="flex py-6 px-0 justify-between items-center w-full">
          <div className="flex flex-col items-start gap-1 w-fit">
            <div className="flex items-center gap-2 w-full">
              <div className="flex flex-col items-start w-fit">
                <p className="text-[#9CA3AF] font-inter text-xs leading-4 w-fit">
                  Dashboard
                </p>
              </div>
              <div className="flex flex-col items-start w-fit">
                <p className="text-[#9CA3AF] font-inter text-xs leading-4 w-fit">
                  &gt;
                </p>
              </div>
              <div className="flex flex-col items-start w-fit">
                <p className="text-[#9CA3AF] font-inter text-xs leading-4 w-fit">
                  Employment Verification Letter
                </p>
              </div>
              <div className="flex flex-col items-start w-fit">
                <p className="text-[#9CA3AF] font-inter text-xs leading-4 w-fit">
                  &gt;
                </p>
              </div>
              <div className="flex flex-col items-start w-fit">
                <p className="text-[#4B5563] font-inter text-xs font-medium leading-4 w-fit">
                  Download Letter
                </p>
              </div>
            </div>
            <div className="flex pt-1 items-center gap-3 w-full">
              <div className="flex flex-col items-start w-fit">
                <p className="text-[#1F2937] font-inter text-2xl font-bold leading-8 w-fit">
                  Employment Verification Letter
                </p>
              </div>
              <div className="flex py-0.5 px-2 flex-col items-start rounded bg-[#DCFCE7] w-fit">
                <p className="text-[#16A34A] font-inter text-[10px] font-bold leading-[15px] w-fit">
                  GENERATED
                </p>
              </div>
            </div>
            <div className="flex flex-col items-start w-full">
              <p className="text-[#6B7280] font-inter text-xs leading-4 w-fit">
                Your letter has been generated successfully. You can preview,
                download, or share the letter.
              </p>
            </div>
          </div>
          <div className="flex py-2 px-4 items-center gap-2 rounded-lg border border-[#9333EA] w-fit cursor-pointer hover:bg-[rgba(147,51,234,0.05)]" onClick={() => navigate("/employee/documents")}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 overflow-hidden relative "
            >
              <path
                d="M6.66667 12.6668L2 8.00016M2 8.00016L6.66667 3.3335M2 8.00016H14"
                stroke="#9333EA"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-[#9333EA] font-inter text-xs font-semibold leading-4 w-fit">
              Back to Requests
            </p>
          </div>
        </div>
        <div className="flex w-full gap-6 items-start">
          <div className="flex p-6 flex-col items-start gap-6 rounded-2xl border border-[#E5E7EB] bg-[#FFF] w-[640px] shrink-0">
            <div className="flex pr-0 justify-between items-center w-full">
              <div className="flex flex-col items-start w-fit">
                <p className="text-[#581C87] font-inter text-base font-bold leading-6 w-fit">
                  Letter Preview
                </p>
              </div>
              <div className="flex py-1.5 px-3 items-center gap-1.5 rounded-lg border border-[#F3E8FF] w-fit">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3.5 h-3.5 overflow-hidden relative "
                >
                  <path
                    d="M2.33325 4.66683V2.3335M2.33325 2.3335H4.66659M2.33325 2.3335L5.24992 5.25016M11.6666 4.66683V2.3335M11.6666 2.3335H9.33325M11.6666 2.3335L8.74992 5.25016M2.33325 9.3335V11.6668M2.33325 11.6668H4.66659M2.33325 11.6668L5.24992 8.75016M11.6666 11.6668L8.74992 8.75016M11.6666 11.6668V9.3335M11.6666 11.6668H9.33325"
                    stroke="#9333EA"
                    strokeWidth="1.16667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="text-[#9333EA] font-inter text-xs font-semibold leading-4 w-fit">
                  Preview Full Screen
                </p>
              </div>
            </div>
            <div className="flex p-4 flex-col items-start rounded-xl border border-dashed border-[#D1D5DB] bg-[#F9FAFB] w-full">
              <div className="flex max-w-[576px] p-8 flex-col items-start gap-6 bg-[#FFF] shadow-[04px20px0rgba(0,0,0,0.05)] w-full">
                <div className="flex pb-4 justify-between items-start w-full">
                  <div className="flex flex-col items-start gap-2 w-fit">
                    <div className="flex items-center w-full">
                      <div className="flex flex-col items-start w-fit">
                        <p className="text-[#6D28D9] font-inter text-2xl font-extrabold leading-8 w-fit tracking-[-0.05em]">
                          ZeAI Soft
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-start w-full">
                      <p className="text-[#6B7280] font-inter text-[10px] font-medium leading-[15px] w-fit tracking-[0.1em]">
                        EMPOWERING YOU
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-start w-fit">
                    <div className="flex flex-col items-end w-full">
                      <p className="text-[#1E293B] font-inter text-sm font-bold leading-5 w-fit">
                        ZeAI Soft Pvt. Ltd.
                      </p>
                    </div>
                    <div className="flex flex-col items-end w-full">
                      <p className="text-[#6B7280] font-inter text-[10px] leading-[15px] w-fit">
                        123 Innovation Drive, Suite 400
                      </p>
                    </div>
                    <div className="flex flex-col items-end w-full">
                      <p className="text-[#6B7280] font-inter text-[10px] leading-[15px] w-fit">
                        San Francisco, CA 94107, USA
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-[#9333EA] w-full h-px"></div>
                <div className="flex flex-col items-center w-full">
                  <p className="text-[#1E293B] font-inter text-lg font-bold leading-7 w-fit">
                    TO WHOM IT MAY CONCERN
                  </p>
                </div>
                <div className="flex pt-2 justify-end items-start w-full">
                  <div className="flex flex-col items-start w-fit h-full">
                    <p className="text-[#1E293B] font-inter text-sm font-medium leading-5 w-fit">
                      Date: {letter.requested_on || "Oct 24, 2024"}
                    </p>
                  </div>
                </div>
                <div className="flex pt-2 flex-col items-start gap-3 w-full">
                  <div className="flex flex-col items-start w-full">
                    <p className="text-[#374151] font-inter text-xs leading-[19.5px] w-full">
                      This is to certify that {employee?.name || "Mr. Alex Rivera"} (Emp ID: {employee?.employee_id || "EMP-2048"}) is employed with ZeAI Soft Pvt. Ltd. as a {employee?.designation || "Software Engineer"} in the {employee?.department || "Engineering"} Department since {employee?.joining_date || "Jan 10, 2022"}.
                    </p>
                  </div>
                  <div className="flex flex-col items-start w-full">
                    <p className="text-[#374151] font-inter text-xs leading-[19.5px] w-full">
                      He is currently working with us on a Full-Time basis and
                      his employment status is Active.
                    </p>
                  </div>
                  <div className="flex flex-col items-start w-full">
                    <p className="text-[#374151] font-inter text-xs leading-[19.5px] w-full">
                      This letter is issued upon his request for Visa
                      Application purpose.
                    </p>
                  </div>
                  <div className="flex flex-col items-start w-full">
                    <p className="text-[#374151] font-inter text-xs leading-[19.5px] w-full">
                      We wish him all the best for his future endeavors.
                    </p>
                  </div>
                </div>
                <div className="flex py-6 px-0 justify-between items-end w-full">
                  <div className="flex flex-col items-start w-fit">
                    <div className="flex flex-col items-start w-full">
                      <p className="text-[#1E293B] font-inter text-sm leading-5 w-fit">
                        Sincerely,
                      </p>
                    </div>
                    <div className="flex pt-4 items-end w-full h-12">
                      <div className="flex flex-col items-start w-fit">
                        <p className="text-[#1F2937] font-liberationSerif text-lg font-medium leading-7 w-fit tracking-[-0.025em]">
                          John Smith
                        </p>
                      </div>
                    </div>
                    <div className="flex pt-2 flex-col items-start w-full">
                      <p className="text-[#1E293B] font-inter text-sm font-bold leading-5 w-fit">
                        John Smith
                      </p>
                    </div>
                    <div className="flex flex-col items-start w-full">
                      <p className="text-[#6B7280] font-inter text-xs leading-4 w-fit">
                        HR Manager
                      </p>
                    </div>
                    <div className="flex flex-col items-start w-full">
                      <p className="text-[#6B7280] font-inter text-xs leading-4 w-fit">
                        ZeAI Soft Pvt. Ltd.
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-center items-center rounded-full border-2 border-[#E9D5FF] w-20 h-20 relative">
                    <div className="flex flex-col items-center gap-1 w-fit">
                      <div className="flex flex-col items-center w-full">
                        <p className="text-[rgba(147,51,234,0.60)] font-inter text-[8px] font-bold leading-[8px] w-fit">
                          ZEAI SOFT
                        </p>
                      </div>
                      <div className="flex flex-col items-center w-full">
                        <p className="text-[rgba(147,51,234,0.60)] font-inter text-[6px] font-bold leading-[6px] w-fit">
                          HR DEPT
                        </p>
                      </div>
                      <div className="bg-[rgba(147,51,234,0.30)] w-8 h-px"></div>
                      <div className="flex flex-col items-center w-full">
                        <p className="text-[rgba(147,51,234,0.60)] font-inter text-[5px] leading-[5px] w-fit">
                          OFFICIAL SEAL
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-center items-center absolute left-0.5 top-0.5 opacity-20 w-[76px] h-[76px]">
                      <svg
                        width="76"
                        height="80"
                        viewBox="0 0 76 80"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="shrink-0 w-[76px] h-20 overflow-hidden relative "
                      >
                        <path
                          d="M3.80005 39.9998C3.80005 58.8753 19.1246 74.1998 38 74.1998C56.8755 74.1998 72.2001 58.8753 72.2001 39.9998C72.2001 21.1243 56.8755 5.7998 38 5.7998C19.1246 5.7998 3.80005 21.1243 3.80005 39.9998V39.9998"
                          stroke="#1E293B"
                          strokeWidth="1.52"
                          strokeDasharray="1.52 1.52"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="flex p-4 items-start gap-3 rounded-lg border border-[rgba(219,234,254,0.50)] bg-[rgba(239,246,255,0.50)] w-full">
                  <div className="flex pt-0.5 flex-col items-start w-4 h-[18px]">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="shrink-0 w-4 h-4 overflow-hidden relative "
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M14.4001 8.0001C14.4001 11.5324 11.5324 14.4001 8.0001 14.4001C4.46784 14.4001 1.6001 11.5324 1.6001 8.0001C1.6001 4.46784 4.46784 1.6001 8.0001 1.6001C11.5324 1.6001 14.4001 4.46784 14.4001 8.0001ZM8.8001 4.8001C8.8001 5.24163 8.44163 5.6001 8.0001 5.6001C7.55857 5.6001 7.2001 5.24163 7.2001 4.8001C7.2001 4.35857 7.55857 4.0001 8.0001 4.0001C8.44163 4.0001 8.8001 4.35857 8.8001 4.8001ZM7.2001 7.2001C6.75857 7.2001 6.4001 7.55857 6.4001 8.0001C6.4001 8.44163 6.75857 8.8001 7.2001 8.8001V11.2001C7.2001 11.6416 7.55857 12.0001 8.0001 12.0001H8.8001C9.24163 12.0001 9.6001 11.6416 9.6001 11.2001C9.6001 10.7586 9.24163 10.4001 8.8001 10.4001V8.0001C8.8001 7.55857 8.44163 7.2001 8.0001 7.2001H7.2001Z"
                        fill="#2563EB"
                      />
                    </svg>
                  </div>
                  <p className="text-[#1E40AF] font-inter text-[10px] leading-[15px] w-fit">
                    This is a system generated letter. No signature is required.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start gap-6 w-[320px] shrink-0">
            <div className="flex p-6 flex-col items-start gap-4 rounded-2xl border border-[#E5E7EB] bg-[#FFF] w-full">
              <div className="flex flex-col items-start w-full">
                <p className="text-[#1E293B] font-inter text-base font-bold leading-6 w-full">
                  Download &amp; Share
                </p>
              </div>
              <div className="flex flex-col items-start gap-3 w-full">
                <div className="flex flex-col items-start gap-1 w-full">
                  <div className="flex flex-col items-start w-full">
                    <p className="text-[#374151] font-inter text-xs font-bold leading-4 w-full">
                      Download Letter
                    </p>
                  </div>
                  <div className="flex flex-col items-start w-full">
                    <p className="text-[#9CA3AF] font-inter text-[10px] leading-[16.25px] w-full">
                      Download your letter in the format you prefer.
                    </p>
                  </div>
                  <div className="flex pt-2 flex-col items-start gap-3 w-full">
                    <div className="flex pt-3 pr-3 pb-3 pl-3 justify-between items-center rounded-xl border border-[#F3F4F6] w-full cursor-pointer hover:bg-[rgba(0,0,0,0.02)]" onClick={() => window.print()}>
                      <div className="flex items-center gap-4 w-fit">
                        <div className="flex p-2.5 flex-col items-start rounded-lg bg-[#FEF2F2] w-fit">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 overflow-hidden relative "
                          >
                            <path
                              d="M7 21H17C18.1038 21 19 20.1038 19 19V9.414C18.9999 9.14881 18.8945 8.89449 18.707 8.707L13.293 3.293C13.1055 3.10545 12.8512 3.00006 12.586 3H7C5.89617 3 5 3.89617 5 5V19C5 20.1038 5.89617 21 7 21V21"
                              stroke="#EF4444"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div className="flex flex-col items-start w-fit">
                          <div className="flex flex-col items-start w-full">
                            <p className="text-[#1F2937] font-inter text-sm font-bold leading-5 w-fit">
                              Download as PDF
                            </p>
                          </div>
                          <div className="flex flex-col items-start w-full">
                            <p className="text-[#9CA3AF] font-inter text-[10px] leading-[16.25px] w-fit">
                              Best for printing and sharing
                            </p>
                          </div>
                        </div>
                      </div>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 overflow-hidden relative "
                      >
                        <path
                          d="M3.3335 13.3335V14.1668C3.3335 15.0873 4.07969 15.8335 5.00016 15.8335H15.0002C15.9206 15.8335 16.6668 15.0873 16.6668 14.1668V13.3335M13.3335 10.0002L10.0002 13.3335M10.0002 13.3335L6.66683 10.0002M10.0002 13.3335V3.3335"
                          stroke="#D1D5DB"
                          strokeWidth="1.66667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="flex pt-3 pr-3 pb-3 pl-3 justify-between items-center rounded-xl border border-[#F3F4F6] w-full cursor-pointer hover:bg-[rgba(0,0,0,0.02)]" onClick={() => window.print()}>
                      <div className="flex items-center gap-4 w-fit">
                        <div className="flex p-2.5 flex-col items-start rounded-lg bg-[#EFF6FF] w-fit">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 overflow-hidden relative "
                          >
                            <path
                              d="M15.232 5.2319L18.768 8.7679M16.732 3.7319C17.3636 3.10025 18.2843 2.85357 19.1471 3.08477C20.01 3.31596 20.6839 3.98992 20.9151 4.85277C21.1463 5.71561 20.8996 6.63625 20.268 7.2679L6.5 21.0359H3V17.4639L16.732 3.7319L15.232 5.2319"
                              stroke="#3B82F6"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                        <div className="flex flex-col items-start w-fit">
                          <div className="flex flex-col items-start w-full">
                            <p className="text-[#1F2937] font-inter text-sm font-bold leading-5 w-fit">
                              Download as Word
                            </p>
                          </div>
                          <div className="flex flex-col items-start w-full">
                            <p className="text-[#9CA3AF] font-inter text-[10px] leading-[16.25px] w-fit">
                              Document in editable format
                            </p>
                          </div>
                        </div>
                      </div>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 overflow-hidden relative "
                      >
                        <path
                          d="M3.3335 13.3335V14.1668C3.3335 15.0873 4.07969 15.8335 5.00016 15.8335H15.0002C15.9206 15.8335 16.6668 15.0873 16.6668 14.1668V13.3335M13.3335 10.0002L10.0002 13.3335M10.0002 13.3335L6.66683 10.0002M10.0002 13.3335V3.3335"
                          stroke="#D1D5DB"
                          strokeWidth="1.66667"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="flex pt-3 pr-3 pb-3 pl-3 justify-between items-center rounded-xl border border-[#F3F4F6] w-full cursor-pointer hover:bg-[rgba(0,0,0,0.02)]" onClick={() => window.print()}>
                      <div className="flex items-center gap-4 w-fit">
                        <div className="flex p-2.5 flex-col items-start rounded-lg bg-[#F0FDF4] w-fit">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 overflow-hidden relative "
                          >
                            <g clipPath="url(#clip0_1032_4784)">
                              <path
                                d="M17 17H19C20.1038 17 21 16.1038 21 15V11C21 9.89617 20.1038 9 19 9H5C3.89617 9 3 9.89617 3 11V15C3 16.1038 3.89617 17 5 17H7M9 21H15C16.1038 21 17 20.1038 17 19V15C17 13.8962 16.1038 13 15 13H9C7.89617 13 7 13.8962 7 15V19C7 20.1038 7.89617 21 9 21L17 17M25 5V5C25 3.89617 24.1038 3 23 3H9C7.89617 3 7 3.89617 7 5V9H17L25 5"
                                stroke="#22C55E"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_1032_4784">
                                <rect width="24" height="24" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </div>
                        <div className="flex flex-col items-start w-fit">
                          <div className="flex flex-col items-start w-full">
                            <p className="text-[#1F2937] font-inter text-sm font-bold leading-5 w-fit">
                              Print Letter
                            </p>
                          </div>
                          <div className="flex flex-col items-start w-full">
                            <p className="text-[#9CA3AF] font-inter text-[10px] leading-[16.25px] w-fit">
                              Print directly from your browser
                            </p>
                          </div>
                        </div>
                      </div>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 overflow-hidden relative "
                      >
                        <g clipPath="url(#clip0_1032_4791)">
                          <path
                            d="M14.1667 14.1667H15.8333C16.7538 14.1667 17.5 13.4205 17.5 12.5V9.16667C17.5 8.24619 16.7538 7.5 15.8333 7.5H4.16667C3.24619 7.5 2.5 8.24619 2.5 9.16667V12.5C2.5 13.4205 3.24619 14.1667 4.16667 14.1667H5.83333M7.5 17.5H12.5C13.4205 17.5 14.1667 16.7538 14.1667 15.8333V12.5C14.1667 11.5795 13.4205 10.8333 12.5 10.8333H7.5C6.57953 10.8333 5.83333 11.5795 5.83333 12.5V15.8333C5.83333 16.7538 6.57953 17.5 7.5 17.5L14.1667 14.1667M20.8333 4.16667V4.16667C20.8333 3.24619 20.0871 2.5 19.1667 2.5H7.5C6.57953 2.5 5.83333 3.24619 5.83333 4.16667V7.5H14.1667L20.8333 4.16667"
                            stroke="#D1D5DB"
                            strokeWidth="1.66667"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1032_4791">
                            <rect width="20" height="20" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="border-t border-t-[#F3F4F6] w-full h-px overflow-hidden"></div>
                <div className="flex flex-col items-start gap-1 w-full">
                  <div className="flex flex-col items-start w-full">
                    <p className="text-[#374151] font-inter text-xs font-bold leading-4 w-full">
                      Share Letter
                    </p>
                  </div>
                  <div className="flex pb-3 flex-col items-start w-full">
                    <p className="text-[#9CA3AF] font-inter text-[10px] leading-[16.25px] w-full">
                      Share your letter securely via email.
                    </p>
                  </div>
                  <button className="cursor-pointer text-nowrap flex py-2.5 px-0 justify-center items-center gap-2 rounded-xl border border-[#9333EA] w-full">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 overflow-hidden relative "
                    >
                      <path
                        d="M2 5.3335L7.26 8.84016C7.70805 9.1391 8.29195 9.1391 8.74 8.84016L14 5.3335M3.33333 12.6668H12.6667C13.4026 12.6668 14 12.0694 14 11.3335V4.66683C14 3.93094 13.4026 3.3335 12.6667 3.3335H3.33333C2.59745 3.3335 2 3.93094 2 4.66683V11.3335C2 12.0694 2.59745 12.6668 3.33333 12.6668L2 5.3335"
                        stroke="#9333EA"
                        strokeWidth="1.33333"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className="text-[#9333EA] font-inter text-xs font-bold leading-4 w-fit">
                      Share via Email
                    </p>
                  </button>
                </div>
              </div>
            </div>
            <div className="flex p-6 flex-col items-start gap-6 rounded-2xl border border-[#E5E7EB] bg-[#FFF] w-full">
              <div className="flex flex-col items-start w-full">
                <p className="text-[#1E293B] font-inter text-base font-bold leading-6 w-full">
                  Letter Details
                </p>
              </div>
              <div className="flex flex-col items-start gap-3 w-full">
                <div className="flex justify-between items-center w-full">
                  <div className="flex flex-col items-start w-fit">
                    <p className="text-[#9CA3AF] font-inter text-xs font-medium leading-4 w-fit">
                      Request ID
                    </p>
                  </div>
                  <div className="flex flex-col items-start w-fit">
                    <p className="text-[#1F2937] font-inter text-xs font-bold leading-4 w-fit tracking-[-0.025em]">
                      {letter.request_id || "EVL-2024-0018"}
                    </p>
                  </div>
                </div>
                <div className="flex pr-0 justify-between items-center w-full">
                  <div className="flex flex-col items-start w-fit">
                    <p className="text-[#9CA3AF] font-inter text-xs font-medium leading-4 w-fit">
                      Purpose
                    </p>
                  </div>
                  <div className="flex flex-col items-start w-fit">
                    <p className="text-[#1F2937] font-inter text-xs font-bold leading-4 w-fit">
                      {letter.purpose || "Visa Application"}
                    </p>
                  </div>
                </div>
                <div className="flex pr-0 justify-between items-center w-full">
                  <div className="flex flex-col items-start w-fit">
                    <p className="text-[#9CA3AF] font-inter text-xs font-medium leading-4 w-fit">
                      Requested On
                    </p>
                  </div>
                  <div className="flex flex-col items-start w-fit">
                    <p className="text-[#1F2937] font-inter text-xs font-bold leading-4 w-fit">
                      {letter.requested_on || "Oct 24, 2024"}
                    </p>
                  </div>
                </div>
                <div className="flex pr-0 justify-between items-center w-full">
                  <div className="flex flex-col items-start w-fit">
                    <p className="text-[#9CA3AF] font-inter text-xs font-medium leading-4 w-fit">
                      Generated On
                    </p>
                  </div>
                  <div className="flex flex-col items-start w-fit">
                    <p className="text-[#1F2937] font-inter text-xs font-bold leading-4 w-fit">
                      {letter.requested_on || "Oct 24, 2024"}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center w-full">
                  <div className="flex flex-col items-start w-fit">
                    <p className="text-[#9CA3AF] font-inter text-xs font-medium leading-4 w-fit">
                      Generated By
                    </p>
                  </div>
                  <div className="flex flex-col items-start w-fit">
                    <p className="text-[#1F2937] font-inter text-xs font-bold leading-4 w-fit">
                      System
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex pt-12 flex-col items-center w-full">
          <p className="text-[#9CA3AF] font-inter text-[10px] leading-[15px] w-fit">
            © 2024 ZeAI Soft. All rights reserved.
          </p>
        </div>
      </div>
            {/* Top Header Navbar */}
      
    </div>
  );
}
