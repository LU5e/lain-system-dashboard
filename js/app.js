/*
===============================================================================
Core Application Module
-------------------------------------------------------------------------------
Handles all dynamic dashboard components:

• Local system clock
• World clock (multi-timezone)
• Mini calendar generator
• Event countdown
• Simulated terminal output
• Random data stream panel

Each module is isolated and safely guarded against missing DOM elements
to ensure stability inside the Lively Wallpaper runtime.

===============================================================================
*/


/* ============================================================================
   DOM REFERENCES
   ----------------------------------------------------------------------------
   Cache frequently accessed DOM elements for performance and readability.
============================================================================ */

const clockEl = document.getElementById("clock");
const dateEl = document.getElementById("date");
const worldClockEl = document.getElementById("worldclock");
const countdownEl = document.getElementById("countdown");
const terminalEl = document.getElementById("terminal");
const numbersEl = document.getElementById("numbers");

const leftImgEl = document.getElementById("imgLeft");
const rightImgEl = document.getElementById("imgRight");

// Preserve default image sources (used for dynamic resets if needed)
const defaultLeftImage = leftImgEl ? leftImgEl.src : "";
const defaultRightImage = rightImgEl ? rightImgEl.src : "";


/* ============================================================================
   LOCAL CLOCK MODULE
============================================================================ */

function updateClock() {
    const now = new Date();

    // 24-hour system time
    if (clockEl) {
        clockEl.innerText = now.toLocaleTimeString(undefined, {
            hour12: false
        });
    }

    // Localized date (day + full month name)
    if (dateEl) {
        dateEl.innerText = now.toLocaleDateString(undefined, {
            day: "numeric",
            month: "long"
        });
    }
}

// Update every second
setInterval(updateClock, 1000);
updateClock();


/* ============================================================================
   WORLD CLOCK MODULE
   ----------------------------------------------------------------------------
   Displays selected time zones for aesthetic/global system feel.
============================================================================ */

function updateWorldClock() {

    const tokyo = new Date().toLocaleTimeString("en-US", {
        timeZone: "Asia/Tokyo",
        hour12: false
    });

    const bogota = new Date().toLocaleTimeString("en-US", {
        timeZone: "America/Bogota",
        hour12: false
    });

    const casablanca = new Date().toLocaleTimeString("en-US", {
        timeZone: "Africa/Casablanca",
        hour12: false
    });

    if (worldClockEl) {
        worldClockEl.innerHTML =
            `TOK ${tokyo}<br>BOG ${bogota}<br>MAT ${casablanca}`;
    }
}

setInterval(updateWorldClock, 1000);
updateWorldClock();


/* ============================================================================
   MINI CALENDAR MODULE
   ----------------------------------------------------------------------------
   Generates a minimal month view highlighting the current day.
============================================================================ */

function generateCalendar() {
    const calendar = document.getElementById("mini-calendar");
    if (!calendar) return;

    calendar.innerHTML = "";

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const today = now.getDate();

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days = ["S", "M", "T", "W", "T", "F", "S"];

    // Weekday headers
    days.forEach(day => {
        const el = document.createElement("div");
        el.innerText = day;
        calendar.appendChild(el);
    });

    // Offset for first day of month
    for (let i = 0; i < firstDay; i++) {
        calendar.appendChild(document.createElement("div"));
    }

    // Generate days
    for (let d = 1; d <= daysInMonth; d++) {
        const el = document.createElement("div");
        el.innerText = d;

        if (d === today) {
            el.classList.add("today");
        }

        calendar.appendChild(el);
    }
}

generateCalendar();


/* ============================================================================
   COUNTDOWN MODULE
   ----------------------------------------------------------------------------
   Displays remaining time until a fixed target date.
============================================================================ */

const targetDate = new Date("2026-03-19T00:00:00");

function updateCountdown() {
    if (!countdownEl) return;

    const diff = targetDate - new Date();

    if (diff <= 0) {
        countdownEl.innerHTML = "EVENT STARTED";
        return;
    }

    const days = Math.floor(diff / 86400000);
    const hours = Math.floor(diff / 3600000) % 24;
    const minutes = Math.floor(diff / 60000) % 60;
    const seconds = Math.floor(diff / 1000) % 60;

    countdownEl.innerHTML =
        `EVENT<br>${days}d ${hours}h ${minutes}m ${seconds}s`;
}

setInterval(updateCountdown, 1000);
updateCountdown();


/* ============================================================================
   TERMINAL SIMULATION MODULE
   ----------------------------------------------------------------------------
   Generates scrolling pseudo-system log entries for visual immersion.
============================================================================ */

const commands = [
    "[ OK ] boot sequence initialized",
    "checking kernel modules...",
    "mounting /dev/wired_interface",
    "scanning node 192.168.0.12...",
    "connection established.",
    "routing packets through eth0",
    "auth handshake complete",
    "access granted: root@wired",
    "syncing remote host...",
    "injecting node protocol...",
    "compiling neural map...",
    "establishing encrypted tunnel...",
    "decrypting packet stream...",
    "memory allocation: 2048MB",
    "monitoring signal strength...",
    "updating registry index...",
    "firewall bypass attempt detected",
    "reconfiguring system layer...",
    "loading module: ghost_protocol.sys",
    "executing background task...",
    "analyzing traffic anomaly...",
    "rebuilding cache...",
    "writing to /var/log/system.log",
    "forking process id=4421",
    "ping 10.0.0.7 ttl=64 time=2ms",
    "WARNING: unstable frequency detected",
    "ERROR: packet loss threshold exceeded",
    "attempting recovery...",
    "system override granted.",
    "wired synchronization complete."
];

let terminalIndex = 0;

function typeTerminal() {
    if (!terminalEl) return;

    const now = new Date().toLocaleTimeString();
    const cmd = commands[terminalIndex % commands.length];

    terminalEl.innerHTML += `[${now}] > ${cmd}\n`;
    terminalEl.scrollTop = terminalEl.scrollHeight;

    terminalIndex++;

    // Limit terminal history
    const maxLines = 30;
    const lines = terminalEl.innerHTML.split("\n");

    if (lines.length > maxLines) {
        lines.shift();
        terminalEl.innerHTML = lines.join("\n");
    }
}

setInterval(typeTerminal, 800);


/* ============================================================================
   RANDOM DATA STREAM MODULE
   ----------------------------------------------------------------------------
   Generates mixed-format numerical output:
   • Large decimal values
   • Hexadecimal
   • Binary (8-bit)
   • Coordinate-style floats
============================================================================ */

function updateNumbers() {
    if (!numbersEl) return;

    let output = "";

    for (let i = 0; i < 20; i++) {

        const mode = Math.floor(Math.random() * 4);

        switch (mode) {

            case 0:
                output +=
                    Math.floor(Math.random() * 999999999) + "\n";
                break;

            case 1:
                output +=
                    "0x" +
                    Math.floor(Math.random() * 0xffffff)
                        .toString(16)
                        .toUpperCase() + "\n";
                break;

            case 2:
                output +=
                    Math.floor(Math.random() * 256)
                        .toString(2)
                        .padStart(8, "0") + "\n";
                break;

            case 3:
                output +=
                    (Math.random() * 100).toFixed(4) +
                    " / " +
                    (Math.random() * 100).toFixed(4) + "\n";
                break;
        }
    }

    numbersEl.innerText = output;
}

setInterval(updateNumbers, 1500);
updateNumbers();