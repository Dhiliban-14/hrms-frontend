// src/tests/Attendance.test.jsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Attendance from "../pages/Attendance/Attendance";
import { attendanceAPI } from "../services/api";
import { useOutletContext } from "react-router-dom";

// Mock router context
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useOutletContext: jest.fn(),
}));

// Mock API services
jest.mock("../services/api", () => ({
  attendanceAPI: {
    getLogs: jest.fn(),
    getMetrics: jest.fn(),
    checkIn: jest.fn(),
    checkOut: jest.fn(),
    resetTodayAttendance: jest.fn(),
  },
}));

const mockEmployee = {
  id: "11111111-2222-3333-4444-555555555555",
  full_name: "Test QA User",
};

describe("Attendance Page Unit Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useOutletContext.mockReturnValue({ employee: mockEmployee });
    attendanceAPI.getMetrics.mockResolvedValue({
      present_days: 10,
      absent_days: 2,
      late_days: 1,
      total_hours: 85.5,
      overtime_hours: 5.0,
    });
    attendanceAPI.getLogs.mockResolvedValue([]);
  });

  test("renders attendance page and fetches stats correctly", async () => {
    render(<Attendance />);

    await waitFor(() => {
      expect(screen.getByText("Present Days")).toBeInTheDocument();
      expect(screen.getByText("Late Arrivals")).toBeInTheDocument();
      // Present days count
      expect(screen.getByText("10")).toBeInTheDocument();
    });
  });

  test("triggers check-in correctly when no check-in exists for today", async () => {
    attendanceAPI.checkIn.mockResolvedValue({ status: "PRESENT" });
    window.alert = jest.fn();

    render(<Attendance />);

    await waitFor(() => {
      const checkInBtn = screen.getByRole("button", { name: /Check In/i });
      fireEvent.click(checkInBtn);
    });

    await waitFor(() => {
      expect(attendanceAPI.checkIn).toHaveBeenCalledWith({
        remarks: "Web check-in",
      });
      expect(window.alert).toHaveBeenCalledWith("Checked in successfully!");
    });
  });
});
