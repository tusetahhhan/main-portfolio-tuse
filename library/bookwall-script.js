// Colored books with their positions, images, and series titles
const coloredBooks = [
    // 1. Pink book (row 1, left section)
    { top: '9%', left: '27%', width: '21px', height: '124px', image: 'book1.png', title: 'Series 1: The Precedents' },
    // 2. Yellow book (row 1, right)
    { top: '9.5%', left: '72.5%', width: '30px', height: '120px', image: 'book1.png', title: 'Series 2' },
    // 3. Yellow/orange books (row 2, left)
    { top: '33%', left: '20.5%', width: '38px', height: '126px', image: 'book1.png', title: 'Series 3' },
    // 4. Orange book (row 2, middle-right)
    { top: '33%', left: '68%', width: '22px', height: '125px', image: 'book1.png', title: 'Series 4' },
    // 5. Blue book (row 3, left)
    { top: '56.5%', left: '25%', width: '38px', height: '130px', image: 'book1.png', title: 'Series 5' },
    // 6. Neon orange book (row 3, middle)
    { top: '57.5%', left: '55.5%', width: '32px', height: '119px', image: 'book1.png', title: 'Series 6' },
    // 7. Blue books (row 3, right)
    { top: '56.5%', left: '69.5%', width: '36px', height: '124px', image: 'book1.png', title: 'Series 7' }
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
        
        // Create number indicator
        const numberIndicator = document.createElement('div');
        numberIndicator.className = 'book-number';
        numberIndicator.textContent = index + 1;
        bookDiv.appendChild(numberIndicator);
        
        container.appendChild(bookDiv);
    });
}

function openFullscreen(imageSrc, title) {
    const overlay = document.getElementById('fullscreen-overlay');
    const image = document.getElementById('fullscreen-image');
    const video = document.getElementById('fullscreen-video');
    
    image.src = imageSrc;
    overlay.classList.add('active');
    
    // Remove zoom class and hide video initially
    overlay.classList.remove('zoomed');
    video.style.display = 'none';
    image.style.display = 'block';
}

function closeFullscreen() {
    const overlay = document.getElementById('fullscreen-overlay');
    const video = document.getElementById('fullscreen-video');
    overlay.classList.remove('active');
    overlay.classList.remove('zoomed');
    video.pause();
    video.currentTime = 0;
}

// Handle click on fullscreen overlay to zoom and play video
document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('fullscreen-overlay');
    const image = document.getElementById('fullscreen-image');
    const video = document.getElementById('fullscreen-video');
    
    overlay.addEventListener('click', (e) => {
        // Don't trigger if clicking close button
        if (e.target.id === 'close-fullscreen') return;
        
        // If not zoomed yet, zoom in and play video after zoom completes
        if (!overlay.classList.contains('zoomed')) {
            overlay.classList.add('zoomed');
            
            // Wait for zoom animation to complete (3 seconds), then show video with grow effect
            setTimeout(() => {
                image.style.display = 'none';
                video.style.display = 'block';
                
                // Small delay to trigger the transition
                setTimeout(() => {
                    video.classList.add('video-zoom-in');
                    video.play();
                }, 50);
            }, 3000);
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