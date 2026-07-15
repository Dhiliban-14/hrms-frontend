import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
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
      <Sidebar />

      <div className="flex-1 flex flex-col items-start gap-6 pt-8 pr-6 pb-[25px] pl-6 min-h-screen">
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
      
    </div>
  );
}
