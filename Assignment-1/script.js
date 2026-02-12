// ===============================
// DOM Traversal & Selection
// ===============================
const eventForm = document.getElementById("eventForm");
const titleInput = document.getElementById("title");
const dateInput = document.getElementById("date");
const categoryInput = document.getElementById("category");
const descInput = document.getElementById("desc");

const msg = document.getElementById("msg");
const eventsContainer = document.getElementById("eventsContainer");
const emptyText = document.getElementById("emptyText");

const clearAllBtn = document.getElementById("clearAllBtn");
const sampleBtn = document.getElementById("sampleBtn");

const pressedKey = document.getElementById("pressedKey");

// Data storage (in-memory)
let events = [];

// ===============================
// Helper Functions
// ===============================
function showMessage(text, type = "success") {
  msg.textContent = text;

  // Text & Style Manipulation
  msg.style.color = type === "error" ? "#d10000" : "#0b6b40";

  setTimeout(() => {
    msg.textContent = "";
  }, 2000);
}

function updateEmptyText() {
  emptyText.style.display = events.length === 0 ? "block" : "none";
}

function badgeClass(category) {
  return category.toLowerCase();
}

function renderEvents() {
  // Clear current UI cards
  eventsContainer.querySelectorAll(".event-card").forEach(card => card.remove());

  // Create cards dynamically
  events.forEach((ev) => {
    const card = document.createElement("div");
    card.className = "event-card";
    card.dataset.id = ev.id;

    // completed style
    if (ev.completed) card.classList.add("completed");

    card.innerHTML = `
      <button class="delete-btn" data-action="delete">×</button>
      <h3 class="event-title">${ev.title}</h3>
      <p class="event-date">📅 ${ev.date}</p>
      <span class="badge ${badgeClass(ev.category)}">${ev.category}</span>
      <p class="event-desc">${ev.desc}</p>
      <button class="btn light" data-action="toggle">Mark ${ev.completed ? "Uncompleted" : "Completed"}</button>
    `;

    eventsContainer.appendChild(card);
  });

  updateEmptyText();
}

// ===============================
// 1) Event Creation Form
// 4) Event Handling & Interaction
// ===============================
eventForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = titleInput.value.trim();
  const date = dateInput.value;
  const category = categoryInput.value;
  const desc = descInput.value.trim();

  if (!title || !date || !category) {
    showMessage("Please fill all required fields!", "error");
    return;
  }

  const newEvent = {
    id: Date.now(),
    title,
    date,
    category,
    desc: desc || "No description provided.",
    completed: false
  };

  events.push(newEvent);

  // Reset form
  eventForm.reset();

  showMessage("Event Added Successfully!");
  renderEvents();
});

// ===============================
// 5) Event Delegation
// ===============================
eventsContainer.addEventListener("click", (e) => {
  const action = e.target.dataset.action;
  if (!action) return;

  // DOM traversal
  const card = e.target.closest(".event-card");
  if (!card) return;

  const id = Number(card.dataset.id);

  // delete event
  if (action === "delete") {
    events = events.filter(ev => ev.id !== id);
    showMessage("Event Deleted!");
    renderEvents();
  }

  // toggle completed
  if (action === "toggle") {
    events = events.map(ev => {
      if (ev.id === id) {
        return { ...ev, completed: !ev.completed };
      }
      return ev;
    });
    renderEvents();
  }
});

// ===============================
// Clear All Events
// ===============================
clearAllBtn.addEventListener("click", () => {
  events = [];
  showMessage("All events cleared!");
  renderEvents();
});

// ===============================
// Add Sample Events
// ===============================
sampleBtn.addEventListener("click", () => {
  const sampleEvents = [
    {
      id: Date.now() + 1,
      title: "Web Development Conference",
      date: "2026-02-15",
      category: "Conference",
      desc: "Annual conference on modern web technologies.",
      completed: false
    },
    {
      id: Date.now() + 2,
      title: "JavaScript Workshop",
      date: "2026-02-20",
      category: "Workshop",
      desc: "Hands-on JavaScript learning session.",
      completed: false
    }
  ];

  events = [...events, ...sampleEvents];
  showMessage("Sample Events Added!");
  renderEvents();
});

// ===============================
// 6) Text & Style Manipulation
// DOM Manipulation Demo
// ===============================
document.addEventListener("keydown", (e) => {
  // Change text dynamically
  pressedKey.innerHTML = `You Pressed: <b>${e.key}</b>`;

  // Change style dynamically
  pressedKey.style.color = "#111";
});
