// Colored books with their positions, images, and series titles
const coloredBooks = [
    // 1. Pink book (row 1, left section)
    { top: '27.5%', left: '30.5%', width: '98px', height: '52px', image: 'book1.png', title: 'Series 1: The Precedents' },
    // 2. Yellow book (row 1, right)
    { top: '3.5%', left: '46%', width: '172px', height: '55px', image: 'book1.png', title: 'Series 2' },
    // 3. Yellow/orange books (row 2, left)
    { top: '18.5%', left: '60.5%', width: '195px', height: '66px', image: 'book1.png', title: 'Series 3' },
    // 4. Orange book (row 2, middle-right)
    { top: '60%', left: '30.7%', width: '126px', height: '62px', image: 'book1.png', title: 'Series 4' },
    // 5. Blue book (row 3, left)
    { top: '60%', left: '62.5%', width: '145px', height: '60px', image: 'book1.png', title: 'Series 5' },
    // 6. Neon orange book (row 3, middle)
    { top: '85%', left: '27.9%', width: '132px', height: '61px', image: 'book1.png', title: 'Series 6' }
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
    const enterButton = document.getElementById('enter-button');
    
    image.src = imageSrc;
    overlay.classList.add('active');
    
    // Remove zoom class and hide video and enter button initially
    overlay.classList.remove('zoomed');
    video.style.display = 'none';
    image.style.display = 'block';
    enterButton.style.display = 'none';
}

function closeFullscreen() {
    const overlay = document.getElementById('fullscreen-overlay');
    const video = document.getElementById('fullscreen-video');
    const enterButton = document.getElementById('enter-button');
    overlay.classList.remove('active');
    overlay.classList.remove('zoomed');
    video.pause();
    video.currentTime = 0;
    enterButton.style.display = 'none';
}

// Handle click on fullscreen overlay to zoom and play video
document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('fullscreen-overlay');
    const image = document.getElementById('fullscreen-image');
    const video = document.getElementById('fullscreen-video');
    const enterButton = document.getElementById('enter-button');
    
    // Show enter button when video ends
    video.addEventListener('ended', () => {
        enterButton.style.display = 'block';
    });
    
    overlay.addEventListener('click', (e) => {
        // Don't trigger if clicking close button or enter button
        if (e.target.id === 'close-fullscreen' || e.target.closest('#enter-button')) return;
        
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
    // Trigger enter button on Enter key if button is visible
    if (e.key === 'Enter') {
        const enterButton = document.getElementById('enter-button');
        if (enterButton.style.display === 'block') {
            enterButton.click();
        }
    }
});

// Initialize the page
initializeBooks();