# Buk Project - Interactive Portfolio & Bookwall

This project is an immersive web-based portfolio featuring an interactive "Bookwall" interface and a "Look Around" panoramic experience. It utilizes HTML, CSS, JavaScript, and GSAP animations to create a dynamic user experience.

## 📂 Project Structure

### Key Files
* **`index.html`**: The landing page. Features a GSAP animation where scattered letters converge to form project posters. Clicking a poster navigates to specific project pages (e.g., `bookwall.html`).
* **`bookwall.html`**: The main interactive interface.
    * **Bookshelf**: Clickable books and drawings scattered on a shelf.
    * **Fullscreen Overlay**: Displays detailed views of drawings or plays a video (`bookgif.mp4`) for books.
    * **Look Around (Panorama)**: A drag-to-pan immersive viewer with interactive hotspots (doors) to move between scenes.
* **`bookwall-script.js`**: Contains the logic for the bookshelf interactivity, fullscreen handling, and video playback control.
* **`buk.html`**: A vertical scrolling presentation page for the Buk project, featuring gallery loops and a 3D carousel.
* **`style.css` / `bookwall-style.css`**: Styling for the respective pages.

## ✨ Features

### 1. Landing Page Animation (`index.html`)
* **Letter Scatter**: Letters start scattered randomly across the screen.
* **Convergence**: Using GSAP, letters fly into the center to form a dense cluster.
* **Poster Reveal**: Letters fade out to reveal project posters (Structures, Buk, Airlume, etc.).
* **Navigation**: Clicking a poster redirects the user to that project's page.

### 2. The Bookwall (`bookwall.html`)
* **Interactive Shelf**: Books and drawings are positioned absolutely on a background image (`bookwall2.png`).
* **Mixed Content**:
    * **Series Books**: Play a video (`bookgif.mp4`) when clicked.
    * **Scattered Drawings**: Open as static images with a "vignette" effect and perspective skew to look like paper sitting on a shelf.
* **Fullscreen Viewer**: A modal overlay handles distinct behaviors for books vs. drawings (video vs. image) and includes a "Close" (X) button and click-away functionality.

### 3. "Look Around" Panorama
* **Drag-to-Pan**: Users can click and drag to look left/right across a stitched panoramic image.
* **Scene Switching**:
    * **Inside Scene**: Stitches `redner2.2.jpg` and `render1.2.jpg`.
    * **Outside Scene**: Displays `render3.2.jpg`.
* **Interactive Hotspots**:
    * Invisible (foggy) clickable zones placed over doors.
    * **Inside Door**: Labeled "CLICK TO EXIT", takes you to the Outside scene.
    * **Outside Door**: Labeled "CLICK TO ENTER", takes you back Inside.

## 🛠 Customization Guide

### Adjusting Panorama Hotspots
To move the clickable "Door" areas in `bookwall.html`, look for the `<div class="hotspot">` elements inside the `#panorama-overlay` section.

**Example Code:**
```html
<div class="hotspot" onclick="switchScene('outside')" 
     data-label="CLICK TO EXIT"
     style="
        top: 58%;       /* Vertical position (0% is top, 100% is bottom) */
        left: 54%;      /* Horizontal position */
        width: 0.7in;   /* Width of the clickable area */
        height: 2.2in;  /* Height of the clickable area */
     ">
</div>
