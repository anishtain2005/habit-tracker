const STORAGE_KEY = "habits";

// تاریخ امروز به شکل 2026-11-13
function todayString() {
  const d = new Date();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return d.getFullYear() + "-" + month + "-" + day;
}

// خواندن و ذخیره عادت‌ها در حافظه مرورگر
function loadHabits() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveHabits(habits) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
}

// نمایش لیست عادت‌ها روی صفحه
function render() {
  const list = document.getElementById("habit-list");
  list.innerHTML = "";

  const habits = loadHabits();
  const today = todayString();

  habits.forEach(function (habit, index) {
    const li = document.createElement("li");

    const streak = calculateStreak(habit.doneDates, today);
    const doneToday = habit.doneDates.includes(today);

    const text = document.createElement("span");
    text.textContent = habit.name + " | استریک: " + streak + " روز";

    const doneBtn = document.createElement("button");
    doneBtn.textContent = doneToday ? "امروز انجام شد ✓" : "انجام دادم";
    doneBtn.disabled = doneToday;
    doneBtn.onclick = function () {
      habit.doneDates.push(today);
      saveHabits(habits);
      render();
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "حذف";
    deleteBtn.onclick = function () {
      habits.splice(index, 1);
      saveHabits(habits);
      render();
    };

    li.appendChild(text);
    li.appendChild(doneBtn);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}

// وقتی فرم ارسال شد، عادت جدید اضافه کن
document.getElementById("habit-form").addEventListener("submit", function (event) {
  event.preventDefault();
  const input = document.getElementById("habit-name");
  const name = input.value.trim();
  if (name === "") return;

  const habits = loadHabits();
  habits.push({ name: name, doneDates: [] });
  saveHabits(habits);

  input.value = "";
  render();
});

render();