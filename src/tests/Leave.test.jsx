// src/tests/Leave.test.jsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Leave from "../pages/Leave/Leave";
import { leaveAPI } from "../services/api";
import { useOutletContext } from "react-router-dom";

// Mock router context
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useOutletContext: jest.fn(),
}));

// Mock API services
jest.mock("../services/api", () => ({
  leaveAPI: {
    getBalances: jest.fn(),
    getRequests: jest.fn(),
    createRequest: jest.fn(),
  },
}));

const mockEmployee = {
  id: "11111111-2222-3333-4444-555555555555",
  full_name: "Test QA User",
  email: "qa@zeai.com",
};

describe("Leave Page Unit Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useOutletContext.mockReturnValue({ employee: mockEmployee });
    leaveAPI.getBalances.mockResolvedValue({
      casual_total: 12,
      casual_used: 2,
      sick_total: 10,
      sick_used: 1,
      earned_total: 20,
      earned_used: 0,
    });
    leaveAPI.getRequests.mockResolvedValue([
      {
        id: 1,
        leave_type: "Sick Leave",
        from_date: "2026-07-13",
        to_date: "2026-07-14",
        total_days: 2,
        status: "Approved",
      },
    ]);
  });

  test("renders leave page and displays balances correctly", async () => {
    render(<Leave />);

    // Verify loading and then details rendering
    await waitFor(() => {
      expect(screen.getByText("Leave Balance")).toBeInTheDocument();
      // Earned leaves left: 20 - 0 = 20
      expect(screen.getByText("20 Days")).toBeInTheDocument();
      // Sick leaves left: 10 - 1 = 9
      expect(screen.getByText("9 Days")).toBeInTheDocument();
      // Casual leaves left: 12 - 2 = 10
      expect(screen.getByText("10 Days")).toBeInTheDocument();
    });
  });

  test("opens apply leave modal and submits request successfully", async () => {
    leaveAPI.createRequest.mockResolvedValue({ message: "Success" });
    window.alert = jest.fn();

    render(<Leave />);

    await waitFor(() => {
      expect(screen.getByText("Apply Leave")).toBeInTheDocument();
    });

    // Click Apply Leave button to open modal
    const applyButton = screen.getByRole("button", { name: /Apply Leave/i });
    fireEvent.click(applyButton);

    // Form inputs
    const leaveTypeSelect = screen.getByLabelText(/Leave Type/i);
    const startDateInput = screen.getByLabelText(/Start Date/i);
    const endDateInput = screen.getByLabelText(/End Date/i);
    const reasonTextarea = screen.getByLabelText(/Reason/i);
    const submitButton = screen.getByRole("button", { name: /Submit Request/i });

    // Fill form
    fireEvent.change(leaveTypeSelect, { target: { value: "Sick" } });
    fireEvent.change(startDateInput, { target: { value: "2026-07-15" } });
    fireEvent.change(endDateInput, { target: { value: "2026-07-16" } });
    fireEvent.change(reasonTextarea, { target: { value: "Fever recovery" } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(leaveAPI.createRequest).toHaveBeenCalledWith({
        leave_type: "Sick Leave",
        from_date: "2026-07-15",
        to_date: "2026-07-16",
        total_days: 2,
        session: "Full Day",
        leave_reason: "Fever recovery",
        reason_details: null,
      });
      expect(window.alert).toHaveBeenCalledWith("Leave request submitted successfully!");
    });
  });

  test("shows error when start date is after end date", async () => {
    window.alert = jest.fn();

    render(<Leave />);

    await waitFor(() => {
      const applyButton = screen.getByRole("button", { name: /Apply Leave/i });
      fireEvent.click(applyButton);
    });

    const startDateInput = screen.getByLabelText(/Start Date/i);
    const endDateInput = screen.getByLabelText(/End Date/i);
    const submitButton = screen.getByRole("button", { name: /Submit Request/i });

    fireEvent.change(startDateInput, { target: { value: "2026-07-15" } });
    fireEvent.change(endDateInput, { target: { value: "2026-07-14" } }); // Invalid range

    fireEvent.click(submitButton);

    expect(window.alert).toHaveBeenCalledWith("End Date must be on or after Start Date.");
    expect(leaveAPI.createRequest).not.toHaveBeenCalled();
  });
});
