import "./Payroll.css";

import {
  Wallet,
  Landmark,
  Receipt,
  PiggyBank,
  TrendingUp,
  Download,
} from "lucide-react";

const stats = [
  {
    title: "Net Salary",
    value: "₹58,500",
    sub: "July 2026",
    color: "#6C3EF4",
    icon: <Wallet size={22} />,
  },
  {
    title: "Gross Salary",
    value: "₹72,000",
    sub: "Monthly",
    color: "#22B573",
    icon: <PiggyBank size={22} />,
  },
  {
    title: "Tax Deduction",
    value: "₹7,800",
    sub: "This Month",
    color: "#FF9E44",
    icon: <Receipt size={22} />,
  },
  {
    title: "Provident Fund",
    value: "₹3,200",
    sub: "Monthly",
    color: "#4F8CFF",
    icon: <Landmark size={22} />,
  },
  {
    title: "Bonus",
    value: "₹10,000",
    sub: "Performance",
    color: "#E5484D",
    icon: <TrendingUp size={22} />,
  },
  {
    title: "Salary Status",
    value: "Paid",
    sub: "10 Jul 2026",
    color: "#22B573",
    icon: <Wallet size={22} />,
  },
];

function Payroll() {
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

          <p>

            View salary details, payslips and deductions.

          </p>

        </div>

        <button className="download-btn">

          <Download size={18} />

          Download Payslip

        </button>

      </div>

      {/* KPI Cards */}

      <div className="stats-grid">

        {stats.map((item,index)=>(

          <div
            className="stat-card"
            key={index}
          >

            <div
              className="stat-icon"
              style={{
                background:item.color,
              }}
            >

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

            <button>July 2026</button>

          </div>

          <div className="salary-grid">

            <div className="salary-item">

              <span>Gross Salary</span>

              <strong>₹72,000</strong>

            </div>

            <div className="salary-item">

              <span>Total Deductions</span>

              <strong>₹13,500</strong>

            </div>

            <div className="salary-item">

              <span>Net Salary</span>

              <strong>₹58,500</strong>

            </div>

            <div className="salary-item">

              <span>Salary Credited</span>

              <strong>10 Jul 2026</strong>

            </div>

          </div>

        </div>

        {/* Earnings & Deductions */}

        <div className="earnings-card">

          <div className="card-header">

            <h3>Earnings & Deductions</h3>

          </div>

          <div className="salary-row">

            <span>Basic Salary</span>

            <strong>₹50,000</strong>

          </div>

          <div className="salary-row">

            <span>HRA</span>

            <strong>₹12,000</strong>

          </div>

          <div className="salary-row">

            <span>Special Allowance</span>

            <strong>₹10,000</strong>

          </div>

          <div className="salary-row deduction">

            <span>Tax</span>

            <strong>- ₹7,800</strong>

          </div>

          <div className="salary-row deduction">

            <span>Provident Fund</span>

            <strong>- ₹3,200</strong>

          </div>

          <div className="salary-row deduction">

            <span>Professional Tax</span>

            <strong>- ₹2,500</strong>

          </div>

        </div>

      </div>

      {/* Bank Details */}

      <div className="bank-card">

        <div className="card-header">

          <h3>Bank Details</h3>

          <button>Edit</button>

        </div>

        <div className="bank-grid">

          <div>

            <span>Bank Name</span>

            <h4>State Bank of India</h4>

          </div>

          <div>

            <span>Account Number</span>

            <h4>XXXX XXXX 4589</h4>

          </div>

          <div>

            <span>IFSC Code</span>

            <h4>SBIN0001234</h4>

          </div>

          <div>

            <span>Branch</span>

            <h4>Chennai Main Branch</h4>

          </div>

        </div>

      </div>
            {/* Payslip History */}

      <div className="history-card">

        <div className="card-header">

          <h3>Payslip History</h3>

          <button>View All</button>

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

            <tr>

              <td>July 2026</td>

              <td>₹72,000</td>

              <td>₹58,500</td>

              <td>

                <span className="paid">

                  Paid

                </span>

              </td>

              <td>

                <button className="download-small">

                  Download

                </button>

              </td>

            </tr>

            <tr>

              <td>June 2026</td>

              <td>₹72,000</td>

              <td>₹58,500</td>

              <td>

                <span className="paid">

                  Paid

                </span>

              </td>

              <td>

                <button className="download-small">

                  Download

                </button>

              </td>

            </tr>

            <tr>

              <td>May 2026</td>

              <td>₹70,500</td>

              <td>₹57,100</td>

              <td>

                <span className="paid">

                  Paid

                </span>

              </td>

              <td>

                <button className="download-small">

                  Download

                </button>

              </td>

            </tr>

          </tbody>

        </table>

      </div>

      {/* Bottom Section */}

      <div className="bottom-section">

        {/* Salary Breakdown */}

        <div className="chart-card">

          <div className="card-header">

            <h3>Salary Breakdown</h3>

          </div>

          <div className="salary-chart">

            {[90,70,55,40].map((height,index)=>(

              <div
                className="chart-box"
                key={index}
              >

                <div
                  className="chart-bar"
                  style={{
                    height:`${height}px`,
                  }}
                ></div>

                <span>

                  {["Basic","HRA","Bonus","Tax"][index]}

                </span>

              </div>

            ))}

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

              <strong>₹7,800</strong>

            </div>

            <div className="tax-item">

              <span>Professional Tax</span>

              <strong>₹2,500</strong>

            </div>

            <div className="tax-item">

              <span>Provident Fund</span>

              <strong>₹3,200</strong>

            </div>

            <div className="tax-item total">

              <span>Total Deduction</span>

              <strong>₹13,500</strong>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Payroll;