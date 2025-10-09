let currentRoom = 1;

const rooms = {
    1: {
        background: 'room1.png',
        frames: [
            // Left frame
            { top: '30%', left: '15%', width: '100px', height: '270px', image: 'roofplanf.jpg' },
            // Center frame - opens planf.jpg (no second image)
            { top: '28%', left: '37%', width: '390px', height: '240px', image: 'planf.jpg' }
        ]
    },
    2: {
        background: 'room2.png',
        frames: [
            // Three frames for room 2
            { top: '28%', left: '29.5%', width: '180px', height: '210px', image: 'shortsectionf.jpg' },
            { top: '32%', left: '45.5%', width: '340px', height: '230px', image: 'longsectionf.jpg' },
            { top: '20%', left: '74%', width: '180px', height: '335px', image: 'axonf.jpg' }
        ]
    }
};

function loadRoom(roomNumber) {
    const container = document.getElementById('gallery-container');
    const framesContainer = document.getElementById('frames-container');
    const menu = document.getElementById('menu');
    const menuTrigger = document.getElementById('menu-trigger');
    const clickIndicator = document.getElementById('click-here-indicator');
    
    // Set background
    container.style.backgroundImage = `url('${rooms[roomNumber].background}')`;
    
    // Clear existing frames
    framesContainer.innerHTML = '';
    
    // Hide menu elements in room 2
    if (roomNumber === 2) {
        menu.style.display = 'none';
        menuTrigger.style.display = 'none';
        clickIndicator.style.display = 'none';
    } else {
        menuTrigger.style.display = 'block';
        if (!menu.classList.contains('active')) {
            clickIndicator.style.display = 'block';
        }
    }
    
    // Add clickable frames
    rooms[roomNumber].frames.forEach((frame, index) => {
        const frameDiv = document.createElement('div');
        frameDiv.className = 'frame-clickable';
        frameDiv.style.top = frame.top;
        frameDiv.style.left = frame.left;
        frameDiv.style.width = frame.width;
        frameDiv.style.height = frame.height;
        frameDiv.onclick = () => openFullscreen(frame.image);
        framesContainer.appendChild(frameDiv);
    });
}

function nextRoom() {
    currentRoom = currentRoom === 1 ? 2 : 1;
    loadRoom(currentRoom);
    // Hide menu when switching rooms
    const menu = document.getElementById('menu');
    menu.classList.remove('active');
}

function goBack(event) {
    event.preventDefault();
    if (currentRoom === 2) {
        // Go back to room 1
        currentRoom = 1;
        loadRoom(currentRoom);
    } else {
        // Go back to index.html
        window.location.href = '../first page/index.html';
    }
}

function openFullscreen(imageSrc) {
    const overlay = document.getElementById('fullscreen-overlay');
    const image = document.getElementById('fullscreen-image');
    image.src = imageSrc;
    overlay.classList.add('active');
}

function closeFullscreen() {
    const overlay = document.getElementById('fullscreen-overlay');
    overlay.classList.remove('active');
}

function showContent(type) {
    alert(`Showing ${type} content`);
    // You can expand this to show actual content
}

function toggleMenu() {
    const menu = document.getElementById('menu');
    const indicator = document.getElementById('click-here-indicator');
    menu.classList.toggle('active');
    
    // Hide the "CLICK HERE" indicator once menu is opened
    if (menu.classList.contains('active')) {
        indicator.style.display = 'none';
    }
}

// Close fullscreen on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeFullscreen();
    }
});

// Initialize with room 1
loadRoom(1);