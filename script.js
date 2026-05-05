// Project information that appears inside the popup.
const projects = {
  brain: {
    color: "#d946ef",
    mark: "idea",
    title: "Where It Begins",
    kicker: "Types of People in the Elevator",
    description:
      "A concept-driven experience that translates a physical space into a digital one. This piece reflects the foundation of my thinking, where structure, pacing, and interaction come together.\n\nThe idea before the outcome.",
    button: "View Project 1",
    link: "https://rawan-alali.github.io/Project-1-comms-lab-2026/",
  },
  eye: {
    color: "#3b82f6",
    mark: "vision",
    title: "Seeing the Unseen",
    kicker: "The Vermeer Case",
    description:
      "An interactive mystery where truth is built through observation. This piece focuses on sight, guiding users through video, evidence, and detail to question what they see.\n\nPerception is shaped, not given.",
    button: "View Project 4",
    link: "https://mimisosparkle.github.io/commLab-video-project/",
  },
  ear: {
    color: "#22c55e",
    mark: "sound",
    title: "Listening Between Moments",
    kicker: "Morning Cafe",
    description:
      "A story told through sound, where dialogue and atmosphere guide the experience. This piece focuses on listening, using audio to build emotion, pacing, and narrative.\n\nYou don’t just hear the story, you move through it.",
    button: "View Project 3",
    link: "https://nadsb26.github.io/commslab-project3/",
  },
  mouth: {
    color: "#fb923c",
    mark: "story",
    title: "Speaking Through Story",
    kicker: "Home is Where You Are",
    description:
      "An interactive narrative about belonging, told through gradual reveal and user interaction. This piece focuses on expression, showing how stories unfold through action, memory, and emotion.\n\nHome is not a place, it’s what stays.",
    button: "View Project 2",
    link: "https://rawan-alali.github.io/comic-1/",
  },
};

// Small SVG icons used in the popup so the visual language stays consistent.
const featureIcons = {
  idea:
    '<svg viewBox="0 0 48 48"><path d="M18 30c-5 0-8-3-8-7 0-3 2-5 5-6 1-4 5-6 9-4 2-3 8-2 9 2 4 0 7 3 7 7 0 4-3 7-7 7"/><path d="M24 13v22M17 18c4 0 5 3 3 6m11-7c-4 1-5 4-3 7m-12 6c3-3 7-3 10 0m7-2c-2-3-1-6 2-8"/></svg>',
  vision:
    '<svg viewBox="0 0 48 48"><path d="M7 24s6-9 17-9 17 9 17 9-6 9-17 9S7 24 7 24Z"/><circle cx="24" cy="24" r="5"/></svg>',
  sound:
    '<svg viewBox="0 0 48 48"><path d="M29 35c0-6 7-7 7-16 0-7-5-11-12-11S12 13 12 20"/><path d="M18 20c0-4 3-7 7-7s7 3 7 7c0 7-7 8-7 13 0 4-3 7-7 7-2 0-4-1-5-3"/><path d="M20 21c0-3 2-5 5-5s5 2 5 5"/></svg>',
  story:
    '<svg viewBox="0 0 48 48"><path d="M8 24c5-5 10-7 16-2 6-5 11-3 16 2-6 5-26 5-32 0Z"/><path d="M10 24c6 3 22 3 28 0"/></svg>',
};

const stage = document.querySelector(".face-stage");
const faceShell = document.querySelector("#faceShell");
const buttons = document.querySelectorAll(".feature-button");
const popup = document.querySelector("#projectPopup");
const popupMark = document.querySelector("#popupMark");
const popupKicker = document.querySelector("#popupKicker");
const popupTitle = document.querySelector("#popupTitle");
const popupDescription = document.querySelector("#popupDescription");
const popupLink = document.querySelector("#popupLink");
const closePopup = document.querySelector(".close-popup");

// Keeps the poetic last line separate from the main paragraph.
function formatDescription(text) {
  const [body, note] = text.split("\n\n");
  if (!note) return body;
  return `${body}<span class="popup-note">${note}</span>`;
}

// Opens the correct project card when a feature is clicked.
function setActiveFeature(name) {
  const project = projects[name];
  if (!project) return;

  stage.dataset.active = name;
  document.documentElement.style.setProperty("--active-color", project.color);
  faceShell.classList.add("is-dimmed");

  // Mouse, keyboard, and focus states all use the same interaction system.
buttons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.feature === name);
  });

  popup.hidden = false;
  popup.dataset.feature = name;
  popupMark.dataset.mark = project.mark;
  popupMark.innerHTML = featureIcons[project.mark] || "";
  popupKicker.textContent = project.kicker;
  popupTitle.textContent = project.title;
  popupDescription.innerHTML = formatDescription(project.description);
  popupLink.textContent = project.button;
  popupLink.href = project.link;
}

// Returns the face to its quiet default state.
function clearActiveFeature() {
  delete stage.dataset.active;
  faceShell.classList.remove("is-dimmed");
  popup.hidden = true;
  buttons.forEach((button) => button.classList.remove("is-active"));
}

buttons.forEach((button) => {
  button.addEventListener("click", () => setActiveFeature(button.dataset.feature));
  button.addEventListener("mouseenter", () => stage.classList.add("is-hovering"));
  button.addEventListener("mouseleave", () => stage.classList.remove("is-hovering"));
  button.addEventListener("focus", () => stage.classList.add("is-hovering"));
  button.addEventListener("blur", () => stage.classList.remove("is-hovering"));
  button.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setActiveFeature(button.dataset.feature);
    }
  });
});

closePopup.addEventListener("click", clearActiveFeature);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") clearActiveFeature();
});
