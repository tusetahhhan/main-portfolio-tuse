// Colored books with their positions, images, and series titles
const coloredBooks = [
    // 1. Pink book (row 1, left section)
    { top: '27.5%', left: '30.5%', width: '98px', height: '52px', image: 'book1.png', title: 'Series 1: The Precedents', label: '1: PRECEDENT RESEARCH AND ANALYSIS' },
    // 2. Yellow book (row 1, right)
    { top: '3.5%', left: '46%', width: '172px', height: '55px', image: 'book2.png', title: 'Series 2', label: '2: SITE INFORMATION' },
    // 3. Yellow/orange books (row 2, left)
    { top: '18.5%', left: '60.5%', width: '195px', height: '66px', image: 'book3.png', title: 'Series 3', label: '3: DRAWINGS' },
    // 4. Orange book (row 2, middle-right)
    { top: '60%', left: '30.7%', width: '126px', height: '62px', image: 'book4.png', title: 'Series 4', label: '4: DOCUMENTATION' }
];

function initializeBooks() {
    const container = document.getElementById('books-container');
    
    coloredBooks.forEach((book, index) => {
        const bookDiv = document.createElement('div');
        bookDiv.className = 'book-clickable';
        bookDiv.style.top = book.top;
        bookDiv.style.left = book.left;
        bookDiv.style.width = book.width;
        bookDiv.style.height = book.height;
        bookDiv.onclick = () => openFullscreen(book.image, book.title);
        bookDiv.style.cursor = 'pointer';
        
        // Create label indicator with full text
        const labelIndicator = document.createElement('div');
        labelIndicator.className = 'book-number';
        labelIndicator.textContent = book.label;
        bookDiv.appendChild(labelIndicator);
        
        container.appendChild(bookDiv);
    });
}

function openFullscreen(imageSrc, title) {
    const overlay = document.getElementById('fullscreen-overlay');
    const image = document.getElementById('fullscreen-image');
    const video = document.getElementById('fullscreen-video');
    
    image.src = imageSrc;
    overlay.classList.add('active');
    
    // Reset states
    overlay.classList.remove('playing-video');
    video.style.display = 'none';
    image.style.display = 'block';
    video.classList.remove('video-playing');
}

function closeFullscreen() {
    const overlay = document.getElementById('fullscreen-overlay');
    const video = document.getElementById('fullscreen-video');
    overlay.classList.remove('active');
    overlay.classList.remove('playing-video');
    video.pause();
    video.currentTime = 0;
    video.classList.remove('video-playing');
}

// Handle click on fullscreen overlay to play video
document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('fullscreen-overlay');
    const image = document.getElementById('fullscreen-image');
    const video = document.getElementById('fullscreen-video');
    
    // Auto-open book when video ends
    video.addEventListener('ended', () => {
        window.location.href = 'openbook.html';
    });
    
    overlay.addEventListener('click', (e) => {
        // Don't trigger if clicking close button
        if (e.target.id === 'close-fullscreen') return;
        
        // If not playing video yet, switch to video and play
        if (!overlay.classList.contains('playing-video')) {
            overlay.classList.add('playing-video');
            
            // Hide image and show video immediately
            image.style.display = 'none';
            video.style.display = 'block';
            video.classList.add('video-playing');
            
            // Play video
            video.play();
        }
    });
});

// Close fullscreen on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeFullscreen();
    }
});

// Initialize the page
initializeBooks();