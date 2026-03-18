/*
===============================================================================
Lively Integration Module
-------------------------------------------------------------------------------
Handles communication between Lain System Dashboard and Lively Wallpaper.

Responsibilities:
• Dynamic property updates (images, colors, theme variables, countdown dates)
• Media playback state detection
• Current track metadata rendering

This module relies on the Lively Wallpaper JavaScript API.

Documentation:
https://github.com/rocksdanister/lively

===============================================================================
*/


/* ============================================================================
   PROPERTY LISTENER
   ----------------------------------------------------------------------------
   Triggered automatically by Lively when a user modifies wallpaper settings.
   Updates CSS variables and dynamic assets in real-time.
============================================================================ */

function livelyPropertyListener(name, val) {

    switch (name) {

        /* -------------------------
           Dynamic Image Handling
        -------------------------- */

        case "leftImage": {
            const leftImg = document.getElementById("imgLeft");
            if (leftImg && val) {
                leftImg.src =
                    val.includes(":") || val.includes("/")
                        ? val
                        : "assets/images/" + val;
            }
            break;
        }

        case "rightImage": {
            const rightImg = document.getElementById("imgRight");
            if (rightImg && val) {
                rightImg.src =
                    val.includes(":") || val.includes("/")
                        ? val
                        : "assets/images/" + val;
            }
            break;
        }

        /* -------------------------
           Theme Color Customization
        -------------------------- */

        case "accentColor":
            document.documentElement
                .style.setProperty("--accent", val);
            break;

        case "backgroundColor":
            document.documentElement
                .style.setProperty("--bg", val);
            break;

        case "panelColor":
            document.documentElement
                .style.setProperty("--panel", val);
            break;

        case "titleBarColor":
            document.documentElement
                .style.setProperty("--titleBar", val);
            break;

        case "playerTextColor":
            document.documentElement
                .style.setProperty("--playerText", val);
            break;

        case "clockTextColor":
            document.documentElement
                .style.setProperty("--clockText", val);
            break;

        case "terminalTextColor":
            document.documentElement
                .style.setProperty("--terminalText", val);
            break;

        case "numbersTextColor":
            document.documentElement
                .style.setProperty("--encodeText", val);
            break;

        case "countdownTextColor":
            document.documentElement
                .style.setProperty("--countdownText", val);
            break;

        case "countdownNumberColor":
            document.documentElement
                .style.setProperty("--countdownNumber", val);
            break;

        case "completeEventColor":
            document.documentElement
                .style.setProperty("--completeEvent", val);
            break;

        case "worldTextColor":
            document.documentElement
                .style.setProperty("--wclockText", val);
            break;

        case "globeColor":
            document.documentElement
                .style.setProperty("--globeColor", val);
            break;
        
        case "event1Name":
      events[0].name = val;
      break;

    case "event1Date":
      events[0].date = val;
      break;

    case "event2Name":
      events[1].name = val;
      break;

    case "event2Date":
      events[1].date = val;
      break;

    case "event3Name":
      events[2].name = val;
      break;

    case "event3Date":
      events[2].date = val;
      break;
    }
}


/* ============================================================================
   MEDIA PLAYBACK STATE LISTENER
   ----------------------------------------------------------------------------
   Triggered when playback state changes (play / pause).
   Adjusts UI opacity to reflect paused state.
============================================================================ */

function livelyWallpaperPlaybackChanged(data) {

    const obj = JSON.parse(data);
    const playerBox = document.querySelector(".player-box");

    if (!playerBox) return;

    // Reduce opacity when paused for subtle visual feedback
    playerBox.style.opacity = obj.IsPaused ? 0.6 : 1;
}


/* ============================================================================
   CURRENT TRACK METADATA LISTENER
   ----------------------------------------------------------------------------
   Updates:
   • Track title
   • Artist name
   • Album artwork (base64 thumbnail)

   Handles fallback states when no media is detected.
============================================================================ */

function livelyCurrentTrack(data) {

    const obj = JSON.parse(data);

    const titleEl = document.getElementById("trackTitle");
    const artistEl = document.getElementById("trackArtist");
    const artEl = document.getElementById("albumArt");
    const playerBox = document.querySelector(".player-box");

    if (!titleEl || !artistEl || !artEl || !playerBox) return;

    if (obj != null) {

        titleEl.innerText = obj.Title;
        artistEl.innerText = obj.Artist;

        if (obj.Thumbnail != null) {

            // Ensure correct base64 prefix
            const base64String =
                obj.Thumbnail.startsWith("data:image/")
                    ? obj.Thumbnail
                    : "data:image/png;base64," + obj.Thumbnail;

            artEl.src = base64String;
            artEl.style.opacity = 1;

        } else {
            // Thumbnail unavailable
            artEl.style.opacity = 0.4;
        }

        playerBox.style.opacity = 1;

    } else {

        // No media playing
        titleEl.innerText = "NO MEDIA DETECTED";
        artistEl.innerText = "---";
        artEl.style.opacity = 0;
        playerBox.style.opacity = 0.6;
    }
}