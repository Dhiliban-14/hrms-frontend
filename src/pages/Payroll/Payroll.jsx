import { useState, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import "./Payroll.css";

import {
  Wallet,
  Landmark,
  Receipt,
  PiggyBank,
  TrendingUp,
  Download,
} from "lucide-react";

import { payrollAPI } from "../../services/api";

function Payroll() {
  const { employee } = useOutletContext() || {};
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [selectedPayslip, setSelectedPayslip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchingDetails, setFetchingDetails] = useState(false);

  const fetchPayrollHistory = async () => {
    if (!employee) return;
    try {
      setLoading(true);
      const data = await payrollAPI.getHistory();
      setHistory(data || []);

      if (data && data.length > 0) {
        // Fetch details for the latest payslip
        await loadPayslipDetails(data[0].payslip_no);
      }
    } catch (err) {
      console.error("Failed to load payroll history:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadPayslipDetails = async (payslipNo) => {
    setFetchingDetails(true);
    try {
      const details = await payrollAPI.getPayslip(payslipNo);
      setSelectedPayslip(details);
    } catch (err) {
      console.error("Failed to load payslip details:", err);
    } finally {
      setFetchingDetails(false);
    }
  };

  useEffect(() => {
    fetchPayrollHistory();
  }, [employee]);

  if (loading) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "60vh",
        color: "#ffffff",
        fontFamily: "Segoe UI, sans-serif"
      }}>
        <div>Loading payroll data...</div>
      </div>
    );
  }

  const payroll = selectedPayslip?.payroll;
  const details = selectedPayslip?.details;
  const empInfo = selectedPayslip?.employee;

  // Calculate gross salary from detail values
  const calculateGross = (dets) => {
    if (!dets) return 0;
    return (
      Number(dets.basic_salary || 0) +
      Number(dets.hra || 0) +
      Number(dets.transport_allowance || 0) +
      Number(dets.special_allowance || 0) +
      Number(dets.performance_bonus || 0) +
      Number(dets.other_allowances || 0)
    );
  };

  // Calculate total deductions
  const calculateDeductions = (dets) => {
    if (!dets) return 0;
    return (
      Number(payroll?.tax_deductions || dets.tds || 0) +
      Number(dets.pf || 0) +
      Number(dets.professional_tax || 0) +
      Number(dets.health_insurance || 0) +
      Number(dets.loan_emi || 0)
    );
  };

  const grossVal = details ? calculateGross(details) : 0;
  const deductionVal = details ? calculateDeductions(details) : 0;

  const stats = [
    {
      title: "Net Salary",
      value: payroll ? `₹${Number(payroll.net_pay).toLocaleString("en-IN")}` : "₹0",
      sub: payroll ? payroll.pay_period : "No history",
      color: "#6C3EF4",
      icon: <Wallet size={22} />,
    },
    {
      title: "Gross Salary",
      value: details ? `₹${grossVal.toLocaleString("en-IN")}` : "₹0",
      sub: "Monthly",
      color: "#22B573",
      icon: <PiggyBank size={22} />,
    },
    {
      title: "Tax Deduction",
      value: details ? `₹${Number(details.tds).toLocaleString("en-IN")}` : "₹0",
      sub: "This Month",
      color: "#FF9E44",
      icon: <Receipt size={22} />,
    },
    {
      title: "Provident Fund",
      value: details ? `₹${Number(details.pf).toLocaleString("en-IN")}` : "₹0",
      sub: "Monthly",
      color: "#4F8CFF",
      icon: <Landmark size={22} />,
    },
    {
      title: "Bonus",
      value: details ? `₹${Number(details.performance_bonus).toLocaleString("en-IN")}` : "₹0",
      sub: "Performance",
      color: "#E5484D",
      icon: <TrendingUp size={22} />,
    },
    {
      title: "Salary Status",
      value: payroll ? (payroll.status === "CREDITED" ? "Paid" : payroll.status) : "Pending",
      sub: payroll?.payment_date 
        ? new Date(payroll.payment_date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
        : "Awaiting Payment",
      color: payroll?.status === "CREDITED" ? "#22B573" : "#FF9E44",
      icon: <Wallet size={22} />,
    },
  ];

  const handlePrintPayslip = () => {
    if (!selectedPayslip) {
      alert("No payslip data available to print.");
      return;
    }
    const now = new Date();
    const reportDate = now.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    const empName = employee?.full_name || employee?.username || "Employee";
    const empId = employee?.employee_id || employee?.id || "N/A";
    const empDept = employee?.department || "N/A";
    const empDesignation = employee?.designation || "N/A";

    const payroll = selectedPayslip?.payroll;
    const details = selectedPayslip?.details;

    const grossVal = details ? calculateGross(details) : 0;
    const deductionVal = details ? calculateDeductions(details) : 0;

    const payPeriod = payroll?.pay_period || "N/A";
    const payslipNo = payroll?.payslip_no || "N/A";

    const basic = details ? Number(details.basic_salary).toLocaleString("en-IN") : "0";
    const hra = details ? Number(details.hra).toLocaleString("en-IN") : "0";
    const transport = details ? Number(details.transport_allowance || 0).toLocaleString("en-IN") : "0";
    const special = details ? Number(details.special_allowance || 0).toLocaleString("en-IN") : "0";
    const bonus = details ? Number(details.performance_bonus || 0).toLocaleString("en-IN") : "0";
    const other = details ? Number(details.other_allowances || 0).toLocaleString("en-IN") : "0";

    const tds = details ? Number(details.tds || 0).toLocaleString("en-IN") : "0";
    const pf = details ? Number(details.pf || 0).toLocaleString("en-IN") : "0";
    const profTax = details ? Number(details.professional_tax || 0).toLocaleString("en-IN") : "0";
    const healthIns = details ? Number(details.health_insurance || 0).toLocaleString("en-IN") : "0";
    const loanEmi = details ? Number(details.loan_emi || 0).toLocaleString("en-IN") : "0";

    const netPay = payroll ? Number(payroll.net_pay).toLocaleString("en-IN") : "0";

    const reportHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Payslip - ${payPeriod}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', Arial, sans-serif; color: #333; background: #fff; padding: 40px; line-height: 1.5; }
    .payslip-header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 3px solid #6C3EF4; padding-bottom: 20px; margin-bottom: 30px; }
    .payslip-header h1 { font-size: 26px; color: #6C3EF4; margin-bottom: 4px; }
    .payslip-header p { font-size: 13px; color: #666; }
    .payslip-header .company { font-size: 22px; font-weight: 700; color: #222; }
    
    .emp-info { display: grid; grid-template-columns: 1fr 1fr; gap: 8px 40px; margin-bottom: 28px; padding: 16px 20px; background: #F8F8FC; border-radius: 12px; }
    .emp-info div { font-size: 13px; color: #555; }
    .emp-info div strong { color: #222; }
    
    .section-title { font-size: 16px; font-weight: 700; color: #222; margin: 24px 0 12px; padding-bottom: 6px; border-bottom: 2px solid #ECECEC; }
    
    .salary-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
    .salary-table th { text-align: left; padding: 10px 14px; background: #F8F8FC; color: #666; font-size: 12px; font-weight: 600; border-bottom: 2px solid #ECECEC; }
    .salary-table td { padding: 10px 14px; border-bottom: 1px solid #f0f0f0; font-size: 13px; color: #333; vertical-align: top; width: 50%; }
    
    .inner-table { width: 100%; border-collapse: collapse; }
    .inner-table td { padding: 6px 0; border: none; width: auto; }
    .inner-table td.amount { text-align: right; font-weight: 600; }
    
    .totals-row { font-weight: 700; background: #F8F8FC; }
    
    .net-salary-box { background: #6C3EF4; color: #fff; padding: 20px; border-radius: 12px; text-align: center; margin-bottom: 28px; }
    .net-salary-box span { font-size: 14px; opacity: 0.9; display: block; margin-bottom: 4px; }
    .net-salary-box strong { font-size: 28px; font-weight: 700; }
    
    .bank-details { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 24px; padding: 16px 20px; background: #F8F8FC; border-radius: 12px; }
    .bank-details div { font-size: 12px; color: #555; }
    .bank-details div span { display: block; font-size: 11px; color: #777; margin-bottom: 4px; }
    .bank-details div strong { color: #222; }
    
    .footer { margin-top: 40px; padding-top: 16px; border-top: 1px solid #ECECEC; font-size: 11px; color: #999; text-align: center; }
    @media print { body { padding: 20px; } }
  </style>
</head>
<body>
  <div class="payslip-header">
    <div>
      <h1>Payslip</h1>
      <p>Payslip for the period of ${payPeriod}</p>
    </div>
    <div style="text-align:right;">
      <div class="company">ZeAI Soft</div>
      <p>Payslip No: ${payslipNo}</p>
      <p>Generated on ${reportDate}</p>
    </div>
  </div>

  <div class="emp-info">
    <div><strong>Employee Name:</strong> ${empName}</div>
    <div><strong>Employee ID:</strong> ${empId}</div>
    <div><strong>Department:</strong> ${empDept}</div>
    <div><strong>Designation:</strong> ${empDesignation}</div>
  </div>

  <table class="salary-table">
    <thead>
      <tr>
        <th style="border-right: 1px solid #ECECEC;">Earnings</th>
        <th>Deductions</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="border-right: 1px solid #f0f0f0;">
          <table class="inner-table">
            <tr><td>Basic Salary</td><td class="amount">₹${basic}</td></tr>
            <tr><td>HRA</td><td class="amount">₹${hra}</td></tr>
            <tr><td>Transport Allowance</td><td class="amount">₹${transport}</td></tr>
            <tr><td>Special Allowance</td><td class="amount">₹${special}</td></tr>
            <tr><td>Performance Bonus</td><td class="amount">₹${bonus}</td></tr>
            <tr><td>Other Allowances</td><td class="amount">₹${other}</td></tr>
          </table>
        </td>
        <td>
          <table class="inner-table">
            <tr><td>Income Tax (TDS)</td><td class="amount">₹${tds}</td></tr>
            <tr><td>Provident Fund (PF)</td><td class="amount">₹${pf}</td></tr>
            <tr><td>Professional Tax</td><td class="amount">₹${profTax}</td></tr>
            <tr><td>Health Insurance</td><td class="amount">₹${healthIns}</td></tr>
            <tr><td>Loan EMI</td><td class="amount">₹${loanEmi}</td></tr>
          </table>
        </td>
      </tr>
      <tr class="totals-row">
        <td style="border-right: 1px solid #ECECEC; padding: 12px 14px;">
          <div style="display:flex; justify-content:space-between;">
            <span>Gross Earnings</span>
            <span>₹${grossVal.toLocaleString("en-IN")}</span>
          </div>
        </td>
        <td style="padding: 12px 14px;">
          <div style="display:flex; justify-content:space-between;">
            <span>Total Deductions</span>
            <span>₹${deductionVal.toLocaleString("en-IN")}</span>
          </div>
        </td>
      </tr>
    </tbody>
  </table>

  <div class="net-salary-box">
    <span>NET SALARY CREDITED</span>
    <strong>₹${netPay}</strong>
  </div>

  <div class="section-title">Bank Details</div>
  <div class="bank-details">
    <div><span>Bank Name</span><strong>${empInfo?.bank_name || "State Bank of India"}</strong></div>
    <div><span>Account Number</span><strong>${empInfo?.bank_account_no ? `XXXX XXXX ${empInfo.bank_account_no.slice(-4)}` : "XXXX XXXX 4589"}</strong></div>
    <div><span>IFSC Code</span><strong>${empInfo?.bank_ifsc || "SBIN0001234"}</strong></div>
    <div><span>Branch</span><strong>${empInfo?.bank_branch || "Chennai Main Branch"}</strong></div>
  </div>

  <div class="footer">
    This payslip is a system-generated document and does not require a signature.
    <br>&bull; Confidential &bull;
  </div>
</body>
</html>`;

    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    document.body.appendChild(iframe);
    
    const doc = iframe.contentWindow.document;
    doc.open();
    doc.write(reportHTML);
    doc.close();
    
    iframe.contentWindow.focus();
    setTimeout(() => {
      iframe.contentWindow.print();
      document.body.removeChild(iframe);
    }, 500);
  };

  return (
    <div className="payroll-page fade-in">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        Dashboard
        <span> / </span>
        Payroll
      </div>

      {/* Header */}
      <div className="payroll-header">
        <div>
          <h1>Payroll</h1>
          <p>View salary details, payslips and deductions.</p>
        </div>

        <button className="download-btn" onClick={handlePrintPayslip}>
          <Download size={18} />
          Print Payslip
        </button>
      </div>

      {/* KPI Cards */}
      <div className="stats-grid">
        {stats.map((item, index) => (
          <div className="stat-card" key={index}>
            <div className="stat-icon" style={{ background: item.color }}>
              {item.icon}
            </div>
            <div className="stat-content">
              <span>{item.title}</span>
              <h2>{item.value}</h2>
              <p>{item.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Salary Section */}
      <div className="salary-section">
        {/* Salary Overview */}
        <div className="salary-card">
          <div className="card-header">
            <h3>Salary Overview</h3>
            <button>{payroll ? payroll.pay_period : "Select Payslip"}</button>
          </div>

          <div className="salary-grid">
            <div className="salary-item">
              <span>Gross Salary</span>
              <strong>₹{grossVal.toLocaleString("en-IN")}</strong>
            </div>

            <div className="salary-item">
              <span>Total Deductions</span>
              <strong>₹{deductionVal.toLocaleString("en-IN")}</strong>
            </div>

            <div className="salary-item">
              <span>Net Salary</span>
              <strong>₹{payroll ? Number(payroll.net_pay).toLocaleString("en-IN") : "0"}</strong>
            </div>

            <div className="salary-item">
              <span>Salary Credited</span>
              <strong>
                {payroll?.payment_date 
                  ? new Date(payroll.payment_date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
                  : "Pending"}
              </strong>
            </div>
          </div>
        </div>

        {/* Earnings & Deductions */}
        <div className="earnings-card">
          <div className="card-header">
            <h3>Earnings & Deductions</h3>
          </div>

          {fetchingDetails ? (
            <div style={{ padding: "20px", color: "#bfbfbf", textAlign: "center" }}>Fetching breakdown...</div>
          ) : details ? (
            <>
              <div className="salary-row">
                <span>Basic Salary</span>
                <strong>₹{Number(details.basic_salary).toLocaleString("en-IN")}</strong>
              </div>

              <div className="salary-row">
                <span>HRA</span>
                <strong>₹{Number(details.hra).toLocaleString("en-IN")}</strong>
              </div>

              <div className="salary-row">
                <span>Special Allowance</span>
                <strong>₹{Number(details.special_allowance).toLocaleString("en-IN")}</strong>
              </div>

              <div className="salary-row">
                <span>Performance Bonus</span>
                <strong>₹{Number(details.performance_bonus).toLocaleString("en-IN")}</strong>
              </div>

              <div className="salary-row deduction">
                <span>Tax (TDS)</span>
                <strong>- ₹{Number(details.tds).toLocaleString("en-IN")}</strong>
              </div>

              <div className="salary-row deduction">
                <span>Provident Fund</span>
                <strong>- ₹{Number(details.pf).toLocaleString("en-IN")}</strong>
              </div>

              <div className="salary-row deduction">
                <span>Professional Tax</span>
                <strong>- ₹{Number(details.professional_tax).toLocaleString("en-IN")}</strong>
              </div>
            </>
          ) : (
            <div style={{ padding: "20px", color: "#bfbfbf", textAlign: "center" }}>No payslip details loaded.</div>
          )}
        </div>
      </div>

      {/* Bank Details */}
      <div className="bank-card">
        <div className="card-header">
          <h3>Bank Details</h3>
        </div>

        <div className="bank-grid">
          <div>
            <span>Bank Name</span>
            <h4>{empInfo?.bank_name || "State Bank of India"}</h4>
          </div>

          <div>
            <span>Account Number</span>
            <h4>{empInfo?.bank_account_no ? `XXXX XXXX ${empInfo.bank_account_no.slice(-4)}` : "XXXX XXXX 4589"}</h4>
          </div>

          <div>
            <span>IFSC Code</span>
            <h4>{empInfo?.bank_ifsc || "SBIN0001234"}</h4>
          </div>

          <div>
            <span>Branch</span>
            <h4>{empInfo?.bank_branch || "Chennai Main Branch"}</h4>
          </div>
        </div>
      </div>

      {/* Payslip History */}
      <div className="history-card">
        <div className="card-header">
          <h3>Payslip History</h3>
          <button onClick={fetchPayrollHistory}>Refresh</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Period</th>
              <th>Estimated Gross</th>
              <th>Net Salary</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {history.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", color: "#bfbfbf" }}>No payslips generated.</td>
              </tr>
            ) : (
              history.map((item, index) => (
                <tr key={index}>
                  <td>{item.pay_period}</td>
                  <td>₹{Number(item.net_pay + 1320).toLocaleString("en-IN")}</td>
                  <td>₹{Number(item.net_pay).toLocaleString("en-IN")}</td>
                  <td>
                    <span className={`paid status-${item.status.toLowerCase() === "credited" ? "paid" : "pending"}`}>
                      {item.status === "CREDITED" ? "Paid" : item.status}
                    </span>
                  </td>
                  <td>
                    <button className="download-small" onClick={() => navigate(`/employee/payslip/${item.payslip_no}`)}>
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Bottom Section */}
      <div className="bottom-section">
        {/* Salary Breakdown Chart */}
        <div className="chart-card">
          <div className="card-header">
            <h3>Salary Breakdown</h3>
          </div>

          <div className="salary-chart">
            {details ? (
              [
                { label: "Basic", val: details.basic_salary },
                { label: "HRA", val: details.hra },
                { label: "Bonus", val: details.performance_bonus },
                { label: "Tax (TDS)", val: details.tds }
              ].map((item, index) => {
                const height = Math.min(100, Math.round((item.val / 3000) * 100));
                return (
                  <div className="chart-box" key={index}>
                    <div className="chart-bar" style={{ height: `${height}px` }}></div>
                    <span>{item.label}</span>
                  </div>
                );
              })
            ) : (
              <div style={{ color: "#bfbfbf", fontSize: "14px" }}>Breakdown not available</div>
            )}
          </div>
        </div>

        {/* Tax Summary */}
        <div className="tax-card">
          <div className="card-header">
            <h3>Tax Summary</h3>
          </div>

          <div className="tax-list">
            <div className="tax-item">
              <span>Income Tax (TDS)</span>
              <strong>₹{details ? Number(details.tds).toLocaleString("en-IN") : "0"}</strong>
            </div>

            <div className="tax-item">
              <span>Professional Tax</span>
              <strong>₹{details ? Number(details.professional_tax).toLocaleString("en-IN") : "0"}</strong>
            </div>

            <div className="tax-item">
              <span>Provident Fund (PF)</span>
              <strong>₹{details ? Number(details.pf).toLocaleString("en-IN") : "0"}</strong>
            </div>

            <div className="tax-item total">
              <span>Total Deduction</span>
              <strong>
                ₹{details 
                  ? (Number(details.tds) + Number(details.pf) + Number(details.professional_tax)).toLocaleString("en-IN")
                  : "0"}
              </strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payroll;