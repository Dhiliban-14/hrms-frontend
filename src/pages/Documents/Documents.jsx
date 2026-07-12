import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import "./Documents.css";

import {
  FileText,
  Download,
  Eye,
  Plus,
  X,
  FileCheck,
} from "lucide-react";

import api, { employeeAPI } from "../../services/api";

function Documents() {
  const { employee } = useOutletContext() || {};
  const [activeTab, setActiveTab] = useState("assigned");
  const [assignedDocs, setAssignedDocs] = useState([]);
  const [verificationLetters, setVerificationLetters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Form states
  const [purpose, setPurpose] = useState("Loan Application");
  const [recipient, setRecipient] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const baseURL = api.defaults.baseURL || "https://hrms-backend-0e5n.onrender.com/api";

  const loadData = async () => {
    if (!employee) return;
    try {
      setLoading(true);
      const docs = await employeeAPI.getDocuments();
      setAssignedDocs(docs || []);

      const letters = await employeeAPI.getVerificationLetters();
      setVerificationLetters(letters || []);
    } catch (err) {
      console.error("Failed to load documents data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [employee]);

  const handleDownloadDoc = (doc) => {
    // Normalize name to match backend endpoint parameters
    const nameLower = doc.name.toLowerCase();
    let docType = "nda";
    if (nameLower.includes("handbook")) docType = "handbook";
    else if (nameLower.includes("contract")) docType = "contract";
    else if (nameLower.includes("offer")) docType = "offer-letter";

    const downloadUrl = `${baseURL}/employees/me/documents/${docType}`;
    window.open(downloadUrl, "_blank");
  };

  const handleDownloadLetter = (letter) => {
    const downloadUrl = `${baseURL}/employees/me/verification-letters/download/${letter.request_id}`;
    window.open(downloadUrl, "_blank");
  };

  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    if (!recipient.trim() || !email.trim() || !address.trim()) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      setSubmitting(true);
      await employeeAPI.requestVerificationLetter({
        purpose,
        recipient,
        email,
        address,
        additional_notes: notes
      });

      alert("Employment Verification Letter request submitted and generated successfully!");
      setShowModal(false);
      
      // Reset form states
      setRecipient("");
      setEmail("");
      setAddress("");
      setNotes("");
      setPurpose("Loan Application");

      // Reload verification letters list
      const letters = await employeeAPI.getVerificationLetters();
      setVerificationLetters(letters || []);
    } catch (err) {
      console.error("Failed to request letter:", err);
      alert("Failed to submit request.");
    } finally {
      setSubmitting(false);
    }
  };

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
        <div>Loading documents directory...</div>
      </div>
    );
  }

  return (
    <div className="documents-page">
      {/* Breadcrumb */}
      <div className="breadcrumb" style={{ marginBottom: "16px" }}>
        Dashboard
        <span> / </span>
        Documents
      </div>

      {/* Header */}
      <div className="documents-header">
        <div>
          <h1>Documents & Letters</h1>
          <p>Access assigned agreements and request employment verification certificates.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs-container">
        <button
          className={`tab-btn ${activeTab === "assigned" ? "active" : ""}`}
          onClick={() => setActiveTab("assigned")}
        >
          Company & Contract Documents
        </button>
        <button
          className={`tab-btn ${activeTab === "verification" ? "active" : ""}`}
          onClick={() => setActiveTab("verification")}
        >
          Verification Letters
        </button>
      </div>

      {/* Tab Panels */}
      {activeTab === "assigned" ? (
        <div className="document-grid">
          {assignedDocs.map((doc, idx) => (
            <div className="document-card" key={idx}>
              <div className="card-top">
                <div className="file-icon-box">
                  <FileText size={24} />
                </div>
                <div className="file-details">
                  <h3>{doc.name}</h3>
                  <span>{doc.type} • {doc.file_size}</span>
                </div>
              </div>

              <div className="card-middle">
                <span className={`doc-status-badge ${doc.status.toLowerCase()}`}>
                  {doc.status}
                </span>
              </div>

              <div className="card-actions">
                <button className="action-btn download" onClick={() => handleDownloadDoc(doc)}>
                  <Download size={14} />
                  Download
                </button>
                <button className="action-btn preview" onClick={() => handleDownloadDoc(doc)}>
                  <Eye size={14} />
                  Preview
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          {/* Verification Letters Panel Header */}
          <div className="verification-header-row">
            <h2 style={{ fontSize: "16px", fontWeight: "600" }}>Requested Letters</h2>
            <button className="request-evl-btn" onClick={() => setShowModal(true)}>
              <Plus size={16} />
              Request Letter
            </button>
          </div>

          {/* Table */}
          <div className="letters-table-container">
            {verificationLetters.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px", color: "#9CA3AF" }}>
                <FileCheck size={32} style={{ marginBottom: "12px", color: "#6C3EF4" }} />
                <p>No verification letters requested yet. Click 'Request Letter' to start.</p>
              </div>
            ) : (
              <table className="letters-table">
                <thead>
                  <tr>
                    <th>Request ID</th>
                    <th>Purpose</th>
                    <th>Recipient</th>
                    <th>Requested On</th>
                    <th>Status</th>
                    <th style={{ textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {verificationLetters.map((letter) => (
                    <tr key={letter.id}>
                      <td><strong style={{ color: "#ffffff" }}>{letter.request_id}</strong></td>
                      <td>{letter.purpose}</td>
                      <td>{letter.recipient}</td>
                      <td>{letter.requested_on}</td>
                      <td>
                        <span className={`letter-status-badge ${letter.status.toLowerCase()}`}>
                          {letter.status}
                        </span>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <button
                          className="table-download-btn"
                          title="Download PDF"
                          onClick={() => handleDownloadLetter(letter)}
                        >
                          <Download size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* REQUEST EVL MODAL OVERLAY */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Request Verification Letter</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleRequestSubmit}>
              <div className="modal-body">
                <div className="form-group-row">
                  <div className="form-group">
                    <label>Purpose of Request *</label>
                    <select
                      className="form-select"
                      value={purpose}
                      onChange={(e) => setPurpose(e.target.value)}
                    >
                      <option value="Loan Application">Loan Application</option>
                      <option value="Visa Application">Visa Application</option>
                      <option value="Rental Verification">Rental Verification</option>
                      <option value="Address Proof">Address Proof</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Recipient Institution *</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. HDFC Bank, US Consulate"
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Recipient Email *</label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="e.g. support@hdfc.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Institution Address *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Anna Nagar, Chennai"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Additional Notes / Details</label>
                  <textarea
                    className="form-textarea"
                    placeholder="Provide any specific details or formats needed..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)} disabled={submitting}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn" disabled={submitting}>
                  {submitting ? "Submitting..." : "Submit Request"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Documents;