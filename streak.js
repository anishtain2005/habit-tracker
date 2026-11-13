// تبدیل تاریخ مثل "2026-11-08" به یک عدد (شماره روز)
function toDay(dateString) {
  return new Date(dateString + "T00:00:00Z").getTime() / 86400000;
}

// محاسبه استریک: چند روز پشت‌سرهم عادت انجام شده
function calculateStreak(doneDates, today) {
  const days = new Set(doneDates.map(toDay));
  let current = toDay(today);

  // اگر امروز هنوز انجام نشده، استریک از دیروز حساب می‌شود
  if (!days.has(current)) {
    current = current - 1;
  }

  let streak = 0;
  while (days.has(current)) {
    streak = streak + 1;
    current = current - 1;
  }
  return streak;
}

module.exports = { calculateStreak };