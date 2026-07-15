import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { employeeAPI } from "../../services/api";
import logo from "../../assets/logos/logo.png";
export default function Handbook() {
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
  const [activeSection, setActiveSection] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [acknowledged, setAcknowledged] = useState({});

  useEffect(() => {
    // Inject Tailwind CSS Play CDN script
    const script = document.createElement("script");
    script.src = "https://cdn.tailwindcss.com";
    script.id = "tailwind-cdn-script-handbook";
    document.head.appendChild(script);

    // Inject fonts
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=Hanken+Grotesk:wght@400;500;700&family=Manrope:wght@400;500;700&family=Material+Icons&display=swap";
    link.rel = "stylesheet";
    link.id = "emphandbook-fonts";
    document.head.appendChild(link);

    return () => {
      // Clean up script
      const el = document.getElementById("tailwind-cdn-script-handbook");
      if (el) el.remove();

      // Clean up fonts
      const f = document.getElementById("emphandbook-fonts");
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

  const chapters = [
    {
      id: 2,
      title: "2. About ZeAi Soft",
      description: "Learn more about our company, mission, vision and journey.",
      iconPath: "M0 13.5V0H7.5V3H15V13.5H0ZM1.5 12H3V10.5H1.5V12ZM1.5 9H3V7.5H1.5V9ZM1.5 6H3V4.5H1.5V6ZM1.5 3H3V1.5H1.5V3ZM4.5 12H6V10.5H4.5V12ZM4.5 9H6V7.5H4.5V9ZM4.5 6H6V4.5H4.5V6ZM4.5 3H6V1.5H4.5V3ZM7.5 12H13.5V4.5H7.5V6H9V7.5H7.5V9H9V10.5H7.5V12ZM10.5 7.5V6H12V7.5H10.5ZM10.5 10.5V9H12V10.5H10.5Z",
      viewBox: "0 0 15 14",
      content: `ZeAi Soft was founded with a clear vision: to empower businesses through advanced artificial intelligence and automation technologies. Over the years, we have grown from a small group of passionate engineers to a global team of developers, researchers, and product experts.

Our mission is to build intelligent software solutions that simplify complex processes, enhance human creativity, and drive sustainable growth. We believe in innovation, transparency, and collaboration as our core driving forces.`,
      bullets: [
        "Founded in 2021 with headquarters in San Francisco, CA.",
        "Committed to building ethical, secure, and user-centric AI solutions.",
        "Serving over 500+ corporate clients globally across multiple industries."
      ]
    },
    {
      id: 3,
      title: "3. Our Values",
      description: "The core values that define who we are and how we work.",
      iconPath: "M7.5 13.5L0 4.5L2.25 0H12.75L15 4.5L7.5 13.5ZM5.71875 3.75H9.28125L8.15625 1.5H6.84375L5.71875 3.75ZM6.75 10.2563V5.25H2.5875L6.75 10.2563ZM8.25 10.2563L12.4125 5.25H8.25V10.2563ZM10.95 3.75H12.9375L11.8125 1.5H9.825L10.95 3.75ZM2.0625 3.75H4.05L5.175 1.5H3.1875L2.0625 3.75Z",
      viewBox: "0 0 15 14",
      content: `At ZeAi Soft, our culture is shaped by three main values: Integrity, Innovation, and Inclusivity. We aim to foster an environment where everyone can speak up, experiment with bold ideas, and take ownership of their professional development.

We treat all team members, clients, and partners with respect. We hold ourselves to high ethical standards and prioritize quality and accuracy in every line of code we write and every product we design.`,
      bullets: [
        "Innovation: We constantly push the boundaries of what is possible.",
        "Collaboration: We work together across departments to achieve greatness.",
        "Ownership: We take responsibility for our results and impact."
      ]
    },
    {
      id: 4,
      title: "4. Work Culture",
      description: "Explore our collaborative work environment, diversity, and team bonding.",
      iconPath: "M0 9V7.81875C0 7.28125 0.275 6.84375 0.825 6.50625C1.375 6.16875 2.1 6 3 6C3.1625 6 3.31875 6.00313 3.46875 6.00938C3.61875 6.01562 3.7625 6.03125 3.9 6.05625C3.725 6.31875 3.59375 6.59375 3.50625 6.88125C3.41875 7.16875 3.375 7.46875 3.375 7.78125V9H0ZM4.5 9V7.78125C4.5 7.38125 4.60938 7.01562 4.82812 6.68437C5.04688 6.35312 5.35625 6.0625 5.75625 5.8125C6.15625 5.5625 6.63438 5.375 7.19063 5.25C7.74688 5.125 8.35 5.0625 9 5.0625C9.6625 5.0625 10.2719 5.125 10.8281 5.25C11.3844 5.375 11.8625 5.5625 12.2625 5.8125C12.6625 6.0625 12.9688 6.35312 13.1812 6.68437C13.3937 7.01562 13.5 7.78125V9H4.5ZM14.625 9V7.78125C14.625 7.45625 14.5844 7.15 14.5031 6.8625C14.4219 6.575 14.3 6.30625 14.1375 6.05625C14.275 6.03125 14.4156 6.01562 14.5594 6.00938C14.7031 6.00313 14.85 6 15 6C15.9 6 16.625 6.16562 17.175 6.49687C17.725 6.82812 18 7.26875 18 7.81875V9H14.625ZM6.09375 7.5H11.925C11.8 7.25 11.4531 7.03125 10.8844 6.84375C10.3156 6.65625 9.6875 6.5625 9 6.5625C8.3125 6.5625 7.68437 6.65625 7.11562 6.84375C6.54688 7.03125 6.20625 7.25 6.09375 7.5ZM3 5.25C2.5875 5.25 2.23438 5.10312 1.94062 4.80937C1.64687 4.51562 1.5 4.1625 1.5 3.75C1.5 3.325 1.64687 2.96875 1.94062 2.68125C2.23438 2.39375 2.5875 2.25 3 2.25C3.425 2.25 3.78125 2.39375 4.06875 2.68125C4.35625 2.96875 4.5 3.325 4.5 3.75C4.5 4.1625 4.35625 4.51562 4.06875 4.80937C3.78125 5.10312 3.425 5.25 3 5.25ZM15 5.25C14.5875 5.25 14.2344 5.10312 13.9406 4.80937C13.6469 4.51562 13.5 4.1625 13.5 3.75C13.5 3.325 13.6469 2.96875 13.9406 2.68125C14.2344 2.39375 14.5875 2.25 15 2.25C15.425 2.25 15.7812 2.39375 16.0688 2.68125C16.3563 2.96875 16.5 3.325 16.5 3.75C16.5 4.1625 16.3563 4.51562 16.0688 4.80937C15.7812 5.10312 15.425 5.25 15 5.25ZM9 4.5C8.375 4.5 7.84375 4.28125 7.40625 3.84375C6.96875 3.40625 6.75 2.875 6.75 2.25C6.75 1.6125 6.96875 1.07812 7.40625 0.646875C7.84375 0.215625 8.375 0 9 0C9.6375 0 10.1719 0.215625 10.6031 0.646875C11.0344 1.07812 11.25 1.6125 11.25 2.25C11.25 2.875 11.0344 3.40625 10.6031 3.84375C10.1719 4.28125 9.6375 4.5 9 4.5ZM9 3C9.2125 3 9.39062 2.92812 9.53438 2.78437C9.67813 2.64062 9.75 2.4625 9.75 2.25C9.75 2.0375 9.67813 1.85938 9.53438 1.71563C9.39062 1.57188 9.2125 1.5 9 1.5C8.7875 1.5 8.60938 1.57188 8.46562 1.71563C8.32187 1.85938 8.25 2.0375 8.25 2.25C8.25 2.4625 8.32187 2.64062 8.46562 2.78437C8.60938 2.92812 8.7875 3 9 3Z",
      viewBox: "0 0 18 9",
      content: `Our work culture centers around collaboration and open communication. We believe that diverse perspectives fuel creativity, and we actively work to create a space where everyone feels values and supported.

We prioritize a healthy work-life balance and offer flexible work hours, remote-friendly systems, and frequent team-building events to keep our team energized and connected.`,
      bullets: [
        "Flexible working arrangement tailored for productivity.",
        "Monthly virtual coffee breaks and periodic in-person meetups.",
        "Diversity and inclusion initiatives driven by employee resources."
      ]
    },
    {
      id: 5,
      title: "5. Code of Conduct",
      description: "Understand the standards of behavior and professional expectations.",
      iconPath: "M5.2125 10.1625L9.45 5.925L8.38125 4.85625L5.2125 8.025L3.6375 6.45L2.56875 7.51875L5.2125 10.1625ZM6 15C4.2625 14.5625 2.82812 13.5656 1.69687 12.0094C0.565625 10.4531 0 8.725 0 6.825V2.25L6 0L12 2.25V6.825C12 8.725 11.4344 10.4531 10.3031 12.0094C9.17188 13.5656 7.7375 14.5625 6 15ZM6 13.425C7.3 13.0125 8.375 12.1875 9.225 10.95C10.075 9.7125 10.5 8.3375 10.5 6.825V3.28125L6 1.59375L1.5 3.28125V6.825C1.5 8.3375 1.925 9.7125 2.775 10.95C3.625 12.1875 4.7 13.0125 6 13.425Z",
      viewBox: "0 0 12 15",
      content: `We expect all employees to maintain a professional, respectful, and productive demeanor. This code applies to all official company communications, public engagements, and social channels.

Any form of harassment, discrimination, or abusive behavior will not be tolerated. We urge all employees to resolve disputes constructively and escalate issues using the appropriate reporting pathways.`,
      bullets: [
        "Zero-tolerance policy for harassment or discrimination of any kind.",
        "Responsibility to maintain data security and follow company protocols.",
        "Expected adherence to high ethical standards in all client dealings."
      ]
    },
    {
      id: 6,
      title: "6. Attendance Policy",
      description: "Guidelines on working hours, punctuality, and attendance logging.",
      iconPath: "M5.9625 12.2625L3.3 9.6L4.3875 8.5125L5.9625 10.0875L9.1125 6.9375L10.2 8.025L5.9625 12.2625ZM1.5 15C1.0875 15 0.734375 14.8531 0.440625 14.5594C0.146875 14.2656 0 13.9125 0 13.5V3C0 2.5875 0.146875 2.23438 0.440625 1.94062C0.734375 1.64687 1.0875 1.5 1.5 1.5H2.25V0H3.75V1.5H9.75V0H11.25V1.5H12C12.4125 1.5 12.7656 1.64687 13.0594 1.94062C13.3531 2.23438 13.5 2.5875 13.5 3V13.5C13.5 13.9125 13.3531 14.2656 13.0594 14.5594C12.7656 14.8531 12.4125 15 12 15H1.5ZM1.5 13.5H12V6H1.5V13.5ZM1.5 4.5H12V3H1.5V4.5ZM1.5 4.5V3V4.5Z",
      viewBox: "0 0 14 15",
      content: `All employees are expected to log their daily working hours using the official HRMS portal. Standard work hours consist of 9 hours per day (inclusive of a lunch break), with core collaboration hours between 10:00 AM and 4:00 PM local time.

Punctuality and reliability are vital for our team dynamics. If you anticipate arriving late or being absent, you must notify your manager or update your status in the attendance portal in advance.`,
      bullets: [
        "Daily log-in and log-out required via the HRMS portal.",
        "Lateness post 9:00 AM (local time) must be communicated.",
        "Continuous unapproved absence may lead to review of contract."
      ]
    },
    {
      id: 7,
      title: "7. Leave Policy",
      description: "Details on annual, sick, casual, and other types of leaves.",
      iconPath: "M1.5 13.6125V12.1125H15V13.6125H1.5ZM2.8125 9.8625L0 5.175L1.8 4.6875L3.9 6.45L6.525 5.75625L2.64375 0.58125L4.81875 0L10.425 4.70625L13.6125 3.84375C14.0125 3.73125 14.3906 3.77813 14.7469 3.98438C15.1031 4.19063 15.3375 4.49375 15.45 4.89375C15.5625 5.29375 15.5156 5.67188 15.3094 6.02812C15.1031 6.38437 14.8 6.61875 14.4 6.73125L2.8125 9.8625Z",
      viewBox: "0 0 16 14",
      content: `ZeAi Soft provides competitive leave structures to allow ample rest, recovery, and personal time. Full-time employees are entitled to 24 days of paid leaves per year (broken down into casual, sick, and earned leaves).

All leave requests should be submitted at least 3 days in advance for planned leaves, and as soon as possible for unplanned sick leaves. Approvals are managed directly by your reporting line.`,
      bullets: [
        "Earned Leaves (EL): Accrue monthly; carry-forward limits apply.",
        "Sick Leaves (SL): Up to 8 days per year; medical certificate required for > 3 days.",
        "Maternity/Paternity leaves provided as per statutory guidelines."
      ]
    },
    {
      id: 8,
      title: "8. Benefits",
      description: "Overview of health insurance, wellness programs, and perks.",
      iconPath: "M1.5 11.25V12.75H13.5V11.25H1.5ZM1.5 3H3.15C3.0875 2.8875 3.04688 2.76875 3.02813 2.64375C3.00938 2.51875 3 2.3875 3 2.25C3 1.625 3.21875 1.09375 3.65625 0.65625C4.09375 0.21875 4.625 0 5.25 0C5.625 0 5.97188 0.096875 6.29063 0.290625C6.60938 0.484375 6.8875 0.725 7.125 1.0125L7.5 1.5L7.875 1.0125C8.1 0.7125 8.375 0.46875 8.7 0.28125C9.025 0.09375 9.375 0 9.75 0C10.375 0 10.9062 0.21875 11.3438 0.65625C11.7812 1.09375 12 1.625 12 2.25C12 2.3875 11.9906 2.51875 11.9719 2.64375C11.9531 2.76875 11.9125 2.8875 11.85 3H13.5C13.9125 3 14.2656 3.14687 14.5594 3.44062C14.8531 3.73438 15 4.0875 15 4.5V12.75C15 13.1625 14.8531 13.5156 14.5594 13.8094C14.2656 14.1031 13.9125 14.25 13.5 14.25H1.5C1.0875 14.25 0.734375 14.1031 0.440625 13.8094C0.146875 13.5156 0 13.1625 0 12.75V4.5C0 4.0875 0.146875 3.73438 0.440625 3.44062C0.734375 3.14687 1.0875 3 1.5 3ZM1.5 9H13.5V4.5H9.675L11.25 6.6375L10.05 7.5L7.5 4.05L4.95 7.5L3.75 6.6375L5.2875 4.5H1.5V9ZM5.25 3C5.4625 3 5.64062 2.92812 5.78438 2.78437C5.92813 2.64062 6 2.4625 6 2.25C6 2.0375 5.92813 1.85938 5.78438 1.71563C5.64062 1.57188 5.4625 1.5 5.25 1.5C5.0375 1.5 4.85938 1.57188 4.71562 1.71563C4.57187 1.85938 4.5 2.0375 4.5 2.25C4.5 2.4625 4.57187 2.64062 4.71562 2.78437C4.85938 2.92812 5.0375 3 5.25 3ZM9.75 3C9.9625 3 10.1406 2.92812 10.2844 2.78437C10.4281 2.64062 10.5 2.4625 10.5 2.25C10.5 2.0375 10.4281 1.85938 10.2844 1.71563C10.1406 1.57188 9.9625 1.5 9.75 1.5C9.5375 1.5 9.35938 1.57188 9.21562 1.71563C9.07187 1.85938 9 2.0375 9 2.25C9 2.4625 9.07187 2.64062 9.21562 2.78437C9.35938 2.92812 9.5375 3 9.75 3Z",
      viewBox: "0 0 15 15",
      content: `Your physical, mental, and financial well-being is important to us. ZeAi Soft provides comprehensive medical insurance for you and your direct dependents, annual wellness allowances, and access to professional mental health platforms.

Additionally, we support your remote office setups, offer learning & development stipends, and match retirement contributions to secure your future.`,
      bullets: [
        "Comprehensive health, vision, and dental insurance.",
        "Monthly workspace Internet and home-office equipment stipends.",
        "Access to physical gyms and mental health consultation apps."
      ]
    },
    {
      id: 9,
      title: "9. Performance",
      description: "Information on appraisal cycles, goals, and feedback mechanisms.",
      iconPath: "0 13.5V12L1.5 10.5V13.5H0ZM3 13.5V9L4.5 7.5V13.5H3ZM6 13.5V7.5L7.5 9.01875V13.5H6ZM9 13.5V9.01875L10.5 7.51875V13.5H9ZM12 13.5V6L13.5 4.5V13.5H12ZM0 9.61875V7.5L5.25 2.25L8.25 5.25L13.5 0V2.11875L8.25 7.36875L5.25 4.36875L0 9.61875Z",
      viewBox: "0 0 14 14",
      content: `At ZeAi Soft, we use a continuous feedback model. Rather than waiting for year-end appraisals, we encourage regular 1-on-1 chats between managers and team members to review progress, unblock bottlenecks, and set goals.

Formal appraisal cycles happen twice a year (mid-year and end-of-year) and are based on mutually agreed Key Result Areas (KRAs) established at the start of each performance cycle.`,
      bullets: [
        "Monthly 1-on-1 syncs to align on expectations and goals.",
        "Bi-annual formal performance and salary appraisals.",
        "Goal setting aligned with department and company OKRs."
      ]
    },
    {
      id: 10,
      title: "10. Career Growth",
      description: "Internal opportunities, training, mentorship, and career paths.",
      iconPath: "1.05 9L0 7.95L5.55 2.3625L8.55 5.3625L12.45 1.5H10.5V0H15V4.5H13.5V2.55L8.55 7.5L5.55 4.5L1.05 9Z",
      viewBox: "0 0 15 9",
      content: `We support your career growth. We offer internal transfer paths, leadership training bootcamps, and a structured mentorship network. Employees can apply for internal roles after completing 6 months in their current role.

We provide a dedicated educational allowance each year that can be used for certifications, bootcamps, technical courses, or industry conference tickets.`,
      bullets: [
        "Yearly learning budget per employee for skill advancement.",
        "Internal job posting board (IJP) to switch fields/roles.",
        "Individual development plans (IDPs) reviewed quarterly."
      ]
    },
    {
      id: 11,
      title: "11. Data & Security",
      description: "Policies on data protection, system security, and NDAs.",
      iconPath: "1.5 15.75C1.0875 15.75 0.734375 15.6031 0.440625 15.3094C0.146875 15.0156 0 14.6625 0 14.25V6.75C0 6.3375 0.146875 5.98438 0.440625 5.69063C0.734375 5.39688 1.0875 5.25 1.5 5.25H2.25V3.75C2.25 2.7125 2.61562 1.82812 3.34687 1.09687C4.07812 0.365625 4.9625 0 6 0C7.0375 0 7.92188 0.365625 8.65312 1.09687C9.38437 1.82812 9.75 2.7125 9.75 3.75V5.25H10.5C10.9125 5.25 11.2656 5.39688 11.5594 5.69063C11.8531 5.98438 12 6.3375 12 6.75V14.25C12 14.6625 11.8531 15.0156 11.5594 15.3094C11.2656 15.6031 10.9125 15.75 10.5 15.75H1.5ZM1.5 14.25H10.5V6.75H1.5V14.25ZM6 12C6.4125 12 6.76562 11.8531 7.05937 11.5594C7.35312 11.2656 7.5 10.9125 7.5 10.5C7.5 10.0875 7.35312 9.73438 7.05937 9.44063C6.76562 9.14688 6.5875 9 6 9C5.5875 9 5.23438 9.14688 4.94063 9.44063C4.64688 9.73438 4.5 10.0875 4.5 10.5C4.5 10.9125 4.64688 11.2656 4.94063 11.5594C5.23438 11.8531 5.5875 12 6 12ZM3.75 5.25H8.25V3.75C8.25 3.125 8.03125 2.59375 7.59375 2.15625C7.15625 1.71875 6.625 1.5 6 1.5C5.375 1.5 4.84375 1.71875 4.40625 2.15625C3.96875 2.59375 3.75 3.125 3.75 3.75V5.25ZM1.5 14.25V6.75V14.25Z",
      viewBox: "0 0 12 16",
      content: `Securing our user data and proprietary algorithms is non-negotiable. All employees must follow strict information security guidelines: using complex passwords, keeping system software updated, and accessing databases via secure VPNs.

Always keep company data confidential and ensure no proprietary details or codebase parts are shared publicly or stored on unauthorized drives.`,
      bullets: [
        "Mandatory multi-factor authentication (MFA) on all devices.",
        "Annual data privacy training compliance required.",
        "Laptops must remain encrypted and locked when away."
      ]
    },
    {
      id: 12,
      title: "12. Exit Policy",
      description: "Information on notice periods, handover processes, and exit clearance.",
      iconPath: "1.5 13.5C1.0875 13.5 0.734375 13.3531 0.440625 13.0594C0.146875 12.7656 0 12.4125 0 12V9H1.5V12H12V1.5H1.5V4.5H0V1.5C0 1.0875 0.146875 0.734375 0.440625 0.440625C0.734375 0.146875 1.0875 0 1.5 0H12C12.4125 0 12.7656 0.146875 13.0594 0.440625C13.3531 0.734375 13.5 1.0875 13.5 1.5V12C13.5 12.4125 13.3531 12.7656 13.0594 13.0594C12.7656 13.3531 12.4125 13.5 12 13.5H1.5ZM5.625 10.5L4.575 9.4125L6.4875 7.5H0V6H6.4875L4.575 4.0875L5.625 3L9.375 6.75L5.625 10.5Z",
      viewBox: "0 0 14 14",
      content: `Should you choose to leave ZeAi Soft, we aim to make the exit process as smooth as possible. Standard notice periods consist of 30 days for probationary staff and 60 days for confirmed staff.

During the notice period, you are required to complete all handovers, return company assets (laptops, security key cards), and participate in an exit interview with the HR department.`,
      bullets: [
        "Submission of resignation through the employee portal.",
        "Handover document approved by reporting manager.",
        "Full and Final settlement cleared within 45 days of exit."
      ]
    },
    {
      id: 13,
      title: "13. Grievance Policy",
      description: "How to raise concerns, reporting channels, and resolution processes.",
      iconPath: "15 15L12 12H4.5C4.0875 12 3.73438 11.8531 3.44062 11.5594C3.14687 11.2656 3 10.9125 3 10.5V9.75H11.25C11.6625 9.75 12.0156 9.60312 12.3094 9.30937C12.6031 9.01562 12.75 8.6625 12.75 8.25V3H13.5C13.9125 3 14.2656 3.14687 14.5594 3.44062C14.8531 3.73438 15 4.0875 15 4.5V15ZM1.5 7.63125L2.38125 6.75H9.75V1.5H1.5V7.63125ZM0 11.25V1.5C0 1.0875 0.146875 0.734375 0.440625 0.440625C0.734375 0.146875 1.0875 0 1.5 0H9.75C10.1625 0 10.5156 0.146875 10.8094 0.440625C11.1031 0.734375 11.25 1.0875 11.25 1.5V6.75C11.25 7.1625 11.1031 7.51562 10.8094 7.80937C10.5156 8.10312 10.1625 8.25 9.75 8.25H3L0 11.25ZM1.5 6.75V1.5V6.75Z",
      viewBox: "0 0 15 15",
      content: `We are committed to providing a safe, comfortable, and fair work environment. If you encounter any issue or dispute, we encourage raising it immediately through your manager or the HR team.

All grievance submissions are handled with absolute confidentiality. We guarantee that no retributive action will be taken against anyone who reports an issue in good faith.`,
      bullets: [
        "Confidential reporting via reporting manager or grievance alias.",
        "Formal investigation completed within 14 working days.",
        "Appeals process available to the senior leadership team."
      ]
    }
  ];

  return (
    <div className="bg-[#FEFEFE] min-w-screen min-h-screen">
      <div className="flex flex-col items-start bg-[#CBC3D9] w-px h-8 absolute left-[1229px] top-6 overflow-hidden"></div>
      <div className="w-[297px] h-full absolute left-0 top-0">
        <div className="bg-[#000] w-[297px] h-full absolute left-0 top-0"></div>
        <img
          src={logo}
          className="w-[243px] h-[98px] absolute left-6 top-[35px] max-w-none"
          alt="ZeAI Logo"
        />
        <div className="flex flex-col items-start gap-5 w-[236px] h-[549px] absolute left-5 top-[188px]">
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
              <g clipPath="url(#clip0_2141_3665)">
                <path
                  d="M14.167 16.6668H18.3337V15.0002C18.3336 13.9352 17.6588 12.9872 16.6526 12.6383C15.6464 12.2894 14.5296 12.6163 13.8703 13.4527M14.167 16.6668H5.83366M14.167 16.6668V15.0002C14.167 14.4535 14.062 13.931 13.8703 13.4527M5.83366 16.6668H1.66699V15.0002C1.66707 13.9352 2.34181 12.9872 3.34803 12.6383C4.35425 12.2894 5.47102 12.6163 6.13033 13.4527M5.83366 16.6668V15.0002C5.83366 14.4535 5.93866 13.931 6.13033 13.4527M6.13033 13.4527C6.76347 11.8704 8.29607 10.8329 10.0003 10.8329C11.7046 10.8329 13.2372 11.8704 13.8703 13.4527M12.5003 5.8335C12.5003 7.21328 11.3801 8.3335 10.0003 8.3335C8.62054 8.3335 7.50033 7.21328 7.50033 5.8335C7.50033 4.45371 8.62054 3.3335 10.0003 3.3335C11.3801 3.3335 12.5003 4.45371 12.5003 5.8335L14.167 16.6668M19.167 19.1668C19.167 20.0867 18.4202 20.8335 17.5003 20.8335C16.5805 20.8335 15.8337 20.0867 15.8337 19.1668C15.8337 18.247 16.5805 17.5002 17.5003 17.5002C18.4202 17.5002 19.167 18.247 19.167 19.1668V19.1668M5.83366 8.3335C5.83366 9.25335 5.08685 10.0002 4.16699 10.0002C3.24713 10.0002 2.50033 9.25335 2.50033 8.3335C2.50033 7.41364 3.24713 6.66683 4.16699 6.66683C5.08685 6.66683 5.83366 7.41364 5.83366 8.3335V8.3335"
                  stroke="white"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_2141_3665">
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
                d="M7.50033 10H12.5003M7.50033 13.3333H12.5003M14.167 17.5H5.83366C4.91318 17.5 4.16699 16.7538 4.16699 15.8333V4.16667C4.16699 3.24619 4.91318 2.5 5.83366 2.5H10.4887C10.7097 2.50005 10.9216 2.58788 11.0778 2.74417L15.5895 7.25583C15.7458 7.41208 15.8336 7.624 15.8337 7.845V15.8333C15.8337 16.7538 15.0875 17.5 14.167 17.5L7.50033 10"
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
      <div className="flex p-8 flex-col items-start gap-6 w-[1020px] absolute left-[338px] top-[69px]">
        <div className="flex items-center gap-2 w-full">
          <button className="cursor-pointer text-nowrap flex justify-center items-center w-9 h-5" onClick={() => navigate("/employee/profile")}>
            <p className="text-[#484456] font-inter text-[13px] leading-[19.5px] w-[37px] h-5">
              Home
            </p>
          </button>
          <svg
            width="5"
            height="8"
            viewBox="0 0 5 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="flex flex-col items-start w-fit "
          >
            <path
              d="M3.06667 4L0 0.933333L0.933333 0L4.93333 4L0.933333 8L0 7.06667L3.06667 4Z"
              fill="#484456"
            />
          </svg>
          <button className="cursor-pointer text-nowrap flex pr-0 justify-center items-center w-32 h-5">
            <p className="text-[#4200BB] font-inter text-[13px] font-medium leading-[19.5px] w-32 h-5">
              Employee Handbook
            </p>
          </button>
        </div>
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-4 w-fit">
            <div className="flex justify-center items-center rounded-xl bg-[rgba(66,0,187,0.10)] w-[39px] h-12">
              <svg
                width="28"
                height="20"
                viewBox="0 0 28 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex flex-col items-start w-fit "
              >
                <path
                  d="M16.25 7.375V5.25C16.9375 4.95833 17.6406 4.73958 18.3594 4.59375C19.0781 4.44792 19.8333 4.375 20.625 4.375C21.1667 4.375 21.6979 4.41667 22.2188 4.5C22.7396 4.58333 23.25 4.6875 23.75 4.8125V6.8125C23.25 6.625 22.7448 6.48438 22.2344 6.39062C21.724 6.29688 21.1875 6.25 20.625 6.25C19.8333 6.25 19.0729 6.34896 18.3438 6.54688C17.6146 6.74479 16.9167 7.02083 16.25 7.375ZM16.25 14.25V12.125C16.9375 11.8333 17.6406 11.6146 18.3594 11.4688C19.0781 11.3229 19.8333 11.25 20.625 11.25C21.1667 11.25 21.6979 11.2917 22.2188 11.375C22.7396 11.4583 23.25 11.5625 23.75 11.6875V13.6875C23.25 13.5 22.7448 13.3594 22.2344 13.2656C21.724 13.1719 21.1875 13.125 20.625 13.125C19.8333 13.125 19.0729 13.2188 18.3438 13.4062C17.6146 13.5938 16.9167 13.875 16.25 14.25ZM16.25 10.8125V8.6875C16.9375 8.39583 17.6406 8.17708 18.3594 8.03125C19.0781 7.88542 19.8333 7.8125 20.625 7.8125C21.1667 7.8125 21.6979 7.85417 22.2188 7.9375C22.7396 8.02083 23.25 8.125 23.75 8.25V10.25C23.25 10.0625 22.7448 9.92188 22.2344 9.82812C21.724 9.73438 21.1875 9.6875 20.625 9.6875C19.8333 9.6875 19.0729 9.78646 18.3438 9.98438C17.6146 10.1823 16.9167 10.4583 16.25 10.8125ZM6.875 15C7.85417 15 8.80729 15.1094 9.73438 15.3281C10.6615 15.5469 11.5833 15.875 12.5 16.3125V4C11.6458 3.5 10.7396 3.125 9.78125 2.875C8.82292 2.625 7.85417 2.5 6.875 2.5C6.125 2.5 5.38021 2.57292 4.64062 2.71875C3.90104 2.86458 3.1875 3.08333 2.5 3.375V15.75C3.22917 15.5 3.95312 15.3125 4.67188 15.1875C5.39062 15.0625 6.125 15 6.875 15ZM15 16.3125C15.9167 15.875 16.8385 15.5469 17.7656 15.3281C18.6927 15.1094 19.6458 15 20.625 15C21.375 15 22.1094 15.0625 22.8281 15.1875C23.5469 15.3125 24.2708 15.5 25 15.75V3.375C24.3125 3.08333 23.599 2.86458 22.8594 2.71875C22.1198 2.57292 21.375 2.5 20.625 2.5C19.6458 2.5 18.6771 2.625 17.7188 2.875C16.7604 3.125 15.8542 3.5 15 4V16.3125ZM13.75 20C12.75 19.2083 11.6667 18.5938 10.5 18.1562C9.33333 17.7188 8.125 17.5 6.875 17.5C6 17.5 5.14062 17.6146 4.29688 17.8438C3.45312 18.0729 2.64583 18.3958 1.875 18.8125C1.4375 19.0417 1.01562 19.0312 0.609375 18.7812C0.203125 18.5312 0 18.1667 0 17.6875V2.625C0 2.39583 0.0572917 2.17708 0.171875 1.96875C0.286458 1.76042 0.458333 1.60417 0.6875 1.5C1.64583 1 2.64583 0.625 3.6875 0.375C4.72917 0.125 5.79167 0 6.875 0C8.08333 0 9.26562 0.15625 10.4219 0.46875C11.5781 0.78125 12.6875 1.25 13.75 1.875C14.8125 1.25 15.9219 0.78125 17.0781 0.46875C18.2344 0.15625 19.4167 0 20.625 0C21.7083 0 22.7708 0.125 23.8125 0.375C24.8542 0.625 25.8542 1 26.8125 1.5C27.0417 1.60417 27.2135 1.76042 27.3281 1.96875C27.4427 2.17708 27.5 2.39583 27.5 2.625V17.6875C27.5 18.1667 27.2969 18.5312 26.8906 18.7812C26.4844 19.0312 26.0625 19.0417 25.625 18.8125C24.8542 18.3958 24.0469 18.0729 23.2031 17.8438C22.3594 17.6146 21.5 17.5 20.625 17.5C19.375 17.5 18.1667 17.7188 17 18.1562C15.8333 18.5938 14.75 19.2083 13.75 20Z"
                  fill="#4200BB"
                />
              </svg>
            </div>
            <div className="flex flex-col items-start gap-1 w-fit">
              <div className="flex flex-col items-start w-full">
                <p className="text-[#191C1E] font-inter text-3xl font-bold leading-9 w-fit">
                  Employee Handbook
                </p>
              </div>
              <div className="flex flex-col items-start w-full">
                <p className="text-[#484456] font-inter text-base leading-6 w-fit">
                  Your go-to guide for company policies, culture, and everything
                  you need to know.
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 w-fit">
            <div className="flex flex-col items-start w-fit relative">
              <div className="flex pt-[9px] pr-4 pb-2.5 pl-10 justify-center items-start rounded-xl border border-[#CAC3D9] bg-[#FFF] w-64 overflow-hidden">
                <div className="flex flex-col items-start w-full overflow-hidden">
                  <input type="text" placeholder="Search in handbook..." className="text-[#191C1E] font-inter text-sm w-full bg-transparent border-none outline-none placeholder-[#6B7280]" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
              </div>
              <svg
                width="18"
                height="24"
                viewBox="0 0 18 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex flex-col items-start absolute left-3 top-[7px] w-fit h-6 "
              >
                <path
                  d="M16.6 18L10.3 11.7C9.8 12.1 9.225 12.4167 8.575 12.65C7.925 12.8833 7.23333 13 6.5 13C4.68333 13 3.14583 12.3708 1.8875 11.1125C0.629167 9.85417 0 8.31667 0 6.5C0 4.68333 0.629167 3.14583 1.8875 1.8875C3.14583 0.629167 4.68333 0 6.5 0C8.31667 0 9.85417 0.629167 11.1125 1.8875C12.3708 3.14583 13 4.68333 13 6.5C13 7.23333 12.8833 7.925 12.65 8.575C12.4167 9.225 12.1 9.8 11.7 10.3L18 16.6L16.6 18ZM6.5 11C7.75 11 8.8125 10.5625 9.6875 9.6875C10.5625 8.8125 11 7.75 11 6.5C11 5.25 10.5625 4.1875 9.6875 3.3125C8.8125 2.4375 7.75 2 6.5 2C5.25 2 4.1875 2.4375 3.3125 3.3125C2.4375 4.1875 2 5.25 2 6.5C2 7.75 2.4375 8.8125 3.3125 9.6875C4.1875 10.5625 5.25 11 6.5 11Z"
                  fill="#484456"
                />
              </svg>
            </div>
            <div className="flex py-2.5 px-5 items-center gap-2 rounded-xl bg-[#4200BB] shadow-[01px2px0rgba(0,0,0,0.05)] w-fit cursor-pointer hover:bg-[#340096]" onClick={() => window.print()}>
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex flex-col items-center w-fit "
              >
                <path
                  d="M6.66667 10L2.5 5.83333L3.66667 4.625L5.83333 6.79167V0H7.5V6.79167L9.66667 4.625L10.8333 5.83333L6.66667 10ZM1.66667 13.3333C1.20833 13.3333 0.815972 13.1701 0.489583 12.8438C0.163194 12.5174 0 12.125 0 11.6667V9.16667H1.66667V11.6667H11.6667V9.16667H13.3333V11.6667C13.3333 12.125 13.1701 12.5174 12.8438 12.8438C12.5174 13.1701 12.125 13.3333 11.6667 13.3333H1.66667Z"
                  fill="white"
                />
              </svg>
              <p className="text-[#FFF] font-inter text-sm font-semibold leading-5 w-fit">
                Download PDF
              </p>
            </div>
          </div>
        </div>
        <div className="flex pt-2 items-start gap-8 w-full">
          <div className="flex flex-col items-start w-64 h-full">
            <div className="flex p-4 flex-col items-start gap-4 rounded-2xl border border-[#CAC3D9] bg-[#FFF] shadow-[01px2px0rgba(0,0,0,0.05)] w-full">
              <div className="flex py-0 px-4 flex-col items-start w-full">
                <p className="text-[#4200BB] font-inter text-[11px] font-bold leading-[16.5px] w-full tracking-[0.1em]">
                  TABLE OF CONTENTS
                </p>
              </div>
              
              <div className="flex flex-col items-start gap-1 w-full">
                {/* 1. Welcome */}
                <div 
                  className={`flex py-2.5 px-4 items-center gap-3 rounded-lg w-full cursor-pointer transition-all duration-200 ${
                    activeSection === 1 ? "bg-[rgba(66,0,187,0.10)]" : "hover:bg-[rgba(66,0,187,0.05)]"
                  }`}
                  onClick={() => setActiveSection(1)}
                >
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 17 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="flex flex-col items-start w-fit "
                  >
                    <path
                      d="M7.33125 7.89375L12.6375 2.5875C12.7875 2.4375 12.9625 2.3625 13.1625 2.3625C13.3625 2.3625 13.5375 2.4375 13.6875 2.5875C13.8375 2.7375 13.9125 2.9125 13.9125 3.1125C13.9125 3.3125 13.8375 3.4875 13.6875 3.6375L8.4 8.94375L7.33125 7.89375ZM9.1875 9.75L13.95 4.96875C14.1 4.81875 14.2781 4.74375 14.4844 4.74375C14.6906 4.74375 14.8688 4.81875 15.0188 4.96875C15.1687 5.11875 15.2437 5.29688 15.2437 5.50313C15.2437 5.70938 15.1687 5.8875 15.0188 6.0375L10.2563 10.8L9.1875 9.75ZM3.225 13.3125C2.0875 12.175 1.51875 10.8063 1.51875 9.20625C1.51875 7.60625 2.0875 6.2375 3.225 5.1L5.475 2.85L6.58125 3.95625C6.66875 4.04375 6.74375 4.13438 6.80625 4.22813C6.86875 4.32188 6.93125 4.41875 6.99375 4.51875L9.76875 1.725C9.91875 1.575 10.0969 1.5 10.3031 1.5C10.5094 1.5 10.6875 1.575 10.8375 1.725C10.9875 1.875 11.0625 2.05313 11.0625 2.25938C11.0625 2.46563 10.9875 2.64375 10.8375 2.79375L7.59375 6.0375L6 7.6125L6.35625 7.96875C6.93125 8.54375 7.20625 9.23125 7.18125 10.0312C7.15625 10.8313 6.85 11.525 6.2625 12.1125L5.19375 11.0625C5.48125 10.775 5.64062 10.4344 5.67188 10.0406C5.70312 9.64687 5.575 9.30625 5.2875 9.01875L4.40625 8.15625C4.25625 8.00625 4.18125 7.82812 4.18125 7.62187C4.18125 7.41562 4.25625 7.2375 4.40625 7.0875L5.475 6.0375C5.625 5.8875 5.7 5.70938 5.7 5.50313C5.7 5.29688 5.625 5.11875 5.475 4.96875L4.275 6.16875C3.425 7.01875 3 8.03438 3 9.21562C3 10.3969 3.425 11.4125 4.275 12.2625C5.125 13.1125 6.14375 13.5375 7.33125 13.5375C8.51875 13.5375 9.5375 13.1125 10.3875 12.2625L14.8687 7.7625C15.0187 7.6125 15.1969 7.5375 15.4031 7.5375C15.6094 7.5375 15.7875 7.6125 15.9375 7.7625C16.0875 7.9125 16.1625 8.09062 16.1625 8.29688C16.1625 8.50313 16.0875 8.68125 15.9375 8.83125L11.4375 13.3125C10.3 14.45 8.93125 15.0188 7.33125 15.0188C5.73125 15.0188 4.3625 14.45 3.225 13.3125ZM12.0188 16.5375V15.0188C12.8438 15.0188 13.55 14.725 14.1375 14.1375C14.725 13.55 15.0188 12.0188H16.5375C16.5375 13.2688 16.0969 14.3344 15.2156 15.2156C14.3344 16.0969 13.2688 16.5375 12.0188 16.5375ZM0 4.51875C0 3.26875 0.440625 2.20312 1.32187 1.32187C2.20312 0.440625 3.26875 0 4.51875 0V1.51875C3.69375 1.51875 2.9875 1.8125 2.4 2.4C1.8125 2.9875 1.51875 3.69375 1.51875 4.51875H0Z"
                      fill={activeSection === 1 ? "#4200BB" : "#484456"}
                    />
                  </svg>
                  <div className="flex flex-col items-start w-fit">
                    <p className={`font-inter text-sm font-semibold leading-5 w-fit ${
                      activeSection === 1 ? "text-[#4200BB]" : "text-[#484456]"
                    }`}>
                      1. Welcome
                    </p>
                  </div>
                </div>

                {/* Chapters 2 to 13 */}
                {chapters.map((ch) => (
                  <div
                    key={ch.id}
                    className={`flex py-2.5 px-4 items-center gap-3 rounded-lg w-full cursor-pointer transition-all duration-200 ${
                      activeSection === ch.id ? "bg-[rgba(66,0,187,0.10)]" : "hover:bg-[rgba(66,0,187,0.05)]"
                    }`}
                    onClick={() => setActiveSection(ch.id)}
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox={ch.viewBox}
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex flex-col items-start w-fit"
                    >
                      <path
                        d={ch.iconPath}
                        fill={activeSection === ch.id ? "#4200BB" : "#484456"}
                      />
                    </svg>
                    <p className={`font-inter text-sm leading-5 w-fit ${
                      activeSection === ch.id ? "text-[#4200BB] font-semibold" : "text-[#484456]"
                    }`}>
                      {ch.title}
                    </p>
                  </div>
                ))}
              </div>            {/* Main Content Pane */}
            <div className="w-full">
              {activeSection === 1 ? (
                <div>
                  {/* Grid of Chapter Cards */}
                  <div className="grid grid-cols-3 gap-6 w-full mt-6">
                    {chapters
                      .filter(ch => searchQuery === "" || ch.title.toLowerCase().includes(searchQuery.toLowerCase()) || ch.description.toLowerCase().includes(searchQuery.toLowerCase()))
                      .map(ch => (
                        <div
                          key={ch.id}
                          className="flex p-5 flex-col items-start gap-3 rounded-2xl border border-[#CAC3D9] bg-[#FFF] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-[#4200BB] transition-all duration-300 cursor-pointer h-[190px] relative justify-between group"
                          onClick={() => setActiveSection(ch.id)}
                        >
                          <div className="flex flex-col items-start gap-2">
                            <div className="flex justify-center items-center rounded-xl bg-[rgba(66,0,187,0.05)] group-hover:bg-[rgba(66,0,187,0.1)] w-12 h-12 transition-all duration-300">
                              <svg
                                width="20"
                                height="20"
                                viewBox={ch.viewBox}
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d={ch.iconPath} fill="#4200BB" />
                              </svg>
                            </div>
                            <p className="text-[#191C1E] font-inter text-base font-bold leading-6">
                              {ch.title}
                            </p>
                            <p className="text-[#484456] font-inter text-[11px] leading-[16px] line-clamp-2">
                              {ch.description}
                            </p>
                          </div>
                          <div className="flex justify-end items-center w-full mt-2">
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 10 10"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="transform group-hover:translate-x-1 transition-all duration-300"
                            >
                              <path
                                d="M7.10208 5.25H0V4.08333H7.10208L3.83542 0.816667L4.66667 0L9.33333 4.66667L4.66667 9.33333L3.83542 8.51667L7.10208 5.25Z"
                                fill="#4200BB"
                              />
                            </svg>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ) : (
                /* Detail Page View */
                (() => {
                  const ch = chapters.find(c => c.id === activeSection);
                  if (!ch) return null;
                  return (
                    <div className="flex p-8 flex-col items-start gap-6 rounded-3xl border border-[#CAC3D9] bg-[#FFF] shadow-[0_4px_20px_rgba(0,0,0,0.02)] w-full">
                      <div className="flex justify-between items-center w-full border-b border-b-[#F3F4F6] pb-4">
                        <div className="flex items-center gap-4">
                          <div className="flex justify-center items-center rounded-xl bg-[rgba(66,0,187,0.10)] w-12 h-12">
                            <svg
                              width="22"
                              height="22"
                              viewBox={ch.viewBox}
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d={ch.iconPath} fill="#4200BB" />
                            </svg>
                          </div>
                          <div className="flex flex-col items-start">
                            <h2 className="text-[#191C1E] font-inter text-2xl font-bold">
                              {ch.title}
                            </h2>
                            <p className="text-[#6B7280] font-inter text-sm">
                              {ch.description}
                            </p>
                          </div>
                        </div>
                        <button
                          className="flex py-2 px-4 items-center gap-2 rounded-lg border border-[#CAC3D9] text-[#484456] hover:bg-[#F9FAFB] font-medium text-xs cursor-pointer transition-all duration-200"
                          onClick={() => setActiveSection(1)}
                        >
                          Back to Overview
                        </button>
                      </div>

                      <div className="flex flex-col items-start gap-4 mt-2 w-full">
                        <div className="text-[#484456] font-inter text-[15px] leading-[26px] whitespace-pre-line w-full">
                          {ch.content}
                        </div>

                        {ch.bullets && ch.bullets.length > 0 && (
                          <div className="flex flex-col items-start gap-2 bg-[#F9F8FF] border border-[#E9E4F5] rounded-2xl p-6 w-full mt-2">
                            <h4 className="text-[#4200BB] font-inter text-sm font-bold tracking-[0.05em] uppercase">
                              Key Highlights & Guidelines
                            </h4>
                            <ul className="list-disc pl-5 mt-2 flex flex-col gap-2">
                              {ch.bullets.map((b, idx) => (
                                <li key={idx} className="text-[#484456] font-inter text-sm leading-[22px]">
                                  {b}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="flex justify-between items-center w-full mt-6 pt-4 border-t border-t-[#F3F4F6]">
                          <div className="text-xs text-[#9CA3AF]">
                            Last updated: Oct 2024
                          </div>
                          <button
                            className={`flex py-2.5 px-6 items-center gap-2 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer shadow-sm ${
                              acknowledged[ch.id]
                                ? "bg-[#006C49] text-white"
                                : "bg-[#4200BB] text-white hover:bg-[#340096]"
                            }`}
                            onClick={() =>
                              setAcknowledged(prev => ({
                                ...prev,
                                [ch.id]: !prev[ch.id]
                              }))
                            }
                          >
                            <span className="material-icons text-base">
                              {acknowledged[ch.id] ? "check_circle" : "assignment_turned_in"}
                            </span>
                            {acknowledged[ch.id] ? "Acknowledged" : "Mark as Read"}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })()
              )}
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
  </div>
  );
}
