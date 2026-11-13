const { test, expect } = require("@playwright/test");
const path = require("path");
const { pathToFileURL } = require("url");

const pageUrl = pathToFileURL(path.join(__dirname, "..", "index.html")).href;

test.beforeEach(async ({ page }) => {
  await page.goto(pageUrl);
  await page.evaluate(() => localStorage.clear());
  await page.reload();
});

test("کاربر عادت اضافه می‌کند و آن را در لیست می‌بیند", async ({ page }) => {
  await page.fill("#habit-name", "مطالعه");
  await page.click("text=افزودن");
  await expect(page.locator("#habit-list li")).toHaveCount(1);
  await expect(page.locator("#habit-list li")).toContainText("مطالعه");
  await expect(page.locator("#habit-list li")).toContainText("استریک: 0 روز");
});

test("کاربر انجام دادم را می‌زند و استریک ۱ می‌شود", async ({ page }) => {
  await page.fill("#habit-name", "ورزش");
  await page.click("text=افزودن");
  await page.click("text=انجام دادم");
  await expect(page.locator("#habit-list li")).toContainText("استریک: 1 روز");
});

test("بعد از رفرش صفحه، عادت‌ها باقی می‌مانند", async ({ page }) => {
  await page.fill("#habit-name", "مطالعه");
  await page.click("text=افزودن");
  await page.reload();
  await expect(page.locator("#habit-list li")).toHaveCount(1);
});

test("کاربر عادت را حذف می‌کند", async ({ page }) => {
  await page.fill("#habit-name", "مطالعه");
  await page.click("text=افزودن");
  await page.click("text=حذف");
  await expect(page.locator("#habit-list li")).toHaveCount(0);
});