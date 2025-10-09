// Colored books with their positions and images
const coloredBooks = [
    // Red book (row 2, left section)
    { top: '22%', left: '28%', width: '18px', height: '100px', image: 'book1.jpg' },
    // Yellow/orange books (row 2, middle)
    { top: '24%', left: '52%', width: '15px', height: '80px', image: 'book2.jpg' },
    // Yellow book (row 2, right)
    { top: '24%', left: '71%', width: '15px', height: '80px', image: 'book3.jpg' },
    // Yellow/orange books (row 3, left)
    { top: '41%', left: '19.5%', width: '30px', height: '80px', image: 'book4.jpg' },
    // Orange book (row 3, middle-right)
    { top: '41%', left: '63%', width: '15px', height: '80px', image: 'book5.jpg' },
    // Blue book (row 4, left)
    { top: '57%', left: '25%', width: '38px', height: '127px', image: 'book6.jpg' },
    // Orange book (row 4, middle)
    { top: '58%', left: '55.5%', width: '32px', height: '119px', image: 'book7.jpg' },
    // Blue books (row 4, right)
    { top: '57%', left: '70%', width: '36px', height: '124px', image: 'book8.jpg' }
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
        bookDiv.onclick = () => openFullscreen(book.image);
        container.appendChild(bookDiv);
    });
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

// Close fullscreen on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeFullscreen();
    }
});

// Initialize the page
initializeBooks();