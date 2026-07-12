import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle 401s (token expiration / unauthorized access)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user_email");
      localStorage.removeItem("user_id");
      // Redirect to login if running in a browser
      if (typeof window !== "undefined") {
        window.location.href = "/#/employee/login";
      }
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  },
  changePassword: async (newPassword) => {
    const response = await api.post("/auth/change-password", { new_password: newPassword });
    return response.data;
  },
};

export const employeeAPI = {
  getProfile: async () => {
    const response = await api.get("/employees/me");
    return response.data;
  },
  getDirectory: async () => {
    const response = await api.get("/employees");
    return response.data;
  },
  updateProfile: async (data) => {
    const response = await api.put("/employees/me", data);
    return response.data;
  },
  getHierarchy: async () => {
    const response = await api.get("/employees/me/hierarchy");
    return response.data;
  },
  getDocuments: async () => {
    const response = await api.get("/employees/me/documents");
    return response.data;
  },
  getVerificationLetters: async () => {
    const response = await api.get("/employees/me/verification-letters");
    return response.data;
  },
  requestVerificationLetter: async (data) => {
    const response = await api.post("/employees/me/verification-letters", data);
    return response.data;
  },
};

export const taskAPI = {
  getTasks: async (statusFilter) => {
    const params = statusFilter ? { status_filter: statusFilter } : {};
    const response = await api.get("/tasks", { params });
    return response.data;
  },
  getTaskDetails: async (taskId) => {
    const response = await api.get(`/tasks/${taskId}`);
    return response.data;
  },
  updateTask: async (taskId, data) => {
    const response = await api.put(`/tasks/${taskId}`, data);
    return response.data;
  },
};

export const attendanceAPI = {
  getLogs: async (startDate, endDate) => {
    const params = {};
    if (startDate) params.start_date = startDate;
    if (endDate) params.end_date = endDate;
    const response = await api.get("/attendance", { params });
    return response.data;
  },
  getMetrics: async () => {
    const response = await api.get("/attendance/metrics");
    return response.data;
  },
  checkIn: async (data) => {
    const response = await api.post("/attendance/check-in", data);
    return response.data;
  },
  checkOut: async (data) => {
    const response = await api.post("/attendance/check-out", data);
    return response.data;
  },
  resetTodayAttendance: async () => {
    const response = await api.delete("/attendance/today");
    return response.data;
  },
};

export const leaveAPI = {
  getBalances: async () => {
    const response = await api.get("/leaves/balances");
    return response.data;
  },
  getRequests: async () => {
    const response = await api.get("/leaves/requests");
    return response.data;
  },
  createRequest: async (data) => {
    const response = await api.post("/leaves/requests", data);
    return response.data;
  },
};

export const payrollAPI = {
  getHistory: async () => {
    const response = await api.get("/payroll/history");
    return response.data;
  },
  getPayslip: async (payslipNo) => {
    const response = await api.get(`/payroll/payslips/${payslipNo}`);
    return response.data;
  },
};

export const notificationAPI = {
  getNotifications: async (unreadOnly = false) => {
    const response = await api.get("/notifications", { params: { unread_only: unreadOnly } });
    return response.data;
  },
  markAsRead: async (id) => {
    const response = await api.post(`/notifications/${id}/read`);
    return response.data;
  },
  markAllAsRead: async () => {
    const response = await api.post("/notifications/read-all");
    return response.data;
  },
};

export const supportAPI = {
  getFAQs: async () => {
    const response = await api.get("/support/faqs");
    return response.data;
  },
  getContactHR: async () => {
    const response = await api.get("/support/contact-hr");
    return response.data;
  },
  getTickets: async () => {
    const response = await api.get("/support/tickets");
    return response.data;
  },
  getTicketDetails: async (ticketId) => {
    const response = await api.get(`/support/tickets/${ticketId}`);
    return response.data;
  },
  createTicket: async (data) => {
    const response = await api.post("/support/tickets", data);
    return response.data;
  },
  sendTicketMessage: async (ticketId, data) => {
    const response = await api.post(`/support/tickets/${ticketId}/message`, data);
    return response.data;
  },
};

export const calendarAPI = {
  getEvents: async () => {
    const response = await api.get("/calendar/events");
    return response.data;
  },
};

export const inboxAPI = {
  getThreads: async () => {
    const response = await api.get("/inbox/threads");
    return response.data;
  },
  getThreadMessages: async (partnerId) => {
    const response = await api.get(`/inbox/threads/${partnerId}`);
    return response.data;
  },
  sendMessage: async (recipientId, subject, message) => {
    const response = await api.post("/inbox/messages", {
      recipient_id: recipientId,
      subject,
      message
    });
    return response.data;
  },
};

export default api;
