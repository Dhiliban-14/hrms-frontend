import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
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
      <Sidebar />
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
            <div className="printable-doc-container flex p-4 flex-col items-start rounded-xl border border-dashed border-[#D1D5DB] bg-[#F9FAFB] w-full">
              <div className="printable-doc-content flex max-w-[576px] p-8 flex-col items-start gap-6 bg-[#FFF] shadow-[04px20px0rgba(0,0,0,0.05)] w-full">
                <div className="flex pb-4 justify-between items-start w-full">
                   <div className="flex flex-col items-start gap-2 w-fit">
                     <div className="flex flex-col items-start w-full">
                       <div className="flex items-start gap-0.5 w-fit">
                         <p className="font-inter text-2xl font-extrabold leading-8 w-fit tracking-[-0.05em]">
                           <span className="text-purple-verif">Ze</span><span className="text-dark-brand">AI</span>
                         </p>
                         <p className="font-inter text-[10px] font-bold text-purple-verif self-end" style={{writingMode:'vertical-rl', textOrientation:'mixed', letterSpacing:'0.15em'}}>
                           SOFT
                         </p>
                       </div>
                       <p className="text-purple-verif font-inter text-[9px] font-medium leading-[14px] w-fit tracking-[0.2em] mt-0.5">
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
