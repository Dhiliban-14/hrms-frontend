import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
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
    <div className="bg-[#FEFEFE] min-w-screen min-h-screen flex relative">
      <div className="flex flex-col items-start bg-[#CBC3D9] w-px h-8 absolute left-[1229px] top-6 overflow-hidden"></div>
      <Sidebar />
      <div className="flex-1 flex flex-col items-start gap-4 pt-8 pr-6 pb-[25px] pl-6 min-h-screen">
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
                       <div className="flex items-start gap-0.5 w-fit">
                         <p className="font-nimbusSans text-3xl font-black leading-9 w-fit">
                           <span className="text-[#4200BB]">Ze</span><span className="text-[#191C1E]">AI</span>
                         </p>
                         <p className="font-nimbusSans text-[10px] font-bold text-[#4200BB] self-end" style={{writingMode:'vertical-rl', textOrientation:'mixed', letterSpacing:'0.15em'}}>
                           SOFT
                         </p>
                       </div>
                       <p className="text-[#4200BB] font-nimbusSans text-[9px] font-medium leading-[14px] w-fit tracking-[0.2em] mt-0.5">
                         EMPOWERING YOU
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
      
    </div>
  );
}
