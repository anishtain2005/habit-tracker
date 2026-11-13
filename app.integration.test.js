/**
 * @jest-environment jsdom
 */
const fs = require("fs");
const path = require("path");

// صفحه را مثل مرورگر بارگذاری می‌کند و app.js را اجرا می‌کند
function loadApp() {
  const html = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");
  document.body.innerHTML = html.match(/<body>([\s\S]*)<\/body>/)[1];
  jest.resetModules();
  global.calculateStreak = require("./streak").calculateStreak;
  require("./app.js");
}

// مثل کاربر: اسم عادت را می‌نویسد و فرم را ارسال می‌کند
function addHabit(name) {
  document.getElementById("habit-name").value = name;
  document
    .getElementById("habit-form")
    .dispatchEvent(new Event("submit", { cancelable: true }));
}

beforeEach(() => {
  localStorage.clear();
  loadApp();
});

test("افزودن عادت، آن را با استریک ۰ نشان می‌دهد", () => {
  addHabit("مطالعه");
  const item = document.querySelector("#habit-list li");
  expect(item.textContent).toContain("مطالعه");
  expect(item.textContent).toContain("استریک: 0 روز");
});

test("زدن دکمه انجام دادم، استریک را ۱ می‌کند", () => {
  addHabit("ورزش");
  document.querySelector("#habit-list li button").click();
  const item = document.querySelector("#habit-list li");
  expect(item.textContent).toContain("استریک: 1 روز");
  expect(item.querySelector("button").disabled).toBe(true);
});

test("عادت‌ها بعد از بارگذاری دوباره صفحه می‌مانند", () => {
  addHabit("مطالعه");
  loadApp(); // مثل رفرش صفحه
  expect(document.querySelectorAll("#habit-list li").length).toBe(1);
});

test("دکمه حذف، عادت را پاک می‌کند", () => {
  addHabit("مطالعه");
  document.querySelectorAll("#habit-list li button")[1].click();
  expect(document.querySelectorAll("#habit-list li").length).toBe(0);
});

test("تاریخ امروز بالای صفحه نمایش داده می‌شود", () => {
  expect(document.getElementById("today-date").textContent).toContain("تاریخ امروز");
});