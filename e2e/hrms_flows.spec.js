// e2e/hrms_flows.spec.js
const { test, expect } = require("@playwright/test");

test.describe("HRMS Employee Portal E2E User Journeys", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to local development portal
    await page.goto("http://localhost:5173/");
  });

  test("should authenticate and complete daily workspace flows", async ({ page }) => {
    // 1. Login flow
    await expect(page.locator("h1")).toContainText("Employee Portal Login");
    
    await page.fill('input[type="email"]', "qa@zeai.com");
    await page.fill('input[type="password"]', "password123");
    await page.click('button[type="submit"]');

    // Should land on Dashboard
    await expect(page).toHaveURL(/.*dashboard/);
    await expect(page.locator("h1")).toContainText("Welcome back");

    // 2. Attendance mark flow
    await page.click('text="Attendance"');
    await expect(page).toHaveURL(/.*attendance/);
    
    const clockButton = page.locator(".action-btn");
    await expect(clockButton).toBeVisible();
    // Simulate check-in
    await clockButton.click();
    
    // 3. Apply Leave flow
    await page.click('text="Leave"');
    await expect(page).toHaveURL(/.*leave/);
    
    await page.click('button:has-text("Apply Leave")');
    await page.selectOption("select", { label: "Sick Leave" });
    await page.fill('input[type="date"]', "2026-07-20");
    // End Date
    await page.locator('input[type="date"]').nth(1).fill("2026-07-22");
    await page.fill("textarea", "Dental appointment recovery");
    await page.click('button:has-text("Submit Request")');

    // 4. Payroll Verification flow
    await page.click('text="Payroll"');
    await expect(page).toHaveURL(/.*payroll/);
    await expect(page.locator("h3")).toContainText("Payslip Breakdown");

    // 5. Messages thread view
    await page.click('text="Messages"');
    await expect(page).toHaveURL(/.*messages/);
    await page.fill('textarea[placeholder="Type a message..."]', "Hi Manager, I submitted my leave request for review.");
    await page.click('button:has-text("Send")');

    // 6. Raise Support ticket
    await page.click('text="Support"');
    await expect(page).toHaveURL(/.*support/);
    await page.selectOption('select', { label: "IT Support" });
    await page.fill('input[placeholder="Enter subject"]', "Secondary Screen Blurry");
    await page.fill('textarea[placeholder="Describe your issue..."]', "My second monitor displays text in low resolution");
    await page.click('button:has-text("Submit Ticket")');

    // 7. Settings update
    await page.click('text="Settings"');
    await expect(page).toHaveURL(/.*settings/);
    // Toggle Email Notification check
    await page.click('input[type="checkbox"]');
    await page.click('button:has-text("Save Changes")');

    // 8. Logout flow
    await page.click('text="Logout"');
    await expect(page).toHaveURL(/.*login/);
  });
});
