// Colored books/items with their positions, images, and series titles
const coloredBooks = [
    // --- THE MAIN SERIES BOOKS ---
    { top: '27.5%', left: '30.5%', width: '98px', height: '52px', image: 'book1.png', title: 'Series 1: The Precedents', label: '1: PRECEDENT RESEARCH AND ANALYSIS', link: 'openbook.html' },
    { top: '3.5%', left: '46%', width: '172px', height: '55px', image: 'book2.png', title: 'Series 2', label: '2: SITE INFORMATION', link: 'sitebook.html' },
    { top: '18.5%', left: '60.5%', width: '195px', height: '66px', image: 'book3.png', title: 'Series 3', label: '3: DRAWINGS', link: 'drawingsbook.html' },
    { top: '60%', left: '30.7%', width: '126px', height: '62px', image: 'book4.png', title: 'Series 4', label: '4: DOCUMENTATION', link: 'model.html' },

    // --- SCATTERED DRAWINGS ---
    { top: '1%', left: '65%', width: '45px', height: '55px', image: 'plan port.jpg', title: 'Floor Plan', label: 'PLAN', link: '#' },
    { top: '27%', left: '48%', width: '45px', height: '55px', image: 'section cut.jpg', title: 'Section Cut', label: 'SECTION', link: '#' },
    { top: '43%', left: '69%', width: '45px', height: '55px', image: 'axon port.jpg', title: 'Axonometric', label: 'AXON', link: '#' },
    { top: '9.5%', left: '33%', width: '45px', height: '55px', image: 'struc axon.jpg', title: 'Structural Axon', label: 'STRUCTURE', link: '#' },
    { top: '77.5%', left: '48%', width: '45px', height: '55px', image: 'elevation.jpg', title: 'Elevation', label: 'ELEVATION', link: '#' },
    { top: '34.5%', left: '64%', width: '45px', height: '55px', image: 'wall section1.jpg', title: 'Wall Detail 1', label: 'WALL 1', link: '#' },
    { top: '85.5%', left: '66%', width: '45px', height: '55px', image: 'wall section2.jpg', title: 'Wall Detail 2', label: 'WALL 2', link: '#' },
    { top: '43.5%', left: '35%', width: '45px', height: '55px', image: 'roof plan.jpg', title: 'Roof Plan', label: 'ROOF', link: '#' }
];

let currentBookLink = '';

function initializeBooks() {
    const container = document.getElementById('books-container');
    
    coloredBooks.forEach((book, index) => {
        const bookDiv = document.createElement('div');
        bookDiv.className = 'book-clickable';
        bookDiv.style.top = book.top;
        bookDiv.style.left = book.left;
        bookDiv.style.width = book.width;
        bookDiv.style.height = book.height;
        
        // Use a wrapper function to capture the event and prevent bubbling immediately if needed
        bookDiv.onclick = (e) => {
            e.stopPropagation(); 
            openFullscreen(book.image, book.title, book.link);
        };
        bookDiv.style.cursor = 'pointer';
        
        if (!book.title.includes('Series')) {
            bookDiv.style.backgroundColor = '#fdfdfd'; 
            bookDiv.style.backgroundImage = `url("${encodeURI(book.image)}")`; 
            bookDiv.style.backgroundSize = 'cover';
            bookDiv.style.backgroundPosition = 'center';
            bookDiv.style.border = '1px solid rgba(0,0,0,0.1)';
            bookDiv.style.boxShadow = 'inset 0 0 12px rgba(0,0,0,0.3), 2px 4px 8px rgba(0,0,0,0.5)';
            bookDiv.style.transform = 'perspective(400px) rotateX(8deg) scale(0.95)';
            bookDiv.style.transformOrigin = 'bottom center';
        }

        const labelIndicator = document.createElement('div');
        labelIndicator.className = 'book-number';
        labelIndicator.textContent = book.label;
        
        if (!book.title.includes('Series')) {
            labelIndicator.style.fontSize = '8px'; 
            labelIndicator.style.color = '#ccc'; 
            labelIndicator.style.textShadow = '1px 1px 2px black'; 
            labelIndicator.style.position = 'absolute';
            labelIndicator.style.bottom = '-25px'; 
            labelIndicator.style.left = '50%';
            labelIndicator.style.transform = 'translateX(-50%) rotateX(-8deg)'; 
            labelIndicator.style.width = '150%'; 
            labelIndicator.style.textAlign = 'center';
            labelIndicator.style.letterSpacing = '1px';
            labelIndicator.style.fontFamily = 'Arial, sans-serif';
            labelIndicator.style.fontWeight = 'bold';
            labelIndicator.style.background = 'none'; 
        }
        
        bookDiv.appendChild(labelIndicator);
        container.appendChild(bookDiv);
    });
}

function openFullscreen(imageSrc, title, link) {
    const overlay = document.getElementById('fullscreen-overlay');
    const image = document.getElementById('fullscreen-image');
    const video = document.getElementById('fullscreen-video');
    const closeBtn = document.getElementById('close-fullscreen');
    
    currentBookLink = link;
    image.src = imageSrc; 
    
    // Force image sizing
    image.style.maxWidth = '90vw';
    image.style.maxHeight = '90vh';
    image.style.width = 'auto';
    image.style.height = 'auto';
    image.style.objectFit = 'contain';
    image.style.display = 'block';
    
    // Ensure the close button is visible and on top
    if (closeBtn) {
        closeBtn.style.display = 'flex';
        closeBtn.style.zIndex = '2147483647'; // Use max int for safety
    }

    overlay.classList.add('active');
    overlay.style.display = 'flex';
    
    overlay.classList.remove('playing-video');
    video.style.display = 'none';
    video.classList.remove('video-playing');
}

function closeFullscreen() {
    const overlay = document.getElementById('fullscreen-overlay');
    const video = document.getElementById('fullscreen-video');
    
    overlay.classList.remove('active');
    overlay.style.display = 'none'; 
    overlay.classList.remove('playing-video');
    
    video.pause();
    video.currentTime = 0;
    video.classList.remove('video-playing');
}

document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('fullscreen-overlay');
    const image = document.getElementById('fullscreen-image');
    const video = document.getElementById('fullscreen-video');
    const closeBtn = document.getElementById('close-fullscreen');
    
    // 1. Close Button Listener - Priority #1
    // We attach this directly to the button, not delegated through the overlay
    if (closeBtn) {
        closeBtn.onclick = (e) => {
            e.stopPropagation(); // Stop this click from reaching the overlay
            e.preventDefault();
            closeFullscreen();
        };
    }

    // 2. Video End Listener
    video.addEventListener('ended', () => {
        if (currentBookLink && currentBookLink !== '#') {
            window.location.href = currentBookLink;
        } else {
            closeFullscreen(); 
        }
    });
    
    // 3. Overlay Click Listener (The background)
    overlay.addEventListener('click', (e) => {
        // Double check: if the target is the close button (or its child), do nothing here
        if (e.target.closest('#close-fullscreen')) return;

        // If viewing a DRAWING (link is #), ANY click on the overlay closes it
        if (currentBookLink === '#') {
            closeFullscreen();
            return;
        }

        // If viewing a BOOK (video content), start the video if not playing
        if (!overlay.classList.contains('playing-video')) {
            overlay.classList.add('playing-video');
            image.style.display = 'none';
            video.style.display = 'block';
            video.classList.add('video-playing');
            video.play();
        }
    });
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeFullscreen();
    }
});

initializeBooks();