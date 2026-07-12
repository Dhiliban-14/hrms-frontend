import { useState, useEffect, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import "./Messages.css";

import {
  MessageSquarePlus,
  Search,
  Send,
  X,
  MessageCircle,
  User,
} from "lucide-react";

import { inboxAPI, employeeAPI } from "../../services/api";

function Messages() {
  const { employee } = useOutletContext() || {};
  const [threads, setThreads] = useState([]);
  const [activeThread, setActiveThread] = useState(null);
  const [messages, setMessages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [newMessageText, setNewMessageText] = useState("");
  const [directory, setDirectory] = useState([]);
  const [showComposeModal, setShowComposeModal] = useState(false);
  
  // Compose states
  const [composeRecipientId, setComposeRecipientId] = useState("");
  const [composeSubject, setComposeSubject] = useState("");
  const [composeMessage, setComposeMessage] = useState("");
  
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  // Load threads and employee directory
  const loadInitialData = async () => {
    if (!employee) return;
    try {
      setLoading(true);
      const threadsData = await inboxAPI.getThreads();
      setThreads(threadsData || []);
      
      const dirData = await employeeAPI.getDirectory();
      setDirectory(dirData || []);
    } catch (err) {
      console.error("Failed to load messaging data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, [employee]);

  // Scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Select conversation thread
  const handleSelectThread = async (thread) => {
    try {
      setActiveThread(thread);
      const history = await inboxAPI.getThreadMessages(thread.partner_id);
      setMessages(history || []);
      
      // Update unread count locally
      setThreads(prev => 
        prev.map(t => 
          t.partner_id === thread.partner_id ? { ...t, unread_count: 0 } : t
        )
      );
    } catch (err) {
      console.error("Failed to load thread messages:", err);
    }
  };

  // Send message inside active thread
  const handleSendMessage = async (e) => {
    if (e) e.preventDefault();
    if (!newMessageText.trim() || !activeThread) return;

    try {
      const sentMsg = await inboxAPI.sendMessage(
        activeThread.partner_id,
        activeThread.last_subject || "Direct Message",
        newMessageText
      );
      
      // Add message locally and clear input
      setMessages(prev => [...prev, sentMsg]);
      setNewMessageText("");
      
      // Reload threads list in background
      const updatedThreads = await inboxAPI.getThreads();
      setThreads(updatedThreads || []);
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  // Compose new message form submit
  const handleComposeSubmit = async (e) => {
    e.preventDefault();
    if (!composeRecipientId || !composeSubject.trim() || !composeMessage.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await inboxAPI.sendMessage(composeRecipientId, composeSubject, composeMessage);
      alert("Message sent successfully!");
      setShowComposeModal(false);
      
      // Reset compose state
      setComposeRecipientId("");
      setComposeSubject("");
      setComposeMessage("");
      
      // Reload threads and open the new thread if possible
      const updatedThreads = await inboxAPI.getThreads();
      setThreads(updatedThreads || []);
      
      const newThread = updatedThreads.find(t => t.partner_id === composeRecipientId);
      if (newThread) {
        handleSelectThread(newThread);
      }
    } catch (err) {
      console.error("Failed to compose message:", err);
      alert("Failed to send message.");
    }
  };

  // Format initials from name
  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  // Format date helper
  const formatTime = (dateStr) => {
    try {
      const dateObj = new Date(dateStr);
      return dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } catch (e) {
      return dateStr;
    }
  };

  // Filter threads based on search
  const filteredThreads = threads.filter(t =>
    t.partner_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <div>Loading inbox thread messages...</div>
      </div>
    );
  }

  return (
    <div className="messages-page">
      {/* Breadcrumb */}
      <div className="breadcrumb" style={{ marginBottom: "16px" }}>
        Dashboard
        <span> / </span>
        Messages
      </div>

      <div className="messages-layout">
        {/* Left Panel: Threads List */}
        <aside className="messages-sidebar">
          <div className="sidebar-header">
            <div className="sidebar-header-top">
              <h2>Inbox Messages</h2>
              <button className="compose-btn" onClick={() => setShowComposeModal(true)}>
                <MessageSquarePlus size={16} />
                New Chat
              </button>
            </div>
            
            <div className="thread-search">
              <Search size={16} style={{ color: "#9CA3AF" }} />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="threads-list">
            {filteredThreads.length === 0 ? (
              <div style={{ textAlign: "center", padding: "20px", color: "#9CA3AF", fontSize: "13px" }}>
                No active conversations found.
              </div>
            ) : (
              filteredThreads.map((thread) => (
                <button
                  key={thread.partner_id}
                  className={`thread-card ${activeThread?.partner_id === thread.partner_id ? "active" : ""}`}
                  onClick={() => handleSelectThread(thread)}
                >
                  <div className="thread-avatar">
                    {getInitials(thread.partner_name)}
                  </div>
                  <div className="thread-info">
                    <div className="thread-name-row">
                      <h4 className="thread-name">{thread.partner_name}</h4>
                      <span className="thread-time">{formatTime(thread.timestamp)}</span>
                    </div>
                    <div className="thread-preview-row">
                      <p className="thread-preview">{thread.last_message}</p>
                      {thread.unread_count > 0 && (
                        <span className="thread-unread-badge">{thread.unread_count}</span>
                      )}
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </aside>

        {/* Right Panel: Chat Stream */}
        <main className="chat-panel">
          {activeThread ? (
            <>
              {/* Active Chat Header */}
              <div className="chat-header">
                <div className="chat-partner-avatar">
                  {getInitials(activeThread.partner_name)}
                </div>
                <div className="chat-partner-info">
                  <h3>{activeThread.partner_name}</h3>
                  <span>Online • Coworker</span>
                </div>
              </div>

              {/* Chat Messages Log */}
              <div className="chat-history">
                {messages.map((msg) => {
                  const isSentByMe = msg.sender_id === employee.id;
                  return (
                    <div
                      key={msg.id}
                      className={`message-bubble-row ${isSentByMe ? "sent" : "received"}`}
                    >
                      {!isSentByMe && (
                        <span className="message-sender-name">{msg.sender_name}</span>
                      )}
                      <div className="message-bubble">
                        {msg.message}
                      </div>
                      <span className="message-time">{formatTime(msg.created_at)}</span>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input Footer */}
              <form className="chat-footer" onSubmit={handleSendMessage}>
                <div className="message-input-container">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    value={newMessageText}
                    onChange={(e) => setNewMessageText(e.target.value)}
                  />
                </div>
                <button type="submit" className="send-btn">
                  <Send size={18} />
                </button>
              </form>
            </>
          ) : (
            <div className="empty-chat">
              <MessageCircle size={48} />
              <p>Select a thread conversation on the left, or compose a new chat to begin messaging.</p>
            </div>
          )}
        </main>
      </div>

      {/* COMPOSE NEW CHAT MODAL OVERLAY */}
      {showComposeModal && (
        <div className="compose-overlay">
          <div className="compose-modal">
            <div className="modal-header">
              <h3>Start a New Chat</h3>
              <button className="close-btn" onClick={() => setShowComposeModal(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleComposeSubmit}>
              <div className="modal-body">
                <div className="compose-form-group">
                  <label>Select Coworker</label>
                  <select
                    className="compose-select"
                    value={composeRecipientId}
                    onChange={(e) => setComposeRecipientId(e.target.value)}
                    required
                  >
                    <option value="">-- Select Recipient --</option>
                    {directory.map(emp => (
                      <option key={emp.id} value={emp.id}>
                        {emp.full_name} ({emp.department} • {emp.designation})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="compose-form-group">
                  <label>Subject / Topic</label>
                  <input
                    type="text"
                    className="compose-input"
                    placeholder="e.g. Design review feedback"
                    value={composeSubject}
                    onChange={(e) => setComposeSubject(e.target.value)}
                    required
                  />
                </div>

                <div className="compose-form-group">
                  <label>Message Content</label>
                  <textarea
                    className="compose-textarea"
                    placeholder="Write your initial message here..."
                    value={composeMessage}
                    onChange={(e) => setComposeMessage(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="cancel-btn" onClick={() => setShowComposeModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Messages;