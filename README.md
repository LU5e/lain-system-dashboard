# Lain System Dashboard

A retro-inspired CRT cyberpunk dashboard designed for **Lively Wallpaper**.

🔗 Repository: https://github.com/LU5e/lain-system-dashboard

This project recreates a modular system interface featuring animated panels, real-time clocks, a simulated terminal, dynamic media integration, and a 3D wireframe globe powered by Three.js.

---

## Features

* Modular grid-based dashboard layout
* Local system clock and world clock
* Auto-generated mini calendar
* Configurable event countdown
* Simulated scrolling terminal logs
* Random multi-format data stream
* Live media integration via Lively API
* Animated 3D wireframe globe (Three.js)
* Fully customizable theme colors
* CRT scanline and flicker effects

---

## Project Structure

```
LAIN-SYSTEM-DASHBOARD
│
├── assets/
│   └── images/
│       ├── lain.jpg
│       └── lain-gift.gif
│
├── css/
│   └── styles.css
│
├── js/
│   ├── app.js
│   ├── earth.js
│   └── lively.js
│
├── index.html
├── LivelyInfo.json
├── LivelyProperties.json
├── preview.png
├── thumbnail.png
└── README.md
```

---

## Architecture Overview

### index.html

Defines the modular dashboard layout and loads required scripts.

### styles.css

Implements:

* CSS variable-based theme system
* Grid layout
* Panel styling
* CRT visual simulation

### app.js

Handles dynamic components:

* Clocks
* Calendar
* Countdown
* Terminal simulation
* Data stream generation

### earth.js

Renders a low-poly animated globe using Three.js.

### lively.js

Connects the dashboard with the Lively Wallpaper API:

* Property updates
* Media playback detection
* Album artwork rendering

---

## Customization

All colors are controlled via CSS variables:

```css
:root {
  --accent: #5da9ff;
  --bg: #03060c;
  --panel: #0d1b2d;
}
```

These variables can also be modified dynamically through Lively properties.

---

## Dependencies

* Three.js r128 (CDN version)
* Lively Wallpaper 

---

## Installation

1. Download or clone this repository.
2. Import the folder into **Lively Wallpaper**.
3. Customize colors and images through Lively properties.
4. Enjoy your cyberpunk dashboard.

---

## Compatibility

Tested with Lively Wallpaper v2.2.1.0  
Compatible with the latest stable release at the time of development.

---

## License

This project is released under the MIT License.

You are free to modify, distribute, and use it for personal or commercial purposes.

---

## Author

Patrick Piña (LU5e)
