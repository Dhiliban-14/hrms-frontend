import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { employeeAPI } from "../../services/api";
import logo from "../../assets/logos/logo.png";

export default function EmpContract() {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    employeeAPI.getProfile()
      .then(res => {
        setEmployee(res);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load profile:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Inject Tailwind CSS Play CDN script
    const script = document.createElement("script");
    script.src = "https://cdn.tailwindcss.com";
    script.id = "tailwind-cdn-script-contract";
    document.head.appendChild(script);

    // Inject fonts
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=Hanken+Grotesk:wght@400;500;700&family=Manrope:wght@400;500;700&family=Material+Icons&display=swap";
    link.rel = "stylesheet";
    link.id = "empcontract-fonts";
    document.head.appendChild(link);

    return () => {
      // Clean up script
      const el = document.getElementById("tailwind-cdn-script-contract");
      if (el) el.remove();

      // Clean up fonts
      const f = document.getElementById("empcontract-fonts");
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
              <g clipPath="url(#clip0_2141_1731)">
                <path
                  d="M14.1665 16.6668H18.3332V15.0002C18.3331 13.9352 17.6583 12.9872 16.6521 12.6383C15.6459 12.2894 14.5291 12.6163 13.8698 13.4527M14.1665 16.6668H5.83317M14.1665 16.6668V15.0002C14.1665 14.4535 14.0615 13.931 13.8698 13.4527M5.83317 16.6668H1.6665V15.0002C1.66658 13.9352 2.34133 12.9872 3.34755 12.6383C4.35377 12.2894 5.47053 12.6163 6.12984 13.4527M5.83317 16.6668V15.0002C5.83317 14.4535 5.93817 13.931 6.12984 13.4527M6.12984 13.4527C6.76299 11.8704 8.29558 10.8329 9.99984 10.8329C11.7041 10.8329 13.2367 11.8704 13.8698 13.4527M12.4998 5.8335C12.4998 7.21328 11.3796 8.3335 9.99984 8.3335C8.62005 8.3335 7.49984 7.21328 7.49984 5.8335C7.49984 4.45371 8.62005 3.3335 9.99984 3.3335C11.3796 3.3335 12.4998 4.45371 12.4998 5.8335L14.1665 16.6668M19.1665 19.1668C19.1665 20.0867 18.4197 20.8335 17.4998 20.8335C16.58 20.8335 15.8332 20.0867 15.8332 19.1668C15.8332 18.247 16.58 17.5002 17.4998 17.5002C18.4197 17.5002 19.1665 18.247 19.1665 19.1668V19.1668M5.83317 8.3335C5.83317 9.25335 5.08636 10.0002 4.1665 10.0002C3.24665 10.0002 2.49984 9.25335 2.49984 8.3335C2.49984 7.41364 3.24665 6.66683 4.1665 6.66683C5.08636 6.66683 5.83317 7.41364 5.83317 8.3335V8.3335"
                  stroke="white"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_2141_1731">
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
                d="M7.49984 10H12.4998M7.49984 13.3333H12.4998M14.1665 17.5H5.83317C4.9127 17.5 4.1665 16.7538 4.1665 15.8333V4.16667C4.1665 3.24619 4.9127 2.5 5.83317 2.5H10.4882C10.7092 2.50005 10.9211 2.58788 11.0773 2.74417L15.589 7.25583C15.7453 7.41208 15.8331 7.624 15.8332 7.845V15.8333C15.8332 16.7538 15.087 17.5 14.1665 17.5L7.49984 10"
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
          <div className="flex py-3 px-4 items-center gap-3 rounded-lg w-full cursor-pointer hover:bg-[rgba(255,255,255,0.05)]" onClick={() => navigate("/employee/payroll")}>
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
          <div className="flex py-3 px-4 items-center gap-3 rounded-lg w-full cursor-pointer hover:bg-[rgba(255,255,255,0.05)]" onClick={() => navigate("/employee/support")}>
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
      <div className="flex-1 flex pt-8 pr-8 pb-8 pl-8 items-start gap-6 min-h-screen">
        <div className="flex flex-col items-start gap-6 w-[640px] shrink-0">
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-2 w-fit cursor-pointer" onClick={() => navigate("/employee/profile")}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex flex-col items-start w-fit "
              >
                <path
                  d="M3.825 9L9.425 14.6L8 16L0 8L8 0L9.425 1.4L3.825 7H16V9H3.825Z"
                  fill="#484456"
                />
              </svg>
              <div className="flex flex-col items-start w-fit">
                <p className="text-[#484456] font-inter text-xs font-semibold leading-4 w-fit">
                  Back to Employee Information
                </p>
              </div>
            </div>
            <div className="flex py-2.5 px-6 items-center gap-2 rounded-full bg-[#4200BB] w-fit cursor-pointer" onClick={() => window.print()}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex flex-col items-center w-fit "
              >
                <path
                  d="M8 12L3 7L4.4 5.55L7 8.15V0H9V8.15L11.6 5.55L13 7L8 12ZM2 16C1.45 16 0.979167 15.8042 0.5875 15.4125C0.195833 15.0208 0 14.55 0 14V11H2V14H14V11H16V14C16 14.55 15.8042 15.0208 15.4125 15.4125C15.0208 15.8042 14.55 16 14 16H2Z"
                  fill="white"
                />
              </svg>
              <p className="text-[#FFF] font-inter text-xs font-semibold leading-4 w-fit">
                Download Contract
              </p>
            </div>
          </div>
          <div className="flex min-h-[1000px] p-20 flex-col items-start gap-16 rounded-xl bg-[#FFF] shadow-[010px25px-5pxrgba(0,0,0,0.10),08px10px-6pxrgba(0,0,0,0.10)] w-full overflow-hidden relative">
            <div className="flex pt-[173px] pr-0 pb-[172px] pl-0 flex-col justify-center items-center absolute opacity-[2%] w-[596px] h-[1194px]">
              <div className="flex pt-0 pr-[54px] pb-0 pl-0 flex-col items-start -space-y-0 w-fit">
                <p className="text-[#191C1E] font-inter text-[200px] font-black leading-[300px] w-fit">
                  ZEAI
                </p>
                <p className="text-[#191C1E] font-inter text-[200px] font-black leading-[300px] w-fit">
                  SOFT
                </p>
              </div>
            </div>
            <div className="flex justify-between items-start w-full">
              <div className="flex items-center gap-3 w-fit">
                <div className="flex justify-center items-center rounded-lg bg-[#4200BB] w-[42px] h-12">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="flex flex-col items-start w-fit "
                  >
                    <path
                      d="M5.33333 18.6667H10.6667V13.3333H5.33333V18.6667ZM13.3333 18.6667H18.6667V13.3333H13.3333V18.6667ZM5.33333 10.6667H10.6667V5.33333H5.33333V10.6667ZM13.3333 10.6667H18.6667V5.33333H13.3333V10.6667ZM2.66667 24C1.93333 24 1.30556 23.7389 0.783333 23.2167C0.261111 22.6944 0 22.0667 0 21.3333V2.66667C0 1.93333 0.261111 1.30556 0.783333 0.783333C1.30556 0.261111 1.93333 0 2.66667 0H21.3333C22.0667 0 22.6944 0.261111 23.2167 0.783333C23.7389 1.30556 24 1.93333 24 2.66667V21.3333C24 22.0667 23.7389 22.6944 23.2167 23.2167C22.6944 23.7389 22.0667 24 21.3333 24H2.66667ZM2.66667 21.3333H21.3333V2.66667H2.66667V21.3333ZM2.66667 2.66667V21.3333V2.66667Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <div className="flex flex-col items-start w-fit">
                  <div className="flex flex-col items-start w-full">
                    <p className="text-[#4200BB] font-inter text-2xl font-black leading-8 w-fit tracking-[-0.05em]">
                      ZeAI SOFT
                    </p>
                  </div>
                  <div className="flex flex-col items-start w-full">
                    <p className="text-[#484456] font-inter text-xs leading-4 w-fit tracking-[0.1em]">
                      ENTERPRISE SOLUTIONS
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start w-fit">
                <div className="flex flex-col items-end w-full">
                  <p className="text-[#191C1E] font-inter text-xl font-bold leading-7 w-fit">
                    EMPLOYMENT CONTRACT
                  </p>
                </div>
                <div className="flex flex-col items-end w-full">
                  <p className="text-[#484456] font-inter text-sm leading-5 w-fit">
                    Ref: ZE-CONT-2022-2048
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start gap-10 w-full">
              <div className="flex flex-col items-start gap-6 w-full">
                <div className="flex flex-col items-start w-full">
                  <p className="text-[#191C1E] font-inter text-base leading-6 w-full">
                    This Employment Agreement &#40;&quot;Agreement&quot;&#41; is
                    made on January 10, 2022, by and between:
                  </p>
                </div>
                <div className="flex justify-center items-start gap-12 w-full">
                  <div className="flex flex-col items-start gap-2 w-full">
                    <div className="flex flex-col items-start w-full">
                      <p className="text-[#484456] font-inter text-xs font-bold leading-4 w-full">
                        THE EMPLOYER
                      </p>
                    </div>
                    <div className="flex flex-col items-start w-full">
                      <p className="text-[#191C1E] font-inter text-sm font-bold leading-5 w-full">
                        ZeAI Soft Corp. 123 Tech Innovation Plaza Palo Alto, CA
                        94301
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-start gap-2 w-full">
                    <div className="flex flex-col items-start w-full">
                      <p className="text-[#484456] font-inter text-xs font-bold leading-4 w-full">
                        THE EMPLOYEE
                      </p>
                    </div>
                    <div className="flex flex-col items-start w-full">
                      <p className="text-[#191C1E] font-inter text-sm font-bold leading-5 w-full">
                        {employee?.full_name || "Alex Rivera"} 456 Oak Grove Lane San Jose, CA 95112
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start gap-6 w-full">
                <div className="flex pt-2 pr-0 pb-2 pl-6 flex-col items-start gap-2 border-l-4 border-l-[rgba(66,0,187,0.20)] w-full">
                  <div className="flex flex-col items-start w-full">
                    <p className="text-[#191C1E] font-inter text-base font-bold leading-6 w-full">
                      1. Position &amp; Duties
                    </p>
                  </div>
                  <div className="w-full h-[91px] relative">
                    <p className="text-[#484456] font-inter text-sm leading-[22.75px] w-[283px] h-[23px] absolute left-0 -top-px">
                      The Employee shall serve in the position of{" "}
                    </p>
                    <div className="w-[349px] h-10 absolute left-0 top-0.5">
                      <p className="text-[#484456] font-inter text-sm font-bold leading-[22.75px] w-[63px] h-[23px] absolute left-[287px] -top-[3px]">
                        Software
                      </p>
                      <p className="text-[#484456] font-inter text-sm font-bold leading-[22.75px] w-[62px] h-[23px] absolute left-0 top-5">
                        Engineer
                      </p>
                    </div>
                    <p className="text-[#484456] font-inter text-sm leading-[22.75px] w-[324px] h-[23px] absolute left-[61px] top-[22px]">
                      . The Employee agrees to perform the duties and
                    </p>
                    <p className="text-[#484456] font-inter text-sm leading-[22.75px] w-[408px] h-[46px] absolute left-0 top-11">
                      responsibilities customarily associated with such position
                      and other duties as assigned by the Employer.
                    </p>
                  </div>
                </div>
                <div className="flex pt-2 pr-0 pb-2 pl-6 flex-col items-start gap-[7px] border-l-4 border-l-[rgba(66,0,187,0.20)] w-full">
                  <div className="flex flex-col items-start w-full">
                    <p className="text-[#191C1E] font-inter text-base font-bold leading-6 w-full">
                      2. Employment Type
                    </p>
                  </div>
                  <div className="flex flex-col items-start w-full">
                    <p className="text-[#484456] font-inter text-sm leading-[22.75px] w-full">
                      This is a Full-Time, Permanent position. The Employee's
                      initial period of employment will be subject to a standard
                      90- day probationary period.
                    </p>
                  </div>
                </div>
                <div className="flex pt-2 pr-0 pb-2 pl-6 flex-col items-start gap-[7px] border-l-4 border-l-[rgba(66,0,187,0.20)] w-full">
                  <div className="flex flex-col items-start w-full">
                    <p className="text-[#191C1E] font-inter text-base font-bold leading-6 w-full">
                      3. Compensation
                    </p>
                  </div>
                  <div className="flex flex-col items-start w-full">
                    <p className="text-[#484456] font-inter text-sm leading-[22.75px] w-full">
                      The Employer shall pay the Employee a base annual salary
                      of USD 85,000, payable in semi-monthly installments in
                      accordance with the Employer's standard payroll practices.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex pt-20 justify-center items-start gap-24 w-full">
                <div className="flex flex-col items-start gap-10 w-full">
                  <div className="flex pb-2 items-end border-b border-b-[rgba(25,28,30,0.20)] w-full h-16">
                    <div className="flex flex-col items-start w-fit">
                      <p className="text-[#4200BB] font-liberationSerif text-xl leading-7 w-fit">
                        John Smith
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-start w-full">
                    <div className="flex flex-col items-start w-full">
                      <p className="text-[#191C1E] font-inter text-sm font-bold leading-5 w-full">
                        John Smith
                      </p>
                    </div>
                    <div className="flex flex-col items-start w-full">
                      <p className="text-[#484456] font-inter text-xs leading-4 w-full">
                        HR Director, ZeAI Soft
                      </p>
                    </div>
                    <div className="flex pt-1 flex-col items-start w-full">
                      <p className="text-[#484456] font-inter text-[10px] leading-[15px] w-full">
                        Date: Jan 10, 2022
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-start gap-10 w-full">
                  <div className="border-b border-b-[rgba(25,28,30,0.20)] w-full h-16"></div>
                  <div className="flex flex-col items-start w-full">
                    <div className="flex flex-col items-start w-full">
                      <p className="text-[#191C1E] font-inter text-sm font-bold leading-5 w-full">
                        {employee?.full_name || "Alex Rivera"}
                      </p>
                    </div>
                    <div className="flex flex-col items-start w-full">
                      <p className="text-[#484456] font-inter text-xs leading-4 w-full">
                        {employee?.designation || "Software Engineer"}
                      </p>
                    </div>
                    <div className="flex pt-1 flex-col items-start w-full">
                      <p className="text-[#484456] font-inter text-[10px] leading-[15px] w-full">
                        Date: ____________
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center absolute bottom-10 w-[596px]">
              <p className="text-[#484456] font-inter text-[10px] leading-[15px] w-fit tracking-[0.1em]">
                PAGE 1 OF 4 | CONFIDENTIAL DOCUMENT
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start gap-5 w-[320px] shrink-0">
          <div className="flex p-6 flex-col items-start gap-6 rounded-3xl border border-[rgba(255,255,255,0.20)] bg-[rgba(255,255,255,0.80)] shadow-[04px24px0rgba(0,0,0,0.04)] w-full">
            <div className="flex justify-between items-center w-full">
              <div className="flex flex-col items-start w-fit">
                <p className="text-[#191C1E] font-inter text-base font-semibold leading-6 w-fit">
                  Contract Information
                </p>
              </div>
              <div className="flex py-1 px-3 flex-col items-start rounded-full bg-[rgba(0,108,73,0.10)] w-fit">
                <p className="text-[#006C49] font-inter text-[10px] font-bold leading-[15px] w-fit tracking-[0.05em]">
                  ACTIVE
                </p>
              </div>
            </div>
            <div className="flex flex-col items-start gap-4 w-full">
              <div className="flex flex-col items-start gap-1 w-full">
                <div className="flex flex-col items-start w-full">
                  <p className="text-[#484456] font-inter text-xs font-medium leading-4 w-full">
                    Employee Name
                  </p>
                </div>
                <div className="flex flex-col items-start w-full">
                  <p className="text-[#191C1E] font-inter text-sm font-semibold leading-5 w-full">
                    {employee?.full_name || "Alex Rivera"}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-start gap-1 w-full">
                <div className="flex flex-col items-start w-full">
                  <p className="text-[#484456] font-inter text-xs font-medium leading-4 w-full">
                    Employee ID
                  </p>
                </div>
                <div className="flex flex-col items-start w-full">
                  <p className="text-[#191C1E] font-inter text-sm font-semibold leading-5 w-full">
                    {employee?.employee_id || "EMP-2048"}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-start gap-1 w-full">
                <div className="flex flex-col items-start w-full">
                  <p className="text-[#484456] font-inter text-xs font-medium leading-4 w-full">
                    Designation
                  </p>
                </div>
                <div className="flex flex-col items-start w-full">
                  <p className="text-[#191C1E] font-inter text-sm font-semibold leading-5 w-full">
                    {employee?.designation || "Software Engineer"}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-start gap-1 w-full">
                <div className="flex flex-col items-start w-full">
                  <p className="text-[#484456] font-inter text-xs font-medium leading-4 w-full">
                    Department
                  </p>
                </div>
                <div className="flex flex-col items-start w-full">
                  <p className="text-[#191C1E] font-inter text-sm font-semibold leading-5 w-full">
                    {employee?.department || "Engineering"}
                  </p>
                </div>
              </div>
              <div className="flex justify-center items-start gap-4 w-full">
                <div className="flex flex-col items-start gap-1 w-full">
                  <div className="flex flex-col items-start w-full">
                    <p className="text-[#484456] font-inter text-xs font-medium leading-4 w-full">
                      Joining Date
                    </p>
                  </div>
                  <div className="flex flex-col items-start w-full">
                    <p className="text-[#191C1E] font-inter text-sm font-semibold leading-5 w-full">
                      Jan 10, 2022
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-start gap-1 w-full">
                  <div className="flex flex-col items-start w-full">
                    <p className="text-[#484456] font-inter text-xs font-medium leading-4 w-full">
                      Start Date
                    </p>
                  </div>
                  <div className="flex flex-col items-start w-full">
                    <p className="text-[#191C1E] font-inter text-sm font-semibold leading-5 w-full">
                      Jan 10, 2022
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex pt-8 flex-col items-start gap-3 border-t border-t-[#CAC3D9] w-full">
              <div className="flex flex-col items-start w-full">
                <p className="text-[#484456] font-inter text-xs font-medium leading-4 w-full">
                  Download &amp; Print
                </p>
              </div>
              <div className="flex flex-col items-start gap-2 w-full">
                <div className="flex py-3 px-4 items-center gap-3 rounded-xl bg-[#E6E8EA] w-full cursor-pointer" onClick={() => window.print()}>
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 17 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="flex flex-col items-center w-fit "
                  >
                    <path
                      d="M5.83333 8.75H6.66667V7.08333H7.5C7.73611 7.08333 7.93403 7.00347 8.09375 6.84375C8.25347 6.68403 8.33333 6.48611 8.33333 6.25V5.41667C8.33333 5.18056 8.25347 4.98264 8.09375 4.82292C7.93403 4.66319 7.73611 4.58333 7.5 4.58333H5.83333V8.75ZM6.66667 6.25V5.41667H7.5V6.25H6.66667ZM9.16667 8.75H10.8333C11.0694 8.75 11.2674 8.67014 11.4271 8.51042C11.5868 8.35069 11.6667 8.15278 11.6667 7.91667V5.41667C11.6667 5.18056 11.5868 4.98264 11.4271 4.82292C11.2674 4.66319 11.0694 4.58333 10.8333 4.58333H9.16667V8.75ZM10 7.91667V5.41667H10.8333V7.91667H10ZM12.5 8.75H13.3333V7.08333H14.1667V6.25H13.3333V5.41667H14.1667V4.58333H12.5V8.75ZM5 13.3333C4.54167 13.3333 4.14931 13.1701 3.82292 12.8438C3.49653 12.5174 3.33333 12.125 3.33333 11.6667V1.66667C3.33333 1.20833 3.49653 0.815972 3.82292 0.489583C4.14931 0.163194 4.54167 0 5 0H15C15.4583 0 15.8507 0.163194 16.1771 0.489583C16.5035 0.815972 16.6667 1.20833 16.6667 1.66667V11.6667C16.6667 12.125 16.5035 12.5174 16.1771 12.8438C15.8507 13.1701 15.4583 13.3333 15 13.3333H5ZM5 11.6667H15V1.66667H5V11.6667ZM1.66667 16.6667C1.20833 16.6667 0.815972 16.5035 0.489583 16.1771C0.163194 15.8507 0 15.4583 0 15V3.33333H1.66667V15H13.3333V16.6667H1.66667ZM5 1.66667V11.6667V1.66667Z"
                      fill="#484456"
                    />
                  </svg>
                  <p className="text-[#191C1E] font-inter text-xs font-semibold leading-4 w-fit">
                    Download as PDF
                  </p>
                </div>
                <div className="flex py-3 px-4 items-center gap-3 rounded-xl bg-[#E6E8EA] w-full cursor-pointer" onClick={() => window.print()}>
                  <svg
                    width="17"
                    height="15"
                    viewBox="0 0 17 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="flex flex-col items-center w-fit "
                  >
                    <path
                      d="M11.6667 4.16667V1.66667H5V4.16667H3.33333V0H13.3333V4.16667H11.6667ZM1.66667 5.83333C1.66667 5.83333 1.74653 5.83333 1.90625 5.83333C2.06597 5.83333 2.26389 5.83333 2.5 5.83333H14.1667C14.4028 5.83333 14.6007 5.83333 14.7604 5.83333C14.9201 5.83333 15 5.83333 15 5.83333H13.3333H3.33333H1.66667ZM13.3333 7.91667C13.5694 7.91667 13.7674 7.83681 13.9271 7.67708C14.0868 7.51736 14.1667 7.31944 14.1667 7.08333C14.1667 6.84722 14.0868 6.64931 13.9271 6.48958C13.7674 6.32986 13.5694 6.25 13.3333 6.25C13.0972 6.25 12.8993 6.32986 12.7396 6.48958C12.5799 6.64931 12.5 6.84722 12.5 7.08333C12.5 7.31944 12.5799 7.51736 12.7396 7.67708C12.8993 7.83681 13.0972 7.91667 13.3333 7.91667ZM11.6667 13.3333V10H5V13.3333H11.6667ZM13.3333 15H3.33333V11.6667H0V6.66667C0 5.95833 0.243056 5.36458 0.729167 4.88542C1.21528 4.40625 1.80556 4.16667 2.5 4.16667H14.1667C14.875 4.16667 15.4688 4.40625 15.9479 4.88542C16.4271 5.36458 16.6667 5.95833 16.6667 6.66667V11.6667H13.3333V15ZM15 10V6.66667C15 6.43056 14.9201 6.23264 14.7604 6.07292C14.6007 5.91319 14.4028 5.83333 14.1667 5.83333H2.5C2.26389 5.83333 2.06597 5.91319 1.90625 6.07292C1.74653 6.23264 1.66667 6.43056 1.66667 6.66667V10H3.33333V8.33333H13.3333V10H15Z"
                      fill="#484456"
                    />
                  </svg>
                  <p className="text-[#191C1E] font-inter text-xs font-semibold leading-4 w-fit">
                    Print Contract
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start rounded-3xl border border-[rgba(255,255,255,0.20)] bg-[rgba(255,255,255,0.80)] shadow-[04px24px0rgba(0,0,0,0.04)] w-full overflow-hidden">
            <div className="flex flex-col justify-center items-start w-full h-48 relative">
              <img
                src="/Ab6axucznysfphd5eznk9gt3ge1phu0_giljb9ajjb0qfdvdk042we8m0zp0k0z2aia5ehjd5gkkoeswnglbdnmyfnrw9z7ph8q_qiya6lgmxng7tzxxbdil5rht8se11tfuj6whyylhblo2spap8xpitqpsbb5fvt7zeqqaowidfcyavuq3bkrp7ipeo92hsgushkscbw8imewmje4kdlio0gi2jwsajlre3rzzaehhh_pry7uv3c8qj4lkdl2rh7dft7bgppceror.png"
                className="w-full h-full overflow-hidden max-w-none"
                alt="AB6AXuCzNySFpHD5eznK9gt3Ge1phU0_Gi-LjB9Ajj-B0QfDVdK042We8M0Zp0k0z2aIA5EHjD5gkkoEswNgLbDnmyFnrw9Z7PH8Q_Qiya6LGMxnG7tZXxbdiL5rht-8sE11TFuJ6WhyYlhbLo2sPAP8xPITqPsBB5FvT7ZEQqaOwIDfcyAVuQ3bkrP7Ipeo92hsgusHkScbw8iMeWMJE4kdLIo0gI2jWSAJlrE3r-zzaeHHH_-PrY7uV3C8Qj4lKDl2rH7dFt7bGPPCErOR"
              />
              <div className="flex p-4 items-end absolute bg-linear-[0deg,rgba(0,0,0,0.60)0%,rgba(0,0,0,0.00)100%] w-[338px] h-48">
                <div className="flex flex-col items-start w-fit">
                  <p className="text-[#FFF] font-inter text-xs font-medium leading-4 w-fit">
                    Physical Archive Preview
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex p-6 flex-col items-start rounded-3xl bg-[#5A18EE] w-full overflow-hidden relative">
            <div className="absolute -right-4 -bottom-4 rounded-full bg-[rgba(255,255,255,0.10)] w-24 h-24"></div>
            <div className="flex flex-col items-start gap-1 w-full">
              <div className="flex justify-center items-center rounded-full bg-[rgba(255,255,255,0.20)] w-10 h-10">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex flex-col items-start w-fit "
                >
                  <path
                    d="M9.95 16C10.3 16 10.5958 15.8792 10.8375 15.6375C11.0792 15.3958 11.2 15.1 11.2 14.75C11.2 14.4 11.0792 14.1042 10.8375 13.8625C10.5958 13.6208 10.3 13.5 9.95 13.5C9.6 13.5 9.30417 13.6208 9.0625 13.8625C8.82083 14.1042 8.7 14.4 8.7 14.75C8.7 15.1 8.82083 15.3958 9.0625 15.6375C9.30417 15.8792 9.6 16 9.95 16ZM9.05 12.15H10.9C10.9 11.6 10.9625 11.1667 11.0875 10.85C11.2125 10.5333 11.5667 10.1 12.15 9.55C12.5833 9.11667 12.925 8.70417 13.175 8.3125C13.425 7.92083 13.55 7.45 13.55 6.9C13.55 5.96667 13.2083 5.25 12.525 4.75C11.8417 4.25 11.0333 4 10.1 4C9.15 4 8.37917 4.25 7.7875 4.75C7.19583 5.25 6.78333 5.85 6.55 6.55L8.2 7.2C8.28333 6.9 8.47083 6.575 8.7625 6.225C9.05417 5.875 9.5 5.7 10.1 5.7C10.6333 5.7 11.0333 5.84583 11.3 6.1375C11.5667 6.42917 11.7 6.75 11.7 7.1C11.7 7.43333 11.6 7.74583 11.4 8.0375C11.2 8.32917 10.95 8.6 10.65 8.85C9.91667 9.5 9.46667 9.99167 9.3 10.325C9.13333 10.6583 9.05 11.2667 9.05 12.15ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20ZM10 18C12.2333 18 14.125 17.225 15.675 15.675C17.225 14.125 18 12.2333 18 10C18 7.76667 17.225 5.875 15.675 4.325C14.125 2.775 12.2333 2 10 2C7.76667 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.76667 2 10C2 12.2333 2.775 14.125 4.325 15.675C5.875 17.225 7.76667 18 10 18Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div className="flex pt-3 flex-col items-start w-full">
                <p className="text-[#FFF] font-inter text-lg font-bold leading-7 w-full">
                  Need Help?
                </p>
              </div>
              <div className="flex pb-5 flex-col items-start w-full">
                <p className="text-[rgba(255,255,255,0.70)] font-inter text-sm leading-5 w-full">
                  Have questions regarding this contract or your benefits
                  package?
                </p>
              </div>
              <button className="cursor-pointer text-nowrap flex py-3 px-0 justify-center items-center rounded-xl bg-[#FFF] w-full relative" onClick={() => navigate("/employee/support")}>
                <div className="absolute rounded-xl bg-[rgba(255,255,255,0.00)] shadow-[010px15px-3pxrgba(0,0,0,0.10),04px6px-4pxrgba(0,0,0,0.10)] w-[292px] h-12"></div>
                <p className="text-[#4200BB] font-inter text-base font-bold leading-6 w-fit">
                  Contact HR
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}
