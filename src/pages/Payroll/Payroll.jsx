import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
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

  const stats = [
    {
      title: "Net Salary",
      value: payroll ? `₹${Number(payroll.net_salary).toLocaleString("en-IN")}` : "₹0",
      sub: payroll ? `${payroll.month} ${payroll.year}` : "No history",
      color: "#6C3EF4",
      icon: <Wallet size={22} />,
    },
    {
      title: "Gross Salary",
      value: payroll ? `₹${Number(payroll.gross_salary).toLocaleString("en-IN")}` : "₹0",
      sub: "Monthly",
      color: "#22B573",
      icon: <PiggyBank size={22} />,
    },
    {
      title: "Tax Deduction",
      value: payroll ? `₹${Number(payroll.tax_deductions).toLocaleString("en-IN")}` : "₹0",
      sub: "This Month",
      color: "#FF9E44",
      icon: <Receipt size={22} />,
    },
    {
      title: "Provident Fund",
      value: details ? `₹${Number(details.provident_fund).toLocaleString("en-IN")}` : "₹0",
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
      value: payroll ? payroll.status : "Pending",
      sub: payroll?.payment_date 
        ? new Date(payroll.payment_date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
        : "Awaiting Payment",
      color: payroll?.status === "Paid" ? "#22B573" : "#FF9E44",
      icon: <Wallet size={22} />,
    },
  ];

  return (
    <div className="payroll-page">
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

        <button className="download-btn" onClick={() => window.print()}>
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
            <button>{payroll ? `${payroll.month} ${payroll.year}` : "Select Payslip"}</button>
          </div>

          <div className="salary-grid">
            <div className="salary-item">
              <span>Gross Salary</span>
              <strong>₹{payroll ? Number(payroll.gross_salary).toLocaleString("en-IN") : "0"}</strong>
            </div>

            <div className="salary-item">
              <span>Total Deductions</span>
              <strong>
                ₹{payroll && details 
                  ? (Number(payroll.tax_deductions) + Number(details.provident_fund) + Number(details.professional_tax)).toLocaleString("en-IN")
                  : "0"}
              </strong>
            </div>

            <div className="salary-item">
              <span>Net Salary</span>
              <strong>₹{payroll ? Number(payroll.net_salary).toLocaleString("en-IN") : "0"}</strong>
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
                <span>Tax</span>
                <strong>- ₹{Number(payroll?.tax_deductions || 0).toLocaleString("en-IN")}</strong>
              </div>

              <div className="salary-row deduction">
                <span>Provident Fund</span>
                <strong>- ₹{Number(details.provident_fund).toLocaleString("en-IN")}</strong>
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
              <th>Month</th>
              <th>Gross</th>
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
                  <td>{item.month} {item.year}</td>
                  <td>₹{Number(item.gross_salary).toLocaleString("en-IN")}</td>
                  <td>₹{Number(item.net_salary).toLocaleString("en-IN")}</td>
                  <td>
                    <span className={`paid status-${item.status.toLowerCase()}`}>
                      {item.status}
                    </span>
                  </td>
                  <td>
                    <button className="download-small" onClick={() => loadPayslipDetails(item.payslip_no)}>
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
                { label: "Tax", val: payroll?.tax_deductions || 0 }
              ].map((item, index) => {
                // scale height to max 100px
                const height = Math.min(100, Math.round((item.val / 50000) * 100));
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
              <span>Income Tax</span>
              <strong>₹{payroll ? Number(payroll.tax_deductions).toLocaleString("en-IN") : "0"}</strong>
            </div>

            <div className="tax-item">
              <span>Professional Tax</span>
              <strong>₹{details ? Number(details.professional_tax).toLocaleString("en-IN") : "0"}</strong>
            </div>

            <div className="tax-item">
              <span>Provident Fund</span>
              <strong>₹{details ? Number(details.provident_fund).toLocaleString("en-IN") : "0"}</strong>
            </div>

            <div className="tax-item total">
              <span>Total Deduction</span>
              <strong>
                ₹{payroll && details 
                  ? (Number(payroll.tax_deductions) + Number(details.provident_fund) + Number(details.professional_tax)).toLocaleString("en-IN")
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