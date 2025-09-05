const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const nav = document.querySelector("nav");

// Toggle mobile menu
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Hide navbar on scroll down, show on scroll up
let lastScrollY = window.scrollY;
window.addEventListener("scroll", () => {
  if (window.scrollY > lastScrollY) {
    nav.classList.add("hidden"); // scrolling down → hide
  } else {
    nav.classList.remove("hidden"); // scrolling up → show
  }
  lastScrollY = window.scrollY;
});

// Loader fade-out after 3 seconds
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  setTimeout(() => {
    loader.classList.add("hidden");
  }, 1000); // 3 seconds
});

// Generate random snowflakes inside loader
window.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");

  for (let i = 0; i < 20; i++) { // number of snowflakes
    const snowflake = document.createElement("div");
    snowflake.classList.add("snowflake");
    snowflake.textContent = ["❄", "❅", "❆"][Math.floor(Math.random() * 3)];

    // random positions
    snowflake.style.top = Math.random() * 100 + "%";
    snowflake.style.left = Math.random() * 100 + "%";

    // random animation delay + size
    snowflake.style.fontSize = (Math.random() * 20 + 10) + "px";
    snowflake.style.animationDelay = (Math.random() * 5) + "s";
    snowflake.style.animationDuration = (3 + Math.random() * 4) + "s";

    loader.appendChild(snowflake);

    snowflake.style.animationDuration = (1.5 + Math.random() * 2.5) + "s";

  }
});

// Fetch Minecraft players
async function fetchMinecraftPlayers() {
  try {
    const res = await fetch("https://api.mcsrvstat.us/2/play.magbungkal.com:20000");
    const data = await res.json();

    if (data.online) {
      document.getElementById("mc-players").textContent =
        `Players Online: ${data.players.online}/${data.players.max}`;
      document.getElementById("mc-players-thumb").textContent =
        `MC Online: ${data.players.online}`;
    } else {
      document.getElementById("mc-players").textContent = "Server Offline";
      document.getElementById("mc-players-thumb").textContent = "Server Offline";
    }
  } catch (err) {
    console.error("Error fetching MC status:", err);
  }
}

// Smooth counter animation
function animateCount(element, start, end, duration = 1000) {
  let startTime = null;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const value = Math.floor(progress * (end - start) + start);
    element.textContent = value;
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

// Fetch Minecraft players
async function fetchMinecraftPlayers() {
  try {
    const res = await fetch("https://api.mcsrvstat.us/2/play.magbungkal.com:20000");
    const data = await res.json();

    const mcHero = document.getElementById("mc-players");
    const mcThumb = document.getElementById("mc-players-thumb");

    if (data.online) {
      animateCount(mcHero, 0, data.players.online);
      animateCount(mcThumb, 0, data.players.online);

      mcHero.textContent = `Players Online: ${data.players.online}/${data.players.max}`;
      mcThumb.textContent = `MC Online: ${data.players.online}`;
    } else {
      mcHero.textContent = "Server Offline";
      mcThumb.textContent = "Server Offline";
    }
  } catch (err) {
    console.error("Error fetching MC status:", err);
  }
}

// Fetch Discord online members
async function fetchDiscordOnline() {
  try {
    const res = await fetch("https://discord.com/api/guilds/1126475444837949500/widget.json");
    const data = await res.json();

    const discordHero = document.getElementById("discord-online");
    const discordThumb = document.getElementById("discord-online-thumb");

    animateCount(discordHero, 0, data.presence_count);
    animateCount(discordThumb, 0, data.presence_count);

    discordHero.textContent = `Members Online: ${data.presence_count}`;
    discordThumb.textContent = `Discord Online: ${data.presence_count}`;
  } catch (err) {
    console.error("Error fetching Discord:", err);
  }
}

// Update both every 60 seconds
function updateStats() {
  fetchMinecraftPlayers();
  fetchDiscordOnline();
}
setInterval(updateStats, 60000);
updateStats(); // Initial load
