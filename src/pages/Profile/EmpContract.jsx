import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
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
      <Sidebar />
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
                   <div className="flex items-end gap-1 w-fit">
                     <p className="font-inter text-2xl font-black leading-8 w-fit tracking-[-0.05em]">
                       <span className="text-[#4200BB]">Ze</span><span className="text-[#191C1E]">AI</span>
                     </p>
                     <p className="font-inter text-xs font-bold leading-none mb-1 text-[#4200BB] tracking-[0.05em]">
                       SOFT
                     </p>
                   </div>
                   <p className="text-[#4200BB] font-inter text-[9px] font-medium leading-[14px] w-fit tracking-[0.2em] mt-0.5">
                     EMPOWERING YOU
                   </p>
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
