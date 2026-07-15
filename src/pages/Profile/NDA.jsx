import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import { employeeAPI } from "../../services/api";
import logo from "../../assets/logos/logo.png";
export default function NDA() {
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
    script.id = "tailwind-cdn-script-nda";
    document.head.appendChild(script);

    // Inject fonts
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=Hanken+Grotesk:wght@400;500;700&family=Manrope:wght@400;500;700&family=Material+Icons&display=swap";
    link.rel = "stylesheet";
    link.id = "empnda-fonts";
    document.head.appendChild(link);

    return () => {
      // Clean up script
      const el = document.getElementById("tailwind-cdn-script-nda");
      if (el) el.remove();

      // Clean up fonts
      const f = document.getElementById("empnda-fonts");
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
      <div className="flex-1 flex flex-col items-start gap-6 pt-8 pr-8 pb-8 pl-8 min-h-screen">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-2 w-fit">
            <div className="flex flex-col items-start w-fit">
              <p className="text-[#9CA3AF] font-nimbusSans text-xs font-medium leading-4 w-fit tracking-[0.05em]">
                DASHBOARD
              </p>
            </div>
            <svg
              width="4"
              height="7"
              viewBox="0 0 4 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex flex-col items-start w-fit "
            >
              <path
                d="M3.85938 3.14062C3.95312 3.24479 4 3.36458 4 3.5C4 3.63542 3.95312 3.75521 3.85938 3.85938L0.859375 6.85938C0.755208 6.95312 0.635417 7 0.5 7C0.364583 7 0.244792 6.95312 0.140625 6.85938C0.046875 6.75521 0 6.63542 0 6.5C0 6.36458 0.046875 6.24479 0.140625 6.14062L2.79688 3.5L0.140625 0.859375C0.046875 0.755208 0 0.635417 0 0.5C0 0.364583 0.046875 0.244792 0.140625 0.140625C0.244792 0.046875 0.364583 0 0.5 0C0.635417 0 0.755208 0.046875 0.859375 0.140625L3.85938 3.14062Z"
                fill="#9CA3AF"
              />
            </svg>
            <div className="flex flex-col items-start w-fit">
              <p className="text-[#9CA3AF] font-nimbusSans text-xs font-medium leading-4 w-fit tracking-[0.05em]">
                EMPLOYEE INFORMATION
              </p>
            </div>
            <svg
              width="4"
              height="7"
              viewBox="0 0 4 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex flex-col items-start w-fit "
            >
              <path
                d="M3.85938 3.14062C3.95312 3.24479 4 3.36458 4 3.5C4 3.63542 3.95312 3.75521 3.85938 3.85938L0.859375 6.85938C0.755208 6.95312 0.635417 7 0.5 7C0.364583 7 0.244792 6.95312 0.140625 6.85938C0.046875 6.75521 0 6.63542 0 6.5C0 6.36458 0.046875 6.24479 0.140625 6.14062L2.79688 3.5L0.140625 0.859375C0.046875 0.755208 0 0.635417 0 0.5C0 0.364583 0.046875 0.244792 0.140625 0.140625C0.244792 0.046875 0.364583 0 0.5 0C0.635417 0 0.755208 0.046875 0.859375 0.140625L3.85938 3.14062Z"
                fill="#9CA3AF"
              />
            </svg>
            <div className="flex flex-col items-start w-fit">
              <p className="text-[#475569] font-nimbusSans text-xs font-medium leading-4 w-fit tracking-[0.05em]">
                NDA
              </p>
            </div>
          </div>
          <div className="flex py-2 px-4 items-center gap-2 rounded-lg border border-[#5A18EE] w-fit cursor-pointer" onClick={() => navigate("/employee/profile")}>
            <svg
              width="13"
              height="11"
              viewBox="0 0 13 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex flex-col items-center w-fit "
            >
              <path
                d="M0.246094 4.62109C0.0820312 4.80339 0 5.01302 0 5.25C0 5.48698 0.0820312 5.69661 0.246094 5.87891L4.62109 10.2539C4.80339 10.418 5.01302 10.5 5.25 10.5C5.48698 10.5 5.69661 10.418 5.87891 10.2539C6.04297 10.0716 6.125 9.86198 6.125 9.625C6.125 9.38802 6.04297 9.17839 5.87891 8.99609L2.98047 6.125H11.375C11.6302 6.125 11.8398 6.04297 12.0039 5.87891C12.168 5.71484 12.25 5.50521 12.25 5.25C12.25 4.99479 12.168 4.78516 12.0039 4.62109C11.8398 4.45703 11.6302 4.375 11.375 4.375H2.98047L5.87891 1.50391C6.04297 1.32161 6.125 1.11198 6.125 0.875C6.125 0.638021 6.04297 0.428385 5.87891 0.246094C5.69661 0.0820312 5.48698 0 5.25 0C5.01302 0 4.80339 0.0820312 4.62109 0.246094L0.246094 4.62109Z"
                fill="#5A18EE"
              />
            </svg>
            <p className="text-[#5A18EE] font-nimbusSans text-sm font-semibold leading-5 w-fit">
              Back to Employee Information
            </p>
          </div>
        </div>
        <div className="flex flex-col items-start gap-1 w-full">
          <div className="flex flex-col items-start w-full">
            <p className="text-[#1E293B] font-nimbusSans text-2xl font-bold leading-8 w-full">
              Non-Disclosure Agreement &#40;NDA&#41;
            </p>
          </div>
          <div className="flex flex-col items-start w-full">
            <p className="text-[#6B7280] font-nimbusSans text-sm leading-5 w-full">
              View and download your Non-Disclosure Agreement.
            </p>
          </div>
        </div>
        <div className="flex w-full gap-6 items-start">
          <div className="flex flex-col items-start w-[640px] shrink-0">
            <div className="flex flex-col items-start rounded-2xl border border-[#F3F4F6] bg-[#FFF] shadow-[01px2px0rgba(0,0,0,0.05)] w-full overflow-hidden">
              <div className="flex p-4 justify-between items-center border-b border-b-[#F3F4F6] w-full">
                <div className="flex flex-col items-start w-fit">
                  <p className="text-[#5A18EE] font-nimbusSans text-sm font-bold leading-5 w-fit">
                    NDA Document
                  </p>
                </div>
                <div className="flex py-2 px-5 items-center gap-2 rounded-lg bg-[#5A18EE] w-fit">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="flex flex-col items-center w-fit "
                  >
                    <path
                      d="M6.75 0.75C6.75 0.53125 6.67969 0.351562 6.53906 0.210938C6.39844 0.0703125 6.21875 0 6 0C5.78125 0 5.60156 0.0703125 5.46094 0.210938C5.32031 0.351562 5.25 0.53125 5.25 0.75V6.44531L3.53906 4.71094C3.38281 4.57031 3.20312 4.5 3 4.5C2.79688 4.5 2.61719 4.57031 2.46094 4.71094C2.32031 4.86719 2.25 5.04688 2.25 5.25C2.25 5.45312 2.32031 5.63281 2.46094 5.78906L5.46094 8.78906C5.61719 8.92969 5.79688 9 6 9C6.20312 9 6.38281 8.92969 6.53906 8.78906L9.53906 5.78906C9.67969 5.63281 9.75 5.45312 9.75 5.25C9.75 5.04688 9.67969 4.86719 9.53906 4.71094C9.38281 4.57031 9.20312 4.5 9 4.5C8.79688 4.5 8.61719 4.57031 8.46094 4.71094L6.75 6.44531V0.75ZM1.5 8.25C1.07812 8.26562 0.726562 8.41406 0.445312 8.69531C0.164062 8.97656 0.015625 9.32812 0 9.75V10.5C0.015625 10.9219 0.164062 11.2734 0.445312 11.5547C0.726562 11.8359 1.07812 11.9844 1.5 12H10.5C10.9219 11.9844 11.2734 11.8359 11.5547 11.5547C11.8359 11.2734 11.9844 10.9219 12 10.5V9.75C11.9844 9.32812 11.8359 8.97656 11.5547 8.69531C11.2734 8.41406 10.9219 8.26562 10.5 8.25H8.13281L7.05469 9.30469C6.74219 9.60156 6.39062 9.75 6 9.75C5.59375 9.75 5.24219 9.60156 4.94531 9.30469L3.89062 8.25H1.5ZM10.125 9.5625C10.4688 9.59375 10.6562 9.78125 10.6875 10.125C10.6562 10.4688 10.4688 10.6562 10.125 10.6875C9.78125 10.6562 9.59375 10.4688 9.5625 10.125C9.59375 9.78125 9.78125 9.59375 10.125 9.5625Z"
                      fill="white"
                    />
                  </svg>
                  <p className="text-[#FFF] font-nimbusSans text-xs font-semibold leading-4 w-fit">
                    Download NDA
                  </p>
                </div>
              </div>
              <div className="flex p-1 flex-col items-start bg-[#F1F5F9] w-full">
                <div className="flex p-2 justify-between items-center rounded-sm bg-[#1E293B] w-full">
                  <div className="flex py-0 px-2 items-center gap-4 w-fit">
                    <svg
                      width="13"
                      height="11"
                      viewBox="0 0 13 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex flex-col items-start opacity-70 w-fit "
                    >
                      <g opacity="0.7">
                        <path
                          d="M0 0.875C0 0.619792 0.0820312 0.410156 0.246094 0.246094C0.410156 0.0820312 0.619792 0 0.875 0H11.375C11.6302 0 11.8398 0.0820312 12.0039 0.246094C12.168 0.410156 12.25 0.619792 12.25 0.875C12.25 1.13021 12.168 1.33984 12.0039 1.50391C11.8398 1.66797 11.6302 1.75 11.375 1.75H0.875C0.619792 1.75 0.410156 1.66797 0.246094 1.50391C0.0820312 1.33984 0 1.13021 0 0.875ZM0 5.25C0 4.99479 0.0820312 4.78516 0.246094 4.62109C0.410156 4.45703 0.619792 4.375 0.875 4.375H11.375C11.6302 4.375 11.8398 4.45703 12.0039 4.62109C12.168 4.78516 12.25 4.99479 12.25 5.25C12.25 5.50521 12.168 5.71484 12.0039 5.87891C11.8398 6.04297 11.6302 6.125 11.375 6.125H0.875C0.619792 6.125 0.410156 6.04297 0.246094 5.87891C0.0820312 5.71484 0 5.50521 0 5.25ZM12.25 9.625C12.25 9.88021 12.168 10.0898 12.0039 10.2539C11.8398 10.418 11.6302 10.5 11.375 10.5H0.875C0.619792 10.5 0.410156 10.418 0.246094 10.2539C0.0820312 10.0898 0 9.88021 0 9.625C0 9.36979 0.0820312 9.16016 0.246094 8.99609C0.410156 8.83203 0.619792 8.75 0.875 8.75H11.375C11.6302 8.75 11.8398 8.83203 12.0039 8.99609C12.168 9.16016 12.25 9.36979 12.25 9.625Z"
                          fill="white"
                        />
                      </g>
                    </svg>
                    <div className="flex py-0.5 px-2 items-center gap-2 rounded bg-[#334155] w-fit">
                      <div className="flex flex-col items-start w-fit">
                        <p className="text-[#FFF] font-nimbusSans text-xs leading-4 w-fit">
                          1
                        </p>
                      </div>
                      <p className="text-[#FFF] font-nimbusSans text-xs leading-4 w-fit">
                        &#x2F;
                      </p>
                      <div className="flex flex-col items-start w-fit">
                        <p className="text-[#FFF] font-nimbusSans text-xs leading-4 w-fit">
                          5
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 w-fit">
                    <div className="flex py-0 px-4 items-center gap-3 border-r border-r-[#334155] border-l border-l-[#334155] w-fit">
                      <svg
                        width="10"
                        height="2"
                        viewBox="0 0 10 2"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="flex flex-col items-start w-fit "
                      >
                        <path
                          d="M9.75 0.75C9.75 0.96875 9.67969 1.14844 9.53906 1.28906C9.39844 1.42969 9.21875 1.5 9 1.5H0.75C0.53125 1.5 0.351562 1.42969 0.210938 1.28906C0.0703125 1.14844 0 0.96875 0 0.75C0 0.53125 0.0703125 0.351562 0.210938 0.210938C0.351562 0.0703125 0.53125 0 0.75 0H9C9.21875 0 9.39844 0.0703125 9.53906 0.210938C9.67969 0.351562 9.75 0.53125 9.75 0.75Z"
                          fill="white"
                        />
                      </svg>
                      <div className="flex py-0.5 px-3 flex-col items-start rounded bg-[#334155] w-fit">
                        <p className="text-[#FFF] font-nimbusSans text-xs leading-4 w-fit">
                          100%
                        </p>
                      </div>
                      <div className="flex flex-col items-start w-fit">
                        <p className="text-[#FFF] font-fontAwesome5Free text-xs font-black leading-4 w-fit">
                          +
                        </p>
                      </div>
                    </div>
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 11 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex flex-col items-start w-fit "
                    >
                      <path
                        d="M0.75 0C0.53125 0 0.351562 0.0703125 0.210938 0.210938C0.0703125 0.351562 0 0.53125 0 0.75V3C0 3.21875 0.0703125 3.39844 0.210938 3.53906C0.351562 3.67969 0.53125 3.75 0.75 3.75C0.96875 3.75 1.14844 3.67969 1.28906 3.53906C1.42969 3.39844 1.5 3.21875 1.5 3V1.5H3C3.21875 1.5 3.39844 1.42969 3.53906 1.28906C3.67969 1.14844 3.75 0.96875 3.75 0.75C3.75 0.53125 3.67969 0.351562 3.53906 0.210938C3.39844 0.0703125 3.21875 0 3 0H0.75ZM1.5 7.5C1.5 7.28125 1.42969 7.10156 1.28906 6.96094C1.14844 6.82031 0.96875 6.75 0.75 6.75C0.53125 6.75 0.351562 6.82031 0.210938 6.96094C0.0703125 7.10156 0 7.28125 0 7.5V9.75C0 9.96875 0.0703125 10.1484 0.210938 10.2891C0.351562 10.4297 0.53125 10.5 0.75 10.5H3C3.21875 10.5 3.39844 10.4297 3.53906 10.2891C3.67969 10.1484 3.75 9.96875 3.75 9.75C3.75 9.53125 3.67969 9.35156 3.53906 9.21094C3.39844 9.07031 3.21875 9 3 9H1.5V7.5ZM7.5 0C7.28125 0 7.10156 0.0703125 6.96094 0.210938C6.82031 0.351562 6.75 0.53125 6.75 0.75C6.75 0.96875 6.82031 1.14844 6.96094 1.28906C7.10156 1.42969 7.28125 1.5 7.5 1.5H9V3C9 3.21875 9.07031 3.39844 9.21094 3.53906C9.35156 3.67969 9.53125 3.75 9.75 3.75C9.96875 3.75 10.1484 3.67969 10.2891 3.53906C10.4297 3.39844 10.5 3.21875 10.5 3V0.75C10.5 0.53125 10.4297 0.351562 10.2891 0.210938C10.1484 0.0703125 9.96875 0 9.75 0H7.5ZM10.5 7.5C10.5 7.28125 10.4297 7.10156 10.2891 6.96094C10.1484 6.82031 9.96875 6.75 9.75 6.75C9.53125 6.75 9.35156 6.82031 9.21094 6.96094C9.07031 7.10156 9 7.28125 9 7.5V9H7.5C7.28125 9 7.10156 9.07031 6.96094 9.21094C6.82031 9.35156 6.75 9.53125 6.75 9.75C6.75 9.96875 6.82031 10.1484 6.96094 10.2891C7.10156 10.4297 7.28125 10.5 7.5 10.5H9.75C9.96875 10.5 10.1484 10.4297 10.2891 10.2891C10.4297 10.1484 10.5 9.96875 10.5 9.75V7.5Z"
                        fill="white"
                      />
                    </svg>
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 11 11"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex flex-col items-start w-fit "
                    >
                      <path
                        d="M10.125 4.5H10.3125C10.6562 4.46875 10.8438 4.28125 10.875 3.9375V0.9375C10.8594 0.6875 10.7422 0.515625 10.5234 0.421875C10.3047 0.328125 10.1016 0.367188 9.91406 0.539062L8.92969 1.52344C8.24219 0.835938 7.45312 0.382812 6.5625 0.164062C5.67188 -0.0546875 4.78906 -0.0546875 3.91406 0.164062C3.02344 0.398438 2.23438 0.859375 1.54688 1.54688C0.859375 2.23438 0.398438 3.02344 0.164062 3.91406C-0.0546875 4.80469 -0.0546875 5.69531 0.164062 6.58594C0.398438 7.47656 0.859375 8.26562 1.54688 8.95312C2.23438 9.64062 3.02344 10.1016 3.91406 10.3359C4.80469 10.5547 5.69531 10.5547 6.58594 10.3359C7.47656 10.1016 8.26562 9.64062 8.95312 8.95312C9.10938 8.8125 9.1875 8.64062 9.1875 8.4375C9.1875 8.23438 9.10938 8.05469 8.95312 7.89844C8.8125 7.75781 8.64062 7.6875 8.4375 7.6875C8.23438 7.6875 8.05469 7.75781 7.89844 7.89844C7.13281 8.63281 6.25 9 5.25 9C4.25 9 3.36719 8.63281 2.60156 7.89844C1.86719 7.13281 1.5 6.25 1.5 5.25C1.5 4.25 1.86719 3.36719 2.60156 2.60156C3.36719 1.86719 4.24219 1.5 5.22656 1.5C6.22656 1.5 7.10938 1.85938 7.875 2.57812L6.91406 3.53906C6.74219 3.72656 6.70312 3.92969 6.79688 4.14844C6.89062 4.36719 7.0625 4.48438 7.3125 4.5H10.125Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                  <div className="flex py-0 px-2 items-center gap-4 w-fit">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex flex-col items-start opacity-70 w-fit "
                    >
                      <g opacity="0.7">
                        <path
                          d="M7.875 0.875C7.875 0.619792 7.79297 0.410156 7.62891 0.246094C7.46484 0.0820312 7.25521 0 7 0C6.74479 0 6.53516 0.0820312 6.37109 0.246094C6.20703 0.410156 6.125 0.619792 6.125 0.875V7.51953L4.12891 5.49609C3.94661 5.33203 3.73698 5.25 3.5 5.25C3.26302 5.25 3.05339 5.33203 2.87109 5.49609C2.70703 5.67839 2.625 5.88802 2.625 6.125C2.625 6.36198 2.70703 6.57161 2.87109 6.75391L6.37109 10.2539C6.55339 10.418 6.76302 10.5 7 10.5C7.23698 10.5 7.44661 10.418 7.62891 10.2539L11.1289 6.75391C11.293 6.57161 11.375 6.36198 11.375 6.125C11.375 5.88802 11.293 5.67839 11.1289 5.49609C10.9466 5.33203 10.737 5.25 10.5 5.25C10.263 5.25 10.0534 5.33203 9.87109 5.49609L7.875 7.51953V0.875ZM1.75 9.625C1.25781 9.64323 0.847656 9.81641 0.519531 10.1445C0.191406 10.4727 0.0182292 10.8828 0 11.375V12.25C0.0182292 12.7422 0.191406 13.1523 0.519531 13.4805C0.847656 13.8086 1.25781 13.9818 1.75 14H12.25C12.7422 13.9818 13.1523 13.8086 13.4805 13.4805C13.8086 13.1523 13.9818 12.7422 14 12.25V11.375C13.9818 10.8828 13.8086 10.4727 13.4805 10.1445C13.1523 9.81641 12.7422 9.64323 12.25 9.625H9.48828L8.23047 10.8555C7.86589 11.2018 7.45573 11.375 7 11.375C6.52604 11.375 6.11589 11.2018 5.76953 10.8555L4.53906 9.625H1.75ZM11.8125 11.1562C12.2135 11.1927 12.4323 11.4115 12.4688 11.8125C12.4323 12.2135 12.2135 12.4323 11.8125 12.4688C11.4115 12.4323 11.1927 12.2135 11.1562 11.8125C11.1927 11.4115 11.4115 11.1927 11.8125 11.1562Z"
                          fill="white"
                        />
                      </g>
                    </svg>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex flex-col items-start opacity-70 w-fit "
                    >
                      <g opacity="0.7">
                        <path
                          d="M3.5 0C3.00781 0.0182292 2.59766 0.191406 2.26953 0.519531C1.94141 0.847656 1.76823 1.25781 1.75 1.75V4.375H3.5V1.75H9.70703L10.5 2.54297V4.375H12.25V2.54297C12.25 2.06901 12.0768 1.65885 11.7305 1.3125L10.9375 0.519531C10.5911 0.173177 10.181 0 9.70703 0H3.5ZM10.5 9.625V10.5V12.25H3.5V10.5V10.0625V9.625H10.5ZM12.25 10.5H13.125C13.3802 10.5 13.5898 10.418 13.7539 10.2539C13.918 10.0898 14 9.88021 14 9.625V7C13.9818 6.50781 13.8086 6.09766 13.4805 5.76953C13.1523 5.44141 12.7422 5.26823 12.25 5.25H1.75C1.25781 5.26823 0.847656 5.44141 0.519531 5.76953C0.191406 6.09766 0.0182292 6.50781 0 7V9.625C0 9.88021 0.0820312 10.0898 0.246094 10.2539C0.410156 10.418 0.619792 10.5 0.875 10.5H1.75V12.25C1.76823 12.7422 1.94141 13.1523 2.26953 13.4805C2.59766 13.8086 3.00781 13.9818 3.5 14H10.5C10.9922 13.9818 11.4023 13.8086 11.7305 13.4805C12.0586 13.1523 12.2318 12.7422 12.25 12.25V10.5ZM11.8125 6.78125C12.2135 6.81771 12.4323 7.03646 12.4688 7.4375C12.4323 7.83854 12.2135 8.05729 11.8125 8.09375C11.4115 8.05729 11.1927 7.83854 11.1562 7.4375C11.1927 7.03646 11.4115 6.81771 11.8125 6.78125Z"
                          fill="white"
                        />
                      </g>
                    </svg>
                    <svg
                      width="4"
                      height="12"
                      viewBox="0 0 4 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex flex-col items-start opacity-70 w-fit "
                    >
                      <g opacity="0.7">
                        <path
                          d="M1.53125 8.75C0.947917 8.76823 0.510417 9.02344 0.21875 9.51562C-0.0729167 10.026 -0.0729167 10.5365 0.21875 11.0469C0.510417 11.5391 0.947917 11.7943 1.53125 11.8125C2.11458 11.7943 2.55208 11.5391 2.84375 11.0469C3.13542 10.5365 3.13542 10.026 2.84375 9.51562C2.55208 9.02344 2.11458 8.76823 1.53125 8.75ZM1.53125 4.375C0.947917 4.39323 0.510417 4.64844 0.21875 5.14062C-0.0729167 5.65104 -0.0729167 6.16146 0.21875 6.67188C0.510417 7.16406 0.947917 7.41927 1.53125 7.4375C2.11458 7.41927 2.55208 7.16406 2.84375 6.67188C3.13542 6.16146 3.13542 5.65104 2.84375 5.14062C2.55208 4.64844 2.11458 4.39323 1.53125 4.375ZM3.0625 1.53125C3.04427 0.947917 2.78906 0.510417 2.29688 0.21875C1.78646 -0.0729167 1.27604 -0.0729167 0.765625 0.21875C0.273438 0.510417 0.0182292 0.947917 0 1.53125C0.0182292 2.11458 0.273438 2.55208 0.765625 2.84375C1.27604 3.13542 1.78646 3.13542 2.29688 2.84375C2.78906 2.55208 3.04427 2.11458 3.0625 1.53125Z"
                          fill="white"
                        />
                      </g>
                    </svg>
                  </div>
                </div>
                <div className="flex max-h-[800px] p-8 justify-center items-start bg-[#64748B] w-full h-[800px]">
                  <div className="flex max-w-[896px] min-h-[1000px] p-12 flex-col items-start gap-8 bg-[#FFF] w-full h-[1000px] relative">
                    <div className="absolute bg-[rgba(255,255,255,0.00)] shadow-[020px25px-5pxrgba(0,0,0,0.10),08px10px-6pxrgba(0,0,0,0.10)] w-[638px] h-[1000px]"></div>
                    <div className="flex pb-4 justify-between items-start w-full">
                      <div className="flex flex-col items-start gap-1 w-fit">
                        <div className="flex flex-col items-start w-full">
                          <p className="font-nimbusSans text-3xl font-bold leading-9 w-fit">
                            <span className="text-[#5A18EE]">Ze</span><span className="text-[#191C1E]">AI</span>
                          </p>
                        </div>
                        <div className="flex flex-col items-start w-full">
                          <p className="text-[#94A3B8] font-nimbusSans text-[10px] leading-[15px] w-fit tracking-[0.1em]">
                            EMPOWERING YOU
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-start w-fit">
                        <div className="flex flex-col items-end w-full">
                          <p className="text-[#1E293B] font-nimbusSans text-xs font-bold leading-4 w-fit">
                            ZeAI Soft Pvt. Ltd.
                          </p>
                        </div>
                        <div className="flex flex-col items-end w-full">
                          <p className="text-[#475569] font-nimbusSans text-[10px] leading-[15px] w-fit">
                            123 Innovation Drive, Suite 400
                          </p>
                        </div>
                        <div className="flex flex-col items-end w-full">
                          <p className="text-[#475569] font-nimbusSans text-[10px] leading-[15px] w-fit">
                            San Francisco, CA 94107, USA
                          </p>
                        </div>
                        <div className="flex flex-col items-end w-full">
                          <p className="text-[#5A18EE] font-nimbusSans text-[10px] font-medium leading-[15px] w-fit">
                            www.zeaisoft.com
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="shrink-0 border-t-2 border-t-[rgba(90,24,238,0.20)] w-full h-0.5"></div>
                    <div className="flex flex-col items-center w-full">
                      <p className="text-[#1E293B] font-nimbusSans text-base font-bold leading-6 w-fit">
                        NON-DISCLOSURE AGREEMENT &#40;NDA&#41;
                      </p>
                    </div>
                    <div className="flex flex-col items-start gap-6 w-full">
                      <div className="w-full h-[91px] relative">
                        <p className="text-[#334155] font-nimbusSans text-sm leading-[22.75px] w-[470px] h-[23px] absolute left-0 -top-px">
                          This Non-Disclosure Agreement
                          &#40;&quot;Agreement&quot;&#41; is made and entered
                          into on{" "}
                        </p>
                        <div className="w-[517px] h-[37px] absolute left-0 top-1">
                          <p className="text-[#334155] font-nimbusSans text-sm font-bold leading-[22.75px] w-[47px] h-[23px] absolute left-[470px] -top-[5px]">
                            Oct 24,
                          </p>
                          <p className="text-[#334155] font-nimbusSans text-sm font-bold leading-[22.75px] w-[31px] h-[23px] absolute left-0 top-[18px]">
                            2024
                          </p>
                        </div>
                        <p className="text-[#334155] font-nimbusSans text-sm font-bold leading-[22.75px] w-[499px] h-[23px] absolute left-[31px] top-[22px]">
                          , by and between ZeAI Soft Pvt. Ltd., a company
                          incorporated under the laws of
                        </p>
                        <p className="text-[#334155] font-nimbusSans text-sm leading-[22.75px] w-[291px] h-[23px] absolute left-0 top-[45px]">
                          California, USA, having its registered office at{" "}
                        </p>
                        <div className="w-[529px] h-[37px] absolute left-0 top-[50px]">
                          <p className="text-[#334155] font-nimbusSans text-sm font-bold leading-[22.75px] w-[239px] h-[23px] absolute left-[291px] -top-[5px]">
                            123 Innovation Drive, Suite 400, San
                          </p>
                          <p className="text-[#334155] font-nimbusSans text-sm font-bold leading-[22.75px] w-[173px] h-[23px] absolute left-0 top-[18px]">
                            Francisco, CA 94107, USA
                          </p>
                        </div>
                        <p className="text-[#334155] font-nimbusSans text-sm font-bold leading-[22.75px] w-[278px] h-[23px] absolute left-[173px] top-[68px]">
                          {" "}
                          &#40;&quot;Company&quot;&#41; and {employee?.full_name || "Alex Rivera"}
                          &#40;&quot;Employee&quot;&#41;.
                        </p>
                      </div>
                      <div className="flex flex-col items-start gap-[7px] w-full">
                        <div className="flex flex-col items-start w-full">
                          <p className="text-[#1E40AF] font-nimbusSans text-xs font-bold leading-4 w-full">
                            1. PURPOSE
                          </p>
                        </div>
                        <div className="flex flex-col items-start w-full">
                          <p className="text-[#334155] font-nimbusSans text-sm leading-[22.75px] w-full">
                            The purpose of this Agreement is to protect the
                            confidential and proprietary information of the
                            Company and to establish the terms and conditions
                            under which such information will be disclosed to
                            the Employee.
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-start gap-2 w-full">
                        <div className="flex flex-col items-start w-full">
                          <p className="text-[#1E40AF] font-nimbusSans text-xs font-bold leading-4 w-full">
                            2. CONFIDENTIAL INFORMATION
                          </p>
                        </div>
                        <div className="w-full h-[114px] relative">
                          <p className="text-[#334155] font-nimbusSans text-sm leading-[22.75px] w-[516px] h-[23px] absolute left-0 -top-px">
                            &quot;Confidential Information&quot; means any and
                            all information or data, in any form, that is
                          </p>
                          <p className="text-[#334155] font-nimbusSans text-sm font-bold leading-[22.75px] w-[541px] h-[46px] absolute left-0 top-[22px]">
                            disclosed by the Company to the Employee, either
                            directly or indirectly, including but not limited to
                          </p>
                          <p className="text-[#334155] font-nimbusSans text-sm leading-[22.75px] w-[391px] h-[23px] absolute left-[113px] top-[45px]">
                            {" "}
                            business plans, technical data, customer lists,
                            pricing, designs,
                          </p>
                          <p className="text-[#334155] font-nimbusSans text-sm font-bold leading-[22.75px] w-[491px] h-[46px] absolute left-0 top-[68px]">
                            processes, and any other information that is either
                            marked confidential or would reasonably be
                            considered confidential.
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-start gap-[7px] w-full">
                        <div className="flex flex-col items-start w-full">
                          <p className="text-[#1E40AF] font-nimbusSans text-xs font-bold leading-4 w-full">
                            3. OBLIGATIONS OF EMPLOYEE
                          </p>
                        </div>
                        <div className="flex pt-px flex-col items-start w-full">
                          <p className="text-[#334155] font-nimbusSans text-sm leading-[22.75px] w-full">
                            The Employee agrees to:
                          </p>
                        </div>
                        <div className="flex flex-col items-start gap-[7px] w-full">
                          <div className="flex flex-col items-start w-full">
                            <p className="text-[#334155] font-nimbusSans text-sm leading-[22.75px] w-full">
                              3.1. Maintain the confidentiality of the
                              Confidential Information and not disclose it to
                              any third party without prior written consent from
                              the Company.
                            </p>
                          </div>
                          <div className="flex flex-col items-start w-full">
                            <p className="text-[#334155] font-nimbusSans text-sm leading-[22.75px] w-full">
                              3.2. Use the Confidential Information solely for
                              the purpose of performing duties for the Company.
                            </p>
                          </div>
                          <div className="flex flex-col items-start w-full">
                            <p className="text-[#334155] font-nimbusSans text-sm leading-[22.75px] w-full">
                              3.3. Take all reasonable measures to protect the
                              Confidential Information from unauthorized use or
                              disclosure.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start gap-6 w-[320px] shrink-0">
            <div className="flex p-6 flex-col items-start gap-6 rounded-2xl border border-[#F3F4F6] bg-[#FFF] shadow-[01px2px0rgba(0,0,0,0.05)] w-full">
              <div className="flex flex-col items-start w-full">
                <p className="text-[#1E293B] font-nimbusSans text-base font-bold leading-6 w-full">
                  NDA Information
                </p>
              </div>
              <div className="flex flex-col items-start gap-4 w-full">
                <div className="flex items-start gap-4 w-full">
                  <div className="flex justify-center items-center rounded-lg bg-[#EEF2FF] w-8 h-8">
                    <svg
                      width="13"
                      height="14"
                      viewBox="0 0 13 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex flex-col items-start w-fit "
                    >
                      <path
                        d="M8.3125 3.5C8.29427 2.67969 7.92969 2.05078 7.21875 1.61328C6.48958 1.21224 5.76042 1.21224 5.03125 1.61328C4.32031 2.05078 3.95573 2.67969 3.9375 3.5C3.95573 4.32031 4.32031 4.94922 5.03125 5.38672C5.76042 5.78776 6.48958 5.78776 7.21875 5.38672C7.92969 4.94922 8.29427 4.32031 8.3125 3.5ZM2.625 3.5C2.625 2.86198 2.77995 2.27865 3.08984 1.75C3.39974 1.22135 3.82812 0.792969 4.375 0.464844C4.92188 0.154948 5.50521 0 6.125 0C6.74479 0 7.32812 0.154948 7.875 0.464844C8.42188 0.792969 8.85026 1.22135 9.16016 1.75C9.47005 2.27865 9.625 2.86198 9.625 3.5C9.625 4.13802 9.47005 4.72135 9.16016 5.25C8.85026 5.77865 8.42188 6.20703 7.875 6.53516C7.32812 6.84505 6.74479 7 6.125 7C5.50521 7 4.92188 6.84505 4.375 6.53516C3.82812 6.20703 3.39974 5.77865 3.08984 5.25C2.77995 4.72135 2.625 4.13802 2.625 3.5ZM1.33984 12.6875H10.9102C10.7643 11.7943 10.3724 11.0651 9.73438 10.5C9.07812 9.9349 8.29427 9.64323 7.38281 9.625H4.86719C3.95573 9.64323 3.18099 9.9349 2.54297 10.5C1.88672 11.0651 1.48568 11.7943 1.33984 12.6875ZM0 13.1797C0.0364583 11.8125 0.510417 10.6641 1.42188 9.73438C2.35156 8.82292 3.5 8.34896 4.86719 8.3125H7.38281C8.75 8.34896 9.89844 8.82292 10.8281 9.73438C11.7396 10.6641 12.2135 11.8125 12.25 13.1797C12.25 13.4167 12.168 13.6081 12.0039 13.7539C11.8581 13.918 11.6667 14 11.4297 14H0.820312C0.583333 14 0.391927 13.918 0.246094 13.7539C0.0820312 13.6081 0 13.4167 0 13.1797Z"
                        fill="#5A18EE"
                      />
                    </svg>
                  </div>
                  <div className="flex pb-2 flex-col items-start border-b border-b-[#F9FAFB] w-full">
                    <div className="flex flex-col items-start w-full">
                      <p className="text-[#9CA3AF] font-nimbusSans text-[10px] font-medium leading-[15px] w-full">
                        Employee Name
                      </p>
                    </div>
                    <div className="flex flex-col items-start w-full">
                      <p className="text-[#334155] font-nimbusSans text-sm font-semibold leading-5 w-full">
                        {employee?.full_name || "Alex Rivera"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4 w-full">
                                    <div className="flex justify-center items-center rounded-lg bg-[#EEF2FF] w-8 h-8">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex flex-col items-start w-fit"
                    >
                      <path
                        d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM12 6C13.66 6 15 7.34 15 9C15 10.66 13.66 12 12 12C10.34 12 9 10.66 9 9C9 7.34 10.34 6 12 6ZM18 18H6V16.5C6 14.5 10 13.4 12 13.4C14 13.4 18 14.5 18 16.5V18Z"
                        fill="#5A18EE"
                      />
                    </svg>
                  </div>
                  <div className="flex pb-2 flex-col items-start border-b border-b-[#F9FAFB] w-full">
                    <div className="flex flex-col items-start w-full">
                      <p className="text-[#9CA3AF] font-nimbusSans text-[10px] font-medium leading-[15px] w-full">
                        Employee ID
                      </p>
                    </div>
                    <div className="flex flex-col items-start w-full">
                      <p className="text-[#334155] font-nimbusSans text-sm font-semibold leading-5 w-full">
                        {employee?.employee_id || "EMP-2048"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4 w-full">
                  <div className="flex justify-center items-center rounded-lg bg-[#EEF2FF] w-8 h-8">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex flex-col items-start w-fit"
                    >
                      <path
                        d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2ZM12 18C9.79 18 8 16.21 8 14C8 11.79 9.79 10 12 10C14.21 10 16 11.79 16 14C16 16.21 14.21 18 12 18Z"
                        fill="#5A18EE"
                      />
                    </svg>
                  </div>
                  <div className="flex pb-2 flex-col items-start border-b border-b-[#F9FAFB] w-full">
                    <div className="flex flex-col items-start w-full">
                      <p className="text-[#9CA3AF] font-nimbusSans text-[10px] font-medium leading-[15px] w-full">
                        Document Type
                      </p>
                    </div>
                    <div className="flex flex-col items-start w-full">
                      <p className="text-[#334155] font-nimbusSans text-sm font-semibold leading-5 w-full">
                        Non-Disclosure Agreement
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4 w-full">
                  <div className="flex justify-center items-center rounded-lg bg-[#EEF2FF] w-8 h-8">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex flex-col items-start w-fit"
                    >
                      <path
                        d="M19 4H18V2H16V4H8V2H6V4H5C3.89 4 3.01 4.9 3.01 6L3 20C3 21.1 3.89 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM19 20H5V10H19V20ZM9 14H7V12H9V14ZM13 14H11V12H13V14ZM17 14H15V12H15V14Z"
                        fill="#5A18EE"
                      />
                    </svg>
                  </div>
                  <div className="flex pb-2 flex-col items-start border-b border-b-[#F9FAFB] w-full">
                    <div className="flex flex-col items-start w-full">
                      <p className="text-[#9CA3AF] font-nimbusSans text-[10px] font-medium leading-[15px] w-full">
                        Effective Date
                      </p>
                    </div>
                    <div className="flex flex-col items-start w-full">
                      <p className="text-[#334155] font-nimbusSans text-sm font-semibold leading-5 w-full">
                        Oct 24, 2024
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-4 w-full">
                  <div className="flex justify-center items-center rounded-lg bg-[#EEF2FF] w-8 h-8">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex flex-col items-start w-fit"
                    >
                      <path
                        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"
                        fill="#006C49"
                      />
                    </svg>
                  </div>
                  <div className="flex pb-2 flex-col items-start w-full">
                    <div className="flex flex-col items-start w-full">
                      <p className="text-[#9CA3AF] font-nimbusSans text-[10px] font-medium leading-[15px] w-full">
                        Status
                      </p>
                    </div>
                    <div className="flex flex-col items-start w-full">
                      <span className="text-[#006C49] font-nimbusSans text-xs font-bold leading-5">
                        SIGNED
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
}
