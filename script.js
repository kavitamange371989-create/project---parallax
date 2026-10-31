
/* =====================================
   PARALLAX v5.0
   THE IDENTITY PROTOCOL
===================================== */

const $ = id => document.getElementById(id);

let stability = 87;
let memories = [];
let anomalies = [];
let events = [];
let selectedIdentity = "NONE";
let orbClicks = 0;
let orbTimer;
let identityBuffer = "";

const identities = {
  P: {
    name: "PREM",
    tagline: "THE FUTURE FOOTBALLER & CODER",
    details: [
      "Studying in Class 10th",
      "Coding Enthusiast",
      "Future Footballer ⚽"
    ]
  },
  S: {
    name: "SHIV",
    tagline: "THE FUTURE SCIENTIST",
    details: [
      "Studying in Class 4th",
      "Likes to play with toys and blocks all day",
      "Future Scientist 🔬"
    ]
  },
  K: {
    name: "KRISHNA",
    tagline: "THE ALL-ROUNDER",
    details: [
      "Class 10th Pass-out",
      "All-rounder",
      "A Good Big Brother and Cousin Brother"
    ]
  }
};

const identityGreetings = {
  prem: "Hi Prem! 👋 Welcome back, Operator.",
  shiv: "Hi Shiv! 👋 The system recognizes you.",
  krishna: "Hi Krishna! 👋 A new visitor has entered."
};

const memoryFragments = [
  "Memory 001: Reality is a collection of possibilities.",
  "Memory 002: Every decision creates a different timeline.",
  "Memory 003: The unknown is not always dangerous.",
  "Memory 004: Some signals exist beyond human understanding.",
  "Memory 005: The operator is part of the experiment."
];

const anomalyMessages = [
  "Unknown energy signature detected.",
  "A signal from an unidentified timeline was found.",
  "Reality distortion detected in Sector 03.",
  "An encrypted message is trying to connect.",
  "An unknown presence has been detected."
];

// TOAST NOTIFICATION
function toast(message) {
  const box = $("toast");
  box.textContent = message;
  box.classList.add("show");

  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => {
    box.classList.remove("show");
  }, 2800);
}

// TIMELINE
function addEvent(message) {
  events.unshift({
    message,
    time: new Date().toLocaleTimeString()
  });

  renderTimeline();
}

function renderTimeline() {
  const list = $("timelineList");
  list.innerHTML = "";

  if (events.length === 0) {
    list.textContent = "No timeline events recorded yet.";
    return;
  }

  events.forEach(event => {
    const item = document.createElement("div");
    item.className = "timeline-entry";

    const title = document.createElement("strong");
    title.textContent = event.message;

    const time = document.createElement("small");
    time.textContent = event.time;

    item.append(title, time);
    list.appendChild(item);
  });
}

// SYSTEM STATS
function updateStats() {
  $("stabilityText").textContent = stability + "%";
  $("stabilityBar").style.width = stability + "%";
  $("memoryCount").textContent = memories.length;
  $("anomalyCount").textContent = anomalies.length;
  $("sectorName").textContent = selectedIdentity;
}

// NAVIGATION
function showPage(pageName) {
  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });

  document.querySelectorAll(".nav-btn").forEach(button => {
    button.classList.remove("active");
  });

  const page = $(pageName);
  if (page) page.classList.add("active");

  const nav = document.querySelector(`[data-page="${pageName}"]`);
  if (nav) nav.classList.add("active");

  addEvent("Opened " + pageName.toUpperCase());
}

document.querySelectorAll(".nav-btn").forEach(button => {
  button.addEventListener("click", () => {
    showPage(button.dataset.page);
  });
});

document.querySelectorAll("[data-goto]").forEach(button => {
  button.addEventListener("click", () => {
    showPage(button.dataset.goto);
  });
});

// CLOCK
function updateClock() {
  $("clock").textContent = new Date().toLocaleTimeString();
}

setInterval(updateClock, 1000);
updateClock();

// NEURAL CORE EASTER EGG
$("coreOrb").addEventListener("click", () => {
  orbClicks++;

  toast("NEURAL CORE RESPONSE: " + orbClicks + "/5");

  clearTimeout(orbTimer);

  orbTimer = setTimeout(() => {
    orbClicks = 0;
  }, 1800);

  if (orbClicks >= 5) {
    orbClicks = 0;
    toast("SECRET ACCESS UNLOCKED: VOID RUNNER");
    addEvent("Secret mini-game unlocked");
    openGame();
  }
});

// IDENTITY PROTOCOL
function unlockIdentity(code) {
  const data = identities[code];
  if (!data) return;

  selectedIdentity = code;

  $("identityEmpty").classList.add("hidden");
  $("identityCard").classList.remove("hidden");

  // Restart reveal animation
  $("identityCard").style.animation = "none";
  void $("identityCard").offsetWidth;
  $("identityCard").style.animation = "";

  $("identityAvatar").textContent = code;
  $("identityCode").textContent = "SECTOR " + code;
  $("identityName").textContent = data.name;
  $("identityTagline").textContent = data.tagline;

  const info = $("identityInfo");
  info.innerHTML = "";

  data.details.forEach(detail => {
    const line = document.createElement("div");
    line.textContent = detail;
    info.appendChild(line);
  });

  document.querySelectorAll(".identity-node").forEach(node => {
    node.classList.toggle("selected", node.dataset.sector === code);
  });

  updateStats();
  toast("IDENTITY VERIFIED: " + data.name);
  addEvent("Identity file accessed: " + data.name);
}

document.querySelectorAll(".identity-node").forEach(node => {
  node.addEventListener("click", () => {
    unlockIdentity(node.dataset.sector);
  });
});

$("lockIdentity").addEventListener("click", () => {
  $("identityCard").classList.add("hidden");
  $("identityEmpty").classList.remove("hidden");

  document.querySelectorAll(".identity-node").forEach(node => {
    node.classList.remove("selected");
  });

  selectedIdentity = "NONE";
  updateStats();

  toast("IDENTITY FILE LOCKED");
  addEvent("Identity file locked");
});

// ANOMALY SCANNER GREETING BUTTONS
document.querySelectorAll(".identity-btn").forEach(button => {
  button.addEventListener("click", () => {
    const identity = button.dataset.identity;
    toast(identityGreetings[identity]);

    addEvent("Greeting activated: " + identity.toUpperCase());
  });
});

// KEYBOARD EASTER EGGS
const identitySecrets = {
  "hi prem": identityGreetings.prem,
  "hi shiv": identityGreetings.shiv,
  "hi krishna": identityGreetings.krishna
};

document.addEventListener("keydown", event => {
  if (event.repeat || event.ctrlKey || event.altKey || event.metaKey) return;

  if (event.key === "Escape") {
    identityBuffer = "";
    return;
  }

  if (event.key.length === 1) {
    identityBuffer += event.key.toLowerCase();
    identityBuffer = identityBuffer.slice(-20);

    for (const [command, message] of Object.entries(identitySecrets)) {
      if (identityBuffer.endsWith(command)) {
        toast(message);
        addEvent("Secret identity command activated");
        identityBuffer = "";
        break;
      }
    }
  }
});

// ANOMALY SCANNER
$("scanBtn").addEventListener("click", () => {
  const button = $("scanBtn");

  button.disabled = true;
  button.textContent = "SCANNING...";

  $("scanTitle").textContent = "SCANNING REALITY";
  $("scanDescription").textContent = "Searching for unknown signals...";
  $("scannerCircle").classList.add("scanning");

  setTimeout(() => {
    const message = anomalyMessages[
      Math.floor(Math.random() * anomalyMessages.length)
    ];

    anomalies.unshift(message);

    const item = document.createElement("div");
    item.className = "anomaly-item";

    const label = document.createElement("span");
    label.textContent = "ANOMALY DETECTED";

    const description = document.createElement("p");
    description.textContent = message;

    item.append(label, description);

    if (anomalies.length === 1) {
      $("anomalyList").innerHTML = "";
    }

    $("anomalyList").prepend(item);

    $("scanTitle").textContent = "ANOMALY DETECTED";
    $("scanDescription").textContent = message;
    $("scannerCircle").classList.remove("scanning");

    button.disabled = false;
    button.textContent = "SCAN AGAIN";

    stability = Math.max(30, stability - 1);
    updateStats();

    toast("New anomaly detected!");
    addEvent("Anomaly detected by scanner");
  }, 1800);
});

// STORY CHOICES
$("investigateBtn").addEventListener("click", () => {
  $("storyText").textContent =
    "You followed the signal. A hidden memory fragment has been recovered. The system is beginning to change.";

  recoverMemory();
  stability = Math.min(100, stability + 2);
  updateStats();

  addEvent("Operator investigated the unknown signal");
  toast("Memory fragment recovered!");
});

$("ignoreBtn").addEventListener("click", () => {
  $("storyText").textContent =
    "You ignored the signal. But something tells you it will return.";

  stability = Math.max(30, stability - 2);
  updateStats();

  addEvent("Operator ignored the signal");
  toast("Signal ignored.");
});

// MEMORY VAULT
function recoverMemory() {
  const available = memoryFragments.filter(
    fragment => !memories.includes(fragment)
  );

  if (available.length === 0) {
    toast("All memory fragments recovered!");
    return;
  }

  const fragment = available[
    Math.floor(Math.random() * available.length)
  ];

  memories.push(fragment);

  const item = document.createElement("div");
  item.className = "memory-item";
  item.textContent = fragment;

  if (memories.length === 1) {
    $("memoryList").innerHTML = "";
  }

  $("memoryList").prepend(item);
  updateStats();
}

// =====================================
// VOID RUNNER MINI GAME
// =====================================

const canvas = $("gameCanvas");
const ctx = canvas.getContext("2d");

let gameRunning = false;
let gamePaused = false;
let gameScore = 0;
let gameLives = 3;
let player = { x: 285, y: 305 };
let crystals = [];
let asteroids = [];
let gameKeys = {};
let animationId = null;

let bestScore = Number(localStorage.getItem("parallaxBest") || 0);
$("bestScore").textContent = bestScore;

function openGame() {
  $("gameOverlay").classList.add("open");
  drawGame();
}

function closeGame() {
  gameRunning = false;
  cancelAnimationFrame(animationId);
  $("gameOverlay").classList.remove("open");
}

$("closeGame").addEventListener("click", closeGame);

function resetGame() {
  gameScore = 0;
  gameLives = 3;
  player = { x: 285, y: 305 };
  crystals = [];
  asteroids = [];
  gamePaused = false;
  gameKeys = {};

  $("gameScore").textContent = gameScore;
  $("gameLives").textContent = gameLives;
}

function drawGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < 45; i++) {
    const x = (i * 97) % canvas.width;
    const y = (i * 53) % canvas.height;

    ctx.fillStyle = "#526d91";
    ctx.fillRect(x, y, 2, 2);
  }

  // Spaceship
  ctx.fillStyle = "#36eaff";
  ctx.beginPath();
  ctx.moveTo(player.x, player.y - 17);
  ctx.lineTo(player.x - 13, player.y + 13);
  ctx.lineTo(player.x + 13, player.y + 13);
  ctx.closePath();
  ctx.fill();

  // Crystals
  crystals.forEach(crystal => {
    ctx.fillStyle = "#b77cff";
    ctx.shadowBlur = 15;
    ctx.shadowColor = "#b77cff";
    ctx.fillRect(crystal.x, crystal.y, 10, 10);
    ctx.shadowBlur = 0;
  });

  // Asteroids
  asteroids.forEach(asteroid => {
    ctx.fillStyle = "#ff647c";
    ctx.beginPath();
    ctx.arc(asteroid.x, asteroid.y, asteroid.size, 0, Math.PI * 2);
    ctx.fill();
  });

  if (!gameRunning) {
    ctx.fillStyle = "#36eaff";
    ctx.font = "16px Orbitron";
    ctx.textAlign = "center";
    ctx.fillText("VOID RUNNER READY", 300, 175);
  }

  if (gamePaused && gameRunning) {
    ctx.fillStyle = "#ffffff";
    ctx.font = "20px Orbitron";
    ctx.textAlign = "center";
    ctx.fillText("PAUSED", 300, 175);
  }
}

function spawnObjects() {
  if (Math.random() < 0.035) {
    crystals.push({
      x: Math.random() * (canvas.width - 20) + 10,
      y: -10
    });
  }

  if (Math.random() < 0.025) {
    asteroids.push({
      x: Math.random() * (canvas.width - 30) + 15,
      y: -20,
      size: 9 + Math.random() * 7
    });
  }
}

function gameLoop() {
  if (!gameRunning) return;

  if (!gamePaused) {
    if (gameKeys.ArrowLeft || gameKeys.a) player.x -= 5;
    if (gameKeys.ArrowRight || gameKeys.d) player.x += 5;
    if (gameKeys.ArrowUp || gameKeys.w) player.y -= 5;
    if (gameKeys.ArrowDown || gameKeys.s) player.y += 5;

    player.x = Math.max(15, Math.min(canvas.width - 15, player.x));
    player.y = Math.max(20, Math.min(canvas.height - 15, player.y));

    spawnObjects();

    crystals.forEach(crystal => crystal.y += 3);
    asteroids.forEach(asteroid => asteroid.y += 3.5);

    crystals = crystals.filter(crystal => {
      const distance = Math.hypot(
        player.x - crystal.x,
        player.y - crystal.y
      );

      if (distance < 23) {
        gameScore += 10;
        $("gameScore").textContent = gameScore;
        return false;
      }

      return crystal.y < canvas.height + 20;
    });

    asteroids = asteroids.filter(asteroid => {
      const distance = Math.hypot(
        player.x - asteroid.x,
        player.y - asteroid.y
      );

      if (distance < asteroid.size + 12) {
        gameLives--;
        $("gameLives").textContent = gameLives;

        if (gameLives <= 0) {
          endGame();
        }

        return false;
      }

      return asteroid.y < canvas.height + 30;
    });
  }

  drawGame();
  animationId = requestAnimationFrame(gameLoop);
}

function startGame() {
  resetGame();
  gameRunning = true;
  $("startGame").textContent = "RESTART GAME";

  cancelAnimationFrame(animationId);
  gameLoop();
}

function endGame() {
  gameRunning = false;
  cancelAnimationFrame(animationId);

  if (gameScore > bestScore) {
    bestScore = gameScore;
    localStorage.setItem("parallaxBest", bestScore);
    $("bestScore").textContent = bestScore;
  }

  toast("GAME OVER! FINAL SCORE: " + gameScore);
  addEvent("VOID RUNNER finished with score " + gameScore);
  drawGame();
}

$("startGame").addEventListener("click", startGame);

document.addEventListener("keydown", event => {
  if (!gameRunning) return;

  gameKeys[event.key] = true;

  if (event.key.toLowerCase() === "p") {
    gamePaused = !gamePaused;
    toast(gamePaused ? "GAME PAUSED" : "GAME RESUMED");
  }
});

document.addEventListener("keyup", event => {
  gameKeys[event.key] = false;
});

canvas.addEventListener("touchmove", event => {
  if (!gameRunning) return;

  event.preventDefault();

  const rect = canvas.getBoundingClientRect();
  const touch = event.touches[0];

  player.x = (touch.clientX - rect.left) *
    (canvas.width / rect.width);

  player.y = (touch.clientY - rect.top) *
    (canvas.height / rect.height);
}, { passive: false });

// INITIALIZE SYSTEM
addEvent("PARALLAX v5.0 system initialized");
addEvent("Operator access granted");

updateStats();
renderTimeline();
drawGame();

console.log("PARALLAX v5.0 ONLINE");
console.log("IDENTITY PROTOCOL: P / S / K");
console.log("Secret commands: hi prem, hi shiv, hi krishna");
console.log("Click Neural Core 5 times to unlock VOID RUNNER.");
