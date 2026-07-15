import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { employeeAPI } from "../../services/api";
import logo from "../../assets/logos/logo.png";

export default function Empinfo() {
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
    script.id = "tailwind-cdn-script";
    document.head.appendChild(script);

    // Inject fonts
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=Hanken+Grotesk:wght@400;500;700&family=Manrope:wght@400;500;700&family=Material+Icons&display=swap";
    link.rel = "stylesheet";
    link.id = "empinfo-fonts";
    document.head.appendChild(link);

    return () => {
      // Clean up script
      const el = document.getElementById("tailwind-cdn-script");
      if (el) el.remove();

      // Clean up fonts
      const f = document.getElementById("empinfo-fonts");
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
    <div className="bg-[#FEFEFE] min-w-screen min-h-screen relative">
      <div className="flex flex-col items-start bg-[#CBC3D9] w-px h-8 absolute left-[1229px] top-6 overflow-hidden"></div>
      <div className="w-[297px] h-[1418px] absolute left-0 top-0">
        <div className="bg-[#000] w-[297px] h-[1418px] absolute left-0 top-0"></div>
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
      <div className="flex max-w-[1400px] pt-6 pr-6 pb-[25px] pl-6 flex-col items-start gap-4 w-[1020px] absolute left-[325px] top-[81px]">
        <div className="flex items-center w-full">
          <div className="flex items-center gap-2 w-fit cursor-pointer" onClick={() => navigate("/employee/profile")}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex flex-col items-center w-fit "
            >
              <path
                d="M3.825 9L9.425 14.6L8 16L0 8L8 0L9.425 1.4L3.825 7H16V9H3.825Z"
                fill="#4200BB"
              />
            </svg>
            <div className="flex flex-col items-center w-fit">
              <p className="text-[#4200BB] font-inter text-xs font-semibold leading-4 w-fit">
                Back to Employee Information
              </p>
            </div>
          </div>
        </div>
        <div className="flex pt-2 justify-between items-end w-full">
          <div className="flex flex-col items-start w-fit">
            <p className="text-[#191C1E] font-inter text-2xl font-semibold leading-8 w-fit tracking-[-0.01em]">
              Offer Letter
            </p>
          </div>
          <div className="flex py-2.5 px-6 items-center gap-2 rounded-full bg-[#4200BB] w-fit relative cursor-pointer" onClick={() => window.print()}>
            <div className="absolute rounded-full bg-[rgba(255,255,255,0.00)] shadow-[04px6px-1pxrgba(0,0,0,0.10),02px4px-2pxrgba(0,0,0,0.10)] w-[201px] h-9"></div>
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
              Download Offer Letter
            </p>
          </div>
        </div>
        <div className="flex w-full gap-6 items-start">
          <div className="flex p-8 flex-col items-center rounded-[32px] border border-[rgba(0,0,0,0.05)] bg-[#FFF] shadow-[04px20px0rgba(0,0,0,0.05)] w-[640px] shrink-0">
            <div className="flex pb-6 flex-col items-start w-full">
              <div className="flex pb-4 justify-between items-center border-b border-b-[#CAC3D9] w-full">
                <div className="flex flex-col items-start w-fit">
                  <p className="text-[#484456] font-inter text-xs font-semibold leading-4 w-fit">
                    ZeAI_OfferLetter_AlexRivera.pdf
                  </p>
                </div>
                <div className="flex items-start gap-2 w-fit">
                  <div className="flex pt-2 pr-2 pb-3.5 pl-2 flex-col justify-center items-center rounded-full w-fit">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex justify-center items-start w-fit "
                    >
                      <path
                        d="M16.6 18L10.3 11.7C9.8 12.1 9.225 12.4167 8.575 12.65C7.925 12.8833 7.23333 13 6.5 13C4.68333 13 3.14583 12.3708 1.8875 11.1125C0.629167 9.85417 0 8.31667 0 6.5C0 4.68333 0.629167 3.14583 1.8875 1.8875C3.14583 0.629167 4.68333 0 6.5 0C8.31667 0 9.85417 0.629167 11.1125 1.8875C12.3708 3.14583 13 4.68333 13 6.5C13 7.23333 12.8833 7.925 12.65 8.575C12.4167 9.225 12.1 9.8 11.7 10.3L18 16.6L16.6 18ZM6.5 11C7.75 11 8.8125 10.5625 9.6875 9.6875C10.5625 8.8125 11 7.75 11 6.5C11 5.25 10.5625 4.1875 9.6875 3.3125C8.8125 2.4375 7.75 2 6.5 2C5.25 2 4.1875 2.4375 3.3125 3.3125C2.4375 4.1875 2 5.25 2 6.5C2 7.75 2.4375 8.8125 3.3125 9.6875C4.1875 10.5625 5.25 11 6.5 11ZM5.5 9.5V7.5H3.5V5.5H5.5V3.5H7.5V5.5H9.5V7.5H7.5V9.5H5.5Z"
                        fill="#484456"
                      />
                    </svg>
                  </div>
                  <div className="flex pt-2 pr-2 pb-3.5 pl-2 flex-col justify-center items-center rounded-full w-fit">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex justify-center items-start w-fit "
                    >
                      <path
                        d="M16.6 18L10.3 11.7C9.8 12.1 9.225 12.4167 8.575 12.65C7.925 12.8833 7.23333 13 6.5 13C4.68333 13 3.14583 12.3708 1.8875 11.1125C0.629167 9.85417 0 8.31667 0 6.5C0 4.68333 0.629167 3.14583 1.8875 1.8875C3.14583 0.629167 4.68333 0 6.5 0C8.31667 0 9.85417 0.629167 11.1125 1.8875C12.3708 3.14583 13 4.68333 13 6.5C13 7.23333 12.8833 7.925 12.65 8.575C12.4167 9.225 12.1 9.8 11.7 10.3L18 16.6L16.6 18ZM6.5 11C7.75 11 8.8125 10.5625 9.6875 9.6875C10.5625 8.8125 11 7.75 11 6.5C11 5.25 10.5625 4.1875 9.6875 3.3125C8.8125 2.4375 7.75 2 6.5 2C5.25 2 4.1875 2.4375 3.3125 3.3125C2.4375 4.1875 2 5.25 2 6.5C2 7.75 2.4375 8.8125 3.3125 9.6875C4.1875 10.5625 5.25 11 6.5 11ZM4 7.5V5.5H9V7.5H4Z"
                        fill="#484456"
                      />
                    </svg>
                  </div>
                  <div className="flex pt-2 pr-2 pb-3.5 pl-2 flex-col justify-center items-center rounded-full w-fit">
                    <svg
                      width="20"
                      height="18"
                      viewBox="0 0 20 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex justify-center items-start w-fit "
                    >
                      <path
                        d="M14 5V2H6V5H4V0H16V5H14ZM2 7C2 7 2.09583 7 2.2875 7C2.47917 7 2.71667 7 3 7H17C17.2833 7 17.5208 7 17.7125 7C17.9042 7 18 7 18 7H16H4H2ZM16 9.5C16.2833 9.5 16.5208 9.40417 16.7125 9.2125C16.9042 9.02083 17 8.78333 17 8.5C17 8.21667 16.9042 7.97917 16.7125 7.7875C16.5208 7.59583 16.2833 7.5 16 7.5C15.7167 7.5 15.4792 7.59583 15.2875 7.7875C15.0958 7.97917 15 8.21667 15 8.5C15 8.78333 15.0958 9.02083 15.2875 9.2125C15.4792 9.40417 15.7167 9.5 16 9.5ZM14 16V12H6V16H14ZM16 18H4V14H0V8C0 7.15 0.291667 6.4375 0.875 5.8625C1.45833 5.2875 2.16667 5 3 5H17C17.85 5 18.5625 5.2875 19.1375 5.8625C19.7125 6.4375 20 7.15 20 8V14H16V18ZM18 12V8C18 7.71667 17.9042 7.47917 17.7125 7.2875C17.5208 7.09583 17.2833 7 17 7H3C2.71667 7 2.47917 7.09583 2.2875 7.2875C2.09583 7.47917 2 7.71667 2 8V12H4V10H16V12H18Z"
                        fill="#484456"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex max-w-[800px] p-8 flex-col items-start -space-y-px bg-[#FFF] shadow-[0010px0rgba(0,0,0,0.10)] w-full overflow-hidden">
              <div className="flex pb-8 flex-col items-start w-full">
                <div className="flex justify-between items-start w-full">
                  <div className="flex flex-col items-start w-fit">
                    <div className="flex flex-col items-start w-full">
                      <p className="text-[#4200BB] font-nimbusSans text-3xl font-black leading-9 w-fit">
                        ZeAI
                      </p>
                    </div>
                    <div className="flex flex-col items-start w-full">
                      <p className="text-[#484456] font-nimbusSans text-[10px] leading-[15px] w-fit tracking-[0.1em]">
                        GLOBAL SOLUTIONS | HR DEPT
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-start w-fit">
                    <div className="flex flex-col items-end w-full">
                      <p className="text-[#484456] font-nimbusSans text-xs leading-4 w-fit">
                        October 12, 2023
                      </p>
                    </div>
                    <div className="flex flex-col items-end w-full">
                      <p className="text-[#484456] font-nimbusSans text-xs leading-4 w-fit">
                        Ref: ZA&#x2F;HR&#x2F;2023&#x2F;2048
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex pb-[82px] flex-col items-start gap-[15px] w-full">
                <div className="flex pb-px flex-col items-start w-full">
                  <p className="text-[#191C1E] font-liberationSerif text-sm font-bold leading-[22.75px] w-full">
                    To, {employee?.full_name || "Alex Rivera"}
                  </p>
                </div>
                <div className="flex pb-px flex-col items-start w-full">
                  <p className="text-[#191C1E] font-liberationSerif text-sm leading-[22.75px] w-full">
                    Dear {employee?.full_name?.split(" ")[0] || "Alex"},
                  </p>
                </div>
                <div className="flex flex-col items-start w-full">
                  <p className="text-[#191C1E] font-liberationSerif text-sm font-bold leading-[22.75px] w-full">
                    We are delighted to offer you the position of {employee?.designation || "Software Engineer"} at ZeAI Soft. Your skills and expertise impressed
                    us during the interview process, and we are confident you
                    will be a valuable asset to our engineering team.
                  </p>
                </div>
                <div className="flex pt-[17px] pr-4 pb-4 pl-4 flex-col items-start gap-1 rounded-lg bg-[#F2F4F6] w-full">
                  <div className="flex flex-col items-start w-full">
                    <p className="text-[#4200BB] font-nimbusSans text-xs font-bold leading-4 w-full">
                      COMPENSATION DETAILS
                    </p>
                  </div>
                  <div className="flex justify-between items-start w-full">
                    <div className="flex flex-col items-start w-fit h-full">
                      <p className="text-[#191C1E] font-nimbusSans text-sm leading-[22.75px] w-fit">
                        Annual CTC:
                      </p>
                    </div>
                    <div className="flex flex-col items-start w-fit h-full">
                      <p className="text-[#191C1E] font-nimbusSans text-sm font-bold leading-[22.75px] w-fit">
                        $125,000.00
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-start w-full">
                    <div className="flex flex-col items-start w-fit h-full">
                      <p className="text-[#191C1E] font-nimbusSans text-sm leading-[22.75px] w-fit">
                        Reporting Manager:
                      </p>
                    </div>
                    <div className="flex flex-col items-start w-fit h-full">
                      <p className="text-[#191C1E] font-nimbusSans text-sm font-bold leading-[22.75px] w-fit">
                        {employee?.reporting_manager || "Sarah Jenkins (VP Engineering)"}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-start w-full">
                    <div className="flex flex-col items-start w-fit h-full">
                      <p className="text-[#191C1E] font-nimbusSans text-sm leading-[22.75px] w-fit">
                        Join Date:
                      </p>
                    </div>
                    <div className="flex flex-col items-start w-fit h-full">
                      <p className="text-[#191C1E] font-nimbusSans text-sm font-bold leading-[22.75px] w-fit">
                        {employee?.date_of_joining || "November 01, 2023"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-start w-full">
                  <p className="text-[#191C1E] font-liberationSerif text-sm leading-[22.75px] w-full">
                    This offer is contingent upon successful verification of
                    your professional background and educational credentials. We
                    look forward to having you join our journey toward building
                    the future of AI-driven HR management.
                  </p>
                </div>
                <div className="flex pb-px flex-col items-start w-full">
                  <p className="text-[#191C1E] font-liberationSerif text-sm leading-[22.75px] w-full">
                    Please signify your acceptance by signing below.
                  </p>
                </div>
              </div>
              <div className="flex pt-8 justify-end items-center w-full h-[171px]">
                <div className="flex pt-8 justify-between items-start w-[519px]">
                  <div className="flex flex-col items-start w-fit">
                    <div className="flex pb-4 flex-col items-start w-full">
                      <p className="text-[#484456] font-liberationSerif text-xs leading-4 w-fit">
                        Authorized Signatory
                      </p>
                    </div>
                    <div className="flex justify-center items-center border-b border-b-[#000] w-40 h-10">
                      <div className="flex flex-col items-start opacity-70 w-fit">
                        <p className="text-[#000] font-liberationSerif text-xl leading-7 w-fit">
                          Mark Henderson
                        </p>
                      </div>
                    </div>
                    <div className="flex pt-1 flex-col items-start w-full">
                      <p className="text-[#000] font-nimbusSans text-xs font-bold leading-4 w-fit">
                        Mark Henderson
                      </p>
                    </div>
                    <div className="flex flex-col items-start w-full">
                      <p className="text-[#484456] font-nimbusSans text-[10px] leading-[15px] w-fit">
                        Chief Human Resources Officer
                      </p>
                    </div>
                  </div>
                  <div className="flex pt-0.5 flex-col justify-end items-start w-fit h-[116px]">
                    <div className="flex justify-center items-center shrink-0 rounded-full border-4 border-[rgba(66,0,187,0.20)] opacity-50 w-24 h-24 relative">
                      <div className="flex flex-col items-start w-fit">
                        <div className="flex flex-col items-center -space-y-0 w-full">
                          <p className="text-[#4200BB] font-nimbusSans text-[8px] font-bold leading-[10px] w-fit">
                            ZEAI SOFT
                          </p>
                          <p className="text-[#4200BB] font-nimbusSans text-[8px] font-bold leading-[10px] w-fit">
                            HR DEPT
                          </p>
                        </div>
                        <div className="flex flex-col items-center w-full">
                          <p className="text-[#4200BB] font-nimbusSans text-[6px] font-bold leading-[9px] w-fit">
                            VERIFIED
                          </p>
                        </div>
                      </div>
                      <div className="absolute left-2 top-2 rounded-full border-2 border-[rgba(66,0,187,0.40)] w-[88px] h-[88px]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start gap-6 w-[320px] shrink-0">
            <div className="flex p-6 flex-col items-start gap-4 rounded-[32px] border border-[rgba(0,0,0,0.05)] bg-[rgba(255,255,255,0.90)] shadow-[04px20px0rgba(0,0,0,0.05)] w-full">
              <div className="flex flex-col items-start w-full">
                <p className="text-[#191C1E] font-inter text-base font-semibold leading-6 w-full">
                  Offer Letter Information
                </p>
              </div>
              <div className="flex flex-col items-start gap-3 w-full">
                <div className="flex py-2 px-0 justify-between items-center border-b border-b-[#CAC3D9] w-full">
                  <div className="flex flex-col items-start w-fit">
                    <p className="text-[#484456] font-inter text-xs font-medium leading-4 w-fit">
                      Employee Name
                    </p>
                  </div>
                  <div className="flex flex-col items-start w-fit">
                    <p className="text-[#191C1E] font-inter text-base leading-6 w-fit">
                      {employee?.full_name || "Alex Rivera"}
                    </p>
                  </div>
                </div>
                <div className="flex py-2 px-0 justify-between items-center border-b border-b-[#CAC3D9] w-full">
                  <div className="flex flex-col items-start w-fit">
                    <p className="text-[#484456] font-inter text-xs font-medium leading-4 w-fit">
                      Employee ID
                    </p>
                  </div>
                  <div className="flex flex-col items-start w-fit">
                    <p className="text-[#191C1E] font-inter text-base leading-6 w-fit">
                      {employee?.employee_id || "EMP-2048"}
                    </p>
                  </div>
                </div>
                <div className="flex py-2 px-0 justify-between items-center border-b border-b-[#CAC3D9] w-full">
                  <div className="flex flex-col items-start w-fit">
                    <p className="text-[#484456] font-inter text-xs font-medium leading-4 w-fit">
                      Designation
                    </p>
                  </div>
                  <div className="flex flex-col items-start w-fit">
                    <p className="text-[#191C1E] font-inter text-base leading-6 w-fit">
                      {employee?.designation || "Software Engineer"}
                    </p>
                  </div>
                </div>
                <div className="flex py-2 px-0 justify-between items-center border-b border-b-[#CAC3D9] w-full">
                  <div className="flex flex-col items-start w-fit">
                    <p className="text-[#484456] font-inter text-xs font-medium leading-4 w-fit">
                      Department
                    </p>
                  </div>
                  <div className="flex flex-col items-start w-fit">
                    <p className="text-[#191C1E] font-inter text-base leading-6 w-fit">
                      {employee?.department || "Engineering"}
                    </p>
                  </div>
                </div>
                <div className="flex py-2 px-0 justify-between items-center border-b border-b-[#CAC3D9] w-full">
                  <div className="flex flex-col items-start w-fit">
                    <p className="text-[#484456] font-inter text-xs font-medium leading-4 w-fit">
                      Date of Joining
                    </p>
                  </div>
                  <div className="flex flex-col items-start w-fit">
                    <p className="text-[#191C1E] font-inter text-base leading-6 w-fit">
                      {employee?.date_of_joining || "Nov 01, 2023"}
                    </p>
                  </div>
                </div>
                <div className="flex py-2 px-0 justify-between items-center border-b border-b-[#CAC3D9] w-full">
                  <div className="flex flex-col items-start w-fit">
                    <p className="text-[#484456] font-inter text-xs font-medium leading-4 w-fit">
                      Offer Letter Date
                    </p>
                  </div>
                  <div className="flex flex-col items-start w-fit">
                    <p className="text-[#191C1E] font-inter text-base leading-6 w-fit">
                      Oct 12, 2023
                    </p>
                  </div>
                </div>
                <div className="flex py-2 px-0 justify-between items-center border-b border-b-[#CAC3D9] w-full">
                  <div className="flex flex-col items-start w-fit">
                    <p className="text-[#484456] font-inter text-xs font-medium leading-4 w-fit">
                      Status
                    </p>
                  </div>
                  <div className="flex py-1 px-3 flex-col items-start rounded-full bg-[rgba(0,108,73,0.15)] w-fit">
                    <p className="text-[#006C49] font-inter text-[10px] font-bold leading-[15px] w-fit tracking-[0.05em]">
                      ACCEPTED
                    </p>
                  </div>
                </div>
                <div className="flex py-2 px-0 justify-between items-center w-full">
                  <div className="flex flex-col items-start w-fit">
                    <p className="text-[#484456] font-inter text-xs font-medium leading-4 w-fit">
                      Accepted On
                    </p>
                  </div>
                  <div className="flex flex-col items-start w-fit">
                    <p className="text-[#191C1E] font-inter text-base leading-6 w-fit">
                      Oct 14, 2023
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex p-6 flex-col items-start rounded-[32px] bg-[#5A18EE] w-full overflow-hidden relative">
              <div className="absolute -right-4 -bottom-4 rounded-full bg-[rgba(255,255,255,0.10)] w-32 h-32"></div>
              <div className="flex flex-col items-start gap-1 w-full">
                <svg
                  width="22"
                  height="25"
                  viewBox="0 0 22 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[21px] h-[25px] "
                >
                  <path
                    d="M11.25 25L10.9375 21.25H10.625C7.66667 21.25 5.15625 20.2188 3.09375 18.1562C1.03125 16.0938 0 13.5833 0 10.625C0 7.66667 1.03125 5.15625 3.09375 3.09375C5.15625 1.03125 7.66667 0 10.625 0C12.1042 0 13.4844 0.276042 14.7656 0.828125C16.0469 1.38021 17.1719 2.14062 18.1406 3.10938C19.1094 4.07812 19.8698 5.20312 20.4219 6.48438C20.974 7.76562 21.25 9.14583 21.25 10.625C21.25 12.1875 20.9948 13.6875 20.4844 15.125C19.974 16.5625 19.276 17.8958 18.3906 19.125C17.5052 20.3542 16.4531 21.4688 15.2344 22.4688C14.0156 23.4688 12.6875 24.3125 11.25 25ZM13.75 20.4375C15.2292 19.1875 16.4323 17.724 17.3594 16.0469C18.2865 14.3698 18.75 12.5625 18.75 10.625C18.75 8.35417 17.9635 6.43229 16.3906 4.85938C14.8177 3.28646 12.8958 2.5 10.625 2.5C8.35417 2.5 6.43229 3.28646 4.85938 4.85938C3.28646 6.43229 2.5 8.35417 2.5 10.625C2.5 12.8958 3.28646 14.8177 4.85938 16.3906C6.43229 17.9635 8.35417 18.75 10.625 18.75H13.75V20.4375ZM10.5938 17.4688C10.9479 17.4688 11.25 17.3438 11.5 17.0938C11.75 16.8438 11.875 16.5417 11.875 16.1875C11.875 15.8333 11.75 15.5312 11.5 15.2812C11.25 15.0312 10.9479 14.9062 10.5938 14.9062C10.2396 14.9062 9.9375 15.0312 9.6875 15.2812C9.4375 15.5312 9.3125 15.8333 9.3125 16.1875C9.3125 16.5417 9.4375 16.8438 9.6875 17.0938C9.9375 17.3438 10.2396 17.4688 10.5938 17.4688ZM9.6875 13.5H11.5625C11.5625 12.875 11.625 12.4375 11.75 12.1875C11.875 11.9375 12.2708 11.4792 12.9375 10.8125C13.3125 10.4375 13.625 10.0312 13.875 9.59375C14.125 9.15625 14.25 8.6875 14.25 8.1875C14.25 7.125 13.8906 6.32812 13.1719 5.79688C12.4531 5.26562 11.6042 5 10.625 5C9.70833 5 8.9375 5.25521 8.3125 5.76562C7.6875 6.27604 7.25 6.89583 7 7.625L8.75 8.3125C8.85417 7.95833 9.05208 7.60938 9.34375 7.26562C9.63542 6.92188 10.0625 6.75 10.625 6.75C11.1875 6.75 11.6094 6.90625 11.8906 7.21875C12.1719 7.53125 12.3125 7.875 12.3125 8.25C12.3125 8.60417 12.2083 8.92188 12 9.20312C11.7917 9.48438 11.5417 9.77083 11.25 10.0625C10.5208 10.6875 10.0781 11.1823 9.92188 11.5469C9.76562 11.9115 9.6875 12.5625 9.6875 13.5Z"
                    fill="#CEC1FF"
                  />
                </svg>
                <div className="flex pt-1 flex-col items-start w-full">
                  <p className="text-[#CEC1FF] font-inter text-base font-semibold leading-6 w-full">
                    Need Help?
                  </p>
                </div>
                <div className="flex pb-3 flex-col items-start opacity-80 w-full">
                  <p className="text-[#CEC1FF] font-inter text-[13px] leading-[18px] w-full">
                    Have questions about your offer or compensation structure?
                  </p>
                </div>
                <button className="cursor-pointer text-nowrap flex py-2 px-0 justify-center items-center rounded-xl bg-[#FFF] w-full" onClick={() => navigate("/employee/support")}>
                  <p className="text-[#4200BB] font-inter text-base leading-6 w-fit">
                    Contact HR Support
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
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
