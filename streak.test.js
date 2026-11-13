const { calculateStreak } = require("./streak");

test("بدون هیچ روزی، استریک صفر است", () => {
  expect(calculateStreak([], "2026-11-08")).toBe(0);
});

test("سه روز پشت‌سرهم تا امروز، استریک ۳ است", () => {
  const done = ["2026-11-06", "2026-11-07", "2026-11-08"];
  expect(calculateStreak(done, "2026-11-08")).toBe(3);
});

test("اگر امروز هنوز انجام نشده، از دیروز شمرده می‌شود", () => {
  const done = ["2026-11-06", "2026-11-07"];
  expect(calculateStreak(done, "2026-11-08")).toBe(2);
});

test("یک روز خالی استریک را قطع می‌کند", () => {
  const done = ["2026-11-05", "2026-11-07", "2026-11-08"];
  expect(calculateStreak(done, "2026-11-08")).toBe(2);
});

test("اگر آخرین انجام دو روز پیش بوده، استریک صفر است", () => {
  const done = ["2026-11-06"];
  expect(calculateStreak(done, "2026-11-08")).toBe(0);
});

test("مرز دو ماه درست شمرده می‌شود", () => {
  const done = ["2026-10-31", "2026-11-01"];
  expect(calculateStreak(done, "2026-11-01")).toBe(2);
});